import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const SIDEBAR_LINKS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/add-artist", label: "Add Artist Manually" },
];

export default function AdminLayout({ children }) {
  const { session, user, isAdmin, loading, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !session) navigate("/admin/login");
  }, [loading, session, navigate]);

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

  if (!session) return null;

  return (
    <div className="pt-24 md:pt-28 px-6 md:px-12 lg:px-24 pb-24">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        <aside className="md:sticky md:top-28 md:self-start">
          <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-1">Admin</p>
          <p className="text-sm text-ink-secondary font-sans mb-6 truncate">{user?.email}</p>
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible border-b md:border-b-0 border-line/40 pb-3 md:pb-0">
            {SIDEBAR_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex-shrink-0 px-3 py-2.5 text-sm font-sans transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-ink-secondary hover:bg-bg-alt hover:text-ink-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
