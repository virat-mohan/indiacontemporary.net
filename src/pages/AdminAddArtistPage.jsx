import React from "react";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/components/AdminLayout";
import AdminManualArtistForm from "@/components/AdminManualArtistForm";
import useAdminArtists from "@/hooks/useAdminArtists";

export default function AdminAddArtistPage() {
  const { session, isAdmin } = useAuth();
  const { artists, reload } = useAdminArtists(isAdmin);

  return (
    <AdminLayout>
      <h1 className="font-serif text-3xl font-light text-ink-primary tracking-tight mb-2">
        Add Artist Manually
      </h1>
      <p className="text-sm text-ink-muted font-sans mb-10">
        Create a new artist account and profile directly, or add artworks to an existing artist's
        collection.
      </p>
      <AdminManualArtistForm session={session} onCreated={reload} existingArtists={artists} />
    </AdminLayout>
  );
}
