import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1DatabasesByDatabaseIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    databaseId: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/databases/{databaseId}" }));
export type GetV1DatabasesByDatabaseIdInput =
  typeof GetV1DatabasesByDatabaseIdInput.Type;

// Output Schema
export const GetV1DatabasesByDatabaseIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Struct({
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
  });
export type GetV1DatabasesByDatabaseIdOutput =
  typeof GetV1DatabasesByDatabaseIdOutput.Type;

// The operation
/**
 * Get database
 *
 * Returns the database with the given ID.
 */
export const getV1DatabasesByDatabaseId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetV1DatabasesByDatabaseIdInput,
    outputSchema: GetV1DatabasesByDatabaseIdOutput,
  }),
);
