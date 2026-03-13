import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppIPAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apps/{app_name}/ip_assignments" }),
  );
export type AppIPAssignmentsListInput = typeof AppIPAssignmentsListInput.Type;

// Output Schema
export const AppIPAssignmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ips: Schema.optional(
      Schema.Array(
        Schema.Struct({
          created_at: Schema.optional(Schema.String),
          ip: Schema.optional(Schema.String),
          region: Schema.optional(Schema.String),
          service_name: Schema.optional(Schema.String),
          shared: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
  });
export type AppIPAssignmentsListOutput = typeof AppIPAssignmentsListOutput.Type;

// The operation
/**
 * List IP assignments for app
 */
export const AppIPAssignmentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppIPAssignmentsListInput,
    outputSchema: AppIPAssignmentsListOutput,
  }),
);
