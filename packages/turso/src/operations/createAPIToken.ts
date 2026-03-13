import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateAPITokenInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tokenName: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "POST", path: "/v1/auth/api-tokens/{tokenName}" }));
export type CreateAPITokenInput = typeof CreateAPITokenInput.Type;

// Output Schema
export const CreateAPITokenOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
});
export type CreateAPITokenOutput = typeof CreateAPITokenOutput.Type;

// The operation
/**
 * Create API Token
 *
 * Returns a new API token belonging to a user.
 *
 * @param tokenName - The name of the api token.
 */
export const createAPIToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateAPITokenInput,
  outputSchema: CreateAPITokenOutput,
}));
