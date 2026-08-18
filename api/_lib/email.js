import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set in this environment.");
  return new Resend(key);
}

const FROM = process.env.RESEND_FROM_EMAIL || "India Contemporary <onboarding@indiacontemporary.net>";

export async function sendAdminNotification({ artistName, email, phone, artworkCount, reviewUrl }) {
  const resend = getResend();
  const admins = (process.env.ADMIN_NOTIFICATION_EMAILS || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  if (admins.length === 0) return;

  await resend.emails.send({
    from: FROM,
    to: admins,
    subject: `New Artist Application — ${artistName}`,
    text: [
      `${artistName} has submitted an application to India Contemporary.`,
      ``,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Artworks submitted: ${artworkCount}`,
      ``,
      `Review it here: ${reviewUrl}`,
    ].join("\n"),
  });
}

export async function sendApprovalEmail({ email }) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "You've Been Selected — India Contemporary",
    text: [
      `Dear Artist,`,
      ``,
      `If you have received this document, you have been selected to be a part of the India Contemporary initiative. Congratulations!`,
      ``,
      `On behalf of our team, we look forward to working with you and bringing your work to the world.`,
      ``,
      `Yours,`,
      `Vijit Veer Hooda`,
      `Founder`,
      `India Contemporary`,
    ].join("\n"),
  });
}

export async function sendRejectionEmail({ email, note }) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Your India Contemporary Application",
    text: [
      `Dear Artist,`,
      ``,
      `Thank you for taking the time to submit your work to India Contemporary. After review, we're not able to move forward with your application at this time.`,
      note ? `\n${note}\n` : ``,
      `We'd encourage you to apply again in the future as your practice evolves.`,
      ``,
      `Yours,`,
      `India Contemporary`,
    ].join("\n"),
  });
}
