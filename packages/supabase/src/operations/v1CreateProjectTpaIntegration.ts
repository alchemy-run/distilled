import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CreateProjectTpaIntegrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    oidc_issuer_url: Schema.optional(Schema.String),
    jwks_url: Schema.optional(Schema.String),
    custom_jwks: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/config/auth/third-party-auth",
    }),
  );
export type V1CreateProjectTpaIntegrationInput =
  typeof V1CreateProjectTpaIntegrationInput.Type;

// Output Schema
export const V1CreateProjectTpaIntegrationOutput =
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
export type V1CreateProjectTpaIntegrationOutput =
  typeof V1CreateProjectTpaIntegrationOutput.Type;

// The operation
/**
 * Creates a new third-party auth integration
 *
 * @param ref - Project ref
 */
export const v1CreateProjectTpaIntegration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1CreateProjectTpaIntegrationInput,
    outputSchema: V1CreateProjectTpaIntegrationOutput,
  }));
