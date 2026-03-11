import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostAppsSecretsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  expand: Schema.optional(Schema.Array(Schema.String)),
  expires_at: Schema.optional(Schema.Number),
  name: Schema.String,
  payload: Schema.String,
  scope: Schema.Struct({
    type: Schema.Literals(["account", "user"]),
    user: Schema.optional(Schema.String),
  }),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/apps/secrets",
    contentType: "form-urlencoded",
  }),
);
export type PostAppsSecretsInput = typeof PostAppsSecretsInput.Type;

// Output Schema
export const PostAppsSecretsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostAppsSecretsOutput = typeof PostAppsSecretsOutput.Type;

// The operation
/**
 * Set a Secret
 *
 * <p>Create or replace a secret in the secret store.</p>
 */
export const PostAppsSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostAppsSecretsInput,
  outputSchema: PostAppsSecretsOutput,
}));
