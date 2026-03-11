import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1CreateProjectSigningKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    algorithm: Schema.Literals(["EdDSA", "ES256", "RS256", "HS256"]),
    status: Schema.optional(Schema.Literals(["in_use", "standby"])),
    private_jwk: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/projects/{ref}/config/auth/signing-keys",
    }),
  );
export type V1CreateProjectSigningKeyInput =
  typeof V1CreateProjectSigningKeyInput.Type;

// Output Schema
export const V1CreateProjectSigningKeyOutput =
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
export type V1CreateProjectSigningKeyOutput =
  typeof V1CreateProjectSigningKeyOutput.Type;

// The operation
/**
 * Create a new signing key for the project in standby status
 *
 * @param ref - Project ref
 */
export const v1CreateProjectSigningKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1CreateProjectSigningKeyInput,
    outputSchema: V1CreateProjectSigningKeyOutput,
  }),
);
