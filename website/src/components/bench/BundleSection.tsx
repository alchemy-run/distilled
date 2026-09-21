import { For, Show } from "solid-js";
import type { BundleBench, BundleRow } from "../../../build/bench-data.ts";
import { kb, n, shortDate } from "../../lib/format.ts";
import { SectionHead } from "../ui/Section.tsx";
import { StatRow } from "../ui/Stats.tsx";
import { InlineCode } from "./InlineCode.tsx";

const HEADLINE: ReadonlyArray<readonly [string, string]> = [
  ["aws-s3-deep", "one S3 operation"],
  ["cf-workers-deep", "one Workers operation"],
  ["combined-worker", "S3 + Workers together"],
];

/** Rows that are not the "one imported operation" shape, marked with a `*`. */
const FOOTNOTED: Record<string, string> = {
  "aws-services-index": "imports all ~430 AWS services as namespaces",
  "combined-worker": "calls two operations, one per provider",
};

const Row = (props: { r: BundleRow; maxBytes: number }) => {
  const gzW = () => Math.max(1.5, (props.r.gzipBytes / props.maxBytes) * 100);
  const rawW = () => Math.max(gzW(), (props.r.bytes / props.maxBytes) * 100);
  return (
    <li class="panel grid gap-[0.55rem] px-5 py-4">
      <div class="flex flex-wrap items-baseline gap-x-[0.9rem] gap-y-1">
        <span>
          <code class="text-[0.95rem] font-medium text-fg">
            {props.r.fixture}
          </code>
          <Show when={FOOTNOTED[props.r.fixture]}>
            {(note) => (
              <sup class="ml-[0.1rem] text-fg-3" title={note()}>
                *
              </sup>
            )}
          </Show>
          <Show when={props.r.variant !== "bun"}>
            <span class="chip ml-[0.4rem] text-[0.72rem]">
              {props.r.variant.replace("bun+", "+")}
            </span>
          </Show>
        </span>
        <span class="text-[0.9rem] text-fg-2">
          <InlineCode text={props.r.description ?? ""} />
        </span>
      </div>
      <div
        class="relative h-[0.55rem] overflow-hidden rounded-full border border-line bg-bg"
        aria-hidden="true"
      >
        <span
          class="absolute inset-y-0 left-0 rounded-[inherit] bg-[color-mix(in_oklab,var(--teal)_28%,transparent)]"
          style={{ width: `${rawW().toFixed(1)}%` }}
        />
        <span
          class="absolute inset-y-0 left-0 rounded-[inherit] bg-linear-90 from-teal-2 to-teal"
          style={{ width: `${gzW().toFixed(1)}%` }}
        />
      </div>
      <div class="flex flex-wrap gap-x-[1.1rem] gap-y-[0.3rem] font-mono text-[0.78rem] text-fg-3 [&_b]:font-medium [&_b]:text-fg [&_b]:tabular-nums">
        <span>
          <b>{kb(props.r.gzipBytes)}</b> gzip
        </span>
        <span>{kb(props.r.bytes)} raw</span>
        <span>{n(props.r.moduleCount)} modules</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <For each={props.r.opsRetained}>
          {(o) => (
            <span
              class="chip"
              classList={{
                "border-[color-mix(in_oklab,var(--teal)_45%,var(--line-2))] text-teal-2 [&_b]:text-teal-2":
                  o.retained <= 1,
              }}
            >
              <b>{o.retained}</b>/{o.total} {o.service}
            </span>
          )}
        </For>
        <Show
          when={props.r.leaks > 0}
          fallback={
            <span class="chip border-[color-mix(in_oklab,var(--teal)_45%,var(--line-2))] text-teal-2">
              no leaks
            </span>
          }
        >
          <span class="chip border-[color-mix(in_oklab,#d9634a_55%,var(--line-2))] text-[#f0846c]">
            {props.r.leaks} leak{props.r.leaks === 1 ? "" : "s"}
          </span>
        </Show>
      </div>
    </li>
  );
};

export const BundleSection = (props: { b: BundleBench }) => {
  const maxBytes = () => Math.max(...props.b.rows.map((r) => r.bytes));
  const headline = () =>
    HEADLINE.flatMap(([fixture, label]) => {
      const r = props.b.rows.find(
        (x) => x.fixture === fixture && x.variant === "bun",
      );
      return r ? [{ n: kb(r.gzipBytes), label: `gzipped, ${label}` }] : [];
    });
  return (
    <section
      id="bundle"
      class="pt-[clamp(3rem,7vw,5rem)]"
      aria-labelledby="bundle-title"
    >
      <SectionHead
        eyebrow="Bundle size"
        id="bundle-title"
        title={
          <>
            Import one operation, pay for <em class="text-teal-2">one</em>{" "}
            operation.
          </>
        }
      >
        Each row is a small worker that imports a single Distilled operation and
        calls it, bundled the way Alchemy bundles for Cloudflare Workers. Deep
        and barrel imports produce the same bytes; the two rows marked{" "}
        <sup>*</sup> import more than that on purpose.
      </SectionHead>
      <StatRow class="mb-8" tone="teal" stats={headline()} label="Headline" />
      <ul class="m-0 grid list-none gap-2 p-0">
        <For each={props.b.rows}>
          {(r) => <Row r={r} maxBytes={maxBytes()} />}
        </For>
      </ul>
      <p class="mt-4 text-[0.84rem] text-fg-3 [&_code]:text-fg-2">
        <sup>*</sup> <code>aws-services-index</code> imports all ~430 AWS
        services as namespaces; <code>combined-worker</code> calls two
        operations, one per provider. Every other row imports and calls exactly
        one.
      </p>
      <p class="mt-2 font-mono text-[0.74rem] text-fg-3 [&_code]:text-fg-2">
        rolldown {props.b.rolldown} · bun {props.b.bun}
        {props.b.host?.cpu ? ` · ${props.b.host.cpu}` : ""} · {props.b.runs} run
        {props.b.runs === 1 ? "" : "s"} · {shortDate(props.b.generatedAt)} ·{" "}
        <code>{props.b.commit}</code>
      </p>
    </section>
  );
};
