// Cloudflare barrel import: `@distilled.cloud/cloudflare` re-exports
// credentials, errors, protocol and `Services` (all ~120 service modules as
// namespaces). Same listScripts call as `cf-workers-deep.ts`.
import * as CF from "@distilled.cloud/cloudflare";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";

const layer = Layer.mergeAll(
  CF.fromApiToken({ apiToken: Redacted.make("bench-token") }),
  FetchHttpClient.layer,
);

const program = CF.Services.workers.listScripts
  .items({ accountId: "bench-account" })
  .pipe(Stream.runCount, Effect.provide(layer));

export default {
  fetch: () => Effect.runPromise(program).then((n) => new Response(String(n))),
};
