import { getSupabaseAdmin, requireAdmin } from "../_lib/supabaseAdmin.js";

// Deleting the underlying auth user cascades (via the FK ON DELETE CASCADE
// chain in schema.sql) through artist_profiles -> artworks -> contracts,
// so this is the one call needed to fully remove an artist and everything
// attached to them.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  const { artistId } = req.body || {};
  if (!artistId) {
    res.status(400).json({ error: "artistId is required" });
    return;
  }

  const admin = getSupabaseAdmin();
  const { error } = await admin.auth.admin.deleteUser(artistId);
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ ok: true });
}
