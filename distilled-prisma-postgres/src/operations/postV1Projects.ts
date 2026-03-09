import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1ProjectsInput = Schema.Struct({
  createDatabase: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  region: Schema.optional(
    Schema.Literals([
      "us-east-1",
      "us-west-1",
      "eu-west-3",
      "eu-central-1",
      "ap-northeast-1",
      "ap-southeast-1",
    ]),
  ),
}).pipe(T.Http({ method: "POST", path: "/v1/projects" }));
export type PostV1ProjectsInput = typeof PostV1ProjectsInput.Type;

// Output Schema
export const PostV1ProjectsOutput = Schema.Struct({
  data: Schema.Struct({
    id: Schema.String,
    type: Schema.Literal("project"),
    url: Schema.String,
    name: Schema.String,
    createdAt: Schema.String,
    defaultRegion: Schema.NullOr(Schema.String),
    workspace: Schema.Struct({
      id: Schema.String,
      url: Schema.String,
      name: Schema.String,
    }),
    database: Schema.NullOr(
      Schema.Struct({
        id: Schema.String,
        type: Schema.Literal("database"),
        url: Schema.String,
        name: Schema.String,
        status: Schema.Literals(["provisioning", "ready"]),
        createdAt: Schema.String,
        isDefault: Schema.Boolean,
        defaultConnectionId: Schema.NullOr(Schema.String),
        connections: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            type: Schema.Literal("connection"),
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
        region: Schema.Struct({
          id: Schema.String,
          name: Schema.String,
        }),
        apiKeys: Schema.Array(
          Schema.Struct({
            id: Schema.String,
            type: Schema.Literal("connection"),
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
    ),
  }),
});
export type PostV1ProjectsOutput = typeof PostV1ProjectsOutput.Type;

// The operation
/**
 * Create project with a postgres database
 *
 * Creates a new project with a postgres database.
 */
export const postV1Projects = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostV1ProjectsInput,
  outputSchema: PostV1ProjectsOutput,
}));
