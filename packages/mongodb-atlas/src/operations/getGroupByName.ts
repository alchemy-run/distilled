import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupByNameInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupName: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "GET", path: "/api/atlas/v2/groups/byName/{groupName}" }),
);
export type GetGroupByNameInput = typeof GetGroupByNameInput.Type;

// Output Schema
export const GetGroupByNameOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupByNameOutput = typeof GetGroupByNameOutput.Type;

// The operation
/**
 * Return One Project by Name
 *
 * Returns details about the specified project. Projects group clusters into logical collections that support an application environment, workload, or both. Each project can have its own users, teams, security, tags, and alert settings. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupName - Human-readable label that identifies this project.
 */
export const getGroupByName = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetGroupByNameInput,
  outputSchema: GetGroupByNameOutput,
}));
