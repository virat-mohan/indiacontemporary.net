import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import useAdminArtists from "@/hooks/useAdminArtists";
import { artists as directArtists } from "@/data/artists";
import { artworks as staticArtworks } from "@/data/artworks";
import { platformSales } from "@/data/platformSales";
import { Trash2 } from "lucide-react";

function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// The 4 artists directly onboarded through India Contemporary / NIV Art
// Centre, with full bio pages — combines their available inventory
// (artworks.js) and any genuine sold pieces (platformSales.js) into one
// importable artwork list per artist.
function buildDirectRelationRoster() {
  return directArtists.map((a) => {
    const available = staticArtworks
      .filter((w) => w.artistId === a.id)
      .map((w) => ({
        title: w.title || "",
        medium: w.medium || "",
        size: w.dimensions || "",
        year: w.year || "",
        reserve_price: w.price ?? "",
        currency: "EUR",
        image_url: w.image || "",
        description: "",
      }));
    const sold = platformSales
      .filter((s) => s.artistId === a.id)
      .map((s) => ({
        title: s.title || "",
        medium: s.medium || "",
        size: s.size || "",
        year: s.year || "",
        reserve_price: "",
        currency: "EUR",
        image_url: s.image || "",
        description: "Sold through India Contemporary.",
      }));
    return {
      key: a.id,
      full_name: a.name,
      email: `${a.id}@artists.indiacontemporary.net`,
      city: a.city || "",
      bio: a.bio || "",
      statement: a.philosophy || "",
      photo_url: a.image || "",
      artworks: [...available, ...sold],
    };
  });
}

// Artists who sold genuine work through the earlier NIV Art Centre
// collaboration but deliberately have no bio page on the public site —
// lightweight, name-only profiles matching that treatment, with just
// their sold piece(s) attached.
function buildNivRoster() {
  const byKey = {};
  platformSales
    .filter((s) => s.artistId === null)
    .forEach((s) => {
      const key = slugify(s.artistName);
      if (!byKey[key]) {
        byKey[key] = {
          key,
          full_name: s.artistName,
          email: `${key}@artists.indiacontemporary.net`,
          city: "",
          bio: "",
          statement: "",
          photo_url: "",
          artworks: [],
        };
      }
      byKey[key].artworks.push({
        title: s.title || "",
        medium: s.medium || "",
        size: s.size || "",
        year: s.year || "",
        reserve_price: "",
        currency: "EUR",
        image_url: s.image || "",
        description: "Sold through India Contemporary (NIV Art Centre collaboration).",
      });
    });
  return Object.values(byKey);
}

function TextField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-transparent px-3 py-2 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-1.5">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-transparent px-3 py-2 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors resize-none"
      />
    </div>
  );
}

function RosterCard({
  entry,
  alreadyImported,
  busy,
  result,
  expanded,
  onToggleExpand,
  onImport,
  onUpdateEntry,
  onUpdateArtwork,
  onRemoveArtwork,
}) {
  return (
    <div className="border border-line/60">
      <button
        onClick={onToggleExpand}
        className="w-full flex items-start justify-between gap-4 p-5 text-left"
      >
        <div>
          <p className="font-serif text-lg text-ink-primary">{entry.full_name}</p>
          <p className="text-xs text-ink-muted font-sans mt-1">
            {entry.artworks.length} artwork{entry.artworks.length !== 1 ? "s" : ""} ·{" "}
            {expanded ? "Hide details" : "View & edit details"}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {alreadyImported && (
            <span className="text-[11px] uppercase tracking-widest text-ink-muted font-sans">
              Already Imported
            </span>
          )}
          <span className="text-ink-muted text-sm font-sans">{expanded ? "−" : "+"}</span>
        </div>
      </button>

      {!expanded && (
        <div className="px-5 pb-5 flex flex-wrap gap-2">
          {entry.artworks.slice(0, 8).map((w, i) =>
            w.image_url ? (
              <img key={i} src={w.image_url} alt="" className="w-12 h-12 object-cover" />
            ) : null
          )}
        </div>
      )}

      {expanded && (
        <div className="p-5 pt-0 border-t border-line/40 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
            <TextField
              label="Full Name"
              value={entry.full_name}
              onChange={(v) => onUpdateEntry({ full_name: v })}
            />
            <TextField label="City" value={entry.city} onChange={(v) => onUpdateEntry({ city: v })} />
          </div>
          <TextArea label="Bio" value={entry.bio} onChange={(v) => onUpdateEntry({ bio: v })} />
          <TextArea
            label="Artist Statement"
            value={entry.statement}
            onChange={(v) => onUpdateEntry({ statement: v })}
          />
          {entry.photo_url && (
            <img src={entry.photo_url} alt="" className="w-20 h-20 object-cover" />
          )}

          <p className="text-xs uppercase tracking-widest text-ink-muted font-sans pt-2 border-t border-line/40">
            Artworks
          </p>
          {entry.artworks.map((w, i) => (
            <div key={i} className="border border-line/50 p-4 flex flex-col gap-3">
              <div className="flex items-start gap-4">
                {w.image_url && (
                  <img src={w.image_url} alt="" className="w-20 h-20 object-cover flex-shrink-0" />
                )}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TextField
                    label="Title"
                    value={w.title}
                    onChange={(v) => onUpdateArtwork(i, { title: v })}
                  />
                  <TextField
                    label="Medium"
                    value={w.medium}
                    onChange={(v) => onUpdateArtwork(i, { medium: v })}
                  />
                  <TextField
                    label="Size"
                    value={w.size}
                    onChange={(v) => onUpdateArtwork(i, { size: v })}
                  />
                  <TextField
                    label="Year"
                    value={w.year}
                    onChange={(v) => onUpdateArtwork(i, { year: v })}
                  />
                  <TextField
                    label="Reserve Price"
                    value={w.reserve_price}
                    onChange={(v) => onUpdateArtwork(i, { reserve_price: v })}
                  />
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-1.5">
                      Currency
                    </label>
                    <select
                      value={w.currency}
                      onChange={(e) => onUpdateArtwork(i, { currency: e.target.value })}
                      className="w-full border border-line bg-transparent px-3 py-2 text-sm font-sans"
                    >
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveArtwork(i)}
                  className="text-ink-muted hover:text-red-700 flex-shrink-0"
                  aria-label="Remove artwork from import"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <TextArea
                label="Description"
                rows={2}
                value={w.description}
                onChange={(v) => onUpdateArtwork(i, { description: v })}
              />
            </div>
          ))}

          <div className="flex items-center gap-4 pt-2">
            {alreadyImported ? (
              <span className="text-[11px] uppercase tracking-widest text-ink-muted font-sans">
                Already Imported
              </span>
            ) : (
              <button
                onClick={() => onImport(entry)}
                disabled={busy}
                className="bg-accent text-white px-6 py-3 text-xs uppercase tracking-widest font-sans hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                {busy ? "Importing..." : "Import"}
              </button>
            )}
            {result && !result.ok && <p className="text-xs text-red-700 font-sans">{result.error}</p>}
            {result?.ok && <p className="text-xs text-accent font-sans">Imported.</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminImportPage() {
  const { session, isAdmin } = useAuth();
  const { artists: dbArtists, reload } = useAdminArtists(isAdmin);
  const [publishNow, setPublishNow] = useState(true);
  const [busyKey, setBusyKey] = useState(null);
  const [results, setResults] = useState({});
  const [expandedKey, setExpandedKey] = useState(null);

  const [directRoster, setDirectRoster] = useState(buildDirectRelationRoster);
  const [nivRoster, setNivRoster] = useState(buildNivRoster);

  const isImported = (fullName) =>
    dbArtists.some((a) => (a.full_name || "").trim().toLowerCase() === fullName.trim().toLowerCase());

  const updateEntry = (setRoster, key, patch) =>
    setRoster((prev) => prev.map((e) => (e.key === key ? { ...e, ...patch } : e)));

  const updateArtwork = (setRoster, key, index, patch) =>
    setRoster((prev) =>
      prev.map((e) =>
        e.key === key
          ? { ...e, artworks: e.artworks.map((a, i) => (i === index ? { ...a, ...patch } : a)) }
          : e
      )
    );

  const removeArtwork = (setRoster, key, index) =>
    setRoster((prev) =>
      prev.map((e) =>
        e.key === key ? { ...e, artworks: e.artworks.filter((_, i) => i !== index) } : e
      )
    );

  const importEntry = async (entry) => {
    setBusyKey(entry.key);
    setResults((r) => ({ ...r, [entry.key]: null }));
    try {
      const res = await fetch("/api/admin/create-artist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          profile: {
            full_name: entry.full_name,
            email: entry.email,
            city: entry.city,
            bio: entry.bio,
            statement: entry.statement,
            photo_url: entry.photo_url,
          },
          artworks: entry.artworks,
          publish: publishNow,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed.");
      setResults((r) => ({ ...r, [entry.key]: { ok: true } }));
      await reload();
    } catch (err) {
      setResults((r) => ({ ...r, [entry.key]: { ok: false, error: err.message } }));
    } finally {
      setBusyKey(null);
    }
  };

  const renderSection = (roster, setRoster) =>
    roster.map((entry) => (
      <RosterCard
        key={entry.key}
        entry={entry}
        alreadyImported={isImported(entry.full_name)}
        busy={busyKey === entry.key}
        result={results[entry.key]}
        expanded={expandedKey === entry.key}
        onToggleExpand={() => setExpandedKey((k) => (k === entry.key ? null : entry.key))}
        onImport={importEntry}
        onUpdateEntry={(patch) => updateEntry(setRoster, entry.key, patch)}
        onUpdateArtwork={(i, patch) => updateArtwork(setRoster, entry.key, i, patch)}
        onRemoveArtwork={(i) => removeArtwork(setRoster, entry.key, i)}
      />
    ));

  return (
    <AdminLayout>
      <h1 className="font-serif text-3xl font-light text-ink-primary tracking-tight mb-2">
        Import Existing Roster
      </h1>
      <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed mb-6 max-w-2xl">
        Brings the artists and artworks already live on the public site into the admin database as
        records, matched by name against artists already imported. Click an artist to view and edit
        every field — bio, statement, and each artwork's medium, size, year, price, and description —
        before importing. Publishing is on by default so imported records go live immediately —
        uncheck it to import as drafts instead.
      </p>
      <label className="flex items-center gap-3 text-sm text-ink-secondary font-sans mb-10">
        <input type="checkbox" checked={publishNow} onChange={(e) => setPublishNow(e.target.checked)} />
        Publish imported artists &amp; artworks to the live site immediately
      </label>

      <section className="mb-14">
        <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-4 pb-2 border-b border-line/40">
          Direct Relation — Full Profiles
        </p>
        <div className="flex flex-col gap-4">{renderSection(directRoster, setDirectRoster)}</div>
      </section>

      <section>
        <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-4 pb-2 border-b border-line/40">
          NIV Collaboration — Name Only
        </p>
        <div className="flex flex-col gap-4">{renderSection(nivRoster, setNivRoster)}</div>
      </section>
    </AdminLayout>
  );
}
