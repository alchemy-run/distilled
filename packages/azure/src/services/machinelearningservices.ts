/**
 * Azure Machinelearningservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveNullableString, SensitiveString } from "../sensitive.ts";

// Input Schema
export const BatchDeploymentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}",
    }),
  );
export type BatchDeploymentsCreateOrUpdateInput =
  typeof BatchDeploymentsCreateOrUpdateInput.Type;

// Output Schema
export const BatchDeploymentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BatchDeploymentsCreateOrUpdateOutput =
  typeof BatchDeploymentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates/updates a batch inference deployment (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 * @param deploymentName - The identifier for the Batch deployments.
 */
export const BatchDeploymentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BatchDeploymentsCreateOrUpdateInput,
    outputSchema: BatchDeploymentsCreateOrUpdateOutput,
  }));
// Input Schema
export const BatchDeploymentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}",
    }),
  );
export type BatchDeploymentsDeleteInput =
  typeof BatchDeploymentsDeleteInput.Type;

// Output Schema
export const BatchDeploymentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BatchDeploymentsDeleteOutput =
  typeof BatchDeploymentsDeleteOutput.Type;

// The operation
/**
 * Delete Batch Inference deployment (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 * @param deploymentName - The identifier for the Batch deployments.
 */
export const BatchDeploymentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BatchDeploymentsDeleteInput,
    outputSchema: BatchDeploymentsDeleteOutput,
  }),
);
// Input Schema
export const BatchDeploymentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}",
    }),
  );
export type BatchDeploymentsGetInput = typeof BatchDeploymentsGetInput.Type;

// Output Schema
export const BatchDeploymentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BatchDeploymentsGetOutput = typeof BatchDeploymentsGetOutput.Type;

// The operation
/**
 * Get batch inference deployment by id.
 *
 * Gets a batch inference deployment by id.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 * @param deploymentName - The identifier for the Batch deployments.
 */
export const BatchDeploymentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BatchDeploymentsGetInput,
  outputSchema: BatchDeploymentsGetOutput,
}));
// Input Schema
export const BatchDeploymentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments",
    }),
  );
export type BatchDeploymentsListInput = typeof BatchDeploymentsListInput.Type;

// Output Schema
export const BatchDeploymentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BatchDeploymentsListOutput = typeof BatchDeploymentsListOutput.Type;

// The operation
/**
 * Lists Batch inference deployments in the workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 * @param $orderBy - Ordering of list.
 * @param $top - Top of list.
 * @param $skip - Continuation token for pagination.
 */
export const BatchDeploymentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BatchDeploymentsListInput,
    outputSchema: BatchDeploymentsListOutput,
  }),
);
// Input Schema
export const BatchDeploymentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}",
    }),
  );
export type BatchDeploymentsUpdateInput =
  typeof BatchDeploymentsUpdateInput.Type;

// Output Schema
export const BatchDeploymentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BatchDeploymentsUpdateOutput =
  typeof BatchDeploymentsUpdateOutput.Type;

// The operation
/**
 * Update a batch inference deployment (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 * @param deploymentName - The identifier for the Batch deployments.
 */
export const BatchDeploymentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BatchDeploymentsUpdateInput,
    outputSchema: BatchDeploymentsUpdateOutput,
  }),
);
// Input Schema
export const BatchEndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}",
    }),
  );
export type BatchEndpointsCreateOrUpdateInput =
  typeof BatchEndpointsCreateOrUpdateInput.Type;

// Output Schema
export const BatchEndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BatchEndpointsCreateOrUpdateOutput =
  typeof BatchEndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a batch inference endpoint (asynchronous).
 *
 * Creates a batch inference endpoint (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 */
export const BatchEndpointsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BatchEndpointsCreateOrUpdateInput,
    outputSchema: BatchEndpointsCreateOrUpdateOutput,
  }));
// Input Schema
export const BatchEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}",
    }),
  );
export type BatchEndpointsDeleteInput = typeof BatchEndpointsDeleteInput.Type;

// Output Schema
export const BatchEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BatchEndpointsDeleteOutput = typeof BatchEndpointsDeleteOutput.Type;

// The operation
/**
 * Delete Batch Inference Endpoint (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 */
export const BatchEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BatchEndpointsDeleteInput,
    outputSchema: BatchEndpointsDeleteOutput,
  }),
);
// Input Schema
export const BatchEndpointsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}",
  }),
);
export type BatchEndpointsGetInput = typeof BatchEndpointsGetInput.Type;

// Output Schema
export const BatchEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BatchEndpointsGetOutput = typeof BatchEndpointsGetOutput.Type;

// The operation
/**
 * Get batch inference endpoint by name.
 *
 * Gets a batch inference endpoint by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 */
export const BatchEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BatchEndpointsGetInput,
  outputSchema: BatchEndpointsGetOutput,
}));
// Input Schema
export const BatchEndpointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    count: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints",
    }),
  );
export type BatchEndpointsListInput = typeof BatchEndpointsListInput.Type;

// Output Schema
export const BatchEndpointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BatchEndpointsListOutput = typeof BatchEndpointsListOutput.Type;

// The operation
/**
 * Lists Batch inference endpoint in the workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param count - Number of endpoints to be retrieved in a page of results.
 * @param $skip - Continuation token for pagination.
 */
export const BatchEndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BatchEndpointsListInput,
  outputSchema: BatchEndpointsListOutput,
}));
// Input Schema
export const BatchEndpointsListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/listkeys",
    }),
  );
export type BatchEndpointsListKeysInput =
  typeof BatchEndpointsListKeysInput.Type;

// Output Schema
export const BatchEndpointsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.NullOr(Schema.String)),
    secondaryKey: Schema.optional(Schema.NullOr(Schema.String)),
  });
export type BatchEndpointsListKeysOutput =
  typeof BatchEndpointsListKeysOutput.Type;

// The operation
/**
 * Lists batch Inference Endpoint keys.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 */
export const BatchEndpointsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BatchEndpointsListKeysInput,
    outputSchema: BatchEndpointsListKeysOutput,
  }),
);
// Input Schema
export const BatchEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}",
    }),
  );
export type BatchEndpointsUpdateInput = typeof BatchEndpointsUpdateInput.Type;

// Output Schema
export const BatchEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BatchEndpointsUpdateOutput = typeof BatchEndpointsUpdateOutput.Type;

// The operation
/**
 * Update a batch inference endpoint (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Name for the Batch Endpoint.
 */
export const BatchEndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BatchEndpointsUpdateInput,
    outputSchema: BatchEndpointsUpdateOutput,
  }),
);
// Input Schema
export const CapabilityHostsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/capabilityHosts/{name}",
    }),
  );
export type CapabilityHostsCreateOrUpdateInput =
  typeof CapabilityHostsCreateOrUpdateInput.Type;

// Output Schema
export const CapabilityHostsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CapabilityHostsCreateOrUpdateOutput =
  typeof CapabilityHostsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update capabilityHost.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - CapabilityHost name.
 */
export const CapabilityHostsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CapabilityHostsCreateOrUpdateInput,
    outputSchema: CapabilityHostsCreateOrUpdateOutput,
  }));
// Input Schema
export const CapabilityHostsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/capabilityHosts/{name}",
    }),
  );
export type CapabilityHostsDeleteInput = typeof CapabilityHostsDeleteInput.Type;

// Output Schema
export const CapabilityHostsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CapabilityHostsDeleteOutput =
  typeof CapabilityHostsDeleteOutput.Type;

// The operation
/**
 * Delete capabilityHost.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - CapabilityHost name.
 */
export const CapabilityHostsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CapabilityHostsDeleteInput,
    outputSchema: CapabilityHostsDeleteOutput,
  }),
);
// Input Schema
export const CapabilityHostsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/capabilityHosts/{name}",
    }),
  );
export type CapabilityHostsGetInput = typeof CapabilityHostsGetInput.Type;

// Output Schema
export const CapabilityHostsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CapabilityHostsGetOutput = typeof CapabilityHostsGetOutput.Type;

// The operation
/**
 * Get capabilityHost.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - CapabilityHost name.
 */
export const CapabilityHostsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapabilityHostsGetInput,
  outputSchema: CapabilityHostsGetOutput,
}));
// Input Schema
export const CodeContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}",
    }),
  );
export type CodeContainersCreateOrUpdateInput =
  typeof CodeContainersCreateOrUpdateInput.Type;

// Output Schema
export const CodeContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CodeContainersCreateOrUpdateOutput =
  typeof CodeContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 */
export const CodeContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeContainersCreateOrUpdateInput,
    outputSchema: CodeContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const CodeContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}",
    }),
  );
export type CodeContainersDeleteInput = typeof CodeContainersDeleteInput.Type;

// Output Schema
export const CodeContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CodeContainersDeleteOutput = typeof CodeContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 */
export const CodeContainersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CodeContainersDeleteInput,
    outputSchema: CodeContainersDeleteOutput,
  }),
);
// Input Schema
export const CodeContainersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}",
  }),
);
export type CodeContainersGetInput = typeof CodeContainersGetInput.Type;

// Output Schema
export const CodeContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CodeContainersGetOutput = typeof CodeContainersGetOutput.Type;

// The operation
/**
 * Get containers.
 *
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 */
export const CodeContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CodeContainersGetInput,
  outputSchema: CodeContainersGetOutput,
}));
// Input Schema
export const CodeContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes",
    }),
  );
export type CodeContainersListInput = typeof CodeContainersListInput.Type;

// Output Schema
export const CodeContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CodeContainersListOutput = typeof CodeContainersListOutput.Type;

// The operation
/**
 * List containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param $skip - Continuation token for pagination.
 */
export const CodeContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CodeContainersListInput,
  outputSchema: CodeContainersListOutput,
}));
// Input Schema
export const CodeVersionsCreateOrGetStartPendingUploadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}/versions/{version}/startPendingUpload",
    }),
  );
export type CodeVersionsCreateOrGetStartPendingUploadInput =
  typeof CodeVersionsCreateOrGetStartPendingUploadInput.Type;

// Output Schema
export const CodeVersionsCreateOrGetStartPendingUploadOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    blobReferenceForConsumption: Schema.optional(
      Schema.Struct({
        blobUri: Schema.optional(Schema.NullOr(Schema.String)),
        credential: Schema.optional(
          Schema.Struct({
            credentialType: Schema.Literals(["SAS"]),
          }),
        ),
        storageAccountArmId: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
    pendingUploadId: Schema.optional(Schema.NullOr(Schema.String)),
    pendingUploadType: Schema.optional(
      Schema.Literals(["None", "TemporaryBlobReference"]),
    ),
  });
export type CodeVersionsCreateOrGetStartPendingUploadOutput =
  typeof CodeVersionsCreateOrGetStartPendingUploadOutput.Type;

// The operation
/**
 * Generate a storage location and credential for the client to upload a code asset to.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const CodeVersionsCreateOrGetStartPendingUpload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CodeVersionsCreateOrGetStartPendingUploadInput,
    outputSchema: CodeVersionsCreateOrGetStartPendingUploadOutput,
  }));
// Input Schema
export const CodeVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}/versions/{version}",
    }),
  );
export type CodeVersionsCreateOrUpdateInput =
  typeof CodeVersionsCreateOrUpdateInput.Type;

// Output Schema
export const CodeVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CodeVersionsCreateOrUpdateOutput =
  typeof CodeVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const CodeVersionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CodeVersionsCreateOrUpdateInput,
    outputSchema: CodeVersionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CodeVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}/versions/{version}",
    }),
  );
export type CodeVersionsDeleteInput = typeof CodeVersionsDeleteInput.Type;

// Output Schema
export const CodeVersionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CodeVersionsDeleteOutput = typeof CodeVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const CodeVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CodeVersionsDeleteInput,
  outputSchema: CodeVersionsDeleteOutput,
}));
// Input Schema
export const CodeVersionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  version: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}/versions/{version}",
  }),
);
export type CodeVersionsGetInput = typeof CodeVersionsGetInput.Type;

// Output Schema
export const CodeVersionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type CodeVersionsGetOutput = typeof CodeVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const CodeVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CodeVersionsGetInput,
  outputSchema: CodeVersionsGetOutput,
}));
// Input Schema
export const CodeVersionsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $orderBy: Schema.optional(Schema.String),
  $top: Schema.optional(Schema.Number),
  $skip: Schema.optional(Schema.String),
  hash: Schema.optional(Schema.String),
  hashVersion: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}/versions",
  }),
);
export type CodeVersionsListInput = typeof CodeVersionsListInput.Type;

// Output Schema
export const CodeVersionsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type CodeVersionsListOutput = typeof CodeVersionsListOutput.Type;

// The operation
/**
 * List versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param $orderBy - Ordering of list.
 * @param $top - Maximum number of records to return.
 * @param $skip - Continuation token for pagination.
 * @param hash - If specified, return CodeVersion assets with specified content hash value, regardless of name
 * @param hashVersion - Hash algorithm version when listing by hash
 */
export const CodeVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CodeVersionsListInput,
  outputSchema: CodeVersionsListOutput,
}));
// Input Schema
export const CodeVersionsPublishInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/codes/{name}/versions/{version}/publish",
    }),
  );
export type CodeVersionsPublishInput = typeof CodeVersionsPublishInput.Type;

// Output Schema
export const CodeVersionsPublishOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CodeVersionsPublishOutput = typeof CodeVersionsPublishOutput.Type;

// The operation
/**
 * Publish version asset into registry.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const CodeVersionsPublish = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CodeVersionsPublishInput,
  outputSchema: CodeVersionsPublishOutput,
}));
// Input Schema
export const ComponentContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}",
    }),
  );
export type ComponentContainersCreateOrUpdateInput =
  typeof ComponentContainersCreateOrUpdateInput.Type;

// Output Schema
export const ComponentContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ComponentContainersCreateOrUpdateOutput =
  typeof ComponentContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 */
export const ComponentContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ComponentContainersCreateOrUpdateInput,
    outputSchema: ComponentContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const ComponentContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}",
    }),
  );
export type ComponentContainersDeleteInput =
  typeof ComponentContainersDeleteInput.Type;

// Output Schema
export const ComponentContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ComponentContainersDeleteOutput =
  typeof ComponentContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 */
export const ComponentContainersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComponentContainersDeleteInput,
    outputSchema: ComponentContainersDeleteOutput,
  }),
);
// Input Schema
export const ComponentContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}",
    }),
  );
export type ComponentContainersGetInput =
  typeof ComponentContainersGetInput.Type;

// Output Schema
export const ComponentContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ComponentContainersGetOutput =
  typeof ComponentContainersGetOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 */
export const ComponentContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComponentContainersGetInput,
    outputSchema: ComponentContainersGetOutput,
  }),
);
// Input Schema
export const ComponentContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components",
    }),
  );
export type ComponentContainersListInput =
  typeof ComponentContainersListInput.Type;

// Output Schema
export const ComponentContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ComponentContainersListOutput =
  typeof ComponentContainersListOutput.Type;

// The operation
/**
 * List component containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param $skip - Continuation token for pagination.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const ComponentContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComponentContainersListInput,
    outputSchema: ComponentContainersListOutput,
  }),
);
// Input Schema
export const ComponentVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}/versions/{version}",
    }),
  );
export type ComponentVersionsCreateOrUpdateInput =
  typeof ComponentVersionsCreateOrUpdateInput.Type;

// Output Schema
export const ComponentVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ComponentVersionsCreateOrUpdateOutput =
  typeof ComponentVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const ComponentVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ComponentVersionsCreateOrUpdateInput,
    outputSchema: ComponentVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ComponentVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}/versions/{version}",
    }),
  );
export type ComponentVersionsDeleteInput =
  typeof ComponentVersionsDeleteInput.Type;

// Output Schema
export const ComponentVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ComponentVersionsDeleteOutput =
  typeof ComponentVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const ComponentVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComponentVersionsDeleteInput,
    outputSchema: ComponentVersionsDeleteOutput,
  }),
);
// Input Schema
export const ComponentVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}/versions/{version}",
    }),
  );
export type ComponentVersionsGetInput = typeof ComponentVersionsGetInput.Type;

// Output Schema
export const ComponentVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ComponentVersionsGetOutput = typeof ComponentVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const ComponentVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComponentVersionsGetInput,
    outputSchema: ComponentVersionsGetOutput,
  }),
);
// Input Schema
export const ComponentVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}/versions",
    }),
  );
export type ComponentVersionsListInput = typeof ComponentVersionsListInput.Type;

// Output Schema
export const ComponentVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ComponentVersionsListOutput =
  typeof ComponentVersionsListOutput.Type;

// The operation
/**
 * List component versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param $orderBy - Ordering of list.
 * @param $top - Maximum number of records to return.
 * @param $skip - Continuation token for pagination.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const ComponentVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComponentVersionsListInput,
    outputSchema: ComponentVersionsListOutput,
  }),
);
// Input Schema
export const ComponentVersionsPublishInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/components/{name}/versions/{version}/publish",
    }),
  );
export type ComponentVersionsPublishInput =
  typeof ComponentVersionsPublishInput.Type;

// Output Schema
export const ComponentVersionsPublishOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ComponentVersionsPublishOutput =
  typeof ComponentVersionsPublishOutput.Type;

// The operation
/**
 * Publish version asset into registry.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const ComponentVersionsPublish = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComponentVersionsPublishInput,
    outputSchema: ComponentVersionsPublishOutput,
  }),
);
// Input Schema
export const ComputeCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    computeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}",
    }),
  );
export type ComputeCreateOrUpdateInput = typeof ComputeCreateOrUpdateInput.Type;

// Output Schema
export const ComputeCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ComputeCreateOrUpdateOutput =
  typeof ComputeCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation. If your intent is to create a new compute, do a GET first to verify that it does not exist yet.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param computeName - Name of the Azure Machine Learning compute.
 */
export const ComputeCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComputeCreateOrUpdateInput,
    outputSchema: ComputeCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ComputeDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  computeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  underlyingResourceAction: Schema.Literals(["Delete", "Detach"]),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}",
  }),
);
export type ComputeDeleteInput = typeof ComputeDeleteInput.Type;

// Output Schema
export const ComputeDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ComputeDeleteOutput = typeof ComputeDeleteOutput.Type;

// The operation
/**
 * Deletes specified Machine Learning compute.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param computeName - Name of the Azure Machine Learning compute.
 * @param underlyingResourceAction - Delete the underlying compute if 'Delete', or detach the underlying compute from workspace if 'Detach'.
 */
export const ComputeDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputeDeleteInput,
  outputSchema: ComputeDeleteOutput,
}));
// Input Schema
export const ComputeGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  computeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}",
  }),
);
export type ComputeGetInput = typeof ComputeGetInput.Type;

// Output Schema
export const ComputeGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ComputeGetOutput = typeof ComputeGetOutput.Type;

// The operation
/**
 * Gets compute definition by its name. Any secrets (storage keys, service credentials, etc) are not returned - use 'keys' nested resource to get them.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param computeName - Name of the Azure Machine Learning compute.
 */
export const ComputeGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputeGetInput,
  outputSchema: ComputeGetOutput,
}));
// Input Schema
export const ComputeListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $skip: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes",
  }),
);
export type ComputeListInput = typeof ComputeListInput.Type;

// Output Schema
export const ComputeListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type ComputeListOutput = typeof ComputeListOutput.Type;

// The operation
/**
 * Gets computes in specified workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param $skip - Continuation token for pagination.
 */
export const ComputeList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputeListInput,
  outputSchema: ComputeListOutput,
}));
// Input Schema
export const ComputeListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  computeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/listKeys",
  }),
);
export type ComputeListKeysInput = typeof ComputeListKeysInput.Type;

// Output Schema
export const ComputeListKeysOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  computeType: Schema.Literals([
    "AKS",
    "Kubernetes",
    "AmlCompute",
    "ComputeInstance",
    "DataFactory",
    "VirtualMachine",
    "HDInsight",
    "Databricks",
    "DataLakeAnalytics",
    "SynapseSpark",
  ]),
});
export type ComputeListKeysOutput = typeof ComputeListKeysOutput.Type;

// The operation
/**
 * Gets secrets related to Machine Learning compute (storage keys, service credentials, etc).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param computeName - Name of the Azure Machine Learning compute.
 */
export const ComputeListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputeListKeysInput,
  outputSchema: ComputeListKeysOutput,
}));
// Input Schema
export const ComputeListNodesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  computeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/listNodes",
  }),
);
export type ComputeListNodesInput = typeof ComputeListNodesInput.Type;

// Output Schema
export const ComputeListNodesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    nodes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          nodeId: Schema.optional(Schema.String),
          privateIpAddress: Schema.optional(Schema.NullOr(Schema.String)),
          publicIpAddress: Schema.optional(Schema.NullOr(Schema.String)),
          port: Schema.optional(Schema.Number),
          nodeState: Schema.optional(
            Schema.Literals([
              "idle",
              "running",
              "preparing",
              "unusable",
              "leaving",
              "preempted",
            ]),
          ),
          runId: Schema.optional(Schema.NullOr(Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  },
);
export type ComputeListNodesOutput = typeof ComputeListNodesOutput.Type;

// The operation
/**
 * Get the details (e.g IP address, port etc) of all the compute nodes in the compute.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param computeName - Name of the Azure Machine Learning compute.
 */
export const ComputeListNodes = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputeListNodesInput,
  outputSchema: ComputeListNodesOutput,
}));
// Input Schema
export const ComputeRestartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  computeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/restart",
  }),
);
export type ComputeRestartInput = typeof ComputeRestartInput.Type;

// Output Schema
export const ComputeRestartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ComputeRestartOutput = typeof ComputeRestartOutput.Type;

// The operation
/**
 * Posts a restart action to a compute instance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param computeName - Name of the Azure Machine Learning compute.
 */
export const ComputeRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputeRestartInput,
  outputSchema: ComputeRestartOutput,
}));
// Input Schema
export const ComputeStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  computeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/start",
  }),
);
export type ComputeStartInput = typeof ComputeStartInput.Type;

// Output Schema
export const ComputeStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ComputeStartOutput = typeof ComputeStartOutput.Type;

// The operation
/**
 * Posts a start action to a compute instance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param computeName - Name of the Azure Machine Learning compute.
 */
export const ComputeStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputeStartInput,
  outputSchema: ComputeStartOutput,
}));
// Input Schema
export const ComputeStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  computeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}/stop",
  }),
);
export type ComputeStopInput = typeof ComputeStopInput.Type;

// Output Schema
export const ComputeStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ComputeStopOutput = typeof ComputeStopOutput.Type;

// The operation
/**
 * Posts a stop action to a compute instance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param computeName - Name of the Azure Machine Learning compute.
 */
export const ComputeStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputeStopInput,
  outputSchema: ComputeStopOutput,
}));
// Input Schema
export const ComputeUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  computeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/computes/{computeName}",
  }),
);
export type ComputeUpdateInput = typeof ComputeUpdateInput.Type;

// Output Schema
export const ComputeUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ComputeUpdateOutput = typeof ComputeUpdateOutput.Type;

// The operation
/**
 * Updates properties of a compute. This call will overwrite a compute if it exists. This is a nonrecoverable operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param computeName - Name of the Azure Machine Learning compute.
 */
export const ComputeUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputeUpdateInput,
  outputSchema: ComputeUpdateOutput,
}));
// Input Schema
export const DataContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}",
    }),
  );
export type DataContainersCreateOrUpdateInput =
  typeof DataContainersCreateOrUpdateInput.Type;

// Output Schema
export const DataContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataContainersCreateOrUpdateOutput =
  typeof DataContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 */
export const DataContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataContainersCreateOrUpdateInput,
    outputSchema: DataContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const DataContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}",
    }),
  );
export type DataContainersDeleteInput = typeof DataContainersDeleteInput.Type;

// Output Schema
export const DataContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataContainersDeleteOutput = typeof DataContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 */
export const DataContainersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataContainersDeleteInput,
    outputSchema: DataContainersDeleteOutput,
  }),
);
// Input Schema
export const DataContainersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}",
  }),
);
export type DataContainersGetInput = typeof DataContainersGetInput.Type;

// Output Schema
export const DataContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataContainersGetOutput = typeof DataContainersGetOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 */
export const DataContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataContainersGetInput,
  outputSchema: DataContainersGetOutput,
}));
// Input Schema
export const DataContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data",
    }),
  );
export type DataContainersListInput = typeof DataContainersListInput.Type;

// Output Schema
export const DataContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DataContainersListOutput = typeof DataContainersListOutput.Type;

// The operation
/**
 * List data containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param $skip - Continuation token for pagination.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const DataContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataContainersListInput,
  outputSchema: DataContainersListOutput,
}));
// Input Schema
export const DatastoresCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    skipValidation: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/datastores/{name}",
    }),
  );
export type DatastoresCreateOrUpdateInput =
  typeof DatastoresCreateOrUpdateInput.Type;

// Output Schema
export const DatastoresCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatastoresCreateOrUpdateOutput =
  typeof DatastoresCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update datastore.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Datastore name.
 * @param skipValidation - Flag to skip validation.
 */
export const DatastoresCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatastoresCreateOrUpdateInput,
    outputSchema: DatastoresCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DatastoresDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/datastores/{name}",
  }),
);
export type DatastoresDeleteInput = typeof DatastoresDeleteInput.Type;

// Output Schema
export const DatastoresDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatastoresDeleteOutput = typeof DatastoresDeleteOutput.Type;

// The operation
/**
 * Delete datastore.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Datastore name.
 */
export const DatastoresDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatastoresDeleteInput,
  outputSchema: DatastoresDeleteOutput,
}));
// Input Schema
export const DatastoresGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/datastores/{name}",
  }),
);
export type DatastoresGetInput = typeof DatastoresGetInput.Type;

// Output Schema
export const DatastoresGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DatastoresGetOutput = typeof DatastoresGetOutput.Type;

// The operation
/**
 * Get datastore.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Datastore name.
 */
export const DatastoresGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatastoresGetInput,
  outputSchema: DatastoresGetOutput,
}));
// Input Schema
export const DatastoresListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $skip: Schema.optional(Schema.String),
  count: Schema.optional(Schema.Number),
  isDefault: Schema.optional(Schema.Boolean),
  names: Schema.optional(Schema.String),
  searchText: Schema.optional(Schema.String),
  orderBy: Schema.optional(Schema.String),
  orderByAsc: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/datastores",
  }),
);
export type DatastoresListInput = typeof DatastoresListInput.Type;

// Output Schema
export const DatastoresListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type DatastoresListOutput = typeof DatastoresListOutput.Type;

// The operation
/**
 * List datastores.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param $skip - Continuation token for pagination.
 * @param count - Maximum number of results to return.
 * @param isDefault - Filter down to the workspace default datastore.
 * @param names - Names of datastores to return.
 * @param searchText - Text to search for in the datastore names.
 * @param orderBy - Order by property (createdtime | modifiedtime | name).
 * @param orderByAsc - Order by property in ascending order.
 */
export const DatastoresList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatastoresListInput,
  outputSchema: DatastoresListOutput,
}));
// Input Schema
export const DatastoresListSecretsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/datastores/{name}/listSecrets",
    }),
  );
export type DatastoresListSecretsInput = typeof DatastoresListSecretsInput.Type;

// Output Schema
export const DatastoresListSecretsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    secretsType: Schema.Literals([
      "AccountKey",
      "Certificate",
      "Sas",
      "ServicePrincipal",
    ]),
  });
export type DatastoresListSecretsOutput =
  typeof DatastoresListSecretsOutput.Type;

// The operation
/**
 * Get datastore secrets.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Datastore name.
 */
export const DatastoresListSecrets = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatastoresListSecretsInput,
    outputSchema: DatastoresListSecretsOutput,
  }),
);
// Input Schema
export const DataVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions/{version}",
    }),
  );
export type DataVersionsCreateOrUpdateInput =
  typeof DataVersionsCreateOrUpdateInput.Type;

// Output Schema
export const DataVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataVersionsCreateOrUpdateOutput =
  typeof DataVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const DataVersionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataVersionsCreateOrUpdateInput,
    outputSchema: DataVersionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DataVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions/{version}",
    }),
  );
export type DataVersionsDeleteInput = typeof DataVersionsDeleteInput.Type;

// Output Schema
export const DataVersionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataVersionsDeleteOutput = typeof DataVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const DataVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataVersionsDeleteInput,
  outputSchema: DataVersionsDeleteOutput,
}));
// Input Schema
export const DataVersionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  version: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions/{version}",
  }),
);
export type DataVersionsGetInput = typeof DataVersionsGetInput.Type;

// Output Schema
export const DataVersionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DataVersionsGetOutput = typeof DataVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const DataVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataVersionsGetInput,
  outputSchema: DataVersionsGetOutput,
}));
// Input Schema
export const DataVersionsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $orderBy: Schema.optional(Schema.String),
  $top: Schema.optional(Schema.Number),
  $skip: Schema.optional(Schema.String),
  $tags: Schema.optional(Schema.String),
  listViewType: Schema.optional(
    Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions",
  }),
);
export type DataVersionsListInput = typeof DataVersionsListInput.Type;

// Output Schema
export const DataVersionsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type DataVersionsListOutput = typeof DataVersionsListOutput.Type;

// The operation
/**
 * List data versions in the data container
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param $orderBy - Please choose OrderBy value from ['createdtime', 'modifiedtime']
 * @param $top - Top count of results, top count cannot be greater than the page size.
If topCount > page size, results with be default page size count will be returned
 * @param $skip - Continuation token for pagination.
 * @param $tags - Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2
 * @param listViewType - [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities.
 */
export const DataVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataVersionsListInput,
  outputSchema: DataVersionsListOutput,
}));
// Input Schema
export const DataVersionsPublishInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/data/{name}/versions/{version}/publish",
    }),
  );
export type DataVersionsPublishInput = typeof DataVersionsPublishInput.Type;

// Output Schema
export const DataVersionsPublishOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataVersionsPublishOutput = typeof DataVersionsPublishOutput.Type;

// The operation
/**
 * Publish version asset into registry.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const DataVersionsPublish = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataVersionsPublishInput,
  outputSchema: DataVersionsPublishOutput,
}));
// Input Schema
export const EnvironmentContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}",
    }),
  );
export type EnvironmentContainersCreateOrUpdateInput =
  typeof EnvironmentContainersCreateOrUpdateInput.Type;

// Output Schema
export const EnvironmentContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EnvironmentContainersCreateOrUpdateOutput =
  typeof EnvironmentContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 */
export const EnvironmentContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EnvironmentContainersCreateOrUpdateInput,
    outputSchema: EnvironmentContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const EnvironmentContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}",
    }),
  );
export type EnvironmentContainersDeleteInput =
  typeof EnvironmentContainersDeleteInput.Type;

// Output Schema
export const EnvironmentContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EnvironmentContainersDeleteOutput =
  typeof EnvironmentContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 */
export const EnvironmentContainersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentContainersDeleteInput,
    outputSchema: EnvironmentContainersDeleteOutput,
  }),
);
// Input Schema
export const EnvironmentContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}",
    }),
  );
export type EnvironmentContainersGetInput =
  typeof EnvironmentContainersGetInput.Type;

// Output Schema
export const EnvironmentContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EnvironmentContainersGetOutput =
  typeof EnvironmentContainersGetOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 */
export const EnvironmentContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentContainersGetInput,
    outputSchema: EnvironmentContainersGetOutput,
  }),
);
// Input Schema
export const EnvironmentContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments",
    }),
  );
export type EnvironmentContainersListInput =
  typeof EnvironmentContainersListInput.Type;

// Output Schema
export const EnvironmentContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type EnvironmentContainersListOutput =
  typeof EnvironmentContainersListOutput.Type;

// The operation
/**
 * List environment containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param $skip - Continuation token for pagination.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const EnvironmentContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentContainersListInput,
    outputSchema: EnvironmentContainersListOutput,
  }),
);
// Input Schema
export const EnvironmentVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions/{version}",
    }),
  );
export type EnvironmentVersionsCreateOrUpdateInput =
  typeof EnvironmentVersionsCreateOrUpdateInput.Type;

// Output Schema
export const EnvironmentVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EnvironmentVersionsCreateOrUpdateOutput =
  typeof EnvironmentVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an EnvironmentVersion.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const EnvironmentVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EnvironmentVersionsCreateOrUpdateInput,
    outputSchema: EnvironmentVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const EnvironmentVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions/{version}",
    }),
  );
export type EnvironmentVersionsDeleteInput =
  typeof EnvironmentVersionsDeleteInput.Type;

// Output Schema
export const EnvironmentVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EnvironmentVersionsDeleteOutput =
  typeof EnvironmentVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const EnvironmentVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentVersionsDeleteInput,
    outputSchema: EnvironmentVersionsDeleteOutput,
  }),
);
// Input Schema
export const EnvironmentVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions/{version}",
    }),
  );
export type EnvironmentVersionsGetInput =
  typeof EnvironmentVersionsGetInput.Type;

// Output Schema
export const EnvironmentVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EnvironmentVersionsGetOutput =
  typeof EnvironmentVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const EnvironmentVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentVersionsGetInput,
    outputSchema: EnvironmentVersionsGetOutput,
  }),
);
// Input Schema
export const EnvironmentVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions",
    }),
  );
export type EnvironmentVersionsListInput =
  typeof EnvironmentVersionsListInput.Type;

// Output Schema
export const EnvironmentVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type EnvironmentVersionsListOutput =
  typeof EnvironmentVersionsListOutput.Type;

// The operation
/**
 * List versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param $orderBy - Ordering of list.
 * @param $top - Maximum number of records to return.
 * @param $skip - Continuation token for pagination.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const EnvironmentVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentVersionsListInput,
    outputSchema: EnvironmentVersionsListOutput,
  }),
);
// Input Schema
export const EnvironmentVersionsPublishInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/environments/{name}/versions/{version}/publish",
    }),
  );
export type EnvironmentVersionsPublishInput =
  typeof EnvironmentVersionsPublishInput.Type;

// Output Schema
export const EnvironmentVersionsPublishOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EnvironmentVersionsPublishOutput =
  typeof EnvironmentVersionsPublishOutput.Type;

// The operation
/**
 * Publish version asset into registry.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const EnvironmentVersionsPublish = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentVersionsPublishInput,
    outputSchema: EnvironmentVersionsPublishOutput,
  }),
);
// Input Schema
export const FeaturesetContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}",
    }),
  );
export type FeaturesetContainersCreateOrUpdateInput =
  typeof FeaturesetContainersCreateOrUpdateInput.Type;

// Output Schema
export const FeaturesetContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FeaturesetContainersCreateOrUpdateOutput =
  typeof FeaturesetContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 */
export const FeaturesetContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturesetContainersCreateOrUpdateInput,
    outputSchema: FeaturesetContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const FeaturesetContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}",
    }),
  );
export type FeaturesetContainersDeleteInput =
  typeof FeaturesetContainersDeleteInput.Type;

// Output Schema
export const FeaturesetContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FeaturesetContainersDeleteOutput =
  typeof FeaturesetContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 */
export const FeaturesetContainersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FeaturesetContainersDeleteInput,
    outputSchema: FeaturesetContainersDeleteOutput,
  }),
);
// Input Schema
export const FeaturesetContainersGetEntityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}",
    }),
  );
export type FeaturesetContainersGetEntityInput =
  typeof FeaturesetContainersGetEntityInput.Type;

// Output Schema
export const FeaturesetContainersGetEntityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FeaturesetContainersGetEntityOutput =
  typeof FeaturesetContainersGetEntityOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 */
export const FeaturesetContainersGetEntity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturesetContainersGetEntityInput,
    outputSchema: FeaturesetContainersGetEntityOutput,
  }));
// Input Schema
export const FeaturesetContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
    pageSize: Schema.optional(Schema.Number),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    createdBy: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets",
    }),
  );
export type FeaturesetContainersListInput =
  typeof FeaturesetContainersListInput.Type;

// Output Schema
export const FeaturesetContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FeaturesetContainersListOutput =
  typeof FeaturesetContainersListOutput.Type;

// The operation
/**
 * List featurestore entity containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param $skip - Continuation token for pagination.
 * @param tags - Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2
 * @param listViewType - [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities.
 * @param pageSize - page size
 * @param name - name for the featureset
 * @param description - description for the feature set
 * @param createdBy - createdBy user name
 */
export const FeaturesetContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FeaturesetContainersListInput,
    outputSchema: FeaturesetContainersListOutput,
  }),
);
// Input Schema
export const FeaturesetVersionsBackfillInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}/backfill",
    }),
  );
export type FeaturesetVersionsBackfillInput =
  typeof FeaturesetVersionsBackfillInput.Type;

// Output Schema
export const FeaturesetVersionsBackfillOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobIds: Schema.optional(Schema.NullOr(Schema.Array(Schema.String))),
  });
export type FeaturesetVersionsBackfillOutput =
  typeof FeaturesetVersionsBackfillOutput.Type;

// The operation
/**
 * Backfill.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const FeaturesetVersionsBackfill = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FeaturesetVersionsBackfillInput,
    outputSchema: FeaturesetVersionsBackfillOutput,
  }),
);
// Input Schema
export const FeaturesetVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}",
    }),
  );
export type FeaturesetVersionsCreateOrUpdateInput =
  typeof FeaturesetVersionsCreateOrUpdateInput.Type;

// Output Schema
export const FeaturesetVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FeaturesetVersionsCreateOrUpdateOutput =
  typeof FeaturesetVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const FeaturesetVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturesetVersionsCreateOrUpdateInput,
    outputSchema: FeaturesetVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const FeaturesetVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}",
    }),
  );
export type FeaturesetVersionsDeleteInput =
  typeof FeaturesetVersionsDeleteInput.Type;

// Output Schema
export const FeaturesetVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FeaturesetVersionsDeleteOutput =
  typeof FeaturesetVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const FeaturesetVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FeaturesetVersionsDeleteInput,
    outputSchema: FeaturesetVersionsDeleteOutput,
  }),
);
// Input Schema
export const FeaturesetVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}",
    }),
  );
export type FeaturesetVersionsGetInput = typeof FeaturesetVersionsGetInput.Type;

// Output Schema
export const FeaturesetVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FeaturesetVersionsGetOutput =
  typeof FeaturesetVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const FeaturesetVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FeaturesetVersionsGetInput,
    outputSchema: FeaturesetVersionsGetOutput,
  }),
);
// Input Schema
export const FeaturesetVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
    pageSize: Schema.optional(Schema.Number),
    versionName: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    createdBy: Schema.optional(Schema.String),
    stage: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions",
    }),
  );
export type FeaturesetVersionsListInput =
  typeof FeaturesetVersionsListInput.Type;

// Output Schema
export const FeaturesetVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FeaturesetVersionsListOutput =
  typeof FeaturesetVersionsListOutput.Type;

// The operation
/**
 * List versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 * @param $skip - Continuation token for pagination.
 * @param tags - Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2
 * @param listViewType - [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities.
 * @param pageSize - page size
 * @param versionName - name for the featureset version
 * @param version - featureset version
 * @param description - description for the feature set version
 * @param createdBy - createdBy user name
 * @param stage - Specifies the featurestore stage
 */
export const FeaturesetVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FeaturesetVersionsListInput,
    outputSchema: FeaturesetVersionsListOutput,
  }),
);
// Input Schema
export const FeaturesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  featuresetName: Schema.String.pipe(T.PathParam()),
  featuresetVersion: Schema.String.pipe(T.PathParam()),
  featureName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{featuresetName}/versions/{featuresetVersion}/features/{featureName}",
  }),
);
export type FeaturesGetInput = typeof FeaturesGetInput.Type;

// Output Schema
export const FeaturesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FeaturesGetOutput = typeof FeaturesGetOutput.Type;

// The operation
/**
 * Get feature.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param featuresetName - Name of Azure Machine Learning featuresets.
 * @param featuresetVersion - Inference Version name.
 * @param featureName - Inference FeatureName name.
 */
export const FeaturesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FeaturesGetInput,
  outputSchema: FeaturesGetOutput,
}));
// Input Schema
export const FeaturesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  featuresetName: Schema.String.pipe(T.PathParam()),
  featuresetVersion: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $skip: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.String),
  featureName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  listViewType: Schema.optional(
    Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
  ),
  pageSize: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{featuresetName}/versions/{featuresetVersion}/features",
  }),
);
export type FeaturesListInput = typeof FeaturesListInput.Type;

// Output Schema
export const FeaturesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type FeaturesListOutput = typeof FeaturesListOutput.Type;

// The operation
/**
 * List Features.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param featuresetName - Name of Azure Machine Learning featuresets.
 * @param featuresetVersion - Inference Version name.
 * @param $skip - Continuation token for pagination.
 * @param tags - Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2
 * @param featureName - feature name.
 * @param description - Description of the featureset.
 * @param listViewType - [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities.
 * @param pageSize - Page size.
 */
export const FeaturesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FeaturesListInput,
  outputSchema: FeaturesListOutput,
}));
// Input Schema
export const FeaturestoreEntityContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}",
    }),
  );
export type FeaturestoreEntityContainersCreateOrUpdateInput =
  typeof FeaturestoreEntityContainersCreateOrUpdateInput.Type;

// Output Schema
export const FeaturestoreEntityContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FeaturestoreEntityContainersCreateOrUpdateOutput =
  typeof FeaturestoreEntityContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 */
export const FeaturestoreEntityContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturestoreEntityContainersCreateOrUpdateInput,
    outputSchema: FeaturestoreEntityContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const FeaturestoreEntityContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}",
    }),
  );
export type FeaturestoreEntityContainersDeleteInput =
  typeof FeaturestoreEntityContainersDeleteInput.Type;

// Output Schema
export const FeaturestoreEntityContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FeaturestoreEntityContainersDeleteOutput =
  typeof FeaturestoreEntityContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 */
export const FeaturestoreEntityContainersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturestoreEntityContainersDeleteInput,
    outputSchema: FeaturestoreEntityContainersDeleteOutput,
  }));
// Input Schema
export const FeaturestoreEntityContainersGetEntityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}",
    }),
  );
export type FeaturestoreEntityContainersGetEntityInput =
  typeof FeaturestoreEntityContainersGetEntityInput.Type;

// Output Schema
export const FeaturestoreEntityContainersGetEntityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FeaturestoreEntityContainersGetEntityOutput =
  typeof FeaturestoreEntityContainersGetEntityOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 */
export const FeaturestoreEntityContainersGetEntity =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturestoreEntityContainersGetEntityInput,
    outputSchema: FeaturestoreEntityContainersGetEntityOutput,
  }));
// Input Schema
export const FeaturestoreEntityContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
    pageSize: Schema.optional(Schema.Number),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    createdBy: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities",
    }),
  );
export type FeaturestoreEntityContainersListInput =
  typeof FeaturestoreEntityContainersListInput.Type;

// Output Schema
export const FeaturestoreEntityContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FeaturestoreEntityContainersListOutput =
  typeof FeaturestoreEntityContainersListOutput.Type;

// The operation
/**
 * List featurestore entity containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param $skip - Continuation token for pagination.
 * @param tags - Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2
 * @param listViewType - [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities.
 * @param pageSize - page size
 * @param name - name for the featurestore entity
 * @param description - description for the featurestore entity
 * @param createdBy - createdBy user name
 */
export const FeaturestoreEntityContainersList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturestoreEntityContainersListInput,
    outputSchema: FeaturestoreEntityContainersListOutput,
  }));
// Input Schema
export const FeaturestoreEntityVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}/versions/{version}",
    }),
  );
export type FeaturestoreEntityVersionsCreateOrUpdateInput =
  typeof FeaturestoreEntityVersionsCreateOrUpdateInput.Type;

// Output Schema
export const FeaturestoreEntityVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FeaturestoreEntityVersionsCreateOrUpdateOutput =
  typeof FeaturestoreEntityVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const FeaturestoreEntityVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturestoreEntityVersionsCreateOrUpdateInput,
    outputSchema: FeaturestoreEntityVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const FeaturestoreEntityVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}/versions/{version}",
    }),
  );
export type FeaturestoreEntityVersionsDeleteInput =
  typeof FeaturestoreEntityVersionsDeleteInput.Type;

// Output Schema
export const FeaturestoreEntityVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FeaturestoreEntityVersionsDeleteOutput =
  typeof FeaturestoreEntityVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const FeaturestoreEntityVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturestoreEntityVersionsDeleteInput,
    outputSchema: FeaturestoreEntityVersionsDeleteOutput,
  }));
// Input Schema
export const FeaturestoreEntityVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}/versions/{version}",
    }),
  );
export type FeaturestoreEntityVersionsGetInput =
  typeof FeaturestoreEntityVersionsGetInput.Type;

// Output Schema
export const FeaturestoreEntityVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FeaturestoreEntityVersionsGetOutput =
  typeof FeaturestoreEntityVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const FeaturestoreEntityVersionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturestoreEntityVersionsGetInput,
    outputSchema: FeaturestoreEntityVersionsGetOutput,
  }));
// Input Schema
export const FeaturestoreEntityVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
    pageSize: Schema.optional(Schema.Number),
    versionName: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    createdBy: Schema.optional(Schema.String),
    stage: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featurestoreEntities/{name}/versions",
    }),
  );
export type FeaturestoreEntityVersionsListInput =
  typeof FeaturestoreEntityVersionsListInput.Type;

// Output Schema
export const FeaturestoreEntityVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FeaturestoreEntityVersionsListOutput =
  typeof FeaturestoreEntityVersionsListOutput.Type;

// The operation
/**
 * List versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name. This is case-sensitive.
 * @param $skip - Continuation token for pagination.
 * @param tags - Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2
 * @param listViewType - [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities.
 * @param pageSize - page size
 * @param versionName - name for the featurestore entity version
 * @param version - featurestore entity version
 * @param description - description for the feature entity version
 * @param createdBy - createdBy user name
 * @param stage - Specifies the featurestore stage
 */
export const FeaturestoreEntityVersionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FeaturestoreEntityVersionsListInput,
    outputSchema: FeaturestoreEntityVersionsListOutput,
  }));
// Input Schema
export const JobsCancelInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs/{id}/cancel",
  }),
);
export type JobsCancelInput = typeof JobsCancelInput.Type;

// Output Schema
export const JobsCancelOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsCancelOutput = typeof JobsCancelOutput.Type;

// The operation
/**
 * Cancels a Job (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param id - The name and identifier for the Job. This is case-sensitive.
 */
export const JobsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsCancelInput,
  outputSchema: JobsCancelOutput,
}));
// Input Schema
export const JobsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs/{id}",
    }),
  );
export type JobsCreateOrUpdateInput = typeof JobsCreateOrUpdateInput.Type;

// Output Schema
export const JobsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobsCreateOrUpdateOutput = typeof JobsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates and executes a Job.
For update case, the Tags in the definition passed in will replace Tags in the existing job.
 *
 * Creates and executes a Job.
 * For update case, the Tags in the definition passed in will replace Tags in the existing job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param id - The name and identifier for the Job. This is case-sensitive.
 */
export const JobsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsCreateOrUpdateInput,
  outputSchema: JobsCreateOrUpdateOutput,
}));
// Input Schema
export const JobsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs/{id}",
  }),
);
export type JobsDeleteInput = typeof JobsDeleteInput.Type;

// Output Schema
export const JobsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsDeleteOutput = typeof JobsDeleteOutput.Type;

// The operation
/**
 * Deletes a Job (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param id - The name and identifier for the Job. This is case-sensitive.
 */
export const JobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsDeleteInput,
  outputSchema: JobsDeleteOutput,
}));
// Input Schema
export const JobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs/{id}",
  }),
);
export type JobsGetInput = typeof JobsGetInput.Type;

// Output Schema
export const JobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobsGetOutput = typeof JobsGetOutput.Type;

// The operation
/**
 * Gets a Job by name/id.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param id - The name and identifier for the Job. This is case-sensitive.
 */
export const JobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsGetInput,
  outputSchema: JobsGetOutput,
}));
// Input Schema
export const JobsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $skip: Schema.optional(Schema.String),
  jobType: Schema.optional(Schema.String),
  tag: Schema.optional(Schema.String),
  listViewType: Schema.optional(
    Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
  ),
  properties: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/jobs",
  }),
);
export type JobsListInput = typeof JobsListInput.Type;

// Output Schema
export const JobsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type JobsListOutput = typeof JobsListOutput.Type;

// The operation
/**
 * Lists Jobs in the workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param $skip - Continuation token for pagination.
 * @param jobType - Type of job to be returned.
 * @param tag - Jobs returned will have this tag key.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 * @param properties - Comma-separated list of user property names (and optionally values). Example: prop1,prop2=value2
 */
export const JobsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListInput,
  outputSchema: JobsListOutput,
}));
// Input Schema
export const ManagedNetworkProvisionsProvisionManagedNetworkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/provisionManagedNetwork",
    }),
  );
export type ManagedNetworkProvisionsProvisionManagedNetworkInput =
  typeof ManagedNetworkProvisionsProvisionManagedNetworkInput.Type;

// Output Schema
export const ManagedNetworkProvisionsProvisionManagedNetworkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    sparkReady: Schema.optional(Schema.Boolean),
    status: Schema.optional(Schema.Literals(["Inactive", "Active"])),
  });
export type ManagedNetworkProvisionsProvisionManagedNetworkOutput =
  typeof ManagedNetworkProvisionsProvisionManagedNetworkOutput.Type;

// The operation
/**
 * Provisions the managed network of a machine learning workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const ManagedNetworkProvisionsProvisionManagedNetwork =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedNetworkProvisionsProvisionManagedNetworkInput,
    outputSchema: ManagedNetworkProvisionsProvisionManagedNetworkOutput,
  }));
// Input Schema
export const ManagedNetworkSettingsRuleCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    ruleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/outboundRules/{ruleName}",
    }),
  );
export type ManagedNetworkSettingsRuleCreateOrUpdateInput =
  typeof ManagedNetworkSettingsRuleCreateOrUpdateInput.Type;

// Output Schema
export const ManagedNetworkSettingsRuleCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedNetworkSettingsRuleCreateOrUpdateOutput =
  typeof ManagedNetworkSettingsRuleCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an outbound rule in the managed network of a machine learning workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param ruleName - Name of the workspace managed network outbound rule
 */
export const ManagedNetworkSettingsRuleCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedNetworkSettingsRuleCreateOrUpdateInput,
    outputSchema: ManagedNetworkSettingsRuleCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedNetworkSettingsRuleDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    ruleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/outboundRules/{ruleName}",
    }),
  );
export type ManagedNetworkSettingsRuleDeleteInput =
  typeof ManagedNetworkSettingsRuleDeleteInput.Type;

// Output Schema
export const ManagedNetworkSettingsRuleDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedNetworkSettingsRuleDeleteOutput =
  typeof ManagedNetworkSettingsRuleDeleteOutput.Type;

// The operation
/**
 * Deletes an outbound rule from the managed network of a machine learning workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param ruleName - Name of the workspace managed network outbound rule
 */
export const ManagedNetworkSettingsRuleDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedNetworkSettingsRuleDeleteInput,
    outputSchema: ManagedNetworkSettingsRuleDeleteOutput,
  }));
// Input Schema
export const ManagedNetworkSettingsRuleGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    ruleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/outboundRules/{ruleName}",
    }),
  );
export type ManagedNetworkSettingsRuleGetInput =
  typeof ManagedNetworkSettingsRuleGetInput.Type;

// Output Schema
export const ManagedNetworkSettingsRuleGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedNetworkSettingsRuleGetOutput =
  typeof ManagedNetworkSettingsRuleGetOutput.Type;

// The operation
/**
 * Gets an outbound rule from the managed network of a machine learning workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param ruleName - Name of the workspace managed network outbound rule
 */
export const ManagedNetworkSettingsRuleGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedNetworkSettingsRuleGetInput,
    outputSchema: ManagedNetworkSettingsRuleGetOutput,
  }));
// Input Schema
export const ManagedNetworkSettingsRuleListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/outboundRules",
    }),
  );
export type ManagedNetworkSettingsRuleListInput =
  typeof ManagedNetworkSettingsRuleListInput.Type;

// Output Schema
export const ManagedNetworkSettingsRuleListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedNetworkSettingsRuleListOutput =
  typeof ManagedNetworkSettingsRuleListOutput.Type;

// The operation
/**
 * Lists the managed network outbound rules for a machine learning workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const ManagedNetworkSettingsRuleList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedNetworkSettingsRuleListInput,
    outputSchema: ManagedNetworkSettingsRuleListOutput,
  }));
// Input Schema
export const MarketplaceSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/marketplaceSubscriptions/{name}",
    }),
  );
export type MarketplaceSubscriptionsCreateOrUpdateInput =
  typeof MarketplaceSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const MarketplaceSubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MarketplaceSubscriptionsCreateOrUpdateOutput =
  typeof MarketplaceSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update Marketplace Subscription (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name.
 */
export const MarketplaceSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceSubscriptionsCreateOrUpdateInput,
    outputSchema: MarketplaceSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const MarketplaceSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/marketplaceSubscriptions/{name}",
    }),
  );
export type MarketplaceSubscriptionsDeleteInput =
  typeof MarketplaceSubscriptionsDeleteInput.Type;

// Output Schema
export const MarketplaceSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MarketplaceSubscriptionsDeleteOutput =
  typeof MarketplaceSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Delete Marketplace Subscription (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name.
 */
export const MarketplaceSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceSubscriptionsDeleteInput,
    outputSchema: MarketplaceSubscriptionsDeleteOutput,
  }));
// Input Schema
export const MarketplaceSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/marketplaceSubscriptions/{name}",
    }),
  );
export type MarketplaceSubscriptionsGetInput =
  typeof MarketplaceSubscriptionsGetInput.Type;

// Output Schema
export const MarketplaceSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MarketplaceSubscriptionsGetOutput =
  typeof MarketplaceSubscriptionsGetOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Container name.
 */
export const MarketplaceSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MarketplaceSubscriptionsGetInput,
    outputSchema: MarketplaceSubscriptionsGetOutput,
  }),
);
// Input Schema
export const MarketplaceSubscriptionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/marketplaceSubscriptions",
    }),
  );
export type MarketplaceSubscriptionsListInput =
  typeof MarketplaceSubscriptionsListInput.Type;

// Output Schema
export const MarketplaceSubscriptionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type MarketplaceSubscriptionsListOutput =
  typeof MarketplaceSubscriptionsListOutput.Type;

// The operation
/**
 * List containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param $skip - Continuation token for pagination.
 */
export const MarketplaceSubscriptionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MarketplaceSubscriptionsListInput,
    outputSchema: MarketplaceSubscriptionsListOutput,
  }));
// Input Schema
export const ModelContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}",
    }),
  );
export type ModelContainersCreateOrUpdateInput =
  typeof ModelContainersCreateOrUpdateInput.Type;

// Output Schema
export const ModelContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ModelContainersCreateOrUpdateOutput =
  typeof ModelContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 */
export const ModelContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ModelContainersCreateOrUpdateInput,
    outputSchema: ModelContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const ModelContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}",
    }),
  );
export type ModelContainersDeleteInput = typeof ModelContainersDeleteInput.Type;

// Output Schema
export const ModelContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ModelContainersDeleteOutput =
  typeof ModelContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 */
export const ModelContainersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ModelContainersDeleteInput,
    outputSchema: ModelContainersDeleteOutput,
  }),
);
// Input Schema
export const ModelContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}",
    }),
  );
export type ModelContainersGetInput = typeof ModelContainersGetInput.Type;

// Output Schema
export const ModelContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ModelContainersGetOutput = typeof ModelContainersGetOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 */
export const ModelContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModelContainersGetInput,
  outputSchema: ModelContainersGetOutput,
}));
// Input Schema
export const ModelContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    count: Schema.optional(Schema.Number),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models",
    }),
  );
export type ModelContainersListInput = typeof ModelContainersListInput.Type;

// Output Schema
export const ModelContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ModelContainersListOutput = typeof ModelContainersListOutput.Type;

// The operation
/**
 * List model containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param $skip - Continuation token for pagination.
 * @param count - Maximum number of results to return.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const ModelContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModelContainersListInput,
  outputSchema: ModelContainersListOutput,
}));
// Input Schema
export const ModelVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions/{version}",
    }),
  );
export type ModelVersionsCreateOrUpdateInput =
  typeof ModelVersionsCreateOrUpdateInput.Type;

// Output Schema
export const ModelVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ModelVersionsCreateOrUpdateOutput =
  typeof ModelVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const ModelVersionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ModelVersionsCreateOrUpdateInput,
    outputSchema: ModelVersionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ModelVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions/{version}",
    }),
  );
export type ModelVersionsDeleteInput = typeof ModelVersionsDeleteInput.Type;

// Output Schema
export const ModelVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ModelVersionsDeleteOutput = typeof ModelVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const ModelVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModelVersionsDeleteInput,
  outputSchema: ModelVersionsDeleteOutput,
}));
// Input Schema
export const ModelVersionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  version: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions/{version}",
  }),
);
export type ModelVersionsGetInput = typeof ModelVersionsGetInput.Type;

// Output Schema
export const ModelVersionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ModelVersionsGetOutput = typeof ModelVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const ModelVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModelVersionsGetInput,
  outputSchema: ModelVersionsGetOutput,
}));
// Input Schema
export const ModelVersionsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    version: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    offset: Schema.optional(Schema.Number),
    tags: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.String),
    feed: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions",
  }),
);
export type ModelVersionsListInput = typeof ModelVersionsListInput.Type;

// Output Schema
export const ModelVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ModelVersionsListOutput = typeof ModelVersionsListOutput.Type;

// The operation
/**
 * List model versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param $skip - Continuation token for pagination.
 * @param $orderBy - Ordering of list.
 * @param $top - Maximum number of records to return.
 * @param version - Model version.
 * @param description - Model description.
 * @param offset - Number of initial results to skip.
 * @param tags - Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2
 * @param properties - Comma-separated list of property names (and optionally values). Example: prop1,prop2=value2
 * @param feed - Name of the feed.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const ModelVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModelVersionsListInput,
  outputSchema: ModelVersionsListOutput,
}));
// Input Schema
export const ModelVersionsPublishInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/models/{name}/versions/{version}/publish",
    }),
  );
export type ModelVersionsPublishInput = typeof ModelVersionsPublishInput.Type;

// Output Schema
export const ModelVersionsPublishOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ModelVersionsPublishOutput = typeof ModelVersionsPublishOutput.Type;

// The operation
/**
 * Publish version asset into registry.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Name of Azure Machine Learning workspace.
 * @param name - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const ModelVersionsPublish = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ModelVersionsPublishInput,
    outputSchema: ModelVersionsPublishOutput,
  }),
);
// Input Schema
export const OnlineDeploymentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}",
    }),
  );
export type OnlineDeploymentsCreateOrUpdateInput =
  typeof OnlineDeploymentsCreateOrUpdateInput.Type;

// Output Schema
export const OnlineDeploymentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OnlineDeploymentsCreateOrUpdateOutput =
  typeof OnlineDeploymentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update Inference Endpoint Deployment (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 * @param deploymentName - Inference Endpoint Deployment name.
 */
export const OnlineDeploymentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OnlineDeploymentsCreateOrUpdateInput,
    outputSchema: OnlineDeploymentsCreateOrUpdateOutput,
  }));
// Input Schema
export const OnlineDeploymentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}",
    }),
  );
export type OnlineDeploymentsDeleteInput =
  typeof OnlineDeploymentsDeleteInput.Type;

// Output Schema
export const OnlineDeploymentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OnlineDeploymentsDeleteOutput =
  typeof OnlineDeploymentsDeleteOutput.Type;

// The operation
/**
 * Delete Inference Endpoint Deployment (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 * @param deploymentName - Inference Endpoint Deployment name.
 */
export const OnlineDeploymentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineDeploymentsDeleteInput,
    outputSchema: OnlineDeploymentsDeleteOutput,
  }),
);
// Input Schema
export const OnlineDeploymentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}",
    }),
  );
export type OnlineDeploymentsGetInput = typeof OnlineDeploymentsGetInput.Type;

// Output Schema
export const OnlineDeploymentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OnlineDeploymentsGetOutput = typeof OnlineDeploymentsGetOutput.Type;

// The operation
/**
 * Get Inference Deployment Deployment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 * @param deploymentName - Inference Endpoint Deployment name.
 */
export const OnlineDeploymentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineDeploymentsGetInput,
    outputSchema: OnlineDeploymentsGetOutput,
  }),
);
// Input Schema
export const OnlineDeploymentsGetLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}/getLogs",
    }),
  );
export type OnlineDeploymentsGetLogsInput =
  typeof OnlineDeploymentsGetLogsInput.Type;

// Output Schema
export const OnlineDeploymentsGetLogsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    content: Schema.optional(Schema.NullOr(Schema.String)),
  });
export type OnlineDeploymentsGetLogsOutput =
  typeof OnlineDeploymentsGetLogsOutput.Type;

// The operation
/**
 * Polls an Endpoint operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 * @param deploymentName - Inference Endpoint Deployment name.
 */
export const OnlineDeploymentsGetLogs = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineDeploymentsGetLogsInput,
    outputSchema: OnlineDeploymentsGetLogsOutput,
  }),
);
// Input Schema
export const OnlineDeploymentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments",
    }),
  );
export type OnlineDeploymentsListInput = typeof OnlineDeploymentsListInput.Type;

// Output Schema
export const OnlineDeploymentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OnlineDeploymentsListOutput =
  typeof OnlineDeploymentsListOutput.Type;

// The operation
/**
 * List Inference Endpoint Deployments.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 * @param $orderBy - Ordering of list.
 * @param $top - Top of list.
 * @param $skip - Continuation token for pagination.
 */
export const OnlineDeploymentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineDeploymentsListInput,
    outputSchema: OnlineDeploymentsListOutput,
  }),
);
// Input Schema
export const OnlineDeploymentsListSkusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    count: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}/skus",
    }),
  );
export type OnlineDeploymentsListSkusInput =
  typeof OnlineDeploymentsListSkusInput.Type;

// Output Schema
export const OnlineDeploymentsListSkusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        capacity: Schema.optional(
          Schema.Struct({
            default: Schema.optional(Schema.Number),
            maximum: Schema.optional(Schema.Number),
            minimum: Schema.optional(Schema.Number),
            scaleType: Schema.optional(
              Schema.Literals(["Automatic", "Manual", "None"]),
            ),
          }),
        ),
        resourceType: Schema.optional(Schema.NullOr(Schema.String)),
        sku: Schema.optional(
          Schema.Struct({
            name: Schema.String,
            tier: Schema.optional(
              Schema.Literals(["Free", "Basic", "Standard", "Premium"]),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OnlineDeploymentsListSkusOutput =
  typeof OnlineDeploymentsListSkusOutput.Type;

// The operation
/**
 * List Inference Endpoint Deployment Skus.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 * @param deploymentName - Inference Endpoint Deployment name.
 * @param count - Number of Skus to be retrieved in a page of results.
 * @param $skip - Continuation token for pagination.
 */
export const OnlineDeploymentsListSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineDeploymentsListSkusInput,
    outputSchema: OnlineDeploymentsListSkusOutput,
  }),
);
// Input Schema
export const OnlineDeploymentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    deploymentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/deployments/{deploymentName}",
    }),
  );
export type OnlineDeploymentsUpdateInput =
  typeof OnlineDeploymentsUpdateInput.Type;

// Output Schema
export const OnlineDeploymentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OnlineDeploymentsUpdateOutput =
  typeof OnlineDeploymentsUpdateOutput.Type;

// The operation
/**
 * Update Online Deployment (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 * @param deploymentName - Inference Endpoint Deployment name.
 */
export const OnlineDeploymentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineDeploymentsUpdateInput,
    outputSchema: OnlineDeploymentsUpdateOutput,
  }),
);
// Input Schema
export const OnlineEndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}",
    }),
  );
export type OnlineEndpointsCreateOrUpdateInput =
  typeof OnlineEndpointsCreateOrUpdateInput.Type;

// Output Schema
export const OnlineEndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OnlineEndpointsCreateOrUpdateOutput =
  typeof OnlineEndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update Online Endpoint (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 */
export const OnlineEndpointsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OnlineEndpointsCreateOrUpdateInput,
    outputSchema: OnlineEndpointsCreateOrUpdateOutput,
  }));
// Input Schema
export const OnlineEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}",
    }),
  );
export type OnlineEndpointsDeleteInput = typeof OnlineEndpointsDeleteInput.Type;

// Output Schema
export const OnlineEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OnlineEndpointsDeleteOutput =
  typeof OnlineEndpointsDeleteOutput.Type;

// The operation
/**
 * Delete Online Endpoint (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 */
export const OnlineEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineEndpointsDeleteInput,
    outputSchema: OnlineEndpointsDeleteOutput,
  }),
);
// Input Schema
export const OnlineEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}",
    }),
  );
export type OnlineEndpointsGetInput = typeof OnlineEndpointsGetInput.Type;

// Output Schema
export const OnlineEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OnlineEndpointsGetOutput = typeof OnlineEndpointsGetOutput.Type;

// The operation
/**
 * Get Online Endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 */
export const OnlineEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OnlineEndpointsGetInput,
  outputSchema: OnlineEndpointsGetOutput,
}));
// Input Schema
export const OnlineEndpointsGetTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/token",
    }),
  );
export type OnlineEndpointsGetTokenInput =
  typeof OnlineEndpointsGetTokenInput.Type;

// Output Schema
export const OnlineEndpointsGetTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accessToken: Schema.optional(SensitiveNullableString),
    expiryTimeUtc: Schema.optional(Schema.Number),
    refreshAfterTimeUtc: Schema.optional(Schema.Number),
    tokenType: Schema.optional(Schema.NullOr(Schema.String)),
  });
export type OnlineEndpointsGetTokenOutput =
  typeof OnlineEndpointsGetTokenOutput.Type;

// The operation
/**
 * Retrieve a valid AML token for an Endpoint using AMLToken-based authentication.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 */
export const OnlineEndpointsGetToken = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineEndpointsGetTokenInput,
    outputSchema: OnlineEndpointsGetTokenOutput,
  }),
);
// Input Schema
export const OnlineEndpointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    count: Schema.optional(Schema.Number),
    computeType: Schema.optional(
      Schema.Literals(["Managed", "Kubernetes", "AzureMLCompute"]),
    ),
    $skip: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.String),
    orderBy: Schema.optional(
      Schema.Literals([
        "CreatedAtDesc",
        "CreatedAtAsc",
        "UpdatedAtDesc",
        "UpdatedAtAsc",
      ]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints",
    }),
  );
export type OnlineEndpointsListInput = typeof OnlineEndpointsListInput.Type;

// Output Schema
export const OnlineEndpointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OnlineEndpointsListOutput = typeof OnlineEndpointsListOutput.Type;

// The operation
/**
 * List Online Endpoints.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Name of the endpoint.
 * @param count - Number of endpoints to be retrieved in a page of results.
 * @param computeType - EndpointComputeType to be filtered by.
 * @param $skip - Continuation token for pagination.
 * @param tags - A set of tags with which to filter the returned models. It is a comma separated string of tags key or tags key=value. Example: tagKey1,tagKey2,tagKey3=value3 .
 * @param properties - A set of properties with which to filter the returned models. It is a comma separated string of properties key and/or properties key=value Example: propKey1,propKey2,propKey3=value3 .
 * @param orderBy - The option to order the response.
 */
export const OnlineEndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OnlineEndpointsListInput,
  outputSchema: OnlineEndpointsListOutput,
}));
// Input Schema
export const OnlineEndpointsListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/listKeys",
    }),
  );
export type OnlineEndpointsListKeysInput =
  typeof OnlineEndpointsListKeysInput.Type;

// Output Schema
export const OnlineEndpointsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.NullOr(Schema.String)),
    secondaryKey: Schema.optional(Schema.NullOr(Schema.String)),
  });
export type OnlineEndpointsListKeysOutput =
  typeof OnlineEndpointsListKeysOutput.Type;

// The operation
/**
 * List EndpointAuthKeys for an Endpoint using Key-based authentication.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 */
export const OnlineEndpointsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineEndpointsListKeysInput,
    outputSchema: OnlineEndpointsListKeysOutput,
  }),
);
// Input Schema
export const OnlineEndpointsRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}/regenerateKeys",
    }),
  );
export type OnlineEndpointsRegenerateKeysInput =
  typeof OnlineEndpointsRegenerateKeysInput.Type;

// Output Schema
export const OnlineEndpointsRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OnlineEndpointsRegenerateKeysOutput =
  typeof OnlineEndpointsRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 */
export const OnlineEndpointsRegenerateKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OnlineEndpointsRegenerateKeysInput,
    outputSchema: OnlineEndpointsRegenerateKeysOutput,
  }));
// Input Schema
export const OnlineEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/onlineEndpoints/{endpointName}",
    }),
  );
export type OnlineEndpointsUpdateInput = typeof OnlineEndpointsUpdateInput.Type;

// Output Schema
export const OnlineEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OnlineEndpointsUpdateOutput =
  typeof OnlineEndpointsUpdateOutput.Type;

// The operation
/**
 * Update Online Endpoint (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param endpointName - Online Endpoint name.
 */
export const OnlineEndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OnlineEndpointsUpdateInput,
    outputSchema: OnlineEndpointsUpdateOutput,
  }),
);
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Called by end-users to approve or reject a PE connection.
This method must validate and forward the call to NRP.
 *
 * Called by end-users to approve or reject a PE connection.
 * This method must validate and forward the call to NRP.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param privateEndpointConnectionName - NRP Private Endpoint Connection Name
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
    workspaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Called by end-users to delete a PE connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param privateEndpointConnectionName - NRP Private Endpoint Connection Name
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Called by end-users to get a PE connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param privateEndpointConnectionName - NRP Private Endpoint Connection Name
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * Called by end-users to get all PE connections.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const QuotasListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/quotas",
  }),
);
export type QuotasListInput = typeof QuotasListInput.Type;

// Output Schema
export const QuotasListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      amlWorkspaceLocation: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      name: Schema.optional(
        Schema.Struct({
          value: Schema.optional(Schema.String),
          localizedValue: Schema.optional(Schema.String),
        }),
      ),
      limit: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.Literals(["Count"])),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type QuotasListOutput = typeof QuotasListOutput.Type;

// The operation
/**
 * Gets the currently assigned Workspace Quotas based on VMFamily.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QuotasList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotasListInput,
  outputSchema: QuotasListOutput,
}));
// Input Schema
export const QuotasUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/updateQuotas",
  }),
);
export type QuotasUpdateInput = typeof QuotasUpdateInput.Type;

// Output Schema
export const QuotasUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        limit: Schema.optional(Schema.Number),
        unit: Schema.optional(Schema.Literals(["Count"])),
        status: Schema.optional(
          Schema.Literals([
            "Undefined",
            "Success",
            "Failure",
            "InvalidQuotaBelowClusterMinimum",
            "InvalidQuotaExceedsSubscriptionLimit",
            "InvalidVMFamilyName",
            "OperationNotSupportedForSku",
            "OperationNotEnabledForRegion",
          ]),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type QuotasUpdateOutput = typeof QuotasUpdateOutput.Type;

// The operation
/**
 * Update quota for each VM family in workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QuotasUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotasUpdateInput,
  outputSchema: QuotasUpdateOutput,
}));
// Input Schema
export const RegistriesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}",
    }),
  );
export type RegistriesCreateOrUpdateInput =
  typeof RegistriesCreateOrUpdateInput.Type;

// Output Schema
export const RegistriesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RegistriesCreateOrUpdateOutput =
  typeof RegistriesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update registry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 */
export const RegistriesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistriesCreateOrUpdateInput,
    outputSchema: RegistriesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const RegistriesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  registryName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}",
  }),
);
export type RegistriesDeleteInput = typeof RegistriesDeleteInput.Type;

// Output Schema
export const RegistriesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistriesDeleteOutput = typeof RegistriesDeleteOutput.Type;

// The operation
/**
 * Delete registry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 */
export const RegistriesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RegistriesDeleteInput,
  outputSchema: RegistriesDeleteOutput,
}));
// Input Schema
export const RegistriesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  registryName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}",
  }),
);
export type RegistriesGetInput = typeof RegistriesGetInput.Type;

// Output Schema
export const RegistriesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type RegistriesGetOutput = typeof RegistriesGetOutput.Type;

// The operation
/**
 * Get registry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 */
export const RegistriesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RegistriesGetInput,
  outputSchema: RegistriesGetOutput,
}));
// Input Schema
export const RegistriesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries",
  }),
);
export type RegistriesListInput = typeof RegistriesListInput.Type;

// Output Schema
export const RegistriesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type RegistriesListOutput = typeof RegistriesListOutput.Type;

// The operation
/**
 * List registries
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const RegistriesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RegistriesListInput,
  outputSchema: RegistriesListOutput,
}));
// Input Schema
export const RegistriesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/registries",
    }),
  );
export type RegistriesListBySubscriptionInput =
  typeof RegistriesListBySubscriptionInput.Type;

// Output Schema
export const RegistriesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistriesListBySubscriptionOutput =
  typeof RegistriesListBySubscriptionOutput.Type;

// The operation
/**
 * List registries by subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RegistriesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistriesListBySubscriptionInput,
    outputSchema: RegistriesListBySubscriptionOutput,
  }));
// Input Schema
export const RegistriesRemoveRegionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/removeRegions",
    }),
  );
export type RegistriesRemoveRegionsInput =
  typeof RegistriesRemoveRegionsInput.Type;

// Output Schema
export const RegistriesRemoveRegionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RegistriesRemoveRegionsOutput =
  typeof RegistriesRemoveRegionsOutput.Type;

// The operation
/**
 * Remove regions from registry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 */
export const RegistriesRemoveRegions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistriesRemoveRegionsInput,
    outputSchema: RegistriesRemoveRegionsOutput,
  }),
);
// Input Schema
export const RegistriesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  registryName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}",
  }),
);
export type RegistriesUpdateInput = typeof RegistriesUpdateInput.Type;

// Output Schema
export const RegistriesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type RegistriesUpdateOutput = typeof RegistriesUpdateOutput.Type;

// The operation
/**
 * Update tags
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 */
export const RegistriesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RegistriesUpdateInput,
  outputSchema: RegistriesUpdateOutput,
}));
// Input Schema
export const RegistryCodeContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    codeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}",
    }),
  );
export type RegistryCodeContainersCreateOrUpdateInput =
  typeof RegistryCodeContainersCreateOrUpdateInput.Type;

// Output Schema
export const RegistryCodeContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryCodeContainersCreateOrUpdateOutput =
  typeof RegistryCodeContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update Code container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param codeName - Container name.
 */
export const RegistryCodeContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryCodeContainersCreateOrUpdateInput,
    outputSchema: RegistryCodeContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryCodeContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    codeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}",
    }),
  );
export type RegistryCodeContainersDeleteInput =
  typeof RegistryCodeContainersDeleteInput.Type;

// Output Schema
export const RegistryCodeContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryCodeContainersDeleteOutput =
  typeof RegistryCodeContainersDeleteOutput.Type;

// The operation
/**
 * Delete Code container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param codeName - Container name.
 */
export const RegistryCodeContainersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryCodeContainersDeleteInput,
    outputSchema: RegistryCodeContainersDeleteOutput,
  }));
// Input Schema
export const RegistryCodeContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    codeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}",
    }),
  );
export type RegistryCodeContainersGetInput =
  typeof RegistryCodeContainersGetInput.Type;

// Output Schema
export const RegistryCodeContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryCodeContainersGetOutput =
  typeof RegistryCodeContainersGetOutput.Type;

// The operation
/**
 * Get Code container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param codeName - Container name.
 */
export const RegistryCodeContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryCodeContainersGetInput,
    outputSchema: RegistryCodeContainersGetOutput,
  }),
);
// Input Schema
export const RegistryCodeContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes",
    }),
  );
export type RegistryCodeContainersListInput =
  typeof RegistryCodeContainersListInput.Type;

// Output Schema
export const RegistryCodeContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryCodeContainersListOutput =
  typeof RegistryCodeContainersListOutput.Type;

// The operation
/**
 * List containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param $skip - Continuation token for pagination.
 */
export const RegistryCodeContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryCodeContainersListInput,
    outputSchema: RegistryCodeContainersListOutput,
  }),
);
// Input Schema
export const RegistryCodeVersionsCreateOrGetStartPendingUploadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    codeName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}/versions/{version}/startPendingUpload",
    }),
  );
export type RegistryCodeVersionsCreateOrGetStartPendingUploadInput =
  typeof RegistryCodeVersionsCreateOrGetStartPendingUploadInput.Type;

// Output Schema
export const RegistryCodeVersionsCreateOrGetStartPendingUploadOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    blobReferenceForConsumption: Schema.optional(
      Schema.Struct({
        blobUri: Schema.optional(Schema.NullOr(Schema.String)),
        credential: Schema.optional(
          Schema.Struct({
            credentialType: Schema.Literals(["SAS"]),
          }),
        ),
        storageAccountArmId: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
    pendingUploadId: Schema.optional(Schema.NullOr(Schema.String)),
    pendingUploadType: Schema.optional(
      Schema.Literals(["None", "TemporaryBlobReference"]),
    ),
  });
export type RegistryCodeVersionsCreateOrGetStartPendingUploadOutput =
  typeof RegistryCodeVersionsCreateOrGetStartPendingUploadOutput.Type;

// The operation
/**
 * Generate a storage location and credential for the client to upload a code asset to.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param codeName - Container name.
 * @param version - Version identifier.
 */
export const RegistryCodeVersionsCreateOrGetStartPendingUpload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryCodeVersionsCreateOrGetStartPendingUploadInput,
    outputSchema: RegistryCodeVersionsCreateOrGetStartPendingUploadOutput,
  }));
// Input Schema
export const RegistryCodeVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    codeName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}/versions/{version}",
    }),
  );
export type RegistryCodeVersionsCreateOrUpdateInput =
  typeof RegistryCodeVersionsCreateOrUpdateInput.Type;

// Output Schema
export const RegistryCodeVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryCodeVersionsCreateOrUpdateOutput =
  typeof RegistryCodeVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param codeName - Container name.
 * @param version - Version identifier.
 */
export const RegistryCodeVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryCodeVersionsCreateOrUpdateInput,
    outputSchema: RegistryCodeVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryCodeVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    codeName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}/versions/{version}",
    }),
  );
export type RegistryCodeVersionsDeleteInput =
  typeof RegistryCodeVersionsDeleteInput.Type;

// Output Schema
export const RegistryCodeVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryCodeVersionsDeleteOutput =
  typeof RegistryCodeVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param codeName - Container name.
 * @param version - Version identifier.
 */
export const RegistryCodeVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryCodeVersionsDeleteInput,
    outputSchema: RegistryCodeVersionsDeleteOutput,
  }),
);
// Input Schema
export const RegistryCodeVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    codeName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}/versions/{version}",
    }),
  );
export type RegistryCodeVersionsGetInput =
  typeof RegistryCodeVersionsGetInput.Type;

// Output Schema
export const RegistryCodeVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryCodeVersionsGetOutput =
  typeof RegistryCodeVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param codeName - Container name.
 * @param version - Version identifier.
 */
export const RegistryCodeVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryCodeVersionsGetInput,
    outputSchema: RegistryCodeVersionsGetOutput,
  }),
);
// Input Schema
export const RegistryCodeVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    codeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/codes/{codeName}/versions",
    }),
  );
export type RegistryCodeVersionsListInput =
  typeof RegistryCodeVersionsListInput.Type;

// Output Schema
export const RegistryCodeVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryCodeVersionsListOutput =
  typeof RegistryCodeVersionsListOutput.Type;

// The operation
/**
 * List versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param codeName - Container name.
 * @param $orderBy - Ordering of list.
 * @param $top - Maximum number of records to return.
 * @param $skip - Continuation token for pagination.
 */
export const RegistryCodeVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryCodeVersionsListInput,
    outputSchema: RegistryCodeVersionsListOutput,
  }),
);
// Input Schema
export const RegistryComponentContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}",
    }),
  );
export type RegistryComponentContainersCreateOrUpdateInput =
  typeof RegistryComponentContainersCreateOrUpdateInput.Type;

// Output Schema
export const RegistryComponentContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryComponentContainersCreateOrUpdateOutput =
  typeof RegistryComponentContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param componentName - Container name.
 */
export const RegistryComponentContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryComponentContainersCreateOrUpdateInput,
    outputSchema: RegistryComponentContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryComponentContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}",
    }),
  );
export type RegistryComponentContainersDeleteInput =
  typeof RegistryComponentContainersDeleteInput.Type;

// Output Schema
export const RegistryComponentContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryComponentContainersDeleteOutput =
  typeof RegistryComponentContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param componentName - Container name.
 */
export const RegistryComponentContainersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryComponentContainersDeleteInput,
    outputSchema: RegistryComponentContainersDeleteOutput,
  }));
// Input Schema
export const RegistryComponentContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}",
    }),
  );
export type RegistryComponentContainersGetInput =
  typeof RegistryComponentContainersGetInput.Type;

// Output Schema
export const RegistryComponentContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryComponentContainersGetOutput =
  typeof RegistryComponentContainersGetOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param componentName - Container name.
 */
export const RegistryComponentContainersGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryComponentContainersGetInput,
    outputSchema: RegistryComponentContainersGetOutput,
  }));
// Input Schema
export const RegistryComponentContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components",
    }),
  );
export type RegistryComponentContainersListInput =
  typeof RegistryComponentContainersListInput.Type;

// Output Schema
export const RegistryComponentContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryComponentContainersListOutput =
  typeof RegistryComponentContainersListOutput.Type;

// The operation
/**
 * List containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param $skip - Continuation token for pagination.
 */
export const RegistryComponentContainersList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryComponentContainersListInput,
    outputSchema: RegistryComponentContainersListOutput,
  }));
// Input Schema
export const RegistryComponentVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}/versions/{version}",
    }),
  );
export type RegistryComponentVersionsCreateOrUpdateInput =
  typeof RegistryComponentVersionsCreateOrUpdateInput.Type;

// Output Schema
export const RegistryComponentVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryComponentVersionsCreateOrUpdateOutput =
  typeof RegistryComponentVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param componentName - Container name.
 * @param version - Version identifier.
 */
export const RegistryComponentVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryComponentVersionsCreateOrUpdateInput,
    outputSchema: RegistryComponentVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryComponentVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}/versions/{version}",
    }),
  );
export type RegistryComponentVersionsDeleteInput =
  typeof RegistryComponentVersionsDeleteInput.Type;

// Output Schema
export const RegistryComponentVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryComponentVersionsDeleteOutput =
  typeof RegistryComponentVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param componentName - Container name.
 * @param version - Version identifier.
 */
export const RegistryComponentVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryComponentVersionsDeleteInput,
    outputSchema: RegistryComponentVersionsDeleteOutput,
  }));
// Input Schema
export const RegistryComponentVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}/versions/{version}",
    }),
  );
export type RegistryComponentVersionsGetInput =
  typeof RegistryComponentVersionsGetInput.Type;

// Output Schema
export const RegistryComponentVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryComponentVersionsGetOutput =
  typeof RegistryComponentVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param componentName - Container name.
 * @param version - Version identifier.
 */
export const RegistryComponentVersionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryComponentVersionsGetInput,
    outputSchema: RegistryComponentVersionsGetOutput,
  }));
// Input Schema
export const RegistryComponentVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    componentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/components/{componentName}/versions",
    }),
  );
export type RegistryComponentVersionsListInput =
  typeof RegistryComponentVersionsListInput.Type;

// Output Schema
export const RegistryComponentVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryComponentVersionsListOutput =
  typeof RegistryComponentVersionsListOutput.Type;

// The operation
/**
 * List versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param componentName - Container name.
 * @param $orderBy - Ordering of list.
 * @param $top - Maximum number of records to return.
 * @param $skip - Continuation token for pagination.
 */
export const RegistryComponentVersionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryComponentVersionsListInput,
    outputSchema: RegistryComponentVersionsListOutput,
  }));
// Input Schema
export const RegistryDataContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}",
    }),
  );
export type RegistryDataContainersCreateOrUpdateInput =
  typeof RegistryDataContainersCreateOrUpdateInput.Type;

// Output Schema
export const RegistryDataContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryDataContainersCreateOrUpdateOutput =
  typeof RegistryDataContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param name - Container name.
 */
export const RegistryDataContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryDataContainersCreateOrUpdateInput,
    outputSchema: RegistryDataContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryDataContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}",
    }),
  );
export type RegistryDataContainersDeleteInput =
  typeof RegistryDataContainersDeleteInput.Type;

// Output Schema
export const RegistryDataContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryDataContainersDeleteOutput =
  typeof RegistryDataContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param name - Container name.
 */
export const RegistryDataContainersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryDataContainersDeleteInput,
    outputSchema: RegistryDataContainersDeleteOutput,
  }));
// Input Schema
export const RegistryDataContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}",
    }),
  );
export type RegistryDataContainersGetInput =
  typeof RegistryDataContainersGetInput.Type;

// Output Schema
export const RegistryDataContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryDataContainersGetOutput =
  typeof RegistryDataContainersGetOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param name - Container name.
 */
export const RegistryDataContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryDataContainersGetInput,
    outputSchema: RegistryDataContainersGetOutput,
  }),
);
// Input Schema
export const RegistryDataContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data",
    }),
  );
export type RegistryDataContainersListInput =
  typeof RegistryDataContainersListInput.Type;

// Output Schema
export const RegistryDataContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryDataContainersListOutput =
  typeof RegistryDataContainersListOutput.Type;

// The operation
/**
 * List Data containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param $skip - Continuation token for pagination.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const RegistryDataContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryDataContainersListInput,
    outputSchema: RegistryDataContainersListOutput,
  }),
);
// Input Schema
export const RegistryDataReferencesGetBlobReferenceSASInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/datareferences/{name}/versions/{version}",
    }),
  );
export type RegistryDataReferencesGetBlobReferenceSASInput =
  typeof RegistryDataReferencesGetBlobReferenceSASInput.Type;

// Output Schema
export const RegistryDataReferencesGetBlobReferenceSASOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    blobReferenceForConsumption: Schema.optional(
      Schema.Struct({
        blobUri: Schema.optional(Schema.NullOr(Schema.String)),
        credential: Schema.optional(
          Schema.Struct({
            credentialType: Schema.Literals([
              "SAS",
              "DockerCredentials",
              "ManagedIdentity",
              "NoCredentials",
            ]),
          }),
        ),
        storageAccountArmId: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
  });
export type RegistryDataReferencesGetBlobReferenceSASOutput =
  typeof RegistryDataReferencesGetBlobReferenceSASOutput.Type;

// The operation
/**
 * Get blob reference SAS Uri.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param name - Data reference name.
 * @param version - Version identifier.
 */
export const RegistryDataReferencesGetBlobReferenceSAS =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryDataReferencesGetBlobReferenceSASInput,
    outputSchema: RegistryDataReferencesGetBlobReferenceSASOutput,
  }));
// Input Schema
export const RegistryDataVersionsCreateOrGetStartPendingUploadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}/startPendingUpload",
    }),
  );
export type RegistryDataVersionsCreateOrGetStartPendingUploadInput =
  typeof RegistryDataVersionsCreateOrGetStartPendingUploadInput.Type;

// Output Schema
export const RegistryDataVersionsCreateOrGetStartPendingUploadOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    blobReferenceForConsumption: Schema.optional(
      Schema.Struct({
        blobUri: Schema.optional(Schema.NullOr(Schema.String)),
        credential: Schema.optional(
          Schema.Struct({
            credentialType: Schema.Literals(["SAS"]),
          }),
        ),
        storageAccountArmId: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
    pendingUploadId: Schema.optional(Schema.NullOr(Schema.String)),
    pendingUploadType: Schema.optional(
      Schema.Literals(["None", "TemporaryBlobReference"]),
    ),
  });
export type RegistryDataVersionsCreateOrGetStartPendingUploadOutput =
  typeof RegistryDataVersionsCreateOrGetStartPendingUploadOutput.Type;

// The operation
/**
 * Generate a storage location and credential for the client to upload a data asset to.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const RegistryDataVersionsCreateOrGetStartPendingUpload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryDataVersionsCreateOrGetStartPendingUploadInput,
    outputSchema: RegistryDataVersionsCreateOrGetStartPendingUploadOutput,
  }));
// Input Schema
export const RegistryDataVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}",
    }),
  );
export type RegistryDataVersionsCreateOrUpdateInput =
  typeof RegistryDataVersionsCreateOrUpdateInput.Type;

// Output Schema
export const RegistryDataVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryDataVersionsCreateOrUpdateOutput =
  typeof RegistryDataVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const RegistryDataVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryDataVersionsCreateOrUpdateInput,
    outputSchema: RegistryDataVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryDataVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}",
    }),
  );
export type RegistryDataVersionsDeleteInput =
  typeof RegistryDataVersionsDeleteInput.Type;

// Output Schema
export const RegistryDataVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryDataVersionsDeleteOutput =
  typeof RegistryDataVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const RegistryDataVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryDataVersionsDeleteInput,
    outputSchema: RegistryDataVersionsDeleteOutput,
  }),
);
// Input Schema
export const RegistryDataVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions/{version}",
    }),
  );
export type RegistryDataVersionsGetInput =
  typeof RegistryDataVersionsGetInput.Type;

// Output Schema
export const RegistryDataVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryDataVersionsGetOutput =
  typeof RegistryDataVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param name - Container name.
 * @param version - Version identifier.
 */
export const RegistryDataVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryDataVersionsGetInput,
    outputSchema: RegistryDataVersionsGetOutput,
  }),
);
// Input Schema
export const RegistryDataVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
    $tags: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/data/{name}/versions",
    }),
  );
export type RegistryDataVersionsListInput =
  typeof RegistryDataVersionsListInput.Type;

// Output Schema
export const RegistryDataVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryDataVersionsListOutput =
  typeof RegistryDataVersionsListOutput.Type;

// The operation
/**
 * List data versions in the data container
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param name - Container name.
 * @param $orderBy - Please choose OrderBy value from ['createdtime', 'modifiedtime']
 * @param $top - Top count of results, top count cannot be greater than the page size.
If topCount > page size, results with be default page size count will be returned
 * @param $skip - Continuation token for pagination.
 * @param $tags - Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2
 * @param listViewType - [ListViewType.ActiveOnly, ListViewType.ArchivedOnly, ListViewType.All]View type for including/excluding (for example) archived entities.
 */
export const RegistryDataVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryDataVersionsListInput,
    outputSchema: RegistryDataVersionsListOutput,
  }),
);
// Input Schema
export const RegistryEnvironmentContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}",
    }),
  );
export type RegistryEnvironmentContainersCreateOrUpdateInput =
  typeof RegistryEnvironmentContainersCreateOrUpdateInput.Type;

// Output Schema
export const RegistryEnvironmentContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryEnvironmentContainersCreateOrUpdateOutput =
  typeof RegistryEnvironmentContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param environmentName - Container name. This is case-sensitive.
 */
export const RegistryEnvironmentContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryEnvironmentContainersCreateOrUpdateInput,
    outputSchema: RegistryEnvironmentContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryEnvironmentContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}",
    }),
  );
export type RegistryEnvironmentContainersDeleteInput =
  typeof RegistryEnvironmentContainersDeleteInput.Type;

// Output Schema
export const RegistryEnvironmentContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryEnvironmentContainersDeleteOutput =
  typeof RegistryEnvironmentContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param environmentName - Container name. This is case-sensitive.
 */
export const RegistryEnvironmentContainersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryEnvironmentContainersDeleteInput,
    outputSchema: RegistryEnvironmentContainersDeleteOutput,
  }));
// Input Schema
export const RegistryEnvironmentContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}",
    }),
  );
export type RegistryEnvironmentContainersGetInput =
  typeof RegistryEnvironmentContainersGetInput.Type;

// Output Schema
export const RegistryEnvironmentContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryEnvironmentContainersGetOutput =
  typeof RegistryEnvironmentContainersGetOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param environmentName - Container name. This is case-sensitive.
 */
export const RegistryEnvironmentContainersGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryEnvironmentContainersGetInput,
    outputSchema: RegistryEnvironmentContainersGetOutput,
  }));
// Input Schema
export const RegistryEnvironmentContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments",
    }),
  );
export type RegistryEnvironmentContainersListInput =
  typeof RegistryEnvironmentContainersListInput.Type;

// Output Schema
export const RegistryEnvironmentContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryEnvironmentContainersListOutput =
  typeof RegistryEnvironmentContainersListOutput.Type;

// The operation
/**
 * List environment containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param $skip - Continuation token for pagination.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const RegistryEnvironmentContainersList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryEnvironmentContainersListInput,
    outputSchema: RegistryEnvironmentContainersListOutput,
  }));
// Input Schema
export const RegistryEnvironmentVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}/versions/{version}",
    }),
  );
export type RegistryEnvironmentVersionsCreateOrUpdateInput =
  typeof RegistryEnvironmentVersionsCreateOrUpdateInput.Type;

// Output Schema
export const RegistryEnvironmentVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryEnvironmentVersionsCreateOrUpdateOutput =
  typeof RegistryEnvironmentVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param environmentName - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const RegistryEnvironmentVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryEnvironmentVersionsCreateOrUpdateInput,
    outputSchema: RegistryEnvironmentVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryEnvironmentVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}/versions/{version}",
    }),
  );
export type RegistryEnvironmentVersionsDeleteInput =
  typeof RegistryEnvironmentVersionsDeleteInput.Type;

// Output Schema
export const RegistryEnvironmentVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryEnvironmentVersionsDeleteOutput =
  typeof RegistryEnvironmentVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param environmentName - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const RegistryEnvironmentVersionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryEnvironmentVersionsDeleteInput,
    outputSchema: RegistryEnvironmentVersionsDeleteOutput,
  }));
// Input Schema
export const RegistryEnvironmentVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}/versions/{version}",
    }),
  );
export type RegistryEnvironmentVersionsGetInput =
  typeof RegistryEnvironmentVersionsGetInput.Type;

// Output Schema
export const RegistryEnvironmentVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryEnvironmentVersionsGetOutput =
  typeof RegistryEnvironmentVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param environmentName - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const RegistryEnvironmentVersionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryEnvironmentVersionsGetInput,
    outputSchema: RegistryEnvironmentVersionsGetOutput,
  }));
// Input Schema
export const RegistryEnvironmentVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    environmentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/environments/{environmentName}/versions",
    }),
  );
export type RegistryEnvironmentVersionsListInput =
  typeof RegistryEnvironmentVersionsListInput.Type;

// Output Schema
export const RegistryEnvironmentVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryEnvironmentVersionsListOutput =
  typeof RegistryEnvironmentVersionsListOutput.Type;

// The operation
/**
 * List versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param environmentName - Container name. This is case-sensitive.
 * @param $orderBy - Ordering of list.
 * @param $top - Maximum number of records to return.
 * @param $skip - Continuation token for pagination.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const RegistryEnvironmentVersionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryEnvironmentVersionsListInput,
    outputSchema: RegistryEnvironmentVersionsListOutput,
  }));
// Input Schema
export const RegistryModelContainersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    modelName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}",
    }),
  );
export type RegistryModelContainersCreateOrUpdateInput =
  typeof RegistryModelContainersCreateOrUpdateInput.Type;

// Output Schema
export const RegistryModelContainersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryModelContainersCreateOrUpdateOutput =
  typeof RegistryModelContainersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update model container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param modelName - Container name. This is case-sensitive.
 */
export const RegistryModelContainersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryModelContainersCreateOrUpdateInput,
    outputSchema: RegistryModelContainersCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryModelContainersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    modelName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}",
    }),
  );
export type RegistryModelContainersDeleteInput =
  typeof RegistryModelContainersDeleteInput.Type;

// Output Schema
export const RegistryModelContainersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryModelContainersDeleteOutput =
  typeof RegistryModelContainersDeleteOutput.Type;

// The operation
/**
 * Delete container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param modelName - Container name. This is case-sensitive.
 */
export const RegistryModelContainersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryModelContainersDeleteInput,
    outputSchema: RegistryModelContainersDeleteOutput,
  }));
// Input Schema
export const RegistryModelContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    modelName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}",
    }),
  );
export type RegistryModelContainersGetInput =
  typeof RegistryModelContainersGetInput.Type;

// Output Schema
export const RegistryModelContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryModelContainersGetOutput =
  typeof RegistryModelContainersGetOutput.Type;

// The operation
/**
 * Get container.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param modelName - Container name. This is case-sensitive.
 */
export const RegistryModelContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryModelContainersGetInput,
    outputSchema: RegistryModelContainersGetOutput,
  }),
);
// Input Schema
export const RegistryModelContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models",
    }),
  );
export type RegistryModelContainersListInput =
  typeof RegistryModelContainersListInput.Type;

// Output Schema
export const RegistryModelContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryModelContainersListOutput =
  typeof RegistryModelContainersListOutput.Type;

// The operation
/**
 * List model containers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param $skip - Continuation token for pagination.
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const RegistryModelContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryModelContainersListInput,
    outputSchema: RegistryModelContainersListOutput,
  }),
);
// Input Schema
export const RegistryModelVersionsCreateOrGetStartPendingUploadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    modelName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}/versions/{version}/startPendingUpload",
    }),
  );
export type RegistryModelVersionsCreateOrGetStartPendingUploadInput =
  typeof RegistryModelVersionsCreateOrGetStartPendingUploadInput.Type;

// Output Schema
export const RegistryModelVersionsCreateOrGetStartPendingUploadOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    blobReferenceForConsumption: Schema.optional(
      Schema.Struct({
        blobUri: Schema.optional(Schema.NullOr(Schema.String)),
        credential: Schema.optional(
          Schema.Struct({
            credentialType: Schema.Literals(["SAS"]),
          }),
        ),
        storageAccountArmId: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
    pendingUploadId: Schema.optional(Schema.NullOr(Schema.String)),
    pendingUploadType: Schema.optional(
      Schema.Literals(["None", "TemporaryBlobReference"]),
    ),
  });
export type RegistryModelVersionsCreateOrGetStartPendingUploadOutput =
  typeof RegistryModelVersionsCreateOrGetStartPendingUploadOutput.Type;

// The operation
/**
 * Generate a storage location and credential for the client to upload a model asset to.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param modelName - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const RegistryModelVersionsCreateOrGetStartPendingUpload =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryModelVersionsCreateOrGetStartPendingUploadInput,
    outputSchema: RegistryModelVersionsCreateOrGetStartPendingUploadOutput,
  }));
// Input Schema
export const RegistryModelVersionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    modelName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}/versions/{version}",
    }),
  );
export type RegistryModelVersionsCreateOrUpdateInput =
  typeof RegistryModelVersionsCreateOrUpdateInput.Type;

// Output Schema
export const RegistryModelVersionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryModelVersionsCreateOrUpdateOutput =
  typeof RegistryModelVersionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param modelName - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const RegistryModelVersionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RegistryModelVersionsCreateOrUpdateInput,
    outputSchema: RegistryModelVersionsCreateOrUpdateOutput,
  }));
// Input Schema
export const RegistryModelVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    modelName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}/versions/{version}",
    }),
  );
export type RegistryModelVersionsDeleteInput =
  typeof RegistryModelVersionsDeleteInput.Type;

// Output Schema
export const RegistryModelVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RegistryModelVersionsDeleteOutput =
  typeof RegistryModelVersionsDeleteOutput.Type;

// The operation
/**
 * Delete version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param modelName - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const RegistryModelVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryModelVersionsDeleteInput,
    outputSchema: RegistryModelVersionsDeleteOutput,
  }),
);
// Input Schema
export const RegistryModelVersionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    modelName: Schema.String.pipe(T.PathParam()),
    version: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}/versions/{version}",
    }),
  );
export type RegistryModelVersionsGetInput =
  typeof RegistryModelVersionsGetInput.Type;

// Output Schema
export const RegistryModelVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RegistryModelVersionsGetOutput =
  typeof RegistryModelVersionsGetOutput.Type;

// The operation
/**
 * Get version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param modelName - Container name. This is case-sensitive.
 * @param version - Version identifier. This is case-sensitive.
 */
export const RegistryModelVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryModelVersionsGetInput,
    outputSchema: RegistryModelVersionsGetOutput,
  }),
);
// Input Schema
export const RegistryModelVersionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    registryName: Schema.String.pipe(T.PathParam()),
    modelName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
    $orderBy: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    version: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.String),
    listViewType: Schema.optional(
      Schema.Literals(["ActiveOnly", "ArchivedOnly", "All"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/registries/{registryName}/models/{modelName}/versions",
    }),
  );
export type RegistryModelVersionsListInput =
  typeof RegistryModelVersionsListInput.Type;

// Output Schema
export const RegistryModelVersionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RegistryModelVersionsListOutput =
  typeof RegistryModelVersionsListOutput.Type;

// The operation
/**
 * List versions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param registryName - Name of Azure Machine Learning registry. This is case-insensitive
 * @param modelName - Container name. This is case-sensitive.
 * @param $skip - Continuation token for pagination.
 * @param $orderBy - Ordering of list.
 * @param $top - Maximum number of records to return.
 * @param version - Version identifier.
 * @param description - Model description.
 * @param tags - Comma-separated list of tag names (and optionally values). Example: tag1,tag2=value2
 * @param properties - Comma-separated list of property names (and optionally values). Example: prop1,prop2=value2
 * @param listViewType - View type for including/excluding (for example) archived entities.
 */
export const RegistryModelVersionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RegistryModelVersionsListInput,
    outputSchema: RegistryModelVersionsListOutput,
  }),
);
// Input Schema
export const SchedulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/schedules/{name}",
    }),
  );
export type SchedulesCreateOrUpdateInput =
  typeof SchedulesCreateOrUpdateInput.Type;

// Output Schema
export const SchedulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchedulesCreateOrUpdateOutput =
  typeof SchedulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update schedule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Schedule name.
 */
export const SchedulesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchedulesCreateOrUpdateInput,
    outputSchema: SchedulesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SchedulesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/schedules/{name}",
  }),
);
export type SchedulesDeleteInput = typeof SchedulesDeleteInput.Type;

// Output Schema
export const SchedulesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchedulesDeleteOutput = typeof SchedulesDeleteOutput.Type;

// The operation
/**
 * Delete schedule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Schedule name.
 */
export const SchedulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulesDeleteInput,
  outputSchema: SchedulesDeleteOutput,
}));
// Input Schema
export const SchedulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  name: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/schedules/{name}",
  }),
);
export type SchedulesGetInput = typeof SchedulesGetInput.Type;

// Output Schema
export const SchedulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchedulesGetOutput = typeof SchedulesGetOutput.Type;

// The operation
/**
 * Get schedule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Schedule name.
 */
export const SchedulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulesGetInput,
  outputSchema: SchedulesGetOutput,
}));
// Input Schema
export const SchedulesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $skip: Schema.optional(Schema.String),
  listViewType: Schema.optional(
    Schema.Literals(["EnabledOnly", "DisabledOnly", "All"]),
  ),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/schedules",
  }),
);
export type SchedulesListInput = typeof SchedulesListInput.Type;

// Output Schema
export const SchedulesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type SchedulesListOutput = typeof SchedulesListOutput.Type;

// The operation
/**
 * List schedules in specified workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param $skip - Continuation token for pagination.
 * @param listViewType - Status filter for schedule.
 */
export const SchedulesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulesListInput,
  outputSchema: SchedulesListOutput,
}));
// Input Schema
export const ServerlessEndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}",
    }),
  );
export type ServerlessEndpointsCreateOrUpdateInput =
  typeof ServerlessEndpointsCreateOrUpdateInput.Type;

// Output Schema
export const ServerlessEndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServerlessEndpointsCreateOrUpdateOutput =
  typeof ServerlessEndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update Serverless Endpoint (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Serverless Endpoint name.
 */
export const ServerlessEndpointsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerlessEndpointsCreateOrUpdateInput,
    outputSchema: ServerlessEndpointsCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerlessEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}",
    }),
  );
export type ServerlessEndpointsDeleteInput =
  typeof ServerlessEndpointsDeleteInput.Type;

// Output Schema
export const ServerlessEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerlessEndpointsDeleteOutput =
  typeof ServerlessEndpointsDeleteOutput.Type;

// The operation
/**
 * Delete Serverless Endpoint (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Serverless Endpoint name.
 */
export const ServerlessEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerlessEndpointsDeleteInput,
    outputSchema: ServerlessEndpointsDeleteOutput,
  }),
);
// Input Schema
export const ServerlessEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}",
    }),
  );
export type ServerlessEndpointsGetInput =
  typeof ServerlessEndpointsGetInput.Type;

// Output Schema
export const ServerlessEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServerlessEndpointsGetOutput =
  typeof ServerlessEndpointsGetOutput.Type;

// The operation
/**
 * Get Serverless Endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Serverless Endpoint name.
 */
export const ServerlessEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerlessEndpointsGetInput,
    outputSchema: ServerlessEndpointsGetOutput,
  }),
);
// Input Schema
export const ServerlessEndpointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints",
    }),
  );
export type ServerlessEndpointsListInput =
  typeof ServerlessEndpointsListInput.Type;

// Output Schema
export const ServerlessEndpointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerlessEndpointsListOutput =
  typeof ServerlessEndpointsListOutput.Type;

// The operation
/**
 * List Serverless Endpoints.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param $skip - Continuation token for pagination.
 */
export const ServerlessEndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerlessEndpointsListInput,
    outputSchema: ServerlessEndpointsListOutput,
  }),
);
// Input Schema
export const ServerlessEndpointsListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}/listKeys",
    }),
  );
export type ServerlessEndpointsListKeysInput =
  typeof ServerlessEndpointsListKeysInput.Type;

// Output Schema
export const ServerlessEndpointsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.NullOr(Schema.String)),
    secondaryKey: Schema.optional(Schema.NullOr(Schema.String)),
  });
export type ServerlessEndpointsListKeysOutput =
  typeof ServerlessEndpointsListKeysOutput.Type;

// The operation
/**
 * List EndpointAuthKeys for an Endpoint using Key-based authentication.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Serverless Endpoint name.
 */
export const ServerlessEndpointsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerlessEndpointsListKeysInput,
    outputSchema: ServerlessEndpointsListKeysOutput,
  }),
);
// Input Schema
export const ServerlessEndpointsRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}/regenerateKeys",
    }),
  );
export type ServerlessEndpointsRegenerateKeysInput =
  typeof ServerlessEndpointsRegenerateKeysInput.Type;

// Output Schema
export const ServerlessEndpointsRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKey: Schema.optional(Schema.NullOr(Schema.String)),
    secondaryKey: Schema.optional(Schema.NullOr(Schema.String)),
  });
export type ServerlessEndpointsRegenerateKeysOutput =
  typeof ServerlessEndpointsRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerate EndpointAuthKeys for an Endpoint using Key-based authentication (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Serverless Endpoint name.
 */
export const ServerlessEndpointsRegenerateKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerlessEndpointsRegenerateKeysInput,
    outputSchema: ServerlessEndpointsRegenerateKeysOutput,
  }));
// Input Schema
export const ServerlessEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/serverlessEndpoints/{name}",
    }),
  );
export type ServerlessEndpointsUpdateInput =
  typeof ServerlessEndpointsUpdateInput.Type;

// Output Schema
export const ServerlessEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServerlessEndpointsUpdateOutput =
  typeof ServerlessEndpointsUpdateOutput.Type;

// The operation
/**
 * Update Serverless Endpoint (asynchronous).
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param name - Serverless Endpoint name.
 */
export const ServerlessEndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerlessEndpointsUpdateInput,
    outputSchema: ServerlessEndpointsUpdateOutput,
  }),
);
// Input Schema
export const UsagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/usages",
  }),
);
export type UsagesListInput = typeof UsagesListInput.Type;

// Output Schema
export const UsagesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      id: Schema.optional(Schema.String),
      amlWorkspaceLocation: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      unit: Schema.optional(Schema.Literals(["Count"])),
      currentValue: Schema.optional(Schema.Number),
      limit: Schema.optional(Schema.Number),
      name: Schema.optional(
        Schema.Struct({
          value: Schema.optional(Schema.String),
          localizedValue: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type UsagesListOutput = typeof UsagesListOutput.Type;

// The operation
/**
 * Gets the current usage information as well as limits for AML resources for given subscription and location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const UsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesListInput,
  outputSchema: UsagesListOutput,
}));
// Input Schema
export const VirtualMachineSizesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/locations/{location}/vmSizes",
    }),
  );
export type VirtualMachineSizesListInput =
  typeof VirtualMachineSizesListInput.Type;

// Output Schema
export const VirtualMachineSizesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          family: Schema.optional(Schema.String),
          vCPUs: Schema.optional(Schema.Number),
          gpus: Schema.optional(Schema.Number),
          osVhdSizeMB: Schema.optional(Schema.Number),
          maxResourceVolumeMB: Schema.optional(Schema.Number),
          memoryGB: Schema.optional(Schema.Number),
          lowPriorityCapable: Schema.optional(Schema.Boolean),
          premiumIO: Schema.optional(Schema.Boolean),
          estimatedVMPrices: Schema.optional(
            Schema.Struct({
              billingCurrency: Schema.Literals(["USD"]),
              unitOfMeasure: Schema.Literals(["OneHour"]),
              values: Schema.Array(
                Schema.Struct({
                  retailPrice: Schema.Number,
                  osType: Schema.Literals(["Linux", "Windows"]),
                  vmTier: Schema.Literals(["Standard", "LowPriority", "Spot"]),
                }),
              ),
            }),
          ),
          supportedComputeTypes: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type VirtualMachineSizesListOutput =
  typeof VirtualMachineSizesListOutput.Type;

// The operation
/**
 * Returns supported VM Sizes in a location
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const VirtualMachineSizesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualMachineSizesListInput,
    outputSchema: VirtualMachineSizesListOutput,
  }),
);
// Input Schema
export const WorkspaceConnectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}",
    }),
  );
export type WorkspaceConnectionsCreateInput =
  typeof WorkspaceConnectionsCreateInput.Type;

// Output Schema
export const WorkspaceConnectionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceConnectionsCreateOutput =
  typeof WorkspaceConnectionsCreateOutput.Type;

// The operation
/**
 * Create or update machine learning workspaces connections under the specified workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param connectionName - Friendly name of the workspace connection
 */
export const WorkspaceConnectionsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceConnectionsCreateInput,
    outputSchema: WorkspaceConnectionsCreateOutput,
  }),
);
// Input Schema
export const WorkspaceConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}",
    }),
  );
export type WorkspaceConnectionsDeleteInput =
  typeof WorkspaceConnectionsDeleteInput.Type;

// Output Schema
export const WorkspaceConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspaceConnectionsDeleteOutput =
  typeof WorkspaceConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete machine learning workspaces connections by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param connectionName - Friendly name of the workspace connection
 */
export const WorkspaceConnectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceConnectionsDeleteInput,
    outputSchema: WorkspaceConnectionsDeleteOutput,
  }),
);
// Input Schema
export const WorkspaceConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}",
    }),
  );
export type WorkspaceConnectionsGetInput =
  typeof WorkspaceConnectionsGetInput.Type;

// Output Schema
export const WorkspaceConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceConnectionsGetOutput =
  typeof WorkspaceConnectionsGetOutput.Type;

// The operation
/**
 * Lists machine learning workspaces connections by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param connectionName - Friendly name of the workspace connection
 */
export const WorkspaceConnectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceConnectionsGetInput,
    outputSchema: WorkspaceConnectionsGetOutput,
  }),
);
// Input Schema
export const WorkspaceConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    target: Schema.optional(Schema.String),
    category: Schema.optional(Schema.String),
    includeAll: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections",
    }),
  );
export type WorkspaceConnectionsListInput =
  typeof WorkspaceConnectionsListInput.Type;

// Output Schema
export const WorkspaceConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceConnectionsListOutput =
  typeof WorkspaceConnectionsListOutput.Type;

// The operation
/**
 * List all the available machine learning workspaces connections under the specified workspace.
 *
 * Lists all the available machine learning workspaces connections under the specified workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param target - Target of the workspace connection.
 * @param category - Category of the workspace connection.
 * @param includeAll - query parameter that indicates if get connection call should return both connections and datastores
 */
export const WorkspaceConnectionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceConnectionsListInput,
    outputSchema: WorkspaceConnectionsListOutput,
  }),
);
// Input Schema
export const WorkspaceConnectionsListSecretsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/listsecrets",
    }),
  );
export type WorkspaceConnectionsListSecretsInput =
  typeof WorkspaceConnectionsListSecretsInput.Type;

// Output Schema
export const WorkspaceConnectionsListSecretsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceConnectionsListSecretsOutput =
  typeof WorkspaceConnectionsListSecretsOutput.Type;

// The operation
/**
 * List all the secrets of a machine learning workspaces connections.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param connectionName - Friendly name of the workspace connection
 */
export const WorkspaceConnectionsListSecrets =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceConnectionsListSecretsInput,
    outputSchema: WorkspaceConnectionsListSecretsOutput,
  }));
// Input Schema
export const WorkspaceConnectionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}",
    }),
  );
export type WorkspaceConnectionsUpdateInput =
  typeof WorkspaceConnectionsUpdateInput.Type;

// Output Schema
export const WorkspaceConnectionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceConnectionsUpdateOutput =
  typeof WorkspaceConnectionsUpdateOutput.Type;

// The operation
/**
 * Update machine learning workspaces connections under the specified workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param connectionName - Friendly name of the workspace connection
 */
export const WorkspaceConnectionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceConnectionsUpdateInput,
    outputSchema: WorkspaceConnectionsUpdateOutput,
  }),
);
// Input Schema
export const WorkspaceFeaturesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/features",
    }),
  );
export type WorkspaceFeaturesListInput = typeof WorkspaceFeaturesListInput.Type;

// Output Schema
export const WorkspaceFeaturesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        displayName: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceFeaturesListOutput =
  typeof WorkspaceFeaturesListOutput.Type;

// The operation
/**
 * Lists all enabled features for a workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspaceFeaturesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceFeaturesListInput,
    outputSchema: WorkspaceFeaturesListOutput,
  }),
);
// Input Schema
export const WorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}",
    }),
  );
export type WorkspacesCreateOrUpdateInput =
  typeof WorkspacesCreateOrUpdateInput.Type;

// Output Schema
export const WorkspacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspacesCreateOrUpdateOutput =
  typeof WorkspacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workspace with the specified parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesCreateOrUpdateInput,
    outputSchema: WorkspacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WorkspacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  forceToPurge: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}",
  }),
);
export type WorkspacesDeleteInput = typeof WorkspacesDeleteInput.Type;

// Output Schema
export const WorkspacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesDeleteOutput = typeof WorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes a machine learning workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 * @param forceToPurge - Flag to indicate delete is a purge request.
 */
export const WorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDeleteInput,
  outputSchema: WorkspacesDeleteOutput,
}));
// Input Schema
export const WorkspacesDiagnoseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/diagnose",
    }),
  );
export type WorkspacesDiagnoseInput = typeof WorkspacesDiagnoseInput.Type;

// Output Schema
export const WorkspacesDiagnoseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Struct({
        userDefinedRouteResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              level: Schema.optional(
                Schema.Literals(["Warning", "Error", "Information"]),
              ),
              message: Schema.optional(Schema.String),
            }),
          ),
        ),
        networkSecurityRuleResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              level: Schema.optional(
                Schema.Literals(["Warning", "Error", "Information"]),
              ),
              message: Schema.optional(Schema.String),
            }),
          ),
        ),
        resourceLockResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              level: Schema.optional(
                Schema.Literals(["Warning", "Error", "Information"]),
              ),
              message: Schema.optional(Schema.String),
            }),
          ),
        ),
        dnsResolutionResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              level: Schema.optional(
                Schema.Literals(["Warning", "Error", "Information"]),
              ),
              message: Schema.optional(Schema.String),
            }),
          ),
        ),
        storageAccountResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              level: Schema.optional(
                Schema.Literals(["Warning", "Error", "Information"]),
              ),
              message: Schema.optional(Schema.String),
            }),
          ),
        ),
        keyVaultResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              level: Schema.optional(
                Schema.Literals(["Warning", "Error", "Information"]),
              ),
              message: Schema.optional(Schema.String),
            }),
          ),
        ),
        containerRegistryResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              level: Schema.optional(
                Schema.Literals(["Warning", "Error", "Information"]),
              ),
              message: Schema.optional(Schema.String),
            }),
          ),
        ),
        applicationInsightsResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              level: Schema.optional(
                Schema.Literals(["Warning", "Error", "Information"]),
              ),
              message: Schema.optional(Schema.String),
            }),
          ),
        ),
        otherResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              level: Schema.optional(
                Schema.Literals(["Warning", "Error", "Information"]),
              ),
              message: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type WorkspacesDiagnoseOutput = typeof WorkspacesDiagnoseOutput.Type;

// The operation
/**
 * Diagnose workspace setup issue.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesDiagnose = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDiagnoseInput,
  outputSchema: WorkspacesDiagnoseOutput,
}));
// Input Schema
export const WorkspacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}",
  }),
);
export type WorkspacesGetInput = typeof WorkspacesGetInput.Type;

// Output Schema
export const WorkspacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type WorkspacesGetOutput = typeof WorkspacesGetOutput.Type;

// The operation
/**
 * Gets the properties of the specified machine learning workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesGetInput,
  outputSchema: WorkspacesGetOutput,
}));
// Input Schema
export const WorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    kind: Schema.optional(Schema.String),
    $skip: Schema.optional(Schema.String),
    aiCapabilities: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces",
    }),
  );
export type WorkspacesListByResourceGroupInput =
  typeof WorkspacesListByResourceGroupInput.Type;

// Output Schema
export const WorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspacesListByResourceGroupOutput =
  typeof WorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the available machine learning workspaces under the specified resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param kind - Kind of workspace.
 * @param $skip - Continuation token for pagination.
 */
export const WorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListByResourceGroupInput,
    outputSchema: WorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const WorkspacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    kind: Schema.optional(Schema.String),
    $skip: Schema.optional(Schema.String),
    aiCapabilities: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.MachineLearningServices/workspaces",
    }),
  );
export type WorkspacesListBySubscriptionInput =
  typeof WorkspacesListBySubscriptionInput.Type;

// Output Schema
export const WorkspacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspacesListBySubscriptionOutput =
  typeof WorkspacesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the available machine learning workspaces under the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param kind - Kind of workspace.
 * @param $skip - Continuation token for pagination.
 */
export const WorkspacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListBySubscriptionInput,
    outputSchema: WorkspacesListBySubscriptionOutput,
  }));
// Input Schema
export const WorkspacesListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listKeys",
    }),
  );
export type WorkspacesListKeysInput = typeof WorkspacesListKeysInput.Type;

// Output Schema
export const WorkspacesListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    appInsightsInstrumentationKey: Schema.optional(Schema.String),
    containerRegistryCredentials: Schema.optional(
      Schema.Struct({
        location: Schema.optional(Schema.String),
        passwords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
        username: Schema.optional(Schema.String),
      }),
    ),
    notebookAccessKeys: Schema.optional(
      Schema.Struct({
        primaryAccessKey: Schema.optional(Schema.String),
        secondaryAccessKey: Schema.optional(Schema.String),
      }),
    ),
    userStorageArmId: Schema.optional(Schema.String),
    userStorageKey: Schema.optional(Schema.String),
  });
export type WorkspacesListKeysOutput = typeof WorkspacesListKeysOutput.Type;

// The operation
/**
 * Lists all the keys associated with this workspace. This includes keys for the storage account, app insights and password for container registry.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesListKeysInput,
  outputSchema: WorkspacesListKeysOutput,
}));
// Input Schema
export const WorkspacesListNotebookAccessTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listNotebookAccessToken",
    }),
  );
export type WorkspacesListNotebookAccessTokenInput =
  typeof WorkspacesListNotebookAccessTokenInput.Type;

// Output Schema
export const WorkspacesListNotebookAccessTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accessToken: Schema.optional(SensitiveString),
    expiresIn: Schema.optional(Schema.Number),
    hostName: Schema.optional(Schema.String),
    notebookResourceId: Schema.optional(Schema.String),
    publicDns: Schema.optional(Schema.String),
    refreshToken: Schema.optional(SensitiveString),
    scope: Schema.optional(Schema.String),
    tokenType: Schema.optional(Schema.String),
  });
export type WorkspacesListNotebookAccessTokenOutput =
  typeof WorkspacesListNotebookAccessTokenOutput.Type;

// The operation
/**
 * Get Azure Machine Learning Workspace notebook access token
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesListNotebookAccessToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListNotebookAccessTokenInput,
    outputSchema: WorkspacesListNotebookAccessTokenOutput,
  }));
// Input Schema
export const WorkspacesListNotebookKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listNotebookKeys",
    }),
  );
export type WorkspacesListNotebookKeysInput =
  typeof WorkspacesListNotebookKeysInput.Type;

// Output Schema
export const WorkspacesListNotebookKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryAccessKey: Schema.optional(Schema.String),
    secondaryAccessKey: Schema.optional(Schema.String),
  });
export type WorkspacesListNotebookKeysOutput =
  typeof WorkspacesListNotebookKeysOutput.Type;

// The operation
/**
 * Lists keys of Azure Machine Learning Workspaces notebook.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesListNotebookKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesListNotebookKeysInput,
    outputSchema: WorkspacesListNotebookKeysOutput,
  }),
);
// Input Schema
export const WorkspacesListOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type WorkspacesListOutboundNetworkDependenciesEndpointsInput =
  typeof WorkspacesListOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const WorkspacesListOutboundNetworkDependenciesEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              category: Schema.optional(Schema.String),
              endpoints: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    domainName: Schema.optional(Schema.String),
                    endpointDetails: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          port: Schema.optional(Schema.Number),
                        }),
                      ),
                    ),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type WorkspacesListOutboundNetworkDependenciesEndpointsOutput =
  typeof WorkspacesListOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Called by Client (Portal, CLI, etc) to get a list of all external outbound dependencies (FQDNs) programmatically.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesListOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListOutboundNetworkDependenciesEndpointsInput,
    outputSchema: WorkspacesListOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const WorkspacesListStorageAccountKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/listStorageAccountKeys",
    }),
  );
export type WorkspacesListStorageAccountKeysInput =
  typeof WorkspacesListStorageAccountKeysInput.Type;

// Output Schema
export const WorkspacesListStorageAccountKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    userStorageKey: Schema.optional(Schema.String),
  });
export type WorkspacesListStorageAccountKeysOutput =
  typeof WorkspacesListStorageAccountKeysOutput.Type;

// The operation
/**
 * Lists keys of Azure Machine Learning Workspace's storage account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesListStorageAccountKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListStorageAccountKeysInput,
    outputSchema: WorkspacesListStorageAccountKeysOutput,
  }));
// Input Schema
export const WorkspacesPrepareNotebookInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/prepareNotebook",
    }),
  );
export type WorkspacesPrepareNotebookInput =
  typeof WorkspacesPrepareNotebookInput.Type;

// Output Schema
export const WorkspacesPrepareNotebookOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fqdn: Schema.optional(Schema.String),
    isPrivateLinkEnabled: Schema.optional(Schema.Boolean),
    notebookPreparationError: Schema.optional(
      Schema.Struct({
        errorMessage: Schema.optional(Schema.String),
        statusCode: Schema.optional(Schema.Number),
      }),
    ),
    resourceId: Schema.optional(Schema.String),
  });
export type WorkspacesPrepareNotebookOutput =
  typeof WorkspacesPrepareNotebookOutput.Type;

// The operation
/**
 * Prepare Azure Machine Learning Workspace's notebook resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesPrepareNotebook = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesPrepareNotebookInput,
    outputSchema: WorkspacesPrepareNotebookOutput,
  }),
);
// Input Schema
export const WorkspacesResyncKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/resyncKeys",
    }),
  );
export type WorkspacesResyncKeysInput = typeof WorkspacesResyncKeysInput.Type;

// Output Schema
export const WorkspacesResyncKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspacesResyncKeysOutput = typeof WorkspacesResyncKeysOutput.Type;

// The operation
/**
 * Resync all the keys associated with this workspace.This includes keys for the storage account, app insights and password for container registry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesResyncKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesResyncKeysInput,
    outputSchema: WorkspacesResyncKeysOutput,
  }),
);
// Input Schema
export const WorkspacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}",
  }),
);
export type WorkspacesUpdateInput = typeof WorkspacesUpdateInput.Type;

// Output Schema
export const WorkspacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type WorkspacesUpdateOutput = typeof WorkspacesUpdateOutput.Type;

// The operation
/**
 * Updates a machine learning workspace with the specified parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - Azure Machine Learning Workspace Name
 */
export const WorkspacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesUpdateInput,
  outputSchema: WorkspacesUpdateOutput,
}));
