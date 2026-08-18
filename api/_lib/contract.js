import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const MARGIN = 56;
const PAGE_SIZE = [595.28, 841.89]; // A4 in points

function wrapText(text, font, size, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(trial, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = trial;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// A tiny layout helper: tracks a cursor down a growing list of PDF pages,
// starting a new page whenever content would run off the bottom.
function makeWriter(pdfDoc, font, boldFont) {
  let page = pdfDoc.addPage(PAGE_SIZE);
  let y = PAGE_SIZE[1] - MARGIN;
  const maxWidth = PAGE_SIZE[0] - MARGIN * 2;

  function newPage() {
    page = pdfDoc.addPage(PAGE_SIZE);
    y = PAGE_SIZE[1] - MARGIN;
  }

  function ensureSpace(needed) {
    if (y - needed < MARGIN) newPage();
  }

  function paragraph(text, { size = 10, gapAfter = 10, bold = false } = {}) {
    const useFont = bold ? boldFont : font;
    const lines = wrapText(text, useFont, size, maxWidth);
    for (const line of lines) {
      ensureSpace(size + 4);
      page.drawText(line, { x: MARGIN, y, size, font: useFont, color: rgb(0.1, 0.1, 0.1) });
      y -= size + 4;
    }
    y -= gapAfter;
  }

  function heading(text, size = 13) {
    ensureSpace(size + 16);
    page.drawText(text, { x: MARGIN, y, size, font: boldFont, color: rgb(0, 0, 0) });
    y -= size + 12;
  }

  function spacer(amount = 10) {
    ensureSpace(amount);
    y -= amount;
  }

  return { paragraph, heading, spacer, ensureSpace, get y() { return y; }, set y(v) { y = v; } };
}

/**
 * Renders the Artist-Curator Agreement plus a per-artwork annexure, with
 * the artist's typed signature, timestamp, and IP stamped at the end, as
 * a PDF. Returns the PDF as a Uint8Array ready to upload to storage.
 */
export async function generateContractPdf({
  artistName,
  artistAddress,
  commissionPercent,
  artworks,
  signedName,
  signedAtIso,
  ipAddress,
}) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const w = makeWriter(pdfDoc, font, boldFont);

  const effectiveDate = new Date(signedAtIso);
  const day = effectiveDate.getUTCDate();
  const monthName = effectiveDate.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year = effectiveDate.getUTCFullYear();
  const artistShare = 100 - commissionPercent;

  w.heading("ARTIST-CURATOR AGREEMENT", 15);
  w.paragraph(
    `THIS ARTIST-CURATOR AGREEMENT (the "Agreement") is entered into on this ${day} day of ${monthName}, ${year} (the "Effective Date"), by and between:`
  );
  w.paragraph(
    `1. THE CURATOR: Vijit Veer Hooda, operating under the initiative "India Contemporary by Vijit Veer Hooda" (hereinafter referred to as the "Curator"), and`
  );
  w.paragraph(
    `2. THE ARTIST: ${artistName}, residing at ${artistAddress || "[address on file]"} (hereinafter referred to as the "Artist").`
  );
  w.paragraph(
    `The Curator and the Artist may collectively be referred to as the "Parties" and individually as a "Party."`
  );

  w.heading("1. Purpose & Scope of the Initiative");
  w.paragraph(
    `The primary purpose of "India Contemporary by Vijit Veer Hooda" is to introduce contemporary Indian artists to the European art market and to help them secure a strong sales pipeline of their artworks in one of the strongest art markets in the world.`
  );
  w.paragraph(
    `The Curator will introduce the Artist and their artwork to premier online auction platforms in Europe and their own networks and online platforms. The Artist retains ownership of the artwork until a sale is legally completed, while the Curator acts as the exclusive representative for the selected pieces on these digital platforms.`
  );
  w.paragraph(
    `The purpose of this agreement is to set out the terms between the Curator and Artist in the process of sales of their artwork through the India Contemporary initiative.`
  );

  w.heading("2. Artwork Submission and Curation Process");
  w.paragraph(
    `Selection: The Curator retains sole discretion to curate and select which submitted artworks/artists will be marketed. After the submission of the portfolio and available works by the Artist, the Curator will select the works and artists to add to the portfolio of India Contemporary. Once the Artist and Curator have agreed to the works to be marketed and the details of minimum reserve price have been agreed to, the artwork(s) will move to the stage of submission.`
  );
  w.paragraph(
    `Information Provision: The Artist must provide high-resolution photographs, accurate dimensions, medium details, and a minimum reserve price for each artwork they wish to submit to the auction. The Artist must guarantee the authenticity of the artwork by way of an authenticity certificate.`
  );
  w.paragraph(
    `Exclusivity Lockdown: Once an artwork is officially selected by the Curator, the Artist is strictly prohibited from offering that specific piece to any other buyer, gallery, or third party. This exclusivity remains active until the final auction process for that piece is fully completed and closed. The typical timeline is between 3-4 weeks.`
  );

  w.heading("3. Auction Period Constraints & Inventory Management");
  w.paragraph(
    `Advance Notification: The Curator will inform the Artist in advance of the exact time period the selected artwork will be live on the online auction platform.`
  );
  w.paragraph(`Possession & Care: The artwork will remain in physical possession of the Artist during the active auction window.`);
  w.paragraph(
    `Sales Freeze: The Artist may not sell, offer, or promote the active artwork to any other prospective buyer while the auction is live. The Artist is legally bound to preserve the artwork in pristine condition during this timeframe.`
  );

  w.heading("4. Logistics and Shipping Compliance");
  w.paragraph(
    `24-Hour Dispatch: Within 24 hours of receiving a confirmed sale notice and verification of the buyer's funds, the Artist must dispatch the artwork to the designated India Contemporary logistics center in New Delhi.`
  );
  w.paragraph(
    `Packaging Standards: The Artist is fully responsible for securely rolling the artwork in a heavy-duty protective shipping tube, ensuring it arrives at the logistics center ready for international transit without damage.`
  );
  w.paragraph(
    `Export & Transit: The India Contemporary logistics center in New Delhi will assume control of, manage, and execute all international shipping arrangements, customs declarations, and legal export formalities required to deliver the artwork to the European buyer.`
  );

  w.heading("5. Financial Terms and Revenue Split");
  w.paragraph(
    `Curator Commission: The Curator will retain a ${commissionPercent}% commission on the gross final bid or final sales price achieved for any artwork sold under this agreement.`,
    { bold: false }
  );
  w.paragraph(
    `Artist Share: The Artist is entitled to receive ${artistShare}% of the gross final sales price, minus any mutually agreed-upon transaction or bank transfer fees.`
  );
  w.paragraph(
    `Payout Triggers: The Artist's payment will be released only after the India Contemporary logistics center has successfully shipped the artwork and the European buyer has formally received the delivery and confirmed the quality and condition of the artwork. If there are any complaints of quality or discrepancy in the description of the works, the Artist will be solely responsible for the replacement or resolution as advised by the Curator.`
  );

  w.heading("6. Marketing and Intellectual Property Rights");
  w.paragraph(
    `Promotional Consent: The Artist grants India Contemporary a non-exclusive license to utilize their name, biography, and images of the curated artworks for marketing initiatives.`
  );
  w.paragraph(
    `Channel Distribution: Marketing materials include, but are not limited to, social media posts, website listings, digital newsletters, print catalogs, and press releases designed to promote the "India Contemporary by Vijit Veer Hooda" initiative.`
  );

  w.heading("7. Term, Termination, and Jurisdiction");
  w.paragraph(
    `Duration: This Agreement governs all individual artwork submissions made by the Artist to the Curator for a period of one (1) year from the Effective Date, automatically renewing unless terminated in writing by either party with thirty (30) days' notice.`
  );
  w.paragraph(
    `Breach: If the Artist sells a locked artwork outside of the platform during an active auction window, they will immediately cease to be a part of the initiative and all their future sales cancelled.`
  );
  w.paragraph(
    `Governing Law: This Agreement shall be governed by and construed in accordance with the laws of India. Any legal disputes arising from this contract will fall under the exclusive jurisdiction of the courts in New Delhi.`
  );

  w.spacer(6);
  w.paragraph(`IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date written above.`);

  w.spacer(10);
  w.paragraph("CURATOR: Vijit Veer Hooda", { bold: true, gapAfter: 2 });
  w.paragraph("For: India Contemporary by Vijit Veer Hooda");

  w.spacer(10);
  w.paragraph("ARTIST:", { bold: true, gapAfter: 2 });
  w.paragraph(`Printed Name: ${artistName}`);
  w.paragraph(`Signed (typed legal name): ${signedName}`);
  w.paragraph(`Date: ${new Date(signedAtIso).toUTCString()}`);
  w.paragraph(`IP Address: ${ipAddress || "unknown"}`, { size: 8 });

  // --- Annexure: one line per submitted artwork ---
  w.spacer(24);
  w.heading("ANNEXURE A — Submitted Artworks", 13);
  w.paragraph(
    "This annexure lists every artwork submitted by the Artist under this Agreement at the time of signing, and forms an integral part of it.",
    { gapAfter: 14 }
  );

  artworks.forEach((art, i) => {
    w.paragraph(`${i + 1}. ${art.title || "Untitled"}`, { bold: true, gapAfter: 2, size: 11 });
    const details = [art.medium, art.size, art.year ? String(art.year) : null]
      .filter(Boolean)
      .join(" · ");
    if (details) w.paragraph(details, { size: 9, gapAfter: 2 });
    if (art.reserve_price != null) {
      w.paragraph(`Minimum reserve price: ${art.currency || "EUR"} ${art.reserve_price}`, {
        size: 9,
        gapAfter: 2,
      });
    }
    if (art.description) w.paragraph(art.description, { size: 9, gapAfter: 4 });
    w.spacer(6);
  });

  return pdfDoc.save();
}
