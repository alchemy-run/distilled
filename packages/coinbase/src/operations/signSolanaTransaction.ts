import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignSolanaTransactionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    address: Schema.String.pipe(T.PathParam()),
    transaction: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v2/solana/accounts/{address}/sign/transaction",
    }),
  );
export type SignSolanaTransactionInput = typeof SignSolanaTransactionInput.Type;

// Output Schema
export const SignSolanaTransactionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    signedTransaction: Schema.String,
  });
export type SignSolanaTransactionOutput =
  typeof SignSolanaTransactionOutput.Type;

// The operation
/**
 * Sign a transaction
 *
 * Signs a transaction with the given Solana account.
 * The unsigned transaction should be serialized into a byte array and then encoded as base64.
 * **Transaction types**
 * The following transaction types are supported:
 * * [Legacy transactions](https://solana-labs.github.io/solana-web3.js/classes/Transaction.html)
 * * [Versioned transactions](https://solana-labs.github.io/solana-web3.js/classes/VersionedTransaction.html)
 * The developer is responsible for ensuring that the unsigned transaction is valid, as the API will not validate the transaction.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param address - The base58 encoded address of the Solana account.
 */
export const signSolanaTransaction = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SignSolanaTransactionInput,
    outputSchema: SignSolanaTransactionOutput,
  }),
);
