/**
 * The error an operation fails with when the SDK itself cannot make the
 * call: its generated config or a core module is broken (a paginated
 * operation without the fields its strategy reads, a gRPC operation
 * without a descriptor, ...), or one of its own modules fails to load. No
 * input or response causes it; the generator refuses the configs that
 * would. It is typed, so it fails the call instead of crashing the fiber,
 * and it is never retried.
 *
 * Defined on its own, in core's `base` bundle group, so pagination and
 * the protocols fail with it without importing the REST modules.
 */
import * as Effect from "effect/Effect";
import * as Schema from "./schema-lite-typed.ts";

export class SdkError
  extends /*@__PURE__*/ Schema.TaggedError<SdkError>()("SdkError", {
    message: Schema.String,
  }) {}

/**
 * Load one of the SDK's own modules on first use (`() => import("./x.ts")`).
 * A rejected import -- a chunk missing from a bundle, a browser chunk that
 * fails to download -- fails with {@link SdkError}.
 */
export const loadModule = <A>(load: () => PromiseLike<A>): Effect.Effect<A, SdkError> =>
  Effect.tryPromise({
    try: () => load(),
    catch: (cause) =>
      new SdkError({
        message: `an SDK module failed to load: ${cause instanceof Error ? cause.message : String(cause)}`,
      }),
  });
