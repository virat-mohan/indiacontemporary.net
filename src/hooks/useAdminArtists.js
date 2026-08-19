import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Shared data-loading for admin pages: every artist profile plus their
// artworks, grouped by artist_id. `enabled` gates the initial fetch so
// pages can wait until the caller confirms the viewer is an admin.
export default function useAdminArtists(enabled) {
  const [artists, setArtists] = useState([]);
  const [artworksByArtist, setArtworksByArtist] = useState({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
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
    setLoading(false);
  }, []);

  useEffect(() => {
    if (enabled) load();
  }, [enabled, load]);

  return { artists, artworksByArtist, loading, reload: load };
}
