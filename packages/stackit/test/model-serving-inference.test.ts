import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import {
  ModelServingInferenceCredentials,
  modelServingInferenceApiUrl,
  modelServingInferenceCredentialsOf,
} from "../src/credentials.ts";
import * as inference from "../src/services/model_serving_inference.ts";

const TOKEN = "s3cret-token";

interface Captured {
  readonly url: string;
  readonly authorization: string | undefined;
  readonly body: any;
}

/** Answers every request with `answer`, and records it. */
const fakeApi = (answer: { readonly status: number; readonly body: BodyInit }) => {
  const calls: Captured[] = [];
  const http = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        const requestBody = request.body;
        calls.push({
          url: url.toString(),
          authorization: request.headers.authorization,
          body:
            requestBody._tag === "Uint8Array"
              ? JSON.parse(new TextDecoder().decode(requestBody.body))
              : undefined,
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(answer.body, { status: answer.status }),
        );
      }),
    ),
  );
  const credentials = Layer.succeed(
    ModelServingInferenceCredentials,
    modelServingInferenceCredentialsOf({ region: "eu01", token: Redacted.make(TOKEN) }),
  );
  return { calls, layer: Layer.mergeAll(http, credentials) };
};

const request = { model: "openai/gpt-oss-20b", messages: [{ role: "user", content: "hi" }] };

const sse = (...events: ReadonlyArray<string>) =>
  events.map((event) => `data: ${event}\n\n`).join("");

const chunk = (delta: object, finish_reason: string | null = null) =>
  JSON.stringify({ id: "1", choices: [{ index: 0, delta, finish_reason }] });

const collect = <E, R>(
  effect: Effect.Effect<inference.ChatCompletionEvents, E, R>,
  layer: Layer.Layer<R>,
) =>
  effect.pipe(
    Effect.flatMap(({ events }) => Stream.runCollect(events)),
    Effect.provide(layer),
    Effect.runPromiseExit,
  );

describe("modelServingInferenceApiUrl", () => {
  test("puts the region in the host", () => {
    expect(modelServingInferenceApiUrl("eu01")).toEqual(
      "https://api.openai-compat.model-serving.eu01.onstackit.cloud",
    );
  });

  test("refuses a region that would point the token at another server", () => {
    expect(modelServingInferenceApiUrl("evil.example.com/#")).toBeUndefined();
  });
});

describe("modelServingInferenceCredentialsOf", () => {
  test("a token with no known value fails before the wire", async () => {
    const exit = await Effect.runPromiseExit(
      modelServingInferenceCredentialsOf({ region: "eu01", token: undefined }),
    );
    expect(Exit.isFailure(exit)).toBe(true);
    expect(JSON.stringify(exit)).toContain("no known value");
  });
});

describe("createChatCompletion", () => {
  test("posts to the region's host with the auth token", async () => {
    const api = fakeApi({
      status: 200,
      body: JSON.stringify({
        id: "1",
        object: "chat.completion",
        choices: [
          { index: 0, message: { role: "assistant", content: "hello" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
    });
    const reply = await inference
      .createChatCompletion(request)
      .pipe(Effect.provide(api.layer), Effect.runPromise);
    expect(reply.choices[0]?.message.content).toEqual("hello");
    expect(api.calls).toEqual([
      {
        url: "https://api.openai-compat.model-serving.eu01.onstackit.cloud/v1/chat/completions",
        authorization: `Bearer ${TOKEN}`,
        body: request,
      },
    ]);
  });

  test("types a 404, reading OpenAI's error envelope", async () => {
    const api = fakeApi({
      status: 404,
      body: JSON.stringify({ error: { message: "no such model", code: "model_not_found" } }),
    });
    const exit = await inference
      .createChatCompletion(request)
      .pipe(Effect.flip, Effect.provide(api.layer), Effect.runPromise);
    expect(exit._tag).toEqual("NotFound");
    expect(exit.message).toEqual("no such model");
  });
});

describe("createEmbeddings", () => {
  test("posts the input and decodes the vectors", async () => {
    const api = fakeApi({
      status: 200,
      body: JSON.stringify({
        object: "list",
        data: [{ index: 0, object: "embedding", embedding: [0.5, 0.25] }],
        usage: { prompt_tokens: 1, total_tokens: 1, completion_tokens: 0 },
      }),
    });
    const reply = await inference
      .createEmbeddings({ model: "intfloat/e5-mistral-7b-instruct", input: ["hi"] })
      .pipe(Effect.provide(api.layer), Effect.runPromise);
    expect(reply.data[0]?.embedding).toEqual([0.5, 0.25]);
    expect(api.calls[0]?.url).toEqual(
      "https://api.openai-compat.model-serving.eu01.onstackit.cloud/v1/embeddings",
    );
  });
});

describe("streamChatCompletion", () => {
  test("asks for a stream on the real route, and yields each chunk up to [DONE]", async () => {
    const api = fakeApi({
      status: 200,
      body: sse(
        chunk({ role: "assistant", content: "hel" }),
        chunk({ content: "lo" }),
        chunk({}, "stop"),
        "[DONE]",
        chunk({ content: "after the end" }),
      ),
    });
    const exit = await collect(inference.streamChatCompletion(request), api.layer);
    expect(Exit.isSuccess(exit)).toBe(true);
    const chunks = Exit.isSuccess(exit) ? [...exit.value] : [];
    expect(chunks.map((item) => item.choices[0]?.delta.content ?? null)).toEqual([
      "hel",
      "lo",
      null,
    ]);
    expect(api.calls).toEqual([
      {
        url: "https://api.openai-compat.model-serving.eu01.onstackit.cloud/v1/chat/completions",
        authorization: `Bearer ${TOKEN}`,
        body: { ...request, stream: true },
      },
    ]);
  });

  test("a chunk split across reads still parses", async () => {
    const encoder = new TextEncoder();
    const text = sse(chunk({ content: "hello" }, "stop"), "[DONE]");
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(text.slice(0, 20)));
        controller.enqueue(encoder.encode(text.slice(20)));
        controller.close();
      },
    });
    const exit = await collect(
      inference.streamChatCompletion(request),
      fakeApi({ status: 200, body }).layer,
    );
    expect(Exit.isSuccess(exit) ? [...exit.value].length : -1).toEqual(1);
  });

  test("a refused request fails with the typed error, not a stream", async () => {
    const api = fakeApi({ status: 400, body: JSON.stringify({ message: "bad model" }) });
    const error = await inference
      .streamChatCompletion(request)
      .pipe(Effect.flip, Effect.provide(api.layer), Effect.runPromise);
    expect(error._tag).toEqual("BadRequest");
  });

  test("a body cut off before a finish reason fails", async () => {
    const exit = await collect(
      inference.streamChatCompletion(request),
      fakeApi({ status: 200, body: sse(chunk({ content: "hel" })) }).layer,
    );
    expect(Exit.isFailure(exit)).toBe(true);
    expect(JSON.stringify(exit)).toContain("StackitParseError");
  });

  test("[DONE] alone ends the stream", async () => {
    const exit = await collect(
      inference.streamChatCompletion(request),
      fakeApi({ status: 200, body: sse(chunk({ content: "hello" }), "[DONE]") }).layer,
    );
    expect(Exit.isSuccess(exit) ? [...exit.value].length : -1).toEqual(1);
  });

  test("a stream event with no choices, or a choice with no delta, reads as empty", async () => {
    const { layer } = fakeApi({
      status: 200,
      body: sse(
        JSON.stringify({ id: "1", error: null, usage: { total_tokens: 3 } }),
        JSON.stringify({ id: "1", choices: [{ index: 0, finish_reason: "stop" }] }),
        "[DONE]",
      ),
    });
    const exit = await collect(inference.streamChatCompletion(request), layer);
    expect(Exit.isSuccess(exit)).toBe(true);
    if (Exit.isSuccess(exit)) {
      const chunks = [...exit.value];
      expect(chunks[0]).toMatchObject({ choices: [] });
      expect(chunks[1]).toMatchObject({ choices: [{ delta: {}, finish_reason: "stop" }] });
    }
  });

  test("a stream event that isn't an object fails as a parse error", async () => {
    const { layer } = fakeApi({ status: 200, body: sse("42", "[DONE]") });
    const exit = await collect(inference.streamChatCompletion(request), layer);
    expect(Exit.isFailure(exit)).toBe(true);
    expect(JSON.stringify(exit)).toContain("StackitParseError");
  });

  test("an error reported inside the stream fails the stream", async () => {
    const exit = await collect(
      inference.streamChatCompletion(request),
      fakeApi({
        status: 200,
        body: sse(
          chunk({ content: "hel" }),
          JSON.stringify({ error: { message: "model overloaded" } }),
        ),
      }).layer,
    );
    expect(Exit.isFailure(exit)).toBe(true);
    expect(JSON.stringify(exit)).toContain("model overloaded");
  });

  test("a body that isn't JSON fails rather than passing as a chunk", async () => {
    const exit = await collect(
      inference.streamChatCompletion(request),
      fakeApi({ status: 200, body: sse("not json") }).layer,
    );
    expect(Exit.isFailure(exit)).toBe(true);
  });
});
