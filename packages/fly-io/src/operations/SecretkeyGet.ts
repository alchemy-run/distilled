import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretkeyGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
  min_version: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "GET", path: "/apps/{app_name}/secretkeys/{secret_name}" }),
);
export type SecretkeyGetInput = typeof SecretkeyGetInput.Type;

// Output Schema
export const SecretkeyGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  created_at: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  public_key: Schema.optional(Schema.Array(Schema.Number)),
  type: Schema.optional(Schema.String),
  updated_at: Schema.optional(Schema.String),
});
export type SecretkeyGetOutput = typeof SecretkeyGetOutput.Type;

// The operation
/**
 * Get an app's secret key
 *
 * @param app_name - Fly App Name
 * @param secret_name - Secret key name
 * @param min_version - Minimum secrets version to return. Returned when setting a new secret
 */
export const SecretkeyGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretkeyGetInput,
  outputSchema: SecretkeyGetOutput,
}));
