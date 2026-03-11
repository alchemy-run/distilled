import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1DatabasesByDatabaseIdConnectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    databaseId: Schema.String.pipe(T.PathParam()),
    name: Schema.String,
  }).pipe(
    T.Http({ method: "POST", path: "/v1/databases/{databaseId}/connections" }),
  );
export type PostV1DatabasesByDatabaseIdConnectionsInput =
  typeof PostV1DatabasesByDatabaseIdConnectionsInput.Type;

// Output Schema
export const PostV1DatabasesByDatabaseIdConnectionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Struct({
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
            connectionString: Schema.String,
          }),
        ),
        pooled: Schema.optional(
          Schema.Struct({
            host: Schema.String,
            port: Schema.Number,
            connectionString: Schema.String,
          }),
        ),
        accelerate: Schema.optional(
          Schema.Struct({
            host: Schema.String,
            port: Schema.Number,
            connectionString: Schema.String,
          }),
        ),
      }),
      connectionString: Schema.String,
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
      host: Schema.NullOr(Schema.String),
      pass: Schema.NullOr(Schema.String),
      user: Schema.NullOr(Schema.String),
    }),
  });
export type PostV1DatabasesByDatabaseIdConnectionsOutput =
  typeof PostV1DatabasesByDatabaseIdConnectionsOutput.Type;

// The operation
/**
 * Create database connection string
 *
 * Creates a new connection string for the given database.
 */
export const postV1DatabasesByDatabaseIdConnections =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV1DatabasesByDatabaseIdConnectionsInput,
    outputSchema: PostV1DatabasesByDatabaseIdConnectionsOutput,
  }));
