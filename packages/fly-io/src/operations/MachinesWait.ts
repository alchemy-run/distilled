import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesWaitInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
  version: Schema.optional(Schema.String),
  instance_id: Schema.optional(Schema.String),
  from_event_id: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.Number),
  state: Schema.optional(
    Schema.Literals([
      "started",
      "stopped",
      "suspended",
      "destroyed",
      "failed",
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
  event_id: Schema.optional(Schema.String),
  ok: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
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
 * @param version - 26-character Machine version ID
 * @param instance_id - 26-character Machine version ID (deprecated; use version)
 * @param from_event_id - 26-character Machine event ID to start waiting after
 * @param timeout - wait timeout. default 60s
 * @param state - desired state(s), supports repeated or comma-separated values
 */
export const MachinesWait = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesWaitInput,
  outputSchema: MachinesWaitOutput,
}));
