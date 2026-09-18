// AWS barrel import: the package root re-exports every hand-written module
// (Auth, Credentials, Endpoint, …) as namespaces. Same S3 call as
// `aws-s3-deep.ts`, but Credentials come through the barrel.
import * as AWS from "@distilled.cloud/aws";
import * as s3 from "@distilled.cloud/aws/s3";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

const layer = Layer.mergeAll(
  AWS.Credentials.fromCredentials(
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
