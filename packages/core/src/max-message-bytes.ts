/**
 * The largest message a streaming protocol accepts from the server (a gRPC
 * frame, an e2b envd envelope). A message whose header announces more fails
 * the call before the SDK buffers it. The first of these wins:
 *
 * 1. The call's own `maxMessageBytes` ({@link MaxMessageBytesInput}):
 *    `Modal.functionGet({ ..., maxMessageBytes: 200 * 1024 * 1024 })`.
 * 2. The {@link MaxMessageBytes} layer, for every call in a scope:
 *    `Effect.provide(MaxMessageBytes.of(200 * 1024 * 1024))`.
 * 3. The protocol's own default (e.g. Modal's 100 MiB, as its official
 *    client), else {@link DEFAULT_MAX_MESSAGE_BYTES}.
 *
 * `MaxMessageBytes` is an optional service: operations do not list it in
 * their requirements.
 */
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

/** 16 MiB. */
export const DEFAULT_MAX_MESSAGE_BYTES = 16 * 1024 * 1024;

export class MaxMessageBytes
  extends /*@__PURE__*/ Context.Service<MaxMessageBytes, number>()(
    "@distilled.cloud/core/MaxMessageBytes",
  ) {}

/** Accept messages up to `bytes` in a scope, e.g. `MaxMessageBytes.of(64 * 1024 * 1024)`. */
export const of = (bytes: number): Layer.Layer<MaxMessageBytes> =>
  Layer.succeed(MaxMessageBytes, bytes);

/**
 * The optional `maxMessageBytes` an operation input accepts. It sets the
 * limit for one call, over the {@link MaxMessageBytes} layer. It is not sent
 * on the wire.
 */
export interface MaxMessageBytesInput {
  readonly maxMessageBytes?: number;
}

/**
 * The limit for one call: the input's `maxMessageBytes`, else the layer in
 * `context`, else `fallback`. A value that is not a positive whole number
 * is returned as an error message.
 */
export const resolve = (
  context: Context.Context<any>,
  input: unknown,
  fallback: number = DEFAULT_MAX_MESSAGE_BYTES,
): number | { readonly invalid: string } => {
  const call =
    input !== null && typeof input === "object"
      ? (input as MaxMessageBytesInput).maxMessageBytes
      : undefined;
  const bytes = call ?? Context.getOrUndefined(context, MaxMessageBytes) ?? fallback;
  return Number.isSafeInteger(bytes) && bytes > 0
    ? bytes
    : { invalid: `maxMessageBytes must be a positive whole number, got ${String(bytes)}` };
};
