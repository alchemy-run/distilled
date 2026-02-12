import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { InvalidRequest } from "../errors";

// Input Schema
export const ListSpendPermissionsInput = Schema.Struct({
  address: Schema.String.pipe(T.PathParam()),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v2/evm/smart-accounts/{address}/spend-permissions/list" }));
export type ListSpendPermissionsInput = typeof ListSpendPermissionsInput.Type;

// Output Schema
export const ListSpendPermissionsOutput = Schema.Struct({
  spendPermissions: Schema.Array(Schema.Struct({
    permission: Schema.Struct({
      account: Schema.String,
      spender: Schema.String,
      token: Schema.String,
      allowance: Schema.String,
      period: Schema.String,
      start: Schema.String,
      end: Schema.String,
      salt: Schema.String,
      extraData: Schema.String,
    }),
    permissionHash: Schema.String,
    revoked: Schema.Boolean,
    revokedAt: Schema.optional(Schema.String),
    createdAt: Schema.String,
    network: Schema.Literal("base", "base-sepolia", "ethereum", "ethereum-sepolia", "optimism", "arbitrum", "avalanche", "polygon"),
  })),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListSpendPermissionsOutput = typeof ListSpendPermissionsOutput.Type;

// The operation
/**
 * List spend permissions
 *
 * Lists spend permission for the given smart account address.
 *
 * @param address - The address of the Smart account to list spend permissions for.
 * @param pageSize - The number of spend permissions to return per page.
 * @param pageToken - The token for the next page of spend permissions. Will be empty if there are no more spend permissions to fetch.
 */
export const listSpendPermissions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListSpendPermissionsInput,
  outputSchema: ListSpendPermissionsOutput,
  errors: [InvalidRequest],
}));
