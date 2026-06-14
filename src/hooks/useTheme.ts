import { useEffect } from "react";

export function useTheme() {
  useEffect(() => {
    // URL Parameter (e.g. ?theme=olympics) takes priority on load
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const urlTheme = searchParams.get("theme");

    if (urlTheme) {
      document.documentElement.setAttribute("data-theme", urlTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "rr2"); // Fallback
    }
  }, []);
}
