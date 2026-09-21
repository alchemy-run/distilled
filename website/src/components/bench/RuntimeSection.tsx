import { createMemo, createSignal, For, Show } from "solid-js";
import type { RuntimeBench, RuntimeResult } from "../../../build/bench-data.ts";
import { ns, shortDate } from "../../lib/format.ts";
import { SectionHead } from "../ui/Section.tsx";
import { StatRow } from "../ui/Stats.tsx";

const STAGE_LABELS: Record<string, string> = {
  call: "Full call",
  build: "Build request",
  "wire-decode": "Parse response",
  encode: "Encode input",
  decode: "Decode output",
  "call-error": "Typed error",
};
const STAGE_ORDER = [
  "call",
  "build",
  "wire-decode",
  "decode",
  "encode",
  "call-error",
];

const PROVIDER_TONE: Record<string, string> = {
  aws: "border-[color-mix(in_oklab,var(--accent)_45%,var(--line-2))] text-accent",
  cloudflare:
    "border-[color-mix(in_oklab,var(--teal)_45%,var(--line-2))] text-teal-2",
};

/**
 * Runtime table with one stage shown at a time. The faint striped bar on
 * "Full call" rows is the mocked round-trip with no SDK at all.
 */
export const RuntimeSection = (props: { r: RuntimeBench }) => {
  const results = () => props.r.results;
  const baseline = () =>
    results().find((x) => x.name === "baseline/mock-http/roundtrip/call") ??
    results().find((x) => x.provider === "baseline" && x.stage === "call");
  const stages = () =>
    STAGE_ORDER.filter((s) => results().some((x) => x.stage === s));
  // Fastest p50 first, so the top row is the headline number.
  const byStage = (s: string) =>
    results()
      .filter((x) => x.stage === s && x.provider !== "baseline")
      .sort((a, b) => a.p50 - b.p50);

  const [stage, setStage] = createSignal(stages()[0] ?? "call");
  const rows = createMemo(() => byStage(stage()));
  const maxP50 = createMemo(() => Math.max(...rows().map((x) => x.p50)));

  // Same rule as the homepage card: lowest p50 of the provider's full calls,
  // with GetCallerIdentity standing in for a signed AWS call.
  const lowestP50 = (provider: string) =>
    byStage("call").find((x) => x.provider === provider);
  const headline = () => {
    const b = baseline();
    const cf = lowestP50("cloudflare");
    const aws =
      results().find((x) => x.name === "aws/sts/GetCallerIdentity/call") ??
      lowestP50("aws");
    return [
      ...(b ? [{ n: ns(b.p50), label: "mock round-trip, no SDK" }] : []),
      ...(cf ? [{ n: ns(cf.p50), label: `cloudflare ${cf.op} · p50` }] : []),
      ...(aws
        ? [{ n: ns(aws.p50), label: `aws ${aws.op} · p50 (SigV4)` }]
        : []),
    ];
  };

  const barWidth = (x: RuntimeResult) =>
    Math.max(1.5, (x.p50 / maxP50()) * 100);
  const baseWidth = (x: RuntimeResult) => {
    const b = baseline();
    return b && stage() === "call"
      ? Math.min(barWidth(x), (b.p50 / maxP50()) * 100)
      : 0;
  };

  return (
    <section
      id="runtime"
      class="pt-[clamp(3rem,7vw,5rem)]"
      aria-labelledby="runtime-title"
    >
      <SectionHead
        eyebrow="Runtime"
        id="runtime-title"
        title={
          <>
            Per call, with the network <em class="text-teal-2">removed</em>.
          </>
        }
      >
        The HTTP client is mocked, so this is only the SDK's own work: encode,
        sign, serialize, parse, decode. Lower is better, so rows run fastest p50
        first; the faint bar on <em>Full call</em> rows is the mocked round-trip
        with no SDK at all.
      </SectionHead>
      <StatRow class="mb-8" tone="teal" stats={headline()} label="Headline" />

      <div class="panel overflow-hidden">
        <div
          class="flex flex-wrap gap-[0.3rem] border-b border-line px-[0.8rem] py-[0.7rem]"
          role="group"
          aria-label="Stage"
        >
          <For each={stages()}>
            {(s) => (
              <button
                type="button"
                class="cursor-pointer rounded-full border border-line-2 bg-transparent px-[0.8rem] py-[0.32rem] font-[inherit] text-[0.82rem] text-fg-2 transition-colors hover:border-fg-3 hover:text-fg aria-pressed:border-teal aria-pressed:bg-teal aria-pressed:text-bg"
                aria-pressed={stage() === s}
                onClick={() => setStage(s)}
              >
                {STAGE_LABELS[s] ?? s}
              </button>
            )}
          </For>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-[0.88rem] [&_td]:border-t [&_td]:border-line [&_td]:px-[0.9rem] [&_td]:py-[0.65rem] [&_td]:text-left [&_td]:align-middle [&_th]:border-t [&_th]:border-line [&_th]:px-[0.9rem] [&_th]:py-[0.65rem] [&_th]:text-left [&_th]:align-middle">
            <thead>
              <tr class="[&_th]:border-t-0 [&_th]:font-mono [&_th]:text-[0.7rem] [&_th]:font-normal [&_th]:tracking-[0.06em] [&_th]:text-fg-3 [&_th]:uppercase">
                <th scope="col">operation</th>
                <th scope="col" class="text-right!" aria-sort="ascending">
                  p50
                </th>
                <th scope="col" class="text-right!">
                  p99
                </th>
                <th scope="col" class="w-[26%] min-w-32 max-sm:hidden">
                  <span class="sr-only">relative p50</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={rows()}>
                {(x) => (
                  <tr>
                    <th scope="row" class="font-normal sm:min-w-56">
                      <span
                        class={`mr-2 inline-block rounded border border-line-2 px-[0.4rem] py-[0.05rem] font-mono text-[0.66rem] tracking-[0.04em] text-fg-3 uppercase ${PROVIDER_TONE[x.provider] ?? ""}`}
                      >
                        {x.provider}
                      </span>
                      <code class="text-[0.86rem] text-fg">
                        {x.service}.{x.op}
                      </code>
                      <Show when={x.note}>
                        <span class="mt-[0.15rem] block text-[0.76rem] text-fg-3">
                          {x.note}
                        </span>
                      </Show>
                    </th>
                    <td class="text-right! font-mono text-[0.82rem] font-medium whitespace-nowrap text-fg tabular-nums">
                      {ns(x.p50)}
                    </td>
                    <td class="text-right! font-mono text-[0.82rem] whitespace-nowrap text-fg-3 tabular-nums">
                      {ns(x.p99)}
                    </td>
                    <td class="max-sm:hidden">
                      <span
                        class="relative block h-2 overflow-hidden rounded-full border border-line bg-bg"
                        aria-hidden="true"
                      >
                        <i
                          class="absolute inset-y-0 left-0 rounded-[inherit] bg-linear-90 from-teal-2 to-teal"
                          style={{ width: `${barWidth(x).toFixed(1)}%` }}
                        />
                        <Show when={baseWidth(x) > 0}>
                          <em
                            class="absolute inset-y-0 left-0 rounded-[inherit] bg-[repeating-linear-gradient(90deg,color-mix(in_oklab,var(--fg)_45%,transparent)_0_3px,transparent_3px_6px)]"
                            style={{ width: `${baseWidth(x).toFixed(1)}%` }}
                            title="mock round-trip"
                          />
                        </Show>
                      </span>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
      <p class="mt-4 font-mono text-[0.74rem] text-fg-3 [&_code]:text-fg-2">
        {props.r.machine.runtime}
        {props.r.machine.cpu ? ` · ${props.r.machine.cpu}` : ""} ·{" "}
        {props.r.profile} profile · {shortDate(props.r.generatedAt)} ·{" "}
        <code>{props.r.commit}</code>
      </p>
    </section>
  );
};
