import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Upload } from "lucide-react";

const emptyProfile = {
  full_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  instagram: "",
  website: "",
  bio: "",
  statement: "",
  photo_url: "",
  commission_percent: "",
};

const emptyArtwork = () => ({
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

async function uploadFile(bucket, folderHint, file) {
  const ext = file.name.split(".").pop();
  const path = `${folderHint}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export default function AdminManualArtistForm({ session, onCreated }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(emptyProfile);
  const [artworks, setArtworks] = useState([emptyArtwork()]);
  const [publishNow, setPublishNow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateArtwork = (i, patch) =>
    setArtworks((prev) => prev.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile("artist-photos", "manual-uploads", file);
      setProfile((p) => ({ ...p, photo_url: url }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleArtworkImage = async (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateArtwork(i, { _uploading: true });
    try {
      const url = await uploadFile("artwork-images", "manual-uploads", file);
      updateArtwork(i, { image_url: url, _uploading: false });
    } catch (err) {
      setError(err.message);
      updateArtwork(i, { _uploading: false });
    }
  };

  const reset = () => {
    setProfile(emptyProfile);
    setArtworks([emptyArtwork()]);
    setPublishNow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!profile.full_name || !profile.email) {
      setError("Name and email are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/create-artist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          profile: {
            ...profile,
            commission_percent: profile.commission_percent === "" ? null : Number(profile.commission_percent),
          },
          artworks,
          publish: publishNow,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create the artist.");
      reset();
      setOpen(false);
      onCreated?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-line/60 mb-10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <p className="font-serif text-xl text-ink-primary">Add Artist Manually</p>
        <span className="text-ink-muted text-sm font-sans">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="p-6 pt-0 border-t border-line/40 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TextField label="Full Name" value={profile.full_name} onChange={(v) => setProfile((p) => ({ ...p, full_name: v }))} required />
            <TextField label="Email" type="email" value={profile.email} onChange={(v) => setProfile((p) => ({ ...p, email: v }))} required />
            <TextField label="Phone" value={profile.phone} onChange={(v) => setProfile((p) => ({ ...p, phone: v }))} />
            <TextField label="City" value={profile.city} onChange={(v) => setProfile((p) => ({ ...p, city: v }))} />
            <TextField label="Instagram" value={profile.instagram} onChange={(v) => setProfile((p) => ({ ...p, instagram: v }))} />
            <TextField label="Website" value={profile.website} onChange={(v) => setProfile((p) => ({ ...p, website: v }))} />
            <TextField label="Address" value={profile.address} onChange={(v) => setProfile((p) => ({ ...p, address: v }))} />
            <TextField
              label="Curator Commission %"
              value={profile.commission_percent}
              onChange={(v) => setProfile((p) => ({ ...p, commission_percent: v }))}
            />
          </div>
          <TextArea label="Bio" value={profile.bio} onChange={(v) => setProfile((p) => ({ ...p, bio: v }))} />
          <TextArea label="Artist Statement" value={profile.statement} onChange={(v) => setProfile((p) => ({ ...p, statement: v }))} />
          <div>
            <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">Photo</label>
            {profile.photo_url && <img src={profile.photo_url} alt="" className="w-20 h-20 object-cover mb-2" />}
            <label className="inline-flex items-center gap-2 border border-line px-4 py-2 text-sm font-sans text-ink-secondary cursor-pointer hover:border-accent transition-colors w-fit">
              <Upload size={14} /> Upload Photo
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>

          <p className="text-xs uppercase tracking-widest text-ink-muted font-sans pt-4 border-t border-line/40">
            Artworks
          </p>
          {artworks.map((art, i) => (
            <div key={i} className="border border-line/50 p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-ink-muted font-sans">Piece {i + 1}</p>
                {artworks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setArtworks((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-ink-muted hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField label="Title" value={art.title} onChange={(v) => updateArtwork(i, { title: v })} />
                <TextField label="Medium" value={art.medium} onChange={(v) => updateArtwork(i, { medium: v })} />
                <TextField label="Size" value={art.size} onChange={(v) => updateArtwork(i, { size: v })} />
                <TextField label="Year" value={art.year} onChange={(v) => updateArtwork(i, { year: v })} />
                <TextField label="Reserve Price" value={art.reserve_price} onChange={(v) => updateArtwork(i, { reserve_price: v })} />
                <div>
                  <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">Currency</label>
                  <select
                    value={art.currency}
                    onChange={(e) => updateArtwork(i, { currency: e.target.value })}
                    className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans"
                  >
                    <option value="EUR">EUR</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>
              <TextArea label="Description" value={art.description} onChange={(v) => updateArtwork(i, { description: v })} />
              <div>
                {art.image_url && <img src={art.image_url} alt="" className="w-24 h-24 object-cover mb-2" />}
                <label className="inline-flex items-center gap-2 border border-line px-4 py-2 text-sm font-sans text-ink-secondary cursor-pointer hover:border-accent transition-colors w-fit">
                  <Upload size={14} /> {art._uploading ? "Uploading..." : "Upload Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleArtworkImage(i, e)} />
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setArtworks((prev) => [...prev, emptyArtwork()])}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans w-fit"
          >
            <Plus size={15} /> Add Another Painting
          </button>

          <label className="flex items-center gap-3 text-sm text-ink-secondary font-sans pt-4 border-t border-line/40">
            <input type="checkbox" checked={publishNow} onChange={(e) => setPublishNow(e.target.checked)} />
            Publish to the live site immediately
          </label>

          {error && <p className="text-sm text-red-700 font-sans">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50 w-fit"
          >
            {submitting ? "Creating..." : "Create Artist"}
          </button>
        </form>
      )}
    </div>
  );
}

function TextField({ label, value, onChange, required = false, type = "text" }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors resize-none"
      />
    </div>
  );
}
