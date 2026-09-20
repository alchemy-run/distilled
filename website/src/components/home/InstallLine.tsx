import { createEffect, onMount, type Accessor } from "solid-js";
import { createMorph, type Morph } from "../../lib/morph.ts";
import { choosePm, pm, restorePm, VERB, type Pm } from "../../lib/pm.ts";
import { CopyButton } from "../ui/CopyButton.tsx";
import { CaretIcon } from "../ui/Icons.tsx";

/**
 * "<pm> <verb> @distilled.cloud/<pkg> effect". The manager comes from the
 * select (remembered in localStorage and shared with the catalogue), the
 * package from the active hero sample; the part after the manager morphs
 * when either changes.
 */
export const InstallLine = (props: { pkg: Accessor<string> }) => {
  let cmd: HTMLElement | undefined;
  let morph: Morph | undefined;

  const text = () => `${VERB[pm()]} @distilled.cloud/${props.pkg()} effect`;

  onMount(() => {
    restorePm();
    morph = createMorph(cmd!, { duration: 640 });
    createEffect(() => morph!.set(text()));
  });

  return (
    <div
      class="inline-flex max-w-full items-stretch overflow-hidden rounded-lg border border-line bg-bg-2 font-mono text-[0.9rem] max-sm:w-full"
      style={{ "--pm-ch": pm().length }}
    >
      <label class="relative inline-flex flex-none items-stretch border-r border-line bg-bg-3">
        <span class="sr-only">Package manager</span>
        <select
          class="w-[calc(var(--pm-ch)*1ch+2.3rem)] cursor-pointer appearance-none rounded-none border-0 bg-transparent py-[0.65rem] pr-6 pl-[0.8rem] font-[inherit] text-accent transition-colors hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] focus-visible:-outline-offset-2"
          aria-label="Package manager"
          value={pm()}
          onChange={(e) => choosePm(e.currentTarget.value as Pm)}
        >
          <option value="pnpm">pnpm</option>
          <option value="npm">npm</option>
          <option value="bun">bun</option>
        </select>
        <CaretIcon class="pointer-events-none absolute top-1/2 right-[0.55rem] size-2.5 -translate-y-1/2 text-fg-3" />
      </label>
      {/* `self-center` centres the text, not `items-center`: torph's injected
          `[torph-root]` rule sets `display` on this element once it loads. */}
      <code
        ref={(el) => (cmd = el)}
        class="self-center overflow-x-auto px-[0.85rem] text-[inherit] whitespace-nowrap [scrollbar-width:none] max-sm:flex-1"
      >
        {text()}
      </code>
      <CopyButton
        class="mr-[0.4rem] ml-auto self-center"
        label="Copy install command"
        text={() => `${pm()} ${text()}`}
      />
    </div>
  );
};
