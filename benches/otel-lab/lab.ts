import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { relative } from "node:path";
import * as Bedrock from "@distilled.cloud/aws/bedrock-runtime";
/**
 * Telemetry lab (brainstorm). Runs a few real distilled operations against a
 * mocked HttpClient under each telemetry level and records, per scenario:
 * the spans (as an in-memory tracer sees them), the error as `Cause.pretty`
 * prints it, and what each level costs per call. Writes
 * benches/dashboard/telemetry/lab.json, which the dashboard's telemetry page
 * (telemetry.html) reads.
 *
 *   node --experimental-transform-types --conditions=bun lab.ts
 */
import * as AwsCredentials from "@distilled.cloud/aws/Credentials";
import * as DynamoDB from "@distilled.cloud/aws/dynamodb";
import * as AwsEndpoint from "@distilled.cloud/aws/Endpoint";
import * as EventBridge from "@distilled.cloud/aws/eventbridge";
import { encodeEvent } from "@distilled.cloud/aws/eventstream/codec";
import { serializeInputEvent } from "@distilled.cloud/aws/eventstream/serializer";
import * as Lambda from "@distilled.cloud/aws/lambda";
import * as Region from "@distilled.cloud/aws/Region";
import * as S3 from "@distilled.cloud/aws/s3";
import * as SQS from "@distilled.cloud/aws/sqs";
import * as STS from "@distilled.cloud/aws/sts";
import * as AzureCredentials from "@distilled.cloud/azure/Credentials";
import * as AzureResources from "@distilled.cloud/azure/resources";
import * as CfCredentials from "@distilled.cloud/cloudflare/Credentials";
import * as R2 from "@distilled.cloud/cloudflare/r2";
import * as Zones from "@distilled.cloud/cloudflare/zones";
import { Query } from "@distilled.cloud/core/query";
import * as Telemetry from "@distilled.cloud/core/telemetry";
import { TelemetryDebug } from "@distilled.cloud/core/telemetry-debug";
import * as FlyCredentials from "@distilled.cloud/fly-io/Credentials";
import * as FlyMachines from "@distilled.cloud/fly-io/machines";
import * as Compute from "@distilled.cloud/gcp/compute_v1";
import * as GcpCredentials from "@distilled.cloud/gcp/Credentials";
import * as Storage from "@distilled.cloud/gcp/storage_v1";
import * as GitHubCredentials from "@distilled.cloud/github/Credentials";
import * as GitHubRepos from "@distilled.cloud/github/repos";
import * as NeonCredentials from "@distilled.cloud/neon/Credentials";
import * as Neon from "@distilled.cloud/neon/neon";
import { CredentialsFromToken, GraphQLLive, Railway } from "@distilled.cloud/railway";
import * as SlackChat from "@distilled.cloud/slack/chat";
import * as SlackCredentials from "@distilled.cloud/slack/Credentials";
import * as StripeCredentials from "@distilled.cloud/stripe/Credentials";
import * as Stripe from "@distilled.cloud/stripe/stripe";
import * as VercelCredentials from "@distilled.cloud/vercel/Credentials";
import * as VercelProjects from "@distilled.cloud/vercel/projects";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import * as Tracer from "effect/Tracer";

const ROOT = new URL("../../", import.meta.url).pathname;
const tidy = (s: string) => s.replaceAll(ROOT, "").replaceAll("file://", "");

//#region mock HTTP

interface Canned {
  readonly status?: number;
  readonly headers?: Record<string, string>;
  readonly body: string;
  /** Simulated network time. */
  readonly ms?: number;
  /** A streamed body instead of `body`: each part `ms` after the last, then the end. */
  readonly parts?: ReadonlyArray<{ readonly ms: number; readonly bytes: string | Uint8Array }>;
}

/** A response body that sends `parts` with their delays. */
const streamed = (parts: NonNullable<Canned["parts"]>) => {
  let i = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const part = parts[i++];
      if (part === undefined) return controller.close();
      await new Promise((resolve) => setTimeout(resolve, part.ms));
      controller.enqueue(
        typeof part.bytes === "string" ? new TextEncoder().encode(part.bytes) : part.bytes,
      );
    },
  });
};

/**
 * Every request body the mocked HttpClient received, for scenarios that
 * show what was sent. Recorded inside the mock: wrapping the client in a
 * second HttpClient.make would add a second HTTP span per request.
 */
const sentBodies: string[] = [];
/** Trace-context request headers, per request, for the scenarios that show them. */
const sentHeaders: Array<Record<string, string>> = [];
const TRACE_HEADERS = ["traceparent", "b3", "x-amzn-trace-id", "x-amz-client-context"];

const recordBody = (request: HttpClientRequest.HttpClientRequest) => {
  sentHeaders.push(
    Object.fromEntries(
      TRACE_HEADERS.filter((h) => request.headers[h] !== undefined).map((h) => [
        h,
        request.headers[h]!,
      ]),
    ),
  );
  const body = request.body as { _tag: string; body?: Uint8Array | string };
  if (body._tag === "Uint8Array" && body.body instanceof Uint8Array) {
    sentBodies.push(new TextDecoder().decode(body.body));
  } else if (typeof body.body === "string") sentBodies.push(body.body);
};

/** An HttpClient that plays `responses` in order (the last one repeats). */
const scripted = (responses: ReadonlyArray<Canned>) => {
  let i = 0;
  return Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request: HttpClientRequest.HttpClientRequest) => {
      const r = responses[Math.min(i++, responses.length - 1)]!;
      recordBody(request);
      const respond = Effect.sync(() =>
        HttpClientResponse.fromWeb(
          request,
          new Response(r.parts ? streamed(r.parts) : r.body, {
            status: r.status ?? 200,
            headers: r.headers ?? { "content-type": "application/json" },
          }),
        ),
      );
      return r.ms ? Effect.delay(respond, r.ms) : respond;
    }),
  );
};

//#endregion

//#region recording tracer

interface RecordedSpan {
  readonly id: string;
  readonly parent: string | undefined;
  readonly name: string;
  readonly kind: string;
  readonly sampled: boolean;
  readonly startUs: number;
  readonly endUs: number;
  readonly status: "ok" | "error";
  readonly attributes: Record<string, unknown>;
  /** Spans this one links to (W3C trace context read from messages). */
  readonly links: ReadonlyArray<{
    readonly traceId: string;
    readonly spanId: string;
    readonly attributes: Readonly<Record<string, unknown>>;
  }>;
  /** Which component made the span. */
  readonly source: "distilled" | "attempt" | "effect-http" | "user";
}

const recorder = () => {
  const spans: Tracer.NativeSpan[] = [];
  const tracer = Tracer.make({
    span(options) {
      const span = new Tracer.NativeSpan(options);
      spans.push(span);
      return span;
    },
  });
  const dump = (): RecordedSpan[] => {
    const t0 = spans.length ? spans[0]!.status.startTime : 0n;
    return spans.map((s) => {
      const status = s.status;
      const end = status._tag === "Ended" ? status.endTime : status.startTime;
      const attributes = Object.fromEntries(
        [...s.attributes].map(([k, v]) => [k, typeof v === "string" ? tidy(v) : v]),
      );
      const parent =
        s.parent._tag === "Some" ? (s.parent.value as { spanId: string }).spanId : undefined;
      return {
        id: s.spanId,
        parent: spans.some((p) => p.spanId === parent) ? parent : undefined,
        name: s.name,
        kind: s.kind,
        sampled: s.sampled,
        startUs: Number(status.startTime - t0) / 1e3,
        endUs: Number(end - t0) / 1e3,
        status: status._tag === "Ended" && Exit.isFailure(status.exit) ? "error" : "ok",
        attributes,
        links: s.links.map((l) => ({
          traceId: l.span.traceId,
          spanId: l.span.spanId,
          attributes: l.attributes,
        })),
        source:
          s.name === "Attempt"
            ? "attempt"
            : "url.full" in attributes && !("rpc.system.name" in attributes)
              ? "effect-http"
              : (/^(aws|cloudflare|distilled)\.|\.|^Cloudflare /.test(s.name) ||
                    "rpc.system.name" in attributes) &&
                  s.name !== "deployConfig"
                ? "distilled"
                : "user",
      };
    });
  };
  return { tracer, dump };
};

//#endregion

//#region scenarios

const token = (name: string) => Redacted.make(`${name}-token`);

/** Credentials for every other SDK the lab calls. */
const providers = Layer.mergeAll(
  StripeCredentials.credentials({ apiKey: token("stripe") }),
  GcpCredentials.fromAccessToken({ accessToken: token("gcp"), project: "acme-prod" }),
  Layer.succeed(
    AzureCredentials.Credentials,
    Effect.succeed({
      bearerToken: token("azure"),
      subscriptionId: "00000000-0000-0000-0000-000000000001",
      apiBaseUrl: "https://management.azure.com",
    }),
  ),
  GitHubCredentials.credentials({ token: token("github") }),
  NeonCredentials.fromApiKey({ apiKey: token("neon") }),
  VercelCredentials.credentials({ token: token("vercel") }),
  SlackCredentials.credentials({ token: token("slack") }),
  FlyCredentials.credentials({ apiKey: token("fly") }),
);

const railway = Layer.mergeAll(
  GraphQLLive,
  CredentialsFromToken({ token: Redacted.make("railway-token") }),
);

const aws = Layer.mergeAll(AwsCredentials.mock, Region.of("us-east-1"));
const cloudflare = CfCredentials.fromApiToken({ apiToken: Redacted.make("test-token") });

const xmlError = (code: string, message: string) =>
  `<?xml version="1.0" encoding="UTF-8"?><Error><Code>${code}</Code><Message>${message}</Message><RequestId>4442587FB7D0A2F9</RequestId></Error>`;

interface Scenario {
  readonly id: string;
  readonly title: string;
  readonly what: string;
  readonly code: string;
  readonly program: Effect.Effect<unknown, unknown, never>;
  readonly http: ReadonlyArray<Canned>;
}

// A user's own traced function, so the trace has a user span at the top.
const deployConfig = Effect.fn("deployConfig")(function* (key: string) {
  const object = yield* S3.getObject({ Bucket: "app-config", Key: key });
  return object.ContentLength;
});

/** Bedrock ConverseStream's events in the event-stream wire format. */
const converseEvents = await Promise.all(
  [
    { messageStart: { role: "assistant" } },
    { contentBlockDelta: { contentBlockIndex: 0, delta: { text: "hel" } } },
    { contentBlockDelta: { contentBlockIndex: 0, delta: { text: "lo" } } },
    { messageStop: { stopReason: "end_turn" } },
    {
      metadata: {
        usage: { inputTokens: 12, outputTokens: 5, totalTokens: 17 },
        metrics: { latencyMs: 560 },
      },
    },
  ].map((event) => Effect.runPromise(encodeEvent(serializeInputEvent(event)))),
);

// The caller reads an S3 object body in its own traced function.
const loadConfig = Effect.fn("loadConfig")(function* () {
  const object = yield* S3.getObject({ Bucket: "app-config", Key: "prod.json" });
  return yield* Stream.mkString(Stream.decodeText(object.Body as Stream.Stream<Uint8Array>));
});

const scenarios = (): Scenario[] => [
  {
    id: "s3-missing",
    title: "S3 GetObject → NoSuchKey",
    what: "A typed error from a plain Effect.gen. Its own JS stack would point only into distilled's response parser; the failure frame names the operation at the caller's line instead.",
    code: `Effect.gen(function* () {
  const object = yield* S3.getObject({
    Bucket: "app-config",
    Key: "prod.json",
  });
})`,
    program: Effect.gen(function* () {
      const object = yield* S3.getObject({ Bucket: "app-config", Key: "prod.json" });
      return object.ContentLength;
    }) as never,
    http: [
      {
        status: 404,
        ms: 18,
        headers: {
          "content-type": "application/xml",
          "x-amz-request-id": "4442587FB7D0A2F9",
          "x-amz-id-2":
            "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo=",
        },
        body: xmlError("NoSuchKey", "The specified key does not exist."),
      },
    ],
  },
  {
    id: "s3-missing-fn",
    title: "S3 GetObject inside Effect.fn",
    what: "The same error, called from the user's own Effect.fn. Effect already adds the user's frames; distilled adds the operation frame between them.",
    code: `const deployConfig = Effect.fn("deployConfig")(
  function* (key: string) {
    const object = yield* S3.getObject({
      Bucket: "app-config", Key: key });
  });`,
    program: deployConfig("prod.json") as never,
    http: [
      {
        status: 404,
        ms: 18,
        headers: { "content-type": "application/xml", "x-amz-request-id": "4442587FB7D0A2F9" },
        body: xmlError("NoSuchKey", "The specified key does not exist."),
      },
    ],
  },
  {
    id: "dynamodb-retry",
    title: "DynamoDB GetItem, throttled twice, then OK",
    what: "Default retry policy. Operation mode records the retries on the one span (attempts, error of each failed try, total backoff); debug mode shows each try as an Attempt span with serialize, sign and the HTTP request under it, and the backoff sleeps between them.",
    code: `yield* DynamoDB.getItem({
  TableName: "users",
  Key: { pk: { S: "user#1" } },
})`,
    program: DynamoDB.getItem({ TableName: "users", Key: { pk: { S: "user#1" } } }) as never,
    http: [
      {
        status: 400,
        ms: 9,
        headers: { "content-type": "application/x-amz-json-1.0", "x-amzn-requestid": "R1THROTTLE" },
        body: JSON.stringify({
          __type: "com.amazonaws.dynamodb.v20120810#ThrottlingException",
          message: "Rate of requests exceeds the allowed throughput.",
        }),
      },
      {
        status: 500,
        ms: 11,
        headers: { "content-type": "application/x-amz-json-1.0", "x-amzn-requestid": "R2INTERNAL" },
        body: JSON.stringify({
          __type: "com.amazonaws.dynamodb.v20120810#InternalServerError",
          message: "Internal server error",
        }),
      },
      {
        status: 200,
        ms: 7,
        headers: { "content-type": "application/x-amz-json-1.0", "x-amzn-requestid": "R3OK" },
        body: JSON.stringify({ Item: { pk: { S: "user#1" }, name: { S: "Ada" } } }),
      },
    ],
  },
  {
    id: "s3-slowdown",
    title: "S3 PutObject, SlowDown ×4 (≈ 4.4 s)",
    what: "A call that took about 4.4 s. The operation span alone shows why: distilled.attempts is 5, distilled.retry.errors lists 4 SlowDown responses, and distilled.retry.delay_ms is about 4 s of backoff. Debug mode shows each try as its own span.",
    code: `yield* S3.putObject({
  Bucket: "app-assets",
  Key: "index.html",
  Body: "<html>…</html>",
})`,
    program: S3.putObject({
      Bucket: "app-assets",
      Key: "index.html",
      Body: "<html></html>",
    }) as never,
    http: [
      ...[1, 2, 3, 4].map((i) => ({
        status: 503,
        ms: 40 + i * 5,
        headers: { "content-type": "application/xml", "x-amz-request-id": `SLOW${i}` },
        body: xmlError("SlowDown", "Please reduce your request rate."),
      })),
      {
        status: 200,
        ms: 60,
        headers: { etag: '"d41d8cd98f00b204e9800998ecf8427e"', "x-amz-request-id": "OK5" },
        body: "",
      },
    ],
  },
  {
    id: "sqs-send",
    title: "SQS SendMessage",
    what: "A PRODUCER span named after the messaging conventions, send {queue}. It writes its own W3C trace context into the message as the traceparent message attribute (see the request sent), so the receiver can link back to it.",
    code: `yield* SQS.sendMessage({
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/orders",
  MessageBody: '{"orderId":42}',
})`,
    program: SQS.sendMessage({
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/orders",
      MessageBody: '{"orderId":42}',
    }) as never,
    http: [
      {
        ms: 12,
        headers: { "content-type": "application/x-amz-json-1.0", "x-amzn-requestid": "SQS1" },
        body: JSON.stringify({
          MessageId: "5fea7756-0ea4-451a-a703-a558b933e274",
          MD5OfMessageBody: createHash("md5").update('{"orderId":42}').digest("hex"),
        }),
      },
    ],
  },
  {
    id: "sqs-receive",
    title: "SQS ReceiveMessage → link to producer",
    what: "The receive span asks SQS for the traceparent message attribute and links to the producer span of every message it gets, so a trace shows send → receive. The span name follows the messaging conventions: receive {queue}.",
    code: `yield* SQS.receiveMessage({
  QueueUrl: ".../123456789012/orders",
  MaxNumberOfMessages: 2,
})`,
    program: SQS.receiveMessage({
      QueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/orders",
      MaxNumberOfMessages: 2,
    }) as never,
    http: [
      {
        ms: 15,
        headers: { "content-type": "application/x-amz-json-1.0", "x-amzn-requestid": "SQS2" },
        body: JSON.stringify({
          Messages: [1, 2].map((i) => ({
            MessageId: `m${i}`,
            ReceiptHandle: `rh${i}`,
            Body: `{"orderId":${40 + i}}`,
            MD5OfBody: createHash("md5")
              .update(`{"orderId":${40 + i}}`)
              .digest("hex"),
            MessageAttributes: {
              traceparent: {
                DataType: "String",
                StringValue: `00-0af7651916cd43dd8448eb211c80319${i}-b7ad6b716920333${i}-01`,
              },
            },
          })),
        }),
      },
    ],
  },
  {
    id: "r2-via-s3",
    title: "R2 through the S3 SDK",
    what: "S3.getObject against an R2 endpoint. The S3 host rule records the Cloudflare attributes the Cloudflare SDK's R2 operations record (cloudflare.account_id, cloudflare.r2.bucket, cloudflare.r2.object_key) and R2's cf-ray, so both paths to one bucket line up.",
    code: `yield* S3.getObject({ Bucket: "assets", Key: "index.html" })
  .pipe(Effect.provide(
    Endpoint.of("https://0123456789abcdef.r2.cloudflarestorage.com")))`,
    program: Effect.provide(
      S3.getObject({ Bucket: "assets", Key: "index.html" }),
      AwsEndpoint.of("https://0123456789abcdef.r2.cloudflarestorage.com"),
    ) as never,
    http: [
      {
        ms: 22,
        headers: { "content-type": "text/html", "cf-ray": "8f1c2a1b3d4e5f6-SJC" },
        body: "<html></html>",
      },
    ],
  },
  {
    id: "r2-via-cloudflare",
    title: "R2 through the Cloudflare SDK",
    what: "The same bucket through Cloudflare's REST API: Cloudflare.GetBucket with the same cloudflare.account_id and cloudflare.r2.bucket as the S3 path.",
    code: `yield* R2.getBucket({
  accountId: "0123456789abcdef",
  bucketName: "assets",
})`,
    program: R2.getBucket({ accountId: "0123456789abcdef", bucketName: "assets" }) as never,
    http: [
      {
        ms: 18,
        headers: { "content-type": "application/json", "cf-ray": "8f1c9a1b3d4e5f7-SJC" },
        body: JSON.stringify({
          success: true,
          errors: [],
          messages: [],
          result: { name: "assets", creation_date: "2026-01-01T00:00:00Z" },
        }),
      },
    ],
  },
  {
    id: "railway-graphql",
    title: "Railway GraphQL document",
    what: "Railway's Query client sends one GraphQL document; it gets one span, named by its root field, with graphql.operation.* and the ids from its arguments.",
    code: `yield* Query.fn(() => ({
  name: Railway.project({ id: "p-123" }).name,
}))()`,
    program: Query.fn(() => ({ name: Railway.project({ id: "p-123" }).name }))() as never,
    http: [
      {
        ms: 30,
        headers: { "content-type": "application/json", "x-request-id": "rw-1" },
        body: JSON.stringify({ data: { project: { name: "engine" } } }),
      },
    ],
  },
  {
    id: "stripe-missing",
    title: "Stripe GetCustomer → 404",
    what: "Stripe's own protocol (form-encoded, its error envelope). The span carries Stripe's request-id, the id Stripe support asks for, and the customer id from the path.",
    code: `yield* Stripe.GetCustomer({ customer: "cus_missing" })`,
    program: Stripe.GetCustomer({ customer: "cus_missing" }) as never,
    http: [
      {
        status: 404,
        ms: 21,
        headers: { "content-type": "application/json", "request-id": "req_8Hb2kQq1xZ3m" },
        body: JSON.stringify({
          error: {
            code: "resource_missing",
            doc_url: "https://stripe.com/docs/error-codes/resource-missing",
            message: "No such customer: 'cus_missing'",
            param: "id",
            type: "invalid_request_error",
          },
        }),
      },
    ],
  },
  {
    id: "gcp-storage",
    title: "GCP Cloud Storage objects.get",
    what: "A Google discovery API. Each GCP API is its own product, so the span is named by the service (Storage.GetObjects), and the bucket and object come from the path.",
    code: `yield* Storage.getObjects({
  bucket: "acme-assets",
  object: "logo.png",
})`,
    program: Storage.getObjects({ bucket: "acme-assets", object: "logo.png" }) as never,
    http: [
      {
        ms: 26,
        headers: { "content-type": "application/json", "x-guploader-uploadid": "ABgVH8x" },
        body: JSON.stringify({
          kind: "storage#object",
          name: "logo.png",
          bucket: "acme-assets",
          size: "2048",
          contentType: "image/png",
        }),
      },
    ],
  },
  {
    id: "gcp-compute-missing",
    title: "GCP Compute instances.get → 404",
    what: "Another GCP product on the same protocol: Compute.GetInstances with project, zone and instance from the path, failing with the typed NotFound error.",
    code: `yield* Compute.getInstances({
  project: "acme-prod",
  zone: "us-central1-a",
  instance: "web-1",
})`,
    program: Compute.getInstances({
      project: "acme-prod",
      zone: "us-central1-a",
      instance: "web-1",
    }) as never,
    http: [
      {
        status: 404,
        ms: 33,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          error: {
            code: 404,
            message:
              "The resource 'projects/acme-prod/zones/us-central1-a/instances/web-1' was not found",
            errors: [{ reason: "notFound", domain: "global" }],
          },
        }),
      },
    ],
  },
  {
    id: "azure-resource-group",
    title: "Azure GetResourceGroup",
    what: "An Azure Resource Manager call. Azure's request ids (x-ms-request-id, x-ms-correlation-request-id) land on the span, with the subscription and resource group from the path.",
    code: `yield* Resources.GetResourceGroup({
  subscriptionId: "0000…0001",
  resourceGroupName: "acme-prod",
})`,
    program: AzureResources.GetResourceGroup({
      subscriptionId: "00000000-0000-0000-0000-000000000001",
      resourceGroupName: "acme-prod",
    } as never) as never,
    http: [
      {
        ms: 41,
        headers: {
          "content-type": "application/json",
          "x-ms-request-id": "6f5c1d2e-91a4-4c6b-9d5b-0c8e7d3b2a11",
          "x-ms-correlation-request-id": "6f5c1d2e-91a4-4c6b-9d5b-0c8e7d3b2a11",
        },
        body: JSON.stringify({
          id: "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/acme-prod",
          name: "acme-prod",
          location: "eastus",
          properties: { provisioningState: "Succeeded" },
        }),
      },
    ],
  },
  {
    id: "github-repo",
    title: "GitHub repos.get",
    what: "GitHub's REST API. The span is GitHub.Get with owner and repo from the path and GitHub's x-github-request-id.",
    code: `yield* Repos.get({ owner: "alchemy-run", repo: "distilled" })`,
    program: GitHubRepos.get({ owner: "alchemy-run", repo: "distilled" }) as never,
    http: [
      {
        ms: 19,
        headers: {
          "content-type": "application/json",
          "x-github-request-id": "C3A4:2B1F:9D2E1:A01B2:6720F1A3",
        },
        body: JSON.stringify({ id: 1, name: "distilled", full_name: "alchemy-run/distilled" }),
      },
    ],
  },
  {
    id: "neon-project",
    title: "Neon getProject",
    what: "A plain OpenAPI provider on the shared REST protocol: Neon.GetProject with neon.project_id from the path.",
    code: `yield* Neon.getProject({ project_id: "round-sky-12345" })`,
    program: Neon.getProject({ project_id: "round-sky-12345" }) as never,
    http: [
      {
        ms: 24,
        headers: { "content-type": "application/json", "x-request-id": "neon-req-1" },
        body: JSON.stringify({ project: { id: "round-sky-12345", name: "acme" } }),
      },
    ],
  },
  {
    id: "vercel-project",
    title: "Vercel getProject",
    what: "Vercel's REST API: vercel.id_or_name from the path and Vercel's x-vercel-id.",
    code: `yield* Projects.getProject({ idOrName: "acme-web" })`,
    program: VercelProjects.getProject({ idOrName: "acme-web" }) as never,
    http: [
      {
        ms: 17,
        headers: { "content-type": "application/json", "x-vercel-id": "iad1::abcde-1730000000000" },
        body: JSON.stringify({ id: "prj_123", name: "acme-web" }),
      },
    ],
  },
  {
    id: "slack-error",
    title: "Slack chat.postMessage → ok: false",
    what: "Slack answers 200 with ok: false. The span still ends as an error with the typed tag, and carries Slack's x-slack-req-id.",
    code: `yield* Chat.postMessage({
  channel: "C0123456",
  text: "deploy finished",
})`,
    program: SlackChat.postMessage({ channel: "C0123456", text: "deploy finished" }) as never,
    http: [
      {
        ms: 28,
        headers: { "content-type": "application/json", "x-slack-req-id": "7a1e3c9f2b4d6e8a" },
        body: JSON.stringify({ ok: false, error: "channel_not_found" }),
      },
    ],
  },
  {
    id: "fly-app",
    title: "Fly.io Machines getApp",
    what: "Fly's Machines REST API: Fly.GetApp with fly_io.app_name and Fly's fly-request-id.",
    code: `yield* Machines.getApp({ app_name: "acme-api" })`,
    program: FlyMachines.getApp({ app_name: "acme-api" }) as never,
    http: [
      {
        ms: 22,
        headers: { "content-type": "application/json", "fly-request-id": "01JB2X3Y4Z-iad" },
        body: JSON.stringify({ id: "app_1", name: "acme-api", status: "deployed" }),
      },
    ],
  },
  {
    id: "bedrock-converse",
    title: "Bedrock Converse (GenAI)",
    what: "A GenAI client span per the GenAI conventions: chat {model}, the request's model and inference settings, and the response's token usage and finish reason. The request also carries an X-Amzn-Trace-Id header.",
    code: `yield* Bedrock.converse({
  modelId: "anthropic.claude-sonnet",
  messages: [{ role: "user", content: [{ text: "hi" }] }],
  inferenceConfig: { maxTokens: 256, temperature: 0.2 },
})`,
    program: Bedrock.converse({
      modelId: "anthropic.claude-sonnet",
      messages: [{ role: "user", content: [{ text: "hi" }] }],
      inferenceConfig: { maxTokens: 256, temperature: 0.2 },
    } as never) as never,
    http: [
      {
        ms: 420,
        headers: { "content-type": "application/json", "x-amzn-requestid": "BR1" },
        body: JSON.stringify({
          output: { message: { role: "assistant", content: [{ text: "hello" }] } },
          stopReason: "end_turn",
          usage: { inputTokens: 12, outputTokens: 5, totalTokens: 17 },
          metrics: { latencyMs: 410 },
        }),
      },
    ],
  },
  {
    id: "bedrock-converse-stream",
    title: "Bedrock ConverseStream, 5 events",
    what: "A streamed GenAI response. The headers arrive after 180 ms, the events over the next 400 ms. A GenAI span ends when the response is fully received (GenAI conventions; the OpenTelemetry AWS SDK instrumentations do the same), so the operation span stays open until the caller has read the last event, and gen_ai.response.time_to_first_chunk records when the first event arrived. Debug mode shows the read as distilled.read_stream.",
    code: `const { stream } = yield* Bedrock.converseStream({
  modelId: "anthropic.claude-sonnet",
  messages: [{ role: "user", content: [{ text: "hi" }] }],
});
yield* Stream.runCollect(stream);`,
    program: Effect.flatMap(
      Bedrock.converseStream({
        modelId: "anthropic.claude-sonnet",
        messages: [{ role: "user", content: [{ text: "hi" }] }],
      } as never),
      (out) => Stream.runCollect(out.stream as Stream.Stream<unknown>),
    ) as never,
    http: [
      {
        ms: 180,
        headers: {
          "content-type": "application/vnd.amazon.eventstream",
          "x-amzn-requestid": "BRS1",
        },
        body: "",
        parts: converseEvents.map((bytes) => ({ ms: 80, bytes })),
      },
    ],
  },
  {
    id: "s3-get-stream",
    title: "S3 GetObject, body read in 3 parts",
    what: "A streamed object body, read inside the caller's own Effect.fn. The headers arrive after 20 ms, the body over the next 360 ms. The operation span ends at the headers, as in the OpenTelemetry AWS SDK instrumentations and the HTTP client span conventions; the caller's loadConfig span covers the read.",
    code: `const loadConfig = Effect.fn("loadConfig")(function* () {
  const object = yield* S3.getObject({
    Bucket: "app-config",
    Key: "prod.json",
  });
  return yield* object.Body.pipe(Stream.decodeText, Stream.mkString);
});`,
    program: loadConfig() as never,
    http: [
      {
        ms: 20,
        headers: {
          "content-type": "application/json",
          "content-length": "35",
          "x-amz-request-id": "4442587FB7D0A2F9",
        },
        body: "",
        parts: ['{"region":', '"us-east-1",', '"replicas":3}'].map((bytes) => ({ ms: 120, bytes })),
      },
    ],
  },
  {
    id: "lambda-invoke",
    title: "Lambda Invoke",
    what: "The function's trace context goes in ClientContext (base64 JSON, custom.traceparent), where the invoked function reads it; faas.invoked_region comes from the call's region.",
    code: `yield* Lambda.invoke({
  FunctionName: "resize-image",
  Payload: '{"key":"a.png"}',
})`,
    program: Lambda.invoke({
      FunctionName: "resize-image",
      Payload: new TextEncoder().encode('{"key":"a.png"}'),
    } as never) as never,
    http: [
      {
        ms: 95,
        headers: {
          "content-type": "application/json",
          "x-amzn-requestid": "L1",
          "x-amz-executed-version": "$LATEST",
        },
        body: JSON.stringify({ ok: true }),
      },
    ],
  },
  {
    id: "eventbridge-put",
    title: "EventBridge PutEvents",
    what: "No messaging conventions cover EventBridge, so this stays an AWS SDK span (EventBridge.PutEvents), as a producer, and writes an X-Ray TraceHeader into every entry.",
    code: `yield* EventBridge.putEvents({
  Entries: [{ Source: "app.orders", DetailType: "OrderPlaced", Detail: '{"id":42}' }],
})`,
    program: EventBridge.putEvents({
      Entries: [{ Source: "app.orders", DetailType: "OrderPlaced", Detail: '{"id":42}' }],
    }) as never,
    http: [
      {
        ms: 14,
        headers: { "content-type": "application/x-amz-json-1.1", "x-amzn-requestid": "EB1" },
        body: JSON.stringify({ FailedEntryCount: 0, Entries: [{ EventId: "e-1" }] }),
      },
    ],
  },
  {
    id: "cloudflare-pages",
    title: "Cloudflare listZones, 3 pages",
    what: "A paginated stream. Every page is one operation call, so one operation span each.",
    code: `yield* Zones.listZones
  .pages({ perPage: 2 })
  .pipe(Stream.runCollect)`,
    program: Stream.runCollect(Zones.listZones.pages({ perPage: 2 })) as never,
    // A 4th, empty page, in case the pagination asks for one.
    http: [1, 2, 3, 4].map((page) => ({
      ms: 14,
      headers: { "content-type": "application/json", "cf-ray": `8f${page}c2a1b3d4e5f6-SJC` },
      body: JSON.stringify({
        success: true,
        errors: [],
        messages: [],
        result:
          page > 3
            ? []
            : [
                { id: `z${page}a`, name: `zone-${page}a.dev`, status: "active" },
                { id: `z${page}b`, name: `zone-${page}b.dev`, status: "active" },
              ],
        result_info: { page, per_page: 2, total_pages: 3, count: 2, total_count: 6 },
      }),
    })),
  },
];

type Level = "operation" | "debug";
const LEVELS: ReadonlyArray<Level> = ["operation", "debug"];
/** Operation spans are always on; debug is the TelemetryDebug layer. */
const levelLayer = (level: Level) => (level === "debug" ? TelemetryDebug.layer : Layer.empty);

const fieldsOf = (error: unknown): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  if (error && typeof error === "object") {
    for (const key of Object.keys(error)) {
      const v = (error as Record<string, unknown>)[key];
      out[key] = typeof v === "object" && v !== null ? JSON.parse(JSON.stringify(v) ?? "null") : v;
    }
  }
  return out;
};

const runScenario = async (scenario: Scenario, level: Level) => {
  const { tracer, dump } = recorder();
  sentBodies.length = 0;
  sentHeaders.length = 0;
  const exit = await Effect.runPromiseExit(
    scenario.program.pipe(
      Effect.provide(
        Layer.mergeAll(
          scripted(scenario.http),
          aws,
          cloudflare,
          railway,
          providers,
          levelLayer(level),
        ),
      ),
      Effect.provideService(Tracer.Tracer, tracer),
    ),
  );
  return {
    level,
    ok: Exit.isSuccess(exit),
    pretty: Exit.isFailure(exit) ? tidy(Cause.pretty(exit.cause)) : undefined,
    // What the caller can read off the error object itself.
    errorFields: Exit.isFailure(exit) ? fieldsOf(Cause.squash(exit.cause)) : undefined,
    spans: dump(),
    sent: sentBodies.slice(),
    sentHeaders: sentHeaders.slice(),
  };
};

//#endregion

//#region cost

const stsBody = `<GetCallerIdentityResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/"><GetCallerIdentityResult><Arn>arn:aws:iam::123456789012:user/ada</Arn><UserId>AIDA</UserId><Account>123456789012</Account></GetCallerIdentityResult><ResponseMetadata><RequestId>req-1</RequestId></ResponseMetadata></GetCallerIdentityResponse>`;

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)]!;
};

/**
 * µs per warm STS GetCallerIdentity call for each level and tracer, median
 * of interleaved batches (every round runs every variant once, so machine
 * load hits them all alike). `native` is Effect's default tracer (spans are
 * built, nothing is exported); `recording` keeps every span like an
 * exporter would.
 */
const measureCost = async () => {
  const http = scripted([{ headers: { "content-type": "text/xml" }, body: stsBody }]);
  const batch = 300;
  const one = STS.getCallerIdentity({});
  const loop = Effect.gen(function* () {
    for (let i = 0; i < batch; i++) yield* one;
  });
  const variants = LEVELS.flatMap((level) =>
    (["native", "recording"] as const).map((exporter) => {
      const program = Effect.provide(
        loop,
        Layer.mergeAll(http, aws, levelLayer(level)),
      ) as Effect.Effect<void, unknown, never>;
      const run = () =>
        exporter === "recording"
          ? Effect.runPromise(Effect.provideService(program, Tracer.Tracer, recorder().tracer))
          : Effect.runPromise(program);
      return { id: level, exporter, run, samples: [] as number[] };
    }),
  );
  for (let i = 0; i < 5; i++) for (const v of variants) await v.run();
  for (let r = 0; r < 41; r++) {
    for (const v of variants) {
      const t = performance.now();
      await v.run();
      v.samples.push(((performance.now() - t) * 1000) / batch);
    }
  }
  const cost: Record<string, Record<string, number>> = {};
  for (const v of variants) (cost[v.id] ??= {})[v.exporter] = median(v.samples);
  return cost;
};

/**
 * ns to capture a call site the way the prototype does
 * (`Error.captureStackTrace(holder, entry)`, 2 frames), next to a plain
 * `new Error()` at a few depths, and µs to format one (paid on failure only).
 */
const callSiteCost = () => {
  const n = 200_000;
  const time = (f: () => unknown) => {
    for (let i = 0; i < n; i++) f();
    const t = performance.now();
    for (let i = 0; i < n; i++) f();
    return ((performance.now() - t) * 1e6) / n;
  };
  const newError = (depth: number) => () => {
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = depth;
    const e = new Error();
    Error.stackTraceLimit = limit;
    return e;
  };
  const entry = (): unknown => Telemetry.captureCallSite(entry);
  const sites = Array.from({ length: 2000 }, () => entry() as () => string | undefined);
  const t2 = performance.now();
  for (const site of sites) site();
  const formatNs = ((performance.now() - t2) * 1e6) / sites.length;
  return {
    prototypeNs: time(entry),
    newErrorNs: { 3: time(newError(3)), 10: time(newError(10)) },
    formatNs,
  };
};

//#endregion

const out: Record<string, unknown> = {
  generatedAt: new Date().toISOString(),
  node: process.version,
  scenarios: [] as unknown[],
};

for (const scenario of scenarios()) {
  const runs = [];
  for (const level of LEVELS) runs.push(await runScenario(scenario, level));
  (out.scenarios as unknown[]).push({
    id: scenario.id,
    title: scenario.title,
    what: scenario.what,
    code: scenario.code,
    runs,
  });
  console.log(`✓ ${scenario.id}`);
}

out.cost = { perCallUs: await measureCost(), callSite: callSiteCost() };
console.log(JSON.stringify(out.cost, null, 2));

// The bench dashboard's telemetry page imports this file.
const dir = new URL("../dashboard/telemetry/", import.meta.url).pathname;
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}lab.json`, JSON.stringify(out, null, 2));
// Committed formatted, like every JSON file in the repo.
execFileSync("pnpm", ["exec", "oxfmt", `${dir}lab.json`], { stdio: "ignore" });
console.log(`wrote ${relative(process.cwd(), dir)}/lab.json`);
