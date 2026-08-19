import { getSupabaseAdmin } from "../_lib/supabaseAdmin.js";

const ALLOWED_BUCKETS = new Set(["artist-photos", "artwork-images"]);
const ALLOWED_MIME = /^image\/(jpeg|jpg|png|webp|gif)$/i;
// Vercel's default JSON body parser caps requests at ~4.5MB, and base64
// inflates size by ~33% — keep comfortably under that.
const MAX_BYTES = 3 * 1024 * 1024; // 3MB

// Public (no-login) image upload used by the artist application form.
// Client sends base64 image data; this uploads it with the service role
// key so applicants never need a Supabase account just to submit photos.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { bucket, filename, contentType, dataBase64 } = req.body || {};
  if (!ALLOWED_BUCKETS.has(bucket)) {
    res.status(400).json({ error: "Invalid upload target." });
    return;
  }
  if (!contentType || !ALLOWED_MIME.test(contentType)) {
    res.status(400).json({ error: "Only JPEG, PNG, WEBP, or GIF images are allowed." });
    return;
  }
  if (!dataBase64 || typeof dataBase64 !== "string") {
    res.status(400).json({ error: "No image data received." });
    return;
  }

  const buffer = Buffer.from(dataBase64, "base64");
  if (buffer.length === 0) {
    res.status(400).json({ error: "No image data received." });
    return;
  }
  if (buffer.length > MAX_BYTES) {
    res.status(400).json({ error: "Image is too large (3MB max) — please use a smaller file." });
    return;
  }

  const ext = (filename || "").split(".").pop()?.slice(0, 5) || "jpg";
  const path = `public-applicants/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const admin = getSupabaseAdmin();
  const { error } = await admin.storage.from(bucket).upload(path, buffer, { contentType });
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const { data } = admin.storage.from(bucket).getPublicUrl(path);
  res.status(200).json({ url: data.publicUrl });
}
