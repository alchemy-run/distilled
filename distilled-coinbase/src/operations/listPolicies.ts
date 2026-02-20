import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListPoliciesInput = Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.Literals(["project", "account"])),
}).pipe(T.Http({ method: "GET", path: "/v2/policy-engine/policies" }));
export type ListPoliciesInput = typeof ListPoliciesInput.Type;

// Output Schema
export const ListPoliciesOutput = Schema.Struct({
  policies: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      description: Schema.optional(Schema.String),
      scope: Schema.Literals(["project", "account"]),
      rules: Schema.Array(
        Schema.Union([
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["signEvmTransaction"]),
            criteria: Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literals(["ethValue"]),
                  ethValue: Schema.String,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmData"]),
                  abi: Schema.Union([
                    Schema.Literals(["erc20", "erc721", "erc1155"]),
                    Schema.Array(
                      Schema.Union([Schema.Unknown, Schema.Unknown]),
                    ),
                  ]),
                  conditions: Schema.Array(
                    Schema.Struct({
                      function: Schema.String,
                      params: Schema.optional(
                        Schema.Array(
                          Schema.Union([Schema.Unknown, Schema.Unknown]),
                        ),
                      ),
                    }),
                  ),
                }),
                Schema.Struct({
                  type: Schema.Literals(["netUSDChange"]),
                  changeCents: Schema.Number,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
              ]),
            ),
          }),
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["sendEvmTransaction"]),
            criteria: Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literals(["ethValue"]),
                  ethValue: Schema.String,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmNetwork"]),
                  networks: Schema.Array(
                    Schema.Literals([
                      "base-sepolia",
                      "base",
                      "ethereum",
                      "ethereum-sepolia",
                      "avalanche",
                      "polygon",
                      "optimism",
                      "arbitrum",
                      "zora",
                      "bnb",
                    ]),
                  ),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmData"]),
                  abi: Schema.Union([
                    Schema.Literals(["erc20", "erc721", "erc1155"]),
                    Schema.Array(
                      Schema.Union([Schema.Unknown, Schema.Unknown]),
                    ),
                  ]),
                  conditions: Schema.Array(
                    Schema.Struct({
                      function: Schema.String,
                      params: Schema.optional(
                        Schema.Array(
                          Schema.Union([Schema.Unknown, Schema.Unknown]),
                        ),
                      ),
                    }),
                  ),
                }),
                Schema.Struct({
                  type: Schema.Literals(["netUSDChange"]),
                  changeCents: Schema.Number,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
              ]),
            ),
          }),
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["signEvmMessage"]),
            criteria: Schema.Array(
              Schema.Struct({
                type: Schema.Literals(["evmMessage"]),
                match: Schema.String,
              }),
            ),
          }),
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["signEvmTypedData"]),
            criteria: Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literals(["evmTypedDataField"]),
                  types: Schema.Struct({
                    types: Schema.Record(
                      Schema.String,
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.Unknown),
                          type: Schema.optional(Schema.Unknown),
                        }),
                      ),
                    ),
                    primaryType: Schema.String,
                  }),
                  conditions: Schema.Array(
                    Schema.Union([
                      Schema.Struct({
                        addresses: Schema.Unknown,
                        operator: Schema.Unknown,
                        path: Schema.Unknown,
                      }),
                      Schema.Struct({
                        value: Schema.Unknown,
                        operator: Schema.Unknown,
                        path: Schema.Unknown,
                      }),
                      Schema.Struct({
                        match: Schema.Unknown,
                        path: Schema.Unknown,
                      }),
                    ]),
                  ),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmTypedDataVerifyingContract"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
              ]),
            ),
          }),
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["signSolTransaction"]),
            criteria: Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literals(["solAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["solValue"]),
                  solValue: Schema.String,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["splAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["splValue"]),
                  splValue: Schema.String,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["mintAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["solData"]),
                  idls: Schema.Array(
                    Schema.Union([
                      Schema.Literals([
                        "SystemProgram",
                        "TokenProgram",
                        "AssociatedTokenProgram",
                      ]),
                      Schema.Struct({
                        address: Schema.Unknown,
                        instructions: Schema.Unknown,
                        metadata: Schema.optional(Schema.Unknown),
                        types: Schema.optional(Schema.Unknown),
                      }),
                    ]),
                  ),
                  conditions: Schema.Array(
                    Schema.Struct({
                      instruction: Schema.String,
                      params: Schema.optional(
                        Schema.Array(
                          Schema.Union([Schema.Unknown, Schema.Unknown]),
                        ),
                      ),
                    }),
                  ),
                }),
                Schema.Struct({
                  type: Schema.Literals(["programId"]),
                  programIds: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
              ]),
            ),
          }),
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["sendSolTransaction"]),
            criteria: Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literals(["solAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["solValue"]),
                  solValue: Schema.String,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["splAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["splValue"]),
                  splValue: Schema.String,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["mintAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["solData"]),
                  idls: Schema.Array(
                    Schema.Union([
                      Schema.Literals([
                        "SystemProgram",
                        "TokenProgram",
                        "AssociatedTokenProgram",
                      ]),
                      Schema.Struct({
                        address: Schema.Unknown,
                        instructions: Schema.Unknown,
                        metadata: Schema.optional(Schema.Unknown),
                        types: Schema.optional(Schema.Unknown),
                      }),
                    ]),
                  ),
                  conditions: Schema.Array(
                    Schema.Struct({
                      instruction: Schema.String,
                      params: Schema.optional(
                        Schema.Array(
                          Schema.Union([Schema.Unknown, Schema.Unknown]),
                        ),
                      ),
                    }),
                  ),
                }),
                Schema.Struct({
                  type: Schema.Literals(["programId"]),
                  programIds: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["solNetwork"]),
                  networks: Schema.Array(
                    Schema.Literals(["solana-devnet", "solana"]),
                  ),
                  operator: Schema.Literals(["in", "not in"]),
                }),
              ]),
            ),
          }),
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["signSolMessage"]),
            criteria: Schema.Array(
              Schema.Struct({
                type: Schema.Literals(["solMessage"]),
                match: Schema.String,
              }),
            ),
          }),
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["signEvmHash"]),
          }),
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["prepareUserOperation"]),
            criteria: Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literals(["ethValue"]),
                  ethValue: Schema.String,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmNetwork"]),
                  networks: Schema.Array(
                    Schema.Literals([
                      "base-sepolia",
                      "base",
                      "ethereum",
                      "ethereum-sepolia",
                      "avalanche",
                      "polygon",
                      "optimism",
                      "arbitrum",
                      "zora",
                      "bnb",
                    ]),
                  ),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmData"]),
                  abi: Schema.Union([
                    Schema.Literals(["erc20", "erc721", "erc1155"]),
                    Schema.Array(
                      Schema.Union([Schema.Unknown, Schema.Unknown]),
                    ),
                  ]),
                  conditions: Schema.Array(
                    Schema.Struct({
                      function: Schema.String,
                      params: Schema.optional(
                        Schema.Array(
                          Schema.Union([Schema.Unknown, Schema.Unknown]),
                        ),
                      ),
                    }),
                  ),
                }),
                Schema.Struct({
                  type: Schema.Literals(["netUSDChange"]),
                  changeCents: Schema.Number,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
              ]),
            ),
          }),
          Schema.Struct({
            action: Schema.Literals(["reject", "accept"]),
            operation: Schema.Literals(["sendUserOperation"]),
            criteria: Schema.Array(
              Schema.Union([
                Schema.Struct({
                  type: Schema.Literals(["ethValue"]),
                  ethValue: Schema.String,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmAddress"]),
                  addresses: Schema.Array(Schema.String),
                  operator: Schema.Literals(["in", "not in"]),
                }),
                Schema.Struct({
                  type: Schema.Literals(["evmData"]),
                  abi: Schema.Union([
                    Schema.Literals(["erc20", "erc721", "erc1155"]),
                    Schema.Array(
                      Schema.Union([Schema.Unknown, Schema.Unknown]),
                    ),
                  ]),
                  conditions: Schema.Array(
                    Schema.Struct({
                      function: Schema.String,
                      params: Schema.optional(
                        Schema.Array(
                          Schema.Union([Schema.Unknown, Schema.Unknown]),
                        ),
                      ),
                    }),
                  ),
                }),
                Schema.Struct({
                  type: Schema.Literals(["netUSDChange"]),
                  changeCents: Schema.Number,
                  operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                }),
              ]),
            ),
          }),
        ]),
      ),
      createdAt: Schema.String,
      updatedAt: Schema.String,
    }),
  ),
  nextPageToken: Schema.optional(Schema.String),
});
export type ListPoliciesOutput = typeof ListPoliciesOutput.Type;

// The operation
/**
 * List policies
 *
 * Lists the policies belonging to the developer's CDP Project. Use the `scope` parameter to filter the policies by scope.
 * The response is paginated, and by default, returns 20 policies per page.
 *
 * @param pageSize - The number of resources to return per page.
 * @param pageToken - The token for the next page of resources, if any.
 * @param scope - The scope of the policies to return. If `project`, the response will include exactly one policy, which is the project-level policy. If `account`, the response will include all account-level policies for the developer's CDP Project.
 */
export const listPolicies = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListPoliciesInput,
  outputSchema: ListPoliciesOutput,
}));
