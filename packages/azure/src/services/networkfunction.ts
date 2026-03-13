/**
 * Azure Networkfunction API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AzureTrafficCollectorsByResourceGroupListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors",
    }),
  );
export type AzureTrafficCollectorsByResourceGroupListInput =
  typeof AzureTrafficCollectorsByResourceGroupListInput.Type;

// Output Schema
export const AzureTrafficCollectorsByResourceGroupListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureTrafficCollectorsByResourceGroupListOutput =
  typeof AzureTrafficCollectorsByResourceGroupListOutput.Type;

// The operation
/**
 * Return list of Azure Traffic Collectors in a Resource Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AzureTrafficCollectorsByResourceGroupList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureTrafficCollectorsByResourceGroupListInput,
    outputSchema: AzureTrafficCollectorsByResourceGroupListOutput,
  }));
// Input Schema
export const AzureTrafficCollectorsBySubscriptionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkFunction/azureTrafficCollectors",
    }),
  );
export type AzureTrafficCollectorsBySubscriptionListInput =
  typeof AzureTrafficCollectorsBySubscriptionListInput.Type;

// Output Schema
export const AzureTrafficCollectorsBySubscriptionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureTrafficCollectorsBySubscriptionListOutput =
  typeof AzureTrafficCollectorsBySubscriptionListOutput.Type;

// The operation
/**
 * Return list of Azure Traffic Collectors in a subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AzureTrafficCollectorsBySubscriptionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureTrafficCollectorsBySubscriptionListInput,
    outputSchema: AzureTrafficCollectorsBySubscriptionListOutput,
  }));
// Input Schema
export const AzureTrafficCollectorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureTrafficCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}",
    }),
  );
export type AzureTrafficCollectorsCreateOrUpdateInput =
  typeof AzureTrafficCollectorsCreateOrUpdateInput.Type;

// Output Schema
export const AzureTrafficCollectorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AzureTrafficCollectorsCreateOrUpdateOutput =
  typeof AzureTrafficCollectorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Azure Traffic Collector resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureTrafficCollectorName - Azure Traffic Collector name
 */
export const AzureTrafficCollectorsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureTrafficCollectorsCreateOrUpdateInput,
    outputSchema: AzureTrafficCollectorsCreateOrUpdateOutput,
  }));
// Input Schema
export const AzureTrafficCollectorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureTrafficCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}",
    }),
  );
export type AzureTrafficCollectorsDeleteInput =
  typeof AzureTrafficCollectorsDeleteInput.Type;

// Output Schema
export const AzureTrafficCollectorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AzureTrafficCollectorsDeleteOutput =
  typeof AzureTrafficCollectorsDeleteOutput.Type;

// The operation
/**
 * Deletes a specified Azure Traffic Collector resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureTrafficCollectorName - Azure Traffic Collector name
 */
export const AzureTrafficCollectorsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureTrafficCollectorsDeleteInput,
    outputSchema: AzureTrafficCollectorsDeleteOutput,
  }));
// Input Schema
export const AzureTrafficCollectorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureTrafficCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}",
    }),
  );
export type AzureTrafficCollectorsGetInput =
  typeof AzureTrafficCollectorsGetInput.Type;

// Output Schema
export const AzureTrafficCollectorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AzureTrafficCollectorsGetOutput =
  typeof AzureTrafficCollectorsGetOutput.Type;

// The operation
/**
 * Gets the specified Azure Traffic Collector in a specified resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureTrafficCollectorName - Azure Traffic Collector name
 */
export const AzureTrafficCollectorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AzureTrafficCollectorsGetInput,
    outputSchema: AzureTrafficCollectorsGetOutput,
  }),
);
// Input Schema
export const AzureTrafficCollectorsUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureTrafficCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}",
    }),
  );
export type AzureTrafficCollectorsUpdateTagsInput =
  typeof AzureTrafficCollectorsUpdateTagsInput.Type;

// Output Schema
export const AzureTrafficCollectorsUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AzureTrafficCollectorsUpdateTagsOutput =
  typeof AzureTrafficCollectorsUpdateTagsOutput.Type;

// The operation
/**
 * Updates the specified Azure Traffic Collector tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureTrafficCollectorName - Azure Traffic Collector name
 */
export const AzureTrafficCollectorsUpdateTags =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureTrafficCollectorsUpdateTagsInput,
    outputSchema: AzureTrafficCollectorsUpdateTagsOutput,
  }));
// Input Schema
export const CollectorPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureTrafficCollectorName: Schema.String.pipe(T.PathParam()),
    collectorPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies/{collectorPolicyName}",
    }),
  );
export type CollectorPoliciesCreateOrUpdateInput =
  typeof CollectorPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const CollectorPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CollectorPoliciesCreateOrUpdateOutput =
  typeof CollectorPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Collector Policy resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureTrafficCollectorName - Azure Traffic Collector name
 * @param collectorPolicyName - Collector Policy Name
 */
export const CollectorPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CollectorPoliciesCreateOrUpdateInput,
    outputSchema: CollectorPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const CollectorPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureTrafficCollectorName: Schema.String.pipe(T.PathParam()),
    collectorPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies/{collectorPolicyName}",
    }),
  );
export type CollectorPoliciesDeleteInput =
  typeof CollectorPoliciesDeleteInput.Type;

// Output Schema
export const CollectorPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CollectorPoliciesDeleteOutput =
  typeof CollectorPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes a specified Collector Policy resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureTrafficCollectorName - Azure Traffic Collector name
 * @param collectorPolicyName - Collector Policy Name
 */
export const CollectorPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CollectorPoliciesDeleteInput,
    outputSchema: CollectorPoliciesDeleteOutput,
  }),
);
// Input Schema
export const CollectorPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureTrafficCollectorName: Schema.String.pipe(T.PathParam()),
    collectorPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies/{collectorPolicyName}",
    }),
  );
export type CollectorPoliciesGetInput = typeof CollectorPoliciesGetInput.Type;

// Output Schema
export const CollectorPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CollectorPoliciesGetOutput = typeof CollectorPoliciesGetOutput.Type;

// The operation
/**
 * Gets the collector policy in a specified Traffic Collector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureTrafficCollectorName - Azure Traffic Collector name
 * @param collectorPolicyName - Collector Policy Name
 */
export const CollectorPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CollectorPoliciesGetInput,
    outputSchema: CollectorPoliciesGetOutput,
  }),
);
// Input Schema
export const CollectorPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureTrafficCollectorName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies",
    }),
  );
export type CollectorPoliciesListInput = typeof CollectorPoliciesListInput.Type;

// Output Schema
export const CollectorPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CollectorPoliciesListOutput =
  typeof CollectorPoliciesListOutput.Type;

// The operation
/**
 * Return list of Collector policies in a Azure Traffic Collector
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureTrafficCollectorName - Azure Traffic Collector name
 */
export const CollectorPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CollectorPoliciesListInput,
    outputSchema: CollectorPoliciesListOutput,
  }),
);
// Input Schema
export const CollectorPoliciesUpdateTagsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    azureTrafficCollectorName: Schema.String.pipe(T.PathParam()),
    collectorPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}/collectorPolicies/{collectorPolicyName}",
    }),
  );
export type CollectorPoliciesUpdateTagsInput =
  typeof CollectorPoliciesUpdateTagsInput.Type;

// Output Schema
export const CollectorPoliciesUpdateTagsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CollectorPoliciesUpdateTagsOutput =
  typeof CollectorPoliciesUpdateTagsOutput.Type;

// The operation
/**
 * Updates the specified Collector Policy tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param azureTrafficCollectorName - Azure Traffic Collector name
 * @param collectorPolicyName - Collector Policy Name
 */
export const CollectorPoliciesUpdateTags = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CollectorPoliciesUpdateTagsInput,
    outputSchema: CollectorPoliciesUpdateTagsOutput,
  }),
);
// Input Schema
export const NetworkFunctionListOperationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.NetworkFunction/operations",
    }),
  );
export type NetworkFunctionListOperationsInput =
  typeof NetworkFunctionListOperationsInput.Type;

// Output Schema
export const NetworkFunctionListOperationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        isDataAction: Schema.optional(Schema.Boolean),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
        origin: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFunctionListOperationsOutput =
  typeof NetworkFunctionListOperationsOutput.Type;

// The operation
/**
 * Lists all of the available NetworkFunction Rest API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFunctionListOperations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFunctionListOperationsInput,
    outputSchema: NetworkFunctionListOperationsOutput,
  }));
