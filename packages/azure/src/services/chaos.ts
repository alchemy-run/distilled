/**
 * Azure Chaos API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CapabilitiesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourceType: Schema.String.pipe(T.PathParam()),
    parentResourceName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    capabilityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}/capabilities/{capabilityName}",
    }),
  );
export type CapabilitiesCreateOrUpdateInput =
  typeof CapabilitiesCreateOrUpdateInput.Type;

// Output Schema
export const CapabilitiesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CapabilitiesCreateOrUpdateOutput =
  typeof CapabilitiesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Capability resource that extends a Target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param parentProviderNamespace - The parent resource provider namespace.
 * @param parentResourceType - The parent resource type.
 * @param parentResourceName - The parent resource name.
 * @param targetName - String that represents a Target resource name.
 * @param capabilityName - String that represents a Capability resource name.
 */
export const CapabilitiesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CapabilitiesCreateOrUpdateInput,
    outputSchema: CapabilitiesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CapabilitiesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourceType: Schema.String.pipe(T.PathParam()),
    parentResourceName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    capabilityName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}/capabilities/{capabilityName}",
    }),
  );
export type CapabilitiesDeleteInput = typeof CapabilitiesDeleteInput.Type;

// Output Schema
export const CapabilitiesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CapabilitiesDeleteOutput = typeof CapabilitiesDeleteOutput.Type;

// The operation
/**
 * Delete a Capability that extends a Target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param parentProviderNamespace - The parent resource provider namespace.
 * @param parentResourceType - The parent resource type.
 * @param parentResourceName - The parent resource name.
 * @param targetName - String that represents a Target resource name.
 * @param capabilityName - String that represents a Capability resource name.
 */
export const CapabilitiesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapabilitiesDeleteInput,
  outputSchema: CapabilitiesDeleteOutput,
}));
// Input Schema
export const CapabilitiesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  parentProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourceType: Schema.String.pipe(T.PathParam()),
  parentResourceName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  capabilityName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}/capabilities/{capabilityName}",
  }),
);
export type CapabilitiesGetInput = typeof CapabilitiesGetInput.Type;

// Output Schema
export const CapabilitiesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type CapabilitiesGetOutput = typeof CapabilitiesGetOutput.Type;

// The operation
/**
 * Get a Capability resource that extends a Target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param parentProviderNamespace - The parent resource provider namespace.
 * @param parentResourceType - The parent resource type.
 * @param parentResourceName - The parent resource name.
 * @param targetName - String that represents a Target resource name.
 * @param capabilityName - String that represents a Capability resource name.
 */
export const CapabilitiesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapabilitiesGetInput,
  outputSchema: CapabilitiesGetOutput,
}));
// Input Schema
export const CapabilitiesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  parentProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourceType: Schema.String.pipe(T.PathParam()),
  parentResourceName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  continuationToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}/capabilities",
  }),
);
export type CapabilitiesListInput = typeof CapabilitiesListInput.Type;

// Output Schema
export const CapabilitiesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type CapabilitiesListOutput = typeof CapabilitiesListOutput.Type;

// The operation
/**
 * Get a list of Capability resources that extend a Target resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param parentProviderNamespace - The parent resource provider namespace.
 * @param parentResourceType - The parent resource type.
 * @param parentResourceName - The parent resource name.
 * @param continuationToken - String that sets the continuation token.
 * @param targetName - String that represents a Target resource name.
 */
export const CapabilitiesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapabilitiesListInput,
  outputSchema: CapabilitiesListOutput,
}));
// Input Schema
export const CapabilityTypesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    targetTypeName: Schema.String.pipe(T.PathParam()),
    capabilityTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/targetTypes/{targetTypeName}/capabilityTypes/{capabilityTypeName}",
    }),
  );
export type CapabilityTypesGetInput = typeof CapabilityTypesGetInput.Type;

// Output Schema
export const CapabilityTypesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CapabilityTypesGetOutput = typeof CapabilityTypesGetOutput.Type;

// The operation
/**
 * Get a Capability Type resource for given Target Type and location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param targetTypeName - String that represents a Target Type resource name.
 * @param capabilityTypeName - String that represents a Capability Type resource name.
 */
export const CapabilityTypesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapabilityTypesGetInput,
  outputSchema: CapabilityTypesGetOutput,
}));
// Input Schema
export const CapabilityTypesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    targetTypeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    continuationToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/targetTypes/{targetTypeName}/capabilityTypes",
    }),
  );
export type CapabilityTypesListInput = typeof CapabilityTypesListInput.Type;

// Output Schema
export const CapabilityTypesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CapabilityTypesListOutput = typeof CapabilityTypesListOutput.Type;

// The operation
/**
 * Get a list of Capability Type resources for given Target Type and location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param targetTypeName - String that represents a Target Type resource name.
 * @param continuationToken - String that sets the continuation token.
 */
export const CapabilityTypesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CapabilityTypesListInput,
  outputSchema: CapabilityTypesListOutput,
}));
// Input Schema
export const ExperimentsCancelInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/cancel",
  }),
);
export type ExperimentsCancelInput = typeof ExperimentsCancelInput.Type;

// Output Schema
export const ExperimentsCancelOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExperimentsCancelOutput = typeof ExperimentsCancelOutput.Type;

// The operation
/**
 * Cancel a running Experiment resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param experimentName - String that represents a Experiment resource name.
 */
export const ExperimentsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsCancelInput,
  outputSchema: ExperimentsCancelOutput,
}));
// Input Schema
export const ExperimentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}",
    }),
  );
export type ExperimentsCreateOrUpdateInput =
  typeof ExperimentsCreateOrUpdateInput.Type;

// Output Schema
export const ExperimentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ExperimentsCreateOrUpdateOutput =
  typeof ExperimentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Experiment resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param experimentName - String that represents a Experiment resource name.
 */
export const ExperimentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExperimentsCreateOrUpdateInput,
    outputSchema: ExperimentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ExperimentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}",
  }),
);
export type ExperimentsDeleteInput = typeof ExperimentsDeleteInput.Type;

// Output Schema
export const ExperimentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExperimentsDeleteOutput = typeof ExperimentsDeleteOutput.Type;

// The operation
/**
 * Delete a Experiment resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param experimentName - String that represents a Experiment resource name.
 */
export const ExperimentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsDeleteInput,
  outputSchema: ExperimentsDeleteOutput,
}));
// Input Schema
export const ExperimentsExecutionDetailsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    executionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/executions/{executionId}/getExecutionDetails",
    }),
  );
export type ExperimentsExecutionDetailsInput =
  typeof ExperimentsExecutionDetailsInput.Type;

// Output Schema
export const ExperimentsExecutionDetailsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    type: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        status: Schema.optional(Schema.String),
        startedAt: Schema.optional(Schema.String),
        stoppedAt: Schema.optional(Schema.String),
        failureReason: Schema.optional(Schema.String),
        lastActionAt: Schema.optional(Schema.String),
        runInformation: Schema.optional(
          Schema.Struct({
            steps: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  stepName: Schema.optional(Schema.String),
                  stepId: Schema.optional(Schema.String),
                  status: Schema.optional(Schema.String),
                  branches: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        branchName: Schema.optional(Schema.String),
                        branchId: Schema.optional(Schema.String),
                        status: Schema.optional(Schema.String),
                        actions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              actionName: Schema.optional(Schema.String),
                              actionId: Schema.optional(Schema.String),
                              status: Schema.optional(Schema.String),
                              startTime: Schema.optional(Schema.String),
                              endTime: Schema.optional(Schema.String),
                              targets: Schema.optional(
                                Schema.Array(
                                  Schema.Struct({
                                    status: Schema.optional(Schema.String),
                                    target: Schema.optional(Schema.String),
                                    targetFailedTime: Schema.optional(
                                      Schema.String,
                                    ),
                                    targetCompletedTime: Schema.optional(
                                      Schema.String,
                                    ),
                                    error: Schema.optional(
                                      Schema.Struct({
                                        code: Schema.optional(Schema.String),
                                        message: Schema.optional(Schema.String),
                                      }),
                                    ),
                                  }),
                                ),
                              ),
                            }),
                          ),
                        ),
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
  });
export type ExperimentsExecutionDetailsOutput =
  typeof ExperimentsExecutionDetailsOutput.Type;

// The operation
/**
 * Execution details of an experiment resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param experimentName - String that represents a Experiment resource name.
 * @param executionId - GUID that represents a Experiment execution detail.
 */
export const ExperimentsExecutionDetails = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExperimentsExecutionDetailsInput,
    outputSchema: ExperimentsExecutionDetailsOutput,
  }),
);
// Input Schema
export const ExperimentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  experimentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}",
  }),
);
export type ExperimentsGetInput = typeof ExperimentsGetInput.Type;

// Output Schema
export const ExperimentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ExperimentsGetOutput = typeof ExperimentsGetOutput.Type;

// The operation
/**
 * Get a Experiment resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param experimentName - String that represents a Experiment resource name.
 */
export const ExperimentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsGetInput,
  outputSchema: ExperimentsGetOutput,
}));
// Input Schema
export const ExperimentsGetExecutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    executionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/executions/{executionId}",
    }),
  );
export type ExperimentsGetExecutionInput =
  typeof ExperimentsGetExecutionInput.Type;

// Output Schema
export const ExperimentsGetExecutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExperimentsGetExecutionOutput =
  typeof ExperimentsGetExecutionOutput.Type;

// The operation
/**
 * Get an execution of an Experiment resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param experimentName - String that represents a Experiment resource name.
 * @param executionId - GUID that represents a Experiment execution detail.
 */
export const ExperimentsGetExecution = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExperimentsGetExecutionInput,
    outputSchema: ExperimentsGetExecutionOutput,
  }),
);
// Input Schema
export const ExperimentsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  running: Schema.optional(Schema.Boolean),
  continuationToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments",
  }),
);
export type ExperimentsListInput = typeof ExperimentsListInput.Type;

// Output Schema
export const ExperimentsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ExperimentsListOutput = typeof ExperimentsListOutput.Type;

// The operation
/**
 * Get a list of Experiment resources in a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param running - Optional value that indicates whether to filter results based on if the Experiment is currently running. If null, then the results will not be filtered.
 * @param continuationToken - String that sets the continuation token.
 */
export const ExperimentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsListInput,
  outputSchema: ExperimentsListOutput,
}));
// Input Schema
export const ExperimentsListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    running: Schema.optional(Schema.Boolean),
    continuationToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/experiments",
    }),
  );
export type ExperimentsListAllInput = typeof ExperimentsListAllInput.Type;

// Output Schema
export const ExperimentsListAllOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ExperimentsListAllOutput = typeof ExperimentsListAllOutput.Type;

// The operation
/**
 * Get a list of Experiment resources in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param running - Optional value that indicates whether to filter results based on if the Experiment is currently running. If null, then the results will not be filtered.
 * @param continuationToken - String that sets the continuation token.
 */
export const ExperimentsListAll = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsListAllInput,
  outputSchema: ExperimentsListAllOutput,
}));
// Input Schema
export const ExperimentsListAllExecutionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/executions",
    }),
  );
export type ExperimentsListAllExecutionsInput =
  typeof ExperimentsListAllExecutionsInput.Type;

// Output Schema
export const ExperimentsListAllExecutionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ExperimentsListAllExecutionsOutput =
  typeof ExperimentsListAllExecutionsOutput.Type;

// The operation
/**
 * Get a list of executions of an Experiment resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param experimentName - String that represents a Experiment resource name.
 */
export const ExperimentsListAllExecutions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExperimentsListAllExecutionsInput,
    outputSchema: ExperimentsListAllExecutionsOutput,
  }));
// Input Schema
export const ExperimentsStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  experimentName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}/start",
  }),
);
export type ExperimentsStartInput = typeof ExperimentsStartInput.Type;

// Output Schema
export const ExperimentsStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExperimentsStartOutput = typeof ExperimentsStartOutput.Type;

// The operation
/**
 * Start a Experiment resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param experimentName - String that represents a Experiment resource name.
 */
export const ExperimentsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsStartInput,
  outputSchema: ExperimentsStartOutput,
}));
// Input Schema
export const ExperimentsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    experimentName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/experiments/{experimentName}",
  }),
);
export type ExperimentsUpdateInput = typeof ExperimentsUpdateInput.Type;

// Output Schema
export const ExperimentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ExperimentsUpdateOutput = typeof ExperimentsUpdateOutput.Type;

// The operation
/**
 * The operation to update an experiment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param experimentName - String that represents a Experiment resource name.
 */
export const ExperimentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExperimentsUpdateInput,
  outputSchema: ExperimentsUpdateOutput,
}));
// Input Schema
export const TargetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    parentProviderNamespace: Schema.String.pipe(T.PathParam()),
    parentResourceType: Schema.String.pipe(T.PathParam()),
    parentResourceName: Schema.String.pipe(T.PathParam()),
    targetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}",
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
 * Create or update a Target resource that extends a tracked regional resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param parentProviderNamespace - The parent resource provider namespace.
 * @param parentResourceType - The parent resource type.
 * @param parentResourceName - The parent resource name.
 * @param targetName - String that represents a Target resource name.
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
  parentProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourceType: Schema.String.pipe(T.PathParam()),
  parentResourceName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}",
  }),
);
export type TargetsDeleteInput = typeof TargetsDeleteInput.Type;

// Output Schema
export const TargetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TargetsDeleteOutput = typeof TargetsDeleteOutput.Type;

// The operation
/**
 * Delete a Target resource that extends a tracked regional resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param parentProviderNamespace - The parent resource provider namespace.
 * @param parentResourceType - The parent resource type.
 * @param parentResourceName - The parent resource name.
 * @param targetName - String that represents a Target resource name.
 */
export const TargetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetsDeleteInput,
  outputSchema: TargetsDeleteOutput,
}));
// Input Schema
export const TargetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  parentProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourceType: Schema.String.pipe(T.PathParam()),
  parentResourceName: Schema.String.pipe(T.PathParam()),
  targetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets/{targetName}",
  }),
);
export type TargetsGetInput = typeof TargetsGetInput.Type;

// Output Schema
export const TargetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TargetsGetOutput = typeof TargetsGetOutput.Type;

// The operation
/**
 * Get a Target resource that extends a tracked regional resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param parentProviderNamespace - The parent resource provider namespace.
 * @param parentResourceType - The parent resource type.
 * @param parentResourceName - The parent resource name.
 * @param targetName - String that represents a Target resource name.
 */
export const TargetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetsGetInput,
  outputSchema: TargetsGetOutput,
}));
// Input Schema
export const TargetsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  parentProviderNamespace: Schema.String.pipe(T.PathParam()),
  parentResourceType: Schema.String.pipe(T.PathParam()),
  parentResourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  continuationToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{parentProviderNamespace}/{parentResourceType}/{parentResourceName}/providers/Microsoft.Chaos/targets",
  }),
);
export type TargetsListInput = typeof TargetsListInput.Type;

// Output Schema
export const TargetsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type TargetsListOutput = typeof TargetsListOutput.Type;

// The operation
/**
 * Get a list of Target resources that extend a tracked regional resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param parentProviderNamespace - The parent resource provider namespace.
 * @param parentResourceType - The parent resource type.
 * @param parentResourceName - The parent resource name.
 * @param continuationToken - String that sets the continuation token.
 */
export const TargetsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetsListInput,
  outputSchema: TargetsListOutput,
}));
// Input Schema
export const TargetTypesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  targetTypeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/targetTypes/{targetTypeName}",
  }),
);
export type TargetTypesGetInput = typeof TargetTypesGetInput.Type;

// Output Schema
export const TargetTypesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type TargetTypesGetOutput = typeof TargetTypesGetOutput.Type;

// The operation
/**
 * Get a Target Type resources for given location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param targetTypeName - String that represents a Target Type resource name.
 */
export const TargetTypesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetTypesGetInput,
  outputSchema: TargetTypesGetOutput,
}));
// Input Schema
export const TargetTypesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  continuationToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/targetTypes",
  }),
);
export type TargetTypesListInput = typeof TargetTypesListInput.Type;

// Output Schema
export const TargetTypesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type TargetTypesListOutput = typeof TargetTypesListOutput.Type;

// The operation
/**
 * Get a list of Target Type resources for given location.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param continuationToken - String that sets the continuation token.
 */
export const TargetTypesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TargetTypesListInput,
  outputSchema: TargetTypesListOutput,
}));
