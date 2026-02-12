import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { AlreadyExists, IdempotencyError, InvalidRequest, NotFound } from "../errors";

// Input Schema
export const UpdatePolicyInput = Schema.Struct({
  policyId: Schema.String.pipe(T.PathParam()),
  description: Schema.optional(Schema.String),
  rules: Schema.Array(Schema.Union(Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signEvmTransaction"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("ethValue"),
      ethValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("evmAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmData"),
      abi: Schema.Union(Schema.Literal("erc20", "erc721", "erc1155"), Schema.Array(Schema.Union(Schema.Struct({
        type: Schema.Literal("function"),
        name: Schema.String,
        inputs: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.Unknown),
          type: Schema.Unknown,
          internalType: Schema.optional(Schema.Unknown),
          components: Schema.optional(Schema.Unknown),
        })),
        outputs: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.Unknown),
          type: Schema.Unknown,
          internalType: Schema.optional(Schema.Unknown),
          components: Schema.optional(Schema.Unknown),
        })),
        constant: Schema.optional(Schema.Boolean),
        payable: Schema.optional(Schema.Boolean),
        stateMutability: Schema.Literal("pure", "view", "nonpayable", "payable"),
        gas: Schema.optional(Schema.Number),
      }), Schema.Struct({
        type: Schema.Literal("constructor", "error", "event", "fallback", "receive"),
        additionalProperties: Schema.optional(Schema.Unknown),
      })))),
      conditions: Schema.Array(Schema.Struct({
        function: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.String),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("netUSDChange"),
      changeCents: Schema.Number,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("sendEvmTransaction"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("ethValue"),
      ethValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("evmAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmNetwork"),
      networks: Schema.Array(Schema.Literal("base-sepolia", "base", "ethereum", "ethereum-sepolia", "avalanche", "polygon", "optimism", "arbitrum", "zora", "bnb")),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmData"),
      abi: Schema.Union(Schema.Literal("erc20", "erc721", "erc1155"), Schema.Array(Schema.Union(Schema.Struct({
        type: Schema.Literal("function"),
        name: Schema.String,
        inputs: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.Unknown),
          type: Schema.Unknown,
          internalType: Schema.optional(Schema.Unknown),
          components: Schema.optional(Schema.Unknown),
        })),
        outputs: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.Unknown),
          type: Schema.Unknown,
          internalType: Schema.optional(Schema.Unknown),
          components: Schema.optional(Schema.Unknown),
        })),
        constant: Schema.optional(Schema.Boolean),
        payable: Schema.optional(Schema.Boolean),
        stateMutability: Schema.Literal("pure", "view", "nonpayable", "payable"),
        gas: Schema.optional(Schema.Number),
      }), Schema.Struct({
        type: Schema.Literal("constructor", "error", "event", "fallback", "receive"),
        additionalProperties: Schema.optional(Schema.Unknown),
      })))),
      conditions: Schema.Array(Schema.Struct({
        function: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.String),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("netUSDChange"),
      changeCents: Schema.Number,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signEvmMessage"),
    criteria: Schema.Array(Schema.Struct({
      type: Schema.Literal("evmMessage"),
      match: Schema.String,
    })),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signEvmTypedData"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("evmTypedDataField"),
      types: Schema.Struct({
        types: Schema.Record({ key: Schema.String, value: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        })) }),
        primaryType: Schema.String,
      }),
      conditions: Schema.Array(Schema.Union(Schema.Struct({
        addresses: Schema.Array(Schema.String),
        operator: Schema.Literal("in", "not in"),
        path: Schema.String,
      }), Schema.Struct({
        value: Schema.String,
        operator: Schema.Literal(">", ">=", "<", "<=", "=="),
        path: Schema.String,
      }), Schema.Struct({
        match: Schema.String,
        path: Schema.String,
      }))),
    }), Schema.Struct({
      type: Schema.Literal("evmTypedDataVerifyingContract"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signSolTransaction"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("solAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solValue"),
      solValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("splAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("splValue"),
      splValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("mintAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solData"),
      idls: Schema.Array(Schema.Union(Schema.Literal("SystemProgram", "TokenProgram", "AssociatedTokenProgram"), Schema.Struct({
        address: Schema.String,
        instructions: Schema.Array(Schema.Struct({
          name: Schema.String,
          discriminator: Schema.Array(Schema.Number),
          args: Schema.Array(Schema.Struct({
            name: Schema.Unknown,
            type: Schema.Unknown,
          })),
          accounts: Schema.optional(Schema.Array(Schema.Struct({
            name: Schema.Unknown,
            writable: Schema.optional(Schema.Unknown),
            signer: Schema.optional(Schema.Unknown),
          }))),
        })),
        metadata: Schema.optional(Schema.Struct({
          name: Schema.optional(Schema.String),
          version: Schema.optional(Schema.String),
          spec: Schema.optional(Schema.String),
        })),
        types: Schema.optional(Schema.Array(Schema.Unknown)),
      }))),
      conditions: Schema.Array(Schema.Struct({
        instruction: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.String),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("programId"),
      programIds: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("sendSolTransaction"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("solAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solValue"),
      solValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("splAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("splValue"),
      splValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("mintAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solData"),
      idls: Schema.Array(Schema.Union(Schema.Literal("SystemProgram", "TokenProgram", "AssociatedTokenProgram"), Schema.Struct({
        address: Schema.String,
        instructions: Schema.Array(Schema.Struct({
          name: Schema.String,
          discriminator: Schema.Array(Schema.Number),
          args: Schema.Array(Schema.Struct({
            name: Schema.Unknown,
            type: Schema.Unknown,
          })),
          accounts: Schema.optional(Schema.Array(Schema.Struct({
            name: Schema.Unknown,
            writable: Schema.optional(Schema.Unknown),
            signer: Schema.optional(Schema.Unknown),
          }))),
        })),
        metadata: Schema.optional(Schema.Struct({
          name: Schema.optional(Schema.String),
          version: Schema.optional(Schema.String),
          spec: Schema.optional(Schema.String),
        })),
        types: Schema.optional(Schema.Array(Schema.Unknown)),
      }))),
      conditions: Schema.Array(Schema.Struct({
        instruction: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.String),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("programId"),
      programIds: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solNetwork"),
      networks: Schema.Array(Schema.Literal("solana-devnet", "solana")),
      operator: Schema.Literal("in", "not in"),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signSolMessage"),
    criteria: Schema.Array(Schema.Struct({
      type: Schema.Literal("solMessage"),
      match: Schema.String,
    })),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signEvmHash"),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("prepareUserOperation"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("ethValue"),
      ethValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("evmAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmNetwork"),
      networks: Schema.Array(Schema.Literal("base-sepolia", "base", "ethereum", "ethereum-sepolia", "avalanche", "polygon", "optimism", "arbitrum", "zora", "bnb")),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmData"),
      abi: Schema.Union(Schema.Literal("erc20", "erc721", "erc1155"), Schema.Array(Schema.Union(Schema.Struct({
        type: Schema.Literal("function"),
        name: Schema.String,
        inputs: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.Unknown),
          type: Schema.Unknown,
          internalType: Schema.optional(Schema.Unknown),
          components: Schema.optional(Schema.Unknown),
        })),
        outputs: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.Unknown),
          type: Schema.Unknown,
          internalType: Schema.optional(Schema.Unknown),
          components: Schema.optional(Schema.Unknown),
        })),
        constant: Schema.optional(Schema.Boolean),
        payable: Schema.optional(Schema.Boolean),
        stateMutability: Schema.Literal("pure", "view", "nonpayable", "payable"),
        gas: Schema.optional(Schema.Number),
      }), Schema.Struct({
        type: Schema.Literal("constructor", "error", "event", "fallback", "receive"),
        additionalProperties: Schema.optional(Schema.Unknown),
      })))),
      conditions: Schema.Array(Schema.Struct({
        function: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.String),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("netUSDChange"),
      changeCents: Schema.Number,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("sendUserOperation"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("ethValue"),
      ethValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("evmAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmData"),
      abi: Schema.Union(Schema.Literal("erc20", "erc721", "erc1155"), Schema.Array(Schema.Union(Schema.Struct({
        type: Schema.Literal("function"),
        name: Schema.String,
        inputs: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.Unknown),
          type: Schema.Unknown,
          internalType: Schema.optional(Schema.Unknown),
          components: Schema.optional(Schema.Unknown),
        })),
        outputs: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.Unknown),
          type: Schema.Unknown,
          internalType: Schema.optional(Schema.Unknown),
          components: Schema.optional(Schema.Unknown),
        })),
        constant: Schema.optional(Schema.Boolean),
        payable: Schema.optional(Schema.Boolean),
        stateMutability: Schema.Literal("pure", "view", "nonpayable", "payable"),
        gas: Schema.optional(Schema.Number),
      }), Schema.Struct({
        type: Schema.Literal("constructor", "error", "event", "fallback", "receive"),
        additionalProperties: Schema.optional(Schema.Unknown),
      })))),
      conditions: Schema.Array(Schema.Struct({
        function: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.String),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("netUSDChange"),
      changeCents: Schema.Number,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }))),
  }))),
}).pipe(T.Http({ method: "PUT", path: "/v2/policy-engine/policies/{policyId}" }));
export type UpdatePolicyInput = typeof UpdatePolicyInput.Type;

// Output Schema
export const UpdatePolicyOutput = Schema.Struct({
  id: Schema.String,
  description: Schema.optional(Schema.String),
  scope: Schema.Literal("project", "account"),
  rules: Schema.Array(Schema.Union(Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signEvmTransaction"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("ethValue"),
      ethValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("evmAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmData"),
      abi: Schema.Union(Schema.Literal("erc20", "erc721", "erc1155"), Schema.Array(Schema.Union(Schema.Struct({
        type: Schema.Literal("function"),
        name: Schema.String,
        inputs: Schema.Array(Schema.Unknown),
        outputs: Schema.Array(Schema.Unknown),
        constant: Schema.optional(Schema.Boolean),
        payable: Schema.optional(Schema.Boolean),
        stateMutability: Schema.Literal("pure", "view", "nonpayable", "payable"),
        gas: Schema.optional(Schema.Number),
      }), Schema.Struct({
        type: Schema.Literal("constructor", "error", "event", "fallback", "receive"),
        additionalProperties: Schema.optional(Schema.Unknown),
      })))),
      conditions: Schema.Array(Schema.Struct({
        function: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.Unknown),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("netUSDChange"),
      changeCents: Schema.Number,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("sendEvmTransaction"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("ethValue"),
      ethValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("evmAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmNetwork"),
      networks: Schema.Array(Schema.Literal("base-sepolia", "base", "ethereum", "ethereum-sepolia", "avalanche", "polygon", "optimism", "arbitrum", "zora", "bnb")),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmData"),
      abi: Schema.Union(Schema.Literal("erc20", "erc721", "erc1155"), Schema.Array(Schema.Union(Schema.Struct({
        type: Schema.Literal("function"),
        name: Schema.String,
        inputs: Schema.Array(Schema.Unknown),
        outputs: Schema.Array(Schema.Unknown),
        constant: Schema.optional(Schema.Boolean),
        payable: Schema.optional(Schema.Boolean),
        stateMutability: Schema.Literal("pure", "view", "nonpayable", "payable"),
        gas: Schema.optional(Schema.Number),
      }), Schema.Struct({
        type: Schema.Literal("constructor", "error", "event", "fallback", "receive"),
        additionalProperties: Schema.optional(Schema.Unknown),
      })))),
      conditions: Schema.Array(Schema.Struct({
        function: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.Unknown),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("netUSDChange"),
      changeCents: Schema.Number,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signEvmMessage"),
    criteria: Schema.Array(Schema.Struct({
      type: Schema.Literal("evmMessage"),
      match: Schema.String,
    })),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signEvmTypedData"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("evmTypedDataField"),
      types: Schema.Struct({
        types: Schema.Record({ key: Schema.String, value: Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        })) }),
        primaryType: Schema.String,
      }),
      conditions: Schema.Array(Schema.Union(Schema.Struct({
        addresses: Schema.Array(Schema.String),
        operator: Schema.Literal("in", "not in"),
        path: Schema.String,
      }), Schema.Struct({
        value: Schema.String,
        operator: Schema.Literal(">", ">=", "<", "<=", "=="),
        path: Schema.String,
      }), Schema.Struct({
        match: Schema.String,
        path: Schema.String,
      }))),
    }), Schema.Struct({
      type: Schema.Literal("evmTypedDataVerifyingContract"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signSolTransaction"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("solAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solValue"),
      solValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("splAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("splValue"),
      splValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("mintAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solData"),
      idls: Schema.Array(Schema.Union(Schema.Literal("SystemProgram", "TokenProgram", "AssociatedTokenProgram"), Schema.Struct({
        address: Schema.String,
        instructions: Schema.Array(Schema.Struct({
          name: Schema.String,
          discriminator: Schema.Array(Schema.Unknown),
          args: Schema.Array(Schema.Unknown),
          accounts: Schema.optional(Schema.Array(Schema.Unknown)),
        })),
        metadata: Schema.optional(Schema.Struct({
          name: Schema.optional(Schema.String),
          version: Schema.optional(Schema.String),
          spec: Schema.optional(Schema.String),
        })),
        types: Schema.optional(Schema.Array(Schema.Unknown)),
      }))),
      conditions: Schema.Array(Schema.Struct({
        instruction: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.Unknown),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("programId"),
      programIds: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("sendSolTransaction"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("solAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solValue"),
      solValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("splAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("splValue"),
      splValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("mintAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solData"),
      idls: Schema.Array(Schema.Union(Schema.Literal("SystemProgram", "TokenProgram", "AssociatedTokenProgram"), Schema.Struct({
        address: Schema.String,
        instructions: Schema.Array(Schema.Struct({
          name: Schema.String,
          discriminator: Schema.Array(Schema.Unknown),
          args: Schema.Array(Schema.Unknown),
          accounts: Schema.optional(Schema.Array(Schema.Unknown)),
        })),
        metadata: Schema.optional(Schema.Struct({
          name: Schema.optional(Schema.String),
          version: Schema.optional(Schema.String),
          spec: Schema.optional(Schema.String),
        })),
        types: Schema.optional(Schema.Array(Schema.Unknown)),
      }))),
      conditions: Schema.Array(Schema.Struct({
        instruction: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.Unknown),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("programId"),
      programIds: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("solNetwork"),
      networks: Schema.Array(Schema.Literal("solana-devnet", "solana")),
      operator: Schema.Literal("in", "not in"),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signSolMessage"),
    criteria: Schema.Array(Schema.Struct({
      type: Schema.Literal("solMessage"),
      match: Schema.String,
    })),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("signEvmHash"),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("prepareUserOperation"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("ethValue"),
      ethValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("evmAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmNetwork"),
      networks: Schema.Array(Schema.Literal("base-sepolia", "base", "ethereum", "ethereum-sepolia", "avalanche", "polygon", "optimism", "arbitrum", "zora", "bnb")),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmData"),
      abi: Schema.Union(Schema.Literal("erc20", "erc721", "erc1155"), Schema.Array(Schema.Union(Schema.Struct({
        type: Schema.Literal("function"),
        name: Schema.String,
        inputs: Schema.Array(Schema.Unknown),
        outputs: Schema.Array(Schema.Unknown),
        constant: Schema.optional(Schema.Boolean),
        payable: Schema.optional(Schema.Boolean),
        stateMutability: Schema.Literal("pure", "view", "nonpayable", "payable"),
        gas: Schema.optional(Schema.Number),
      }), Schema.Struct({
        type: Schema.Literal("constructor", "error", "event", "fallback", "receive"),
        additionalProperties: Schema.optional(Schema.Unknown),
      })))),
      conditions: Schema.Array(Schema.Struct({
        function: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.Unknown),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("netUSDChange"),
      changeCents: Schema.Number,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }))),
  }), Schema.Struct({
    action: Schema.Literal("reject", "accept"),
    operation: Schema.Literal("sendUserOperation"),
    criteria: Schema.Array(Schema.Union(Schema.Struct({
      type: Schema.Literal("ethValue"),
      ethValue: Schema.String,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }), Schema.Struct({
      type: Schema.Literal("evmAddress"),
      addresses: Schema.Array(Schema.String),
      operator: Schema.Literal("in", "not in"),
    }), Schema.Struct({
      type: Schema.Literal("evmData"),
      abi: Schema.Union(Schema.Literal("erc20", "erc721", "erc1155"), Schema.Array(Schema.Union(Schema.Struct({
        type: Schema.Literal("function"),
        name: Schema.String,
        inputs: Schema.Array(Schema.Unknown),
        outputs: Schema.Array(Schema.Unknown),
        constant: Schema.optional(Schema.Boolean),
        payable: Schema.optional(Schema.Boolean),
        stateMutability: Schema.Literal("pure", "view", "nonpayable", "payable"),
        gas: Schema.optional(Schema.Number),
      }), Schema.Struct({
        type: Schema.Literal("constructor", "error", "event", "fallback", "receive"),
        additionalProperties: Schema.optional(Schema.Unknown),
      })))),
      conditions: Schema.Array(Schema.Struct({
        function: Schema.String,
        params: Schema.optional(Schema.Array(Schema.Union(Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal(">", ">=", "<", "<=", "=="),
          value: Schema.String,
        }), Schema.Struct({
          name: Schema.String,
          operator: Schema.Literal("in", "not in"),
          values: Schema.Array(Schema.Unknown),
        })))),
      })),
    }), Schema.Struct({
      type: Schema.Literal("netUSDChange"),
      changeCents: Schema.Number,
      operator: Schema.Literal(">", ">=", "<", "<=", "=="),
    }))),
  }))),
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
