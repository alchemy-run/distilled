import * as Prisma from "@distilled.cloud/prisma";
import * as Management from "@distilled.cloud/prisma/management";
import * as S3 from "@distilled.cloud/s3";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { expect, test } from "vitest";

test("layerS3 signs S3 calls with a bucket key it creates, then deletes the key", async () => {
  const calls: string[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        const auth = request.headers.authorization ?? "";
        calls.push(`${request.method} ${request.url} ${auth.split(",")[0]}`);
        const json = (body: unknown) =>
          HttpClientResponse.fromWeb(
            request,
            new Response(JSON.stringify(body), { headers: { "content-type": "application/json" } }),
          );
        if (request.url.endsWith("/v1/buckets/bkt_1/keys"))
          return json({
            data: {
              id: "key_1",
              type: "bucket_key",
              name: "distilled-s3",
              valueHint: "AKID…",
              role: "read_write",
              createdAt: "2026-11-05T00:00:00Z",
              accessKeyId: "AKIDPRISMA",
              secretAccessKey: "secret",
              endpoint: "https://t3.storage.dev",
              bucketName: "prisma-bkt-1",
            },
          });
        if (request.url.endsWith("/v1/buckets/bkt_1/keys/key_1")) return json({});
        return HttpClientResponse.fromWeb(
          request,
          new Response(
            `<?xml version="1.0"?><ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>prisma-bkt-1</Name><KeyCount>1</KeyCount><Contents><Key>hello.txt</Key></Contents></ListBucketResult>`,
            { headers: { "content-type": "application/xml" } },
          ),
        );
      }),
    ),
  );

  const keys = await Effect.gen(function* () {
    const Bucket = yield* Management.S3BucketName;
    const { Contents } = yield* S3.listObjectsV2({ Bucket });
    return Contents?.map((object) => object.Key);
  }).pipe(
    Effect.provide(Management.layerS3({ bucketId: "bkt_1" })),
    Effect.provide(Layer.mergeAll(Prisma.fromApiToken({ apiToken: Redacted.make("t") }), http)),
    Effect.runPromise,
  );

  expect(keys).toEqual(["hello.txt"]);
  expect(calls).toEqual([
    "POST https://api.prisma.io/v1/buckets/bkt_1/keys Bearer t",
    expect.stringMatching(
      /^GET https:\/\/(prisma-bkt-1\.t3\.storage\.dev\/|t3\.storage\.dev\/prisma-bkt-1)\?list-type=2 AWS4-HMAC-SHA256 Credential=AKIDPRISMA\/\d{8}\/auto\/s3\/aws4_request$/,
    ),
    "DELETE https://api.prisma.io/v1/buckets/bkt_1/keys/key_1 Bearer t",
  ]);
});
