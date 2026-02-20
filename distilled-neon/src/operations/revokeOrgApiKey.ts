import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RevokeOrgApiKeyInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
  key_id: Schema.Number.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{org_id}/api_keys/{key_id}",
  }),
);
export type RevokeOrgApiKeyInput = typeof RevokeOrgApiKeyInput.Type;

// Output Schema
export const RevokeOrgApiKeyOutput = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  created_at: Schema.String,
  created_by: Schema.String,
  last_used_at: Schema.optional(Schema.NullOr(Schema.String)),
  last_used_from_addr: Schema.String,
  revoked: Schema.Boolean,
  project_id: Schema.optional(Schema.String),
});
export type RevokeOrgApiKeyOutput = typeof RevokeOrgApiKeyOutput.Type;

// The operation
/**
 * Revoke organization API key
 *
 * Revokes the specified organization API key.
 * An API key that is no longer needed can be revoked.
 * This action cannot be reversed.
 * You can obtain `key_id` values by listing the API keys for an organization.
 * API keys can also be managed in the Neon Console.
 * See [Manage API keys](https://neon.tech/docs/manage/api-keys/).
 *
 * @param org_id - The Neon organization ID
 * @param key_id - The API key ID
 */
export const revokeOrgApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RevokeOrgApiKeyInput,
  outputSchema: RevokeOrgApiKeyOutput,
}));
