import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RevokeApiKeyInput = Schema.Struct({
  key_id: Schema.Number.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/api_keys/{key_id}" }));
export type RevokeApiKeyInput = typeof RevokeApiKeyInput.Type;

// Output Schema
export const RevokeApiKeyOutput = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  created_at: Schema.String,
  created_by: Schema.String,
  last_used_at: Schema.optional(Schema.NullOr(Schema.String)),
  last_used_from_addr: Schema.String,
  revoked: Schema.Boolean,
});
export type RevokeApiKeyOutput = typeof RevokeApiKeyOutput.Type;

// The operation
/**
 * Revoke API key
 *
 * Revokes the specified API key.
 * An API key that is no longer needed can be revoked.
 * This action cannot be reversed.
 * You can obtain `key_id` values by listing the API keys for your Neon account.
 * API keys can also be managed in the Neon Console.
 * See [Manage API keys](https://neon.tech/docs/manage/api-keys/).
 *
 * @param key_id - The API key ID
 */
export const revokeApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RevokeApiKeyInput,
  outputSchema: RevokeApiKeyOutput,
}));
