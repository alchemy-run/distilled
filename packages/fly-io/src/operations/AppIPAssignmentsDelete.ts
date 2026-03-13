import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppIPAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    ip: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({ method: "DELETE", path: "/apps/{app_name}/ip_assignments/{ip}" }),
  );
export type AppIPAssignmentsDeleteInput =
  typeof AppIPAssignmentsDeleteInput.Type;

// Output Schema
export const AppIPAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AppIPAssignmentsDeleteOutput =
  typeof AppIPAssignmentsDeleteOutput.Type;

// The operation
/**
 * Remove IP assignment from app
 *
 * @param app_name - Fly App Name
 * @param ip - IP address
 */
export const AppIPAssignmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppIPAssignmentsDeleteInput,
    outputSchema: AppIPAssignmentsDeleteOutput,
  }),
);
