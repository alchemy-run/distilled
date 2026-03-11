import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1ProjectsByProjectIdDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    projectId: Schema.String.pipe(T.PathParam()),
    region: Schema.optional(
      Schema.Literals([
        "us-east-1",
        "us-west-1",
        "eu-west-3",
        "eu-central-1",
        "ap-northeast-1",
        "ap-southeast-1",
        "inherit",
      ]),
    ),
    name: Schema.optional(Schema.String),
    isDefault: Schema.optional(Schema.Boolean),
    fromDatabase: Schema.optional(
      Schema.Struct({
        id: Schema.String,
        backupId: Schema.optional(Schema.String),
      }),
    ),
  }).pipe(
    T.Http({ method: "POST", path: "/v1/projects/{projectId}/databases" }),
  );
export type PostV1ProjectsByProjectIdDatabasesInput =
  typeof PostV1ProjectsByProjectIdDatabasesInput.Type;

// Output Schema
export const PostV1ProjectsByProjectIdDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Struct({
      id: Schema.String,
      type: Schema.String,
      url: Schema.String,
      name: Schema.String,
      status: Schema.Literals(["provisioning", "ready"]),
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
                connectionString: Schema.optional(Schema.String),
              }),
            ),
            pooled: Schema.optional(
              Schema.Struct({
                host: Schema.String,
                port: Schema.Number,
                connectionString: Schema.optional(Schema.String),
              }),
            ),
            accelerate: Schema.optional(
              Schema.Struct({
                host: Schema.String,
                port: Schema.Number,
                connectionString: Schema.optional(Schema.String),
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
      region: Schema.Struct({
        id: Schema.String,
        name: Schema.String,
      }),
      apiKeys: Schema.Array(
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
        }),
      ),
      connectionString: Schema.NullOr(Schema.String),
      directConnection: Schema.NullOr(
        Schema.Struct({
          host: Schema.String,
          pass: Schema.String,
          user: Schema.String,
        }),
      ),
    }),
  });
export type PostV1ProjectsByProjectIdDatabasesOutput =
  typeof PostV1ProjectsByProjectIdDatabasesOutput.Type;

// The operation
/**
 * Create database
 *
 * Creates a new database for the given project.
 */
export const postV1ProjectsByProjectIdDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV1ProjectsByProjectIdDatabasesInput,
    outputSchema: PostV1ProjectsByProjectIdDatabasesOutput,
  }));
