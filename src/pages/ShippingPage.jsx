import React from "react";
import { Package, ShieldCheck, Globe2, Clock, Truck } from "lucide-react";

const STEPS = [
  {
    icon: Package,
    title: "Museum-Grade Packing",
    body: `Every piece is packed to order once it sells, not pulled off a shelf pre-boxed.
Works on canvas are wrapped in acid-free glassine, cornered, and either shipped on a
travel frame or in a custom-built, foam-lined wooden crate for larger or more fragile
pieces. Framed and glazed work travels in a separate rigid case with moisture-barrier
wrap suited to India's humidity and the transit ahead. Sculpture is crated with
internal bracing so nothing shifts in transit.`,
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured, Door To Door",
    body: `Every shipment is insured for its full sale value from the moment it leaves the
artist's studio to the moment it's signed for at your door. We photograph each piece
before packing and share a condition report with you — if anything looks different on
arrival, that record is what a claim is built on.`,
  },
  {
    icon: Globe2,
    title: "Customs, Duties & Import Taxes",
    body: `We handle export documentation from India, including the invoice and any
certificates the piece needs to clear customs. Import duty and VAT in your country are
set by your local authority, not by us — this is typically assessed at the border and,
depending on the destination, either prepaid by us (DDP) or collected by the courier
on delivery (DAP); we'll confirm which applies before you check out.`,
  },
  {
    icon: Clock,
    title: "Timeline",
    body: `Custom crating typically adds 3–5 business days before a piece ships. From there,
transit runs roughly 1–2 weeks to Europe by specialist art courier, depending on
destination and customs processing. We'll send tracking as soon as the piece is
collected from the studio.`,
  },
  {
    icon: Truck,
    title: "Framing & White-Glove Delivery",
    body: `Canvas works can be framed to order at checkout before they ship. In select major
cities we can also arrange white-glove delivery — unpacked and placed in your home by
a two-person crew, with all packaging removed. Ask us when you order if this is
available for your city.`,
  },
];

export default function ShippingPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
          From The Studio To Your Wall
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-6">
          Shipping & Delivery
        </h1>
        <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
          Shipping original art across borders is genuinely complex — packing that
          protects delicate surfaces, insurance that actually pays out, and customs
          paperwork that gets a piece through without delay. We handle all of it, using
          the same standards specialist art shippers use worldwide, built around moving
          work out of India to collectors across Europe.
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-14">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex gap-6">
              <Icon className="flex-shrink-0 text-accent mt-1" size={24} strokeWidth={1.25} />
              <div>
                <h2 className="font-serif text-xl font-light text-ink-primary mb-2">
                  {step.title}
                </h2>
                <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto text-center mt-24 pt-16 border-t border-line/50">
        <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
          Have a question about shipping to your country before you buy? Email us at{" "}
          <a
            href="mailto:hello@indiacontemporary.net"
            className="text-accent underline underline-offset-4"
          >
            hello@indiacontemporary.net
          </a>{" "}
          and we'll walk you through it.
        </p>
      </div>
    </div>
  );
}
