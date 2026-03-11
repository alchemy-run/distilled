import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteProjectTpaIntegrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    tpa_id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/projects/{ref}/config/auth/third-party-auth/{tpa_id}",
    }),
  );
export type V1DeleteProjectTpaIntegrationInput =
  typeof V1DeleteProjectTpaIntegrationInput.Type;

// Output Schema
export const V1DeleteProjectTpaIntegrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    type: Schema.String,
    oidc_issuer_url: Schema.optional(Schema.NullOr(Schema.String)),
    jwks_url: Schema.optional(Schema.NullOr(Schema.String)),
    custom_jwks: Schema.optional(Schema.NullOr(Schema.Unknown)),
    resolved_jwks: Schema.optional(Schema.NullOr(Schema.Unknown)),
    inserted_at: Schema.String,
    updated_at: Schema.String,
    resolved_at: Schema.optional(Schema.NullOr(Schema.String)),
  });
export type V1DeleteProjectTpaIntegrationOutput =
  typeof V1DeleteProjectTpaIntegrationOutput.Type;

// The operation
/**
 * Removes a third-party auth integration
 *
 * @param ref - Project ref
 */
export const v1DeleteProjectTpaIntegration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1DeleteProjectTpaIntegrationInput,
    outputSchema: V1DeleteProjectTpaIntegrationOutput,
  }));
