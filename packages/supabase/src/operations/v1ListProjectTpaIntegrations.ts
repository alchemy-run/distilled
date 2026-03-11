import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListProjectTpaIntegrationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/config/auth/third-party-auth",
    }),
  );
export type V1ListProjectTpaIntegrationsInput =
  typeof V1ListProjectTpaIntegrationsInput.Type;

// Output Schema
export const V1ListProjectTpaIntegrationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.String,
      type: Schema.String,
      oidc_issuer_url: Schema.optional(Schema.NullOr(Schema.String)),
      jwks_url: Schema.optional(Schema.NullOr(Schema.String)),
      custom_jwks: Schema.optional(Schema.NullOr(Schema.Unknown)),
      resolved_jwks: Schema.optional(Schema.NullOr(Schema.Unknown)),
      inserted_at: Schema.String,
      updated_at: Schema.String,
      resolved_at: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  );
export type V1ListProjectTpaIntegrationsOutput =
  typeof V1ListProjectTpaIntegrationsOutput.Type;

// The operation
/**
 * Lists all third-party auth integrations
 *
 * @param ref - Project ref
 */
export const v1ListProjectTpaIntegrations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1ListProjectTpaIntegrationsInput,
    outputSchema: V1ListProjectTpaIntegrationsOutput,
  }));
