/**
 * Azure Servicefabricmanagedclusters API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ApplicationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}",
    }),
  );
export type ApplicationsCreateOrUpdateInput =
  typeof ApplicationsCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApplicationsCreateOrUpdateOutput =
  typeof ApplicationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Service Fabric managed application resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsCreateOrUpdateInput,
    outputSchema: ApplicationsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ApplicationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}",
    }),
  );
export type ApplicationsDeleteInput = typeof ApplicationsDeleteInput.Type;

// Output Schema
export const ApplicationsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsDeleteOutput = typeof ApplicationsDeleteOutput.Type;

// The operation
/**
 * Delete a Service Fabric managed application resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsDeleteInput,
  outputSchema: ApplicationsDeleteOutput,
}));
// Input Schema
export const ApplicationsFetchHealthInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/fetchHealth",
    }),
  );
export type ApplicationsFetchHealthInput =
  typeof ApplicationsFetchHealthInput.Type;

// Output Schema
export const ApplicationsFetchHealthOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsFetchHealthOutput =
  typeof ApplicationsFetchHealthOutput.Type;

// The operation
/**
 * Get the status of the deployed application health. It will query the cluster to find the health of the deployed application.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsFetchHealth = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsFetchHealthInput,
    outputSchema: ApplicationsFetchHealthOutput,
  }),
);
// Input Schema
export const ApplicationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  applicationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}",
  }),
);
export type ApplicationsGetInput = typeof ApplicationsGetInput.Type;

// Output Schema
export const ApplicationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ApplicationsGetOutput = typeof ApplicationsGetOutput.Type;

// The operation
/**
 * Get a Service Fabric managed application resource created or in the process of being created in the Service Fabric cluster resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsGetInput,
  outputSchema: ApplicationsGetOutput,
}));
// Input Schema
export const ApplicationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications",
  }),
);
export type ApplicationsListInput = typeof ApplicationsListInput.Type;

// Output Schema
export const ApplicationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type ApplicationsListOutput = typeof ApplicationsListOutput.Type;

// The operation
/**
 * Gets all managed application resources created or in the process of being created in the Service Fabric cluster resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const ApplicationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsListInput,
  outputSchema: ApplicationsListOutput,
}));
// Input Schema
export const ApplicationsReadUpgradeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/fetchUpgradeStatus",
    }),
  );
export type ApplicationsReadUpgradeInput =
  typeof ApplicationsReadUpgradeInput.Type;

// Output Schema
export const ApplicationsReadUpgradeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsReadUpgradeOutput =
  typeof ApplicationsReadUpgradeOutput.Type;

// The operation
/**
 * Get the status of the latest application upgrade. It will query the cluster to find the status of the latest application upgrade.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsReadUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsReadUpgradeInput,
    outputSchema: ApplicationsReadUpgradeOutput,
  }),
);
// Input Schema
export const ApplicationsRestartDeployedCodePackageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/restartDeployedCodePackage",
    }),
  );
export type ApplicationsRestartDeployedCodePackageInput =
  typeof ApplicationsRestartDeployedCodePackageInput.Type;

// Output Schema
export const ApplicationsRestartDeployedCodePackageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsRestartDeployedCodePackageOutput =
  typeof ApplicationsRestartDeployedCodePackageOutput.Type;

// The operation
/**
 * Restart a code package instance of a service replica or instance. This is a potentially destabilizing operation that should be used with immense care.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsRestartDeployedCodePackage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationsRestartDeployedCodePackageInput,
    outputSchema: ApplicationsRestartDeployedCodePackageOutput,
  }));
// Input Schema
export const ApplicationsResumeUpgradeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/resumeUpgrade",
    }),
  );
export type ApplicationsResumeUpgradeInput =
  typeof ApplicationsResumeUpgradeInput.Type;

// Output Schema
export const ApplicationsResumeUpgradeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsResumeUpgradeOutput =
  typeof ApplicationsResumeUpgradeOutput.Type;

// The operation
/**
 * Send a request to resume the current application upgrade. This will resume the application upgrade from where it was paused.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsResumeUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsResumeUpgradeInput,
    outputSchema: ApplicationsResumeUpgradeOutput,
  }),
);
// Input Schema
export const ApplicationsStartRollbackInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/startRollback",
    }),
  );
export type ApplicationsStartRollbackInput =
  typeof ApplicationsStartRollbackInput.Type;

// Output Schema
export const ApplicationsStartRollbackOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsStartRollbackOutput =
  typeof ApplicationsStartRollbackOutput.Type;

// The operation
/**
 * Send a request to start a rollback of the current application upgrade. This will start rolling back the application to the previous version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsStartRollback = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsStartRollbackInput,
    outputSchema: ApplicationsStartRollbackOutput,
  }),
);
// Input Schema
export const ApplicationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}",
    }),
  );
export type ApplicationsUpdateInput = typeof ApplicationsUpdateInput.Type;

// Output Schema
export const ApplicationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApplicationsUpdateOutput = typeof ApplicationsUpdateOutput.Type;

// The operation
/**
 * Updates an application resource of a given managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationsUpdateInput,
  outputSchema: ApplicationsUpdateOutput,
}));
// Input Schema
export const ApplicationsUpdateUpgradeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/updateUpgrade",
    }),
  );
export type ApplicationsUpdateUpgradeInput =
  typeof ApplicationsUpdateUpgradeInput.Type;

// Output Schema
export const ApplicationsUpdateUpgradeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationsUpdateUpgradeOutput =
  typeof ApplicationsUpdateUpgradeOutput.Type;

// The operation
/**
 * Send a request to update the current application upgrade.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ApplicationsUpdateUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationsUpdateUpgradeInput,
    outputSchema: ApplicationsUpdateUpgradeOutput,
  }),
);
// Input Schema
export const ApplicationTypesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}",
    }),
  );
export type ApplicationTypesCreateOrUpdateInput =
  typeof ApplicationTypesCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationTypesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApplicationTypesCreateOrUpdateOutput =
  typeof ApplicationTypesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Service Fabric managed application type name resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationTypeName - The name of the application type name resource.
 */
export const ApplicationTypesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationTypesCreateOrUpdateInput,
    outputSchema: ApplicationTypesCreateOrUpdateOutput,
  }));
// Input Schema
export const ApplicationTypesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}",
    }),
  );
export type ApplicationTypesDeleteInput =
  typeof ApplicationTypesDeleteInput.Type;

// Output Schema
export const ApplicationTypesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationTypesDeleteOutput =
  typeof ApplicationTypesDeleteOutput.Type;

// The operation
/**
 * Delete a Service Fabric managed application type name resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationTypeName - The name of the application type name resource.
 */
export const ApplicationTypesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationTypesDeleteInput,
    outputSchema: ApplicationTypesDeleteOutput,
  }),
);
// Input Schema
export const ApplicationTypesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}",
    }),
  );
export type ApplicationTypesGetInput = typeof ApplicationTypesGetInput.Type;

// Output Schema
export const ApplicationTypesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApplicationTypesGetOutput = typeof ApplicationTypesGetOutput.Type;

// The operation
/**
 * Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric managed cluster resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationTypeName - The name of the application type name resource.
 */
export const ApplicationTypesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ApplicationTypesGetInput,
  outputSchema: ApplicationTypesGetOutput,
}));
// Input Schema
export const ApplicationTypesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes",
    }),
  );
export type ApplicationTypesListInput = typeof ApplicationTypesListInput.Type;

// Output Schema
export const ApplicationTypesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationTypesListOutput = typeof ApplicationTypesListOutput.Type;

// The operation
/**
 * Gets all application type name resources created or in the process of being created in the Service Fabric managed cluster resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const ApplicationTypesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationTypesListInput,
    outputSchema: ApplicationTypesListOutput,
  }),
);
// Input Schema
export const ApplicationTypesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}",
    }),
  );
export type ApplicationTypesUpdateInput =
  typeof ApplicationTypesUpdateInput.Type;

// Output Schema
export const ApplicationTypesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApplicationTypesUpdateOutput =
  typeof ApplicationTypesUpdateOutput.Type;

// The operation
/**
 * Updates the tags of an application type resource of a given managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationTypeName - The name of the application type name resource.
 */
export const ApplicationTypesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationTypesUpdateInput,
    outputSchema: ApplicationTypesUpdateOutput,
  }),
);
// Input Schema
export const ApplicationTypeVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationTypeName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}",
    }),
  );
export type ApplicationTypeVersionsCreateOrUpdateInput =
  typeof ApplicationTypeVersionsCreateOrUpdateInput.Type;

// Output Schema
export const ApplicationTypeVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApplicationTypeVersionsCreateOrUpdateOutput =
  typeof ApplicationTypeVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Service Fabric managed application type version resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationTypeName - The name of the application type name resource.
 * @param version - The application type version.
 */
export const ApplicationTypeVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationTypeVersionsCreateOrUpdateInput,
    outputSchema: ApplicationTypeVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ApplicationTypeVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationTypeName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}",
    }),
  );
export type ApplicationTypeVersionsDeleteInput =
  typeof ApplicationTypeVersionsDeleteInput.Type;

// Output Schema
export const ApplicationTypeVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ApplicationTypeVersionsDeleteOutput =
  typeof ApplicationTypeVersionsDeleteOutput.Type;

// The operation
/**
 * Delete a Service Fabric managed application type version resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationTypeName - The name of the application type name resource.
 * @param version - The application type version.
 */
export const ApplicationTypeVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationTypeVersionsDeleteInput,
    outputSchema: ApplicationTypeVersionsDeleteOutput,
  }));
// Input Schema
export const ApplicationTypeVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationTypeName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}",
    }),
  );
export type ApplicationTypeVersionsGetInput =
  typeof ApplicationTypeVersionsGetInput.Type;

// Output Schema
export const ApplicationTypeVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApplicationTypeVersionsGetOutput =
  typeof ApplicationTypeVersionsGetOutput.Type;

// The operation
/**
 * Get a Service Fabric managed application type version resource created or in the process of being created in the Service Fabric managed application type name resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationTypeName - The name of the application type name resource.
 * @param version - The application type version.
 */
export const ApplicationTypeVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ApplicationTypeVersionsGetInput,
    outputSchema: ApplicationTypeVersionsGetOutput,
  }),
);
// Input Schema
export const ApplicationTypeVersionsListByApplicationTypesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}/versions",
    }),
  );
export type ApplicationTypeVersionsListByApplicationTypesInput =
  typeof ApplicationTypeVersionsListByApplicationTypesInput.Type;

// Output Schema
export const ApplicationTypeVersionsListByApplicationTypesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ApplicationTypeVersionsListByApplicationTypesOutput =
  typeof ApplicationTypeVersionsListByApplicationTypesOutput.Type;

// The operation
/**
 * Gets all application type version resources created or in the process of being created in the Service Fabric managed application type name resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationTypeName - The name of the application type name resource.
 */
export const ApplicationTypeVersionsListByApplicationTypes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationTypeVersionsListByApplicationTypesInput,
    outputSchema: ApplicationTypeVersionsListByApplicationTypesOutput,
  }));
// Input Schema
export const ApplicationTypeVersionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationTypeName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applicationTypes/{applicationTypeName}/versions/{version}",
    }),
  );
export type ApplicationTypeVersionsUpdateInput =
  typeof ApplicationTypeVersionsUpdateInput.Type;

// Output Schema
export const ApplicationTypeVersionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ApplicationTypeVersionsUpdateOutput =
  typeof ApplicationTypeVersionsUpdateOutput.Type;

// The operation
/**
 * Updates the tags of an application type version resource of a given managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationTypeName - The name of the application type name resource.
 * @param version - The application type version.
 */
export const ApplicationTypeVersionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ApplicationTypeVersionsUpdateInput,
    outputSchema: ApplicationTypeVersionsUpdateOutput,
  }));
// Input Schema
export const ManagedApplyMaintenanceWindowPostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applyMaintenanceWindow",
    }),
  );
export type ManagedApplyMaintenanceWindowPostInput =
  typeof ManagedApplyMaintenanceWindowPostInput.Type;

// Output Schema
export const ManagedApplyMaintenanceWindowPostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedApplyMaintenanceWindowPostOutput =
  typeof ManagedApplyMaintenanceWindowPostOutput.Type;

// The operation
/**
 * Action to Apply Maintenance window on the Service Fabric Managed Clusters, right now. Any pending update will be applied.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const managedApplyMaintenanceWindowPost =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedApplyMaintenanceWindowPostInput,
    outputSchema: ManagedApplyMaintenanceWindowPostOutput,
  }));
// Input Schema
export const ManagedAzResiliencyStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/getazresiliencystatus",
    }),
  );
export type ManagedAzResiliencyStatusGetInput =
  typeof ManagedAzResiliencyStatusGetInput.Type;

// Output Schema
export const ManagedAzResiliencyStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    baseResourceStatus: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceName: Schema.optional(Schema.String),
          resourceType: Schema.optional(Schema.String),
          isZoneResilient: Schema.optional(Schema.Boolean),
          details: Schema.optional(Schema.String),
        }),
      ),
    ),
    isClusterZoneResilient: Schema.optional(Schema.Boolean),
  });
export type ManagedAzResiliencyStatusGetOutput =
  typeof ManagedAzResiliencyStatusGetOutput.Type;

// The operation
/**
 * Action to get Az Resiliency Status of all the Base resources constituting Service Fabric Managed Clusters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const managedAzResiliencyStatusGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedAzResiliencyStatusGetInput,
    outputSchema: ManagedAzResiliencyStatusGetOutput,
  }));
// Input Schema
export const ManagedClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}",
    }),
  );
export type ManagedClustersCreateOrUpdateInput =
  typeof ManagedClustersCreateOrUpdateInput.Type;

// Output Schema
export const ManagedClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedClustersCreateOrUpdateOutput =
  typeof ManagedClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Service Fabric managed cluster resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const ManagedClustersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersCreateOrUpdateInput,
    outputSchema: ManagedClustersCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedClustersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}",
    }),
  );
export type ManagedClustersDeleteInput = typeof ManagedClustersDeleteInput.Type;

// Output Schema
export const ManagedClustersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedClustersDeleteOutput =
  typeof ManagedClustersDeleteOutput.Type;

// The operation
/**
 * Delete a Service Fabric managed cluster resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const ManagedClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedClustersDeleteInput,
    outputSchema: ManagedClustersDeleteOutput,
  }),
);
// Input Schema
export const ManagedClustersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}",
    }),
  );
export type ManagedClustersGetInput = typeof ManagedClustersGetInput.Type;

// Output Schema
export const ManagedClustersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedClustersGetOutput = typeof ManagedClustersGetOutput.Type;

// The operation
/**
 * Get a Service Fabric managed cluster resource created or in the process of being created in the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const ManagedClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ManagedClustersGetInput,
  outputSchema: ManagedClustersGetOutput,
}));
// Input Schema
export const ManagedClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters",
    }),
  );
export type ManagedClustersListByResourceGroupInput =
  typeof ManagedClustersListByResourceGroupInput.Type;

// Output Schema
export const ManagedClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedClustersListByResourceGroupOutput =
  typeof ManagedClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Gets all Service Fabric cluster resources created or in the process of being created in the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ManagedClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListByResourceGroupInput,
    outputSchema: ManagedClustersListByResourceGroupOutput,
  }));
// Input Schema
export const ManagedClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/managedClusters",
    }),
  );
export type ManagedClustersListBySubscriptionInput =
  typeof ManagedClustersListBySubscriptionInput.Type;

// Output Schema
export const ManagedClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedClustersListBySubscriptionOutput =
  typeof ManagedClustersListBySubscriptionOutput.Type;

// The operation
/**
 * Gets all Service Fabric cluster resources created or in the process of being created in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ManagedClustersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListBySubscriptionInput,
    outputSchema: ManagedClustersListBySubscriptionOutput,
  }));
// Input Schema
export const ManagedClustersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}",
    }),
  );
export type ManagedClustersUpdateInput = typeof ManagedClustersUpdateInput.Type;

// Output Schema
export const ManagedClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedClustersUpdateOutput =
  typeof ManagedClustersUpdateOutput.Type;

// The operation
/**
 * Update the tags of of a Service Fabric managed cluster resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const ManagedClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedClustersUpdateInput,
    outputSchema: ManagedClustersUpdateOutput,
  }),
);
// Input Schema
export const ManagedClusterVersionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    clusterVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedClusterVersions/{clusterVersion}",
    }),
  );
export type ManagedClusterVersionGetInput =
  typeof ManagedClusterVersionGetInput.Type;

// Output Schema
export const ManagedClusterVersionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        clusterCodeVersion: Schema.optional(Schema.String),
        supportExpiryUtc: Schema.optional(Schema.String),
        osType: Schema.optional(Schema.Literals(["Windows"])),
      }),
    ),
  });
export type ManagedClusterVersionGetOutput =
  typeof ManagedClusterVersionGetOutput.Type;

// The operation
/**
 * Gets information about a Service Fabric managed cluster code version available in the specified location.
 *
 * Gets information about an available Service Fabric managed cluster code version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The location for the cluster code versions. This is different from cluster location.
 * @param clusterVersion - The cluster code version.
 */
export const ManagedClusterVersionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedClusterVersionGetInput,
    outputSchema: ManagedClusterVersionGetOutput,
  }),
);
// Input Schema
export const ManagedClusterVersionGetByEnvironmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    environment: Schema.Literals(["Windows"]).pipe(T.PathParam()),
    clusterVersion: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/managedClusterVersions/{clusterVersion}",
    }),
  );
export type ManagedClusterVersionGetByEnvironmentInput =
  typeof ManagedClusterVersionGetByEnvironmentInput.Type;

// Output Schema
export const ManagedClusterVersionGetByEnvironmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        clusterCodeVersion: Schema.optional(Schema.String),
        supportExpiryUtc: Schema.optional(Schema.String),
        osType: Schema.optional(Schema.Literals(["Windows"])),
      }),
    ),
  });
export type ManagedClusterVersionGetByEnvironmentOutput =
  typeof ManagedClusterVersionGetByEnvironmentOutput.Type;

// The operation
/**
 * Gets information about a Service Fabric cluster code version available for the specified environment.
 *
 * Gets information about an available Service Fabric cluster code version by environment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The location for the cluster code versions. This is different from cluster location.
 * @param environment - The operating system of the cluster.
 * @param clusterVersion - The cluster code version.
 */
export const ManagedClusterVersionGetByEnvironment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClusterVersionGetByEnvironmentInput,
    outputSchema: ManagedClusterVersionGetByEnvironmentOutput,
  }));
// Input Schema
export const ManagedClusterVersionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedClusterVersions",
    }),
  );
export type ManagedClusterVersionListInput =
  typeof ManagedClusterVersionListInput.Type;

// Output Schema
export const ManagedClusterVersionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      properties: Schema.optional(
        Schema.Struct({
          clusterCodeVersion: Schema.optional(Schema.String),
          supportExpiryUtc: Schema.optional(Schema.String),
          osType: Schema.optional(Schema.Literals(["Windows"])),
        }),
      ),
    }),
  );
export type ManagedClusterVersionListOutput =
  typeof ManagedClusterVersionListOutput.Type;

// The operation
/**
 * Gets the list of Service Fabric cluster code versions available for the specified location.
 *
 * Gets all available code versions for Service Fabric cluster resources by location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The location for the cluster code versions. This is different from cluster location.
 */
export const ManagedClusterVersionList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedClusterVersionListInput,
    outputSchema: ManagedClusterVersionListOutput,
  }),
);
// Input Schema
export const ManagedClusterVersionListByEnvironmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    environment: Schema.Literals(["Windows"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/environments/{environment}/managedClusterVersions",
    }),
  );
export type ManagedClusterVersionListByEnvironmentInput =
  typeof ManagedClusterVersionListByEnvironmentInput.Type;

// Output Schema
export const ManagedClusterVersionListByEnvironmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      properties: Schema.optional(
        Schema.Struct({
          clusterCodeVersion: Schema.optional(Schema.String),
          supportExpiryUtc: Schema.optional(Schema.String),
          osType: Schema.optional(Schema.Literals(["Windows"])),
        }),
      ),
    }),
  );
export type ManagedClusterVersionListByEnvironmentOutput =
  typeof ManagedClusterVersionListByEnvironmentOutput.Type;

// The operation
/**
 * Gets the list of Service Fabric cluster code versions available for the specified environment.
 *
 * Gets all available code versions for Service Fabric cluster resources by environment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The location for the cluster code versions. This is different from cluster location.
 * @param environment - The operating system of the cluster.
 */
export const ManagedClusterVersionListByEnvironment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClusterVersionListByEnvironmentInput,
    outputSchema: ManagedClusterVersionListByEnvironmentOutput,
  }));
// Input Schema
export const ManagedMaintenanceWindowStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/getMaintenanceWindowStatus",
    }),
  );
export type ManagedMaintenanceWindowStatusGetInput =
  typeof ManagedMaintenanceWindowStatusGetInput.Type;

// Output Schema
export const ManagedMaintenanceWindowStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isWindowEnabled: Schema.optional(Schema.Boolean),
    isRegionReady: Schema.optional(Schema.Boolean),
    isWindowActive: Schema.optional(Schema.Boolean),
    canApplyUpdates: Schema.optional(Schema.Boolean),
    lastWindowStatusUpdateAtUTC: Schema.optional(Schema.String),
    lastWindowStartTimeUTC: Schema.optional(Schema.String),
    lastWindowEndTimeUTC: Schema.optional(Schema.String),
  });
export type ManagedMaintenanceWindowStatusGetOutput =
  typeof ManagedMaintenanceWindowStatusGetOutput.Type;

// The operation
/**
 * Action to get Maintenance Window Status of the Service Fabric Managed Clusters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const managedMaintenanceWindowStatusGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedMaintenanceWindowStatusGetInput,
    outputSchema: ManagedMaintenanceWindowStatusGetOutput,
  }));
// Input Schema
export const ManagedUnsupportedVMSizesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    vmSize: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedUnsupportedVMSizes/{vmSize}",
    }),
  );
export type ManagedUnsupportedVMSizesGetInput =
  typeof ManagedUnsupportedVMSizesGetInput.Type;

// Output Schema
export const ManagedUnsupportedVMSizesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        size: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ManagedUnsupportedVMSizesGetOutput =
  typeof ManagedUnsupportedVMSizesGetOutput.Type;

// The operation
/**
 * Get unsupported vm size for Service Fabric Managed Clusters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The location for the cluster code versions. This is different from cluster location.
 * @param vmSize - VM Size name.
 */
export const managedUnsupportedVMSizesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedUnsupportedVMSizesGetInput,
    outputSchema: ManagedUnsupportedVMSizesGetOutput,
  }));
// Input Schema
export const ManagedUnsupportedVMSizesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedUnsupportedVMSizes",
    }),
  );
export type ManagedUnsupportedVMSizesListInput =
  typeof ManagedUnsupportedVMSizesListInput.Type;

// Output Schema
export const ManagedUnsupportedVMSizesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        properties: Schema.optional(
          Schema.Struct({
            size: Schema.optional(Schema.String),
          }),
        ),
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedUnsupportedVMSizesListOutput =
  typeof ManagedUnsupportedVMSizesListOutput.Type;

// The operation
/**
 * Get the lists of unsupported vm sizes for Service Fabric Managed Clusters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The location for the cluster code versions. This is different from cluster location.
 */
export const managedUnsupportedVMSizesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedUnsupportedVMSizesListInput,
    outputSchema: ManagedUnsupportedVMSizesListOutput,
  }));
// Input Schema
export const NodeTypesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    nodeTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}",
    }),
  );
export type NodeTypesCreateOrUpdateInput =
  typeof NodeTypesCreateOrUpdateInput.Type;

// Output Schema
export const NodeTypesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NodeTypesCreateOrUpdateOutput =
  typeof NodeTypesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Service Fabric node type of a given managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NodeTypesCreateOrUpdateInput,
    outputSchema: NodeTypesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const NodeTypesDeallocateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    nodeTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/deallocate",
    }),
  );
export type NodeTypesDeallocateInput = typeof NodeTypesDeallocateInput.Type;

// Output Schema
export const NodeTypesDeallocateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NodeTypesDeallocateOutput = typeof NodeTypesDeallocateOutput.Type;

// The operation
/**
 * Deallocates one or more nodes on the node type. It will disable the fabric nodes, trigger a shutdown on the VMs and release them from the cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesDeallocate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypesDeallocateInput,
  outputSchema: NodeTypesDeallocateOutput,
}));
// Input Schema
export const NodeTypesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  nodeTypeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}",
  }),
);
export type NodeTypesDeleteInput = typeof NodeTypesDeleteInput.Type;

// Output Schema
export const NodeTypesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NodeTypesDeleteOutput = typeof NodeTypesDeleteOutput.Type;

// The operation
/**
 * Delete a Service Fabric node type of a given managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypesDeleteInput,
  outputSchema: NodeTypesDeleteOutput,
}));
// Input Schema
export const NodeTypesDeleteNodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    nodeTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/deleteNode",
    }),
  );
export type NodeTypesDeleteNodeInput = typeof NodeTypesDeleteNodeInput.Type;

// Output Schema
export const NodeTypesDeleteNodeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NodeTypesDeleteNodeOutput = typeof NodeTypesDeleteNodeOutput.Type;

// The operation
/**
 * Deletes one or more nodes on the node type. It will disable the fabric nodes, trigger a delete on the VMs and removes the state from the cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesDeleteNode = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypesDeleteNodeInput,
  outputSchema: NodeTypesDeleteNodeOutput,
}));
// Input Schema
export const NodeTypesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  nodeTypeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}",
  }),
);
export type NodeTypesGetInput = typeof NodeTypesGetInput.Type;

// Output Schema
export const NodeTypesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NodeTypesGetOutput = typeof NodeTypesGetOutput.Type;

// The operation
/**
 * Get a Service Fabric node type of a given managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypesGetInput,
  outputSchema: NodeTypesGetOutput,
}));
// Input Schema
export const NodeTypeSkusListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  nodeTypeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/skus",
  }),
);
export type NodeTypeSkusListInput = typeof NodeTypeSkusListInput.Type;

// Output Schema
export const NodeTypeSkusListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.optional(Schema.String),
            tier: Schema.optional(Schema.String),
          }),
        ),
        capacity: Schema.optional(
          Schema.Struct({
            minimum: Schema.optional(Schema.Number),
            maximum: Schema.optional(Schema.Number),
            default: Schema.optional(Schema.Number),
            scaleType: Schema.optional(
              Schema.Literals(["None", "Manual", "Automatic"]),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  },
);
export type NodeTypeSkusListOutput = typeof NodeTypeSkusListOutput.Type;

// The operation
/**
 * Get a Service Fabric node type supported SKUs.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypeSkusList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypeSkusListInput,
  outputSchema: NodeTypeSkusListOutput,
}));
// Input Schema
export const NodeTypesListByManagedClustersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes",
    }),
  );
export type NodeTypesListByManagedClustersInput =
  typeof NodeTypesListByManagedClustersInput.Type;

// Output Schema
export const NodeTypesListByManagedClustersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type NodeTypesListByManagedClustersOutput =
  typeof NodeTypesListByManagedClustersOutput.Type;

// The operation
/**
 * Gets all Node types of the specified managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 */
export const NodeTypesListByManagedClusters =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NodeTypesListByManagedClustersInput,
    outputSchema: NodeTypesListByManagedClustersOutput,
  }));
// Input Schema
export const NodeTypesRedeployInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    nodeTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/redeploy",
  }),
);
export type NodeTypesRedeployInput = typeof NodeTypesRedeployInput.Type;

// Output Schema
export const NodeTypesRedeployOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NodeTypesRedeployOutput = typeof NodeTypesRedeployOutput.Type;

// The operation
/**
 * Redeploys one or more nodes on the node type. It will disable the fabric nodes, trigger a shut down on the VMs, move them to a new node, and power them back on.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesRedeploy = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypesRedeployInput,
  outputSchema: NodeTypesRedeployOutput,
}));
// Input Schema
export const NodeTypesReimageInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  nodeTypeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/reimage",
  }),
);
export type NodeTypesReimageInput = typeof NodeTypesReimageInput.Type;

// Output Schema
export const NodeTypesReimageOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NodeTypesReimageOutput = typeof NodeTypesReimageOutput.Type;

// The operation
/**
 * Reimages one or more nodes on the node type. It will disable the fabric nodes, trigger a reimage on the VMs and activate the nodes back again.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesReimage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypesReimageInput,
  outputSchema: NodeTypesReimageOutput,
}));
// Input Schema
export const NodeTypesRestartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  nodeTypeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/restart",
  }),
);
export type NodeTypesRestartInput = typeof NodeTypesRestartInput.Type;

// Output Schema
export const NodeTypesRestartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NodeTypesRestartOutput = typeof NodeTypesRestartOutput.Type;

// The operation
/**
 * Restarts one or more nodes on the node type. It will disable the fabric nodes, trigger a restart on the VMs and activate the nodes back again.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypesRestartInput,
  outputSchema: NodeTypesRestartOutput,
}));
// Input Schema
export const NodeTypesStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  nodeTypeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}/start",
  }),
);
export type NodeTypesStartInput = typeof NodeTypesStartInput.Type;

// Output Schema
export const NodeTypesStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NodeTypesStartOutput = typeof NodeTypesStartOutput.Type;

// The operation
/**
 * Starts one or more nodes on the node type. It will trigger an allocation of the fabric node if needed and activate them.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypesStartInput,
  outputSchema: NodeTypesStartOutput,
}));
// Input Schema
export const NodeTypesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  nodeTypeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/nodeTypes/{nodeTypeName}",
  }),
);
export type NodeTypesUpdateInput = typeof NodeTypesUpdateInput.Type;

// Output Schema
export const NodeTypesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type NodeTypesUpdateOutput = typeof NodeTypesUpdateOutput.Type;

// The operation
/**
 * Update the configuration of a node type of a given managed cluster, only updating tags or capacity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param nodeTypeName - The name of the node type.
 */
export const NodeTypesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NodeTypesUpdateInput,
  outputSchema: NodeTypesUpdateOutput,
}));
// Input Schema
export const OperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedClusterOperationResults/{operationId}",
    }),
  );
export type OperationResultsGetInput = typeof OperationResultsGetInput.Type;

// Output Schema
export const OperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OperationResultsGetOutput = typeof OperationResultsGetOutput.Type;

// The operation
/**
 * Get long running operation result.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param operationId - operation identifier.
 */
export const OperationResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationResultsGetInput,
  outputSchema: OperationResultsGetOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ServiceFabric/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
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
      nextLink: Schema.optional(Schema.String),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Service Fabric resource provider API operations.
 *
 * Get the list of available Service Fabric resource provider API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const OperationStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedClusterOperations/{operationId}",
    }),
  );
export type OperationStatusGetInput = typeof OperationStatusGetInput.Type;

// Output Schema
export const OperationStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    percentComplete: Schema.optional(Schema.Number),
    status: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
  });
export type OperationStatusGetOutput = typeof OperationStatusGetOutput.Type;

// The operation
/**
 * Get long running operation status.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param location - The name of Azure region.
 * @param operationId - operation identifier.
 */
export const OperationStatusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationStatusGetInput,
  outputSchema: OperationStatusGetOutput,
}));
// Input Schema
export const ServicesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}",
    }),
  );
export type ServicesCreateOrUpdateInput =
  typeof ServicesCreateOrUpdateInput.Type;

// Output Schema
export const ServicesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServicesCreateOrUpdateOutput =
  typeof ServicesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Service Fabric managed service resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 * @param serviceName - The name of the service resource in the format of {applicationName}~{serviceName}.
 */
export const ServicesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesCreateOrUpdateInput,
    outputSchema: ServicesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServicesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  applicationName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}",
  }),
);
export type ServicesDeleteInput = typeof ServicesDeleteInput.Type;

// Output Schema
export const ServicesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesDeleteOutput = typeof ServicesDeleteOutput.Type;

// The operation
/**
 * Delete a Service Fabric managed service resource with the specified name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 * @param serviceName - The name of the service resource in the format of {applicationName}~{serviceName}.
 */
export const ServicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesDeleteInput,
  outputSchema: ServicesDeleteOutput,
}));
// Input Schema
export const ServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  applicationName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}",
  }),
);
export type ServicesGetInput = typeof ServicesGetInput.Type;

// Output Schema
export const ServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServicesGetOutput = typeof ServicesGetOutput.Type;

// The operation
/**
 * Get a Service Fabric service resource created or in the process of being created in the Service Fabric managed application resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 * @param serviceName - The name of the service resource in the format of {applicationName}~{serviceName}.
 */
export const ServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesGetInput,
  outputSchema: ServicesGetOutput,
}));
// Input Schema
export const ServicesListByApplicationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services",
    }),
  );
export type ServicesListByApplicationsInput =
  typeof ServicesListByApplicationsInput.Type;

// Output Schema
export const ServicesListByApplicationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ServicesListByApplicationsOutput =
  typeof ServicesListByApplicationsOutput.Type;

// The operation
/**
 * Gets all service resources created or in the process of being created in the Service Fabric managed application resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 */
export const ServicesListByApplications = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesListByApplicationsInput,
    outputSchema: ServicesListByApplicationsOutput,
  }),
);
// Input Schema
export const ServicesRestartReplicaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    applicationName: Schema.String.pipe(T.PathParam()),
    serviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}/restartReplica",
    }),
  );
export type ServicesRestartReplicaInput =
  typeof ServicesRestartReplicaInput.Type;

// Output Schema
export const ServicesRestartReplicaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServicesRestartReplicaOutput =
  typeof ServicesRestartReplicaOutput.Type;

// The operation
/**
 * A long-running resource action.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 * @param serviceName - The name of the service resource in the format of {applicationName}~{serviceName}.
 */
export const ServicesRestartReplica = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServicesRestartReplicaInput,
    outputSchema: ServicesRestartReplicaOutput,
  }),
);
// Input Schema
export const ServicesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  applicationName: Schema.String.pipe(T.PathParam()),
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/managedClusters/{clusterName}/applications/{applicationName}/services/{serviceName}",
  }),
);
export type ServicesUpdateInput = typeof ServicesUpdateInput.Type;

// Output Schema
export const ServicesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ServicesUpdateOutput = typeof ServicesUpdateOutput.Type;

// The operation
/**
 * Updates the tags of a service resource of a given managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster resource.
 * @param applicationName - The name of the application resource.
 * @param serviceName - The name of the service resource in the format of {applicationName}~{serviceName}.
 */
export const ServicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesUpdateInput,
  outputSchema: ServicesUpdateOutput,
}));
