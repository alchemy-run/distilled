/**
 * Shared stream utilities for AWS protocols.
 * Provides helpers for converting between Effect Streams, ReadableStreams, and text.
 */

import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import { ParseError } from "../errors.ts";
import type { StreamingInputBody } from "../traits.ts";

export const readEffectStreamAsText = <Err>(
  stream: Stream.Stream<Uint8Array, Err>,
): Effect.Effect<string, Err> => Stream.mkString(Stream.decodeText(stream));

/** A body stream that errored while it was read (e.g. a connection reset). */
const unreadableBody = (cause: unknown) =>
  new ParseError({
    message: `Failed to read the response body: ${cause instanceof Error ? cause.message : String(cause)}`,
  });

/**
 * Read a body as text (for non-streaming responses), in the calling fiber.
 * This is lazy - only consumes when called.
 */
export const readStreamAsText = (stream: string | StreamBody): Effect.Effect<string, ParseError> =>
  typeof stream === "string"
    ? Effect.succeed(stream)
    : Effect.map(readStreamAsBytes(stream), (bytes) => new TextDecoder().decode(bytes));

/**
 * Read a body fully as raw bytes (for non-streaming binary responses such
 * as httpPayload blobs), in the calling fiber.
 * This is lazy - only consumes when called.
 */
export const readStreamAsBytes = (
  stream: string | StreamBody,
): Effect.Effect<Uint8Array, ParseError> =>
  typeof stream === "string"
    ? Effect.succeed(new TextEncoder().encode(stream))
    : Stream.mkUint8Array(bodyStream(stream)).pipe(Effect.mapError(unreadableBody));

/**
 * A streaming body: a web stream, or an Effect stream that runs in the
 * caller's fiber. A response body is the HttpClient's Effect stream.
 */
export type StreamBody = ReadableStream<Uint8Array> | Stream.Stream<Uint8Array, unknown>;

/** Whether a body streams (is not a buffered string or bytes). */
export const isStreamBody = (body: unknown): body is StreamBody =>
  body instanceof ReadableStream || isEffectStream(body);

/**
 * A streaming body as an Effect stream. An Effect stream is returned as is,
 * so it runs in the fiber that sends the request, with its context and
 * tracing; a web stream is read from that fiber.
 */
export const bodyStream = (body: StreamBody): Stream.Stream<Uint8Array, unknown> =>
  body instanceof ReadableStream
    ? Stream.fromReadableStream({ evaluate: () => body, onError: (error) => error })
    : body;

/**
 * Check if a value is an Effect Stream.
 * Uses duck typing since Stream doesn't have a built-in type guard.
 */
export function isEffectStream(u: unknown): u is Stream.Stream<unknown, unknown, unknown> {
  return (
    u !== null && typeof u === "object" && "~effect/Stream" in Object.getPrototypeOf(u as object)
  );
}

/** Web streams made from a `Blob`: each try makes a new one, so a retry can send it again. */
const blobStreams = /*@__PURE__*/ new WeakSet<object>();

/**
 * Whether `body` is the caller's own stream, which can be read only once:
 * after it starts to go out, a retry would send it empty.
 */
export const isOneShotBody = (body: unknown): boolean =>
  isStreamBody(body) && !blobStreams.has(body);

/** Whether `body` is a web stream made from a `Blob`. */
export const isBlobStream = (body: unknown): boolean =>
  typeof body === "object" && body !== null && blobStreams.has(body);

/**
 * Convert various streaming input types to a format suitable for fetch.
 * Handles strings, Uint8Array, ArrayBuffer, Blob, ReadableStream, and Effect Stream.
 */
export function convertStreamingInput(
  value: string | StreamingInputBody,
): string | Uint8Array | StreamBody {
  if (typeof value === "string") return value;
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (typeof globalThis.Blob !== "undefined" && value instanceof globalThis.Blob) {
    const stream = value.stream();
    blobStreams.add(stream);
    return stream;
  }
  // A web stream or an Effect stream: sent as is.
  return value as StreamBody;
}

/**
 * A streaming response body as the Effect Stream the caller reads. The
 * HttpClient's stream is returned as is, so it is read in the caller's fiber.
 */
export const readableToEffectStream = (
  stream: string | StreamBody,
): Stream.Stream<Uint8Array, Error, never> =>
  typeof stream === "string"
    ? Stream.fromIterable([new TextEncoder().encode(stream)])
    : Stream.mapError(bodyStream(stream), (e) =>
        e instanceof Error ? e : new Error(String(e), { cause: e }),
      );

/**
 * `stream` with its chunks joined until each is at least `minSize` bytes,
 * as the AWS SDK's `createBufferedReadableStream` does. A chunk already that
 * large passes through when nothing is buffered; the last chunk can be any
 * size.
 */
export const minChunkSize =
  (minSize: number) =>
  <E, R>(stream: Stream.Stream<Uint8Array, E, R>): Stream.Stream<Uint8Array, E, R> =>
    Stream.mapAccum(
      stream,
      (): Uint8Array[] => [],
      (buffered, chunk) => {
        if (buffered.length === 0 && chunk.byteLength >= minSize) return [buffered, [chunk]];
        const next = [...buffered, chunk];
        return byteLength(next) >= minSize ? [[], [concatBytes(next)]] : [next, []];
      },
      { onHalt: (buffered) => (buffered.length === 0 ? [] : [concatBytes(buffered)]) },
    );

const byteLength = (chunks: ReadonlyArray<Uint8Array>): number =>
  chunks.reduce((total, chunk) => total + chunk.byteLength, 0);

const concatBytes = (chunks: ReadonlyArray<Uint8Array>): Uint8Array => {
  const out = new Uint8Array(byteLength(chunks));
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
};
