import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const PostV1ConnectionsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    databaseId: Schema.String,
    name: Schema.String,
  },
).pipe(T.Http({ method: "POST", path: "/v1/connections" }));
export type PostV1ConnectionsInput = typeof PostV1ConnectionsInput.Type;

// Output Schema
export const PostV1ConnectionsOutput =
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
      connectionString: SensitiveString,
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
export type PostV1ConnectionsOutput = typeof PostV1ConnectionsOutput.Type;

// The operation
/**
 * Create connection
 *
 * Creates a new connection for the specified database.
 */
export const postV1Connections = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostV1ConnectionsInput,
  outputSchema: PostV1ConnectionsOutput,
}));
