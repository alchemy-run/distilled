import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesSetMemoryLimitInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
    limit_mb: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apps/{app_name}/machines/{machine_id}/memory",
    }),
  );
export type MachinesSetMemoryLimitInput =
  typeof MachinesSetMemoryLimitInput.Type;

// Output Schema
export const MachinesSetMemoryLimitOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    available_mb: Schema.optional(Schema.Number),
    limit_mb: Schema.optional(Schema.Number),
  });
export type MachinesSetMemoryLimitOutput =
  typeof MachinesSetMemoryLimitOutput.Type;

// The operation
/**
 * Set Machine Memory Limit
 *
 * Set the memory limit for a machine using the balloon device
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesSetMemoryLimit = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesSetMemoryLimitInput,
    outputSchema: MachinesSetMemoryLimitOutput,
  }),
);
