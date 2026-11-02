import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import * as TestClock from "effect/testing/TestClock";
import { describe, expect, test } from "vitest";
import * as BucketObjects from "../src/bucket-objects.ts";

const bucket = BucketObjects.make({
  endpoint: "https://t3.storage.dev/",
  bucket: "user-abc123",
  credentials: {
    accessKeyId: "tid_testkey",
    secretAccessKey: Redacted.make("tsec_testsecret"),
  },
});

const SIGNING_TIME = Date.UTC(2026, 9, 30, 12, 0, 0);

interface SentRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | undefined;
}

interface Reply {
  status: number;
  body?: string;
  headers?: Record<string, string>;
}

const bodyText = (request: HttpClientRequest.HttpClientRequest) =>
  request.body._tag === "Uint8Array" ? new TextDecoder().decode(request.body.body) : undefined;

/** An `HttpClient` that records each request and answers from `respond`. */
const fakeStore = (respond: (request: SentRequest) => Reply) => {
  const sent: SentRequest[] = [];
  const client = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const recorded = {
          method: request.method,
          url: url.toString(),
          headers: { ...request.headers },
          body: bodyText(request),
        };
        sent.push(recorded);
        const reply = respond(recorded);
        return HttpClientResponse.fromWeb(
          request,
          new Response(reply.body ?? null, { status: reply.status, headers: reply.headers }),
        );
      }),
    ),
  );
  return { sent, layer: Layer.mergeAll(client, TestClock.layer()) };
};

const run = <A, E>(
  effect: Effect.Effect<A, E, HttpClient.HttpClient>,
  layer: Layer.Layer<HttpClient.HttpClient>,
) => Effect.runPromise(Effect.provide(effect, layer));

const runSigned = <A, E>(effect: Effect.Effect<A, E>) =>
  Effect.runPromise(
    Effect.gen(function* () {
      yield* TestClock.setTime(SIGNING_TIME);
      return yield* effect;
    }).pipe(Effect.provide(TestClock.layer())),
  );

const objectHeaders = {
  "content-length": "5",
  etag: '"e2"',
  "last-modified": "Thu, 01 Oct 2026 00:00:00 GMT",
  "content-type": "text/plain",
  "x-amz-meta-owner": "api",
};

describe("Prisma bucket client", () => {
  // Expected values were produced by the `@distilled.cloud/aws` S3 client for
  // the same credentials, keys and signing time.
  test("presigns GET and PUT URLs exactly as the AWS SDK client did", async () => {
    expect(await runSigned(bucket.presignGetObject("reports/2026 q1+final.json"))).toBe(
      "https://t3.storage.dev/user-abc123/reports/2026%20q1%2Bfinal.json?X-Amz-Expires=900&X-Amz-Date=20261030T120000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=tid_testkey%2F20261030%2Fauto%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=c149217af584bfcfc9fa5b9fc43dfb3e969467a8485cccaca7363729b17d9176",
    );
    const download = new URL(
      await runSigned(
        bucket.presignGetObject("a.txt", { expiresIn: 60, responseContentType: "text/plain" }),
      ),
    );
    expect(download.searchParams.get("response-content-type")).toBe("text/plain");
    expect(download.searchParams.get("X-Amz-Signature")).toBe(
      "27e8cb04ae2312d8558080cdfa9315645b05cb4bb7cb0e9866b4081663c510db",
    );
    expect(
      await runSigned(bucket.presignPutObject("uploads/avatar.png", { contentType: "image/png" })),
    ).toBe(
      "https://t3.storage.dev/user-abc123/uploads/avatar.png?X-Amz-Expires=900&X-Amz-Date=20261030T120000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=tid_testkey%2F20261030%2Fauto%2Fs3%2Faws4_request&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Signature=c47ad65853608828842e71d3eab9baa8ff7a58be50dee00c14a6df9357cbc9de",
    );
    expect(await runSigned(bucket.presignPutObject("uploads/raw.bin", { expiresIn: 3600 }))).toBe(
      "https://t3.storage.dev/user-abc123/uploads/raw.bin?X-Amz-Expires=3600&X-Amz-Date=20261030T120000Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=tid_testkey%2F20261030%2Fauto%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=36be6ebbc7734c74c9f271df8b9ae0db884475f171e981588ab9e43798eefe6d",
    );
  });

  test("signs a HEAD exactly as the AWS SDK client did", async () => {
    const store = fakeStore(() => ({ status: 200, headers: objectHeaders }));
    const object = await run(
      Effect.gen(function* () {
        yield* TestClock.setTime(SIGNING_TIME);
        return yield* bucket.headObject("a/b c.txt");
      }),
      store.layer,
    );

    expect(object).toEqual({
      key: "a/b c.txt",
      size: 5,
      etag: "e2",
      lastModified: new Date("2026-10-01T00:00:00.000Z"),
      contentType: "text/plain",
      metadata: { owner: "api" },
    });
    expect(store.sent).toMatchObject([
      {
        method: "HEAD",
        url: "https://t3.storage.dev/user-abc123/a/b%20c.txt",
        headers: {
          authorization:
            "AWS4-HMAC-SHA256 Credential=tid_testkey/20261030/auto/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=78f61c8600ccf2eae3f844f9cf1aacfbfc91eb16bc839bd1045596fa24c21e6c",
          "x-amz-content-sha256": "UNSIGNED-PAYLOAD",
          "x-amz-date": "20261030T120000Z",
        },
        body: undefined,
      },
    ]);
  });

  test("sends a ranged GET and streams the body", async () => {
    const store = fakeStore(() => ({
      status: 206,
      body: "llo",
      headers: { ...objectHeaders, "content-length": "3" },
    }));
    const text = await run(
      bucket
        .getObject("a.txt", { range: { offset: 2, length: 3 } })
        .pipe(
          Effect.flatMap((object) =>
            object === null
              ? Effect.succeed(null)
              : object.body.pipe(Stream.decodeText, Stream.mkString),
          ),
        ),
      store.layer,
    );

    expect(store.sent[0]?.headers.range).toBe("bytes=2-4");
    expect(text).toBe("llo");
  });

  test("reads an open-ended range to the end of the object", async () => {
    const store = fakeStore(() => ({ status: 206, body: "lo", headers: objectHeaders }));
    await run(bucket.getObject("a.txt", { range: { offset: 3 } }), store.layer);
    expect(store.sent[0]?.headers.range).toBe("bytes=3-");
  });

  test("treats a missing key as null and a missing bucket as an error", async () => {
    const missingKey = fakeStore(() => ({
      status: 404,
      body: "<Error><Code>NoSuchKey</Code></Error>",
    }));
    expect(await run(bucket.getObject("gone"), missingKey.layer)).toBeNull();
    expect(await run(bucket.headObject("gone"), missingKey.layer)).toBeNull();
    await run(bucket.deleteObject("gone"), missingKey.layer);

    const headWithoutBody = fakeStore(() => ({ status: 404 }));
    expect(await run(bucket.headObject("gone"), headWithoutBody.layer)).toBeNull();

    const missingBucket = fakeStore(() => ({
      status: 404,
      body: "<Error><Code>NoSuchBucket</Code></Error>",
    }));
    expect(await run(bucket.getObject("k").pipe(Effect.flip), missingBucket.layer)).toMatchObject({
      _tag: "Prisma::BucketObjects::NoSuchBucket",
      status: 404,
      message: "GetObject failed with HTTP 404 (NoSuchBucket)",
    });
    expect(
      await run(bucket.deleteObject("k").pipe(Effect.flip), missingBucket.layer),
    ).toMatchObject({ message: "DeleteObject failed with HTTP 404 (NoSuchBucket)" });
  });

  test("fails with the store's error code and message on other statuses", async () => {
    const store = fakeStore(() => ({
      status: 403,
      body: "<Error><Code>AccessDenied</Code><Message>Access Denied.</Message></Error>",
    }));
    expect(await run(bucket.putObject("k", "v").pipe(Effect.flip), store.layer)).toMatchObject({
      _tag: "Prisma::BucketObjects::S3ServiceError",
      code: "AccessDenied",
      message: "PutObject failed with HTTP 403 (AccessDenied): Access Denied.",
    });
    expect(store.sent.length).toBe(1);
  });

  test("sends PUT headers and signs metadata", async () => {
    const store = fakeStore(() => ({ status: 200, headers: { etag: '"e1"' } }));
    const result = await run(
      bucket.putObject("k.json", '{"ok":true}', {
        contentType: "application/json",
        cacheControl: "no-cache",
        contentDisposition: "inline",
        contentEncoding: "identity",
        metadata: { owner: "api" },
      }),
      store.layer,
    );

    expect(result).toEqual({ etag: "e1" });
    const [request] = store.sent;
    expect(request?.method).toBe("PUT");
    expect(request?.url).toBe("https://t3.storage.dev/user-abc123/k.json");
    expect(request?.body).toBe('{"ok":true}');
    expect(request?.headers).toMatchObject({
      "content-type": "application/json",
      "cache-control": "no-cache",
      "content-disposition": "inline",
      "content-encoding": "identity",
      "x-amz-meta-owner": "api",
    });
    expect(request?.headers.authorization).toContain(
      "SignedHeaders=cache-control;content-disposition;content-encoding;host;x-amz-content-sha256;x-amz-date;x-amz-meta-owner,",
    );
  });

  test("defaults the content type by body kind", async () => {
    const store = fakeStore(() => ({ status: 200 }));
    await run(bucket.putObject("s.txt", "hi"), store.layer);
    await run(bucket.putObject("raw.bin", new Uint8Array([1, 2, 3])), store.layer);

    expect(store.sent[0]?.headers["content-type"]).toBe("text/plain");
    expect(store.sent[1]?.headers["content-type"]).toBe("application/octet-stream");
  });

  test("buffers stream, ReadableStream and Blob bodies", async () => {
    const store = fakeStore(() => ({ status: 200 }));
    const encoder = new TextEncoder();
    const chunks = [encoder.encode("hel"), encoder.encode("lo")];
    await run(bucket.putObject("a.txt", Stream.fromIterable(chunks)), store.layer);
    await run(
      bucket.putObject(
        "b.txt",
        new ReadableStream({
          start(controller) {
            for (const chunk of chunks) controller.enqueue(chunk);
            controller.close();
          },
        }),
      ),
      store.layer,
    );
    await run(bucket.putObject("c.txt", new Blob(chunks)), store.layer);

    expect(store.sent.map((request) => request.body)).toEqual(["hello", "hello", "hello"]);
  });

  test("fails with BodyReadError when the upload stream fails", async () => {
    const store = fakeStore(() => ({ status: 200 }));
    const error = await run(
      bucket.putObject("a.txt", Stream.fail("boom")).pipe(Effect.flip),
      store.layer,
    );
    expect(error).toMatchObject({ _tag: "Prisma::BucketObjects::BodyReadError", cause: "boom" });
    expect(store.sent).toEqual([]);
  });

  test("lists with ListObjectsV2 parameters and parses the page", async () => {
    const store = fakeStore(() => ({
      status: 200,
      body: `<?xml version="1.0" encoding="UTF-8"?><ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>user-abc123</Name><IsTruncated>true</IsTruncated><Contents><Key>p/a &amp; b.txt</Key><LastModified>2026-10-01T00:00:00.000Z</LastModified><ETag>&quot;abc&quot;</ETag><Size>5</Size></Contents><CommonPrefixes><Prefix>p/dir/</Prefix></CommonPrefixes><NextContinuationToken>tok==</NextContinuationToken></ListBucketResult>`,
    }));
    const page = await run(
      bucket.listObjectsV2({
        prefix: "p/",
        delimiter: "/",
        maxKeys: 2,
        continuationToken: "c1",
        startAfter: "p/0",
      }),
      store.layer,
    );

    expect(store.sent[0]?.url).toBe(
      "https://t3.storage.dev/user-abc123?list-type=2&prefix=p%2F&delimiter=%2F&continuation-token=c1&max-keys=2&start-after=p%2F0",
    );
    expect(page).toEqual({
      contents: [
        {
          key: "p/a & b.txt",
          size: 5,
          etag: "abc",
          lastModified: new Date("2026-10-01T00:00:00.000Z"),
          contentType: undefined,
          metadata: {},
        },
      ],
      commonPrefixes: ["p/dir/"],
      isTruncated: true,
      nextContinuationToken: "tok==",
    });
  });

  test("reports the last page as not truncated", async () => {
    const store = fakeStore(() => ({
      status: 200,
      body: "<ListBucketResult><IsTruncated>false</IsTruncated><Contents><Key>a</Key><Size>1</Size></Contents><Contents><Key>b</Key><Size>2</Size></Contents></ListBucketResult>",
    }));
    const page = await run(bucket.listObjectsV2(), store.layer);

    expect(store.sent[0]?.url).toBe("https://t3.storage.dev/user-abc123?list-type=2");
    expect(page.isTruncated).toBe(false);
    expect(page.contents.map((object) => object.key)).toEqual(["a", "b"]);
  });

  test("reads an empty ListBucketResult as an empty page", async () => {
    const store = fakeStore(() => ({ status: 200, body: "<ListBucketResult></ListBucketResult>" }));
    expect(await run(bucket.listObjectsV2(), store.layer)).toEqual({
      contents: [],
      commonPrefixes: [],
      isTruncated: false,
    });
  });

  test("rejects a list response it cannot trust", async () => {
    const messageFor = (body: string) =>
      run(
        bucket.listObjectsV2().pipe(
          Effect.flip,
          Effect.map((error) => `${error._tag}: ${error.message}`),
        ),
        fakeStore(() => ({ status: 200, body })).layer,
      );

    expect(await messageFor("<Other/>")).toBe(
      "Prisma::BucketObjects::InvalidS3Response: ListObjectsV2 returned a response that is not a ListBucketResult",
    );
    expect(
      await messageFor("<ListBucketResult><IsTruncated>true</IsTruncated></ListBucketResult>"),
    ).toBe(
      "Prisma::BucketObjects::InvalidS3Response: ListObjectsV2 returned IsTruncated without a NextContinuationToken",
    );
    expect(
      await messageFor(
        "<ListBucketResult><Contents><Key>a</Key><Size>x</Size></Contents></ListBucketResult>",
      ),
    ).toBe(
      "Prisma::BucketObjects::InvalidS3Response: ListObjectsV2 returned an invalid Size for a",
    );
  });

  test("percent-encodes list parameters", async () => {
    const store = fakeStore(() => ({ status: 200, body: "<ListBucketResult></ListBucketResult>" }));
    await run(bucket.listObjectsV2({ prefix: "a b+c/" }), store.layer);

    expect(store.sent[0]?.url).toBe(
      "https://t3.storage.dev/user-abc123?list-type=2&prefix=a%20b%2Bc%2F",
    );
  });

  test("retries a transient failure but not forever", async () => {
    const withBackoffElapsed = <A, E>(effect: Effect.Effect<A, E, HttpClient.HttpClient>) =>
      Effect.all([effect, TestClock.adjust("1 minute")], { concurrency: 2 }).pipe(
        Effect.map(([result]) => result),
      );

    let calls = 0;
    const flaky = fakeStore(() =>
      ++calls === 1
        ? { status: 503, body: "<Error><Code>SlowDown</Code></Error>" }
        : { status: 200, headers: objectHeaders },
    );
    expect((await run(withBackoffElapsed(bucket.headObject("k")), flaky.layer))?.etag).toBe("e2");
    expect(flaky.sent.length).toBe(2);

    const down = fakeStore(() => ({ status: 503 }));
    await run(withBackoffElapsed(bucket.headObject("k").pipe(Effect.flip)), down.layer);
    expect(down.sent.length).toBe(6);
  });

  test("rejects keys that cannot be addressed safely", async () => {
    const store = fakeStore(() => ({ status: 200 }));
    for (const key of ["", "a/../b", "..", "./a", "../other-bucket/x", "bad\uD800"]) {
      const error = await run(bucket.putObject(key, "v").pipe(Effect.flip), store.layer);
      expect(error._tag).toBe("Prisma::BucketObjects::InvalidInput");
    }
    expect(store.sent).toEqual([]);
  });
});
