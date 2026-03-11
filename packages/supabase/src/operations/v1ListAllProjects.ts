import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllProjectsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(T.Http({ method: "GET", path: "/v1/projects" }));
export type V1ListAllProjectsInput = typeof V1ListAllProjectsInput.Type;

// Output Schema
export const V1ListAllProjectsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
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
  }),
);
export type V1ListAllProjectsOutput = typeof V1ListAllProjectsOutput.Type;

// The operation
/**
 * List all projects
 *
 * Returns a list of all projects you've previously created.
 * Use `/v1/organizations/{slug}/projects` instead when possible to get more precise results and pagination support.
 */
export const v1ListAllProjects = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListAllProjectsInput,
  outputSchema: V1ListAllProjectsOutput,
}));
