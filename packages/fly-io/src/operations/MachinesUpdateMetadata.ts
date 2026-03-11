import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesUpdateMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
    key: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/apps/{app_name}/machines/{machine_id}/metadata/{key}",
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
 * Update Metadata
 *
 * Update metadata for a specific machine within an app by providing a metadata key.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 * @param key - Metadata Key
 */
export const MachinesUpdateMetadata = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesUpdateMetadataInput,
    outputSchema: MachinesUpdateMetadataOutput,
  }),
);
