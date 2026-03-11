import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1DatabasesByDatabaseIdConnectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    databaseId: Schema.String.pipe(T.PathParam()),
    cursor: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/databases/{databaseId}/connections" }),
  );
export type GetV1DatabasesByDatabaseIdConnectionsInput =
  typeof GetV1DatabasesByDatabaseIdConnectionsInput.Type;

// Output Schema
export const GetV1DatabasesByDatabaseIdConnectionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        type: Schema.String,
        url: Schema.String,
        name: Schema.String,
        createdAt: Schema.String,
        kind: Schema.Literals(["postgres", "accelerate"]),
        endpoints: Schema.Struct({
          direct: Schema.optional(
            Schema.Struct({
              host: Schema.String,
              port: Schema.Number,
            }),
          ),
          pooled: Schema.optional(
            Schema.Struct({
              host: Schema.String,
              port: Schema.Number,
            }),
          ),
          accelerate: Schema.optional(
            Schema.Struct({
              host: Schema.String,
              port: Schema.Number,
            }),
          ),
        }),
        directConnection: Schema.optional(
          Schema.NullOr(
            Schema.Struct({
              host: Schema.String,
              pass: Schema.String,
              user: Schema.String,
            }),
          ),
        ),
        database: Schema.Struct({
          id: Schema.String,
          url: Schema.String,
          name: Schema.String,
        }),
      }),
    ),
    pagination: Schema.Struct({
      nextCursor: Schema.NullOr(Schema.String),
      hasMore: Schema.Boolean,
    }),
  });
export type GetV1DatabasesByDatabaseIdConnectionsOutput =
  typeof GetV1DatabasesByDatabaseIdConnectionsOutput.Type;

// The operation
/**
 * Get list of database connections
 *
 * Returns all connections for the given database.
 */
export const getV1DatabasesByDatabaseIdConnections =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV1DatabasesByDatabaseIdConnectionsInput,
    outputSchema: GetV1DatabasesByDatabaseIdConnectionsOutput,
  }));
