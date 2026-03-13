/**
 * Azure Databasewatcher API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AlertRuleResourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    alertRuleResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources/{alertRuleResourceName}",
    }),
  );
export type AlertRuleResourcesCreateOrUpdateInput =
  typeof AlertRuleResourcesCreateOrUpdateInput.Type;

// Output Schema
export const AlertRuleResourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AlertRuleResourcesCreateOrUpdateOutput =
  typeof AlertRuleResourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a AlertRuleResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param alertRuleResourceName - The alert rule proxy resource name.
 */
export const AlertRuleResourcesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AlertRuleResourcesCreateOrUpdateInput,
    outputSchema: AlertRuleResourcesCreateOrUpdateOutput,
  }));
// Input Schema
export const AlertRuleResourcesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    alertRuleResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources/{alertRuleResourceName}",
    }),
  );
export type AlertRuleResourcesDeleteInput =
  typeof AlertRuleResourcesDeleteInput.Type;

// Output Schema
export const AlertRuleResourcesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AlertRuleResourcesDeleteOutput =
  typeof AlertRuleResourcesDeleteOutput.Type;

// The operation
/**
 * Delete a AlertRuleResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param alertRuleResourceName - The alert rule proxy resource name.
 */
export const AlertRuleResourcesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AlertRuleResourcesDeleteInput,
    outputSchema: AlertRuleResourcesDeleteOutput,
  }),
);
// Input Schema
export const AlertRuleResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    alertRuleResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources/{alertRuleResourceName}",
    }),
  );
export type AlertRuleResourcesGetInput = typeof AlertRuleResourcesGetInput.Type;

// Output Schema
export const AlertRuleResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AlertRuleResourcesGetOutput =
  typeof AlertRuleResourcesGetOutput.Type;

// The operation
/**
 * Get a AlertRuleResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param alertRuleResourceName - The alert rule proxy resource name.
 */
export const AlertRuleResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AlertRuleResourcesGetInput,
    outputSchema: AlertRuleResourcesGetOutput,
  }),
);
// Input Schema
export const AlertRuleResourcesListByParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources",
    }),
  );
export type AlertRuleResourcesListByParentInput =
  typeof AlertRuleResourcesListByParentInput.Type;

// Output Schema
export const AlertRuleResourcesListByParentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AlertRuleResourcesListByParentOutput =
  typeof AlertRuleResourcesListByParentOutput.Type;

// The operation
/**
 * List AlertRuleResource resources by Watcher
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const AlertRuleResourcesListByParent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AlertRuleResourcesListByParentInput,
    outputSchema: AlertRuleResourcesListByParentOutput,
  }));
// Input Schema
export const HealthValidationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    healthValidationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations/{healthValidationName}",
    }),
  );
export type HealthValidationsGetInput = typeof HealthValidationsGetInput.Type;

// Output Schema
export const HealthValidationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HealthValidationsGetOutput = typeof HealthValidationsGetOutput.Type;

// The operation
/**
 * Get a HealthValidation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param healthValidationName - The health validation resource name.
 */
export const HealthValidationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HealthValidationsGetInput,
    outputSchema: HealthValidationsGetOutput,
  }),
);
// Input Schema
export const HealthValidationsListByParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations",
    }),
  );
export type HealthValidationsListByParentInput =
  typeof HealthValidationsListByParentInput.Type;

// Output Schema
export const HealthValidationsListByParentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HealthValidationsListByParentOutput =
  typeof HealthValidationsListByParentOutput.Type;

// The operation
/**
 * List HealthValidation resources by Watcher
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const HealthValidationsListByParent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HealthValidationsListByParentInput,
    outputSchema: HealthValidationsListByParentOutput,
  }));
// Input Schema
export const HealthValidationsStartValidationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    healthValidationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations/{healthValidationName}/startValidation",
    }),
  );
export type HealthValidationsStartValidationInput =
  typeof HealthValidationsStartValidationInput.Type;

// Output Schema
export const HealthValidationsStartValidationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HealthValidationsStartValidationOutput =
  typeof HealthValidationsStartValidationOutput.Type;

// The operation
/**
 * Starts health validation for a watcher.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param healthValidationName - The health validation resource name.
 */
export const HealthValidationsStartValidation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HealthValidationsStartValidationInput,
    outputSchema: HealthValidationsStartValidationOutput,
  }));
// Input Schema
export const SharedPrivateLinkResourcesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    sharedPrivateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SharedPrivateLinkResourcesCreateInput =
  typeof SharedPrivateLinkResourcesCreateInput.Type;

// Output Schema
export const SharedPrivateLinkResourcesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SharedPrivateLinkResourcesCreateOutput =
  typeof SharedPrivateLinkResourcesCreateOutput.Type;

// The operation
/**
 * Create a SharedPrivateLinkResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param sharedPrivateLinkResourceName - The Shared Private Link resource name.
 */
export const SharedPrivateLinkResourcesCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharedPrivateLinkResourcesCreateInput,
    outputSchema: SharedPrivateLinkResourcesCreateOutput,
  }));
// Input Schema
export const SharedPrivateLinkResourcesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    sharedPrivateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SharedPrivateLinkResourcesDeleteInput =
  typeof SharedPrivateLinkResourcesDeleteInput.Type;

// Output Schema
export const SharedPrivateLinkResourcesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SharedPrivateLinkResourcesDeleteOutput =
  typeof SharedPrivateLinkResourcesDeleteOutput.Type;

// The operation
/**
 * Delete a SharedPrivateLinkResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param sharedPrivateLinkResourceName - The Shared Private Link resource name.
 */
export const SharedPrivateLinkResourcesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharedPrivateLinkResourcesDeleteInput,
    outputSchema: SharedPrivateLinkResourcesDeleteOutput,
  }));
// Input Schema
export const SharedPrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    sharedPrivateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}",
    }),
  );
export type SharedPrivateLinkResourcesGetInput =
  typeof SharedPrivateLinkResourcesGetInput.Type;

// Output Schema
export const SharedPrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SharedPrivateLinkResourcesGetOutput =
  typeof SharedPrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get a SharedPrivateLinkResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param sharedPrivateLinkResourceName - The Shared Private Link resource name.
 */
export const SharedPrivateLinkResourcesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharedPrivateLinkResourcesGetInput,
    outputSchema: SharedPrivateLinkResourcesGetOutput,
  }));
// Input Schema
export const SharedPrivateLinkResourcesListByWatcherInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/sharedPrivateLinkResources",
    }),
  );
export type SharedPrivateLinkResourcesListByWatcherInput =
  typeof SharedPrivateLinkResourcesListByWatcherInput.Type;

// Output Schema
export const SharedPrivateLinkResourcesListByWatcherOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SharedPrivateLinkResourcesListByWatcherOutput =
  typeof SharedPrivateLinkResourcesListByWatcherOutput.Type;

// The operation
/**
 * List SharedPrivateLinkResource resources by Watcher
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const SharedPrivateLinkResourcesListByWatcher =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SharedPrivateLinkResourcesListByWatcherInput,
    outputSchema: SharedPrivateLinkResourcesListByWatcherOutput,
  }));
// Input Schema
export const TargetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}",
    }),
  );
export type TargetsCreateOrUpdateInput = typeof TargetsCreateOrUpdateInput.Type;

// Output Schema
export const TargetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TargetsCreateOrUpdateOutput =
  typeof TargetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Target
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param targetName - The target resource name.
 */
export const TargetsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TargetsCreateOrUpdateInput,
    outputSchema: TargetsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TargetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}",
  }),
);
export type TargetsDeleteInput = typeof TargetsDeleteInput.Type;

// Output Schema
export const TargetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TargetsDeleteOutput = typeof TargetsDeleteOutput.Type;

// The operation
/**
 * Delete a Target
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param targetName - The target resource name.
 */
export const TargetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetsDeleteInput,
  outputSchema: TargetsDeleteOutput,
}));
// Input Schema
export const TargetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets/{targetName}",
  }),
);
export type TargetsGetInput = typeof TargetsGetInput.Type;

// Output Schema
export const TargetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TargetsGetOutput = typeof TargetsGetOutput.Type;

// The operation
/**
 * Get a Target
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 * @param targetName - The target resource name.
 */
export const TargetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetsGetInput,
  outputSchema: TargetsGetOutput,
}));
// Input Schema
export const TargetsListByWatcherInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/targets",
    }),
  );
export type TargetsListByWatcherInput = typeof TargetsListByWatcherInput.Type;

// Output Schema
export const TargetsListByWatcherOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TargetsListByWatcherOutput = typeof TargetsListByWatcherOutput.Type;

// The operation
/**
 * List Target resources by Watcher
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const TargetsListByWatcher = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TargetsListByWatcherInput,
    outputSchema: TargetsListByWatcherOutput,
  }),
);
// Input Schema
export const WatchersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    watcherName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}",
    }),
  );
export type WatchersCreateOrUpdateInput =
  typeof WatchersCreateOrUpdateInput.Type;

// Output Schema
export const WatchersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WatchersCreateOrUpdateOutput =
  typeof WatchersCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Watcher
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const WatchersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchersCreateOrUpdateInput,
    outputSchema: WatchersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WatchersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}",
  }),
);
export type WatchersDeleteInput = typeof WatchersDeleteInput.Type;

// Output Schema
export const WatchersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WatchersDeleteOutput = typeof WatchersDeleteOutput.Type;

// The operation
/**
 * Delete a Watcher
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const WatchersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchersDeleteInput,
  outputSchema: WatchersDeleteOutput,
}));
// Input Schema
export const WatchersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}",
  }),
);
export type WatchersGetInput = typeof WatchersGetInput.Type;

// Output Schema
export const WatchersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WatchersGetOutput = typeof WatchersGetOutput.Type;

// The operation
/**
 * Get a Watcher
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const WatchersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchersGetInput,
  outputSchema: WatchersGetOutput,
}));
// Input Schema
export const WatchersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers",
    }),
  );
export type WatchersListByResourceGroupInput =
  typeof WatchersListByResourceGroupInput.Type;

// Output Schema
export const WatchersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WatchersListByResourceGroupOutput =
  typeof WatchersListByResourceGroupOutput.Type;

// The operation
/**
 * List Watcher resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WatchersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchersListByResourceGroupInput,
    outputSchema: WatchersListByResourceGroupOutput,
  }),
);
// Input Schema
export const WatchersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DatabaseWatcher/watchers",
    }),
  );
export type WatchersListBySubscriptionInput =
  typeof WatchersListBySubscriptionInput.Type;

// Output Schema
export const WatchersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WatchersListBySubscriptionOutput =
  typeof WatchersListBySubscriptionOutput.Type;

// The operation
/**
 * List Watcher resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const WatchersListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WatchersListBySubscriptionInput,
    outputSchema: WatchersListBySubscriptionOutput,
  }),
);
// Input Schema
export const WatchersStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/start",
  }),
);
export type WatchersStartInput = typeof WatchersStartInput.Type;

// Output Schema
export const WatchersStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WatchersStartOutput = typeof WatchersStartOutput.Type;

// The operation
/**
 * The action to start monitoring all targets configured for a database watcher.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const WatchersStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchersStartInput,
  outputSchema: WatchersStartOutput,
}));
// Input Schema
export const WatchersStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/stop",
  }),
);
export type WatchersStopInput = typeof WatchersStopInput.Type;

// Output Schema
export const WatchersStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WatchersStopOutput = typeof WatchersStopOutput.Type;

// The operation
/**
 * The action to stop monitoring all targets configured for a database watcher.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const WatchersStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchersStopInput,
  outputSchema: WatchersStopOutput,
}));
// Input Schema
export const WatchersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  watcherName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}",
  }),
);
export type WatchersUpdateInput = typeof WatchersUpdateInput.Type;

// Output Schema
export const WatchersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WatchersUpdateOutput = typeof WatchersUpdateOutput.Type;

// The operation
/**
 * Update a Watcher
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param watcherName - The database watcher name.
 */
export const WatchersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WatchersUpdateInput,
  outputSchema: WatchersUpdateOutput,
}));
