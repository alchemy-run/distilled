import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrgApiKeysInput = Schema.Struct({
  org_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/organizations/{org_id}/api_keys" }));
export type ListOrgApiKeysInput = typeof ListOrgApiKeysInput.Type;

// Output Schema
export const ListOrgApiKeysOutput = Schema.Array(
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
    project_id: Schema.optional(Schema.String),
  }),
);
export type ListOrgApiKeysOutput = typeof ListOrgApiKeysOutput.Type;

// The operation
/**
 * List organization API keys
 *
 * Retrieves the API keys for the specified organization.
 * The response does not include API key tokens. A token is only provided when creating an API key.
 * API keys can also be managed in the Neon Console.
 * For more information, see [Manage API keys](https://neon.tech/docs/manage/api-keys/).
 *
 * @param org_id - The Neon organization ID
 */
export const listOrgApiKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOrgApiKeysInput,
  outputSchema: ListOrgApiKeysOutput,
}));
