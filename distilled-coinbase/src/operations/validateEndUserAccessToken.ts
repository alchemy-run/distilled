import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ValidateEndUserAccessTokenInput = Schema.Struct({
  accessToken: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/end-users/auth/validate-token" }));
export type ValidateEndUserAccessTokenInput = typeof ValidateEndUserAccessTokenInput.Type;

// Output Schema
export const ValidateEndUserAccessTokenOutput = Schema.Struct({
  userId: Schema.String,
  authenticationMethods: Schema.Array(Schema.Union(Schema.Struct({
    type: Schema.Literal("email"),
    email: Schema.String,
  }), Schema.Struct({
    type: Schema.Literal("sms"),
    phoneNumber: Schema.String,
  }), Schema.Struct({
    type: Schema.Literal("jwt"),
    kid: Schema.String,
    sub: Schema.String,
  }), Schema.Struct({
    type: Schema.Literal("google", "apple", "x"),
    sub: Schema.String,
    email: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    username: Schema.optional(Schema.String),
  }))),
  mfaMethods: Schema.optional(Schema.Struct({
    enrollmentPromptedAt: Schema.optional(Schema.String),
    totp: Schema.optional(Schema.Struct({
      enrolledAt: Schema.String,
    })),
    sms: Schema.optional(Schema.Struct({
      enrolledAt: Schema.String,
    })),
  })),
  evmAccounts: Schema.Array(Schema.String),
  evmAccountObjects: Schema.Array(Schema.Struct({
    address: Schema.String,
    createdAt: Schema.String,
  })),
  evmSmartAccounts: Schema.Array(Schema.String),
  evmSmartAccountObjects: Schema.Array(Schema.Struct({
    address: Schema.String,
    ownerAddresses: Schema.Array(Schema.String),
    createdAt: Schema.String,
  })),
  solanaAccounts: Schema.Array(Schema.String),
  solanaAccountObjects: Schema.Array(Schema.Struct({
    address: Schema.String,
    createdAt: Schema.String,
  })),
  createdAt: Schema.String,
});
export type ValidateEndUserAccessTokenOutput = typeof ValidateEndUserAccessTokenOutput.Type;

// The operation
/**
 * Validate end user access token
 *
 * Validates the end user's access token and returns the end user's information. Returns an error if the access token is invalid or expired.
 * This API is intended to be used by the developer's own backend, and is authenticated using the developer's CDP API key.
 */
export const validateEndUserAccessToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ValidateEndUserAccessTokenInput,
  outputSchema: ValidateEndUserAccessTokenOutput,
}));
