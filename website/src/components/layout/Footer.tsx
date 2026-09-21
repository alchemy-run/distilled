import { A } from "@solidjs/router";
import { ALCHEMY_URL, NPM_ORG_URL, REPO_URL } from "../../lib/site.ts";

const Sep = () => (
  <span class="mx-2" aria-hidden="true">
    ·
  </span>
);

export const Footer = () => (
  <footer class="border-t border-line bg-bg">
    <div class="mx-auto flex max-w-wrap flex-wrap justify-between gap-x-8 gap-y-3 px-gutter pt-6 pb-8 text-[0.88rem] text-fg-3 [&_a]:text-fg-2 [&_a:hover]:text-fg">
      <p>
        <span class="display-48 text-[1.05rem] font-medium text-fg">Distilled</span>
        <Sep />
        Apache-2.0
        <Sep />
        built for{" "}
        <a href="https://effect.website" rel="noopener">
          Effect
        </a>
      </p>
      <p>
        <a href={REPO_URL} rel="noopener">
          alchemy-run/distilled
        </a>
        <Sep />
        <a href={NPM_ORG_URL} rel="noopener">
          npm
        </a>
        <Sep />
        <A href="/shame">Wall of Shame</A>
        <Sep />
        <a href={ALCHEMY_URL} rel="noopener">
          alchemy.run
        </a>
      </p>
    </div>
  </footer>
);
