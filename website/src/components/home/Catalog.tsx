import { A } from "@solidjs/router";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import type { CatalogGroup, CatalogPackage } from "../../../build/site-data.ts";
import { n, plural } from "../../lib/format.ts";
import { installCommand, installVerb, restorePm } from "../../lib/pm.ts";
import { npmUrl, patchesUrl, REPO_URL, sourceUrl } from "../../lib/site.ts";
import { ProviderMark } from "../ui/BrandMark.tsx";
import { CopyButton } from "../ui/CopyButton.tsx";
import { CaretIcon, GitHubIcon, NpmIcon, SearchIcon } from "../ui/Icons.tsx";

/** Group accent colours cycle through the palette. */
const GROUP_COLOURS = ["accent", "teal", "violet", "rose"] as const;

/**
 * One catalogue entry. The header row toggles the body, which carries the
 * provider's patch record, an install command in the reader's package manager
 * and the links out to npm, the source and the patches.
 */
const PackageCard = (props: {
  pkg: CatalogPackage;
  open: boolean;
  pinned: boolean;
  onToggle: () => void;
  ref: (el: HTMLLIElement) => void;
}) => {
  const stats = () => props.pkg.stats;
  const bodyId = () => `pkg-${props.pkg.dir}`;
  return (
    <li
      ref={props.ref}
      class="pkg group/pkg relative grid min-w-0 rounded-lg border"
      classList={{ "is-open": props.open, "is-pinned": props.pinned }}
    >
      <div class="relative grid grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-[0.7rem] gap-y-[0.1rem] py-[0.65rem] pr-[0.85rem] pl-[0.7rem]">
        <ProviderMark
          dir={props.pkg.dir}
          short={props.pkg.short}
          hasIcon={props.pkg.hasIcon}
          class="col-start-1 row-span-2 size-[2.1rem] group-hover/pkg:border-[color-mix(in_oklab,var(--g)_45%,var(--line-2))] group-hover/pkg:bg-[color-mix(in_oklab,var(--g)_8%,var(--bg))] group-hover/pkg:text-(--g)"
        />
        {/* The whole header row is the toggle, via the ::after overlay; the
            body's own links sit outside it and stay clickable. */}
        <button
          type="button"
          class="col-start-2 cursor-pointer border-0 bg-transparent p-0 text-left font-mono text-[0.9rem] font-medium text-ellipsis whitespace-nowrap text-fg after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
          aria-expanded={props.open}
          aria-controls={bodyId()}
          onClick={props.onToggle}
        >
          {props.pkg.short}
        </button>
        {/* The closed card carries the version and nothing else; the patch
            record and what uses the package live in the body. */}
        <span class="col-start-2 flex gap-[0.6rem] font-mono text-[0.72rem] text-fg-3">
          <Show when={props.pkg.version}>
            <span>{props.pkg.version}</span>
          </Show>
          <Show when={stats().honour}>
            <span class="text-teal" title="Honour roll — zero spec fixes">
              zero fixes
            </span>
          </Show>
        </span>
        <CaretIcon class="pkg-caret col-start-3 row-span-2 size-3 self-center text-fg-3" />
      </div>

      <div class="pkg-body min-w-0" id={bodyId()}>
        <div class="min-w-0">
          <div class="grid min-w-0 gap-[0.55rem] border-t border-line px-[0.7rem] pt-[0.7rem] pb-[0.8rem] font-mono text-[0.78rem] text-fg-3">
            {/* The whole command is wider than a card column at any readable
                size, so the button carries the verb and copies the line the
                card header already names. */}
            <CopyButton
              class="h-8 w-full text-fg-2"
              label={`Copy ${installCommand(props.pkg.name)}`}
              text={() => installCommand(props.pkg.name)}
            >
              {installVerb()}
            </CopyButton>

            <div class="flex flex-wrap gap-x-[0.9rem] gap-y-1 [&_b]:font-medium [&_b]:text-fg-2 [&_b]:tabular-nums">
              <span>
                <b>{n(stats().operations)}</b> operations
              </span>
              <Show
                when={stats().fixes > 0}
                fallback={<span>no spec fixes</span>}
              >
                <span>
                  <b>{n(stats().fixes)}</b> spec fixes
                </span>
              </Show>
            </div>

            <Show when={stats().honour}>
              <p class="m-0 text-teal">
                Honour roll — generated as published, and Alchemy runs on it.
              </p>
            </Show>
            <Show when={stats().rank !== null}>
              <p class="m-0">
                <A class="text-rose hover:text-rose-2" href="/shame">
                  No. {stats().rank} of {stats().ranked} on the Wall of Shame →
                </A>
              </p>
            </Show>
            <Show when={stats().used && !stats().honour}>
              <p class="m-0 text-teal">Used in Alchemy</p>
            </Show>
            <Show when={stats().fixes === 0 && !stats().used}>
              <p class="m-0">No spec fixes yet — nothing depends on it.</p>
            </Show>

            <div class="flex flex-wrap items-center gap-x-[0.9rem] gap-y-1">
              <a
                class="inline-flex items-center gap-1.5 text-fg-2 hover:text-fg"
                href={npmUrl(props.pkg.name)}
                rel="noopener"
              >
                <NpmIcon class="size-3.5" />
                npm
              </a>
              <a
                class="inline-flex items-center gap-1.5 text-fg-2 hover:text-fg"
                href={sourceUrl(props.pkg.dir)}
                rel="noopener"
              >
                <GitHubIcon class="size-3.5" />
                source
              </a>
              <Show when={stats().files > 0}>
                <a
                  class="ml-auto text-fg-2 hover:text-fg"
                  href={patchesUrl(props.pkg.dir)}
                  rel="noopener"
                >
                  {plural(stats().files, "patch file")} →
                </a>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export const Catalog = (props: {
  providerCount: number;
  groups: ReadonlyArray<CatalogGroup>;
  /** `packages/<dir>` of the provider `/p/<provider>` pins, if any. */
  pinned?: string;
}) => {
  const [query, setQuery] = createSignal("");
  const [open, setOpen] = createSignal<ReadonlySet<string>>(new Set());
  const cards = new Map<string, HTMLLIElement>();
  let input: HTMLInputElement | undefined;

  const toggle = (dir: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(dir)) next.add(dir);
      return next;
    });

  // `/p/<provider>` opens that provider's card and scrolls to it. An effect
  // rather than `onMount`, so routing from one provider page to another moves
  // to the new card.
  createEffect(() => {
    const dir = props.pinned;
    if (!dir) return;
    setOpen((prev) => new Set(prev).add(dir));
    const card = cards.get(dir);
    if (!card) return;
    // A frame late: the card has just been opened, and scrolling before the
    // body has any height lands short of it.
    requestAnimationFrame(() =>
      card.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      }),
    );
  });

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
    // The install buttons name the reader's package manager even if the hero
    // never mounted it.
    restorePm();
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
              {/* `items-start`: an expanded card must not stretch every other
                  card in its row to match. */}
              <ul class="m-0 grid list-none grid-cols-1 items-start gap-2 p-0 sm:grid-cols-[repeat(auto-fill,minmax(15.5rem,1fr))]">
                <For each={group.packages}>
                  {(pkg) => (
                    <PackageCard
                      pkg={pkg}
                      open={open().has(pkg.dir)}
                      pinned={props.pinned === pkg.dir}
                      onToggle={() => toggle(pkg.dir)}
                      ref={(el) => cards.set(pkg.dir, el)}
                    />
                  )}
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
