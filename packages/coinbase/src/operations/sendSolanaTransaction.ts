import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SendSolanaTransactionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    network: Schema.Literals(["solana", "solana-devnet"]),
    transaction: Schema.String,
  }).pipe(
    T.Http({ method: "POST", path: "/v2/solana/accounts/send/transaction" }),
  );
export type SendSolanaTransactionInput = typeof SendSolanaTransactionInput.Type;

// Output Schema
export const SendSolanaTransactionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    transactionSignature: Schema.String,
  });
export type SendSolanaTransactionOutput =
  typeof SendSolanaTransactionOutput.Type;

// The operation
/**
 * Send a Solana transaction
 *
 * Signs and sends a single Solana transaction using multiple Solana accounts. The transaction may contain contain several instructions, each of which may require signatures from different account keys.
 * The transaction should be serialized into a byte array and base64 encoded. The API handles recent blockhash management and fee estimation, leaving the developer to provide only the minimal set of fields necessary to send the transaction.
 * **Transaction types**
 * The following transaction types are supported:
 * * [Legacy transactions](https://solana.com/developers/guides/advanced/versions#current-transaction-versions)
 * * [Versioned transactions](https://solana.com/developers/guides/advanced/versions)
 * **Instruction Batching**
 * To batch multiple operations, include multiple instructions within a single transaction. All instructions within a transaction are executed atomically - if any instruction fails, the entire transaction fails and is rolled back.
 * **Network Support**
 * The following Solana networks are supported:
 * * `solana` - Solana Mainnet
 * * `solana-devnet` - Solana Devnet
 * The developer is responsible for ensuring that the unsigned transaction is valid, as the API will not validate the transaction.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 */
export const sendSolanaTransaction = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SendSolanaTransactionInput,
    outputSchema: SendSolanaTransactionOutput,
  }),
);
