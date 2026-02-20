import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetNeonAuthAllowLocalhostInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/projects/{project_id}/branches/{branch_id}/auth/allow_localhost",
  }),
);
export type GetNeonAuthAllowLocalhostInput =
  typeof GetNeonAuthAllowLocalhostInput.Type;

// Output Schema
export const GetNeonAuthAllowLocalhostOutput = Schema.Struct({
  allow_localhost: Schema.Boolean,
});
export type GetNeonAuthAllowLocalhostOutput =
  typeof GetNeonAuthAllowLocalhostOutput.Type;

// The operation
/**
 * Get allow localhost
 *
 * Get the allow localhost configuration for the specified branch.
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const getNeonAuthAllowLocalhost = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetNeonAuthAllowLocalhostInput,
    outputSchema: GetNeonAuthAllowLocalhostOutput,
  }),
);
