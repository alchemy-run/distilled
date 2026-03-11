import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllBackupsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/database/backups" }));
export type V1ListAllBackupsInput = typeof V1ListAllBackupsInput.Type;

// Output Schema
export const V1ListAllBackupsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    region: Schema.String,
    walg_enabled: Schema.Boolean,
    pitr_enabled: Schema.Boolean,
    backups: Schema.Array(
      Schema.Struct({
        is_physical_backup: Schema.Boolean,
        status: Schema.Literals([
          "COMPLETED",
          "FAILED",
          "PENDING",
          "REMOVED",
          "ARCHIVED",
          "CANCELLED",
        ]),
        inserted_at: Schema.String,
      }),
    ),
    physical_backup_data: Schema.Struct({
      earliest_physical_backup_date_unix: Schema.optional(Schema.Number),
      latest_physical_backup_date_unix: Schema.optional(Schema.Number),
    }),
  },
);
export type V1ListAllBackupsOutput = typeof V1ListAllBackupsOutput.Type;

// The operation
/**
 * Lists all backups
 *
 * @param ref - Project ref
 */
export const v1ListAllBackups = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListAllBackupsInput,
  outputSchema: V1ListAllBackupsOutput,
}));
