import * as Category from "@distilled.cloud/core/category";
import { API_ERRORS, UnknownErrorFields } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";

export * from "@distilled.cloud/core/errors";

/** An HTTP error outside the modeled Celld responses. */
export class UnknownCelldError
  extends /*@__PURE__*/ Schema.TaggedError<UnknownCelldError>()(
    "UnknownCelldError",
    UnknownErrorFields,
  ) {}

/**
 * A 2xx body that does not match the operation's output schema. Raised only
 * in strict response validation (`@distilled.cloud/core/response-validation`).
 */
export class CelldParseError
  extends /*@__PURE__*/ Schema.TaggedError<CelldParseError>()("CelldParseError", {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  }).pipe(Category.withParseError) {}

/**
 * The errors declared on the Celld service: any operation can return them, and
 * every generated operation lists them as its `serviceErrors`. Today that is
 * each of core's status classes (401, 403, 404, 429, the 5xx ...).
 */
export const CelldServiceErrors = API_ERRORS;
export type CelldServiceError = InstanceType<(typeof CelldServiceErrors)[number]>;
