/**
 * Azure CustomerInsights API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AuthorizationPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    authorizationPolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/authorizationPolicies/{authorizationPolicyName}",
    }),
  );
export type AuthorizationPoliciesCreateOrUpdateInput =
  typeof AuthorizationPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const AuthorizationPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type AuthorizationPoliciesCreateOrUpdateOutput =
  typeof AuthorizationPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an authorization policy or updates an existing authorization policy.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param authorizationPolicyName - The name of the policy.
 */
export const AuthorizationPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AuthorizationPoliciesCreateOrUpdateInput,
    outputSchema: AuthorizationPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const AuthorizationPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    authorizationPolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/authorizationPolicies/{authorizationPolicyName}",
    }),
  );
export type AuthorizationPoliciesGetInput =
  typeof AuthorizationPoliciesGetInput.Type;

// Output Schema
export const AuthorizationPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type AuthorizationPoliciesGetOutput =
  typeof AuthorizationPoliciesGetOutput.Type;

// The operation
/**
 * Gets an authorization policy in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param authorizationPolicyName - The name of the policy.
 */
export const AuthorizationPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AuthorizationPoliciesGetInput,
    outputSchema: AuthorizationPoliciesGetOutput,
  }),
);
// Input Schema
export const AuthorizationPoliciesListByHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/authorizationPolicies",
    }),
  );
export type AuthorizationPoliciesListByHubInput =
  typeof AuthorizationPoliciesListByHubInput.Type;

// Output Schema
export const AuthorizationPoliciesListByHubOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type AuthorizationPoliciesListByHubOutput =
  typeof AuthorizationPoliciesListByHubOutput.Type;

// The operation
/**
 * Gets all the authorization policies in a specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const AuthorizationPoliciesListByHub =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AuthorizationPoliciesListByHubInput,
    outputSchema: AuthorizationPoliciesListByHubOutput,
  }));
// Input Schema
export const AuthorizationPoliciesRegeneratePrimaryKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    authorizationPolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/authorizationPolicies/{authorizationPolicyName}/regeneratePrimaryKey",
    }),
  );
export type AuthorizationPoliciesRegeneratePrimaryKeyInput =
  typeof AuthorizationPoliciesRegeneratePrimaryKeyInput.Type;

// Output Schema
export const AuthorizationPoliciesRegeneratePrimaryKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policyName: Schema.optional(Schema.String),
    permissions: Schema.Array(Schema.Literals(["Read", "Write", "Manage"])),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
  });
export type AuthorizationPoliciesRegeneratePrimaryKeyOutput =
  typeof AuthorizationPoliciesRegeneratePrimaryKeyOutput.Type;

// The operation
/**
 * Regenerates the primary policy key of the specified authorization policy.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param authorizationPolicyName - The name of the policy.
 */
export const AuthorizationPoliciesRegeneratePrimaryKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AuthorizationPoliciesRegeneratePrimaryKeyInput,
    outputSchema: AuthorizationPoliciesRegeneratePrimaryKeyOutput,
  }));
// Input Schema
export const AuthorizationPoliciesRegenerateSecondaryKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    authorizationPolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/authorizationPolicies/{authorizationPolicyName}/regenerateSecondaryKey",
    }),
  );
export type AuthorizationPoliciesRegenerateSecondaryKeyInput =
  typeof AuthorizationPoliciesRegenerateSecondaryKeyInput.Type;

// Output Schema
export const AuthorizationPoliciesRegenerateSecondaryKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    policyName: Schema.optional(Schema.String),
    permissions: Schema.Array(Schema.Literals(["Read", "Write", "Manage"])),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
  });
export type AuthorizationPoliciesRegenerateSecondaryKeyOutput =
  typeof AuthorizationPoliciesRegenerateSecondaryKeyOutput.Type;

// The operation
/**
 * Regenerates the secondary policy key of the specified authorization policy.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param authorizationPolicyName - The name of the policy.
 */
export const AuthorizationPoliciesRegenerateSecondaryKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AuthorizationPoliciesRegenerateSecondaryKeyInput,
    outputSchema: AuthorizationPoliciesRegenerateSecondaryKeyOutput,
  }));
// Input Schema
export const ConnectorMappingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    connectorName: Schema.String.pipe(T.PathParam()),
    mappingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/connectors/{connectorName}/mappings/{mappingName}",
    }),
  );
export type ConnectorMappingsCreateOrUpdateInput =
  typeof ConnectorMappingsCreateOrUpdateInput.Type;

// Output Schema
export const ConnectorMappingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ConnectorMappingsCreateOrUpdateOutput =
  typeof ConnectorMappingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a connector mapping or updates an existing connector mapping in the connector.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param connectorName - The name of the connector.
 * @param mappingName - The name of the connector mapping.
 */
export const ConnectorMappingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectorMappingsCreateOrUpdateInput,
    outputSchema: ConnectorMappingsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConnectorMappingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    connectorName: Schema.String.pipe(T.PathParam()),
    mappingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/connectors/{connectorName}/mappings/{mappingName}",
    }),
  );
export type ConnectorMappingsDeleteInput =
  typeof ConnectorMappingsDeleteInput.Type;

// Output Schema
export const ConnectorMappingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectorMappingsDeleteOutput =
  typeof ConnectorMappingsDeleteOutput.Type;

// The operation
/**
 * Deletes a connector mapping in the connector.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param connectorName - The name of the connector.
 * @param mappingName - The name of the connector mapping.
 */
export const ConnectorMappingsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectorMappingsDeleteInput,
    outputSchema: ConnectorMappingsDeleteOutput,
  }),
);
// Input Schema
export const ConnectorMappingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    connectorName: Schema.String.pipe(T.PathParam()),
    mappingName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/connectors/{connectorName}/mappings/{mappingName}",
    }),
  );
export type ConnectorMappingsGetInput = typeof ConnectorMappingsGetInput.Type;

// Output Schema
export const ConnectorMappingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ConnectorMappingsGetOutput = typeof ConnectorMappingsGetOutput.Type;

// The operation
/**
 * Gets a connector mapping in the connector.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param connectorName - The name of the connector.
 * @param mappingName - The name of the connector mapping.
 */
export const ConnectorMappingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectorMappingsGetInput,
    outputSchema: ConnectorMappingsGetOutput,
  }),
);
// Input Schema
export const ConnectorMappingsListByConnectorInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    connectorName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/connectors/{connectorName}/mappings",
    }),
  );
export type ConnectorMappingsListByConnectorInput =
  typeof ConnectorMappingsListByConnectorInput.Type;

// Output Schema
export const ConnectorMappingsListByConnectorOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectorMappingsListByConnectorOutput =
  typeof ConnectorMappingsListByConnectorOutput.Type;

// The operation
/**
 * Gets all the connector mappings in the specified connector.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param connectorName - The name of the connector.
 */
export const ConnectorMappingsListByConnector =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectorMappingsListByConnectorInput,
    outputSchema: ConnectorMappingsListByConnectorOutput,
  }));
// Input Schema
export const ConnectorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    connectorName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/connectors/{connectorName}",
    }),
  );
export type ConnectorsCreateOrUpdateInput =
  typeof ConnectorsCreateOrUpdateInput.Type;

// Output Schema
export const ConnectorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ConnectorsCreateOrUpdateOutput =
  typeof ConnectorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a connector or updates an existing connector in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param connectorName - The name of the connector.
 */
export const ConnectorsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectorsCreateOrUpdateInput,
    outputSchema: ConnectorsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ConnectorsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  connectorName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/connectors/{connectorName}",
  }),
);
export type ConnectorsDeleteInput = typeof ConnectorsDeleteInput.Type;

// Output Schema
export const ConnectorsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectorsDeleteOutput = typeof ConnectorsDeleteOutput.Type;

// The operation
/**
 * Deletes a connector in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param connectorName - The name of the connector.
 */
export const ConnectorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorsDeleteInput,
  outputSchema: ConnectorsDeleteOutput,
}));
// Input Schema
export const ConnectorsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  connectorName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/connectors/{connectorName}",
  }),
);
export type ConnectorsGetInput = typeof ConnectorsGetInput.Type;

// Output Schema
export const ConnectorsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ConnectorsGetOutput = typeof ConnectorsGetOutput.Type;

// The operation
/**
 * Gets a connector in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param connectorName - The name of the connector.
 */
export const ConnectorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorsGetInput,
  outputSchema: ConnectorsGetOutput,
}));
// Input Schema
export const ConnectorsListByHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/connectors",
    }),
  );
export type ConnectorsListByHubInput = typeof ConnectorsListByHubInput.Type;

// Output Schema
export const ConnectorsListByHubOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type ConnectorsListByHubOutput = typeof ConnectorsListByHubOutput.Type;

// The operation
/**
 * Gets all the connectors in the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const ConnectorsListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectorsListByHubInput,
  outputSchema: ConnectorsListByHubOutput,
}));
// Input Schema
export const HubsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}",
    }),
  );
export type HubsCreateOrUpdateInput = typeof HubsCreateOrUpdateInput.Type;

// Output Schema
export const HubsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type HubsCreateOrUpdateOutput = typeof HubsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a hub, or updates an existing hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the Hub.
 */
export const HubsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HubsCreateOrUpdateInput,
  outputSchema: HubsCreateOrUpdateOutput,
}));
// Input Schema
export const HubsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}",
  }),
);
export type HubsDeleteInput = typeof HubsDeleteInput.Type;

// Output Schema
export const HubsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HubsDeleteOutput = typeof HubsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const HubsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HubsDeleteInput,
  outputSchema: HubsDeleteOutput,
}));
// Input Schema
export const HubsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}",
  }),
);
export type HubsGetInput = typeof HubsGetInput.Type;

// Output Schema
export const HubsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type HubsGetOutput = typeof HubsGetOutput.Type;

// The operation
/**
 * Gets information about the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const HubsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HubsGetInput,
  outputSchema: HubsGetOutput,
}));
// Input Schema
export const HubsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.CustomerInsights/hubs",
  }),
);
export type HubsListInput = typeof HubsListInput.Type;

// Output Schema
export const HubsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type HubsListOutput = typeof HubsListOutput.Type;

// The operation
/**
 * Gets all hubs in the specified subscription.
 */
export const HubsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HubsListInput,
  outputSchema: HubsListOutput,
}));
// Input Schema
export const HubsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs",
    }),
  );
export type HubsListByResourceGroupInput =
  typeof HubsListByResourceGroupInput.Type;

// Output Schema
export const HubsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type HubsListByResourceGroupOutput =
  typeof HubsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all the hubs in a resource group.
 *
 * @param resourceGroupName - The name of the resource group.
 */
export const HubsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HubsListByResourceGroupInput,
    outputSchema: HubsListByResourceGroupOutput,
  }),
);
// Input Schema
export const HubsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}",
  }),
);
export type HubsUpdateInput = typeof HubsUpdateInput.Type;

// Output Schema
export const HubsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type HubsUpdateOutput = typeof HubsUpdateOutput.Type;

// The operation
/**
 * Updates a Hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the Hub.
 */
export const HubsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: HubsUpdateInput,
  outputSchema: HubsUpdateOutput,
}));
// Input Schema
export const ImagesGetUploadUrlForDataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/images/getDataImageUploadUrl",
    }),
  );
export type ImagesGetUploadUrlForDataInput =
  typeof ImagesGetUploadUrlForDataInput.Type;

// Output Schema
export const ImagesGetUploadUrlForDataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    imageExists: Schema.optional(Schema.Boolean),
    contentUrl: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
  });
export type ImagesGetUploadUrlForDataOutput =
  typeof ImagesGetUploadUrlForDataOutput.Type;

// The operation
/**
 * Gets data image upload URL.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const ImagesGetUploadUrlForData = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ImagesGetUploadUrlForDataInput,
    outputSchema: ImagesGetUploadUrlForDataOutput,
  }),
);
// Input Schema
export const ImagesGetUploadUrlForEntityTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/images/getEntityTypeImageUploadUrl",
    }),
  );
export type ImagesGetUploadUrlForEntityTypeInput =
  typeof ImagesGetUploadUrlForEntityTypeInput.Type;

// Output Schema
export const ImagesGetUploadUrlForEntityTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    imageExists: Schema.optional(Schema.Boolean),
    contentUrl: Schema.optional(Schema.String),
    relativePath: Schema.optional(Schema.String),
  });
export type ImagesGetUploadUrlForEntityTypeOutput =
  typeof ImagesGetUploadUrlForEntityTypeOutput.Type;

// The operation
/**
 * Gets entity type (profile or interaction) image upload URL.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const ImagesGetUploadUrlForEntityType =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ImagesGetUploadUrlForEntityTypeInput,
    outputSchema: ImagesGetUploadUrlForEntityTypeOutput,
  }));
// Input Schema
export const InteractionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    interactionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/interactions/{interactionName}",
    }),
  );
export type InteractionsCreateOrUpdateInput =
  typeof InteractionsCreateOrUpdateInput.Type;

// Output Schema
export const InteractionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type InteractionsCreateOrUpdateOutput =
  typeof InteractionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates an interaction or updates an existing interaction within a hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param interactionName - The name of the interaction.
 */
export const InteractionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InteractionsCreateOrUpdateInput,
    outputSchema: InteractionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const InteractionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  interactionName: Schema.String.pipe(T.PathParam()),
  "locale-code": Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/interactions/{interactionName}",
  }),
);
export type InteractionsGetInput = typeof InteractionsGetInput.Type;

// Output Schema
export const InteractionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type InteractionsGetOutput = typeof InteractionsGetOutput.Type;

// The operation
/**
 * Gets information about the specified interaction.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param interactionName - The name of the interaction.
 * @param locale-code - Locale of interaction to retrieve, default is en-us.
 */
export const InteractionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InteractionsGetInput,
  outputSchema: InteractionsGetOutput,
}));
// Input Schema
export const InteractionsListByHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    "locale-code": Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/interactions",
    }),
  );
export type InteractionsListByHubInput = typeof InteractionsListByHubInput.Type;

// Output Schema
export const InteractionsListByHubOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type InteractionsListByHubOutput =
  typeof InteractionsListByHubOutput.Type;

// The operation
/**
 * Gets all interactions in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param locale-code - Locale of interaction to retrieve, default is en-us.
 */
export const InteractionsListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InteractionsListByHubInput,
    outputSchema: InteractionsListByHubOutput,
  }),
);
// Input Schema
export const InteractionsSuggestRelationshipLinksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    interactionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/interactions/{interactionName}/suggestRelationshipLinks",
    }),
  );
export type InteractionsSuggestRelationshipLinksInput =
  typeof InteractionsSuggestRelationshipLinksInput.Type;

// Output Schema
export const InteractionsSuggestRelationshipLinksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    interactionName: Schema.optional(Schema.String),
    suggestedRelationships: Schema.optional(
      Schema.Array(
        Schema.Struct({
          profileName: Schema.optional(Schema.String),
          profilePropertyReferences: Schema.optional(
            Schema.Array(
              Schema.Struct({
                interactionPropertyName: Schema.String,
                profilePropertyName: Schema.String,
              }),
            ),
          ),
          relatedProfileName: Schema.optional(Schema.String),
          relatedProfilePropertyReferences: Schema.optional(
            Schema.Array(
              Schema.Struct({
                interactionPropertyName: Schema.String,
                profilePropertyName: Schema.String,
              }),
            ),
          ),
          existingRelationshipName: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type InteractionsSuggestRelationshipLinksOutput =
  typeof InteractionsSuggestRelationshipLinksOutput.Type;

// The operation
/**
 * Suggests relationships to create relationship links.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param interactionName - The name of the interaction.
 */
export const InteractionsSuggestRelationshipLinks =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InteractionsSuggestRelationshipLinksInput,
    outputSchema: InteractionsSuggestRelationshipLinksOutput,
  }));
// Input Schema
export const KpiCreateOrUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    kpiName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/kpi/{kpiName}",
  }),
);
export type KpiCreateOrUpdateInput = typeof KpiCreateOrUpdateInput.Type;

// Output Schema
export const KpiCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type KpiCreateOrUpdateOutput = typeof KpiCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a KPI or updates an existing KPI in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param kpiName - The name of the KPI.
 */
export const KpiCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KpiCreateOrUpdateInput,
  outputSchema: KpiCreateOrUpdateOutput,
}));
// Input Schema
export const KpiDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  kpiName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/kpi/{kpiName}",
  }),
);
export type KpiDeleteInput = typeof KpiDeleteInput.Type;

// Output Schema
export const KpiDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KpiDeleteOutput = typeof KpiDeleteOutput.Type;

// The operation
/**
 * Deletes a KPI in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param kpiName - The name of the KPI.
 */
export const KpiDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KpiDeleteInput,
  outputSchema: KpiDeleteOutput,
}));
// Input Schema
export const KpiGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  kpiName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/kpi/{kpiName}",
  }),
);
export type KpiGetInput = typeof KpiGetInput.Type;

// Output Schema
export const KpiGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type KpiGetOutput = typeof KpiGetOutput.Type;

// The operation
/**
 * Gets a KPI in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param kpiName - The name of the KPI.
 */
export const KpiGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KpiGetInput,
  outputSchema: KpiGetOutput,
}));
// Input Schema
export const KpiListByHubInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/kpi",
  }),
);
export type KpiListByHubInput = typeof KpiListByHubInput.Type;

// Output Schema
export const KpiListByHubOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type KpiListByHubOutput = typeof KpiListByHubOutput.Type;

// The operation
/**
 * Gets all the KPIs in the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const KpiListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KpiListByHubInput,
  outputSchema: KpiListByHubOutput,
}));
// Input Schema
export const KpiReprocessInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  kpiName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/kpi/{kpiName}/reprocess",
  }),
);
export type KpiReprocessInput = typeof KpiReprocessInput.Type;

// Output Schema
export const KpiReprocessOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KpiReprocessOutput = typeof KpiReprocessOutput.Type;

// The operation
/**
 * Reprocesses the Kpi values of the specified KPI.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param kpiName - The name of the KPI.
 */
export const KpiReprocess = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KpiReprocessInput,
  outputSchema: KpiReprocessOutput,
}));
// Input Schema
export const LinksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    linkName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/links/{linkName}",
    }),
  );
export type LinksCreateOrUpdateInput = typeof LinksCreateOrUpdateInput.Type;

// Output Schema
export const LinksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type LinksCreateOrUpdateOutput = typeof LinksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a link or updates an existing link in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param linkName - The name of the link.
 */
export const LinksCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LinksCreateOrUpdateInput,
  outputSchema: LinksCreateOrUpdateOutput,
}));
// Input Schema
export const LinksDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  linkName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/links/{linkName}",
  }),
);
export type LinksDeleteInput = typeof LinksDeleteInput.Type;

// Output Schema
export const LinksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LinksDeleteOutput = typeof LinksDeleteOutput.Type;

// The operation
/**
 * Deletes a link in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param linkName - The name of the link.
 */
export const LinksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LinksDeleteInput,
  outputSchema: LinksDeleteOutput,
}));
// Input Schema
export const LinksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  linkName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/links/{linkName}",
  }),
);
export type LinksGetInput = typeof LinksGetInput.Type;

// Output Schema
export const LinksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type LinksGetOutput = typeof LinksGetOutput.Type;

// The operation
/**
 * Gets a link in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param linkName - The name of the link.
 */
export const LinksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LinksGetInput,
  outputSchema: LinksGetOutput,
}));
// Input Schema
export const LinksListByHubInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/links",
  }),
);
export type LinksListByHubInput = typeof LinksListByHubInput.Type;

// Output Schema
export const LinksListByHubOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type LinksListByHubOutput = typeof LinksListByHubOutput.Type;

// The operation
/**
 * Gets all the links in the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const LinksListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LinksListByHubInput,
  outputSchema: LinksListByHubOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.CustomerInsights/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Customer Insights REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PredictionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    predictionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}",
    }),
  );
export type PredictionsCreateOrUpdateInput =
  typeof PredictionsCreateOrUpdateInput.Type;

// Output Schema
export const PredictionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PredictionsCreateOrUpdateOutput =
  typeof PredictionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a Prediction or updates an existing Prediction in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param predictionName - The name of the Prediction.
 */
export const PredictionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PredictionsCreateOrUpdateInput,
    outputSchema: PredictionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PredictionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    predictionName: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}",
  }),
);
export type PredictionsDeleteInput = typeof PredictionsDeleteInput.Type;

// Output Schema
export const PredictionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PredictionsDeleteOutput = typeof PredictionsDeleteOutput.Type;

// The operation
/**
 * Deletes a Prediction in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param predictionName - The name of the Prediction.
 */
export const PredictionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PredictionsDeleteInput,
  outputSchema: PredictionsDeleteOutput,
}));
// Input Schema
export const PredictionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  predictionName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}",
  }),
);
export type PredictionsGetInput = typeof PredictionsGetInput.Type;

// Output Schema
export const PredictionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type PredictionsGetOutput = typeof PredictionsGetOutput.Type;

// The operation
/**
 * Gets a Prediction in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param predictionName - The name of the Prediction.
 */
export const PredictionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PredictionsGetInput,
  outputSchema: PredictionsGetOutput,
}));
// Input Schema
export const PredictionsGetModelStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    predictionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}/getModelStatus",
    }),
  );
export type PredictionsGetModelStatusInput =
  typeof PredictionsGetModelStatusInput.Type;

// Output Schema
export const PredictionsGetModelStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tenantId: Schema.optional(Schema.String),
    predictionName: Schema.optional(Schema.String),
    predictionGuidId: Schema.optional(Schema.String),
    status: Schema.Literals([
      "New",
      "Provisioning",
      "ProvisioningFailed",
      "PendingDiscovering",
      "Discovering",
      "PendingFeaturing",
      "Featuring",
      "FeaturingFailed",
      "PendingTraining",
      "Training",
      "TrainingFailed",
      "Evaluating",
      "EvaluatingFailed",
      "PendingModelConfirmation",
      "Active",
      "Deleted",
      "HumanIntervention",
      "Failed",
    ]),
    message: Schema.optional(Schema.String),
    trainingSetCount: Schema.optional(Schema.Number),
    testSetCount: Schema.optional(Schema.Number),
    validationSetCount: Schema.optional(Schema.Number),
    trainingAccuracy: Schema.optional(Schema.Number),
    signalsUsed: Schema.optional(Schema.Number),
    modelVersion: Schema.optional(Schema.String),
  });
export type PredictionsGetModelStatusOutput =
  typeof PredictionsGetModelStatusOutput.Type;

// The operation
/**
 * Gets model status of the prediction.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param predictionName - The name of the Prediction.
 */
export const PredictionsGetModelStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PredictionsGetModelStatusInput,
    outputSchema: PredictionsGetModelStatusOutput,
  }),
);
// Input Schema
export const PredictionsGetTrainingResultsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    predictionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}/getTrainingResults",
    }),
  );
export type PredictionsGetTrainingResultsInput =
  typeof PredictionsGetTrainingResultsInput.Type;

// Output Schema
export const PredictionsGetTrainingResultsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tenantId: Schema.optional(Schema.String),
    scoreName: Schema.optional(Schema.String),
    predictionDistribution: Schema.optional(
      Schema.Struct({
        totalPositives: Schema.optional(Schema.Number),
        totalNegatives: Schema.optional(Schema.Number),
        distributions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              scoreThreshold: Schema.optional(Schema.Number),
              positives: Schema.optional(Schema.Number),
              negatives: Schema.optional(Schema.Number),
              positivesAboveThreshold: Schema.optional(Schema.Number),
              negativesAboveThreshold: Schema.optional(Schema.Number),
            }),
          ),
        ),
      }),
    ),
    canonicalProfiles: Schema.optional(
      Schema.Array(
        Schema.Struct({
          canonicalProfileId: Schema.optional(Schema.Number),
          properties: Schema.optional(
            Schema.Array(
              Schema.Struct({
                profileName: Schema.optional(Schema.String),
                profilePropertyName: Schema.optional(Schema.String),
                rank: Schema.optional(Schema.Number),
                type: Schema.optional(
                  Schema.Literals([
                    "Numeric",
                    "Categorical",
                    "DerivedCategorical",
                    "DerivedNumeric",
                  ]),
                ),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    primaryProfileInstanceCount: Schema.optional(Schema.Number),
  });
export type PredictionsGetTrainingResultsOutput =
  typeof PredictionsGetTrainingResultsOutput.Type;

// The operation
/**
 * Gets training results.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param predictionName - The name of the Prediction.
 */
export const PredictionsGetTrainingResults =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PredictionsGetTrainingResultsInput,
    outputSchema: PredictionsGetTrainingResultsOutput,
  }));
// Input Schema
export const PredictionsListByHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions",
    }),
  );
export type PredictionsListByHubInput = typeof PredictionsListByHubInput.Type;

// Output Schema
export const PredictionsListByHubOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type PredictionsListByHubOutput = typeof PredictionsListByHubOutput.Type;

// The operation
/**
 * Gets all the predictions in the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const PredictionsListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PredictionsListByHubInput,
    outputSchema: PredictionsListByHubOutput,
  }),
);
// Input Schema
export const PredictionsModelStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    predictionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/predictions/{predictionName}/modelStatus",
    }),
  );
export type PredictionsModelStatusInput =
  typeof PredictionsModelStatusInput.Type;

// Output Schema
export const PredictionsModelStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PredictionsModelStatusOutput =
  typeof PredictionsModelStatusOutput.Type;

// The operation
/**
 * Creates or updates the model status of prediction.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param predictionName - The name of the Prediction.
 */
export const PredictionsModelStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PredictionsModelStatusInput,
    outputSchema: PredictionsModelStatusOutput,
  }),
);
// Input Schema
export const ProfilesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/profiles/{profileName}",
    }),
  );
export type ProfilesCreateOrUpdateInput =
  typeof ProfilesCreateOrUpdateInput.Type;

// Output Schema
export const ProfilesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ProfilesCreateOrUpdateOutput =
  typeof ProfilesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a profile within a Hub, or updates an existing profile.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param profileName - The name of the profile.
 */
export const ProfilesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProfilesCreateOrUpdateInput,
    outputSchema: ProfilesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ProfilesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  "locale-code": Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/profiles/{profileName}",
  }),
);
export type ProfilesDeleteInput = typeof ProfilesDeleteInput.Type;

// Output Schema
export const ProfilesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProfilesDeleteOutput = typeof ProfilesDeleteOutput.Type;

// The operation
/**
 * Deletes a profile within a hub
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param profileName - The name of the profile.
 * @param locale-code - Locale of profile to retrieve, default is en-us.
 */
export const ProfilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesDeleteInput,
  outputSchema: ProfilesDeleteOutput,
}));
// Input Schema
export const ProfilesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  "locale-code": Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/profiles/{profileName}",
  }),
);
export type ProfilesGetInput = typeof ProfilesGetInput.Type;

// Output Schema
export const ProfilesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ProfilesGetOutput = typeof ProfilesGetOutput.Type;

// The operation
/**
 * Gets information about the specified profile.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param profileName - The name of the profile.
 * @param locale-code - Locale of profile to retrieve, default is en-us.
 */
export const ProfilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesGetInput,
  outputSchema: ProfilesGetOutput,
}));
// Input Schema
export const ProfilesGetEnrichingKpisInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/profiles/{profileName}/getEnrichingKpis",
    }),
  );
export type ProfilesGetEnrichingKpisInput =
  typeof ProfilesGetEnrichingKpisInput.Type;

// Output Schema
export const ProfilesGetEnrichingKpisOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      entityType: Schema.Literals([
        "None",
        "Profile",
        "Interaction",
        "Relationship",
      ]),
      entityTypeName: Schema.String,
      tenantId: Schema.optional(Schema.String),
      kpiName: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      description: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      calculationWindow: Schema.Literals([
        "Lifetime",
        "Hour",
        "Day",
        "Week",
        "Month",
      ]),
      calculationWindowFieldName: Schema.optional(Schema.String),
      function: Schema.Literals([
        "Sum",
        "Avg",
        "Min",
        "Max",
        "Last",
        "Count",
        "None",
        "CountDistinct",
      ]),
      expression: Schema.String,
      unit: Schema.optional(Schema.String),
      filter: Schema.optional(Schema.String),
      groupBy: Schema.optional(Schema.Array(Schema.String)),
      groupByMetadata: Schema.optional(
        Schema.Array(
          Schema.Struct({
            displayName: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            fieldName: Schema.optional(Schema.String),
            fieldType: Schema.optional(Schema.String),
          }),
        ),
      ),
      participantProfilesMetadata: Schema.optional(
        Schema.Array(
          Schema.Struct({
            typeName: Schema.String,
          }),
        ),
      ),
      provisioningState: Schema.optional(
        Schema.Literals([
          "Provisioning",
          "Succeeded",
          "Expiring",
          "Deleting",
          "HumanIntervention",
          "Failed",
        ]),
      ),
      thresHolds: Schema.optional(
        Schema.Struct({
          lowerLimit: Schema.Number,
          upperLimit: Schema.Number,
          increasingKpi: Schema.Boolean,
        }),
      ),
      aliases: Schema.optional(
        Schema.Array(
          Schema.Struct({
            aliasName: Schema.String,
            expression: Schema.String,
          }),
        ),
      ),
      extracts: Schema.optional(
        Schema.Array(
          Schema.Struct({
            extractName: Schema.String,
            expression: Schema.String,
          }),
        ),
      ),
    }),
  );
export type ProfilesGetEnrichingKpisOutput =
  typeof ProfilesGetEnrichingKpisOutput.Type;

// The operation
/**
 * Gets the KPIs that enrich the profile Type identified by the supplied name. Enrichment happens through participants of the Interaction on an Interaction KPI and through Relationships for Profile KPIs.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param profileName - The name of the profile.
 */
export const ProfilesGetEnrichingKpis = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProfilesGetEnrichingKpisInput,
    outputSchema: ProfilesGetEnrichingKpisOutput,
  }),
);
// Input Schema
export const ProfilesListByHubInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    "locale-code": Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/profiles",
  }),
);
export type ProfilesListByHubInput = typeof ProfilesListByHubInput.Type;

// Output Schema
export const ProfilesListByHubOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type ProfilesListByHubOutput = typeof ProfilesListByHubOutput.Type;

// The operation
/**
 * Gets all profile in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param locale-code - Locale of profile to retrieve, default is en-us.
 */
export const ProfilesListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesListByHubInput,
  outputSchema: ProfilesListByHubOutput,
}));
// Input Schema
export const RelationshipLinksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    relationshipLinkName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/relationshipLinks/{relationshipLinkName}",
    }),
  );
export type RelationshipLinksCreateOrUpdateInput =
  typeof RelationshipLinksCreateOrUpdateInput.Type;

// Output Schema
export const RelationshipLinksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type RelationshipLinksCreateOrUpdateOutput =
  typeof RelationshipLinksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a relationship link or updates an existing relationship link within a hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param relationshipLinkName - The name of the relationship link.
 */
export const RelationshipLinksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RelationshipLinksCreateOrUpdateInput,
    outputSchema: RelationshipLinksCreateOrUpdateOutput,
  }));
// Input Schema
export const RelationshipLinksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    relationshipLinkName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/relationshipLinks/{relationshipLinkName}",
    }),
  );
export type RelationshipLinksDeleteInput =
  typeof RelationshipLinksDeleteInput.Type;

// Output Schema
export const RelationshipLinksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RelationshipLinksDeleteOutput =
  typeof RelationshipLinksDeleteOutput.Type;

// The operation
/**
 * Deletes a relationship link within a hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param relationshipLinkName - The name of the relationship.
 */
export const RelationshipLinksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RelationshipLinksDeleteInput,
    outputSchema: RelationshipLinksDeleteOutput,
  }),
);
// Input Schema
export const RelationshipLinksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    relationshipLinkName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/relationshipLinks/{relationshipLinkName}",
    }),
  );
export type RelationshipLinksGetInput = typeof RelationshipLinksGetInput.Type;

// Output Schema
export const RelationshipLinksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type RelationshipLinksGetOutput = typeof RelationshipLinksGetOutput.Type;

// The operation
/**
 * Gets information about the specified relationship Link.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param relationshipLinkName - The name of the relationship link.
 */
export const RelationshipLinksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RelationshipLinksGetInput,
    outputSchema: RelationshipLinksGetOutput,
  }),
);
// Input Schema
export const RelationshipLinksListByHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/relationshipLinks",
    }),
  );
export type RelationshipLinksListByHubInput =
  typeof RelationshipLinksListByHubInput.Type;

// Output Schema
export const RelationshipLinksListByHubOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type RelationshipLinksListByHubOutput =
  typeof RelationshipLinksListByHubOutput.Type;

// The operation
/**
 * Gets all relationship links in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const RelationshipLinksListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RelationshipLinksListByHubInput,
    outputSchema: RelationshipLinksListByHubOutput,
  }),
);
// Input Schema
export const RelationshipsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    relationshipName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/relationships/{relationshipName}",
    }),
  );
export type RelationshipsCreateOrUpdateInput =
  typeof RelationshipsCreateOrUpdateInput.Type;

// Output Schema
export const RelationshipsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type RelationshipsCreateOrUpdateOutput =
  typeof RelationshipsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a relationship or updates an existing relationship within a hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param relationshipName - The name of the Relationship.
 */
export const RelationshipsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RelationshipsCreateOrUpdateInput,
    outputSchema: RelationshipsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const RelationshipsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    relationshipName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/relationships/{relationshipName}",
    }),
  );
export type RelationshipsDeleteInput = typeof RelationshipsDeleteInput.Type;

// Output Schema
export const RelationshipsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RelationshipsDeleteOutput = typeof RelationshipsDeleteOutput.Type;

// The operation
/**
 * Deletes a relationship within a hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param relationshipName - The name of the relationship.
 */
export const RelationshipsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RelationshipsDeleteInput,
  outputSchema: RelationshipsDeleteOutput,
}));
// Input Schema
export const RelationshipsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  relationshipName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/relationships/{relationshipName}",
  }),
);
export type RelationshipsGetInput = typeof RelationshipsGetInput.Type;

// Output Schema
export const RelationshipsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  },
);
export type RelationshipsGetOutput = typeof RelationshipsGetOutput.Type;

// The operation
/**
 * Gets information about the specified relationship.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param relationshipName - The name of the relationship.
 */
export const RelationshipsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RelationshipsGetInput,
  outputSchema: RelationshipsGetOutput,
}));
// Input Schema
export const RelationshipsListByHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/relationships",
    }),
  );
export type RelationshipsListByHubInput =
  typeof RelationshipsListByHubInput.Type;

// Output Schema
export const RelationshipsListByHubOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type RelationshipsListByHubOutput =
  typeof RelationshipsListByHubOutput.Type;

// The operation
/**
 * Gets all relationships in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const RelationshipsListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RelationshipsListByHubInput,
    outputSchema: RelationshipsListByHubOutput,
  }),
);
// Input Schema
export const RoleAssignmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    assignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/roleAssignments/{assignmentName}",
    }),
  );
export type RoleAssignmentsCreateOrUpdateInput =
  typeof RoleAssignmentsCreateOrUpdateInput.Type;

// Output Schema
export const RoleAssignmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type RoleAssignmentsCreateOrUpdateOutput =
  typeof RoleAssignmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a role assignment in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param assignmentName - The assignment name
 */
export const RoleAssignmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RoleAssignmentsCreateOrUpdateInput,
    outputSchema: RoleAssignmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const RoleAssignmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    assignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/roleAssignments/{assignmentName}",
    }),
  );
export type RoleAssignmentsDeleteInput = typeof RoleAssignmentsDeleteInput.Type;

// Output Schema
export const RoleAssignmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RoleAssignmentsDeleteOutput =
  typeof RoleAssignmentsDeleteOutput.Type;

// The operation
/**
 * Deletes the role assignment in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param assignmentName - The name of the role assignment.
 */
export const RoleAssignmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoleAssignmentsDeleteInput,
    outputSchema: RoleAssignmentsDeleteOutput,
  }),
);
// Input Schema
export const RoleAssignmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    assignmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/roleAssignments/{assignmentName}",
    }),
  );
export type RoleAssignmentsGetInput = typeof RoleAssignmentsGetInput.Type;

// Output Schema
export const RoleAssignmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type RoleAssignmentsGetOutput = typeof RoleAssignmentsGetOutput.Type;

// The operation
/**
 * Gets the role assignment in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param assignmentName - The name of the role assignment.
 */
export const RoleAssignmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoleAssignmentsGetInput,
  outputSchema: RoleAssignmentsGetOutput,
}));
// Input Schema
export const RoleAssignmentsListByHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/roleAssignments",
    }),
  );
export type RoleAssignmentsListByHubInput =
  typeof RoleAssignmentsListByHubInput.Type;

// Output Schema
export const RoleAssignmentsListByHubOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type RoleAssignmentsListByHubOutput =
  typeof RoleAssignmentsListByHubOutput.Type;

// The operation
/**
 * Gets all the role assignments for the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const RoleAssignmentsListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoleAssignmentsListByHubInput,
    outputSchema: RoleAssignmentsListByHubOutput,
  }),
);
// Input Schema
export const RolesListByHubInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/roles",
  }),
);
export type RolesListByHubInput = typeof RolesListByHubInput.Type;

// Output Schema
export const RolesListByHubOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type RolesListByHubOutput = typeof RolesListByHubOutput.Type;

// The operation
/**
 * Gets all the roles for the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const RolesListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RolesListByHubInput,
  outputSchema: RolesListByHubOutput,
}));
// Input Schema
export const ViewsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
    viewName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/views/{viewName}",
    }),
  );
export type ViewsCreateOrUpdateInput = typeof ViewsCreateOrUpdateInput.Type;

// Output Schema
export const ViewsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ViewsCreateOrUpdateOutput = typeof ViewsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a view or updates an existing view in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param viewName - The name of the view.
 */
export const ViewsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsCreateOrUpdateInput,
  outputSchema: ViewsCreateOrUpdateOutput,
}));
// Input Schema
export const ViewsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  viewName: Schema.String.pipe(T.PathParam()),
  userId: Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/views/{viewName}",
  }),
);
export type ViewsDeleteInput = typeof ViewsDeleteInput.Type;

// Output Schema
export const ViewsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ViewsDeleteOutput = typeof ViewsDeleteOutput.Type;

// The operation
/**
 * Deletes a view in the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param viewName - The name of the view.
 * @param userId - The user ID. Use * to retrieve hub level view.
 */
export const ViewsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsDeleteInput,
  outputSchema: ViewsDeleteOutput,
}));
// Input Schema
export const ViewsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  viewName: Schema.String.pipe(T.PathParam()),
  userId: Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/views/{viewName}",
  }),
);
export type ViewsGetInput = typeof ViewsGetInput.Type;

// Output Schema
export const ViewsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ViewsGetOutput = typeof ViewsGetOutput.Type;

// The operation
/**
 * Gets a view in the hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param viewName - The name of the view.
 * @param userId - The user ID. Use * to retrieve hub level view.
 */
export const ViewsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsGetInput,
  outputSchema: ViewsGetOutput,
}));
// Input Schema
export const ViewsListByHubInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  userId: Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/views",
  }),
);
export type ViewsListByHubInput = typeof ViewsListByHubInput.Type;

// Output Schema
export const ViewsListByHubOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ViewsListByHubOutput = typeof ViewsListByHubOutput.Type;

// The operation
/**
 * Gets all available views for given user in the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param userId - The user ID. Use * to retrieve hub level views.
 */
export const ViewsListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsListByHubInput,
  outputSchema: ViewsListByHubOutput,
}));
// Input Schema
export const WidgetTypesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  hubName: Schema.String.pipe(T.PathParam()),
  widgetTypeName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/widgetTypes/{widgetTypeName}",
  }),
);
export type WidgetTypesGetInput = typeof WidgetTypesGetInput.Type;

// Output Schema
export const WidgetTypesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type WidgetTypesGetOutput = typeof WidgetTypesGetOutput.Type;

// The operation
/**
 * Gets a widget type in the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 * @param widgetTypeName - The name of the widget type.
 */
export const WidgetTypesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WidgetTypesGetInput,
  outputSchema: WidgetTypesGetOutput,
}));
// Input Schema
export const WidgetTypesListByHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    hubName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/widgetTypes",
    }),
  );
export type WidgetTypesListByHubInput = typeof WidgetTypesListByHubInput.Type;

// Output Schema
export const WidgetTypesListByHubOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type WidgetTypesListByHubOutput = typeof WidgetTypesListByHubOutput.Type;

// The operation
/**
 * Gets all available widget types in the specified hub.
 *
 * @param resourceGroupName - The name of the resource group.
 * @param hubName - The name of the hub.
 */
export const WidgetTypesListByHub = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WidgetTypesListByHubInput,
    outputSchema: WidgetTypesListByHubOutput,
  }),
);
