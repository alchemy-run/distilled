// AWS "everything" barrel: `@distilled.cloud/aws/index` resolves through the
// `./*` export to `src/services/index.ts`, which re-exports all ~430 service
// modules as namespaces. Still only S3 GetObject is used — this measures how
// much of the other services survives tree-shaking.
import * as Credentials from "@distilled.cloud/aws/Credentials";
import * as AWS from "@distilled.cloud/aws/index";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

const layer = Layer.mergeAll(
  Credentials.fromCredentials(
    { accessKeyId: "AKIA_BENCH", secretAccessKey: "bench" },
    "us-east-1",
  ),
  FetchHttpClient.layer,
);

const program = AWS.S3.getObject({
  Bucket: "bench-bucket",
  Key: "bench-key",
}).pipe(Effect.provide(layer));

export default {
  fetch: () =>
    Effect.runPromise(program).then(
      (out) => new Response(String(out.ContentLength ?? 0)),
    ),
};
