/**
 * Azure Recoveryservicesdatareplication API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CheckNameAvailabilityPostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataReplication/locations/{location}/checkNameAvailability",
    }),
  );
export type CheckNameAvailabilityPostInput =
  typeof CheckNameAvailabilityPostInput.Type;

// Output Schema
export const CheckNameAvailabilityPostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type CheckNameAvailabilityPostOutput =
  typeof CheckNameAvailabilityPostOutput.Type;

// The operation
/**
 * Performs the resource name availability check.
 *
 * Checks the resource name availability.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const CheckNameAvailabilityPost = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CheckNameAvailabilityPostInput,
    outputSchema: CheckNameAvailabilityPostOutput,
  }),
);
// Input Schema
export const DeploymentPreflightPostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    deploymentId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/deployments/{deploymentId}/preflight",
    }),
  );
export type DeploymentPreflightPostInput =
  typeof DeploymentPreflightPostInput.Type;

// Output Schema
export const DeploymentPreflightPostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resources: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          apiVersion: Schema.optional(Schema.String),
          properties: Schema.optional(Schema.Unknown),
        }),
      ),
    ),
  });
export type DeploymentPreflightPostOutput =
  typeof DeploymentPreflightPostOutput.Type;

// The operation
/**
 * Performs resource deployment validation.
 *
 * Performs resource deployment preflight validation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param deploymentId - Deployment Id.
 */
export const DeploymentPreflightPost = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentPreflightPostInput,
    outputSchema: DeploymentPreflightPostOutput,
  }),
);
// Input Schema
export const EmailConfigurationCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    emailConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/alertSettings/{emailConfigurationName}",
    }),
  );
export type EmailConfigurationCreateInput =
  typeof EmailConfigurationCreateInput.Type;

// Output Schema
export const EmailConfigurationCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EmailConfigurationCreateOutput =
  typeof EmailConfigurationCreateOutput.Type;

// The operation
/**
 * Creates an alert configuration setting for the given vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param emailConfigurationName - The email configuration name.
 */
export const EmailConfigurationCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EmailConfigurationCreateInput,
    outputSchema: EmailConfigurationCreateOutput,
  }),
);
// Input Schema
export const EmailConfigurationGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    emailConfigurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/alertSettings/{emailConfigurationName}",
    }),
  );
export type EmailConfigurationGetInput = typeof EmailConfigurationGetInput.Type;

// Output Schema
export const EmailConfigurationGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EmailConfigurationGetOutput =
  typeof EmailConfigurationGetOutput.Type;

// The operation
/**
 * Gets the details of the alert configuration setting.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param emailConfigurationName - The email configuration name.
 */
export const EmailConfigurationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EmailConfigurationGetInput,
    outputSchema: EmailConfigurationGetOutput,
  }),
);
// Input Schema
export const EmailConfigurationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/alertSettings",
    }),
  );
export type EmailConfigurationListInput =
  typeof EmailConfigurationListInput.Type;

// Output Schema
export const EmailConfigurationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type EmailConfigurationListOutput =
  typeof EmailConfigurationListOutput.Type;

// The operation
/**
 * Gets the list of alert configuration settings for the given vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 */
export const EmailConfigurationList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EmailConfigurationListInput,
    outputSchema: EmailConfigurationListOutput,
  }),
);
// Input Schema
export const EventGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  eventName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/events/{eventName}",
  }),
);
export type EventGetInput = typeof EventGetInput.Type;

// Output Schema
export const EventGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EventGetOutput = typeof EventGetOutput.Type;

// The operation
/**
 * Gets the details of the event.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param eventName - The event name.
 */
export const EventGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EventGetInput,
  outputSchema: EventGetOutput,
}));
// Input Schema
export const EventListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  odataOptions: Schema.optional(Schema.String),
  continuationToken: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/events",
  }),
);
export type EventListInput = typeof EventListInput.Type;

// Output Schema
export const EventListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type EventListOutput = typeof EventListOutput.Type;

// The operation
/**
 * Gets the list of events in the given vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param odataOptions - OData options.
 * @param continuationToken - Continuation token.
 * @param pageSize - Page size.
 * @param vaultName - The vault name.
 */
export const EventList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EventListInput,
  outputSchema: EventListOutput,
}));
// Input Schema
export const FabricAgentCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    fabricAgentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}/fabricAgents/{fabricAgentName}",
  }),
);
export type FabricAgentCreateInput = typeof FabricAgentCreateInput.Type;

// Output Schema
export const FabricAgentCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FabricAgentCreateOutput = typeof FabricAgentCreateOutput.Type;

// The operation
/**
 * Creates the fabric agent.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fabricName - The fabric name.
 * @param fabricAgentName - The fabric agent name.
 */
export const FabricAgentCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricAgentCreateInput,
  outputSchema: FabricAgentCreateOutput,
}));
// Input Schema
export const FabricAgentDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    fabricAgentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}/fabricAgents/{fabricAgentName}",
  }),
);
export type FabricAgentDeleteInput = typeof FabricAgentDeleteInput.Type;

// Output Schema
export const FabricAgentDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FabricAgentDeleteOutput = typeof FabricAgentDeleteOutput.Type;

// The operation
/**
 * Deletes fabric agent.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fabricName - The fabric name.
 * @param fabricAgentName - The fabric agent name.
 */
export const FabricAgentDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricAgentDeleteInput,
  outputSchema: FabricAgentDeleteOutput,
}));
// Input Schema
export const FabricAgentGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fabricName: Schema.String.pipe(T.PathParam()),
  fabricAgentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}/fabricAgents/{fabricAgentName}",
  }),
);
export type FabricAgentGetInput = typeof FabricAgentGetInput.Type;

// Output Schema
export const FabricAgentGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FabricAgentGetOutput = typeof FabricAgentGetOutput.Type;

// The operation
/**
 * Gets the details of the fabric agent.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fabricName - The fabric name.
 * @param fabricAgentName - The fabric agent name.
 */
export const FabricAgentGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricAgentGetInput,
  outputSchema: FabricAgentGetOutput,
}));
// Input Schema
export const FabricAgentListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fabricName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}/fabricAgents",
  }),
);
export type FabricAgentListInput = typeof FabricAgentListInput.Type;

// Output Schema
export const FabricAgentListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type FabricAgentListOutput = typeof FabricAgentListOutput.Type;

// The operation
/**
 * Gets the list of fabric agents in the given fabric.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fabricName - The fabric name.
 */
export const FabricAgentList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricAgentListInput,
  outputSchema: FabricAgentListOutput,
}));
// Input Schema
export const FabricCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fabricName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}",
  }),
);
export type FabricCreateInput = typeof FabricCreateInput.Type;

// Output Schema
export const FabricCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FabricCreateOutput = typeof FabricCreateOutput.Type;

// The operation
/**
 * Creates the fabric.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fabricName - The fabric name.
 */
export const FabricCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricCreateInput,
  outputSchema: FabricCreateOutput,
}));
// Input Schema
export const FabricDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fabricName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}",
  }),
);
export type FabricDeleteInput = typeof FabricDeleteInput.Type;

// Output Schema
export const FabricDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FabricDeleteOutput = typeof FabricDeleteOutput.Type;

// The operation
/**
 * Removes the fabric.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fabricName - The fabric name.
 */
export const FabricDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricDeleteInput,
  outputSchema: FabricDeleteOutput,
}));
// Input Schema
export const FabricGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fabricName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}",
  }),
);
export type FabricGetInput = typeof FabricGetInput.Type;

// Output Schema
export const FabricGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FabricGetOutput = typeof FabricGetOutput.Type;

// The operation
/**
 * Gets the details of the fabric.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fabricName - The fabric name.
 */
export const FabricGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricGetInput,
  outputSchema: FabricGetOutput,
}));
// Input Schema
export const FabricListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  continuationToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics",
  }),
);
export type FabricListInput = typeof FabricListInput.Type;

// Output Schema
export const FabricListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type FabricListOutput = typeof FabricListOutput.Type;

// The operation
/**
 * Gets the list of fabrics in the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param continuationToken - Continuation token from the previous call.
 */
export const FabricList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricListInput,
  outputSchema: FabricListOutput,
}));
// Input Schema
export const FabricListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataReplication/replicationFabrics",
    }),
  );
export type FabricListBySubscriptionInput =
  typeof FabricListBySubscriptionInput.Type;

// Output Schema
export const FabricListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type FabricListBySubscriptionOutput =
  typeof FabricListBySubscriptionOutput.Type;

// The operation
/**
 * Gets the list of fabrics in the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const FabricListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FabricListBySubscriptionInput,
    outputSchema: FabricListBySubscriptionOutput,
  }),
);
// Input Schema
export const FabricUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  fabricName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationFabrics/{fabricName}",
  }),
);
export type FabricUpdateInput = typeof FabricUpdateInput.Type;

// Output Schema
export const FabricUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type FabricUpdateOutput = typeof FabricUpdateOutput.Type;

// The operation
/**
 * Performs update on the fabric.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param fabricName - The fabric name.
 */
export const FabricUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FabricUpdateInput,
  outputSchema: FabricUpdateOutput,
}));
// Input Schema
export const JobGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/jobs/{jobName}",
  }),
);
export type JobGetInput = typeof JobGetInput.Type;

// Output Schema
export const JobGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobGetOutput = typeof JobGetOutput.Type;

// The operation
/**
 * Gets the details of the job.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param jobName - The job name.
 */
export const JobGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobGetInput,
  outputSchema: JobGetOutput,
}));
// Input Schema
export const JobListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  odataOptions: Schema.optional(Schema.String),
  continuationToken: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/jobs",
  }),
);
export type JobListInput = typeof JobListInput.Type;

// Output Schema
export const JobListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type JobListOutput = typeof JobListOutput.Type;

// The operation
/**
 * Gets the list of jobs in the given vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param odataOptions - OData options.
 * @param continuationToken - Continuation token.
 * @param pageSize - Page size.
 * @param vaultName - The vault name.
 */
export const JobList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobListInput,
  outputSchema: JobListOutput,
}));
// Input Schema
export const LocationBasedOperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/locations/{location}/operationResults/{operationId}",
    }),
  );
export type LocationBasedOperationResultsGetInput =
  typeof LocationBasedOperationResultsGetInput.Type;

// Output Schema
export const LocationBasedOperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
  });
export type LocationBasedOperationResultsGetOutput =
  typeof LocationBasedOperationResultsGetOutput.Type;

// The operation
/**
 * Gets the location based operation result status.
 *
 * Gets the location based operation result.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of the Azure region.
 * @param operationId - The ID of an ongoing async operation.
 */
export const LocationBasedOperationResultsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LocationBasedOperationResultsGetInput,
    outputSchema: LocationBasedOperationResultsGetOutput,
  }));
// Input Schema
export const OperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/operationResults/{operationId}/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/{operationId}",
    }),
  );
export type OperationResultsGetInput = typeof OperationResultsGetInput.Type;

// Output Schema
export const OperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
  });
export type OperationResultsGetOutput = typeof OperationResultsGetOutput.Type;

// The operation
/**
 * Gets the operation result status.
 *
 * Gets the operations.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param operationId - The ID of an ongoing async operation.
 */
export const OperationResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationResultsGetInput,
  outputSchema: OperationResultsGetOutput,
}));
// Input Schema
export const PolicyCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  policyName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationPolicies/{policyName}",
  }),
);
export type PolicyCreateInput = typeof PolicyCreateInput.Type;

// Output Schema
export const PolicyCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyCreateOutput = typeof PolicyCreateOutput.Type;

// The operation
/**
 * Creates the policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param policyName - The policy name.
 */
export const PolicyCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PolicyCreateInput,
  outputSchema: PolicyCreateOutput,
}));
// Input Schema
export const PolicyDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  policyName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationPolicies/{policyName}",
  }),
);
export type PolicyDeleteInput = typeof PolicyDeleteInput.Type;

// Output Schema
export const PolicyDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PolicyDeleteOutput = typeof PolicyDeleteOutput.Type;

// The operation
/**
 * Removes the policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param policyName - The policy name.
 */
export const PolicyDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PolicyDeleteInput,
  outputSchema: PolicyDeleteOutput,
}));
// Input Schema
export const PolicyGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  policyName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationPolicies/{policyName}",
  }),
);
export type PolicyGetInput = typeof PolicyGetInput.Type;

// Output Schema
export const PolicyGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PolicyGetOutput = typeof PolicyGetOutput.Type;

// The operation
/**
 * Gets the details of the policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param policyName - The policy name.
 */
export const PolicyGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PolicyGetInput,
  outputSchema: PolicyGetOutput,
}));
// Input Schema
export const PolicyListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationPolicies",
  }),
);
export type PolicyListInput = typeof PolicyListInput.Type;

// Output Schema
export const PolicyListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type PolicyListOutput = typeof PolicyListOutput.Type;

// The operation
/**
 * Gets the list of policies in the given vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 */
export const PolicyList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PolicyListInput,
  outputSchema: PolicyListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionProxiesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyName}",
    }),
  );
export type PrivateEndpointConnectionProxiesCreateInput =
  typeof PrivateEndpointConnectionProxiesCreateInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionProxiesCreateOutput =
  typeof PrivateEndpointConnectionProxiesCreateOutput.Type;

// The operation
/**
 * Create a new private endpoint connection proxy which includes both auto and manual approval types. Creating the proxy resource will also create a private endpoint connection resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param privateEndpointConnectionProxyName - The private endpoint connection proxy name.
 */
export const PrivateEndpointConnectionProxiesCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesCreateInput,
    outputSchema: PrivateEndpointConnectionProxiesCreateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxiesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyName}",
    }),
  );
export type PrivateEndpointConnectionProxiesDeleteInput =
  typeof PrivateEndpointConnectionProxiesDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionProxiesDeleteOutput =
  typeof PrivateEndpointConnectionProxiesDeleteOutput.Type;

// The operation
/**
 * Returns the operation to track the deletion of private endpoint connection proxy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param privateEndpointConnectionProxyName - The private endpoint connection proxy name.
 */
export const PrivateEndpointConnectionProxiesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesDeleteInput,
    outputSchema: PrivateEndpointConnectionProxiesDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxiesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyName}",
    }),
  );
export type PrivateEndpointConnectionProxiesGetInput =
  typeof PrivateEndpointConnectionProxiesGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionProxiesGetOutput =
  typeof PrivateEndpointConnectionProxiesGetOutput.Type;

// The operation
/**
 * Gets the private endpoint connection proxy details.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param privateEndpointConnectionProxyName - The private endpoint connection proxy name.
 */
export const PrivateEndpointConnectionProxiesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesGetInput,
    outputSchema: PrivateEndpointConnectionProxiesGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxiesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies",
    }),
  );
export type PrivateEndpointConnectionProxiesListInput =
  typeof PrivateEndpointConnectionProxiesListInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionProxiesListOutput =
  typeof PrivateEndpointConnectionProxiesListOutput.Type;

// The operation
/**
 * Gets the all private endpoint connections proxies.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 */
export const PrivateEndpointConnectionProxiesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesListInput,
    outputSchema: PrivateEndpointConnectionProxiesListOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionProxiesValidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnectionProxies/{privateEndpointConnectionProxyName}/validate",
    }),
  );
export type PrivateEndpointConnectionProxiesValidateInput =
  typeof PrivateEndpointConnectionProxiesValidateInput.Type;

// Output Schema
export const PrivateEndpointConnectionProxiesValidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionProxiesValidateOutput =
  typeof PrivateEndpointConnectionProxiesValidateOutput.Type;

// The operation
/**
 * Returns remote private endpoint connection information after validation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param privateEndpointConnectionProxyName - The private endpoint connection proxy name.
 */
export const PrivateEndpointConnectionProxiesValidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionProxiesValidateInput,
    outputSchema: PrivateEndpointConnectionProxiesValidateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes the private endpoint connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param privateEndpointConnectionName - The private endpoint connection name.
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
    vaultName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Gets the private endpoint connection details.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param privateEndpointConnectionName - The private endpoint connection name.
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
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnections",
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
 * Gets the all private endpoint connections configured on the vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
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
    vaultName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Updated the private endpoint connection status (Approval/Rejected). This gets invoked by resource admin.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param privateEndpointConnectionName - The private endpoint connection name.
 */
export const PrivateEndpointConnectionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsUpdateInput,
    outputSchema: PrivateEndpointConnectionsUpdateOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    privateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateLinkResources/{privateLinkResourceName}",
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
 * Gets the details of site recovery private link resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param privateLinkResourceName - The private link name.
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
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/privateLinkResources",
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
 * Gets the list of private link resources.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 */
export const PrivateLinkResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesListInput,
    outputSchema: PrivateLinkResourcesListOutput,
  }),
);
// Input Schema
export const ProtectedItemCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}",
    }),
  );
export type ProtectedItemCreateInput = typeof ProtectedItemCreateInput.Type;

// Output Schema
export const ProtectedItemCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProtectedItemCreateOutput = typeof ProtectedItemCreateOutput.Type;

// The operation
/**
 * Creates the protected item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param protectedItemName - The protected item name.
 */
export const ProtectedItemCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProtectedItemCreateInput,
  outputSchema: ProtectedItemCreateOutput,
}));
// Input Schema
export const ProtectedItemDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    forceDelete: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}",
    }),
  );
export type ProtectedItemDeleteInput = typeof ProtectedItemDeleteInput.Type;

// Output Schema
export const ProtectedItemDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProtectedItemDeleteOutput = typeof ProtectedItemDeleteOutput.Type;

// The operation
/**
 * Removes the protected item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param forceDelete - A flag indicating whether to do force delete or not.
 * @param vaultName - The vault name.
 * @param protectedItemName - The protected item name.
 */
export const ProtectedItemDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProtectedItemDeleteInput,
  outputSchema: ProtectedItemDeleteOutput,
}));
// Input Schema
export const ProtectedItemGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  protectedItemName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}",
  }),
);
export type ProtectedItemGetInput = typeof ProtectedItemGetInput.Type;

// Output Schema
export const ProtectedItemGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ProtectedItemGetOutput = typeof ProtectedItemGetOutput.Type;

// The operation
/**
 * Gets the details of the protected item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param protectedItemName - The protected item name.
 */
export const ProtectedItemGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProtectedItemGetInput,
  outputSchema: ProtectedItemGetOutput,
}));
// Input Schema
export const ProtectedItemListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    odataOptions: Schema.optional(Schema.String),
    continuationToken: Schema.optional(Schema.String),
    pageSize: Schema.optional(Schema.Number),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems",
  }),
);
export type ProtectedItemListInput = typeof ProtectedItemListInput.Type;

// Output Schema
export const ProtectedItemListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ProtectedItemListOutput = typeof ProtectedItemListOutput.Type;

// The operation
/**
 * Gets the list of protected items in the given vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param odataOptions - OData options.
 * @param continuationToken - Continuation token.
 * @param pageSize - Page size.
 * @param vaultName - The vault name.
 */
export const ProtectedItemList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProtectedItemListInput,
  outputSchema: ProtectedItemListOutput,
}));
// Input Schema
export const ProtectedItemPlannedFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}/plannedFailover",
    }),
  );
export type ProtectedItemPlannedFailoverInput =
  typeof ProtectedItemPlannedFailoverInput.Type;

// Output Schema
export const ProtectedItemPlannedFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      customProperties: Schema.Struct({
        instanceType: Schema.String,
      }),
    }),
  });
export type ProtectedItemPlannedFailoverOutput =
  typeof ProtectedItemPlannedFailoverOutput.Type;

// The operation
/**
 * Performs the planned failover on the protected item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param protectedItemName - The protected item name.
 */
export const ProtectedItemPlannedFailover =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProtectedItemPlannedFailoverInput,
    outputSchema: ProtectedItemPlannedFailoverOutput,
  }));
// Input Schema
export const ProtectedItemUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}",
    }),
  );
export type ProtectedItemUpdateInput = typeof ProtectedItemUpdateInput.Type;

// Output Schema
export const ProtectedItemUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProtectedItemUpdateOutput = typeof ProtectedItemUpdateOutput.Type;

// The operation
/**
 * Performs update on the protected item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param protectedItemName - The protected item name.
 */
export const ProtectedItemUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProtectedItemUpdateInput,
  outputSchema: ProtectedItemUpdateOutput,
}));
// Input Schema
export const RecoveryPointGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  protectedItemName: Schema.String.pipe(T.PathParam()),
  recoveryPointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointName}",
  }),
);
export type RecoveryPointGetInput = typeof RecoveryPointGetInput.Type;

// Output Schema
export const RecoveryPointGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type RecoveryPointGetOutput = typeof RecoveryPointGetOutput.Type;

// The operation
/**
 * Gets the details of the recovery point of a protected item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param protectedItemName - The protected item name.
 * @param recoveryPointName - The recovery point name.
 */
export const RecoveryPointGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecoveryPointGetInput,
  outputSchema: RecoveryPointGetOutput,
}));
// Input Schema
export const RecoveryPointListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/protectedItems/{protectedItemName}/recoveryPoints",
  }),
);
export type RecoveryPointListInput = typeof RecoveryPointListInput.Type;

// Output Schema
export const RecoveryPointListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RecoveryPointListOutput = typeof RecoveryPointListOutput.Type;

// The operation
/**
 * Gets the list of recovery points of the given protected item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param protectedItemName - The protected item name.
 */
export const RecoveryPointList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecoveryPointListInput,
  outputSchema: RecoveryPointListOutput,
}));
// Input Schema
export const ReplicationExtensionCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    replicationExtensionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationExtensions/{replicationExtensionName}",
    }),
  );
export type ReplicationExtensionCreateInput =
  typeof ReplicationExtensionCreateInput.Type;

// Output Schema
export const ReplicationExtensionCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReplicationExtensionCreateOutput =
  typeof ReplicationExtensionCreateOutput.Type;

// The operation
/**
 * Creates the replication extension in the given vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param replicationExtensionName - The replication extension name.
 */
export const ReplicationExtensionCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicationExtensionCreateInput,
    outputSchema: ReplicationExtensionCreateOutput,
  }),
);
// Input Schema
export const ReplicationExtensionDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    replicationExtensionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationExtensions/{replicationExtensionName}",
    }),
  );
export type ReplicationExtensionDeleteInput =
  typeof ReplicationExtensionDeleteInput.Type;

// Output Schema
export const ReplicationExtensionDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReplicationExtensionDeleteOutput =
  typeof ReplicationExtensionDeleteOutput.Type;

// The operation
/**
 * Deletes the replication extension in the given vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param replicationExtensionName - The replication extension name.
 */
export const ReplicationExtensionDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicationExtensionDeleteInput,
    outputSchema: ReplicationExtensionDeleteOutput,
  }),
);
// Input Schema
export const ReplicationExtensionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    replicationExtensionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationExtensions/{replicationExtensionName}",
    }),
  );
export type ReplicationExtensionGetInput =
  typeof ReplicationExtensionGetInput.Type;

// Output Schema
export const ReplicationExtensionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReplicationExtensionGetOutput =
  typeof ReplicationExtensionGetOutput.Type;

// The operation
/**
 * Gets the details of the replication extension.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 * @param replicationExtensionName - The replication extension name.
 */
export const ReplicationExtensionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicationExtensionGetInput,
    outputSchema: ReplicationExtensionGetOutput,
  }),
);
// Input Schema
export const ReplicationExtensionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}/replicationExtensions",
    }),
  );
export type ReplicationExtensionListInput =
  typeof ReplicationExtensionListInput.Type;

// Output Schema
export const ReplicationExtensionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ReplicationExtensionListOutput =
  typeof ReplicationExtensionListOutput.Type;

// The operation
/**
 * Gets the list of replication extensions in the given vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 */
export const ReplicationExtensionList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicationExtensionListInput,
    outputSchema: ReplicationExtensionListOutput,
  }),
);
// Input Schema
export const VaultCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}",
  }),
);
export type VaultCreateInput = typeof VaultCreateInput.Type;

// Output Schema
export const VaultCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type VaultCreateOutput = typeof VaultCreateOutput.Type;

// The operation
/**
 * Creates the vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 */
export const VaultCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VaultCreateInput,
  outputSchema: VaultCreateOutput,
}));
// Input Schema
export const VaultDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}",
  }),
);
export type VaultDeleteInput = typeof VaultDeleteInput.Type;

// Output Schema
export const VaultDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VaultDeleteOutput = typeof VaultDeleteOutput.Type;

// The operation
/**
 * Removes the vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 */
export const VaultDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VaultDeleteInput,
  outputSchema: VaultDeleteOutput,
}));
// Input Schema
export const VaultGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}",
  }),
);
export type VaultGetInput = typeof VaultGetInput.Type;

// Output Schema
export const VaultGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type VaultGetOutput = typeof VaultGetOutput.Type;

// The operation
/**
 * Gets the details of the vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 */
export const VaultGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VaultGetInput,
  outputSchema: VaultGetOutput,
}));
// Input Schema
export const VaultListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  continuationToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults",
  }),
);
export type VaultListInput = typeof VaultListInput.Type;

// Output Schema
export const VaultListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type VaultListOutput = typeof VaultListOutput.Type;

// The operation
/**
 * Gets the list of vaults in the given subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param continuationToken - Continuation token from the previous call.
 */
export const VaultList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VaultListInput,
  outputSchema: VaultListOutput,
}));
// Input Schema
export const VaultListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataReplication/replicationVaults",
    }),
  );
export type VaultListBySubscriptionInput =
  typeof VaultListBySubscriptionInput.Type;

// Output Schema
export const VaultListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VaultListBySubscriptionOutput =
  typeof VaultListBySubscriptionOutput.Type;

// The operation
/**
 * Gets the list of vaults in the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const VaultListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VaultListBySubscriptionInput,
    outputSchema: VaultListBySubscriptionOutput,
  }),
);
// Input Schema
export const VaultUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/replicationVaults/{vaultName}",
  }),
);
export type VaultUpdateInput = typeof VaultUpdateInput.Type;

// Output Schema
export const VaultUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type VaultUpdateOutput = typeof VaultUpdateOutput.Type;

// The operation
/**
 * Performs update on the vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The vault name.
 */
export const VaultUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VaultUpdateInput,
  outputSchema: VaultUpdateOutput,
}));
