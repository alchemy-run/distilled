import type * as Stream from "effect/Stream";

/** Streaming input body - accepts multiple source types. */
export type StreamingInputBody =
  | string
  | Uint8Array<ArrayBufferLike>
  | ArrayBuffer
  | globalThis.Blob
  | ReadableStream<Uint8Array<ArrayBufferLike>>
  | Stream.Stream<Uint8Array<ArrayBufferLike>, unknown, unknown>;

/** Streaming output body - always an Effect Stream for composability. */
export type StreamingOutputBody = Stream.Stream<
  Uint8Array<ArrayBufferLike>,
  Error,
  never
>;

/** Legacy StreamBody type */
export type StreamBody = string | Uint8Array<ArrayBufferLike> | ReadableStream;
