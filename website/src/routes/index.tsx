import home from "site:home";
import { useFitCode } from "../lib/dom.ts";
import { Seo } from "../components/layout/Seo.tsx";
import { Capabilities } from "../components/home/Capabilities.tsx";
import { Catalog } from "../components/home/Catalog.tsx";
import { Hero } from "../components/home/Hero.tsx";
import { HowItWorks } from "../components/home/HowItWorks.tsx";
import { Problem } from "../components/home/Problem.tsx";
import { Page } from "../components/ui/Section.tsx";

export default function Home() {
  useFitCode();
  return (
    <>
      <Seo
        title="Distilled — Effect-native SDKs for cloud providers"
        description="Effect-native TypeScript SDKs for cloud providers, generated from each provider's own API description. Typed errors, streaming pagination, credentials as layers. One package per provider."
        social="Effect-native TypeScript SDKs, generated from each provider's own API description. One package per provider, Apache-2.0."
        path="/"
      />
      <Page>
        <Hero providerCount={home.providerCount} />
        <Capabilities bench={home.bench} />
        <Problem facts={home.facts} />
        <HowItWorks />
        <Catalog providerCount={home.providerCount} groups={home.groups} />
      </Page>
    </>
  );
}
