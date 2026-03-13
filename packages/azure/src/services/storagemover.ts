/**
 * Azure Storagemover API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AgentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    agentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/agents/{agentName}",
    }),
  );
export type AgentsCreateOrUpdateInput = typeof AgentsCreateOrUpdateInput.Type;

// Output Schema
export const AgentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AgentsCreateOrUpdateOutput = typeof AgentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an Agent resource, which references a hybrid compute machine that can run jobs.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param agentName - The name of the Agent resource.
 */
export const AgentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AgentsCreateOrUpdateInput,
    outputSchema: AgentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const AgentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  agentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/agents/{agentName}",
  }),
);
export type AgentsDeleteInput = typeof AgentsDeleteInput.Type;

// Output Schema
export const AgentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AgentsDeleteOutput = typeof AgentsDeleteOutput.Type;

// The operation
/**
 * Deletes an Agent resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param agentName - The name of the Agent resource.
 */
export const AgentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentsDeleteInput,
  outputSchema: AgentsDeleteOutput,
}));
// Input Schema
export const AgentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  agentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/agents/{agentName}",
  }),
);
export type AgentsGetInput = typeof AgentsGetInput.Type;

// Output Schema
export const AgentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AgentsGetOutput = typeof AgentsGetOutput.Type;

// The operation
/**
 * Gets an Agent resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param agentName - The name of the Agent resource.
 */
export const AgentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentsGetInput,
  outputSchema: AgentsGetOutput,
}));
// Input Schema
export const AgentsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/agents",
  }),
);
export type AgentsListInput = typeof AgentsListInput.Type;

// Output Schema
export const AgentsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type AgentsListOutput = typeof AgentsListOutput.Type;

// The operation
/**
 * Lists all Agents in a Storage Mover.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 */
export const AgentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentsListInput,
  outputSchema: AgentsListOutput,
}));
// Input Schema
export const AgentsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  agentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/agents/{agentName}",
  }),
);
export type AgentsUpdateInput = typeof AgentsUpdateInput.Type;

// Output Schema
export const AgentsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AgentsUpdateOutput = typeof AgentsUpdateOutput.Type;

// The operation
/**
 * Creates or updates an Agent resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param agentName - The name of the Agent resource.
 */
export const AgentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AgentsUpdateInput,
  outputSchema: AgentsUpdateOutput,
}));
// Input Schema
export const ConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/connections/{connectionName}",
    }),
  );
export type ConnectionsCreateOrUpdateInput =
  typeof ConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const ConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConnectionsCreateOrUpdateOutput =
  typeof ConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Connection resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param connectionName - The name of the Connection resource.
 */
export const ConnectionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConnectionsCreateOrUpdateInput,
    outputSchema: ConnectionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ConnectionsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    connectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/connections/{connectionName}",
  }),
);
export type ConnectionsDeleteInput = typeof ConnectionsDeleteInput.Type;

// Output Schema
export const ConnectionsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConnectionsDeleteOutput = typeof ConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a Connection resource.
 * Returns 409 if there are active jobs using this connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param connectionName - The name of the Connection resource.
 */
export const ConnectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionsDeleteInput,
  outputSchema: ConnectionsDeleteOutput,
}));
// Input Schema
export const ConnectionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  connectionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/connections/{connectionName}",
  }),
);
export type ConnectionsGetInput = typeof ConnectionsGetInput.Type;

// Output Schema
export const ConnectionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ConnectionsGetOutput = typeof ConnectionsGetOutput.Type;

// The operation
/**
 * Gets a Connection resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param connectionName - The name of the Connection resource.
 */
export const ConnectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionsGetInput,
  outputSchema: ConnectionsGetOutput,
}));
// Input Schema
export const ConnectionsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/connections",
  }),
);
export type ConnectionsListInput = typeof ConnectionsListInput.Type;

// Output Schema
export const ConnectionsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type ConnectionsListOutput = typeof ConnectionsListOutput.Type;

// The operation
/**
 * Lists all Connections in a Storage Mover.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 */
export const ConnectionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConnectionsListInput,
  outputSchema: ConnectionsListOutput,
}));
// Input Schema
export const EndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints/{endpointName}",
    }),
  );
export type EndpointsCreateOrUpdateInput =
  typeof EndpointsCreateOrUpdateInput.Type;

// Output Schema
export const EndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EndpointsCreateOrUpdateOutput =
  typeof EndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an Endpoint resource, which represents a data transfer source or destination.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param endpointName - The name of the Endpoint resource.
 */
export const EndpointsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EndpointsCreateOrUpdateInput,
    outputSchema: EndpointsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EndpointsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints/{endpointName}",
  }),
);
export type EndpointsDeleteInput = typeof EndpointsDeleteInput.Type;

// Output Schema
export const EndpointsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EndpointsDeleteOutput = typeof EndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes an Endpoint resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param endpointName - The name of the Endpoint resource.
 */
export const EndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsDeleteInput,
  outputSchema: EndpointsDeleteOutput,
}));
// Input Schema
export const EndpointsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints/{endpointName}",
  }),
);
export type EndpointsGetInput = typeof EndpointsGetInput.Type;

// Output Schema
export const EndpointsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EndpointsGetOutput = typeof EndpointsGetOutput.Type;

// The operation
/**
 * Gets an Endpoint resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param endpointName - The name of the Endpoint resource.
 */
export const EndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsGetInput,
  outputSchema: EndpointsGetOutput,
}));
// Input Schema
export const EndpointsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints",
  }),
);
export type EndpointsListInput = typeof EndpointsListInput.Type;

// Output Schema
export const EndpointsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type EndpointsListOutput = typeof EndpointsListOutput.Type;

// The operation
/**
 * Lists all Endpoints in a Storage Mover.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 */
export const EndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsListInput,
  outputSchema: EndpointsListOutput,
}));
// Input Schema
export const EndpointsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/endpoints/{endpointName}",
  }),
);
export type EndpointsUpdateInput = typeof EndpointsUpdateInput.Type;

// Output Schema
export const EndpointsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type EndpointsUpdateOutput = typeof EndpointsUpdateOutput.Type;

// The operation
/**
 * Updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param endpointName - The name of the Endpoint resource.
 */
export const EndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsUpdateInput,
  outputSchema: EndpointsUpdateOutput,
}));
// Input Schema
export const JobDefinitionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    jobDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}",
    }),
  );
export type JobDefinitionsCreateOrUpdateInput =
  typeof JobDefinitionsCreateOrUpdateInput.Type;

// Output Schema
export const JobDefinitionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobDefinitionsCreateOrUpdateOutput =
  typeof JobDefinitionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Job Definition resource, which contains configuration for a single unit of managed data transfer.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 * @param jobDefinitionName - The name of the Job Definition resource.
 */
export const JobDefinitionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobDefinitionsCreateOrUpdateInput,
    outputSchema: JobDefinitionsCreateOrUpdateOutput,
  }));
// Input Schema
export const JobDefinitionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    jobDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}",
    }),
  );
export type JobDefinitionsDeleteInput = typeof JobDefinitionsDeleteInput.Type;

// Output Schema
export const JobDefinitionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobDefinitionsDeleteOutput = typeof JobDefinitionsDeleteOutput.Type;

// The operation
/**
 * Deletes a Job Definition resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 * @param jobDefinitionName - The name of the Job Definition resource.
 */
export const JobDefinitionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobDefinitionsDeleteInput,
    outputSchema: JobDefinitionsDeleteOutput,
  }),
);
// Input Schema
export const JobDefinitionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    jobDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}",
  }),
);
export type JobDefinitionsGetInput = typeof JobDefinitionsGetInput.Type;

// Output Schema
export const JobDefinitionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobDefinitionsGetOutput = typeof JobDefinitionsGetOutput.Type;

// The operation
/**
 * Gets a Job Definition resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 * @param jobDefinitionName - The name of the Job Definition resource.
 */
export const JobDefinitionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobDefinitionsGetInput,
  outputSchema: JobDefinitionsGetOutput,
}));
// Input Schema
export const JobDefinitionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions",
    }),
  );
export type JobDefinitionsListInput = typeof JobDefinitionsListInput.Type;

// Output Schema
export const JobDefinitionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type JobDefinitionsListOutput = typeof JobDefinitionsListOutput.Type;

// The operation
/**
 * Lists all Job Definitions in a Project.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 */
export const JobDefinitionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobDefinitionsListInput,
  outputSchema: JobDefinitionsListOutput,
}));
// Input Schema
export const JobDefinitionsStartJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    jobDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/startJob",
    }),
  );
export type JobDefinitionsStartJobInput =
  typeof JobDefinitionsStartJobInput.Type;

// Output Schema
export const JobDefinitionsStartJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobRunResourceId: Schema.optional(Schema.String),
  });
export type JobDefinitionsStartJobOutput =
  typeof JobDefinitionsStartJobOutput.Type;

// The operation
/**
 * Creates a new Job Run resource for the specified Job Definition and passes it to the Agent for execution.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 * @param jobDefinitionName - The name of the Job Definition resource.
 */
export const JobDefinitionsStartJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobDefinitionsStartJobInput,
    outputSchema: JobDefinitionsStartJobOutput,
  }),
);
// Input Schema
export const JobDefinitionsStopJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    jobDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/stopJob",
    }),
  );
export type JobDefinitionsStopJobInput = typeof JobDefinitionsStopJobInput.Type;

// Output Schema
export const JobDefinitionsStopJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jobRunResourceId: Schema.optional(Schema.String),
  });
export type JobDefinitionsStopJobOutput =
  typeof JobDefinitionsStopJobOutput.Type;

// The operation
/**
 * Requests the Agent of any active instance of this Job Definition to stop.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 * @param jobDefinitionName - The name of the Job Definition resource.
 */
export const JobDefinitionsStopJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobDefinitionsStopJobInput,
    outputSchema: JobDefinitionsStopJobOutput,
  }),
);
// Input Schema
export const JobDefinitionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    jobDefinitionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}",
    }),
  );
export type JobDefinitionsUpdateInput = typeof JobDefinitionsUpdateInput.Type;

// Output Schema
export const JobDefinitionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobDefinitionsUpdateOutput = typeof JobDefinitionsUpdateOutput.Type;

// The operation
/**
 * Updates properties for a Job Definition resource. Properties not specified in the request body will be unchanged.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 * @param jobDefinitionName - The name of the Job Definition resource.
 */
export const JobDefinitionsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobDefinitionsUpdateInput,
    outputSchema: JobDefinitionsUpdateOutput,
  }),
);
// Input Schema
export const JobRunsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  projectName: Schema.String.pipe(T.PathParam()),
  jobDefinitionName: Schema.String.pipe(T.PathParam()),
  jobRunName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/jobRuns/{jobRunName}",
  }),
);
export type JobRunsGetInput = typeof JobRunsGetInput.Type;

// Output Schema
export const JobRunsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobRunsGetOutput = typeof JobRunsGetOutput.Type;

// The operation
/**
 * Gets a Job Run resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 * @param jobDefinitionName - The name of the Job Definition resource.
 * @param jobRunName - The name of the Job Run resource.
 */
export const JobRunsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobRunsGetInput,
  outputSchema: JobRunsGetOutput,
}));
// Input Schema
export const JobRunsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  projectName: Schema.String.pipe(T.PathParam()),
  jobDefinitionName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/jobRuns",
  }),
);
export type JobRunsListInput = typeof JobRunsListInput.Type;

// Output Schema
export const JobRunsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type JobRunsListOutput = typeof JobRunsListOutput.Type;

// The operation
/**
 * Lists all Job Runs in a Job Definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 * @param jobDefinitionName - The name of the Job Definition resource.
 */
export const JobRunsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobRunsListInput,
  outputSchema: JobRunsListOutput,
}));
// Input Schema
export const ProjectsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    projectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}",
    }),
  );
export type ProjectsCreateOrUpdateInput =
  typeof ProjectsCreateOrUpdateInput.Type;

// Output Schema
export const ProjectsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProjectsCreateOrUpdateOutput =
  typeof ProjectsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Project resource, which is a logical grouping of related jobs.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 */
export const ProjectsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectsCreateOrUpdateInput,
    outputSchema: ProjectsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ProjectsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  projectName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}",
  }),
);
export type ProjectsDeleteInput = typeof ProjectsDeleteInput.Type;

// Output Schema
export const ProjectsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectsDeleteOutput = typeof ProjectsDeleteOutput.Type;

// The operation
/**
 * Deletes a Project resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 */
export const ProjectsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsDeleteInput,
  outputSchema: ProjectsDeleteOutput,
}));
// Input Schema
export const ProjectsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  projectName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}",
  }),
);
export type ProjectsGetInput = typeof ProjectsGetInput.Type;

// Output Schema
export const ProjectsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProjectsGetOutput = typeof ProjectsGetOutput.Type;

// The operation
/**
 * Gets a Project resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 */
export const ProjectsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsGetInput,
  outputSchema: ProjectsGetOutput,
}));
// Input Schema
export const ProjectsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects",
  }),
);
export type ProjectsListInput = typeof ProjectsListInput.Type;

// Output Schema
export const ProjectsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type ProjectsListOutput = typeof ProjectsListOutput.Type;

// The operation
/**
 * Lists all Projects in a Storage Mover.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 */
export const ProjectsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsListInput,
  outputSchema: ProjectsListOutput,
}));
// Input Schema
export const ProjectsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  projectName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}",
  }),
);
export type ProjectsUpdateInput = typeof ProjectsUpdateInput.Type;

// Output Schema
export const ProjectsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ProjectsUpdateOutput = typeof ProjectsUpdateOutput.Type;

// The operation
/**
 * Updates properties for a Project resource. Properties not specified in the request body will be unchanged.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 * @param projectName - The name of the Project resource.
 */
export const ProjectsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsUpdateInput,
  outputSchema: ProjectsUpdateOutput,
}));
// Input Schema
export const StorageMoversCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}",
    }),
  );
export type StorageMoversCreateOrUpdateInput =
  typeof StorageMoversCreateOrUpdateInput.Type;

// Output Schema
export const StorageMoversCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageMoversCreateOrUpdateOutput =
  typeof StorageMoversCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a top-level Storage Mover resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 */
export const StorageMoversCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageMoversCreateOrUpdateInput,
    outputSchema: StorageMoversCreateOrUpdateOutput,
  }),
);
// Input Schema
export const StorageMoversDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}",
    }),
  );
export type StorageMoversDeleteInput = typeof StorageMoversDeleteInput.Type;

// Output Schema
export const StorageMoversDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageMoversDeleteOutput = typeof StorageMoversDeleteOutput.Type;

// The operation
/**
 * Deletes a Storage Mover resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 */
export const StorageMoversDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageMoversDeleteInput,
  outputSchema: StorageMoversDeleteOutput,
}));
// Input Schema
export const StorageMoversGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  storageMoverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}",
  }),
);
export type StorageMoversGetInput = typeof StorageMoversGetInput.Type;

// Output Schema
export const StorageMoversGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type StorageMoversGetOutput = typeof StorageMoversGetOutput.Type;

// The operation
/**
 * Gets a Storage Mover resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 */
export const StorageMoversGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageMoversGetInput,
  outputSchema: StorageMoversGetOutput,
}));
// Input Schema
export const StorageMoversListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers",
  }),
);
export type StorageMoversListInput = typeof StorageMoversListInput.Type;

// Output Schema
export const StorageMoversListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageMoversListOutput = typeof StorageMoversListOutput.Type;

// The operation
/**
 * Lists all Storage Movers in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const StorageMoversList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageMoversListInput,
  outputSchema: StorageMoversListOutput,
}));
// Input Schema
export const StorageMoversListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.StorageMover/storageMovers",
    }),
  );
export type StorageMoversListBySubscriptionInput =
  typeof StorageMoversListBySubscriptionInput.Type;

// Output Schema
export const StorageMoversListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageMoversListBySubscriptionOutput =
  typeof StorageMoversListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all Storage Movers in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const StorageMoversListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageMoversListBySubscriptionInput,
    outputSchema: StorageMoversListBySubscriptionOutput,
  }));
// Input Schema
export const StorageMoversUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    storageMoverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}",
    }),
  );
export type StorageMoversUpdateInput = typeof StorageMoversUpdateInput.Type;

// Output Schema
export const StorageMoversUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type StorageMoversUpdateOutput = typeof StorageMoversUpdateOutput.Type;

// The operation
/**
 * Updates properties for a Storage Mover resource. Properties not specified in the request body will be unchanged.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param storageMoverName - The name of the Storage Mover resource.
 */
export const StorageMoversUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageMoversUpdateInput,
  outputSchema: StorageMoversUpdateOutput,
}));
