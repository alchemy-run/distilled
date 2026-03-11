import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesListProcessesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
    sort_by: Schema.optional(Schema.String),
    order: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/apps/{app_name}/machines/{machine_id}/ps",
    }),
  );
export type MachinesListProcessesInput = typeof MachinesListProcessesInput.Type;

// Output Schema
export const MachinesListProcessesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      command: Schema.optional(Schema.String),
      cpu: Schema.optional(Schema.Number),
      directory: Schema.optional(Schema.String),
      listen_sockets: Schema.optional(
        Schema.Array(
          Schema.Struct({
            address: Schema.optional(Schema.String),
            proto: Schema.optional(Schema.String),
          }),
        ),
      ),
      pid: Schema.optional(Schema.Number),
      rss: Schema.optional(Schema.Number),
      rtime: Schema.optional(Schema.Number),
      stime: Schema.optional(Schema.Number),
    }),
  );
export type MachinesListProcessesOutput =
  typeof MachinesListProcessesOutput.Type;

// The operation
/**
 * List Processes
 *
 * List all processes running on a specific Machine within an app, with optional sorting parameters.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 * @param sort_by - Sort by
 * @param order - Order
 */
export const MachinesListProcesses = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesListProcessesInput,
    outputSchema: MachinesListProcessesOutput,
  }),
);
