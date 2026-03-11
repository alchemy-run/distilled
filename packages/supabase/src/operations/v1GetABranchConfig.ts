import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetABranchConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    branch_id_or_ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/branches/{branch_id_or_ref}" }));
export type V1GetABranchConfigInput = typeof V1GetABranchConfigInput.Type;

// Output Schema
export const V1GetABranchConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String,
    postgres_version: Schema.String,
    postgres_engine: Schema.String,
    release_channel: Schema.String,
    status: Schema.Literals([
      "INACTIVE",
      "ACTIVE_HEALTHY",
      "ACTIVE_UNHEALTHY",
      "COMING_UP",
      "UNKNOWN",
      "GOING_DOWN",
      "INIT_FAILED",
      "REMOVED",
      "RESTORING",
      "UPGRADING",
      "PAUSING",
      "RESTORE_FAILED",
      "RESTARTING",
      "PAUSE_FAILED",
      "RESIZING",
    ]),
    db_host: Schema.String,
    db_port: Schema.Number,
    db_user: Schema.optional(Schema.String),
    db_pass: Schema.optional(Schema.String),
    jwt_secret: Schema.optional(Schema.String),
  });
export type V1GetABranchConfigOutput = typeof V1GetABranchConfigOutput.Type;

// The operation
/**
 * Get database branch config
 *
 * Fetches configurations of the specified database branch
 *
 * @param branch_id_or_ref - Branch ID
 */
export const v1GetABranchConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetABranchConfigInput,
  outputSchema: V1GetABranchConfigOutput,
}));
