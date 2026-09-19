import shame from "site:shame";
import { Seo } from "../components/layout/Seo.tsx";
import { HonourList, Offenders } from "../components/shame/Offenders.tsx";
import { Method, Page, SectionHead } from "../components/ui/Section.tsx";
import { StatRow } from "../components/ui/Stats.tsx";
import { n } from "../lib/format.ts";
import { ALCHEMY_URL, REPO_URL } from "../lib/site.ts";

export default function Shame() {
  const totals = shame.totals;
  return (
    <>
      <Seo
        title="Wall of Shame — Distilled"
        description="Which cloud providers ship an API description that needs the most fixing before it can be turned into a working SDK. Ranked by patches per 100 operations."
        social="Providers ranked by how many patches their API description needs before it generates a working SDK."
        path="/shame"
      />
      <Page glow="rose">
        <section
          class="max-w-[52rem] pt-[clamp(3rem,8vw,6rem)] pb-[clamp(2rem,4vw,3rem)]"
          aria-labelledby="shame-title"
        >
          <p class="eyebrow">Wall of Shame</p>
          <h1 id="shame-title" class="mb-5">
            Some specs arrive <em>clean</em>. Some need work.
          </h1>
          <p class="mb-7 max-w-[34em] text-[clamp(1.05rem,1rem+0.35vw,1.2rem)] text-pretty text-fg-2">
            Every Distilled SDK is generated from the provider's own API
            description. When that description is wrong — a missing error
            response, a field marked required that isn't, a type that lies — we
            fix it with a JSON patch against the spec so the generator can do
            its job. This page counts those patches.
          </p>
          <p class="mb-7 max-w-[34em] text-base text-pretty text-fg-3 [&_strong]:font-semibold [&_strong]:text-fg-2">
            Ranked by <strong>fixes per 100 operations</strong>, so a huge API
            isn't punished for being huge. Providers with no patches at all are
            in the honour roll below. Numbers come from{" "}
            <code>packages/*/patches</code> at build time.
          </p>
        </section>

        <StatRow
          class="mb-[clamp(3rem,7vw,5rem)]"
          stats={[
            { n: n(totals.fixes), label: "spec fixes carried" },
            { n: n(totals.files), label: "patch files" },
            { n: n(totals.patched), label: "providers patched" },
            { n: n(totals.clean), label: "clean & used in Alchemy" },
          ]}
        />

        <section
          id="honour"
          class="pb-[clamp(3rem,7vw,5rem)]"
          aria-labelledby="honour-title"
        >
          <SectionHead
            eyebrow="Honour roll"
            id="honour-title"
            title={
              <>
                Zero patches, <em>and</em> used in Alchemy.
              </>
            }
          >
            Used by real{" "}
            <a href={ALCHEMY_URL} rel="noopener">
              Alchemy
            </a>{" "}
            resources today <em>and</em> never needed a spec fix. The API
            description generated a working SDK as published — which is what a
            spec is supposed to do.
          </SectionHead>
          <HonourList
            items={shame.honour}
            empty="Nobody. Every package Alchemy uses has needed at least one spec fix. The bar is here; nobody has cleared it yet."
          />
        </section>

        <section
          id="board"
          class="pb-[clamp(3rem,7vw,5rem)]"
          aria-labelledby="board-title"
        >
          <SectionHead
            eyebrow="Worst offenders"
            id="board-title"
            title="Most patched, per 100 operations."
          />
          <Offenders offenders={shame.offenders} />
        </section>

        <section
          class="pb-[clamp(3rem,7vw,5rem)]"
          aria-labelledby="unproven-title"
        >
          <SectionHead
            eyebrow="Not yet exercised"
            id="unproven-title"
            title={
              <>
                Zero patches, zero <em class="text-fg-3">evidence</em>.
              </>
            }
          >
            {shame.unproven.length} {shame.honour.length > 0 ? "more " : ""}
            providers have no patches, but no consumer has leaned on them yet. A
            clean sheet here means <em>untested</em>, not <em>correct</em> —
            they move up once something real depends on them.
          </SectionHead>
          <HonourList items={shame.unproven} muted />
        </section>

        <Method id="method" title="Method — how this is counted">
          <li>
            A <strong>fix</strong> is one{" "}
            <a href="https://jsonpatch.com" rel="noopener">
              JSON Patch
            </a>{" "}
            operation (<code>add</code>, <code>replace</code>,{" "}
            <code>remove</code>, <code>move</code>, …) in a file under{" "}
            <code>packages/&lt;provider&gt;/patches/</code>. For AWS, whose
            patches are declarative, each named operation, structure or error
            entry counts as one.
          </li>
          <li>
            An <strong>operation</strong> is one generated SDK call — an
            exported <code>OperationMethod</code> in <code>src/services/</code>.
          </li>
          <li>
            Patches are how we keep SDKs correct without editing generated code;
            they survive regeneration. A high count says something about the
            spec, not the provider's API.
          </li>
          <li>
            <strong>Used in Alchemy</strong> means an{" "}
            <a href={ALCHEMY_URL} rel="noopener">
              Alchemy resource
            </a>{" "}
            imports the package on <code>main</code> — read from Alchemy's{" "}
            <code>package.json</code> at build time (checked{" "}
            {shame.alchemy.checked}
            {shame.alchemy.source === "fallback" ? ", cached" : ""}). Zero
            patches on a package nobody consumes is not counted as clean.
          </li>
          <li>
            Think a count is wrong? Open an issue in{" "}
            <a href={REPO_URL} rel="noopener">
              alchemy-run/distilled
            </a>
            . When a provider fixes its description upstream, the patch goes
            away.
          </li>
        </Method>
      </Page>
    </>
  );
}
