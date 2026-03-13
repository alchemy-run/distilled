import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesUpsertMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
    key: Schema.String.pipe(T.PathParam()),
    updated_at: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apps/{app_name}/machines/{machine_id}/metadata/{key}",
    }),
  );
export type MachinesUpsertMetadataInput =
  typeof MachinesUpsertMetadataInput.Type;

// Output Schema
export const MachinesUpsertMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesUpsertMetadataOutput =
  typeof MachinesUpsertMetadataOutput.Type;

// The operation
/**
 * Upsert Metadata Key
 *
 * Update metadata for a specific machine within an app by providing a metadata key.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 * @param key - Metadata Key
 */
export const MachinesUpsertMetadata = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesUpsertMetadataInput,
    outputSchema: MachinesUpsertMetadataOutput,
  }),
);
