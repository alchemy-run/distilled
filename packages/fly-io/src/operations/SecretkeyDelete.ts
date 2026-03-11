import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretkeyDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  secret_name: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/apps/{app_name}/secretkeys/{secret_name}",
  }),
);
export type SecretkeyDeleteInput = typeof SecretkeyDeleteInput.Type;

// Output Schema
export const SecretkeyDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  Version: Schema.optional(Schema.Number),
  version: Schema.optional(Schema.Number),
});
export type SecretkeyDeleteOutput = typeof SecretkeyDeleteOutput.Type;

// The operation
/**
 * Delete an app's secret key
 *
 * @param app_name - Fly App Name
 * @param secret_name - Secret key name
 */
export const SecretkeyDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretkeyDeleteInput,
  outputSchema: SecretkeyDeleteOutput,
}));
