/**
 * Azure Hardwaresecuritymodules API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CloudHsmClusterPrivateEndpointConnectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudHsmClusterName: Schema.String.pipe(T.PathParam()),
    peConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/privateEndpointConnections/{peConnectionName}",
    }),
  );
export type CloudHsmClusterPrivateEndpointConnectionsCreateInput =
  typeof CloudHsmClusterPrivateEndpointConnectionsCreateInput.Type;

// Output Schema
export const CloudHsmClusterPrivateEndpointConnectionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CloudHsmClusterPrivateEndpointConnectionsCreateOutput =
  typeof CloudHsmClusterPrivateEndpointConnectionsCreateOutput.Type;

// The operation
/**
 * Creates or updates the private endpoint connection for the Cloud Hsm Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudHsmClusterName - The name of the Cloud HSM Cluster within the specified resource group. Cloud HSM Cluster names must be between 3 and 23 characters in length.
 * @param peConnectionName - Name of the private endpoint connection associated with the Cloud HSM Cluster.
 */
export const CloudHsmClusterPrivateEndpointConnectionsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudHsmClusterPrivateEndpointConnectionsCreateInput,
    outputSchema: CloudHsmClusterPrivateEndpointConnectionsCreateOutput,
  }));
// Input Schema
export const CloudHsmClusterPrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudHsmClusterName: Schema.String.pipe(T.PathParam()),
    peConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/privateEndpointConnections/{peConnectionName}",
    }),
  );
export type CloudHsmClusterPrivateEndpointConnectionsDeleteInput =
  typeof CloudHsmClusterPrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const CloudHsmClusterPrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudHsmClusterPrivateEndpointConnectionsDeleteOutput =
  typeof CloudHsmClusterPrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes the private endpoint connection for the Cloud Hsm Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudHsmClusterName - The name of the Cloud HSM Cluster within the specified resource group. Cloud HSM Cluster names must be between 3 and 23 characters in length.
 * @param peConnectionName - Name of the private endpoint connection associated with the Cloud HSM Cluster.
 */
export const CloudHsmClusterPrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudHsmClusterPrivateEndpointConnectionsDeleteInput,
    outputSchema: CloudHsmClusterPrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const CloudHsmClusterPrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudHsmClusterName: Schema.String.pipe(T.PathParam()),
    peConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/privateEndpointConnections/{peConnectionName}",
    }),
  );
export type CloudHsmClusterPrivateEndpointConnectionsGetInput =
  typeof CloudHsmClusterPrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const CloudHsmClusterPrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CloudHsmClusterPrivateEndpointConnectionsGetOutput =
  typeof CloudHsmClusterPrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets the private endpoint connection for the Cloud Hsm Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudHsmClusterName - The name of the Cloud HSM Cluster within the specified resource group. Cloud HSM Cluster names must be between 3 and 23 characters in length.
 * @param peConnectionName - Name of the private endpoint connection associated with the Cloud HSM Cluster.
 */
export const CloudHsmClusterPrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudHsmClusterPrivateEndpointConnectionsGetInput,
    outputSchema: CloudHsmClusterPrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const CloudHsmClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudHsmClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}",
    }),
  );
export type CloudHsmClustersCreateOrUpdateInput =
  typeof CloudHsmClustersCreateOrUpdateInput.Type;

// Output Schema
export const CloudHsmClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudHsmClustersCreateOrUpdateOutput =
  typeof CloudHsmClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a Cloud HSM Cluster in the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudHsmClusterName - The name of the Cloud HSM Cluster within the specified resource group. Cloud HSM Cluster names must be between 3 and 23 characters in length.
 */
export const CloudHsmClustersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudHsmClustersCreateOrUpdateInput,
    outputSchema: CloudHsmClustersCreateOrUpdateOutput,
  }));
// Input Schema
export const CloudHsmClustersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudHsmClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}",
    }),
  );
export type CloudHsmClustersDeleteInput =
  typeof CloudHsmClustersDeleteInput.Type;

// Output Schema
export const CloudHsmClustersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudHsmClustersDeleteOutput =
  typeof CloudHsmClustersDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Cloud HSM Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudHsmClusterName - The name of the Cloud HSM Cluster within the specified resource group. Cloud HSM Cluster names must be between 3 and 23 characters in length.
 */
export const CloudHsmClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudHsmClustersDeleteInput,
    outputSchema: CloudHsmClustersDeleteOutput,
  }),
);
// Input Schema
export const CloudHsmClustersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudHsmClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}",
    }),
  );
export type CloudHsmClustersGetInput = typeof CloudHsmClustersGetInput.Type;

// Output Schema
export const CloudHsmClustersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudHsmClustersGetOutput = typeof CloudHsmClustersGetOutput.Type;

// The operation
/**
 * Gets the specified Cloud HSM Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudHsmClusterName - The name of the Cloud HSM Cluster within the specified resource group. Cloud HSM Cluster names must be between 3 and 23 characters in length.
 */
export const CloudHsmClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CloudHsmClustersGetInput,
  outputSchema: CloudHsmClustersGetOutput,
}));
// Input Schema
export const CloudHsmClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skiptoken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters",
    }),
  );
export type CloudHsmClustersListByResourceGroupInput =
  typeof CloudHsmClustersListByResourceGroupInput.Type;

// Output Schema
export const CloudHsmClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudHsmClustersListByResourceGroupOutput =
  typeof CloudHsmClustersListByResourceGroupOutput.Type;

// The operation
/**
 * The List operation gets information about the Cloud HSM Clusters associated with the subscription and within the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $skiptoken - The page-continuation token to use with a paged version of this API
 */
export const CloudHsmClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudHsmClustersListByResourceGroupInput,
    outputSchema: CloudHsmClustersListByResourceGroupOutput,
  }));
// Input Schema
export const CloudHsmClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skiptoken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters",
    }),
  );
export type CloudHsmClustersListBySubscriptionInput =
  typeof CloudHsmClustersListBySubscriptionInput.Type;

// Output Schema
export const CloudHsmClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudHsmClustersListBySubscriptionOutput =
  typeof CloudHsmClustersListBySubscriptionOutput.Type;

// The operation
/**
 * The List operation gets information about the Cloud HSM Clusters associated with the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $skiptoken - The page-continuation token to use with a paged version of this API
 */
export const CloudHsmClustersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudHsmClustersListBySubscriptionInput,
    outputSchema: CloudHsmClustersListBySubscriptionOutput,
  }));
// Input Schema
export const CloudHsmClustersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudHsmClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}",
    }),
  );
export type CloudHsmClustersUpdateInput =
  typeof CloudHsmClustersUpdateInput.Type;

// Output Schema
export const CloudHsmClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudHsmClustersUpdateOutput =
  typeof CloudHsmClustersUpdateOutput.Type;

// The operation
/**
 * Update a Cloud HSM Cluster in the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudHsmClusterName - The name of the Cloud HSM Cluster within the specified resource group. Cloud HSM Cluster names must be between 3 and 23 characters in length.
 */
export const CloudHsmClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudHsmClustersUpdateInput,
    outputSchema: CloudHsmClustersUpdateOutput,
  }),
);
// Input Schema
export const DedicatedHsmCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}",
    }),
  );
export type DedicatedHsmCreateOrUpdateInput =
  typeof DedicatedHsmCreateOrUpdateInput.Type;

// Output Schema
export const DedicatedHsmCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DedicatedHsmCreateOrUpdateOutput =
  typeof DedicatedHsmCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a dedicated HSM in the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the dedicated Hsm
 */
export const DedicatedHsmCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DedicatedHsmCreateOrUpdateInput,
    outputSchema: DedicatedHsmCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DedicatedHsmDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}",
    }),
  );
export type DedicatedHsmDeleteInput = typeof DedicatedHsmDeleteInput.Type;

// Output Schema
export const DedicatedHsmDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DedicatedHsmDeleteOutput = typeof DedicatedHsmDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Azure Dedicated HSM.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the dedicated Hsm
 */
export const DedicatedHsmDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DedicatedHsmDeleteInput,
  outputSchema: DedicatedHsmDeleteOutput,
}));
// Input Schema
export const DedicatedHsmGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}",
  }),
);
export type DedicatedHsmGetInput = typeof DedicatedHsmGetInput.Type;

// Output Schema
export const DedicatedHsmGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DedicatedHsmGetOutput = typeof DedicatedHsmGetOutput.Type;

// The operation
/**
 * Gets the specified Azure dedicated HSM.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the dedicated Hsm
 */
export const DedicatedHsmGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DedicatedHsmGetInput,
  outputSchema: DedicatedHsmGetOutput,
}));
// Input Schema
export const DedicatedHsmListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs",
    }),
  );
export type DedicatedHsmListByResourceGroupInput =
  typeof DedicatedHsmListByResourceGroupInput.Type;

// Output Schema
export const DedicatedHsmListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DedicatedHsmListByResourceGroupOutput =
  typeof DedicatedHsmListByResourceGroupOutput.Type;

// The operation
/**
 * The List operation gets information about the dedicated HSMs associated with the subscription and within the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - Maximum number of results to return.
 */
export const DedicatedHsmListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedHsmListByResourceGroupInput,
    outputSchema: DedicatedHsmListByResourceGroupOutput,
  }));
// Input Schema
export const DedicatedHsmListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs",
    }),
  );
export type DedicatedHsmListBySubscriptionInput =
  typeof DedicatedHsmListBySubscriptionInput.Type;

// Output Schema
export const DedicatedHsmListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DedicatedHsmListBySubscriptionOutput =
  typeof DedicatedHsmListBySubscriptionOutput.Type;

// The operation
/**
 * The List operation gets information about the dedicated HSMs associated with the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $top - Maximum number of results to return.
 */
export const DedicatedHsmListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedHsmListBySubscriptionInput,
    outputSchema: DedicatedHsmListBySubscriptionOutput,
  }));
// Input Schema
export const DedicatedHsmListOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type DedicatedHsmListOutboundNetworkDependenciesEndpointsInput =
  typeof DedicatedHsmListOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const DedicatedHsmListOutboundNetworkDependenciesEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
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
                    protocol: Schema.optional(Schema.String),
                    description: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DedicatedHsmListOutboundNetworkDependenciesEndpointsOutput =
  typeof DedicatedHsmListOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified dedicated hsm resource. The operation returns properties of each egress endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the dedicated Hsm
 */
export const DedicatedHsmListOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DedicatedHsmListOutboundNetworkDependenciesEndpointsInput,
    outputSchema: DedicatedHsmListOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const DedicatedHsmUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/dedicatedHSMs/{name}",
    }),
  );
export type DedicatedHsmUpdateInput = typeof DedicatedHsmUpdateInput.Type;

// Output Schema
export const DedicatedHsmUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DedicatedHsmUpdateOutput = typeof DedicatedHsmUpdateOutput.Type;

// The operation
/**
 * Update a dedicated HSM in the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param name - Name of the dedicated Hsm
 */
export const DedicatedHsmUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DedicatedHsmUpdateInput,
  outputSchema: DedicatedHsmUpdateOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsListByCloudHsmClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudHsmClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByCloudHsmClusterInput =
  typeof PrivateEndpointConnectionsListByCloudHsmClusterInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByCloudHsmClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByCloudHsmClusterOutput =
  typeof PrivateEndpointConnectionsListByCloudHsmClusterOutput.Type;

// The operation
/**
 * The List operation gets information about the private endpoint connections associated with the Cloud HSM Cluster
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudHsmClusterName - The name of the Cloud HSM Cluster within the specified resource group. Cloud HSM Cluster names must be between 3 and 23 characters in length.
 */
export const PrivateEndpointConnectionsListByCloudHsmCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByCloudHsmClusterInput,
    outputSchema: PrivateEndpointConnectionsListByCloudHsmClusterOutput,
  }));
