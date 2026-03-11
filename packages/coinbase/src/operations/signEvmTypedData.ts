import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignEvmTypedDataInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  domain: Schema.Struct({
    name: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    chainId: Schema.optional(Schema.Number),
    verifyingContract: Schema.optional(Schema.String),
    salt: Schema.optional(Schema.String),
  }),
  types: Schema.Unknown,
  primaryType: Schema.String,
  message: Schema.Unknown,
}).pipe(
  T.Http({
    method: "POST",
    path: "/v2/evm/accounts/{address}/sign/typed-data",
  }),
);
export type SignEvmTypedDataInput = typeof SignEvmTypedDataInput.Type;

// Output Schema
export const SignEvmTypedDataOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    signature: Schema.String,
  },
);
export type SignEvmTypedDataOutput = typeof SignEvmTypedDataOutput.Type;

// The operation
/**
 * Sign EIP-712 typed data
 *
 * Signs [EIP-712](https://eips.ethereum.org/EIPS/eip-712) typed data with the given EVM account.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param address - The 0x-prefixed address of the EVM account.
 */
export const signEvmTypedData = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignEvmTypedDataInput,
  outputSchema: SignEvmTypedDataOutput,
}));
