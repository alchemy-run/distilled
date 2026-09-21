import { A } from "@solidjs/router";
import { For, Show, type JSX } from "solid-js";
import type { Fact } from "../../../build/site-data.ts";
import { revealOnScroll } from "../../lib/dom.ts";
import { ArrowRightIcon } from "../ui/Icons.tsx";
import { SectionHead } from "../ui/Section.tsx";

/**
 * Evidence panel: what a spec declares vs. what Distilled ships. The code is
 * hand-marked rather than run through `Code` because the highlights are
 * line-level (missing / added), not token-level.
 */
const Evidence = (props: {
  tone: "rose" | "teal";
  tag: string;
  src: string;
  code: JSX.Element;
  note: JSX.Element;
  index: number;
}) => (
  <figure
    class="reveal-item m-0 flex flex-col overflow-hidden rounded-card border bg-[color-mix(in_oklab,var(--bg-2)_85%,transparent)]"
    classList={{
      "border-[color-mix(in_oklab,var(--rose)_40%,var(--line))]":
        props.tone === "rose",
      "border-[color-mix(in_oklab,var(--teal)_45%,var(--line))]":
        props.tone === "teal",
    }}
    style={{ "--i": props.index * 3 }}
  >
    <figcaption class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-b border-line px-4 py-[0.7rem]">
      <span
        class="font-mono text-[0.72rem] tracking-[0.08em] uppercase"
        classList={{
          "text-rose": props.tone === "rose",
          "text-teal": props.tone === "teal",
        }}
      >
        {props.tag}
      </span>
      <span class="text-[0.78rem] text-fg-2">
        <code>{props.src}</code>
      </span>
    </figcaption>
    <pre
      data-fit
      class="m-0 flex-1 bg-bg px-[1.1rem] py-4 leading-[1.7]"
      style={{ "font-size": "calc(0.86rem * var(--fit, 1))" }}
    >
      <code>{props.code}</code>
    </pre>
    <p class="m-0 border-t border-line px-4 pt-[0.8rem] pb-4 text-[0.92rem] text-pretty text-fg-2 [&_code]:text-[0.82em]">
      {props.note}
    </p>
  </figure>
);

const Added = (props: { children: JSX.Element }) => (
  <span class="-ml-[1.1rem] inline-block bg-[color-mix(in_oklab,var(--teal)_10%,transparent)] pl-[1.1rem] shadow-[inset_2px_0_0_var(--teal)]">
    {props.children}
  </span>
);

export const Problem = (props: { facts: ReadonlyArray<Fact> }) => (
  <section class="rule py-section" id="problem" aria-labelledby="problem-title">
    <SectionHead
      eyebrow="The problem"
      id="problem-title"
      title={
        <>
          The spec should be the only source. <em>It never is.</em>
        </>
      }
    >
      Every generated SDK — ours, the vendor's, the one you'd write — is only as
      true as the API spec it was built from. Most of those specs are written by
      hand, beside the API rather than from it. So they drift: a field marked
      required that the server omits, a value documented as a string that
      arrives <code>null</code>, a property the response always carries that the
      spec never mentions — and, almost universally, silence about what happens
      when a call fails. The types compile. The happy path works. Then a real
      response doesn't match, and your typed client either rejects a valid
      payload or hands you an untyped error.
    </SectionHead>

    <div
      class="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
      data-reveal
      ref={revealOnScroll}
    >
      <Evidence
        tone="rose"
        tag="What Fly's spec declares"
        src="POST /v1/apps/{app}/machines"
        index={0}
        code={
          <>
            <span class="m">responses:</span>
            {"\n  "}
            <span class="s">"200"</span>: OK{"\n"}
            <span class="block text-fg-3">
              {"  "}
              <span class="text-rose/85 italic">— that's it —</span>
            </span>
          </>
        }
        note={
          <>
            One response. No <code>400</code> for a bad config, no{" "}
            <code>403</code> for a scoped token, no <code>409</code> when the
            name is taken.
          </>
        }
      />

      <div
        class="hidden w-[6.5rem] flex-col items-center justify-center gap-1.5 text-center font-mono text-[0.66rem] tracking-[0.06em] whitespace-nowrap text-fg-3 uppercase lg:flex"
        aria-hidden="true"
      >
        <ArrowRightIcon class="w-10 text-accent" />
        <span>Alchemy calls it for real</span>
      </div>

      <Evidence
        tone="teal"
        tag="What Distilled ships"
        src="Fly.Machines.createMachine"
        index={1}
        code={
          <>
            <span class="k">export type</span>{" "}
            <span class="t">CreateMachineError</span> ={"\n"}
            <Added>
              {"  "}| <span class="t">BadRequest</span>
            </Added>
            {"   "}
            <span class="m">// 400 · seen live</span>
            {"\n"}
            <Added>
              {"  "}| <span class="t">Forbidden</span>
            </Added>
            {"    "}
            <span class="m">// 403 · seen live</span>
            {"\n"}
            <Added>
              {"  "}| <span class="t">NotFound</span>
            </Added>
            {"     "}
            <span class="m">// 404</span>
            {"\n"}
            <Added>
              {"  "}| <span class="t">Conflict</span>
            </Added>
            {"     "}
            <span class="m">// 409 · name-taken race</span>
            {"\n"}
            {"  "}| <span class="t">FlyIoOpError</span>
          </>
        }
        note={
          <>
            Four typed failures in the operation's error union, each added as a
            patch to the spec the moment a real deploy surfaced it.
          </>
        }
      />
    </div>

    <ul
      class="mt-8 grid list-none grid-cols-1 gap-x-10 gap-y-5 border-t border-line p-0 pt-6 md:grid-cols-3"
      aria-label="How much patching it takes"
    >
      <For each={props.facts}>
        {(fact) => (
          <li class="grid content-start gap-1.5">
            <span class="display-96 text-[clamp(2.2rem,1.6rem+1.8vw,3rem)] leading-none text-rose tabular-nums">
              {fact.n}
            </span>
            <span class="max-w-[26ch] text-[0.95rem] text-pretty text-fg-2">
              {fact.line}
              <Show when={fact.link}>
                {(link) => (
                  <>
                    {" "}
                    <A class="whitespace-nowrap text-accent" href={link().href}>
                      {link().label}
                    </A>
                  </>
                )}
              </Show>
            </span>
          </li>
        )}
      </For>
    </ul>

    <p class="display-48 mt-8 max-w-measure text-[clamp(1.25rem,1.05rem+0.8vw,1.6rem)] leading-[1.35] text-pretty text-fg [&_em]:text-accent-2">
      You could patch the generated code by hand — and lose it on the next
      regeneration. Or you could fix the <em>spec</em> once, and every build
      after it inherits the correction.
    </p>
  </section>
);
