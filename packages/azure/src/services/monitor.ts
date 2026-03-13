/**
 * Azure Monitor API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AzureMonitorWorkspacesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}",
    }),
  );
export type AzureMonitorWorkspacesCreateInput =
  typeof AzureMonitorWorkspacesCreateInput.Type;

// Output Schema
export const AzureMonitorWorkspacesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureMonitorWorkspacesCreateOutput =
  typeof AzureMonitorWorkspacesCreateOutput.Type;

// The operation
/**
 * Creates or updates an Azure Monitor Workspace
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AzureMonitorWorkspacesCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureMonitorWorkspacesCreateInput,
    outputSchema: AzureMonitorWorkspacesCreateOutput,
  }));
// Input Schema
export const AzureMonitorWorkspacesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}",
    }),
  );
export type AzureMonitorWorkspacesDeleteInput =
  typeof AzureMonitorWorkspacesDeleteInput.Type;

// Output Schema
export const AzureMonitorWorkspacesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AzureMonitorWorkspacesDeleteOutput =
  typeof AzureMonitorWorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes an Azure Monitor Workspace
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AzureMonitorWorkspacesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureMonitorWorkspacesDeleteInput,
    outputSchema: AzureMonitorWorkspacesDeleteOutput,
  }));
// Input Schema
export const AzureMonitorWorkspacesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}",
    }),
  );
export type AzureMonitorWorkspacesGetInput =
  typeof AzureMonitorWorkspacesGetInput.Type;

// Output Schema
export const AzureMonitorWorkspacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureMonitorWorkspacesGetOutput =
  typeof AzureMonitorWorkspacesGetOutput.Type;

// The operation
/**
 * Returns the specified Azure Monitor Workspace
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AzureMonitorWorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AzureMonitorWorkspacesGetInput,
    outputSchema: AzureMonitorWorkspacesGetOutput,
  }),
);
// Input Schema
export const AzureMonitorWorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts",
    }),
  );
export type AzureMonitorWorkspacesListByResourceGroupInput =
  typeof AzureMonitorWorkspacesListByResourceGroupInput.Type;

// Output Schema
export const AzureMonitorWorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureMonitorWorkspacesListByResourceGroupOutput =
  typeof AzureMonitorWorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all Azure Monitor Workspaces in the specified resource group
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AzureMonitorWorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureMonitorWorkspacesListByResourceGroupInput,
    outputSchema: AzureMonitorWorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const AzureMonitorWorkspacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Monitor/accounts",
    }),
  );
export type AzureMonitorWorkspacesListBySubscriptionInput =
  typeof AzureMonitorWorkspacesListBySubscriptionInput.Type;

// Output Schema
export const AzureMonitorWorkspacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureMonitorWorkspacesListBySubscriptionOutput =
  typeof AzureMonitorWorkspacesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all Azure Monitor Workspaces in the specified subscription
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const AzureMonitorWorkspacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureMonitorWorkspacesListBySubscriptionInput,
    outputSchema: AzureMonitorWorkspacesListBySubscriptionOutput,
  }));
// Input Schema
export const AzureMonitorWorkspacesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}",
    }),
  );
export type AzureMonitorWorkspacesUpdateInput =
  typeof AzureMonitorWorkspacesUpdateInput.Type;

// Output Schema
export const AzureMonitorWorkspacesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AzureMonitorWorkspacesUpdateOutput =
  typeof AzureMonitorWorkspacesUpdateOutput.Type;

// The operation
/**
 * Updates part of an Azure Monitor Workspace
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AzureMonitorWorkspacesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureMonitorWorkspacesUpdateInput,
    outputSchema: AzureMonitorWorkspacesUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes a private endpoint connection with a given name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Gets a private endpoint connection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/privateLinkResources/{groupName}",
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
 * Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkScopedResourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources/{name}",
    }),
  );
export type PrivateLinkScopedResourcesCreateOrUpdateInput =
  typeof PrivateLinkScopedResourcesCreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkScopedResourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateLinkScopedResourcesCreateOrUpdateOutput =
  typeof PrivateLinkScopedResourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Add an Azure monitor scoped resource in the private link scope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param name - The name of the scoped resource object.
 */
export const PrivateLinkScopedResourcesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopedResourcesCreateOrUpdateInput,
    outputSchema: PrivateLinkScopedResourcesCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkScopedResourcesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources/{name}",
    }),
  );
export type PrivateLinkScopedResourcesDeleteInput =
  typeof PrivateLinkScopedResourcesDeleteInput.Type;

// Output Schema
export const PrivateLinkScopedResourcesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkScopedResourcesDeleteOutput =
  typeof PrivateLinkScopedResourcesDeleteOutput.Type;

// The operation
/**
 * Deletes an Azure monitor scoped resource with a given name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param name - The name of the scoped resource object.
 */
export const PrivateLinkScopedResourcesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopedResourcesDeleteInput,
    outputSchema: PrivateLinkScopedResourcesDeleteOutput,
  }));
// Input Schema
export const PrivateLinkScopedResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources/{name}",
    }),
  );
export type PrivateLinkScopedResourcesGetInput =
  typeof PrivateLinkScopedResourcesGetInput.Type;

// Output Schema
export const PrivateLinkScopedResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateLinkScopedResourcesGetOutput =
  typeof PrivateLinkScopedResourcesGetOutput.Type;

// The operation
/**
 * Gets a scoped resource in a private link scope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param name - The name of the scoped resource object.
 */
export const PrivateLinkScopedResourcesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopedResourcesGetInput,
    outputSchema: PrivateLinkScopedResourcesGetOutput,
  }));
// Input Schema
export const PrivateLinkScopedResourcesListByPrivateLinkScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources",
    }),
  );
export type PrivateLinkScopedResourcesListByPrivateLinkScopeInput =
  typeof PrivateLinkScopedResourcesListByPrivateLinkScopeInput.Type;

// Output Schema
export const PrivateLinkScopedResourcesListByPrivateLinkScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkScopedResourcesListByPrivateLinkScopeOutput =
  typeof PrivateLinkScopedResourcesListByPrivateLinkScopeOutput.Type;

// The operation
/**
 * Gets all scoped resources on a private link scope.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateLinkScopedResourcesListByPrivateLinkScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopedResourcesListByPrivateLinkScopeInput,
    outputSchema: PrivateLinkScopedResourcesListByPrivateLinkScopeOutput,
  }));
// Input Schema
export const PrivateLinkScopesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}",
    }),
  );
export type PrivateLinkScopesCreateOrUpdateInput =
  typeof PrivateLinkScopesCreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkScopesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PrivateLinkScopesCreateOrUpdateOutput =
  typeof PrivateLinkScopesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates (or updates) a Azure Monitor PrivateLinkScope. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopesCreateOrUpdateInput,
    outputSchema: PrivateLinkScopesCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkScopesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}",
    }),
  );
export type PrivateLinkScopesDeleteInput =
  typeof PrivateLinkScopesDeleteInput.Type;

// Output Schema
export const PrivateLinkScopesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkScopesDeleteOutput =
  typeof PrivateLinkScopesDeleteOutput.Type;

// The operation
/**
 * Deletes a Azure Monitor PrivateLinkScope.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkScopesDeleteInput,
    outputSchema: PrivateLinkScopesDeleteOutput,
  }),
);
// Input Schema
export const PrivateLinkScopesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}",
    }),
  );
export type PrivateLinkScopesGetInput = typeof PrivateLinkScopesGetInput.Type;

// Output Schema
export const PrivateLinkScopesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PrivateLinkScopesGetOutput = typeof PrivateLinkScopesGetOutput.Type;

// The operation
/**
 * Returns a Azure Monitor PrivateLinkScope.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkScopesGetInput,
    outputSchema: PrivateLinkScopesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkScopesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/privateLinkScopes",
    }),
  );
export type PrivateLinkScopesListInput = typeof PrivateLinkScopesListInput.Type;

// Output Schema
export const PrivateLinkScopesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkScopesListOutput =
  typeof PrivateLinkScopesListOutput.Type;

// The operation
/**
 * Gets a list of all Azure Monitor PrivateLinkScopes within a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkScopesListInput,
    outputSchema: PrivateLinkScopesListOutput,
  }),
);
// Input Schema
export const PrivateLinkScopesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes",
    }),
  );
export type PrivateLinkScopesListByResourceGroupInput =
  typeof PrivateLinkScopesListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkScopesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkScopesListByResourceGroupOutput =
  typeof PrivateLinkScopesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of Azure Monitor PrivateLinkScopes within a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkScopesListByResourceGroupInput,
    outputSchema: PrivateLinkScopesListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateLinkScopesUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}",
    }),
  );
export type PrivateLinkScopesUpdateTagsInput =
  typeof PrivateLinkScopesUpdateTagsInput.Type;

// Output Schema
export const PrivateLinkScopesUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PrivateLinkScopesUpdateTagsOutput =
  typeof PrivateLinkScopesUpdateTagsOutput.Type;

// The operation
/**
 * Updates an existing PrivateLinkScope's tags. To update other fields use the CreateOrUpdate method.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkScopesUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkScopesUpdateTagsInput,
    outputSchema: PrivateLinkScopesUpdateTagsOutput,
  }),
);
// Input Schema
export const ScheduledQueryRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}",
    }),
  );
export type ScheduledQueryRulesCreateOrUpdateInput =
  typeof ScheduledQueryRulesCreateOrUpdateInput.Type;

// Output Schema
export const ScheduledQueryRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.Literals(["SystemAssigned", "UserAssigned", "None"]),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
    kind: Schema.optional(
      Schema.Literals(["LogAlert", "SimpleLogAlert", "LogToMetric"]),
    ),
    etag: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.Struct({
      createdWithApiVersion: Schema.optional(Schema.String),
      isLegacyLogAnalyticsRule: Schema.optional(Schema.Boolean),
      description: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.Literals(["0", "1", "2", "3", "4"])),
      enabled: Schema.optional(Schema.Boolean),
      scopes: Schema.optional(Schema.Array(Schema.String)),
      evaluationFrequency: Schema.optional(Schema.String),
      windowSize: Schema.optional(Schema.String),
      overrideQueryTimeRange: Schema.optional(Schema.String),
      targetResourceTypes: Schema.optional(Schema.Array(Schema.String)),
      criteria: Schema.optional(
        Schema.Struct({
          allOf: Schema.optional(
            Schema.Array(
              Schema.Struct({
                criterionType: Schema.optional(
                  Schema.Literals([
                    "StaticThresholdCriterion",
                    "DynamicThresholdCriterion",
                  ]),
                ),
                query: Schema.optional(Schema.String),
                timeAggregation: Schema.optional(
                  Schema.Literals([
                    "Count",
                    "Average",
                    "Minimum",
                    "Maximum",
                    "Total",
                  ]),
                ),
                metricMeasureColumn: Schema.optional(Schema.String),
                resourceIdColumn: Schema.optional(Schema.String),
                dimensions: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      operator: Schema.Literals(["Include", "Exclude"]),
                      values: Schema.Array(Schema.String),
                    }),
                  ),
                ),
                operator: Schema.optional(
                  Schema.Literals([
                    "Equals",
                    "GreaterThan",
                    "GreaterThanOrEqual",
                    "LessThan",
                    "LessThanOrEqual",
                    "GreaterOrLessThan",
                  ]),
                ),
                threshold: Schema.optional(Schema.Number),
                alertSensitivity: Schema.optional(Schema.String),
                ignoreDataBefore: Schema.optional(Schema.String),
                failingPeriods: Schema.optional(
                  Schema.Struct({
                    numberOfEvaluationPeriods: Schema.optional(Schema.Number),
                    minFailingPeriodsToAlert: Schema.optional(Schema.Number),
                  }),
                ),
                metricName: Schema.optional(Schema.String),
                minRecurrenceCount: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
      muteActionsDuration: Schema.optional(Schema.String),
      actions: Schema.optional(
        Schema.Struct({
          actionGroups: Schema.optional(Schema.Array(Schema.String)),
          customProperties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          actionProperties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
        }),
      ),
      isWorkspaceAlertsStorageConfigured: Schema.optional(Schema.Boolean),
      checkWorkspaceAlertsStorageConfigured: Schema.optional(Schema.Boolean),
      skipQueryValidation: Schema.optional(Schema.Boolean),
      autoMitigate: Schema.optional(Schema.Boolean),
      resolveConfiguration: Schema.optional(
        Schema.Struct({
          autoResolved: Schema.optional(Schema.Boolean),
          timeToResolve: Schema.optional(Schema.String),
        }),
      ),
    }),
  });
export type ScheduledQueryRulesCreateOrUpdateOutput =
  typeof ScheduledQueryRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a scheduled query rule.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScheduledQueryRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledQueryRulesCreateOrUpdateInput,
    outputSchema: ScheduledQueryRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const ScheduledQueryRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}",
    }),
  );
export type ScheduledQueryRulesDeleteInput =
  typeof ScheduledQueryRulesDeleteInput.Type;

// Output Schema
export const ScheduledQueryRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScheduledQueryRulesDeleteOutput =
  typeof ScheduledQueryRulesDeleteOutput.Type;

// The operation
/**
 * Deletes a scheduled query rule.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScheduledQueryRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScheduledQueryRulesDeleteInput,
    outputSchema: ScheduledQueryRulesDeleteOutput,
  }),
);
// Input Schema
export const ScheduledQueryRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}",
    }),
  );
export type ScheduledQueryRulesGetInput =
  typeof ScheduledQueryRulesGetInput.Type;

// Output Schema
export const ScheduledQueryRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.Literals(["SystemAssigned", "UserAssigned", "None"]),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
    kind: Schema.optional(
      Schema.Literals(["LogAlert", "SimpleLogAlert", "LogToMetric"]),
    ),
    etag: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.Struct({
      createdWithApiVersion: Schema.optional(Schema.String),
      isLegacyLogAnalyticsRule: Schema.optional(Schema.Boolean),
      description: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.Literals(["0", "1", "2", "3", "4"])),
      enabled: Schema.optional(Schema.Boolean),
      scopes: Schema.optional(Schema.Array(Schema.String)),
      evaluationFrequency: Schema.optional(Schema.String),
      windowSize: Schema.optional(Schema.String),
      overrideQueryTimeRange: Schema.optional(Schema.String),
      targetResourceTypes: Schema.optional(Schema.Array(Schema.String)),
      criteria: Schema.optional(
        Schema.Struct({
          allOf: Schema.optional(
            Schema.Array(
              Schema.Struct({
                criterionType: Schema.optional(
                  Schema.Literals([
                    "StaticThresholdCriterion",
                    "DynamicThresholdCriterion",
                  ]),
                ),
                query: Schema.optional(Schema.String),
                timeAggregation: Schema.optional(
                  Schema.Literals([
                    "Count",
                    "Average",
                    "Minimum",
                    "Maximum",
                    "Total",
                  ]),
                ),
                metricMeasureColumn: Schema.optional(Schema.String),
                resourceIdColumn: Schema.optional(Schema.String),
                dimensions: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      operator: Schema.Literals(["Include", "Exclude"]),
                      values: Schema.Array(Schema.String),
                    }),
                  ),
                ),
                operator: Schema.optional(
                  Schema.Literals([
                    "Equals",
                    "GreaterThan",
                    "GreaterThanOrEqual",
                    "LessThan",
                    "LessThanOrEqual",
                    "GreaterOrLessThan",
                  ]),
                ),
                threshold: Schema.optional(Schema.Number),
                alertSensitivity: Schema.optional(Schema.String),
                ignoreDataBefore: Schema.optional(Schema.String),
                failingPeriods: Schema.optional(
                  Schema.Struct({
                    numberOfEvaluationPeriods: Schema.optional(Schema.Number),
                    minFailingPeriodsToAlert: Schema.optional(Schema.Number),
                  }),
                ),
                metricName: Schema.optional(Schema.String),
                minRecurrenceCount: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
      muteActionsDuration: Schema.optional(Schema.String),
      actions: Schema.optional(
        Schema.Struct({
          actionGroups: Schema.optional(Schema.Array(Schema.String)),
          customProperties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          actionProperties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
        }),
      ),
      isWorkspaceAlertsStorageConfigured: Schema.optional(Schema.Boolean),
      checkWorkspaceAlertsStorageConfigured: Schema.optional(Schema.Boolean),
      skipQueryValidation: Schema.optional(Schema.Boolean),
      autoMitigate: Schema.optional(Schema.Boolean),
      resolveConfiguration: Schema.optional(
        Schema.Struct({
          autoResolved: Schema.optional(Schema.Boolean),
          timeToResolve: Schema.optional(Schema.String),
        }),
      ),
    }),
  });
export type ScheduledQueryRulesGetOutput =
  typeof ScheduledQueryRulesGetOutput.Type;

// The operation
/**
 * Retrieve an scheduled query rule definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScheduledQueryRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScheduledQueryRulesGetInput,
    outputSchema: ScheduledQueryRulesGetOutput,
  }),
);
// Input Schema
export const ScheduledQueryRulesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules",
    }),
  );
export type ScheduledQueryRulesListByResourceGroupInput =
  typeof ScheduledQueryRulesListByResourceGroupInput.Type;

// Output Schema
export const ScheduledQueryRulesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.Literals(["SystemAssigned", "UserAssigned", "None"]),
              userAssignedIdentities: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    principalId: Schema.optional(Schema.String),
                    clientId: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
          kind: Schema.optional(
            Schema.Literals(["LogAlert", "SimpleLogAlert", "LogToMetric"]),
          ),
          etag: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
          properties: Schema.Struct({
            createdWithApiVersion: Schema.optional(Schema.String),
            isLegacyLogAnalyticsRule: Schema.optional(Schema.Boolean),
            description: Schema.optional(Schema.String),
            displayName: Schema.optional(Schema.String),
            severity: Schema.optional(
              Schema.Literals(["0", "1", "2", "3", "4"]),
            ),
            enabled: Schema.optional(Schema.Boolean),
            scopes: Schema.optional(Schema.Array(Schema.String)),
            evaluationFrequency: Schema.optional(Schema.String),
            windowSize: Schema.optional(Schema.String),
            overrideQueryTimeRange: Schema.optional(Schema.String),
            targetResourceTypes: Schema.optional(Schema.Array(Schema.String)),
            criteria: Schema.optional(
              Schema.Struct({
                allOf: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      criterionType: Schema.optional(
                        Schema.Literals([
                          "StaticThresholdCriterion",
                          "DynamicThresholdCriterion",
                        ]),
                      ),
                      query: Schema.optional(Schema.String),
                      timeAggregation: Schema.optional(
                        Schema.Literals([
                          "Count",
                          "Average",
                          "Minimum",
                          "Maximum",
                          "Total",
                        ]),
                      ),
                      metricMeasureColumn: Schema.optional(Schema.String),
                      resourceIdColumn: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.String,
                            operator: Schema.Literals(["Include", "Exclude"]),
                            values: Schema.Array(Schema.String),
                          }),
                        ),
                      ),
                      operator: Schema.optional(
                        Schema.Literals([
                          "Equals",
                          "GreaterThan",
                          "GreaterThanOrEqual",
                          "LessThan",
                          "LessThanOrEqual",
                          "GreaterOrLessThan",
                        ]),
                      ),
                      threshold: Schema.optional(Schema.Number),
                      alertSensitivity: Schema.optional(Schema.String),
                      ignoreDataBefore: Schema.optional(Schema.String),
                      failingPeriods: Schema.optional(
                        Schema.Struct({
                          numberOfEvaluationPeriods: Schema.optional(
                            Schema.Number,
                          ),
                          minFailingPeriodsToAlert: Schema.optional(
                            Schema.Number,
                          ),
                        }),
                      ),
                      metricName: Schema.optional(Schema.String),
                      minRecurrenceCount: Schema.optional(Schema.Number),
                    }),
                  ),
                ),
              }),
            ),
            muteActionsDuration: Schema.optional(Schema.String),
            actions: Schema.optional(
              Schema.Struct({
                actionGroups: Schema.optional(Schema.Array(Schema.String)),
                customProperties: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                actionProperties: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
            isWorkspaceAlertsStorageConfigured: Schema.optional(Schema.Boolean),
            checkWorkspaceAlertsStorageConfigured: Schema.optional(
              Schema.Boolean,
            ),
            skipQueryValidation: Schema.optional(Schema.Boolean),
            autoMitigate: Schema.optional(Schema.Boolean),
            resolveConfiguration: Schema.optional(
              Schema.Struct({
                autoResolved: Schema.optional(Schema.Boolean),
                timeToResolve: Schema.optional(Schema.String),
              }),
            ),
          }),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ScheduledQueryRulesListByResourceGroupOutput =
  typeof ScheduledQueryRulesListByResourceGroupOutput.Type;

// The operation
/**
 * Retrieve scheduled query rule definitions in a resource group.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScheduledQueryRulesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledQueryRulesListByResourceGroupInput,
    outputSchema: ScheduledQueryRulesListByResourceGroupOutput,
  }));
// Input Schema
export const ScheduledQueryRulesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/scheduledQueryRules",
    }),
  );
export type ScheduledQueryRulesListBySubscriptionInput =
  typeof ScheduledQueryRulesListBySubscriptionInput.Type;

// Output Schema
export const ScheduledQueryRulesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.Literals(["SystemAssigned", "UserAssigned", "None"]),
              userAssignedIdentities: Schema.optional(
                Schema.Record(
                  Schema.String,
                  Schema.Struct({
                    principalId: Schema.optional(Schema.String),
                    clientId: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
          kind: Schema.optional(
            Schema.Literals(["LogAlert", "SimpleLogAlert", "LogToMetric"]),
          ),
          etag: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
          properties: Schema.Struct({
            createdWithApiVersion: Schema.optional(Schema.String),
            isLegacyLogAnalyticsRule: Schema.optional(Schema.Boolean),
            description: Schema.optional(Schema.String),
            displayName: Schema.optional(Schema.String),
            severity: Schema.optional(
              Schema.Literals(["0", "1", "2", "3", "4"]),
            ),
            enabled: Schema.optional(Schema.Boolean),
            scopes: Schema.optional(Schema.Array(Schema.String)),
            evaluationFrequency: Schema.optional(Schema.String),
            windowSize: Schema.optional(Schema.String),
            overrideQueryTimeRange: Schema.optional(Schema.String),
            targetResourceTypes: Schema.optional(Schema.Array(Schema.String)),
            criteria: Schema.optional(
              Schema.Struct({
                allOf: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      criterionType: Schema.optional(
                        Schema.Literals([
                          "StaticThresholdCriterion",
                          "DynamicThresholdCriterion",
                        ]),
                      ),
                      query: Schema.optional(Schema.String),
                      timeAggregation: Schema.optional(
                        Schema.Literals([
                          "Count",
                          "Average",
                          "Minimum",
                          "Maximum",
                          "Total",
                        ]),
                      ),
                      metricMeasureColumn: Schema.optional(Schema.String),
                      resourceIdColumn: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.String,
                            operator: Schema.Literals(["Include", "Exclude"]),
                            values: Schema.Array(Schema.String),
                          }),
                        ),
                      ),
                      operator: Schema.optional(
                        Schema.Literals([
                          "Equals",
                          "GreaterThan",
                          "GreaterThanOrEqual",
                          "LessThan",
                          "LessThanOrEqual",
                          "GreaterOrLessThan",
                        ]),
                      ),
                      threshold: Schema.optional(Schema.Number),
                      alertSensitivity: Schema.optional(Schema.String),
                      ignoreDataBefore: Schema.optional(Schema.String),
                      failingPeriods: Schema.optional(
                        Schema.Struct({
                          numberOfEvaluationPeriods: Schema.optional(
                            Schema.Number,
                          ),
                          minFailingPeriodsToAlert: Schema.optional(
                            Schema.Number,
                          ),
                        }),
                      ),
                      metricName: Schema.optional(Schema.String),
                      minRecurrenceCount: Schema.optional(Schema.Number),
                    }),
                  ),
                ),
              }),
            ),
            muteActionsDuration: Schema.optional(Schema.String),
            actions: Schema.optional(
              Schema.Struct({
                actionGroups: Schema.optional(Schema.Array(Schema.String)),
                customProperties: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
                actionProperties: Schema.optional(
                  Schema.Record(Schema.String, Schema.String),
                ),
              }),
            ),
            isWorkspaceAlertsStorageConfigured: Schema.optional(Schema.Boolean),
            checkWorkspaceAlertsStorageConfigured: Schema.optional(
              Schema.Boolean,
            ),
            skipQueryValidation: Schema.optional(Schema.Boolean),
            autoMitigate: Schema.optional(Schema.Boolean),
            resolveConfiguration: Schema.optional(
              Schema.Struct({
                autoResolved: Schema.optional(Schema.Boolean),
                timeToResolve: Schema.optional(Schema.String),
              }),
            ),
          }),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ScheduledQueryRulesListBySubscriptionOutput =
  typeof ScheduledQueryRulesListBySubscriptionOutput.Type;

// The operation
/**
 * Retrieve a scheduled query rule definitions in a subscription.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ScheduledQueryRulesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledQueryRulesListBySubscriptionInput,
    outputSchema: ScheduledQueryRulesListBySubscriptionOutput,
  }));
// Input Schema
export const ScheduledQueryRulesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}",
    }),
  );
export type ScheduledQueryRulesUpdateInput =
  typeof ScheduledQueryRulesUpdateInput.Type;

// Output Schema
export const ScheduledQueryRulesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.Literals(["SystemAssigned", "UserAssigned", "None"]),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              clientId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
    kind: Schema.optional(
      Schema.Literals(["LogAlert", "SimpleLogAlert", "LogToMetric"]),
    ),
    etag: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.Struct({
      createdWithApiVersion: Schema.optional(Schema.String),
      isLegacyLogAnalyticsRule: Schema.optional(Schema.Boolean),
      description: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      severity: Schema.optional(Schema.Literals(["0", "1", "2", "3", "4"])),
      enabled: Schema.optional(Schema.Boolean),
      scopes: Schema.optional(Schema.Array(Schema.String)),
      evaluationFrequency: Schema.optional(Schema.String),
      windowSize: Schema.optional(Schema.String),
      overrideQueryTimeRange: Schema.optional(Schema.String),
      targetResourceTypes: Schema.optional(Schema.Array(Schema.String)),
      criteria: Schema.optional(
        Schema.Struct({
          allOf: Schema.optional(
            Schema.Array(
              Schema.Struct({
                criterionType: Schema.optional(
                  Schema.Literals([
                    "StaticThresholdCriterion",
                    "DynamicThresholdCriterion",
                  ]),
                ),
                query: Schema.optional(Schema.String),
                timeAggregation: Schema.optional(
                  Schema.Literals([
                    "Count",
                    "Average",
                    "Minimum",
                    "Maximum",
                    "Total",
                  ]),
                ),
                metricMeasureColumn: Schema.optional(Schema.String),
                resourceIdColumn: Schema.optional(Schema.String),
                dimensions: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.String,
                      operator: Schema.Literals(["Include", "Exclude"]),
                      values: Schema.Array(Schema.String),
                    }),
                  ),
                ),
                operator: Schema.optional(
                  Schema.Literals([
                    "Equals",
                    "GreaterThan",
                    "GreaterThanOrEqual",
                    "LessThan",
                    "LessThanOrEqual",
                    "GreaterOrLessThan",
                  ]),
                ),
                threshold: Schema.optional(Schema.Number),
                alertSensitivity: Schema.optional(Schema.String),
                ignoreDataBefore: Schema.optional(Schema.String),
                failingPeriods: Schema.optional(
                  Schema.Struct({
                    numberOfEvaluationPeriods: Schema.optional(Schema.Number),
                    minFailingPeriodsToAlert: Schema.optional(Schema.Number),
                  }),
                ),
                metricName: Schema.optional(Schema.String),
                minRecurrenceCount: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
      muteActionsDuration: Schema.optional(Schema.String),
      actions: Schema.optional(
        Schema.Struct({
          actionGroups: Schema.optional(Schema.Array(Schema.String)),
          customProperties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          actionProperties: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
        }),
      ),
      isWorkspaceAlertsStorageConfigured: Schema.optional(Schema.Boolean),
      checkWorkspaceAlertsStorageConfigured: Schema.optional(Schema.Boolean),
      skipQueryValidation: Schema.optional(Schema.Boolean),
      autoMitigate: Schema.optional(Schema.Boolean),
      resolveConfiguration: Schema.optional(
        Schema.Struct({
          autoResolved: Schema.optional(Schema.Boolean),
          timeToResolve: Schema.optional(Schema.String),
        }),
      ),
    }),
  });
export type ScheduledQueryRulesUpdateOutput =
  typeof ScheduledQueryRulesUpdateOutput.Type;

// The operation
/**
 * Update a scheduled query rule.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ScheduledQueryRulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScheduledQueryRulesUpdateInput,
    outputSchema: ScheduledQueryRulesUpdateOutput,
  }),
);
