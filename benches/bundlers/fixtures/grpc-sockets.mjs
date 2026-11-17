// The gRPC transport for Cloudflare Workers. It loads `cloudflare:sockets`
// through a variable, so a bundler must leave that import for workerd to
// resolve. Run with `--import ./sockets-hooks.mjs`, which resolves it to a
// stub whose `connect` throws "stub socket opened": that message means the
// bundled import reached the runtime's module.
import * as CloudflareSockets from "@distilled.cloud/core/grpc-transport-cloudflare-sockets";
import * as Effect from "effect/Effect";
import * as HttpClientRequest from "effect/http/HttpClientRequest";

const error = await Effect.runPromise(
  Effect.flip(CloudflareSockets.client.execute(HttpClientRequest.post("https://example.com/x"))),
);
const cause = error.reason?.cause;
console.log(
  `cloudflare:sockets connect: ${cause instanceof Error ? cause.message : String(cause)}`,
);
