/**
 * Azure Deviceregistry API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AssetEndpointProfilesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    assetEndpointProfileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}",
    }),
  );
export type AssetEndpointProfilesCreateOrReplaceInput =
  typeof AssetEndpointProfilesCreateOrReplaceInput.Type;

// Output Schema
export const AssetEndpointProfilesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AssetEndpointProfilesCreateOrReplaceOutput =
  typeof AssetEndpointProfilesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a AssetEndpointProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param assetEndpointProfileName - Asset Endpoint Profile name parameter.
 */
export const AssetEndpointProfilesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssetEndpointProfilesCreateOrReplaceInput,
    outputSchema: AssetEndpointProfilesCreateOrReplaceOutput,
  }));
// Input Schema
export const AssetEndpointProfilesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    assetEndpointProfileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}",
    }),
  );
export type AssetEndpointProfilesDeleteInput =
  typeof AssetEndpointProfilesDeleteInput.Type;

// Output Schema
export const AssetEndpointProfilesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AssetEndpointProfilesDeleteOutput =
  typeof AssetEndpointProfilesDeleteOutput.Type;

// The operation
/**
 * Delete a AssetEndpointProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param assetEndpointProfileName - Asset Endpoint Profile name parameter.
 */
export const AssetEndpointProfilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AssetEndpointProfilesDeleteInput,
    outputSchema: AssetEndpointProfilesDeleteOutput,
  }),
);
// Input Schema
export const AssetEndpointProfilesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    assetEndpointProfileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}",
    }),
  );
export type AssetEndpointProfilesGetInput =
  typeof AssetEndpointProfilesGetInput.Type;

// Output Schema
export const AssetEndpointProfilesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AssetEndpointProfilesGetOutput =
  typeof AssetEndpointProfilesGetOutput.Type;

// The operation
/**
 * Get a AssetEndpointProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param assetEndpointProfileName - Asset Endpoint Profile name parameter.
 */
export const AssetEndpointProfilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AssetEndpointProfilesGetInput,
    outputSchema: AssetEndpointProfilesGetOutput,
  }),
);
// Input Schema
export const AssetEndpointProfilesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles",
    }),
  );
export type AssetEndpointProfilesListByResourceGroupInput =
  typeof AssetEndpointProfilesListByResourceGroupInput.Type;

// Output Schema
export const AssetEndpointProfilesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AssetEndpointProfilesListByResourceGroupOutput =
  typeof AssetEndpointProfilesListByResourceGroupOutput.Type;

// The operation
/**
 * List AssetEndpointProfile resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AssetEndpointProfilesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssetEndpointProfilesListByResourceGroupInput,
    outputSchema: AssetEndpointProfilesListByResourceGroupOutput,
  }));
// Input Schema
export const AssetEndpointProfilesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles",
    }),
  );
export type AssetEndpointProfilesListBySubscriptionInput =
  typeof AssetEndpointProfilesListBySubscriptionInput.Type;

// Output Schema
export const AssetEndpointProfilesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AssetEndpointProfilesListBySubscriptionOutput =
  typeof AssetEndpointProfilesListBySubscriptionOutput.Type;

// The operation
/**
 * List AssetEndpointProfile resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AssetEndpointProfilesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AssetEndpointProfilesListBySubscriptionInput,
    outputSchema: AssetEndpointProfilesListBySubscriptionOutput,
  }));
// Input Schema
export const AssetEndpointProfilesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    assetEndpointProfileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assetEndpointProfiles/{assetEndpointProfileName}",
    }),
  );
export type AssetEndpointProfilesUpdateInput =
  typeof AssetEndpointProfilesUpdateInput.Type;

// Output Schema
export const AssetEndpointProfilesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AssetEndpointProfilesUpdateOutput =
  typeof AssetEndpointProfilesUpdateOutput.Type;

// The operation
/**
 * Update a AssetEndpointProfile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param assetEndpointProfileName - Asset Endpoint Profile name parameter.
 */
export const AssetEndpointProfilesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AssetEndpointProfilesUpdateInput,
    outputSchema: AssetEndpointProfilesUpdateOutput,
  }),
);
// Input Schema
export const AssetsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    assetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
    }),
  );
export type AssetsCreateOrReplaceInput = typeof AssetsCreateOrReplaceInput.Type;

// Output Schema
export const AssetsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AssetsCreateOrReplaceOutput =
  typeof AssetsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Asset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param assetName - Asset name parameter.
 */
export const AssetsCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AssetsCreateOrReplaceInput,
    outputSchema: AssetsCreateOrReplaceOutput,
  }),
);
// Input Schema
export const AssetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  assetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
  }),
);
export type AssetsDeleteInput = typeof AssetsDeleteInput.Type;

// Output Schema
export const AssetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AssetsDeleteOutput = typeof AssetsDeleteOutput.Type;

// The operation
/**
 * Delete a Asset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param assetName - Asset name parameter.
 */
export const AssetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AssetsDeleteInput,
  outputSchema: AssetsDeleteOutput,
}));
// Input Schema
export const AssetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  assetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
  }),
);
export type AssetsGetInput = typeof AssetsGetInput.Type;

// Output Schema
export const AssetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AssetsGetOutput = typeof AssetsGetOutput.Type;

// The operation
/**
 * Get a Asset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param assetName - Asset name parameter.
 */
export const AssetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AssetsGetInput,
  outputSchema: AssetsGetOutput,
}));
// Input Schema
export const AssetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets",
    }),
  );
export type AssetsListByResourceGroupInput =
  typeof AssetsListByResourceGroupInput.Type;

// Output Schema
export const AssetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AssetsListByResourceGroupOutput =
  typeof AssetsListByResourceGroupOutput.Type;

// The operation
/**
 * List Asset resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AssetsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AssetsListByResourceGroupInput,
    outputSchema: AssetsListByResourceGroupOutput,
  }),
);
// Input Schema
export const AssetsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/assets",
    }),
  );
export type AssetsListBySubscriptionInput =
  typeof AssetsListBySubscriptionInput.Type;

// Output Schema
export const AssetsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AssetsListBySubscriptionOutput =
  typeof AssetsListBySubscriptionOutput.Type;

// The operation
/**
 * List Asset resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AssetsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AssetsListBySubscriptionInput,
    outputSchema: AssetsListBySubscriptionOutput,
  }),
);
// Input Schema
export const AssetsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  assetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/assets/{assetName}",
  }),
);
export type AssetsUpdateInput = typeof AssetsUpdateInput.Type;

// Output Schema
export const AssetsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AssetsUpdateOutput = typeof AssetsUpdateOutput.Type;

// The operation
/**
 * Update a Asset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param assetName - Asset name parameter.
 */
export const AssetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AssetsUpdateInput,
  outputSchema: AssetsUpdateOutput,
}));
// Input Schema
export const BillingContainersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    billingContainerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/billingContainers/{billingContainerName}",
    }),
  );
export type BillingContainersGetInput = typeof BillingContainersGetInput.Type;

// Output Schema
export const BillingContainersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BillingContainersGetOutput = typeof BillingContainersGetOutput.Type;

// The operation
/**
 * Get a BillingContainer
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param billingContainerName - Name of the billing container.
 */
export const BillingContainersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BillingContainersGetInput,
    outputSchema: BillingContainersGetOutput,
  }),
);
// Input Schema
export const BillingContainersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/billingContainers",
    }),
  );
export type BillingContainersListBySubscriptionInput =
  typeof BillingContainersListBySubscriptionInput.Type;

// Output Schema
export const BillingContainersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type BillingContainersListBySubscriptionOutput =
  typeof BillingContainersListBySubscriptionOutput.Type;

// The operation
/**
 * List BillingContainer resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const BillingContainersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BillingContainersListBySubscriptionInput,
    outputSchema: BillingContainersListBySubscriptionOutput,
  }));
// Input Schema
export const NamespaceAssetsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    assetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/assets/{assetName}",
    }),
  );
export type NamespaceAssetsCreateOrReplaceInput =
  typeof NamespaceAssetsCreateOrReplaceInput.Type;

// Output Schema
export const NamespaceAssetsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceAssetsCreateOrReplaceOutput =
  typeof NamespaceAssetsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a NamespaceAsset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param assetName - The name of the asset.
 */
export const NamespaceAssetsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceAssetsCreateOrReplaceInput,
    outputSchema: NamespaceAssetsCreateOrReplaceOutput,
  }));
// Input Schema
export const NamespaceAssetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    assetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/assets/{assetName}",
    }),
  );
export type NamespaceAssetsDeleteInput = typeof NamespaceAssetsDeleteInput.Type;

// Output Schema
export const NamespaceAssetsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespaceAssetsDeleteOutput =
  typeof NamespaceAssetsDeleteOutput.Type;

// The operation
/**
 * Delete a NamespaceAsset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param assetName - The name of the asset.
 */
export const NamespaceAssetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespaceAssetsDeleteInput,
    outputSchema: NamespaceAssetsDeleteOutput,
  }),
);
// Input Schema
export const NamespaceAssetsExecuteActionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    assetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/assets/{assetName}/executeAction",
    }),
  );
export type NamespaceAssetsExecuteActionInput =
  typeof NamespaceAssetsExecuteActionInput.Type;

// Output Schema
export const NamespaceAssetsExecuteActionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.Literals(["Succeeded", "Failed", "Canceled", "InProgress"]),
    managementActionName: Schema.String,
    managementGroupName: Schema.String,
    assetResourceId: Schema.String,
    response: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
        details: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              info: Schema.optional(Schema.String),
              correlationId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type NamespaceAssetsExecuteActionOutput =
  typeof NamespaceAssetsExecuteActionOutput.Type;

// The operation
/**
 * A long-running resource action.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param assetName - The name of the asset.
 */
export const NamespaceAssetsExecuteAction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceAssetsExecuteActionInput,
    outputSchema: NamespaceAssetsExecuteActionOutput,
  }));
// Input Schema
export const NamespaceAssetsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    assetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/assets/{assetName}",
    }),
  );
export type NamespaceAssetsGetInput = typeof NamespaceAssetsGetInput.Type;

// Output Schema
export const NamespaceAssetsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceAssetsGetOutput = typeof NamespaceAssetsGetOutput.Type;

// The operation
/**
 * Get a NamespaceAsset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param assetName - The name of the asset.
 */
export const NamespaceAssetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespaceAssetsGetInput,
  outputSchema: NamespaceAssetsGetOutput,
}));
// Input Schema
export const NamespaceAssetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/assets",
    }),
  );
export type NamespaceAssetsListByResourceGroupInput =
  typeof NamespaceAssetsListByResourceGroupInput.Type;

// Output Schema
export const NamespaceAssetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespaceAssetsListByResourceGroupOutput =
  typeof NamespaceAssetsListByResourceGroupOutput.Type;

// The operation
/**
 * List NamespaceAsset resources by Namespace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 */
export const NamespaceAssetsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceAssetsListByResourceGroupInput,
    outputSchema: NamespaceAssetsListByResourceGroupOutput,
  }));
// Input Schema
export const NamespaceAssetsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    assetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/assets/{assetName}",
    }),
  );
export type NamespaceAssetsUpdateInput = typeof NamespaceAssetsUpdateInput.Type;

// Output Schema
export const NamespaceAssetsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceAssetsUpdateOutput =
  typeof NamespaceAssetsUpdateOutput.Type;

// The operation
/**
 * Update a NamespaceAsset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param assetName - The name of the asset.
 */
export const NamespaceAssetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespaceAssetsUpdateInput,
    outputSchema: NamespaceAssetsUpdateOutput,
  }),
);
// Input Schema
export const NamespaceDevicesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    deviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/devices/{deviceName}",
    }),
  );
export type NamespaceDevicesCreateOrReplaceInput =
  typeof NamespaceDevicesCreateOrReplaceInput.Type;

// Output Schema
export const NamespaceDevicesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceDevicesCreateOrReplaceOutput =
  typeof NamespaceDevicesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a NamespaceDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param deviceName - The name of the device.
 */
export const NamespaceDevicesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDevicesCreateOrReplaceInput,
    outputSchema: NamespaceDevicesCreateOrReplaceOutput,
  }));
// Input Schema
export const NamespaceDevicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    deviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/devices/{deviceName}",
    }),
  );
export type NamespaceDevicesDeleteInput =
  typeof NamespaceDevicesDeleteInput.Type;

// Output Schema
export const NamespaceDevicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespaceDevicesDeleteOutput =
  typeof NamespaceDevicesDeleteOutput.Type;

// The operation
/**
 * Delete a NamespaceDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param deviceName - The name of the device.
 */
export const NamespaceDevicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespaceDevicesDeleteInput,
    outputSchema: NamespaceDevicesDeleteOutput,
  }),
);
// Input Schema
export const NamespaceDevicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    deviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/devices/{deviceName}",
    }),
  );
export type NamespaceDevicesGetInput = typeof NamespaceDevicesGetInput.Type;

// Output Schema
export const NamespaceDevicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceDevicesGetOutput = typeof NamespaceDevicesGetOutput.Type;

// The operation
/**
 * Get a NamespaceDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param deviceName - The name of the device.
 */
export const NamespaceDevicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespaceDevicesGetInput,
  outputSchema: NamespaceDevicesGetOutput,
}));
// Input Schema
export const NamespaceDevicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/devices",
    }),
  );
export type NamespaceDevicesListByResourceGroupInput =
  typeof NamespaceDevicesListByResourceGroupInput.Type;

// Output Schema
export const NamespaceDevicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespaceDevicesListByResourceGroupOutput =
  typeof NamespaceDevicesListByResourceGroupOutput.Type;

// The operation
/**
 * List NamespaceDevice resources by Namespace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 */
export const NamespaceDevicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDevicesListByResourceGroupInput,
    outputSchema: NamespaceDevicesListByResourceGroupOutput,
  }));
// Input Schema
export const NamespaceDevicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    deviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/devices/{deviceName}",
    }),
  );
export type NamespaceDevicesUpdateInput =
  typeof NamespaceDevicesUpdateInput.Type;

// Output Schema
export const NamespaceDevicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceDevicesUpdateOutput =
  typeof NamespaceDevicesUpdateOutput.Type;

// The operation
/**
 * Update a NamespaceDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param deviceName - The name of the device.
 */
export const NamespaceDevicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespaceDevicesUpdateInput,
    outputSchema: NamespaceDevicesUpdateOutput,
  }),
);
// Input Schema
export const NamespaceDiscoveredAssetsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    discoveredAssetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets/{discoveredAssetName}",
    }),
  );
export type NamespaceDiscoveredAssetsCreateOrReplaceInput =
  typeof NamespaceDiscoveredAssetsCreateOrReplaceInput.Type;

// Output Schema
export const NamespaceDiscoveredAssetsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceDiscoveredAssetsCreateOrReplaceOutput =
  typeof NamespaceDiscoveredAssetsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a NamespaceDiscoveredAsset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param discoveredAssetName - The name of the discovered asset.
 */
export const NamespaceDiscoveredAssetsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredAssetsCreateOrReplaceInput,
    outputSchema: NamespaceDiscoveredAssetsCreateOrReplaceOutput,
  }));
// Input Schema
export const NamespaceDiscoveredAssetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    discoveredAssetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets/{discoveredAssetName}",
    }),
  );
export type NamespaceDiscoveredAssetsDeleteInput =
  typeof NamespaceDiscoveredAssetsDeleteInput.Type;

// Output Schema
export const NamespaceDiscoveredAssetsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespaceDiscoveredAssetsDeleteOutput =
  typeof NamespaceDiscoveredAssetsDeleteOutput.Type;

// The operation
/**
 * Delete a NamespaceDiscoveredAsset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param discoveredAssetName - The name of the discovered asset.
 */
export const NamespaceDiscoveredAssetsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredAssetsDeleteInput,
    outputSchema: NamespaceDiscoveredAssetsDeleteOutput,
  }));
// Input Schema
export const NamespaceDiscoveredAssetsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    discoveredAssetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets/{discoveredAssetName}",
    }),
  );
export type NamespaceDiscoveredAssetsGetInput =
  typeof NamespaceDiscoveredAssetsGetInput.Type;

// Output Schema
export const NamespaceDiscoveredAssetsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceDiscoveredAssetsGetOutput =
  typeof NamespaceDiscoveredAssetsGetOutput.Type;

// The operation
/**
 * Get a NamespaceDiscoveredAsset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param discoveredAssetName - The name of the discovered asset.
 */
export const NamespaceDiscoveredAssetsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredAssetsGetInput,
    outputSchema: NamespaceDiscoveredAssetsGetOutput,
  }));
// Input Schema
export const NamespaceDiscoveredAssetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets",
    }),
  );
export type NamespaceDiscoveredAssetsListByResourceGroupInput =
  typeof NamespaceDiscoveredAssetsListByResourceGroupInput.Type;

// Output Schema
export const NamespaceDiscoveredAssetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespaceDiscoveredAssetsListByResourceGroupOutput =
  typeof NamespaceDiscoveredAssetsListByResourceGroupOutput.Type;

// The operation
/**
 * List NamespaceDiscoveredAsset resources by Namespace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 */
export const NamespaceDiscoveredAssetsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredAssetsListByResourceGroupInput,
    outputSchema: NamespaceDiscoveredAssetsListByResourceGroupOutput,
  }));
// Input Schema
export const NamespaceDiscoveredAssetsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    discoveredAssetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredAssets/{discoveredAssetName}",
    }),
  );
export type NamespaceDiscoveredAssetsUpdateInput =
  typeof NamespaceDiscoveredAssetsUpdateInput.Type;

// Output Schema
export const NamespaceDiscoveredAssetsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceDiscoveredAssetsUpdateOutput =
  typeof NamespaceDiscoveredAssetsUpdateOutput.Type;

// The operation
/**
 * Update a NamespaceDiscoveredAsset
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param discoveredAssetName - The name of the discovered asset.
 */
export const NamespaceDiscoveredAssetsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredAssetsUpdateInput,
    outputSchema: NamespaceDiscoveredAssetsUpdateOutput,
  }));
// Input Schema
export const NamespaceDiscoveredDevicesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    discoveredDeviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices/{discoveredDeviceName}",
    }),
  );
export type NamespaceDiscoveredDevicesCreateOrReplaceInput =
  typeof NamespaceDiscoveredDevicesCreateOrReplaceInput.Type;

// Output Schema
export const NamespaceDiscoveredDevicesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceDiscoveredDevicesCreateOrReplaceOutput =
  typeof NamespaceDiscoveredDevicesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a NamespaceDiscoveredDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param discoveredDeviceName - The name of the discovered device.
 */
export const NamespaceDiscoveredDevicesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredDevicesCreateOrReplaceInput,
    outputSchema: NamespaceDiscoveredDevicesCreateOrReplaceOutput,
  }));
// Input Schema
export const NamespaceDiscoveredDevicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    discoveredDeviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices/{discoveredDeviceName}",
    }),
  );
export type NamespaceDiscoveredDevicesDeleteInput =
  typeof NamespaceDiscoveredDevicesDeleteInput.Type;

// Output Schema
export const NamespaceDiscoveredDevicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespaceDiscoveredDevicesDeleteOutput =
  typeof NamespaceDiscoveredDevicesDeleteOutput.Type;

// The operation
/**
 * Delete a NamespaceDiscoveredDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param discoveredDeviceName - The name of the discovered device.
 */
export const NamespaceDiscoveredDevicesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredDevicesDeleteInput,
    outputSchema: NamespaceDiscoveredDevicesDeleteOutput,
  }));
// Input Schema
export const NamespaceDiscoveredDevicesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    discoveredDeviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices/{discoveredDeviceName}",
    }),
  );
export type NamespaceDiscoveredDevicesGetInput =
  typeof NamespaceDiscoveredDevicesGetInput.Type;

// Output Schema
export const NamespaceDiscoveredDevicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceDiscoveredDevicesGetOutput =
  typeof NamespaceDiscoveredDevicesGetOutput.Type;

// The operation
/**
 * Get a NamespaceDiscoveredDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param discoveredDeviceName - The name of the discovered device.
 */
export const NamespaceDiscoveredDevicesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredDevicesGetInput,
    outputSchema: NamespaceDiscoveredDevicesGetOutput,
  }));
// Input Schema
export const NamespaceDiscoveredDevicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices",
    }),
  );
export type NamespaceDiscoveredDevicesListByResourceGroupInput =
  typeof NamespaceDiscoveredDevicesListByResourceGroupInput.Type;

// Output Schema
export const NamespaceDiscoveredDevicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespaceDiscoveredDevicesListByResourceGroupOutput =
  typeof NamespaceDiscoveredDevicesListByResourceGroupOutput.Type;

// The operation
/**
 * List NamespaceDiscoveredDevice resources by Namespace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 */
export const NamespaceDiscoveredDevicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredDevicesListByResourceGroupInput,
    outputSchema: NamespaceDiscoveredDevicesListByResourceGroupOutput,
  }));
// Input Schema
export const NamespaceDiscoveredDevicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    discoveredDeviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/discoveredDevices/{discoveredDeviceName}",
    }),
  );
export type NamespaceDiscoveredDevicesUpdateInput =
  typeof NamespaceDiscoveredDevicesUpdateInput.Type;

// Output Schema
export const NamespaceDiscoveredDevicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespaceDiscoveredDevicesUpdateOutput =
  typeof NamespaceDiscoveredDevicesUpdateOutput.Type;

// The operation
/**
 * Update a NamespaceDiscoveredDevice
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 * @param discoveredDeviceName - The name of the discovered device.
 */
export const NamespaceDiscoveredDevicesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespaceDiscoveredDevicesUpdateInput,
    outputSchema: NamespaceDiscoveredDevicesUpdateOutput,
  }));
// Input Schema
export const NamespacesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}",
    }),
  );
export type NamespacesCreateOrReplaceInput =
  typeof NamespacesCreateOrReplaceInput.Type;

// Output Schema
export const NamespacesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespacesCreateOrReplaceOutput =
  typeof NamespacesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Namespace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 */
export const NamespacesCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesCreateOrReplaceInput,
    outputSchema: NamespacesCreateOrReplaceOutput,
  }),
);
// Input Schema
export const NamespacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}",
  }),
);
export type NamespacesDeleteInput = typeof NamespacesDeleteInput.Type;

// Output Schema
export const NamespacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespacesDeleteOutput = typeof NamespacesDeleteOutput.Type;

// The operation
/**
 * Delete a Namespace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 */
export const NamespacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesDeleteInput,
  outputSchema: NamespacesDeleteOutput,
}));
// Input Schema
export const NamespacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}",
  }),
);
export type NamespacesGetInput = typeof NamespacesGetInput.Type;

// Output Schema
export const NamespacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type NamespacesGetOutput = typeof NamespacesGetOutput.Type;

// The operation
/**
 * Get a Namespace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 */
export const NamespacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesGetInput,
  outputSchema: NamespacesGetOutput,
}));
// Input Schema
export const NamespacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces",
    }),
  );
export type NamespacesListByResourceGroupInput =
  typeof NamespacesListByResourceGroupInput.Type;

// Output Schema
export const NamespacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListByResourceGroupOutput =
  typeof NamespacesListByResourceGroupOutput.Type;

// The operation
/**
 * List Namespace resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NamespacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListByResourceGroupInput,
    outputSchema: NamespacesListByResourceGroupOutput,
  }));
// Input Schema
export const NamespacesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/namespaces",
    }),
  );
export type NamespacesListBySubscriptionInput =
  typeof NamespacesListBySubscriptionInput.Type;

// Output Schema
export const NamespacesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListBySubscriptionOutput =
  typeof NamespacesListBySubscriptionOutput.Type;

// The operation
/**
 * List Namespace resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const NamespacesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListBySubscriptionInput,
    outputSchema: NamespacesListBySubscriptionOutput,
  }));
// Input Schema
export const NamespacesMigrateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}/migrate",
  }),
);
export type NamespacesMigrateInput = typeof NamespacesMigrateInput.Type;

// Output Schema
export const NamespacesMigrateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    migrateResults: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceId: Schema.optional(Schema.String),
          result: Schema.optional(Schema.Literals(["Succeeded", "Failed"])),
          error: Schema.optional(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              details: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    code: Schema.optional(Schema.String),
                    message: Schema.optional(Schema.String),
                    info: Schema.optional(Schema.String),
                    correlationId: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
  });
export type NamespacesMigrateOutput = typeof NamespacesMigrateOutput.Type;

// The operation
/**
 * Migrate the resources into Namespace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 */
export const NamespacesMigrate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesMigrateInput,
  outputSchema: NamespacesMigrateOutput,
}));
// Input Schema
export const NamespacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/namespaces/{namespaceName}",
  }),
);
export type NamespacesUpdateInput = typeof NamespacesUpdateInput.Type;

// Output Schema
export const NamespacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type NamespacesUpdateOutput = typeof NamespacesUpdateOutput.Type;

// The operation
/**
 * Update a Namespace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The name of the namespace.
 */
export const NamespacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesUpdateInput,
  outputSchema: NamespacesUpdateOutput,
}));
// Input Schema
export const SchemaRegistriesCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}",
    }),
  );
export type SchemaRegistriesCreateOrReplaceInput =
  typeof SchemaRegistriesCreateOrReplaceInput.Type;

// Output Schema
export const SchemaRegistriesCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SchemaRegistriesCreateOrReplaceOutput =
  typeof SchemaRegistriesCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SchemaRegistry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 */
export const SchemaRegistriesCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchemaRegistriesCreateOrReplaceInput,
    outputSchema: SchemaRegistriesCreateOrReplaceOutput,
  }));
// Input Schema
export const SchemaRegistriesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}",
    }),
  );
export type SchemaRegistriesDeleteInput =
  typeof SchemaRegistriesDeleteInput.Type;

// Output Schema
export const SchemaRegistriesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchemaRegistriesDeleteOutput =
  typeof SchemaRegistriesDeleteOutput.Type;

// The operation
/**
 * Delete a SchemaRegistry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 */
export const SchemaRegistriesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaRegistriesDeleteInput,
    outputSchema: SchemaRegistriesDeleteOutput,
  }),
);
// Input Schema
export const SchemaRegistriesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}",
    }),
  );
export type SchemaRegistriesGetInput = typeof SchemaRegistriesGetInput.Type;

// Output Schema
export const SchemaRegistriesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SchemaRegistriesGetOutput = typeof SchemaRegistriesGetOutput.Type;

// The operation
/**
 * Get a SchemaRegistry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 */
export const SchemaRegistriesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemaRegistriesGetInput,
  outputSchema: SchemaRegistriesGetOutput,
}));
// Input Schema
export const SchemaRegistriesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries",
    }),
  );
export type SchemaRegistriesListByResourceGroupInput =
  typeof SchemaRegistriesListByResourceGroupInput.Type;

// Output Schema
export const SchemaRegistriesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SchemaRegistriesListByResourceGroupOutput =
  typeof SchemaRegistriesListByResourceGroupOutput.Type;

// The operation
/**
 * List SchemaRegistry resources by resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const SchemaRegistriesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchemaRegistriesListByResourceGroupInput,
    outputSchema: SchemaRegistriesListByResourceGroupOutput,
  }));
// Input Schema
export const SchemaRegistriesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/schemaRegistries",
    }),
  );
export type SchemaRegistriesListBySubscriptionInput =
  typeof SchemaRegistriesListBySubscriptionInput.Type;

// Output Schema
export const SchemaRegistriesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SchemaRegistriesListBySubscriptionOutput =
  typeof SchemaRegistriesListBySubscriptionOutput.Type;

// The operation
/**
 * List SchemaRegistry resources by subscription ID
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SchemaRegistriesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchemaRegistriesListBySubscriptionInput,
    outputSchema: SchemaRegistriesListBySubscriptionOutput,
  }));
// Input Schema
export const SchemaRegistriesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}",
    }),
  );
export type SchemaRegistriesUpdateInput =
  typeof SchemaRegistriesUpdateInput.Type;

// Output Schema
export const SchemaRegistriesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SchemaRegistriesUpdateOutput =
  typeof SchemaRegistriesUpdateOutput.Type;

// The operation
/**
 * Update a SchemaRegistry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 */
export const SchemaRegistriesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaRegistriesUpdateInput,
    outputSchema: SchemaRegistriesUpdateOutput,
  }),
);
// Input Schema
export const SchemasCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}",
    }),
  );
export type SchemasCreateOrReplaceInput =
  typeof SchemasCreateOrReplaceInput.Type;

// Output Schema
export const SchemasCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemasCreateOrReplaceOutput =
  typeof SchemasCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a Schema
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 * @param schemaName - Schema name parameter.
 */
export const SchemasCreateOrReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemasCreateOrReplaceInput,
    outputSchema: SchemasCreateOrReplaceOutput,
  }),
);
// Input Schema
export const SchemasDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schemaRegistryName: Schema.String.pipe(T.PathParam()),
  schemaName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}",
  }),
);
export type SchemasDeleteInput = typeof SchemasDeleteInput.Type;

// Output Schema
export const SchemasDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchemasDeleteOutput = typeof SchemasDeleteOutput.Type;

// The operation
/**
 * Delete a Schema
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 * @param schemaName - Schema name parameter.
 */
export const SchemasDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemasDeleteInput,
  outputSchema: SchemasDeleteOutput,
}));
// Input Schema
export const SchemasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  schemaRegistryName: Schema.String.pipe(T.PathParam()),
  schemaName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}",
  }),
);
export type SchemasGetInput = typeof SchemasGetInput.Type;

// Output Schema
export const SchemasGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemasGetOutput = typeof SchemasGetOutput.Type;

// The operation
/**
 * Get a Schema
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 * @param schemaName - Schema name parameter.
 */
export const SchemasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemasGetInput,
  outputSchema: SchemasGetOutput,
}));
// Input Schema
export const SchemasListBySchemaRegistryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas",
    }),
  );
export type SchemasListBySchemaRegistryInput =
  typeof SchemasListBySchemaRegistryInput.Type;

// Output Schema
export const SchemasListBySchemaRegistryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SchemasListBySchemaRegistryOutput =
  typeof SchemasListBySchemaRegistryOutput.Type;

// The operation
/**
 * List Schema resources by SchemaRegistry
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 */
export const SchemasListBySchemaRegistry = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemasListBySchemaRegistryInput,
    outputSchema: SchemasListBySchemaRegistryOutput,
  }),
);
// Input Schema
export const SchemaVersionsCreateOrReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    schemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions/{schemaVersionName}",
    }),
  );
export type SchemaVersionsCreateOrReplaceInput =
  typeof SchemaVersionsCreateOrReplaceInput.Type;

// Output Schema
export const SchemaVersionsCreateOrReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemaVersionsCreateOrReplaceOutput =
  typeof SchemaVersionsCreateOrReplaceOutput.Type;

// The operation
/**
 * Create a SchemaVersion
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 * @param schemaName - Schema name parameter.
 * @param schemaVersionName - Schema version name parameter.
 */
export const SchemaVersionsCreateOrReplace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SchemaVersionsCreateOrReplaceInput,
    outputSchema: SchemaVersionsCreateOrReplaceOutput,
  }));
// Input Schema
export const SchemaVersionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    schemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions/{schemaVersionName}",
    }),
  );
export type SchemaVersionsDeleteInput = typeof SchemaVersionsDeleteInput.Type;

// Output Schema
export const SchemaVersionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SchemaVersionsDeleteOutput = typeof SchemaVersionsDeleteOutput.Type;

// The operation
/**
 * Delete a SchemaVersion
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 * @param schemaName - Schema name parameter.
 * @param schemaVersionName - Schema version name parameter.
 */
export const SchemaVersionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaVersionsDeleteInput,
    outputSchema: SchemaVersionsDeleteOutput,
  }),
);
// Input Schema
export const SchemaVersionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    schemaVersionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions/{schemaVersionName}",
  }),
);
export type SchemaVersionsGetInput = typeof SchemaVersionsGetInput.Type;

// Output Schema
export const SchemaVersionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SchemaVersionsGetOutput = typeof SchemaVersionsGetOutput.Type;

// The operation
/**
 * Get a SchemaVersion
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 * @param schemaName - Schema name parameter.
 * @param schemaVersionName - Schema version name parameter.
 */
export const SchemaVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SchemaVersionsGetInput,
  outputSchema: SchemaVersionsGetOutput,
}));
// Input Schema
export const SchemaVersionsListBySchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaRegistryName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions",
    }),
  );
export type SchemaVersionsListBySchemaInput =
  typeof SchemaVersionsListBySchemaInput.Type;

// Output Schema
export const SchemaVersionsListBySchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SchemaVersionsListBySchemaOutput =
  typeof SchemaVersionsListBySchemaOutput.Type;

// The operation
/**
 * List SchemaVersion resources by Schema
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param schemaRegistryName - Schema registry name parameter.
 * @param schemaName - Schema name parameter.
 */
export const SchemaVersionsListBySchema = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SchemaVersionsListBySchemaInput,
    outputSchema: SchemaVersionsListBySchemaOutput,
  }),
);
