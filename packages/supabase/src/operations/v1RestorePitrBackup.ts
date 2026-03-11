import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1RestorePitrBackupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    recovery_time_target_unix: Schema.Number,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/database/backups/restore-pitr",
    }),
  );
export type V1RestorePitrBackupInput = typeof V1RestorePitrBackupInput.Type;

// Output Schema
export const V1RestorePitrBackupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1RestorePitrBackupOutput = typeof V1RestorePitrBackupOutput.Type;

// The operation
/**
 * Restores a PITR backup for a database
 *
 * @param ref - Project ref
 */
export const v1RestorePitrBackup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1RestorePitrBackupInput,
  outputSchema: V1RestorePitrBackupOutput,
}));
