/**
 * Azure Loadtestservice API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const LoadTestsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    loadTestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/loadTests/{loadTestName}",
    }),
  );
export type LoadTestsCreateOrUpdateInput =
  typeof LoadTestsCreateOrUpdateInput.Type;

// Output Schema
export const LoadTestsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type LoadTestsCreateOrUpdateOutput =
  typeof LoadTestsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a LoadTestResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param loadTestName - Load Test name
 */
export const LoadTestsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LoadTestsCreateOrUpdateInput,
    outputSchema: LoadTestsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const LoadTestsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  loadTestName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/loadTests/{loadTestName}",
  }),
);
export type LoadTestsDeleteInput = typeof LoadTestsDeleteInput.Type;

// Output Schema
export const LoadTestsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LoadTestsDeleteOutput = typeof LoadTestsDeleteOutput.Type;

// The operation
/**
 * Delete a LoadTestResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param loadTestName - Load Test name
 */
export const LoadTestsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LoadTestsDeleteInput,
  outputSchema: LoadTestsDeleteOutput,
}));
// Input Schema
export const LoadTestsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  loadTestName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/loadTests/{loadTestName}",
  }),
);
export type LoadTestsGetInput = typeof LoadTestsGetInput.Type;

// Output Schema
export const LoadTestsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type LoadTestsGetOutput = typeof LoadTestsGetOutput.Type;

// The operation
/**
 * Get a LoadTestResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param loadTestName - Load Test name
 */
export const LoadTestsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LoadTestsGetInput,
  outputSchema: LoadTestsGetOutput,
}));
// Input Schema
export const LoadTestsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/loadTests",
    }),
  );
export type LoadTestsListByResourceGroupInput =
  typeof LoadTestsListByResourceGroupInput.Type;

// Output Schema
export const LoadTestsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LoadTestsListByResourceGroupOutput =
  typeof LoadTestsListByResourceGroupOutput.Type;

// The operation
/**
 * List LoadTestResource resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const LoadTestsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LoadTestsListByResourceGroupInput,
    outputSchema: LoadTestsListByResourceGroupOutput,
  }));
// Input Schema
export const LoadTestsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/loadTests",
    }),
  );
export type LoadTestsListBySubscriptionInput =
  typeof LoadTestsListBySubscriptionInput.Type;

// Output Schema
export const LoadTestsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LoadTestsListBySubscriptionOutput =
  typeof LoadTestsListBySubscriptionOutput.Type;

// The operation
/**
 * List LoadTestResource resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LoadTestsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LoadTestsListBySubscriptionInput,
    outputSchema: LoadTestsListBySubscriptionOutput,
  }),
);
// Input Schema
export const LoadTestsListOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    loadTestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/loadTests/{loadTestName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type LoadTestsListOutboundNetworkDependenciesEndpointsInput =
  typeof LoadTestsListOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const LoadTestsListOutboundNetworkDependenciesEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        category: Schema.optional(Schema.String),
        endpoints: Schema.optional(
          Schema.Array(
            Schema.Struct({
              domainName: Schema.String,
              description: Schema.optional(Schema.String),
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
    nextLink: Schema.optional(Schema.String),
  });
export type LoadTestsListOutboundNetworkDependenciesEndpointsOutput =
  typeof LoadTestsListOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Lists the endpoints that agents may call as part of load testing.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param loadTestName - Load Test name
 */
export const LoadTestsListOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LoadTestsListOutboundNetworkDependenciesEndpointsInput,
    outputSchema: LoadTestsListOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const LoadTestsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  loadTestName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/loadTests/{loadTestName}",
  }),
);
export type LoadTestsUpdateInput = typeof LoadTestsUpdateInput.Type;

// Output Schema
export const LoadTestsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type LoadTestsUpdateOutput = typeof LoadTestsUpdateOutput.Type;

// The operation
/**
 * Update a LoadTestResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param loadTestName - Load Test name
 */
export const LoadTestsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LoadTestsUpdateInput,
  outputSchema: LoadTestsUpdateOutput,
}));
// Input Schema
export const PlaywrightQuotasGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    playwrightQuotaName: Schema.Literals(["ExecutionMinutes"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/locations/{location}/playwrightQuotas/{playwrightQuotaName}",
    }),
  );
export type PlaywrightQuotasGetInput = typeof PlaywrightQuotasGetInput.Type;

// Output Schema
export const PlaywrightQuotasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PlaywrightQuotasGetOutput = typeof PlaywrightQuotasGetOutput.Type;

// The operation
/**
 * Gets a subscription-level location-based Playwright quota resource by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param playwrightQuotaName - The name of the PlaywrightQuota
 */
export const PlaywrightQuotasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PlaywrightQuotasGetInput,
  outputSchema: PlaywrightQuotasGetOutput,
}));
// Input Schema
export const PlaywrightQuotasListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/locations/{location}/playwrightQuotas",
    }),
  );
export type PlaywrightQuotasListBySubscriptionInput =
  typeof PlaywrightQuotasListBySubscriptionInput.Type;

// Output Schema
export const PlaywrightQuotasListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PlaywrightQuotasListBySubscriptionOutput =
  typeof PlaywrightQuotasListBySubscriptionOutput.Type;

// The operation
/**
 * Lists Playwright quota resources for a given subscription ID.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const PlaywrightQuotasListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlaywrightQuotasListBySubscriptionInput,
    outputSchema: PlaywrightQuotasListBySubscriptionOutput,
  }));
// Input Schema
export const PlaywrightWorkspaceQuotasGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    playwrightWorkspaceName: Schema.String.pipe(T.PathParam()),
    quotaName: Schema.Literals(["ExecutionMinutes"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}/quotas/{quotaName}",
    }),
  );
export type PlaywrightWorkspaceQuotasGetInput =
  typeof PlaywrightWorkspaceQuotasGetInput.Type;

// Output Schema
export const PlaywrightWorkspaceQuotasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PlaywrightWorkspaceQuotasGetOutput =
  typeof PlaywrightWorkspaceQuotasGetOutput.Type;

// The operation
/**
 * Gets a Playwright workspace quota resource by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param playwrightWorkspaceName - The name of the PlaywrightWorkspace
 * @param quotaName - The name of the PlaywrightWorkspaceQuota
 */
export const PlaywrightWorkspaceQuotasGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlaywrightWorkspaceQuotasGetInput,
    outputSchema: PlaywrightWorkspaceQuotasGetOutput,
  }));
// Input Schema
export const PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    playwrightWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}/quotas",
    }),
  );
export type PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceInput =
  typeof PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceInput.Type;

// Output Schema
export const PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOutput =
  typeof PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOutput.Type;

// The operation
/**
 * Lists quota resources for a given Playwright workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param playwrightWorkspaceName - The name of the PlaywrightWorkspace
 */
export const PlaywrightWorkspaceQuotasListByPlaywrightWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceInput,
    outputSchema: PlaywrightWorkspaceQuotasListByPlaywrightWorkspaceOutput,
  }));
// Input Schema
export const PlaywrightWorkspacesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/checkNameAvailability",
    }),
  );
export type PlaywrightWorkspacesCheckNameAvailabilityInput =
  typeof PlaywrightWorkspacesCheckNameAvailabilityInput.Type;

// Output Schema
export const PlaywrightWorkspacesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type PlaywrightWorkspacesCheckNameAvailabilityOutput =
  typeof PlaywrightWorkspacesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks if a Playwright workspace name is available globally.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const PlaywrightWorkspacesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlaywrightWorkspacesCheckNameAvailabilityInput,
    outputSchema: PlaywrightWorkspacesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const PlaywrightWorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    playwrightWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}",
    }),
  );
export type PlaywrightWorkspacesCreateOrUpdateInput =
  typeof PlaywrightWorkspacesCreateOrUpdateInput.Type;

// Output Schema
export const PlaywrightWorkspacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PlaywrightWorkspacesCreateOrUpdateOutput =
  typeof PlaywrightWorkspacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a PlaywrightWorkspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param playwrightWorkspaceName - The name of the PlaywrightWorkspace
 */
export const PlaywrightWorkspacesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlaywrightWorkspacesCreateOrUpdateInput,
    outputSchema: PlaywrightWorkspacesCreateOrUpdateOutput,
  }));
// Input Schema
export const PlaywrightWorkspacesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    playwrightWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}",
    }),
  );
export type PlaywrightWorkspacesDeleteInput =
  typeof PlaywrightWorkspacesDeleteInput.Type;

// Output Schema
export const PlaywrightWorkspacesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PlaywrightWorkspacesDeleteOutput =
  typeof PlaywrightWorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes a Playwright workspace resource asynchronously.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param playwrightWorkspaceName - The name of the PlaywrightWorkspace
 */
export const PlaywrightWorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PlaywrightWorkspacesDeleteInput,
    outputSchema: PlaywrightWorkspacesDeleteOutput,
  }),
);
// Input Schema
export const PlaywrightWorkspacesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    playwrightWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}",
    }),
  );
export type PlaywrightWorkspacesGetInput =
  typeof PlaywrightWorkspacesGetInput.Type;

// Output Schema
export const PlaywrightWorkspacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PlaywrightWorkspacesGetOutput =
  typeof PlaywrightWorkspacesGetOutput.Type;

// The operation
/**
 * Get a PlaywrightWorkspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param playwrightWorkspaceName - The name of the PlaywrightWorkspace
 */
export const PlaywrightWorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PlaywrightWorkspacesGetInput,
    outputSchema: PlaywrightWorkspacesGetOutput,
  }),
);
// Input Schema
export const PlaywrightWorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces",
    }),
  );
export type PlaywrightWorkspacesListByResourceGroupInput =
  typeof PlaywrightWorkspacesListByResourceGroupInput.Type;

// Output Schema
export const PlaywrightWorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PlaywrightWorkspacesListByResourceGroupOutput =
  typeof PlaywrightWorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * List PlaywrightWorkspace resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PlaywrightWorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlaywrightWorkspacesListByResourceGroupInput,
    outputSchema: PlaywrightWorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const PlaywrightWorkspacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/playwrightWorkspaces",
    }),
  );
export type PlaywrightWorkspacesListBySubscriptionInput =
  typeof PlaywrightWorkspacesListBySubscriptionInput.Type;

// Output Schema
export const PlaywrightWorkspacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PlaywrightWorkspacesListBySubscriptionOutput =
  typeof PlaywrightWorkspacesListBySubscriptionOutput.Type;

// The operation
/**
 * List PlaywrightWorkspace resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const PlaywrightWorkspacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PlaywrightWorkspacesListBySubscriptionInput,
    outputSchema: PlaywrightWorkspacesListBySubscriptionOutput,
  }));
// Input Schema
export const PlaywrightWorkspacesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    playwrightWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.LoadTestService/playwrightWorkspaces/{playwrightWorkspaceName}",
    }),
  );
export type PlaywrightWorkspacesUpdateInput =
  typeof PlaywrightWorkspacesUpdateInput.Type;

// Output Schema
export const PlaywrightWorkspacesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PlaywrightWorkspacesUpdateOutput =
  typeof PlaywrightWorkspacesUpdateOutput.Type;

// The operation
/**
 * Updates a Playwright workspace resource synchronously.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param playwrightWorkspaceName - The name of the PlaywrightWorkspace
 */
export const PlaywrightWorkspacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PlaywrightWorkspacesUpdateInput,
    outputSchema: PlaywrightWorkspacesUpdateOutput,
  }),
);
// Input Schema
export const QuotasCheckAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    quotaBucketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/locations/{location}/quotas/{quotaBucketName}/checkAvailability",
    }),
  );
export type QuotasCheckAvailabilityInput =
  typeof QuotasCheckAvailabilityInput.Type;

// Output Schema
export const QuotasCheckAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    type: Schema.String,
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        isAvailable: Schema.optional(Schema.Boolean),
        availabilityStatus: Schema.optional(Schema.String),
      }),
    ),
  });
export type QuotasCheckAvailabilityOutput =
  typeof QuotasCheckAvailabilityOutput.Type;

// The operation
/**
 * Check Quota Availability on quota bucket per region per subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param quotaBucketName - The quota name.
 */
export const QuotasCheckAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QuotasCheckAvailabilityInput,
    outputSchema: QuotasCheckAvailabilityOutput,
  }),
);
// Input Schema
export const QuotasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  quotaBucketName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/locations/{location}/quotas/{quotaBucketName}",
  }),
);
export type QuotasGetInput = typeof QuotasGetInput.Type;

// Output Schema
export const QuotasGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QuotasGetOutput = typeof QuotasGetOutput.Type;

// The operation
/**
 * Get the available quota for a quota bucket per region per subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param quotaBucketName - The quota name.
 */
export const QuotasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotasGetInput,
  outputSchema: QuotasGetOutput,
}));
// Input Schema
export const QuotasListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/locations/{location}/quotas",
  }),
);
export type QuotasListInput = typeof QuotasListInput.Type;

// Output Schema
export const QuotasListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type QuotasListOutput = typeof QuotasListOutput.Type;

// The operation
/**
 * List quotas for a given subscription Id.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const QuotasList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotasListInput,
  outputSchema: QuotasListOutput,
}));
