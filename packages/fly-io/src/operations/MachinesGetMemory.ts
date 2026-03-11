import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesGetMemoryInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/apps/{app_name}/machines/{machine_id}/memory",
  }),
);
export type MachinesGetMemoryInput = typeof MachinesGetMemoryInput.Type;

// Output Schema
export const MachinesGetMemoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    available_mb: Schema.optional(Schema.Number),
    limit_mb: Schema.optional(Schema.Number),
  });
export type MachinesGetMemoryOutput = typeof MachinesGetMemoryOutput.Type;

// The operation
/**
 * Get Machine Memory
 *
 * Get current memory limit and available capacity for a machine
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesGetMemory = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesGetMemoryInput,
  outputSchema: MachinesGetMemoryOutput,
}));
