import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ConnectionsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  databaseId: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v1/connections" }));
export type GetV1ConnectionsInput = typeof GetV1ConnectionsInput.Type;

// Output Schema
export const GetV1ConnectionsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
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
  },
);
export type GetV1ConnectionsOutput = typeof GetV1ConnectionsOutput.Type;

// The operation
/**
 * List connections
 *
 * Returns all connections the actor has access to, with optional database filter.
 */
export const getV1Connections = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV1ConnectionsInput,
  outputSchema: GetV1ConnectionsOutput,
}));
