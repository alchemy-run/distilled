/**
 * Azure Timeseriesinsights API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccessPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accessPolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/accessPolicies/{accessPolicyName}",
    }),
  );
export type AccessPoliciesCreateOrUpdateInput =
  typeof AccessPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const AccessPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type AccessPoliciesCreateOrUpdateOutput =
  typeof AccessPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an access policy in the specified environment.
 *
 * @param accessPolicyName - Name of the access policy.
 */
export const AccessPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessPoliciesCreateOrUpdateInput,
    outputSchema: AccessPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const AccessPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/accessPolicies/{accessPolicyName}",
    }),
  );
export type AccessPoliciesDeleteInput = typeof AccessPoliciesDeleteInput.Type;

// Output Schema
export const AccessPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccessPoliciesDeleteOutput = typeof AccessPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes the access policy with the specified name in the specified subscription, resource group, and environment
 */
export const AccessPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessPoliciesDeleteInput,
    outputSchema: AccessPoliciesDeleteOutput,
  }),
);
// Input Schema
export const AccessPoliciesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/accessPolicies/{accessPolicyName}",
  }),
);
export type AccessPoliciesGetInput = typeof AccessPoliciesGetInput.Type;

// Output Schema
export const AccessPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type AccessPoliciesGetOutput = typeof AccessPoliciesGetOutput.Type;

// The operation
/**
 * Gets the access policy with the specified name in the specified environment.
 */
export const AccessPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccessPoliciesGetInput,
  outputSchema: AccessPoliciesGetOutput,
}));
// Input Schema
export const AccessPoliciesListByEnvironmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/accessPolicies",
    }),
  );
export type AccessPoliciesListByEnvironmentInput =
  typeof AccessPoliciesListByEnvironmentInput.Type;

// Output Schema
export const AccessPoliciesListByEnvironmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type AccessPoliciesListByEnvironmentOutput =
  typeof AccessPoliciesListByEnvironmentOutput.Type;

// The operation
/**
 * Lists all the available access policies associated with the environment.
 */
export const AccessPoliciesListByEnvironment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessPoliciesListByEnvironmentInput,
    outputSchema: AccessPoliciesListByEnvironmentOutput,
  }));
// Input Schema
export const AccessPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/accessPolicies/{accessPolicyName}",
    }),
  );
export type AccessPoliciesUpdateInput = typeof AccessPoliciesUpdateInput.Type;

// Output Schema
export const AccessPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type AccessPoliciesUpdateOutput = typeof AccessPoliciesUpdateOutput.Type;

// The operation
/**
 * Updates the access policy with the specified name in the specified subscription, resource group, and environment.
 */
export const AccessPoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessPoliciesUpdateInput,
    outputSchema: AccessPoliciesUpdateOutput,
  }),
);
// Input Schema
export const EnvironmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    environmentName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}",
    }),
  );
export type EnvironmentsCreateOrUpdateInput =
  typeof EnvironmentsCreateOrUpdateInput.Type;

// Output Schema
export const EnvironmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type EnvironmentsCreateOrUpdateOutput =
  typeof EnvironmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an environment in the specified subscription and resource group.
 *
 * @param environmentName - Name of the environment
 */
export const EnvironmentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EnvironmentsCreateOrUpdateInput,
    outputSchema: EnvironmentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EnvironmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}",
    }),
  );
export type EnvironmentsDeleteInput = typeof EnvironmentsDeleteInput.Type;

// Output Schema
export const EnvironmentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EnvironmentsDeleteOutput = typeof EnvironmentsDeleteOutput.Type;

// The operation
/**
 * Deletes the environment with the specified name in the specified subscription and resource group.
 */
export const EnvironmentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EnvironmentsDeleteInput,
  outputSchema: EnvironmentsDeleteOutput,
}));
// Input Schema
export const EnvironmentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}",
  }),
);
export type EnvironmentsGetInput = typeof EnvironmentsGetInput.Type;

// Output Schema
export const EnvironmentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type EnvironmentsGetOutput = typeof EnvironmentsGetOutput.Type;

// The operation
/**
 * Gets the environment with the specified name in the specified subscription and resource group.
 */
export const EnvironmentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EnvironmentsGetInput,
  outputSchema: EnvironmentsGetOutput,
}));
// Input Schema
export const EnvironmentsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments",
    }),
  );
export type EnvironmentsListByResourceGroupInput =
  typeof EnvironmentsListByResourceGroupInput.Type;

// Output Schema
export const EnvironmentsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type EnvironmentsListByResourceGroupOutput =
  typeof EnvironmentsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the available environments associated with the subscription and within the specified resource group.
 */
export const EnvironmentsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EnvironmentsListByResourceGroupInput,
    outputSchema: EnvironmentsListByResourceGroupOutput,
  }));
// Input Schema
export const EnvironmentsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.TimeSeriesInsights/environments",
    }),
  );
export type EnvironmentsListBySubscriptionInput =
  typeof EnvironmentsListBySubscriptionInput.Type;

// Output Schema
export const EnvironmentsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type EnvironmentsListBySubscriptionOutput =
  typeof EnvironmentsListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the available environments within a subscription, irrespective of the resource groups.
 */
export const EnvironmentsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EnvironmentsListBySubscriptionInput,
    outputSchema: EnvironmentsListBySubscriptionOutput,
  }));
// Input Schema
export const EnvironmentsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}",
    }),
  );
export type EnvironmentsUpdateInput = typeof EnvironmentsUpdateInput.Type;

// Output Schema
export const EnvironmentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type EnvironmentsUpdateOutput = typeof EnvironmentsUpdateOutput.Type;

// The operation
/**
 * Updates the environment with the specified name in the specified subscription and resource group.
 */
export const EnvironmentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EnvironmentsUpdateInput,
  outputSchema: EnvironmentsUpdateOutput,
}));
// Input Schema
export const EventSourcesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    eventSourceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/eventSources/{eventSourceName}",
    }),
  );
export type EventSourcesCreateOrUpdateInput =
  typeof EventSourcesCreateOrUpdateInput.Type;

// Output Schema
export const EventSourcesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type EventSourcesCreateOrUpdateOutput =
  typeof EventSourcesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an event source under the specified environment.
 *
 * @param eventSourceName - Name of the event source.
 */
export const EventSourcesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventSourcesCreateOrUpdateInput,
    outputSchema: EventSourcesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const EventSourcesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/eventSources/{eventSourceName}",
    }),
  );
export type EventSourcesDeleteInput = typeof EventSourcesDeleteInput.Type;

// Output Schema
export const EventSourcesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EventSourcesDeleteOutput = typeof EventSourcesDeleteOutput.Type;

// The operation
/**
 * Deletes the event source with the specified name in the specified subscription, resource group, and environment
 */
export const EventSourcesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EventSourcesDeleteInput,
  outputSchema: EventSourcesDeleteOutput,
}));
// Input Schema
export const EventSourcesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/eventSources/{eventSourceName}",
  }),
);
export type EventSourcesGetInput = typeof EventSourcesGetInput.Type;

// Output Schema
export const EventSourcesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type EventSourcesGetOutput = typeof EventSourcesGetOutput.Type;

// The operation
/**
 * Gets the event source with the specified name in the specified environment.
 */
export const EventSourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EventSourcesGetInput,
  outputSchema: EventSourcesGetOutput,
}));
// Input Schema
export const EventSourcesListByEnvironmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/eventSources",
    }),
  );
export type EventSourcesListByEnvironmentInput =
  typeof EventSourcesListByEnvironmentInput.Type;

// Output Schema
export const EventSourcesListByEnvironmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type EventSourcesListByEnvironmentOutput =
  typeof EventSourcesListByEnvironmentOutput.Type;

// The operation
/**
 * Lists all the available event sources associated with the subscription and within the specified resource group and environment.
 */
export const EventSourcesListByEnvironment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EventSourcesListByEnvironmentInput,
    outputSchema: EventSourcesListByEnvironmentOutput,
  }));
// Input Schema
export const EventSourcesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/eventSources/{eventSourceName}",
    }),
  );
export type EventSourcesUpdateInput = typeof EventSourcesUpdateInput.Type;

// Output Schema
export const EventSourcesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type EventSourcesUpdateOutput = typeof EventSourcesUpdateOutput.Type;

// The operation
/**
 * Updates the event source with the specified name in the specified subscription, resource group, and environment.
 */
export const EventSourcesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EventSourcesUpdateInput,
  outputSchema: EventSourcesUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.TimeSeriesInsights/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      displayDescription: Schema.optional(Schema.String),
                      unit: Schema.optional(Schema.String),
                      dimensions: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      aggregationType: Schema.optional(Schema.String),
                      availabilities: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            timeGrain: Schema.optional(Schema.String),
                            blobDuration: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      category: Schema.optional(Schema.String),
                      resourceIdDimensionNameOverride: Schema.optional(
                        Schema.String,
                      ),
                    }),
                  ),
                ),
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
          }),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Time Series Insights related operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const ReferenceDataSetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    referenceDataSetName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/referenceDataSets/{referenceDataSetName}",
    }),
  );
export type ReferenceDataSetsCreateOrUpdateInput =
  typeof ReferenceDataSetsCreateOrUpdateInput.Type;

// Output Schema
export const ReferenceDataSetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ReferenceDataSetsCreateOrUpdateOutput =
  typeof ReferenceDataSetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a reference data set in the specified environment.
 *
 * @param referenceDataSetName - Name of the reference data set.
 */
export const ReferenceDataSetsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReferenceDataSetsCreateOrUpdateInput,
    outputSchema: ReferenceDataSetsCreateOrUpdateOutput,
  }));
// Input Schema
export const ReferenceDataSetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/referenceDataSets/{referenceDataSetName}",
    }),
  );
export type ReferenceDataSetsDeleteInput =
  typeof ReferenceDataSetsDeleteInput.Type;

// Output Schema
export const ReferenceDataSetsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReferenceDataSetsDeleteOutput =
  typeof ReferenceDataSetsDeleteOutput.Type;

// The operation
/**
 * Deletes the reference data set with the specified name in the specified subscription, resource group, and environment
 */
export const ReferenceDataSetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReferenceDataSetsDeleteInput,
    outputSchema: ReferenceDataSetsDeleteOutput,
  }),
);
// Input Schema
export const ReferenceDataSetsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/referenceDataSets/{referenceDataSetName}",
    }),
  );
export type ReferenceDataSetsGetInput = typeof ReferenceDataSetsGetInput.Type;

// Output Schema
export const ReferenceDataSetsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ReferenceDataSetsGetOutput = typeof ReferenceDataSetsGetOutput.Type;

// The operation
/**
 * Gets the reference data set with the specified name in the specified environment.
 */
export const ReferenceDataSetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReferenceDataSetsGetInput,
    outputSchema: ReferenceDataSetsGetOutput,
  }),
);
// Input Schema
export const ReferenceDataSetsListByEnvironmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/referenceDataSets",
    }),
  );
export type ReferenceDataSetsListByEnvironmentInput =
  typeof ReferenceDataSetsListByEnvironmentInput.Type;

// Output Schema
export const ReferenceDataSetsListByEnvironmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
  });
export type ReferenceDataSetsListByEnvironmentOutput =
  typeof ReferenceDataSetsListByEnvironmentOutput.Type;

// The operation
/**
 * Lists all the available reference data sets associated with the subscription and within the specified resource group and environment.
 */
export const ReferenceDataSetsListByEnvironment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReferenceDataSetsListByEnvironmentInput,
    outputSchema: ReferenceDataSetsListByEnvironmentOutput,
  }));
// Input Schema
export const ReferenceDataSetsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.TimeSeriesInsights/environments/{environmentName}/referenceDataSets/{referenceDataSetName}",
    }),
  );
export type ReferenceDataSetsUpdateInput =
  typeof ReferenceDataSetsUpdateInput.Type;

// Output Schema
export const ReferenceDataSetsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ReferenceDataSetsUpdateOutput =
  typeof ReferenceDataSetsUpdateOutput.Type;

// The operation
/**
 * Updates the reference data set with the specified name in the specified subscription, resource group, and environment.
 */
export const ReferenceDataSetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReferenceDataSetsUpdateInput,
    outputSchema: ReferenceDataSetsUpdateOutput,
  }),
);
