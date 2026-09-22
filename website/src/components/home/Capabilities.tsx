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
    // ["Cloudflare call, p50", props.bench.cfP50],
    // ["AWS call incl. SigV4, p50", props.bench.awsP50],
  ];
  return (
    <section
      class="rule py-section"
      id="features"
      aria-labelledby="features-title"
    >
      <SectionHead
        id="features-title"
        title={
          <>
            Built entirely on <em>Effect</em>, not <code>tryPromise</code>
          </>
        }
      >
        Every operation returns an Effect, requests are made using Effect's
        HttpClient, Effect's Schemas are used to define inputs and outputs.
        Distilled's core maintains everything you want out of a true
        Effect-First SDK: typed error categories, retry policies, pagination via
        effect streams, a span per request; Each sdk is built on top of the same
        core with the same naming patterns so if you've used one the rest should
        feel familiar.
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
          Match the exact error's or entire categories category with the
          Effect's functions you're already familiar with like{" "}
          <code>Effect.catchTags</code> and <code>Effect.catchIf</code>! We
          patch in the generic errors and the details the api spec never
          documents for each SDK we produce, so nothing comes back as{" "}
          <code>unknown</code> and keeps your types actually safe, unlike
          first-party typescript SDKs.
        </Cap>

        <Cap
          index={1}
          title="Retries and backoff"
          code={`«k:const» write = Effect.«f:all»([
  «m:// throttled → waits as long as S3 asks, forever»
  S3.«f:putObject»({ Bucket, Key, Body }),
  «m:// no retry of its own; only the outer loop can bring it back»
  S3.«f:deleteObject»({ Bucket, Key }).«f:pipe»(AWS.Retry.«f:none»),
]).«f:pipe»(AWS.Retry.«f:throttling»)

«m:// around both: 5xx, timeouts, dropped sockets — 4 tries, then fail»
write.«f:pipe»(Effect.«f:retry»({
  while: «f:isTransientError»,
  times: 3,
  schedule: Schedule.«f:exponential»("250 millis"),
}))`}
        >
          The API's own <code>Retry-After</code> is respected, but you can
          define your own retry policies, and even stack them!
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
          <p>
            Every paginated operation has <code>.items()</code> and{" "}
            <code>.pages()</code>. No need to loop over pages just pull from the
            Effect stream!
          </p>
          <p>
            Large bodies binary bodies stream in and out without being held in
            memory. Cancel the Effect and the requests stop.
          </p>
        </Cap>

        <Cap
          index={3}
          title="Layered configuration"
          code={`«k:const» AwsLive = Layer.«f:mergeAll»(
  FetchHttpClient.layer,
  Region.«f:fromEnv»(),
  Credentials.«f:fromChain»(),   «m:// env → ~/.aws → SSO → IMDS»
)

«m:// the region comes from the layer…»
«k:const» head = S3.«f:headObject»({ Bucket, Key })

«m:// ...unless one call says otherwise»
«k:const» eu = head.«f:pipe»(Effect.«f:provide»(Region.«f:of»("eu-central-1")))

Effect.«f:all»([head, eu]).«f:pipe»(Effect.«f:provide»(AwsLive))`}
        >
          Your code just calls <code>S3.headObject</code>; No need to pass
          credentials and regions around or instantiate SDKs as globals. All
          requiremnts are shoved into layers, so you can provide them once in
          your root and override them as you see fit.
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
          Operations are just effects, we piggyback on the same great otel
          support Effect already provides!
        </Cap>

        <Cap
          index={5}
          title="Lazy GraphQL"
          code={`«m:// me() and this page compile to one GraphQL POST»
«k:const» load = Query.«f:fn»(() => {
  «k:const» me = Railway.«f:me»()
  «k:const» page = Railway.«f:projects»({ first: «c:20» })
  «k:return» {
    email: me.email,
    names: page.edges.«f:pipe»(
      Query.«f:map»((edge) => edge.node.name),
    ),
  }
})

load().«f:pipe»(
  Effect.«f:flatMap»(({ email, names }) =>
    S3.«f:putObject»({ Bucket, Key: email, Body: names.join() }),
  ),
)`}
        >
          <code>me()</code> and <code>{"projects({ first: 20 })"}</code> stay
          lazy. <code>Query.map</code> walks the page without extra requests;{" "}
          <code>Query.fn</code> compiles the whole plan into one GraphQL
          document. The result is an Effect, so <code>flatMap</code> into{" "}
          <code>S3.putObject</code> works like the rest of Distilled.
        </Cap>

        <article
          class="reveal-item panel flex min-w-0 flex-col gap-3 px-[1.6rem] pt-6 pb-[1.6rem] hover:border-line-2"
          style={{ "--i": 6 }}
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
