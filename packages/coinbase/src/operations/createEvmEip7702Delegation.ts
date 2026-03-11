import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateEvmEip7702DelegationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    address: Schema.String.pipe(T.PathParam()),
    network: Schema.Literals([
      "base-sepolia",
      "base",
      "arbitrum",
      "optimism",
      "polygon",
      "ethereum",
      "ethereum-sepolia",
    ]),
    enableSpendPermissions: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v2/evm/accounts/{address}/eip7702/delegation",
    }),
  );
export type CreateEvmEip7702DelegationInput =
  typeof CreateEvmEip7702DelegationInput.Type;

// Output Schema
export const CreateEvmEip7702DelegationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    delegationOperationId: Schema.String,
  });
export type CreateEvmEip7702DelegationOutput =
  typeof CreateEvmEip7702DelegationOutput.Type;

// The operation
/**
 * Create EIP-7702 delegation
 *
 * Creates an EIP-7702 delegation for an EVM EOA account, upgrading it with smart account capabilities.
 * This endpoint:
 * - Retrieves delegation artifacts from onchain
 * - Signs the EIP-7702 authorization for delegation
 * - Assembles and submits a Type 4 transaction
 * - Creates an associated smart account object
 * The delegation allows the EVM EOA to be used as a smart account, which enables batched transactions and gas sponsorship via paymaster.
 *
 * @param X-Wallet-Auth - A JWT signed using your Wallet Secret, encoded in base64. Refer to the
[Generate Wallet Token](https://docs.cdp.coinbase.com/api-reference/v2/authentication#2-generate-wallet-token)
section of our Authentication docs for more details on how to generate your Wallet Token.

 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param address - The 0x-prefixed address of the EVM account to delegate.
 */
export const createEvmEip7702Delegation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateEvmEip7702DelegationInput,
    outputSchema: CreateEvmEip7702DelegationOutput,
  }),
);
