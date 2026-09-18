import assert from "node:assert/strict";
import { describe, it } from "node:test";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as Stream from "effect/Stream";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import type { Response } from "../client/response.ts";
import * as Credentials from "../credentials.browser.ts";
import * as Endpoint from "../endpoint.ts";
import { ParseError } from "../errors.ts";
import { encodeMessage, stringHeader } from "../eventstream/codec.ts";
import type * as Region from "../region.ts";
import * as S3Control from "../services/s3-control.ts";
import * as S3 from "../services/s3.ts";
import * as SigV4 from "../sigv4.ts";
import * as T from "../traits.ts";
import { awsQueryProtocol } from "./aws-query.ts";
import { ec2QueryProtocol } from "./ec2-query.ts";
import { restXmlProtocol } from "./rest-xml.ts";

const response = (body: string, status = 200): Response => ({
  body,
  status,
  statusText: "",
  headers: {},
});
const input = S.Any.annotate({ identifier: "ListRequest" });
const output = S.Struct({
  name: S.String,
  count: S.Number,
  enabled: S.Boolean,
  items: S.Array(S.String),
}).annotate({ identifier: "ListResponse" });
const operation = { input, output, errors: [] };

for (const [name, protocol] of Object.entries({
  awsQueryProtocol,
  ec2QueryProtocol,
  restXmlProtocol,
})) {
  describe(name, () => {
    const handler = protocol(operation);
    const members =
      "<name> a&amp;b&#x1F600; </name><count> 02 </count><enabled> true </enabled><items><member>x</member><member>y</member></items>";
    const body =
      name === "awsQueryProtocol"
        ? `<ListResponse xmlns="urn:test"><ListResult>${members}</ListResult></ListResponse>`
        : `<ListResponse xmlns="urn:test">${members}</ListResponse>`;

    it("decodes response wrappers and schema-directed primitives/lists", () => {
      assert.deepEqual(Effect.runSync(handler.deserializeResponse(response(body))), {
        name: " a&b😀 ",
        count: 2,
        enabled: true,
        items: ["x", "y"],
      });
    });

    it("reads UTF-8 XML split across HTTP chunks", async () => {
      const bytes = new TextEncoder().encode(body.replace("&#x1F600;", "😀"));
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          // One byte per chunk includes splits inside the emoji's UTF-8 sequence.
          for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
          controller.close();
        },
      });
      assert.deepEqual(
        await Effect.runPromise(handler.deserializeResponse({ ...response(""), body: stream })),
        {
          name: " a&b😀 ",
          count: 2,
          enabled: true,
          items: ["x", "y"],
        },
      );
    });

    it("accepts empty successful response bodies", () => {
      assert.deepEqual(Effect.runSync(handler.deserializeResponse(response(""))), {});
    });

    for (const method of ["deserializeResponse", "deserializeError"] as const) {
      it(`${method} reports malformed XML as ParseError, not a defect`, () => {
        const result = Effect.runSync(
          Effect.flip(
            handler[method](
              response(
                "<ListResponse><bad></ListResponse>",
                method === "deserializeError" ? 400 : 200,
              ),
            ),
          ),
        );
        assert.ok(result instanceof ParseError);
      });
    }

    it("decodes the protocol's error envelope", () => {
      const error = "<Error><Code>Denied</Code><Message>A &amp; B &#65;</Message></Error>";
      const body =
        name === "ec2QueryProtocol"
          ? `<Response><Errors>${error}</Errors><RequestID>req</RequestID></Response>`
          : name === "awsQueryProtocol"
            ? `<ErrorResponse>${error}<RequestId>req</RequestId></ErrorResponse>`
            : error;
      assert.deepEqual(Effect.runSync(handler.deserializeError(response(body, 400))), {
        errorCode: "Denied",
        data: {
          Message: "A & B A",
          ...(name === "ec2QueryProtocol"
            ? { RequestID: "req" }
            : name === "awsQueryProtocol"
              ? { RequestId: "req" }
              : {}),
        },
      });
    });
  });
}

describe("REST XML bindings", () => {
  it("decodes attributes, renamed elements, flattened lists, and empty strings", () => {
    const output = S.Struct({
      id: S.String.pipe(T.XmlAttribute()),
      key: S.String.pipe(T.XmlName("Key")),
      values: S.Array(S.String).pipe(T.XmlFlattened(), T.XmlName("item")),
      empty: S.String,
    }).annotate({ identifier: "R" });
    const handler = restXmlProtocol({ input, output, errors: [] });
    assert.deepEqual(
      Effect.runSync(
        handler.deserializeResponse(
          response('<R id="001"><Key> key </Key><item>a</item><item>b</item><empty/></R>'),
        ),
      ),
      {
        id: "001",
        key: " key ",
        values: ["a", "b"],
        empty: "",
      },
    );
  });

  it("decodes structured HTTP payloads", () => {
    const output = S.Struct({
      payload: S.Struct({ Key: S.String }).annotate({ identifier: "Data" }).pipe(T.HttpPayload()),
    });
    const handler = restXmlProtocol({ input, output, errors: [] });
    assert.deepEqual(
      Effect.runSync(handler.deserializeResponse(response("<Data><Key>a&amp;b</Key></Data>"))),
      { payload: { Key: "a&b" } },
    );
  });

  it("decodes S3 unwrapped text with a namespace attribute", () => {
    const output = S.Struct({ LocationConstraint: S.String })
      .annotate({ identifier: "LocationConstraint" })
      .pipe(T.S3UnwrappedXmlOutput());
    const handler = restXmlProtocol({ input, output, errors: [] });
    assert.deepEqual(
      Effect.runSync(
        handler.deserializeResponse(
          response('<LocationConstraint xmlns="urn:s3">eu-west-1</LocationConstraint>'),
        ),
      ),
      { LocationConstraint: "eu-west-1" },
    );
    assert.deepEqual(
      Effect.runSync(handler.deserializeResponse(response('<LocationConstraint xmlns="urn:s3"/>'))),
      {},
    );
  });

  it("retains S3 empty-body and HTML error handling", () => {
    const handler = restXmlProtocol(operation);
    assert.deepEqual(Effect.runSync(handler.deserializeError(response("", 404))), {
      errorCode: "NotFound",
      data: {},
    });
    assert.deepEqual(
      Effect.runSync(
        handler.deserializeError(
          response("<html><li>Code: SlowDown</li><li>Message: retry</li></html>", 503),
        ),
      ),
      { errorCode: "SlowDown", data: { Message: "retry" } },
    );
  });
});

it("AWS Query decodes maps and empty list wrappers", () => {
  const output = S.Struct({
    tags: S.Record(S.String, S.String),
    items: S.Array(S.String),
  });
  const handler = awsQueryProtocol({ input, output, errors: [] });
  assert.deepEqual(
    Effect.runSync(
      handler.deserializeResponse(
        response(
          "<R><ListResult><tags><entry><key>a</key><value> x </value></entry><entry><key>b</key><value/></entry></tags><items/></ListResult></R>",
        ),
      ),
    ),
    { tags: { a: " x ", b: "" }, items: [] },
  );
});

it("REST XML event payloads retain the synchronous raw-text fallback", async () => {
  const output = S.Struct({
    events: T.EventStream(S.Unknown).pipe(T.HttpPayload()),
  });
  const handler = restXmlProtocol({ input, output, errors: [] });
  const frames = await Promise.all(
    ["<R>a&amp;b</R>", "<R>", ""].map((xml) =>
      Effect.runPromise(
        encodeMessage({
          headers: {
            ":message-type": stringHeader("event"),
            ":event-type": stringHeader("Record"),
          },
          payload: new TextEncoder().encode(xml),
        }),
      ),
    ),
  );
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(frame);
      controller.close();
    },
  });
  const result = Effect.runSync(handler.deserializeResponse({ ...response(""), body })) as {
    events: Stream.Stream<unknown, Error>;
  };
  const events = await Effect.runPromise(Stream.runCollect(result.events));
  assert.deepEqual(JSON.parse(JSON.stringify(events)), [
    { Record: { R: "a&b" } },
    { Record: { payload: "<R>" } },
    { Record: {} },
  ]);
});

// Public AWS example keys and a dummy session token; requests use an in-memory HTTP client.
const credentials = {
  accessKeyId: Redacted.make("AKIAIOSFODNN7EXAMPLE"),
  secretAccessKey: Redacted.make("wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"),
  region: "us-east-1" as Region.RegionName,
  sessionToken: Redacted.make("SESSION+/="),
};

const capture = <A, E>(
  operation: Effect.Effect<A, E, Credentials.Credentials | HttpClient.HttpClient>,
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
  operation: Effect.Effect<A, E, Credentials.Credentials | HttpClient.HttpClient>,
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
      headers: Object.fromEntries(signedHeaderNames.map((name) => [name, request.headers[name]])),
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
      const { output } = await Effect.runPromise(getNotifications(notificationXml(element)));
      assert.deepEqual(output.EventBridgeConfiguration, {});
      assert.equal(output.QueueConfigurations, undefined);
      assert.equal(output.TopicConfigurations, undefined);
      assert.equal(output.LambdaFunctionConfigurations, undefined);
    });
  }

  for (const body of [notificationXml(""), `<NotificationConfiguration xmlns="${xmlns}"/>`]) {
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
    assert.equal(body, notificationXml("<EventBridgeConfiguration></EventBridgeConfiguration>"));
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

  for (const content of ["<RoutingRules/>", "<RoutingRules></RoutingRules>", ""]) {
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
    assert.equal(String(output.CreationDate), "");
    assert.deepEqual(output.PublicAccessBlockConfiguration, {});
  });
});

const object = { Bucket: "examplebucket", Key: "reports/part.md" };

describe("AwsProtocol Content-Type serialization", () => {
  it("preserves CreateMultipartUpload ContentType with an empty body", async () => {
    const request = await Effect.runPromise(
      captureSigned(S3.createMultipartUpload({ ...object, ContentType: "text/markdown" })),
    );
    assert.equal(request.method, "POST");
    assert.equal(new URL(request.url).searchParams.has("uploads"), true);
    assert.equal(request.body._tag, "Empty");
    assert.equal(request.headers["content-type"], "text/markdown");
    assert.equal(request.headers["content-length"], undefined);

    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    assert.equal(web.headers.get("content-type"), "text/markdown");
    assert.equal(web.headers.get("authorization"), request.headers.authorization);
    assert.equal(await web.text(), "");
  });

  it("does not add Content-Type when CreateMultipartUpload omits it", async () => {
    const request = await Effect.runPromise(captureSigned(S3.createMultipartUpload(object)));
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
        captureSigned(S3.putObject({ ...object, Body, ContentType: "text/markdown" })),
      );
      assert.equal(request.method, "PUT");
      assert.equal(request.body._tag, "Uint8Array");
      assert.equal(request.headers["content-type"], "text/markdown");
      assert.equal(request.headers["content-length"], String(content.length));

      const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
      assert.equal(web.headers.get("content-type"), "text/markdown");
      assert.equal(web.headers.get("authorization"), request.headers.authorization);
      assert.equal(await web.text(), content);
    });
  }

  it("retains the default content type for a regular byte body", async () => {
    const request = await Effect.runPromise(
      captureSigned(S3.putObject({ ...object, Body: new TextEncoder().encode(content) })),
    );
    assert.equal(request.body._tag, "Uint8Array");
    assert.equal(request.headers["content-type"], "application/octet-stream");
    assert.equal(request.headers["content-length"], String(content.length));
    const web = await Effect.runPromise(HttpClientRequest.toWeb(request));
    assert.equal(await web.text(), content);
  });
});
