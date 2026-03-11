import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesReclaimMemoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
    amount_mb: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apps/{app_name}/machines/{machine_id}/memory/reclaim",
    }),
  );
export type MachinesReclaimMemoryInput = typeof MachinesReclaimMemoryInput.Type;

// Output Schema
export const MachinesReclaimMemoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    actual_mb: Schema.optional(Schema.Number),
  });
export type MachinesReclaimMemoryOutput =
  typeof MachinesReclaimMemoryOutput.Type;

// The operation
/**
 * Reclaim Machine Memory
 *
 * Trigger the balloon device to reclaim memory from a machine
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesReclaimMemory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesReclaimMemoryInput,
    outputSchema: MachinesReclaimMemoryOutput,
  }),
);
