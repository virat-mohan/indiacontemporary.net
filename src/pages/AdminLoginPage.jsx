import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { signIn, isSupabaseConfigured, session } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (session) {
    navigate("/admin", { replace: true });
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary max-w-md mx-auto">
          Admin sign-in isn't connected yet — this page needs a Supabase project configured.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { error: authError } = await signIn(email, password);
      if (authError) {
        setError(authError.message);
      } else {
        navigate("/admin");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-md mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans text-center">
          India Contemporary
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-ink-primary tracking-tight mb-8 text-center">
          Admin Sign In
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {error && <p className="text-sm text-red-700 font-sans">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
