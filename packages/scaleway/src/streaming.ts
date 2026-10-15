import * as Effect from "effect/Effect";
/**
 * Streaming Generative APIs calls — hand-written.
 *
 * `generativeApisOpenaiV1.createChatCompletion` / `createResponse` with
 * `stream: true` answer `text/event-stream` (OpenAI's convention): one JSON
 * object per `data:` event, ended by `data: [DONE]`. The generated
 * operations decode one JSON body, so they cannot read that; these helpers
 * send the same request with `stream: true` and turn the events into a
 * `Stream`.
 *
 * Failures before the stream starts are the same typed errors the generated
 * operations raise (`failureFor` in protocol.ts). An `{"error": …}` event
 * mid-stream fails the stream with {@link UnknownScalewayError}.
 */
import { Sse } from "effect/encoding";
import * as HttpClient from "effect/http/HttpClient";
import type * as AST from "effect/SchemaAST";
import * as Stream from "effect/Stream";
import { UnknownScalewayError } from "./errors.ts";
import {
  encodeRequest,
  failureFor,
  type ScalewayOpContext,
  type ScalewayOpError,
} from "./protocol.ts";
import {
  CreateChatCompletionRequest,
  CreateResponseRequest,
} from "./services/generative_apis_openai_v1.ts";

/** One `chat.completion.chunk` event. */
export interface ChatCompletionChunk {
  readonly id: string;
  readonly object: "chat.completion.chunk";
  readonly created: number;
  readonly model: string;
  readonly choices: ReadonlyArray<{
    readonly index: number;
    readonly delta: {
      readonly role?: string;
      readonly content?: string | null;
      readonly reasoning_content?: string | null;
      readonly tool_calls?: ReadonlyArray<unknown>;
    };
    readonly finish_reason?: string | null;
  }>;
  /** Set on the last chunk when `stream_options.include_usage` is true. */
  readonly usage?: {
    readonly prompt_tokens: number;
    readonly completion_tokens: number;
    readonly total_tokens: number;
  } | null;
}

/** One Responses API event (`response.created`, `response.output_text.delta`, …). */
export interface ResponseStreamEvent {
  readonly type: string;
  readonly [key: string]: unknown;
}

const streamEvents = <A>(
  inputAst: AST.AST,
  input: unknown,
): Stream.Stream<A, ScalewayOpError, ScalewayOpContext> =>
  Effect.gen(function* () {
    const request = yield* encodeRequest({ ...(input as object), stream: true }, inputAst, {
      Accept: "text/event-stream",
    });
    const client = yield* HttpClient.HttpClient;
    const response = yield* client.execute(request);
    if (response.status >= 400) {
      const text = yield* response.text;
      return yield* Effect.fail(
        failureFor(response.status, text, response.headers as Record<string, string | undefined>),
      );
    }
    return response.stream.pipe(
      Stream.decodeText(),
      Stream.pipeThroughChannel(Sse.decode()),
      // A `retry:` directive cannot resume a POST; treat it as the end.
      Stream.catchTag("Retry", () => Stream.empty),
      Stream.takeWhile((event) => event.data.trim() !== "[DONE]"),
      Stream.filter((event) => event.data.trim() !== ""),
      Stream.mapEffect((event) => {
        let data: unknown;
        try {
          data = JSON.parse(event.data);
        } catch {
          return Effect.fail(
            new UnknownScalewayError({ message: "unparseable stream event", body: event.data }),
          );
        }
        if (data !== null && typeof data === "object" && "error" in data) {
          const error = (data as { error: unknown }).error;
          return Effect.fail(
            new UnknownScalewayError({
              message:
                typeof (error as { message?: unknown })?.message === "string"
                  ? (error as { message: string }).message
                  : "stream error",
              body: data,
            }),
          );
        }
        return Effect.succeed(data as A);
      }),
    );
  }).pipe(Stream.unwrap) as Stream.Stream<A, ScalewayOpError, ScalewayOpContext>;

/**
 * `createChatCompletion` with `stream: true`, as a stream of
 * `chat.completion.chunk` events.
 *
 * @example
 * ```ts
 * const text = yield* Scaleway.streamChatCompletion({
 *   project_id,
 *   model: "llama-3.1-8b-instruct",
 *   messages: [{ role: "user", content: "Say hello" }],
 * }).pipe(
 *   Stream.map((chunk) => chunk.choices[0]?.delta.content ?? ""),
 *   Stream.mkString,
 * );
 * ```
 */
export const streamChatCompletion = (
  input: Omit<CreateChatCompletionRequest, "stream">,
): Stream.Stream<ChatCompletionChunk, ScalewayOpError, ScalewayOpContext> =>
  streamEvents(CreateChatCompletionRequest.ast, input);

/** `createResponse` with `stream: true`, as a stream of Responses API events. */
export const streamResponse = (
  input: Omit<CreateResponseRequest, "stream">,
): Stream.Stream<ResponseStreamEvent, ScalewayOpError, ScalewayOpContext> =>
  streamEvents(CreateResponseRequest.ast, input);
