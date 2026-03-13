/**
 * Azure Containerservice API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AgentPoolsAbortLatestOperationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    agentPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/abort",
    }),
  );
export type AgentPoolsAbortLatestOperationInput =
  typeof AgentPoolsAbortLatestOperationInput.Type;

// Output Schema
export const AgentPoolsAbortLatestOperationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AgentPoolsAbortLatestOperationOutput =
  typeof AgentPoolsAbortLatestOperationOutput.Type;

// The operation
/**
 * Aborts last operation running on agent pool.
 *
 * Aborts the currently running operation on the agent pool. The Agent Pool will be moved to a Canceling state and eventually to a Canceled state when cancellation finishes. If the operation completes before cancellation can take place, a 409 error code is returned.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param agentPoolName - The name of the agent pool.
 */
export const AgentPoolsAbortLatestOperation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AgentPoolsAbortLatestOperationInput,
    outputSchema: AgentPoolsAbortLatestOperationOutput,
  }));
// Input Schema
export const AgentPoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    agentPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}",
    }),
  );
export type AgentPoolsCreateOrUpdateInput =
  typeof AgentPoolsCreateOrUpdateInput.Type;

// Output Schema
export const AgentPoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AgentPoolsCreateOrUpdateOutput =
  typeof AgentPoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an agent pool in the specified managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param agentPoolName - The name of the agent pool.
 * @param if-match - The request should only proceed if an entity matches this string.
 * @param if-none-match - The request should only proceed if no entity matches this string.
 */
export const AgentPoolsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AgentPoolsCreateOrUpdateInput,
    outputSchema: AgentPoolsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const AgentPoolsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  agentPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  "ignore-pod-disruption-budget": Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}",
  }),
);
export type AgentPoolsDeleteInput = typeof AgentPoolsDeleteInput.Type;

// Output Schema
export const AgentPoolsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AgentPoolsDeleteOutput = typeof AgentPoolsDeleteOutput.Type;

// The operation
/**
 * Deletes an agent pool in the specified managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param agentPoolName - The name of the agent pool.
 * @param ignore-pod-disruption-budget - ignore-pod-disruption-budget=true to delete those pods on a node without considering Pod Disruption Budget
 * @param if-match - The request should only proceed if an entity matches this string.
 */
export const AgentPoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentPoolsDeleteInput,
  outputSchema: AgentPoolsDeleteOutput,
}));
// Input Schema
export const AgentPoolsDeleteMachinesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    agentPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/deleteMachines",
    }),
  );
export type AgentPoolsDeleteMachinesInput =
  typeof AgentPoolsDeleteMachinesInput.Type;

// Output Schema
export const AgentPoolsDeleteMachinesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AgentPoolsDeleteMachinesOutput =
  typeof AgentPoolsDeleteMachinesOutput.Type;

// The operation
/**
 * Deletes specific machines in an agent pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param agentPoolName - The name of the agent pool.
 */
export const AgentPoolsDeleteMachines = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AgentPoolsDeleteMachinesInput,
    outputSchema: AgentPoolsDeleteMachinesOutput,
  }),
);
// Input Schema
export const AgentPoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  agentPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}",
  }),
);
export type AgentPoolsGetInput = typeof AgentPoolsGetInput.Type;

// Output Schema
export const AgentPoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type AgentPoolsGetOutput = typeof AgentPoolsGetOutput.Type;

// The operation
/**
 * Gets the specified managed cluster agent pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param agentPoolName - The name of the agent pool.
 */
export const AgentPoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentPoolsGetInput,
  outputSchema: AgentPoolsGetOutput,
}));
// Input Schema
export const AgentPoolsGetAvailableAgentPoolVersionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/availableAgentPoolVersions",
    }),
  );
export type AgentPoolsGetAvailableAgentPoolVersionsInput =
  typeof AgentPoolsGetAvailableAgentPoolVersionsInput.Type;

// Output Schema
export const AgentPoolsGetAvailableAgentPoolVersionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.Struct({
      agentPoolVersions: Schema.optional(
        Schema.Array(
          Schema.Struct({
            default: Schema.optional(Schema.Boolean),
            kubernetesVersion: Schema.optional(Schema.String),
            isPreview: Schema.optional(Schema.Boolean),
          }),
        ),
      ),
    }),
  });
export type AgentPoolsGetAvailableAgentPoolVersionsOutput =
  typeof AgentPoolsGetAvailableAgentPoolVersionsOutput.Type;

// The operation
/**
 * Gets a list of supported Kubernetes versions for the specified agent pool.
 *
 * See [supported Kubernetes versions](https://docs.microsoft.com/azure/aks/supported-kubernetes-versions) for more details about the version lifecycle.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const AgentPoolsGetAvailableAgentPoolVersions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AgentPoolsGetAvailableAgentPoolVersionsInput,
    outputSchema: AgentPoolsGetAvailableAgentPoolVersionsOutput,
  }));
// Input Schema
export const AgentPoolsGetUpgradeProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    agentPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeProfiles/default",
    }),
  );
export type AgentPoolsGetUpgradeProfileInput =
  typeof AgentPoolsGetUpgradeProfileInput.Type;

// Output Schema
export const AgentPoolsGetUpgradeProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AgentPoolsGetUpgradeProfileOutput =
  typeof AgentPoolsGetUpgradeProfileOutput.Type;

// The operation
/**
 * Gets the upgrade profile for an agent pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param agentPoolName - The name of the agent pool.
 */
export const AgentPoolsGetUpgradeProfile = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AgentPoolsGetUpgradeProfileInput,
    outputSchema: AgentPoolsGetUpgradeProfileOutput,
  }),
);
// Input Schema
export const AgentPoolsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools",
  }),
);
export type AgentPoolsListInput = typeof AgentPoolsListInput.Type;

// Output Schema
export const AgentPoolsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type AgentPoolsListOutput = typeof AgentPoolsListOutput.Type;

// The operation
/**
 * Gets a list of agent pools in the specified managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const AgentPoolsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentPoolsListInput,
  outputSchema: AgentPoolsListOutput,
}));
// Input Schema
export const AgentPoolsUpgradeNodeImageVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    agentPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/upgradeNodeImageVersion",
    }),
  );
export type AgentPoolsUpgradeNodeImageVersionInput =
  typeof AgentPoolsUpgradeNodeImageVersionInput.Type;

// Output Schema
export const AgentPoolsUpgradeNodeImageVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AgentPoolsUpgradeNodeImageVersionOutput =
  typeof AgentPoolsUpgradeNodeImageVersionOutput.Type;

// The operation
/**
 * Upgrades the node image version of an agent pool to the latest.
 *
 * Upgrading the node image version of an agent pool applies the newest OS and runtime updates to the nodes. AKS provides one new image per week with the latest updates. For more details on node image versions, see: https://docs.microsoft.com/azure/aks/node-image-upgrade
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param agentPoolName - The name of the agent pool.
 */
export const AgentPoolsUpgradeNodeImageVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AgentPoolsUpgradeNodeImageVersionInput,
    outputSchema: AgentPoolsUpgradeNodeImageVersionOutput,
  }));
// Input Schema
export const AutoUpgradeProfileOperationsGenerateUpdateRunInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    autoUpgradeProfileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles/{autoUpgradeProfileName}/generateUpdateRun",
    }),
  );
export type AutoUpgradeProfileOperationsGenerateUpdateRunInput =
  typeof AutoUpgradeProfileOperationsGenerateUpdateRunInput.Type;

// Output Schema
export const AutoUpgradeProfileOperationsGenerateUpdateRunOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
  });
export type AutoUpgradeProfileOperationsGenerateUpdateRunOutput =
  typeof AutoUpgradeProfileOperationsGenerateUpdateRunOutput.Type;

// The operation
/**
 * Generates an update run for a given auto upgrade profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 * @param autoUpgradeProfileName - The name of the AutoUpgradeProfile resource.
 */
export const AutoUpgradeProfileOperationsGenerateUpdateRun =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoUpgradeProfileOperationsGenerateUpdateRunInput,
    outputSchema: AutoUpgradeProfileOperationsGenerateUpdateRunOutput,
  }));
// Input Schema
export const AutoUpgradeProfilesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    autoUpgradeProfileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles/{autoUpgradeProfileName}",
    }),
  );
export type AutoUpgradeProfilesCreateOrUpdateInput =
  typeof AutoUpgradeProfilesCreateOrUpdateInput.Type;

// Output Schema
export const AutoUpgradeProfilesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AutoUpgradeProfilesCreateOrUpdateOutput =
  typeof AutoUpgradeProfilesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a AutoUpgradeProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param If-None-Match - The request should only proceed if no entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param autoUpgradeProfileName - The name of the AutoUpgradeProfile resource.
 */
export const AutoUpgradeProfilesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoUpgradeProfilesCreateOrUpdateInput,
    outputSchema: AutoUpgradeProfilesCreateOrUpdateOutput,
  }));
// Input Schema
export const AutoUpgradeProfilesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    autoUpgradeProfileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles/{autoUpgradeProfileName}",
    }),
  );
export type AutoUpgradeProfilesDeleteInput =
  typeof AutoUpgradeProfilesDeleteInput.Type;

// Output Schema
export const AutoUpgradeProfilesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AutoUpgradeProfilesDeleteOutput =
  typeof AutoUpgradeProfilesDeleteOutput.Type;

// The operation
/**
 * Delete a AutoUpgradeProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param autoUpgradeProfileName - The name of the AutoUpgradeProfile resource.
 */
export const AutoUpgradeProfilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutoUpgradeProfilesDeleteInput,
    outputSchema: AutoUpgradeProfilesDeleteOutput,
  }),
);
// Input Schema
export const AutoUpgradeProfilesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    autoUpgradeProfileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles/{autoUpgradeProfileName}",
    }),
  );
export type AutoUpgradeProfilesGetInput =
  typeof AutoUpgradeProfilesGetInput.Type;

// Output Schema
export const AutoUpgradeProfilesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AutoUpgradeProfilesGetOutput =
  typeof AutoUpgradeProfilesGetOutput.Type;

// The operation
/**
 * Get a AutoUpgradeProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 * @param autoUpgradeProfileName - The name of the AutoUpgradeProfile resource.
 */
export const AutoUpgradeProfilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AutoUpgradeProfilesGetInput,
    outputSchema: AutoUpgradeProfilesGetOutput,
  }),
);
// Input Schema
export const AutoUpgradeProfilesListByFleetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles",
    }),
  );
export type AutoUpgradeProfilesListByFleetInput =
  typeof AutoUpgradeProfilesListByFleetInput.Type;

// Output Schema
export const AutoUpgradeProfilesListByFleetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AutoUpgradeProfilesListByFleetOutput =
  typeof AutoUpgradeProfilesListByFleetOutput.Type;

// The operation
/**
 * List AutoUpgradeProfile resources by Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 */
export const AutoUpgradeProfilesListByFleet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AutoUpgradeProfilesListByFleetInput,
    outputSchema: AutoUpgradeProfilesListByFleetOutput,
  }));
// Input Schema
export const DeploymentSafeguardsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards/default",
    }),
  );
export type DeploymentSafeguardsCreateInput =
  typeof DeploymentSafeguardsCreateInput.Type;

// Output Schema
export const DeploymentSafeguardsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentSafeguardsCreateOutput =
  typeof DeploymentSafeguardsCreateOutput.Type;

// The operation
/**
 * Creates or updates a deploymentSafeguard
 *
 * @param api-version - The API version to use for this operation.
 */
export const DeploymentSafeguardsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentSafeguardsCreateInput,
    outputSchema: DeploymentSafeguardsCreateOutput,
  }),
);
// Input Schema
export const DeploymentSafeguardsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards/default",
    }),
  );
export type DeploymentSafeguardsDeleteInput =
  typeof DeploymentSafeguardsDeleteInput.Type;

// Output Schema
export const DeploymentSafeguardsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentSafeguardsDeleteOutput =
  typeof DeploymentSafeguardsDeleteOutput.Type;

// The operation
/**
 * Delete DeploymentSafeguards
 *
 * @param api-version - The API version to use for this operation.
 */
export const DeploymentSafeguardsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentSafeguardsDeleteInput,
    outputSchema: DeploymentSafeguardsDeleteOutput,
  }),
);
// Input Schema
export const DeploymentSafeguardsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards/default",
    }),
  );
export type DeploymentSafeguardsGetInput =
  typeof DeploymentSafeguardsGetInput.Type;

// Output Schema
export const DeploymentSafeguardsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentSafeguardsGetOutput =
  typeof DeploymentSafeguardsGetOutput.Type;

// The operation
/**
 * Fetch a deployment safeguard by name
 *
 * @param api-version - The API version to use for this operation.
 */
export const DeploymentSafeguardsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentSafeguardsGetInput,
    outputSchema: DeploymentSafeguardsGetOutput,
  }),
);
// Input Schema
export const DeploymentSafeguardsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceUri}/providers/Microsoft.ContainerService/deploymentSafeguards",
    }),
  );
export type DeploymentSafeguardsListInput =
  typeof DeploymentSafeguardsListInput.Type;

// Output Schema
export const DeploymentSafeguardsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeploymentSafeguardsListOutput =
  typeof DeploymentSafeguardsListOutput.Type;

// The operation
/**
 * List DeploymentSafeguards by parent resource
 *
 * @param api-version - The API version to use for this operation.
 */
export const DeploymentSafeguardsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentSafeguardsListInput,
    outputSchema: DeploymentSafeguardsListOutput,
  }),
);
// Input Schema
export const FleetMembersCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    fleetMemberName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members/{fleetMemberName}",
    }),
  );
export type FleetMembersCreateInput = typeof FleetMembersCreateInput.Type;

// Output Schema
export const FleetMembersCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FleetMembersCreateOutput = typeof FleetMembersCreateOutput.Type;

// The operation
/**
 * Create a FleetMember
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param If-None-Match - The request should only proceed if no entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param fleetMemberName - The name of the Fleet member resource.
 */
export const FleetMembersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetMembersCreateInput,
  outputSchema: FleetMembersCreateOutput,
}));
// Input Schema
export const FleetMembersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    fleetMemberName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members/{fleetMemberName}",
    }),
  );
export type FleetMembersDeleteInput = typeof FleetMembersDeleteInput.Type;

// Output Schema
export const FleetMembersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FleetMembersDeleteOutput = typeof FleetMembersDeleteOutput.Type;

// The operation
/**
 * Delete a FleetMember
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param fleetMemberName - The name of the Fleet member resource.
 */
export const FleetMembersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetMembersDeleteInput,
  outputSchema: FleetMembersDeleteOutput,
}));
// Input Schema
export const FleetMembersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  fleetMemberName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members/{fleetMemberName}",
  }),
);
export type FleetMembersGetInput = typeof FleetMembersGetInput.Type;

// Output Schema
export const FleetMembersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FleetMembersGetOutput = typeof FleetMembersGetOutput.Type;

// The operation
/**
 * Get a FleetMember
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 * @param fleetMemberName - The name of the Fleet member resource.
 */
export const FleetMembersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetMembersGetInput,
  outputSchema: FleetMembersGetOutput,
}));
// Input Schema
export const FleetMembersListByFleetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members",
    }),
  );
export type FleetMembersListByFleetInput =
  typeof FleetMembersListByFleetInput.Type;

// Output Schema
export const FleetMembersListByFleetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FleetMembersListByFleetOutput =
  typeof FleetMembersListByFleetOutput.Type;

// The operation
/**
 * List FleetMember resources by Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 */
export const FleetMembersListByFleet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetMembersListByFleetInput,
    outputSchema: FleetMembersListByFleetOutput,
  }),
);
// Input Schema
export const FleetMembersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    fleetMemberName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/members/{fleetMemberName}",
    }),
  );
export type FleetMembersUpdateInput = typeof FleetMembersUpdateInput.Type;

// Output Schema
export const FleetMembersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FleetMembersUpdateOutput = typeof FleetMembersUpdateOutput.Type;

// The operation
/**
 * Update a FleetMember
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param fleetMemberName - The name of the Fleet member resource.
 */
export const FleetMembersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetMembersUpdateInput,
  outputSchema: FleetMembersUpdateOutput,
}));
// Input Schema
export const FleetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}",
    }),
  );
export type FleetsCreateOrUpdateInput = typeof FleetsCreateOrUpdateInput.Type;

// Output Schema
export const FleetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type FleetsCreateOrUpdateOutput = typeof FleetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Fleet.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param If-None-Match - The request should only proceed if no entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 */
export const FleetsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetsCreateOrUpdateInput,
    outputSchema: FleetsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const FleetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}",
  }),
);
export type FleetsDeleteInput = typeof FleetsDeleteInput.Type;

// Output Schema
export const FleetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FleetsDeleteOutput = typeof FleetsDeleteOutput.Type;

// The operation
/**
 * Delete a Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 */
export const FleetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetsDeleteInput,
  outputSchema: FleetsDeleteOutput,
}));
// Input Schema
export const FleetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}",
  }),
);
export type FleetsGetInput = typeof FleetsGetInput.Type;

// Output Schema
export const FleetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FleetsGetOutput = typeof FleetsGetOutput.Type;

// The operation
/**
 * Gets a Fleet.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 */
export const FleetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetsGetInput,
  outputSchema: FleetsGetOutput,
}));
// Input Schema
export const FleetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets",
    }),
  );
export type FleetsListByResourceGroupInput =
  typeof FleetsListByResourceGroupInput.Type;

// Output Schema
export const FleetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FleetsListByResourceGroupOutput =
  typeof FleetsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists fleets in the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const FleetsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetsListByResourceGroupInput,
    outputSchema: FleetsListByResourceGroupOutput,
  }),
);
// Input Schema
export const FleetsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/fleets",
    }),
  );
export type FleetsListBySubscriptionInput =
  typeof FleetsListBySubscriptionInput.Type;

// Output Schema
export const FleetsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FleetsListBySubscriptionOutput =
  typeof FleetsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists fleets in the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const FleetsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetsListBySubscriptionInput,
    outputSchema: FleetsListBySubscriptionOutput,
  }),
);
// Input Schema
export const FleetsListCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/listCredentials",
    }),
  );
export type FleetsListCredentialsInput = typeof FleetsListCredentialsInput.Type;

// Output Schema
export const FleetsListCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kubeconfigs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type FleetsListCredentialsOutput =
  typeof FleetsListCredentialsOutput.Type;

// The operation
/**
 * Lists the user credentials of a Fleet.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 */
export const FleetsListCredentials = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetsListCredentialsInput,
    outputSchema: FleetsListCredentialsOutput,
  }),
);
// Input Schema
export const FleetsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}",
  }),
);
export type FleetsUpdateInput = typeof FleetsUpdateInput.Type;

// Output Schema
export const FleetsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FleetsUpdateOutput = typeof FleetsUpdateOutput.Type;

// The operation
/**
 * Update a Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 */
export const FleetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FleetsUpdateInput,
  outputSchema: FleetsUpdateOutput,
}));
// Input Schema
export const FleetUpdateStrategiesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    updateStrategyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateStrategies/{updateStrategyName}",
    }),
  );
export type FleetUpdateStrategiesCreateOrUpdateInput =
  typeof FleetUpdateStrategiesCreateOrUpdateInput.Type;

// Output Schema
export const FleetUpdateStrategiesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FleetUpdateStrategiesCreateOrUpdateOutput =
  typeof FleetUpdateStrategiesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a FleetUpdateStrategy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param If-None-Match - The request should only proceed if no entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param updateStrategyName - The name of the UpdateStrategy resource.
 */
export const FleetUpdateStrategiesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FleetUpdateStrategiesCreateOrUpdateInput,
    outputSchema: FleetUpdateStrategiesCreateOrUpdateOutput,
  }));
// Input Schema
export const FleetUpdateStrategiesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    updateStrategyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateStrategies/{updateStrategyName}",
    }),
  );
export type FleetUpdateStrategiesDeleteInput =
  typeof FleetUpdateStrategiesDeleteInput.Type;

// Output Schema
export const FleetUpdateStrategiesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FleetUpdateStrategiesDeleteOutput =
  typeof FleetUpdateStrategiesDeleteOutput.Type;

// The operation
/**
 * Delete a FleetUpdateStrategy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param updateStrategyName - The name of the UpdateStrategy resource.
 */
export const FleetUpdateStrategiesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetUpdateStrategiesDeleteInput,
    outputSchema: FleetUpdateStrategiesDeleteOutput,
  }),
);
// Input Schema
export const FleetUpdateStrategiesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    updateStrategyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateStrategies/{updateStrategyName}",
    }),
  );
export type FleetUpdateStrategiesGetInput =
  typeof FleetUpdateStrategiesGetInput.Type;

// Output Schema
export const FleetUpdateStrategiesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FleetUpdateStrategiesGetOutput =
  typeof FleetUpdateStrategiesGetOutput.Type;

// The operation
/**
 * Get a FleetUpdateStrategy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 * @param updateStrategyName - The name of the UpdateStrategy resource.
 */
export const FleetUpdateStrategiesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FleetUpdateStrategiesGetInput,
    outputSchema: FleetUpdateStrategiesGetOutput,
  }),
);
// Input Schema
export const FleetUpdateStrategiesListByFleetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateStrategies",
    }),
  );
export type FleetUpdateStrategiesListByFleetInput =
  typeof FleetUpdateStrategiesListByFleetInput.Type;

// Output Schema
export const FleetUpdateStrategiesListByFleetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FleetUpdateStrategiesListByFleetOutput =
  typeof FleetUpdateStrategiesListByFleetOutput.Type;

// The operation
/**
 * List FleetUpdateStrategy resources by Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 */
export const FleetUpdateStrategiesListByFleet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FleetUpdateStrategiesListByFleetInput,
    outputSchema: FleetUpdateStrategiesListByFleetOutput,
  }));
// Input Schema
export const MachinesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  agentPoolName: Schema.String.pipe(T.PathParam()),
  machineName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/machines/{machineName}",
  }),
);
export type MachinesGetInput = typeof MachinesGetInput.Type;

// Output Schema
export const MachinesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MachinesGetOutput = typeof MachinesGetOutput.Type;

// The operation
/**
 * Get a specific machine in the specified agent pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param agentPoolName - The name of the agent pool.
 * @param machineName - Host name of the machine.
 */
export const MachinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesGetInput,
  outputSchema: MachinesGetOutput,
}));
// Input Schema
export const MachinesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  agentPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/machines",
  }),
);
export type MachinesListInput = typeof MachinesListInput.Type;

// Output Schema
export const MachinesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type MachinesListOutput = typeof MachinesListOutput.Type;

// The operation
/**
 * Gets a list of machines in the specified agent pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param agentPoolName - The name of the agent pool.
 */
export const MachinesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesListInput,
  outputSchema: MachinesListOutput,
}));
// Input Schema
export const MaintenanceConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    configName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations/{configName}",
    }),
  );
export type MaintenanceConfigurationsCreateOrUpdateInput =
  typeof MaintenanceConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const MaintenanceConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenanceConfigurationsCreateOrUpdateOutput =
  typeof MaintenanceConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a maintenance configuration in the specified managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param configName - The name of the maintenance configuration. Supported values are 'default', 'aksManagedAutoUpgradeSchedule', or 'aksManagedNodeOSUpgradeSchedule'.
 */
export const MaintenanceConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsCreateOrUpdateInput,
    outputSchema: MaintenanceConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    configName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations/{configName}",
    }),
  );
export type MaintenanceConfigurationsDeleteInput =
  typeof MaintenanceConfigurationsDeleteInput.Type;

// Output Schema
export const MaintenanceConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MaintenanceConfigurationsDeleteOutput =
  typeof MaintenanceConfigurationsDeleteOutput.Type;

// The operation
/**
 * Deletes a maintenance configuration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param configName - The name of the maintenance configuration. Supported values are 'default', 'aksManagedAutoUpgradeSchedule', or 'aksManagedNodeOSUpgradeSchedule'.
 */
export const MaintenanceConfigurationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsDeleteInput,
    outputSchema: MaintenanceConfigurationsDeleteOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    configName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations/{configName}",
    }),
  );
export type MaintenanceConfigurationsGetInput =
  typeof MaintenanceConfigurationsGetInput.Type;

// Output Schema
export const MaintenanceConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenanceConfigurationsGetOutput =
  typeof MaintenanceConfigurationsGetOutput.Type;

// The operation
/**
 * Gets the specified maintenance configuration of a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param configName - The name of the maintenance configuration. Supported values are 'default', 'aksManagedAutoUpgradeSchedule', or 'aksManagedNodeOSUpgradeSchedule'.
 */
export const MaintenanceConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsGetInput,
    outputSchema: MaintenanceConfigurationsGetOutput,
  }));
// Input Schema
export const MaintenanceConfigurationsListByManagedClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/maintenanceConfigurations",
    }),
  );
export type MaintenanceConfigurationsListByManagedClusterInput =
  typeof MaintenanceConfigurationsListByManagedClusterInput.Type;

// Output Schema
export const MaintenanceConfigurationsListByManagedClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type MaintenanceConfigurationsListByManagedClusterOutput =
  typeof MaintenanceConfigurationsListByManagedClusterOutput.Type;

// The operation
/**
 * Gets a list of maintenance configurations in the specified managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const MaintenanceConfigurationsListByManagedCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceConfigurationsListByManagedClusterInput,
    outputSchema: MaintenanceConfigurationsListByManagedClusterOutput,
  }));
// Input Schema
export const ManagedClustersAbortLatestOperationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/abort",
    }),
  );
export type ManagedClustersAbortLatestOperationInput =
  typeof ManagedClustersAbortLatestOperationInput.Type;

// Output Schema
export const ManagedClustersAbortLatestOperationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedClustersAbortLatestOperationOutput =
  typeof ManagedClustersAbortLatestOperationOutput.Type;

// The operation
/**
 * Aborts last operation running on managed cluster.
 *
 * Aborts the currently running operation on the managed cluster. The Managed Cluster will be moved to a Canceling state and eventually to a Canceled state when cancellation finishes. If the operation completes before cancellation can take place, a 409 error code is returned.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersAbortLatestOperation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersAbortLatestOperationInput,
    outputSchema: ManagedClustersAbortLatestOperationOutput,
  }));
// Input Schema
export const ManagedClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
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
 * Creates or updates a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param if-match - The request should only proceed if an entity matches this string.
 * @param if-none-match - The request should only proceed if no entity matches this string.
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
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
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
 * Deletes a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param if-match - The request should only proceed if an entity matches this string.
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
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
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
 * Gets a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ManagedClustersGetInput,
  outputSchema: ManagedClustersGetOutput,
}));
// Input Schema
export const ManagedClustersGetCommandResultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    commandId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/commandResults/{commandId}",
    }),
  );
export type ManagedClustersGetCommandResultInput =
  typeof ManagedClustersGetCommandResultInput.Type;

// Output Schema
export const ManagedClustersGetCommandResultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(Schema.String),
        exitCode: Schema.optional(Schema.Number),
        startedAt: Schema.optional(Schema.String),
        finishedAt: Schema.optional(Schema.String),
        logs: Schema.optional(Schema.String),
        reason: Schema.optional(Schema.String),
      }),
    ),
  });
export type ManagedClustersGetCommandResultOutput =
  typeof ManagedClustersGetCommandResultOutput.Type;

// The operation
/**
 * Gets the results of a command which has been run on the Managed Cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param commandId - Id of the command.
 */
export const ManagedClustersGetCommandResult =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersGetCommandResultInput,
    outputSchema: ManagedClustersGetCommandResultOutput,
  }));
// Input Schema
export const ManagedClustersGetMeshRevisionProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    mode: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/meshRevisionProfiles/{mode}",
    }),
  );
export type ManagedClustersGetMeshRevisionProfileInput =
  typeof ManagedClustersGetMeshRevisionProfileInput.Type;

// Output Schema
export const ManagedClustersGetMeshRevisionProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedClustersGetMeshRevisionProfileOutput =
  typeof ManagedClustersGetMeshRevisionProfileOutput.Type;

// The operation
/**
 * Gets a mesh revision profile for a specified mesh in the specified location.
 *
 * Contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param mode - The mode of the mesh.
 */
export const ManagedClustersGetMeshRevisionProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersGetMeshRevisionProfileInput,
    outputSchema: ManagedClustersGetMeshRevisionProfileOutput,
  }));
// Input Schema
export const ManagedClustersGetMeshUpgradeProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    mode: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/meshUpgradeProfiles/{mode}",
    }),
  );
export type ManagedClustersGetMeshUpgradeProfileInput =
  typeof ManagedClustersGetMeshUpgradeProfileInput.Type;

// Output Schema
export const ManagedClustersGetMeshUpgradeProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedClustersGetMeshUpgradeProfileOutput =
  typeof ManagedClustersGetMeshUpgradeProfileOutput.Type;

// The operation
/**
 * Gets available upgrades for a service mesh in a cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param mode - The mode of the mesh.
 */
export const ManagedClustersGetMeshUpgradeProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersGetMeshUpgradeProfileInput,
    outputSchema: ManagedClustersGetMeshUpgradeProfileOutput,
  }));
// Input Schema
export const ManagedClustersGetUpgradeProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/upgradeProfiles/default",
    }),
  );
export type ManagedClustersGetUpgradeProfileInput =
  typeof ManagedClustersGetUpgradeProfileInput.Type;

// Output Schema
export const ManagedClustersGetUpgradeProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedClustersGetUpgradeProfileOutput =
  typeof ManagedClustersGetUpgradeProfileOutput.Type;

// The operation
/**
 * Gets the upgrade profile of a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersGetUpgradeProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersGetUpgradeProfileInput,
    outputSchema: ManagedClustersGetUpgradeProfileOutput,
  }));
// Input Schema
export const ManagedClustersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedClusters",
    }),
  );
export type ManagedClustersListInput = typeof ManagedClustersListInput.Type;

// Output Schema
export const ManagedClustersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedClustersListOutput = typeof ManagedClustersListOutput.Type;

// The operation
/**
 * Gets a list of managed clusters in the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ManagedClustersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ManagedClustersListInput,
  outputSchema: ManagedClustersListOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters",
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
 * Lists managed clusters in the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ManagedClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListByResourceGroupInput,
    outputSchema: ManagedClustersListByResourceGroupOutput,
  }));
// Input Schema
export const ManagedClustersListClusterAdminCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    "server-fqdn": Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterAdminCredential",
    }),
  );
export type ManagedClustersListClusterAdminCredentialsInput =
  typeof ManagedClustersListClusterAdminCredentialsInput.Type;

// Output Schema
export const ManagedClustersListClusterAdminCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kubeconfigs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ManagedClustersListClusterAdminCredentialsOutput =
  typeof ManagedClustersListClusterAdminCredentialsOutput.Type;

// The operation
/**
 * Lists the admin credentials of a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param server-fqdn - server fqdn type for credentials to be returned
 */
export const ManagedClustersListClusterAdminCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListClusterAdminCredentialsInput,
    outputSchema: ManagedClustersListClusterAdminCredentialsOutput,
  }));
// Input Schema
export const ManagedClustersListClusterMonitoringUserCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    "server-fqdn": Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterMonitoringUserCredential",
    }),
  );
export type ManagedClustersListClusterMonitoringUserCredentialsInput =
  typeof ManagedClustersListClusterMonitoringUserCredentialsInput.Type;

// Output Schema
export const ManagedClustersListClusterMonitoringUserCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kubeconfigs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ManagedClustersListClusterMonitoringUserCredentialsOutput =
  typeof ManagedClustersListClusterMonitoringUserCredentialsOutput.Type;

// The operation
/**
 * Lists the cluster monitoring user credentials of a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param server-fqdn - server fqdn type for credentials to be returned
 */
export const ManagedClustersListClusterMonitoringUserCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListClusterMonitoringUserCredentialsInput,
    outputSchema: ManagedClustersListClusterMonitoringUserCredentialsOutput,
  }));
// Input Schema
export const ManagedClustersListClusterUserCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    "server-fqdn": Schema.optional(Schema.String),
    format: Schema.optional(Schema.Literals(["azure", "exec"])),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/listClusterUserCredential",
    }),
  );
export type ManagedClustersListClusterUserCredentialsInput =
  typeof ManagedClustersListClusterUserCredentialsInput.Type;

// Output Schema
export const ManagedClustersListClusterUserCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kubeconfigs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ManagedClustersListClusterUserCredentialsOutput =
  typeof ManagedClustersListClusterUserCredentialsOutput.Type;

// The operation
/**
 * Lists the user credentials of a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param server-fqdn - server fqdn type for credentials to be returned
 * @param format - Only apply to AAD clusters, specifies the format of returned kubeconfig. Format 'azure' will return azure auth-provider kubeconfig; format 'exec' will return exec format kubeconfig, which requires kubelogin binary in the path.
 */
export const ManagedClustersListClusterUserCredentials =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListClusterUserCredentialsInput,
    outputSchema: ManagedClustersListClusterUserCredentialsOutput,
  }));
// Input Schema
export const ManagedClustersListKubernetesVersionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/kubernetesVersions",
    }),
  );
export type ManagedClustersListKubernetesVersionsInput =
  typeof ManagedClustersListKubernetesVersionsInput.Type;

// Output Schema
export const ManagedClustersListKubernetesVersionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    values: Schema.optional(
      Schema.Array(
        Schema.Struct({
          version: Schema.optional(Schema.String),
          capabilities: Schema.optional(
            Schema.Struct({
              supportPlan: Schema.optional(
                Schema.Array(
                  Schema.Literals(["KubernetesOfficial", "AKSLongTermSupport"]),
                ),
              ),
            }),
          ),
          isDefault: Schema.optional(Schema.Boolean),
          isPreview: Schema.optional(Schema.Boolean),
          patchVersions: Schema.optional(
            Schema.Record(
              Schema.String,
              Schema.Struct({
                upgrades: Schema.optional(Schema.Array(Schema.String)),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type ManagedClustersListKubernetesVersionsOutput =
  typeof ManagedClustersListKubernetesVersionsOutput.Type;

// The operation
/**
 * Gets a list of supported Kubernetes versions in the specified subscription.
 *
 * Contains extra metadata on the version, including supported patch versions, capabilities, available upgrades, and details on preview status of the version
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const ManagedClustersListKubernetesVersions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListKubernetesVersionsInput,
    outputSchema: ManagedClustersListKubernetesVersionsOutput,
  }));
// Input Schema
export const ManagedClustersListMeshRevisionProfilesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/meshRevisionProfiles",
    }),
  );
export type ManagedClustersListMeshRevisionProfilesInput =
  typeof ManagedClustersListMeshRevisionProfilesInput.Type;

// Output Schema
export const ManagedClustersListMeshRevisionProfilesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedClustersListMeshRevisionProfilesOutput =
  typeof ManagedClustersListMeshRevisionProfilesOutput.Type;

// The operation
/**
 * Lists mesh revision profiles for all meshes in the specified location.
 *
 * Contains extra metadata on each revision, including supported revisions, cluster compatibility and available upgrades
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const ManagedClustersListMeshRevisionProfiles =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListMeshRevisionProfilesInput,
    outputSchema: ManagedClustersListMeshRevisionProfilesOutput,
  }));
// Input Schema
export const ManagedClustersListMeshUpgradeProfilesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/meshUpgradeProfiles",
    }),
  );
export type ManagedClustersListMeshUpgradeProfilesInput =
  typeof ManagedClustersListMeshUpgradeProfilesInput.Type;

// Output Schema
export const ManagedClustersListMeshUpgradeProfilesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedClustersListMeshUpgradeProfilesOutput =
  typeof ManagedClustersListMeshUpgradeProfilesOutput.Type;

// The operation
/**
 * Lists available upgrades for all service meshes in a specific cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersListMeshUpgradeProfiles =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListMeshUpgradeProfilesInput,
    outputSchema: ManagedClustersListMeshUpgradeProfilesOutput,
  }));
// Input Schema
export const ManagedClustersListOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type ManagedClustersListOutboundNetworkDependenciesEndpointsInput =
  typeof ManagedClustersListOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const ManagedClustersListOutboundNetworkDependenciesEndpointsOutput =
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
export type ManagedClustersListOutboundNetworkDependenciesEndpointsOutput =
  typeof ManagedClustersListOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster.
 *
 * Gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified managed cluster. The operation returns properties of each egress endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersListOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersListOutboundNetworkDependenciesEndpointsInput,
    outputSchema: ManagedClustersListOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const ManagedClustersResetServicePrincipalProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resetServicePrincipalProfile",
    }),
  );
export type ManagedClustersResetServicePrincipalProfileInput =
  typeof ManagedClustersResetServicePrincipalProfileInput.Type;

// Output Schema
export const ManagedClustersResetServicePrincipalProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedClustersResetServicePrincipalProfileOutput =
  typeof ManagedClustersResetServicePrincipalProfileOutput.Type;

// The operation
/**
 * Reset the Service Principal Profile of a managed cluster.
 *
 * This action cannot be performed on a cluster that is not using a service principal
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersResetServicePrincipalProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersResetServicePrincipalProfileInput,
    outputSchema: ManagedClustersResetServicePrincipalProfileOutput,
  }));
// Input Schema
export const ManagedClustersRotateClusterCertificatesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateClusterCertificates",
    }),
  );
export type ManagedClustersRotateClusterCertificatesInput =
  typeof ManagedClustersRotateClusterCertificatesInput.Type;

// Output Schema
export const ManagedClustersRotateClusterCertificatesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedClustersRotateClusterCertificatesOutput =
  typeof ManagedClustersRotateClusterCertificatesOutput.Type;

// The operation
/**
 * Rotates the certificates of a managed cluster.
 *
 * See [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersRotateClusterCertificates =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersRotateClusterCertificatesInput,
    outputSchema: ManagedClustersRotateClusterCertificatesOutput,
  }));
// Input Schema
export const ManagedClustersRotateServiceAccountSigningKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/rotateServiceAccountSigningKeys",
    }),
  );
export type ManagedClustersRotateServiceAccountSigningKeysInput =
  typeof ManagedClustersRotateServiceAccountSigningKeysInput.Type;

// Output Schema
export const ManagedClustersRotateServiceAccountSigningKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedClustersRotateServiceAccountSigningKeysOutput =
  typeof ManagedClustersRotateServiceAccountSigningKeysOutput.Type;

// The operation
/**
 * Rotates the service account signing keys of a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersRotateServiceAccountSigningKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedClustersRotateServiceAccountSigningKeysInput,
    outputSchema: ManagedClustersRotateServiceAccountSigningKeysOutput,
  }));
// Input Schema
export const ManagedClustersRunCommandInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/runCommand",
    }),
  );
export type ManagedClustersRunCommandInput =
  typeof ManagedClustersRunCommandInput.Type;

// Output Schema
export const ManagedClustersRunCommandOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        provisioningState: Schema.optional(Schema.String),
        exitCode: Schema.optional(Schema.Number),
        startedAt: Schema.optional(Schema.String),
        finishedAt: Schema.optional(Schema.String),
        logs: Schema.optional(Schema.String),
        reason: Schema.optional(Schema.String),
      }),
    ),
  });
export type ManagedClustersRunCommandOutput =
  typeof ManagedClustersRunCommandOutput.Type;

// The operation
/**
 * Submits a command to run against the Managed Cluster.
 *
 * AKS will create a pod to run the command. This is primarily useful for private clusters. For more information see [AKS Run Command](https://docs.microsoft.com/azure/aks/private-clusters#aks-run-command-preview).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersRunCommand = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedClustersRunCommandInput,
    outputSchema: ManagedClustersRunCommandOutput,
  }),
);
// Input Schema
export const ManagedClustersStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/start",
    }),
  );
export type ManagedClustersStartInput = typeof ManagedClustersStartInput.Type;

// Output Schema
export const ManagedClustersStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedClustersStartOutput = typeof ManagedClustersStartOutput.Type;

// The operation
/**
 * Starts a previously stopped Managed Cluster
 *
 * See [starting a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about starting a cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedClustersStartInput,
    outputSchema: ManagedClustersStartOutput,
  }),
);
// Input Schema
export const ManagedClustersStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/stop",
    }),
  );
export type ManagedClustersStopInput = typeof ManagedClustersStopInput.Type;

// Output Schema
export const ManagedClustersStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedClustersStopOutput = typeof ManagedClustersStopOutput.Type;

// The operation
/**
 * Stops a Managed Cluster
 *
 * This can only be performed on Azure Virtual Machine Scale set backed clusters. Stopping a cluster stops the control plane and agent nodes entirely, while maintaining all object and cluster state. A cluster does not accrue charges while it is stopped. See [stopping a cluster](https://docs.microsoft.com/azure/aks/start-stop-cluster) for more details about stopping a cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedClustersStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ManagedClustersStopInput,
  outputSchema: ManagedClustersStopOutput,
}));
// Input Schema
export const ManagedClustersUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}",
    }),
  );
export type ManagedClustersUpdateTagsInput =
  typeof ManagedClustersUpdateTagsInput.Type;

// Output Schema
export const ManagedClustersUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedClustersUpdateTagsOutput =
  typeof ManagedClustersUpdateTagsOutput.Type;

// The operation
/**
 * Updates tags on a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param if-match - The request should only proceed if an entity matches this string.
 */
export const ManagedClustersUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedClustersUpdateTagsInput,
    outputSchema: ManagedClustersUpdateTagsOutput,
  }),
);
// Input Schema
export const ManagedNamespacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    managedNamespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}",
    }),
  );
export type ManagedNamespacesCreateOrUpdateInput =
  typeof ManagedNamespacesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedNamespacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedNamespacesCreateOrUpdateOutput =
  typeof ManagedNamespacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a namespace managed by ARM for the specified managed cluster. Users can configure aspects like resource quotas, network ingress/egress policies, and more. See aka.ms/aks/managed-namespaces for more details.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param managedNamespaceName - The name of the managed namespace.
 */
export const ManagedNamespacesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedNamespacesCreateOrUpdateInput,
    outputSchema: ManagedNamespacesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedNamespacesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    managedNamespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}",
    }),
  );
export type ManagedNamespacesDeleteInput =
  typeof ManagedNamespacesDeleteInput.Type;

// Output Schema
export const ManagedNamespacesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedNamespacesDeleteOutput =
  typeof ManagedNamespacesDeleteOutput.Type;

// The operation
/**
 * Deletes a namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param managedNamespaceName - The name of the managed namespace.
 */
export const ManagedNamespacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedNamespacesDeleteInput,
    outputSchema: ManagedNamespacesDeleteOutput,
  }),
);
// Input Schema
export const ManagedNamespacesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    managedNamespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}",
    }),
  );
export type ManagedNamespacesGetInput = typeof ManagedNamespacesGetInput.Type;

// Output Schema
export const ManagedNamespacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedNamespacesGetOutput = typeof ManagedNamespacesGetOutput.Type;

// The operation
/**
 * Gets the specified namespace of a managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param managedNamespaceName - The name of the managed namespace.
 */
export const ManagedNamespacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedNamespacesGetInput,
    outputSchema: ManagedNamespacesGetOutput,
  }),
);
// Input Schema
export const ManagedNamespacesListByManagedClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces",
    }),
  );
export type ManagedNamespacesListByManagedClusterInput =
  typeof ManagedNamespacesListByManagedClusterInput.Type;

// Output Schema
export const ManagedNamespacesListByManagedClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedNamespacesListByManagedClusterOutput =
  typeof ManagedNamespacesListByManagedClusterOutput.Type;

// The operation
/**
 * Gets a list of managed namespaces in the specified managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ManagedNamespacesListByManagedCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedNamespacesListByManagedClusterInput,
    outputSchema: ManagedNamespacesListByManagedClusterOutput,
  }));
// Input Schema
export const ManagedNamespacesListCredentialInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    managedNamespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}/listCredential",
    }),
  );
export type ManagedNamespacesListCredentialInput =
  typeof ManagedNamespacesListCredentialInput.Type;

// Output Schema
export const ManagedNamespacesListCredentialOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kubeconfigs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ManagedNamespacesListCredentialOutput =
  typeof ManagedNamespacesListCredentialOutput.Type;

// The operation
/**
 * Lists the credentials of a namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param managedNamespaceName - The name of the managed namespace.
 */
export const ManagedNamespacesListCredential =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedNamespacesListCredentialInput,
    outputSchema: ManagedNamespacesListCredentialOutput,
  }));
// Input Schema
export const ManagedNamespacesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    managedNamespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}",
    }),
  );
export type ManagedNamespacesUpdateInput =
  typeof ManagedNamespacesUpdateInput.Type;

// Output Schema
export const ManagedNamespacesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ManagedNamespacesUpdateOutput =
  typeof ManagedNamespacesUpdateOutput.Type;

// The operation
/**
 * Updates tags on a managed namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param managedNamespaceName - The name of the managed namespace.
 */
export const ManagedNamespacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedNamespacesUpdateInput,
    outputSchema: ManagedNamespacesUpdateOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ContainerService/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      origin: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      display: Schema.optional(
        Schema.Struct({
          operation: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
          provider: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Gets a list of operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes a private endpoint connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
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
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Gets the specified private endpoint connection.
 *
 * To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
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
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * Gets a list of private endpoint connections in the specified managed cluster.
 *
 * To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsUpdateInput =
  typeof PrivateEndpointConnectionsUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsUpdateOutput =
  typeof PrivateEndpointConnectionsUpdateOutput.Type;

// The operation
/**
 * Updates a private endpoint connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
 */
export const PrivateEndpointConnectionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsUpdateInput,
    outputSchema: PrivateEndpointConnectionsUpdateOutput,
  }));
// Input Schema
export const PrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/privateLinkResources",
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
          groupId: Schema.optional(Schema.String),
          requiredMembers: Schema.optional(Schema.Array(Schema.String)),
          privateLinkServiceID: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PrivateLinkResourcesListOutput =
  typeof PrivateLinkResourcesListOutput.Type;

// The operation
/**
 * Gets a list of private link resources in the specified managed cluster.
 *
 * To learn more about private clusters, see: https://docs.microsoft.com/azure/aks/private-clusters
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const PrivateLinkResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesListInput,
    outputSchema: PrivateLinkResourcesListOutput,
  }),
);
// Input Schema
export const ResolvePrivateLinkServiceIdPOSTInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/resolvePrivateLinkServiceId",
    }),
  );
export type ResolvePrivateLinkServiceIdPOSTInput =
  typeof ResolvePrivateLinkServiceIdPOSTInput.Type;

// Output Schema
export const ResolvePrivateLinkServiceIdPOSTOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    groupId: Schema.optional(Schema.String),
    requiredMembers: Schema.optional(Schema.Array(Schema.String)),
    privateLinkServiceID: Schema.optional(Schema.String),
  });
export type ResolvePrivateLinkServiceIdPOSTOutput =
  typeof ResolvePrivateLinkServiceIdPOSTOutput.Type;

// The operation
/**
 * Gets the private link service ID for the specified managed cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const ResolvePrivateLinkServiceIdPOST =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResolvePrivateLinkServiceIdPOSTInput,
    outputSchema: ResolvePrivateLinkServiceIdPOSTOutput,
  }));
// Input Schema
export const SnapshotsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}",
    }),
  );
export type SnapshotsCreateOrUpdateInput =
  typeof SnapshotsCreateOrUpdateInput.Type;

// Output Schema
export const SnapshotsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SnapshotsCreateOrUpdateOutput =
  typeof SnapshotsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a snapshot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const SnapshotsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnapshotsCreateOrUpdateInput,
    outputSchema: SnapshotsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SnapshotsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}",
  }),
);
export type SnapshotsDeleteInput = typeof SnapshotsDeleteInput.Type;

// Output Schema
export const SnapshotsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SnapshotsDeleteOutput = typeof SnapshotsDeleteOutput.Type;

// The operation
/**
 * Deletes a snapshot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const SnapshotsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsDeleteInput,
  outputSchema: SnapshotsDeleteOutput,
}));
// Input Schema
export const SnapshotsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}",
  }),
);
export type SnapshotsGetInput = typeof SnapshotsGetInput.Type;

// Output Schema
export const SnapshotsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SnapshotsGetOutput = typeof SnapshotsGetOutput.Type;

// The operation
/**
 * Gets a snapshot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const SnapshotsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsGetInput,
  outputSchema: SnapshotsGetOutput,
}));
// Input Schema
export const SnapshotsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/snapshots",
  }),
);
export type SnapshotsListInput = typeof SnapshotsListInput.Type;

// Output Schema
export const SnapshotsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type SnapshotsListOutput = typeof SnapshotsListOutput.Type;

// The operation
/**
 * Gets a list of snapshots in the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SnapshotsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsListInput,
  outputSchema: SnapshotsListOutput,
}));
// Input Schema
export const SnapshotsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots",
    }),
  );
export type SnapshotsListByResourceGroupInput =
  typeof SnapshotsListByResourceGroupInput.Type;

// Output Schema
export const SnapshotsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SnapshotsListByResourceGroupOutput =
  typeof SnapshotsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists snapshots in the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SnapshotsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SnapshotsListByResourceGroupInput,
    outputSchema: SnapshotsListByResourceGroupOutput,
  }));
// Input Schema
export const SnapshotsUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/snapshots/{resourceName}",
    }),
  );
export type SnapshotsUpdateTagsInput = typeof SnapshotsUpdateTagsInput.Type;

// Output Schema
export const SnapshotsUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SnapshotsUpdateTagsOutput = typeof SnapshotsUpdateTagsOutput.Type;

// The operation
/**
 * Updates tags on a snapshot.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const SnapshotsUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsUpdateTagsInput,
  outputSchema: SnapshotsUpdateTagsOutput,
}));
// Input Schema
export const TrustedAccessRoleBindingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    trustedAccessRoleBindingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}",
    }),
  );
export type TrustedAccessRoleBindingsCreateOrUpdateInput =
  typeof TrustedAccessRoleBindingsCreateOrUpdateInput.Type;

// Output Schema
export const TrustedAccessRoleBindingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TrustedAccessRoleBindingsCreateOrUpdateOutput =
  typeof TrustedAccessRoleBindingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a trusted access role binding
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param trustedAccessRoleBindingName - The name of trusted access role binding.
 */
export const TrustedAccessRoleBindingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TrustedAccessRoleBindingsCreateOrUpdateInput,
    outputSchema: TrustedAccessRoleBindingsCreateOrUpdateOutput,
  }));
// Input Schema
export const TrustedAccessRoleBindingsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    trustedAccessRoleBindingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}",
    }),
  );
export type TrustedAccessRoleBindingsDeleteInput =
  typeof TrustedAccessRoleBindingsDeleteInput.Type;

// Output Schema
export const TrustedAccessRoleBindingsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TrustedAccessRoleBindingsDeleteOutput =
  typeof TrustedAccessRoleBindingsDeleteOutput.Type;

// The operation
/**
 * Delete a trusted access role binding.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param trustedAccessRoleBindingName - The name of trusted access role binding.
 */
export const TrustedAccessRoleBindingsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TrustedAccessRoleBindingsDeleteInput,
    outputSchema: TrustedAccessRoleBindingsDeleteOutput,
  }));
// Input Schema
export const TrustedAccessRoleBindingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    trustedAccessRoleBindingName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings/{trustedAccessRoleBindingName}",
    }),
  );
export type TrustedAccessRoleBindingsGetInput =
  typeof TrustedAccessRoleBindingsGetInput.Type;

// Output Schema
export const TrustedAccessRoleBindingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TrustedAccessRoleBindingsGetOutput =
  typeof TrustedAccessRoleBindingsGetOutput.Type;

// The operation
/**
 * Get a trusted access role binding.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 * @param trustedAccessRoleBindingName - The name of trusted access role binding.
 */
export const TrustedAccessRoleBindingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TrustedAccessRoleBindingsGetInput,
    outputSchema: TrustedAccessRoleBindingsGetOutput,
  }));
// Input Schema
export const TrustedAccessRoleBindingsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/trustedAccessRoleBindings",
    }),
  );
export type TrustedAccessRoleBindingsListInput =
  typeof TrustedAccessRoleBindingsListInput.Type;

// Output Schema
export const TrustedAccessRoleBindingsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TrustedAccessRoleBindingsListOutput =
  typeof TrustedAccessRoleBindingsListOutput.Type;

// The operation
/**
 * List trusted access role bindings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the managed cluster resource.
 */
export const TrustedAccessRoleBindingsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TrustedAccessRoleBindingsListInput,
    outputSchema: TrustedAccessRoleBindingsListOutput,
  }));
// Input Schema
export const TrustedAccessRolesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/trustedAccessRoles",
    }),
  );
export type TrustedAccessRolesListInput =
  typeof TrustedAccessRolesListInput.Type;

// Output Schema
export const TrustedAccessRolesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        sourceResourceType: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        rules: Schema.optional(
          Schema.Array(
            Schema.Struct({
              verbs: Schema.optional(Schema.Array(Schema.String)),
              apiGroups: Schema.optional(Schema.Array(Schema.String)),
              resources: Schema.optional(Schema.Array(Schema.String)),
              resourceNames: Schema.optional(Schema.Array(Schema.String)),
              nonResourceURLs: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TrustedAccessRolesListOutput =
  typeof TrustedAccessRolesListOutput.Type;

// The operation
/**
 * List supported trusted access roles.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const TrustedAccessRolesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TrustedAccessRolesListInput,
    outputSchema: TrustedAccessRolesListOutput,
  }),
);
// Input Schema
export const UpdateRunsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    updateRunName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}",
    }),
  );
export type UpdateRunsCreateOrUpdateInput =
  typeof UpdateRunsCreateOrUpdateInput.Type;

// Output Schema
export const UpdateRunsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UpdateRunsCreateOrUpdateOutput =
  typeof UpdateRunsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a UpdateRun
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param If-None-Match - The request should only proceed if no entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param updateRunName - The name of the UpdateRun resource.
 */
export const UpdateRunsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateRunsCreateOrUpdateInput,
    outputSchema: UpdateRunsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const UpdateRunsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  updateRunName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}",
  }),
);
export type UpdateRunsDeleteInput = typeof UpdateRunsDeleteInput.Type;

// Output Schema
export const UpdateRunsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateRunsDeleteOutput = typeof UpdateRunsDeleteOutput.Type;

// The operation
/**
 * Delete a UpdateRun
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param updateRunName - The name of the UpdateRun resource.
 */
export const UpdateRunsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRunsDeleteInput,
  outputSchema: UpdateRunsDeleteOutput,
}));
// Input Schema
export const UpdateRunsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  updateRunName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}",
  }),
);
export type UpdateRunsGetInput = typeof UpdateRunsGetInput.Type;

// Output Schema
export const UpdateRunsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type UpdateRunsGetOutput = typeof UpdateRunsGetOutput.Type;

// The operation
/**
 * Get a UpdateRun
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 * @param updateRunName - The name of the UpdateRun resource.
 */
export const UpdateRunsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRunsGetInput,
  outputSchema: UpdateRunsGetOutput,
}));
// Input Schema
export const UpdateRunsListByFleetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fleetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns",
    }),
  );
export type UpdateRunsListByFleetInput = typeof UpdateRunsListByFleetInput.Type;

// Output Schema
export const UpdateRunsListByFleetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type UpdateRunsListByFleetOutput =
  typeof UpdateRunsListByFleetOutput.Type;

// The operation
/**
 * List UpdateRun resources by Fleet
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fleetName - The name of the Fleet resource.
 */
export const UpdateRunsListByFleet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateRunsListByFleetInput,
    outputSchema: UpdateRunsListByFleetOutput,
  }),
);
// Input Schema
export const UpdateRunsSkipInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  updateRunName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}/skip",
  }),
);
export type UpdateRunsSkipInput = typeof UpdateRunsSkipInput.Type;

// Output Schema
export const UpdateRunsSkipOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type UpdateRunsSkipOutput = typeof UpdateRunsSkipOutput.Type;

// The operation
/**
 * Skips one or a combination of member/group/stage/afterStageWait(s) of an update run.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param updateRunName - The name of the UpdateRun resource.
 */
export const UpdateRunsSkip = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRunsSkipInput,
  outputSchema: UpdateRunsSkipOutput,
}));
// Input Schema
export const UpdateRunsStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  updateRunName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}/start",
  }),
);
export type UpdateRunsStartInput = typeof UpdateRunsStartInput.Type;

// Output Schema
export const UpdateRunsStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type UpdateRunsStartOutput = typeof UpdateRunsStartOutput.Type;

// The operation
/**
 * Starts an UpdateRun.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param updateRunName - The name of the UpdateRun resource.
 */
export const UpdateRunsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRunsStartInput,
  outputSchema: UpdateRunsStartOutput,
}));
// Input Schema
export const UpdateRunsStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fleetName: Schema.String.pipe(T.PathParam()),
  updateRunName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}/stop",
  }),
);
export type UpdateRunsStopInput = typeof UpdateRunsStopInput.Type;

// Output Schema
export const UpdateRunsStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type UpdateRunsStopOutput = typeof UpdateRunsStopOutput.Type;

// The operation
/**
 * Stops an UpdateRun.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param If-Match - The request should only proceed if an entity matches this string.
 * @param fleetName - The name of the Fleet resource.
 * @param updateRunName - The name of the UpdateRun resource.
 */
export const UpdateRunsStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UpdateRunsStopInput,
  outputSchema: UpdateRunsStopOutput,
}));
