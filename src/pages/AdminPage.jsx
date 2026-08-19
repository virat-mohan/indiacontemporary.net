import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/AdminLayout";
import useAdminArtists from "@/hooks/useAdminArtists";
import { X, Upload } from "lucide-react";

async function uploadFile(bucket, folderHint, file) {
  const ext = file.name.split(".").pop();
  const path = `${folderHint}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

const STATUS_LABEL = {
  draft: "Draft (not yet submitted)",
  submitted: "Awaiting Review",
  approved: "Approved",
  rejected: "Rejected",
};

function ArtistCard({
  artist,
  works,
  isOpen,
  onToggle,
  editingArtwork,
  artworkDraft,
  setArtworkDraft,
  busy,
  commissionDraft,
  setCommissionDraft,
  onStartEditArtwork,
  onCancelEditArtwork,
  onSaveArtwork,
  onTogglePublishArtwork,
  onSaveCommission,
  onApprove,
  onReject,
  onTogglePublishArtist,
  onDelete,
  onZoom,
  uploadingPhoto,
  onUploadPhoto,
}) {
  return (
    <div className="border border-line/60">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-6 text-left">
        <div>
          <p className="font-serif text-xl text-ink-primary">{artist.full_name || artist.email}</p>
          <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mt-1">
            {STATUS_LABEL[artist.status]} · {works.length} artwork
            {works.length !== 1 ? "s" : ""}
            {artist.published ? " · Published" : ""}
          </p>
        </div>
        <span className="text-ink-muted text-sm font-sans">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="p-6 pt-0 flex flex-col gap-6 border-t border-line/40">
          <div className="flex items-center gap-4">
            {artist.photo_url && (
              <button
                type="button"
                onClick={() => onZoom(artist.photo_url)}
                className="block w-20 h-20 flex-shrink-0 cursor-zoom-in"
                aria-label="View larger photo"
              >
                <img src={artist.photo_url} alt="" className="w-full h-full object-cover" />
              </button>
            )}
            <label className="inline-flex items-center gap-2 border border-line px-4 py-2 text-sm font-sans text-ink-secondary cursor-pointer hover:border-accent transition-colors w-fit">
              <Upload size={14} /> {uploadingPhoto ? "Uploading..." : artist.photo_url ? "Replace Photo" : "Add Photo"}
              <input type="file" accept="image/*" className="hidden" onChange={onUploadPhoto} />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-sans text-ink-secondary">
            <p>Email: {artist.email}</p>
            <p>Phone: {artist.phone || "—"}</p>
            <p>City: {artist.city || "—"}</p>
            <p>Instagram: {artist.instagram || "—"}</p>
          </div>
          {artist.bio && <p className="text-sm text-ink-secondary font-sans leading-relaxed">{artist.bio}</p>}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {works.map((w) =>
              editingArtwork === w.id ? (
                <div key={w.id} className="border border-line/50 p-3 flex flex-col gap-2 col-span-2">
                  {w.image_url && (
                    <button
                      type="button"
                      onClick={() => onZoom(w.image_url)}
                      className="block aspect-square mb-1 cursor-zoom-in"
                      aria-label="View larger image"
                    >
                      <img src={w.image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  )}
                  <input
                    placeholder="Title"
                    value={artworkDraft.title}
                    onChange={(e) => setArtworkDraft((d) => ({ ...d, title: e.target.value }))}
                    className="border border-line bg-transparent px-2 py-1.5 text-xs font-sans"
                  />
                  <input
                    placeholder="Medium"
                    value={artworkDraft.medium}
                    onChange={(e) => setArtworkDraft((d) => ({ ...d, medium: e.target.value }))}
                    className="border border-line bg-transparent px-2 py-1.5 text-xs font-sans"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      placeholder="Size"
                      value={artworkDraft.size}
                      onChange={(e) => setArtworkDraft((d) => ({ ...d, size: e.target.value }))}
                      className="border border-line bg-transparent px-2 py-1.5 text-xs font-sans"
                    />
                    <input
                      placeholder="Year"
                      value={artworkDraft.year}
                      onChange={(e) => setArtworkDraft((d) => ({ ...d, year: e.target.value }))}
                      className="border border-line bg-transparent px-2 py-1.5 text-xs font-sans"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      placeholder="Reserve price"
                      value={artworkDraft.reserve_price}
                      onChange={(e) => setArtworkDraft((d) => ({ ...d, reserve_price: e.target.value }))}
                      className="border border-line bg-transparent px-2 py-1.5 text-xs font-sans"
                    />
                    <select
                      value={artworkDraft.currency}
                      onChange={(e) => setArtworkDraft((d) => ({ ...d, currency: e.target.value }))}
                      className="border border-line bg-transparent px-2 py-1.5 text-xs font-sans"
                    >
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => onSaveArtwork(w.id)}
                      disabled={busy === w.id}
                      className="bg-accent text-white px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={onCancelEditArtwork}
                      className="border border-line px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div key={w.id}>
                  {w.image_url && (
                    <button
                      type="button"
                      onClick={() => onZoom(w.image_url)}
                      className="block aspect-square mb-2 cursor-zoom-in"
                      aria-label="View larger image"
                    >
                      <img src={w.image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  )}
                  <p className="text-xs text-ink-primary font-sans">{w.title || "Untitled"}</p>
                  <p className="text-xs text-ink-muted font-sans">
                    {[w.medium, w.size, w.year].filter(Boolean).join(" · ")}
                  </p>
                  <div className="flex gap-3 mt-1">
                    <button
                      onClick={() => onStartEditArtwork(w)}
                      className="text-[10px] uppercase tracking-widest underline underline-offset-2 text-ink-muted hover:text-accent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onTogglePublishArtwork(w)}
                      disabled={busy === w.id}
                      className="text-[10px] uppercase tracking-widest underline underline-offset-2 text-ink-muted hover:text-accent"
                    >
                      {w.published ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex flex-wrap items-end gap-4 pt-4 border-t border-line/40">
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Curator Commission %
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  placeholder={artist.commission_percent ?? "35"}
                  value={commissionDraft[artist.id] ?? ""}
                  onChange={(e) => setCommissionDraft((d) => ({ ...d, [artist.id]: e.target.value }))}
                  className="w-20 border border-line bg-transparent px-3 py-2 text-sm font-sans"
                />
                <button
                  onClick={() => onSaveCommission(artist.id)}
                  disabled={busy === artist.id}
                  className="border border-line px-3 py-2 text-xs uppercase tracking-widest font-sans hover:border-accent"
                >
                  Save
                </button>
              </div>
            </div>

            {artist.status === "submitted" && (
              <>
                <button
                  onClick={() => onApprove(artist.id)}
                  disabled={busy === artist.id}
                  className="bg-accent text-white px-6 py-3 text-xs uppercase tracking-widest font-sans hover:bg-accent-hover transition-colors disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => onReject(artist.id)}
                  disabled={busy === artist.id}
                  className="border border-line px-6 py-3 text-xs uppercase tracking-widest font-sans hover:border-accent transition-colors disabled:opacity-50"
                >
                  Reject
                </button>
              </>
            )}

            {artist.status === "approved" && (
              <button
                onClick={() => onTogglePublishArtist(artist)}
                disabled={busy === artist.id}
                className="border border-line px-6 py-3 text-xs uppercase tracking-widest font-sans hover:border-accent transition-colors disabled:opacity-50"
              >
                {artist.published ? "Unpublish From Site" : "Publish To Site"}
              </button>
            )}

            <button
              onClick={() => onDelete(artist)}
              disabled={busy === artist.id}
              className="ml-auto text-xs uppercase tracking-widest font-sans text-red-700 underline underline-offset-2 hover:text-red-900 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { session, user, isAdmin } = useAuth();
  const { artists, artworksByArtist, loading: loadingData, reload: loadData } = useAdminArtists(isAdmin);
  const [expanded, setExpanded] = useState(null);
  const [commissionDraft, setCommissionDraft] = useState({});
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [artworkDraft, setArtworkDraft] = useState({});
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [uploadingPhotoFor, setUploadingPhotoFor] = useState(null);

  const callApi = async (path, body) => {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed.");
    return data;
  };

  const handleApprove = async (artistId) => {
    setBusy(artistId);
    setError("");
    try {
      await callApi("/api/admin/approve", { artistId });
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(null);
    }
  };

  const handleReject = async (artistId) => {
    setBusy(artistId);
    setError("");
    try {
      await callApi("/api/admin/reject", { artistId });
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async (artist) => {
    const label = artist.full_name || artist.email;
    if (!window.confirm(`Remove ${label} and all their artworks permanently? This can't be undone.`)) {
      return;
    }
    setBusy(artist.id);
    setError("");
    try {
      await callApi("/api/admin/delete-artist", { artistId: artist.id });
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(null);
    }
  };

  const handleSaveCommission = async (artistId) => {
    const value = commissionDraft[artistId];
    if (value === undefined || value === "") return;
    setBusy(artistId);
    setError("");
    const { error: err } = await supabase
      .from("artist_profiles")
      .update({ commission_percent: Number(value) })
      .eq("id", artistId);
    setBusy(null);
    if (err) setError(err.message);
    else await loadData();
  };

  const togglePublishArtist = async (artist) => {
    setBusy(artist.id);
    const { error: err } = await supabase
      .from("artist_profiles")
      .update({ published: !artist.published })
      .eq("id", artist.id);
    setBusy(null);
    if (err) setError(err.message);
    else await loadData();
  };

  const togglePublishArtwork = async (artwork) => {
    setBusy(artwork.id);
    const { error: err } = await supabase
      .from("artworks")
      .update({ published: !artwork.published })
      .eq("id", artwork.id);
    setBusy(null);
    if (err) setError(err.message);
    else await loadData();
  };

  const startEditArtwork = (artwork) => {
    setEditingArtwork(artwork.id);
    setArtworkDraft({
      title: artwork.title || "",
      medium: artwork.medium || "",
      size: artwork.size || "",
      year: artwork.year || "",
      reserve_price: artwork.reserve_price ?? "",
      currency: artwork.currency || "EUR",
    });
  };

  const handleUploadPhoto = async (artist, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhotoFor(artist.id);
    setError("");
    try {
      const url = await uploadFile("artist-photos", artist.id, file);
      const { error: err } = await supabase
        .from("artist_profiles")
        .update({ photo_url: url })
        .eq("id", artist.id);
      if (err) throw err;
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingPhotoFor(null);
    }
  };

  const handleSaveArtwork = async (artworkId) => {
    setBusy(artworkId);
    const { error: err } = await supabase
      .from("artworks")
      .update({
        title: artworkDraft.title || null,
        medium: artworkDraft.medium || null,
        size: artworkDraft.size || null,
        year: artworkDraft.year ? Number(artworkDraft.year) : null,
        reserve_price: artworkDraft.reserve_price !== "" ? Number(artworkDraft.reserve_price) : null,
        currency: artworkDraft.currency || "EUR",
      })
      .eq("id", artworkId);
    setBusy(null);
    if (err) {
      setError(err.message);
    } else {
      setEditingArtwork(null);
      await loadData();
    }
  };

  const pending = artists.filter((a) => a.status === "submitted");
  const others = artists.filter((a) => a.status !== "submitted");

  const cardProps = {
    editingArtwork,
    artworkDraft,
    setArtworkDraft,
    busy,
    commissionDraft,
    setCommissionDraft,
    onStartEditArtwork: startEditArtwork,
    onCancelEditArtwork: () => setEditingArtwork(null),
    onSaveArtwork: handleSaveArtwork,
    onTogglePublishArtwork: togglePublishArtwork,
    onSaveCommission: handleSaveCommission,
    onApprove: handleApprove,
    onReject: handleReject,
    onTogglePublishArtist: togglePublishArtist,
    onDelete: handleDelete,
    onZoom: setLightboxSrc,
  };

  return (
    <AdminLayout>
      <h1 className="font-serif text-3xl font-light text-ink-primary tracking-tight mb-2">Dashboard</h1>
      <p className="text-sm text-ink-muted font-sans mb-10">Signed in as {user?.email}</p>

      {error && <p className="text-sm text-red-700 font-sans mb-6">{error}</p>}

      {loadingData ? (
        <p className="font-sans text-ink-muted">Loading…</p>
      ) : (
        <>
          <section className="mb-14">
            <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-4 pb-2 border-b border-line/40">
              Pending Applications
            </p>
            {pending.length === 0 ? (
              <p className="font-sans text-ink-muted text-sm">No applications awaiting review.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {pending.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    works={artworksByArtist[artist.id] || []}
                    isOpen={expanded === artist.id}
                    onToggle={() => setExpanded(expanded === artist.id ? null : artist.id)}
                    uploadingPhoto={uploadingPhotoFor === artist.id}
                    onUploadPhoto={(e) => handleUploadPhoto(artist, e)}
                    {...cardProps}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-4 pb-2 border-b border-line/40">
              All Artists
            </p>
            {others.length === 0 ? (
              <p className="font-sans text-ink-muted text-sm">No other artists yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {others.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    works={artworksByArtist[artist.id] || []}
                    isOpen={expanded === artist.id}
                    onToggle={() => setExpanded(expanded === artist.id ? null : artist.id)}
                    uploadingPhoto={uploadingPhotoFor === artist.id}
                    onUploadPhoto={(e) => handleUploadPhoto(artist, e)}
                    {...cardProps}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-8 cursor-zoom-out"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-white/70"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </AdminLayout>
  );
}
