import home from "site:home";
import { createMemo } from "solid-js";
import type { CatalogPackage } from "../../../build/site-data.ts";
import { useFitCode } from "../../lib/dom.ts";
import { n } from "../../lib/format.ts";
import { Seo } from "../layout/Seo.tsx";
import { Page } from "../ui/Section.tsx";
import { Capabilities } from "./Capabilities.tsx";
import { Catalog } from "./Catalog.tsx";
import { Hero } from "./Hero.tsx";
import { HowItWorks } from "./HowItWorks.tsx";
import { Problem } from "./Problem.tsx";

const PROVIDERS = home.groups.flatMap((group) => group.packages);

const OPERATIONS = PROVIDERS.reduce(
  (sum, pkg) => sum + pkg.stats.operations,
  0,
);

const HOME_SEO = {
  title: "Distilled — Effect-native SDKs for cloud providers",
  description: `Effect-native TypeScript SDKs for cloud providers. Enjoy typed errors, declarative retry policies, streaming pagination and optimal tree-shaking`,
  social: `Effect-native TypeScript SDKs for cloud providers. Enjoy typed errors, declarative retry policies, streaming pagination and optimal tree-shaking`,
};

/** How a provider's patch record reads in its page description. */
const record = (pkg: CatalogPackage): string => {
  const stats = pkg.stats;
  if (stats.honour) {
    return `Generated as published — zero spec fixes — and Alchemy runs on it.`;
  }
  if (stats.fixes === 0) {
    return `No spec fixes needed so far, though nothing depends on it yet.`;
  }
  return `${n(stats.fixes)} spec fixes so far — No. ${stats.rank} of ${stats.ranked} on the Wall of Shame.`;
};

const providerSeo = (pkg: CatalogPackage) => {
  const ops = `${n(pkg.stats.operations)} typed operations`;
  return {
    title: `${pkg.name} — Distilled`,
    description: `The Effect-native TypeScript SDK for ${pkg.short}: ${ops}, typed errors, declarative retry policies, and optimial tree-shaking. ${record(pkg)}`,
    social: `Effect TypeScript SDK for ${ops}, typed errors, declarative retry policies, and more - ${record(pkg)}`,
  };
};

/**
 * The homepage. `/p/<provider>` renders the same page pinned to one provider:
 * its own social card, the hero install line fixed to it, and its catalogue
 * entry opened and scrolled to.
 */
export const Home = (props: { provider?: string }) => {
  useFitCode();
  const pinned = createMemo(() =>
    PROVIDERS.find((pkg) => pkg.dir === props.provider),
  );
  const seo = createMemo(() => {
    const pkg = pinned();
    return pkg ? providerSeo(pkg) : HOME_SEO;
  });
  return (
    <>
      <Seo
        title={seo().title}
        description={seo().description}
        social={seo().social}
        path={pinned() ? `/p/${pinned()!.dir}` : "/"}
        canonicalPath="/"
        card={pinned()?.card}
        cardAlt={pinned() ? `Distilled — ${pinned()!.name}` : undefined}
      />
      <Page>
        <Hero
          providerCount={home.providerCount}
          operationCount={OPERATIONS}
          provider={pinned()}
        />
        <Capabilities bench={home.bench} />
        <Problem facts={home.facts} />
        <HowItWorks />
        <Catalog
          providerCount={home.providerCount}
          groups={home.groups}
          pinned={pinned()?.dir}
        />
      </Page>
    </>
  );
};
