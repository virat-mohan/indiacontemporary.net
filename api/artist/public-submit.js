import { getSupabaseAdmin } from "../_lib/supabaseAdmin.js";
import { generateContractPdf } from "../_lib/contract.js";
import { sendAdminNotification } from "../_lib/email.js";

// The Artist-Curator Agreement states the Curator's commission as a
// 30-40% range; the specific number is set by an admin during review.
// Since this is signed at submission time, fall back to the midpoint so
// the signed contract always has a concrete figure.
const DEFAULT_COMMISSION_PERCENT = 35;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function randomPassword() {
  return `IC-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
}

function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || null;
}

// No-login artist application: an applicant fills in their details and
// artworks in one form and submits directly for admin review. Behind the
// scenes we still create a Supabase Auth account (artist_profiles.id is
// required to reference one), but with a random password the applicant
// never sees or needs — they aren't asked to sign up or log in.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { profile, artworks, signedName } = req.body || {};

  if (!profile?.full_name?.trim()) {
    res.status(400).json({ error: "Full legal name is required." });
    return;
  }
  if (!profile?.email || !EMAIL_RE.test(profile.email.trim())) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }
  if (!profile?.phone?.trim()) {
    res.status(400).json({ error: "Phone number is required." });
    return;
  }
  if (!profile?.bio?.trim()) {
    res.status(400).json({ error: "Artist bio is required." });
    return;
  }
  if (!Array.isArray(artworks) || artworks.filter((a) => a.title || a.image_url).length === 0) {
    res.status(400).json({ error: "Add at least one artwork before submitting." });
    return;
  }
  if (!signedName || typeof signedName !== "string" || signedName.trim().length < 2) {
    res.status(400).json({ error: "A typed legal name is required to sign." });
    return;
  }

  const admin = getSupabaseAdmin();

  const { data: created, error: createUserError } = await admin.auth.admin.createUser({
    email: profile.email.trim(),
    password: randomPassword(),
    email_confirm: true,
  });
  if (createUserError) {
    res.status(400).json({
      error:
        createUserError.message.includes("already registered") ||
        createUserError.message.includes("already exists")
          ? "You've already applied with this email — we have your application and will be in touch."
          : createUserError.message,
    });
    return;
  }

  const artistId = created.user.id;
  const now = new Date().toISOString();

  const { error: profileError } = await admin.from("artist_profiles").insert({
    id: artistId,
    email: profile.email.trim(),
    full_name: profile.full_name.trim(),
    phone: profile.phone.trim(),
    address: profile.address || null,
    city: profile.city || null,
    bio: profile.bio.trim(),
    statement: profile.statement || null,
    instagram: profile.instagram || null,
    website: profile.website || null,
    photo_url: profile.photo_url || null,
    status: "submitted",
    submitted_at: now,
  });
  if (profileError) {
    res.status(500).json({ error: `Could not save your profile: ${profileError.message}` });
    return;
  }

  const validArtworks = artworks.filter((a) => a.title || a.image_url);
  const artworkRows = validArtworks.map((a) => ({
    artist_id: artistId,
    title: a.title || null,
    medium: a.medium || null,
    size: a.size || null,
    year: a.year ? Number(a.year) : null,
    description: a.description || null,
    reserve_price: a.reserve_price !== "" && a.reserve_price != null ? Number(a.reserve_price) : null,
    currency: a.currency || "EUR",
    image_url: a.image_url || null,
    status: "submitted",
  }));
  const { data: insertedArtworks, error: artworksError } = await admin
    .from("artworks")
    .insert(artworkRows)
    .select();
  if (artworksError) {
    res.status(500).json({ error: `Could not save your artworks: ${artworksError.message}` });
    return;
  }

  const signedAtIso = now;
  const ipAddress = getClientIp(req);
  let pdfBytes;
  try {
    pdfBytes = await generateContractPdf({
      artistName: profile.full_name.trim(),
      artistAddress: profile.address,
      commissionPercent: DEFAULT_COMMISSION_PERCENT,
      artworks: insertedArtworks,
      signedName: signedName.trim(),
      signedAtIso,
      ipAddress,
    });
  } catch (err) {
    console.error("Failed to generate contract PDF:", err);
  }

  if (pdfBytes) {
    const pdfPath = `${artistId}/contract-${Date.now()}.pdf`;
    const { error: uploadError } = await admin.storage
      .from("contracts")
      .upload(pdfPath, Buffer.from(pdfBytes), { contentType: "application/pdf" });
    if (!uploadError) {
      await admin.from("contracts").insert({
        artist_id: artistId,
        pdf_path: pdfPath,
        signed_name: signedName.trim(),
        signed_at: signedAtIso,
        ip_address: ipAddress,
        user_agent: req.headers["user-agent"] || null,
        commission_percent_snapshot: DEFAULT_COMMISSION_PERCENT,
        artwork_ids: insertedArtworks.map((a) => a.id),
      });
    } else {
      console.error("Failed to store signed contract:", uploadError);
    }
  }

  const siteUrl = process.env.SITE_URL || "https://indiacontemporary.net";
  try {
    await sendAdminNotification({
      artistName: profile.full_name.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      artworkCount: insertedArtworks.length,
      reviewUrl: `${siteUrl}/admin`,
    });
  } catch (err) {
    console.error("Failed to send admin notification email:", err);
  }

  res.status(200).json({ ok: true });
}
