import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeferGroupMaintenanceWindowInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/maintenanceWindow/defer",
    }),
  );
export type DeferGroupMaintenanceWindowInput =
  typeof DeferGroupMaintenanceWindowInput.Type;

// Output Schema
export const DeferGroupMaintenanceWindowOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeferGroupMaintenanceWindowOutput =
  typeof DeferGroupMaintenanceWindowOutput.Type;

// The operation
/**
 * Defer One Maintenance Window for One Project
 *
 * Defers the maintenance window for the specified project. Urgent maintenance activities such as security patches can't wait for your chosen window. MongoDB Cloud starts those maintenance activities when needed. After you schedule maintenance for your cluster, you can't change your maintenance window until the current maintenance efforts complete. The maintenance procedure that MongoDB Cloud performs requires at least one replica set election during the maintenance window per replica set. Maintenance always begins as close to the scheduled hour as possible, but in-progress cluster updates or unexpected system issues could delay the start time. To use this resource, the requesting Service Account or API Key must have the Project Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 */
export const deferGroupMaintenanceWindow = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeferGroupMaintenanceWindowInput,
    outputSchema: DeferGroupMaintenanceWindowOutput,
  }),
);
