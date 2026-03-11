import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesPatchMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/apps/{app_name}/machines/{machine_id}/metadata",
    }),
  );
export type MachinesPatchMetadataInput = typeof MachinesPatchMetadataInput.Type;

// Output Schema
export const MachinesPatchMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MachinesPatchMetadataOutput =
  typeof MachinesPatchMetadataOutput.Type;

// The operation
/**
 * Patch Metadata (set/remove multiple keys)
 *
 * Update multiple metadata keys at once. Null values and empty strings remove keys.
 * + If `machine_version` is provided and no longer matches the current machine version, returns 412 Precondition Failed.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesPatchMetadata = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesPatchMetadataInput,
    outputSchema: MachinesPatchMetadataOutput,
  }),
);
