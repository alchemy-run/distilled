import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignEvmTransactionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    address: Schema.String.pipe(T.PathParam()),
    transaction: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v2/evm/accounts/{address}/sign/transaction",
    }),
  );
export type SignEvmTransactionInput = typeof SignEvmTransactionInput.Type;

// Output Schema
export const SignEvmTransactionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    signedTransaction: Schema.String,
  });
export type SignEvmTransactionOutput = typeof SignEvmTransactionOutput.Type;

// The operation
/**
 * Sign a transaction
 *
 * Signs a transaction with the given EVM account.
 * The transaction should be serialized as a hex string using [RLP](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/).
 * The transaction must be an [EIP-1559 dynamic fee transaction](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md). The developer is responsible for ensuring that the unsigned transaction is valid, as the API will not validate the transaction.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param address - The 0x-prefixed address of the EVM account.
 */
export const signEvmTransaction = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignEvmTransactionInput,
  outputSchema: SignEvmTransactionOutput,
}));
