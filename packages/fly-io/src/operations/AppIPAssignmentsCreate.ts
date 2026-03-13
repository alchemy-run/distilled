import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AppIPAssignmentsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    network: Schema.optional(Schema.String),
    org_slug: Schema.optional(Schema.String),
    region: Schema.optional(Schema.String),
    service_name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "POST", path: "/apps/{app_name}/ip_assignments" }));
export type AppIPAssignmentsCreateInput =
  typeof AppIPAssignmentsCreateInput.Type;

// Output Schema
export const AppIPAssignmentsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created_at: Schema.optional(Schema.String),
    ip: Schema.optional(Schema.String),
    region: Schema.optional(Schema.String),
    service_name: Schema.optional(Schema.String),
    shared: Schema.optional(Schema.Boolean),
  });
export type AppIPAssignmentsCreateOutput =
  typeof AppIPAssignmentsCreateOutput.Type;

// The operation
/**
 * Assign new IP address to app
 */
export const AppIPAssignmentsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppIPAssignmentsCreateInput,
    outputSchema: AppIPAssignmentsCreateOutput,
  }),
);
