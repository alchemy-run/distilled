import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const V1GetProjectPgbouncerConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/config/database/pgbouncer",
    }),
  );
export type V1GetProjectPgbouncerConfigInput =
  typeof V1GetProjectPgbouncerConfigInput.Type;

// Output Schema
export const V1GetProjectPgbouncerConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    default_pool_size: Schema.optional(Schema.Number),
    ignore_startup_parameters: Schema.optional(Schema.String),
    max_client_conn: Schema.optional(Schema.Number),
    pool_mode: Schema.optional(
      Schema.Literals(["transaction", "session", "statement"]),
    ),
    connection_string: Schema.optional(SensitiveString),
    server_idle_timeout: Schema.optional(Schema.Number),
    server_lifetime: Schema.optional(Schema.Number),
    query_wait_timeout: Schema.optional(Schema.Number),
    reserve_pool_size: Schema.optional(Schema.Number),
  });
export type V1GetProjectPgbouncerConfigOutput =
  typeof V1GetProjectPgbouncerConfigOutput.Type;

// The operation
/**
 * Get project's pgbouncer config
 *
 * @param ref - Project ref
 */
export const v1GetProjectPgbouncerConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetProjectPgbouncerConfigInput,
    outputSchema: V1GetProjectPgbouncerConfigOutput,
  }),
);
