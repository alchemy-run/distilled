import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdateProjectSigningKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    ref: Schema.String.pipe(T.PathParam()),
    status: Schema.Literals([
      "in_use",
      "previously_used",
      "revoked",
      "standby",
    ]),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/v1/projects/{ref}/config/auth/signing-keys/{id}",
    }),
  );
export type V1UpdateProjectSigningKeyInput =
  typeof V1UpdateProjectSigningKeyInput.Type;

// Output Schema
export const V1UpdateProjectSigningKeyOutput =
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
export type V1UpdateProjectSigningKeyOutput =
  typeof V1UpdateProjectSigningKeyOutput.Type;

// The operation
/**
 * Update a signing key, mainly its status
 *
 * @param ref - Project ref
 */
export const v1UpdateProjectSigningKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateProjectSigningKeyInput,
    outputSchema: V1UpdateProjectSigningKeyOutput,
  }),
);
