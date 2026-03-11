import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetEvmEip7702DelegationOperationByIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    delegationOperationId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v2/evm/eip7702/delegation-operations/{delegationOperationId}",
    }),
  );
export type GetEvmEip7702DelegationOperationByIdInput =
  typeof GetEvmEip7702DelegationOperationByIdInput.Type;

// Output Schema
export const GetEvmEip7702DelegationOperationByIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    delegationOperationId: Schema.String,
    status: Schema.Literals([
      "UNSPECIFIED",
      "PENDING",
      "SUBMITTED",
      "COMPLETED",
      "FAILED",
    ]),
    transactionHash: Schema.optional(Schema.String),
    network: Schema.Literals([
      "base-sepolia",
      "base",
      "arbitrum",
      "optimism",
      "polygon",
      "ethereum",
      "ethereum-sepolia",
    ]),
    delegateAddress: Schema.optional(Schema.String),
  });
export type GetEvmEip7702DelegationOperationByIdOutput =
  typeof GetEvmEip7702DelegationOperationByIdOutput.Type;

// The operation
/**
 * Get EIP-7702 delegation operation for an operationID
 *
 * Returns the EIP-7702 delegation operation. Use the delegationOperationId returned by the Create EIP-7702 delegation endpoint to poll for operation completion.
 *
 * @param delegationOperationId - The unique identifier for the delegation operation.
 */
export const getEvmEip7702DelegationOperationById =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetEvmEip7702DelegationOperationByIdInput,
    outputSchema: GetEvmEip7702DelegationOperationByIdOutput,
  }));
