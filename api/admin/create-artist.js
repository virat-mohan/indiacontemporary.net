import { getSupabaseAdmin, requireAdmin } from "../_lib/supabaseAdmin.js";

function randomPassword() {
  return `IC-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  const { profile, artworks, publish } = req.body || {};
  if (!profile?.email || !profile?.full_name) {
    res.status(400).json({ error: "Name and email are required." });
    return;
  }

  const admin = getSupabaseAdmin();

  // An artist_profiles row is keyed to a real auth account, so manually
  // adding an artist means creating one on their behalf. They can reset
  // their own password later (via "forgot password" on /apply) if they
  // ever want to log in and manage their own profile.
  const { data: created, error: createUserError } = await admin.auth.admin.createUser({
    email: profile.email,
    password: randomPassword(),
    email_confirm: true,
  });
  if (createUserError) {
    res.status(400).json({
      error:
        createUserError.message.includes("already registered") ||
        createUserError.message.includes("already exists")
          ? "An account with this email already exists — that artist should already appear in the list above."
          : createUserError.message,
    });
    return;
  }

  const artistId = created.user.id;
  const now = new Date().toISOString();

  const { error: profileError } = await admin.from("artist_profiles").insert({
    id: artistId,
    email: profile.email,
    full_name: profile.full_name,
    phone: profile.phone || null,
    address: profile.address || null,
    city: profile.city || null,
    bio: profile.bio || null,
    statement: profile.statement || null,
    instagram: profile.instagram || null,
    website: profile.website || null,
    photo_url: profile.photo_url || null,
    commission_percent: profile.commission_percent ?? null,
    status: "approved",
    published: Boolean(publish),
    submitted_at: now,
    reviewed_at: now,
    reviewed_by: adminUser.email,
  });
  if (profileError) {
    res.status(500).json({ error: `Account created, but saving the profile failed: ${profileError.message}` });
    return;
  }

  if (Array.isArray(artworks) && artworks.length > 0) {
    const rows = artworks
      .filter((a) => a.title || a.image_url)
      .map((a) => ({
        artist_id: artistId,
        title: a.title || null,
        medium: a.medium || null,
        size: a.size || null,
        year: a.year ? Number(a.year) : null,
        description: a.description || null,
        reserve_price: a.reserve_price !== "" && a.reserve_price != null ? Number(a.reserve_price) : null,
        currency: a.currency || "EUR",
        image_url: a.image_url || null,
        status: "approved",
        published: Boolean(publish),
      }));
    if (rows.length > 0) {
      const { error: artworksError } = await admin.from("artworks").insert(rows);
      if (artworksError) {
        res.status(500).json({
          error: `Profile saved, but adding artworks failed: ${artworksError.message}`,
        });
        return;
      }
    }
  }

  res.status(200).json({ ok: true, artistId });
}
