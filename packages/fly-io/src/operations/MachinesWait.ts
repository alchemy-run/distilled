import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesWaitInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
  instance_id: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.Number),
  state: Schema.optional(
    Schema.Literals([
      "started",
      "stopped",
      "suspended",
      "destroyed",
      "settled",
    ]),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/apps/{app_name}/machines/{machine_id}/wait",
  }),
);
export type MachinesWaitInput = typeof MachinesWaitInput.Type;

// Output Schema
export const MachinesWaitOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ok: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
});
export type MachinesWaitOutput = typeof MachinesWaitOutput.Type;

// The operation
/**
 * Wait for State
 *
 * Wait for a Machine to reach a specific state. Specify the desired state with the state parameter. See the [Machine states table](https://fly.io/docs/machines/working-with-machines/#machine-states) for a list of possible states. The default for this parameter is `started`.
 * This request will block for up to 60 seconds. Set a shorter timeout with the timeout parameter.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 * @param instance_id - 26-character Machine version ID
 * @param timeout - wait timeout. default 60s
 * @param state - desired state
 */
export const MachinesWait = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesWaitInput,
  outputSchema: MachinesWaitOutput,
}));
