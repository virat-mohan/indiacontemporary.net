import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const STATUS_LABEL = {
  draft: "Draft (not yet submitted)",
  submitted: "Awaiting Review",
  approved: "Approved",
  rejected: "Rejected",
};

export default function AdminPage() {
  const { session, user, isAdmin, loading, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [artworksByArtist, setArtworksByArtist] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [commissionDraft, setCommissionDraft] = useState({});
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !session) navigate("/apply");
  }, [loading, session, navigate]);

  const loadData = async () => {
    setLoadingData(true);
    const { data: profiles } = await supabase
      .from("artist_profiles")
      .select("*")
      .order("submitted_at", { ascending: false, nullsFirst: false });
    setArtists(profiles || []);

    const { data: allArtworks } = await supabase.from("artworks").select("*");
    const grouped = {};
    (allArtworks || []).forEach((a) => {
      grouped[a.artist_id] = grouped[a.artist_id] || [];
      grouped[a.artist_id].push(a);
    });
    setArtworksByArtist(grouped);
    setLoadingData(false);
  };

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);

  if (!isSupabaseConfigured) {
    return (
      <div className="pt-40 pb-24 px-6 text-center font-sans text-ink-secondary">
        Admin dashboard isn't connected yet — this page needs a Supabase project
        configured.
      </div>
    );
  }

  if (loading) {
    return <div className="pt-40 pb-24 px-6 text-center font-sans text-ink-muted">Loading…</div>;
  }

  if (session && !isAdmin) {
    return (
      <div className="pt-40 pb-24 px-6 text-center font-sans text-ink-secondary">
        {user?.email} isn't on the admin list.
      </div>
    );
  }

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

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-serif text-3xl font-light text-ink-primary tracking-tight mb-2">
          Artist Applications
        </h1>
        <p className="text-sm text-ink-muted font-sans mb-10">Signed in as {user?.email}</p>

        {error && <p className="text-sm text-red-700 font-sans mb-6">{error}</p>}

        {loadingData ? (
          <p className="font-sans text-ink-muted">Loading…</p>
        ) : artists.length === 0 ? (
          <p className="font-sans text-ink-muted">No applications yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {artists.map((artist) => {
              const works = artworksByArtist[artist.id] || [];
              const isOpen = expanded === artist.id;
              return (
                <div key={artist.id} className="border border-line/60">
                  <button
                    onClick={() => setExpanded(isOpen ? null : artist.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div>
                      <p className="font-serif text-xl text-ink-primary">
                        {artist.full_name || artist.email}
                      </p>
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-sans text-ink-secondary">
                        <p>Email: {artist.email}</p>
                        <p>Phone: {artist.phone || "—"}</p>
                        <p>City: {artist.city || "—"}</p>
                        <p>Instagram: {artist.instagram || "—"}</p>
                      </div>
                      {artist.bio && <p className="text-sm text-ink-secondary font-sans leading-relaxed">{artist.bio}</p>}

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {works.map((w) => (
                          <div key={w.id}>
                            {w.image_url && (
                              <img src={w.image_url} alt="" className="aspect-square object-cover mb-2" />
                            )}
                            <p className="text-xs text-ink-primary font-sans">{w.title || "Untitled"}</p>
                            <p className="text-xs text-ink-muted font-sans">
                              {[w.medium, w.size, w.year].filter(Boolean).join(" · ")}
                            </p>
                            <button
                              onClick={() => togglePublishArtwork(w)}
                              disabled={busy === w.id}
                              className="text-[10px] uppercase tracking-widest mt-1 underline underline-offset-2 text-ink-muted hover:text-accent"
                            >
                              {w.published ? "Unpublish" : "Publish"}
                            </button>
                          </div>
                        ))}
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
                              onChange={(e) =>
                                setCommissionDraft((d) => ({ ...d, [artist.id]: e.target.value }))
                              }
                              className="w-20 border border-line bg-transparent px-3 py-2 text-sm font-sans"
                            />
                            <button
                              onClick={() => handleSaveCommission(artist.id)}
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
                              onClick={() => handleApprove(artist.id)}
                              disabled={busy === artist.id}
                              className="bg-accent text-white px-6 py-3 text-xs uppercase tracking-widest font-sans hover:bg-accent-hover transition-colors disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(artist.id)}
                              disabled={busy === artist.id}
                              className="border border-line px-6 py-3 text-xs uppercase tracking-widest font-sans hover:border-accent transition-colors disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {artist.status === "approved" && (
                          <button
                            onClick={() => togglePublishArtist(artist)}
                            disabled={busy === artist.id}
                            className="border border-line px-6 py-3 text-xs uppercase tracking-widest font-sans hover:border-accent transition-colors disabled:opacity-50"
                          >
                            {artist.published ? "Unpublish From Site" : "Publish To Site"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
