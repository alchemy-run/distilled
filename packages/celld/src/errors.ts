import * as Schema from "effect/Schema";

export * from "@distilled.cloud/core/errors";

/** An HTTP error outside the modeled Celld responses. */
export class UnknownCelldError extends Schema.TaggedError<UnknownCelldError>()(
  "UnknownCelldError",
  {
    status: Schema.Number,
    message: Schema.String,
  },
) {}
