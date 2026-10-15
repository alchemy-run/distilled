/**
 * Tests for OpenRouter's hand-written glue: the protocol's per-route key
 * selection, attribution headers, error envelope + status map, strict
 * response validation, event streams ending at `data: [DONE]`, and binary
 * downloads. Every call goes through the generated operations against a
 * fake HttpClient — no network.
 */
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { type Credentials, credentials } from "./credentials.ts";
import {
  InsufficientCredits as SharedInsufficientCredits,
  NoAvailableProvider as SharedNoAvailableProvider,
  OpenRouterParseError,
  RateLimited as SharedRateLimited,
  UnknownOpenRouterError,
} from "./errors.ts";
import type { OpenRouterOpContext } from "./protocol.ts";
import * as Retry from "./retry.ts";
import {
  countModels,
  createAudioSpeech,
  createChatCompletion,
  createChatCompletionStream,
  Forbidden,
  getCurrentKey,
  InsufficientCredits,
  listKeys,
  ModerationFlagged,
  NoAvailableProvider,
} from "./services/openrouter.ts";

interface Reply {
  readonly status?: number;
  readonly body?: string | Uint8Array<ArrayBuffer> | ReadableStream<Uint8Array>;
  readonly headers?: Record<string, string>;
}

const both = credentials({
  apiKey: Redacted.make("sk-or-v1-inference"),
  managementKey: Redacted.make("sk-or-v1-management"),
  referer: "https://example.com",
  title: "Example App",
});

/** A fake HttpClient that records each request and answers with `reply`. */
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
            headers: reply.headers ?? { "content-type": "application/json" },
          }),
        );
      }),
    ),
  );
  return { requests, layer };
};

const run = <A, E>(
  operation: Effect.Effect<A, E, OpenRouterOpContext>,
  reply: Reply,
  creds: Layer.Layer<Credentials> = both,
) => {
  const http = fakeHttp(reply);
  const promise = Effect.runPromise(
    operation.pipe(Retry.none, Effect.provide(Layer.mergeAll(http.layer, creds))),
  );
  return { requests: http.requests, promise };
};

const failWith = <A, E>(operation: Effect.Effect<A, E, OpenRouterOpContext>, reply: Reply) =>
  run(Effect.flip(operation), reply).promise;

const envelope = (code: number, message: string, metadata?: Record<string, unknown>) =>
  JSON.stringify({ error: { code, message, ...(metadata ? { metadata } : {}) } });

const sse = (chunks: ReadonlyArray<string>) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });

const chatInput = {
  model: "openai/gpt-4o-mini",
  messages: [{ role: "user" as const, content: "hi" }],
};

describe("authentication", () => {
  test("inference routes use the API key, with attribution headers", async () => {
    const { requests, promise } = run(countModels({}), { body: '{"data":{"count":3}}' });
    await promise;
    expect(requests[0]!.url).toBe("https://openrouter.ai/api/v1/models/count");
    expect(requests[0]!.headers.get("authorization")).toBe("Bearer sk-or-v1-inference");
    expect(requests[0]!.headers.get("http-referer")).toBe("https://example.com");
    expect(requests[0]!.headers.get("x-title")).toBe("Example App");
  });

  test("management routes use the management key", async () => {
    const { requests, promise } = run(listKeys({ offset: 10 }), { body: '{"data":[]}' });
    await promise;
    expect(requests[0]!.url).toBe("https://openrouter.ai/api/v1/keys?offset=10");
    expect(requests[0]!.headers.get("authorization")).toBe("Bearer sk-or-v1-management");
  });

  test("/key (inspect the calling key) is not a management route", async () => {
    const { requests, promise } = run(getCurrentKey({}), { body: '{"data":{}}' });
    await promise;
    expect(requests[0]!.headers.get("authorization")).toBe("Bearer sk-or-v1-inference");
  });

  test("falls back to the configured key when the preferred kind is missing", async () => {
    const onlyApi = credentials({ apiKey: Redacted.make("sk-or-v1-only") });
    const { requests, promise } = run(listKeys({}), { body: '{"data":[]}' }, onlyApi);
    await promise;
    expect(requests[0]!.headers.get("authorization")).toBe("Bearer sk-or-v1-only");
  });

  test("sends no Authorization header without keys (public routes)", async () => {
    const none = credentials({ apiBaseUrl: "https://proxy.test/v1" });
    const { requests, promise } = run(countModels({}), { body: '{"data":{"count":1}}' }, none);
    expect(await promise).toEqual({ data: { count: 1 } });
    expect(requests[0]!.url).toBe("https://proxy.test/v1/models/count");
    expect(requests[0]!.headers.get("authorization")).toBeNull();
  });
});

describe("errors", () => {
  test("a declared status maps to the operation's typed class", async () => {
    const error = await failWith(createChatCompletion(chatInput), {
      status: 402,
      body: envelope(402, "Insufficient credits"),
    });
    expect(error).toBeInstanceOf(InsufficientCredits);
    expect(error).toMatchObject({ _tag: "InsufficientCredits", message: "Insufficient credits" });
  });

  test("moderation 403 is ModerationFlagged, other 403s are Forbidden", async () => {
    const flagged = await failWith(createChatCompletion(chatInput), {
      status: 403,
      body: envelope(403, "openai/gpt-4o requires moderation. Your input was flagged", {
        reasons: ["harassment"],
        flagged_input: "...",
        provider_name: "OpenAI",
        model_slug: "openai/gpt-4o",
      }),
    });
    expect(flagged).toBeInstanceOf(ModerationFlagged);

    const blocked = await failWith(createChatCompletion(chatInput), {
      status: 403,
      body: envelope(403, "Request blocked: prompt injection patterns detected"),
    });
    expect(blocked).toBeInstanceOf(Forbidden);
  });

  test("503 is NoAvailableProvider", async () => {
    const error = await failWith(createChatCompletion(chatInput), {
      status: 503,
      body: envelope(503, "No available model provider that meets your routing requirements"),
    });
    expect(error).toBeInstanceOf(NoAvailableProvider);
  });

  test("an undeclared status still surfaces the same tag via the status map", async () => {
    // countModels declares only 400/403.
    const credits = await failWith(countModels({}), {
      status: 402,
      body: envelope(402, "Insufficient credits"),
    });
    expect(credits).toBeInstanceOf(SharedInsufficientCredits);
    expect(credits._tag).toBe("InsufficientCredits");

    const limited = await failWith(countModels({}), {
      status: 429,
      body: envelope(429, "Rate limit exceeded"),
      headers: { "content-type": "application/json", "retry-after": "2" },
    });
    expect(limited).toBeInstanceOf(SharedRateLimited);
    expect(limited).toMatchObject({ _tag: "RateLimited", message: "Rate limit exceeded" });

    const unavailable = await failWith(countModels({}), {
      status: 503,
      body: envelope(503, "Service temporarily unavailable"),
    });
    expect(unavailable).toBeInstanceOf(SharedNoAvailableProvider);
  });

  test("anything else is UnknownOpenRouterError with the numeric code", async () => {
    const error = await failWith(countModels({}), {
      status: 418,
      body: envelope(418, "I'm a teapot"),
    });
    expect(error).toBeInstanceOf(UnknownOpenRouterError);
    expect(error).toMatchObject({ code: 418, message: "I'm a teapot" });
  });

  test("the moderation patch types the stream sibling too", () => {
    const { errors } = createChatCompletionStream as unknown as {
      readonly errors: ReadonlyArray<unknown>;
    };
    expect(errors).toContain(ModerationFlagged);
  });
});

describe("response validation", () => {
  test("strict mode raises OpenRouterParseError on a body that doesn't match", async () => {
    const error = await failWith(countModels({}).pipe(Effect.provide(ResponseValidation.strict)), {
      body: '{"data":{"count":"three"}}',
    });
    expect(error).toBeInstanceOf(OpenRouterParseError);
  });

  test("strict mode accepts a matching body; lenient returns a mismatch as read", async () => {
    const ok = await run(countModels({}).pipe(Effect.provide(ResponseValidation.strict)), {
      body: '{"data":{"count":3}}',
    }).promise;
    expect(ok).toEqual({ data: { count: 3 } });

    const lenient = await run(countModels({}), { body: '{"data":{"count":"three"}}' }).promise;
    expect(lenient).toEqual({ data: { count: "three" } });
  });
});

describe("event streams", () => {
  test("chat completion stream forces stream: true, skips comments, ends at [DONE]", async () => {
    const chunk = (content: string) =>
      JSON.stringify({
        id: "gen-1",
        object: "chat.completion.chunk",
        created: 1,
        model: "openai/gpt-4o-mini",
        choices: [{ index: 0, delta: { content }, finish_reason: null }],
      });
    const { requests, promise } = run(Stream.runCollect(createChatCompletionStream(chatInput)), {
      headers: { "content-type": "text/event-stream" },
      body: sse([
        ": OPENROUTER PROCESSING\n\n",
        `data: ${chunk("Hel")}\n\n`,
        `data: ${chunk("lo")}\n\ndata: [DONE]\n\n`,
        `data: ${chunk("never")}\n\n`,
      ]),
    });
    const events = Array.from(await promise);
    expect(events.map((e) => e.choices[0]!.delta.content)).toEqual(["Hel", "lo"]);
    expect(requests[0]!.headers.get("accept")).toBe("text/event-stream");
    expect(requests[0]!.headers.get("authorization")).toBe("Bearer sk-or-v1-inference");
    expect(await requests[0]!.json()).toMatchObject({ stream: true, model: "openai/gpt-4o-mini" });
  });

  test("a non-2xx stream response fails with the typed error", async () => {
    const error = await failWith(Stream.runCollect(createChatCompletionStream(chatInput)), {
      status: 402,
      body: envelope(402, "Insufficient credits"),
    });
    expect(error).toBeInstanceOf(InsufficientCredits);
  });
});

describe("binary responses", () => {
  test("audio speech returns the raw bytes", async () => {
    const bytes = new Uint8Array([0xff, 0xfb, 0x90, 0x00]);
    const audio = await run(
      createAudioSpeech({ model: "openai/gpt-4o-mini-tts", input: "hi", voice: "alloy" }),
      { body: bytes, headers: { "content-type": "audio/mpeg" } },
    ).promise;
    expect(audio).toBeInstanceOf(Uint8Array);
    expect(Array.from(audio)).toEqual([0xff, 0xfb, 0x90, 0x00]);
  });
});
