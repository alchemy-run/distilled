import { children, Show, type JSX } from "solid-js";

/** `<main>` wrapper: centred column with the page gutter. */
export const Page = (props: {
  children: JSX.Element;
  /** Page glow colour; defaults to the copper accent. */
  glow?: "accent" | "rose" | "teal";
}) => (
  <main
    id="main"
    tabindex="-1"
    class="mx-auto max-w-wrap px-gutter pb-20 focus:outline-none"
    style={props.glow ? { "--glow": `var(--${props.glow})` } : undefined}
  >
    {props.children}
  </main>
);

/** Eyebrow + heading + optional lede, capped to a comfortable measure. */
export const SectionHead = (props: {
  eyebrow?: string;
  id: string;
  title: JSX.Element;
  children?: JSX.Element;
  class?: string;
}) => {
  // Resolved once: reading `props.children` twice would build the lede's
  // elements twice and desync hydration keys.
  const lede = children(() => props.children);
  return (
    <div class={`max-w-measure ${props.class ?? "mb-10"}`}>
      <Show when={props.eyebrow}>
        <p class="eyebrow">{props.eyebrow}</p>
      </Show>
      <h2 id={props.id}>{props.title}</h2>
      <Show when={lede.toArray().length > 0}>
        <p class="mt-4 max-w-measure text-[1.05rem] text-fg-2 [&_a]:text-accent">{lede()}</p>
      </Show>
    </div>
  );
};

/** A "how this is counted/measured" list at the foot of a page. */
export const Method = (props: { id: string; title: string; children: JSX.Element }) => (
  <section
    id={props.id}
    class="rule max-w-measure pt-[clamp(2rem,5vw,3rem)]"
    aria-labelledby={`${props.id}-title`}
  >
    <h2 id={`${props.id}-title`} class="mb-3 text-[1.6rem]">
      {props.title}
    </h2>
    <ul class="grid list-disc gap-2 pl-5 text-fg-2 [&_a]:text-accent">{props.children}</ul>
  </section>
);
