/**
 * Azure Operationalinsights API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AvailableServiceTiersListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/availableServiceTiers",
    }),
  );
export type AvailableServiceTiersListByWorkspaceInput =
  typeof AvailableServiceTiersListByWorkspaceInput.Type;

// Output Schema
export const AvailableServiceTiersListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      serviceTier: Schema.optional(
        Schema.Literals([
          "Free",
          "Standard",
          "Premium",
          "PerNode",
          "PerGB2018",
          "Standalone",
          "CapacityReservation",
        ]),
      ),
      enabled: Schema.optional(Schema.Boolean),
      minimumRetention: Schema.optional(Schema.Number),
      maximumRetention: Schema.optional(Schema.Number),
      defaultRetention: Schema.optional(Schema.Number),
      capacityReservationLevel: Schema.optional(Schema.Number),
      lastSkuUpdate: Schema.optional(Schema.String),
    }),
  );
export type AvailableServiceTiersListByWorkspaceOutput =
  typeof AvailableServiceTiersListByWorkspaceOutput.Type;

// The operation
/**
 * Gets the available service tiers for the workspace.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const AvailableServiceTiersListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AvailableServiceTiersListByWorkspaceInput,
    outputSchema: AvailableServiceTiersListByWorkspaceOutput,
  }));
// Input Schema
export const ClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/clusters/{clusterName}",
    }),
  );
export type ClustersCreateOrUpdateInput =
  typeof ClustersCreateOrUpdateInput.Type;

// Output Schema
export const ClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ClustersCreateOrUpdateOutput =
  typeof ClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Log Analytics cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param clusterName - The name of the Log Analytics cluster.
 */
export const ClustersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersCreateOrUpdateInput,
    outputSchema: ClustersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ClustersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/clusters/{clusterName}",
  }),
);
export type ClustersDeleteInput = typeof ClustersDeleteInput.Type;

// Output Schema
export const ClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDeleteOutput = typeof ClustersDeleteOutput.Type;

// The operation
/**
 * Deletes a cluster instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - Name of the Log Analytics Cluster.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
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
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/clusters/{clusterName}",
  }),
);
export type ClustersGetInput = typeof ClustersGetInput.Type;

// Output Schema
export const ClustersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ClustersGetOutput = typeof ClustersGetOutput.Type;

// The operation
/**
 * Gets a Log Analytics cluster instance.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param clusterName - Name of the Log Analytics Cluster.
 */
export const ClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersGetInput,
  outputSchema: ClustersGetOutput,
}));
// Input Schema
export const ClustersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.OperationalInsights/clusters",
  }),
);
export type ClustersListInput = typeof ClustersListInput.Type;

// Output Schema
export const ClustersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
  ),
});
export type ClustersListOutput = typeof ClustersListOutput.Type;

// The operation
/**
 * Gets the Log Analytics clusters in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ClustersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersListInput,
  outputSchema: ClustersListOutput,
}));
// Input Schema
export const ClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/clusters",
    }),
  );
export type ClustersListByResourceGroupInput =
  typeof ClustersListByResourceGroupInput.Type;

// Output Schema
export const ClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type ClustersListByResourceGroupOutput =
  typeof ClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Gets Log Analytics clusters in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ClustersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListByResourceGroupInput,
    outputSchema: ClustersListByResourceGroupOutput,
  }),
);
// Input Schema
export const ClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/clusters/{clusterName}",
  }),
);
export type ClustersUpdateInput = typeof ClustersUpdateInput.Type;

// Output Schema
export const ClustersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ClustersUpdateOutput = typeof ClustersUpdateOutput.Type;

// The operation
/**
 * Updates a Log Analytics cluster.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - Name of the Log Analytics Cluster.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersUpdateInput,
  outputSchema: ClustersUpdateOutput,
}));
// Input Schema
export const DataExportsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    dataExportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/dataExports/{dataExportName}",
    }),
  );
export type DataExportsCreateOrUpdateInput =
  typeof DataExportsCreateOrUpdateInput.Type;

// Output Schema
export const DataExportsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataExportsCreateOrUpdateOutput =
  typeof DataExportsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a data export.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param dataExportName - The data export rule name.
 * @param api-version - The API version to use for this operation.
 */
export const DataExportsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataExportsCreateOrUpdateInput,
    outputSchema: DataExportsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DataExportsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    dataExportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/dataExports/{dataExportName}",
  }),
);
export type DataExportsDeleteInput = typeof DataExportsDeleteInput.Type;

// Output Schema
export const DataExportsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataExportsDeleteOutput = typeof DataExportsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified data export in a given workspace..
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param dataExportName - The data export rule name.
 * @param api-version - The API version to use for this operation.
 */
export const DataExportsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataExportsDeleteInput,
  outputSchema: DataExportsDeleteOutput,
}));
// Input Schema
export const DataExportsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  dataExportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/dataExports/{dataExportName}",
  }),
);
export type DataExportsGetInput = typeof DataExportsGetInput.Type;

// Output Schema
export const DataExportsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DataExportsGetOutput = typeof DataExportsGetOutput.Type;

// The operation
/**
 * Gets a data export instance.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param dataExportName - The data export rule name.
 * @param api-version - The API version to use for this operation.
 */
export const DataExportsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataExportsGetInput,
  outputSchema: DataExportsGetOutput,
}));
// Input Schema
export const DataExportsListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/dataExports",
    }),
  );
export type DataExportsListByWorkspaceInput =
  typeof DataExportsListByWorkspaceInput.Type;

// Output Schema
export const DataExportsListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type DataExportsListByWorkspaceOutput =
  typeof DataExportsListByWorkspaceOutput.Type;

// The operation
/**
 * Lists the data export instances within a workspace.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const DataExportsListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataExportsListByWorkspaceInput,
    outputSchema: DataExportsListByWorkspaceOutput,
  }),
);
// Input Schema
export const DataSourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    dataSourceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/dataSources/{dataSourceName}",
    }),
  );
export type DataSourcesCreateOrUpdateInput =
  typeof DataSourcesCreateOrUpdateInput.Type;

// Output Schema
export const DataSourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataSourcesCreateOrUpdateOutput =
  typeof DataSourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a data source.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param dataSourceName - The name of the datasource resource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DataSourcesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataSourcesCreateOrUpdateInput,
    outputSchema: DataSourcesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DataSourcesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    dataSourceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/dataSources/{dataSourceName}",
  }),
);
export type DataSourcesDeleteInput = typeof DataSourcesDeleteInput.Type;

// Output Schema
export const DataSourcesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataSourcesDeleteOutput = typeof DataSourcesDeleteOutput.Type;

// The operation
/**
 * Deletes a data source instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param dataSourceName - Name of the datasource.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DataSourcesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSourcesDeleteInput,
  outputSchema: DataSourcesDeleteOutput,
}));
// Input Schema
export const DataSourcesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  dataSourceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/dataSources/{dataSourceName}",
  }),
);
export type DataSourcesGetInput = typeof DataSourcesGetInput.Type;

// Output Schema
export const DataSourcesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DataSourcesGetOutput = typeof DataSourcesGetOutput.Type;

// The operation
/**
 * Gets a datasource instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param dataSourceName - Name of the datasource
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DataSourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataSourcesGetInput,
  outputSchema: DataSourcesGetOutput,
}));
// Input Schema
export const DataSourcesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.String,
    $skiptoken: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/dataSources",
    }),
  );
export type DataSourcesListByWorkspaceInput =
  typeof DataSourcesListByWorkspaceInput.Type;

// Output Schema
export const DataSourcesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DataSourcesListByWorkspaceOutput =
  typeof DataSourcesListByWorkspaceOutput.Type;

// The operation
/**
 * Gets the first page of data source instances in a workspace with the link to the next page.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param $filter - The filter to apply on the operation.
 * @param $skiptoken - Starting point of the collection of data source instances.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DataSourcesListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataSourcesListByWorkspaceInput,
    outputSchema: DataSourcesListByWorkspaceOutput,
  }),
);
// Input Schema
export const DeletedWorkspacesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.OperationalInsights/deletedWorkspaces",
    }),
  );
export type DeletedWorkspacesListInput = typeof DeletedWorkspacesListInput.Type;

// Output Schema
export const DeletedWorkspacesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type DeletedWorkspacesListOutput =
  typeof DeletedWorkspacesListOutput.Type;

// The operation
/**
 * Gets recently deleted workspaces in a subscription, available for recovery.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeletedWorkspacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeletedWorkspacesListInput,
    outputSchema: DeletedWorkspacesListOutput,
  }),
);
// Input Schema
export const DeletedWorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/deletedWorkspaces",
    }),
  );
export type DeletedWorkspacesListByResourceGroupInput =
  typeof DeletedWorkspacesListByResourceGroupInput.Type;

// Output Schema
export const DeletedWorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type DeletedWorkspacesListByResourceGroupOutput =
  typeof DeletedWorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets recently deleted workspaces in a resource group, available for recovery.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeletedWorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletedWorkspacesListByResourceGroupInput,
    outputSchema: DeletedWorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const GatewaysDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/gateways/{gatewayId}",
  }),
);
export type GatewaysDeleteInput = typeof GatewaysDeleteInput.Type;

// Output Schema
export const GatewaysDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GatewaysDeleteOutput = typeof GatewaysDeleteOutput.Type;

// The operation
/**
 * Delete a Log Analytics gateway.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const GatewaysDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GatewaysDeleteInput,
  outputSchema: GatewaysDeleteOutput,
}));
// Input Schema
export const IntelligencePacksDisableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    intelligencePackName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/intelligencePacks/{intelligencePackName}/Disable",
    }),
  );
export type IntelligencePacksDisableInput =
  typeof IntelligencePacksDisableInput.Type;

// Output Schema
export const IntelligencePacksDisableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntelligencePacksDisableOutput =
  typeof IntelligencePacksDisableOutput.Type;

// The operation
/**
 * Disables an intelligence pack for a given workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param intelligencePackName - The name of the intelligence pack to be disabled.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IntelligencePacksDisable = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntelligencePacksDisableInput,
    outputSchema: IntelligencePacksDisableOutput,
  }),
);
// Input Schema
export const IntelligencePacksEnableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    intelligencePackName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/intelligencePacks/{intelligencePackName}/Enable",
    }),
  );
export type IntelligencePacksEnableInput =
  typeof IntelligencePacksEnableInput.Type;

// Output Schema
export const IntelligencePacksEnableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntelligencePacksEnableOutput =
  typeof IntelligencePacksEnableOutput.Type;

// The operation
/**
 * Enables an intelligence pack for a given workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param intelligencePackName - The name of the intelligence pack to be enabled.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IntelligencePacksEnable = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntelligencePacksEnableInput,
    outputSchema: IntelligencePacksEnableOutput,
  }),
);
// Input Schema
export const IntelligencePacksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/intelligencePacks",
    }),
  );
export type IntelligencePacksListInput = typeof IntelligencePacksListInput.Type;

// Output Schema
export const IntelligencePacksListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      name: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
      displayName: Schema.optional(Schema.String),
    }),
  );
export type IntelligencePacksListOutput =
  typeof IntelligencePacksListOutput.Type;

// The operation
/**
 * Lists all the intelligence packs possible and whether they are enabled or disabled for a given workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const IntelligencePacksList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntelligencePacksListInput,
    outputSchema: IntelligencePacksListOutput,
  }),
);
// Input Schema
export const LinkedServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    linkedServiceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/linkedServices/{linkedServiceName}",
    }),
  );
export type LinkedServicesCreateOrUpdateInput =
  typeof LinkedServicesCreateOrUpdateInput.Type;

// Output Schema
export const LinkedServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LinkedServicesCreateOrUpdateOutput =
  typeof LinkedServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a linked service.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param linkedServiceName - Name of the linkedServices resource
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const LinkedServicesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LinkedServicesCreateOrUpdateInput,
    outputSchema: LinkedServicesCreateOrUpdateOutput,
  }));
// Input Schema
export const LinkedServicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    linkedServiceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/linkedServices/{linkedServiceName}",
    }),
  );
export type LinkedServicesDeleteInput = typeof LinkedServicesDeleteInput.Type;

// Output Schema
export const LinkedServicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LinkedServicesDeleteOutput = typeof LinkedServicesDeleteOutput.Type;

// The operation
/**
 * Deletes a linked service instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param linkedServiceName - Name of the linked service.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LinkedServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LinkedServicesDeleteInput,
    outputSchema: LinkedServicesDeleteOutput,
  }),
);
// Input Schema
export const LinkedServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    linkedServiceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/linkedServices/{linkedServiceName}",
  }),
);
export type LinkedServicesGetInput = typeof LinkedServicesGetInput.Type;

// Output Schema
export const LinkedServicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LinkedServicesGetOutput = typeof LinkedServicesGetOutput.Type;

// The operation
/**
 * Gets a linked service instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param linkedServiceName - Name of the linked service.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LinkedServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LinkedServicesGetInput,
  outputSchema: LinkedServicesGetOutput,
}));
// Input Schema
export const LinkedServicesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/linkedServices",
    }),
  );
export type LinkedServicesListByWorkspaceInput =
  typeof LinkedServicesListByWorkspaceInput.Type;

// Output Schema
export const LinkedServicesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type LinkedServicesListByWorkspaceOutput =
  typeof LinkedServicesListByWorkspaceOutput.Type;

// The operation
/**
 * Gets the linked services instances in a workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LinkedServicesListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LinkedServicesListByWorkspaceInput,
    outputSchema: LinkedServicesListByWorkspaceOutput,
  }));
// Input Schema
export const LinkedStorageAccountsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/linkedStorageAccounts/{dataSourceType}",
    }),
  );
export type LinkedStorageAccountsCreateOrUpdateInput =
  typeof LinkedStorageAccountsCreateOrUpdateInput.Type;

// Output Schema
export const LinkedStorageAccountsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LinkedStorageAccountsCreateOrUpdateOutput =
  typeof LinkedStorageAccountsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a link relation between current workspace and a group of storage accounts of a specific data source type.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const LinkedStorageAccountsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LinkedStorageAccountsCreateOrUpdateInput,
    outputSchema: LinkedStorageAccountsCreateOrUpdateOutput,
  }));
// Input Schema
export const LinkedStorageAccountsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/linkedStorageAccounts/{dataSourceType}",
    }),
  );
export type LinkedStorageAccountsDeleteInput =
  typeof LinkedStorageAccountsDeleteInput.Type;

// Output Schema
export const LinkedStorageAccountsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LinkedStorageAccountsDeleteOutput =
  typeof LinkedStorageAccountsDeleteOutput.Type;

// The operation
/**
 * Deletes all linked storage accounts of a specific data source type associated with the specified workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LinkedStorageAccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LinkedStorageAccountsDeleteInput,
    outputSchema: LinkedStorageAccountsDeleteOutput,
  }),
);
// Input Schema
export const LinkedStorageAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/linkedStorageAccounts/{dataSourceType}",
    }),
  );
export type LinkedStorageAccountsGetInput =
  typeof LinkedStorageAccountsGetInput.Type;

// Output Schema
export const LinkedStorageAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LinkedStorageAccountsGetOutput =
  typeof LinkedStorageAccountsGetOutput.Type;

// The operation
/**
 * Gets all linked storage account of a specific data source type associated with the specified workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const LinkedStorageAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LinkedStorageAccountsGetInput,
    outputSchema: LinkedStorageAccountsGetOutput,
  }),
);
// Input Schema
export const LinkedStorageAccountsListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/linkedStorageAccounts",
    }),
  );
export type LinkedStorageAccountsListByWorkspaceInput =
  typeof LinkedStorageAccountsListByWorkspaceInput.Type;

// Output Schema
export const LinkedStorageAccountsListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type LinkedStorageAccountsListByWorkspaceOutput =
  typeof LinkedStorageAccountsListByWorkspaceOutput.Type;

// The operation
/**
 * Gets all linked storage accounts associated with the specified workspace, storage accounts will be sorted by their data source type.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param workspaceName - The name of the workspace.
 */
export const LinkedStorageAccountsListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LinkedStorageAccountsListByWorkspaceInput,
    outputSchema: LinkedStorageAccountsListByWorkspaceOutput,
  }));
// Input Schema
export const ManagementGroupsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/managementGroups",
    }),
  );
export type ManagementGroupsListInput = typeof ManagementGroupsListInput.Type;

// Output Schema
export const ManagementGroupsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              serverCount: Schema.optional(Schema.Number),
              isGateway: Schema.optional(Schema.Boolean),
              name: Schema.optional(Schema.String),
              id: Schema.optional(Schema.String),
              created: Schema.optional(Schema.String),
              dataReceived: Schema.optional(Schema.String),
              version: Schema.optional(Schema.String),
              sku: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type ManagementGroupsListOutput = typeof ManagementGroupsListOutput.Type;

// The operation
/**
 * Gets a list of management groups connected to a workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ManagementGroupsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagementGroupsListInput,
    outputSchema: ManagementGroupsListOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.OperationalInsights/operations",
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
 * Lists all of the available OperationalInsights Rest API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const QueriesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/{id}",
  }),
);
export type QueriesDeleteInput = typeof QueriesDeleteInput.Type;

// Output Schema
export const QueriesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type QueriesDeleteOutput = typeof QueriesDeleteOutput.Type;

// The operation
/**
 * Deletes a specific Query defined within an Log Analytics QueryPack.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const QueriesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueriesDeleteInput,
  outputSchema: QueriesDeleteOutput,
}));
// Input Schema
export const QueriesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/{id}",
  }),
);
export type QueriesGetInput = typeof QueriesGetInput.Type;

// Output Schema
export const QueriesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QueriesGetOutput = typeof QueriesGetOutput.Type;

// The operation
/**
 * Gets a specific Log Analytics Query defined within a Log Analytics QueryPack.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const QueriesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueriesGetInput,
  outputSchema: QueriesGetOutput,
}));
// Input Schema
export const QueriesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries",
  }),
);
export type QueriesListInput = typeof QueriesListInput.Type;

// Output Schema
export const QueriesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type QueriesListOutput = typeof QueriesListOutput.Type;

// The operation
/**
 * Gets a list of Queries defined within a Log Analytics QueryPack.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const QueriesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueriesListInput,
  outputSchema: QueriesListOutput,
}));
// Input Schema
export const QueriesPutInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/{id}",
  }),
);
export type QueriesPutInput = typeof QueriesPutInput.Type;

// Output Schema
export const QueriesPutOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QueriesPutOutput = typeof QueriesPutOutput.Type;

// The operation
/**
 * Adds or Updates a specific Query within a Log Analytics QueryPack.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const QueriesPut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueriesPutInput,
  outputSchema: QueriesPutOutput,
}));
// Input Schema
export const QueriesSearchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/search",
  }),
);
export type QueriesSearchInput = typeof QueriesSearchInput.Type;

// Output Schema
export const QueriesSearchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type QueriesSearchOutput = typeof QueriesSearchOutput.Type;

// The operation
/**
 * Search a list of Queries defined within a Log Analytics QueryPack according to given search properties.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const QueriesSearch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueriesSearchInput,
  outputSchema: QueriesSearchOutput,
}));
// Input Schema
export const QueriesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}/queries/{id}",
  }),
);
export type QueriesUpdateInput = typeof QueriesUpdateInput.Type;

// Output Schema
export const QueriesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type QueriesUpdateOutput = typeof QueriesUpdateOutput.Type;

// The operation
/**
 * Adds or Updates a specific Query within a Log Analytics QueryPack.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const QueriesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueriesUpdateInput,
  outputSchema: QueriesUpdateOutput,
}));
// Input Schema
export const QueryPacksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}",
    }),
  );
export type QueryPacksCreateOrUpdateInput =
  typeof QueryPacksCreateOrUpdateInput.Type;

// Output Schema
export const QueryPacksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type QueryPacksCreateOrUpdateOutput =
  typeof QueryPacksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates (or updates) a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QueryPacksCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QueryPacksCreateOrUpdateInput,
    outputSchema: QueryPacksCreateOrUpdateOutput,
  }),
);
// Input Schema
export const QueryPacksCreateOrUpdateWithoutNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks",
    }),
  );
export type QueryPacksCreateOrUpdateWithoutNameInput =
  typeof QueryPacksCreateOrUpdateWithoutNameInput.Type;

// Output Schema
export const QueryPacksCreateOrUpdateWithoutNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type QueryPacksCreateOrUpdateWithoutNameOutput =
  typeof QueryPacksCreateOrUpdateWithoutNameOutput.Type;

// The operation
/**
 * Creates a Log Analytics QueryPack. Note: You cannot specify a different value for InstrumentationKey nor AppId in the Put operation.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QueryPacksCreateOrUpdateWithoutName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QueryPacksCreateOrUpdateWithoutNameInput,
    outputSchema: QueryPacksCreateOrUpdateWithoutNameOutput,
  }));
// Input Schema
export const QueryPacksDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}",
  }),
);
export type QueryPacksDeleteInput = typeof QueryPacksDeleteInput.Type;

// Output Schema
export const QueryPacksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type QueryPacksDeleteOutput = typeof QueryPacksDeleteOutput.Type;

// The operation
/**
 * Deletes a Log Analytics QueryPack.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QueryPacksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueryPacksDeleteInput,
  outputSchema: QueryPacksDeleteOutput,
}));
// Input Schema
export const QueryPacksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}",
  }),
);
export type QueryPacksGetInput = typeof QueryPacksGetInput.Type;

// Output Schema
export const QueryPacksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type QueryPacksGetOutput = typeof QueryPacksGetOutput.Type;

// The operation
/**
 * Returns a Log Analytics QueryPack.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QueryPacksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueryPacksGetInput,
  outputSchema: QueryPacksGetOutput,
}));
// Input Schema
export const QueryPacksListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.OperationalInsights/queryPacks",
  }),
);
export type QueryPacksListInput = typeof QueryPacksListInput.Type;

// Output Schema
export const QueryPacksListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type QueryPacksListOutput = typeof QueryPacksListOutput.Type;

// The operation
/**
 * Gets a list of all Log Analytics QueryPacks within a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QueryPacksList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueryPacksListInput,
  outputSchema: QueryPacksListOutput,
}));
// Input Schema
export const QueryPacksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks",
    }),
  );
export type QueryPacksListByResourceGroupInput =
  typeof QueryPacksListByResourceGroupInput.Type;

// Output Schema
export const QueryPacksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type QueryPacksListByResourceGroupOutput =
  typeof QueryPacksListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of Log Analytics QueryPacks within a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QueryPacksListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QueryPacksListByResourceGroupInput,
    outputSchema: QueryPacksListByResourceGroupOutput,
  }));
// Input Schema
export const QueryPacksUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/queryPacks/{queryPackName}",
    }),
  );
export type QueryPacksUpdateTagsInput = typeof QueryPacksUpdateTagsInput.Type;

// Output Schema
export const QueryPacksUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type QueryPacksUpdateTagsOutput = typeof QueryPacksUpdateTagsOutput.Type;

// The operation
/**
 * Updates an existing QueryPack's tags. To update other fields use the CreateOrUpdate method.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QueryPacksUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QueryPacksUpdateTagsInput,
    outputSchema: QueryPacksUpdateTagsOutput,
  }),
);
// Input Schema
export const SavedSearchesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    savedSearchId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/savedSearches/{savedSearchId}",
    }),
  );
export type SavedSearchesCreateOrUpdateInput =
  typeof SavedSearchesCreateOrUpdateInput.Type;

// Output Schema
export const SavedSearchesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SavedSearchesCreateOrUpdateOutput =
  typeof SavedSearchesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a saved search for a given workspace.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param savedSearchId - The id of the saved search.
 * @param api-version - The API version to use for this operation.
 */
export const SavedSearchesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SavedSearchesCreateOrUpdateInput,
    outputSchema: SavedSearchesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SavedSearchesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    savedSearchId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/savedSearches/{savedSearchId}",
    }),
  );
export type SavedSearchesDeleteInput = typeof SavedSearchesDeleteInput.Type;

// Output Schema
export const SavedSearchesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SavedSearchesDeleteOutput = typeof SavedSearchesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified saved search in a given workspace.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param savedSearchId - The id of the saved search.
 * @param api-version - The API version to use for this operation.
 */
export const SavedSearchesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SavedSearchesDeleteInput,
  outputSchema: SavedSearchesDeleteOutput,
}));
// Input Schema
export const SavedSearchesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  savedSearchId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/savedSearches/{savedSearchId}",
  }),
);
export type SavedSearchesGetInput = typeof SavedSearchesGetInput.Type;

// Output Schema
export const SavedSearchesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SavedSearchesGetOutput = typeof SavedSearchesGetOutput.Type;

// The operation
/**
 * Gets the specified saved search for a given workspace.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param savedSearchId - The id of the saved search.
 * @param api-version - The API version to use for this operation.
 */
export const SavedSearchesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SavedSearchesGetInput,
  outputSchema: SavedSearchesGetOutput,
}));
// Input Schema
export const SavedSearchesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/savedSearches",
    }),
  );
export type SavedSearchesListByWorkspaceInput =
  typeof SavedSearchesListByWorkspaceInput.Type;

// Output Schema
export const SavedSearchesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type SavedSearchesListByWorkspaceOutput =
  typeof SavedSearchesListByWorkspaceOutput.Type;

// The operation
/**
 * Gets the saved searches for a given Log Analytics Workspace
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SavedSearchesListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SavedSearchesListByWorkspaceInput,
    outputSchema: SavedSearchesListByWorkspaceOutput,
  }));
// Input Schema
export const SchemaGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/schema",
  }),
);
export type SchemaGetInput = typeof SchemaGetInput.Type;

// Output Schema
export const SchemaGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  metadata: Schema.optional(
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
      resultType: Schema.optional(Schema.String),
      total: Schema.optional(Schema.Number),
      top: Schema.optional(Schema.Number),
      id: Schema.optional(Schema.String),
      coreSummaries: Schema.optional(
        Schema.Array(
          Schema.Struct({
            status: Schema.optional(Schema.String),
            numberOfDocuments: Schema.Number,
          }),
        ),
      ),
      status: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      lastUpdated: Schema.optional(Schema.String),
      eTag: Schema.optional(Schema.String),
      sort: Schema.optional(
        Schema.Array(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            order: Schema.optional(Schema.Literals(["asc", "desc"])),
          }),
        ),
      ),
      requestTime: Schema.optional(Schema.Number),
      aggregatedValueField: Schema.optional(Schema.String),
      aggregatedGroupingFields: Schema.optional(Schema.String),
      sum: Schema.optional(Schema.Number),
      max: Schema.optional(Schema.Number),
      schema: Schema.optional(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          version: Schema.optional(Schema.Number),
        }),
      ),
    }),
  ),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        displayName: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        indexed: Schema.Boolean,
        stored: Schema.Boolean,
        facet: Schema.Boolean,
        ownerType: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
});
export type SchemaGetOutput = typeof SchemaGetOutput.Type;

// The operation
/**
 * Gets the schema for a given workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SchemaGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemaGetInput,
  outputSchema: SchemaGetOutput,
}));
// Input Schema
export const SharedKeysGetSharedKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/sharedKeys",
    }),
  );
export type SharedKeysGetSharedKeysInput =
  typeof SharedKeysGetSharedKeysInput.Type;

// Output Schema
export const SharedKeysGetSharedKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primarySharedKey: Schema.optional(Schema.String),
    secondarySharedKey: Schema.optional(Schema.String),
  });
export type SharedKeysGetSharedKeysOutput =
  typeof SharedKeysGetSharedKeysOutput.Type;

// The operation
/**
 * Gets the shared keys for a workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SharedKeysGetSharedKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SharedKeysGetSharedKeysInput,
    outputSchema: SharedKeysGetSharedKeysOutput,
  }),
);
// Input Schema
export const SharedKeysRegenerateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/regenerateSharedKey",
    }),
  );
export type SharedKeysRegenerateInput = typeof SharedKeysRegenerateInput.Type;

// Output Schema
export const SharedKeysRegenerateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primarySharedKey: Schema.optional(Schema.String),
    secondarySharedKey: Schema.optional(Schema.String),
  });
export type SharedKeysRegenerateOutput = typeof SharedKeysRegenerateOutput.Type;

// The operation
/**
 * Regenerates the shared keys for a Log Analytics Workspace. These keys are used to connect Microsoft Operational Insights agents to the workspace.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const SharedKeysRegenerate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SharedKeysRegenerateInput,
    outputSchema: SharedKeysRegenerateOutput,
  }),
);
// Input Schema
export const StorageInsightConfigsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    storageInsightName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/storageInsightConfigs/{storageInsightName}",
    }),
  );
export type StorageInsightConfigsCreateOrUpdateInput =
  typeof StorageInsightConfigsCreateOrUpdateInput.Type;

// Output Schema
export const StorageInsightConfigsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type StorageInsightConfigsCreateOrUpdateOutput =
  typeof StorageInsightConfigsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a storage insight.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param storageInsightName - Name of the storageInsightsConfigs resource
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageInsightConfigsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageInsightConfigsCreateOrUpdateInput,
    outputSchema: StorageInsightConfigsCreateOrUpdateOutput,
  }));
// Input Schema
export const StorageInsightConfigsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    storageInsightName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/storageInsightConfigs/{storageInsightName}",
    }),
  );
export type StorageInsightConfigsDeleteInput =
  typeof StorageInsightConfigsDeleteInput.Type;

// Output Schema
export const StorageInsightConfigsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageInsightConfigsDeleteOutput =
  typeof StorageInsightConfigsDeleteOutput.Type;

// The operation
/**
 * Deletes a storageInsightsConfigs resource
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param storageInsightName - Name of the storageInsightsConfigs resource
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageInsightConfigsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageInsightConfigsDeleteInput,
    outputSchema: StorageInsightConfigsDeleteOutput,
  }),
);
// Input Schema
export const StorageInsightConfigsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    storageInsightName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/storageInsightConfigs/{storageInsightName}",
    }),
  );
export type StorageInsightConfigsGetInput =
  typeof StorageInsightConfigsGetInput.Type;

// Output Schema
export const StorageInsightConfigsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type StorageInsightConfigsGetOutput =
  typeof StorageInsightConfigsGetOutput.Type;

// The operation
/**
 * Gets a storage insight instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param storageInsightName - Name of the storageInsightsConfigs resource
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageInsightConfigsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageInsightConfigsGetInput,
    outputSchema: StorageInsightConfigsGetOutput,
  }),
);
// Input Schema
export const StorageInsightConfigsListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/storageInsightConfigs",
    }),
  );
export type StorageInsightConfigsListByWorkspaceInput =
  typeof StorageInsightConfigsListByWorkspaceInput.Type;

// Output Schema
export const StorageInsightConfigsListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    "@odata.nextLink": Schema.optional(Schema.String),
  });
export type StorageInsightConfigsListByWorkspaceOutput =
  typeof StorageInsightConfigsListByWorkspaceOutput.Type;

// The operation
/**
 * Lists the storage insight instances within a workspace
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageInsightConfigsListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageInsightConfigsListByWorkspaceInput,
    outputSchema: StorageInsightConfigsListByWorkspaceOutput,
  }));
// Input Schema
export const SummaryLogsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}",
    }),
  );
export type SummaryLogsCreateOrUpdateInput =
  typeof SummaryLogsCreateOrUpdateInput.Type;

// Output Schema
export const SummaryLogsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SummaryLogsCreateOrUpdateOutput =
  typeof SummaryLogsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates Log Analytics workspace Summary rules.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const SummaryLogsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SummaryLogsCreateOrUpdateInput,
    outputSchema: SummaryLogsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SummaryLogsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}",
  }),
);
export type SummaryLogsDeleteInput = typeof SummaryLogsDeleteInput.Type;

// Output Schema
export const SummaryLogsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SummaryLogsDeleteOutput = typeof SummaryLogsDeleteOutput.Type;

// The operation
/**
 * Deletes Log Analytics workspace Summary rules.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const SummaryLogsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SummaryLogsDeleteInput,
  outputSchema: SummaryLogsDeleteOutput,
}));
// Input Schema
export const SummaryLogsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}",
  }),
);
export type SummaryLogsGetInput = typeof SummaryLogsGetInput.Type;

// Output Schema
export const SummaryLogsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SummaryLogsGetOutput = typeof SummaryLogsGetOutput.Type;

// The operation
/**
 * Gets Log Analytics workspace Summary rules.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const SummaryLogsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SummaryLogsGetInput,
  outputSchema: SummaryLogsGetOutput,
}));
// Input Schema
export const SummaryLogsListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs",
    }),
  );
export type SummaryLogsListByWorkspaceInput =
  typeof SummaryLogsListByWorkspaceInput.Type;

// Output Schema
export const SummaryLogsListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SummaryLogsListByWorkspaceOutput =
  typeof SummaryLogsListByWorkspaceOutput.Type;

// The operation
/**
 * Gets all summary rules for the specified Log Analytics workspace.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const SummaryLogsListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SummaryLogsListByWorkspaceInput,
    outputSchema: SummaryLogsListByWorkspaceOutput,
  }),
);
// Input Schema
export const SummaryLogsRetryBinInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}/retrybin",
    }),
  );
export type SummaryLogsRetryBinInput = typeof SummaryLogsRetryBinInput.Type;

// Output Schema
export const SummaryLogsRetryBinOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SummaryLogsRetryBinOutput = typeof SummaryLogsRetryBinOutput.Type;

// The operation
/**
 * Retries a failed Summary rule bin.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const SummaryLogsRetryBin = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SummaryLogsRetryBinInput,
  outputSchema: SummaryLogsRetryBinOutput,
}));
// Input Schema
export const SummaryLogsStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}/start",
  }),
);
export type SummaryLogsStartInput = typeof SummaryLogsStartInput.Type;

// Output Schema
export const SummaryLogsStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SummaryLogsStartOutput = typeof SummaryLogsStartOutput.Type;

// The operation
/**
 * Starts an inactive Summary rule.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const SummaryLogsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SummaryLogsStartInput,
  outputSchema: SummaryLogsStartOutput,
}));
// Input Schema
export const SummaryLogsStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}/stop",
  }),
);
export type SummaryLogsStopInput = typeof SummaryLogsStopInput.Type;

// Output Schema
export const SummaryLogsStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SummaryLogsStopOutput = typeof SummaryLogsStopOutput.Type;

// The operation
/**
 * Stops an active Summary rule.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const SummaryLogsStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SummaryLogsStopInput,
  outputSchema: SummaryLogsStopOutput,
}));
// Input Schema
export const TablesCancelSearchInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/tables/{tableName}/cancelSearch",
    }),
  );
export type TablesCancelSearchInput = typeof TablesCancelSearchInput.Type;

// Output Schema
export const TablesCancelSearchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TablesCancelSearchOutput = typeof TablesCancelSearchOutput.Type;

// The operation
/**
 * Cancel a log analytics workspace search results table query run.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param tableName - The name of the table.
 */
export const TablesCancelSearch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TablesCancelSearchInput,
  outputSchema: TablesCancelSearchOutput,
}));
// Input Schema
export const TablesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/tables/{tableName}",
    }),
  );
export type TablesCreateOrUpdateInput = typeof TablesCreateOrUpdateInput.Type;

// Output Schema
export const TablesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TablesCreateOrUpdateOutput = typeof TablesCreateOrUpdateOutput.Type;

// The operation
/**
 * Update or Create a Log Analytics workspace table.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param tableName - The name of the table.
 */
export const TablesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TablesCreateOrUpdateInput,
    outputSchema: TablesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TablesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  tableName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/tables/{tableName}",
  }),
);
export type TablesDeleteInput = typeof TablesDeleteInput.Type;

// Output Schema
export const TablesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TablesDeleteOutput = typeof TablesDeleteOutput.Type;

// The operation
/**
 * Delete a Log Analytics workspace table.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param tableName - The name of the table.
 */
export const TablesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TablesDeleteInput,
  outputSchema: TablesDeleteOutput,
}));
// Input Schema
export const TablesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  tableName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/tables/{tableName}",
  }),
);
export type TablesGetInput = typeof TablesGetInput.Type;

// Output Schema
export const TablesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TablesGetOutput = typeof TablesGetOutput.Type;

// The operation
/**
 * Gets a Log Analytics workspace table.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param tableName - The name of the table.
 */
export const TablesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TablesGetInput,
  outputSchema: TablesGetOutput,
}));
// Input Schema
export const TablesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/tables",
    }),
  );
export type TablesListByWorkspaceInput = typeof TablesListByWorkspaceInput.Type;

// Output Schema
export const TablesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type TablesListByWorkspaceOutput =
  typeof TablesListByWorkspaceOutput.Type;

// The operation
/**
 * Gets all the tables for the specified Log Analytics workspace.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const TablesListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TablesListByWorkspaceInput,
    outputSchema: TablesListByWorkspaceOutput,
  }),
);
// Input Schema
export const TablesMigrateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  tableName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/tables/{tableName}/migrate",
  }),
);
export type TablesMigrateInput = typeof TablesMigrateInput.Type;

// Output Schema
export const TablesMigrateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TablesMigrateOutput = typeof TablesMigrateOutput.Type;

// The operation
/**
 * Migrate a Log Analytics table from support of the Data Collector API and Custom Fields features to support of Data Collection Rule-based Custom Logs.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param tableName - The name of the table.
 */
export const TablesMigrate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TablesMigrateInput,
  outputSchema: TablesMigrateOutput,
}));
// Input Schema
export const TablesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  tableName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/tables/{tableName}",
  }),
);
export type TablesUpdateInput = typeof TablesUpdateInput.Type;

// Output Schema
export const TablesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TablesUpdateOutput = typeof TablesUpdateOutput.Type;

// The operation
/**
 * Update a Log Analytics workspace table.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param tableName - The name of the table.
 */
export const TablesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TablesUpdateInput,
  outputSchema: TablesUpdateOutput,
}));
// Input Schema
export const UsagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/usages",
  }),
);
export type UsagesListInput = typeof UsagesListInput.Type;

// Output Schema
export const UsagesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        name: Schema.optional(
          Schema.Struct({
            value: Schema.optional(Schema.String),
            localizedValue: Schema.optional(Schema.String),
          }),
        ),
        unit: Schema.optional(Schema.String),
        currentValue: Schema.optional(Schema.Number),
        limit: Schema.optional(Schema.Number),
        nextResetTime: Schema.optional(Schema.String),
        quotaPeriod: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type UsagesListOutput = typeof UsagesListOutput.Type;

// The operation
/**
 * Gets a list of usage metrics for a workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const UsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesListInput,
  outputSchema: UsagesListOutput,
}));
// Input Schema
export const WorkspacePurgeGetPurgeStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/operations/{purgeId}",
    }),
  );
export type WorkspacePurgeGetPurgeStatusInput =
  typeof WorkspacePurgeGetPurgeStatusInput.Type;

// Output Schema
export const WorkspacePurgeGetPurgeStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.Literals(["pending", "completed"]),
  });
export type WorkspacePurgeGetPurgeStatusOutput =
  typeof WorkspacePurgeGetPurgeStatusOutput.Type;

// The operation
/**
 * Gets status of an ongoing purge operation.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspacePurgeGetPurgeStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacePurgeGetPurgeStatusInput,
    outputSchema: WorkspacePurgeGetPurgeStatusOutput,
  }));
// Input Schema
export const WorkspacePurgePurgeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/purge",
    }),
  );
export type WorkspacePurgePurgeInput = typeof WorkspacePurgePurgeInput.Type;

// Output Schema
export const WorkspacePurgePurgeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacePurgePurgeOutput = typeof WorkspacePurgePurgeOutput.Type;

// The operation
/**
 * Purges data in an Log Analytics workspace by a set of user-defined filters.
 * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
 * Log Analytics only supports purge operations required for compliance with GDPR. The Log Analytics product team reserves the right to reject requests for purge operations that are not for the purpose of GDPR compliance. In the event of a dispute, please create a support ticket
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspacePurgePurge = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacePurgePurgeInput,
  outputSchema: WorkspacePurgePurgeOutput,
}));
// Input Schema
export const WorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}",
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
 * Create or update a workspace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
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
  workspaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  force: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}",
  }),
);
export type WorkspacesDeleteInput = typeof WorkspacesDeleteInput.Type;

// Output Schema
export const WorkspacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesDeleteOutput = typeof WorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes a workspace resource. To recover the workspace, create it again with the same name, in the same subscription, resource group and location. The name is kept for 14 days and cannot be used for another workspace. To remove the workspace completely and release the name, use the force flag.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param force - Deletes the workspace without the recovery option. A workspace that was deleted with this flag cannot be recovered.
 */
export const WorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDeleteInput,
  outputSchema: WorkspacesDeleteOutput,
}));
// Input Schema
export const WorkspacesFailbackInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/failback",
    }),
  );
export type WorkspacesFailbackInput = typeof WorkspacesFailbackInput.Type;

// Output Schema
export const WorkspacesFailbackOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesFailbackOutput = typeof WorkspacesFailbackOutput.Type;

// The operation
/**
 * Deactivates failover for the specified workspace.
 * The failback operation is asynchronous and can take up to 30 minutes to complete. The status of the operation can be checked using the operationId returned in the response.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const WorkspacesFailback = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesFailbackInput,
  outputSchema: WorkspacesFailbackOutput,
}));
// Input Schema
export const WorkspacesFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/locations/{location}/workspaces/{workspaceName}/failover",
    }),
  );
export type WorkspacesFailoverInput = typeof WorkspacesFailoverInput.Type;

// Output Schema
export const WorkspacesFailoverOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesFailoverOutput = typeof WorkspacesFailoverOutput.Type;

// The operation
/**
 * Activates failover for the specified workspace.
 * The specified replication location must match the location of the enabled replication for this workspace. The failover operation is asynchronous and can take up to 30 minutes to complete. The status of the operation can be checked using the operationId returned in the response.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of the Azure region.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 */
export const WorkspacesFailover = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesFailoverInput,
  outputSchema: WorkspacesFailoverOutput,
}));
// Input Schema
export const WorkspacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}",
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
 * Gets a workspace instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesGetInput,
  outputSchema: WorkspacesGetOutput,
}));
// Input Schema
export const WorkspacesGetNSPInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}",
  }),
);
export type WorkspacesGetNSPInput = typeof WorkspacesGetNSPInput.Type;

// Output Schema
export const WorkspacesGetNSPOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type WorkspacesGetNSPOutput = typeof WorkspacesGetNSPOutput.Type;

// The operation
/**
 * Gets a network security perimeter configuration.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesGetNSP = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesGetNSPInput,
  outputSchema: WorkspacesGetNSPOutput,
}));
// Input Schema
export const WorkspacesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.OperationalInsights/workspaces",
  }),
);
export type WorkspacesListInput = typeof WorkspacesListInput.Type;

// Output Schema
export const WorkspacesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
  ),
});
export type WorkspacesListOutput = typeof WorkspacesListOutput.Type;

// The operation
/**
 * Gets the workspaces in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesListInput,
  outputSchema: WorkspacesListOutput,
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
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces",
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
  });
export type WorkspacesListByResourceGroupOutput =
  typeof WorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets workspaces in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListByResourceGroupInput,
    outputSchema: WorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const WorkspacesReconcileNSPInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}/reconcile",
    }),
  );
export type WorkspacesReconcileNSPInput =
  typeof WorkspacesReconcileNSPInput.Type;

// Output Schema
export const WorkspacesReconcileNSPOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesReconcileNSPOutput =
  typeof WorkspacesReconcileNSPOutput.Type;

// The operation
/**
 * Reconcile network security perimeter configuration for Workspace resource.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesReconcileNSP = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesReconcileNSPInput,
    outputSchema: WorkspacesReconcileNSPOutput,
  }),
);
// Input Schema
export const WorkspacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}",
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
 * @param workspaceName - The name of the workspace.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesUpdateInput,
  outputSchema: WorkspacesUpdateOutput,
}));
