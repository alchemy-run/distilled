import * as Category from "@distilled.cloud/core/category";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { type Credentials, fromApiKey, fromApiToken, fromOAuth } from "./credentials.ts";
import {
  BadGateway,
  BadRequest,
  CloudflareParseError,
  Conflict,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  InvalidRoute,
  NotFound,
  TooManyRequests,
  Unauthorized,
  UnknownCloudflareError,
} from "./errors.ts";
import type { CloudflareOpContext } from "./protocol.ts";
import * as Retry from "./retry.ts";
import {
  consume,
  getStream,
  K2AppendOutcomeUnknown,
  K2StreamNotFound,
  K2Unavailable,
  produce,
} from "./services/k2.ts";
import {
  createNamespace,
  getNamespace,
  getNamespaceMetadata,
  getNamespaceValue,
  KeyNotFound,
  listNamespaces,
  NamespaceNotFound,
} from "./services/kv.ts";
import { sendStreamRecords } from "./services/pipelines.ts";
import {
  createAssetUpload,
  createObservabilityDestination,
  ObservabilityDestinationCreateFailed,
} from "./services/workers.ts";
import { getZone, InvalidZoneIdentifier } from "./services/zones.ts";

interface Reply {
  readonly status?: number;
  readonly body?: string;
  readonly headers?: Record<string, string>;
}

const token = fromApiToken({ apiToken: Redacted.make("cf-token") });

/** A fake HttpClient that records each request (as a web Request) and answers with `reply`. */
const fakeHttp = (reply: Reply) => {
  const requests: Array<Request> = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        requests.push(Result.getOrThrow(HttpClientRequest.toWebResult(request)));
        return HttpClientResponse.fromWeb(
          request,
          new Response(reply.body ?? "", {
            status: reply.status ?? 200,
            headers: reply.headers,
          }),
        );
      }),
    ),
  );
  return { requests, layer };
};

const run = <A, E>(
  operation: Effect.Effect<A, E, CloudflareOpContext>,
  reply: Reply,
  credentials: Layer.Layer<Credentials> = token,
) => {
  const http = fakeHttp(reply);
  const promise = Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(Layer.mergeAll(http.layer, credentials))),
  );
  return { requests: http.requests, promise };
};

const succeed = <A, E>(operation: Effect.Effect<A, E, CloudflareOpContext>, reply: Reply) =>
  run(operation, reply).promise;

const failWith = <A, E>(operation: Effect.Effect<A, E, CloudflareOpContext>, reply: Reply) =>
  run(Effect.flip(operation), reply).promise;

const envelope = (result: unknown, extra: Record<string, unknown> = {}) =>
  JSON.stringify({ success: true, errors: [], messages: [], result, ...extra });

const errorEnvelope = (errors: ReadonlyArray<{ code?: number; message: string }>) =>
  JSON.stringify({ success: false, errors, messages: [], result: null });

const ns = { accountId: "acc", namespaceId: "ns" };
const namespace = { id: "ns", title: "kv", supports_url_encoding: true };

describe("request encoding", () => {
  test("an API token sends a Bearer Authorization header to the default base URL", async () => {
    const { requests, promise } = run(getNamespace(ns), { body: envelope(namespace) });
    await promise;
    expect(requests).toHaveLength(1);
    const [request] = requests;
    expect(request!.method).toBe("GET");
    expect(request!.url).toBe(
      "https://api.cloudflare.com/client/v4/accounts/acc/storage/kv/namespaces/ns",
    );
    expect(request!.headers.get("authorization")).toBe("Bearer cf-token");
    expect(request!.headers.get("x-auth-key")).toBeNull();
  });

  test("a global API key sends X-Auth-Key and X-Auth-Email instead", async () => {
    const { requests, promise } = run(
      getNamespace(ns),
      { body: envelope(namespace) },
      fromApiKey({ apiKey: Redacted.make("global-key"), email: "ops@example.test" }),
    );
    await promise;
    const headers = requests[0]!.headers;
    expect(headers.get("x-auth-key")).toBe("global-key");
    expect(headers.get("x-auth-email")).toBe("ops@example.test");
    expect(headers.get("authorization")).toBeNull();
  });

  test("OAuth credentials send the access token as Bearer", async () => {
    const { requests, promise } = run(
      getNamespace(ns),
      { body: envelope(namespace) },
      fromOAuth({
        load: Effect.succeed({ accessToken: Redacted.make("oauth-access") }),
        refresh: () => Effect.die("not expected"),
      }),
    );
    await promise;
    expect(requests[0]!.headers.get("authorization")).toBe("Bearer oauth-access");
  });

  test("a custom apiBaseUrl replaces the default host", async () => {
    const { requests, promise } = run(
      getNamespace(ns),
      { body: envelope(namespace) },
      fromApiToken({ apiToken: Redacted.make("t"), apiBaseUrl: "https://cf.test/v4" }),
    );
    await promise;
    expect(requests[0]!.url).toBe("https://cf.test/v4/accounts/acc/storage/kv/namespaces/ns");
  });

  test("a JSON body carries declared members; unknown keys go snake_case unless the dictionary knows them", async () => {
    const input = {
      accountId: "acc",
      title: "kv",
      someNewField: 1,
      expirationTtl: 60,
    };
    const { requests, promise } = run(createNamespace(input), {
      body: envelope({ id: "ns", title: "kv" }),
    });
    await promise;
    const request = requests[0]!;
    expect(request.method).toBe("POST");
    expect(request.url).toBe(
      "https://api.cloudflare.com/client/v4/accounts/acc/storage/kv/namespaces",
    );
    expect(await request.json()).toEqual({
      title: "kv",
      some_new_field: 1,
      expiration_ttl: 60,
    });
  });

  test("query members use their wire names", async () => {
    const { requests, promise } = run(listNamespaces({ accountId: "acc", page: 2, perPage: 5 }), {
      body: envelope([]),
    });
    await promise;
    const url = new URL(requests[0]!.url);
    expect(url.searchParams.get("page")).toBe("2");
    expect(url.searchParams.get("per_page")).toBe("5");
  });

  test("a member-supplied Authorization header is Bearer-prefixed and overrides the credential header", async () => {
    const raw = run(
      createAssetUpload({ accountId: "acc", base64: true, jwtToken: "session-jwt" }),
      {
        body: envelope({ jwt: "done" }),
      },
    );
    await raw.promise;
    expect(raw.requests[0]!.headers.get("authorization")).toBe("Bearer session-jwt");

    const prefixed = run(
      createAssetUpload({ accountId: "acc", base64: true, jwtToken: "Bearer already" }),
      { body: envelope({ jwt: "done" }) },
    );
    await prefixed.promise;
    expect(prefixed.requests[0]!.headers.get("authorization")).toBe("Bearer already");
  });
});

describe("envelope unwrapping", () => {
  test("struct outputs are read from `result`, wire names mapped to camelCase", async () => {
    const result = await succeed(getNamespace(ns), { body: envelope(namespace) });
    expect(result).toEqual({ id: "ns", title: "kv", supportsUrlEncoding: true });
  });

  test("a body without `result` is treated as the payload itself", async () => {
    const result = await succeed(getNamespace(ns), { body: JSON.stringify(namespace) });
    expect(result).toEqual({ id: "ns", title: "kv", supportsUrlEncoding: true });
  });

  test("EnvelopePayloadRoot outputs return `result` directly", async () => {
    const result = await succeed(getNamespaceMetadata({ ...ns, keyName: "k" }), {
      body: envelope({ owner: "me", tags: ["a"] }),
    });
    expect(result).toEqual({ owner: "me", tags: ["a"] });
  });

  test("the paginated protocol maps `result` and camelCases `result_info`", async () => {
    const result = await succeed(listNamespaces({ accountId: "acc" }), {
      body: envelope([namespace], {
        result_info: { page: 1, per_page: 20, count: 1, total_count: 1 },
      }),
    });
    expect(result).toEqual({
      result: [{ id: "ns", title: "kv", supportsUrlEncoding: true }],
      resultInfo: { page: 1, perPage: 20, count: 1, totalCount: 1 },
    });
  });

  test("the paginated protocol omits resultInfo when the envelope has none", async () => {
    const result = await succeed(listNamespaces({ accountId: "acc" }), {
      body: envelope([]),
    });
    expect(result).toEqual({ result: [] });
  });

  test("binary outputs stream the raw body and project typed headers", async () => {
    const result = await succeed(getNamespaceValue({ ...ns, keyName: "k" }), {
      body: "raw-bytes",
      headers: { "content-type": "application/octet-stream", expiration: "1700000000" },
    });
    expect(result.expiration).toBe(1700000000);
    expect(result.contentType).toBe("application/octet-stream");
    const text = await Effect.runPromise(result.body.pipe(Stream.decodeText, Stream.mkString));
    expect(text).toBe("raw-bytes");
  });

  test("binary outputs still decode error statuses through the envelope", async () => {
    const error = await failWith(getNamespaceValue({ ...ns, keyName: "k" }), {
      status: 404,
      body: errorEnvelope([{ code: 10009, message: "get: 'key not found'" }]),
    });
    expect(error).toBeInstanceOf(KeyNotFound);
    expect(error).toMatchObject({ code: 10009, message: "get: 'key not found'" });
  });
});

describe("error envelopes", () => {
  test("success:false inside HTTP 200 is a failure, matched to the operation's typed error", async () => {
    const error = await failWith(getNamespace(ns), {
      status: 200,
      body: errorEnvelope([{ code: 10013, message: "namespace not found" }]),
    });
    expect(error).toBeInstanceOf(NamespaceNotFound);
    expect(error).toMatchObject({ code: 10013, message: "namespace not found" });
  });

  test("the same typed error matches under a non-2xx status", async () => {
    const error = await failWith(getNamespace(ns), {
      status: 404,
      body: errorEnvelope([{ code: 10013, message: "namespace not found" }]),
    });
    expect(error).toBeInstanceOf(NamespaceNotFound);
  });

  test("per-operation matchers win over the global code map", async () => {
    const typed = await failWith(getZone({ zoneId: "z" }), {
      status: 400,
      body: errorEnvelope([{ code: 9109, message: "Invalid zone identifier" }]),
    });
    expect(typed).toBeInstanceOf(InvalidZoneIdentifier);

    // Same code, a message the operation's matcher does not accept.
    const global = await failWith(getZone({ zoneId: "z" }), {
      status: 400,
      body: errorEnvelope([{ code: 9109, message: "Invalid access token" }]),
    });
    expect(global).toBeInstanceOf(Unauthorized);
  });

  test("an unknown code inside HTTP 200 falls back to UnknownCloudflareError", async () => {
    const error = await failWith(getNamespace(ns), {
      body: errorEnvelope([{ code: 424242, message: "something new" }]),
    });
    expect(error).toBeInstanceOf(UnknownCloudflareError);
    expect(error).toMatchObject({ code: 424242, message: "something new" });
  });

  test("a missing error code is reported as code 0", async () => {
    const error = await failWith(getNamespace(ns), {
      body: errorEnvelope([{ message: "webhook failed" }]),
    });
    expect(error).toBeInstanceOf(UnknownCloudflareError);
    expect(error).toMatchObject({ code: 0, message: "webhook failed" });
  });

  test("an empty errors array reports the HTTP status as the message", async () => {
    const error = await failWith(getNamespace(ns), { body: errorEnvelope([]) });
    expect(error).toBeInstanceOf(UnknownCloudflareError);
    expect(error).toMatchObject({ message: "HTTP 200" });
    expect((error as UnknownCloudflareError).code).toBeUndefined();
  });

  test("a top-level message is kept when errors carry none", async () => {
    const error = await failWith(getNamespace(ns), {
      status: 400,
      body: JSON.stringify({ success: false, message: "name is invalid", errors: [] }),
    });
    expect(error).toBeInstanceOf(BadRequest);
    expect(error).toMatchObject({ message: "name is invalid" });
  });

  test("errors entries without a message are kept as JSON", async () => {
    const error = await failWith(getNamespace(ns), {
      status: 400,
      body: JSON.stringify({ success: false, errors: [{ code: 1001, path: ["name"] }] }),
    });
    expect(error).toBeInstanceOf(BadRequest);
    expect(error).toMatchObject({ message: '[{"code":1001,"path":["name"]}]' });
  });

  test("a JSON body of an unfamiliar shape is kept, truncated", async () => {
    const body = JSON.stringify({ detail: "x".repeat(2000) });
    const error = await failWith(getNamespace(ns), { status: 400, body });
    expect(error).toBeInstanceOf(BadRequest);
    expect(error).toMatchObject({ message: body.slice(0, 1000) });
  });

  test("a top-level message lets an operation matcher on message match", async () => {
    const error = await failWith(
      createObservabilityDestination({
        accountId: "acc",
        name: "a_b",
        enabled: true,
        configuration: {
          type: "logpush",
          logpushDataset: "opentelemetry-logs",
          url: "https://example.com",
          headers: {},
        },
      }),
      { status: 400, body: JSON.stringify({ success: false, message: "Bad Request" }) },
    );
    expect(error).toBeInstanceOf(ObservabilityDestinationCreateFailed);
  });

  test("only the first envelope error is used", async () => {
    const error = await failWith(getNamespace(ns), {
      body: errorEnvelope([
        { code: 424242, message: "first" },
        { code: 10013, message: "second" },
      ]),
    });
    expect(error).toBeInstanceOf(UnknownCloudflareError);
    expect(error).toMatchObject({ code: 424242, message: "first" });
  });
});

describe("global error codes", () => {
  const globalCase = (
    code: number,
    message: string,
    status = 400,
    headers?: Record<string, string>,
  ) => failWith(getNamespace(ns), { status, headers, body: errorEnvelope([{ code, message }]) });

  test("971 inside HTTP 200 is TooManyRequests with the server's retry hint", async () => {
    const error = await globalCase(
      971,
      "Please wait and consider throttling your request speed",
      200,
      {
        "retry-after": "7",
      },
    );
    expect(error).toBeInstanceOf(TooManyRequests);
    expect(Duration.toSeconds((error as TooManyRequests).retryAfter!)).toBe(7);
  });

  for (const code of [6003, 9103, 9106, 9109]) {
    test(`${code} is Unauthorized`, async () => {
      const error = await globalCase(code, "Invalid request headers");
      expect(error).toBeInstanceOf(Unauthorized);
      expect(Category.isRetryable(error)).toBe(false);
    });
  }

  test("10000 'Authentication error' is Unauthorized tagged retryable; other messages are not", async () => {
    const blip = await globalCase(10000, "Authentication error", 403);
    expect(blip).toBeInstanceOf(Unauthorized);
    expect(Category.isRetryable(blip)).toBe(true);

    const real = await globalCase(10000, "Invalid API Token", 403);
    expect(real).toBeInstanceOf(Unauthorized);
    expect(Category.isRetryable(real)).toBe(false);
  });

  test("10001 is Forbidden, retryable only for its transient messages", async () => {
    for (const message of ["internal error", "Unable to authenticate request"]) {
      const error = await globalCase(10001, message, 403);
      expect(error).toBeInstanceOf(Forbidden);
      expect(Category.isRetryable(error)).toBe(true);
    }
    const denied = await globalCase(10001, "Method not allowed for token", 403);
    expect(denied).toBeInstanceOf(Forbidden);
    expect(Category.isRetryable(denied)).toBe(false);
  });

  test("7003 is InvalidRoute on operations that do not declare their own class for it", async () => {
    // KV declares InvalidObjectIdentifier for 7003, so use zones.getZone.
    const error = await failWith(getZone({ zoneId: "z" }), {
      status: 400,
      body: errorEnvelope([{ code: 7003, message: "Could not route to /zones/z" }]),
    });
    expect(error).toBeInstanceOf(InvalidRoute);
    expect(error).toMatchObject({ code: 7003, message: "Could not route to /zones/z" });
  });

  test("1000 is split by message: timeout, internal error, otherwise unknown", async () => {
    expect(await globalCase(1000, "Request timeout")).toBeInstanceOf(GatewayTimeout);
    expect(await globalCase(1000, "Internal server error")).toBeInstanceOf(InternalServerError);
    const other = await globalCase(1000, "Invalid user");
    expect(other).toBeInstanceOf(UnknownCloudflareError);
    expect(other).toMatchObject({ code: 1000, message: "Invalid user" });
  });

  test("transient auth messages tag per-operation typed errors retryable too", async () => {
    const error = await failWith(getNamespace(ns), {
      status: 403,
      body: errorEnvelope([{ code: 10013, message: "Authentication error" }]),
    });
    expect(error).toBeInstanceOf(NamespaceNotFound);
    expect(Category.isRetryable(error)).toBe(true);
  });
});

describe("status and throttling fallbacks", () => {
  test("a rate-limit message with an unknown code is TooManyRequests even under HTTP 200", async () => {
    const error = await failWith(getNamespace(ns), {
      body: errorEnvelope([{ code: 424242, message: "You have been rate limited" }]),
    });
    expect(error).toBeInstanceOf(TooManyRequests);
  });

  test("429 with a non-JSON body is TooManyRequests with the raw text as message", async () => {
    const error = await failWith(getNamespace(ns), {
      status: 429,
      body: "slow down",
      headers: { "retry-after": "3" },
    });
    expect(error).toBeInstanceOf(TooManyRequests);
    expect(error).toMatchObject({ message: "slow down" });
    expect(Duration.toSeconds((error as TooManyRequests).retryAfter!)).toBe(3);
  });

  test("a mapped 4xx with an unknown code uses the status class", async () => {
    const conflict = await failWith(getNamespace(ns), {
      status: 409,
      body: errorEnvelope([{ code: 424242, message: "conflict" }]),
    });
    expect(conflict).toBeInstanceOf(Conflict);
    expect(conflict).toMatchObject({ message: "conflict" });
    const missing = await failWith(getNamespace(ns), { status: 404, body: "" });
    expect(missing).toBeInstanceOf(NotFound);
    expect(missing).toMatchObject({ message: "HTTP 404" });
  });

  test("an unmapped 4xx falls back to UnknownCloudflareError", async () => {
    const error = await failWith(getNamespace(ns), {
      status: 418,
      body: errorEnvelope([{ code: 424242, message: "teapot" }]),
    });
    expect(error).toBeInstanceOf(UnknownCloudflareError);
    expect(error).toMatchObject({ code: 424242, message: "teapot" });
  });

  test("an HTML 502 page is BadGateway carrying the body text", async () => {
    const error = await failWith(getNamespace(ns), {
      status: 502,
      body: "<html>bad gateway</html>",
    });
    expect(error).toBeInstanceOf(BadGateway);
    expect(error).toMatchObject({ message: "<html>bad gateway</html>" });
  });

  test("Cloudflare-specific 5xx statuses are InternalServerError", async () => {
    const error = await failWith(getNamespace(ns), { status: 522, body: "Connection timed out" });
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error).toMatchObject({ message: "Connection timed out" });
  });
});

describe("response validation", () => {
  const strict = <A, E>(operation: Effect.Effect<A, E, CloudflareOpContext>) =>
    operation.pipe(Effect.provide(ResponseValidation.strict));

  test("lenient mode returns a mismatched payload as read", async () => {
    const result = await succeed(getNamespace(ns), { body: envelope({ id: 42, title: "kv" }) });
    expect(result as unknown).toEqual({ id: 42, title: "kv" });
  });

  test("strict mode fails a mismatched payload with CloudflareParseError", async () => {
    const error = await failWith(strict(getNamespace(ns)), {
      body: envelope({ id: 42, title: "kv" }),
    });
    expect(error).toBeInstanceOf(CloudflareParseError);
  });

  test("strict mode passes a matching payload", async () => {
    const result = await succeed(strict(getNamespace(ns)), { body: envelope(namespace) });
    expect(result).toEqual({ id: "ns", title: "kv", supportsUrlEncoding: true });
  });

  test("a non-JSON 2xx body: lenient returns the text, strict fails", async () => {
    expect((await succeed(getNamespace(ns), { body: "not json" })) as unknown).toBe("not json");
    expect(
      (await succeed(getNamespaceMetadata({ ...ns, keyName: "k" }), { body: "plain" })) as unknown,
    ).toBe("plain");
    const error = await failWith(strict(getNamespace(ns)), { body: "not json" });
    expect(error).toBeInstanceOf(CloudflareParseError);
  });
});

describe("per-operation host (K2 data plane)", () => {
  const stream = "0123456789abcdef0123456789abcdef";

  test("a host-marked operation goes to its own origin, filled from the label", async () => {
    const { requests, promise } = run(
      consume({ streamId: stream, subscriptionId: "sub", workerId: "w1", maxRecords: 10 }),
      { body: envelope({ batch_id: null, leased_until_ms: null, records: [] }) },
    );
    expect(await promise).toEqual({ batchId: null, leasedUntilMs: null, records: [] });
    expect(requests[0]!.url).toBe(
      `https://${stream}.k2.cloudflarestorage.com/subscriptions/sub/consume`,
    );
    // The host label is consumed — the body carries only the body members.
    expect(JSON.parse(await requests[0]!.text())).toEqual({ worker_id: "w1", max_records: 10 });
    expect(requests[0]!.headers.get("authorization")).toBe("Bearer cf-token");
  });

  test("a custom apiBaseUrl does not move a host-marked operation", async () => {
    const { requests, promise } = run(
      produce({ streamId: stream, records: [{ content: "aGk=" }] }),
      { body: JSON.stringify({ success: true }) },
      fromApiToken({ apiToken: Redacted.make("t"), apiBaseUrl: "https://cf.test/v4" }),
    );
    await promise;
    expect(requests[0]!.url).toBe(`https://${stream}.k2.cloudflarestorage.com/produce`);
  });

  test("operations without a host keep the API base URL", async () => {
    const { requests, promise } = run(getStream({ accountId: "acc", streamId: stream }), {
      body: envelope({ id: stream }),
    });
    await promise;
    expect(requests[0]!.url).toBe(
      `https://api.cloudflare.com/client/v4/accounts/acc/k2/streams/${stream}`,
    );
  });
});

describe("single `error` envelopes (K2 produce)", () => {
  const stream = "0123456789abcdef0123456789abcdef";
  const produceError = (status: number, code: number, retryable: boolean) => ({
    status,
    body: JSON.stringify({ success: false, error: { code, message: `code ${code}`, retryable } }),
  });

  test("the code inside `error` selects the typed class", async () => {
    const error = await failWith(
      produce({ streamId: stream, records: [{ content: "aGk=" }] }),
      produceError(404, 10200, false),
    );
    expect(error).toBeInstanceOf(K2StreamNotFound);
    expect((error as K2StreamNotFound).message).toBe("code 10200");
  });

  test("an append with an unknown outcome (503 / 10212) is never retried", async () => {
    let calls = 0;
    const http = Layer.succeed(
      HttpClient.HttpClient,
      HttpClient.make((request) =>
        Effect.sync(() => {
          calls++;
          return HttpClientResponse.fromWeb(
            request,
            new Response(produceError(503, 10212, false).body, { status: 503 }),
          );
        }),
      ),
    );
    const error = await Effect.runPromise(
      Effect.flip(produce({ streamId: stream, records: [{ content: "aGk=" }] })).pipe(
        Effect.provide(Layer.mergeAll(http, token)),
      ),
    );
    expect(error).toBeInstanceOf(K2AppendOutcomeUnknown);
    expect(calls).toBe(1);
  });

  test("a batch K2 did not store (503 / 10211) is retryable", async () => {
    const error = await failWith(
      produce({ streamId: stream, records: [{ content: "aGk=" }] }),
      produceError(503, 10211, true),
    );
    expect(error).toBeInstanceOf(K2Unavailable);
    expect(Category.isTransientError(error)).toBe(true);
  });
});

describe("verbatim payloads (Pipelines ingest)", () => {
  test("event keys are sent exactly as given, never renamed by the key dictionary", async () => {
    const records = [{ createdAt: 1, accountId: "a", nested: { tableName: "t" } }];
    const { requests, promise } = run(
      sendStreamRecords({ streamId: "0123456789abcdef0123456789abcdef", records }),
      { body: JSON.stringify({ success: true, result: { committed: 1 } }) },
    );
    expect(await promise).toEqual({ committed: 1 });
    expect(requests[0]!.url).toBe(
      "https://0123456789abcdef0123456789abcdef.ingest.cloudflare.com/",
    );
    expect(JSON.parse(await requests[0]!.text())).toEqual(records);
  });
});
