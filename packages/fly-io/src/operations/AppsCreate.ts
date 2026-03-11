import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  enable_subdomains: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
  org_slug: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/apps" }));
export type AppsCreateInput = typeof AppsCreateInput.Type;

// Output Schema
export const AppsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AppsCreateOutput = typeof AppsCreateOutput.Type;

// The operation
/**
 * Create App
 *
 * Create an app with the specified details in the request body.
 */
export const AppsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppsCreateInput,
  outputSchema: AppsCreateOutput,
}));
