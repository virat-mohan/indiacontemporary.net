import { getSupabaseAdmin, requireAdmin } from "../_lib/supabaseAdmin.js";
import { sendRejectionEmail } from "../_lib/email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return;

  const { artistId, note } = req.body || {};
  if (!artistId) {
    res.status(400).json({ error: "artistId is required" });
    return;
  }

  const admin = getSupabaseAdmin();
  const { data: artist, error: fetchError } = await admin
    .from("artist_profiles")
    .select("email")
    .eq("id", artistId)
    .single();
  if (fetchError || !artist) {
    res.status(404).json({ error: "Artist not found." });
    return;
  }

  const { error: updateError } = await admin
    .from("artist_profiles")
    .update({
      status: "rejected",
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminUser.email,
      rejection_note: note || null,
    })
    .eq("id", artistId);
  if (updateError) {
    res.status(500).json({ error: updateError.message });
    return;
  }

  try {
    await sendRejectionEmail({ email: artist.email, note });
  } catch (err) {
    console.error("Failed to send rejection email:", err);
  }

  res.status(200).json({ ok: true });
}
