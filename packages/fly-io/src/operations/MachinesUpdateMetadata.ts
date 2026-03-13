import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesUpdateMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
    machine_version: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    updated_at: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/apps/{app_name}/machines/{machine_id}/metadata",
    }),
  );
export type MachinesUpdateMetadataInput =
  typeof MachinesUpdateMetadataInput.Type;

// Output Schema
export const MachinesUpdateMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesUpdateMetadataOutput =
  typeof MachinesUpdateMetadataOutput.Type;

// The operation
/**
 * Update Metadata (set/remove multiple keys)
 *
 * Update multiple metadata keys at once. Null values and empty strings remove keys.
 * + If `machine_version` is provided and no longer matches the current machine version, returns 412 Precondition Failed.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesUpdateMetadata = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesUpdateMetadataInput,
    outputSchema: MachinesUpdateMetadataOutput,
  }),
);
