import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetAppsSecretsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  scope: Schema.String,
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/apps/secrets",
    contentType: "form-urlencoded",
  }),
);
export type GetAppsSecretsInput = typeof GetAppsSecretsInput.Type;

// Output Schema
export const GetAppsSecretsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetAppsSecretsOutput = typeof GetAppsSecretsOutput.Type;

// The operation
/**
 * List secrets
 *
 * <p>List all secrets stored on the given scope.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param scope - Specifies the scoping of the secret. Requests originating from UI extensions can only access account-scoped secrets or secrets scoped to their own user.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetAppsSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetAppsSecretsInput,
  outputSchema: GetAppsSecretsOutput,
}));
