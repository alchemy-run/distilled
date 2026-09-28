import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as Credentials from "../credentials.browser.ts";
import * as Endpoint from "../endpoint.ts";
import type * as Region from "../region.ts";
import * as S3 from "../services/s3.ts";
import * as S3Control from "../services/s3-control.ts";
import * as SigV4 from "../sigv4.ts";

// Public AWS example keys and a dummy session token; requests use an in-memory HTTP client.
const credentials = {
  accessKeyId: Redacted.make("AKIAIOSFODNN7EXAMPLE"),
  secretAccessKey: Redacted.make("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"),
  region: "us-east-1" as Region.RegionName,
  sessionToken: Redacted.make("SESSION+/="),
};

const capture = <A, E>(
  operation: Effect.Effect<
    A,
    E,
    Credentials.Credentials | HttpClient.HttpClient
  >,
  body?: string,
) =>
  Effect.gen(function* () {
    const requests: HttpClientRequest.HttpClientRequest[] = [];
    const client = HttpClient.make((request) =>
      Effect.sync(() => {
        requests.push(request);
        return HttpClientResponse.fromWeb(
          request,
          new Response(
            body ??
              (request.method === "POST"
                ? '<InitiateMultipartUploadResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Bucket>examplebucket</Bucket><Key>reports/part.md</Key><UploadId>upload-id</UploadId></InitiateMultipartUploadResult>'
                : ""),
            {
              headers: {
                "content-type": "application/xml",
                etag: '"object-etag"',
              },
            },
          ),
        );
      }),
    );
    const output = yield* operation.pipe(
      Effect.provide(
        Layer.mergeAll(
          Layer.succeed(HttpClient.HttpClient, client),
          Layer.succeed(Credentials.Credentials, Effect.succeed(credentials)),
          Endpoint.of("https://s3.us-east-1.amazonaws.com"),
        ),
      ),
    );
    assert.equal(requests.length, 1);
    return { output, request: requests[0]! };
  });

const captureSigned = <A, E>(
  operation: Effect.Effect<
    A,
    E,
    Credentials.Credentials | HttpClient.HttpClient
  >,
) =>
  Effect.gen(function* () {
    const { request } = yield* capture(operation);
    assert.match(request.headers["x-amz-date"], /^\d{8}T\d{6}Z$/);
    const signedHeaderNames = request.headers.authorization
      .split("SignedHeaders=")[1]!
      .split(",")[0]!
      .split(";");

    // Re-sign the exact headers sent to the HTTP transport.
    const signed = yield* SigV4.sign({
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(
        signedHeaderNames.map((name) => [name, request.headers[name]]),
      ),
      accessKeyId: Redacted.value(credentials.accessKeyId),
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
      service: "s3",
      region: credentials.region,
      datetime: request.headers["x-amz-date"],
    });
    for (const [name, value] of Object.entries(signed.headers)) {
      assert.equal(request.headers[name], value);
    }
    assert.equal(request.headers.authorization, signed.headers.authorization);
    assert.equal(request.headers["x-amz-security-token"], "SESSION+/=");
    assert.equal(request.headers["x-amz-content-sha256"], "UNSIGNED-PAYLOAD");
    return request;
  });

const bucket = { Bucket: "examplebucket" };
const xmlns = "http://s3.amazonaws.com/doc/2006-03-01/";

const notificationXml = (content: string) =>
  `<NotificationConfiguration xmlns="${xmlns}">${content}</NotificationConfiguration>`;

const getNotifications = (body: string) =>
  capture(S3.getBucketNotificationConfiguration(bucket), body);

describe("AwsProtocol REST-XML empty values", () => {
  for (const element of [
    "<EventBridgeConfiguration/>",
    "<EventBridgeConfiguration></EventBridgeConfiguration>",
    `<EventBridgeConfiguration xmlns="${xmlns}"/>`,
  ]) {
    it(`preserves the modeled empty structure in ${element}`, async () => {
      const { output } = await Effect.runPromise(
        getNotifications(notificationXml(element)),
      );
      assert.deepEqual(output.EventBridgeConfiguration, {});
      assert.equal(output.QueueConfigurations, undefined);
      assert.equal(output.TopicConfigurations, undefined);
      assert.equal(output.LambdaFunctionConfigurations, undefined);
    });
  }

  for (const body of [
    notificationXml(""),
    `<NotificationConfiguration xmlns="${xmlns}"/>`,
  ]) {
    it(`does not invent EventBridgeConfiguration in ${body}`, async () => {
      const { output } = await Effect.runPromise(getNotifications(body));
      assert.equal(output.EventBridgeConfiguration, undefined);
      assert.deepEqual(output, {});
    });
  }

  it("serializes EventBridgeConfiguration {} and decodes it back", async () => {
    const { request } = await Effect.runPromise(
      capture(
        S3.putBucketNotificationConfiguration({
          ...bucket,
          NotificationConfiguration: {
            EventBridgeConfiguration: {},
            QueueConfigurations: [],
            TopicConfigurations: [],
            LambdaFunctionConfigurations: [],
          },
        }),
        "",
      ),
    );
    assert.equal(request.method, "PUT");
    assert.equal(new URL(request.url).searchParams.has("notification"), true);
    assert.equal(request.headers["content-type"], "application/xml");
    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    const body = await web.text();
    assert.equal(
      body,
      notificationXml("<EventBridgeConfiguration></EventBridgeConfiguration>"),
    );
    const { output } = await Effect.runPromise(getNotifications(body));
    assert.deepEqual(output.EventBridgeConfiguration, {});
  });

  it("serializes an absent EventBridgeConfiguration without an element", async () => {
    const { request } = await Effect.runPromise(
      capture(
        S3.putBucketNotificationConfiguration({
          ...bucket,
          NotificationConfiguration: {},
        }),
        "",
      ),
    );
    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    assert.equal(await web.text(), notificationXml(""));
  });

  it("preserves empty strings without coercing empty numbers or booleans", async () => {
    const { output } = await Effect.runPromise(
      capture(
        S3.listObjectsV2(bucket),
        `<ListBucketResult xmlns="${xmlns}"><Name>examplebucket</Name><Prefix/><Delimiter></Delimiter><MaxKeys/><IsTruncated/><KeyCount>0</KeyCount></ListBucketResult>`,
      ),
    );
    assert.equal(output.Name, "examplebucket");
    assert.equal(output.Prefix, "");
    assert.equal(output.Delimiter, "");
    assert.equal(output.MaxKeys, undefined);
    assert.equal(output.IsTruncated, undefined);
    assert.equal(output.KeyCount, 0);
    assert.equal(output.Contents, undefined);
  });

  for (const content of [
    "<RoutingRules/>",
    "<RoutingRules></RoutingRules>",
    "",
  ]) {
    it(`keeps an empty or absent wrapped list undefined: ${content}`, async () => {
      const { output } = await Effect.runPromise(
        capture(
          S3.getBucketWebsite(bucket),
          `<WebsiteConfiguration xmlns="${xmlns}"><IndexDocument><Suffix>index.html</Suffix></IndexDocument>${content}</WebsiteConfiguration>`,
        ),
      );
      assert.deepEqual(output.IndexDocument, { Suffix: "index.html" });
      assert.equal(output.RoutingRules, undefined);
    });
  }

  it("preserves empty structures with optional members inside a list", async () => {
    const { output } = await Effect.runPromise(
      capture(
        S3.getBucketWebsite(bucket),
        `<WebsiteConfiguration xmlns="${xmlns}"><RoutingRules><RoutingRule><Condition/><Redirect/></RoutingRule></RoutingRules></WebsiteConfiguration>`,
      ),
    );
    assert.deepEqual(output.RoutingRules, [{ Condition: {}, Redirect: {} }]);
  });

  it("does not treat an empty map or timestamp as a structure", async () => {
    const { output } = await Effect.runPromise(
      capture(
        S3Control.getAccessPoint({
          AccountId: "123456789012",
          Name: "example-access-point",
        }),
        "<GetAccessPointResult><Name>example-access-point</Name><Endpoints/><CreationDate/><PublicAccessBlockConfiguration/></GetAccessPointResult>",
      ),
    );
    assert.equal(output.Name, "example-access-point");
    assert.equal(output.Endpoints, undefined);
    assert.equal(output.CreationDate, undefined);
    assert.deepEqual(output.PublicAccessBlockConfiguration, {});
  });
});

const object = { Bucket: "examplebucket", Key: "reports/part.md" };

describe("AwsProtocol Content-Type serialization", () => {
  it("preserves CreateMultipartUpload ContentType with an empty body", async () => {
    const request = await Effect.runPromise(
      captureSigned(
        S3.createMultipartUpload({ ...object, ContentType: "text/markdown" }),
      ),
    );
    assert.equal(request.method, "POST");
    assert.equal(new URL(request.url).searchParams.has("uploads"), true);
    assert.equal(request.body._tag, "Empty");
    assert.equal(request.headers["content-type"], "text/markdown");
    assert.equal(request.headers["content-length"], undefined);

    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    assert.equal(web.headers.get("content-type"), "text/markdown");
    assert.equal(
      web.headers.get("authorization"),
      request.headers.authorization,
    );
    assert.equal(await web.text(), "");
  });

  it("does not add Content-Type when CreateMultipartUpload omits it", async () => {
    const request = await Effect.runPromise(
      captureSigned(S3.createMultipartUpload(object)),
    );
    assert.equal(request.body._tag, "Empty");
    assert.equal(request.headers["content-type"], undefined);
    assert.equal(request.headers["content-length"], undefined);

    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    assert.equal(web.headers.has("content-type"), false);
    assert.equal(await web.text(), "");
  });

  const content = "# Multipart metadata\n";
  for (const [name, Body] of [
    ["text", content],
    ["bytes", new TextEncoder().encode(content)],
  ] as const) {
    it(`preserves modeled Content-Type and ${name} in a regular PutObject body`, async () => {
      const request = await Effect.runPromise(
        captureSigned(
          S3.putObject({ ...object, Body, ContentType: "text/markdown" }),
        ),
      );
      assert.equal(request.method, "PUT");
      assert.equal(request.body._tag, "Uint8Array");
      assert.equal(request.headers["content-type"], "text/markdown");
      assert.equal(request.headers["content-length"], String(content.length));

      const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
      assert.equal(web.headers.get("content-type"), "text/markdown");
      assert.equal(
        web.headers.get("authorization"),
        request.headers.authorization,
      );
      assert.equal(await web.text(), content);
    });
  }

  it("retains the default content type for a regular byte body", async () => {
    const request = await Effect.runPromise(
      captureSigned(
        S3.putObject({ ...object, Body: new TextEncoder().encode(content) }),
      ),
    );
    assert.equal(request.body._tag, "Uint8Array");
    assert.equal(request.headers["content-type"], "application/octet-stream");
    assert.equal(request.headers["content-length"], String(content.length));
    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    assert.equal(await web.text(), content);
  });
});
