// AWS deep import: one service, one operation.
import * as Credentials from "@distilled.cloud/aws/Credentials";
import * as s3 from "@distilled.cloud/aws/s3";
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

const program = s3
  .getObject({ Bucket: "bench-bucket", Key: "bench-key" })
  .pipe(Effect.provide(layer));

export default {
  fetch: () =>
    Effect.runPromise(program).then(
      (out) => new Response(String(out.ContentLength ?? 0)),
    ),
};
