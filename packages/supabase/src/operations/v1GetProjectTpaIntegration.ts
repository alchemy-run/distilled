import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectTpaIntegrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    tpa_id: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/config/auth/third-party-auth/{tpa_id}",
    }),
  );
export type V1GetProjectTpaIntegrationInput =
  typeof V1GetProjectTpaIntegrationInput.Type;

// Output Schema
export const V1GetProjectTpaIntegrationOutput =
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
export type V1GetProjectTpaIntegrationOutput =
  typeof V1GetProjectTpaIntegrationOutput.Type;

// The operation
/**
 * Get a third-party integration
 *
 * @param ref - Project ref
 */
export const v1GetProjectTpaIntegration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetProjectTpaIntegrationInput,
    outputSchema: V1GetProjectTpaIntegrationOutput,
  }),
);
