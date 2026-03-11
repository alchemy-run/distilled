import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesExecInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
  cmd: Schema.optional(Schema.String),
  command: Schema.optional(Schema.Array(Schema.String)),
  container: Schema.optional(Schema.String),
  stdin: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/machines/{machine_id}/exec",
  }),
);
export type MachinesExecInput = typeof MachinesExecInput.Type;

// Output Schema
export const MachinesExecOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  exit_code: Schema.optional(Schema.Number),
  exit_signal: Schema.optional(Schema.Number),
  stderr: Schema.optional(Schema.String),
  stdout: Schema.optional(Schema.String),
});
export type MachinesExecOutput = typeof MachinesExecOutput.Type;

// The operation
/**
 * Execute Command
 *
 * Execute a command on a specific Machine and return the raw command output bytes.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesExec = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesExecInput,
  outputSchema: MachinesExecOutput,
}));
