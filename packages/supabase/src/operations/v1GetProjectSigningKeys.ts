import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetProjectSigningKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/projects/{ref}/config/auth/signing-keys",
    }),
  );
export type V1GetProjectSigningKeysInput =
  typeof V1GetProjectSigningKeysInput.Type;

// Output Schema
export const V1GetProjectSigningKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keys: Schema.Array(
      Schema.Struct({
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
      }),
    ),
  });
export type V1GetProjectSigningKeysOutput =
  typeof V1GetProjectSigningKeysOutput.Type;

// The operation
/**
 * List all signing keys for the project
 *
 * @param ref - Project ref
 */
export const v1GetProjectSigningKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetProjectSigningKeysInput,
    outputSchema: V1GetProjectSigningKeysOutput,
  }),
);
