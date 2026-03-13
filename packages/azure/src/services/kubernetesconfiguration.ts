/**
 * Azure Kubernetesconfiguration API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ExtensionsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterRp: Schema.String.pipe(T.PathParam()),
  clusterResourceName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions/{extensionName}",
  }),
);
export type ExtensionsCreateInput = typeof ExtensionsCreateInput.Type;

// Output Schema
export const ExtensionsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ExtensionsCreateOutput = typeof ExtensionsCreateOutput.Type;

// The operation
/**
 * Create a new Kubernetes Cluster Extension.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const ExtensionsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsCreateInput,
  outputSchema: ExtensionsCreateOutput,
}));
// Input Schema
export const ExtensionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterRp: Schema.String.pipe(T.PathParam()),
  clusterResourceName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  forceDelete: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions/{extensionName}",
  }),
);
export type ExtensionsDeleteInput = typeof ExtensionsDeleteInput.Type;

// Output Schema
export const ExtensionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExtensionsDeleteOutput = typeof ExtensionsDeleteOutput.Type;

// The operation
/**
 * Delete a Kubernetes Cluster Extension. This will cause the Agent to Uninstall the extension from the cluster.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 * @param forceDelete - Delete the extension resource in Azure - not the normal asynchronous delete.
 */
export const ExtensionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsDeleteInput,
  outputSchema: ExtensionsDeleteOutput,
}));
// Input Schema
export const ExtensionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterRp: Schema.String.pipe(T.PathParam()),
  clusterResourceName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions/{extensionName}",
  }),
);
export type ExtensionsGetInput = typeof ExtensionsGetInput.Type;

// Output Schema
export const ExtensionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ExtensionsGetOutput = typeof ExtensionsGetOutput.Type;

// The operation
/**
 * Gets Kubernetes Cluster Extension.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const ExtensionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsGetInput,
  outputSchema: ExtensionsGetOutput,
}));
// Input Schema
export const ExtensionsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterRp: Schema.String.pipe(T.PathParam()),
  clusterResourceName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions",
  }),
);
export type ExtensionsListInput = typeof ExtensionsListInput.Type;

// Output Schema
export const ExtensionsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type ExtensionsListOutput = typeof ExtensionsListOutput.Type;

// The operation
/**
 * List all Extensions in the cluster.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const ExtensionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsListInput,
  outputSchema: ExtensionsListOutput,
}));
// Input Schema
export const ExtensionsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterRp: Schema.String.pipe(T.PathParam()),
  clusterResourceName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions/{extensionName}",
  }),
);
export type ExtensionsUpdateInput = typeof ExtensionsUpdateInput.Type;

// Output Schema
export const ExtensionsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ExtensionsUpdateOutput = typeof ExtensionsUpdateOutput.Type;

// The operation
/**
 * Patch an existing Kubernetes Cluster Extension.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const ExtensionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExtensionsUpdateInput,
  outputSchema: ExtensionsUpdateOutput,
}));
// Input Schema
export const FluxConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterRp: Schema.String.pipe(T.PathParam()),
    clusterResourceName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations/{fluxConfigurationName}",
    }),
  );
export type FluxConfigurationsCreateOrUpdateInput =
  typeof FluxConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const FluxConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FluxConfigurationsCreateOrUpdateOutput =
  typeof FluxConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new Kubernetes Flux Configuration.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const FluxConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FluxConfigurationsCreateOrUpdateInput,
    outputSchema: FluxConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const FluxConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterRp: Schema.String.pipe(T.PathParam()),
    clusterResourceName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    forceDelete: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations/{fluxConfigurationName}",
    }),
  );
export type FluxConfigurationsDeleteInput =
  typeof FluxConfigurationsDeleteInput.Type;

// Output Schema
export const FluxConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FluxConfigurationsDeleteOutput =
  typeof FluxConfigurationsDeleteOutput.Type;

// The operation
/**
 * This will delete the YAML file used to set up the Flux Configuration, thus stopping future sync from the source repo.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 * @param forceDelete - Delete the extension resource in Azure - not the normal asynchronous delete.
 */
export const FluxConfigurationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluxConfigurationsDeleteInput,
    outputSchema: FluxConfigurationsDeleteOutput,
  }),
);
// Input Schema
export const FluxConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterRp: Schema.String.pipe(T.PathParam()),
    clusterResourceName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations/{fluxConfigurationName}",
    }),
  );
export type FluxConfigurationsGetInput = typeof FluxConfigurationsGetInput.Type;

// Output Schema
export const FluxConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FluxConfigurationsGetOutput =
  typeof FluxConfigurationsGetOutput.Type;

// The operation
/**
 * Gets details of the Flux Configuration.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const FluxConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluxConfigurationsGetInput,
    outputSchema: FluxConfigurationsGetOutput,
  }),
);
// Input Schema
export const FluxConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterRp: Schema.String.pipe(T.PathParam()),
    clusterResourceName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations",
    }),
  );
export type FluxConfigurationsListInput =
  typeof FluxConfigurationsListInput.Type;

// Output Schema
export const FluxConfigurationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type FluxConfigurationsListOutput =
  typeof FluxConfigurationsListOutput.Type;

// The operation
/**
 * List all Flux Configurations.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const FluxConfigurationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluxConfigurationsListInput,
    outputSchema: FluxConfigurationsListOutput,
  }),
);
// Input Schema
export const FluxConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterRp: Schema.String.pipe(T.PathParam()),
    clusterResourceName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations/{fluxConfigurationName}",
    }),
  );
export type FluxConfigurationsUpdateInput =
  typeof FluxConfigurationsUpdateInput.Type;

// Output Schema
export const FluxConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FluxConfigurationsUpdateOutput =
  typeof FluxConfigurationsUpdateOutput.Type;

// The operation
/**
 * Update an existing Kubernetes Flux Configuration.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const FluxConfigurationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FluxConfigurationsUpdateInput,
    outputSchema: FluxConfigurationsUpdateOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.KubernetesConfiguration/operations",
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
        isDataAction: Schema.optional(Schema.Boolean),
        origin: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * List all the available operations the KubernetesConfiguration resource provider supports.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const SourceControlConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterRp: Schema.String.pipe(T.PathParam()),
    clusterResourceName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/sourceControlConfigurations/{sourceControlConfigurationName}",
    }),
  );
export type SourceControlConfigurationsCreateOrUpdateInput =
  typeof SourceControlConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const SourceControlConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SourceControlConfigurationsCreateOrUpdateOutput =
  typeof SourceControlConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new Kubernetes Source Control Configuration.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const SourceControlConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SourceControlConfigurationsCreateOrUpdateInput,
    outputSchema: SourceControlConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const SourceControlConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterRp: Schema.String.pipe(T.PathParam()),
    clusterResourceName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/sourceControlConfigurations/{sourceControlConfigurationName}",
    }),
  );
export type SourceControlConfigurationsDeleteInput =
  typeof SourceControlConfigurationsDeleteInput.Type;

// Output Schema
export const SourceControlConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SourceControlConfigurationsDeleteOutput =
  typeof SourceControlConfigurationsDeleteOutput.Type;

// The operation
/**
 * This will delete the YAML file used to set up the Source control configuration, thus stopping future sync from the source repo.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const SourceControlConfigurationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SourceControlConfigurationsDeleteInput,
    outputSchema: SourceControlConfigurationsDeleteOutput,
  }));
// Input Schema
export const SourceControlConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterRp: Schema.String.pipe(T.PathParam()),
    clusterResourceName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/sourceControlConfigurations/{sourceControlConfigurationName}",
    }),
  );
export type SourceControlConfigurationsGetInput =
  typeof SourceControlConfigurationsGetInput.Type;

// Output Schema
export const SourceControlConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SourceControlConfigurationsGetOutput =
  typeof SourceControlConfigurationsGetOutput.Type;

// The operation
/**
 * Gets details of the Source Control Configuration.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const SourceControlConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SourceControlConfigurationsGetInput,
    outputSchema: SourceControlConfigurationsGetOutput,
  }));
// Input Schema
export const SourceControlConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterRp: Schema.String.pipe(T.PathParam()),
    clusterResourceName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/sourceControlConfigurations",
    }),
  );
export type SourceControlConfigurationsListInput =
  typeof SourceControlConfigurationsListInput.Type;

// Output Schema
export const SourceControlConfigurationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SourceControlConfigurationsListOutput =
  typeof SourceControlConfigurationsListOutput.Type;

// The operation
/**
 * List all Source Control Configurations.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterRp - The Kubernetes cluster RP - i.e. Microsoft.ContainerService, Microsoft.Kubernetes, Microsoft.HybridContainerService.
 * @param clusterResourceName - The Kubernetes cluster resource name - i.e. managedClusters, connectedClusters, provisionedClusters.
 * @param clusterName - The name of the kubernetes cluster.
 * @param api-version - The API version to use for this operation.
 */
export const SourceControlConfigurationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SourceControlConfigurationsListInput,
    outputSchema: SourceControlConfigurationsListOutput,
  }));
