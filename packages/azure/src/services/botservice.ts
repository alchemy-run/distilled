/**
 * Azure Botservice API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BotConnectionCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}",
    }),
  );
export type BotConnectionCreateInput = typeof BotConnectionCreateInput.Type;

// Output Schema
export const BotConnectionCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.Literals(["F0", "S1"]),
        tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
      }),
    ),
    kind: Schema.optional(
      Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
    ),
    etag: Schema.optional(Schema.String),
    zones: Schema.optional(Schema.Array(Schema.String)),
  });
export type BotConnectionCreateOutput = typeof BotConnectionCreateOutput.Type;

// The operation
/**
 * Register a new Auth Connection for a Bot Service
 */
export const BotConnectionCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotConnectionCreateInput,
  outputSchema: BotConnectionCreateOutput,
}));
// Input Schema
export const BotConnectionDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}",
    }),
  );
export type BotConnectionDeleteInput = typeof BotConnectionDeleteInput.Type;

// Output Schema
export const BotConnectionDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BotConnectionDeleteOutput = typeof BotConnectionDeleteOutput.Type;

// The operation
/**
 * Deletes a Connection Setting registration for a Bot Service
 */
export const BotConnectionDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotConnectionDeleteInput,
  outputSchema: BotConnectionDeleteOutput,
}));
// Input Schema
export const BotConnectionGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}",
  }),
);
export type BotConnectionGetInput = typeof BotConnectionGetInput.Type;

// Output Schema
export const BotConnectionGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.Literals(["F0", "S1"]),
        tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
      }),
    ),
    kind: Schema.optional(
      Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
    ),
    etag: Schema.optional(Schema.String),
    zones: Schema.optional(Schema.Array(Schema.String)),
  },
);
export type BotConnectionGetOutput = typeof BotConnectionGetOutput.Type;

// The operation
/**
 * Get a Connection Setting registration for a Bot Service
 */
export const BotConnectionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotConnectionGetInput,
  outputSchema: BotConnectionGetOutput,
}));
// Input Schema
export const BotConnectionListByBotServiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections",
    }),
  );
export type BotConnectionListByBotServiceInput =
  typeof BotConnectionListByBotServiceInput.Type;

// Output Schema
export const BotConnectionListByBotServiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.Literals(["F0", "S1"]),
              tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
            }),
          ),
          kind: Schema.optional(
            Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
          ),
          etag: Schema.optional(Schema.String),
          zones: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type BotConnectionListByBotServiceOutput =
  typeof BotConnectionListByBotServiceOutput.Type;

// The operation
/**
 * Returns all the Connection Settings registered to a particular BotService resource
 */
export const BotConnectionListByBotService =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BotConnectionListByBotServiceInput,
    outputSchema: BotConnectionListByBotServiceOutput,
  }));
// Input Schema
export const BotConnectionListServiceProvidersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.BotService/listAuthServiceProviders",
    }),
  );
export type BotConnectionListServiceProvidersInput =
  typeof BotConnectionListServiceProvidersInput.Type;

// Output Schema
export const BotConnectionListServiceProvidersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              id: Schema.optional(Schema.String),
              displayName: Schema.optional(Schema.String),
              serviceProviderName: Schema.optional(Schema.String),
              devPortalUrl: Schema.optional(Schema.String),
              iconUrl: Schema.optional(Schema.String),
              parameters: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    type: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    description: Schema.optional(Schema.String),
                    helpUrl: Schema.optional(Schema.String),
                    default: Schema.optional(Schema.String),
                    metadata: Schema.optional(
                      Schema.Struct({
                        constraints: Schema.optional(
                          Schema.Struct({
                            required: Schema.optional(Schema.Boolean),
                          }),
                        ),
                      }),
                    ),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type BotConnectionListServiceProvidersOutput =
  typeof BotConnectionListServiceProvidersOutput.Type;

// The operation
/**
 * Lists the available Service Providers for creating Connection Settings
 */
export const BotConnectionListServiceProviders =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BotConnectionListServiceProvidersInput,
    outputSchema: BotConnectionListServiceProvidersOutput,
  }));
// Input Schema
export const BotConnectionListWithSecretsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}/listWithSecrets",
    }),
  );
export type BotConnectionListWithSecretsInput =
  typeof BotConnectionListWithSecretsInput.Type;

// Output Schema
export const BotConnectionListWithSecretsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.Literals(["F0", "S1"]),
        tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
      }),
    ),
    kind: Schema.optional(
      Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
    ),
    etag: Schema.optional(Schema.String),
    zones: Schema.optional(Schema.Array(Schema.String)),
  });
export type BotConnectionListWithSecretsOutput =
  typeof BotConnectionListWithSecretsOutput.Type;

// The operation
/**
 * Get a Connection Setting registration for a Bot Service
 */
export const BotConnectionListWithSecrets =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BotConnectionListWithSecretsInput,
    outputSchema: BotConnectionListWithSecretsOutput,
  }));
// Input Schema
export const BotConnectionUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}",
    }),
  );
export type BotConnectionUpdateInput = typeof BotConnectionUpdateInput.Type;

// Output Schema
export const BotConnectionUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.Literals(["F0", "S1"]),
        tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
      }),
    ),
    kind: Schema.optional(
      Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
    ),
    etag: Schema.optional(Schema.String),
    zones: Schema.optional(Schema.Array(Schema.String)),
  });
export type BotConnectionUpdateOutput = typeof BotConnectionUpdateOutput.Type;

// The operation
/**
 * Updates a Connection Setting registration for a Bot Service
 */
export const BotConnectionUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotConnectionUpdateInput,
  outputSchema: BotConnectionUpdateOutput,
}));
// Input Schema
export const BotsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}",
  }),
);
export type BotsCreateInput = typeof BotsCreateInput.Type;

// Output Schema
export const BotsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.Literals(["F0", "S1"]),
      tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
    }),
  ),
  kind: Schema.optional(
    Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
  ),
  etag: Schema.optional(Schema.String),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type BotsCreateOutput = typeof BotsCreateOutput.Type;

// The operation
/**
 * Creates a Bot Service. Bot Service is a resource group wide resource type.
 */
export const BotsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsCreateInput,
  outputSchema: BotsCreateOutput,
}));
// Input Schema
export const BotsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}",
  }),
);
export type BotsDeleteInput = typeof BotsDeleteInput.Type;

// Output Schema
export const BotsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BotsDeleteOutput = typeof BotsDeleteOutput.Type;

// The operation
/**
 * Deletes a Bot Service from the resource group.
 */
export const BotsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsDeleteInput,
  outputSchema: BotsDeleteOutput,
}));
// Input Schema
export const BotsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}",
  }),
);
export type BotsGetInput = typeof BotsGetInput.Type;

// Output Schema
export const BotsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.Literals(["F0", "S1"]),
      tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
    }),
  ),
  kind: Schema.optional(
    Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
  ),
  etag: Schema.optional(Schema.String),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type BotsGetOutput = typeof BotsGetOutput.Type;

// The operation
/**
 * Returns a BotService specified by the parameters.
 */
export const BotsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsGetInput,
  outputSchema: BotsGetOutput,
}));
// Input Schema
export const BotsGetCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.BotService/checkNameAvailability",
    }),
  );
export type BotsGetCheckNameAvailabilityInput =
  typeof BotsGetCheckNameAvailabilityInput.Type;

// Output Schema
export const BotsGetCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    valid: Schema.optional(Schema.Boolean),
    message: Schema.optional(Schema.String),
    absCode: Schema.optional(Schema.String),
  });
export type BotsGetCheckNameAvailabilityOutput =
  typeof BotsGetCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check whether a bot name is available.
 */
export const BotsGetCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BotsGetCheckNameAvailabilityInput,
    outputSchema: BotsGetCheckNameAvailabilityOutput,
  }));
// Input Schema
export const BotsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.BotService/botServices",
  }),
);
export type BotsListInput = typeof BotsListInput.Type;

// Output Schema
export const BotsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.Literals(["F0", "S1"]),
            tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
          }),
        ),
        kind: Schema.optional(
          Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
        ),
        etag: Schema.optional(Schema.String),
        zones: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
});
export type BotsListOutput = typeof BotsListOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a subscription.
 */
export const BotsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsListInput,
  outputSchema: BotsListOutput,
}));
// Input Schema
export const BotsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices",
    }),
  );
export type BotsListByResourceGroupInput =
  typeof BotsListByResourceGroupInput.Type;

// Output Schema
export const BotsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.Literals(["F0", "S1"]),
              tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
            }),
          ),
          kind: Schema.optional(
            Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
          ),
          etag: Schema.optional(Schema.String),
          zones: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type BotsListByResourceGroupOutput =
  typeof BotsListByResourceGroupOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a resource group
 */
export const BotsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BotsListByResourceGroupInput,
    outputSchema: BotsListByResourceGroupOutput,
  }),
);
// Input Schema
export const BotsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}",
  }),
);
export type BotsUpdateInput = typeof BotsUpdateInput.Type;

// Output Schema
export const BotsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.Literals(["F0", "S1"]),
      tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
    }),
  ),
  kind: Schema.optional(
    Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
  ),
  etag: Schema.optional(Schema.String),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type BotsUpdateOutput = typeof BotsUpdateOutput.Type;

// The operation
/**
 * Updates a Bot Service
 */
export const BotsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BotsUpdateInput,
  outputSchema: BotsUpdateOutput,
}));
// Input Schema
export const ChannelsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}",
  }),
);
export type ChannelsCreateInput = typeof ChannelsCreateInput.Type;

// Output Schema
export const ChannelsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.Literals(["F0", "S1"]),
      tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
    }),
  ),
  kind: Schema.optional(
    Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
  ),
  etag: Schema.optional(Schema.String),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type ChannelsCreateOutput = typeof ChannelsCreateOutput.Type;

// The operation
/**
 * Creates a Channel registration for a Bot Service
 */
export const ChannelsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChannelsCreateInput,
  outputSchema: ChannelsCreateOutput,
}));
// Input Schema
export const ChannelsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  channelName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}",
  }),
);
export type ChannelsDeleteInput = typeof ChannelsDeleteInput.Type;

// Output Schema
export const ChannelsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ChannelsDeleteOutput = typeof ChannelsDeleteOutput.Type;

// The operation
/**
 * Deletes a Channel registration from a Bot Service
 *
 * @param channelName - The name of the Bot resource.
 */
export const ChannelsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChannelsDeleteInput,
  outputSchema: ChannelsDeleteOutput,
}));
// Input Schema
export const ChannelsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  channelName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}",
  }),
);
export type ChannelsGetInput = typeof ChannelsGetInput.Type;

// Output Schema
export const ChannelsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.Literals(["F0", "S1"]),
      tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
    }),
  ),
  kind: Schema.optional(
    Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
  ),
  etag: Schema.optional(Schema.String),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type ChannelsGetOutput = typeof ChannelsGetOutput.Type;

// The operation
/**
 * Returns a BotService Channel registration specified by the parameters.
 *
 * @param channelName - The name of the Bot resource.
 */
export const ChannelsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChannelsGetInput,
  outputSchema: ChannelsGetOutput,
}));
// Input Schema
export const ChannelsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels",
    }),
  );
export type ChannelsListByResourceGroupInput =
  typeof ChannelsListByResourceGroupInput.Type;

// Output Schema
export const ChannelsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.Literals(["F0", "S1"]),
              tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
            }),
          ),
          kind: Schema.optional(
            Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
          ),
          etag: Schema.optional(Schema.String),
          zones: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type ChannelsListByResourceGroupOutput =
  typeof ChannelsListByResourceGroupOutput.Type;

// The operation
/**
 * Returns all the Channel registrations of a particular BotService resource
 */
export const ChannelsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ChannelsListByResourceGroupInput,
    outputSchema: ChannelsListByResourceGroupOutput,
  }),
);
// Input Schema
export const ChannelsListWithKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}/listChannelWithKeys",
    }),
  );
export type ChannelsListWithKeysInput = typeof ChannelsListWithKeysInput.Type;

// Output Schema
export const ChannelsListWithKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        channelName: Schema.String,
        etag: Schema.optional(Schema.NullOr(Schema.String)),
        provisioningState: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
      }),
    ),
  });
export type ChannelsListWithKeysOutput = typeof ChannelsListWithKeysOutput.Type;

// The operation
/**
 * Lists a Channel registration for a Bot Service including secrets
 */
export const ChannelsListWithKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ChannelsListWithKeysInput,
    outputSchema: ChannelsListWithKeysOutput,
  }),
);
// Input Schema
export const ChannelsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}",
  }),
);
export type ChannelsUpdateInput = typeof ChannelsUpdateInput.Type;

// Output Schema
export const ChannelsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sku: Schema.optional(
    Schema.Struct({
      name: Schema.Literals(["F0", "S1"]),
      tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
    }),
  ),
  kind: Schema.optional(
    Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
  ),
  etag: Schema.optional(Schema.String),
  zones: Schema.optional(Schema.Array(Schema.String)),
});
export type ChannelsUpdateOutput = typeof ChannelsUpdateOutput.Type;

// The operation
/**
 * Updates a Channel registration for a Bot Service
 */
export const ChannelsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChannelsUpdateInput,
  outputSchema: ChannelsUpdateOutput,
}));
// Input Schema
export const DirectLineRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}/regeneratekeys",
    }),
  );
export type DirectLineRegenerateKeysInput =
  typeof DirectLineRegenerateKeysInput.Type;

// Output Schema
export const DirectLineRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sku: Schema.optional(
      Schema.Struct({
        name: Schema.Literals(["F0", "S1"]),
        tier: Schema.optional(Schema.Literals(["Free", "Standard"])),
      }),
    ),
    kind: Schema.optional(
      Schema.Literals(["sdk", "designer", "bot", "function", "azurebot"]),
    ),
    etag: Schema.optional(Schema.String),
    zones: Schema.optional(Schema.Array(Schema.String)),
  });
export type DirectLineRegenerateKeysOutput =
  typeof DirectLineRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource
 */
export const DirectLineRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DirectLineRegenerateKeysInput,
    outputSchema: DirectLineRegenerateKeysOutput,
  }),
);
// Input Schema
export const EmailCreateSignInUrlInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/createEmailSignInUrl",
    }),
  );
export type EmailCreateSignInUrlInput = typeof EmailCreateSignInUrlInput.Type;

// Output Schema
export const EmailCreateSignInUrlOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        url: Schema.optional(Schema.String),
      }),
    ),
  });
export type EmailCreateSignInUrlOutput = typeof EmailCreateSignInUrlOutput.Type;

// The operation
/**
 * Creates an email channel sign in url for a Bot Service
 */
export const EmailCreateSignInUrl = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EmailCreateSignInUrlInput,
    outputSchema: EmailCreateSignInUrlOutput,
  }),
);
// Input Schema
export const HostSettingsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.BotService/hostSettings",
  }),
);
export type HostSettingsGetInput = typeof HostSettingsGetInput.Type;

// Output Schema
export const HostSettingsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  OAuthUrl: Schema.optional(Schema.String),
  ToBotFromChannelOpenIdMetadataUrl: Schema.optional(Schema.String),
  ToBotFromChannelTokenIssuer: Schema.optional(Schema.String),
  ToBotFromEmulatorOpenIdMetadataUrl: Schema.optional(Schema.String),
  ToChannelFromBotLoginUrl: Schema.optional(Schema.String),
  ToChannelFromBotOAuthScope: Schema.optional(Schema.String),
  ValidateAuthority: Schema.optional(Schema.Boolean),
  BotOpenIdMetadata: Schema.optional(Schema.String),
});
export type HostSettingsGetOutput = typeof HostSettingsGetOutput.Type;

// The operation
/**
 * Get per subscription settings needed to host bot in compute resource such as Azure App Service
 */
export const HostSettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HostSettingsGetInput,
  outputSchema: HostSettingsGetOutput,
}));
// Input Schema
export const OperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.BotService/operationresults/{operationResultId}",
    }),
  );
export type OperationResultsGetInput = typeof OperationResultsGetInput.Type;

// Output Schema
export const OperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Canceled",
        "Succeeded",
        "Failed",
        "Requested",
        "Running",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
  });
export type OperationResultsGetOutput = typeof OperationResultsGetOutput.Type;

// The operation
/**
 * Get the operation result for a long running operation.
 */
export const OperationResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationResultsGetInput,
  outputSchema: OperationResultsGetOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.BotService/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            description: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
          }),
        ),
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(Schema.Unknown),
      }),
    ),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all the available BotService operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    properties: Schema.optional(
      Schema.Struct({
        privateEndpoint: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
        privateLinkServiceConnectionState: Schema.Struct({
          status: Schema.optional(
            Schema.Literals(["Pending", "Approved", "Rejected"]),
          ),
          description: Schema.optional(Schema.String),
          actionsRequired: Schema.optional(Schema.String),
        }),
        provisioningState: Schema.optional(
          Schema.Literals(["Succeeded", "Creating", "Deleting", "Failed"]),
        ),
        groupIds: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateInput =
  typeof PrivateEndpointConnectionsCreateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsCreateOutput =
  typeof PrivateEndpointConnectionsCreateOutput.Type;

// The operation
/**
 * Update the state of specified private endpoint connection associated with the Bot.
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 * @param properties - Resource properties.
 */
export const PrivateEndpointConnectionsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateInput,
    outputSchema: PrivateEndpointConnectionsCreateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsDeleteInput =
  typeof PrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsDeleteOutput =
  typeof PrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified private endpoint connection associated with the Bot.
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the Bot.
 *
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * List all the private endpoint connections associated with the Bot.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateLinkResourcesListByBotResourceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByBotResourceInput =
  typeof PrivateLinkResourcesListByBotResourceInput.Type;

// Output Schema
export const PrivateLinkResourcesListByBotResourceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PrivateLinkResourcesListByBotResourceOutput =
  typeof PrivateLinkResourcesListByBotResourceOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a Bot.
 */
export const PrivateLinkResourcesListByBotResource =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByBotResourceInput,
    outputSchema: PrivateLinkResourcesListByBotResourceOutput,
  }));
// Input Schema
export const QnAMakerEndpointKeysGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.BotService/listQnAMakerEndpointKeys",
    }),
  );
export type QnAMakerEndpointKeysGetInput =
  typeof QnAMakerEndpointKeysGetInput.Type;

// Output Schema
export const QnAMakerEndpointKeysGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryEndpointKey: Schema.optional(Schema.String),
    secondaryEndpointKey: Schema.optional(Schema.String),
    installedVersion: Schema.optional(Schema.String),
    lastStableVersion: Schema.optional(Schema.String),
  });
export type QnAMakerEndpointKeysGetOutput =
  typeof QnAMakerEndpointKeysGetOutput.Type;

// The operation
/**
 * Lists the QnA Maker endpoint keys
 */
export const QnAMakerEndpointKeysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QnAMakerEndpointKeysGetInput,
    outputSchema: QnAMakerEndpointKeysGetOutput,
  }),
);
