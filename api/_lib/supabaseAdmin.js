import { createClient } from "@supabase/supabase-js";

// Server-only client using the service role key, which bypasses Row
// Level Security entirely. Never import this from src/ (browser) code —
// it lives under /api so Vite never bundles it into the client build.
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set in this environment."
    );
  }
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Verifies the bearer token from an incoming request and returns the
// authenticated user, or null. Used to check "is this caller an admin?"
// before letting an /api/admin/* route do anything.
export async function getUserFromRequest(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return null;

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

export async function requireAdmin(req, res) {
  const user = await getUserFromRequest(req);
  if (!user?.email) {
    res.status(401).json({ error: "Not signed in." });
    return null;
  }
  const admin = getSupabaseAdmin();
  const { data: adminRow } = await admin
    .from("admins")
    .select("email")
    .eq("email", user.email)
    .maybeSingle();
  if (!adminRow) {
    res.status(403).json({ error: "Not an admin." });
    return null;
  }
  return user;
}
