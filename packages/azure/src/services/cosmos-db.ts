/**
 * Azure CosmosDb API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const CassandraClustersCreateUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}",
    }),
  );
export type CassandraClustersCreateUpdateInput =
  typeof CassandraClustersCreateUpdateInput.Type;

// Output Schema
export const CassandraClustersCreateUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type CassandraClustersCreateUpdateOutput =
  typeof CassandraClustersCreateUpdateOutput.Type;

// The operation
/**
 * Create or update a managed Cassandra cluster. When updating, you must specify all writable properties. To update only some properties, use PATCH.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersCreateUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraClustersCreateUpdateInput,
    outputSchema: CassandraClustersCreateUpdateOutput,
  }));
// Input Schema
export const CassandraClustersDeallocateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/deallocate",
    }),
  );
export type CassandraClustersDeallocateInput =
  typeof CassandraClustersDeallocateInput.Type;

// Output Schema
export const CassandraClustersDeallocateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CassandraClustersDeallocateOutput =
  typeof CassandraClustersDeallocateOutput.Type;

// The operation
/**
 * Deallocate the Managed Cassandra Cluster and Associated Data Centers. Deallocation will deallocate the host virtual machine of this cluster, and reserved the data disk. This won't do anything on an already deallocated cluster. Use Start to restart the cluster.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersDeallocate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraClustersDeallocateInput,
    outputSchema: CassandraClustersDeallocateOutput,
  }),
);
// Input Schema
export const CassandraClustersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}",
    }),
  );
export type CassandraClustersDeleteInput =
  typeof CassandraClustersDeleteInput.Type;

// Output Schema
export const CassandraClustersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CassandraClustersDeleteOutput =
  typeof CassandraClustersDeleteOutput.Type;

// The operation
/**
 * Deletes a managed Cassandra cluster.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraClustersDeleteInput,
    outputSchema: CassandraClustersDeleteOutput,
  }),
);
// Input Schema
export const CassandraClustersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}",
    }),
  );
export type CassandraClustersGetInput = typeof CassandraClustersGetInput.Type;

// Output Schema
export const CassandraClustersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type CassandraClustersGetOutput = typeof CassandraClustersGetOutput.Type;

// The operation
/**
 * Get the properties of a managed Cassandra cluster.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraClustersGetInput,
    outputSchema: CassandraClustersGetOutput,
  }),
);
// Input Schema
export const CassandraClustersInvokeCommandInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/invokeCommand",
    }),
  );
export type CassandraClustersInvokeCommandInput =
  typeof CassandraClustersInvokeCommandInput.Type;

// Output Schema
export const CassandraClustersInvokeCommandOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CassandraClustersInvokeCommandOutput =
  typeof CassandraClustersInvokeCommandOutput.Type;

// The operation
/**
 * Invoke a command like nodetool for cassandra maintenance
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersInvokeCommand =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraClustersInvokeCommandInput,
    outputSchema: CassandraClustersInvokeCommandOutput,
  }));
// Input Schema
export const CassandraClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters",
    }),
  );
export type CassandraClustersListByResourceGroupInput =
  typeof CassandraClustersListByResourceGroupInput.Type;

// Output Schema
export const CassandraClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type CassandraClustersListByResourceGroupOutput =
  typeof CassandraClustersListByResourceGroupOutput.Type;

// The operation
/**
 * List all managed Cassandra clusters in this resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraClustersListByResourceGroupInput,
    outputSchema: CassandraClustersListByResourceGroupOutput,
  }));
// Input Schema
export const CassandraClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/cassandraClusters",
    }),
  );
export type CassandraClustersListBySubscriptionInput =
  typeof CassandraClustersListBySubscriptionInput.Type;

// Output Schema
export const CassandraClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          identity: Schema.optional(
            Schema.Struct({
              principalId: Schema.optional(Schema.String),
              tenantId: Schema.optional(Schema.String),
              type: Schema.optional(
                Schema.Literals(["SystemAssigned", "None"]),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type CassandraClustersListBySubscriptionOutput =
  typeof CassandraClustersListBySubscriptionOutput.Type;

// The operation
/**
 * List all managed Cassandra clusters in this subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraClustersListBySubscriptionInput,
    outputSchema: CassandraClustersListBySubscriptionOutput,
  }));
// Input Schema
export const CassandraClustersStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/start",
    }),
  );
export type CassandraClustersStartInput =
  typeof CassandraClustersStartInput.Type;

// Output Schema
export const CassandraClustersStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CassandraClustersStartOutput =
  typeof CassandraClustersStartOutput.Type;

// The operation
/**
 * Start the Managed Cassandra Cluster and Associated Data Centers. Start will start the host virtual machine of this cluster with reserved data disk. This won't do anything on an already running cluster. Use Deallocate to deallocate the cluster.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraClustersStartInput,
    outputSchema: CassandraClustersStartOutput,
  }),
);
// Input Schema
export const CassandraClustersStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/status",
    }),
  );
export type CassandraClustersStatusInput =
  typeof CassandraClustersStatusInput.Type;

// Output Schema
export const CassandraClustersStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eTag: Schema.optional(Schema.String),
    reaperStatus: Schema.optional(
      Schema.Struct({
        healthy: Schema.optional(Schema.Boolean),
        repairRunIds: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
        repairSchedules: Schema.optional(
          Schema.Record(Schema.String, Schema.String),
        ),
      }),
    ),
    connectionErrors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          connectionState: Schema.optional(
            Schema.Literals([
              "Unknown",
              "OK",
              "OperatorToDataCenterNetworkError",
              "DatacenterToDatacenterNetworkError",
              "InternalOperatorToDataCenterCertificateError",
              "InternalError",
            ]),
          ),
          iPFrom: Schema.optional(Schema.String),
          iPTo: Schema.optional(Schema.String),
          port: Schema.optional(Schema.Number),
          exception: Schema.optional(Schema.String),
        }),
      ),
    ),
    errors: Schema.optional(
      Schema.Array(
        Schema.Struct({
          code: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
          target: Schema.optional(Schema.String),
          additionalErrorInfo: Schema.optional(Schema.String),
        }),
      ),
    ),
    dataCenters: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          seedNodes: Schema.optional(Schema.Array(Schema.String)),
          nodes: Schema.optional(
            Schema.Array(
              Schema.Struct({
                address: Schema.optional(Schema.String),
                state: Schema.optional(
                  Schema.Literals([
                    "Normal",
                    "Leaving",
                    "Joining",
                    "Moving",
                    "Stopped",
                  ]),
                ),
                status: Schema.optional(Schema.String),
                cassandraProcessStatus: Schema.optional(Schema.String),
                load: Schema.optional(Schema.String),
                tokens: Schema.optional(Schema.Array(Schema.String)),
                size: Schema.optional(Schema.Number),
                hostID: Schema.optional(Schema.String),
                rack: Schema.optional(Schema.String),
                timestamp: Schema.optional(Schema.String),
                diskUsedKB: Schema.optional(Schema.Number),
                diskFreeKB: Schema.optional(Schema.Number),
                memoryUsedKB: Schema.optional(Schema.Number),
                memoryBuffersAndCachedKB: Schema.optional(Schema.Number),
                memoryFreeKB: Schema.optional(Schema.Number),
                memoryTotalKB: Schema.optional(Schema.Number),
                cpuUsage: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type CassandraClustersStatusOutput =
  typeof CassandraClustersStatusOutput.Type;

// The operation
/**
 * Gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraClustersStatusInput,
    outputSchema: CassandraClustersStatusOutput,
  }),
);
// Input Schema
export const CassandraClustersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}",
    }),
  );
export type CassandraClustersUpdateInput =
  typeof CassandraClustersUpdateInput.Type;

// Output Schema
export const CassandraClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
  });
export type CassandraClustersUpdateOutput =
  typeof CassandraClustersUpdateOutput.Type;

// The operation
/**
 * Updates some of the properties of a managed Cassandra cluster.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraClustersUpdateInput,
    outputSchema: CassandraClustersUpdateOutput,
  }),
);
// Input Schema
export const CassandraDataCentersCreateUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/dataCenters/{dataCenterName}",
    }),
  );
export type CassandraDataCentersCreateUpdateInput =
  typeof CassandraDataCentersCreateUpdateInput.Type;

// Output Schema
export const CassandraDataCentersCreateUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type CassandraDataCentersCreateUpdateOutput =
  typeof CassandraDataCentersCreateUpdateOutput.Type;

// The operation
/**
 * Create or update a managed Cassandra data center. When updating, overwrite all properties. To update only some properties, use PATCH.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraDataCentersCreateUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraDataCentersCreateUpdateInput,
    outputSchema: CassandraDataCentersCreateUpdateOutput,
  }));
// Input Schema
export const CassandraDataCentersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/dataCenters/{dataCenterName}",
    }),
  );
export type CassandraDataCentersDeleteInput =
  typeof CassandraDataCentersDeleteInput.Type;

// Output Schema
export const CassandraDataCentersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CassandraDataCentersDeleteOutput =
  typeof CassandraDataCentersDeleteOutput.Type;

// The operation
/**
 * Delete a managed Cassandra data center.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraDataCentersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraDataCentersDeleteInput,
    outputSchema: CassandraDataCentersDeleteOutput,
  }),
);
// Input Schema
export const CassandraDataCentersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/dataCenters/{dataCenterName}",
    }),
  );
export type CassandraDataCentersGetInput =
  typeof CassandraDataCentersGetInput.Type;

// Output Schema
export const CassandraDataCentersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type CassandraDataCentersGetOutput =
  typeof CassandraDataCentersGetOutput.Type;

// The operation
/**
 * Get the properties of a managed Cassandra data center.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraDataCentersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraDataCentersGetInput,
    outputSchema: CassandraDataCentersGetOutput,
  }),
);
// Input Schema
export const CassandraDataCentersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/dataCenters",
    }),
  );
export type CassandraDataCentersListInput =
  typeof CassandraDataCentersListInput.Type;

// Output Schema
export const CassandraDataCentersListOutput =
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
export type CassandraDataCentersListOutput =
  typeof CassandraDataCentersListOutput.Type;

// The operation
/**
 * List all data centers in a particular managed Cassandra cluster.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraDataCentersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraDataCentersListInput,
    outputSchema: CassandraDataCentersListOutput,
  }),
);
// Input Schema
export const CassandraDataCentersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/dataCenters/{dataCenterName}",
    }),
  );
export type CassandraDataCentersUpdateInput =
  typeof CassandraDataCentersUpdateInput.Type;

// Output Schema
export const CassandraDataCentersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type CassandraDataCentersUpdateOutput =
  typeof CassandraDataCentersUpdateOutput.Type;

// The operation
/**
 * Update some of the properties of a managed Cassandra data center.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraDataCentersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CassandraDataCentersUpdateInput,
    outputSchema: CassandraDataCentersUpdateOutput,
  }),
);
// Input Schema
export const CassandraResourcesCreateUpdateCassandraKeyspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}",
    }),
  );
export type CassandraResourcesCreateUpdateCassandraKeyspaceInput =
  typeof CassandraResourcesCreateUpdateCassandraKeyspaceInput.Type;

// Output Schema
export const CassandraResourcesCreateUpdateCassandraKeyspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesCreateUpdateCassandraKeyspaceOutput =
  typeof CassandraResourcesCreateUpdateCassandraKeyspaceOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB Cassandra keyspace
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesCreateUpdateCassandraKeyspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesCreateUpdateCassandraKeyspaceInput,
    outputSchema: CassandraResourcesCreateUpdateCassandraKeyspaceOutput,
  }));
// Input Schema
export const CassandraResourcesCreateUpdateCassandraTableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}",
    }),
  );
export type CassandraResourcesCreateUpdateCassandraTableInput =
  typeof CassandraResourcesCreateUpdateCassandraTableInput.Type;

// Output Schema
export const CassandraResourcesCreateUpdateCassandraTableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesCreateUpdateCassandraTableOutput =
  typeof CassandraResourcesCreateUpdateCassandraTableOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB Cassandra Table
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesCreateUpdateCassandraTable =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesCreateUpdateCassandraTableInput,
    outputSchema: CassandraResourcesCreateUpdateCassandraTableOutput,
  }));
// Input Schema
export const CassandraResourcesDeleteCassandraKeyspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}",
    }),
  );
export type CassandraResourcesDeleteCassandraKeyspaceInput =
  typeof CassandraResourcesDeleteCassandraKeyspaceInput.Type;

// Output Schema
export const CassandraResourcesDeleteCassandraKeyspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CassandraResourcesDeleteCassandraKeyspaceOutput =
  typeof CassandraResourcesDeleteCassandraKeyspaceOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB Cassandra keyspace.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesDeleteCassandraKeyspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesDeleteCassandraKeyspaceInput,
    outputSchema: CassandraResourcesDeleteCassandraKeyspaceOutput,
  }));
// Input Schema
export const CassandraResourcesDeleteCassandraTableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}",
    }),
  );
export type CassandraResourcesDeleteCassandraTableInput =
  typeof CassandraResourcesDeleteCassandraTableInput.Type;

// Output Schema
export const CassandraResourcesDeleteCassandraTableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CassandraResourcesDeleteCassandraTableOutput =
  typeof CassandraResourcesDeleteCassandraTableOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB Cassandra table.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesDeleteCassandraTable =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesDeleteCassandraTableInput,
    outputSchema: CassandraResourcesDeleteCassandraTableOutput,
  }));
// Input Schema
export const CassandraResourcesGetCassandraKeyspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}",
    }),
  );
export type CassandraResourcesGetCassandraKeyspaceInput =
  typeof CassandraResourcesGetCassandraKeyspaceInput.Type;

// Output Schema
export const CassandraResourcesGetCassandraKeyspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesGetCassandraKeyspaceOutput =
  typeof CassandraResourcesGetCassandraKeyspaceOutput.Type;

// The operation
/**
 * Gets the Cassandra keyspaces under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesGetCassandraKeyspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesGetCassandraKeyspaceInput,
    outputSchema: CassandraResourcesGetCassandraKeyspaceOutput,
  }));
// Input Schema
export const CassandraResourcesGetCassandraKeyspaceThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default",
    }),
  );
export type CassandraResourcesGetCassandraKeyspaceThroughputInput =
  typeof CassandraResourcesGetCassandraKeyspaceThroughputInput.Type;

// Output Schema
export const CassandraResourcesGetCassandraKeyspaceThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesGetCassandraKeyspaceThroughputOutput =
  typeof CassandraResourcesGetCassandraKeyspaceThroughputOutput.Type;

// The operation
/**
 * Gets the RUs per second of the Cassandra Keyspace under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesGetCassandraKeyspaceThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesGetCassandraKeyspaceThroughputInput,
    outputSchema: CassandraResourcesGetCassandraKeyspaceThroughputOutput,
  }));
// Input Schema
export const CassandraResourcesGetCassandraTableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}",
    }),
  );
export type CassandraResourcesGetCassandraTableInput =
  typeof CassandraResourcesGetCassandraTableInput.Type;

// Output Schema
export const CassandraResourcesGetCassandraTableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesGetCassandraTableOutput =
  typeof CassandraResourcesGetCassandraTableOutput.Type;

// The operation
/**
 * Gets the Cassandra table under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesGetCassandraTable =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesGetCassandraTableInput,
    outputSchema: CassandraResourcesGetCassandraTableOutput,
  }));
// Input Schema
export const CassandraResourcesGetCassandraTableThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default",
    }),
  );
export type CassandraResourcesGetCassandraTableThroughputInput =
  typeof CassandraResourcesGetCassandraTableThroughputInput.Type;

// Output Schema
export const CassandraResourcesGetCassandraTableThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesGetCassandraTableThroughputOutput =
  typeof CassandraResourcesGetCassandraTableThroughputOutput.Type;

// The operation
/**
 * Gets the RUs per second of the Cassandra table under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesGetCassandraTableThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesGetCassandraTableThroughputInput,
    outputSchema: CassandraResourcesGetCassandraTableThroughputOutput,
  }));
// Input Schema
export const CassandraResourcesListCassandraKeyspacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces",
    }),
  );
export type CassandraResourcesListCassandraKeyspacesInput =
  typeof CassandraResourcesListCassandraKeyspacesInput.Type;

// Output Schema
export const CassandraResourcesListCassandraKeyspacesOutput =
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
  });
export type CassandraResourcesListCassandraKeyspacesOutput =
  typeof CassandraResourcesListCassandraKeyspacesOutput.Type;

// The operation
/**
 * Lists the Cassandra keyspaces under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesListCassandraKeyspaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesListCassandraKeyspacesInput,
    outputSchema: CassandraResourcesListCassandraKeyspacesOutput,
  }));
// Input Schema
export const CassandraResourcesListCassandraTablesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables",
    }),
  );
export type CassandraResourcesListCassandraTablesInput =
  typeof CassandraResourcesListCassandraTablesInput.Type;

// Output Schema
export const CassandraResourcesListCassandraTablesOutput =
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
  });
export type CassandraResourcesListCassandraTablesOutput =
  typeof CassandraResourcesListCassandraTablesOutput.Type;

// The operation
/**
 * Lists the Cassandra table under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesListCassandraTables =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesListCassandraTablesInput,
    outputSchema: CassandraResourcesListCassandraTablesOutput,
  }));
// Input Schema
export const CassandraResourcesMigrateCassandraKeyspaceToAutoscaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default/migrateToAutoscale",
    }),
  );
export type CassandraResourcesMigrateCassandraKeyspaceToAutoscaleInput =
  typeof CassandraResourcesMigrateCassandraKeyspaceToAutoscaleInput.Type;

// Output Schema
export const CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOutput =
  typeof CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Cassandra Keyspace from manual throughput to autoscale
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesMigrateCassandraKeyspaceToAutoscale =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleInput,
    outputSchema: CassandraResourcesMigrateCassandraKeyspaceToAutoscaleOutput,
  }));
// Input Schema
export const CassandraResourcesMigrateCassandraKeyspaceToManualThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default/migrateToManualThroughput",
    }),
  );
export type CassandraResourcesMigrateCassandraKeyspaceToManualThroughputInput =
  typeof CassandraResourcesMigrateCassandraKeyspaceToManualThroughputInput.Type;

// Output Schema
export const CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOutput =
  typeof CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Cassandra Keyspace from autoscale to manual throughput
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesMigrateCassandraKeyspaceToManualThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      CassandraResourcesMigrateCassandraKeyspaceToManualThroughputInput,
    outputSchema:
      CassandraResourcesMigrateCassandraKeyspaceToManualThroughputOutput,
  }));
// Input Schema
export const CassandraResourcesMigrateCassandraTableToAutoscaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default/migrateToAutoscale",
    }),
  );
export type CassandraResourcesMigrateCassandraTableToAutoscaleInput =
  typeof CassandraResourcesMigrateCassandraTableToAutoscaleInput.Type;

// Output Schema
export const CassandraResourcesMigrateCassandraTableToAutoscaleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesMigrateCassandraTableToAutoscaleOutput =
  typeof CassandraResourcesMigrateCassandraTableToAutoscaleOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Cassandra table from manual throughput to autoscale
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesMigrateCassandraTableToAutoscale =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesMigrateCassandraTableToAutoscaleInput,
    outputSchema: CassandraResourcesMigrateCassandraTableToAutoscaleOutput,
  }));
// Input Schema
export const CassandraResourcesMigrateCassandraTableToManualThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default/migrateToManualThroughput",
    }),
  );
export type CassandraResourcesMigrateCassandraTableToManualThroughputInput =
  typeof CassandraResourcesMigrateCassandraTableToManualThroughputInput.Type;

// Output Schema
export const CassandraResourcesMigrateCassandraTableToManualThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesMigrateCassandraTableToManualThroughputOutput =
  typeof CassandraResourcesMigrateCassandraTableToManualThroughputOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Cassandra table from autoscale to manual throughput
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesMigrateCassandraTableToManualThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesMigrateCassandraTableToManualThroughputInput,
    outputSchema:
      CassandraResourcesMigrateCassandraTableToManualThroughputOutput,
  }));
// Input Schema
export const CassandraResourcesUpdateCassandraKeyspaceThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/throughputSettings/default",
    }),
  );
export type CassandraResourcesUpdateCassandraKeyspaceThroughputInput =
  typeof CassandraResourcesUpdateCassandraKeyspaceThroughputInput.Type;

// Output Schema
export const CassandraResourcesUpdateCassandraKeyspaceThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesUpdateCassandraKeyspaceThroughputOutput =
  typeof CassandraResourcesUpdateCassandraKeyspaceThroughputOutput.Type;

// The operation
/**
 * Update RUs per second of an Azure Cosmos DB Cassandra Keyspace
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesUpdateCassandraKeyspaceThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesUpdateCassandraKeyspaceThroughputInput,
    outputSchema: CassandraResourcesUpdateCassandraKeyspaceThroughputOutput,
  }));
// Input Schema
export const CassandraResourcesUpdateCassandraTableThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/cassandraKeyspaces/{keyspaceName}/tables/{tableName}/throughputSettings/default",
    }),
  );
export type CassandraResourcesUpdateCassandraTableThroughputInput =
  typeof CassandraResourcesUpdateCassandraTableThroughputInput.Type;

// Output Schema
export const CassandraResourcesUpdateCassandraTableThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type CassandraResourcesUpdateCassandraTableThroughputOutput =
  typeof CassandraResourcesUpdateCassandraTableThroughputOutput.Type;

// The operation
/**
 * Update RUs per second of an Azure Cosmos DB Cassandra table
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CassandraResourcesUpdateCassandraTableThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CassandraResourcesUpdateCassandraTableThroughputInput,
    outputSchema: CassandraResourcesUpdateCassandraTableThroughputOutput,
  }));
// Input Schema
export const CollectionListMetricDefinitionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/collections/{collectionRid}/metricDefinitions",
    }),
  );
export type CollectionListMetricDefinitionsInput =
  typeof CollectionListMetricDefinitionsInput.Type;

// Output Schema
export const CollectionListMetricDefinitionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          metricAvailabilities: Schema.optional(
            Schema.Array(
              Schema.Struct({
                timeGrain: Schema.optional(Schema.String),
                retention: Schema.optional(Schema.String),
              }),
            ),
          ),
          primaryAggregationType: Schema.optional(
            Schema.Literals([
              "None",
              "Average",
              "Total",
              "Minimum",
              "Maximum",
              "Last",
            ]),
          ),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          resourceUri: Schema.optional(Schema.String),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type CollectionListMetricDefinitionsOutput =
  typeof CollectionListMetricDefinitionsOutput.Type;

// The operation
/**
 * Retrieves metric definitions for the given collection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CollectionListMetricDefinitions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CollectionListMetricDefinitionsInput,
    outputSchema: CollectionListMetricDefinitionsOutput,
  }));
// Input Schema
export const CollectionListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/collections/{collectionRid}/metrics",
    }),
  );
export type CollectionListMetricsInput = typeof CollectionListMetricsInput.Type;

// Output Schema
export const CollectionListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type CollectionListMetricsOutput =
  typeof CollectionListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given database account and collection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CollectionListMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CollectionListMetricsInput,
    outputSchema: CollectionListMetricsOutput,
  }),
);
// Input Schema
export const CollectionListUsagesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/collections/{collectionRid}/usages",
    }),
  );
export type CollectionListUsagesInput = typeof CollectionListUsagesInput.Type;

// Output Schema
export const CollectionListUsagesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          quotaPeriod: Schema.optional(Schema.String),
          limit: Schema.optional(Schema.Number),
          currentValue: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type CollectionListUsagesOutput = typeof CollectionListUsagesOutput.Type;

// The operation
/**
 * Retrieves the usages (most recent storage data) for the given collection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CollectionListUsages = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CollectionListUsagesInput,
    outputSchema: CollectionListUsagesOutput,
  }),
);
// Input Schema
export const CollectionPartitionListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/collections/{collectionRid}/partitions/metrics",
    }),
  );
export type CollectionPartitionListMetricsInput =
  typeof CollectionPartitionListMetricsInput.Type;

// Output Schema
export const CollectionPartitionListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type CollectionPartitionListMetricsOutput =
  typeof CollectionPartitionListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given collection, split by partition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CollectionPartitionListMetrics =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CollectionPartitionListMetricsInput,
    outputSchema: CollectionPartitionListMetricsOutput,
  }));
// Input Schema
export const CollectionPartitionListUsagesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/collections/{collectionRid}/partitions/usages",
    }),
  );
export type CollectionPartitionListUsagesInput =
  typeof CollectionPartitionListUsagesInput.Type;

// Output Schema
export const CollectionPartitionListUsagesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          quotaPeriod: Schema.optional(Schema.String),
          limit: Schema.optional(Schema.Number),
          currentValue: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type CollectionPartitionListUsagesOutput =
  typeof CollectionPartitionListUsagesOutput.Type;

// The operation
/**
 * Retrieves the usages (most recent storage data) for the given collection, split by partition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CollectionPartitionListUsages =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CollectionPartitionListUsagesInput,
    outputSchema: CollectionPartitionListUsagesOutput,
  }));
// Input Schema
export const CollectionPartitionRegionListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/region/{region}/databases/{databaseRid}/collections/{collectionRid}/partitions/metrics",
    }),
  );
export type CollectionPartitionRegionListMetricsInput =
  typeof CollectionPartitionRegionListMetricsInput.Type;

// Output Schema
export const CollectionPartitionRegionListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type CollectionPartitionRegionListMetricsOutput =
  typeof CollectionPartitionRegionListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given collection and region, split by partition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CollectionPartitionRegionListMetrics =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CollectionPartitionRegionListMetricsInput,
    outputSchema: CollectionPartitionRegionListMetricsOutput,
  }));
// Input Schema
export const CollectionRegionListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/region/{region}/databases/{databaseRid}/collections/{collectionRid}/metrics",
    }),
  );
export type CollectionRegionListMetricsInput =
  typeof CollectionRegionListMetricsInput.Type;

// Output Schema
export const CollectionRegionListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type CollectionRegionListMetricsOutput =
  typeof CollectionRegionListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given database account, collection and region.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const CollectionRegionListMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CollectionRegionListMetricsInput,
    outputSchema: CollectionRegionListMetricsOutput,
  }),
);
// Input Schema
export const DatabaseAccountRegionListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/region/{region}/metrics",
    }),
  );
export type DatabaseAccountRegionListMetricsInput =
  typeof DatabaseAccountRegionListMetricsInput.Type;

// Output Schema
export const DatabaseAccountRegionListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type DatabaseAccountRegionListMetricsOutput =
  typeof DatabaseAccountRegionListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given database account and region.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountRegionListMetrics =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountRegionListMetricsInput,
    outputSchema: DatabaseAccountRegionListMetricsOutput,
  }));
// Input Schema
export const DatabaseAccountsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}",
    }),
  );
export type DatabaseAccountsCreateOrUpdateInput =
  typeof DatabaseAccountsCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseAccountsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DatabaseAccountsCreateOrUpdateOutput =
  typeof DatabaseAccountsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsCreateOrUpdateInput,
    outputSchema: DatabaseAccountsCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseAccountsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}",
    }),
  );
export type DatabaseAccountsDeleteInput =
  typeof DatabaseAccountsDeleteInput.Type;

// Output Schema
export const DatabaseAccountsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseAccountsDeleteOutput =
  typeof DatabaseAccountsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseAccountsDeleteInput,
    outputSchema: DatabaseAccountsDeleteOutput,
  }),
);
// Input Schema
export const DatabaseAccountsFailoverPriorityChangeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/failoverPriorityChange",
    }),
  );
export type DatabaseAccountsFailoverPriorityChangeInput =
  typeof DatabaseAccountsFailoverPriorityChangeInput.Type;

// Output Schema
export const DatabaseAccountsFailoverPriorityChangeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseAccountsFailoverPriorityChangeOutput =
  typeof DatabaseAccountsFailoverPriorityChangeOutput.Type;

// The operation
/**
 * Changes the failover priority for the Azure Cosmos DB database account. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsFailoverPriorityChange =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsFailoverPriorityChangeInput,
    outputSchema: DatabaseAccountsFailoverPriorityChangeOutput,
  }));
// Input Schema
export const DatabaseAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}",
    }),
  );
export type DatabaseAccountsGetInput = typeof DatabaseAccountsGetInput.Type;

// Output Schema
export const DatabaseAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DatabaseAccountsGetOutput = typeof DatabaseAccountsGetOutput.Type;

// The operation
/**
 * Retrieves the properties of an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabaseAccountsGetInput,
  outputSchema: DatabaseAccountsGetOutput,
}));
// Input Schema
export const DatabaseAccountsGetReadOnlyKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/readonlykeys",
    }),
  );
export type DatabaseAccountsGetReadOnlyKeysInput =
  typeof DatabaseAccountsGetReadOnlyKeysInput.Type;

// Output Schema
export const DatabaseAccountsGetReadOnlyKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryReadonlyMasterKey: Schema.optional(Schema.String),
    secondaryReadonlyMasterKey: Schema.optional(Schema.String),
  });
export type DatabaseAccountsGetReadOnlyKeysOutput =
  typeof DatabaseAccountsGetReadOnlyKeysOutput.Type;

// The operation
/**
 * Lists the read-only access keys for the specified Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsGetReadOnlyKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsGetReadOnlyKeysInput,
    outputSchema: DatabaseAccountsGetReadOnlyKeysOutput,
  }));
// Input Schema
export const DatabaseAccountsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/databaseAccounts",
    }),
  );
export type DatabaseAccountsListInput = typeof DatabaseAccountsListInput.Type;

// Output Schema
export const DatabaseAccountsListOutput =
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
  });
export type DatabaseAccountsListOutput = typeof DatabaseAccountsListOutput.Type;

// The operation
/**
 * Lists all the Azure Cosmos DB database accounts available under the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabaseAccountsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseAccountsListInput,
    outputSchema: DatabaseAccountsListOutput,
  }),
);
// Input Schema
export const DatabaseAccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts",
    }),
  );
export type DatabaseAccountsListByResourceGroupInput =
  typeof DatabaseAccountsListByResourceGroupInput.Type;

// Output Schema
export const DatabaseAccountsListByResourceGroupOutput =
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
  });
export type DatabaseAccountsListByResourceGroupOutput =
  typeof DatabaseAccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the Azure Cosmos DB database accounts available under the given resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DatabaseAccountsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsListByResourceGroupInput,
    outputSchema: DatabaseAccountsListByResourceGroupOutput,
  }));
// Input Schema
export const DatabaseAccountsListConnectionStringsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/listConnectionStrings",
    }),
  );
export type DatabaseAccountsListConnectionStringsInput =
  typeof DatabaseAccountsListConnectionStringsInput.Type;

// Output Schema
export const DatabaseAccountsListConnectionStringsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    connectionStrings: Schema.optional(
      Schema.Array(
        Schema.Struct({
          connectionString: Schema.optional(SensitiveString),
          description: Schema.optional(Schema.String),
          keyKind: Schema.optional(
            Schema.Literals([
              "Primary",
              "Secondary",
              "PrimaryReadonly",
              "SecondaryReadonly",
            ]),
          ),
          type: Schema.optional(
            Schema.Literals([
              "Sql",
              "Table",
              "MongoDB",
              "Cassandra",
              "CassandraConnectorMetadata",
              "Gremlin",
              "SqlDedicatedGateway",
              "GremlinV2",
              "Undefined",
            ]),
          ),
        }),
      ),
    ),
  });
export type DatabaseAccountsListConnectionStringsOutput =
  typeof DatabaseAccountsListConnectionStringsOutput.Type;

// The operation
/**
 * Lists the connection strings for the specified Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsListConnectionStrings =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsListConnectionStringsInput,
    outputSchema: DatabaseAccountsListConnectionStringsOutput,
  }));
// Input Schema
export const DatabaseAccountsListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/listKeys",
    }),
  );
export type DatabaseAccountsListKeysInput =
  typeof DatabaseAccountsListKeysInput.Type;

// Output Schema
export const DatabaseAccountsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryReadonlyMasterKey: Schema.optional(Schema.String),
    secondaryReadonlyMasterKey: Schema.optional(Schema.String),
  });
export type DatabaseAccountsListKeysOutput =
  typeof DatabaseAccountsListKeysOutput.Type;

// The operation
/**
 * Lists the access keys for the specified Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseAccountsListKeysInput,
    outputSchema: DatabaseAccountsListKeysOutput,
  }),
);
// Input Schema
export const DatabaseAccountsListMetricDefinitionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/metricDefinitions",
    }),
  );
export type DatabaseAccountsListMetricDefinitionsInput =
  typeof DatabaseAccountsListMetricDefinitionsInput.Type;

// Output Schema
export const DatabaseAccountsListMetricDefinitionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          metricAvailabilities: Schema.optional(
            Schema.Array(
              Schema.Struct({
                timeGrain: Schema.optional(Schema.String),
                retention: Schema.optional(Schema.String),
              }),
            ),
          ),
          primaryAggregationType: Schema.optional(
            Schema.Literals([
              "None",
              "Average",
              "Total",
              "Minimum",
              "Maximum",
              "Last",
            ]),
          ),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          resourceUri: Schema.optional(Schema.String),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type DatabaseAccountsListMetricDefinitionsOutput =
  typeof DatabaseAccountsListMetricDefinitionsOutput.Type;

// The operation
/**
 * Retrieves metric definitions for the given database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsListMetricDefinitions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsListMetricDefinitionsInput,
    outputSchema: DatabaseAccountsListMetricDefinitionsOutput,
  }));
// Input Schema
export const DatabaseAccountsListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/metrics",
    }),
  );
export type DatabaseAccountsListMetricsInput =
  typeof DatabaseAccountsListMetricsInput.Type;

// Output Schema
export const DatabaseAccountsListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type DatabaseAccountsListMetricsOutput =
  typeof DatabaseAccountsListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsListMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseAccountsListMetricsInput,
    outputSchema: DatabaseAccountsListMetricsOutput,
  }),
);
// Input Schema
export const DatabaseAccountsListReadOnlyKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/readonlykeys",
    }),
  );
export type DatabaseAccountsListReadOnlyKeysInput =
  typeof DatabaseAccountsListReadOnlyKeysInput.Type;

// Output Schema
export const DatabaseAccountsListReadOnlyKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryReadonlyMasterKey: Schema.optional(Schema.String),
    secondaryReadonlyMasterKey: Schema.optional(Schema.String),
  });
export type DatabaseAccountsListReadOnlyKeysOutput =
  typeof DatabaseAccountsListReadOnlyKeysOutput.Type;

// The operation
/**
 * Lists the read-only access keys for the specified Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsListReadOnlyKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsListReadOnlyKeysInput,
    outputSchema: DatabaseAccountsListReadOnlyKeysOutput,
  }));
// Input Schema
export const DatabaseAccountsListUsagesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/usages",
    }),
  );
export type DatabaseAccountsListUsagesInput =
  typeof DatabaseAccountsListUsagesInput.Type;

// Output Schema
export const DatabaseAccountsListUsagesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          quotaPeriod: Schema.optional(Schema.String),
          limit: Schema.optional(Schema.Number),
          currentValue: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type DatabaseAccountsListUsagesOutput =
  typeof DatabaseAccountsListUsagesOutput.Type;

// The operation
/**
 * Retrieves the usages (most recent data) for the given database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsListUsages = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseAccountsListUsagesInput,
    outputSchema: DatabaseAccountsListUsagesOutput,
  }),
);
// Input Schema
export const DatabaseAccountsOfflineRegionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/offlineRegion",
    }),
  );
export type DatabaseAccountsOfflineRegionInput =
  typeof DatabaseAccountsOfflineRegionInput.Type;

// Output Schema
export const DatabaseAccountsOfflineRegionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseAccountsOfflineRegionOutput =
  typeof DatabaseAccountsOfflineRegionOutput.Type;

// The operation
/**
 * Offline the specified region for the specified Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsOfflineRegion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsOfflineRegionInput,
    outputSchema: DatabaseAccountsOfflineRegionOutput,
  }));
// Input Schema
export const DatabaseAccountsOnlineRegionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/onlineRegion",
    }),
  );
export type DatabaseAccountsOnlineRegionInput =
  typeof DatabaseAccountsOnlineRegionInput.Type;

// Output Schema
export const DatabaseAccountsOnlineRegionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseAccountsOnlineRegionOutput =
  typeof DatabaseAccountsOnlineRegionOutput.Type;

// The operation
/**
 * Online the specified region for the specified Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsOnlineRegion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsOnlineRegionInput,
    outputSchema: DatabaseAccountsOnlineRegionOutput,
  }));
// Input Schema
export const DatabaseAccountsRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/regenerateKey",
    }),
  );
export type DatabaseAccountsRegenerateKeyInput =
  typeof DatabaseAccountsRegenerateKeyInput.Type;

// Output Schema
export const DatabaseAccountsRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseAccountsRegenerateKeyOutput =
  typeof DatabaseAccountsRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerates an access key for the specified Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsRegenerateKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAccountsRegenerateKeyInput,
    outputSchema: DatabaseAccountsRegenerateKeyOutput,
  }));
// Input Schema
export const DatabaseAccountsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}",
    }),
  );
export type DatabaseAccountsUpdateInput =
  typeof DatabaseAccountsUpdateInput.Type;

// Output Schema
export const DatabaseAccountsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DatabaseAccountsUpdateOutput =
  typeof DatabaseAccountsUpdateOutput.Type;

// The operation
/**
 * Updates the properties of an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseAccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseAccountsUpdateInput,
    outputSchema: DatabaseAccountsUpdateOutput,
  }),
);
// Input Schema
export const DatabaseListMetricDefinitionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/metricDefinitions",
    }),
  );
export type DatabaseListMetricDefinitionsInput =
  typeof DatabaseListMetricDefinitionsInput.Type;

// Output Schema
export const DatabaseListMetricDefinitionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          metricAvailabilities: Schema.optional(
            Schema.Array(
              Schema.Struct({
                timeGrain: Schema.optional(Schema.String),
                retention: Schema.optional(Schema.String),
              }),
            ),
          ),
          primaryAggregationType: Schema.optional(
            Schema.Literals([
              "None",
              "Average",
              "Total",
              "Minimum",
              "Maximum",
              "Last",
            ]),
          ),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          resourceUri: Schema.optional(Schema.String),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type DatabaseListMetricDefinitionsOutput =
  typeof DatabaseListMetricDefinitionsOutput.Type;

// The operation
/**
 * Retrieves metric definitions for the given database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseListMetricDefinitions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseListMetricDefinitionsInput,
    outputSchema: DatabaseListMetricDefinitionsOutput,
  }));
// Input Schema
export const DatabaseListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/metrics",
    }),
  );
export type DatabaseListMetricsInput = typeof DatabaseListMetricsInput.Type;

// Output Schema
export const DatabaseListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type DatabaseListMetricsOutput = typeof DatabaseListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given database account and database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseListMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabaseListMetricsInput,
  outputSchema: DatabaseListMetricsOutput,
}));
// Input Schema
export const DatabaseListUsagesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/usages",
    }),
  );
export type DatabaseListUsagesInput = typeof DatabaseListUsagesInput.Type;

// Output Schema
export const DatabaseListUsagesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          quotaPeriod: Schema.optional(Schema.String),
          limit: Schema.optional(Schema.Number),
          currentValue: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type DatabaseListUsagesOutput = typeof DatabaseListUsagesOutput.Type;

// The operation
/**
 * Retrieves the usages (most recent data) for the given database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const DatabaseListUsages = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabaseListUsagesInput,
  outputSchema: DatabaseListUsagesOutput,
}));
// Input Schema
export const FleetCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}",
  }),
);
export type FleetCreateInput = typeof FleetCreateInput.Type;

// Output Schema
export const FleetCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FleetCreateOutput = typeof FleetCreateOutput.Type;

// The operation
/**
 * Creates an Azure Cosmos DB fleet under a subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetCreateInput,
  outputSchema: FleetCreateOutput,
}));
// Input Schema
export const FleetDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}",
  }),
);
export type FleetDeleteInput = typeof FleetDeleteInput.Type;

// Output Schema
export const FleetDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FleetDeleteOutput = typeof FleetDeleteOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB Fleet.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetDeleteInput,
  outputSchema: FleetDeleteOutput,
}));
// Input Schema
export const FleetGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}",
  }),
);
export type FleetGetInput = typeof FleetGetInput.Type;

// Output Schema
export const FleetGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FleetGetOutput = typeof FleetGetOutput.Type;

// The operation
/**
 * Retrieves the properties of an existing Azure Cosmos DB fleet under a subscription
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetGetInput,
  outputSchema: FleetGetOutput,
}));
// Input Schema
export const FleetListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/fleets",
  }),
);
export type FleetListInput = typeof FleetListInput.Type;

// Output Schema
export const FleetListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type FleetListOutput = typeof FleetListOutput.Type;

// The operation
/**
 * Lists all the fleets under the subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const FleetList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetListInput,
  outputSchema: FleetListOutput,
}));
// Input Schema
export const FleetListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets",
    }),
  );
export type FleetListByResourceGroupInput =
  typeof FleetListByResourceGroupInput.Type;

// Output Schema
export const FleetListByResourceGroupOutput =
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
export type FleetListByResourceGroupOutput =
  typeof FleetListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the fleets under the specified subscription and resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetListByResourceGroupInput,
    outputSchema: FleetListByResourceGroupOutput,
  }),
);
// Input Schema
export const FleetspaceAccountCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts/{fleetspaceAccountName}",
    }),
  );
export type FleetspaceAccountCreateInput =
  typeof FleetspaceAccountCreateInput.Type;

// Output Schema
export const FleetspaceAccountCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FleetspaceAccountCreateOutput =
  typeof FleetspaceAccountCreateOutput.Type;

// The operation
/**
 * Creates an Azure Cosmos DB fleetspace account under a fleetspace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetspaceAccountCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetspaceAccountCreateInput,
    outputSchema: FleetspaceAccountCreateOutput,
  }),
);
// Input Schema
export const FleetspaceAccountDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts/{fleetspaceAccountName}",
    }),
  );
export type FleetspaceAccountDeleteInput =
  typeof FleetspaceAccountDeleteInput.Type;

// Output Schema
export const FleetspaceAccountDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FleetspaceAccountDeleteOutput =
  typeof FleetspaceAccountDeleteOutput.Type;

// The operation
/**
 * Removes an existing Azure Cosmos DB fleetspace account from a fleetspace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetspaceAccountDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetspaceAccountDeleteInput,
    outputSchema: FleetspaceAccountDeleteOutput,
  }),
);
// Input Schema
export const FleetspaceAccountGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts/{fleetspaceAccountName}",
    }),
  );
export type FleetspaceAccountGetInput = typeof FleetspaceAccountGetInput.Type;

// Output Schema
export const FleetspaceAccountGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FleetspaceAccountGetOutput = typeof FleetspaceAccountGetOutput.Type;

// The operation
/**
 * Retrieves the properties of an existing Azure Cosmos DB fleetspace account under a fleetspace
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetspaceAccountGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetspaceAccountGetInput,
    outputSchema: FleetspaceAccountGetOutput,
  }),
);
// Input Schema
export const FleetspaceAccountListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}/fleetspaceAccounts",
    }),
  );
export type FleetspaceAccountListInput = typeof FleetspaceAccountListInput.Type;

// Output Schema
export const FleetspaceAccountListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type FleetspaceAccountListOutput =
  typeof FleetspaceAccountListOutput.Type;

// The operation
/**
 * Lists all the fleetspaces accounts  under a fleetspace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetspaceAccountList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetspaceAccountListInput,
    outputSchema: FleetspaceAccountListOutput,
  }),
);
// Input Schema
export const FleetspaceCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}",
  }),
);
export type FleetspaceCreateInput = typeof FleetspaceCreateInput.Type;

// Output Schema
export const FleetspaceCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FleetspaceCreateOutput = typeof FleetspaceCreateOutput.Type;

// The operation
/**
 * Creates an Azure Cosmos DB fleetspace under a fleet.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetspaceCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetspaceCreateInput,
  outputSchema: FleetspaceCreateOutput,
}));
// Input Schema
export const FleetspaceDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}",
  }),
);
export type FleetspaceDeleteInput = typeof FleetspaceDeleteInput.Type;

// Output Schema
export const FleetspaceDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FleetspaceDeleteOutput = typeof FleetspaceDeleteOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB Fleetspace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetspaceDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetspaceDeleteInput,
  outputSchema: FleetspaceDeleteOutput,
}));
// Input Schema
export const FleetspaceGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}",
  }),
);
export type FleetspaceGetInput = typeof FleetspaceGetInput.Type;

// Output Schema
export const FleetspaceGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FleetspaceGetOutput = typeof FleetspaceGetOutput.Type;

// The operation
/**
 * Retrieves the properties of an existing Azure Cosmos DB fleetspace under a fleet
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetspaceGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetspaceGetInput,
  outputSchema: FleetspaceGetOutput,
}));
// Input Schema
export const FleetspaceListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces",
  }),
);
export type FleetspaceListInput = typeof FleetspaceListInput.Type;

// Output Schema
export const FleetspaceListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type FleetspaceListOutput = typeof FleetspaceListOutput.Type;

// The operation
/**
 * Lists all the fleetspaces under a fleet.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetspaceList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetspaceListInput,
  outputSchema: FleetspaceListOutput,
}));
// Input Schema
export const FleetspaceUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}/fleetspaces/{fleetspaceName}",
  }),
);
export type FleetspaceUpdateInput = typeof FleetspaceUpdateInput.Type;

// Output Schema
export const FleetspaceUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FleetspaceUpdateOutput = typeof FleetspaceUpdateOutput.Type;

// The operation
/**
 * Update the properties of an existing Azure Cosmos DB fleetspace under a fleet.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetspaceUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetspaceUpdateInput,
  outputSchema: FleetspaceUpdateOutput,
}));
// Input Schema
export const FleetUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/fleets/{fleetName}",
  }),
);
export type FleetUpdateInput = typeof FleetUpdateInput.Type;

// Output Schema
export const FleetUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FleetUpdateOutput = typeof FleetUpdateOutput.Type;

// The operation
/**
 * Updates the properties of an existing Azure Cosmos DB Fleet.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const FleetUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetUpdateInput,
  outputSchema: FleetUpdateOutput,
}));
// Input Schema
export const GremlinResourcesCreateUpdateGremlinDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}",
    }),
  );
export type GremlinResourcesCreateUpdateGremlinDatabaseInput =
  typeof GremlinResourcesCreateUpdateGremlinDatabaseInput.Type;

// Output Schema
export const GremlinResourcesCreateUpdateGremlinDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesCreateUpdateGremlinDatabaseOutput =
  typeof GremlinResourcesCreateUpdateGremlinDatabaseOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB Gremlin database
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesCreateUpdateGremlinDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesCreateUpdateGremlinDatabaseInput,
    outputSchema: GremlinResourcesCreateUpdateGremlinDatabaseOutput,
  }));
// Input Schema
export const GremlinResourcesCreateUpdateGremlinGraphInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}",
    }),
  );
export type GremlinResourcesCreateUpdateGremlinGraphInput =
  typeof GremlinResourcesCreateUpdateGremlinGraphInput.Type;

// Output Schema
export const GremlinResourcesCreateUpdateGremlinGraphOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesCreateUpdateGremlinGraphOutput =
  typeof GremlinResourcesCreateUpdateGremlinGraphOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB Gremlin graph
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesCreateUpdateGremlinGraph =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesCreateUpdateGremlinGraphInput,
    outputSchema: GremlinResourcesCreateUpdateGremlinGraphOutput,
  }));
// Input Schema
export const GremlinResourcesDeleteGremlinDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}",
    }),
  );
export type GremlinResourcesDeleteGremlinDatabaseInput =
  typeof GremlinResourcesDeleteGremlinDatabaseInput.Type;

// Output Schema
export const GremlinResourcesDeleteGremlinDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GremlinResourcesDeleteGremlinDatabaseOutput =
  typeof GremlinResourcesDeleteGremlinDatabaseOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB Gremlin database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesDeleteGremlinDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesDeleteGremlinDatabaseInput,
    outputSchema: GremlinResourcesDeleteGremlinDatabaseOutput,
  }));
// Input Schema
export const GremlinResourcesDeleteGremlinGraphInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}",
    }),
  );
export type GremlinResourcesDeleteGremlinGraphInput =
  typeof GremlinResourcesDeleteGremlinGraphInput.Type;

// Output Schema
export const GremlinResourcesDeleteGremlinGraphOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GremlinResourcesDeleteGremlinGraphOutput =
  typeof GremlinResourcesDeleteGremlinGraphOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB Gremlin graph.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesDeleteGremlinGraph =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesDeleteGremlinGraphInput,
    outputSchema: GremlinResourcesDeleteGremlinGraphOutput,
  }));
// Input Schema
export const GremlinResourcesGetGremlinDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}",
    }),
  );
export type GremlinResourcesGetGremlinDatabaseInput =
  typeof GremlinResourcesGetGremlinDatabaseInput.Type;

// Output Schema
export const GremlinResourcesGetGremlinDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesGetGremlinDatabaseOutput =
  typeof GremlinResourcesGetGremlinDatabaseOutput.Type;

// The operation
/**
 * Gets the Gremlin databases under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesGetGremlinDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesGetGremlinDatabaseInput,
    outputSchema: GremlinResourcesGetGremlinDatabaseOutput,
  }));
// Input Schema
export const GremlinResourcesGetGremlinDatabaseThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default",
    }),
  );
export type GremlinResourcesGetGremlinDatabaseThroughputInput =
  typeof GremlinResourcesGetGremlinDatabaseThroughputInput.Type;

// Output Schema
export const GremlinResourcesGetGremlinDatabaseThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesGetGremlinDatabaseThroughputOutput =
  typeof GremlinResourcesGetGremlinDatabaseThroughputOutput.Type;

// The operation
/**
 * Gets the RUs per second of the Gremlin database under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesGetGremlinDatabaseThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesGetGremlinDatabaseThroughputInput,
    outputSchema: GremlinResourcesGetGremlinDatabaseThroughputOutput,
  }));
// Input Schema
export const GremlinResourcesGetGremlinGraphInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}",
    }),
  );
export type GremlinResourcesGetGremlinGraphInput =
  typeof GremlinResourcesGetGremlinGraphInput.Type;

// Output Schema
export const GremlinResourcesGetGremlinGraphOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesGetGremlinGraphOutput =
  typeof GremlinResourcesGetGremlinGraphOutput.Type;

// The operation
/**
 * Gets the Gremlin graph under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesGetGremlinGraph =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesGetGremlinGraphInput,
    outputSchema: GremlinResourcesGetGremlinGraphOutput,
  }));
// Input Schema
export const GremlinResourcesGetGremlinGraphThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default",
    }),
  );
export type GremlinResourcesGetGremlinGraphThroughputInput =
  typeof GremlinResourcesGetGremlinGraphThroughputInput.Type;

// Output Schema
export const GremlinResourcesGetGremlinGraphThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesGetGremlinGraphThroughputOutput =
  typeof GremlinResourcesGetGremlinGraphThroughputOutput.Type;

// The operation
/**
 * Gets the Gremlin graph throughput under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesGetGremlinGraphThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesGetGremlinGraphThroughputInput,
    outputSchema: GremlinResourcesGetGremlinGraphThroughputOutput,
  }));
// Input Schema
export const GremlinResourcesListGremlinDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases",
    }),
  );
export type GremlinResourcesListGremlinDatabasesInput =
  typeof GremlinResourcesListGremlinDatabasesInput.Type;

// Output Schema
export const GremlinResourcesListGremlinDatabasesOutput =
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
  });
export type GremlinResourcesListGremlinDatabasesOutput =
  typeof GremlinResourcesListGremlinDatabasesOutput.Type;

// The operation
/**
 * Lists the Gremlin databases under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesListGremlinDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesListGremlinDatabasesInput,
    outputSchema: GremlinResourcesListGremlinDatabasesOutput,
  }));
// Input Schema
export const GremlinResourcesListGremlinGraphsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs",
    }),
  );
export type GremlinResourcesListGremlinGraphsInput =
  typeof GremlinResourcesListGremlinGraphsInput.Type;

// Output Schema
export const GremlinResourcesListGremlinGraphsOutput =
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
  });
export type GremlinResourcesListGremlinGraphsOutput =
  typeof GremlinResourcesListGremlinGraphsOutput.Type;

// The operation
/**
 * Lists the Gremlin graph under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesListGremlinGraphs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesListGremlinGraphsInput,
    outputSchema: GremlinResourcesListGremlinGraphsOutput,
  }));
// Input Schema
export const GremlinResourcesMigrateGremlinDatabaseToAutoscaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default/migrateToAutoscale",
    }),
  );
export type GremlinResourcesMigrateGremlinDatabaseToAutoscaleInput =
  typeof GremlinResourcesMigrateGremlinDatabaseToAutoscaleInput.Type;

// Output Schema
export const GremlinResourcesMigrateGremlinDatabaseToAutoscaleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesMigrateGremlinDatabaseToAutoscaleOutput =
  typeof GremlinResourcesMigrateGremlinDatabaseToAutoscaleOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Gremlin database from manual throughput to autoscale
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesMigrateGremlinDatabaseToAutoscale =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesMigrateGremlinDatabaseToAutoscaleInput,
    outputSchema: GremlinResourcesMigrateGremlinDatabaseToAutoscaleOutput,
  }));
// Input Schema
export const GremlinResourcesMigrateGremlinDatabaseToManualThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default/migrateToManualThroughput",
    }),
  );
export type GremlinResourcesMigrateGremlinDatabaseToManualThroughputInput =
  typeof GremlinResourcesMigrateGremlinDatabaseToManualThroughputInput.Type;

// Output Schema
export const GremlinResourcesMigrateGremlinDatabaseToManualThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesMigrateGremlinDatabaseToManualThroughputOutput =
  typeof GremlinResourcesMigrateGremlinDatabaseToManualThroughputOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Gremlin database from autoscale to manual throughput
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesMigrateGremlinDatabaseToManualThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesMigrateGremlinDatabaseToManualThroughputInput,
    outputSchema:
      GremlinResourcesMigrateGremlinDatabaseToManualThroughputOutput,
  }));
// Input Schema
export const GremlinResourcesMigrateGremlinGraphToAutoscaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default/migrateToAutoscale",
    }),
  );
export type GremlinResourcesMigrateGremlinGraphToAutoscaleInput =
  typeof GremlinResourcesMigrateGremlinGraphToAutoscaleInput.Type;

// Output Schema
export const GremlinResourcesMigrateGremlinGraphToAutoscaleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesMigrateGremlinGraphToAutoscaleOutput =
  typeof GremlinResourcesMigrateGremlinGraphToAutoscaleOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Gremlin graph from manual throughput to autoscale
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesMigrateGremlinGraphToAutoscale =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesMigrateGremlinGraphToAutoscaleInput,
    outputSchema: GremlinResourcesMigrateGremlinGraphToAutoscaleOutput,
  }));
// Input Schema
export const GremlinResourcesMigrateGremlinGraphToManualThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default/migrateToManualThroughput",
    }),
  );
export type GremlinResourcesMigrateGremlinGraphToManualThroughputInput =
  typeof GremlinResourcesMigrateGremlinGraphToManualThroughputInput.Type;

// Output Schema
export const GremlinResourcesMigrateGremlinGraphToManualThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesMigrateGremlinGraphToManualThroughputOutput =
  typeof GremlinResourcesMigrateGremlinGraphToManualThroughputOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Gremlin graph from autoscale to manual throughput
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesMigrateGremlinGraphToManualThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesMigrateGremlinGraphToManualThroughputInput,
    outputSchema: GremlinResourcesMigrateGremlinGraphToManualThroughputOutput,
  }));
// Input Schema
export const GremlinResourcesRetrieveContinuousBackupInformationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    graphName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/retrieveContinuousBackupInformation",
    }),
  );
export type GremlinResourcesRetrieveContinuousBackupInformationInput =
  typeof GremlinResourcesRetrieveContinuousBackupInformationInput.Type;

// Output Schema
export const GremlinResourcesRetrieveContinuousBackupInformationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    continuousBackupInformation: Schema.optional(
      Schema.Struct({
        latestRestorableTimestamp: Schema.optional(Schema.String),
      }),
    ),
  });
export type GremlinResourcesRetrieveContinuousBackupInformationOutput =
  typeof GremlinResourcesRetrieveContinuousBackupInformationOutput.Type;

// The operation
/**
 * Retrieves continuous backup information for a gremlin graph.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param databaseName - Cosmos DB database name.
 * @param graphName - Cosmos DB graph name.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesRetrieveContinuousBackupInformation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesRetrieveContinuousBackupInformationInput,
    outputSchema: GremlinResourcesRetrieveContinuousBackupInformationOutput,
  }));
// Input Schema
export const GremlinResourcesUpdateGremlinDatabaseThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default",
    }),
  );
export type GremlinResourcesUpdateGremlinDatabaseThroughputInput =
  typeof GremlinResourcesUpdateGremlinDatabaseThroughputInput.Type;

// Output Schema
export const GremlinResourcesUpdateGremlinDatabaseThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesUpdateGremlinDatabaseThroughputOutput =
  typeof GremlinResourcesUpdateGremlinDatabaseThroughputOutput.Type;

// The operation
/**
 * Update RUs per second of an Azure Cosmos DB Gremlin database
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesUpdateGremlinDatabaseThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesUpdateGremlinDatabaseThroughputInput,
    outputSchema: GremlinResourcesUpdateGremlinDatabaseThroughputOutput,
  }));
// Input Schema
export const GremlinResourcesUpdateGremlinGraphThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default",
    }),
  );
export type GremlinResourcesUpdateGremlinGraphThroughputInput =
  typeof GremlinResourcesUpdateGremlinGraphThroughputInput.Type;

// Output Schema
export const GremlinResourcesUpdateGremlinGraphThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type GremlinResourcesUpdateGremlinGraphThroughputOutput =
  typeof GremlinResourcesUpdateGremlinGraphThroughputOutput.Type;

// The operation
/**
 * Update RUs per second of an Azure Cosmos DB Gremlin graph
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const GremlinResourcesUpdateGremlinGraphThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GremlinResourcesUpdateGremlinGraphThroughputInput,
    outputSchema: GremlinResourcesUpdateGremlinGraphThroughputOutput,
  }));
// Input Schema
export const LocationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}",
  }),
);
export type LocationsGetInput = typeof LocationsGetInput.Type;

// Output Schema
export const LocationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type LocationsGetOutput = typeof LocationsGetOutput.Type;

// The operation
/**
 * Get the properties of an existing Cosmos DB location
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LocationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocationsGetInput,
  outputSchema: LocationsGetOutput,
}));
// Input Schema
export const LocationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations",
  }),
);
export type LocationsListInput = typeof LocationsListInput.Type;

// Output Schema
export const LocationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type LocationsListOutput = typeof LocationsListOutput.Type;

// The operation
/**
 * List Cosmos DB locations and their properties
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LocationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocationsListInput,
  outputSchema: LocationsListOutput,
}));
// Input Schema
export const MongoDBResourcesCreateUpdateMongoDBCollectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}",
    }),
  );
export type MongoDBResourcesCreateUpdateMongoDBCollectionInput =
  typeof MongoDBResourcesCreateUpdateMongoDBCollectionInput.Type;

// Output Schema
export const MongoDBResourcesCreateUpdateMongoDBCollectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesCreateUpdateMongoDBCollectionOutput =
  typeof MongoDBResourcesCreateUpdateMongoDBCollectionOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB MongoDB Collection
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesCreateUpdateMongoDBCollection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesCreateUpdateMongoDBCollectionInput,
    outputSchema: MongoDBResourcesCreateUpdateMongoDBCollectionOutput,
  }));
// Input Schema
export const MongoDBResourcesCreateUpdateMongoDBDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}",
    }),
  );
export type MongoDBResourcesCreateUpdateMongoDBDatabaseInput =
  typeof MongoDBResourcesCreateUpdateMongoDBDatabaseInput.Type;

// Output Schema
export const MongoDBResourcesCreateUpdateMongoDBDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesCreateUpdateMongoDBDatabaseOutput =
  typeof MongoDBResourcesCreateUpdateMongoDBDatabaseOutput.Type;

// The operation
/**
 * Create or updates Azure Cosmos DB MongoDB database
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesCreateUpdateMongoDBDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesCreateUpdateMongoDBDatabaseInput,
    outputSchema: MongoDBResourcesCreateUpdateMongoDBDatabaseOutput,
  }));
// Input Schema
export const MongoDBResourcesCreateUpdateMongoRoleDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions/{mongoRoleDefinitionId}",
    }),
  );
export type MongoDBResourcesCreateUpdateMongoRoleDefinitionInput =
  typeof MongoDBResourcesCreateUpdateMongoRoleDefinitionInput.Type;

// Output Schema
export const MongoDBResourcesCreateUpdateMongoRoleDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type MongoDBResourcesCreateUpdateMongoRoleDefinitionOutput =
  typeof MongoDBResourcesCreateUpdateMongoRoleDefinitionOutput.Type;

// The operation
/**
 * Creates or updates an Azure Cosmos DB Mongo Role Definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesCreateUpdateMongoRoleDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesCreateUpdateMongoRoleDefinitionInput,
    outputSchema: MongoDBResourcesCreateUpdateMongoRoleDefinitionOutput,
  }));
// Input Schema
export const MongoDBResourcesCreateUpdateMongoUserDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions/{mongoUserDefinitionId}",
    }),
  );
export type MongoDBResourcesCreateUpdateMongoUserDefinitionInput =
  typeof MongoDBResourcesCreateUpdateMongoUserDefinitionInput.Type;

// Output Schema
export const MongoDBResourcesCreateUpdateMongoUserDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type MongoDBResourcesCreateUpdateMongoUserDefinitionOutput =
  typeof MongoDBResourcesCreateUpdateMongoUserDefinitionOutput.Type;

// The operation
/**
 * Creates or updates an Azure Cosmos DB Mongo User Definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesCreateUpdateMongoUserDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesCreateUpdateMongoUserDefinitionInput,
    outputSchema: MongoDBResourcesCreateUpdateMongoUserDefinitionOutput,
  }));
// Input Schema
export const MongoDBResourcesDeleteMongoDBCollectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}",
    }),
  );
export type MongoDBResourcesDeleteMongoDBCollectionInput =
  typeof MongoDBResourcesDeleteMongoDBCollectionInput.Type;

// Output Schema
export const MongoDBResourcesDeleteMongoDBCollectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MongoDBResourcesDeleteMongoDBCollectionOutput =
  typeof MongoDBResourcesDeleteMongoDBCollectionOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB MongoDB Collection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesDeleteMongoDBCollection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesDeleteMongoDBCollectionInput,
    outputSchema: MongoDBResourcesDeleteMongoDBCollectionOutput,
  }));
// Input Schema
export const MongoDBResourcesDeleteMongoDBDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}",
    }),
  );
export type MongoDBResourcesDeleteMongoDBDatabaseInput =
  typeof MongoDBResourcesDeleteMongoDBDatabaseInput.Type;

// Output Schema
export const MongoDBResourcesDeleteMongoDBDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MongoDBResourcesDeleteMongoDBDatabaseOutput =
  typeof MongoDBResourcesDeleteMongoDBDatabaseOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB MongoDB database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesDeleteMongoDBDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesDeleteMongoDBDatabaseInput,
    outputSchema: MongoDBResourcesDeleteMongoDBDatabaseOutput,
  }));
// Input Schema
export const MongoDBResourcesDeleteMongoRoleDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions/{mongoRoleDefinitionId}",
    }),
  );
export type MongoDBResourcesDeleteMongoRoleDefinitionInput =
  typeof MongoDBResourcesDeleteMongoRoleDefinitionInput.Type;

// Output Schema
export const MongoDBResourcesDeleteMongoRoleDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MongoDBResourcesDeleteMongoRoleDefinitionOutput =
  typeof MongoDBResourcesDeleteMongoRoleDefinitionOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB Mongo Role Definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesDeleteMongoRoleDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesDeleteMongoRoleDefinitionInput,
    outputSchema: MongoDBResourcesDeleteMongoRoleDefinitionOutput,
  }));
// Input Schema
export const MongoDBResourcesDeleteMongoUserDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions/{mongoUserDefinitionId}",
    }),
  );
export type MongoDBResourcesDeleteMongoUserDefinitionInput =
  typeof MongoDBResourcesDeleteMongoUserDefinitionInput.Type;

// Output Schema
export const MongoDBResourcesDeleteMongoUserDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MongoDBResourcesDeleteMongoUserDefinitionOutput =
  typeof MongoDBResourcesDeleteMongoUserDefinitionOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB Mongo User Definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesDeleteMongoUserDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesDeleteMongoUserDefinitionInput,
    outputSchema: MongoDBResourcesDeleteMongoUserDefinitionOutput,
  }));
// Input Schema
export const MongoDBResourcesGetMongoDBCollectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}",
    }),
  );
export type MongoDBResourcesGetMongoDBCollectionInput =
  typeof MongoDBResourcesGetMongoDBCollectionInput.Type;

// Output Schema
export const MongoDBResourcesGetMongoDBCollectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesGetMongoDBCollectionOutput =
  typeof MongoDBResourcesGetMongoDBCollectionOutput.Type;

// The operation
/**
 * Gets the MongoDB collection under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesGetMongoDBCollection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesGetMongoDBCollectionInput,
    outputSchema: MongoDBResourcesGetMongoDBCollectionOutput,
  }));
// Input Schema
export const MongoDBResourcesGetMongoDBCollectionThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default",
    }),
  );
export type MongoDBResourcesGetMongoDBCollectionThroughputInput =
  typeof MongoDBResourcesGetMongoDBCollectionThroughputInput.Type;

// Output Schema
export const MongoDBResourcesGetMongoDBCollectionThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesGetMongoDBCollectionThroughputOutput =
  typeof MongoDBResourcesGetMongoDBCollectionThroughputOutput.Type;

// The operation
/**
 * Gets the RUs per second of the MongoDB collection under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesGetMongoDBCollectionThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesGetMongoDBCollectionThroughputInput,
    outputSchema: MongoDBResourcesGetMongoDBCollectionThroughputOutput,
  }));
// Input Schema
export const MongoDBResourcesGetMongoDBDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}",
    }),
  );
export type MongoDBResourcesGetMongoDBDatabaseInput =
  typeof MongoDBResourcesGetMongoDBDatabaseInput.Type;

// Output Schema
export const MongoDBResourcesGetMongoDBDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesGetMongoDBDatabaseOutput =
  typeof MongoDBResourcesGetMongoDBDatabaseOutput.Type;

// The operation
/**
 * Gets the MongoDB databases under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesGetMongoDBDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesGetMongoDBDatabaseInput,
    outputSchema: MongoDBResourcesGetMongoDBDatabaseOutput,
  }));
// Input Schema
export const MongoDBResourcesGetMongoDBDatabaseThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default",
    }),
  );
export type MongoDBResourcesGetMongoDBDatabaseThroughputInput =
  typeof MongoDBResourcesGetMongoDBDatabaseThroughputInput.Type;

// Output Schema
export const MongoDBResourcesGetMongoDBDatabaseThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesGetMongoDBDatabaseThroughputOutput =
  typeof MongoDBResourcesGetMongoDBDatabaseThroughputOutput.Type;

// The operation
/**
 * Gets the RUs per second of the MongoDB database under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesGetMongoDBDatabaseThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesGetMongoDBDatabaseThroughputInput,
    outputSchema: MongoDBResourcesGetMongoDBDatabaseThroughputOutput,
  }));
// Input Schema
export const MongoDBResourcesGetMongoRoleDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions/{mongoRoleDefinitionId}",
    }),
  );
export type MongoDBResourcesGetMongoRoleDefinitionInput =
  typeof MongoDBResourcesGetMongoRoleDefinitionInput.Type;

// Output Schema
export const MongoDBResourcesGetMongoRoleDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type MongoDBResourcesGetMongoRoleDefinitionOutput =
  typeof MongoDBResourcesGetMongoRoleDefinitionOutput.Type;

// The operation
/**
 * Retrieves the properties of an existing Azure Cosmos DB Mongo Role Definition with the given Id.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesGetMongoRoleDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesGetMongoRoleDefinitionInput,
    outputSchema: MongoDBResourcesGetMongoRoleDefinitionOutput,
  }));
// Input Schema
export const MongoDBResourcesGetMongoUserDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions/{mongoUserDefinitionId}",
    }),
  );
export type MongoDBResourcesGetMongoUserDefinitionInput =
  typeof MongoDBResourcesGetMongoUserDefinitionInput.Type;

// Output Schema
export const MongoDBResourcesGetMongoUserDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type MongoDBResourcesGetMongoUserDefinitionOutput =
  typeof MongoDBResourcesGetMongoUserDefinitionOutput.Type;

// The operation
/**
 * Retrieves the properties of an existing Azure Cosmos DB Mongo User Definition with the given Id.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesGetMongoUserDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesGetMongoUserDefinitionInput,
    outputSchema: MongoDBResourcesGetMongoUserDefinitionOutput,
  }));
// Input Schema
export const MongoDBResourcesListMongoDBCollectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections",
    }),
  );
export type MongoDBResourcesListMongoDBCollectionsInput =
  typeof MongoDBResourcesListMongoDBCollectionsInput.Type;

// Output Schema
export const MongoDBResourcesListMongoDBCollectionsOutput =
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
  });
export type MongoDBResourcesListMongoDBCollectionsOutput =
  typeof MongoDBResourcesListMongoDBCollectionsOutput.Type;

// The operation
/**
 * Lists the MongoDB collection under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesListMongoDBCollections =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesListMongoDBCollectionsInput,
    outputSchema: MongoDBResourcesListMongoDBCollectionsOutput,
  }));
// Input Schema
export const MongoDBResourcesListMongoDBDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases",
    }),
  );
export type MongoDBResourcesListMongoDBDatabasesInput =
  typeof MongoDBResourcesListMongoDBDatabasesInput.Type;

// Output Schema
export const MongoDBResourcesListMongoDBDatabasesOutput =
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
  });
export type MongoDBResourcesListMongoDBDatabasesOutput =
  typeof MongoDBResourcesListMongoDBDatabasesOutput.Type;

// The operation
/**
 * Lists the MongoDB databases under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesListMongoDBDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesListMongoDBDatabasesInput,
    outputSchema: MongoDBResourcesListMongoDBDatabasesOutput,
  }));
// Input Schema
export const MongoDBResourcesListMongoRoleDefinitionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbRoleDefinitions",
    }),
  );
export type MongoDBResourcesListMongoRoleDefinitionsInput =
  typeof MongoDBResourcesListMongoRoleDefinitionsInput.Type;

// Output Schema
export const MongoDBResourcesListMongoRoleDefinitionsOutput =
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
export type MongoDBResourcesListMongoRoleDefinitionsOutput =
  typeof MongoDBResourcesListMongoRoleDefinitionsOutput.Type;

// The operation
/**
 * Retrieves the list of all Azure Cosmos DB Mongo Role Definitions.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesListMongoRoleDefinitions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesListMongoRoleDefinitionsInput,
    outputSchema: MongoDBResourcesListMongoRoleDefinitionsOutput,
  }));
// Input Schema
export const MongoDBResourcesListMongoUserDefinitionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbUserDefinitions",
    }),
  );
export type MongoDBResourcesListMongoUserDefinitionsInput =
  typeof MongoDBResourcesListMongoUserDefinitionsInput.Type;

// Output Schema
export const MongoDBResourcesListMongoUserDefinitionsOutput =
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
export type MongoDBResourcesListMongoUserDefinitionsOutput =
  typeof MongoDBResourcesListMongoUserDefinitionsOutput.Type;

// The operation
/**
 * Retrieves the list of all Azure Cosmos DB Mongo User Definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesListMongoUserDefinitions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesListMongoUserDefinitionsInput,
    outputSchema: MongoDBResourcesListMongoUserDefinitionsOutput,
  }));
// Input Schema
export const MongoDBResourcesMigrateMongoDBCollectionToAutoscaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/migrateToAutoscale",
    }),
  );
export type MongoDBResourcesMigrateMongoDBCollectionToAutoscaleInput =
  typeof MongoDBResourcesMigrateMongoDBCollectionToAutoscaleInput.Type;

// Output Schema
export const MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOutput =
  typeof MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB MongoDB collection from manual throughput to autoscale
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesMigrateMongoDBCollectionToAutoscale =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleInput,
    outputSchema: MongoDBResourcesMigrateMongoDBCollectionToAutoscaleOutput,
  }));
// Input Schema
export const MongoDBResourcesMigrateMongoDBCollectionToManualThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default/migrateToManualThroughput",
    }),
  );
export type MongoDBResourcesMigrateMongoDBCollectionToManualThroughputInput =
  typeof MongoDBResourcesMigrateMongoDBCollectionToManualThroughputInput.Type;

// Output Schema
export const MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOutput =
  typeof MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB MongoDB collection from autoscale to manual throughput
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesMigrateMongoDBCollectionToManualThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      MongoDBResourcesMigrateMongoDBCollectionToManualThroughputInput,
    outputSchema:
      MongoDBResourcesMigrateMongoDBCollectionToManualThroughputOutput,
  }));
// Input Schema
export const MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/migrateToAutoscale",
    }),
  );
export type MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleInput =
  typeof MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleInput.Type;

// Output Schema
export const MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOutput =
  typeof MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB MongoDB database from manual throughput to autoscale
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesMigrateMongoDBDatabaseToAutoscale =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleInput,
    outputSchema: MongoDBResourcesMigrateMongoDBDatabaseToAutoscaleOutput,
  }));
// Input Schema
export const MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default/migrateToManualThroughput",
    }),
  );
export type MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputInput =
  typeof MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputInput.Type;

// Output Schema
export const MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOutput =
  typeof MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB MongoDB database from autoscale to manual throughput
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesMigrateMongoDBDatabaseToManualThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputInput,
    outputSchema:
      MongoDBResourcesMigrateMongoDBDatabaseToManualThroughputOutput,
  }));
// Input Schema
export const MongoDBResourcesRetrieveContinuousBackupInformationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    collectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/retrieveContinuousBackupInformation",
    }),
  );
export type MongoDBResourcesRetrieveContinuousBackupInformationInput =
  typeof MongoDBResourcesRetrieveContinuousBackupInformationInput.Type;

// Output Schema
export const MongoDBResourcesRetrieveContinuousBackupInformationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    continuousBackupInformation: Schema.optional(
      Schema.Struct({
        latestRestorableTimestamp: Schema.optional(Schema.String),
      }),
    ),
  });
export type MongoDBResourcesRetrieveContinuousBackupInformationOutput =
  typeof MongoDBResourcesRetrieveContinuousBackupInformationOutput.Type;

// The operation
/**
 * Retrieves continuous backup information for a Mongodb collection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param databaseName - Cosmos DB database name.
 * @param collectionName - Cosmos DB collection name.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesRetrieveContinuousBackupInformation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesRetrieveContinuousBackupInformationInput,
    outputSchema: MongoDBResourcesRetrieveContinuousBackupInformationOutput,
  }));
// Input Schema
export const MongoDBResourcesUpdateMongoDBCollectionThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default",
    }),
  );
export type MongoDBResourcesUpdateMongoDBCollectionThroughputInput =
  typeof MongoDBResourcesUpdateMongoDBCollectionThroughputInput.Type;

// Output Schema
export const MongoDBResourcesUpdateMongoDBCollectionThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesUpdateMongoDBCollectionThroughputOutput =
  typeof MongoDBResourcesUpdateMongoDBCollectionThroughputOutput.Type;

// The operation
/**
 * Update the RUs per second of an Azure Cosmos DB MongoDB collection
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesUpdateMongoDBCollectionThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesUpdateMongoDBCollectionThroughputInput,
    outputSchema: MongoDBResourcesUpdateMongoDBCollectionThroughputOutput,
  }));
// Input Schema
export const MongoDBResourcesUpdateMongoDBDatabaseThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default",
    }),
  );
export type MongoDBResourcesUpdateMongoDBDatabaseThroughputInput =
  typeof MongoDBResourcesUpdateMongoDBDatabaseThroughputInput.Type;

// Output Schema
export const MongoDBResourcesUpdateMongoDBDatabaseThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type MongoDBResourcesUpdateMongoDBDatabaseThroughputOutput =
  typeof MongoDBResourcesUpdateMongoDBDatabaseThroughputOutput.Type;

// The operation
/**
 * Update RUs per second of the an Azure Cosmos DB MongoDB database
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const MongoDBResourcesUpdateMongoDBDatabaseThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MongoDBResourcesUpdateMongoDBDatabaseThroughputInput,
    outputSchema: MongoDBResourcesUpdateMongoDBDatabaseThroughputOutput,
  }));
// Input Schema
export const NotebookWorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}",
    }),
  );
export type NotebookWorkspacesCreateOrUpdateInput =
  typeof NotebookWorkspacesCreateOrUpdateInput.Type;

// Output Schema
export const NotebookWorkspacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type NotebookWorkspacesCreateOrUpdateOutput =
  typeof NotebookWorkspacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates the notebook workspace for a Cosmos DB account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotebookWorkspacesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotebookWorkspacesCreateOrUpdateInput,
    outputSchema: NotebookWorkspacesCreateOrUpdateOutput,
  }));
// Input Schema
export const NotebookWorkspacesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}",
    }),
  );
export type NotebookWorkspacesDeleteInput =
  typeof NotebookWorkspacesDeleteInput.Type;

// Output Schema
export const NotebookWorkspacesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NotebookWorkspacesDeleteOutput =
  typeof NotebookWorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes the notebook workspace for a Cosmos DB account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotebookWorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NotebookWorkspacesDeleteInput,
    outputSchema: NotebookWorkspacesDeleteOutput,
  }),
);
// Input Schema
export const NotebookWorkspacesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}",
    }),
  );
export type NotebookWorkspacesGetInput = typeof NotebookWorkspacesGetInput.Type;

// Output Schema
export const NotebookWorkspacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type NotebookWorkspacesGetOutput =
  typeof NotebookWorkspacesGetOutput.Type;

// The operation
/**
 * Gets the notebook workspace for a Cosmos DB account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotebookWorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NotebookWorkspacesGetInput,
    outputSchema: NotebookWorkspacesGetOutput,
  }),
);
// Input Schema
export const NotebookWorkspacesListByDatabaseAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces",
    }),
  );
export type NotebookWorkspacesListByDatabaseAccountInput =
  typeof NotebookWorkspacesListByDatabaseAccountInput.Type;

// Output Schema
export const NotebookWorkspacesListByDatabaseAccountOutput =
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
export type NotebookWorkspacesListByDatabaseAccountOutput =
  typeof NotebookWorkspacesListByDatabaseAccountOutput.Type;

// The operation
/**
 * Gets the notebook workspace resources of an existing Cosmos DB account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotebookWorkspacesListByDatabaseAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotebookWorkspacesListByDatabaseAccountInput,
    outputSchema: NotebookWorkspacesListByDatabaseAccountOutput,
  }));
// Input Schema
export const NotebookWorkspacesListConnectionInfoInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}/listConnectionInfo",
    }),
  );
export type NotebookWorkspacesListConnectionInfoInput =
  typeof NotebookWorkspacesListConnectionInfoInput.Type;

// Output Schema
export const NotebookWorkspacesListConnectionInfoOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    authToken: Schema.optional(Schema.String),
    notebookServerEndpoint: Schema.optional(Schema.String),
  });
export type NotebookWorkspacesListConnectionInfoOutput =
  typeof NotebookWorkspacesListConnectionInfoOutput.Type;

// The operation
/**
 * Retrieves the connection info for the notebook workspace
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotebookWorkspacesListConnectionInfo =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotebookWorkspacesListConnectionInfoInput,
    outputSchema: NotebookWorkspacesListConnectionInfoOutput,
  }));
// Input Schema
export const NotebookWorkspacesRegenerateAuthTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}/regenerateAuthToken",
    }),
  );
export type NotebookWorkspacesRegenerateAuthTokenInput =
  typeof NotebookWorkspacesRegenerateAuthTokenInput.Type;

// Output Schema
export const NotebookWorkspacesRegenerateAuthTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NotebookWorkspacesRegenerateAuthTokenOutput =
  typeof NotebookWorkspacesRegenerateAuthTokenOutput.Type;

// The operation
/**
 * Regenerates the auth token for the notebook workspace
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotebookWorkspacesRegenerateAuthToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NotebookWorkspacesRegenerateAuthTokenInput,
    outputSchema: NotebookWorkspacesRegenerateAuthTokenOutput,
  }));
// Input Schema
export const NotebookWorkspacesStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/notebookWorkspaces/{notebookWorkspaceName}/start",
    }),
  );
export type NotebookWorkspacesStartInput =
  typeof NotebookWorkspacesStartInput.Type;

// Output Schema
export const NotebookWorkspacesStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NotebookWorkspacesStartOutput =
  typeof NotebookWorkspacesStartOutput.Type;

// The operation
/**
 * Starts the notebook workspace
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NotebookWorkspacesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NotebookWorkspacesStartInput,
    outputSchema: NotebookWorkspacesStartOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.DocumentDB/operations" }),
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
            Provider: Schema.optional(Schema.String),
            Resource: Schema.optional(Schema.String),
            Operation: Schema.optional(Schema.String),
            Description: Schema.optional(Schema.String),
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
 * Lists all of the available Cosmos DB Resource Provider operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PartitionKeyRangeIdListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/databases/{databaseRid}/collections/{collectionRid}/partitionKeyRangeId/{partitionKeyRangeId}/metrics",
    }),
  );
export type PartitionKeyRangeIdListMetricsInput =
  typeof PartitionKeyRangeIdListMetricsInput.Type;

// Output Schema
export const PartitionKeyRangeIdListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type PartitionKeyRangeIdListMetricsOutput =
  typeof PartitionKeyRangeIdListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given partition key range id.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PartitionKeyRangeIdListMetrics =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartitionKeyRangeIdListMetricsInput,
    outputSchema: PartitionKeyRangeIdListMetricsOutput,
  }));
// Input Schema
export const PartitionKeyRangeIdRegionListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/region/{region}/databases/{databaseRid}/collections/{collectionRid}/partitionKeyRangeId/{partitionKeyRangeId}/metrics",
    }),
  );
export type PartitionKeyRangeIdRegionListMetricsInput =
  typeof PartitionKeyRangeIdRegionListMetricsInput.Type;

// Output Schema
export const PartitionKeyRangeIdRegionListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type PartitionKeyRangeIdRegionListMetricsOutput =
  typeof PartitionKeyRangeIdRegionListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given partition key range id and region.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PartitionKeyRangeIdRegionListMetrics =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PartitionKeyRangeIdRegionListMetricsInput,
    outputSchema: PartitionKeyRangeIdRegionListMetricsOutput,
  }));
// Input Schema
export const PercentileListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/percentile/metrics",
    }),
  );
export type PercentileListMetricsInput = typeof PercentileListMetricsInput.Type;

// Output Schema
export const PercentileListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type PercentileListMetricsOutput =
  typeof PercentileListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given database account. This url is only for PBS and Replication Latency data
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PercentileListMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PercentileListMetricsInput,
    outputSchema: PercentileListMetricsOutput,
  }),
);
// Input Schema
export const PercentileSourceTargetListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sourceRegion/{sourceRegion}/targetRegion/{targetRegion}/percentile/metrics",
    }),
  );
export type PercentileSourceTargetListMetricsInput =
  typeof PercentileSourceTargetListMetricsInput.Type;

// Output Schema
export const PercentileSourceTargetListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type PercentileSourceTargetListMetricsOutput =
  typeof PercentileSourceTargetListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given account, source and target region. This url is only for PBS and Replication Latency data
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PercentileSourceTargetListMetrics =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PercentileSourceTargetListMetricsInput,
    outputSchema: PercentileSourceTargetListMetricsOutput,
  }));
// Input Schema
export const PercentileTargetListMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/targetRegion/{targetRegion}/percentile/metrics",
    }),
  );
export type PercentileTargetListMetricsInput =
  typeof PercentileTargetListMetricsInput.Type;

// Output Schema
export const PercentileTargetListMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          timeGrain: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          metricValues: Schema.optional(
            Schema.Array(
              Schema.Struct({
                _count: Schema.optional(Schema.Number),
                average: Schema.optional(Schema.Number),
                maximum: Schema.optional(Schema.Number),
                minimum: Schema.optional(Schema.Number),
                timestamp: Schema.optional(Schema.String),
                total: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type PercentileTargetListMetricsOutput =
  typeof PercentileTargetListMetricsOutput.Type;

// The operation
/**
 * Retrieves the metrics determined by the given filter for the given account target region. This url is only for PBS and Replication Latency data
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PercentileTargetListMetrics = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PercentileTargetListMetricsInput,
    outputSchema: PercentileTargetListMetricsOutput,
  }),
);
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Approve or reject a private endpoint connection with a given name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets a private endpoint connection.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByDatabaseAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByDatabaseAccountInput =
  typeof PrivateEndpointConnectionsListByDatabaseAccountInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByDatabaseAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type PrivateEndpointConnectionsListByDatabaseAccountOutput =
  typeof PrivateEndpointConnectionsListByDatabaseAccountOutput.Type;

// The operation
/**
 * List all private endpoint connections on a Cosmos DB account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateEndpointConnectionsListByDatabaseAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByDatabaseAccountInput,
    outputSchema: PrivateEndpointConnectionsListByDatabaseAccountOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateLinkResources/{groupName}",
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
 * Gets the private link resources that need to be created for a Cosmos DB account.
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
export const PrivateLinkResourcesListByDatabaseAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByDatabaseAccountInput =
  typeof PrivateLinkResourcesListByDatabaseAccountInput.Type;

// Output Schema
export const PrivateLinkResourcesListByDatabaseAccountOutput =
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
export type PrivateLinkResourcesListByDatabaseAccountOutput =
  typeof PrivateLinkResourcesListByDatabaseAccountOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a Cosmos DB account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const PrivateLinkResourcesListByDatabaseAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByDatabaseAccountInput,
    outputSchema: PrivateLinkResourcesListByDatabaseAccountOutput,
  }));
// Input Schema
export const RestorableDatabaseAccountsGetByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}",
    }),
  );
export type RestorableDatabaseAccountsGetByLocationInput =
  typeof RestorableDatabaseAccountsGetByLocationInput.Type;

// Output Schema
export const RestorableDatabaseAccountsGetByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        accountName: Schema.optional(Schema.String),
        creationTime: Schema.optional(Schema.String),
        deletionTime: Schema.optional(Schema.String),
        oldestRestorableTime: Schema.optional(Schema.String),
        apiType: Schema.optional(
          Schema.Literals([
            "MongoDB",
            "Gremlin",
            "Cassandra",
            "Table",
            "Sql",
            "GremlinV2",
          ]),
        ),
        restorableLocations: Schema.optional(
          Schema.Array(
            Schema.Struct({
              locationName: Schema.optional(Schema.String),
              regionalDatabaseAccountInstanceId: Schema.optional(Schema.String),
              creationTime: Schema.optional(Schema.String),
              deletionTime: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type RestorableDatabaseAccountsGetByLocationOutput =
  typeof RestorableDatabaseAccountsGetByLocationOutput.Type;

// The operation
/**
 * Retrieves the properties of an existing Azure Cosmos DB restorable database account.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read/*' permission.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableDatabaseAccountsGetByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableDatabaseAccountsGetByLocationInput,
    outputSchema: RestorableDatabaseAccountsGetByLocationOutput,
  }));
// Input Schema
export const RestorableDatabaseAccountsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/restorableDatabaseAccounts",
    }),
  );
export type RestorableDatabaseAccountsListInput =
  typeof RestorableDatabaseAccountsListInput.Type;

// Output Schema
export const RestorableDatabaseAccountsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              accountName: Schema.optional(Schema.String),
              creationTime: Schema.optional(Schema.String),
              deletionTime: Schema.optional(Schema.String),
              oldestRestorableTime: Schema.optional(Schema.String),
              apiType: Schema.optional(
                Schema.Literals([
                  "MongoDB",
                  "Gremlin",
                  "Cassandra",
                  "Table",
                  "Sql",
                  "GremlinV2",
                ]),
              ),
              restorableLocations: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    locationName: Schema.optional(Schema.String),
                    regionalDatabaseAccountInstanceId: Schema.optional(
                      Schema.String,
                    ),
                    creationTime: Schema.optional(Schema.String),
                    deletionTime: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RestorableDatabaseAccountsListOutput =
  typeof RestorableDatabaseAccountsListOutput.Type;

// The operation
/**
 * Lists all the restorable Azure Cosmos DB database accounts available under the subscription. This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read' permission.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableDatabaseAccountsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableDatabaseAccountsListInput,
    outputSchema: RestorableDatabaseAccountsListOutput,
  }));
// Input Schema
export const RestorableDatabaseAccountsListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts",
    }),
  );
export type RestorableDatabaseAccountsListByLocationInput =
  typeof RestorableDatabaseAccountsListByLocationInput.Type;

// Output Schema
export const RestorableDatabaseAccountsListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              accountName: Schema.optional(Schema.String),
              creationTime: Schema.optional(Schema.String),
              deletionTime: Schema.optional(Schema.String),
              oldestRestorableTime: Schema.optional(Schema.String),
              apiType: Schema.optional(
                Schema.Literals([
                  "MongoDB",
                  "Gremlin",
                  "Cassandra",
                  "Table",
                  "Sql",
                  "GremlinV2",
                ]),
              ),
              restorableLocations: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    locationName: Schema.optional(Schema.String),
                    regionalDatabaseAccountInstanceId: Schema.optional(
                      Schema.String,
                    ),
                    creationTime: Schema.optional(Schema.String),
                    deletionTime: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RestorableDatabaseAccountsListByLocationOutput =
  typeof RestorableDatabaseAccountsListByLocationOutput.Type;

// The operation
/**
 * Lists all the restorable Azure Cosmos DB database accounts available under the subscription and in a region.  This call requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/read' permission.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableDatabaseAccountsListByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableDatabaseAccountsListByLocationInput,
    outputSchema: RestorableDatabaseAccountsListByLocationOutput,
  }));
// Input Schema
export const RestorableGremlinDatabasesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableGremlinDatabases",
    }),
  );
export type RestorableGremlinDatabasesListInput =
  typeof RestorableGremlinDatabasesListInput.Type;

// Output Schema
export const RestorableGremlinDatabasesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              resource: Schema.optional(
                Schema.Struct({
                  _rid: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals([
                      "Create",
                      "Replace",
                      "Delete",
                      "Recreate",
                      "SystemOperation",
                    ]),
                  ),
                  canUndelete: Schema.optional(Schema.String),
                  canUndeleteReason: Schema.optional(Schema.String),
                  eventTimestamp: Schema.optional(Schema.String),
                  ownerId: Schema.optional(Schema.String),
                  ownerResourceId: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RestorableGremlinDatabasesListOutput =
  typeof RestorableGremlinDatabasesListOutput.Type;

// The operation
/**
 * Show the event feed of all mutations done on all the Azure Cosmos DB Gremlin databases under the restorable account. This helps in scenario where database was accidentally deleted to get the deletion time. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableGremlinDatabasesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableGremlinDatabasesListInput,
    outputSchema: RestorableGremlinDatabasesListOutput,
  }));
// Input Schema
export const RestorableGremlinGraphsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableGraphs",
    }),
  );
export type RestorableGremlinGraphsListInput =
  typeof RestorableGremlinGraphsListInput.Type;

// Output Schema
export const RestorableGremlinGraphsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              resource: Schema.optional(
                Schema.Struct({
                  _rid: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals([
                      "Create",
                      "Replace",
                      "Delete",
                      "Recreate",
                      "SystemOperation",
                    ]),
                  ),
                  canUndelete: Schema.optional(Schema.String),
                  canUndeleteReason: Schema.optional(Schema.String),
                  eventTimestamp: Schema.optional(Schema.String),
                  ownerId: Schema.optional(Schema.String),
                  ownerResourceId: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RestorableGremlinGraphsListOutput =
  typeof RestorableGremlinGraphsListOutput.Type;

// The operation
/**
 * Show the event feed of all mutations done on all the Azure Cosmos DB Gremlin graphs under a specific database. This helps in scenario where container was accidentally deleted. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableGremlinGraphsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RestorableGremlinGraphsListInput,
    outputSchema: RestorableGremlinGraphsListOutput,
  }),
);
// Input Schema
export const RestorableGremlinResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableGremlinResources",
    }),
  );
export type RestorableGremlinResourcesListInput =
  typeof RestorableGremlinResourcesListInput.Type;

// Output Schema
export const RestorableGremlinResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          databaseName: Schema.optional(Schema.String),
          graphNames: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type RestorableGremlinResourcesListOutput =
  typeof RestorableGremlinResourcesListOutput.Type;

// The operation
/**
 * Return a list of gremlin database and graphs combo that exist on the account at the given timestamp and location. This helps in scenarios to validate what resources exist at given timestamp and location. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableGremlinResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableGremlinResourcesListInput,
    outputSchema: RestorableGremlinResourcesListOutput,
  }));
// Input Schema
export const RestorableMongodbCollectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableMongodbCollections",
    }),
  );
export type RestorableMongodbCollectionsListInput =
  typeof RestorableMongodbCollectionsListInput.Type;

// Output Schema
export const RestorableMongodbCollectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              resource: Schema.optional(
                Schema.Struct({
                  _rid: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals([
                      "Create",
                      "Replace",
                      "Delete",
                      "Recreate",
                      "SystemOperation",
                    ]),
                  ),
                  canUndelete: Schema.optional(Schema.String),
                  canUndeleteReason: Schema.optional(Schema.String),
                  eventTimestamp: Schema.optional(Schema.String),
                  ownerId: Schema.optional(Schema.String),
                  ownerResourceId: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RestorableMongodbCollectionsListOutput =
  typeof RestorableMongodbCollectionsListOutput.Type;

// The operation
/**
 * Show the event feed of all mutations done on all the Azure Cosmos DB MongoDB collections under a specific database.  This helps in scenario where container was accidentally deleted.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableMongodbCollectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableMongodbCollectionsListInput,
    outputSchema: RestorableMongodbCollectionsListOutput,
  }));
// Input Schema
export const RestorableMongodbDatabasesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableMongodbDatabases",
    }),
  );
export type RestorableMongodbDatabasesListInput =
  typeof RestorableMongodbDatabasesListInput.Type;

// Output Schema
export const RestorableMongodbDatabasesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              resource: Schema.optional(
                Schema.Struct({
                  _rid: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals([
                      "Create",
                      "Replace",
                      "Delete",
                      "Recreate",
                      "SystemOperation",
                    ]),
                  ),
                  canUndelete: Schema.optional(Schema.String),
                  canUndeleteReason: Schema.optional(Schema.String),
                  eventTimestamp: Schema.optional(Schema.String),
                  ownerId: Schema.optional(Schema.String),
                  ownerResourceId: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RestorableMongodbDatabasesListOutput =
  typeof RestorableMongodbDatabasesListOutput.Type;

// The operation
/**
 * Show the event feed of all mutations done on all the Azure Cosmos DB MongoDB databases under the restorable account.  This helps in scenario where database was accidentally deleted to get the deletion time.  This API requires  'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableMongodbDatabasesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableMongodbDatabasesListInput,
    outputSchema: RestorableMongodbDatabasesListOutput,
  }));
// Input Schema
export const RestorableMongodbResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableMongodbResources",
    }),
  );
export type RestorableMongodbResourcesListInput =
  typeof RestorableMongodbResourcesListInput.Type;

// Output Schema
export const RestorableMongodbResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          databaseName: Schema.optional(Schema.String),
          collectionNames: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type RestorableMongodbResourcesListOutput =
  typeof RestorableMongodbResourcesListOutput.Type;

// The operation
/**
 * Return a list of database and collection combo that exist on the account at the given timestamp and location. This helps in scenarios to validate what resources exist at given timestamp and location. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableMongodbResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableMongodbResourcesListInput,
    outputSchema: RestorableMongodbResourcesListOutput,
  }));
// Input Schema
export const RestorableSqlContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableSqlContainers",
    }),
  );
export type RestorableSqlContainersListInput =
  typeof RestorableSqlContainersListInput.Type;

// Output Schema
export const RestorableSqlContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              resource: Schema.optional(
                Schema.Struct({
                  _rid: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals([
                      "Create",
                      "Replace",
                      "Delete",
                      "Recreate",
                      "SystemOperation",
                    ]),
                  ),
                  canUndelete: Schema.optional(Schema.String),
                  canUndeleteReason: Schema.optional(Schema.String),
                  eventTimestamp: Schema.optional(Schema.String),
                  ownerId: Schema.optional(Schema.String),
                  ownerResourceId: Schema.optional(Schema.String),
                  container: Schema.optional(
                    Schema.Struct({
                      id: Schema.String,
                      indexingPolicy: Schema.optional(
                        Schema.Struct({
                          automatic: Schema.optional(Schema.Boolean),
                          indexingMode: Schema.optional(
                            Schema.Literals(["consistent", "lazy", "none"]),
                          ),
                          includedPaths: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                path: Schema.optional(Schema.String),
                                indexes: Schema.optional(
                                  Schema.Array(
                                    Schema.Struct({
                                      dataType: Schema.optional(
                                        Schema.Literals([
                                          "String",
                                          "Number",
                                          "Point",
                                          "Polygon",
                                          "LineString",
                                          "MultiPolygon",
                                        ]),
                                      ),
                                      precision: Schema.optional(Schema.Number),
                                      kind: Schema.optional(
                                        Schema.Literals([
                                          "Hash",
                                          "Range",
                                          "Spatial",
                                        ]),
                                      ),
                                    }),
                                  ),
                                ),
                              }),
                            ),
                          ),
                          excludedPaths: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                path: Schema.optional(Schema.String),
                              }),
                            ),
                          ),
                          compositeIndexes: Schema.optional(
                            Schema.Array(
                              Schema.Array(
                                Schema.Struct({
                                  path: Schema.optional(Schema.String),
                                  order: Schema.optional(
                                    Schema.Literals([
                                      "ascending",
                                      "descending",
                                    ]),
                                  ),
                                }),
                              ),
                            ),
                          ),
                          spatialIndexes: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                path: Schema.optional(Schema.String),
                                types: Schema.optional(
                                  Schema.Array(
                                    Schema.Literals([
                                      "Point",
                                      "LineString",
                                      "Polygon",
                                      "MultiPolygon",
                                    ]),
                                  ),
                                ),
                              }),
                            ),
                          ),
                          vectorIndexes: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                path: Schema.String,
                                type: Schema.Literals([
                                  "flat",
                                  "diskANN",
                                  "quantizedFlat",
                                ]),
                                quantizationByteSize: Schema.optional(
                                  Schema.Number,
                                ),
                                indexingSearchListSize: Schema.optional(
                                  Schema.Number,
                                ),
                                vectorIndexShardKey: Schema.optional(
                                  Schema.Array(Schema.String),
                                ),
                              }),
                            ),
                          ),
                          fullTextIndexes: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                path: Schema.String,
                              }),
                            ),
                          ),
                        }),
                      ),
                      partitionKey: Schema.optional(
                        Schema.Struct({
                          paths: Schema.optional(Schema.Array(Schema.String)),
                          kind: Schema.optional(
                            Schema.Literals(["Hash", "Range", "MultiHash"]),
                          ),
                          version: Schema.optional(Schema.Number),
                          systemKey: Schema.optional(Schema.Boolean),
                        }),
                      ),
                      defaultTtl: Schema.optional(Schema.Number),
                      uniqueKeyPolicy: Schema.optional(
                        Schema.Struct({
                          uniqueKeys: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                paths: Schema.optional(
                                  Schema.Array(Schema.String),
                                ),
                              }),
                            ),
                          ),
                        }),
                      ),
                      conflictResolutionPolicy: Schema.optional(
                        Schema.Struct({
                          mode: Schema.optional(
                            Schema.Literals(["LastWriterWins", "Custom"]),
                          ),
                          conflictResolutionPath: Schema.optional(
                            Schema.String,
                          ),
                          conflictResolutionProcedure: Schema.optional(
                            Schema.String,
                          ),
                        }),
                      ),
                      clientEncryptionPolicy: Schema.optional(
                        Schema.Struct({
                          includedPaths: Schema.Array(
                            Schema.Struct({
                              path: Schema.String,
                              clientEncryptionKeyId: Schema.String,
                              encryptionType: Schema.String,
                              encryptionAlgorithm: Schema.String,
                            }),
                          ),
                          policyFormatVersion: Schema.Number,
                        }),
                      ),
                      analyticalStorageTtl: Schema.optional(Schema.Number),
                      restoreParameters: Schema.optional(
                        Schema.Struct({
                          restoreSource: Schema.optional(Schema.String),
                          restoreTimestampInUtc: Schema.optional(Schema.String),
                          restoreWithTtlDisabled: Schema.optional(
                            Schema.Boolean,
                          ),
                        }),
                      ),
                      createMode: Schema.optional(
                        Schema.Literals(["Default", "Restore"]),
                      ),
                      computedProperties: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            query: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      vectorEmbeddingPolicy: Schema.optional(
                        Schema.Struct({
                          vectorEmbeddings: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                path: Schema.String,
                                dataType: Schema.Literals([
                                  "float32",
                                  "uint8",
                                  "int8",
                                  "float16",
                                ]),
                                distanceFunction: Schema.Literals([
                                  "euclidean",
                                  "cosine",
                                  "dotproduct",
                                ]),
                                dimensions: Schema.Number,
                              }),
                            ),
                          ),
                        }),
                      ),
                      fullTextPolicy: Schema.optional(
                        Schema.Struct({
                          defaultLanguage: Schema.optional(Schema.String),
                          fullTextPaths: Schema.optional(
                            Schema.Array(
                              Schema.Struct({
                                path: Schema.String,
                                language: Schema.optional(Schema.String),
                              }),
                            ),
                          ),
                        }),
                      ),
                      _rid: Schema.optional(Schema.String),
                      _ts: Schema.optional(Schema.Number),
                      _etag: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RestorableSqlContainersListOutput =
  typeof RestorableSqlContainersListOutput.Type;

// The operation
/**
 * Show the event feed of all mutations done on all the Azure Cosmos DB SQL containers under a specific database.  This helps in scenario where container was accidentally deleted.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableSqlContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RestorableSqlContainersListInput,
    outputSchema: RestorableSqlContainersListOutput,
  }),
);
// Input Schema
export const RestorableSqlDatabasesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableSqlDatabases",
    }),
  );
export type RestorableSqlDatabasesListInput =
  typeof RestorableSqlDatabasesListInput.Type;

// Output Schema
export const RestorableSqlDatabasesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              resource: Schema.optional(
                Schema.Struct({
                  _rid: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals([
                      "Create",
                      "Replace",
                      "Delete",
                      "Recreate",
                      "SystemOperation",
                    ]),
                  ),
                  canUndelete: Schema.optional(Schema.String),
                  canUndeleteReason: Schema.optional(Schema.String),
                  eventTimestamp: Schema.optional(Schema.String),
                  ownerId: Schema.optional(Schema.String),
                  ownerResourceId: Schema.optional(Schema.String),
                  database: Schema.optional(
                    Schema.Struct({
                      id: Schema.String,
                      restoreParameters: Schema.optional(
                        Schema.Struct({
                          restoreSource: Schema.optional(Schema.String),
                          restoreTimestampInUtc: Schema.optional(Schema.String),
                          restoreWithTtlDisabled: Schema.optional(
                            Schema.Boolean,
                          ),
                        }),
                      ),
                      createMode: Schema.optional(
                        Schema.Literals(["Default", "Restore"]),
                      ),
                      _rid: Schema.optional(Schema.String),
                      _ts: Schema.optional(Schema.Number),
                      _etag: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RestorableSqlDatabasesListOutput =
  typeof RestorableSqlDatabasesListOutput.Type;

// The operation
/**
 * Show the event feed of all mutations done on all the Azure Cosmos DB SQL databases under the restorable account.  This helps in scenario where database was accidentally deleted to get the deletion time.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableSqlDatabasesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RestorableSqlDatabasesListInput,
    outputSchema: RestorableSqlDatabasesListOutput,
  }),
);
// Input Schema
export const RestorableSqlResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableSqlResources",
    }),
  );
export type RestorableSqlResourcesListInput =
  typeof RestorableSqlResourcesListInput.Type;

// Output Schema
export const RestorableSqlResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          databaseName: Schema.optional(Schema.String),
          collectionNames: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type RestorableSqlResourcesListOutput =
  typeof RestorableSqlResourcesListOutput.Type;

// The operation
/**
 * Return a list of database and container combo that exist on the account at the given timestamp and location. This helps in scenarios to validate what resources exist at given timestamp and location. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableSqlResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RestorableSqlResourcesListInput,
    outputSchema: RestorableSqlResourcesListOutput,
  }),
);
// Input Schema
export const RestorableTableResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableTableResources",
    }),
  );
export type RestorableTableResourcesListInput =
  typeof RestorableTableResourcesListInput.Type;

// Output Schema
export const RestorableTableResourcesListOutput =
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
export type RestorableTableResourcesListOutput =
  typeof RestorableTableResourcesListOutput.Type;

// The operation
/**
 * Return a list of tables that exist on the account at the given timestamp and location. This helps in scenarios to validate what resources exist at given timestamp and location. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableTableResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableTableResourcesListInput,
    outputSchema: RestorableTableResourcesListOutput,
  }));
// Input Schema
export const RestorableTablesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/locations/{location}/restorableDatabaseAccounts/{instanceId}/restorableTables",
    }),
  );
export type RestorableTablesListInput = typeof RestorableTablesListInput.Type;

// Output Schema
export const RestorableTablesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              resource: Schema.optional(
                Schema.Struct({
                  _rid: Schema.optional(Schema.String),
                  operationType: Schema.optional(
                    Schema.Literals([
                      "Create",
                      "Replace",
                      "Delete",
                      "Recreate",
                      "SystemOperation",
                    ]),
                  ),
                  canUndelete: Schema.optional(Schema.String),
                  canUndeleteReason: Schema.optional(Schema.String),
                  eventTimestamp: Schema.optional(Schema.String),
                  ownerId: Schema.optional(Schema.String),
                  ownerResourceId: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type RestorableTablesListOutput = typeof RestorableTablesListOutput.Type;

// The operation
/**
 * Show the event feed of all mutations done on all the Azure Cosmos DB Tables. This helps in scenario where table was accidentally deleted. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RestorableTablesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RestorableTablesListInput,
    outputSchema: RestorableTablesListOutput,
  }),
);
// Input Schema
export const ServiceCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/services/{serviceName}",
  }),
);
export type ServiceCreateInput = typeof ServiceCreateInput.Type;

// Output Schema
export const ServiceCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ServiceCreateOutput = typeof ServiceCreateOutput.Type;

// The operation
/**
 * Creates a service.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ServiceCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServiceCreateInput,
  outputSchema: ServiceCreateOutput,
}));
// Input Schema
export const ServiceDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/services/{serviceName}",
  }),
);
export type ServiceDeleteInput = typeof ServiceDeleteInput.Type;

// Output Schema
export const ServiceDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServiceDeleteOutput = typeof ServiceDeleteOutput.Type;

// The operation
/**
 * Deletes service with the given serviceName.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ServiceDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServiceDeleteInput,
  outputSchema: ServiceDeleteOutput,
}));
// Input Schema
export const ServiceGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/services/{serviceName}",
  }),
);
export type ServiceGetInput = typeof ServiceGetInput.Type;

// Output Schema
export const ServiceGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
});
export type ServiceGetOutput = typeof ServiceGetOutput.Type;

// The operation
/**
 * Gets the status of service.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ServiceGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServiceGetInput,
  outputSchema: ServiceGetOutput,
}));
// Input Schema
export const ServiceListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/services",
  }),
);
export type ServiceListInput = typeof ServiceListInput.Type;

// Output Schema
export const ServiceListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type ServiceListOutput = typeof ServiceListOutput.Type;

// The operation
/**
 * Gets the status of service.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ServiceList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServiceListInput,
  outputSchema: ServiceListOutput,
}));
// Input Schema
export const SqlResourcesCreateUpdateClientEncryptionKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/clientEncryptionKeys/{clientEncryptionKeyName}",
    }),
  );
export type SqlResourcesCreateUpdateClientEncryptionKeyInput =
  typeof SqlResourcesCreateUpdateClientEncryptionKeyInput.Type;

// Output Schema
export const SqlResourcesCreateUpdateClientEncryptionKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SqlResourcesCreateUpdateClientEncryptionKeyOutput =
  typeof SqlResourcesCreateUpdateClientEncryptionKeyOutput.Type;

// The operation
/**
 * Create or update a ClientEncryptionKey. This API is meant to be invoked via tools such as the Azure Powershell (instead of directly).
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesCreateUpdateClientEncryptionKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesCreateUpdateClientEncryptionKeyInput,
    outputSchema: SqlResourcesCreateUpdateClientEncryptionKeyOutput,
  }));
// Input Schema
export const SqlResourcesCreateUpdateSqlContainerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}",
    }),
  );
export type SqlResourcesCreateUpdateSqlContainerInput =
  typeof SqlResourcesCreateUpdateSqlContainerInput.Type;

// Output Schema
export const SqlResourcesCreateUpdateSqlContainerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesCreateUpdateSqlContainerOutput =
  typeof SqlResourcesCreateUpdateSqlContainerOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB SQL container
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesCreateUpdateSqlContainer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesCreateUpdateSqlContainerInput,
    outputSchema: SqlResourcesCreateUpdateSqlContainerOutput,
  }));
// Input Schema
export const SqlResourcesCreateUpdateSqlDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}",
    }),
  );
export type SqlResourcesCreateUpdateSqlDatabaseInput =
  typeof SqlResourcesCreateUpdateSqlDatabaseInput.Type;

// Output Schema
export const SqlResourcesCreateUpdateSqlDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesCreateUpdateSqlDatabaseOutput =
  typeof SqlResourcesCreateUpdateSqlDatabaseOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB SQL database
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesCreateUpdateSqlDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesCreateUpdateSqlDatabaseInput,
    outputSchema: SqlResourcesCreateUpdateSqlDatabaseOutput,
  }));
// Input Schema
export const SqlResourcesCreateUpdateSqlRoleAssignmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments/{roleAssignmentId}",
    }),
  );
export type SqlResourcesCreateUpdateSqlRoleAssignmentInput =
  typeof SqlResourcesCreateUpdateSqlRoleAssignmentInput.Type;

// Output Schema
export const SqlResourcesCreateUpdateSqlRoleAssignmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SqlResourcesCreateUpdateSqlRoleAssignmentOutput =
  typeof SqlResourcesCreateUpdateSqlRoleAssignmentOutput.Type;

// The operation
/**
 * Creates or updates an Azure Cosmos DB SQL Role Assignment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesCreateUpdateSqlRoleAssignment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesCreateUpdateSqlRoleAssignmentInput,
    outputSchema: SqlResourcesCreateUpdateSqlRoleAssignmentOutput,
  }));
// Input Schema
export const SqlResourcesCreateUpdateSqlRoleDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions/{roleDefinitionId}",
    }),
  );
export type SqlResourcesCreateUpdateSqlRoleDefinitionInput =
  typeof SqlResourcesCreateUpdateSqlRoleDefinitionInput.Type;

// Output Schema
export const SqlResourcesCreateUpdateSqlRoleDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SqlResourcesCreateUpdateSqlRoleDefinitionOutput =
  typeof SqlResourcesCreateUpdateSqlRoleDefinitionOutput.Type;

// The operation
/**
 * Creates or updates an Azure Cosmos DB SQL Role Definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesCreateUpdateSqlRoleDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesCreateUpdateSqlRoleDefinitionInput,
    outputSchema: SqlResourcesCreateUpdateSqlRoleDefinitionOutput,
  }));
// Input Schema
export const SqlResourcesCreateUpdateSqlStoredProcedureInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures/{storedProcedureName}",
    }),
  );
export type SqlResourcesCreateUpdateSqlStoredProcedureInput =
  typeof SqlResourcesCreateUpdateSqlStoredProcedureInput.Type;

// Output Schema
export const SqlResourcesCreateUpdateSqlStoredProcedureOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesCreateUpdateSqlStoredProcedureOutput =
  typeof SqlResourcesCreateUpdateSqlStoredProcedureOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB SQL storedProcedure
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesCreateUpdateSqlStoredProcedure =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesCreateUpdateSqlStoredProcedureInput,
    outputSchema: SqlResourcesCreateUpdateSqlStoredProcedureOutput,
  }));
// Input Schema
export const SqlResourcesCreateUpdateSqlTriggerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers/{triggerName}",
    }),
  );
export type SqlResourcesCreateUpdateSqlTriggerInput =
  typeof SqlResourcesCreateUpdateSqlTriggerInput.Type;

// Output Schema
export const SqlResourcesCreateUpdateSqlTriggerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesCreateUpdateSqlTriggerOutput =
  typeof SqlResourcesCreateUpdateSqlTriggerOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB SQL trigger
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesCreateUpdateSqlTrigger =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesCreateUpdateSqlTriggerInput,
    outputSchema: SqlResourcesCreateUpdateSqlTriggerOutput,
  }));
// Input Schema
export const SqlResourcesCreateUpdateSqlUserDefinedFunctionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions/{userDefinedFunctionName}",
    }),
  );
export type SqlResourcesCreateUpdateSqlUserDefinedFunctionInput =
  typeof SqlResourcesCreateUpdateSqlUserDefinedFunctionInput.Type;

// Output Schema
export const SqlResourcesCreateUpdateSqlUserDefinedFunctionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesCreateUpdateSqlUserDefinedFunctionOutput =
  typeof SqlResourcesCreateUpdateSqlUserDefinedFunctionOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB SQL userDefinedFunction
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesCreateUpdateSqlUserDefinedFunction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesCreateUpdateSqlUserDefinedFunctionInput,
    outputSchema: SqlResourcesCreateUpdateSqlUserDefinedFunctionOutput,
  }));
// Input Schema
export const SqlResourcesDeleteSqlContainerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}",
    }),
  );
export type SqlResourcesDeleteSqlContainerInput =
  typeof SqlResourcesDeleteSqlContainerInput.Type;

// Output Schema
export const SqlResourcesDeleteSqlContainerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlResourcesDeleteSqlContainerOutput =
  typeof SqlResourcesDeleteSqlContainerOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB SQL container.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesDeleteSqlContainer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesDeleteSqlContainerInput,
    outputSchema: SqlResourcesDeleteSqlContainerOutput,
  }));
// Input Schema
export const SqlResourcesDeleteSqlDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}",
    }),
  );
export type SqlResourcesDeleteSqlDatabaseInput =
  typeof SqlResourcesDeleteSqlDatabaseInput.Type;

// Output Schema
export const SqlResourcesDeleteSqlDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlResourcesDeleteSqlDatabaseOutput =
  typeof SqlResourcesDeleteSqlDatabaseOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB SQL database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesDeleteSqlDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesDeleteSqlDatabaseInput,
    outputSchema: SqlResourcesDeleteSqlDatabaseOutput,
  }));
// Input Schema
export const SqlResourcesDeleteSqlRoleAssignmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments/{roleAssignmentId}",
    }),
  );
export type SqlResourcesDeleteSqlRoleAssignmentInput =
  typeof SqlResourcesDeleteSqlRoleAssignmentInput.Type;

// Output Schema
export const SqlResourcesDeleteSqlRoleAssignmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlResourcesDeleteSqlRoleAssignmentOutput =
  typeof SqlResourcesDeleteSqlRoleAssignmentOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB SQL Role Assignment.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesDeleteSqlRoleAssignment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesDeleteSqlRoleAssignmentInput,
    outputSchema: SqlResourcesDeleteSqlRoleAssignmentOutput,
  }));
// Input Schema
export const SqlResourcesDeleteSqlRoleDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions/{roleDefinitionId}",
    }),
  );
export type SqlResourcesDeleteSqlRoleDefinitionInput =
  typeof SqlResourcesDeleteSqlRoleDefinitionInput.Type;

// Output Schema
export const SqlResourcesDeleteSqlRoleDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlResourcesDeleteSqlRoleDefinitionOutput =
  typeof SqlResourcesDeleteSqlRoleDefinitionOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB SQL Role Definition.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesDeleteSqlRoleDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesDeleteSqlRoleDefinitionInput,
    outputSchema: SqlResourcesDeleteSqlRoleDefinitionOutput,
  }));
// Input Schema
export const SqlResourcesDeleteSqlStoredProcedureInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures/{storedProcedureName}",
    }),
  );
export type SqlResourcesDeleteSqlStoredProcedureInput =
  typeof SqlResourcesDeleteSqlStoredProcedureInput.Type;

// Output Schema
export const SqlResourcesDeleteSqlStoredProcedureOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlResourcesDeleteSqlStoredProcedureOutput =
  typeof SqlResourcesDeleteSqlStoredProcedureOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB SQL storedProcedure.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesDeleteSqlStoredProcedure =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesDeleteSqlStoredProcedureInput,
    outputSchema: SqlResourcesDeleteSqlStoredProcedureOutput,
  }));
// Input Schema
export const SqlResourcesDeleteSqlTriggerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers/{triggerName}",
    }),
  );
export type SqlResourcesDeleteSqlTriggerInput =
  typeof SqlResourcesDeleteSqlTriggerInput.Type;

// Output Schema
export const SqlResourcesDeleteSqlTriggerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlResourcesDeleteSqlTriggerOutput =
  typeof SqlResourcesDeleteSqlTriggerOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB SQL trigger.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesDeleteSqlTrigger =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesDeleteSqlTriggerInput,
    outputSchema: SqlResourcesDeleteSqlTriggerOutput,
  }));
// Input Schema
export const SqlResourcesDeleteSqlUserDefinedFunctionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions/{userDefinedFunctionName}",
    }),
  );
export type SqlResourcesDeleteSqlUserDefinedFunctionInput =
  typeof SqlResourcesDeleteSqlUserDefinedFunctionInput.Type;

// Output Schema
export const SqlResourcesDeleteSqlUserDefinedFunctionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlResourcesDeleteSqlUserDefinedFunctionOutput =
  typeof SqlResourcesDeleteSqlUserDefinedFunctionOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB SQL userDefinedFunction.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesDeleteSqlUserDefinedFunction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesDeleteSqlUserDefinedFunctionInput,
    outputSchema: SqlResourcesDeleteSqlUserDefinedFunctionOutput,
  }));
// Input Schema
export const SqlResourcesGetClientEncryptionKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/clientEncryptionKeys/{clientEncryptionKeyName}",
    }),
  );
export type SqlResourcesGetClientEncryptionKeyInput =
  typeof SqlResourcesGetClientEncryptionKeyInput.Type;

// Output Schema
export const SqlResourcesGetClientEncryptionKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SqlResourcesGetClientEncryptionKeyOutput =
  typeof SqlResourcesGetClientEncryptionKeyOutput.Type;

// The operation
/**
 * Gets the ClientEncryptionKey under an existing Azure Cosmos DB SQL database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetClientEncryptionKey =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesGetClientEncryptionKeyInput,
    outputSchema: SqlResourcesGetClientEncryptionKeyOutput,
  }));
// Input Schema
export const SqlResourcesGetSqlContainerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}",
    }),
  );
export type SqlResourcesGetSqlContainerInput =
  typeof SqlResourcesGetSqlContainerInput.Type;

// Output Schema
export const SqlResourcesGetSqlContainerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesGetSqlContainerOutput =
  typeof SqlResourcesGetSqlContainerOutput.Type;

// The operation
/**
 * Gets the SQL container under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetSqlContainer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlResourcesGetSqlContainerInput,
    outputSchema: SqlResourcesGetSqlContainerOutput,
  }),
);
// Input Schema
export const SqlResourcesGetSqlContainerThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default",
    }),
  );
export type SqlResourcesGetSqlContainerThroughputInput =
  typeof SqlResourcesGetSqlContainerThroughputInput.Type;

// Output Schema
export const SqlResourcesGetSqlContainerThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesGetSqlContainerThroughputOutput =
  typeof SqlResourcesGetSqlContainerThroughputOutput.Type;

// The operation
/**
 * Gets the RUs per second of the SQL container under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetSqlContainerThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesGetSqlContainerThroughputInput,
    outputSchema: SqlResourcesGetSqlContainerThroughputOutput,
  }));
// Input Schema
export const SqlResourcesGetSqlDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}",
    }),
  );
export type SqlResourcesGetSqlDatabaseInput =
  typeof SqlResourcesGetSqlDatabaseInput.Type;

// Output Schema
export const SqlResourcesGetSqlDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesGetSqlDatabaseOutput =
  typeof SqlResourcesGetSqlDatabaseOutput.Type;

// The operation
/**
 * Gets the SQL database under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetSqlDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlResourcesGetSqlDatabaseInput,
    outputSchema: SqlResourcesGetSqlDatabaseOutput,
  }),
);
// Input Schema
export const SqlResourcesGetSqlDatabaseThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default",
    }),
  );
export type SqlResourcesGetSqlDatabaseThroughputInput =
  typeof SqlResourcesGetSqlDatabaseThroughputInput.Type;

// Output Schema
export const SqlResourcesGetSqlDatabaseThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesGetSqlDatabaseThroughputOutput =
  typeof SqlResourcesGetSqlDatabaseThroughputOutput.Type;

// The operation
/**
 * Gets the RUs per second of the SQL database under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetSqlDatabaseThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesGetSqlDatabaseThroughputInput,
    outputSchema: SqlResourcesGetSqlDatabaseThroughputOutput,
  }));
// Input Schema
export const SqlResourcesGetSqlRoleAssignmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments/{roleAssignmentId}",
    }),
  );
export type SqlResourcesGetSqlRoleAssignmentInput =
  typeof SqlResourcesGetSqlRoleAssignmentInput.Type;

// Output Schema
export const SqlResourcesGetSqlRoleAssignmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SqlResourcesGetSqlRoleAssignmentOutput =
  typeof SqlResourcesGetSqlRoleAssignmentOutput.Type;

// The operation
/**
 * Retrieves the properties of an existing Azure Cosmos DB SQL Role Assignment with the given Id.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetSqlRoleAssignment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesGetSqlRoleAssignmentInput,
    outputSchema: SqlResourcesGetSqlRoleAssignmentOutput,
  }));
// Input Schema
export const SqlResourcesGetSqlRoleDefinitionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions/{roleDefinitionId}",
    }),
  );
export type SqlResourcesGetSqlRoleDefinitionInput =
  typeof SqlResourcesGetSqlRoleDefinitionInput.Type;

// Output Schema
export const SqlResourcesGetSqlRoleDefinitionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type SqlResourcesGetSqlRoleDefinitionOutput =
  typeof SqlResourcesGetSqlRoleDefinitionOutput.Type;

// The operation
/**
 * Retrieves the properties of an existing Azure Cosmos DB SQL Role Definition with the given Id.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetSqlRoleDefinition =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesGetSqlRoleDefinitionInput,
    outputSchema: SqlResourcesGetSqlRoleDefinitionOutput,
  }));
// Input Schema
export const SqlResourcesGetSqlStoredProcedureInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures/{storedProcedureName}",
    }),
  );
export type SqlResourcesGetSqlStoredProcedureInput =
  typeof SqlResourcesGetSqlStoredProcedureInput.Type;

// Output Schema
export const SqlResourcesGetSqlStoredProcedureOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesGetSqlStoredProcedureOutput =
  typeof SqlResourcesGetSqlStoredProcedureOutput.Type;

// The operation
/**
 * Gets the SQL storedProcedure under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetSqlStoredProcedure =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesGetSqlStoredProcedureInput,
    outputSchema: SqlResourcesGetSqlStoredProcedureOutput,
  }));
// Input Schema
export const SqlResourcesGetSqlTriggerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers/{triggerName}",
    }),
  );
export type SqlResourcesGetSqlTriggerInput =
  typeof SqlResourcesGetSqlTriggerInput.Type;

// Output Schema
export const SqlResourcesGetSqlTriggerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesGetSqlTriggerOutput =
  typeof SqlResourcesGetSqlTriggerOutput.Type;

// The operation
/**
 * Gets the SQL trigger under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetSqlTrigger = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlResourcesGetSqlTriggerInput,
    outputSchema: SqlResourcesGetSqlTriggerOutput,
  }),
);
// Input Schema
export const SqlResourcesGetSqlUserDefinedFunctionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions/{userDefinedFunctionName}",
    }),
  );
export type SqlResourcesGetSqlUserDefinedFunctionInput =
  typeof SqlResourcesGetSqlUserDefinedFunctionInput.Type;

// Output Schema
export const SqlResourcesGetSqlUserDefinedFunctionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesGetSqlUserDefinedFunctionOutput =
  typeof SqlResourcesGetSqlUserDefinedFunctionOutput.Type;

// The operation
/**
 * Gets the SQL userDefinedFunction under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesGetSqlUserDefinedFunction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesGetSqlUserDefinedFunctionInput,
    outputSchema: SqlResourcesGetSqlUserDefinedFunctionOutput,
  }));
// Input Schema
export const SqlResourcesListClientEncryptionKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/clientEncryptionKeys",
    }),
  );
export type SqlResourcesListClientEncryptionKeysInput =
  typeof SqlResourcesListClientEncryptionKeysInput.Type;

// Output Schema
export const SqlResourcesListClientEncryptionKeysOutput =
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
export type SqlResourcesListClientEncryptionKeysOutput =
  typeof SqlResourcesListClientEncryptionKeysOutput.Type;

// The operation
/**
 * Lists the ClientEncryptionKeys under an existing Azure Cosmos DB SQL database.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesListClientEncryptionKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesListClientEncryptionKeysInput,
    outputSchema: SqlResourcesListClientEncryptionKeysOutput,
  }));
// Input Schema
export const SqlResourcesListSqlContainersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers",
    }),
  );
export type SqlResourcesListSqlContainersInput =
  typeof SqlResourcesListSqlContainersInput.Type;

// Output Schema
export const SqlResourcesListSqlContainersOutput =
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
  });
export type SqlResourcesListSqlContainersOutput =
  typeof SqlResourcesListSqlContainersOutput.Type;

// The operation
/**
 * Lists the SQL container under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesListSqlContainers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesListSqlContainersInput,
    outputSchema: SqlResourcesListSqlContainersOutput,
  }));
// Input Schema
export const SqlResourcesListSqlDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases",
    }),
  );
export type SqlResourcesListSqlDatabasesInput =
  typeof SqlResourcesListSqlDatabasesInput.Type;

// Output Schema
export const SqlResourcesListSqlDatabasesOutput =
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
  });
export type SqlResourcesListSqlDatabasesOutput =
  typeof SqlResourcesListSqlDatabasesOutput.Type;

// The operation
/**
 * Lists the SQL databases under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesListSqlDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesListSqlDatabasesInput,
    outputSchema: SqlResourcesListSqlDatabasesOutput,
  }));
// Input Schema
export const SqlResourcesListSqlRoleAssignmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleAssignments",
    }),
  );
export type SqlResourcesListSqlRoleAssignmentsInput =
  typeof SqlResourcesListSqlRoleAssignmentsInput.Type;

// Output Schema
export const SqlResourcesListSqlRoleAssignmentsOutput =
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
export type SqlResourcesListSqlRoleAssignmentsOutput =
  typeof SqlResourcesListSqlRoleAssignmentsOutput.Type;

// The operation
/**
 * Retrieves the list of all Azure Cosmos DB SQL Role Assignments.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesListSqlRoleAssignments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesListSqlRoleAssignmentsInput,
    outputSchema: SqlResourcesListSqlRoleAssignmentsOutput,
  }));
// Input Schema
export const SqlResourcesListSqlRoleDefinitionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlRoleDefinitions",
    }),
  );
export type SqlResourcesListSqlRoleDefinitionsInput =
  typeof SqlResourcesListSqlRoleDefinitionsInput.Type;

// Output Schema
export const SqlResourcesListSqlRoleDefinitionsOutput =
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
export type SqlResourcesListSqlRoleDefinitionsOutput =
  typeof SqlResourcesListSqlRoleDefinitionsOutput.Type;

// The operation
/**
 * Retrieves the list of all Azure Cosmos DB SQL Role Definitions.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesListSqlRoleDefinitions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesListSqlRoleDefinitionsInput,
    outputSchema: SqlResourcesListSqlRoleDefinitionsOutput,
  }));
// Input Schema
export const SqlResourcesListSqlStoredProceduresInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/storedProcedures",
    }),
  );
export type SqlResourcesListSqlStoredProceduresInput =
  typeof SqlResourcesListSqlStoredProceduresInput.Type;

// Output Schema
export const SqlResourcesListSqlStoredProceduresOutput =
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
  });
export type SqlResourcesListSqlStoredProceduresOutput =
  typeof SqlResourcesListSqlStoredProceduresOutput.Type;

// The operation
/**
 * Lists the SQL storedProcedure under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesListSqlStoredProcedures =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesListSqlStoredProceduresInput,
    outputSchema: SqlResourcesListSqlStoredProceduresOutput,
  }));
// Input Schema
export const SqlResourcesListSqlTriggersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/triggers",
    }),
  );
export type SqlResourcesListSqlTriggersInput =
  typeof SqlResourcesListSqlTriggersInput.Type;

// Output Schema
export const SqlResourcesListSqlTriggersOutput =
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
  });
export type SqlResourcesListSqlTriggersOutput =
  typeof SqlResourcesListSqlTriggersOutput.Type;

// The operation
/**
 * Lists the SQL trigger under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesListSqlTriggers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlResourcesListSqlTriggersInput,
    outputSchema: SqlResourcesListSqlTriggersOutput,
  }),
);
// Input Schema
export const SqlResourcesListSqlUserDefinedFunctionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/userDefinedFunctions",
    }),
  );
export type SqlResourcesListSqlUserDefinedFunctionsInput =
  typeof SqlResourcesListSqlUserDefinedFunctionsInput.Type;

// Output Schema
export const SqlResourcesListSqlUserDefinedFunctionsOutput =
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
  });
export type SqlResourcesListSqlUserDefinedFunctionsOutput =
  typeof SqlResourcesListSqlUserDefinedFunctionsOutput.Type;

// The operation
/**
 * Lists the SQL userDefinedFunction under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesListSqlUserDefinedFunctions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesListSqlUserDefinedFunctionsInput,
    outputSchema: SqlResourcesListSqlUserDefinedFunctionsOutput,
  }));
// Input Schema
export const SqlResourcesMigrateSqlContainerToAutoscaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/migrateToAutoscale",
    }),
  );
export type SqlResourcesMigrateSqlContainerToAutoscaleInput =
  typeof SqlResourcesMigrateSqlContainerToAutoscaleInput.Type;

// Output Schema
export const SqlResourcesMigrateSqlContainerToAutoscaleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesMigrateSqlContainerToAutoscaleOutput =
  typeof SqlResourcesMigrateSqlContainerToAutoscaleOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB SQL container from manual throughput to autoscale
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesMigrateSqlContainerToAutoscale =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesMigrateSqlContainerToAutoscaleInput,
    outputSchema: SqlResourcesMigrateSqlContainerToAutoscaleOutput,
  }));
// Input Schema
export const SqlResourcesMigrateSqlContainerToManualThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default/migrateToManualThroughput",
    }),
  );
export type SqlResourcesMigrateSqlContainerToManualThroughputInput =
  typeof SqlResourcesMigrateSqlContainerToManualThroughputInput.Type;

// Output Schema
export const SqlResourcesMigrateSqlContainerToManualThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesMigrateSqlContainerToManualThroughputOutput =
  typeof SqlResourcesMigrateSqlContainerToManualThroughputOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB SQL container from autoscale to manual throughput
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesMigrateSqlContainerToManualThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesMigrateSqlContainerToManualThroughputInput,
    outputSchema: SqlResourcesMigrateSqlContainerToManualThroughputOutput,
  }));
// Input Schema
export const SqlResourcesMigrateSqlDatabaseToAutoscaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/migrateToAutoscale",
    }),
  );
export type SqlResourcesMigrateSqlDatabaseToAutoscaleInput =
  typeof SqlResourcesMigrateSqlDatabaseToAutoscaleInput.Type;

// Output Schema
export const SqlResourcesMigrateSqlDatabaseToAutoscaleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesMigrateSqlDatabaseToAutoscaleOutput =
  typeof SqlResourcesMigrateSqlDatabaseToAutoscaleOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB SQL database from manual throughput to autoscale
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesMigrateSqlDatabaseToAutoscale =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesMigrateSqlDatabaseToAutoscaleInput,
    outputSchema: SqlResourcesMigrateSqlDatabaseToAutoscaleOutput,
  }));
// Input Schema
export const SqlResourcesMigrateSqlDatabaseToManualThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default/migrateToManualThroughput",
    }),
  );
export type SqlResourcesMigrateSqlDatabaseToManualThroughputInput =
  typeof SqlResourcesMigrateSqlDatabaseToManualThroughputInput.Type;

// Output Schema
export const SqlResourcesMigrateSqlDatabaseToManualThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesMigrateSqlDatabaseToManualThroughputOutput =
  typeof SqlResourcesMigrateSqlDatabaseToManualThroughputOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB SQL database from autoscale to manual throughput
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesMigrateSqlDatabaseToManualThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesMigrateSqlDatabaseToManualThroughputInput,
    outputSchema: SqlResourcesMigrateSqlDatabaseToManualThroughputOutput,
  }));
// Input Schema
export const SqlResourcesRetrieveContinuousBackupInformationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/retrieveContinuousBackupInformation",
    }),
  );
export type SqlResourcesRetrieveContinuousBackupInformationInput =
  typeof SqlResourcesRetrieveContinuousBackupInformationInput.Type;

// Output Schema
export const SqlResourcesRetrieveContinuousBackupInformationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    continuousBackupInformation: Schema.optional(
      Schema.Struct({
        latestRestorableTimestamp: Schema.optional(Schema.String),
      }),
    ),
  });
export type SqlResourcesRetrieveContinuousBackupInformationOutput =
  typeof SqlResourcesRetrieveContinuousBackupInformationOutput.Type;

// The operation
/**
 * Retrieves continuous backup information for a container resource.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param databaseName - Cosmos DB database name.
 * @param containerName - Cosmos DB container name.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesRetrieveContinuousBackupInformation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesRetrieveContinuousBackupInformationInput,
    outputSchema: SqlResourcesRetrieveContinuousBackupInformationOutput,
  }));
// Input Schema
export const SqlResourcesUpdateSqlContainerThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/containers/{containerName}/throughputSettings/default",
    }),
  );
export type SqlResourcesUpdateSqlContainerThroughputInput =
  typeof SqlResourcesUpdateSqlContainerThroughputInput.Type;

// Output Schema
export const SqlResourcesUpdateSqlContainerThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesUpdateSqlContainerThroughputOutput =
  typeof SqlResourcesUpdateSqlContainerThroughputOutput.Type;

// The operation
/**
 * Update RUs per second of an Azure Cosmos DB SQL container
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesUpdateSqlContainerThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesUpdateSqlContainerThroughputInput,
    outputSchema: SqlResourcesUpdateSqlContainerThroughputOutput,
  }));
// Input Schema
export const SqlResourcesUpdateSqlDatabaseThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/sqlDatabases/{databaseName}/throughputSettings/default",
    }),
  );
export type SqlResourcesUpdateSqlDatabaseThroughputInput =
  typeof SqlResourcesUpdateSqlDatabaseThroughputInput.Type;

// Output Schema
export const SqlResourcesUpdateSqlDatabaseThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type SqlResourcesUpdateSqlDatabaseThroughputOutput =
  typeof SqlResourcesUpdateSqlDatabaseThroughputOutput.Type;

// The operation
/**
 * Update RUs per second of an Azure Cosmos DB SQL database
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const SqlResourcesUpdateSqlDatabaseThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlResourcesUpdateSqlDatabaseThroughputInput,
    outputSchema: SqlResourcesUpdateSqlDatabaseThroughputOutput,
  }));
// Input Schema
export const TableResourcesCreateUpdateTableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}",
    }),
  );
export type TableResourcesCreateUpdateTableInput =
  typeof TableResourcesCreateUpdateTableInput.Type;

// Output Schema
export const TableResourcesCreateUpdateTableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type TableResourcesCreateUpdateTableOutput =
  typeof TableResourcesCreateUpdateTableOutput.Type;

// The operation
/**
 * Create or update an Azure Cosmos DB Table
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const TableResourcesCreateUpdateTable =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TableResourcesCreateUpdateTableInput,
    outputSchema: TableResourcesCreateUpdateTableOutput,
  }));
// Input Schema
export const TableResourcesDeleteTableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}",
    }),
  );
export type TableResourcesDeleteTableInput =
  typeof TableResourcesDeleteTableInput.Type;

// Output Schema
export const TableResourcesDeleteTableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TableResourcesDeleteTableOutput =
  typeof TableResourcesDeleteTableOutput.Type;

// The operation
/**
 * Deletes an existing Azure Cosmos DB Table.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const TableResourcesDeleteTable = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TableResourcesDeleteTableInput,
    outputSchema: TableResourcesDeleteTableOutput,
  }),
);
// Input Schema
export const TableResourcesGetTableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}",
    }),
  );
export type TableResourcesGetTableInput =
  typeof TableResourcesGetTableInput.Type;

// Output Schema
export const TableResourcesGetTableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type TableResourcesGetTableOutput =
  typeof TableResourcesGetTableOutput.Type;

// The operation
/**
 * Gets the Tables under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const TableResourcesGetTable = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TableResourcesGetTableInput,
    outputSchema: TableResourcesGetTableOutput,
  }),
);
// Input Schema
export const TableResourcesGetTableThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default",
    }),
  );
export type TableResourcesGetTableThroughputInput =
  typeof TableResourcesGetTableThroughputInput.Type;

// Output Schema
export const TableResourcesGetTableThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type TableResourcesGetTableThroughputOutput =
  typeof TableResourcesGetTableThroughputOutput.Type;

// The operation
/**
 * Gets the RUs per second of the Table under an existing Azure Cosmos DB database account with the provided name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const TableResourcesGetTableThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TableResourcesGetTableThroughputInput,
    outputSchema: TableResourcesGetTableThroughputOutput,
  }));
// Input Schema
export const TableResourcesListTablesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables",
    }),
  );
export type TableResourcesListTablesInput =
  typeof TableResourcesListTablesInput.Type;

// Output Schema
export const TableResourcesListTablesOutput =
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
  });
export type TableResourcesListTablesOutput =
  typeof TableResourcesListTablesOutput.Type;

// The operation
/**
 * Lists the Tables under an existing Azure Cosmos DB database account.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const TableResourcesListTables = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TableResourcesListTablesInput,
    outputSchema: TableResourcesListTablesOutput,
  }),
);
// Input Schema
export const TableResourcesMigrateTableToAutoscaleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default/migrateToAutoscale",
    }),
  );
export type TableResourcesMigrateTableToAutoscaleInput =
  typeof TableResourcesMigrateTableToAutoscaleInput.Type;

// Output Schema
export const TableResourcesMigrateTableToAutoscaleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type TableResourcesMigrateTableToAutoscaleOutput =
  typeof TableResourcesMigrateTableToAutoscaleOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Table from manual throughput to autoscale
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const TableResourcesMigrateTableToAutoscale =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TableResourcesMigrateTableToAutoscaleInput,
    outputSchema: TableResourcesMigrateTableToAutoscaleOutput,
  }));
// Input Schema
export const TableResourcesMigrateTableToManualThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default/migrateToManualThroughput",
    }),
  );
export type TableResourcesMigrateTableToManualThroughputInput =
  typeof TableResourcesMigrateTableToManualThroughputInput.Type;

// Output Schema
export const TableResourcesMigrateTableToManualThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type TableResourcesMigrateTableToManualThroughputOutput =
  typeof TableResourcesMigrateTableToManualThroughputOutput.Type;

// The operation
/**
 * Migrate an Azure Cosmos DB Table from autoscale to manual throughput
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const TableResourcesMigrateTableToManualThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TableResourcesMigrateTableToManualThroughputInput,
    outputSchema: TableResourcesMigrateTableToManualThroughputOutput,
  }));
// Input Schema
export const TableResourcesRetrieveContinuousBackupInformationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/retrieveContinuousBackupInformation",
    }),
  );
export type TableResourcesRetrieveContinuousBackupInformationInput =
  typeof TableResourcesRetrieveContinuousBackupInformationInput.Type;

// Output Schema
export const TableResourcesRetrieveContinuousBackupInformationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    continuousBackupInformation: Schema.optional(
      Schema.Struct({
        latestRestorableTimestamp: Schema.optional(Schema.String),
      }),
    ),
  });
export type TableResourcesRetrieveContinuousBackupInformationOutput =
  typeof TableResourcesRetrieveContinuousBackupInformationOutput.Type;

// The operation
/**
 * Retrieves continuous backup information for a table.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - Cosmos DB database account name.
 * @param tableName - Cosmos DB table name.
 * @param api-version - The API version to use for this operation.
 */
export const TableResourcesRetrieveContinuousBackupInformation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TableResourcesRetrieveContinuousBackupInformationInput,
    outputSchema: TableResourcesRetrieveContinuousBackupInformationOutput,
  }));
// Input Schema
export const TableResourcesUpdateTableThroughputInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/tables/{tableName}/throughputSettings/default",
    }),
  );
export type TableResourcesUpdateTableThroughputInput =
  typeof TableResourcesUpdateTableThroughputInput.Type;

// Output Schema
export const TableResourcesUpdateTableThroughputOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type TableResourcesUpdateTableThroughputOutput =
  typeof TableResourcesUpdateTableThroughputOutput.Type;

// The operation
/**
 * Update RUs per second of an Azure Cosmos DB Table
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const TableResourcesUpdateTableThroughput =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TableResourcesUpdateTableThroughputInput,
    outputSchema: TableResourcesUpdateTableThroughputOutput,
  }));
