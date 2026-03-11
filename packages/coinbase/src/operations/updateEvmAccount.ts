import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateEvmAccountInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  name: Schema.optional(Schema.String),
  accountPolicy: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "PUT", path: "/v2/evm/accounts/{address}" }));
export type UpdateEvmAccountInput = typeof UpdateEvmAccountInput.Type;

// Output Schema
export const UpdateEvmAccountOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    address: Schema.String,
    name: Schema.optional(Schema.String),
    policies: Schema.optional(Schema.Array(Schema.String)),
    createdAt: Schema.optional(Schema.String),
    updatedAt: Schema.optional(Schema.String),
  },
);
export type UpdateEvmAccountOutput = typeof UpdateEvmAccountOutput.Type;

// The operation
/**
 * Update an EVM account
 *
 * Updates an existing EVM account. Use this to update the account's name or account-level policy.
 *
 * @param X-Idempotency-Key - An optional string request header for making requests safely retryable.
When included, duplicate requests with the same key will return identical responses.
Refer to our [Idempotency docs](https://docs.cdp.coinbase.com/api-reference/v2/idempotency) for more information on using idempotency keys.

 * @param address - The 0x-prefixed address of the EVM account. The address does not need to be checksummed.
 */
export const updateEvmAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateEvmAccountInput,
  outputSchema: UpdateEvmAccountOutput,
}));
