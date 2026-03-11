import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/machines/{machine_id}/start",
  }),
);
export type MachinesStartInput = typeof MachinesStartInput.Type;

// Output Schema
export const MachinesStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesStartOutput = typeof MachinesStartOutput.Type;

// The operation
/**
 * Start Machine
 *
 * Start a specific Machine within an app.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesStartInput,
  outputSchema: MachinesStartOutput,
}));
