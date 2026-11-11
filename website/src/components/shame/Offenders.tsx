import { For, Show } from "solid-js";
import type { RankedPackage } from "../../../build/site-data.ts";
import { n, plural, rate } from "../../lib/format.ts";
import { npmUrl, patchesUrl } from "../../lib/site.ts";
import { ProviderMark } from "../ui/BrandMark.tsx";
import { Bar } from "../ui/Stats.tsx";

const OP_LABELS: Record<string, string> = {
  add: "added",
  replace: "replaced",
  remove: "removed",
  move: "moved",
  copy: "copied",
  test: "tested",
  declare: "declared",
  other: "other",
};

const TIER = ["gold", "silver", "bronze"] as const;

/** Badge for packages imported by Alchemy on `main`. */
export const UsedBadge = () => (
  <span
    class="rounded-full border border-[color-mix(in_oklab,var(--teal)_55%,var(--line-2))] px-2 py-[0.14rem] font-mono text-[0.66rem] tracking-[0.06em] whitespace-nowrap text-teal uppercase"
    title="Imported by Alchemy resources on main"
  >
    used in Alchemy
  </span>
);

const OffenderRow = (props: { s: RankedPackage; rank: number; max: number }) => {
  const per100 = () => props.s.per100 ?? 0;
  const width = () => Math.max(2, Math.round((per100() / props.max) * 100));
  const tier = () => TIER[props.rank - 1];
  const ops = () =>
    Object.entries(props.s.ops)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);
  return (
    <li
      class="panel grid grid-cols-[2.6rem_minmax(0,1fr)] gap-x-4 px-5 pt-[1.1rem] pb-4"
      classList={{
        "border-[color-mix(in_oklab,var(--rose)_55%,var(--line))] bg-[radial-gradient(36rem_10rem_at_0%_0%,color-mix(in_oklab,var(--rose)_16%,transparent),transparent_70%),color-mix(in_oklab,var(--bg-2)_85%,transparent)]":
          tier() === "gold",
        "border-[color-mix(in_oklab,var(--rose)_32%,var(--line))]": tier() === "silver",
        "border-[color-mix(in_oklab,var(--rose)_18%,var(--line))]": tier() === "bronze",
      }}
    >
      <span
        class="display-72 pt-[0.1rem] text-[1.8rem] leading-none text-fg-3 tabular-nums"
        classList={{ "text-rose-2": tier() !== undefined }}
        aria-label={`Rank ${props.rank}`}
      >
        {String(props.rank).padStart(2, "0")}
      </span>
      <div class="grid min-w-0 gap-[0.55rem]">
        <div class="flex flex-wrap items-center gap-x-[0.7rem] gap-y-1">
          <ProviderMark
            dir={props.s.dir}
            short={props.s.short}
            hasIcon={props.s.hasIcon}
            class={`size-[1.9rem] ${tier() ? "border-[color-mix(in_oklab,var(--rose)_45%,var(--line-2))] text-rose-2" : ""}`}
            icon="size-[1.05rem]"
          />
          <a
            class="font-mono text-[1.05rem] font-medium text-fg before:font-normal before:text-fg-3 before:content-['@distilled.cloud/']"
            href={npmUrl(props.s.name)}
            rel="noopener"
          >
            {props.s.short}
          </a>
          <Show when={props.s.used}>
            <UsedBadge />
          </Show>
          <span class="ml-auto font-mono text-[0.8rem] whitespace-nowrap text-fg-3">
            <b class="text-[1.05rem] text-rose-2 tabular-nums">{rate(per100())}</b> fixes / 100 ops
          </span>
        </div>
        <Bar width={width()} />
        <div class="flex flex-wrap gap-x-[1.1rem] gap-y-1.5 font-mono text-[0.76rem] text-fg-3 [&_b]:font-medium [&_b]:text-fg-2 [&_b]:tabular-nums">
          <span>
            <b>{n(props.s.fixes)}</b> fixes
          </span>
          <span>
            <b>{n(props.s.operations)}</b> operations
          </span>
          <span>
            <b>{n(props.s.files)}</b> patch {props.s.files === 1 ? "file" : "files"}
          </span>
          <a class="ml-auto text-fg-2" href={patchesUrl(props.s.dir)} rel="noopener">
            see patches →
          </a>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <For each={ops()}>
            {([kind, count]) => (
              <span
                class="chip"
                classList={{
                  "border-[color-mix(in_oklab,var(--rose)_45%,var(--line-2))]": kind === "remove",
                }}
              >
                <b>{n(count)}</b> {OP_LABELS[kind] ?? kind}
              </span>
            )}
          </For>
        </div>
      </div>
    </li>
  );
};

export const Offenders = (props: { offenders: ReadonlyArray<RankedPackage> }) => {
  const max = () => props.offenders[0]?.per100 ?? 1;
  return (
    <ol class="m-0 grid list-none gap-[0.6rem] p-0">
      <For each={props.offenders}>{(s, i) => <OffenderRow s={s} rank={i() + 1} max={max()} />}</For>
    </ol>
  );
};

/** Compact card list for the honour roll and the unproven list. */
export const HonourList = (props: {
  items: ReadonlyArray<RankedPackage>;
  muted?: boolean;
  empty?: string;
}) => (
  <ul class="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-[0.45rem] p-0">
    <Show
      when={props.items.length > 0}
      fallback={
        <li class="display-48 col-span-full rounded-card border border-dashed border-line-2 px-6 py-[1.4rem] text-[1.25rem] leading-[1.35] text-pretty text-fg-2">
          {props.empty}
        </li>
      }
    >
      <For each={props.items}>
        {(s) => (
          <li>
            <a
              class="group/h flex items-center gap-[0.6rem] rounded-lg border border-line bg-[color-mix(in_oklab,var(--bg-2)_80%,transparent)] py-[0.45rem] pr-[0.7rem] pl-2 transition-[border-color,opacity] hover:border-[color-mix(in_oklab,var(--accent)_50%,var(--line-2))] hover:no-underline"
              classList={{ "opacity-72 hover:opacity-100": props.muted }}
              href={npmUrl(s.name)}
              rel="noopener"
            >
              <ProviderMark
                dir={s.dir}
                short={s.short}
                hasIcon={s.hasIcon}
                class={`size-[1.8rem] flex-none group-hover/h:border-[color-mix(in_oklab,var(--accent)_45%,var(--line-2))] group-hover/h:text-accent ${props.muted ? "text-fg-3" : ""}`}
                icon="size-4"
              />
              <span class="min-w-0 flex-1 overflow-hidden font-mono text-[0.86rem] text-ellipsis whitespace-nowrap text-fg">
                {s.short}
              </span>
              <span class="font-mono text-[0.7rem] whitespace-nowrap text-fg-3 tabular-nums">
                {plural(s.operations, "op")}
              </span>
            </a>
          </li>
        )}
      </For>
    </Show>
  </ul>
);
