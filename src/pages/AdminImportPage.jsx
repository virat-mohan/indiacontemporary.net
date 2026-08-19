import React, { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import useAdminArtists from "@/hooks/useAdminArtists";
import { artists as directArtists } from "@/data/artists";
import { artworks as staticArtworks } from "@/data/artworks";
import { platformSales } from "@/data/platformSales";

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

function RosterCard({ entry, alreadyImported, busy, result, onImport }) {
  return (
    <div className="border border-line/60 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-serif text-lg text-ink-primary">{entry.full_name}</p>
          <p className="text-xs text-ink-muted font-sans mt-1">
            {entry.artworks.length} artwork{entry.artworks.length !== 1 ? "s" : ""}
          </p>
        </div>
        {alreadyImported ? (
          <span className="text-[11px] uppercase tracking-widest text-ink-muted font-sans flex-shrink-0 pt-1">
            Already Imported
          </span>
        ) : (
          <button
            onClick={() => onImport(entry)}
            disabled={busy}
            className="border border-line px-4 py-2 text-[11px] uppercase tracking-widest font-sans hover:border-accent transition-colors disabled:opacity-50 flex-shrink-0"
          >
            {busy ? "Importing..." : "Import"}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {entry.artworks.slice(0, 6).map((w, i) =>
          w.image_url ? (
            <img key={i} src={w.image_url} alt="" className="w-12 h-12 object-cover" />
          ) : null
        )}
      </div>
      {result && !result.ok && (
        <p className="text-xs text-red-700 font-sans">{result.error}</p>
      )}
      {result?.ok && <p className="text-xs text-accent font-sans">Imported.</p>}
    </div>
  );
}

export default function AdminImportPage() {
  const { session, isAdmin } = useAuth();
  const { artists: dbArtists, reload } = useAdminArtists(isAdmin);
  const [publishNow, setPublishNow] = useState(false);
  const [busyKey, setBusyKey] = useState(null);
  const [results, setResults] = useState({});

  const directRoster = useMemo(buildDirectRelationRoster, []);
  const nivRoster = useMemo(buildNivRoster, []);

  const isImported = (fullName) =>
    dbArtists.some((a) => (a.full_name || "").trim().toLowerCase() === fullName.trim().toLowerCase());

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

  return (
    <AdminLayout>
      <h1 className="font-serif text-3xl font-light text-ink-primary tracking-tight mb-2">
        Import Existing Roster
      </h1>
      <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed mb-6 max-w-2xl">
        Brings the artists and artworks already live on the public site into the admin database as
        records, matched by name against artists already imported. Imports are saved unpublished by
        default — they won't change anything visitors see unless you publish them from the
        dashboard, or check the box below first.
      </p>
      <label className="flex items-center gap-3 text-sm text-ink-secondary font-sans mb-10">
        <input type="checkbox" checked={publishNow} onChange={(e) => setPublishNow(e.target.checked)} />
        Publish imported artists &amp; artworks to the live site immediately
      </label>

      <section className="mb-14">
        <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-4 pb-2 border-b border-line/40">
          Direct Relation — Full Profiles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {directRoster.map((entry) => (
            <RosterCard
              key={entry.key}
              entry={entry}
              alreadyImported={isImported(entry.full_name)}
              busy={busyKey === entry.key}
              result={results[entry.key]}
              onImport={importEntry}
            />
          ))}
        </div>
      </section>

      <section>
        <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-4 pb-2 border-b border-line/40">
          NIV Collaboration — Name Only
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nivRoster.map((entry) => (
            <RosterCard
              key={entry.key}
              entry={entry}
              alreadyImported={isImported(entry.full_name)}
              busy={busyKey === entry.key}
              result={results[entry.key]}
              onImport={importEntry}
            />
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}
