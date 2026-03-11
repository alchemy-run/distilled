import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
  signal: Schema.optional(Schema.String),
  timeout: Schema.optional(
    Schema.Struct({
      "time.Duration": Schema.optional(Schema.Number),
    }),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/apps/{app_name}/machines/{machine_id}/stop",
  }),
);
export type MachinesStopInput = typeof MachinesStopInput.Type;

// Output Schema
export const MachinesStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesStopOutput = typeof MachinesStopOutput.Type;

// The operation
/**
 * Stop Machine
 *
 * Stop a specific Machine within an app, with an optional request body to specify signal and timeout.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesStopInput,
  outputSchema: MachinesStopOutput,
}));
