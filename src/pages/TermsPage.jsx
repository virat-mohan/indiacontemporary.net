import React from "react";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    heading: "Agreement",
    body: `By using indiacontemporary.net or placing an order, you agree to these terms. If you
don't agree with them, please don't use the site.`,
  },
  {
    heading: "The Artworks",
    body: `Every piece listed is original and one of a kind unless stated otherwise. Because
each work is unique, once it's sold it's removed from the site — listings and
availability can change without notice. Colours, texture, and scale are represented
as accurately as photography allows, but a screen is never a perfect substitute for
seeing a piece in person; slight variation should be expected.`,
  },
  {
    heading: "Authenticity",
    body: `Every artwork we sell is sourced directly from the artist or a partner we work with
under a formal arrangement, and comes with a certificate of authenticity. If you have
reason to believe a piece is not authentic, contact us within 14 days of delivery and
we will investigate.`,
  },
  {
    heading: "Pricing & Payment",
    body: `Prices are shown in Euros unless stated otherwise and do not include import duties
or taxes that may apply in your destination country — see our Shipping page for
details. Payment is due in full at checkout before an order is processed.`,
  },
  {
    heading: "Shipping & Risk Of Loss",
    body: `We arrange fully insured, professional shipping for every order — the details are
on our Shipping page. Risk of loss or damage passes to you once the work is delivered
and signed for, at which point our insurance coverage for that shipment ends.`,
  },
  {
    heading: "Returns & Cancellations",
    body: `Original artworks are considered final sale once dispatched, given their
one-of-a-kind nature. If a piece arrives damaged or materially different from its
listing, contact us within 7 days of delivery with photos, and we'll work with you on
a repair, replacement, or refund. Custom framing added at checkout is made to order
and is non-refundable once production has started.`,
  },
  {
    heading: "Intellectual Property",
    body: `Images, text, and design on this site belong to India Contemporary or the
respective artist and may not be reproduced without permission. Purchasing a physical
artwork does not transfer copyright in the image or the right to reproduce it.`,
  },
  {
    heading: "Limitation Of Liability",
    body: `We aren't liable for indirect or consequential losses arising from your use of the
site or an order, beyond the value of the artwork purchased.`,
  },
  {
    heading: "Governing Law",
    body: `These terms are governed by the laws of India. Any dispute will first be raised
directly with us so we can try to resolve it in good faith.`,
  },
  {
    heading: "Changes To These Terms",
    body: `We may update these terms as the business evolves. The version in effect at the
time of your order applies to that order.`,
  },
];

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
          Legal
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-4">
          Terms of Service
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
            See also our{" "}
            <Link to="/shipping" className="text-accent underline underline-offset-4">
              Shipping
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-accent underline underline-offset-4">
              Privacy Policy
            </Link>
            , or email{" "}
            <a href="mailto:hello@indiacontemporary.net" className="text-accent underline underline-offset-4">
              hello@indiacontemporary.net
            </a>{" "}
            with questions.
          </p>
        </div>
      </div>
    </div>
  );
}
