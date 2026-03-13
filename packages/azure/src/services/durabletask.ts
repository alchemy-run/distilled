/**
 * Azure Durabletask API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const RetentionPoliciesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schedulerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies/default",
    }),
  );
export type RetentionPoliciesCreateOrReplaceInput =
  typeof RetentionPoliciesCreateOrReplaceInput.Type;

// Output Schema
export const RetentionPoliciesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RetentionPoliciesCreateOrReplaceOutput =
  typeof RetentionPoliciesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create or Update a Retention Policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const RetentionPoliciesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RetentionPoliciesCreateOrReplaceInput,
    outputSchema: RetentionPoliciesCreateOrReplaceOutput,
  }));
// Input Schema
export const RetentionPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schedulerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies/default",
    }),
  );
export type RetentionPoliciesDeleteInput =
  typeof RetentionPoliciesDeleteInput.Type;

// Output Schema
export const RetentionPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RetentionPoliciesDeleteOutput =
  typeof RetentionPoliciesDeleteOutput.Type;

// The operation
/**
 * Delete a Retention Policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const RetentionPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RetentionPoliciesDeleteInput,
    outputSchema: RetentionPoliciesDeleteOutput,
  }),
);
// Input Schema
export const RetentionPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schedulerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies/default",
    }),
  );
export type RetentionPoliciesGetInput = typeof RetentionPoliciesGetInput.Type;

// Output Schema
export const RetentionPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RetentionPoliciesGetOutput = typeof RetentionPoliciesGetOutput.Type;

// The operation
/**
 * Get a Retention Policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const RetentionPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RetentionPoliciesGetInput,
    outputSchema: RetentionPoliciesGetOutput,
  }),
);
// Input Schema
export const RetentionPoliciesListBySchedulerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schedulerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies",
    }),
  );
export type RetentionPoliciesListBySchedulerInput =
  typeof RetentionPoliciesListBySchedulerInput.Type;

// Output Schema
export const RetentionPoliciesListBySchedulerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RetentionPoliciesListBySchedulerOutput =
  typeof RetentionPoliciesListBySchedulerOutput.Type;

// The operation
/**
 * List Retention Policies
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const RetentionPoliciesListByScheduler =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RetentionPoliciesListBySchedulerInput,
    outputSchema: RetentionPoliciesListBySchedulerOutput,
  }));
// Input Schema
export const RetentionPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schedulerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies/default",
    }),
  );
export type RetentionPoliciesUpdateInput =
  typeof RetentionPoliciesUpdateInput.Type;

// Output Schema
export const RetentionPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RetentionPoliciesUpdateOutput =
  typeof RetentionPoliciesUpdateOutput.Type;

// The operation
/**
 * Update a Retention Policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const RetentionPoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RetentionPoliciesUpdateInput,
    outputSchema: RetentionPoliciesUpdateOutput,
  }),
);
// Input Schema
export const SchedulersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schedulerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}",
    }),
  );
export type SchedulersCreateOrUpdateInput =
  typeof SchedulersCreateOrUpdateInput.Type;

// Output Schema
export const SchedulersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SchedulersCreateOrUpdateOutput =
  typeof SchedulersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Scheduler
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const SchedulersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchedulersCreateOrUpdateInput,
    outputSchema: SchedulersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SchedulersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schedulerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}",
  }),
);
export type SchedulersDeleteInput = typeof SchedulersDeleteInput.Type;

// Output Schema
export const SchedulersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchedulersDeleteOutput = typeof SchedulersDeleteOutput.Type;

// The operation
/**
 * Delete a Scheduler
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const SchedulersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulersDeleteInput,
  outputSchema: SchedulersDeleteOutput,
}));
// Input Schema
export const SchedulersDeletePrivateEndpointConnectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schedulerName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type SchedulersDeletePrivateEndpointConnectionInput =
  typeof SchedulersDeletePrivateEndpointConnectionInput.Type;

// Output Schema
export const SchedulersDeletePrivateEndpointConnectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchedulersDeletePrivateEndpointConnectionOutput =
  typeof SchedulersDeletePrivateEndpointConnectionOutput.Type;

// The operation
/**
 * Delete a private endpoint connection for the durable task scheduler
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 */
export const SchedulersDeletePrivateEndpointConnection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchedulersDeletePrivateEndpointConnectionInput,
    outputSchema: SchedulersDeletePrivateEndpointConnectionOutput,
  }));
// Input Schema
export const SchedulersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schedulerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}",
  }),
);
export type SchedulersGetInput = typeof SchedulersGetInput.Type;

// Output Schema
export const SchedulersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SchedulersGetOutput = typeof SchedulersGetOutput.Type;

// The operation
/**
 * Get a Scheduler
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const SchedulersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulersGetInput,
  outputSchema: SchedulersGetOutput,
}));
// Input Schema
export const SchedulersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers",
    }),
  );
export type SchedulersListByResourceGroupInput =
  typeof SchedulersListByResourceGroupInput.Type;

// Output Schema
export const SchedulersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SchedulersListByResourceGroupOutput =
  typeof SchedulersListByResourceGroupOutput.Type;

// The operation
/**
 * List Schedulers by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SchedulersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchedulersListByResourceGroupInput,
    outputSchema: SchedulersListByResourceGroupOutput,
  }));
// Input Schema
export const SchedulersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DurableTask/schedulers",
    }),
  );
export type SchedulersListBySubscriptionInput =
  typeof SchedulersListBySubscriptionInput.Type;

// Output Schema
export const SchedulersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SchedulersListBySubscriptionOutput =
  typeof SchedulersListBySubscriptionOutput.Type;

// The operation
/**
 * List Schedulers by subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SchedulersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchedulersListBySubscriptionInput,
    outputSchema: SchedulersListBySubscriptionOutput,
  }));
// Input Schema
export const SchedulersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schedulerName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}",
  }),
);
export type SchedulersUpdateInput = typeof SchedulersUpdateInput.Type;

// Output Schema
export const SchedulersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type SchedulersUpdateOutput = typeof SchedulersUpdateOutput.Type;

// The operation
/**
 * Update a Scheduler
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const SchedulersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchedulersUpdateInput,
  outputSchema: SchedulersUpdateOutput,
}));
// Input Schema
export const TaskHubsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schedulerName: Schema.String.pipe(T.PathParam()),
    taskHubName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}",
    }),
  );
export type TaskHubsCreateOrUpdateInput =
  typeof TaskHubsCreateOrUpdateInput.Type;

// Output Schema
export const TaskHubsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TaskHubsCreateOrUpdateOutput =
  typeof TaskHubsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a Task Hub
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 * @param taskHubName - The name of the TaskHub
 */
export const TaskHubsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TaskHubsCreateOrUpdateInput,
    outputSchema: TaskHubsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TaskHubsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schedulerName: Schema.String.pipe(T.PathParam()),
  taskHubName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}",
  }),
);
export type TaskHubsDeleteInput = typeof TaskHubsDeleteInput.Type;

// Output Schema
export const TaskHubsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TaskHubsDeleteOutput = typeof TaskHubsDeleteOutput.Type;

// The operation
/**
 * Delete a Task Hub
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 * @param taskHubName - The name of the TaskHub
 */
export const TaskHubsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TaskHubsDeleteInput,
  outputSchema: TaskHubsDeleteOutput,
}));
// Input Schema
export const TaskHubsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schedulerName: Schema.String.pipe(T.PathParam()),
  taskHubName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs/{taskHubName}",
  }),
);
export type TaskHubsGetInput = typeof TaskHubsGetInput.Type;

// Output Schema
export const TaskHubsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TaskHubsGetOutput = typeof TaskHubsGetOutput.Type;

// The operation
/**
 * Get a Task Hub
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 * @param taskHubName - The name of the TaskHub
 */
export const TaskHubsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TaskHubsGetInput,
  outputSchema: TaskHubsGetOutput,
}));
// Input Schema
export const TaskHubsListBySchedulerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schedulerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/taskHubs",
    }),
  );
export type TaskHubsListBySchedulerInput =
  typeof TaskHubsListBySchedulerInput.Type;

// Output Schema
export const TaskHubsListBySchedulerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TaskHubsListBySchedulerOutput =
  typeof TaskHubsListBySchedulerOutput.Type;

// The operation
/**
 * List Task Hubs
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schedulerName - The name of the Scheduler
 */
export const TaskHubsListByScheduler = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TaskHubsListBySchedulerInput,
    outputSchema: TaskHubsListBySchedulerOutput,
  }),
);
