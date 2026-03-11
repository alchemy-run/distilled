import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ProjectsByProjectIdDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.PathParam()),
    cursor: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{projectId}/databases" }),
  );
export type GetV1ProjectsByProjectIdDatabasesInput =
  typeof GetV1ProjectsByProjectIdDatabasesInput.Type;

// Output Schema
export const GetV1ProjectsByProjectIdDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        type: Schema.String,
        url: Schema.String,
        name: Schema.String,
        status: Schema.Literals([
          "failure",
          "provisioning",
          "ready",
          "recovering",
        ]),
        createdAt: Schema.String,
        isDefault: Schema.Boolean,
        defaultConnectionId: Schema.NullOr(Schema.String),
        connections: Schema.Array(
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
        project: Schema.Struct({
          id: Schema.String,
          url: Schema.String,
          name: Schema.String,
        }),
        region: Schema.NullOr(
          Schema.Struct({
            id: Schema.String,
            name: Schema.String,
          }),
        ),
      }),
    ),
    pagination: Schema.Struct({
      nextCursor: Schema.NullOr(Schema.String),
      hasMore: Schema.Boolean,
    }),
  });
export type GetV1ProjectsByProjectIdDatabasesOutput =
  typeof GetV1ProjectsByProjectIdDatabasesOutput.Type;

// The operation
/**
 * Get list of databases
 *
 * Returns databases for the given project.
 */
export const getV1ProjectsByProjectIdDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetV1ProjectsByProjectIdDatabasesInput,
    outputSchema: GetV1ProjectsByProjectIdDatabasesOutput,
  }));
