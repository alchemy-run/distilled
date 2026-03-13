/**
 * Azure Networkcloud API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AgentPoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    agentPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}",
    }),
  );
export type AgentPoolsCreateOrUpdateInput =
  typeof AgentPoolsCreateOrUpdateInput.Type;

// Output Schema
export const AgentPoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AgentPoolsCreateOrUpdateOutput =
  typeof AgentPoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new Kubernetes cluster agent pool or update the properties of the existing one.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 * @param agentPoolName - The name of the Kubernetes cluster agent pool.
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
  kubernetesClusterName: Schema.String.pipe(T.PathParam()),
  agentPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}",
  }),
);
export type AgentPoolsDeleteInput = typeof AgentPoolsDeleteInput.Type;

// Output Schema
export const AgentPoolsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AgentPoolsDeleteOutput = typeof AgentPoolsDeleteOutput.Type;

// The operation
/**
 * Delete the provided Kubernetes cluster agent pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 * @param agentPoolName - The name of the Kubernetes cluster agent pool.
 */
export const AgentPoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentPoolsDeleteInput,
  outputSchema: AgentPoolsDeleteOutput,
}));
// Input Schema
export const AgentPoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  kubernetesClusterName: Schema.String.pipe(T.PathParam()),
  agentPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}",
  }),
);
export type AgentPoolsGetInput = typeof AgentPoolsGetInput.Type;

// Output Schema
export const AgentPoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AgentPoolsGetOutput = typeof AgentPoolsGetOutput.Type;

// The operation
/**
 * Get properties of the provided Kubernetes cluster agent pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 * @param agentPoolName - The name of the Kubernetes cluster agent pool.
 */
export const AgentPoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentPoolsGetInput,
  outputSchema: AgentPoolsGetOutput,
}));
// Input Schema
export const AgentPoolsListByKubernetesClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools",
    }),
  );
export type AgentPoolsListByKubernetesClusterInput =
  typeof AgentPoolsListByKubernetesClusterInput.Type;

// Output Schema
export const AgentPoolsListByKubernetesClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AgentPoolsListByKubernetesClusterOutput =
  typeof AgentPoolsListByKubernetesClusterOutput.Type;

// The operation
/**
 * Get a list of agent pools for the provided Kubernetes cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 */
export const AgentPoolsListByKubernetesCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AgentPoolsListByKubernetesClusterInput,
    outputSchema: AgentPoolsListByKubernetesClusterOutput,
  }));
// Input Schema
export const AgentPoolsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  kubernetesClusterName: Schema.String.pipe(T.PathParam()),
  agentPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/agentPools/{agentPoolName}",
  }),
);
export type AgentPoolsUpdateInput = typeof AgentPoolsUpdateInput.Type;

// Output Schema
export const AgentPoolsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type AgentPoolsUpdateOutput = typeof AgentPoolsUpdateOutput.Type;

// The operation
/**
 * Patch the properties of the provided Kubernetes cluster agent pool, or update the tags associated with the Kubernetes cluster agent pool. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 * @param agentPoolName - The name of the Kubernetes cluster agent pool.
 */
export const AgentPoolsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentPoolsUpdateInput,
  outputSchema: AgentPoolsUpdateOutput,
}));
// Input Schema
export const BareMetalMachineKeySetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineKeySetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bareMetalMachineKeySets/{bareMetalMachineKeySetName}",
    }),
  );
export type BareMetalMachineKeySetsCreateOrUpdateInput =
  typeof BareMetalMachineKeySetsCreateOrUpdateInput.Type;

// Output Schema
export const BareMetalMachineKeySetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BareMetalMachineKeySetsCreateOrUpdateOutput =
  typeof BareMetalMachineKeySetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new bare metal machine key set or update the existing one for the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param bareMetalMachineKeySetName - The name of the bare metal machine key set.
 */
export const BareMetalMachineKeySetsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachineKeySetsCreateOrUpdateInput,
    outputSchema: BareMetalMachineKeySetsCreateOrUpdateOutput,
  }));
// Input Schema
export const BareMetalMachineKeySetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineKeySetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bareMetalMachineKeySets/{bareMetalMachineKeySetName}",
    }),
  );
export type BareMetalMachineKeySetsDeleteInput =
  typeof BareMetalMachineKeySetsDeleteInput.Type;

// Output Schema
export const BareMetalMachineKeySetsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachineKeySetsDeleteOutput =
  typeof BareMetalMachineKeySetsDeleteOutput.Type;

// The operation
/**
 * Delete the bare metal machine key set of the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param bareMetalMachineKeySetName - The name of the bare metal machine key set.
 */
export const BareMetalMachineKeySetsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachineKeySetsDeleteInput,
    outputSchema: BareMetalMachineKeySetsDeleteOutput,
  }));
// Input Schema
export const BareMetalMachineKeySetsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineKeySetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bareMetalMachineKeySets/{bareMetalMachineKeySetName}",
    }),
  );
export type BareMetalMachineKeySetsGetInput =
  typeof BareMetalMachineKeySetsGetInput.Type;

// Output Schema
export const BareMetalMachineKeySetsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BareMetalMachineKeySetsGetOutput =
  typeof BareMetalMachineKeySetsGetOutput.Type;

// The operation
/**
 * Get bare metal machine key set of the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param bareMetalMachineKeySetName - The name of the bare metal machine key set.
 */
export const BareMetalMachineKeySetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachineKeySetsGetInput,
    outputSchema: BareMetalMachineKeySetsGetOutput,
  }),
);
// Input Schema
export const BareMetalMachineKeySetsListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bareMetalMachineKeySets",
    }),
  );
export type BareMetalMachineKeySetsListByClusterInput =
  typeof BareMetalMachineKeySetsListByClusterInput.Type;

// Output Schema
export const BareMetalMachineKeySetsListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BareMetalMachineKeySetsListByClusterOutput =
  typeof BareMetalMachineKeySetsListByClusterOutput.Type;

// The operation
/**
 * Get a list of bare metal machine key sets for the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const BareMetalMachineKeySetsListByCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachineKeySetsListByClusterInput,
    outputSchema: BareMetalMachineKeySetsListByClusterOutput,
  }));
// Input Schema
export const BareMetalMachineKeySetsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineKeySetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bareMetalMachineKeySets/{bareMetalMachineKeySetName}",
    }),
  );
export type BareMetalMachineKeySetsUpdateInput =
  typeof BareMetalMachineKeySetsUpdateInput.Type;

// Output Schema
export const BareMetalMachineKeySetsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BareMetalMachineKeySetsUpdateOutput =
  typeof BareMetalMachineKeySetsUpdateOutput.Type;

// The operation
/**
 * Patch properties of bare metal machine key set for the provided cluster, or update the tags associated with it. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param bareMetalMachineKeySetName - The name of the bare metal machine key set.
 */
export const BareMetalMachineKeySetsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachineKeySetsUpdateInput,
    outputSchema: BareMetalMachineKeySetsUpdateOutput,
  }));
// Input Schema
export const BareMetalMachinesCordonInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/cordon",
    }),
  );
export type BareMetalMachinesCordonInput =
  typeof BareMetalMachinesCordonInput.Type;

// Output Schema
export const BareMetalMachinesCordonOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesCordonOutput =
  typeof BareMetalMachinesCordonOutput.Type;

// The operation
/**
 * Cordon the provided bare metal machine's Kubernetes node.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesCordon = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesCordonInput,
    outputSchema: BareMetalMachinesCordonOutput,
  }),
);
// Input Schema
export const BareMetalMachinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}",
    }),
  );
export type BareMetalMachinesCreateOrUpdateInput =
  typeof BareMetalMachinesCreateOrUpdateInput.Type;

// Output Schema
export const BareMetalMachinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BareMetalMachinesCreateOrUpdateOutput =
  typeof BareMetalMachinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new bare metal machine or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachinesCreateOrUpdateInput,
    outputSchema: BareMetalMachinesCreateOrUpdateOutput,
  }));
// Input Schema
export const BareMetalMachinesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}",
    }),
  );
export type BareMetalMachinesDeleteInput =
  typeof BareMetalMachinesDeleteInput.Type;

// Output Schema
export const BareMetalMachinesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesDeleteOutput =
  typeof BareMetalMachinesDeleteOutput.Type;

// The operation
/**
 * Delete the provided bare metal machine. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesDeleteInput,
    outputSchema: BareMetalMachinesDeleteOutput,
  }),
);
// Input Schema
export const BareMetalMachinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}",
    }),
  );
export type BareMetalMachinesGetInput = typeof BareMetalMachinesGetInput.Type;

// Output Schema
export const BareMetalMachinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BareMetalMachinesGetOutput = typeof BareMetalMachinesGetOutput.Type;

// The operation
/**
 * Get properties of the provided bare metal machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesGetInput,
    outputSchema: BareMetalMachinesGetOutput,
  }),
);
// Input Schema
export const BareMetalMachinesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines",
    }),
  );
export type BareMetalMachinesListByResourceGroupInput =
  typeof BareMetalMachinesListByResourceGroupInput.Type;

// Output Schema
export const BareMetalMachinesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BareMetalMachinesListByResourceGroupOutput =
  typeof BareMetalMachinesListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of bare metal machines in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const BareMetalMachinesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachinesListByResourceGroupInput,
    outputSchema: BareMetalMachinesListByResourceGroupOutput,
  }));
// Input Schema
export const BareMetalMachinesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/bareMetalMachines",
    }),
  );
export type BareMetalMachinesListBySubscriptionInput =
  typeof BareMetalMachinesListBySubscriptionInput.Type;

// Output Schema
export const BareMetalMachinesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BareMetalMachinesListBySubscriptionOutput =
  typeof BareMetalMachinesListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of bare metal machines in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const BareMetalMachinesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachinesListBySubscriptionInput,
    outputSchema: BareMetalMachinesListBySubscriptionOutput,
  }));
// Input Schema
export const BareMetalMachinesPowerOffInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/powerOff",
    }),
  );
export type BareMetalMachinesPowerOffInput =
  typeof BareMetalMachinesPowerOffInput.Type;

// Output Schema
export const BareMetalMachinesPowerOffOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesPowerOffOutput =
  typeof BareMetalMachinesPowerOffOutput.Type;

// The operation
/**
 * Power off the provided bare metal machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesPowerOff = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesPowerOffInput,
    outputSchema: BareMetalMachinesPowerOffOutput,
  }),
);
// Input Schema
export const BareMetalMachinesReimageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/reimage",
    }),
  );
export type BareMetalMachinesReimageInput =
  typeof BareMetalMachinesReimageInput.Type;

// Output Schema
export const BareMetalMachinesReimageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesReimageOutput =
  typeof BareMetalMachinesReimageOutput.Type;

// The operation
/**
 * Reimage the provided bare metal machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesReimage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesReimageInput,
    outputSchema: BareMetalMachinesReimageOutput,
  }),
);
// Input Schema
export const BareMetalMachinesReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/replace",
    }),
  );
export type BareMetalMachinesReplaceInput =
  typeof BareMetalMachinesReplaceInput.Type;

// Output Schema
export const BareMetalMachinesReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesReplaceOutput =
  typeof BareMetalMachinesReplaceOutput.Type;

// The operation
/**
 * Replace the provided bare metal machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesReplaceInput,
    outputSchema: BareMetalMachinesReplaceOutput,
  }),
);
// Input Schema
export const BareMetalMachinesRestartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/restart",
    }),
  );
export type BareMetalMachinesRestartInput =
  typeof BareMetalMachinesRestartInput.Type;

// Output Schema
export const BareMetalMachinesRestartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesRestartOutput =
  typeof BareMetalMachinesRestartOutput.Type;

// The operation
/**
 * Restart the provided bare metal machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesRestartInput,
    outputSchema: BareMetalMachinesRestartOutput,
  }),
);
// Input Schema
export const BareMetalMachinesRunCommandInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runCommand",
    }),
  );
export type BareMetalMachinesRunCommandInput =
  typeof BareMetalMachinesRunCommandInput.Type;

// Output Schema
export const BareMetalMachinesRunCommandOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesRunCommandOutput =
  typeof BareMetalMachinesRunCommandOutput.Type;

// The operation
/**
 * Run the command or the script on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesRunCommand = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesRunCommandInput,
    outputSchema: BareMetalMachinesRunCommandOutput,
  }),
);
// Input Schema
export const BareMetalMachinesRunDataExtractsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runDataExtracts",
    }),
  );
export type BareMetalMachinesRunDataExtractsInput =
  typeof BareMetalMachinesRunDataExtractsInput.Type;

// Output Schema
export const BareMetalMachinesRunDataExtractsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesRunDataExtractsOutput =
  typeof BareMetalMachinesRunDataExtractsOutput.Type;

// The operation
/**
 * Run one or more data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesRunDataExtracts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachinesRunDataExtractsInput,
    outputSchema: BareMetalMachinesRunDataExtractsOutput,
  }));
// Input Schema
export const BareMetalMachinesRunDataExtractsRestrictedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runDataExtractsRestricted",
    }),
  );
export type BareMetalMachinesRunDataExtractsRestrictedInput =
  typeof BareMetalMachinesRunDataExtractsRestrictedInput.Type;

// Output Schema
export const BareMetalMachinesRunDataExtractsRestrictedOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesRunDataExtractsRestrictedOutput =
  typeof BareMetalMachinesRunDataExtractsRestrictedOutput.Type;

// The operation
/**
 * Run one or more restricted data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesRunDataExtractsRestricted =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachinesRunDataExtractsRestrictedInput,
    outputSchema: BareMetalMachinesRunDataExtractsRestrictedOutput,
  }));
// Input Schema
export const BareMetalMachinesRunReadCommandsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/runReadCommands",
    }),
  );
export type BareMetalMachinesRunReadCommandsInput =
  typeof BareMetalMachinesRunReadCommandsInput.Type;

// Output Schema
export const BareMetalMachinesRunReadCommandsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesRunReadCommandsOutput =
  typeof BareMetalMachinesRunReadCommandsOutput.Type;

// The operation
/**
 * Run one or more read-only commands on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesRunReadCommands =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BareMetalMachinesRunReadCommandsInput,
    outputSchema: BareMetalMachinesRunReadCommandsOutput,
  }));
// Input Schema
export const BareMetalMachinesStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/start",
    }),
  );
export type BareMetalMachinesStartInput =
  typeof BareMetalMachinesStartInput.Type;

// Output Schema
export const BareMetalMachinesStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesStartOutput =
  typeof BareMetalMachinesStartOutput.Type;

// The operation
/**
 * Start the provided bare metal machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesStartInput,
    outputSchema: BareMetalMachinesStartOutput,
  }),
);
// Input Schema
export const BareMetalMachinesUncordonInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}/uncordon",
    }),
  );
export type BareMetalMachinesUncordonInput =
  typeof BareMetalMachinesUncordonInput.Type;

// Output Schema
export const BareMetalMachinesUncordonOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BareMetalMachinesUncordonOutput =
  typeof BareMetalMachinesUncordonOutput.Type;

// The operation
/**
 * Uncordon the provided bare metal machine's Kubernetes node.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesUncordon = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesUncordonInput,
    outputSchema: BareMetalMachinesUncordonOutput,
  }),
);
// Input Schema
export const BareMetalMachinesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    bareMetalMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/bareMetalMachines/{bareMetalMachineName}",
    }),
  );
export type BareMetalMachinesUpdateInput =
  typeof BareMetalMachinesUpdateInput.Type;

// Output Schema
export const BareMetalMachinesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BareMetalMachinesUpdateOutput =
  typeof BareMetalMachinesUpdateOutput.Type;

// The operation
/**
 * Patch properties of the provided bare metal machine, or update tags associated with the bare metal machine. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param bareMetalMachineName - The name of the bare metal machine.
 */
export const BareMetalMachinesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BareMetalMachinesUpdateInput,
    outputSchema: BareMetalMachinesUpdateOutput,
  }),
);
// Input Schema
export const BmcKeySetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    bmcKeySetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bmcKeySets/{bmcKeySetName}",
    }),
  );
export type BmcKeySetsCreateOrUpdateInput =
  typeof BmcKeySetsCreateOrUpdateInput.Type;

// Output Schema
export const BmcKeySetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BmcKeySetsCreateOrUpdateOutput =
  typeof BmcKeySetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new baseboard management controller key set or update the existing one for the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param bmcKeySetName - The name of the baseboard management controller key set.
 */
export const BmcKeySetsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BmcKeySetsCreateOrUpdateInput,
    outputSchema: BmcKeySetsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const BmcKeySetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  bmcKeySetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bmcKeySets/{bmcKeySetName}",
  }),
);
export type BmcKeySetsDeleteInput = typeof BmcKeySetsDeleteInput.Type;

// Output Schema
export const BmcKeySetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BmcKeySetsDeleteOutput = typeof BmcKeySetsDeleteOutput.Type;

// The operation
/**
 * Delete the baseboard management controller key set of the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param bmcKeySetName - The name of the baseboard management controller key set.
 */
export const BmcKeySetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BmcKeySetsDeleteInput,
  outputSchema: BmcKeySetsDeleteOutput,
}));
// Input Schema
export const BmcKeySetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  bmcKeySetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bmcKeySets/{bmcKeySetName}",
  }),
);
export type BmcKeySetsGetInput = typeof BmcKeySetsGetInput.Type;

// Output Schema
export const BmcKeySetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type BmcKeySetsGetOutput = typeof BmcKeySetsGetOutput.Type;

// The operation
/**
 * Get baseboard management controller key set of the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param bmcKeySetName - The name of the baseboard management controller key set.
 */
export const BmcKeySetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BmcKeySetsGetInput,
  outputSchema: BmcKeySetsGetOutput,
}));
// Input Schema
export const BmcKeySetsListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bmcKeySets",
    }),
  );
export type BmcKeySetsListByClusterInput =
  typeof BmcKeySetsListByClusterInput.Type;

// Output Schema
export const BmcKeySetsListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BmcKeySetsListByClusterOutput =
  typeof BmcKeySetsListByClusterOutput.Type;

// The operation
/**
 * Get a list of baseboard management controller key sets for the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const BmcKeySetsListByCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BmcKeySetsListByClusterInput,
    outputSchema: BmcKeySetsListByClusterOutput,
  }),
);
// Input Schema
export const BmcKeySetsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  bmcKeySetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/bmcKeySets/{bmcKeySetName}",
  }),
);
export type BmcKeySetsUpdateInput = typeof BmcKeySetsUpdateInput.Type;

// Output Schema
export const BmcKeySetsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type BmcKeySetsUpdateOutput = typeof BmcKeySetsUpdateOutput.Type;

// The operation
/**
 * Patch properties of baseboard management controller key set for the provided cluster, or update the tags associated with it. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param bmcKeySetName - The name of the baseboard management controller key set.
 */
export const BmcKeySetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BmcKeySetsUpdateInput,
  outputSchema: BmcKeySetsUpdateOutput,
}));
// Input Schema
export const CloudServicesNetworksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudServicesNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/cloudServicesNetworks/{cloudServicesNetworkName}",
    }),
  );
export type CloudServicesNetworksCreateOrUpdateInput =
  typeof CloudServicesNetworksCreateOrUpdateInput.Type;

// Output Schema
export const CloudServicesNetworksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudServicesNetworksCreateOrUpdateOutput =
  typeof CloudServicesNetworksCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new cloud services network or update the properties of the existing cloud services network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudServicesNetworkName - The name of the cloud services network.
 */
export const CloudServicesNetworksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudServicesNetworksCreateOrUpdateInput,
    outputSchema: CloudServicesNetworksCreateOrUpdateOutput,
  }));
// Input Schema
export const CloudServicesNetworksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudServicesNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/cloudServicesNetworks/{cloudServicesNetworkName}",
    }),
  );
export type CloudServicesNetworksDeleteInput =
  typeof CloudServicesNetworksDeleteInput.Type;

// Output Schema
export const CloudServicesNetworksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CloudServicesNetworksDeleteOutput =
  typeof CloudServicesNetworksDeleteOutput.Type;

// The operation
/**
 * Delete the provided cloud services network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudServicesNetworkName - The name of the cloud services network.
 */
export const CloudServicesNetworksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudServicesNetworksDeleteInput,
    outputSchema: CloudServicesNetworksDeleteOutput,
  }),
);
// Input Schema
export const CloudServicesNetworksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudServicesNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/cloudServicesNetworks/{cloudServicesNetworkName}",
    }),
  );
export type CloudServicesNetworksGetInput =
  typeof CloudServicesNetworksGetInput.Type;

// Output Schema
export const CloudServicesNetworksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudServicesNetworksGetOutput =
  typeof CloudServicesNetworksGetOutput.Type;

// The operation
/**
 * Get properties of the provided cloud services network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudServicesNetworkName - The name of the cloud services network.
 */
export const CloudServicesNetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudServicesNetworksGetInput,
    outputSchema: CloudServicesNetworksGetOutput,
  }),
);
// Input Schema
export const CloudServicesNetworksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/cloudServicesNetworks",
    }),
  );
export type CloudServicesNetworksListByResourceGroupInput =
  typeof CloudServicesNetworksListByResourceGroupInput.Type;

// Output Schema
export const CloudServicesNetworksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudServicesNetworksListByResourceGroupOutput =
  typeof CloudServicesNetworksListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of cloud services networks in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CloudServicesNetworksListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudServicesNetworksListByResourceGroupInput,
    outputSchema: CloudServicesNetworksListByResourceGroupOutput,
  }));
// Input Schema
export const CloudServicesNetworksListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/cloudServicesNetworks",
    }),
  );
export type CloudServicesNetworksListBySubscriptionInput =
  typeof CloudServicesNetworksListBySubscriptionInput.Type;

// Output Schema
export const CloudServicesNetworksListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CloudServicesNetworksListBySubscriptionOutput =
  typeof CloudServicesNetworksListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of cloud services networks in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CloudServicesNetworksListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CloudServicesNetworksListBySubscriptionInput,
    outputSchema: CloudServicesNetworksListBySubscriptionOutput,
  }));
// Input Schema
export const CloudServicesNetworksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    cloudServicesNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/cloudServicesNetworks/{cloudServicesNetworkName}",
    }),
  );
export type CloudServicesNetworksUpdateInput =
  typeof CloudServicesNetworksUpdateInput.Type;

// Output Schema
export const CloudServicesNetworksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CloudServicesNetworksUpdateOutput =
  typeof CloudServicesNetworksUpdateOutput.Type;

// The operation
/**
 * Update properties of the provided cloud services network, or update the tags associated with it. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param cloudServicesNetworkName - The name of the cloud services network.
 */
export const CloudServicesNetworksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CloudServicesNetworksUpdateInput,
    outputSchema: CloudServicesNetworksUpdateOutput,
  }),
);
// Input Schema
export const ClusterManagersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterManagerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusterManagers/{clusterManagerName}",
    }),
  );
export type ClusterManagersCreateOrUpdateInput =
  typeof ClusterManagersCreateOrUpdateInput.Type;

// Output Schema
export const ClusterManagersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ClusterManagersCreateOrUpdateOutput =
  typeof ClusterManagersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new cluster manager or update properties of the cluster manager if it exists.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterManagerName - The name of the cluster manager.
 */
export const ClusterManagersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterManagersCreateOrUpdateInput,
    outputSchema: ClusterManagersCreateOrUpdateOutput,
  }));
// Input Schema
export const ClusterManagersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterManagerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusterManagers/{clusterManagerName}",
    }),
  );
export type ClusterManagersDeleteInput = typeof ClusterManagersDeleteInput.Type;

// Output Schema
export const ClusterManagersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClusterManagersDeleteOutput =
  typeof ClusterManagersDeleteOutput.Type;

// The operation
/**
 * Delete the provided cluster manager.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterManagerName - The name of the cluster manager.
 */
export const ClusterManagersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClusterManagersDeleteInput,
    outputSchema: ClusterManagersDeleteOutput,
  }),
);
// Input Schema
export const ClusterManagersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterManagerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusterManagers/{clusterManagerName}",
    }),
  );
export type ClusterManagersGetInput = typeof ClusterManagersGetInput.Type;

// Output Schema
export const ClusterManagersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ClusterManagersGetOutput = typeof ClusterManagersGetOutput.Type;

// The operation
/**
 * Get the properties of the provided cluster manager.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterManagerName - The name of the cluster manager.
 */
export const ClusterManagersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClusterManagersGetInput,
  outputSchema: ClusterManagersGetOutput,
}));
// Input Schema
export const ClusterManagersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusterManagers",
    }),
  );
export type ClusterManagersListByResourceGroupInput =
  typeof ClusterManagersListByResourceGroupInput.Type;

// Output Schema
export const ClusterManagersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClusterManagersListByResourceGroupOutput =
  typeof ClusterManagersListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of cluster managers in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ClusterManagersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterManagersListByResourceGroupInput,
    outputSchema: ClusterManagersListByResourceGroupOutput,
  }));
// Input Schema
export const ClusterManagersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/clusterManagers",
    }),
  );
export type ClusterManagersListBySubscriptionInput =
  typeof ClusterManagersListBySubscriptionInput.Type;

// Output Schema
export const ClusterManagersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClusterManagersListBySubscriptionOutput =
  typeof ClusterManagersListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of cluster managers in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ClusterManagersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClusterManagersListBySubscriptionInput,
    outputSchema: ClusterManagersListBySubscriptionOutput,
  }));
// Input Schema
export const ClusterManagersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterManagerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusterManagers/{clusterManagerName}",
    }),
  );
export type ClusterManagersUpdateInput = typeof ClusterManagersUpdateInput.Type;

// Output Schema
export const ClusterManagersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ClusterManagersUpdateOutput =
  typeof ClusterManagersUpdateOutput.Type;

// The operation
/**
 * Patch properties of the provided cluster manager, or update the tags assigned to the cluster manager. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterManagerName - The name of the cluster manager.
 */
export const ClusterManagersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClusterManagersUpdateInput,
    outputSchema: ClusterManagersUpdateOutput,
  }),
);
// Input Schema
export const ClustersContinueUpdateVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/continueUpdateVersion",
    }),
  );
export type ClustersContinueUpdateVersionInput =
  typeof ClustersContinueUpdateVersionInput.Type;

// Output Schema
export const ClustersContinueUpdateVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersContinueUpdateVersionOutput =
  typeof ClustersContinueUpdateVersionOutput.Type;

// The operation
/**
 * Trigger the continuation of an update for a cluster with a matching update strategy that has paused after completing a segment of the update.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersContinueUpdateVersion =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ClustersContinueUpdateVersionInput,
    outputSchema: ClustersContinueUpdateVersionOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}",
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
 * Create a new cluster or update the properties of the cluster if it exists.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}",
  }),
);
export type ClustersDeleteInput = typeof ClustersDeleteInput.Type;

// Output Schema
export const ClustersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDeleteOutput = typeof ClustersDeleteOutput.Type;

// The operation
/**
 * Delete the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersDeleteInput,
  outputSchema: ClustersDeleteOutput,
}));
// Input Schema
export const ClustersDeployInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/deploy",
  }),
);
export type ClustersDeployInput = typeof ClustersDeployInput.Type;

// Output Schema
export const ClustersDeployOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersDeployOutput = typeof ClustersDeployOutput.Type;

// The operation
/**
 * Deploy the cluster using the rack configuration provided during creation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersDeploy = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersDeployInput,
  outputSchema: ClustersDeployOutput,
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}",
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
 * Get properties of the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersGetInput,
  outputSchema: ClustersGetOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters",
    }),
  );
export type ClustersListByResourceGroupInput =
  typeof ClustersListByResourceGroupInput.Type;

// Output Schema
export const ClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListByResourceGroupOutput =
  typeof ClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of clusters in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
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
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/clusters",
    }),
  );
export type ClustersListBySubscriptionInput =
  typeof ClustersListBySubscriptionInput.Type;

// Output Schema
export const ClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ClustersListBySubscriptionOutput =
  typeof ClustersListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of clusters in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ClustersListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersListBySubscriptionInput,
    outputSchema: ClustersListBySubscriptionOutput,
  }),
);
// Input Schema
export const ClustersScanRuntimeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/scanRuntime",
    }),
  );
export type ClustersScanRuntimeInput = typeof ClustersScanRuntimeInput.Type;

// Output Schema
export const ClustersScanRuntimeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersScanRuntimeOutput = typeof ClustersScanRuntimeOutput.Type;

// The operation
/**
 * Triggers the execution of a runtime protection scan to detect and remediate detected issues, in accordance with the cluster configuration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersScanRuntime = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersScanRuntimeInput,
  outputSchema: ClustersScanRuntimeOutput,
}));
// Input Schema
export const ClustersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  clusterName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}",
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
 * Patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ClustersUpdateInput,
  outputSchema: ClustersUpdateOutput,
}));
// Input Schema
export const ClustersUpdateVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/updateVersion",
    }),
  );
export type ClustersUpdateVersionInput = typeof ClustersUpdateVersionInput.Type;

// Output Schema
export const ClustersUpdateVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ClustersUpdateVersionOutput =
  typeof ClustersUpdateVersionOutput.Type;

// The operation
/**
 * Update the version of the provided cluster to one of the available supported versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const ClustersUpdateVersion = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ClustersUpdateVersionInput,
    outputSchema: ClustersUpdateVersionOutput,
  }),
);
// Input Schema
export const ConsolesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    consoleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}",
    }),
  );
export type ConsolesCreateOrUpdateInput =
  typeof ConsolesCreateOrUpdateInput.Type;

// Output Schema
export const ConsolesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConsolesCreateOrUpdateOutput =
  typeof ConsolesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new virtual machine console or update the properties of the existing virtual machine console.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 * @param consoleName - The name of the virtual machine console.
 */
export const ConsolesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConsolesCreateOrUpdateInput,
    outputSchema: ConsolesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ConsolesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  virtualMachineName: Schema.String.pipe(T.PathParam()),
  consoleName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}",
  }),
);
export type ConsolesDeleteInput = typeof ConsolesDeleteInput.Type;

// Output Schema
export const ConsolesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConsolesDeleteOutput = typeof ConsolesDeleteOutput.Type;

// The operation
/**
 * Delete the provided virtual machine console.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 * @param consoleName - The name of the virtual machine console.
 */
export const ConsolesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConsolesDeleteInput,
  outputSchema: ConsolesDeleteOutput,
}));
// Input Schema
export const ConsolesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  virtualMachineName: Schema.String.pipe(T.PathParam()),
  consoleName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}",
  }),
);
export type ConsolesGetInput = typeof ConsolesGetInput.Type;

// Output Schema
export const ConsolesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ConsolesGetOutput = typeof ConsolesGetOutput.Type;

// The operation
/**
 * Get properties of the provided virtual machine console.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 * @param consoleName - The name of the virtual machine console.
 */
export const ConsolesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConsolesGetInput,
  outputSchema: ConsolesGetOutput,
}));
// Input Schema
export const ConsolesListByVirtualMachineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles",
    }),
  );
export type ConsolesListByVirtualMachineInput =
  typeof ConsolesListByVirtualMachineInput.Type;

// Output Schema
export const ConsolesListByVirtualMachineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ConsolesListByVirtualMachineOutput =
  typeof ConsolesListByVirtualMachineOutput.Type;

// The operation
/**
 * Get a list of consoles for the provided virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const ConsolesListByVirtualMachine =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConsolesListByVirtualMachineInput,
    outputSchema: ConsolesListByVirtualMachineOutput,
  }));
// Input Schema
export const ConsolesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  virtualMachineName: Schema.String.pipe(T.PathParam()),
  consoleName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/consoles/{consoleName}",
  }),
);
export type ConsolesUpdateInput = typeof ConsolesUpdateInput.Type;

// Output Schema
export const ConsolesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ConsolesUpdateOutput = typeof ConsolesUpdateOutput.Type;

// The operation
/**
 * Patch the properties of the provided virtual machine console, or update the tags associated with the virtual machine console. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 * @param consoleName - The name of the virtual machine console.
 */
export const ConsolesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConsolesUpdateInput,
  outputSchema: ConsolesUpdateOutput,
}));
// Input Schema
export const KubernetesClusterFeaturesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}",
    }),
  );
export type KubernetesClusterFeaturesCreateOrUpdateInput =
  typeof KubernetesClusterFeaturesCreateOrUpdateInput.Type;

// Output Schema
export const KubernetesClusterFeaturesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type KubernetesClusterFeaturesCreateOrUpdateOutput =
  typeof KubernetesClusterFeaturesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new Kubernetes cluster feature or update properties of the Kubernetes cluster feature if it exists.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 * @param featureName - The name of the feature.
 */
export const KubernetesClusterFeaturesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KubernetesClusterFeaturesCreateOrUpdateInput,
    outputSchema: KubernetesClusterFeaturesCreateOrUpdateOutput,
  }));
// Input Schema
export const KubernetesClusterFeaturesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}",
    }),
  );
export type KubernetesClusterFeaturesDeleteInput =
  typeof KubernetesClusterFeaturesDeleteInput.Type;

// Output Schema
export const KubernetesClusterFeaturesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KubernetesClusterFeaturesDeleteOutput =
  typeof KubernetesClusterFeaturesDeleteOutput.Type;

// The operation
/**
 * Delete the provided Kubernetes cluster feature.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 * @param featureName - The name of the feature.
 */
export const KubernetesClusterFeaturesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KubernetesClusterFeaturesDeleteInput,
    outputSchema: KubernetesClusterFeaturesDeleteOutput,
  }));
// Input Schema
export const KubernetesClusterFeaturesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}",
    }),
  );
export type KubernetesClusterFeaturesGetInput =
  typeof KubernetesClusterFeaturesGetInput.Type;

// Output Schema
export const KubernetesClusterFeaturesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type KubernetesClusterFeaturesGetOutput =
  typeof KubernetesClusterFeaturesGetOutput.Type;

// The operation
/**
 * Get properties of the provided the Kubernetes cluster feature.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 * @param featureName - The name of the feature.
 */
export const KubernetesClusterFeaturesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KubernetesClusterFeaturesGetInput,
    outputSchema: KubernetesClusterFeaturesGetOutput,
  }));
// Input Schema
export const KubernetesClusterFeaturesListByKubernetesClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features",
    }),
  );
export type KubernetesClusterFeaturesListByKubernetesClusterInput =
  typeof KubernetesClusterFeaturesListByKubernetesClusterInput.Type;

// Output Schema
export const KubernetesClusterFeaturesListByKubernetesClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type KubernetesClusterFeaturesListByKubernetesClusterOutput =
  typeof KubernetesClusterFeaturesListByKubernetesClusterOutput.Type;

// The operation
/**
 * Get a list of features for the provided Kubernetes cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 */
export const KubernetesClusterFeaturesListByKubernetesCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KubernetesClusterFeaturesListByKubernetesClusterInput,
    outputSchema: KubernetesClusterFeaturesListByKubernetesClusterOutput,
  }));
// Input Schema
export const KubernetesClusterFeaturesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    featureName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}",
    }),
  );
export type KubernetesClusterFeaturesUpdateInput =
  typeof KubernetesClusterFeaturesUpdateInput.Type;

// Output Schema
export const KubernetesClusterFeaturesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type KubernetesClusterFeaturesUpdateOutput =
  typeof KubernetesClusterFeaturesUpdateOutput.Type;

// The operation
/**
 * Patch properties of the provided Kubernetes cluster feature.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 * @param featureName - The name of the feature.
 */
export const KubernetesClusterFeaturesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KubernetesClusterFeaturesUpdateInput,
    outputSchema: KubernetesClusterFeaturesUpdateOutput,
  }));
// Input Schema
export const KubernetesClustersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}",
    }),
  );
export type KubernetesClustersCreateOrUpdateInput =
  typeof KubernetesClustersCreateOrUpdateInput.Type;

// Output Schema
export const KubernetesClustersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type KubernetesClustersCreateOrUpdateOutput =
  typeof KubernetesClustersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new Kubernetes cluster or update the properties of the existing one.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 */
export const KubernetesClustersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KubernetesClustersCreateOrUpdateInput,
    outputSchema: KubernetesClustersCreateOrUpdateOutput,
  }));
// Input Schema
export const KubernetesClustersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}",
    }),
  );
export type KubernetesClustersDeleteInput =
  typeof KubernetesClustersDeleteInput.Type;

// Output Schema
export const KubernetesClustersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KubernetesClustersDeleteOutput =
  typeof KubernetesClustersDeleteOutput.Type;

// The operation
/**
 * Delete the provided Kubernetes cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 */
export const KubernetesClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KubernetesClustersDeleteInput,
    outputSchema: KubernetesClustersDeleteOutput,
  }),
);
// Input Schema
export const KubernetesClustersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}",
    }),
  );
export type KubernetesClustersGetInput = typeof KubernetesClustersGetInput.Type;

// Output Schema
export const KubernetesClustersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type KubernetesClustersGetOutput =
  typeof KubernetesClustersGetOutput.Type;

// The operation
/**
 * Get properties of the provided the Kubernetes cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 */
export const KubernetesClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KubernetesClustersGetInput,
    outputSchema: KubernetesClustersGetOutput,
  }),
);
// Input Schema
export const KubernetesClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters",
    }),
  );
export type KubernetesClustersListByResourceGroupInput =
  typeof KubernetesClustersListByResourceGroupInput.Type;

// Output Schema
export const KubernetesClustersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type KubernetesClustersListByResourceGroupOutput =
  typeof KubernetesClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of Kubernetes clusters in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const KubernetesClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KubernetesClustersListByResourceGroupInput,
    outputSchema: KubernetesClustersListByResourceGroupOutput,
  }));
// Input Schema
export const KubernetesClustersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/kubernetesClusters",
    }),
  );
export type KubernetesClustersListBySubscriptionInput =
  typeof KubernetesClustersListBySubscriptionInput.Type;

// Output Schema
export const KubernetesClustersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type KubernetesClustersListBySubscriptionOutput =
  typeof KubernetesClustersListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of Kubernetes clusters in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const KubernetesClustersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KubernetesClustersListBySubscriptionInput,
    outputSchema: KubernetesClustersListBySubscriptionOutput,
  }));
// Input Schema
export const KubernetesClustersRestartNodeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/restartNode",
    }),
  );
export type KubernetesClustersRestartNodeInput =
  typeof KubernetesClustersRestartNodeInput.Type;

// Output Schema
export const KubernetesClustersRestartNodeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KubernetesClustersRestartNodeOutput =
  typeof KubernetesClustersRestartNodeOutput.Type;

// The operation
/**
 * Restart a targeted node of a Kubernetes cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 */
export const KubernetesClustersRestartNode =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KubernetesClustersRestartNodeInput,
    outputSchema: KubernetesClustersRestartNodeOutput,
  }));
// Input Schema
export const KubernetesClustersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    kubernetesClusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}",
    }),
  );
export type KubernetesClustersUpdateInput =
  typeof KubernetesClustersUpdateInput.Type;

// Output Schema
export const KubernetesClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type KubernetesClustersUpdateOutput =
  typeof KubernetesClustersUpdateOutput.Type;

// The operation
/**
 * Patch the properties of the provided Kubernetes cluster, or update the tags associated with the Kubernetes cluster. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kubernetesClusterName - The name of the Kubernetes cluster.
 */
export const KubernetesClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KubernetesClustersUpdateInput,
    outputSchema: KubernetesClustersUpdateOutput,
  }),
);
// Input Schema
export const L2NetworksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    l2NetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l2Networks/{l2NetworkName}",
    }),
  );
export type L2NetworksCreateOrUpdateInput =
  typeof L2NetworksCreateOrUpdateInput.Type;

// Output Schema
export const L2NetworksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L2NetworksCreateOrUpdateOutput =
  typeof L2NetworksCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new layer 2 (L2) network or update the properties of the existing network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param l2NetworkName - The name of the L2 network.
 */
export const L2NetworksCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L2NetworksCreateOrUpdateInput,
    outputSchema: L2NetworksCreateOrUpdateOutput,
  }),
);
// Input Schema
export const L2NetworksDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  l2NetworkName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l2Networks/{l2NetworkName}",
  }),
);
export type L2NetworksDeleteInput = typeof L2NetworksDeleteInput.Type;

// Output Schema
export const L2NetworksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type L2NetworksDeleteOutput = typeof L2NetworksDeleteOutput.Type;

// The operation
/**
 * Delete the provided layer 2 (L2) network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param l2NetworkName - The name of the L2 network.
 */
export const L2NetworksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: L2NetworksDeleteInput,
  outputSchema: L2NetworksDeleteOutput,
}));
// Input Schema
export const L2NetworksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  l2NetworkName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l2Networks/{l2NetworkName}",
  }),
);
export type L2NetworksGetInput = typeof L2NetworksGetInput.Type;

// Output Schema
export const L2NetworksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type L2NetworksGetOutput = typeof L2NetworksGetOutput.Type;

// The operation
/**
 * Get properties of the provided layer 2 (L2) network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param l2NetworkName - The name of the L2 network.
 */
export const L2NetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: L2NetworksGetInput,
  outputSchema: L2NetworksGetOutput,
}));
// Input Schema
export const L2NetworksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l2Networks",
    }),
  );
export type L2NetworksListByResourceGroupInput =
  typeof L2NetworksListByResourceGroupInput.Type;

// Output Schema
export const L2NetworksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type L2NetworksListByResourceGroupOutput =
  typeof L2NetworksListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of layer 2 (L2) networks in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const L2NetworksListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: L2NetworksListByResourceGroupInput,
    outputSchema: L2NetworksListByResourceGroupOutput,
  }));
// Input Schema
export const L2NetworksListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/l2Networks",
    }),
  );
export type L2NetworksListBySubscriptionInput =
  typeof L2NetworksListBySubscriptionInput.Type;

// Output Schema
export const L2NetworksListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type L2NetworksListBySubscriptionOutput =
  typeof L2NetworksListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of layer 2 (L2) networks in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const L2NetworksListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: L2NetworksListBySubscriptionInput,
    outputSchema: L2NetworksListBySubscriptionOutput,
  }));
// Input Schema
export const L2NetworksUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  l2NetworkName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l2Networks/{l2NetworkName}",
  }),
);
export type L2NetworksUpdateInput = typeof L2NetworksUpdateInput.Type;

// Output Schema
export const L2NetworksUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type L2NetworksUpdateOutput = typeof L2NetworksUpdateOutput.Type;

// The operation
/**
 * Update tags associated with the provided layer 2 (L2) network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param l2NetworkName - The name of the L2 network.
 */
export const L2NetworksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: L2NetworksUpdateInput,
  outputSchema: L2NetworksUpdateOutput,
}));
// Input Schema
export const L3NetworksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    l3NetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l3Networks/{l3NetworkName}",
    }),
  );
export type L3NetworksCreateOrUpdateInput =
  typeof L3NetworksCreateOrUpdateInput.Type;

// Output Schema
export const L3NetworksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L3NetworksCreateOrUpdateOutput =
  typeof L3NetworksCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new layer 3 (L3) network or update the properties of the existing network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param l3NetworkName - The name of the L3 network.
 */
export const L3NetworksCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L3NetworksCreateOrUpdateInput,
    outputSchema: L3NetworksCreateOrUpdateOutput,
  }),
);
// Input Schema
export const L3NetworksDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  l3NetworkName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l3Networks/{l3NetworkName}",
  }),
);
export type L3NetworksDeleteInput = typeof L3NetworksDeleteInput.Type;

// Output Schema
export const L3NetworksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type L3NetworksDeleteOutput = typeof L3NetworksDeleteOutput.Type;

// The operation
/**
 * Delete the provided layer 3 (L3) network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param l3NetworkName - The name of the L3 network.
 */
export const L3NetworksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: L3NetworksDeleteInput,
  outputSchema: L3NetworksDeleteOutput,
}));
// Input Schema
export const L3NetworksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  l3NetworkName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l3Networks/{l3NetworkName}",
  }),
);
export type L3NetworksGetInput = typeof L3NetworksGetInput.Type;

// Output Schema
export const L3NetworksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type L3NetworksGetOutput = typeof L3NetworksGetOutput.Type;

// The operation
/**
 * Get properties of the provided layer 3 (L3) network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param l3NetworkName - The name of the L3 network.
 */
export const L3NetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: L3NetworksGetInput,
  outputSchema: L3NetworksGetOutput,
}));
// Input Schema
export const L3NetworksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l3Networks",
    }),
  );
export type L3NetworksListByResourceGroupInput =
  typeof L3NetworksListByResourceGroupInput.Type;

// Output Schema
export const L3NetworksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type L3NetworksListByResourceGroupOutput =
  typeof L3NetworksListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of layer 3 (L3) networks in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const L3NetworksListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: L3NetworksListByResourceGroupInput,
    outputSchema: L3NetworksListByResourceGroupOutput,
  }));
// Input Schema
export const L3NetworksListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/l3Networks",
    }),
  );
export type L3NetworksListBySubscriptionInput =
  typeof L3NetworksListBySubscriptionInput.Type;

// Output Schema
export const L3NetworksListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type L3NetworksListBySubscriptionOutput =
  typeof L3NetworksListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of layer 3 (L3) networks in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const L3NetworksListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: L3NetworksListBySubscriptionInput,
    outputSchema: L3NetworksListBySubscriptionOutput,
  }));
// Input Schema
export const L3NetworksUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  l3NetworkName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/l3Networks/{l3NetworkName}",
  }),
);
export type L3NetworksUpdateInput = typeof L3NetworksUpdateInput.Type;

// Output Schema
export const L3NetworksUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type L3NetworksUpdateOutput = typeof L3NetworksUpdateOutput.Type;

// The operation
/**
 * Update tags associated with the provided layer 3 (L3) network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param l3NetworkName - The name of the L3 network.
 */
export const L3NetworksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: L3NetworksUpdateInput,
  outputSchema: L3NetworksUpdateOutput,
}));
// Input Schema
export const MetricsConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    metricsConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}",
    }),
  );
export type MetricsConfigurationsCreateOrUpdateInput =
  typeof MetricsConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const MetricsConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MetricsConfigurationsCreateOrUpdateOutput =
  typeof MetricsConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create new or update the existing metrics configuration of the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param metricsConfigurationName - The name of the metrics configuration for the cluster.
 */
export const MetricsConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MetricsConfigurationsCreateOrUpdateInput,
    outputSchema: MetricsConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const MetricsConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    metricsConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}",
    }),
  );
export type MetricsConfigurationsDeleteInput =
  typeof MetricsConfigurationsDeleteInput.Type;

// Output Schema
export const MetricsConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MetricsConfigurationsDeleteOutput =
  typeof MetricsConfigurationsDeleteOutput.Type;

// The operation
/**
 * Delete the metrics configuration of the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param metricsConfigurationName - The name of the metrics configuration for the cluster.
 */
export const MetricsConfigurationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MetricsConfigurationsDeleteInput,
    outputSchema: MetricsConfigurationsDeleteOutput,
  }),
);
// Input Schema
export const MetricsConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    metricsConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}",
    }),
  );
export type MetricsConfigurationsGetInput =
  typeof MetricsConfigurationsGetInput.Type;

// Output Schema
export const MetricsConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MetricsConfigurationsGetOutput =
  typeof MetricsConfigurationsGetOutput.Type;

// The operation
/**
 * Get metrics configuration of the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param metricsConfigurationName - The name of the metrics configuration for the cluster.
 */
export const MetricsConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MetricsConfigurationsGetInput,
    outputSchema: MetricsConfigurationsGetOutput,
  }),
);
// Input Schema
export const MetricsConfigurationsListByClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations",
    }),
  );
export type MetricsConfigurationsListByClusterInput =
  typeof MetricsConfigurationsListByClusterInput.Type;

// Output Schema
export const MetricsConfigurationsListByClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MetricsConfigurationsListByClusterOutput =
  typeof MetricsConfigurationsListByClusterOutput.Type;

// The operation
/**
 * Get a list of metrics configurations for the provided cluster.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 */
export const MetricsConfigurationsListByCluster =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MetricsConfigurationsListByClusterInput,
    outputSchema: MetricsConfigurationsListByClusterOutput,
  }));
// Input Schema
export const MetricsConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    metricsConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}",
    }),
  );
export type MetricsConfigurationsUpdateInput =
  typeof MetricsConfigurationsUpdateInput.Type;

// Output Schema
export const MetricsConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type MetricsConfigurationsUpdateOutput =
  typeof MetricsConfigurationsUpdateOutput.Type;

// The operation
/**
 * Patch properties of metrics configuration for the provided cluster, or update the tags associated with it. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param clusterName - The name of the cluster.
 * @param metricsConfigurationName - The name of the metrics configuration for the cluster.
 */
export const MetricsConfigurationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MetricsConfigurationsUpdateInput,
    outputSchema: MetricsConfigurationsUpdateOutput,
  }),
);
// Input Schema
export const RacksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    rackName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/racks/{rackName}",
    }),
  );
export type RacksCreateOrUpdateInput = typeof RacksCreateOrUpdateInput.Type;

// Output Schema
export const RacksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RacksCreateOrUpdateOutput = typeof RacksCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new rack or update properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param rackName - The name of the rack.
 */
export const RacksCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RacksCreateOrUpdateInput,
  outputSchema: RacksCreateOrUpdateOutput,
}));
// Input Schema
export const RacksDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  rackName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/racks/{rackName}",
  }),
);
export type RacksDeleteInput = typeof RacksDeleteInput.Type;

// Output Schema
export const RacksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RacksDeleteOutput = typeof RacksDeleteOutput.Type;

// The operation
/**
 * Delete the provided rack. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param rackName - The name of the rack.
 */
export const RacksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RacksDeleteInput,
  outputSchema: RacksDeleteOutput,
}));
// Input Schema
export const RacksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  rackName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/racks/{rackName}",
  }),
);
export type RacksGetInput = typeof RacksGetInput.Type;

// Output Schema
export const RacksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type RacksGetOutput = typeof RacksGetOutput.Type;

// The operation
/**
 * Get properties of the provided rack.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param rackName - The name of the rack.
 */
export const RacksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RacksGetInput,
  outputSchema: RacksGetOutput,
}));
// Input Schema
export const RackSkusGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  rackSkuName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/rackSkus/{rackSkuName}",
  }),
);
export type RackSkusGetInput = typeof RackSkusGetInput.Type;

// Output Schema
export const RackSkusGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RackSkusGetOutput = typeof RackSkusGetOutput.Type;

// The operation
/**
 * Get the properties of the provided rack SKU.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param rackSkuName - The name of the rack SKU.
 */
export const RackSkusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RackSkusGetInput,
  outputSchema: RackSkusGetOutput,
}));
// Input Schema
export const RackSkusListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/rackSkus",
    }),
  );
export type RackSkusListBySubscriptionInput =
  typeof RackSkusListBySubscriptionInput.Type;

// Output Schema
export const RackSkusListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RackSkusListBySubscriptionOutput =
  typeof RackSkusListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of rack SKUs in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RackSkusListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RackSkusListBySubscriptionInput,
    outputSchema: RackSkusListBySubscriptionOutput,
  }),
);
// Input Schema
export const RacksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/racks",
    }),
  );
export type RacksListByResourceGroupInput =
  typeof RacksListByResourceGroupInput.Type;

// Output Schema
export const RacksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RacksListByResourceGroupOutput =
  typeof RacksListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of racks in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RacksListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RacksListByResourceGroupInput,
    outputSchema: RacksListByResourceGroupOutput,
  }),
);
// Input Schema
export const RacksListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/racks",
    }),
  );
export type RacksListBySubscriptionInput =
  typeof RacksListBySubscriptionInput.Type;

// Output Schema
export const RacksListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RacksListBySubscriptionOutput =
  typeof RacksListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of racks in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const RacksListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RacksListBySubscriptionInput,
    outputSchema: RacksListBySubscriptionOutput,
  }),
);
// Input Schema
export const RacksUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  rackName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/racks/{rackName}",
  }),
);
export type RacksUpdateInput = typeof RacksUpdateInput.Type;

// Output Schema
export const RacksUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type RacksUpdateOutput = typeof RacksUpdateOutput.Type;

// The operation
/**
 * Patch properties of the provided rack, or update the tags associated with the rack. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param rackName - The name of the rack.
 */
export const RacksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RacksUpdateInput,
  outputSchema: RacksUpdateOutput,
}));
// Input Schema
export const StorageAppliancesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageApplianceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}",
    }),
  );
export type StorageAppliancesCreateOrUpdateInput =
  typeof StorageAppliancesCreateOrUpdateInput.Type;

// Output Schema
export const StorageAppliancesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageAppliancesCreateOrUpdateOutput =
  typeof StorageAppliancesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new storage appliance or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageApplianceName - The name of the storage appliance.
 */
export const StorageAppliancesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAppliancesCreateOrUpdateInput,
    outputSchema: StorageAppliancesCreateOrUpdateOutput,
  }));
// Input Schema
export const StorageAppliancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageApplianceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}",
    }),
  );
export type StorageAppliancesDeleteInput =
  typeof StorageAppliancesDeleteInput.Type;

// Output Schema
export const StorageAppliancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAppliancesDeleteOutput =
  typeof StorageAppliancesDeleteOutput.Type;

// The operation
/**
 * Delete the provided storage appliance. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageApplianceName - The name of the storage appliance.
 */
export const StorageAppliancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAppliancesDeleteInput,
    outputSchema: StorageAppliancesDeleteOutput,
  }),
);
// Input Schema
export const StorageAppliancesDisableRemoteVendorManagementInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageApplianceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}/disableRemoteVendorManagement",
    }),
  );
export type StorageAppliancesDisableRemoteVendorManagementInput =
  typeof StorageAppliancesDisableRemoteVendorManagementInput.Type;

// Output Schema
export const StorageAppliancesDisableRemoteVendorManagementOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAppliancesDisableRemoteVendorManagementOutput =
  typeof StorageAppliancesDisableRemoteVendorManagementOutput.Type;

// The operation
/**
 * Disable remote vendor management of the provided storage appliance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageApplianceName - The name of the storage appliance.
 */
export const StorageAppliancesDisableRemoteVendorManagement =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAppliancesDisableRemoteVendorManagementInput,
    outputSchema: StorageAppliancesDisableRemoteVendorManagementOutput,
  }));
// Input Schema
export const StorageAppliancesEnableRemoteVendorManagementInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageApplianceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}/enableRemoteVendorManagement",
    }),
  );
export type StorageAppliancesEnableRemoteVendorManagementInput =
  typeof StorageAppliancesEnableRemoteVendorManagementInput.Type;

// Output Schema
export const StorageAppliancesEnableRemoteVendorManagementOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAppliancesEnableRemoteVendorManagementOutput =
  typeof StorageAppliancesEnableRemoteVendorManagementOutput.Type;

// The operation
/**
 * Enable remote vendor management of the provided storage appliance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageApplianceName - The name of the storage appliance.
 */
export const StorageAppliancesEnableRemoteVendorManagement =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAppliancesEnableRemoteVendorManagementInput,
    outputSchema: StorageAppliancesEnableRemoteVendorManagementOutput,
  }));
// Input Schema
export const StorageAppliancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageApplianceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}",
    }),
  );
export type StorageAppliancesGetInput = typeof StorageAppliancesGetInput.Type;

// Output Schema
export const StorageAppliancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageAppliancesGetOutput = typeof StorageAppliancesGetOutput.Type;

// The operation
/**
 * Get properties of the provided storage appliance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageApplianceName - The name of the storage appliance.
 */
export const StorageAppliancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAppliancesGetInput,
    outputSchema: StorageAppliancesGetOutput,
  }),
);
// Input Schema
export const StorageAppliancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances",
    }),
  );
export type StorageAppliancesListByResourceGroupInput =
  typeof StorageAppliancesListByResourceGroupInput.Type;

// Output Schema
export const StorageAppliancesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageAppliancesListByResourceGroupOutput =
  typeof StorageAppliancesListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of storage appliances in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const StorageAppliancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAppliancesListByResourceGroupInput,
    outputSchema: StorageAppliancesListByResourceGroupOutput,
  }));
// Input Schema
export const StorageAppliancesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/storageAppliances",
    }),
  );
export type StorageAppliancesListBySubscriptionInput =
  typeof StorageAppliancesListBySubscriptionInput.Type;

// Output Schema
export const StorageAppliancesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageAppliancesListBySubscriptionOutput =
  typeof StorageAppliancesListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of storage appliances in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const StorageAppliancesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAppliancesListBySubscriptionInput,
    outputSchema: StorageAppliancesListBySubscriptionOutput,
  }));
// Input Schema
export const StorageAppliancesRunReadCommandsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageApplianceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}/runReadCommands",
    }),
  );
export type StorageAppliancesRunReadCommandsInput =
  typeof StorageAppliancesRunReadCommandsInput.Type;

// Output Schema
export const StorageAppliancesRunReadCommandsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAppliancesRunReadCommandsOutput =
  typeof StorageAppliancesRunReadCommandsOutput.Type;

// The operation
/**
 * Run one or more read-only commands on the provided storage appliance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageApplianceName - The name of the storage appliance.
 */
export const StorageAppliancesRunReadCommands =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAppliancesRunReadCommandsInput,
    outputSchema: StorageAppliancesRunReadCommandsOutput,
  }));
// Input Schema
export const StorageAppliancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageApplianceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}",
    }),
  );
export type StorageAppliancesUpdateInput =
  typeof StorageAppliancesUpdateInput.Type;

// Output Schema
export const StorageAppliancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageAppliancesUpdateOutput =
  typeof StorageAppliancesUpdateOutput.Type;

// The operation
/**
 * Update properties of the provided storage appliance, or update tags associated with the storage appliance Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageApplianceName - The name of the storage appliance.
 */
export const StorageAppliancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAppliancesUpdateInput,
    outputSchema: StorageAppliancesUpdateOutput,
  }),
);
// Input Schema
export const TrunkedNetworksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    trunkedNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/trunkedNetworks/{trunkedNetworkName}",
    }),
  );
export type TrunkedNetworksCreateOrUpdateInput =
  typeof TrunkedNetworksCreateOrUpdateInput.Type;

// Output Schema
export const TrunkedNetworksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type TrunkedNetworksCreateOrUpdateOutput =
  typeof TrunkedNetworksCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new trunked network or update the properties of the existing trunked network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param trunkedNetworkName - The name of the trunked network.
 */
export const TrunkedNetworksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TrunkedNetworksCreateOrUpdateInput,
    outputSchema: TrunkedNetworksCreateOrUpdateOutput,
  }));
// Input Schema
export const TrunkedNetworksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    trunkedNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/trunkedNetworks/{trunkedNetworkName}",
    }),
  );
export type TrunkedNetworksDeleteInput = typeof TrunkedNetworksDeleteInput.Type;

// Output Schema
export const TrunkedNetworksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TrunkedNetworksDeleteOutput =
  typeof TrunkedNetworksDeleteOutput.Type;

// The operation
/**
 * Delete the provided trunked network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param trunkedNetworkName - The name of the trunked network.
 */
export const TrunkedNetworksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TrunkedNetworksDeleteInput,
    outputSchema: TrunkedNetworksDeleteOutput,
  }),
);
// Input Schema
export const TrunkedNetworksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    trunkedNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/trunkedNetworks/{trunkedNetworkName}",
    }),
  );
export type TrunkedNetworksGetInput = typeof TrunkedNetworksGetInput.Type;

// Output Schema
export const TrunkedNetworksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type TrunkedNetworksGetOutput = typeof TrunkedNetworksGetOutput.Type;

// The operation
/**
 * Get properties of the provided trunked network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param trunkedNetworkName - The name of the trunked network.
 */
export const TrunkedNetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TrunkedNetworksGetInput,
  outputSchema: TrunkedNetworksGetOutput,
}));
// Input Schema
export const TrunkedNetworksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/trunkedNetworks",
    }),
  );
export type TrunkedNetworksListByResourceGroupInput =
  typeof TrunkedNetworksListByResourceGroupInput.Type;

// Output Schema
export const TrunkedNetworksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TrunkedNetworksListByResourceGroupOutput =
  typeof TrunkedNetworksListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of trunked networks in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const TrunkedNetworksListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TrunkedNetworksListByResourceGroupInput,
    outputSchema: TrunkedNetworksListByResourceGroupOutput,
  }));
// Input Schema
export const TrunkedNetworksListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/trunkedNetworks",
    }),
  );
export type TrunkedNetworksListBySubscriptionInput =
  typeof TrunkedNetworksListBySubscriptionInput.Type;

// Output Schema
export const TrunkedNetworksListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TrunkedNetworksListBySubscriptionOutput =
  typeof TrunkedNetworksListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of trunked networks in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const TrunkedNetworksListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TrunkedNetworksListBySubscriptionInput,
    outputSchema: TrunkedNetworksListBySubscriptionOutput,
  }));
// Input Schema
export const TrunkedNetworksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    trunkedNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/trunkedNetworks/{trunkedNetworkName}",
    }),
  );
export type TrunkedNetworksUpdateInput = typeof TrunkedNetworksUpdateInput.Type;

// Output Schema
export const TrunkedNetworksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type TrunkedNetworksUpdateOutput =
  typeof TrunkedNetworksUpdateOutput.Type;

// The operation
/**
 * Update tags associated with the provided trunked network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param trunkedNetworkName - The name of the trunked network.
 */
export const TrunkedNetworksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TrunkedNetworksUpdateInput,
    outputSchema: TrunkedNetworksUpdateOutput,
  }),
);
// Input Schema
export const VirtualMachinesAssignRelayInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/assignRelay",
    }),
  );
export type VirtualMachinesAssignRelayInput =
  typeof VirtualMachinesAssignRelayInput.Type;

// Output Schema
export const VirtualMachinesAssignRelayOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesAssignRelayOutput =
  typeof VirtualMachinesAssignRelayOutput.Type;

// The operation
/**
 * Assigns a relay to the specified Microsoft.HybridCompute machine associated with the provided virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const VirtualMachinesAssignRelay = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesAssignRelayInput,
    outputSchema: VirtualMachinesAssignRelayOutput,
  }),
);
// Input Schema
export const VirtualMachinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}",
    }),
  );
export type VirtualMachinesCreateOrUpdateInput =
  typeof VirtualMachinesCreateOrUpdateInput.Type;

// Output Schema
export const VirtualMachinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VirtualMachinesCreateOrUpdateOutput =
  typeof VirtualMachinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new virtual machine or update the properties of the existing virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const VirtualMachinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachinesCreateOrUpdateInput,
    outputSchema: VirtualMachinesCreateOrUpdateOutput,
  }));
// Input Schema
export const VirtualMachinesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}",
    }),
  );
export type VirtualMachinesDeleteInput = typeof VirtualMachinesDeleteInput.Type;

// Output Schema
export const VirtualMachinesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesDeleteOutput =
  typeof VirtualMachinesDeleteOutput.Type;

// The operation
/**
 * Delete the provided virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const VirtualMachinesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesDeleteInput,
    outputSchema: VirtualMachinesDeleteOutput,
  }),
);
// Input Schema
export const VirtualMachinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}",
    }),
  );
export type VirtualMachinesGetInput = typeof VirtualMachinesGetInput.Type;

// Output Schema
export const VirtualMachinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VirtualMachinesGetOutput = typeof VirtualMachinesGetOutput.Type;

// The operation
/**
 * Get properties of the provided virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const VirtualMachinesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualMachinesGetInput,
  outputSchema: VirtualMachinesGetOutput,
}));
// Input Schema
export const VirtualMachinesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines",
    }),
  );
export type VirtualMachinesListByResourceGroupInput =
  typeof VirtualMachinesListByResourceGroupInput.Type;

// Output Schema
export const VirtualMachinesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualMachinesListByResourceGroupOutput =
  typeof VirtualMachinesListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of virtual machines in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const VirtualMachinesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachinesListByResourceGroupInput,
    outputSchema: VirtualMachinesListByResourceGroupOutput,
  }));
// Input Schema
export const VirtualMachinesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/virtualMachines",
    }),
  );
export type VirtualMachinesListBySubscriptionInput =
  typeof VirtualMachinesListBySubscriptionInput.Type;

// Output Schema
export const VirtualMachinesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualMachinesListBySubscriptionOutput =
  typeof VirtualMachinesListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of virtual machines in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const VirtualMachinesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualMachinesListBySubscriptionInput,
    outputSchema: VirtualMachinesListBySubscriptionOutput,
  }));
// Input Schema
export const VirtualMachinesPowerOffInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/powerOff",
    }),
  );
export type VirtualMachinesPowerOffInput =
  typeof VirtualMachinesPowerOffInput.Type;

// Output Schema
export const VirtualMachinesPowerOffOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesPowerOffOutput =
  typeof VirtualMachinesPowerOffOutput.Type;

// The operation
/**
 * Power off the provided virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const VirtualMachinesPowerOff = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesPowerOffInput,
    outputSchema: VirtualMachinesPowerOffOutput,
  }),
);
// Input Schema
export const VirtualMachinesReimageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/reimage",
    }),
  );
export type VirtualMachinesReimageInput =
  typeof VirtualMachinesReimageInput.Type;

// Output Schema
export const VirtualMachinesReimageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesReimageOutput =
  typeof VirtualMachinesReimageOutput.Type;

// The operation
/**
 * Reimage the provided virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const VirtualMachinesReimage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesReimageInput,
    outputSchema: VirtualMachinesReimageOutput,
  }),
);
// Input Schema
export const VirtualMachinesRestartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/restart",
    }),
  );
export type VirtualMachinesRestartInput =
  typeof VirtualMachinesRestartInput.Type;

// Output Schema
export const VirtualMachinesRestartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesRestartOutput =
  typeof VirtualMachinesRestartOutput.Type;

// The operation
/**
 * Restart the provided virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const VirtualMachinesRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesRestartInput,
    outputSchema: VirtualMachinesRestartOutput,
  }),
);
// Input Schema
export const VirtualMachinesStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}/start",
    }),
  );
export type VirtualMachinesStartInput = typeof VirtualMachinesStartInput.Type;

// Output Schema
export const VirtualMachinesStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualMachinesStartOutput = typeof VirtualMachinesStartOutput.Type;

// The operation
/**
 * Start the provided virtual machine.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const VirtualMachinesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesStartInput,
    outputSchema: VirtualMachinesStartOutput,
  }),
);
// Input Schema
export const VirtualMachinesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualMachineName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/virtualMachines/{virtualMachineName}",
    }),
  );
export type VirtualMachinesUpdateInput = typeof VirtualMachinesUpdateInput.Type;

// Output Schema
export const VirtualMachinesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VirtualMachinesUpdateOutput =
  typeof VirtualMachinesUpdateOutput.Type;

// The operation
/**
 * Patch the properties of the provided virtual machine, or update the tags associated with the virtual machine. Properties and tag updates can be done independently.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualMachineName - The name of the virtual machine.
 */
export const VirtualMachinesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachinesUpdateInput,
    outputSchema: VirtualMachinesUpdateOutput,
  }),
);
// Input Schema
export const VolumesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/volumes/{volumeName}",
    }),
  );
export type VolumesCreateOrUpdateInput = typeof VolumesCreateOrUpdateInput.Type;

// Output Schema
export const VolumesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VolumesCreateOrUpdateOutput =
  typeof VolumesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a new volume or update the properties of the existing one.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param volumeName - The name of the volume.
 */
export const VolumesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesCreateOrUpdateInput,
    outputSchema: VolumesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const VolumesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/volumes/{volumeName}",
  }),
);
export type VolumesDeleteInput = typeof VolumesDeleteInput.Type;

// Output Schema
export const VolumesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesDeleteOutput = typeof VolumesDeleteOutput.Type;

// The operation
/**
 * Delete the provided volume.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param volumeName - The name of the volume.
 */
export const VolumesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesDeleteInput,
  outputSchema: VolumesDeleteOutput,
}));
// Input Schema
export const VolumesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/volumes/{volumeName}",
  }),
);
export type VolumesGetInput = typeof VolumesGetInput.Type;

// Output Schema
export const VolumesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type VolumesGetOutput = typeof VolumesGetOutput.Type;

// The operation
/**
 * Get properties of the provided volume.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param volumeName - The name of the volume.
 */
export const VolumesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesGetInput,
  outputSchema: VolumesGetOutput,
}));
// Input Schema
export const VolumesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/volumes",
    }),
  );
export type VolumesListByResourceGroupInput =
  typeof VolumesListByResourceGroupInput.Type;

// Output Schema
export const VolumesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VolumesListByResourceGroupOutput =
  typeof VolumesListByResourceGroupOutput.Type;

// The operation
/**
 * Get a list of volumes in the provided resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const VolumesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesListByResourceGroupInput,
    outputSchema: VolumesListByResourceGroupOutput,
  }),
);
// Input Schema
export const VolumesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/volumes",
    }),
  );
export type VolumesListBySubscriptionInput =
  typeof VolumesListBySubscriptionInput.Type;

// Output Schema
export const VolumesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VolumesListBySubscriptionOutput =
  typeof VolumesListBySubscriptionOutput.Type;

// The operation
/**
 * Get a list of volumes in the provided subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const VolumesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesListBySubscriptionInput,
    outputSchema: VolumesListBySubscriptionOutput,
  }),
);
// Input Schema
export const VolumesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/volumes/{volumeName}",
  }),
);
export type VolumesUpdateInput = typeof VolumesUpdateInput.Type;

// Output Schema
export const VolumesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type VolumesUpdateOutput = typeof VolumesUpdateOutput.Type;

// The operation
/**
 * Update tags associated with the provided volume.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param volumeName - The name of the volume.
 */
export const VolumesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesUpdateInput,
  outputSchema: VolumesUpdateOutput,
}));
