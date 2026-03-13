import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const PostV1ConnectionsByIdRotateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "POST", path: "/v1/connections/{id}/rotate" }));
export type PostV1ConnectionsByIdRotateInput =
  typeof PostV1ConnectionsByIdRotateInput.Type;

// Output Schema
export const PostV1ConnectionsByIdRotateOutput =
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
            connectionString: SensitiveString,
          }),
        ),
        pooled: Schema.optional(
          Schema.Struct({
            host: Schema.String,
            port: Schema.Number,
            connectionString: SensitiveString,
          }),
        ),
        accelerate: Schema.optional(
          Schema.Struct({
            host: Schema.String,
            port: Schema.Number,
            connectionString: SensitiveString,
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
export type PostV1ConnectionsByIdRotateOutput =
  typeof PostV1ConnectionsByIdRotateOutput.Type;

// The operation
/**
 * Rotate connection credentials
 *
 * Generates new credentials for the connection with the given ID. Revocation of the previous credentials is best-effort.
 */
export const postV1ConnectionsByIdRotate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostV1ConnectionsByIdRotateInput,
    outputSchema: PostV1ConnectionsByIdRotateOutput,
  }),
);
