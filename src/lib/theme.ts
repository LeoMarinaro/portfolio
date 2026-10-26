export const THEME_STORAGE_KEY = "theme";

// Decides the theme and marks <html data-theme="...">: the saved choice wins,
// otherwise it follows the operating system's light/dark setting.
// Runs in the browser, both from the inline <head> script and from ThemeToggle.
// It must stay self-contained (no imports or outer variables) because
// themeScript below turns it into a string with toString().
export function applyInitialTheme(storageKey: string) {
  let theme: string | null = null;
  try {
    theme = localStorage.getItem(storageKey);
  } catch {
    // localStorage can be blocked (private mode, strict privacy settings)
  }
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", theme);
}

// Inline script for <head>: runs while the HTML is parsed, before the first paint,
// so a saved dark theme never flashes light (see the "Preventing Flash" Next.js guide)
export const themeScript = `(${applyInitialTheme.toString()})(${JSON.stringify(THEME_STORAGE_KEY)})`;
