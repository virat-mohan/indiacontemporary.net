import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Upload } from "lucide-react";

const STEPS = ["Your Details", "Your Artworks", "Review & Sign"];

const emptyArtwork = () => ({
  id: null,
  title: "",
  medium: "",
  size: "",
  year: "",
  description: "",
  reserve_price: "",
  currency: "EUR",
  image_url: "",
  _uploading: false,
});

async function uploadFile(bucket, userId, file) {
  const ext = file.name.split(".").pop();
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export default function ArtistOnboardingPage() {
  const { user, session, loading, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    bio: "",
    statement: "",
    instagram: "",
    website: "",
    photo_url: "",
  });
  const [artworks, setArtworks] = useState([emptyArtwork()]);
  const [status, setStatus] = useState("draft");
  const [loadingData, setLoadingData] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [signedName, setSignedName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate("/apply");
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: existingProfile } = await supabase
        .from("artist_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (existingProfile) {
        setProfile({
          full_name: existingProfile.full_name || "",
          phone: existingProfile.phone || "",
          address: existingProfile.address || "",
          city: existingProfile.city || "",
          bio: existingProfile.bio || "",
          statement: existingProfile.statement || "",
          instagram: existingProfile.instagram || "",
          website: existingProfile.website || "",
          photo_url: existingProfile.photo_url || "",
        });
        setStatus(existingProfile.status);
        if (existingProfile.status !== "draft") setSubmitted(true);
      } else {
        await supabase
          .from("artist_profiles")
          .insert({ id: user.id, email: user.email });
      }

      const { data: existingArtworks } = await supabase
        .from("artworks")
        .select("*")
        .eq("artist_id", user.id)
        .order("created_at", { ascending: true });
      if (existingArtworks && existingArtworks.length > 0) {
        setArtworks(
          existingArtworks.map((a) => ({
            id: a.id,
            title: a.title || "",
            medium: a.medium || "",
            size: a.size || "",
            year: a.year || "",
            description: a.description || "",
            reserve_price: a.reserve_price ?? "",
            currency: a.currency || "EUR",
            image_url: a.image_url || "",
          }))
        );
      }
      setLoadingData(false);
    })();
  }, [user]);

  if (!isSupabaseConfigured) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary">
          Artist onboarding isn't connected yet — this page needs a Supabase
          project configured before it can save applications.
        </p>
      </div>
    );
  }

  if (loading || loadingData) {
    return <div className="pt-40 pb-24 px-6 text-center font-sans text-ink-muted">Loading…</div>;
  }

  if (submitted) {
    return (
      <div className="pt-40 pb-24 px-6 text-center max-w-lg mx-auto">
        <h1 className="font-serif text-3xl font-light text-ink-primary mb-4">
          {status === "approved"
            ? "You're In"
            : status === "rejected"
            ? "Application Reviewed"
            : "Application Submitted"}
        </h1>
        <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
          {status === "approved"
            ? "Congratulations — your profile and work are approved. We'll be in touch about next steps."
            : status === "rejected"
            ? "Thank you for applying. We're not able to move forward at this time — check your email for details."
            : "Thanks — your application, artworks, and signed agreement are in. We'll review it and email you once there's a decision."}
        </p>
      </div>
    );
  }

  const saveProfile = async () => {
    setSavingProfile(true);
    setError("");
    const { error: err } = await supabase
      .from("artist_profiles")
      .update({ ...profile, email: user.email })
      .eq("id", user.id);
    setSavingProfile(false);
    if (err) {
      setError(err.message);
      return false;
    }
    return true;
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile("artist-photos", user.id, file);
      setProfile((p) => ({ ...p, photo_url: url }));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateArtwork = (index, patch) => {
    setArtworks((prev) => prev.map((a, i) => (i === index ? { ...a, ...patch } : a)));
  };

  const handleArtworkImageUpload = async (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateArtwork(index, { _uploading: true });
    try {
      const url = await uploadFile("artwork-images", user.id, file);
      updateArtwork(index, { image_url: url, _uploading: false });
    } catch (err) {
      setError(err.message);
      updateArtwork(index, { _uploading: false });
    }
  };

  const saveArtworks = async () => {
    setError("");
    for (const art of artworks) {
      const payload = {
        artist_id: user.id,
        title: art.title || null,
        medium: art.medium || null,
        size: art.size || null,
        year: art.year ? Number(art.year) : null,
        description: art.description || null,
        reserve_price: art.reserve_price !== "" ? Number(art.reserve_price) : null,
        currency: art.currency || "EUR",
        image_url: art.image_url || null,
      };
      if (art.id) {
        await supabase.from("artworks").update(payload).eq("id", art.id);
      } else {
        const { data } = await supabase.from("artworks").insert(payload).select().single();
        if (data) updateArtwork(artworks.indexOf(art), { id: data.id });
      }
    }
    return true;
  };

  const goNext = async () => {
    if (step === 0) {
      if (!profile.full_name.trim()) {
        setError("Full legal name is required.");
        return;
      }
      if (!profile.phone.trim()) {
        setError("Phone number is required.");
        return;
      }
      if (!profile.bio.trim()) {
        setError("Artist bio is required.");
        return;
      }
      const ok = await saveProfile();
      if (!ok) return;
    }
    if (step === 1) {
      const hasContent = artworks.some((a) => a.title || a.image_url);
      if (!hasContent) {
        setError("Add at least one artwork before continuing.");
        return;
      }
      await saveArtworks();
    }
    setError("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleSubmitApplication = async () => {
    if (!agreed || signedName.trim().length < 2) {
      setError("Type your full legal name and confirm you agree to submit.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/artist/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ signedName: signedName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setSubmitted(true);
      setStatus("submitted");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-16">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans flex-shrink-0 ${
                  i <= step ? "bg-accent text-white" : "bg-line/40 text-ink-muted"
                }`}
              >
                {i + 1}
              </div>
              <p
                className={`text-xs uppercase tracking-widest font-sans hidden sm:block ${
                  i <= step ? "text-ink-primary" : "text-ink-muted"
                }`}
              >
                {s}
              </p>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-line/40" />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="flex flex-col gap-6">
            <h1 className="font-serif text-2xl font-light text-ink-primary mb-2">Your Details</h1>
            <Field label="Email" value={user?.email || ""} onChange={() => {}} required disabled />
            <Field label="Full Legal Name" value={profile.full_name} onChange={(v) => setProfile((p) => ({ ...p, full_name: v }))} required />
            <Field label="Phone Number" value={profile.phone} onChange={(v) => setProfile((p) => ({ ...p, phone: v }))} required />
            <Field label="Address" value={profile.address} onChange={(v) => setProfile((p) => ({ ...p, address: v }))} />
            <Field label="City" value={profile.city} onChange={(v) => setProfile((p) => ({ ...p, city: v }))} />
            <Field label="Instagram" value={profile.instagram} onChange={(v) => setProfile((p) => ({ ...p, instagram: v }))} />
            <Field label="Website" value={profile.website} onChange={(v) => setProfile((p) => ({ ...p, website: v }))} />
            <TextArea label="Artist Bio" value={profile.bio} onChange={(v) => setProfile((p) => ({ ...p, bio: v }))} required />
            <TextArea
              label="Artist Statement / Story Behind the Work"
              value={profile.statement}
              onChange={(v) => setProfile((p) => ({ ...p, statement: v }))}
            />
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Photograph
              </label>
              {profile.photo_url && (
                <img src={profile.photo_url} alt="" className="w-24 h-24 object-cover mb-3" />
              )}
              <label className="inline-flex items-center gap-2 border border-line px-4 py-2 text-sm font-sans text-ink-secondary cursor-pointer hover:border-accent transition-colors w-fit">
                <Upload size={14} /> Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-10">
            <h1 className="font-serif text-2xl font-light text-ink-primary mb-2">Your Artworks</h1>
            {artworks.map((art, i) => (
              <div key={i} className="border border-line/60 p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-widest text-ink-muted font-sans">
                    Piece {i + 1}
                  </p>
                  {artworks.length > 1 && (
                    <button
                      onClick={() => setArtworks((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-ink-muted hover:text-red-700 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
                <Field label="Title" value={art.title} onChange={(v) => updateArtwork(i, { title: v })} />
                <Field label="Medium" value={art.medium} onChange={(v) => updateArtwork(i, { medium: v })} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Size" value={art.size} onChange={(v) => updateArtwork(i, { size: v })} />
                  <Field label="Year" value={art.year} onChange={(v) => updateArtwork(i, { year: v })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Minimum Reserve Price"
                    value={art.reserve_price}
                    onChange={(v) => updateArtwork(i, { reserve_price: v })}
                  />
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                      Currency
                    </label>
                    <select
                      value={art.currency}
                      onChange={(e) => updateArtwork(i, { currency: e.target.value })}
                      className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                </div>
                <TextArea
                  label="Description / Story"
                  value={art.description}
                  onChange={(v) => updateArtwork(i, { description: v })}
                />
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                    Image
                  </label>
                  {art.image_url && (
                    <img src={art.image_url} alt="" className="w-32 h-32 object-cover mb-3" />
                  )}
                  <label className="inline-flex items-center gap-2 border border-line px-4 py-2 text-sm font-sans text-ink-secondary cursor-pointer hover:border-accent transition-colors w-fit">
                    <Upload size={14} /> {art._uploading ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleArtworkImageUpload(i, e)}
                    />
                  </label>
                </div>
              </div>
            ))}
            <button
              onClick={() => setArtworks((prev) => [...prev, emptyArtwork()])}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans w-fit"
            >
              <Plus size={15} /> Add Another Painting
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <h1 className="font-serif text-2xl font-light text-ink-primary mb-2">Review &amp; Sign</h1>
            <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
              You're submitting {artworks.length} piece{artworks.length !== 1 ? "s" : ""} under the
              name <strong>{profile.full_name}</strong>. Read the full Artist-Curator Agreement
              below, then type your name to sign it. A copy, including an annexure listing every
              artwork you've submitted, will be generated as a PDF and emailed to you once approved.
            </p>
            <div className="border border-line/60 p-6 max-h-[32rem] overflow-y-auto text-xs text-ink-secondary font-sans leading-relaxed">
              <p className="font-serif text-sm text-ink-primary mb-3">ARTIST-CURATOR AGREEMENT</p>
              <p className="mb-3">
                THIS ARTIST-CURATOR AGREEMENT (the "Agreement") is entered into by and between: (1)
                THE CURATOR: Vijit Veer Hooda, operating under the initiative "India Contemporary by
                Vijit Veer Hooda" (hereinafter referred to as the "Curator"), and (2) THE ARTIST:{" "}
                {profile.full_name || "[your name]"} (hereinafter referred to as the "Artist"). The
                Curator and the Artist may collectively be referred to as the "Parties" and
                individually as a "Party."
              </p>

              {AGREEMENT_SECTIONS.map((section) => (
                <div key={section.heading} className="mb-3">
                  <p className="font-medium text-ink-primary mb-1">{section.heading}</p>
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="mb-2">
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              <p className="mb-2">
                IN WITNESS WHEREOF, the Parties hereto have executed this Agreement by the Curator's
                acceptance of the Artist's application and the Artist's signature below.
              </p>
              <p>
                Full annexure listing every artwork submitted above forms an integral part of this
                Agreement and is included in the signed PDF generated on submission.
              </p>
            </div>

            <Field label="Type Your Full Legal Name To Sign" value={signedName} onChange={setSignedName} required />
            <label className="flex items-start gap-3 text-sm text-ink-secondary font-sans">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1"
              />
              I have read and agree to the Artist-Curator Agreement above, and confirm the name I
              typed is my legal signature.
            </label>
          </div>
        )}

        <div className="flex items-center justify-between mt-10 pt-8 border-t border-line/50">
          {error && <p className="text-sm text-red-700 font-sans">{error}</p>}
          <div className="flex gap-4 ml-auto">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="border border-line px-6 py-3 text-sm uppercase tracking-widest text-ink-secondary font-sans hover:border-accent transition-colors"
              >
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={goNext}
                disabled={savingProfile}
                className="bg-accent text-white px-6 py-3 text-sm uppercase tracking-widest font-sans hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                {savingProfile ? "Saving..." : "Continue"}
              </button>
            ) : (
              <button
                onClick={handleSubmitApplication}
                disabled={submitting}
                className="bg-accent text-white px-8 py-3 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Sign & Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const AGREEMENT_SECTIONS = [
  {
    heading: "1. Purpose & Scope of the Initiative",
    paragraphs: [
      `The primary purpose of "India Contemporary by Vijit Veer Hooda" is to introduce contemporary Indian artists to the European art market and to help them secure a strong sales pipeline of their artworks in one of the strongest art markets in the world.`,
      `The Curator will introduce the Artist and their artwork to premier online auction platforms in Europe and their own networks and online platforms. The Artist retains ownership of the artwork until a sale is legally completed, while the Curator acts as the exclusive representative for the selected pieces on these digital platforms.`,
      `The purpose of this agreement is to set out the terms between the Curator and Artist in the process of sales of their artwork through the India Contemporary initiative.`,
    ],
  },
  {
    heading: "2. Artwork Submission and Curation Process",
    paragraphs: [
      `Selection: The Curator retains sole discretion to curate and select which submitted artworks/artists will be marketed. After the submission of the portfolio and available works by the Artist, the Curator will select the works and artists to add to the portfolio of India Contemporary. Once the Artist and Curator have agreed to the works to be marketed and the details of minimum reserve price have been agreed to, the artwork(s) will move to the stage of submission.`,
      `Information Provision: The Artist must provide high-resolution photographs, accurate dimensions, medium details, and a minimum reserve price for each artwork they wish to submit to the auction. The Artist must guarantee the authenticity of the artwork by way of an authenticity certificate.`,
      `Exclusivity Lockdown: Once an artwork is officially selected by the Curator, the Artist is strictly prohibited from offering that specific piece to any other buyer, gallery, or third party. This exclusivity remains active until the final auction process for that piece is fully completed and closed. The typical timeline is between 3-4 weeks.`,
    ],
  },
  {
    heading: "3. Auction Period Constraints & Inventory Management",
    paragraphs: [
      `Advance Notification: The Curator will inform the Artist in advance of the exact time period the selected artwork will be live on the online auction platform.`,
      `Possession & Care: The artwork will remain in physical possession of the Artist during the active auction window.`,
      `Sales Freeze: The Artist may not sell, offer, or promote the active artwork to any other prospective buyer while the auction is live. The Artist is legally bound to preserve the artwork in pristine condition during this timeframe.`,
    ],
  },
  {
    heading: "4. Logistics and Shipping Compliance",
    paragraphs: [
      `24-Hour Dispatch: Within 24 hours of receiving a confirmed sale notice and verification of the buyer's funds, the Artist must dispatch the artwork to the designated India Contemporary logistics center in New Delhi.`,
      `Packaging Standards: The Artist is fully responsible for securely rolling the artwork in a heavy-duty protective shipping tube, ensuring it arrives at the logistics center ready for international transit without damage.`,
      `Export & Transit: The India Contemporary logistics center in New Delhi will assume control of, manage, and execute all international shipping arrangements, customs declarations, and legal export formalities required to deliver the artwork to the European buyer.`,
    ],
  },
  {
    heading: "5. Financial Terms and Revenue Split",
    paragraphs: [
      `Curator Commission: The Curator will retain a 30-40% commission on the gross final bid or final sales price achieved for any artwork sold under this agreement — the exact percentage confirmed for your account during review.`,
      `Artist Share: The Artist is entitled to receive the remainder of the gross final sales price, minus any mutually agreed-upon transaction or bank transfer fees.`,
      `Payout Triggers: The Artist's payment will be released only after the India Contemporary logistics center has successfully shipped the artwork and the European buyer has formally received the delivery and confirmed the quality and condition of the artwork. If there are any complaints of quality or discrepancy in the description of the works, the Artist will be solely responsible for the replacement or resolution as advised by the Curator.`,
    ],
  },
  {
    heading: "6. Marketing and Intellectual Property Rights",
    paragraphs: [
      `Promotional Consent: The Artist grants India Contemporary a non-exclusive license to utilize their name, biography, and images of the curated artworks for marketing initiatives.`,
      `Channel Distribution: Marketing materials include, but are not limited to, social media posts, website listings, digital newsletters, print catalogs, and press releases designed to promote the "India Contemporary by Vijit Veer Hooda" initiative.`,
    ],
  },
  {
    heading: "7. Term, Termination, and Jurisdiction",
    paragraphs: [
      `Duration: This Agreement governs all individual artwork submissions made by the Artist to the Curator for a period of one (1) year from the Effective Date, automatically renewing unless terminated in writing by either party with thirty (30) days' notice.`,
      `Breach: If the Artist sells a locked artwork outside of the platform during an active auction window, they will immediately cease to be a part of the initiative and all their future sales cancelled.`,
      `Governing Law: This Agreement shall be governed by and construed in accordance with the laws of India. Any legal disputes arising from this contract will fall under the exclusive jurisdiction of the courts in New Delhi.`,
    ],
  },
];

function Field({ label, value, onChange, required = false, disabled = false }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        type="text"
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <textarea
        required={required}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors resize-none"
      />
    </div>
  );
}
