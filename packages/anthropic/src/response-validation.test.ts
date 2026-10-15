/**
 * Tests for the hand-written Anthropic protocol (src/protocol.ts) and
 * credentials, driven through generated operations against a fake
 * HttpClient: per-route credential selection, the `?beta=true` route
 * literal, `error.type` envelope matching, strict response validation, and
 * message event streams.
 */
import { ResponseValidation } from "@distilled.cloud/core";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as UrlParams from "effect/http/UrlParams";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import * as Anthropic from "./index.ts";

interface Recorded {
  readonly requests: Array<HttpClientRequest.HttpClientRequest>;
}

const fakeClient = (respond: (request: HttpClientRequest.HttpClientRequest) => Response) => {
  const recorded: Recorded = { requests: [] };
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request) =>
      Effect.sync(() => {
        recorded.requests.push(request);
        return HttpClientResponse.fromWeb(request, respond(request));
      }),
    ),
  );
  return { layer, recorded };
};

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

const sse = (events: ReadonlyArray<{ event: string; data: unknown }>) =>
  new Response(
    events.map((e) => `event: ${e.event}\ndata: ${JSON.stringify(e.data)}\n\n`).join(""),
    { status: 200, headers: { "content-type": "text/event-stream" } },
  );

const errorBody = (type: string, message = `${type} happened`) => ({
  type: "error",
  error: { type, message },
});

const apiKey = Anthropic.fromApiKey(Redacted.make("sk-ant-api-test"));

// No automatic retries: the retryable error classes would otherwise be
// retried against the fake client until the test times out.
const noRetry = Layer.succeed(Anthropic.Retry.Retry, { while: () => false });

const run = <A, E>(effect: Effect.Effect<A, E, any>, ...layers: Array<Layer.Any>) =>
  Effect.runPromise(
    Effect.result(
      effect.pipe(Effect.provide(Layer.mergeAll(noRetry, ...(layers as [any])))),
    ) as Effect.Effect<any, never, never>,
  );

const queryOf = (request: HttpClientRequest.HttpClientRequest) =>
  new URLSearchParams(UrlParams.toString(request.urlParams));

const bodyJson = (request: HttpClientRequest.HttpClientRequest): any => {
  const body = request.body as any;
  return body._tag === "Uint8Array" ? JSON.parse(new TextDecoder().decode(body.body)) : undefined;
};

/** A live POST /v1/messages response (2026-10-05), id redacted. */
const MESSAGE = {
  model: "claude-haiku-4-5-20251001",
  id: "msg_01",
  type: "message",
  role: "assistant",
  content: [
    {
      type: "text",
      text: "# Hi there! \ud83d\udc4b\n\nHow can I help you today?",
    },
  ],
  container: null,
  stop_reason: "max_tokens",
  stop_sequence: null,
  stop_details: null,
  usage: {
    input_tokens: 8,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    cache_creation: {
      ephemeral_5m_input_tokens: 0,
      ephemeral_1h_input_tokens: 0,
    },
    output_tokens: 16,
    service_tier: "standard",
    inference_geo: "not_available",
  },
  diagnostics: null,
};

const createParams = {
  model: "claude-haiku-4-5-20251001",
  max_tokens: 16,
  messages: [{ role: "user" as const, content: "Hi" }],
};

describe("credentials and routing", () => {
  test("inference ops send x-api-key + anthropic-version to the default host", async () => {
    const client = fakeClient(() => json(MESSAGE));
    const result = await run(Anthropic.createMessage(createParams), client.layer, apiKey);
    expect(result._tag).toBe("Success");
    const request = client.recorded.requests[0]!;
    expect(request.url).toBe("https://api.anthropic.com/v1/messages");
    expect(request.headers["x-api-key"]).toBe("sk-ant-api-test");
    expect(request.headers["anthropic-version"]).toBe("2023-06-01");
    expect(request.headers["authorization"]).toBeUndefined();
    expect(bodyJson(request)).toMatchObject({ model: createParams.model, max_tokens: 16 });
  });

  test("beta routes carry ?beta=true, merged with the operation's own query", async () => {
    const client = fakeClient(() =>
      json({ data: [], has_more: false, first_id: null, last_id: null }),
    );
    await run(Anthropic.listBetaModels({ limit: 2 }), client.layer, apiKey);
    const url = new URL(client.recorded.requests[0]!.url);
    const params = queryOf(client.recorded.requests[0]!);
    expect(url.pathname).toBe("/v1/models");
    expect(url.search).toBe("");
    expect(params.get("beta")).toBe("true");
    expect(params.get("limit")).toBe("2");
  });

  test("anthropic-beta: credential default, overridden per call", async () => {
    const client = fakeClient(() => json(MESSAGE));
    const betas = Anthropic.fromApiKey(Redacted.make("k"), { betas: ["a-1", "b-2"] });
    await run(Anthropic.createBetaMessage(createParams), client.layer, betas);
    await run(
      Anthropic.createBetaMessage({ ...createParams, anthropicBeta: "c-3" }),
      client.layer,
      betas,
    );
    expect(client.recorded.requests[0]!.headers["anthropic-beta"]).toBe("a-1,b-2");
    expect(client.recorded.requests[1]!.headers["anthropic-beta"]).toBe("c-3");
  });

  test("admin ops without an admin key fail typed before any request", async () => {
    const client = fakeClient(() => json({}));
    const result = await run(Anthropic.getCurrentOrganization({}), client.layer, apiKey);
    expect(result._tag).toBe("Failure");
    expect(result.failure).toBeInstanceOf(Anthropic.MissingAnthropicCredentials);
    expect(result.failure.required).toBe("admin");
    expect(client.recorded.requests).toHaveLength(0);
  });

  test("admin ops send the admin key; OAuth token is the fallback", async () => {
    const client = fakeClient(() => json({ id: "org", name: "Org", type: "organization" }));
    await run(
      Anthropic.getCurrentOrganization({}),
      client.layer,
      Anthropic.credentials({
        apiKey: Redacted.make("api"),
        adminKey: Redacted.make("sk-ant-admin-test"),
      }),
    );
    await run(
      Anthropic.getCurrentOrganization({}),
      client.layer,
      Anthropic.fromAuthToken(Redacted.make("oauth-token")),
    );
    expect(client.recorded.requests[0]!.headers["x-api-key"]).toBe("sk-ant-admin-test");
    expect(client.recorded.requests[1]!.headers["authorization"]).toBe("Bearer oauth-token");
    expect(client.recorded.requests[1]!.headers["x-api-key"]).toBeUndefined();
  });

  test("inference ops with no API key or token fail typed", async () => {
    const client = fakeClient(() => json({}));
    const result = await run(
      Anthropic.listModels({}),
      client.layer,
      Anthropic.fromAdminKey(Redacted.make("admin")),
    );
    expect(result.failure).toBeInstanceOf(Anthropic.MissingAnthropicCredentials);
    expect(result.failure.required).toBe("api");
  });
});

describe("error envelope", () => {
  const cases: Array<[string, number, new (...args: any[]) => unknown]> = [
    ["invalid_request_error", 400, Anthropic.InvalidRequest],
    ["authentication_error", 401, Anthropic.AuthenticationFailed],
    ["billing_error", 402, Anthropic.PaymentRequired],
    ["permission_error", 403, Anthropic.PermissionDenied],
    ["not_found_error", 404, Anthropic.ResourceNotFound],
    ["request_too_large", 413, Anthropic.RequestTooLarge],
    ["rate_limit_error", 429, Anthropic.RateLimited],
    ["api_error", 500, Anthropic.ApiServerError],
    ["timeout_error", 504, Anthropic.RequestTimeout],
    ["overloaded_error", 529, Anthropic.Overloaded],
  ];
  for (const [type, status, Cls] of cases) {
    test(`${type} (${status}) → ${Cls.name}`, async () => {
      const client = fakeClient(() => json(errorBody(type), status));
      const result = await run(Anthropic.createMessage(createParams), client.layer, apiKey);
      expect(result.failure).toBeInstanceOf(Cls);
      expect(result.failure.message).toBe(`${type} happened`);
      expect(result.failure.body).toEqual(errorBody(type));
    });
  }

  test("the error.type wins over the status", async () => {
    const client = fakeClient(() => json(errorBody("overloaded_error"), 500));
    const result = await run(Anthropic.createMessage(createParams), client.layer, apiKey);
    expect(result.failure).toBeInstanceOf(Anthropic.Overloaded);
  });

  test("retry-after is stamped on rate limits", async () => {
    const client = fakeClient(() =>
      json(errorBody("rate_limit_error"), 429, { "retry-after": "7" }),
    );
    const result = await run(Anthropic.createMessage(createParams), client.layer, apiKey);
    expect(result.failure).toBeInstanceOf(Anthropic.RateLimited);
    expect(Duration.toMillis(result.failure.retryAfter)).toBe(7000);
  });

  test("a 529 with no envelope is Overloaded; unknown 4xx is UnknownAnthropicError", async () => {
    const overloaded = fakeClient(() => new Response("upstream busy", { status: 529 }));
    const r1 = await run(Anthropic.createMessage(createParams), overloaded.layer, apiKey);
    expect(r1.failure).toBeInstanceOf(Anthropic.Overloaded);

    const teapot = fakeClient(() => json(errorBody("brewing_error"), 418));
    const r2 = await run(Anthropic.createMessage(createParams), teapot.layer, apiKey);
    expect(r2.failure).toBeInstanceOf(Anthropic.UnknownAnthropicError);
    expect(r2.failure.code).toBe("brewing_error");
  });
});

describe("response validation", () => {
  test("lenient (default) passes a partial body through", async () => {
    const client = fakeClient(() => json({ id: "msg_01" }));
    const result = await run(Anthropic.createMessage(createParams), client.layer, apiKey);
    expect(result).toMatchObject({ _tag: "Success", success: { id: "msg_01" } });
  });

  test("strict accepts a full Message", async () => {
    const client = fakeClient(() => json(MESSAGE));
    const result = await run(
      Anthropic.createMessage(createParams),
      client.layer,
      apiKey,
      ResponseValidation.strict,
    );
    expect(result._tag).toBe("Success");
  });

  test("strict fails a body missing required members with AnthropicParseError", async () => {
    const client = fakeClient(() => json({ id: "msg_01" }));
    const result = await run(
      Anthropic.createMessage(createParams),
      client.layer,
      apiKey,
      ResponseValidation.strict,
    );
    expect(result.failure).toBeInstanceOf(Anthropic.AnthropicParseError);
    expect(result.failure.body).toEqual({ id: "msg_01" });
  });

  test("binary downloads return the raw bytes", async () => {
    const client = fakeClient(() => new Response(new Uint8Array([1, 2, 3]), { status: 200 }));
    const result = await run(Anthropic.downloadFile({ file_id: "file_1" }), client.layer, apiKey);
    expect(result._tag).toBe("Success");
    expect(Array.from(result.success as Uint8Array)).toEqual([1, 2, 3]);
  });
});

describe("message streams", () => {
  const events = [
    {
      event: "message_start",
      data: { type: "message_start", message: { ...MESSAGE, content: [] } },
    },
    { event: "ping", data: { type: "ping" } },
    {
      event: "content_block_start",
      data: { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    },
    {
      event: "content_block_delta",
      data: { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Hi" } },
    },
    { event: "content_block_stop", data: { type: "content_block_stop", index: 0 } },
    { event: "message_stop", data: { type: "message_stop" } },
  ];

  test("createMessageStream forces stream: true and yields every event", async () => {
    const client = fakeClient(() => sse(events));
    const result = await run(
      Stream.runCollect(Anthropic.createMessageStream(createParams)),
      client.layer,
      apiKey,
    );
    expect(result._tag).toBe("Success");
    expect(Array.from(result.success).map((e: any) => e.type)).toEqual(events.map((e) => e.event));
    // The README's narrowing, type-checked here.
    const text = Array.from(
      result.success as Iterable<Anthropic.CreateMessageStreamResponse>,
    ).flatMap((event) =>
      event.type === "content_block_delta" && "delta" in event && "text" in event.delta
        ? [event.delta.text]
        : [],
    );
    expect(text.join("")).toBe("Hi");
    const request = client.recorded.requests[0]!;
    expect(bodyJson(request).stream).toBe(true);
    expect(request.headers["accept"]).toBe("text/event-stream");
  });

  test("createBetaMessageStream streams from the beta route", async () => {
    const client = fakeClient(() => sse(events));
    await run(
      Stream.runCollect(Anthropic.createBetaMessageStream(createParams)),
      client.layer,
      apiKey,
    );
    const request = client.recorded.requests[0]!;
    expect(request.url).toBe("https://api.anthropic.com/v1/messages");
    expect(queryOf(request).get("beta")).toBe("true");
  });

  test("an error event mid-stream fails with the typed class", async () => {
    const client = fakeClient(() =>
      sse([events[0]!, { event: "error", data: errorBody("overloaded_error", "Overloaded") }]),
    );
    const result = await run(
      Stream.runCollect(Anthropic.createMessageStream(createParams)),
      client.layer,
      apiKey,
    );
    expect(result.failure).toBeInstanceOf(Anthropic.Overloaded);
    expect(result.failure.message).toBe("Overloaded");
  });
});

describe("pagination", () => {
  test("relay lists follow last_id while has_more", async () => {
    const pages = [
      { data: [{ id: "a" }], has_more: true, first_id: "a", last_id: "a" },
      { data: [{ id: "b" }], has_more: false, first_id: "b", last_id: "b" },
    ];
    let i = 0;
    const client = fakeClient(() => json(pages[i++]));
    const result = await run(
      Stream.runCollect(Anthropic.listModels.items({ limit: 1 })),
      client.layer,
      apiKey,
    );
    expect(Array.from(result.success).map((m: any) => m.id)).toEqual(["a", "b"]);
    const second = queryOf(client.recorded.requests[1]!);
    expect(second.get("after_id")).toBe("a");
  });

  test("cursor lists follow next_page until null", async () => {
    const pages = [
      { data: [{ id: "s1" }], next_page: "p2" },
      { data: [{ id: "s2" }], next_page: null },
    ];
    let i = 0;
    const client = fakeClient(() => json(pages[i++]));
    const result = await run(
      Stream.runCollect(Anthropic.listSessions.items({})),
      client.layer,
      apiKey,
    );
    expect(Array.from(result.success).map((s: any) => s.id)).toEqual(["s1", "s2"]);
  });
});
