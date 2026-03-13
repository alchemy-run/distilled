/**
 * Azure Dashboard API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DashboardsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  dashboardName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}",
  }),
);
export type DashboardsGetInput = typeof DashboardsGetInput.Type;

// Output Schema
export const DashboardsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DashboardsGetOutput = typeof DashboardsGetOutput.Type;

// The operation
/**
 * Get the properties of a specific dashboard for grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dashboardName - The name of the Azure Managed Dashboard.
 */
export const DashboardsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DashboardsGetInput,
  outputSchema: DashboardsGetOutput,
}));
// Input Schema
export const DashboardsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards",
  }),
);
export type DashboardsListInput = typeof DashboardsListInput.Type;

// Output Schema
export const DashboardsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type DashboardsListOutput = typeof DashboardsListOutput.Type;

// The operation
/**
 * List all resources of dashboards under the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const DashboardsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DashboardsListInput,
  outputSchema: DashboardsListOutput,
}));
// Input Schema
export const DashboardsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Dashboard/dashboards",
    }),
  );
export type DashboardsListBySubscriptionInput =
  typeof DashboardsListBySubscriptionInput.Type;

// Output Schema
export const DashboardsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DashboardsListBySubscriptionOutput =
  typeof DashboardsListBySubscriptionOutput.Type;

// The operation
/**
 * List all resources of dashboards under the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DashboardsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DashboardsListBySubscriptionInput,
    outputSchema: DashboardsListBySubscriptionOutput,
  }));
// Input Schema
export const GrafanaCheckEnterpriseDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/checkEnterpriseDetails",
    }),
  );
export type GrafanaCheckEnterpriseDetailsInput =
  typeof GrafanaCheckEnterpriseDetailsInput.Type;

// Output Schema
export const GrafanaCheckEnterpriseDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    saasSubscriptionDetails: Schema.optional(
      Schema.Struct({
        planId: Schema.optional(Schema.String),
        offerId: Schema.optional(Schema.String),
        publisherId: Schema.optional(Schema.String),
        term: Schema.optional(
          Schema.Struct({
            termUnit: Schema.optional(Schema.String),
            startDate: Schema.optional(Schema.String),
            endDate: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    marketplaceTrialQuota: Schema.optional(
      Schema.Struct({
        availablePromotion: Schema.optional(
          Schema.Literals(["None", "FreeTrial"]),
        ),
        grafanaResourceId: Schema.optional(Schema.String),
        trialStartAt: Schema.optional(Schema.String),
        trialEndAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type GrafanaCheckEnterpriseDetailsOutput =
  typeof GrafanaCheckEnterpriseDetailsOutput.Type;

// The operation
/**
 * Retrieve enterprise add-on details information
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const GrafanaCheckEnterpriseDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GrafanaCheckEnterpriseDetailsInput,
    outputSchema: GrafanaCheckEnterpriseDetailsOutput,
  }));
// Input Schema
export const GrafanaCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}",
  }),
);
export type GrafanaCreateInput = typeof GrafanaCreateInput.Type;

// Output Schema
export const GrafanaCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type GrafanaCreateOutput = typeof GrafanaCreateOutput.Type;

// The operation
/**
 * Create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const GrafanaCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GrafanaCreateInput,
  outputSchema: GrafanaCreateOutput,
}));
// Input Schema
export const GrafanaDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}",
  }),
);
export type GrafanaDeleteInput = typeof GrafanaDeleteInput.Type;

// Output Schema
export const GrafanaDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GrafanaDeleteOutput = typeof GrafanaDeleteOutput.Type;

// The operation
/**
 * Delete a workspace for Grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const GrafanaDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GrafanaDeleteInput,
  outputSchema: GrafanaDeleteOutput,
}));
// Input Schema
export const GrafanaFetchAvailablePluginsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/fetchAvailablePlugins",
    }),
  );
export type GrafanaFetchAvailablePluginsInput =
  typeof GrafanaFetchAvailablePluginsInput.Type;

// Output Schema
export const GrafanaFetchAvailablePluginsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          pluginId: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          author: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type GrafanaFetchAvailablePluginsOutput =
  typeof GrafanaFetchAvailablePluginsOutput.Type;

// The operation
/**
 * A synchronous resource action.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const GrafanaFetchAvailablePlugins =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GrafanaFetchAvailablePluginsInput,
    outputSchema: GrafanaFetchAvailablePluginsOutput,
  }));
// Input Schema
export const GrafanaGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}",
  }),
);
export type GrafanaGetInput = typeof GrafanaGetInput.Type;

// Output Schema
export const GrafanaGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GrafanaGetOutput = typeof GrafanaGetOutput.Type;

// The operation
/**
 * Get the properties of a specific workspace for Grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const GrafanaGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GrafanaGetInput,
  outputSchema: GrafanaGetOutput,
}));
// Input Schema
export const GrafanaListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Dashboard/grafana",
  }),
);
export type GrafanaListInput = typeof GrafanaListInput.Type;

// Output Schema
export const GrafanaListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type GrafanaListOutput = typeof GrafanaListOutput.Type;

// The operation
/**
 * List all resources of workspaces for Grafana under the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const GrafanaList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GrafanaListInput,
  outputSchema: GrafanaListOutput,
}));
// Input Schema
export const GrafanaListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana",
    }),
  );
export type GrafanaListByResourceGroupInput =
  typeof GrafanaListByResourceGroupInput.Type;

// Output Schema
export const GrafanaListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GrafanaListByResourceGroupOutput =
  typeof GrafanaListByResourceGroupOutput.Type;

// The operation
/**
 * List all resources of workspaces for Grafana under the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const GrafanaListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GrafanaListByResourceGroupInput,
    outputSchema: GrafanaListByResourceGroupOutput,
  }),
);
// Input Schema
export const GrafanaUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}",
  }),
);
export type GrafanaUpdateInput = typeof GrafanaUpdateInput.Type;

// Output Schema
export const GrafanaUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type GrafanaUpdateOutput = typeof GrafanaUpdateOutput.Type;

// The operation
/**
 * Update a workspace for Grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const GrafanaUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GrafanaUpdateInput,
  outputSchema: GrafanaUpdateOutput,
}));
// Input Schema
export const IntegrationFabricsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    integrationFabricName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics/{integrationFabricName}",
    }),
  );
export type IntegrationFabricsCreateInput =
  typeof IntegrationFabricsCreateInput.Type;

// Output Schema
export const IntegrationFabricsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IntegrationFabricsCreateOutput =
  typeof IntegrationFabricsCreateOutput.Type;

// The operation
/**
 * Create a IntegrationFabric
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param integrationFabricName - The integration fabric name of Azure Managed Grafana.
 */
export const IntegrationFabricsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationFabricsCreateInput,
    outputSchema: IntegrationFabricsCreateOutput,
  }),
);
// Input Schema
export const IntegrationFabricsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    integrationFabricName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics/{integrationFabricName}",
    }),
  );
export type IntegrationFabricsDeleteInput =
  typeof IntegrationFabricsDeleteInput.Type;

// Output Schema
export const IntegrationFabricsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationFabricsDeleteOutput =
  typeof IntegrationFabricsDeleteOutput.Type;

// The operation
/**
 * Delete a IntegrationFabric
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param integrationFabricName - The integration fabric name of Azure Managed Grafana.
 */
export const IntegrationFabricsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationFabricsDeleteInput,
    outputSchema: IntegrationFabricsDeleteOutput,
  }),
);
// Input Schema
export const IntegrationFabricsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    integrationFabricName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics/{integrationFabricName}",
    }),
  );
export type IntegrationFabricsGetInput = typeof IntegrationFabricsGetInput.Type;

// Output Schema
export const IntegrationFabricsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IntegrationFabricsGetOutput =
  typeof IntegrationFabricsGetOutput.Type;

// The operation
/**
 * Get a IntegrationFabric
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param integrationFabricName - The integration fabric name of Azure Managed Grafana.
 */
export const IntegrationFabricsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationFabricsGetInput,
    outputSchema: IntegrationFabricsGetOutput,
  }),
);
// Input Schema
export const IntegrationFabricsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics",
    }),
  );
export type IntegrationFabricsListInput =
  typeof IntegrationFabricsListInput.Type;

// Output Schema
export const IntegrationFabricsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationFabricsListOutput =
  typeof IntegrationFabricsListOutput.Type;

// The operation
/**
 * List IntegrationFabric resources by ManagedGrafana
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const IntegrationFabricsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationFabricsListInput,
    outputSchema: IntegrationFabricsListOutput,
  }),
);
// Input Schema
export const IntegrationFabricsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    integrationFabricName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/integrationFabrics/{integrationFabricName}",
    }),
  );
export type IntegrationFabricsUpdateInput =
  typeof IntegrationFabricsUpdateInput.Type;

// Output Schema
export const IntegrationFabricsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IntegrationFabricsUpdateOutput =
  typeof IntegrationFabricsUpdateOutput.Type;

// The operation
/**
 * Update a IntegrationFabric
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param integrationFabricName - The integration fabric name of Azure Managed Grafana.
 */
export const IntegrationFabricsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationFabricsUpdateInput,
    outputSchema: IntegrationFabricsUpdateOutput,
  }),
);
// Input Schema
export const ManagedDashboardsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dashboardName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}",
    }),
  );
export type ManagedDashboardsCreateInput =
  typeof ManagedDashboardsCreateInput.Type;

// Output Schema
export const ManagedDashboardsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedDashboardsCreateOutput =
  typeof ManagedDashboardsCreateOutput.Type;

// The operation
/**
 * Create or update a dashboard for grafana resource. This API is idempotent, so user can either create a new dashboard or update an existing dashboard.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dashboardName - The name of the Azure Managed Dashboard.
 */
export const ManagedDashboardsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDashboardsCreateInput,
    outputSchema: ManagedDashboardsCreateOutput,
  }),
);
// Input Schema
export const ManagedDashboardsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dashboardName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}",
    }),
  );
export type ManagedDashboardsDeleteInput =
  typeof ManagedDashboardsDeleteInput.Type;

// Output Schema
export const ManagedDashboardsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDashboardsDeleteOutput =
  typeof ManagedDashboardsDeleteOutput.Type;

// The operation
/**
 * Delete a dashboard for Grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dashboardName - The name of the Azure Managed Dashboard.
 */
export const ManagedDashboardsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDashboardsDeleteInput,
    outputSchema: ManagedDashboardsDeleteOutput,
  }),
);
// Input Schema
export const ManagedDashboardsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dashboardName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}",
    }),
  );
export type ManagedDashboardsUpdateInput =
  typeof ManagedDashboardsUpdateInput.Type;

// Output Schema
export const ManagedDashboardsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedDashboardsUpdateOutput =
  typeof ManagedDashboardsUpdateOutput.Type;

// The operation
/**
 * Update a dashboard for Grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dashboardName - The name of the Azure Managed Dashboard.
 */
export const ManagedDashboardsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDashboardsUpdateInput,
    outputSchema: ManagedDashboardsUpdateOutput,
  }),
);
// Input Schema
export const ManagedPrivateEndpointsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    managedPrivateEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsCreateInput =
  typeof ManagedPrivateEndpointsCreateInput.Type;

// Output Schema
export const ManagedPrivateEndpointsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedPrivateEndpointsCreateOutput =
  typeof ManagedPrivateEndpointsCreateOutput.Type;

// The operation
/**
 * Create or update a managed private endpoint for a grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param managedPrivateEndpointName - The managed private endpoint name of Azure Managed Grafana.
 */
export const ManagedPrivateEndpointsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsCreateInput,
    outputSchema: ManagedPrivateEndpointsCreateOutput,
  }));
// Input Schema
export const ManagedPrivateEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    managedPrivateEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsDeleteInput =
  typeof ManagedPrivateEndpointsDeleteInput.Type;

// Output Schema
export const ManagedPrivateEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedPrivateEndpointsDeleteOutput =
  typeof ManagedPrivateEndpointsDeleteOutput.Type;

// The operation
/**
 * Delete a managed private endpoint for a grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param managedPrivateEndpointName - The managed private endpoint name of Azure Managed Grafana.
 */
export const ManagedPrivateEndpointsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsDeleteInput,
    outputSchema: ManagedPrivateEndpointsDeleteOutput,
  }));
// Input Schema
export const ManagedPrivateEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    managedPrivateEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsGetInput =
  typeof ManagedPrivateEndpointsGetInput.Type;

// Output Schema
export const ManagedPrivateEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedPrivateEndpointsGetOutput =
  typeof ManagedPrivateEndpointsGetOutput.Type;

// The operation
/**
 * Get a specific managed private endpoint of a grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param managedPrivateEndpointName - The managed private endpoint name of Azure Managed Grafana.
 */
export const ManagedPrivateEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedPrivateEndpointsGetInput,
    outputSchema: ManagedPrivateEndpointsGetOutput,
  }),
);
// Input Schema
export const ManagedPrivateEndpointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints",
    }),
  );
export type ManagedPrivateEndpointsListInput =
  typeof ManagedPrivateEndpointsListInput.Type;

// Output Schema
export const ManagedPrivateEndpointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedPrivateEndpointsListOutput =
  typeof ManagedPrivateEndpointsListOutput.Type;

// The operation
/**
 * List all managed private endpoints of a grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const ManagedPrivateEndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedPrivateEndpointsListInput,
    outputSchema: ManagedPrivateEndpointsListOutput,
  }),
);
// Input Schema
export const ManagedPrivateEndpointsRefreshInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/refreshManagedPrivateEndpoints",
    }),
  );
export type ManagedPrivateEndpointsRefreshInput =
  typeof ManagedPrivateEndpointsRefreshInput.Type;

// Output Schema
export const ManagedPrivateEndpointsRefreshOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedPrivateEndpointsRefreshOutput =
  typeof ManagedPrivateEndpointsRefreshOutput.Type;

// The operation
/**
 * Refresh and sync managed private endpoints of a grafana resource to latest state.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const ManagedPrivateEndpointsRefresh =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsRefreshInput,
    outputSchema: ManagedPrivateEndpointsRefreshOutput,
  }));
// Input Schema
export const ManagedPrivateEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    managedPrivateEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints/{managedPrivateEndpointName}",
    }),
  );
export type ManagedPrivateEndpointsUpdateInput =
  typeof ManagedPrivateEndpointsUpdateInput.Type;

// Output Schema
export const ManagedPrivateEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedPrivateEndpointsUpdateOutput =
  typeof ManagedPrivateEndpointsUpdateOutput.Type;

// The operation
/**
 * Update a managed private endpoint for an existing grafana resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param managedPrivateEndpointName - The managed private endpoint name of Azure Managed Grafana.
 */
export const ManagedPrivateEndpointsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedPrivateEndpointsUpdateInput,
    outputSchema: ManagedPrivateEndpointsUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsApproveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsApproveInput =
  typeof PrivateEndpointConnectionsApproveInput.Type;

// Output Schema
export const PrivateEndpointConnectionsApproveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsApproveOutput =
  typeof PrivateEndpointConnectionsApproveOutput.Type;

// The operation
/**
 * Manual approve private endpoint connection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param privateEndpointConnectionName - The private endpoint connection name of Azure Managed Grafana.
 */
export const PrivateEndpointConnectionsApprove =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsApproveInput,
    outputSchema: PrivateEndpointConnectionsApproveOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Delete private endpoint connection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param privateEndpointConnectionName - The private endpoint connection name of Azure Managed Grafana.
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
    workspaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Get private endpoint connections.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 * @param privateEndpointConnectionName - The private endpoint connection name of Azure Managed Grafana.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * Get private endpoint connection
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    privateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/privateLinkResources/{privateLinkResourceName}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get specific private link resource information for this grafana resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
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
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListInput =
  typeof PrivateLinkResourcesListInput.Type;

// Output Schema
export const PrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListOutput =
  typeof PrivateLinkResourcesListOutput.Type;

// The operation
/**
 * List all private link resources information for this grafana resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The workspace name of Azure Managed Grafana.
 */
export const PrivateLinkResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesListInput,
    outputSchema: PrivateLinkResourcesListOutput,
  }),
);
