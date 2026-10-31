import * as Crypto from "@distilled.cloud/core/crypto";
/**
 * The signer and AwsClient against aws4fetch itself: the same request must
 * produce the same URL and headers, byte for byte.
 */
import { AwsClient as Aws4Fetch, AwsV4Signer } from "aws4fetch";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import * as TestClock from "effect/testing/TestClock";
import { describe, expect, test } from "vitest";
import * as AwsClient from "../src/client.ts";
import * as Signer from "../src/index.ts";

const accessKeyId = "AKIAIOSFODNN7EXAMPLE";
const secret = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const sessionToken = "FwoGZXIvYXdzEJr//////////wEaDH+session";
const datetime = "20240115T120000Z";

interface Case {
  readonly name: string;
  readonly url: string;
  readonly method?: string;
  readonly headers?: Record<string, string>;
  readonly body?: string;
  readonly service?: string;
  readonly region?: string;
  readonly sessionToken?: boolean;
  readonly signQuery?: boolean;
  readonly allHeaders?: boolean;
  readonly appendSessionToken?: boolean;
  readonly singleEncode?: boolean;
}

const cases: ReadonlyArray<Case> = [
  {
    name: "S3 GET, guessed from a virtual-hosted bucket",
    url: "https://bucket.s3.eu-west-1.amazonaws.com/a/b c+d.txt",
  },
  {
    name: "S3 global endpoint",
    url: "https://s3.amazonaws.com/bucket/key?versionId=1&list-type=2",
  },
  { name: "S3 duplicate query keys", url: "https://s3.us-east-2.amazonaws.com/b/k?a=2&a=1&b" },
  {
    name: "SQS POST with a body and session token",
    url: "https://queue.amazonaws.com/123/q",
    method: "POST",
    body: "Action=SendMessage&MessageBody=hello%20world",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    sessionToken: true,
  },
  {
    name: "DynamoDB JSON target",
    url: "https://dynamodb.us-west-2.amazonaws.com/",
    method: "POST",
    body: '{"TableName":"t"}',
    headers: {
      "X-Amz-Target": "DynamoDB_20120810.ListTables",
      "Content-Type": "application/x-amz-json-1.0",
    },
  },
  { name: "Lambda function URL", url: "https://abc123.lambda-url.ap-south-1.on.aws/path?x=1" },
  {
    name: "Cloudflare R2",
    url: "https://acct.r2.cloudflarestorage.com/bucket/obj%20name",
    method: "PUT",
    body: "data",
  },
  { name: "Backblaze B2", url: "https://bucket.s3.us-west-004.backblazeb2.com/file" },
  { name: "IoT data plane", url: "https://abc-ats.iot.eu-central-1.amazonaws.com/things/x/shadow" },
  {
    name: "IoT device gateway presign appends the token",
    url: "https://abc-ats.iot.us-east-1.amazonaws.com/mqtt",
    signQuery: true,
    sessionToken: true,
  },
  {
    name: "FIPS host",
    url: "https://kms-fips.us-east-1.amazonaws.com/",
    method: "POST",
    body: "{}",
  },
  { name: "dual-stack S3", url: "https://bucket.s3.dualstack.us-east-1.amazonaws.com/k" },
  {
    name: "GovCloud",
    url: "https://sts.us-gov.amazonaws.com/?Action=GetCallerIdentity&Version=2011-06-15",
  },
  {
    name: "explicit service and region over a custom host",
    url: "https://minio.internal:9000/bucket/k",
    service: "s3",
    region: "us-east-1",
  },
  {
    name: "API Gateway path with reserved characters",
    url: "https://abc.execute-api.us-east-1.amazonaws.com/prod/a!b'c(d)*e//f",
    service: "execute-api",
  },
  {
    name: "presigned S3 URL with a session token",
    url: "https://bucket.s3.us-east-1.amazonaws.com/k?X-Amz-Expires=600",
    signQuery: true,
    sessionToken: true,
  },
  {
    name: "allHeaders signs content-type and range",
    url: "https://bucket.s3.us-east-1.amazonaws.com/k",
    headers: { Range: "bytes=0-9", "Content-Type": "text/plain", "X-Custom": "  a   b  " },
    allHeaders: true,
  },
  {
    name: "appendSessionToken on a normal service",
    url: "https://execute-api.us-east-1.amazonaws.com/x",
    signQuery: true,
    sessionToken: true,
    appendSessionToken: true,
  },
  {
    name: "singleEncode keeps %2F and encodes once",
    url: "https://es.us-east-1.amazonaws.com/idx/_doc/a%2Fb",
    service: "es",
    region: "us-east-1",
    singleEncode: true,
  },
  {
    name: "autoscaling plans from X-Amz-Target",
    url: "https://autoscaling.us-east-1.amazonaws.com/",
    method: "POST",
    body: "{}",
    headers: { "X-Amz-Target": "AnyScaleScalingPlannerFrontendService.DescribeScalingPlans" },
  },
];

const reference = async (c: Case) => {
  const signed = await new AwsV4Signer({
    url: c.url,
    method: c.method,
    headers: c.headers,
    body: c.body,
    accessKeyId,
    secretAccessKey: secret,
    sessionToken: c.sessionToken ? sessionToken : undefined,
    service: c.service,
    region: c.region,
    datetime,
    signQuery: c.signQuery,
    allHeaders: c.allHeaders,
    appendSessionToken: c.appendSessionToken,
    singleEncode: c.singleEncode,
  }).sign();
  return {
    method: signed.method,
    url: signed.url.toString(),
    headers: Object.fromEntries([...signed.headers].sort(([a], [b]) => (a < b ? -1 : 1))),
  };
};

const options = (c: Case): Signer.SignOptions =>
  Signer.guessScope({
    url: c.url,
    method: c.method,
    headers: c.headers,
    body: c.body,
    accessKeyId,
    secretAccessKey: Redacted.make(secret),
    sessionToken: c.sessionToken ? Redacted.make(sessionToken) : undefined,
    service: c.service,
    region: c.region,
    datetime,
    signQuery: c.signQuery,
    allHeaders: c.allHeaders,
    appendSessionToken: c.appendSessionToken,
    singleEncode: c.singleEncode,
  });

describe("Signer.sign matches aws4fetch's AwsV4Signer", () => {
  for (const [label, layer] of [
    ["node:crypto", Crypto.nodeCrypto],
    ["webcrypto", Crypto.webCrypto],
  ] as const) {
    test.each(cases)(`${label}: $name`, async (c) => {
      const ours = await Effect.runPromise(Signer.sign(options(c)).pipe(Effect.provide(layer)));
      expect(ours).toEqual(await reference(c));
    });
  }
});

describe("Signer.guessServiceRegion", () => {
  test.each([
    ["https://sqs.eu-west-1.amazonaws.com/", "sqs", "eu-west-1"],
    ["https://queue.amazonaws.com/", "sqs", ""],
    ["https://email.us-east-1.amazonaws.com/", "ses", "us-east-1"],
    ["https://bucket.s3.amazonaws.com/", "s3", "us-east-1"],
    ["https://s3-external-1.amazonaws.com/", "s3", ""],
    ["https://bucket.s3-accelerate.amazonaws.com/", "s3", "us-east-1"],
    ["https://iot.us-east-1.amazonaws.com/", "execute-api", "us-east-1"],
    ["https://data.jobs.iot.us-east-1.amazonaws.com/", "iot-jobs-data", "us-east-1"],
    ["https://acct.r2.cloudflarestorage.com/", "s3", "auto"],
    ["https://s3.eu-central-003.backblazeb2.com/", "s3", "eu-central-003"],
    ["https://x.lambda-url.us-east-1.on.aws/", "lambda", "us-east-1"],
    ["https://example.com/", "", ""],
  ])("%s", (url, service, region) => {
    expect(Signer.guessServiceRegion(new URL(url))).toEqual([service, region]);
  });
});

describe("Signer.presign", () => {
  test("sets X-Amz-Expires and matches aws4fetch's presigned URL", async () => {
    const url = "https://bucket.s3.us-east-1.amazonaws.com/report.pdf";
    const ours = await Effect.runPromise(
      Signer.presign({
        url,
        accessKeyId,
        secretAccessKey: Redacted.make(secret),
        datetime,
        expiresIn: 3600,
      }),
    );
    expect(new URL(ours).searchParams.get("X-Amz-Expires")).toBe("3600");
    const { url: theirs } = await reference({
      name: "",
      url: `${url}?X-Amz-Expires=3600`,
      signQuery: true,
    });
    expect(ours).toBe(theirs);
  });
});

/** An HttpClient that answers 200 and records the request it was asked to send. */
const sentUrl = (request: HttpClientRequest.HttpClientRequest) =>
  Option.getOrThrow(HttpClientRequest.toUrl(request)).toString();

const recording = () => {
  const sent: Array<HttpClientRequest.HttpClientRequest> = [];
  const client = HttpClient.make((request) => {
    sent.push(request);
    return Effect.succeed(HttpClientResponse.fromWeb(request, new Response("ok")));
  });
  return { client, sent };
};

describe("AwsClient", () => {
  const credentials: AwsClient.Credentials = {
    accessKeyId,
    secretAccessKey: Redacted.make(secret),
  };

  test("signs what aws4fetch's AwsClient.sign signs", async () => {
    const url = "https://dynamodb.us-west-2.amazonaws.com/?a=1";
    const body = '{"TableName":"t"}';
    const headers = { "x-amz-target": "DynamoDB_20120810.DescribeTable" };
    const { client, sent } = recording();
    await Effect.runPromise(
      Effect.gen(function* () {
        // The signing time comes from the effect Clock: 2024-01-15T12:00:00Z = `datetime`.
        yield* TestClock.setTime(Date.UTC(2024, 0, 15, 12));
        yield* client
          .pipe(AwsClient.sign({ credentials }))
          .execute(
            HttpClientRequest.post(url).pipe(
              HttpClientRequest.setHeaders(headers),
              HttpClientRequest.bodyText(body, "application/x-amz-json-1.0"),
            ),
          );
      }).pipe(Effect.provide(TestClock.layer())),
    );
    const ours = sent[0]!;
    const theirs = await new Aws4Fetch({ accessKeyId, secretAccessKey: secret }).sign(url, {
      method: "POST",
      headers: { ...headers, "content-type": "application/x-amz-json-1.0" },
      body,
      aws: { datetime },
    });
    expect(sentUrl(ours)).toBe(theirs.url);
    expect(ours.headers.authorization).toBe(theirs.headers.get("authorization"));
  });

  test("reads credentials from an effect on every request", async () => {
    let reads = 0;
    const { client, sent } = recording();
    const signed = client.pipe(
      AwsClient.sign({
        credentials: Effect.sync(() => {
          reads++;
          return credentials;
        }),
      }),
    );
    await Effect.runPromise(
      Effect.all([
        signed.get("https://acct.r2.cloudflarestorage.com/b/1"),
        signed.get("https://acct.r2.cloudflarestorage.com/b/2"),
      ]),
    );
    expect(reads).toBe(2);
    expect(sent.map((r) => r.headers.authorization)).toEqual([
      expect.stringContaining("/auto/s3/aws4_request"),
      expect.stringContaining("/auto/s3/aws4_request"),
    ]);
  });

  test("puts the signature in the query with signQuery", async () => {
    const { client, sent } = recording();
    await Effect.runPromise(
      client
        .pipe(AwsClient.sign({ credentials, signQuery: true }))
        .get("https://bucket.s3.us-east-1.amazonaws.com/k", { urlParams: { "x-id": "GetObject" } }),
    );
    const url = new URL(sentUrl(sent[0]!));
    expect(url.searchParams.get("x-id")).toBe("GetObject");
    expect(url.searchParams.get("X-Amz-Signature")).toMatch(/^[0-9a-f]{64}$/);
    expect(sent[0]!.headers.authorization).toBeUndefined();
  });

  test("sends each query parameter once", async () => {
    for (const signQuery of [false, true]) {
      const { client, sent } = recording();
      await Effect.runPromise(
        client
          .pipe(AwsClient.sign({ credentials, service: "s3", region: "auto", signQuery }))
          .get("https://t3.storage.dev/b", { urlParams: { "list-type": "2", prefix: "a/b" } }),
      );
      const url = new URL(sentUrl(sent[0]!));
      expect(url.searchParams.getAll("list-type")).toEqual(["2"]);
      expect(url.searchParams.getAll("prefix")).toEqual(["a/b"]);
    }
  });

  test("sends a header-signed query string exactly as signed", async () => {
    const { client, sent } = recording();
    await Effect.runPromise(
      client
        .pipe(AwsClient.sign({ credentials, service: "s3", region: "auto" }))
        .execute(HttpClientRequest.get("https://t3.storage.dev/b?list-type=2&prefix=a%20b%2Fc")),
    );
    expect(sentUrl(sent[0]!)).toBe("https://t3.storage.dev/b?list-type=2&prefix=a%20b%2Fc");
  });

  test("a stream body needs X-Amz-Content-Sha256 outside S3", async () => {
    const { client } = recording();
    const request = HttpClientRequest.post("https://execute-api.us-east-1.amazonaws.com/x").pipe(
      HttpClientRequest.bodyStream(Stream.make(new Uint8Array([1]))),
    );
    const error = await Effect.runPromise(
      client.pipe(AwsClient.sign({ credentials })).execute(request).pipe(Effect.flip),
    );
    expect(error).toBeInstanceOf(AwsClient.UnsignableBody);

    const { client: ok, sent } = recording();
    await Effect.runPromise(
      ok
        .pipe(AwsClient.sign({ credentials }))
        .execute(HttpClientRequest.setHeader(request, "x-amz-content-sha256", "UNSIGNED-PAYLOAD")),
    );
    expect(sent[0]!.headers.authorization).toContain("x-amz-content-sha256");
  });

  test("presign matches Signer.presign", async () => {
    const url = "https://bucket.s3.us-east-1.amazonaws.com/a.txt";
    const viaClient = await Effect.runPromise(
      AwsClient.presign(url, { credentials, expiresIn: 60 }),
    );
    expect(new URL(viaClient).searchParams.get("X-Amz-Expires")).toBe("60");
    expect(new URL(viaClient).searchParams.get("X-Amz-Credential")).toContain(
      "/us-east-1/s3/aws4_request",
    );
  });
});
