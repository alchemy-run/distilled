import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PatchV1DatabasesByDatabaseIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    databaseId: Schema.String.pipe(T.PathParam()),
    name: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "PATCH", path: "/v1/databases/{databaseId}" }));
export type PatchV1DatabasesByDatabaseIdInput =
  typeof PatchV1DatabasesByDatabaseIdInput.Type;

// Output Schema
export const PatchV1DatabasesByDatabaseIdOutput =
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
export type PatchV1DatabasesByDatabaseIdOutput =
  typeof PatchV1DatabasesByDatabaseIdOutput.Type;

// The operation
/**
 * Update database
 *
 * Updates the database with the given ID.
 */
export const patchV1DatabasesByDatabaseId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PatchV1DatabasesByDatabaseIdInput,
    outputSchema: PatchV1DatabasesByDatabaseIdOutput,
  }));
