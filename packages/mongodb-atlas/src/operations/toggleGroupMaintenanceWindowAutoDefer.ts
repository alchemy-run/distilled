import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ToggleGroupMaintenanceWindowAutoDeferInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/maintenanceWindow/autoDefer",
    }),
  );
export type ToggleGroupMaintenanceWindowAutoDeferInput =
  typeof ToggleGroupMaintenanceWindowAutoDeferInput.Type;

// Output Schema
export const ToggleGroupMaintenanceWindowAutoDeferOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ToggleGroupMaintenanceWindowAutoDeferOutput =
  typeof ToggleGroupMaintenanceWindowAutoDeferOutput.Type;

// The operation
/**
 * Toggle Automatic Deferral of Maintenance for One Project
 *
 * Toggles automatic deferral of the maintenance window for the specified project. When automatic deferral is enabled, all maintenance windows are deferred for one week. This endpoint controls the same underlying feature as the `autoDeferOnceEnabled` field in the PATCH `/maintenanceWindow` endpoint. The difference is that this endpoint toggles the current value (switches from enabled to disabled or vice versa), while the `autoDeferOnceEnabled` field allows you to set a specific value. For most use cases, the PATCH endpoint with `autoDeferOnceEnabled` is recommended because it allows setting an explicit value rather than toggling. To use this resource, the requesting Service Account or API Key must have the Project Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 */
export const toggleGroupMaintenanceWindowAutoDefer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ToggleGroupMaintenanceWindowAutoDeferInput,
    outputSchema: ToggleGroupMaintenanceWindowAutoDeferOutput,
  }));
