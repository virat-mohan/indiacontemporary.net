import { getSupabaseAdmin, getUserFromRequest } from "../_lib/supabaseAdmin.js";
import { generateContractPdf } from "../_lib/contract.js";
import { sendAdminNotification } from "../_lib/email.js";

// The Artist-Curator Agreement states the Curator's commission as a
// 30-40% range; the specific number for each artist is set by an admin
// during review (artist_profiles.commission_percent). Since the artist
// signs at submission time — before an admin has necessarily set that
// number — we fall back to the midpoint of the stated range so the
// signed contract always has a concrete figure. An admin can still set a
// different ongoing commission_percent on the artist's profile
// afterward; it just won't retroactively change this already-signed PDF.
const DEFAULT_COMMISSION_PERCENT = 35;

function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length > 0) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const user = await getUserFromRequest(req);
  if (!user) {
    res.status(401).json({ error: "Not signed in." });
    return;
  }

  const { signedName } = req.body || {};
  if (!signedName || typeof signedName !== "string" || signedName.trim().length < 2) {
    res.status(400).json({ error: "A typed legal name is required to sign." });
    return;
  }

  const admin = getSupabaseAdmin();

  const { data: profile, error: profileError } = await admin
    .from("artist_profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (profileError || !profile) {
    res.status(404).json({ error: "Artist profile not found." });
    return;
  }
  if (!profile.full_name || !profile.bio) {
    res.status(400).json({ error: "Complete your profile (name and bio) before submitting." });
    return;
  }

  const { data: artworks, error: artworksError } = await admin
    .from("artworks")
    .select("*")
    .eq("artist_id", user.id)
    .order("created_at", { ascending: true });
  if (artworksError) {
    res.status(500).json({ error: "Could not load your artworks." });
    return;
  }
  if (!artworks || artworks.length === 0) {
    res.status(400).json({ error: "Add at least one artwork before submitting." });
    return;
  }

  const commissionPercent = profile.commission_percent ?? DEFAULT_COMMISSION_PERCENT;
  const signedAtIso = new Date().toISOString();
  const ipAddress = getClientIp(req);

  let pdfBytes;
  try {
    pdfBytes = await generateContractPdf({
      artistName: profile.full_name,
      artistAddress: profile.address,
      commissionPercent,
      artworks,
      signedName: signedName.trim(),
      signedAtIso,
      ipAddress,
    });
  } catch (err) {
    res.status(500).json({ error: `Could not generate the contract: ${err.message}` });
    return;
  }

  const pdfPath = `${user.id}/contract-${Date.now()}.pdf`;
  const { error: uploadError } = await admin.storage
    .from("contracts")
    .upload(pdfPath, Buffer.from(pdfBytes), { contentType: "application/pdf" });
  if (uploadError) {
    res.status(500).json({ error: `Could not store the signed contract: ${uploadError.message}` });
    return;
  }

  const { error: contractInsertError } = await admin.from("contracts").insert({
    artist_id: user.id,
    pdf_path: pdfPath,
    signed_name: signedName.trim(),
    signed_at: signedAtIso,
    ip_address: ipAddress,
    user_agent: req.headers["user-agent"] || null,
    commission_percent_snapshot: commissionPercent,
    artwork_ids: artworks.map((a) => a.id),
  });
  if (contractInsertError) {
    res.status(500).json({ error: `Could not record the signature: ${contractInsertError.message}` });
    return;
  }

  await admin
    .from("artist_profiles")
    .update({ status: "submitted", submitted_at: signedAtIso })
    .eq("id", user.id);
  await admin.from("artworks").update({ status: "submitted" }).eq("artist_id", user.id);

  const siteUrl = process.env.SITE_URL || "https://indiacontemporary.net";
  try {
    await sendAdminNotification({
      artistName: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      artworkCount: artworks.length,
      reviewUrl: `${siteUrl}/admin`,
    });
  } catch (err) {
    // Don't fail the whole submission just because the notification
    // email couldn't send — the application is already saved.
    console.error("Failed to send admin notification email:", err);
  }

  res.status(200).json({ ok: true });
}
