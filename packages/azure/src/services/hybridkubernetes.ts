/**
 * Azure Hybridkubernetes API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ConnectedClusterCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}",
    }),
  );
export type ConnectedClusterCreateInput =
  typeof ConnectedClusterCreateInput.Type;

// Output Schema
export const ConnectedClusterCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectedClusterCreateOutput =
  typeof ConnectedClusterCreateOutput.Type;

// The operation
/**
 * Register a new Kubernetes cluster with Azure Resource Manager.
 *
 * API to register a new Kubernetes cluster and create a tracked resource in Azure Resource Manager (ARM).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConnectedClusterCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectedClusterCreateInput,
    outputSchema: ConnectedClusterCreateOutput,
  }),
);
// Input Schema
export const ConnectedClusterDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}",
    }),
  );
export type ConnectedClusterDeleteInput =
  typeof ConnectedClusterDeleteInput.Type;

// Output Schema
export const ConnectedClusterDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectedClusterDeleteOutput =
  typeof ConnectedClusterDeleteOutput.Type;

// The operation
/**
 * Delete a connected cluster.
 *
 * Delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConnectedClusterDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectedClusterDeleteInput,
    outputSchema: ConnectedClusterDeleteOutput,
  }),
);
// Input Schema
export const ConnectedClusterGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}",
    }),
  );
export type ConnectedClusterGetInput = typeof ConnectedClusterGetInput.Type;

// Output Schema
export const ConnectedClusterGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectedClusterGetOutput = typeof ConnectedClusterGetOutput.Type;

// The operation
/**
 * Get the properties of the specified connected cluster.
 *
 * Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConnectedClusterGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectedClusterGetInput,
  outputSchema: ConnectedClusterGetOutput,
}));
// Input Schema
export const ConnectedClusterListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters",
    }),
  );
export type ConnectedClusterListByResourceGroupInput =
  typeof ConnectedClusterListByResourceGroupInput.Type;

// Output Schema
export const ConnectedClusterListByResourceGroupOutput =
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
export type ConnectedClusterListByResourceGroupOutput =
  typeof ConnectedClusterListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all connected clusters
 *
 * API to enumerate registered connected K8s clusters under a Resource Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConnectedClusterListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedClusterListByResourceGroupInput,
    outputSchema: ConnectedClusterListByResourceGroupOutput,
  }));
// Input Schema
export const ConnectedClusterListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Kubernetes/connectedClusters",
    }),
  );
export type ConnectedClusterListBySubscriptionInput =
  typeof ConnectedClusterListBySubscriptionInput.Type;

// Output Schema
export const ConnectedClusterListBySubscriptionOutput =
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
export type ConnectedClusterListBySubscriptionOutput =
  typeof ConnectedClusterListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all connected clusters
 *
 * API to enumerate registered connected K8s clusters under a Subscription
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ConnectedClusterListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedClusterListBySubscriptionInput,
    outputSchema: ConnectedClusterListBySubscriptionOutput,
  }));
// Input Schema
export const ConnectedClusterListClusterUserCredentialInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}/listClusterUserCredential",
    }),
  );
export type ConnectedClusterListClusterUserCredentialInput =
  typeof ConnectedClusterListClusterUserCredentialInput.Type;

// Output Schema
export const ConnectedClusterListClusterUserCredentialOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    hybridConnectionConfig: Schema.optional(
      Schema.Struct({
        expirationTime: Schema.optional(Schema.Number),
        hybridConnectionName: Schema.optional(Schema.String),
        relay: Schema.optional(Schema.String),
        token: Schema.optional(Schema.String),
      }),
    ),
    kubeconfigs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ConnectedClusterListClusterUserCredentialOutput =
  typeof ConnectedClusterListClusterUserCredentialOutput.Type;

// The operation
/**
 * Gets cluster user credentials of a connected cluster
 *
 * Gets cluster user credentials of the connected cluster with a specified resource group and name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConnectedClusterListClusterUserCredential =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConnectedClusterListClusterUserCredentialInput,
    outputSchema: ConnectedClusterListClusterUserCredentialOutput,
  }));
// Input Schema
export const ConnectedClusterUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Kubernetes/connectedClusters/{clusterName}",
    }),
  );
export type ConnectedClusterUpdateInput =
  typeof ConnectedClusterUpdateInput.Type;

// Output Schema
export const ConnectedClusterUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ConnectedClusterUpdateOutput =
  typeof ConnectedClusterUpdateOutput.Type;

// The operation
/**
 * Updates a connected cluster.
 *
 * API to update certain properties of the connected cluster resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ConnectedClusterUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectedClusterUpdateInput,
    outputSchema: ConnectedClusterUpdateOutput,
  }),
);
// Input Schema
export const OperationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Kubernetes/operations" }),
);
export type OperationsGetInput = typeof OperationsGetInput.Type;

// Output Schema
export const OperationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type OperationsGetOutput = typeof OperationsGetOutput.Type;

// The operation
/**
 * Lists all of the available API operations for Connected Cluster resource.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsGetInput,
  outputSchema: OperationsGetOutput,
}));
