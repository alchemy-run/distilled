import { A } from "@solidjs/router";
import {
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import type { CatalogGroup, CatalogPackage } from "../../../build/site-data.ts";
import { plural } from "../../lib/format.ts";
import { npmUrl, REPO_URL, sourceUrl } from "../../lib/site.ts";
import { ProviderMark } from "../ui/BrandMark.tsx";
import { SearchIcon } from "../ui/Icons.tsx";

/** Group accent colours cycle through the palette. */
const GROUP_COLOURS = ["accent", "teal", "violet", "rose"] as const;

const PackageCard = (props: { pkg: CatalogPackage }) => (
  <li class="group/pkg relative grid grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-[0.7rem] gap-y-[0.1rem] rounded-lg border border-line bg-[color-mix(in_oklab,var(--bg-2)_80%,transparent)] py-[0.65rem] pr-[0.85rem] pl-[0.7rem] transition-[border-color,background-color] hover:border-[color-mix(in_oklab,var(--g)_55%,var(--line-2))] hover:bg-bg-2">
    <ProviderMark
      dir={props.pkg.dir}
      short={props.pkg.short}
      hasIcon={props.pkg.hasIcon}
      class="col-start-1 row-span-2 size-[2.1rem] group-hover/pkg:border-[color-mix(in_oklab,var(--g)_45%,var(--line-2))] group-hover/pkg:bg-[color-mix(in_oklab,var(--g)_8%,var(--bg))] group-hover/pkg:text-(--g)"
    />
    {/* The whole card is the npm link, via the ::after overlay. */}
    <a
      class="col-start-2 overflow-hidden font-mono text-[0.9rem] font-medium text-ellipsis whitespace-nowrap text-fg after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
      href={npmUrl(props.pkg.name)}
      rel="noopener"
    >
      {props.pkg.short}
    </a>
    <span class="col-start-2 flex gap-[0.6rem] font-mono text-[0.72rem] text-fg-3">
      <Show when={props.pkg.version}>
        <span>{props.pkg.version}</span>
      </Show>
    </span>
    <a
      class="relative z-1 col-start-3 row-span-2 self-center rounded-md border border-transparent px-2 py-1 font-mono text-[0.72rem] text-fg-3 hover:border-line-2 hover:text-fg hover:no-underline"
      href={sourceUrl(props.pkg.dir)}
      rel="noopener"
      aria-label={`${props.pkg.short} source on GitHub`}
    >
      src
    </a>
  </li>
);

export const Catalog = (props: {
  providerCount: number;
  groups: ReadonlyArray<CatalogGroup>;
}) => {
  const [query, setQuery] = createSignal("");
  let input: HTMLInputElement | undefined;

  // Filter matches on name, directory and hint words; empty groups hide.
  const visible = createMemo(() => {
    const q = query().trim().toLowerCase();
    return props.groups
      .map((g) => ({
        ...g,
        packages: q
          ? g.packages.filter((p) => p.search.includes(q))
          : g.packages,
      }))
      .filter((g) => g.packages.length > 0);
  });

  onMount(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement !== input &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        e.preventDefault();
        input?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    onCleanup(() => document.removeEventListener("keydown", onKey));
  });

  return (
    <section
      class="pt-[clamp(3.5rem,8vw,6rem)]"
      id="providers"
      aria-labelledby="providers-title"
    >
      <div class="mb-9 grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] md:gap-12">
        <div>
          <p class="eyebrow">Providers</p>
          <h2 id="providers-title">
            <span class="text-accent-2 tabular-nums">
              {props.providerCount}
            </span>{" "}
            providers, one shape.
          </h2>
          <p class="mt-4 max-w-measure text-[1.05rem] text-fg-2">
            Each provider is one package, generated from that provider's own API
            description and published to npm as{" "}
            <code>@distilled.cloud/&lt;provider&gt;</code>. Pair it with{" "}
            <code>effect</code>. Some descriptions needed more fixing than
            others —{" "}
            <A
              class="whitespace-nowrap text-rose hover:text-rose-2"
              href="/shame"
            >
              see the Wall of Shame →
            </A>
          </p>
        </div>
        <label class="relative flex items-center gap-[0.6rem] rounded-[10px] border border-line-2 bg-bg-2 px-[0.8rem] text-fg-3 focus-within:border-accent focus-within:text-fg-2">
          <span class="sr-only">Filter providers</span>
          <SearchIcon class="size-4" />
          <input
            ref={(el) => (input = el)}
            id="filter"
            type="search"
            class="min-w-0 flex-1 border-0 bg-transparent py-3 font-[inherit] text-[0.95rem] text-fg outline-none placeholder:text-fg-3 [&::-webkit-search-cancel-button]:appearance-none"
            placeholder="Filter — try “postgres” or “auth”"
            autocomplete="off"
            spellcheck={false}
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
          <kbd
            class="rounded-[5px] border border-b-2 border-line-2 px-[0.45rem] py-[0.05rem] text-[0.72rem] text-fg-3 max-sm:hidden"
            aria-hidden="true"
          >
            /
          </kbd>
        </label>
      </div>

      <div class="grid gap-10">
        <For each={visible()}>
          {(group, i) => (
            <section
              class="grid gap-4 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8"
              style={{
                "--g": `var(--${GROUP_COLOURS[i() % GROUP_COLOURS.length]})`,
              }}
              aria-label={group.title}
            >
              <h3 class="display-48 m-0 text-[1.35rem] leading-[1.15] text-fg before:mr-[0.55rem] before:inline-block before:size-2 before:rotate-45 before:rounded-[2px] before:bg-(--g) before:align-[0.18em] before:content-['']">
                {group.title}
                <span class="mt-1 block pl-[1.05rem] font-mono text-[0.72rem] tracking-[0.06em] text-fg-3">
                  {plural(group.packages.length, "provider")}
                </span>
              </h3>
              <ul class="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-[repeat(auto-fill,minmax(15.5rem,1fr))]">
                <For each={group.packages}>
                  {(pkg) => <PackageCard pkg={pkg} />}
                </For>
              </ul>
            </section>
          )}
        </For>
      </div>
      <Show when={visible().length === 0}>
        <p class="mt-4 rounded-card border border-dashed border-line-2 p-8 text-center text-fg-2">
          Nothing matches.{" "}
          <a
            class="text-accent"
            href={`${REPO_URL}/issues/new?title=Provider%20request%3A%20`}
            rel="noopener"
          >
            Request a provider →
          </a>
        </p>
      </Show>
    </section>
  );
};
