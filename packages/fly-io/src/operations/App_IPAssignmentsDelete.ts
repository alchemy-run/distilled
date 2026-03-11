import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const App_IPAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "DELETE", path: "/apps/{app_name}/ip_assignments/{ip}" }),
  );
export type App_IPAssignmentsDeleteInput =
  typeof App_IPAssignmentsDeleteInput.Type;

// Output Schema
export const App_IPAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type App_IPAssignmentsDeleteOutput =
  typeof App_IPAssignmentsDeleteOutput.Type;

// The operation
/**
 * Remove IP assignment from app
 */
export const App_IPAssignmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: App_IPAssignmentsDeleteInput,
    outputSchema: App_IPAssignmentsDeleteOutput,
  }),
);
