import { createHash } from "node:crypto";
import * as S3 from "@distilled.cloud/aws/s3";
import { Credentials } from "@distilled.cloud/aws/Credentials";
import * as AwsEndpoint from "@distilled.cloud/aws/Endpoint";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import { DeployPointer, Manifest } from "../src/services/node.ts";

// Fixed credentials and peer key belong only to the disposable local test store.
const endpoint = process.env.CELLD_TEST_STORAGE_URL;
if (!endpoint || !/^http:\/\/127\.0\.0\.1:\d+$/.test(endpoint)) {
  throw new Error(
    "CELLD_TEST_STORAGE_URL must identify the disposable loopback S3 store",
  );
}
const bucket = "distilled-celld-sdk-test";
const source =
  "export default { fetch() { return new Response('celld sdk fixture'); } };";
const metadata = {
  compatibility_date: "2026-09-15",
  bindings: [
    { type: "d1", name: "DB", database_id: "sdk-db" },
    { type: "kv", name: "KV", id: "sdk-kv" },
    { type: "queue", name: "QUEUE", queue: "sdk-queue" },
  ],
};

await Effect.runPromise(
  Effect.gen(function* () {
    const version = yield* Effect.sync(() =>
      createHash("sha256")
        .update("index.js\0")
        .update(source)
        .update(JSON.stringify(metadata))
        .digest("hex")
        .slice(0, 16),
    );
    const digest = yield* Effect.sync(() =>
      createHash("sha256").update(source).digest("hex"),
    );
    const prefix = `deploy/sdk-fixture/${version}`;
    const manifest: Manifest = {
      schema_version: 1,
      version,
      script_name: "sdk-fixture",
      main_module: "index.js",
      do_classes: ["__D1Database", "__KvNamespace", "__Queue"],
      sqlite_classes: ["__D1Database", "__KvNamespace", "__Queue"],
      modules: [
        {
          name: "index.js",
          bytes: new TextEncoder().encode(source).byteLength,
          sha256: digest,
        },
      ],
      required_features: ["d1-v1", "kv-v1", "queues-v1"],
      raw_metadata: metadata,
    };
    const pointer: DeployPointer = {
      script_name: "sdk-fixture",
      prefix,
      version,
      rollout: { percent: 100 },
    };
    yield* Schema.decodeUnknownEffect(Schema.toType(Manifest))(manifest);
    yield* Schema.decodeUnknownEffect(Schema.toType(DeployPointer))(pointer);
    yield* S3.createBucket({ Bucket: bucket });
    yield* S3.putObject({
      Bucket: bucket,
      Key: "fleet/peer-auth.json",
      Body: JSON.stringify({ version: 1, key: "11".repeat(32) }),
    });
    yield* S3.putObject({
      Bucket: bucket,
      Key: `${prefix}/index.js`,
      Body: source,
    });
    yield* S3.putObject({
      Bucket: bucket,
      Key: `${prefix}/manifest.json`,
      Body: JSON.stringify(manifest),
    });
    yield* S3.putObject({
      Bucket: bucket,
      Key: "deploy/sdk-fixture/current.json",
      Body: JSON.stringify(pointer),
    });
    yield* S3.putObject({
      Bucket: bucket,
      Key: "deploy/current.json",
      Body: JSON.stringify(pointer),
    });
  }).pipe(
    Effect.provide(
      Layer.mergeAll(
        FetchHttpClient.layer,
        AwsEndpoint.of(endpoint),
        Layer.succeed(
          Credentials,
          Effect.succeed({
            accessKeyId: Redacted.make("distilled-test"),
            secretAccessKey: Redacted.make("distilled-test-secret"),
            sessionToken: undefined,
            region: "us-east-1",
          }),
        ),
      ),
    ),
    Effect.timeout("30 seconds"),
  ),
);
