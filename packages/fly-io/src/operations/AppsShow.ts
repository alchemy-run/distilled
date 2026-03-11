import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppsShowInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/apps/{app_name}" }));
export type AppsShowInput = typeof AppsShowInput.Type;

// Output Schema
export const AppsShowOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  internal_numeric_id: Schema.optional(Schema.Number),
  machine_count: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  organization: Schema.optional(
    Schema.Struct({
      internal_numeric_id: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
      slug: Schema.optional(Schema.String),
    }),
  ),
  status: Schema.optional(Schema.String),
  volume_count: Schema.optional(Schema.Number),
});
export type AppsShowOutput = typeof AppsShowOutput.Type;

// The operation
/**
 * Get App
 *
 * Retrieve details about a specific app by its name.
 *
 * @param app_name - Fly App Name
 */
export const AppsShow = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppsShowInput,
  outputSchema: AppsShowOutput,
}));
