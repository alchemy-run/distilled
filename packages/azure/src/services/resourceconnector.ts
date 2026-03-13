/**
 * Azure Resourceconnector API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const AppliancesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}",
    }),
  );
export type AppliancesCreateOrUpdateInput =
  typeof AppliancesCreateOrUpdateInput.Type;

// Output Schema
export const AppliancesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AppliancesCreateOrUpdateOutput =
  typeof AppliancesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an Appliance.
 *
 * Creates or updates an Appliance in the specified Subscription and Resource Group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - Appliances name.
 */
export const AppliancesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppliancesCreateOrUpdateInput,
    outputSchema: AppliancesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const AppliancesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}",
  }),
);
export type AppliancesDeleteInput = typeof AppliancesDeleteInput.Type;

// Output Schema
export const AppliancesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AppliancesDeleteOutput = typeof AppliancesDeleteOutput.Type;

// The operation
/**
 * Deletes an Appliance.
 *
 * Deletes an Appliance with the specified Resource Name, Resource Group, and Subscription Id.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - Appliances name.
 */
export const AppliancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppliancesDeleteInput,
  outputSchema: AppliancesDeleteOutput,
}));
// Input Schema
export const AppliancesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}",
  }),
);
export type AppliancesGetInput = typeof AppliancesGetInput.Type;

// Output Schema
export const AppliancesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AppliancesGetOutput = typeof AppliancesGetOutput.Type;

// The operation
/**
 * Gets an Appliance.
 *
 * Gets the details of an Appliance with a specified resource group and name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - Appliances name.
 */
export const AppliancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppliancesGetInput,
  outputSchema: AppliancesGetOutput,
}));
// Input Schema
export const AppliancesGetTelemetryConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceConnector/telemetryconfig",
    }),
  );
export type AppliancesGetTelemetryConfigInput =
  typeof AppliancesGetTelemetryConfigInput.Type;

// Output Schema
export const AppliancesGetTelemetryConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    telemetryInstrumentationKey: Schema.optional(Schema.String),
  });
export type AppliancesGetTelemetryConfigOutput =
  typeof AppliancesGetTelemetryConfigOutput.Type;

// The operation
/**
 * Gets the telemetry config.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AppliancesGetTelemetryConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppliancesGetTelemetryConfigInput,
    outputSchema: AppliancesGetTelemetryConfigOutput,
  }));
// Input Schema
export const AppliancesGetUpgradeGraphInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    upgradeGraph: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}/upgradeGraphs/{upgradeGraph}",
    }),
  );
export type AppliancesGetUpgradeGraphInput =
  typeof AppliancesGetUpgradeGraphInput.Type;

// Output Schema
export const AppliancesGetUpgradeGraphOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        applianceVersion: Schema.optional(Schema.String),
        supportedVersions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              metadata: Schema.optional(
                Schema.Struct({
                  catalogVersion: Schema.optional(
                    Schema.Struct({
                      data: Schema.optional(
                        Schema.Struct({
                          audience: Schema.optional(Schema.String),
                          catalog: Schema.optional(Schema.String),
                          offer: Schema.optional(Schema.String),
                          version: Schema.optional(Schema.String),
                        }),
                      ),
                      name: Schema.optional(Schema.String),
                      namespace: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              version: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type AppliancesGetUpgradeGraphOutput =
  typeof AppliancesGetUpgradeGraphOutput.Type;

// The operation
/**
 * Gets an Appliance upgrade graph.
 *
 * Gets the upgrade graph of an Appliance with a specified resource group and name and specific release train.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - Appliances name.
 * @param upgradeGraph - Upgrade graph version, ex - stable
 */
export const AppliancesGetUpgradeGraph = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppliancesGetUpgradeGraphInput,
    outputSchema: AppliancesGetUpgradeGraphOutput,
  }),
);
// Input Schema
export const AppliancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances",
    }),
  );
export type AppliancesListByResourceGroupInput =
  typeof AppliancesListByResourceGroupInput.Type;

// Output Schema
export const AppliancesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AppliancesListByResourceGroupOutput =
  typeof AppliancesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of Appliances in the specified subscription and resource group.
 *
 * Gets a list of Appliances in the specified subscription and resource group. The operation returns properties of each Appliance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AppliancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppliancesListByResourceGroupInput,
    outputSchema: AppliancesListByResourceGroupOutput,
  }));
// Input Schema
export const AppliancesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ResourceConnector/appliances",
    }),
  );
export type AppliancesListBySubscriptionInput =
  typeof AppliancesListBySubscriptionInput.Type;

// Output Schema
export const AppliancesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AppliancesListBySubscriptionOutput =
  typeof AppliancesListBySubscriptionOutput.Type;

// The operation
/**
 * Gets a list of Appliances in a subscription.
 *
 * Gets a list of Appliances in the specified subscription. The operation returns properties of each Appliance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AppliancesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppliancesListBySubscriptionInput,
    outputSchema: AppliancesListBySubscriptionOutput,
  }));
// Input Schema
export const AppliancesListClusterUserCredentialInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}/listClusterUserCredential",
    }),
  );
export type AppliancesListClusterUserCredentialInput =
  typeof AppliancesListClusterUserCredentialInput.Type;

// Output Schema
export const AppliancesListClusterUserCredentialOutput =
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
          name: Schema.optional(
            Schema.Literals(["clusterUser", "clusterCustomerUser"]),
          ),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type AppliancesListClusterUserCredentialOutput =
  typeof AppliancesListClusterUserCredentialOutput.Type;

// The operation
/**
 * Returns the cluster user credential.
 *
 * Returns the cluster user credentials for the dedicated appliance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - Appliances name.
 */
export const AppliancesListClusterUserCredential =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AppliancesListClusterUserCredentialInput,
    outputSchema: AppliancesListClusterUserCredentialOutput,
  }));
// Input Schema
export const AppliancesListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    artifactType: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}/listkeys",
    }),
  );
export type AppliancesListKeysInput = typeof AppliancesListKeysInput.Type;

// Output Schema
export const AppliancesListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    artifactProfiles: Schema.optional(
      Schema.Record(
        Schema.String,
        Schema.Struct({
          endpoint: Schema.optional(Schema.String),
        }),
      ),
    ),
    kubeconfigs: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(
            Schema.Literals(["clusterUser", "clusterCustomerUser"]),
          ),
          value: Schema.optional(Schema.String),
        }),
      ),
    ),
    sshKeys: Schema.optional(
      Schema.Record(
        Schema.String,
        Schema.Struct({
          certificate: Schema.optional(Schema.String),
          creationTimeStamp: Schema.optional(Schema.Number),
          expirationTimeStamp: Schema.optional(Schema.Number),
          privateKey: Schema.optional(SensitiveString),
          publicKey: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type AppliancesListKeysOutput = typeof AppliancesListKeysOutput.Type;

// The operation
/**
 * Gets the management config.
 *
 * Returns the cluster customer credentials for the dedicated appliance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - Appliances name.
 * @param artifactType - This sets the type of artifact being returned, when empty no artifact endpoint is returned.
 */
export const AppliancesListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppliancesListKeysInput,
  outputSchema: AppliancesListKeysOutput,
}));
// Input Schema
export const AppliancesListOperationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.ResourceConnector/operations",
    }),
  );
export type AppliancesListOperationsInput =
  typeof AppliancesListOperationsInput.Type;

// Output Schema
export const AppliancesListOperationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        display: Schema.optional(
          Schema.Struct({
            description: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
          }),
        ),
        isDataAction: Schema.optional(Schema.Boolean),
        name: Schema.optional(Schema.String),
        origin: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AppliancesListOperationsOutput =
  typeof AppliancesListOperationsOutput.Type;

// The operation
/**
 * Lists all available Appliances operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const AppliancesListOperations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AppliancesListOperationsInput,
    outputSchema: AppliancesListOperationsOutput,
  }),
);
// Input Schema
export const AppliancesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ResourceConnector/appliances/{resourceName}",
  }),
);
export type AppliancesUpdateInput = typeof AppliancesUpdateInput.Type;

// Output Schema
export const AppliancesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type AppliancesUpdateOutput = typeof AppliancesUpdateOutput.Type;

// The operation
/**
 * Updates an Appliance.
 *
 * Updates an Appliance with the specified Resource Name in the specified Resource Group and Subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - Appliances name.
 */
export const AppliancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AppliancesUpdateInput,
  outputSchema: AppliancesUpdateOutput,
}));
