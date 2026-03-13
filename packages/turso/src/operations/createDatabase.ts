import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateDatabaseInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  name: Schema.String,
  group: Schema.String,
  seed: Schema.optional(
    Schema.Struct({
      type: Schema.optional(Schema.Literals(["database", "database_upload"])),
      name: Schema.optional(Schema.String),
      timestamp: Schema.optional(Schema.String),
    }),
  ),
  size_limit: Schema.optional(Schema.String),
  remote_encryption: Schema.optional(
    Schema.Struct({
      encryption_key: Schema.optional(Schema.String),
      encryption_cipher: Schema.optional(
        Schema.Literals([
          "aes256gcm",
          "aes128gcm",
          "chacha20poly1305",
          "aegis128l",
          "aegis128x2",
          "aegis128x4",
          "aegis256",
          "aegis256x2",
          "aegis256x4",
        ]),
      ),
    }),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/organizations/{organizationSlug}/databases",
  }),
);
export type CreateDatabaseInput = typeof CreateDatabaseInput.Type;

// Output Schema
export const CreateDatabaseOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  database: Schema.optional(
    Schema.Struct({
      DbId: Schema.optional(Schema.String),
      Hostname: Schema.optional(Schema.String),
      Name: Schema.optional(Schema.String),
    }),
  ),
});
export type CreateDatabaseOutput = typeof CreateDatabaseOutput.Type;

// The operation
/**
 * Create Database
 *
 * Creates a new database in a group for the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const createDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateDatabaseInput,
  outputSchema: CreateDatabaseOutput,
}));
