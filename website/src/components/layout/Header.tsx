import { A, useLocation } from "@solidjs/router";
import { DISCORD_URL, NPM_ORG_URL, REPO_URL } from "../../lib/site.ts";
import { BrandMark, DiscordIcon, GitHubIcon, NpmIcon } from "../ui/Icons.tsx";
import { ThemeToggle } from "./ThemeToggle.tsx";

const iconLink =
  "grid size-8 place-items-center rounded-full text-fg-2 transition-colors hover:bg-bg-3 hover:text-fg hover:no-underline max-sm:size-7";

/**
 * Sticky top bar. On phones the Problem/Providers links and the npm mark are
 * dropped and the two page links shorten to one word.
 */
export const Header = () => {
  const location = useLocation();
  const current = (path: string) => (location.pathname === path ? "page" : undefined);
  return (
    <header class="sticky top-0 z-10 border-b border-line bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] backdrop-blur-[10px] backdrop-saturate-140">
      <div class="mx-auto flex max-w-wrap items-center justify-between gap-6 px-gutter py-3.5 max-sm:gap-2.5 max-sm:px-4">
        <A
          href="/"
          class="inline-flex items-center gap-2.5 text-fg hover:no-underline"
          aria-label="Distilled home"
        >
          <BrandMark class="size-[1.6rem]" />
          <span class="display-48 text-[1.3rem] leading-none font-medium tracking-[-0.01em] max-sm:text-[1.15rem]">
            Distilled
          </span>
        </A>
        <nav
          class="flex min-w-0 items-center gap-6 text-[0.92rem] text-fg-2 max-sm:gap-2.5 max-sm:text-[0.82rem] [&_a]:whitespace-nowrap [&_a:hover]:text-fg [&_a[aria-current=page]]:text-fg"
          aria-label="Primary"
        >
          <a href="/#problem" class="max-sm:hidden">
            Problem
          </a>
          <a href="/#providers" class="max-sm:hidden">
            Providers
          </a>
          <A href="/bench" aria-current={current("/bench")}>
            <span class="max-sm:hidden">Benchmarks</span>
            <span class="sm:hidden">Bench</span>
          </A>
          <A
            href="/shame"
            class="text-rose hover:text-rose-2! aria-[current=page]:text-rose!"
            aria-current={current("/shame")}
          >
            <span class="max-sm:hidden">Wall of Shame</span>
            <span class="sm:hidden">Shame</span>
          </A>
          <span class="ml-1 inline-flex items-center gap-1.5 border-l border-line pl-3.5 max-sm:ml-0 max-sm:gap-0.5 max-sm:pl-2">
            <a class={iconLink} href={REPO_URL} rel="noopener" aria-label="GitHub" title="GitHub">
              <GitHubIcon class="size-[1.05rem] max-sm:size-[0.95rem]" />
            </a>
            <a
              class={`${iconLink} hover:text-discord!`}
              href={DISCORD_URL}
              rel="noopener"
              aria-label="Discord"
              title="Discord"
            >
              <DiscordIcon class="size-[1.05rem] max-sm:size-[0.95rem]" />
            </a>
            <a
              class={`${iconLink} hover:text-npm! max-sm:hidden`}
              href={NPM_ORG_URL}
              rel="noopener"
              aria-label="npm"
              title="npm"
            >
              <NpmIcon class="size-[1.05rem]" />
            </a>
          </span>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
