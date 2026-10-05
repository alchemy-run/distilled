import { toggleTheme } from "../../lib/theme.ts";
import { MoonIcon, SunIcon } from "../ui/Icons.tsx";

export const ThemeToggle = () => (
  <button
    type="button"
    class="grid size-8 flex-none cursor-pointer place-items-center rounded-full border border-line-2 bg-bg-2 p-0 text-fg-2 transition-[color,border-color,transform] hover:rotate-[20deg] hover:border-fg-3 hover:text-fg max-sm:size-7"
    aria-label="Toggle dark or light theme"
    title="Toggle theme"
    onClick={toggleTheme}
  >
    <SunIcon class="theme-sun size-4" />
    <MoonIcon class="theme-moon size-4" />
  </button>
);
