import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
  force: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "DELETE", path: "/apps/{app_name}/machines/{machine_id}" }),
);
export type MachinesDeleteInput = typeof MachinesDeleteInput.Type;

// Output Schema
export const MachinesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesDeleteOutput = typeof MachinesDeleteOutput.Type;

// The operation
/**
 * Destroy Machine
 *
 * Delete a specific Machine within an app by Machine ID, with an optional force parameter to force kill the Machine if it's running.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 * @param force - Force kill the machine if it's running
 */
export const MachinesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesDeleteInput,
  outputSchema: MachinesDeleteOutput,
}));
