/**
 * Azure Eventhub API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ApplicationGroupCreateOrUpdateApplicationGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    applicationGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/applicationGroups/{applicationGroupName}",
    }),
  );
export type ApplicationGroupCreateOrUpdateApplicationGroupInput =
  typeof ApplicationGroupCreateOrUpdateApplicationGroupInput.Type;

// Output Schema
export const ApplicationGroupCreateOrUpdateApplicationGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type ApplicationGroupCreateOrUpdateApplicationGroupOutput =
  typeof ApplicationGroupCreateOrUpdateApplicationGroupOutput.Type;

// The operation
/**
 * Creates or updates an ApplicationGroup for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param applicationGroupName - The Application Group name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const ApplicationGroupCreateOrUpdateApplicationGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationGroupCreateOrUpdateApplicationGroupInput,
    outputSchema: ApplicationGroupCreateOrUpdateApplicationGroupOutput,
  }));
// Input Schema
export const ApplicationGroupDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    applicationGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/applicationGroups/{applicationGroupName}",
    }),
  );
export type ApplicationGroupDeleteInput =
  typeof ApplicationGroupDeleteInput.Type;

// Output Schema
export const ApplicationGroupDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationGroupDeleteOutput =
  typeof ApplicationGroupDeleteOutput.Type;

// The operation
/**
 * Deletes an ApplicationGroup for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param applicationGroupName - The Application Group name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const ApplicationGroupDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationGroupDeleteInput,
    outputSchema: ApplicationGroupDeleteOutput,
  }),
);
// Input Schema
export const ApplicationGroupGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    applicationGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/applicationGroups/{applicationGroupName}",
    }),
  );
export type ApplicationGroupGetInput = typeof ApplicationGroupGetInput.Type;

// Output Schema
export const ApplicationGroupGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type ApplicationGroupGetOutput = typeof ApplicationGroupGetOutput.Type;

// The operation
/**
 * Gets an ApplicationGroup for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param applicationGroupName - The Application Group name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const ApplicationGroupGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationGroupGetInput,
  outputSchema: ApplicationGroupGetOutput,
}));
// Input Schema
export const ApplicationGroupListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/applicationGroups",
    }),
  );
export type ApplicationGroupListByNamespaceInput =
  typeof ApplicationGroupListByNamespaceInput.Type;

// Output Schema
export const ApplicationGroupListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationGroupListByNamespaceOutput =
  typeof ApplicationGroupListByNamespaceOutput.Type;

// The operation
/**
 * Gets a list of application groups for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const ApplicationGroupListByNamespace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationGroupListByNamespaceInput,
    outputSchema: ApplicationGroupListByNamespaceOutput,
  }));
// Input Schema
export const ClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}",
    }),
  );
export type ClustersCreateOrUpdateInput =
  typeof ClustersCreateOrUpdateInput.Type;

// Output Schema
export const ClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ClustersCreateOrUpdateOutput =
  typeof ClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an instance of an Event Hubs Cluster.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param clusterName - The name of the Event Hubs Cluster.
 * @param api-version - Client API Version.
 */
export const ClustersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersCreateOrUpdateInput,
    outputSchema: ClustersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}",
  }),
);
export type ClustersDeleteInput = typeof ClustersDeleteInput.Type;

// Output Schema
export const ClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDeleteOutput = typeof ClustersDeleteOutput.Type;

// The operation
/**
 * Deletes an existing Event Hubs Cluster. This operation is idempotent.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param clusterName - The name of the Event Hubs Cluster.
 * @param api-version - Client API Version.
 */
export const ClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersDeleteInput,
  outputSchema: ClustersDeleteOutput,
}));
// Input Schema
export const ClustersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}",
  }),
);
export type ClustersGetInput = typeof ClustersGetInput.Type;

// Output Schema
export const ClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ClustersGetOutput = typeof ClustersGetOutput.Type;

// The operation
/**
 * Gets the resource description of the specified Event Hubs Cluster.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param clusterName - The name of the Event Hubs Cluster.
 * @param api-version - Client API Version.
 */
export const ClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersGetInput,
  outputSchema: ClustersGetOutput,
}));
// Input Schema
export const ClustersListAvailableClusterRegionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventHub/availableClusterRegions",
    }),
  );
export type ClustersListAvailableClusterRegionInput =
  typeof ClustersListAvailableClusterRegionInput.Type;

// Output Schema
export const ClustersListAvailableClusterRegionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ClustersListAvailableClusterRegionOutput =
  typeof ClustersListAvailableClusterRegionOutput.Type;

// The operation
/**
 * List the quantity of available pre-provisioned Event Hubs Clusters, indexed by Azure region.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client API Version.
 */
export const ClustersListAvailableClusterRegion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersListAvailableClusterRegionInput,
    outputSchema: ClustersListAvailableClusterRegionOutput,
  }));
// Input Schema
export const ClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters",
    }),
  );
export type ClustersListByResourceGroupInput =
  typeof ClustersListByResourceGroupInput.Type;

// Output Schema
export const ClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListByResourceGroupOutput =
  typeof ClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the available Event Hubs Clusters within an ARM resource group
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param api-version - Client API Version.
 */
export const ClustersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListByResourceGroupInput,
    outputSchema: ClustersListByResourceGroupOutput,
  }),
);
// Input Schema
export const ClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventHub/clusters",
    }),
  );
export type ClustersListBySubscriptionInput =
  typeof ClustersListBySubscriptionInput.Type;

// Output Schema
export const ClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListBySubscriptionOutput =
  typeof ClustersListBySubscriptionOutput.Type;

// The operation
/**
 * Lists the available Event Hubs Clusters within an ARM resource group
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param api-version - Client API Version.
 */
export const ClustersListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListBySubscriptionInput,
    outputSchema: ClustersListBySubscriptionOutput,
  }),
);
// Input Schema
export const ClustersListNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}/namespaces",
    }),
  );
export type ClustersListNamespacesInput =
  typeof ClustersListNamespacesInput.Type;

// Output Schema
export const ClustersListNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ClustersListNamespacesOutput =
  typeof ClustersListNamespacesOutput.Type;

// The operation
/**
 * List all Event Hubs Namespace IDs in an Event Hubs Dedicated Cluster.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param clusterName - The name of the Event Hubs Cluster.
 * @param api-version - Client API Version.
 */
export const ClustersListNamespaces = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListNamespacesInput,
    outputSchema: ClustersListNamespacesOutput,
  }),
);
// Input Schema
export const ClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}",
  }),
);
export type ClustersUpdateInput = typeof ClustersUpdateInput.Type;

// Output Schema
export const ClustersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ClustersUpdateOutput = typeof ClustersUpdateOutput.Type;

// The operation
/**
 * Modifies mutable properties on the Event Hubs Cluster. This operation is idempotent.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param clusterName - The name of the Event Hubs Cluster.
 * @param api-version - Client API Version.
 */
export const ClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersUpdateInput,
  outputSchema: ClustersUpdateOutput,
}));
// Input Schema
export const ConfigurationGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}/quotaConfiguration/default",
  }),
);
export type ConfigurationGetInput = typeof ConfigurationGetInput.Type;

// Output Schema
export const ConfigurationGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    settings: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  },
);
export type ConfigurationGetOutput = typeof ConfigurationGetOutput.Type;

// The operation
/**
 * Get all Event Hubs Cluster settings - a collection of key/value pairs which represent the quotas and settings imposed on the cluster.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param clusterName - The name of the Event Hubs Cluster.
 * @param api-version - Client API Version.
 */
export const ConfigurationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConfigurationGetInput,
  outputSchema: ConfigurationGetOutput,
}));
// Input Schema
export const ConfigurationPatchInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/clusters/{clusterName}/quotaConfiguration/default",
    }),
  );
export type ConfigurationPatchInput = typeof ConfigurationPatchInput.Type;

// Output Schema
export const ConfigurationPatchOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    settings: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ConfigurationPatchOutput = typeof ConfigurationPatchOutput.Type;

// The operation
/**
 * Replace all specified Event Hubs Cluster settings with those contained in the request body. Leaves the settings not specified in the request body unmodified.
 *
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param clusterName - The name of the Event Hubs Cluster.
 * @param api-version - Client API Version.
 */
export const ConfigurationPatch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConfigurationPatchInput,
  outputSchema: ConfigurationPatchOutput,
}));
// Input Schema
export const ConsumerGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    consumerGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/consumergroups/{consumerGroupName}",
    }),
  );
export type ConsumerGroupsCreateOrUpdateInput =
  typeof ConsumerGroupsCreateOrUpdateInput.Type;

// Output Schema
export const ConsumerGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type ConsumerGroupsCreateOrUpdateOutput =
  typeof ConsumerGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an Event Hubs consumer group as a nested resource within a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param consumerGroupName - The consumer group name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const ConsumerGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConsumerGroupsCreateOrUpdateInput,
    outputSchema: ConsumerGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConsumerGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    consumerGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/consumergroups/{consumerGroupName}",
    }),
  );
export type ConsumerGroupsDeleteInput = typeof ConsumerGroupsDeleteInput.Type;

// Output Schema
export const ConsumerGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConsumerGroupsDeleteOutput = typeof ConsumerGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a consumer group from the specified Event Hub and resource group.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param consumerGroupName - The consumer group name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const ConsumerGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConsumerGroupsDeleteInput,
    outputSchema: ConsumerGroupsDeleteOutput,
  }),
);
// Input Schema
export const ConsumerGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    consumerGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/consumergroups/{consumerGroupName}",
  }),
);
export type ConsumerGroupsGetInput = typeof ConsumerGroupsGetInput.Type;

// Output Schema
export const ConsumerGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type ConsumerGroupsGetOutput = typeof ConsumerGroupsGetOutput.Type;

// The operation
/**
 * Gets a description for the specified consumer group.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param consumerGroupName - The consumer group name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const ConsumerGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConsumerGroupsGetInput,
  outputSchema: ConsumerGroupsGetOutput,
}));
// Input Schema
export const ConsumerGroupsListByEventHubInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/consumergroups",
    }),
  );
export type ConsumerGroupsListByEventHubInput =
  typeof ConsumerGroupsListByEventHubInput.Type;

// Output Schema
export const ConsumerGroupsListByEventHubOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConsumerGroupsListByEventHubOutput =
  typeof ConsumerGroupsListByEventHubOutput.Type;

// The operation
/**
 * Gets all the consumer groups in a Namespace. An empty feed is returned if no consumer group exists in the Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param $skip - Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the most recent N usageDetails.
 */
export const ConsumerGroupsListByEventHub =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConsumerGroupsListByEventHubInput,
    outputSchema: ConsumerGroupsListByEventHubOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsBreakPairingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/breakPairing",
    }),
  );
export type DisasterRecoveryConfigsBreakPairingInput =
  typeof DisasterRecoveryConfigsBreakPairingInput.Type;

// Output Schema
export const DisasterRecoveryConfigsBreakPairingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DisasterRecoveryConfigsBreakPairingOutput =
  typeof DisasterRecoveryConfigsBreakPairingOutput.Type;

// The operation
/**
 * This operation disables the Disaster Recovery and stops replicating changes from primary to secondary namespaces
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsBreakPairing =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsBreakPairingInput,
    outputSchema: DisasterRecoveryConfigsBreakPairingOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs/checkNameAvailability",
    }),
  );
export type DisasterRecoveryConfigsCheckNameAvailabilityInput =
  typeof DisasterRecoveryConfigsCheckNameAvailabilityInput.Type;

// Output Schema
export const DisasterRecoveryConfigsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(
      Schema.Literals([
        "None",
        "InvalidName",
        "SubscriptionIsDisabled",
        "NameInUse",
        "NameInLockdown",
        "TooManyNamespaceInCurrentSubscription",
      ]),
    ),
  });
export type DisasterRecoveryConfigsCheckNameAvailabilityOutput =
  typeof DisasterRecoveryConfigsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the give Namespace name availability.
 *
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 */
export const DisasterRecoveryConfigsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsCheckNameAvailabilityInput,
    outputSchema: DisasterRecoveryConfigsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}",
    }),
  );
export type DisasterRecoveryConfigsCreateOrUpdateInput =
  typeof DisasterRecoveryConfigsCreateOrUpdateInput.Type;

// Output Schema
export const DisasterRecoveryConfigsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsCreateOrUpdateOutput =
  typeof DisasterRecoveryConfigsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a new Alias(Disaster Recovery configuration)
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsCreateOrUpdateInput,
    outputSchema: DisasterRecoveryConfigsCreateOrUpdateOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}",
    }),
  );
export type DisasterRecoveryConfigsDeleteInput =
  typeof DisasterRecoveryConfigsDeleteInput.Type;

// Output Schema
export const DisasterRecoveryConfigsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DisasterRecoveryConfigsDeleteOutput =
  typeof DisasterRecoveryConfigsDeleteOutput.Type;

// The operation
/**
 * Deletes an Alias(Disaster Recovery configuration)
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsDeleteInput,
    outputSchema: DisasterRecoveryConfigsDeleteOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsFailOverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/failover",
    }),
  );
export type DisasterRecoveryConfigsFailOverInput =
  typeof DisasterRecoveryConfigsFailOverInput.Type;

// Output Schema
export const DisasterRecoveryConfigsFailOverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DisasterRecoveryConfigsFailOverOutput =
  typeof DisasterRecoveryConfigsFailOverOutput.Type;

// The operation
/**
 * Invokes GEO DR failover and reconfigure the alias to point to the secondary namespace
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsFailOver =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsFailOverInput,
    outputSchema: DisasterRecoveryConfigsFailOverOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}",
    }),
  );
export type DisasterRecoveryConfigsGetInput =
  typeof DisasterRecoveryConfigsGetInput.Type;

// Output Schema
export const DisasterRecoveryConfigsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsGetOutput =
  typeof DisasterRecoveryConfigsGetOutput.Type;

// The operation
/**
 * Retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DisasterRecoveryConfigsGetInput,
    outputSchema: DisasterRecoveryConfigsGetOutput,
  }),
);
// Input Schema
export const DisasterRecoveryConfigsGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type DisasterRecoveryConfigsGetAuthorizationRuleInput =
  typeof DisasterRecoveryConfigsGetAuthorizationRuleInput.Type;

// Output Schema
export const DisasterRecoveryConfigsGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsGetAuthorizationRuleOutput =
  typeof DisasterRecoveryConfigsGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Gets an AuthorizationRule for a Namespace by rule name.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsGetAuthorizationRuleInput,
    outputSchema: DisasterRecoveryConfigsGetAuthorizationRuleOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs",
    }),
  );
export type DisasterRecoveryConfigsListInput =
  typeof DisasterRecoveryConfigsListInput.Type;

// Output Schema
export const DisasterRecoveryConfigsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsListOutput =
  typeof DisasterRecoveryConfigsListOutput.Type;

// The operation
/**
 * Gets all Alias(Disaster Recovery configurations)
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DisasterRecoveryConfigsListInput,
    outputSchema: DisasterRecoveryConfigsListOutput,
  }),
);
// Input Schema
export const DisasterRecoveryConfigsListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/authorizationRules",
    }),
  );
export type DisasterRecoveryConfigsListAuthorizationRulesInput =
  typeof DisasterRecoveryConfigsListAuthorizationRulesInput.Type;

// Output Schema
export const DisasterRecoveryConfigsListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsListAuthorizationRulesOutput =
  typeof DisasterRecoveryConfigsListAuthorizationRulesOutput.Type;

// The operation
/**
 * Gets a list of authorization rules for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsListAuthorizationRulesInput,
    outputSchema: DisasterRecoveryConfigsListAuthorizationRulesOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/authorizationRules/{authorizationRuleName}/listKeys",
    }),
  );
export type DisasterRecoveryConfigsListKeysInput =
  typeof DisasterRecoveryConfigsListKeysInput.Type;

// Output Schema
export const DisasterRecoveryConfigsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsListKeysOutput =
  typeof DisasterRecoveryConfigsListKeysOutput.Type;

// The operation
/**
 * Gets the primary and secondary connection strings for the Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsListKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsListKeysInput,
    outputSchema: DisasterRecoveryConfigsListKeysOutput,
  }));
// Input Schema
export const EventHubsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}",
    }),
  );
export type EventHubsCreateOrUpdateInput =
  typeof EventHubsCreateOrUpdateInput.Type;

// Output Schema
export const EventHubsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type EventHubsCreateOrUpdateOutput =
  typeof EventHubsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a new Event Hub as a nested resource within a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const EventHubsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventHubsCreateOrUpdateInput,
    outputSchema: EventHubsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EventHubsCreateOrUpdateAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type EventHubsCreateOrUpdateAuthorizationRuleInput =
  typeof EventHubsCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const EventHubsCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type EventHubsCreateOrUpdateAuthorizationRuleOutput =
  typeof EventHubsCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates or updates an AuthorizationRule for the specified Event Hub. Creation/update of the AuthorizationRule will take a few seconds to take effect.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const EventHubsCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventHubsCreateOrUpdateAuthorizationRuleInput,
    outputSchema: EventHubsCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const EventHubsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  eventHubName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}",
  }),
);
export type EventHubsDeleteInput = typeof EventHubsDeleteInput.Type;

// Output Schema
export const EventHubsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EventHubsDeleteOutput = typeof EventHubsDeleteOutput.Type;

// The operation
/**
 * Deletes an Event Hub from the specified Namespace and resource group.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const EventHubsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EventHubsDeleteInput,
  outputSchema: EventHubsDeleteOutput,
}));
// Input Schema
export const EventHubsDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type EventHubsDeleteAuthorizationRuleInput =
  typeof EventHubsDeleteAuthorizationRuleInput.Type;

// Output Schema
export const EventHubsDeleteAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EventHubsDeleteAuthorizationRuleOutput =
  typeof EventHubsDeleteAuthorizationRuleOutput.Type;

// The operation
/**
 * Deletes an Event Hub AuthorizationRule.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const EventHubsDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventHubsDeleteAuthorizationRuleInput,
    outputSchema: EventHubsDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const EventHubsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  eventHubName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}",
  }),
);
export type EventHubsGetInput = typeof EventHubsGetInput.Type;

// Output Schema
export const EventHubsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
});
export type EventHubsGetOutput = typeof EventHubsGetOutput.Type;

// The operation
/**
 * Gets an Event Hubs description for the specified Event Hub.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const EventHubsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EventHubsGetInput,
  outputSchema: EventHubsGetOutput,
}));
// Input Schema
export const EventHubsGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type EventHubsGetAuthorizationRuleInput =
  typeof EventHubsGetAuthorizationRuleInput.Type;

// Output Schema
export const EventHubsGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type EventHubsGetAuthorizationRuleOutput =
  typeof EventHubsGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Gets an AuthorizationRule for an Event Hub by rule name.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const EventHubsGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventHubsGetAuthorizationRuleInput,
    outputSchema: EventHubsGetAuthorizationRuleOutput,
  }));
// Input Schema
export const EventHubsListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules",
    }),
  );
export type EventHubsListAuthorizationRulesInput =
  typeof EventHubsListAuthorizationRulesInput.Type;

// Output Schema
export const EventHubsListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventHubsListAuthorizationRulesOutput =
  typeof EventHubsListAuthorizationRulesOutput.Type;

// The operation
/**
 * Gets the authorization rules for an Event Hub.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const EventHubsListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventHubsListAuthorizationRulesInput,
    outputSchema: EventHubsListAuthorizationRulesOutput,
  }));
// Input Schema
export const EventHubsListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs",
    }),
  );
export type EventHubsListByNamespaceInput =
  typeof EventHubsListByNamespaceInput.Type;

// Output Schema
export const EventHubsListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EventHubsListByNamespaceOutput =
  typeof EventHubsListByNamespaceOutput.Type;

// The operation
/**
 * Gets all the Event Hubs in a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param $skip - Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the most recent N usageDetails.
 */
export const EventHubsListByNamespace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventHubsListByNamespaceInput,
    outputSchema: EventHubsListByNamespaceOutput,
  }),
);
// Input Schema
export const EventHubsListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}/listKeys",
  }),
);
export type EventHubsListKeysInput = typeof EventHubsListKeysInput.Type;

// Output Schema
export const EventHubsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type EventHubsListKeysOutput = typeof EventHubsListKeysOutput.Type;

// The operation
/**
 * Gets the ACS and SAS connection strings for the Event Hub.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const EventHubsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EventHubsListKeysInput,
  outputSchema: EventHubsListKeysOutput,
}));
// Input Schema
export const EventHubsRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    eventHubName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type EventHubsRegenerateKeysInput =
  typeof EventHubsRegenerateKeysInput.Type;

// Output Schema
export const EventHubsRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type EventHubsRegenerateKeysOutput =
  typeof EventHubsRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates the ACS and SAS connection strings for the Event Hub.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param eventHubName - The Event Hub name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const EventHubsRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventHubsRegenerateKeysInput,
    outputSchema: EventHubsRegenerateKeysOutput,
  }),
);
// Input Schema
export const NamespacesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventHub/checkNameAvailability",
    }),
  );
export type NamespacesCheckNameAvailabilityInput =
  typeof NamespacesCheckNameAvailabilityInput.Type;

// Output Schema
export const NamespacesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(
      Schema.Literals([
        "None",
        "InvalidName",
        "SubscriptionIsDisabled",
        "NameInUse",
        "NameInLockdown",
        "TooManyNamespaceInCurrentSubscription",
      ]),
    ),
  });
export type NamespacesCheckNameAvailabilityOutput =
  typeof NamespacesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the give Namespace name availability.
 *
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCheckNameAvailabilityInput,
    outputSchema: NamespacesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const NamespacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}",
    }),
  );
export type NamespacesCreateOrUpdateInput =
  typeof NamespacesCreateOrUpdateInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type NamespacesCreateOrUpdateOutput =
  typeof NamespacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesCreateOrUpdateInput,
    outputSchema: NamespacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const NamespacesCreateOrUpdateAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesCreateOrUpdateAuthorizationRuleInput =
  typeof NamespacesCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type NamespacesCreateOrUpdateAuthorizationRuleOutput =
  typeof NamespacesCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates or updates an AuthorizationRule for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCreateOrUpdateAuthorizationRuleInput,
    outputSchema: NamespacesCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesCreateOrUpdateNetworkRuleSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/networkRuleSets/default",
    }),
  );
export type NamespacesCreateOrUpdateNetworkRuleSetInput =
  typeof NamespacesCreateOrUpdateNetworkRuleSetInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateNetworkRuleSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type NamespacesCreateOrUpdateNetworkRuleSetOutput =
  typeof NamespacesCreateOrUpdateNetworkRuleSetOutput.Type;

// The operation
/**
 * Create or update NetworkRuleSet for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesCreateOrUpdateNetworkRuleSet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCreateOrUpdateNetworkRuleSetInput,
    outputSchema: NamespacesCreateOrUpdateNetworkRuleSetOutput,
  }));
// Input Schema
export const NamespacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}",
  }),
);
export type NamespacesDeleteInput = typeof NamespacesDeleteInput.Type;

// Output Schema
export const NamespacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespacesDeleteOutput = typeof NamespacesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing namespace. This operation also removes all associated resources under the namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesDeleteInput,
  outputSchema: NamespacesDeleteOutput,
}));
// Input Schema
export const NamespacesDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesDeleteAuthorizationRuleInput =
  typeof NamespacesDeleteAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesDeleteAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespacesDeleteAuthorizationRuleOutput =
  typeof NamespacesDeleteAuthorizationRuleOutput.Type;

// The operation
/**
 * Deletes an AuthorizationRule for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesDeleteAuthorizationRuleInput,
    outputSchema: NamespacesDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}",
  }),
);
export type NamespacesGetInput = typeof NamespacesGetInput.Type;

// Output Schema
export const NamespacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type NamespacesGetOutput = typeof NamespacesGetOutput.Type;

// The operation
/**
 * Gets the description of the specified namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesGetInput,
  outputSchema: NamespacesGetOutput,
}));
// Input Schema
export const NamespacesGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesGetAuthorizationRuleInput =
  typeof NamespacesGetAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type NamespacesGetAuthorizationRuleOutput =
  typeof NamespacesGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Gets an AuthorizationRule for a Namespace by rule name.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesGetAuthorizationRuleInput,
    outputSchema: NamespacesGetAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesGetNetworkRuleSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/networkRuleSets/default",
    }),
  );
export type NamespacesGetNetworkRuleSetInput =
  typeof NamespacesGetNetworkRuleSetInput.Type;

// Output Schema
export const NamespacesGetNetworkRuleSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type NamespacesGetNetworkRuleSetOutput =
  typeof NamespacesGetNetworkRuleSetOutput.Type;

// The operation
/**
 * Gets NetworkRuleSet for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesGetNetworkRuleSet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesGetNetworkRuleSetInput,
    outputSchema: NamespacesGetNetworkRuleSetOutput,
  }),
);
// Input Schema
export const NamespacesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventHub/namespaces",
  }),
);
export type NamespacesListInput = typeof NamespacesListInput.Type;

// Output Schema
export const NamespacesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type NamespacesListOutput = typeof NamespacesListOutput.Type;

// The operation
/**
 * Lists all the available Namespaces within a subscription, irrespective of the resource groups.
 *
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesListInput,
  outputSchema: NamespacesListOutput,
}));
// Input Schema
export const NamespacesListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/authorizationRules",
    }),
  );
export type NamespacesListAuthorizationRulesInput =
  typeof NamespacesListAuthorizationRulesInput.Type;

// Output Schema
export const NamespacesListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListAuthorizationRulesOutput =
  typeof NamespacesListAuthorizationRulesOutput.Type;

// The operation
/**
 * Gets a list of authorization rules for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListAuthorizationRulesInput,
    outputSchema: NamespacesListAuthorizationRulesOutput,
  }));
// Input Schema
export const NamespacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces",
    }),
  );
export type NamespacesListByResourceGroupInput =
  typeof NamespacesListByResourceGroupInput.Type;

// Output Schema
export const NamespacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListByResourceGroupOutput =
  typeof NamespacesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the available Namespaces within a resource group.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListByResourceGroupInput,
    outputSchema: NamespacesListByResourceGroupOutput,
  }));
// Input Schema
export const NamespacesListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}/listKeys",
    }),
  );
export type NamespacesListKeysInput = typeof NamespacesListKeysInput.Type;

// Output Schema
export const NamespacesListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NamespacesListKeysOutput = typeof NamespacesListKeysOutput.Type;

// The operation
/**
 * Gets the primary and secondary connection strings for the Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesListKeysInput,
  outputSchema: NamespacesListKeysOutput,
}));
// Input Schema
export const NamespacesListNetworkRuleSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/networkRuleSets",
    }),
  );
export type NamespacesListNetworkRuleSetInput =
  typeof NamespacesListNetworkRuleSetInput.Type;

// Output Schema
export const NamespacesListNetworkRuleSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListNetworkRuleSetOutput =
  typeof NamespacesListNetworkRuleSetOutput.Type;

// The operation
/**
 * Gets NetworkRuleSet for a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesListNetworkRuleSet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListNetworkRuleSetInput,
    outputSchema: NamespacesListNetworkRuleSetOutput,
  }));
// Input Schema
export const NamespacesRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type NamespacesRegenerateKeysInput =
  typeof NamespacesRegenerateKeysInput.Type;

// Output Schema
export const NamespacesRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NamespacesRegenerateKeysOutput =
  typeof NamespacesRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates the primary or secondary connection strings for the specified Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesRegenerateKeysInput,
    outputSchema: NamespacesRegenerateKeysOutput,
  }),
);
// Input Schema
export const NamespacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}",
  }),
);
export type NamespacesUpdateInput = typeof NamespacesUpdateInput.Type;

// Output Schema
export const NamespacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  },
);
export type NamespacesUpdateOutput = typeof NamespacesUpdateOutput.Type;

// The operation
/**
 * Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesUpdateInput,
  outputSchema: NamespacesUpdateOutput,
}));
// Input Schema
export const NetworkSecurityPerimeterConfigurationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/networkSecurityPerimeterConfigurations",
    }),
  );
export type NetworkSecurityPerimeterConfigurationListInput =
  typeof NetworkSecurityPerimeterConfigurationListInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type NetworkSecurityPerimeterConfigurationListOutput =
  typeof NetworkSecurityPerimeterConfigurationListOutput.Type;

// The operation
/**
 * Gets list of current NetworkSecurityPerimeterConfiguration for Namespace
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NetworkSecurityPerimeterConfigurationList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationListInput,
    outputSchema: NetworkSecurityPerimeterConfigurationListOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    resourceAssociationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/networkSecurityPerimeterConfigurations/{resourceAssociationName}/reconcile",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsCreateOrUpdateInput =
  typeof NetworkSecurityPerimeterConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkSecurityPerimeterConfigurationsCreateOrUpdateOutput =
  typeof NetworkSecurityPerimeterConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Refreshes any information about the association.
 *
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param resourceAssociationName - The ResourceAssociation Name
 */
export const NetworkSecurityPerimeterConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsCreateOrUpdateInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    resourceAssociationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/networkSecurityPerimeterConfigurations/{resourceAssociationName}",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameInput =
  typeof NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOutput =
  typeof NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOutput.Type;

// The operation
/**
 * Return a NetworkSecurityPerimeterConfigurations resourceAssociationName
 *
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param resourceAssociationName - The ResourceAssociation Name
 */
export const NetworkSecurityPerimeterConfigurationsGetResourceAssociationName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameInput,
    outputSchema:
      NetworkSecurityPerimeterConfigurationsGetResourceAssociationNameOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.EventHub/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        isDataAction: Schema.optional(Schema.Boolean),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(Schema.Unknown),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Event Hub REST API operations.
 *
 * @param api-version - Client API Version.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates PrivateEndpointConnections of service namespace.
 *
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param privateEndpointConnectionName - The PrivateEndpointConnection name
 */
export const PrivateEndpointConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes an existing namespace. This operation also removes all associated resources under the namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param privateEndpointConnectionName - The PrivateEndpointConnection name
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
    namespaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
    location: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets a description for the specified Private Endpoint Connection name.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param privateEndpointConnectionName - The PrivateEndpointConnection name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
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
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/privateEndpointConnections",
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
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * Gets the available PrivateEndpointConnections within a namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
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
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              groupId: Schema.optional(Schema.String),
              requiredMembers: Schema.optional(Schema.Array(Schema.String)),
              requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets lists of resources that supports Privatelinks.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const SchemaRegistryCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    schemaGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/schemagroups/{schemaGroupName}",
    }),
  );
export type SchemaRegistryCreateOrUpdateInput =
  typeof SchemaRegistryCreateOrUpdateInput.Type;

// Output Schema
export const SchemaRegistryCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type SchemaRegistryCreateOrUpdateOutput =
  typeof SchemaRegistryCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or Updates an EventHub schema group.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param schemaGroupName - The Schema Group name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const SchemaRegistryCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchemaRegistryCreateOrUpdateInput,
    outputSchema: SchemaRegistryCreateOrUpdateOutput,
  }));
// Input Schema
export const SchemaRegistryDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    schemaGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/schemagroups/{schemaGroupName}",
    }),
  );
export type SchemaRegistryDeleteInput = typeof SchemaRegistryDeleteInput.Type;

// Output Schema
export const SchemaRegistryDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchemaRegistryDeleteOutput = typeof SchemaRegistryDeleteOutput.Type;

// The operation
/**
 * Deletes an EventHub schema group.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param schemaGroupName - The Schema Group name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const SchemaRegistryDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaRegistryDeleteInput,
    outputSchema: SchemaRegistryDeleteOutput,
  }),
);
// Input Schema
export const SchemaRegistryGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    schemaGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/schemagroups/{schemaGroupName}",
  }),
);
export type SchemaRegistryGetInput = typeof SchemaRegistryGetInput.Type;

// Output Schema
export const SchemaRegistryGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type SchemaRegistryGetOutput = typeof SchemaRegistryGetOutput.Type;

// The operation
/**
 * Gets the details of an EventHub schema group.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param schemaGroupName - The Schema Group name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const SchemaRegistryGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemaRegistryGetInput,
  outputSchema: SchemaRegistryGetOutput,
}));
// Input Schema
export const SchemaRegistryListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/schemagroups",
    }),
  );
export type SchemaRegistryListByNamespaceInput =
  typeof SchemaRegistryListByNamespaceInput.Type;

// Output Schema
export const SchemaRegistryListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SchemaRegistryListByNamespaceOutput =
  typeof SchemaRegistryListByNamespaceOutput.Type;

// The operation
/**
 * Gets all the Schema Groups in a Namespace.
 *
 * @param resourceGroupName - Name of the resource group within the azure subscription.
 * @param namespaceName - The Namespace name
 * @param api-version - Client API Version.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param $skip - Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the most recent N usageDetails.
 */
export const SchemaRegistryListByNamespace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchemaRegistryListByNamespaceInput,
    outputSchema: SchemaRegistryListByNamespaceOutput,
  }));
