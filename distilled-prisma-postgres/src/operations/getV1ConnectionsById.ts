import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1ConnectionsByIdInput = Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/connections/{id}" }));
export type GetV1ConnectionsByIdInput = typeof GetV1ConnectionsByIdInput.Type;

// Output Schema
export const GetV1ConnectionsByIdOutput = Schema.Struct({
  data: Schema.Struct({
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
});
export type GetV1ConnectionsByIdOutput = typeof GetV1ConnectionsByIdOutput.Type;

// The operation
/**
 * Get connection
 *
 * Returns the connection with the given ID.
 */
export const getV1ConnectionsById = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetV1ConnectionsByIdInput,
    outputSchema: GetV1ConnectionsByIdOutput,
  }),
);
