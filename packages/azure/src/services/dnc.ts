/**
 * Azure Dnc API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ControllerCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/controller/{resourceName}",
  }),
);
export type ControllerCreateInput = typeof ControllerCreateInput.Type;

// Output Schema
export const ControllerCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  },
);
export type ControllerCreateOutput = typeof ControllerCreateOutput.Type;

// The operation
/**
 * Create a dnc controller
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ControllerCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ControllerCreateInput,
  outputSchema: ControllerCreateOutput,
}));
// Input Schema
export const ControllerDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/controller/{resourceName}",
  }),
);
export type ControllerDeleteInput = typeof ControllerDeleteInput.Type;

// Output Schema
export const ControllerDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ControllerDeleteOutput = typeof ControllerDeleteOutput.Type;

// The operation
/**
 * Deletes the DNC controller
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ControllerDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ControllerDeleteInput,
  outputSchema: ControllerDeleteOutput,
}));
// Input Schema
export const ControllerGetDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/controller/{resourceName}",
    }),
  );
export type ControllerGetDetailsInput = typeof ControllerGetDetailsInput.Type;

// Output Schema
export const ControllerGetDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ControllerGetDetailsOutput = typeof ControllerGetDetailsOutput.Type;

// The operation
/**
 * Gets details about the specified dnc controller.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ControllerGetDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ControllerGetDetailsInput,
    outputSchema: ControllerGetDetailsOutput,
  }),
);
// Input Schema
export const ControllerPatchInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/controller/{resourceName}",
  }),
);
export type ControllerPatchInput = typeof ControllerPatchInput.Type;

// Output Schema
export const ControllerPatchOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ControllerPatchOutput = typeof ControllerPatchOutput.Type;

// The operation
/**
 * Update dnc controller
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ControllerPatch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ControllerPatchInput,
  outputSchema: ControllerPatchOutput,
}));
// Input Schema
export const DelegatedNetworkListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/controllers",
    }),
  );
export type DelegatedNetworkListByResourceGroupInput =
  typeof DelegatedNetworkListByResourceGroupInput.Type;

// Output Schema
export const DelegatedNetworkListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DelegatedNetworkListByResourceGroupOutput =
  typeof DelegatedNetworkListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the delegatedController resources in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DelegatedNetworkListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DelegatedNetworkListByResourceGroupInput,
    outputSchema: DelegatedNetworkListByResourceGroupOutput,
  }));
// Input Schema
export const DelegatedNetworkListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DelegatedNetwork/controllers",
    }),
  );
export type DelegatedNetworkListBySubscriptionInput =
  typeof DelegatedNetworkListBySubscriptionInput.Type;

// Output Schema
export const DelegatedNetworkListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DelegatedNetworkListBySubscriptionOutput =
  typeof DelegatedNetworkListBySubscriptionOutput.Type;

// The operation
/**
 * Get all the delegatedController resources in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DelegatedNetworkListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DelegatedNetworkListBySubscriptionInput,
    outputSchema: DelegatedNetworkListBySubscriptionOutput,
  }));
// Input Schema
export const DelegatedSubnetServiceDeleteDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/delegatedSubnets/{resourceName}",
    }),
  );
export type DelegatedSubnetServiceDeleteDetailsInput =
  typeof DelegatedSubnetServiceDeleteDetailsInput.Type;

// Output Schema
export const DelegatedSubnetServiceDeleteDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DelegatedSubnetServiceDeleteDetailsOutput =
  typeof DelegatedSubnetServiceDeleteDetailsOutput.Type;

// The operation
/**
 * Delete dnc DelegatedSubnet.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DelegatedSubnetServiceDeleteDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DelegatedSubnetServiceDeleteDetailsInput,
    outputSchema: DelegatedSubnetServiceDeleteDetailsOutput,
  }));
// Input Schema
export const DelegatedSubnetServiceGetDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/delegatedSubnets/{resourceName}",
    }),
  );
export type DelegatedSubnetServiceGetDetailsInput =
  typeof DelegatedSubnetServiceGetDetailsInput.Type;

// Output Schema
export const DelegatedSubnetServiceGetDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DelegatedSubnetServiceGetDetailsOutput =
  typeof DelegatedSubnetServiceGetDetailsOutput.Type;

// The operation
/**
 * Gets details about the specified dnc DelegatedSubnet Link.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DelegatedSubnetServiceGetDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DelegatedSubnetServiceGetDetailsInput,
    outputSchema: DelegatedSubnetServiceGetDetailsOutput,
  }));
// Input Schema
export const DelegatedSubnetServiceListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/delegatedSubnets",
    }),
  );
export type DelegatedSubnetServiceListByResourceGroupInput =
  typeof DelegatedSubnetServiceListByResourceGroupInput.Type;

// Output Schema
export const DelegatedSubnetServiceListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DelegatedSubnetServiceListByResourceGroupOutput =
  typeof DelegatedSubnetServiceListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the DelegatedSubnets resources in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DelegatedSubnetServiceListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DelegatedSubnetServiceListByResourceGroupInput,
    outputSchema: DelegatedSubnetServiceListByResourceGroupOutput,
  }));
// Input Schema
export const DelegatedSubnetServiceListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DelegatedNetwork/delegatedSubnets",
    }),
  );
export type DelegatedSubnetServiceListBySubscriptionInput =
  typeof DelegatedSubnetServiceListBySubscriptionInput.Type;

// Output Schema
export const DelegatedSubnetServiceListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DelegatedSubnetServiceListBySubscriptionOutput =
  typeof DelegatedSubnetServiceListBySubscriptionOutput.Type;

// The operation
/**
 * Get all the DelegatedSubnets resources in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DelegatedSubnetServiceListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DelegatedSubnetServiceListBySubscriptionInput,
    outputSchema: DelegatedSubnetServiceListBySubscriptionOutput,
  }));
// Input Schema
export const DelegatedSubnetServicePatchDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/delegatedSubnets/{resourceName}",
    }),
  );
export type DelegatedSubnetServicePatchDetailsInput =
  typeof DelegatedSubnetServicePatchDetailsInput.Type;

// Output Schema
export const DelegatedSubnetServicePatchDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DelegatedSubnetServicePatchDetailsOutput =
  typeof DelegatedSubnetServicePatchDetailsOutput.Type;

// The operation
/**
 * Patch delegated subnet resource
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DelegatedSubnetServicePatchDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DelegatedSubnetServicePatchDetailsInput,
    outputSchema: DelegatedSubnetServicePatchDetailsOutput,
  }));
// Input Schema
export const DelegatedSubnetServicePutDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/delegatedSubnets/{resourceName}",
    }),
  );
export type DelegatedSubnetServicePutDetailsInput =
  typeof DelegatedSubnetServicePutDetailsInput.Type;

// Output Schema
export const DelegatedSubnetServicePutDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DelegatedSubnetServicePutDetailsOutput =
  typeof DelegatedSubnetServicePutDetailsOutput.Type;

// The operation
/**
 * Put delegated subnet resource
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DelegatedSubnetServicePutDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DelegatedSubnetServicePutDetailsInput,
    outputSchema: DelegatedSubnetServicePutDetailsOutput,
  }));
// Input Schema
export const OrchestratorInstanceServiceCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/orchestrators/{resourceName}",
    }),
  );
export type OrchestratorInstanceServiceCreateInput =
  typeof OrchestratorInstanceServiceCreateInput.Type;

// Output Schema
export const OrchestratorInstanceServiceCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    kind: Schema.Literals(["Kubernetes"]),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type OrchestratorInstanceServiceCreateOutput =
  typeof OrchestratorInstanceServiceCreateOutput.Type;

// The operation
/**
 * Create a orchestrator instance
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const OrchestratorInstanceServiceCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrchestratorInstanceServiceCreateInput,
    outputSchema: OrchestratorInstanceServiceCreateOutput,
  }));
// Input Schema
export const OrchestratorInstanceServiceDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/orchestrators/{resourceName}",
    }),
  );
export type OrchestratorInstanceServiceDeleteInput =
  typeof OrchestratorInstanceServiceDeleteInput.Type;

// Output Schema
export const OrchestratorInstanceServiceDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OrchestratorInstanceServiceDeleteOutput =
  typeof OrchestratorInstanceServiceDeleteOutput.Type;

// The operation
/**
 * Deletes the Orchestrator Instance
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const OrchestratorInstanceServiceDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrchestratorInstanceServiceDeleteInput,
    outputSchema: OrchestratorInstanceServiceDeleteOutput,
  }));
// Input Schema
export const OrchestratorInstanceServiceGetDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/orchestrators/{resourceName}",
    }),
  );
export type OrchestratorInstanceServiceGetDetailsInput =
  typeof OrchestratorInstanceServiceGetDetailsInput.Type;

// Output Schema
export const OrchestratorInstanceServiceGetDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    kind: Schema.Literals(["Kubernetes"]),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type OrchestratorInstanceServiceGetDetailsOutput =
  typeof OrchestratorInstanceServiceGetDetailsOutput.Type;

// The operation
/**
 * Gets details about the orchestrator instance.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const OrchestratorInstanceServiceGetDetails =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrchestratorInstanceServiceGetDetailsInput,
    outputSchema: OrchestratorInstanceServiceGetDetailsOutput,
  }));
// Input Schema
export const OrchestratorInstanceServiceListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/orchestrators",
    }),
  );
export type OrchestratorInstanceServiceListByResourceGroupInput =
  typeof OrchestratorInstanceServiceListByResourceGroupInput.Type;

// Output Schema
export const OrchestratorInstanceServiceListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        kind: Schema.Literals(["Kubernetes"]),
        identity: Schema.optional(
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            tenantId: Schema.optional(Schema.String),
            type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
          }),
        ),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrchestratorInstanceServiceListByResourceGroupOutput =
  typeof OrchestratorInstanceServiceListByResourceGroupOutput.Type;

// The operation
/**
 * Get all the OrchestratorInstances resources in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const OrchestratorInstanceServiceListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrchestratorInstanceServiceListByResourceGroupInput,
    outputSchema: OrchestratorInstanceServiceListByResourceGroupOutput,
  }));
// Input Schema
export const OrchestratorInstanceServiceListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DelegatedNetwork/orchestrators",
    }),
  );
export type OrchestratorInstanceServiceListBySubscriptionInput =
  typeof OrchestratorInstanceServiceListBySubscriptionInput.Type;

// Output Schema
export const OrchestratorInstanceServiceListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        kind: Schema.Literals(["Kubernetes"]),
        identity: Schema.optional(
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            tenantId: Schema.optional(Schema.String),
            type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
          }),
        ),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrchestratorInstanceServiceListBySubscriptionOutput =
  typeof OrchestratorInstanceServiceListBySubscriptionOutput.Type;

// The operation
/**
 * Get all the orchestratorInstance resources in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const OrchestratorInstanceServiceListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrchestratorInstanceServiceListBySubscriptionInput,
    outputSchema: OrchestratorInstanceServiceListBySubscriptionOutput,
  }));
// Input Schema
export const OrchestratorInstanceServicePatchInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DelegatedNetwork/orchestrators/{resourceName}",
    }),
  );
export type OrchestratorInstanceServicePatchInput =
  typeof OrchestratorInstanceServicePatchInput.Type;

// Output Schema
export const OrchestratorInstanceServicePatchOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    kind: Schema.Literals(["Kubernetes"]),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["SystemAssigned", "None"])),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type OrchestratorInstanceServicePatchOutput =
  typeof OrchestratorInstanceServicePatchOutput.Type;

// The operation
/**
 * Update Orchestrator Instance
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const OrchestratorInstanceServicePatch =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrchestratorInstanceServicePatchInput,
    outputSchema: OrchestratorInstanceServicePatchOutput,
  }));
