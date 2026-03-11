import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesDeleteMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
    key: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/apps/{app_name}/machines/{machine_id}/metadata/{key}",
    }),
  );
export type MachinesDeleteMetadataInput =
  typeof MachinesDeleteMetadataInput.Type;

// Output Schema
export const MachinesDeleteMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesDeleteMetadataOutput =
  typeof MachinesDeleteMetadataOutput.Type;

// The operation
/**
 * Delete Metadata
 *
 * Delete metadata for a specific Machine within an app by providing a metadata key.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 * @param key - Metadata Key
 */
export const MachinesDeleteMetadata = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesDeleteMetadataInput,
    outputSchema: MachinesDeleteMetadataOutput,
  }),
);
