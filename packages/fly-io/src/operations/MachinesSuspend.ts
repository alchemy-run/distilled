import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesSuspendInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/machines/{machine_id}/suspend",
  }),
);
export type MachinesSuspendInput = typeof MachinesSuspendInput.Type;

// Output Schema
export const MachinesSuspendOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesSuspendOutput = typeof MachinesSuspendOutput.Type;

// The operation
/**
 * Suspend Machine
 *
 * Suspend a specific Machine within an app. The next start operation will attempt (but is not guaranteed) to resume the Machine from a snapshot taken at suspension time, rather than performing a cold boot.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesSuspend = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesSuspendInput,
  outputSchema: MachinesSuspendOutput,
}));
