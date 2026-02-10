import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SignSolanaTransactionInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  transaction: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/v2/solana/accounts/{address}/sign/transaction" }), T.WalletAuth());
export type SignSolanaTransactionInput = typeof SignSolanaTransactionInput.Type;

// Output Schema
export const SignSolanaTransactionOutput = Schema.Struct({
  signedTransaction: Schema.String,
});
export type SignSolanaTransactionOutput = typeof SignSolanaTransactionOutput.Type;

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
 * @param address - The base58 encoded address of the Solana account.
 */
export const signSolanaTransaction = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SignSolanaTransactionInput,
  outputSchema: SignSolanaTransactionOutput,
  walletAuth: true,
}));
