import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetLegacySigningKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/config/auth/signing-keys/legacy",
    }),
  );
export type V1GetLegacySigningKeyInput = typeof V1GetLegacySigningKeyInput.Type;

// Output Schema
export const V1GetLegacySigningKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    algorithm: Schema.Literals(["EdDSA", "ES256", "RS256", "HS256"]),
    status: Schema.Literals([
      "in_use",
      "previously_used",
      "revoked",
      "standby",
    ]),
    public_jwk: Schema.optional(Schema.NullOr(Schema.Unknown)),
    created_at: Schema.String,
    updated_at: Schema.String,
  });
export type V1GetLegacySigningKeyOutput =
  typeof V1GetLegacySigningKeyOutput.Type;

// The operation
/**
 * Get the signing key information for the JWT secret imported as signing key for this project. This endpoint will be removed in the future, check for HTTP 404 Not Found.
 *
 * @param ref - Project ref
 */
export const v1GetLegacySigningKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetLegacySigningKeyInput,
    outputSchema: V1GetLegacySigningKeyOutput,
  }),
);
