import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CreateLegacySigningKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/config/auth/signing-keys/legacy",
    }),
  );
export type V1CreateLegacySigningKeyInput =
  typeof V1CreateLegacySigningKeyInput.Type;

// Output Schema
export const V1CreateLegacySigningKeyOutput =
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
export type V1CreateLegacySigningKeyOutput =
  typeof V1CreateLegacySigningKeyOutput.Type;

// The operation
/**
 * Set up the project's existing JWT secret as an in_use JWT signing key. This endpoint will be removed in the future always check for HTTP 404 Not Found.
 *
 * @param ref - Project ref
 */
export const v1CreateLegacySigningKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1CreateLegacySigningKeyInput,
    outputSchema: V1CreateLegacySigningKeyOutput,
  }),
);
