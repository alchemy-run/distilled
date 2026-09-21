/**
 * Hero code samples, one per provider. Markers are `«cls:text»`; see
 * `lib/highlight.ts`. The `pkg` is also what the install line advertises.
 */
export interface Sample {
  readonly pkg: string;
  readonly file: string;
  readonly src: string;
}

export const SAMPLES: ReadonlyArray<Sample> = [
  {
    pkg: "aws",
    file: "fetch-object.ts",
    src: `«k:import» { Effect, Layer } «k:from» «s:"effect"»
«k:import» { FetchHttpClient } «k:from» «s:"effect/unstable/http"»
«k:import» * «k:as» S3 «k:from» «s:"@distilled.cloud/aws/s3"»
«k:import» { Credentials, Region } «k:from» «s:"@distilled.cloud/aws"»

«k:const» «v:program» = S3.«f:getObject»({ Bucket, Key }).«f:pipe»(
  Effect.«f:catchTags»({
    «t:NoSuchKey»:    () => Effect.«f:succeed»(«c:null»),
    «t:AccessDenied»: (e) => Effect.«f:fail»(«k:new» «t:Error»(e.message)),
  }),
)

«k:const» «v:AwsLive» = Layer.«f:mergeAll»(
  FetchHttpClient.layer,
  Region.«f:fromEnv»(),          «m:// AWS_REGION»
  Credentials.«f:fromChain»(),   «m:// env → ~/.aws → SSO → IMDS»
)

program.«f:pipe»(Effect.«f:provide»(AwsLive), Effect.runPromise)`,
  },
  {
    pkg: "cloudflare",
    file: "get-worker.ts",
    src: `«k:import» { Effect, Layer } «k:from» «s:"effect"»
«k:import» { FetchHttpClient } «k:from» «s:"effect/unstable/http"»
«k:import» * «k:as» Workers «k:from» «s:"@distilled.cloud/cloudflare/workers"»
«k:import» { Credentials } «k:from» «s:"@distilled.cloud/cloudflare"»

«k:const» «v:program» = Workers.«f:getScript»({
  account_id: accountId,
  script_name: «s:"api"»,
}).«f:pipe»(
  Effect.«f:catchTags»({
    «t:WorkerNotFound»:        () => Effect.«f:succeed»(«c:null»),
    «t:CloudflareRateLimited»: (e) => Effect.«f:fail»(e),
  }),
)

«k:const» «v:CfLive» = Layer.«f:mergeAll»(
  FetchHttpClient.layer,
  Credentials.«f:fromEnv»(),   «m:// CLOUDFLARE_API_TOKEN»
)

program.«f:pipe»(Effect.«f:provide»(CfLive), Effect.runPromise)`,
  },
  {
    pkg: "gcp",
    file: "list-buckets.ts",
    src: `«k:import» { Effect, Layer } «k:from» «s:"effect"»
«k:import» * «k:as» Stream «k:from» «s:"effect/Stream"»
«k:import» { FetchHttpClient } «k:from» «s:"effect/unstable/http"»
«k:import» * «k:as» Storage «k:from» «s:"@distilled.cloud/gcp/storage_v1"»
«k:import» { CredentialsFromEnv } «k:from»
  «s:"@distilled.cloud/gcp/Credentials"»

«m:// Paginated ops are Streams: pages fetch on demand.»
«k:const» «v:program» = Storage.listBuckets
  .«f:items»({ project: «s:"acme"» })
  .«f:pipe»(
  Stream.«f:filter»((b) => b.location === «s:"EU"»),
  Stream.«f:take»(«c:20»),
  Stream.«f:runCollect»,
)

«k:const» «v:GcpLive» = Layer.«f:mergeAll»(
  FetchHttpClient.layer,
  CredentialsFromEnv,   «m:// GOOGLE_ACCESS_TOKEN»
)

program.«f:pipe»(Effect.«f:provide»(GcpLive), Effect.runPromise)`,
  },
  {
    pkg: "planetscale",
    file: "get-database.ts",
    src: `«k:import» { Effect, Layer } «k:from» «s:"effect"»
«k:import» { FetchHttpClient } «k:from» «s:"effect/unstable/http"»
«k:import» * «k:as» PlanetScale «k:from» «s:"@distilled.cloud/planetscale"»
«k:import» { CredentialsFromEnv } «k:from»
  «s:"@distilled.cloud/planetscale/Credentials"»

«k:const» «v:program» = PlanetScale.«f:getDatabase»({
  organization: «s:"acme"»,
  name: «s:"orders"»,
}).«f:pipe»(
  Effect.«f:catchTags»({
    «t:NotFound»:  () => Effect.«f:succeed»(«c:null»),
    «t:Forbidden»: (e) => Effect.«f:fail»(«k:new» «t:Error»(e.message)),
  }),
)

«k:const» «v:PsLive» = Layer.«f:mergeAll»(
  FetchHttpClient.layer,
  CredentialsFromEnv,   «m:// PLANETSCALE_SERVICE_TOKEN*»
)

program.«f:pipe»(Effect.«f:provide»(PsLive), Effect.runPromise)`,
  },
  {
    pkg: "stripe",
    file: "create-customer.ts",
    src: `«k:import» { Effect, Layer } «k:from» «s:"effect"»
«k:import» { FetchHttpClient } «k:from» «s:"effect/unstable/http"»
«k:import» * «k:as» Stripe «k:from» «s:"@distilled.cloud/stripe"»
«k:import» { CredentialsFromEnv } «k:from»
  «s:"@distilled.cloud/stripe/Credentials"»

«k:const» «v:program» = Stripe.«f:CreateCustomer»({
  email: «s:"ada@example.com"»,
  name: «s:"Ada Lovelace"»,
}).«f:pipe»(
  Effect.«f:catchTags»({
    «t:InvalidRequestError»: (e) => Effect.«f:fail»(e),
    «t:CardError»:           (e) => Effect.«f:fail»(e),
  }),
)

«k:const» «v:StripeLive» = Layer.«f:mergeAll»(
  FetchHttpClient.layer,
  CredentialsFromEnv,   «m:// STRIPE_SECRET_KEY»
)

program.«f:pipe»(Effect.«f:provide»(StripeLive), Effect.runPromise)`,
  },
];
