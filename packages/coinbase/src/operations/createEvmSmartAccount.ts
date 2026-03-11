import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateEvmSmartAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    owners: Schema.Array(Schema.String),
    name: Schema.optional(Schema.String),
  }).pipe(T.Http({ method: "POST", path: "/v2/evm/smart-accounts" }));
export type CreateEvmSmartAccountInput = typeof CreateEvmSmartAccountInput.Type;

// Output Schema
export const CreateEvmSmartAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    address: Schema.String,
    owners: Schema.Array(Schema.String),
    name: Schema.optional(Schema.String),
    policies: Schema.optional(Schema.Array(Schema.String)),
    createdAt: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
  });
export type CreateEvmSmartAccountOutput =
  typeof CreateEvmSmartAccountOutput.Type;

// The operation
/**
 * Create a Smart Account
 *
 * Creates a new Smart Account.
 *
 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 */
export const createEvmSmartAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateEvmSmartAccountInput,
    outputSchema: CreateEvmSmartAccountOutput,
  }),
);
