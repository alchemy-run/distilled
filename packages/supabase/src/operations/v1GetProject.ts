import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ref: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}" }));
export type V1GetProjectInput = typeof V1GetProjectInput.Type;

// Output Schema
export const V1GetProjectOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  ref: Schema.String,
  organization_id: Schema.String,
  organization_slug: Schema.String,
  name: Schema.String,
  region: Schema.String,
  created_at: Schema.String,
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
  database: Schema.Struct({
    host: Schema.String,
    version: Schema.String,
    postgres_engine: Schema.String,
    release_channel: Schema.String,
  }),
});
export type V1GetProjectOutput = typeof V1GetProjectOutput.Type;

// The operation
/**
 * Gets a specific project that belongs to the authenticated user
 *
 * @param ref - Project ref
 */
export const v1GetProject = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetProjectInput,
  outputSchema: V1GetProjectOutput,
}));
