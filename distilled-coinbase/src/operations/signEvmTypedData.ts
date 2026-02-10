import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignEvmTypedDataInput = Schema.Struct({
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
}).pipe(T.Http({ method: "POST", path: "/v2/evm/accounts/{address}/sign/typed-data" }), T.WalletAuth());
export type SignEvmTypedDataInput = typeof SignEvmTypedDataInput.Type;

// Output Schema
export const SignEvmTypedDataOutput = Schema.Struct({
  signature: Schema.String,
});
export type SignEvmTypedDataOutput = typeof SignEvmTypedDataOutput.Type;

// The operation
/**
 * Sign EIP-712 typed data
 *
 * Signs [EIP-712](https://eips.ethereum.org/EIPS/eip-712) typed data with the given EVM account.
 *
 * @param address - The 0x-prefixed address of the EVM account.
 */
export const signEvmTypedData = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignEvmTypedDataInput,
  outputSchema: SignEvmTypedDataOutput,
  walletAuth: true,
}));
