import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ApplyPage() {
  const { signUp, signIn, isSupabaseConfigured, session } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (session) {
    navigate("/apply/onboarding", { replace: true });
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary max-w-md mx-auto">
          Artist applications aren't connected yet — this page needs a Supabase
          project configured before it can accept sign-ups.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { error: authError } =
        mode === "signup" ? await signUp(email, password) : await signIn(email, password);
      if (authError) {
        setError(authError.message);
      } else {
        navigate("/apply/onboarding");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-md mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans text-center">
          Join The Initiative
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-ink-primary tracking-tight mb-8 text-center">
          {mode === "signup" ? "Create Your Artist Account" : "Sign In"}
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
              minLength={8}
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
            {submitting ? "Please wait..." : mode === "signup" ? "Create Account" : "Sign In"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signup" ? "login" : "signup")}
          className="mt-6 text-sm text-ink-secondary hover:text-accent transition-colors font-sans underline underline-offset-4 block mx-auto"
        >
          {mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}
