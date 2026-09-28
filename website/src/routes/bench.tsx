import bench from "site:bench";
import { Show } from "solid-js";
import { BundleSection } from "../components/bench/BundleSection.tsx";
import { RuntimeSection } from "../components/bench/RuntimeSection.tsx";
import { Seo } from "../components/layout/Seo.tsx";
import { Method, Page } from "../components/ui/Section.tsx";
import { ALCHEMY_URL, REPO_URL } from "../lib/site.ts";

const seeded = [
  bench.runtime?.seed ? "runtime" : "",
  bench.bundle?.seed ? "bundle" : "",
].filter(Boolean);

const tab =
  "rounded-full px-[0.9rem] py-[0.35rem] text-[0.86rem] text-fg-2 hover:bg-bg-3 hover:text-fg hover:no-underline";

export default function Bench() {
  return (
    <>
      <Seo
        title="Benchmarks — Distilled"
        description="What a Distilled SDK costs at runtime and in your bundle: per-call CPU with the network mocked, and rolldown output size and tree-shaking for one imported operation."
        social="Per-call CPU cost and bundle size of Distilled SDKs, measured, not promised."
        path="/bench"
      />
      <Page glow="teal">
        <section
          class="max-w-[52rem] pt-[clamp(3rem,8vw,6rem)] pb-[clamp(1.5rem,3vw,2rem)]"
          aria-labelledby="bench-title"
        >
          <p class="eyebrow">Benchmarks</p>
          <h1 id="bench-title" class="mb-5">
            What an SDK <em>costs</em>. Measured, not promised.
          </h1>
          <p class="mb-7 max-w-[34em] text-[clamp(1.05rem,1rem+0.35vw,1.2rem)] text-pretty text-fg-2 [&_a]:text-fg">
            Two questions a generated SDK has to answer: how much of your bundle
            does importing one operation drag in, and how much CPU does calling
            it burn once the network is out of the picture. These are the
            numbers, straight from the harnesses in{" "}
            <a href={`${REPO_URL}/tree/main/benches`} rel="noopener">
              <code>benches/</code>
            </a>
            .
          </p>
          <Show when={seeded.length > 0}>
            <p class="m-0 max-w-[60ch] rounded-lg border border-l-[3px] border-[color-mix(in_oklab,var(--accent)_45%,var(--line))] bg-[color-mix(in_oklab,var(--accent)_8%,var(--bg-2))] px-4 py-[0.8rem] text-[0.92rem] text-fg-2 [&_b]:text-fg">
              <b>Interim numbers.</b> The {seeded.join(" and ")} figures below
              are a hand-entered snapshot, not the committed{" "}
              <code>results/latest.json</code>.
            </p>
          </Show>
        </section>

        <nav
          class="sticky top-[3.7rem] z-5 mt-6 flex w-max max-w-full gap-1 rounded-full border border-line bg-[color-mix(in_oklab,var(--bg)_85%,transparent)] p-[0.35rem] backdrop-blur-[8px] max-sm:top-[3.2rem]"
          aria-label="Sections"
        >
          <a class={tab} href="#bundle">
            Bundle size
          </a>
          <a class={tab} href="#runtime">
            Runtime
          </a>
          <a class={tab} href="#method">
            Method
          </a>
        </nav>

        <Show when={bench.bundle}>{(b) => <BundleSection b={b()} />}</Show>
        <Show when={bench.runtime}>{(r) => <RuntimeSection r={r()} />}</Show>

        <Method id="method" title="Method — how this is measured">
          <li>
            <strong>Bundle.</strong> A tiny worker-shaped entry imports one
            Distilled operation and calls it, bundled with{" "}
            <a href="https://rolldown.rs" rel="noopener">
              rolldown
            </a>{" "}
            using the same options{" "}
            <a href={ALCHEMY_URL} rel="noopener">
              Alchemy
            </a>{" "}
            uses for Cloudflare Workers: <code>bun</code> resolve conditions,
            minified single ESM chunk, PURE annotations on. Size is the chunk;
            gzip is what the wire sees. Tree-shake quality is the number of
            operations that survive minification out of the service's total,
            with a check that no other service or provider leaked in.
          </li>
          <li>
            <strong>Runtime.</strong> The <code>HttpClient</code> is replaced by
            one that returns a canned response, so what remains is the SDK's own
            work: schema encode, request build (including signing for AWS),
            response parse, envelope decode, retry wrapper. Numbers are per
            call, measured with{" "}
            <a href="https://github.com/evanwashere/mitata" rel="noopener">
              mitata
            </a>{" "}
            on Bun. The <em>baseline</em> row is the mocked round-trip with no
            SDK in the loop; subtract it to see the SDK's share.
          </li>
          <li>
            <strong>Caveats.</strong> One developer machine, quick profile.
            Bytes are stable; timings move ±30% between runs and machines.
            Nothing here is compared against a vendor SDK yet. Treat it as a
            shape, not a guarantee.
          </li>
          <li>
            Reproduce: <code>pnpm bench:bundle</code> and{" "}
            <code>pnpm bench:runtime</code> from the repo root.
          </li>
        </Method>
      </Page>
    </>
  );
}
