import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetSystemStatusInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(T.Http({ method: "GET", path: "/api/atlas/v2" }));
export type GetSystemStatusInput = typeof GetSystemStatusInput.Type;

// Output Schema
export const GetSystemStatusOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetSystemStatusOutput = typeof GetSystemStatusOutput.Type;

// The operation
/**
 * Return the Status of This MongoDB Application
 *
 * This resource returns information about the MongoDB application along with API key meta data.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const getSystemStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetSystemStatusInput,
  outputSchema: GetSystemStatusOutput,
}));
