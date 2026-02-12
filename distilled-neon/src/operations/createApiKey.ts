import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateApiKeyInput = Schema.Struct({
  key_name: Schema.String,
}).pipe(T.Http({ method: "POST", path: "/api_keys" }));
export type CreateApiKeyInput = typeof CreateApiKeyInput.Type;

// Output Schema
export const CreateApiKeyOutput = Schema.Struct({
  id: Schema.Number,
  key: Schema.String,
  name: Schema.String,
  created_at: Schema.String,
  created_by: Schema.String,
});
export type CreateApiKeyOutput = typeof CreateApiKeyOutput.Type;

// The operation
/**
 * Create API key
 *
 * Creates an API key.
 * The `key_name` is a user-specified name for the key.
 * This method returns an `id` and `key`. The `key` is a randomly generated, 64-bit token required to access the Neon API.
 * API keys can also be managed in the Neon Console.
 * See [Manage API keys](https://neon.tech/docs/manage/api-keys/).
 */
export const createApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateApiKeyInput,
  outputSchema: CreateApiKeyOutput,
}));
