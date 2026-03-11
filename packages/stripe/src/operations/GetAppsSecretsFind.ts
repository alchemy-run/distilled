import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetAppsSecretsFindInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.String),
    name: Schema.String,
    scope: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/apps/secrets/find",
      contentType: "form-urlencoded",
    }),
  );
export type GetAppsSecretsFindInput = typeof GetAppsSecretsFindInput.Type;

// Output Schema
export const GetAppsSecretsFindOutput =
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
export type GetAppsSecretsFindOutput = typeof GetAppsSecretsFindOutput.Type;

// The operation
/**
 * Find a Secret
 *
 * <p>Finds a secret in the secret store by name and scope.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param name - A name for the secret that's unique within the scope.
 * @param scope - Specifies the scoping of the secret. Requests originating from UI extensions can only access account-scoped secrets or secrets scoped to their own user.
 */
export const GetAppsSecretsFind = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetAppsSecretsFindInput,
  outputSchema: GetAppsSecretsFindOutput,
}));
