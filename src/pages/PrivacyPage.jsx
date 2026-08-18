import React from "react";

const SECTIONS = [
  {
    heading: "Who We Are",
    body: `India Contemporary ("we", "us", "our") operates indiacontemporary.net, an online
marketplace for original work by Indian contemporary artists, sold to collectors in
Europe and worldwide. This policy explains what personal data we collect when you use
the site, why we collect it, and the choices you have.`,
  },
  {
    heading: "Information We Collect",
    body: `We collect information you give us directly — your name, email, shipping address,
phone number, and payment details when you place an order; and your name, email,
portfolio links, and artist statement when you apply through the For Artists or
Partnerships pages. We also collect basic technical information automatically, such
as your IP address, browser type, and pages visited, to keep the site running
reliably and understand how it's used.`,
  },
  {
    heading: "How We Use It",
    body: `We use your information to process and ship orders, communicate with you about a
purchase or application, provide customer support, and improve the site. We do not
sell your personal data to third parties.`,
  },
  {
    heading: "Sharing With Third Parties",
    body: `We share data only where necessary to run the business: with payment processors to
complete a transaction, with shipping and customs partners to deliver your order, and
with form-handling and email tools we use to route artist and partnership
applications. Each of these providers is only given the information it needs to do
its job.`,
  },
  {
    heading: "International Transfers",
    body: `We are based in India and ship to collectors across Europe and the rest of the
world, so your data may be processed in India as well as in the countries where our
service providers operate. Where required — including for collectors in the
European Union — we take reasonable steps to ensure your data is handled with a
comparable standard of protection wherever it is processed.`,
  },
  {
    heading: "Data Retention",
    body: `We keep order and correspondence records for as long as needed to fulfil an order,
meet accounting and legal obligations, and resolve any disputes, after which they are
deleted or anonymised.`,
  },
  {
    heading: "Your Rights",
    body: `Depending on where you live, you may have the right to access, correct, or delete
the personal data we hold about you, or to object to certain uses of it. To exercise
any of these rights, email us at hello@indiacontemporary.net and we'll respond as
quickly as we can.`,
  },
  {
    heading: "Cookies",
    body: `The site may use basic cookies or similar local storage to keep your cart working
and remember preferences between visits. We don't use these for third-party
advertising.`,
  },
  {
    heading: "Security",
    body: `We take reasonable technical and organisational measures to protect your
information, but no method of transmission or storage is completely secure, and we
can't guarantee absolute security.`,
  },
  {
    heading: "Changes To This Policy",
    body: `We may update this policy as the business grows. Material changes will be reflected
here with an updated date.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
          Legal
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-ink-muted font-sans font-light mb-16">
          Last updated August 2026
        </p>

        <div className="flex flex-col gap-12">
          {SECTIONS.map((s) => (
            <div key={s.heading}>
              <h2 className="font-serif text-xl font-light text-ink-primary mb-3">
                {s.heading}
              </h2>
              <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed whitespace-pre-line">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-12 mt-4 border-t border-line/50">
          <p className="text-sm text-ink-secondary font-sans font-light">
            Questions about this policy? Email{" "}
            <a href="mailto:hello@indiacontemporary.net" className="text-accent underline underline-offset-4">
              hello@indiacontemporary.net
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
