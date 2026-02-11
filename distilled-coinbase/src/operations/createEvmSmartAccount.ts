import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest, PaymentMethodRequired } from "../errors";

// Input Schema
export const CreateEvmSmartAccountInput = Schema.Struct({
  owners: Schema.Array(Schema.String),
  name: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/v2/evm/smart-accounts" }));
export type CreateEvmSmartAccountInput = typeof CreateEvmSmartAccountInput.Type;

// Output Schema
export const CreateEvmSmartAccountOutput = Schema.Struct({
  address: Schema.String,
  owners: Schema.Array(Schema.String),
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.String)),
  createdAt: Schema.optional(Schema.String),
  updatedAt: Schema.optional(Schema.String),
});
export type CreateEvmSmartAccountOutput = typeof CreateEvmSmartAccountOutput.Type;

// The operation
/**
 * Create a Smart Account
 *
 * Creates a new Smart Account.
 */
export const createEvmSmartAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateEvmSmartAccountInput,
  outputSchema: CreateEvmSmartAccountOutput,
  errors: [InvalidRequest, PaymentMethodRequired],
}));
