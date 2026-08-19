import { getSupabaseAdmin, requireAdmin } from "../_lib/supabaseAdmin.js";
import { sendApprovalEmail } from "../_lib/email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return; // requireAdmin already sent the error response

  const { artistId } = req.body || {};
  if (!artistId) {
    res.status(400).json({ error: "artistId is required" });
    return;
  }

  const admin = getSupabaseAdmin();
  const { data: artist, error: fetchError } = await admin
    .from("artist_profiles")
    .select("email, status")
    .eq("id", artistId)
    .single();
  if (fetchError || !artist) {
    res.status(404).json({ error: "Artist not found." });
    return;
  }

  const { data: contract } = await admin
    .from("contracts")
    .select("pdf_path")
    .eq("artist_id", artistId)
    .order("signed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let contractAttachment = null;
  if (contract?.pdf_path) {
    const { data: pdfFile, error: downloadError } = await admin.storage
      .from("contracts")
      .download(contract.pdf_path);
    if (downloadError) {
      console.error("Failed to download signed contract for approval email:", downloadError);
    } else {
      const buffer = Buffer.from(await pdfFile.arrayBuffer());
      contractAttachment = { filename: "India-Contemporary-Artist-Agreement.pdf", content: buffer };
    }
  }

  const { error: updateError } = await admin
    .from("artist_profiles")
    .update({
      status: "approved",
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminUser.email,
    })
    .eq("id", artistId);
  if (updateError) {
    res.status(500).json({ error: updateError.message });
    return;
  }
  await admin.from("artworks").update({ status: "approved" }).eq("artist_id", artistId);

  try {
    await sendApprovalEmail({ email: artist.email, contractAttachment });
  } catch (err) {
    console.error("Failed to send approval email:", err);
  }

  res.status(200).json({ ok: true });
}
