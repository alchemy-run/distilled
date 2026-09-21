import { A } from "@solidjs/router";
import { For, type JSX } from "solid-js";
import type { BenchHeadline } from "../../../build/site-data.ts";
import { revealOnScroll } from "../../lib/dom.ts";
import { Code } from "../ui/Code.tsx";
import { SectionHead } from "../ui/Section.tsx";

const Cap = (props: {
  index: number;
  title: string;
  code: string;
  children: JSX.Element;
}) => (
  <article
    class="reveal-item panel flex min-w-0 flex-col gap-3 px-[1.6rem] pt-6 pb-[1.6rem] hover:border-line-2"
    style={{ "--i": props.index }}
  >
    <h3 class="display-48 text-[1.45rem] leading-[1.15] text-fg">
      {props.title}
    </h3>
    <Code
      src={props.code}
      class="my-[0.2rem] rounded-lg border border-line bg-bg px-[0.9rem] py-3 leading-[1.6]"
    />
    <p class="m-0 text-[0.93rem] text-pretty text-fg-2">{props.children}</p>
  </article>
);

export const Capabilities = (props: { bench: BenchHeadline }) => {
  const stats = () => [
    ["gzipped, one S3 operation", props.bench.s3Gzip],
    ["gzipped, one Workers operation", props.bench.cfGzip],
    ["Cloudflare call, p50", props.bench.cfP50],
    ["AWS call incl. SigV4, p50", props.bench.awsP50],
  ];
  return (
    <section
      class="rule py-section"
      id="features"
      aria-labelledby="features-title"
    >
      <SectionHead
        eyebrow="What you get"
        id="features-title"
        title={
          <>
            Built on <em>Effect</em>, not wrapped in it.
          </>
        }
      >
        Every operation returns an Effect. Each package builds the parts an SDK
        usually bolts on — typed errors, a retry policy, paginated streams, a
        credential chain, a span per request — and hands them to you as ordinary
        Effect values: a Schedule you can swap, a Stream you can pipe, a Layer
        you provide once.
      </SectionHead>

      <div
        class="grid grid-cols-1 gap-3 md:grid-cols-2"
        data-reveal
        ref={revealOnScroll}
      >
        <Cap
          index={0}
          title="Typed errors"
          code={`S3.«f:getObject»({ Bucket, Key }).«f:pipe»(
  Effect.«f:catchTags»({
    «t:NoSuchKey»:     () => Effect.«f:succeed»(«c:null»),
    «t:AccessDenied»:  (e) => Effect.«f:fail»(«k:new» «t:Forbidden»(e)),
  }),
  Effect.«f:catchIf»(«f:isThrottlingError», () => backOff),
)`}
        >
          Match the exact error with <code>catchTags</code>, or a category —
          throttling, not-found, conflict — with <code>catchIf</code>. Failures
          the spec never documents are named and categorised as the SDK is
          produced, so nothing is <code>unknown</code> and the compiler tells
          you when you've missed one.
        </Cap>

        <Cap
          index={1}
          title="Retries and backoff"
          code={`«m:// Default: exponential from 250ms, cap 5s, jitter,»
«m:// 8 tries, transient/throttling only, Retry-After honoured.»
program.«f:pipe»(AWS.Retry.«f:throttling»)   «m:// retry throttles forever»
program.«f:pipe»(AWS.Retry.«f:none»)         «m:// or not at all»
program.«f:pipe»(AWS.Retry.«f:policy»({      «m:// or your own»
  while:    «f:isTransientError»,
  schedule: Schedule.«f:exponential»(«s:"100 millis"»)
              .«f:pipe»(Schedule.«f:recurs»(«c:3»)),
}))`}
        >
          Transient and throttling errors are retried with backoff and jitter; a
          404 never is. The API's own <code>Retry-After</code> is respected.
          Override the policy for one call or for the whole program — it's a
          Layer.
        </Cap>

        <Cap
          index={2}
          title="Streaming pagination"
          code={`«m:// Paginated: pages fetch themselves, on demand.»
«k:const» stale = Lambda.listFunctions.«f:items»({}).«f:pipe»(
  Stream.«f:filter»((fn) => fn.Runtime === «s:"nodejs16.x"»),
  Stream.«f:take»(«c:50»),
  Stream.«f:runCollect»,
)

«m:// Bodies stream in and out — nothing is buffered.»
«k:const» copy = S3.«f:getObject»({ Bucket: src, Key }).«f:pipe»(
  Effect.«f:flatMap»((o) =>
    S3.«f:putObject»({ Bucket: dst, Key, Body: o.Body! })),
)`}
        >
          Every paginated operation has <code>.items()</code> and{" "}
          <code>.pages()</code>. Large bodies — an S3 object, an upload — stream
          in and out without being held in memory. Cancel the Effect and the
          requests stop.
        </Cap>

        <Cap
          index={3}
          title="Layered configuration"
          code={`«k:const» AwsLive = Layer.«f:mergeAll»(
  FetchHttpClient.layer,
  Region.«f:fromEnv»(),
  Credentials.«f:fromChain»(),   «m:// env → ~/.aws → SSO → IMDS»
)

«m:// In tests: same program, fake wire.»
program.«f:pipe»(Effect.«f:provide»(MockHttpClient))`}
        >
          Your code calls <code>S3.getObject</code>; where the credentials come
          from is decided at the edge of the program. In tests, swap the HTTP
          client for a fake and nothing else changes — that is how the
          benchmarks on this site run without a network.
        </Cap>

        <Cap
          index={4}
          title="OpenTelemetry spans"
          code={`«m:// Effect's HttpClient opens a span per request with the»
«m:// standard http.* and server.* attributes.»
program.«f:pipe»(
  Effect.«f:withSpan»(«s:"provision-bucket"»),
  Effect.«f:provide»(OtlpTracer.«f:layer»({
    url: «s:"http://collector:4318/v1/traces"»,
  })),
)`}
        >
          They are ordinary Effect spans, so they nest inside yours and go
          wherever your OpenTelemetry exporter sends them — Axiom, Datadog,
          Honeycomb, a local collector.
        </Cap>

        <article
          class="reveal-item panel flex min-w-0 flex-col gap-3 px-[1.6rem] pt-6 pb-[1.6rem] hover:border-line-2"
          style={{ "--i": 5 }}
        >
          <h3 class="display-48 text-[1.45rem] leading-[1.15] text-fg">
            Per-operation imports
          </h3>
          <Code
            src={`«m:// the bundle keeps getObject — not the other 111 S3 ops»
«k:import» { getObject } «k:from» «s:"@distilled.cloud/aws/s3"»`}
            class="my-[0.2rem] rounded-lg border border-line bg-bg px-[0.9rem] py-3 leading-[1.6]"
          />
          <dl class="my-[0.2rem] grid grid-cols-2 gap-2">
            <For each={stats()}>
              {([label, value]) => (
                <div class="rounded-lg border border-line bg-bg px-[0.8rem] py-[0.6rem]">
                  <dt class="font-mono text-[0.66rem] tracking-[0.06em] text-fg-3 uppercase">
                    {label}
                  </dt>
                  <dd class="display-48 mt-[0.15rem] text-2xl leading-none text-teal-2 tabular-nums">
                    {value}
                  </dd>
                </div>
              )}
            </For>
          </dl>
          <p class="m-0 text-[0.93rem] text-pretty text-fg-2">
            Every operation is its own export, so the bundler keeps only the
            ones you call — 1 of 112 S3 operations survives in the measured
            build. Runs on Node, Bun and Workers.{" "}
            <A
              class="ml-1.5 inline-block whitespace-nowrap text-accent"
              href="/bench"
            >
              See all the numbers →
            </A>
          </p>
        </article>
      </div>
    </section>
  );
};
