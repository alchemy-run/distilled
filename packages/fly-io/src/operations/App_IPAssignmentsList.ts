import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const App_IPAssignmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/apps/{app_name}/ip_assignments" }),
  );
export type App_IPAssignmentsListInput = typeof App_IPAssignmentsListInput.Type;

// Output Schema
export const App_IPAssignmentsListOutput =
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
export type App_IPAssignmentsListOutput =
  typeof App_IPAssignmentsListOutput.Type;

// The operation
/**
 * List IP assignments for app
 */
export const App_IPAssignmentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: App_IPAssignmentsListInput,
    outputSchema: App_IPAssignmentsListOutput,
  }),
);
