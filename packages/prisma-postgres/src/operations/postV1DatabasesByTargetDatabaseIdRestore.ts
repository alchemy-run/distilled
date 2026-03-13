import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV1DatabasesByTargetDatabaseIdRestoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    targetDatabaseId: Schema.String.pipe(T.PathParam()),
    source: Schema.Struct({
      type: Schema.String,
      databaseId: Schema.String,
      backupId: Schema.String,
    }),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/databases/{targetDatabaseId}/restore",
    }),
  );
export type PostV1DatabasesByTargetDatabaseIdRestoreInput =
  typeof PostV1DatabasesByTargetDatabaseIdRestoreInput.Type;

// Output Schema
export const PostV1DatabasesByTargetDatabaseIdRestoreOutput =
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
      source: Schema.Struct({
        type: Schema.String,
        databaseId: Schema.String,
        backupId: Schema.String,
      }),
    }),
  });
export type PostV1DatabasesByTargetDatabaseIdRestoreOutput =
  typeof PostV1DatabasesByTargetDatabaseIdRestoreOutput.Type;

// The operation
/**
 * Restore database
 *
 * Replaces the data in an existing database from a backup. Connections and credentials are preserved — only the data layer is replaced. Cannot be used on default databases.
 */
export const postV1DatabasesByTargetDatabaseIdRestore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV1DatabasesByTargetDatabaseIdRestoreInput,
    outputSchema: PostV1DatabasesByTargetDatabaseIdRestoreOutput,
  }));
