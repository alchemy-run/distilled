import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetServicesHealthInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    services: Schema.String,
    timeout_ms: Schema.optional(Schema.Number),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/health" }));
export type V1GetServicesHealthInput = typeof V1GetServicesHealthInput.Type;

// Output Schema
export const V1GetServicesHealthOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      name: Schema.Literals([
        "auth",
        "db",
        "db_postgres_user",
        "pooler",
        "realtime",
        "rest",
        "storage",
        "pg_bouncer",
      ]),
      healthy: Schema.Boolean,
      status: Schema.Literals(["COMING_UP", "ACTIVE_HEALTHY", "UNHEALTHY"]),
      info: Schema.optional(Schema.Unknown),
      error: Schema.optional(Schema.String),
    }),
  );
export type V1GetServicesHealthOutput = typeof V1GetServicesHealthOutput.Type;

// The operation
/**
 * Gets project's service health status
 *
 * @param ref - Project ref
 */
export const v1GetServicesHealth = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetServicesHealthInput,
  outputSchema: V1GetServicesHealthOutput,
}));
