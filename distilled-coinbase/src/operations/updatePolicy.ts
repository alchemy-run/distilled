import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import {
  AlreadyExists,
  IdempotencyError,
  InvalidRequest,
  NotFound,
} from "../errors";

// Input Schema
export const UpdatePolicyInput = Schema.Struct({
  policyId: Schema.String.pipe(T.PathParam()),
  description: Schema.optional(Schema.String),
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
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literals(["function"]),
                      name: Schema.String,
                      inputs: Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.Unknown),
                          type: Schema.Unknown,
                          internalType: Schema.optional(Schema.Unknown),
                          components: Schema.optional(Schema.Unknown),
                        }),
                      ),
                      outputs: Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.Unknown),
                          type: Schema.Unknown,
                          internalType: Schema.optional(Schema.Unknown),
                          components: Schema.optional(Schema.Unknown),
                        }),
                      ),
                      constant: Schema.optional(Schema.Boolean),
                      payable: Schema.optional(Schema.Boolean),
                      stateMutability: Schema.Literals([
                        "pure",
                        "view",
                        "nonpayable",
                        "payable",
                      ]),
                      gas: Schema.optional(Schema.Number),
                    }),
                    Schema.Struct({
                      type: Schema.Literals([
                        "constructor",
                        "error",
                        "event",
                        "fallback",
                        "receive",
                      ]),
                      additionalProperties: Schema.optional(Schema.Unknown),
                    }),
                  ]),
                ),
              ]),
              conditions: Schema.Array(
                Schema.Struct({
                  function: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.String),
                        }),
                      ]),
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
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literals(["function"]),
                      name: Schema.String,
                      inputs: Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.Unknown),
                          type: Schema.Unknown,
                          internalType: Schema.optional(Schema.Unknown),
                          components: Schema.optional(Schema.Unknown),
                        }),
                      ),
                      outputs: Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.Unknown),
                          type: Schema.Unknown,
                          internalType: Schema.optional(Schema.Unknown),
                          components: Schema.optional(Schema.Unknown),
                        }),
                      ),
                      constant: Schema.optional(Schema.Boolean),
                      payable: Schema.optional(Schema.Boolean),
                      stateMutability: Schema.Literals([
                        "pure",
                        "view",
                        "nonpayable",
                        "payable",
                      ]),
                      gas: Schema.optional(Schema.Number),
                    }),
                    Schema.Struct({
                      type: Schema.Literals([
                        "constructor",
                        "error",
                        "event",
                        "fallback",
                        "receive",
                      ]),
                      additionalProperties: Schema.optional(Schema.Unknown),
                    }),
                  ]),
                ),
              ]),
              conditions: Schema.Array(
                Schema.Struct({
                  function: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.String),
                        }),
                      ]),
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
                      name: Schema.optional(Schema.String),
                      type: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                primaryType: Schema.String,
              }),
              conditions: Schema.Array(
                Schema.Union([
                  Schema.Struct({
                    addresses: Schema.Array(Schema.String),
                    operator: Schema.Literals(["in", "not in"]),
                    path: Schema.String,
                  }),
                  Schema.Struct({
                    value: Schema.String,
                    operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                    path: Schema.String,
                  }),
                  Schema.Struct({
                    match: Schema.String,
                    path: Schema.String,
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
                    address: Schema.String,
                    instructions: Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        discriminator: Schema.Array(Schema.Number),
                        args: Schema.Array(
                          Schema.Struct({
                            name: Schema.Unknown,
                            type: Schema.Unknown,
                          }),
                        ),
                        accounts: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              name: Schema.Unknown,
                              writable: Schema.optional(Schema.Unknown),
                              signer: Schema.optional(Schema.Unknown),
                            }),
                          ),
                        ),
                      }),
                    ),
                    metadata: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        version: Schema.optional(Schema.String),
                        spec: Schema.optional(Schema.String),
                      }),
                    ),
                    types: Schema.optional(Schema.Array(Schema.Unknown)),
                  }),
                ]),
              ),
              conditions: Schema.Array(
                Schema.Struct({
                  instruction: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.String),
                        }),
                      ]),
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
                    address: Schema.String,
                    instructions: Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        discriminator: Schema.Array(Schema.Number),
                        args: Schema.Array(
                          Schema.Struct({
                            name: Schema.Unknown,
                            type: Schema.Unknown,
                          }),
                        ),
                        accounts: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              name: Schema.Unknown,
                              writable: Schema.optional(Schema.Unknown),
                              signer: Schema.optional(Schema.Unknown),
                            }),
                          ),
                        ),
                      }),
                    ),
                    metadata: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        version: Schema.optional(Schema.String),
                        spec: Schema.optional(Schema.String),
                      }),
                    ),
                    types: Schema.optional(Schema.Array(Schema.Unknown)),
                  }),
                ]),
              ),
              conditions: Schema.Array(
                Schema.Struct({
                  instruction: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.String),
                        }),
                      ]),
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
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literals(["function"]),
                      name: Schema.String,
                      inputs: Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.Unknown),
                          type: Schema.Unknown,
                          internalType: Schema.optional(Schema.Unknown),
                          components: Schema.optional(Schema.Unknown),
                        }),
                      ),
                      outputs: Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.Unknown),
                          type: Schema.Unknown,
                          internalType: Schema.optional(Schema.Unknown),
                          components: Schema.optional(Schema.Unknown),
                        }),
                      ),
                      constant: Schema.optional(Schema.Boolean),
                      payable: Schema.optional(Schema.Boolean),
                      stateMutability: Schema.Literals([
                        "pure",
                        "view",
                        "nonpayable",
                        "payable",
                      ]),
                      gas: Schema.optional(Schema.Number),
                    }),
                    Schema.Struct({
                      type: Schema.Literals([
                        "constructor",
                        "error",
                        "event",
                        "fallback",
                        "receive",
                      ]),
                      additionalProperties: Schema.optional(Schema.Unknown),
                    }),
                  ]),
                ),
              ]),
              conditions: Schema.Array(
                Schema.Struct({
                  function: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.String),
                        }),
                      ]),
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
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literals(["function"]),
                      name: Schema.String,
                      inputs: Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.Unknown),
                          type: Schema.Unknown,
                          internalType: Schema.optional(Schema.Unknown),
                          components: Schema.optional(Schema.Unknown),
                        }),
                      ),
                      outputs: Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.Unknown),
                          type: Schema.Unknown,
                          internalType: Schema.optional(Schema.Unknown),
                          components: Schema.optional(Schema.Unknown),
                        }),
                      ),
                      constant: Schema.optional(Schema.Boolean),
                      payable: Schema.optional(Schema.Boolean),
                      stateMutability: Schema.Literals([
                        "pure",
                        "view",
                        "nonpayable",
                        "payable",
                      ]),
                      gas: Schema.optional(Schema.Number),
                    }),
                    Schema.Struct({
                      type: Schema.Literals([
                        "constructor",
                        "error",
                        "event",
                        "fallback",
                        "receive",
                      ]),
                      additionalProperties: Schema.optional(Schema.Unknown),
                    }),
                  ]),
                ),
              ]),
              conditions: Schema.Array(
                Schema.Struct({
                  function: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.String),
                        }),
                      ]),
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
}).pipe(
  T.Http({ method: "PUT", path: "/v2/policy-engine/policies/{policyId}" }),
);
export type UpdatePolicyInput = typeof UpdatePolicyInput.Type;

// Output Schema
export const UpdatePolicyOutput = Schema.Struct({
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
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literals(["function"]),
                      name: Schema.String,
                      inputs: Schema.Array(Schema.Unknown),
                      outputs: Schema.Array(Schema.Unknown),
                      constant: Schema.optional(Schema.Boolean),
                      payable: Schema.optional(Schema.Boolean),
                      stateMutability: Schema.Literals([
                        "pure",
                        "view",
                        "nonpayable",
                        "payable",
                      ]),
                      gas: Schema.optional(Schema.Number),
                    }),
                    Schema.Struct({
                      type: Schema.Literals([
                        "constructor",
                        "error",
                        "event",
                        "fallback",
                        "receive",
                      ]),
                      additionalProperties: Schema.optional(Schema.Unknown),
                    }),
                  ]),
                ),
              ]),
              conditions: Schema.Array(
                Schema.Struct({
                  function: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.Unknown),
                        }),
                      ]),
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
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literals(["function"]),
                      name: Schema.String,
                      inputs: Schema.Array(Schema.Unknown),
                      outputs: Schema.Array(Schema.Unknown),
                      constant: Schema.optional(Schema.Boolean),
                      payable: Schema.optional(Schema.Boolean),
                      stateMutability: Schema.Literals([
                        "pure",
                        "view",
                        "nonpayable",
                        "payable",
                      ]),
                      gas: Schema.optional(Schema.Number),
                    }),
                    Schema.Struct({
                      type: Schema.Literals([
                        "constructor",
                        "error",
                        "event",
                        "fallback",
                        "receive",
                      ]),
                      additionalProperties: Schema.optional(Schema.Unknown),
                    }),
                  ]),
                ),
              ]),
              conditions: Schema.Array(
                Schema.Struct({
                  function: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.Unknown),
                        }),
                      ]),
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
                      name: Schema.optional(Schema.String),
                      type: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                primaryType: Schema.String,
              }),
              conditions: Schema.Array(
                Schema.Union([
                  Schema.Struct({
                    addresses: Schema.Array(Schema.String),
                    operator: Schema.Literals(["in", "not in"]),
                    path: Schema.String,
                  }),
                  Schema.Struct({
                    value: Schema.String,
                    operator: Schema.Literals([">", ">=", "<", "<=", "=="]),
                    path: Schema.String,
                  }),
                  Schema.Struct({
                    match: Schema.String,
                    path: Schema.String,
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
                    address: Schema.String,
                    instructions: Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        discriminator: Schema.Array(Schema.Unknown),
                        args: Schema.Array(Schema.Unknown),
                        accounts: Schema.optional(Schema.Array(Schema.Unknown)),
                      }),
                    ),
                    metadata: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        version: Schema.optional(Schema.String),
                        spec: Schema.optional(Schema.String),
                      }),
                    ),
                    types: Schema.optional(Schema.Array(Schema.Unknown)),
                  }),
                ]),
              ),
              conditions: Schema.Array(
                Schema.Struct({
                  instruction: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.Unknown),
                        }),
                      ]),
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
                    address: Schema.String,
                    instructions: Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        discriminator: Schema.Array(Schema.Unknown),
                        args: Schema.Array(Schema.Unknown),
                        accounts: Schema.optional(Schema.Array(Schema.Unknown)),
                      }),
                    ),
                    metadata: Schema.optional(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        version: Schema.optional(Schema.String),
                        spec: Schema.optional(Schema.String),
                      }),
                    ),
                    types: Schema.optional(Schema.Array(Schema.Unknown)),
                  }),
                ]),
              ),
              conditions: Schema.Array(
                Schema.Struct({
                  instruction: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.Unknown),
                        }),
                      ]),
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
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literals(["function"]),
                      name: Schema.String,
                      inputs: Schema.Array(Schema.Unknown),
                      outputs: Schema.Array(Schema.Unknown),
                      constant: Schema.optional(Schema.Boolean),
                      payable: Schema.optional(Schema.Boolean),
                      stateMutability: Schema.Literals([
                        "pure",
                        "view",
                        "nonpayable",
                        "payable",
                      ]),
                      gas: Schema.optional(Schema.Number),
                    }),
                    Schema.Struct({
                      type: Schema.Literals([
                        "constructor",
                        "error",
                        "event",
                        "fallback",
                        "receive",
                      ]),
                      additionalProperties: Schema.optional(Schema.Unknown),
                    }),
                  ]),
                ),
              ]),
              conditions: Schema.Array(
                Schema.Struct({
                  function: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.Unknown),
                        }),
                      ]),
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
                  Schema.Union([
                    Schema.Struct({
                      type: Schema.Literals(["function"]),
                      name: Schema.String,
                      inputs: Schema.Array(Schema.Unknown),
                      outputs: Schema.Array(Schema.Unknown),
                      constant: Schema.optional(Schema.Boolean),
                      payable: Schema.optional(Schema.Boolean),
                      stateMutability: Schema.Literals([
                        "pure",
                        "view",
                        "nonpayable",
                        "payable",
                      ]),
                      gas: Schema.optional(Schema.Number),
                    }),
                    Schema.Struct({
                      type: Schema.Literals([
                        "constructor",
                        "error",
                        "event",
                        "fallback",
                        "receive",
                      ]),
                      additionalProperties: Schema.optional(Schema.Unknown),
                    }),
                  ]),
                ),
              ]),
              conditions: Schema.Array(
                Schema.Struct({
                  function: Schema.String,
                  params: Schema.optional(
                    Schema.Array(
                      Schema.Union([
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals([
                            ">",
                            ">=",
                            "<",
                            "<=",
                            "==",
                          ]),
                          value: Schema.String,
                        }),
                        Schema.Struct({
                          name: Schema.String,
                          operator: Schema.Literals(["in", "not in"]),
                          values: Schema.Array(Schema.Unknown),
                        }),
                      ]),
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
});
export type UpdatePolicyOutput = typeof UpdatePolicyOutput.Type;

// The operation
/**
 * Update a policy
 *
 * Updates a policy by its ID. This will have the effect of applying the updated policy to all accounts that are currently using it.
 *
 * @param policyId - The ID of the policy to update.
 */
export const updatePolicy = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdatePolicyInput,
  outputSchema: UpdatePolicyOutput,
  errors: [AlreadyExists, IdempotencyError, InvalidRequest, NotFound],
}));
