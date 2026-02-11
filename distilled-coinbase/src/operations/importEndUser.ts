import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { AlreadyExists, IdempotencyError, InvalidRequest, PaymentMethodRequired } from "../errors";

// Input Schema
export const ImportEndUserInput = Schema.Struct({
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
  encryptedPrivateKey: Schema.String,
  keyType: Schema.Literal("evm", "solana"),
}).pipe(T.Http({ method: "POST", path: "/v2/end-users/import" }), T.WalletAuth());
export type ImportEndUserInput = typeof ImportEndUserInput.Type;

// Output Schema
export const ImportEndUserOutput = Schema.Struct({
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
export type ImportEndUserOutput = typeof ImportEndUserOutput.Type;

// The operation
/**
 * Import a private key for an end user
 *
 * Imports an existing private key for an end user into the developer's CDP Project. The private key must be encrypted using the CDP SDK's encryption scheme before being sent to this endpoint. This API should be called from the [CDP SDK](https://github.com/coinbase/cdp-sdk) to ensure that the associated private key is properly encrypted.
 * This endpoint allows developers to import existing keys for their end users, supporting both EVM and Solana key types. The end user must have at least one authentication method configured.
 */
export const importEndUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ImportEndUserInput,
  outputSchema: ImportEndUserOutput,
  errors: [AlreadyExists, IdempotencyError, InvalidRequest, PaymentMethodRequired],
  walletAuth: true,
}));
