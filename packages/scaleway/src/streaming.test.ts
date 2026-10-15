import * as CoreErrors from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { describe, expect, test } from "vitest";
import { credentials } from "./credentials.ts";
import { InvalidArgumentsError, UnknownScalewayError } from "./errors.ts";
import { streamChatCompletion, streamResponse } from "./streaming.ts";

interface Captured {
  readonly url: URL;
  readonly headers: Record<string, string>;
  readonly body: unknown;
}

/** Answer with `parts` as separate network chunks, so events can straddle reads. */
const fakeSse = (parts: readonly string[], status = 200, contentType = "text/event-stream") => {
  const calls: Captured[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.sync(() => {
        calls.push({
          url,
          headers: { ...request.headers },
          body:
            request.body._tag === "Uint8Array"
              ? JSON.parse(new TextDecoder().decode(request.body.body))
              : undefined,
        });
        const encoder = new TextEncoder();
        const body = new ReadableStream<Uint8Array>({
          start(controller) {
            for (const part of parts) controller.enqueue(encoder.encode(part));
            controller.close();
          },
        });
        return HttpClientResponse.fromWeb(
          request,
          new Response(body, { status, headers: { "content-type": contentType } }),
        );
      }),
    ),
  );
  return { calls, layer };
};

const collect = <A, E>(
  stream: Stream.Stream<A, E, any>,
  http: Layer.Layer<HttpClient.HttpClient>,
) =>
  Effect.runPromise(
    Stream.runCollect(stream).pipe(
      Effect.map((chunk) => Array.from(chunk)),
      Effect.provide(credentials({ secretKey: Redacted.make("scw-secret") })),
      Effect.provide(http),
      Effect.result,
    ) as Effect.Effect<any, never, never>,
  );

const chunk = (content: string) =>
  JSON.stringify({
    id: "c1",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta: { content } }],
  });

const input = {
  project_id: "p",
  model: "llama-3.1-8b-instruct",
  messages: [{ role: "user", content: "hi" }] as any,
};

describe("streamChatCompletion", () => {
  test("sends stream: true with Bearer auth to api.scaleway.ai", async () => {
    const { calls, layer } = fakeSse([`data: ${chunk("a")}\n\n`, "data: [DONE]\n\n"]);
    await collect(streamChatCompletion(input), layer);
    expect(calls[0]!.url.href).toBe("https://api.scaleway.ai/p/v1/chat/completions");
    expect(calls[0]!.headers.authorization).toBe("Bearer scw-secret");
    expect(calls[0]!.headers.accept).toBe("text/event-stream");
    expect(calls[0]!.body).toMatchObject({ model: input.model, stream: true });
  });

  test("parses events split across reads and stops at [DONE]", async () => {
    const one = `data: ${chunk("Hel")}\n\n`;
    const { layer } = fakeSse([
      one.slice(0, 20),
      one.slice(20),
      `data: ${chunk("lo")}\n\ndata: [DO`,
      "NE]\n\n",
      `data: ${chunk("ignored after DONE")}\n\n`,
    ]);
    const result = await collect(streamChatCompletion(input), layer);
    expect(result._tag).toBe("Success");
    expect(result.success.map((c: any) => c.choices[0].delta.content).join("")).toBe("Hello");
  });

  test("a failure before the stream is the typed Scaleway error", async () => {
    const { layer } = fakeSse(
      [
        JSON.stringify({
          type: "invalid_arguments",
          message: "invalid argument(s)",
          details: [{ argument_name: "model", reason: "required" }],
        }),
      ],
      400,
      "application/json",
    );
    const result = await collect(streamChatCompletion(input), layer);
    expect(result._tag).toBe("Failure");
    expect(result.failure).toBeInstanceOf(InvalidArgumentsError);

    const limited = fakeSse([JSON.stringify({ message: "slow down" })], 429, "application/json");
    const throttled = await collect(streamChatCompletion(input), limited.layer);
    expect(throttled.failure).toBeInstanceOf(CoreErrors.TooManyRequests);
  });

  test("an error event mid-stream fails the stream", async () => {
    const { layer } = fakeSse([
      `data: ${chunk("a")}\n\n`,
      `data: ${JSON.stringify({ error: { message: "model overloaded" } })}\n\n`,
    ]);
    const result = await collect(streamChatCompletion(input), layer);
    expect(result.failure).toBeInstanceOf(UnknownScalewayError);
    expect(result.failure).toMatchObject({ message: "model overloaded" });
  });
});

describe("streamResponse", () => {
  test("yields Responses API events", async () => {
    const { calls, layer } = fakeSse([
      `event: response.output_text.delta\ndata: ${JSON.stringify({ type: "response.output_text.delta", delta: "Hi" })}\n\n`,
      `event: response.completed\ndata: ${JSON.stringify({ type: "response.completed" })}\n\n`,
    ]);
    const result = await collect(
      streamResponse({ project_id: "p", model: "m", input: "hi" } as any),
      layer,
    );
    expect(calls[0]!.url.pathname).toBe("/p/v1/responses");
    expect(result.success.map((e: any) => e.type)).toEqual([
      "response.output_text.delta",
      "response.completed",
    ]);
  });
});
