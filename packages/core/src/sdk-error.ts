/**
 * The error an operation fails with when the SDK itself cannot make the
 * call: its generated config or a core module is broken (a paginated
 * operation without the fields its strategy reads, a gRPC operation
 * without a descriptor, ...). No input or response causes it; the
 * generator refuses the configs that would. It is typed, so it fails the
 * call instead of crashing the fiber, and it is never retried.
 *
 * Defined on its own, in core's `base` bundle group, so pagination and
 * the protocols fail with it without importing the REST modules.
 */
import * as Schema from "./schema-lite-typed.ts";

export class SdkError
  extends /*@__PURE__*/ Schema.TaggedError<SdkError>()("SdkError", {
    message: Schema.String,
  }) {}
