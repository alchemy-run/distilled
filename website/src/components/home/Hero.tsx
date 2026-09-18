import { createSignal } from "solid-js";
import type { CatalogPackage } from "../../../build/site-data.ts";
import { n } from "../../lib/format.ts";
import { REPO_URL } from "../../lib/site.ts";
import { GitHubIcon } from "../ui/Icons.tsx";
import { CodeSamples } from "./CodeSamples.tsx";
import { InstallLine } from "./InstallLine.tsx";
import { SAMPLES } from "./samples.ts";

export const Hero = (props: {
  providerCount: number;
  /** Operations across every catalogued provider, summed at build time. */
  operationCount: number;
  /** Set on `/p/<provider>`: the install line names this provider instead. */
  provider?: CatalogPackage;
}) => {
  // A pinned provider that also has a code sample stops the carousel on it;
  // one without a sample leaves the carousel running and only fixes the
  // install line, since there is no code of its own to show.
  const sample = SAMPLES.findIndex((s) => s.pkg === props.provider?.short);
  const [active, setActive] = createSignal(Math.max(0, sample));
  const pkg = () => props.provider?.short ?? SAMPLES[active()]!.pkg;
  return (
    <section
      class="grid grid-cols-[minmax(0,1fr)] items-center gap-12 pt-[clamp(3rem,8vw,6rem)] pb-[clamp(3rem,7vw,5.5rem)] lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)] lg:gap-16"
      aria-labelledby="hero-title"
    >
      <div>
        <p class="eyebrow normal-case tracking-[0.02em]">
          @distilled.cloud &nbsp;·&nbsp; {props.providerCount} providers &nbsp;·&nbsp; Apache-2.0
        </p>
        <h1 id="hero-title" class="mb-5">
          Cloud APIs, <em>distilled</em> into Effect.
        </h1>
        <p class="mb-7 max-w-[34em] text-[clamp(1.05rem,1rem+0.35vw,1.2rem)] text-pretty text-fg-2">
          Effect-native TypeScript SDKs for {props.providerCount} cloud providers. Enjoy typed
          schemas, declarative retry policies, streaming pagination and optimal tree-shaking for{" "}
          {n(props.operationCount)} APIs.
        </p>
        <div class="mb-6 flex flex-wrap gap-3">
          <a
            class="inline-flex items-center gap-2 rounded-full border border-transparent bg-linear-120 from-accent-2 via-accent via-55% to-rose px-[1.1rem] py-[0.65rem] text-[0.95rem] leading-none font-medium text-accent-ink shadow-[0_6px_20px_-8px_color-mix(in_oklab,var(--accent)_70%,transparent)] transition-[transform,filter] hover:-translate-y-px hover:brightness-[1.06] hover:no-underline"
            href="#providers"
          >
            Browse SDKs
          </a>
          <a
            class="inline-flex items-center gap-2 rounded-full border border-line-2 bg-[color-mix(in_oklab,var(--bg-2)_70%,transparent)] px-[1.1rem] py-[0.65rem] text-[0.95rem] leading-none font-medium text-fg transition-[transform,border-color] hover:-translate-y-px hover:border-fg-3 hover:no-underline"
            href={REPO_URL}
            rel="noopener"
          >
            <GitHubIcon class="size-4" />
            Github
          </a>
        </div>
        <InstallLine pkg={pkg} />
      </div>

      <CodeSamples active={active} onChange={setActive} frozen={sample >= 0} />
    </section>
  );
};
