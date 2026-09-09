// "Alchemy worker-shaped" entry: two deep imports across providers —
// S3 GetObject + Cloudflare Workers listScripts.
import * as AwsCredentials from "@distilled.cloud/aws/Credentials";
import * as s3 from "@distilled.cloud/aws/s3";
import * as CfCredentials from "@distilled.cloud/cloudflare/Credentials";
import * as workers from "@distilled.cloud/cloudflare/workers";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

const layer = Layer.mergeAll(
  AwsCredentials.fromCredentials(
    { accessKeyId: "AKIA_BENCH", secretAccessKey: "bench" },
    "us-east-1",
  ),
  CfCredentials.fromApiToken({ apiToken: "bench-token" }),
  FetchHttpClient.layer,
);

const program = Effect.gen(function* () {
  const object = yield* s3.getObject({
    Bucket: "bench-bucket",
    Key: "bench-key",
  });
  const scripts = yield* workers.listScripts
    .items({ accountId: "bench-account" })
    .pipe(Stream.runCount);
  return { size: object.ContentLength ?? 0, scripts };
}).pipe(Effect.provide(layer));

export default {
  fetch: () =>
    Effect.runPromise(program).then((out) => new Response(JSON.stringify(out))),
};
