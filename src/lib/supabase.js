import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// During local development before Supabase is configured, avoid crashing
// the whole app on import — auth/data calls will just fail until the env
// vars are set (see .env.example).
export const supabase =
  url && anonKey
    ? createClient(url, anonKey)
    : null;

export const isSupabaseConfigured = Boolean(supabase);
