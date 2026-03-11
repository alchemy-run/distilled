import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateEvmAccountInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  accountPolicy: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts" }));
export type CreateEvmAccountInput = typeof CreateEvmAccountInput.Type;

// Output Schema
export const CreateEvmAccountOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    address: Schema.String,
    name: Schema.optional(Schema.String),
    policies: Schema.optional(Schema.Array(Schema.String)),
    createdAt: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
  },
);
export type CreateEvmAccountOutput = typeof CreateEvmAccountOutput.Type;

// The operation
/**
 * Create an EVM account
 *
 * Creates a new EVM account.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 */
export const createEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateEvmAccountInput,
  outputSchema: CreateEvmAccountOutput,
}));
