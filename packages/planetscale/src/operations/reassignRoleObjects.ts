import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ReassignRoleObjectsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organization: Schema.String.pipe(T.PathParam()),
    database: Schema.String.pipe(T.PathParam()),
    branch: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    successor: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/organizations/{organization}/databases/{database}/branches/{branch}/roles/{id}/reassign",
    }),
  );
export type ReassignRoleObjectsInput = typeof ReassignRoleObjectsInput.Type;

// Output Schema
export const ReassignRoleObjectsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReassignRoleObjectsOutput = typeof ReassignRoleObjectsOutput.Type;

// The operation
/**
 * Reassign objects owned by one role to another role
 *
 * @param organization - Organization name slug from `list_organizations`. Example: `acme`.
 * @param database - Database name slug from `list_databases`. Example: `app-db`.
 * @param branch - Branch name from `list_branches`. Example: `main`.
 * @param id - The ID of the role
 * @param successor - The role to reassign ownership to
 */
export const reassignRoleObjects = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReassignRoleObjectsInput,
  outputSchema: ReassignRoleObjectsOutput,
  errors: [Forbidden, NotFound] as const,
}));
