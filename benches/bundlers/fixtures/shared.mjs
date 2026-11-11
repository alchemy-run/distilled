import * as SQS from "@distilled.cloud/aws/sqs";
import * as STS from "@distilled.cloud/aws/sts";
import { fromApiToken } from "@distilled.cloud/cloudflare/Credentials";
import * as R2 from "@distilled.cloud/cloudflare/r2";
// What every fixture runs: one call per kind of lazy import in the published
// SDKs, against an HTTP client that answers every request with a 400 (not
// retried, unlike a 5xx). A call
// whose module loaded fails with the service's error for that response; a
// module that did not load fails with `SdkError: an SDK module failed to
// load` instead. The test compares a bundle's lines with the unbundled run.
import * as S3 from "@distilled.cloud/s3";
import { Credentials as S3Credentials } from "@distilled.cloud/s3/Credentials";
import { Endpoint } from "@distilled.cloud/s3/Endpoint";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const http = Layer.succeed(
  HttpClient.HttpClient,
  HttpClient.make((request) =>
    Effect.succeed(HttpClientResponse.fromWeb(request, new Response("{}", { status: 400 }))),
  ),
);

const aws = Layer.mergeAll(
  http,
  Layer.succeed(Endpoint, Effect.succeed("http://localhost:9")),
  Layer.succeed(
    S3Credentials,
    Effect.succeed({
      accessKeyId: Redacted.make("AKIA"),
      secretAccessKey: Redacted.make("secret"),
      sessionToken: undefined,
      region: "us-east-1",
    }),
  ),
);

const outcome = (exit) =>
  exit._tag === "Success" ? "Success" : String(exit.cause).replace(/\s+/g, " ").slice(0, 160);

export const report = async (name, effect) =>
  console.log(`${name}: ${outcome(await Effect.runPromiseExit(effect))}`);

export const runShared = async () => {
  // s3: the restXml protocol and the checksum middleware.
  await report(
    "s3 restXml + checksum",
    S3.putObject({ Bucket: "b", Key: "k", Body: "hi", ChecksumAlgorithm: "CRC32" }).pipe(
      Effect.provide(aws),
    ),
  );
  // aws: the awsQuery and awsJson1_0 protocols.
  await report("aws awsQuery (sts)", STS.getCallerIdentity({}).pipe(Effect.provide(aws)));
  await report("aws awsJson1_0 (sqs)", SQS.listQueues({}).pipe(Effect.provide(aws)));
  // cloudflare: layerS3 loads @distilled.cloud/s3 and two Cloudflare services.
  await report(
    "cloudflare layerS3",
    S3.listBuckets({}).pipe(
      Effect.provide(R2.layerS3()),
      Effect.provide(Layer.mergeAll(http, fromApiToken({ apiToken: Redacted.make("t") }))),
    ),
  );
};
