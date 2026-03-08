import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateOrgApiKeyInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "POST", path: "/organizations/{org_id}/api_keys" }));
export type CreateOrgApiKeyInput = typeof CreateOrgApiKeyInput.Type;

// Output Schema
export const CreateOrgApiKeyOutput = Schema.Struct({
  id: Schema.Number,
  key: Schema.String,
  name: Schema.String,
  created_at: Schema.String,
  created_by: Schema.String,
  project_id: Schema.optional(Schema.String),
});
export type CreateOrgApiKeyOutput = typeof CreateOrgApiKeyOutput.Type;

// The operation
/**
 * Create organization API key
 *
 * Creates an API key for the specified organization.
 * The `key_name` is a user-specified name for the key.
 * This method returns an `id` and `key`. The `key` is a randomly generated, 64-bit token required to access the Neon API.
 * API keys can also be managed in the Neon Console.
 * See [Manage API keys](https://neon.tech/docs/manage/api-keys/).
 *
 * @param org_id - The Neon organization ID
 */
export const createOrgApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateOrgApiKeyInput,
  outputSchema: CreateOrgApiKeyOutput,
}));
