/**
 * Text morphing via torph (MIT, zero deps), loaded lazily so the page does
 * not wait on it. Until the module resolves, updates fall back to plain
 * `textContent`. The current value is kept on the element (`data-value`) so
 * copy/reads never see the engine's per-character fragments.
 */
import { onCleanup } from "solid-js";

type Controller = { update(text: string): void; destroy(): void };

/**
 * torph segments with `Intl.Segmenter`, which returns a run of spaces as one
 * segment; inside its inline-block fragments that run collapses, so indented
 * code would lose its indentation. NBSP survives, and torph already uses it
 * for single spaces, so the rendering is otherwise unchanged.
 */
const keepSpaces = (text: string) => text.replace(/ /g, "\u00a0");

export interface Morph {
  /** Set the text, animating if the engine is ready. */
  set(text: string): void;
  /** The last value passed to `set`. */
  value(): string;
}

export const createMorph = (
  el: HTMLElement,
  options: {
    duration: number;
    onComplete?: () => void;
    onReady?: () => void;
    /** Called whenever torph rebuilds the element's children. */
    onRender?: () => void;
  },
): Morph => {
  let controller: Controller | undefined;
  let value = el.dataset.value ?? el.textContent ?? "";
  let disposed = false;

  import("torph")
    .then(({ TextMorph }) => {
      if (disposed) return;
      controller = new TextMorph({
        element: el,
        duration: options.duration,
        ease: "cubic-bezier(0.19, 1, 0.22, 1)",
        numbers: false,
        onAnimationComplete: options.onComplete,
      });
      if (options.onRender) {
        const mo = new MutationObserver(options.onRender);
        mo.observe(el, { childList: true, subtree: true, characterData: true });
        onCleanup(() => mo.disconnect());
      }
      if (value) controller.update(keepSpaces(value));
      options.onReady?.();
    })
    .catch(() => {});

  onCleanup(() => {
    disposed = true;
    controller?.destroy();
  });

  return {
    set(text) {
      value = text;
      el.dataset.value = text;
      if (controller) controller.update(keepSpaces(text));
      else el.textContent = text;
    },
    value: () => value,
  };
};

/** Split `text`, which starts at `at` in the map, into same-class runs. */
const runsOf = (text: string, map: ReadonlyArray<string>, at: number) => {
  const runs: { cls: string; len: number }[] = [];
  for (let i = 0; i < text.length; i++) {
    const cls = map[at + i] ?? "";
    const last = runs.at(-1);
    if (last && last.cls === cls) last.len += 1;
    else runs.push({ cls, len: 1 });
  }
  return runs;
};

/**
 * Colour torph's fragments from a per-character class map. Fragments are
 * word segments in document order; torph normalises spaces to NBSP and can
 * split differently from a naive walk, so each one is re-anchored by
 * searching for its text in the target from the cursor.
 *
 * A fragment can cover several syntax classes — after a morph torph often
 * keeps a whole unchanged line as one fragment — so one class per fragment
 * would paint that line in the colour of its first token. Mixed fragments
 * are therefore wrapped in a span per run. The applied runs are recorded on
 * the fragment so the re-render this causes repaints nothing and stops;
 * the span count is checked too, because torph replaces a fragment's
 * children while keeping the element, which drops the spans.
 */
export const paintMorph = (
  el: HTMLElement,
  target: string,
  map: ReadonlyArray<string>,
) => {
  if (!target) return;
  let pos = 0;
  for (const item of el.querySelectorAll<HTMLElement>("[torph-item]")) {
    if (item.hasAttribute("torph-exiting")) continue;
    const raw = item.textContent ?? "";
    if (!raw) continue;
    const text = raw.replace(/\u00a0/g, " ");
    let at = target.indexOf(text, pos);
    if (at < 0 || at - pos > 4) at = pos; // tolerate small drift only
    pos = at + text.length;

    const runs = runsOf(text, map, at);
    const key = runs.map((r) => `${r.cls}:${r.len}`).join(",");
    const spans = runs.length > 1 ? runs.length : 0;
    if (item.dataset.tokKey === key && item.children.length === spans) continue;
    item.dataset.tokKey = key;

    if (runs.length === 1) {
      item.dataset.tok = runs[0]!.cls;
      if (item.firstElementChild) item.textContent = raw;
      continue;
    }
    item.dataset.tok = "";
    const frag = document.createDocumentFragment();
    let i = 0;
    for (const run of runs) {
      const span = document.createElement("span");
      span.dataset.tok = run.cls;
      span.textContent = raw.slice(i, i + run.len);
      i += run.len;
      frag.append(span);
    }
    item.replaceChildren(frag);
  }
};
