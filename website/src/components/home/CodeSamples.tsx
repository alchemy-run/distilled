import { createSignal, For, onCleanup, onMount, type Accessor } from "solid-js";
import { colourMap, plainText, tokenize } from "../../lib/highlight.ts";
import { createMorph, paintMorph } from "../../lib/morph.ts";
import { Code } from "../ui/Code.tsx";
import { SAMPLES } from "./samples.ts";

const PERIOD = 6000;

/**
 * The hero code window. A dot per provider; the active dot expands to its
 * name and fills a ring over the auto-advance interval. Clicking a dot pins
 * it. Paused while hovered or when the tab is hidden. Switching providers
 * morphs the text (torph) on a plain-text layer over the highlighted panel,
 * then hands back once both carry the same colours.
 */
export const CodeSamples = (props: {
  /** Index of the active sample; owned by the page so the install line follows. */
  active: Accessor<number>;
  onChange: (index: number) => void;
  /** Start on `active` without auto-advancing, as if that dot were clicked. */
  frozen?: boolean;
}) => {
  const [progress, setProgress] = createSignal(0);
  const [morphing, setMorphing] = createSignal(false);

  const tokens = SAMPLES.map((s) => tokenize(s.src));
  const colours = tokens.map(colourMap);
  const sample = () => SAMPLES[props.active()]!;

  // Wired up once the morph layer mounts; no-ops until then so the buttons
  // and hover handlers are safe before that.
  let pin: (index: number) => void = () => {};
  let start = () => {};
  let stop = () => {};

  const setup = (layer: HTMLPreElement) => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ready = false;
    let startedAt = 0;
    let raf = 0;
    let running = false;
    let pinned = props.frozen === true;

    const morph = createMorph(layer, {
      duration: 780,
      onReady: () => {
        ready = true;
      },
      onComplete: () => setMorphing(false),
      onRender: () => paintMorph(layer, morph.value(), colours[props.active()]!),
    });

    // `fitCode` scales each panel on its own; the morph layer shows a copy of
    // one of them, so it borrows that panel's scale — otherwise, on a narrow
    // screen, the code changes size for the length of the morph.
    const borrowFit = (i: number) => {
      const panel = layer.parentElement?.querySelectorAll<HTMLElement>("pre.sample")[i];
      const fit = panel && getComputedStyle(panel).getPropertyValue("--fit");
      layer.style.setProperty("--fit", fit?.trim() || "1");
    };

    const show = (n: number) => {
      const i = (n + SAMPLES.length) % SAMPLES.length;
      props.onChange(i);
      setProgress(0);
      if (ready && morph.value()) setMorphing(true);
      borrowFit(i);
      morph.set(plainText(tokens[i]!));
      startedAt = performance.now();
    };
    const tick = (now: number) => {
      if (!running) return;
      const p = Math.min(1, (now - startedAt) / PERIOD);
      setProgress(p);
      if (p >= 1) show(props.active() + 1);
      raf = requestAnimationFrame(tick);
    };
    start = () => {
      if (running || reduced || pinned) return;
      running = true;
      startedAt = performance.now() - progress() * PERIOD;
      raf = requestAnimationFrame(tick);
    };
    stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    pin = (i) => {
      pinned = true;
      stop();
      show(i);
    };

    document.addEventListener("visibilitychange", onVisibility);
    onCleanup(() => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    });

    onMount(() => {
      borrowFit(props.active());
      morph.set(plainText(tokens[props.active()]!));
      start();
    });
  };

  return (
    <figure
      class="samples m-0 grid min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden rounded-card border border-line-2 bg-bg-2 shadow-[0_1px_0_color-mix(in_oklab,var(--fg)_6%,transparent)_inset,0_30px_60px_-30px_rgb(0_0_0/0.6)]"
      classList={{ "is-morphing": morphing() }}
      onMouseEnter={() => stop()}
      onMouseLeave={() => start()}
    >
      <figcaption class="flex items-center gap-3 border-b border-line px-3.5 py-2.5 font-mono text-[0.75rem] text-fg-3 [grid-area:1/1]">
        <span class="inline-flex gap-1.5" aria-hidden="true">
          <i class="size-[0.6rem] rounded-full bg-rose" />
          <i class="size-[0.6rem] rounded-full bg-accent" />
          <i class="size-[0.6rem] rounded-full bg-teal" />
        </span>
        <span class="text-fg-2">{sample().file}</span>
        <div class="ml-auto flex items-center gap-1.5" role="tablist" aria-label="Provider">
          <For each={SAMPLES}>
            {(s, i) => (
              <button
                type="button"
                role="tab"
                class="step"
                aria-selected={props.active() === i()}
                style={{ "--p": props.active() === i() ? progress() : 0 }}
                onClick={() => pin(i())}
              >
                <i />
                <span>{s.pkg}</span>
              </button>
            )}
          </For>
        </div>
      </figcaption>

      <pre
        ref={setup}
        class="sample-morph m-0 px-[1.2rem] pt-[1.1rem] pb-5 font-mono leading-[1.6]"
        style={{ "font-size": "calc(0.78rem * var(--fit, 1))" }}
        aria-hidden="true"
      />

      <For each={SAMPLES}>
        {(s, i) => (
          <Code
            src={s.src}
            class="sample m-0 px-[1.2rem] pt-[1.1rem] pb-5 leading-[1.6]"
            classList={{ "is-active": props.active() === i() }}
            hidden={props.active() !== i()}
          />
        )}
      </For>
    </figure>
  );
};
