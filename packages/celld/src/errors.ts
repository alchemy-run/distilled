import * as Category from "@distilled.cloud/core/category";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

export * from "@distilled.cloud/core/errors";

/** An HTTP error outside the modeled Celld responses. */
export class UnknownCelldError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownCelldError>()("UnknownCelldError", {
    status: Schema.Number,
    message: Schema.String,
  }) {}

/**
 * A 2xx body that does not match the operation's output schema. Raised only
 * in strict response validation (`@distilled.cloud/core/response-validation`).
 */
export class CelldParseError
  extends /*@__PURE__*/ Schema.TaggedError<CelldParseError>()("CelldParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}
