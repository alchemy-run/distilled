import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateEndUserInput = Schema.Struct({
  userId: Schema.optional(Schema.String),
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
  evmAccount: Schema.optional(Schema.Struct({
    createSmartAccount: Schema.optional(Schema.Boolean),
    enableSpendPermissions: Schema.optional(Schema.Boolean),
  })),
  solanaAccount: Schema.optional(Schema.Struct({
    createSmartAccount: Schema.optional(Schema.Boolean),
  })),
}).pipe(T.Http({ method: "POST", path: "/v2/end-users" }), T.WalletAuth());
export type CreateEndUserInput = typeof CreateEndUserInput.Type;

// Output Schema
export const CreateEndUserOutput = Schema.Struct({
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
export type CreateEndUserOutput = typeof CreateEndUserOutput.Type;

// The operation
/**
 * Create an end user
 *
 * Creates an end user. An end user is an entity that can own CDP EVM accounts, EVM smart accounts, and/or Solana accounts. 1 or more authentication methods must be associated with an end user. By default, no accounts are created unless the optional `evmAccount` and/or `solanaAccount` fields are provided.
 * This API is intended to be used by the developer's own backend, and is authenticated using the developer's CDP API key.
 */
export const createEndUser = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateEndUserInput,
  outputSchema: CreateEndUserOutput,
  walletAuth: true,
}));
