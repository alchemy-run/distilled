import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostAppsSecretsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.String,
    scope: Schema.Struct({
      type: Schema.Literals(["account", "user"]),
      user: Schema.optional(Schema.String),
    }),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/apps/secrets/delete",
      contentType: "form-urlencoded",
    }),
  );
export type PostAppsSecretsDeleteInput = typeof PostAppsSecretsDeleteInput.Type;

// Output Schema
export const PostAppsSecretsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    deleted: Schema.optional(Schema.Boolean),
    expires_at: Schema.NullOr(Schema.Number),
    id: Schema.String,
    livemode: Schema.Boolean,
    name: Schema.String,
    object: Schema.Literals(["apps.secret"]),
    payload: Schema.optional(Schema.NullOr(Schema.String)),
    scope: Schema.Struct({
      type: Schema.Literals(["account", "user"]),
      user: Schema.optional(Schema.String),
    }),
  });
export type PostAppsSecretsDeleteOutput =
  typeof PostAppsSecretsDeleteOutput.Type;

// The operation
/**
 * Delete a Secret
 *
 * <p>Deletes a secret from the secret store by name and scope.</p>
 */
export const PostAppsSecretsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostAppsSecretsDeleteInput,
    outputSchema: PostAppsSecretsDeleteOutput,
  }),
);
