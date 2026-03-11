import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectSigningKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/config/auth/signing-keys/{id}",
    }),
  );
export type V1GetProjectSigningKeyInput =
  typeof V1GetProjectSigningKeyInput.Type;

// Output Schema
export const V1GetProjectSigningKeyOutput =
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
export type V1GetProjectSigningKeyOutput =
  typeof V1GetProjectSigningKeyOutput.Type;

// The operation
/**
 * Get information about a signing key
 *
 * @param ref - Project ref
 */
export const v1GetProjectSigningKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetProjectSigningKeyInput,
    outputSchema: V1GetProjectSigningKeyOutput,
  }),
);
