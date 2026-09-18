// Cloudflare deep import: one service, one (paginated) operation.
import * as Credentials from "@distilled.cloud/cloudflare/Credentials";
import * as workers from "@distilled.cloud/cloudflare/workers";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";

const layer = Layer.mergeAll(
  Credentials.fromApiToken({ apiToken: "bench-token" }),
  FetchHttpClient.layer,
);

const program = workers.listScripts
  .items({ accountId: "bench-account" })
  .pipe(Stream.runCount, Effect.provide(layer));

export default {
  fetch: () => Effect.runPromise(program).then((n) => new Response(String(n))),
};
