import { useEffect } from "react";

// Scrolls to the element matching the URL hash (e.g. "/#featured") after
// route changes and content renders, instead of the default top-of-page
// jump. Falls back silently if the target isn't found yet.
export default function useHashScroll(location) {
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);
}
