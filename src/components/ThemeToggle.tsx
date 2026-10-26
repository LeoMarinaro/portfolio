"use client";

// Client Component: it reacts to clicks and writes to localStorage
import { useLayoutEffect } from "react";
import { applyInitialTheme, THEME_STORAGE_KEY } from "@/lib/theme";

type Props = {
  label: string;
};

export default function ThemeToggle({ label }: Props) {
  // In development, React's Strict Mode remounts components and clears the
  // data-theme attribute the inline script set on <html>; this puts it back.
  // In production it just re-applies the same value.
  useLayoutEffect(() => {
    applyInitialTheme(THEME_STORAGE_KEY);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked: the theme still changes, it just isn't remembered
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="rounded p-1.5 text-muted transition-colors hover:text-accent"
    >
      {/* Icons swap with CSS (dark: variant) instead of React state, so the
          server HTML never depends on the visitor's theme (no hydration mismatch) */}
      <svg
        className="size-5 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        {/* Moon: shown in light mode */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
      <svg
        className="hidden size-5 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        {/* Sun: shown in dark mode */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
    </button>
  );
}
