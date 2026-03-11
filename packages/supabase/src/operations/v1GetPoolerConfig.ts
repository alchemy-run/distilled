import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetPoolerConfigInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    ref: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({ method: "GET", path: "/v1/projects/{ref}/config/database/pooler" }),
);
export type V1GetPoolerConfigInput = typeof V1GetPoolerConfigInput.Type;

// Output Schema
export const V1GetPoolerConfigOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    identifier: Schema.String,
    database_type: Schema.Literals(["PRIMARY", "READ_REPLICA"]),
    is_using_scram_auth: Schema.Boolean,
    db_user: Schema.String,
    db_host: Schema.String,
    db_port: Schema.Number,
    db_name: Schema.String,
    connection_string: Schema.String,
    connectionString: Schema.String,
    default_pool_size: Schema.NullOr(Schema.Number),
    max_client_conn: Schema.NullOr(Schema.Number),
    pool_mode: Schema.Literals(["transaction", "session"]),
  }),
);
export type V1GetPoolerConfigOutput = typeof V1GetPoolerConfigOutput.Type;

// The operation
/**
 * Gets project's supavisor config
 *
 * @param ref - Project ref
 */
export const v1GetPoolerConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetPoolerConfigInput,
  outputSchema: V1GetPoolerConfigOutput,
}));
