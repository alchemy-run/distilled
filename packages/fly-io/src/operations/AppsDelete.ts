import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/apps/{app_name}" }));
export type AppsDeleteInput = typeof AppsDeleteInput.Type;

// Output Schema
export const AppsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AppsDeleteOutput = typeof AppsDeleteOutput.Type;

// The operation
/**
 * Destroy App
 *
 * Delete an app by its name.
 *
 * @param app_name - Fly App Name
 */
export const AppsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppsDeleteInput,
  outputSchema: AppsDeleteOutput,
}));
