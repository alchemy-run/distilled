import { onCleanup, onMount } from "solid-js";

/**
 * Add `.is-in` to `el` as soon as its top edge scrolls into view, then stop
 * watching. A fraction-of-the-block threshold would fire late (or, for a
 * block taller than the viewport, only once it is half past), so this keys
 * on the first pixel crossing a line just inside the bottom of the viewport.
 * Without IntersectionObserver, reveal immediately so nothing stays hidden.
 */
export const revealOnScroll = (el: HTMLElement) => {
  onMount(() => {
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    onCleanup(() => io.disconnect());
  });
};

/**
 * Code blocks never scroll: measure the block's widest line and scale the
 * font down (to a floor) so it fits. Re-runs on resize and once fonts load.
 * Applies to every `pre[data-fit]` inside `root`.
 */
export const fitCode = (root: ParentNode = document) => {
  for (const pre of root.querySelectorAll<HTMLElement>("pre[data-fit]")) {
    pre.style.removeProperty("--fit");
    const style = getComputedStyle(pre);
    const padding =
      parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const avail = pre.clientWidth - padding;
    // The <code> child is inline, so its scrollWidth is 0; the <pre> itself
    // (overflow hidden) reports the full content width.
    const need = pre.scrollWidth - padding;
    if (need > avail && avail > 0) {
      pre.style.setProperty("--fit", Math.max(0.6, avail / need).toFixed(3));
    }
  }
};

/** Keep every `pre[data-fit]` on the page fitted for the component's life. */
export const useFitCode = () => {
  onMount(() => {
    fitCode();
    const onResize = () => fitCode();
    addEventListener("resize", onResize, { passive: true });
    document.fonts?.ready.then(() => fitCode());
    onCleanup(() => removeEventListener("resize", onResize));
  });
};

/** Read a localStorage key, tolerating private mode and disabled storage. */
export const readStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};
