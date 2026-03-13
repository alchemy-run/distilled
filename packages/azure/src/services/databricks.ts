/**
 * Azure Databricks API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccessConnectorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/accessConnectors/{connectorName}",
    }),
  );
export type AccessConnectorsCreateOrUpdateInput =
  typeof AccessConnectorsCreateOrUpdateInput.Type;

// Output Schema
export const AccessConnectorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccessConnectorsCreateOrUpdateOutput =
  typeof AccessConnectorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates Azure Databricks Access Connector.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AccessConnectorsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessConnectorsCreateOrUpdateInput,
    outputSchema: AccessConnectorsCreateOrUpdateOutput,
  }));
// Input Schema
export const AccessConnectorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/accessConnectors/{connectorName}",
    }),
  );
export type AccessConnectorsDeleteInput =
  typeof AccessConnectorsDeleteInput.Type;

// Output Schema
export const AccessConnectorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccessConnectorsDeleteOutput =
  typeof AccessConnectorsDeleteOutput.Type;

// The operation
/**
 * Deletes the Azure Databricks Access Connector.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AccessConnectorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessConnectorsDeleteInput,
    outputSchema: AccessConnectorsDeleteOutput,
  }),
);
// Input Schema
export const AccessConnectorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/accessConnectors/{connectorName}",
    }),
  );
export type AccessConnectorsGetInput = typeof AccessConnectorsGetInput.Type;

// Output Schema
export const AccessConnectorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccessConnectorsGetOutput = typeof AccessConnectorsGetOutput.Type;

// The operation
/**
 * Gets an Azure Databricks Access Connector.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AccessConnectorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccessConnectorsGetInput,
  outputSchema: AccessConnectorsGetOutput,
}));
// Input Schema
export const AccessConnectorsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/accessConnectors",
    }),
  );
export type AccessConnectorsListByResourceGroupInput =
  typeof AccessConnectorsListByResourceGroupInput.Type;

// Output Schema
export const AccessConnectorsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccessConnectorsListByResourceGroupOutput =
  typeof AccessConnectorsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all the Azure Databricks Access Connectors within a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AccessConnectorsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessConnectorsListByResourceGroupInput,
    outputSchema: AccessConnectorsListByResourceGroupOutput,
  }));
// Input Schema
export const AccessConnectorsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Databricks/accessConnectors",
    }),
  );
export type AccessConnectorsListBySubscriptionInput =
  typeof AccessConnectorsListBySubscriptionInput.Type;

// Output Schema
export const AccessConnectorsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccessConnectorsListBySubscriptionOutput =
  typeof AccessConnectorsListBySubscriptionOutput.Type;

// The operation
/**
 * Gets all the Azure Databricks Access Connectors within a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AccessConnectorsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessConnectorsListBySubscriptionInput,
    outputSchema: AccessConnectorsListBySubscriptionOutput,
  }));
// Input Schema
export const AccessConnectorsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/accessConnectors/{connectorName}",
    }),
  );
export type AccessConnectorsUpdateInput =
  typeof AccessConnectorsUpdateInput.Type;

// Output Schema
export const AccessConnectorsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccessConnectorsUpdateOutput =
  typeof AccessConnectorsUpdateOutput.Type;

// The operation
/**
 * Updates an Azure Databricks Access Connector.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AccessConnectorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessConnectorsUpdateInput,
    outputSchema: AccessConnectorsUpdateOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Databricks/operations" }),
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
            description: Schema.optional(Schema.String),
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
 * Lists all of the available RP operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const OutboundNetworkDependenciesEndpointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type OutboundNetworkDependenciesEndpointsListInput =
  typeof OutboundNetworkDependenciesEndpointsListInput.Type;

// Output Schema
export const OutboundNetworkDependenciesEndpointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      category: Schema.optional(Schema.String),
      endpoints: Schema.optional(
        Schema.Array(
          Schema.Struct({
            domainName: Schema.optional(Schema.String),
            endpointDetails: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  ipAddress: Schema.optional(Schema.String),
                  port: Schema.optional(Schema.Number),
                  latency: Schema.optional(Schema.Number),
                  isAccessible: Schema.optional(Schema.Boolean),
                }),
              ),
            ),
          }),
        ),
      ),
    }),
  );
export type OutboundNetworkDependenciesEndpointsListOutput =
  typeof OutboundNetworkDependenciesEndpointsListOutput.Type;

// The operation
/**
 * Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified Workspace.
 *
 * Gets the list of endpoints that VNET Injected Workspace calls Azure Databricks Control Plane. You must configure outbound access with these endpoints. For more information, see https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/udr
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OutboundNetworkDependenciesEndpointsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OutboundNetworkDependenciesEndpointsListInput,
    outputSchema: OutboundNetworkDependenciesEndpointsListOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
    properties: Schema.Struct({
      privateEndpoint: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
      groupIds: Schema.optional(Schema.Array(Schema.String)),
      privateLinkServiceConnectionState: Schema.Struct({
        status: Schema.Literals([
          "Pending",
          "Approved",
          "Rejected",
          "Disconnected",
        ]),
        description: Schema.optional(Schema.String),
        actionsRequired: Schema.optional(Schema.String),
      }),
      provisioningState: Schema.optional(
        Schema.Literals([
          "Succeeded",
          "Creating",
          "Updating",
          "Deleting",
          "Failed",
        ]),
      ),
    }),
  });
export type PrivateEndpointConnectionsCreateOutput =
  typeof PrivateEndpointConnectionsCreateOutput.Type;

// The operation
/**
 * Update private endpoint connection status
 *
 * Update the status of a private endpoint connection with the specified name
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PrivateEndpointConnectionsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateInput,
    outputSchema: PrivateEndpointConnectionsCreateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Remove private endpoint connection
 *
 * Remove private endpoint connection with the specified name
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
    properties: Schema.Struct({
      privateEndpoint: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
      groupIds: Schema.optional(Schema.Array(Schema.String)),
      privateLinkServiceConnectionState: Schema.Struct({
        status: Schema.Literals([
          "Pending",
          "Approved",
          "Rejected",
          "Disconnected",
        ]),
        description: Schema.optional(Schema.String),
        actionsRequired: Schema.optional(Schema.String),
      }),
      provisioningState: Schema.optional(
        Schema.Literals([
          "Succeeded",
          "Creating",
          "Updating",
          "Deleting",
          "Failed",
        ]),
      ),
    }),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Get private endpoint connection
 *
 * Get a private endpoint connection properties for a workspace
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/privateEndpointConnections",
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
          properties: Schema.Struct({
            privateEndpoint: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
              }),
            ),
            groupIds: Schema.optional(Schema.Array(Schema.String)),
            privateLinkServiceConnectionState: Schema.Struct({
              status: Schema.Literals([
                "Pending",
                "Approved",
                "Rejected",
                "Disconnected",
              ]),
              description: Schema.optional(Schema.String),
              actionsRequired: Schema.optional(Schema.String),
            }),
            provisioningState: Schema.optional(
              Schema.Literals([
                "Succeeded",
                "Creating",
                "Updating",
                "Deleting",
                "Failed",
              ]),
            ),
          }),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * List private endpoint connections
 *
 * List private endpoint connections of the workspace
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/privateLinkResources/{groupId}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get the specified private link resource
 *
 * Get the specified private link resource for the given group id (sub-resource)
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListInput =
  typeof PrivateLinkResourcesListInput.Type;

// Output Schema
export const PrivateLinkResourcesListOutput =
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
export type PrivateLinkResourcesListOutput =
  typeof PrivateLinkResourcesListOutput.Type;

// The operation
/**
 * List private link resources
 *
 * List private link resources for a given workspace
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PrivateLinkResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesListInput,
    outputSchema: PrivateLinkResourcesListOutput,
  }),
);
// Input Schema
export const VNetPeeringCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/virtualNetworkPeerings/{peeringName}",
    }),
  );
export type VNetPeeringCreateOrUpdateInput =
  typeof VNetPeeringCreateOrUpdateInput.Type;

// Output Schema
export const VNetPeeringCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      allowVirtualNetworkAccess: Schema.optional(Schema.Boolean),
      allowForwardedTraffic: Schema.optional(Schema.Boolean),
      allowGatewayTransit: Schema.optional(Schema.Boolean),
      useRemoteGateways: Schema.optional(Schema.Boolean),
      databricksVirtualNetwork: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
      databricksAddressSpace: Schema.optional(
        Schema.Struct({
          addressPrefixes: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
      remoteVirtualNetwork: Schema.Struct({
        id: Schema.optional(Schema.String),
      }),
      remoteAddressSpace: Schema.optional(
        Schema.Struct({
          addressPrefixes: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
      peeringState: Schema.optional(
        Schema.Literals(["Initiated", "Connected", "Disconnected"]),
      ),
      provisioningState: Schema.optional(
        Schema.Literals(["Succeeded", "Updating", "Deleting", "Failed"]),
      ),
    }),
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type VNetPeeringCreateOrUpdateOutput =
  typeof VNetPeeringCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates vNet Peering for workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const vNetPeeringCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VNetPeeringCreateOrUpdateInput,
    outputSchema: VNetPeeringCreateOrUpdateOutput,
  }),
);
// Input Schema
export const VNetPeeringDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/virtualNetworkPeerings/{peeringName}",
  }),
);
export type VNetPeeringDeleteInput = typeof VNetPeeringDeleteInput.Type;

// Output Schema
export const VNetPeeringDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VNetPeeringDeleteOutput = typeof VNetPeeringDeleteOutput.Type;

// The operation
/**
 * Deletes the workspace vNetPeering.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const vNetPeeringDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VNetPeeringDeleteInput,
  outputSchema: VNetPeeringDeleteOutput,
}));
// Input Schema
export const VNetPeeringGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/virtualNetworkPeerings/{peeringName}",
  }),
);
export type VNetPeeringGetInput = typeof VNetPeeringGetInput.Type;

// Output Schema
export const VNetPeeringGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  properties: Schema.Struct({
    allowVirtualNetworkAccess: Schema.optional(Schema.Boolean),
    allowForwardedTraffic: Schema.optional(Schema.Boolean),
    allowGatewayTransit: Schema.optional(Schema.Boolean),
    useRemoteGateways: Schema.optional(Schema.Boolean),
    databricksVirtualNetwork: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
      }),
    ),
    databricksAddressSpace: Schema.optional(
      Schema.Struct({
        addressPrefixes: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    remoteVirtualNetwork: Schema.Struct({
      id: Schema.optional(Schema.String),
    }),
    remoteAddressSpace: Schema.optional(
      Schema.Struct({
        addressPrefixes: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    peeringState: Schema.optional(
      Schema.Literals(["Initiated", "Connected", "Disconnected"]),
    ),
    provisioningState: Schema.optional(
      Schema.Literals(["Succeeded", "Updating", "Deleting", "Failed"]),
    ),
  }),
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type VNetPeeringGetOutput = typeof VNetPeeringGetOutput.Type;

// The operation
/**
 * Gets the workspace vNet Peering.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const vNetPeeringGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VNetPeeringGetInput,
  outputSchema: VNetPeeringGetOutput,
}));
// Input Schema
export const VNetPeeringListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}/virtualNetworkPeerings",
    }),
  );
export type VNetPeeringListByWorkspaceInput =
  typeof VNetPeeringListByWorkspaceInput.Type;

// Output Schema
export const VNetPeeringListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.Struct({
            allowVirtualNetworkAccess: Schema.optional(Schema.Boolean),
            allowForwardedTraffic: Schema.optional(Schema.Boolean),
            allowGatewayTransit: Schema.optional(Schema.Boolean),
            useRemoteGateways: Schema.optional(Schema.Boolean),
            databricksVirtualNetwork: Schema.optional(
              Schema.Struct({
                id: Schema.optional(Schema.String),
              }),
            ),
            databricksAddressSpace: Schema.optional(
              Schema.Struct({
                addressPrefixes: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            remoteVirtualNetwork: Schema.Struct({
              id: Schema.optional(Schema.String),
            }),
            remoteAddressSpace: Schema.optional(
              Schema.Struct({
                addressPrefixes: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
            peeringState: Schema.optional(
              Schema.Literals(["Initiated", "Connected", "Disconnected"]),
            ),
            provisioningState: Schema.optional(
              Schema.Literals(["Succeeded", "Updating", "Deleting", "Failed"]),
            ),
          }),
          name: Schema.optional(Schema.String),
          id: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VNetPeeringListByWorkspaceOutput =
  typeof VNetPeeringListByWorkspaceOutput.Type;

// The operation
/**
 * Lists the workspace vNet Peerings.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const vNetPeeringListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VNetPeeringListByWorkspaceInput,
    outputSchema: VNetPeeringListByWorkspaceOutput,
  }),
);
// Input Schema
export const WorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}",
    }),
  );
export type WorkspacesCreateOrUpdateInput =
  typeof WorkspacesCreateOrUpdateInput.Type;

// Output Schema
export const WorkspacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WorkspacesCreateOrUpdateOutput =
  typeof WorkspacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WorkspacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesCreateOrUpdateInput,
    outputSchema: WorkspacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WorkspacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  forceDeletion: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}",
  }),
);
export type WorkspacesDeleteInput = typeof WorkspacesDeleteInput.Type;

// Output Schema
export const WorkspacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesDeleteOutput = typeof WorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes the workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param forceDeletion - Optional parameter to retain default unity catalog data. By default the data will retained if Uc is enabled on the workspace.
 */
export const WorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDeleteInput,
  outputSchema: WorkspacesDeleteOutput,
}));
// Input Schema
export const WorkspacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}",
  }),
);
export type WorkspacesGetInput = typeof WorkspacesGetInput.Type;

// Output Schema
export const WorkspacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WorkspacesGetOutput = typeof WorkspacesGetOutput.Type;

// The operation
/**
 * Gets the workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesGetInput,
  outputSchema: WorkspacesGetOutput,
}));
// Input Schema
export const WorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces",
    }),
  );
export type WorkspacesListByResourceGroupInput =
  typeof WorkspacesListByResourceGroupInput.Type;

// Output Schema
export const WorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspacesListByResourceGroupOutput =
  typeof WorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all the workspaces within a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListByResourceGroupInput,
    outputSchema: WorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const WorkspacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Databricks/workspaces",
    }),
  );
export type WorkspacesListBySubscriptionInput =
  typeof WorkspacesListBySubscriptionInput.Type;

// Output Schema
export const WorkspacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspacesListBySubscriptionOutput =
  typeof WorkspacesListBySubscriptionOutput.Type;

// The operation
/**
 * Gets all the workspaces within a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WorkspacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListBySubscriptionInput,
    outputSchema: WorkspacesListBySubscriptionOutput,
  }));
// Input Schema
export const WorkspacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Databricks/workspaces/{workspaceName}",
  }),
);
export type WorkspacesUpdateInput = typeof WorkspacesUpdateInput.Type;

// Output Schema
export const WorkspacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type WorkspacesUpdateOutput = typeof WorkspacesUpdateOutput.Type;

// The operation
/**
 * Updates a workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WorkspacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesUpdateInput,
  outputSchema: WorkspacesUpdateOutput,
}));
