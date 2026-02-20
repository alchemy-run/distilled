import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListApiKeysInput = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/api_keys" }),
);
export type ListApiKeysInput = typeof ListApiKeysInput.Type;

// Output Schema
export const ListApiKeysOutput = Schema.Array(
  Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    created_at: Schema.String,
    created_by: Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      image: Schema.String,
    }),
    last_used_at: Schema.optional(Schema.NullOr(Schema.String)),
    last_used_from_addr: Schema.String,
  }),
);
export type ListApiKeysOutput = typeof ListApiKeysOutput.Type;

// The operation
/**
 * List API keys
 *
 * Retrieves the API keys for your Neon account.
 * The response does not include API key tokens. A token is only provided when creating an API key.
 * API keys can also be managed in the Neon Console.
 * For more information, see [Manage API keys](https://neon.tech/docs/manage/api-keys/).
 */
export const listApiKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListApiKeysInput,
  outputSchema: ListApiKeysOutput,
}));
