import { getSupabaseAdmin } from "./_lib/supabaseAdmin.js";
import { sendEnquiryEmail } from "./_lib/email.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, artworkTitle, artistName, artworkUrl, message, subscribeNewsletter } =
    req.body || {};

  if (!name || typeof name !== "string" || !name.trim()) {
    res.status(400).json({ error: "Your name is required." });
    return;
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    res.status(400).json({ error: "Enter a valid email address." });
    return;
  }

  const admin = getSupabaseAdmin();

  if (subscribeNewsletter) {
    const { error: subError } = await admin
      .from("newsletter_subscribers")
      .upsert({ email: email.trim().toLowerCase() });
    if (subError) console.error("Failed to record newsletter subscription:", subError);
  }

  try {
    await sendEnquiryEmail({
      name: name.trim(),
      email: email.trim(),
      artworkTitle,
      artistName,
      artworkUrl,
      message,
      subscribeNewsletter: Boolean(subscribeNewsletter),
    });
  } catch (err) {
    console.error("Failed to send enquiry email:", err);
    res.status(500).json({
      error: "Could not send your enquiry right now. Please email us directly at portfolio@indiacontemporary.net.",
    });
    return;
  }

  res.status(200).json({ ok: true });
}
