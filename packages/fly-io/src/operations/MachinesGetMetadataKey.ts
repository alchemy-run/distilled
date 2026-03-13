import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesGetMetadataKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
    key: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/apps/{app_name}/machines/{machine_id}/metadata/{key}",
    }),
  );
export type MachinesGetMetadataKeyInput =
  typeof MachinesGetMetadataKeyInput.Type;

// Output Schema
export const MachinesGetMetadataKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.String),
  });
export type MachinesGetMetadataKeyOutput =
  typeof MachinesGetMetadataKeyOutput.Type;

// The operation
/**
 * Get Metadata Value
 *
 * Get the value of a specific metadata key
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 * @param key - Metadata Key
 */
export const MachinesGetMetadataKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesGetMetadataKeyInput,
    outputSchema: MachinesGetMetadataKeyOutput,
  }),
);
