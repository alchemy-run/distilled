import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesShowMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    app_name: Schema.String.pipe(T.PathParam()),
    machine_id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/apps/{app_name}/machines/{machine_id}/metadata",
    }),
  );
export type MachinesShowMetadataInput = typeof MachinesShowMetadataInput.Type;

// Output Schema
export const MachinesShowMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Record(Schema.String, Schema.String);
export type MachinesShowMetadataOutput = typeof MachinesShowMetadataOutput.Type;

// The operation
/**
 * Get Metadata
 *
 * Retrieve metadata for a specific Machine within an app.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesShowMetadata = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MachinesShowMetadataInput,
    outputSchema: MachinesShowMetadataOutput,
  }),
);
