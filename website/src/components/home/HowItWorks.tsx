import type { JSX } from "solid-js";
import { revealOnScroll } from "../../lib/dom.ts";
import { SectionHead } from "../ui/Section.tsx";

/** Calligraphic arrowhead: a swept brush tip, oriented along the path's tangent. */
const Tip = (props: { id: string; cls: string; size: number }) => (
  <marker
    id={props.id}
    viewBox="0 0 24 24"
    refX="21"
    refY="12"
    markerWidth={props.size}
    markerHeight={props.size}
    orient="auto-start-reverse"
    markerUnits="userSpaceOnUse"
  >
    <path
      class={`loop-tip ${props.cls}`}
      d="M1 3 C9 6, 17 9, 23 12 C17 15, 9 18, 1 21 C6 17.5, 8.5 14.5, 8.5 12 C8.5 9.5, 6 6.5, 1 3 Z"
    />
  </marker>
);

/** A glowing drop that runs a path on a loop, fading in and out at each end. */
const Drop = (props: {
  cls: string;
  path: string;
  dur: string;
  begin?: string;
}) => (
  <circle class={`loop-drop ${props.cls}`} r="5" opacity="0">
    <animateMotion
      dur={props.dur}
      begin={props.begin}
      repeatCount="indefinite"
      path={props.path}
    />
    <animate
      attributeName="opacity"
      dur={props.dur}
      begin={props.begin}
      repeatCount="indefinite"
      keyTimes="0;0.15;0.85;1"
      values="0;1;1;0"
    />
  </circle>
);

const SUB_PATH = "M 532 322 C 500 352, 440 352, 408 322";
const PATCH_PATH = "M 290 178 C 330 66, 640 66, 688 172";

const nodeBase =
  "loop-node min-w-0 rounded-card border bg-bg-2 px-6 pt-[1.35rem] pb-[1.4rem] lg:absolute lg:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.6)]";

const Node = (props: {
  cls: string;
  class: string;
  title: string;
  role: string;
  children?: JSX.Element;
}) => (
  <li class={`${nodeBase} ${props.cls} ${props.class}`}>
    <h3 class="display-72 m-0 text-[1.7rem] leading-[1.05]">{props.title}</h3>
    <p class="mt-[0.3rem] mb-[0.8rem] text-[0.92rem] text-fg-2">{props.role}</p>
    {props.children}
  </li>
);

const List = (props: { children: JSX.Element }) => (
  <ul class="m-0 grid list-none gap-[0.3rem] p-0 text-[0.88rem] text-fg-2 [&_code]:text-[0.8rem] [&_code]:text-fg [&_li]:before:mr-2 [&_li]:before:text-fg-3 [&_li]:before:content-['—']">
    {props.children}
  </ul>
);

/**
 * Three actors, two arrows, one feedback arc — the whiteboard version.
 * Alchemy (left) ⇐ SDKs ⇐ Distilled (right) ⇐ Spec (far right, small);
 * a dashed "patches" arc goes from Alchemy back over the top to Distilled.
 * Below 64rem the SVG is hidden and the nodes stack in reading order.
 */
export const HowItWorks = () => (
  <section
    class="rule pt-section pb-[clamp(2rem,4vw,3rem)]"
    id="how"
    aria-labelledby="how-title"
  >
    <SectionHead
      eyebrow="How it works"
      id="how-title"
      title={
        <>
          Generated from the spec. <em>Proven</em> by Alchemy.
        </>
      }
    >
      AI turns each provider's API description into an SDK, then refines it —
      patching the description's bugs and giving every failure a name. Alchemy
      builds real infrastructure on those SDKs — resources, providers, tests
      against the live API. Every place the description turns out to be wrong
      comes back as another patch, and the next generation starts from the
      corrected description.
    </SectionHead>

    <div
      class="relative lg:mx-auto lg:mt-6 lg:aspect-[1000/360] lg:max-w-[66rem]"
      data-reveal
      ref={revealOnScroll}
    >
      <svg
        class="pointer-events-none absolute inset-0 z-0 hidden size-full overflow-visible lg:block"
        viewBox="0 0 1000 360"
        aria-hidden="true"
      >
        <defs>
          <Tip id="tip-sub" cls="loop-tip--sub" size={22} />
          <Tip id="tip-spec" cls="loop-tip--spec" size={22} />
          <Tip id="tip-patch" cls="loop-tip--patch" size={26} />
        </defs>

        {/* Spec → Distilled: short swept curve into Distilled's top-right. */}
        <path
          class="loop-edge loop-edge--spec"
          d="M 866 152 C 846 174, 826 186, 804 200"
          pathLength="100"
          marker-end="url(#tip-spec)"
        />

        {/* Distilled → Alchemy: the generated SDKs. */}
        <path
          class="loop-edge loop-edge--sub"
          d={SUB_PATH}
          pathLength="100"
          marker-end="url(#tip-sub)"
        />
        <text class="loop-leg" x="470" y="310" text-anchor="middle">
          SDKs
        </text>

        {/* Alchemy → Distilled: patches. Drawn solid, then the dashed twin fades over it. */}
        <path
          class="loop-edge loop-edge--patch loop-edge--draw"
          d={PATCH_PATH}
          pathLength="100"
        />
        <path
          class="loop-edge loop-edge--patch loop-edge--dashes"
          d={PATCH_PATH}
          pathLength="100"
          marker-end="url(#tip-patch)"
        />
        <text
          class="loop-leg loop-leg--patch"
          x="490"
          y="48"
          text-anchor="middle"
        >
          patches
        </text>
        <text
          class="loop-leg loop-leg--sub"
          x="490"
          y="70"
          text-anchor="middle"
        >
          tagged errors · schema bugs · missing operations
        </text>

        <Drop cls="loop-drop--a" path={SUB_PATH} dur="3.2s" />
        <Drop cls="loop-drop--b" path={PATCH_PATH} dur="4.8s" begin="1.4s" />
      </svg>

      <ol
        class="relative z-1 m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:absolute lg:inset-0 lg:block"
        aria-label="How Distilled and Alchemy fit together"
      >
        <Node
          cls="loop-node--alchemy"
          class="border-[color-mix(in_oklab,var(--violet)_45%,var(--line))] lg:left-[6%] lg:top-[calc(200/360*100%)] lg:w-[32%]"
          title="Alchemy"
          role="Infrastructure as code."
        >
          <List>
            <li>
              Resources: <code>Bucket</code>, <code>Table</code>,{" "}
              <code>Machine</code>
            </li>
            <li>Tests against the actual API</li>
          </List>
        </Node>
        <Node
          cls="loop-node--distilled"
          class="border-[color-mix(in_oklab,var(--accent)_45%,var(--line))] lg:left-[55%] lg:top-[calc(200/360*100%)] lg:w-[30%]"
          title="Distilled"
          role="Effect-native SDKs."
        >
          <List>
            <li>Schemas, operations, typed errors</li>
            <li>Retry, pagination, streaming</li>
          </List>
        </Node>
        <li
          class={`${nodeBase} loop-node--spec border-[color-mix(in_oklab,var(--teal)_45%,var(--line))] sm:col-span-full lg:left-[92%] lg:top-[calc(120/360*100%)] lg:w-[15%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-4 lg:pt-[0.9rem] lg:pb-[0.95rem]`}
        >
          <h3 class="display-72 m-0 text-[1.35rem] leading-[1.05]">Spec</h3>
          <p class="mt-[0.3rem] text-[0.92rem] text-fg-2 lg:text-[0.8rem]">
            The provider's own API description.
          </p>
        </li>
      </ol>
    </div>
  </section>
);
