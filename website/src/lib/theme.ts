/**
 * Theme toggle. Flips between light and dark relative to the *effective*
 * scheme and persists the choice; the inline script in `entry-server.tsx`
 * re-applies it before first paint.
 */
export const toggleTheme = () => {
  const root = document.documentElement;
  const stored = root.dataset.theme;
  const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
  const effectiveDark = stored ? stored === "dark" : systemDark;
  const next = effectiveDark ? "light" : "dark";
  root.classList.add("theme-switching");
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  // Two frames: one to apply the new colours, one to re-enable transitions.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove("theme-switching")),
  );
};
