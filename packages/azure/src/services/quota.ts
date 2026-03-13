/**
 * Azure Quota API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const GroupQuotaLimitsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/groupQuotaLimits/{location}",
    }),
  );
export type GroupQuotaLimitsListInput = typeof GroupQuotaLimitsListInput.Type;

// Output Schema
export const GroupQuotaLimitsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaLimitsListOutput = typeof GroupQuotaLimitsListOutput.Type;

// The operation
/**
 * Gets the GroupQuotaLimits for the specified resource provider and location for resource names passed in $filter=resourceName eq {SKU}.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param location - The name of the Azure region.
 */
export const GroupQuotaLimitsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroupQuotaLimitsListInput,
    outputSchema: GroupQuotaLimitsListOutput,
  }),
);
// Input Schema
export const GroupQuotaLimitsRequestGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    requestId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/groupQuotaRequests/{requestId}",
    }),
  );
export type GroupQuotaLimitsRequestGetInput =
  typeof GroupQuotaLimitsRequestGetInput.Type;

// Output Schema
export const GroupQuotaLimitsRequestGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaLimitsRequestGetOutput =
  typeof GroupQuotaLimitsRequestGetOutput.Type;

// The operation
/**
 * Get API to check the status of a GroupQuota request by requestId.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param requestId - Request Id.
 */
export const GroupQuotaLimitsRequestGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroupQuotaLimitsRequestGetInput,
    outputSchema: GroupQuotaLimitsRequestGetOutput,
  }),
);
// Input Schema
export const GroupQuotaLimitsRequestListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/groupQuotaRequests",
    }),
  );
export type GroupQuotaLimitsRequestListInput =
  typeof GroupQuotaLimitsRequestListInput.Type;

// Output Schema
export const GroupQuotaLimitsRequestListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GroupQuotaLimitsRequestListOutput =
  typeof GroupQuotaLimitsRequestListOutput.Type;

// The operation
/**
 * Get API to check the status of a GroupQuota request by requestId.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param $filter - | Field | Supported operators  \\r\\n|---------------------|------------------------\\n\\r\\n location eq {location} and resource eq {resourceName}\\n Example: $filter=location eq eastus and resourceName eq cores
 */
export const GroupQuotaLimitsRequestList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroupQuotaLimitsRequestListInput,
    outputSchema: GroupQuotaLimitsRequestListOutput,
  }),
);
// Input Schema
export const GroupQuotaLimitsRequestUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/groupQuotaLimits/{location}",
    }),
  );
export type GroupQuotaLimitsRequestUpdateInput =
  typeof GroupQuotaLimitsRequestUpdateInput.Type;

// Output Schema
export const GroupQuotaLimitsRequestUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaLimitsRequestUpdateOutput =
  typeof GroupQuotaLimitsRequestUpdateOutput.Type;

// The operation
/**
 * Create the GroupQuota requests for a specific ResourceProvider/Location/Resource. The resourceName properties are specified in the request body. Only 1 resource quota can be requested. Please note that patch request creates a new groupQuota request.
 * Use the polling API - OperationsStatus URI specified in Azure-AsyncOperation header field, with retry-after duration in seconds to check the intermediate status. This API provides the finals status with the request details and status.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param location - The name of the Azure region.
 */
export const GroupQuotaLimitsRequestUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaLimitsRequestUpdateInput,
    outputSchema: GroupQuotaLimitsRequestUpdateOutput,
  }));
// Input Schema
export const GroupQuotaLocationSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationSettings/{location}",
    }),
  );
export type GroupQuotaLocationSettingsCreateOrUpdateInput =
  typeof GroupQuotaLocationSettingsCreateOrUpdateInput.Type;

// Output Schema
export const GroupQuotaLocationSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaLocationSettingsCreateOrUpdateOutput =
  typeof GroupQuotaLocationSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Enables the GroupQuotas enforcement for the resource provider and the location specified. The resource provider will start using the group quotas as the overall quota for the subscriptions included in the GroupQuota. The subscriptions cannot request quota at subscription level since it is now part of an enforced group.
 * The subscriptions share the GroupQuotaLimits assigned to the GroupQuota. If the GroupQuotaLimits is used, then submit a groupQuotaLimit request for the specific resource - provider/location/resource.
 * Once the GroupQuota Enforcement is enabled then, it cannot be deleted or reverted back. To disable GroupQuota Enforcement -
 * 1. Remove all the subscriptions from the groupQuota using the delete API for Subscriptions (Check the example - GroupQuotaSubscriptions_Delete).
 * 2. Then delete the GroupQuota (Check the example - GroupQuotas_Delete).
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param location - The name of the Azure region.
 */
export const GroupQuotaLocationSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaLocationSettingsCreateOrUpdateInput,
    outputSchema: GroupQuotaLocationSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const GroupQuotaLocationSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationSettings/{location}",
    }),
  );
export type GroupQuotaLocationSettingsGetInput =
  typeof GroupQuotaLocationSettingsGetInput.Type;

// Output Schema
export const GroupQuotaLocationSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaLocationSettingsGetOutput =
  typeof GroupQuotaLocationSettingsGetOutput.Type;

// The operation
/**
 * Gets the GroupQuotas enforcement settings for the ResourceProvider/location. The locations, where GroupQuota enforcement is not enabled will return Not Found.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param location - The name of the Azure region.
 */
export const GroupQuotaLocationSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaLocationSettingsGetInput,
    outputSchema: GroupQuotaLocationSettingsGetOutput,
  }));
// Input Schema
export const GroupQuotaLocationSettingsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationSettings/{location}",
    }),
  );
export type GroupQuotaLocationSettingsUpdateInput =
  typeof GroupQuotaLocationSettingsUpdateInput.Type;

// Output Schema
export const GroupQuotaLocationSettingsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaLocationSettingsUpdateOutput =
  typeof GroupQuotaLocationSettingsUpdateOutput.Type;

// The operation
/**
 * Enables the GroupQuotas enforcement for the resource provider and the location specified. The resource provider will start using the group quotas as the overall quota for the subscriptions included in the GroupQuota.  The subscriptions cannot request quota at subscription level since it is now part of an enforced group.
 * The subscriptions share the GroupQuotaLimits assigned to the GroupQuota. If the GroupQuotaLimits is used, then submit a groupQuotaLimit request for the specific resource - provider/location/resource.
 * Once the GroupQuota Enforcement is enabled then, it cannot be deleted or reverted back. To disable GroupQuota Enforcement -
 * 1. Remove all the subscriptions from the groupQuota using the delete API for Subscriptions (Check the example - GroupQuotaSubscriptions_Delete).
 * 2. Ten delete the GroupQuota (Check the example - GroupQuotas_Delete).
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param location - The name of the Azure region.
 */
export const GroupQuotaLocationSettingsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaLocationSettingsUpdateInput,
    outputSchema: GroupQuotaLocationSettingsUpdateOutput,
  }));
// Input Schema
export const GroupQuotasCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}",
    }),
  );
export type GroupQuotasCreateOrUpdateInput =
  typeof GroupQuotasCreateOrUpdateInput.Type;

// Output Schema
export const GroupQuotasCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotasCreateOrUpdateOutput =
  typeof GroupQuotasCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new GroupQuota for the name passed. A RequestId will be returned by the Service. The status can be polled periodically. The status Async polling is using standards defined at - https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/async-api-reference.md#asynchronous-operations. Use the OperationsStatus URI provided in Azure-AsyncOperation header, the duration will be specified in retry-after header. Once the operation gets to terminal state - Succeeded | Failed, then the URI will change to Get URI and full details can be checked.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 */
export const GroupQuotasCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroupQuotasCreateOrUpdateInput,
    outputSchema: GroupQuotasCreateOrUpdateOutput,
  }),
);
// Input Schema
export const GroupQuotasDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}",
  }),
);
export type GroupQuotasDeleteInput = typeof GroupQuotasDeleteInput.Type;

// Output Schema
export const GroupQuotasDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GroupQuotasDeleteOutput = typeof GroupQuotasDeleteOutput.Type;

// The operation
/**
 * Deletes the GroupQuotas for the name passed. All the remaining shareQuota in the GroupQuotas will be lost.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 */
export const GroupQuotasDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GroupQuotasDeleteInput,
  outputSchema: GroupQuotasDeleteOutput,
}));
// Input Schema
export const GroupQuotasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  managementGroupId: Schema.String.pipe(T.PathParam()),
  groupQuotaName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}",
  }),
);
export type GroupQuotasGetInput = typeof GroupQuotasGetInput.Type;

// Output Schema
export const GroupQuotasGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type GroupQuotasGetOutput = typeof GroupQuotasGetOutput.Type;

// The operation
/**
 * Gets the GroupQuotas for the name passed. It will return the GroupQuotas properties only. The details on group quota can be access from the group quota APIs.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 */
export const GroupQuotasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GroupQuotasGetInput,
  outputSchema: GroupQuotasGetOutput,
}));
// Input Schema
export const GroupQuotasListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  managementGroupId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas",
  }),
);
export type GroupQuotasListInput = typeof GroupQuotasListInput.Type;

// Output Schema
export const GroupQuotasListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type GroupQuotasListOutput = typeof GroupQuotasListOutput.Type;

// The operation
/**
 * Lists GroupQuotas for the scope passed. It will return the GroupQuotas QuotaEntity properties only.The details on group quota can be access from the group quota APIs.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 */
export const GroupQuotasList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GroupQuotasListInput,
  outputSchema: GroupQuotasListOutput,
}));
// Input Schema
export const GroupQuotaSubscriptionAllocationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocations/{location}",
    }),
  );
export type GroupQuotaSubscriptionAllocationListInput =
  typeof GroupQuotaSubscriptionAllocationListInput.Type;

// Output Schema
export const GroupQuotaSubscriptionAllocationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaSubscriptionAllocationListOutput =
  typeof GroupQuotaSubscriptionAllocationListOutput.Type;

// The operation
/**
 * Gets all the quota allocated to a subscription for the specified resource provider and location for resource names passed in $filter=resourceName eq {SKU}. This will include the GroupQuota and total quota allocated to the subscription. Only the Group quota allocated to the subscription can be allocated back to the MG Group Quota.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param location - The name of the Azure region.
 */
export const GroupQuotaSubscriptionAllocationList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaSubscriptionAllocationListInput,
    outputSchema: GroupQuotaSubscriptionAllocationListOutput,
  }));
// Input Schema
export const GroupQuotaSubscriptionAllocationRequestGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    allocationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocationRequests/{allocationId}",
    }),
  );
export type GroupQuotaSubscriptionAllocationRequestGetInput =
  typeof GroupQuotaSubscriptionAllocationRequestGetInput.Type;

// Output Schema
export const GroupQuotaSubscriptionAllocationRequestGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaSubscriptionAllocationRequestGetOutput =
  typeof GroupQuotaSubscriptionAllocationRequestGetOutput.Type;

// The operation
/**
 * Get the quota allocation request status for the subscriptionId by allocationId.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param allocationId - Request Id.
 */
export const GroupQuotaSubscriptionAllocationRequestGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaSubscriptionAllocationRequestGetInput,
    outputSchema: GroupQuotaSubscriptionAllocationRequestGetOutput,
  }));
// Input Schema
export const GroupQuotaSubscriptionAllocationRequestListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocationRequests",
    }),
  );
export type GroupQuotaSubscriptionAllocationRequestListInput =
  typeof GroupQuotaSubscriptionAllocationRequestListInput.Type;

// Output Schema
export const GroupQuotaSubscriptionAllocationRequestListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GroupQuotaSubscriptionAllocationRequestListOutput =
  typeof GroupQuotaSubscriptionAllocationRequestListOutput.Type;

// The operation
/**
 * Get all the quotaAllocationRequests for a resourceProvider/location. The filter paramter for location is required.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param $filter - | Field | Supported operators
|---------------------|------------------------

location eq {location}
Example: $filter=location eq eastus
 */
export const GroupQuotaSubscriptionAllocationRequestList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaSubscriptionAllocationRequestListInput,
    outputSchema: GroupQuotaSubscriptionAllocationRequestListOutput,
  }));
// Input Schema
export const GroupQuotaSubscriptionAllocationRequestUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/subscriptions/{subscriptionId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/quotaAllocations/{location}",
    }),
  );
export type GroupQuotaSubscriptionAllocationRequestUpdateInput =
  typeof GroupQuotaSubscriptionAllocationRequestUpdateInput.Type;

// Output Schema
export const GroupQuotaSubscriptionAllocationRequestUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaSubscriptionAllocationRequestUpdateOutput =
  typeof GroupQuotaSubscriptionAllocationRequestUpdateOutput.Type;

// The operation
/**
 * Request to assign quota from group quota to a specific Subscription. The assign GroupQuota to subscriptions or reduce the quota allocated to subscription to give back the unused quota ( quota >= usages) to the groupQuota. So, this API can be used to assign Quota to subscriptions and assign back unused quota to group quota, which can be assigned to another subscriptions in the GroupQuota. User can collect unused quotas from multiple subscriptions within the groupQuota and assign the groupQuota to the subscription, where it's needed.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param location - The name of the Azure region.
 */
export const GroupQuotaSubscriptionAllocationRequestUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaSubscriptionAllocationRequestUpdateInput,
    outputSchema: GroupQuotaSubscriptionAllocationRequestUpdateOutput,
  }));
// Input Schema
export const GroupQuotaSubscriptionRequestsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    requestId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptionRequests/{requestId}",
    }),
  );
export type GroupQuotaSubscriptionRequestsGetInput =
  typeof GroupQuotaSubscriptionRequestsGetInput.Type;

// Output Schema
export const GroupQuotaSubscriptionRequestsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaSubscriptionRequestsGetOutput =
  typeof GroupQuotaSubscriptionRequestsGetOutput.Type;

// The operation
/**
 * Get API to check the status of a subscriptionIds request by requestId.  Use the polling API - OperationsStatus URI specified in Azure-AsyncOperation header field, with retry-after duration in seconds to check the intermediate status. This API provides the finals status with the request details and status.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param requestId - Request Id.
 */
export const GroupQuotaSubscriptionRequestsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaSubscriptionRequestsGetInput,
    outputSchema: GroupQuotaSubscriptionRequestsGetOutput,
  }));
// Input Schema
export const GroupQuotaSubscriptionRequestsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptionRequests",
    }),
  );
export type GroupQuotaSubscriptionRequestsListInput =
  typeof GroupQuotaSubscriptionRequestsListInput.Type;

// Output Schema
export const GroupQuotaSubscriptionRequestsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GroupQuotaSubscriptionRequestsListOutput =
  typeof GroupQuotaSubscriptionRequestsListOutput.Type;

// The operation
/**
 * List API to check the status of a subscriptionId requests by requestId. Request history is maintained for 1 year.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 */
export const GroupQuotaSubscriptionRequestsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaSubscriptionRequestsListInput,
    outputSchema: GroupQuotaSubscriptionRequestsListOutput,
  }));
// Input Schema
export const GroupQuotaSubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptions/{subscriptionId}",
    }),
  );
export type GroupQuotaSubscriptionsCreateOrUpdateInput =
  typeof GroupQuotaSubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const GroupQuotaSubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaSubscriptionsCreateOrUpdateOutput =
  typeof GroupQuotaSubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Adds a subscription to GroupQuotas. The subscriptions will be validated based on the additionalAttributes defined in the GroupQuota. The additionalAttributes works as filter for the subscriptions, which can be included in the GroupQuotas. The request's TenantId is validated against the subscription's TenantId.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - Management Group Id.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const GroupQuotaSubscriptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaSubscriptionsCreateOrUpdateInput,
    outputSchema: GroupQuotaSubscriptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const GroupQuotaSubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptions/{subscriptionId}",
    }),
  );
export type GroupQuotaSubscriptionsDeleteInput =
  typeof GroupQuotaSubscriptionsDeleteInput.Type;

// Output Schema
export const GroupQuotaSubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GroupQuotaSubscriptionsDeleteOutput =
  typeof GroupQuotaSubscriptionsDeleteOutput.Type;

// The operation
/**
 * Removes the subscription from GroupQuotas. The request's TenantId is validated against the subscription's TenantId.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const GroupQuotaSubscriptionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaSubscriptionsDeleteInput,
    outputSchema: GroupQuotaSubscriptionsDeleteOutput,
  }));
// Input Schema
export const GroupQuotaSubscriptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptions/{subscriptionId}",
    }),
  );
export type GroupQuotaSubscriptionsGetInput =
  typeof GroupQuotaSubscriptionsGetInput.Type;

// Output Schema
export const GroupQuotaSubscriptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaSubscriptionsGetOutput =
  typeof GroupQuotaSubscriptionsGetOutput.Type;

// The operation
/**
 * Returns the subscriptionIds along with its provisioning state for being associated with the GroupQuota. If the subscription is not a member of GroupQuota, it will return 404, else 200.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const GroupQuotaSubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroupQuotaSubscriptionsGetInput,
    outputSchema: GroupQuotaSubscriptionsGetOutput,
  }),
);
// Input Schema
export const GroupQuotaSubscriptionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptions",
    }),
  );
export type GroupQuotaSubscriptionsListInput =
  typeof GroupQuotaSubscriptionsListInput.Type;

// Output Schema
export const GroupQuotaSubscriptionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GroupQuotaSubscriptionsListOutput =
  typeof GroupQuotaSubscriptionsListOutput.Type;

// The operation
/**
 * Returns a list of the subscriptionIds associated with the GroupQuotas.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 */
export const GroupQuotaSubscriptionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroupQuotaSubscriptionsListInput,
    outputSchema: GroupQuotaSubscriptionsListOutput,
  }),
);
// Input Schema
export const GroupQuotaSubscriptionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/subscriptions/{subscriptionId}",
    }),
  );
export type GroupQuotaSubscriptionsUpdateInput =
  typeof GroupQuotaSubscriptionsUpdateInput.Type;

// Output Schema
export const GroupQuotaSubscriptionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotaSubscriptionsUpdateOutput =
  typeof GroupQuotaSubscriptionsUpdateOutput.Type;

// The operation
/**
 * Updates the GroupQuotas with the subscription to add to the subscriptions list. The subscriptions will be validated if additionalAttributes are defined in the GroupQuota. The request's TenantId is validated against the subscription's TenantId.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - Management Group Id.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const GroupQuotaSubscriptionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GroupQuotaSubscriptionsUpdateInput,
    outputSchema: GroupQuotaSubscriptionsUpdateOutput,
  }));
// Input Schema
export const GroupQuotasUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}",
  }),
);
export type GroupQuotasUpdateInput = typeof GroupQuotasUpdateInput.Type;

// Output Schema
export const GroupQuotasUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GroupQuotasUpdateOutput = typeof GroupQuotasUpdateOutput.Type;

// The operation
/**
 * Updates the GroupQuotas for the name passed. A GroupQuotas RequestId will be returned by the Service. The status can be polled periodically. The status Async polling is using standards defined at - https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/async-api-reference.md#asynchronous-operations. Use the OperationsStatus URI provided in Azure-AsyncOperation header, the duration will be specified in retry-after header. Once the operation gets to terminal state - Succeeded | Failed, then the URI will change to Get URI and full details can be checked.
 * Any change in the filters will be applicable to the future quota assignments, existing quota allocated to subscriptions from the GroupQuotas remains unchanged.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 */
export const GroupQuotasUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GroupQuotasUpdateInput,
  outputSchema: GroupQuotasUpdateOutput,
}));
// Input Schema
export const GroupQuotaUsagesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    managementGroupId: Schema.String.pipe(T.PathParam()),
    groupQuotaName: Schema.String.pipe(T.PathParam()),
    resourceProviderName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Quota/groupQuotas/{groupQuotaName}/resourceProviders/{resourceProviderName}/locationUsages/{location}",
    }),
  );
export type GroupQuotaUsagesListInput = typeof GroupQuotaUsagesListInput.Type;

// Output Schema
export const GroupQuotaUsagesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type GroupQuotaUsagesListOutput = typeof GroupQuotaUsagesListOutput.Type;

// The operation
/**
 * Gets the GroupQuotas usages and limits(quota). Location is required paramter.
 *
 * @param api-version - The API version to use for this operation.
 * @param managementGroupId - The management group ID.
 * @param groupQuotaName - The GroupQuota name. The name should be unique for the provided context tenantId/MgId.
 * @param resourceProviderName - The resource provider name, such as - Microsoft.Compute. Currently only Microsoft.Compute resource provider supports this API.
 * @param location - The name of the Azure region.
 */
export const GroupQuotaUsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GroupQuotaUsagesListInput,
    outputSchema: GroupQuotaUsagesListOutput,
  }),
);
// Input Schema
export const QuotaCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.Quota/quotas/{resourceName}",
    }),
  );
export type QuotaCreateOrUpdateInput = typeof QuotaCreateOrUpdateInput.Type;

// Output Schema
export const QuotaCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QuotaCreateOrUpdateOutput = typeof QuotaCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the quota limit for the specified resource with the requested value. To update the quota, follow these steps:
 * 1. Use the GET operation for quotas and usages to determine how much quota remains for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param resourceName - Resource name for a given resource provider. For example:
- SKU name for Microsoft.Compute
- SKU or TotalLowPriorityCores for Microsoft.MachineLearningServices
 For Microsoft.Network PublicIPAddresses.
 */
export const QuotaCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotaCreateOrUpdateInput,
  outputSchema: QuotaCreateOrUpdateOutput,
}));
// Input Schema
export const QuotaGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.Quota/quotas/{resourceName}",
  }),
);
export type QuotaGetInput = typeof QuotaGetInput.Type;

// Output Schema
export const QuotaGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QuotaGetOutput = typeof QuotaGetOutput.Type;

// The operation
/**
 * Get the quota limit of a resource. The response can be used to determine the remaining quota to calculate a new quota limit that can be submitted with a PUT request.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param resourceName - Resource name for a given resource provider. For example:
- SKU name for Microsoft.Compute
- SKU or TotalLowPriorityCores for Microsoft.MachineLearningServices
 For Microsoft.Network PublicIPAddresses.
 */
export const QuotaGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotaGetInput,
  outputSchema: QuotaGetOutput,
}));
// Input Schema
export const QuotaListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/{scope}/providers/Microsoft.Quota/quotas" }),
);
export type QuotaListInput = typeof QuotaListInput.Type;

// Output Schema
export const QuotaListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type QuotaListOutput = typeof QuotaListOutput.Type;

// The operation
/**
 * Get a list of current quota limits of all resources for the specified scope. The response from this GET operation can be leveraged to submit requests to update a quota.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 */
export const QuotaList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotaListInput,
  outputSchema: QuotaListOutput,
}));
// Input Schema
export const QuotaOperationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({ method: "GET", path: "/providers/Microsoft.Quota/operations" }),
  );
export type QuotaOperationListInput = typeof QuotaOperationListInput.Type;

// Output Schema
export const QuotaOperationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
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
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type QuotaOperationListOutput = typeof QuotaOperationListOutput.Type;

// The operation
/**
 * List the operations for the provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const QuotaOperationList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotaOperationListInput,
  outputSchema: QuotaOperationListOutput,
}));
// Input Schema
export const QuotaRequestStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Quota/quotaRequests/{id}",
    }),
  );
export type QuotaRequestStatusGetInput = typeof QuotaRequestStatusGetInput.Type;

// Output Schema
export const QuotaRequestStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QuotaRequestStatusGetOutput =
  typeof QuotaRequestStatusGetOutput.Type;

// The operation
/**
 * Get the quota request details and status by quota request ID for the resources of the resource provider at a specific location. The quota request ID **id** is returned in the response of the PUT operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param id - Quota request ID.
 */
export const QuotaRequestStatusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QuotaRequestStatusGetInput,
    outputSchema: QuotaRequestStatusGetOutput,
  }),
);
// Input Schema
export const QuotaRequestStatusListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skiptoken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.Quota/quotaRequests",
    }),
  );
export type QuotaRequestStatusListInput =
  typeof QuotaRequestStatusListInput.Type;

// Output Schema
export const QuotaRequestStatusListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type QuotaRequestStatusListOutput =
  typeof QuotaRequestStatusListOutput.Type;

// The operation
/**
 * For the specified scope, get the current quota requests for a one year period ending at the time is made. Use the **oData** filter to select quota requests.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param $filter - | Field                    | Supported operators
|---------------------|------------------------

|requestSubmitTime | ge, le, eq, gt, lt
|provisioningState eq {QuotaRequestState}
|resourceName eq {resourceName}
 * @param $top - Number of records to return.
 * @param $skiptoken - The **Skiptoken** parameter is used only if a previous operation returned a partial result. If a previous response contains a **nextLink** element, its value includes a **skiptoken** parameter that specifies a starting point to use for subsequent calls.
 */
export const QuotaRequestStatusList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QuotaRequestStatusListInput,
    outputSchema: QuotaRequestStatusListOutput,
  }),
);
// Input Schema
export const QuotaUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/{scope}/providers/Microsoft.Quota/quotas/{resourceName}",
  }),
);
export type QuotaUpdateInput = typeof QuotaUpdateInput.Type;

// Output Schema
export const QuotaUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QuotaUpdateOutput = typeof QuotaUpdateOutput.Type;

// The operation
/**
 * Update the quota limit for a specific resource to the specified value:
 * 1. Use the Usages-GET and Quota-GET operations to determine the remaining quota for the specific resource and to calculate the new quota limit. These steps are detailed in [this example](https://techcommunity.microsoft.com/t5/azure-governance-and-management/using-the-new-quota-rest-api/ba-p/2183670).
 * 2. Use this PUT operation to update the quota limit. Please check the URI in location header for the detailed status of the request.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param resourceName - Resource name for a given resource provider. For example:
- SKU name for Microsoft.Compute
- SKU or TotalLowPriorityCores for Microsoft.MachineLearningServices
 For Microsoft.Network PublicIPAddresses.
 */
export const QuotaUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotaUpdateInput,
  outputSchema: QuotaUpdateOutput,
}));
// Input Schema
export const UsagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  resourceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.Quota/usages/{resourceName}",
  }),
);
export type UsagesGetInput = typeof UsagesGetInput.Type;

// Output Schema
export const UsagesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type UsagesGetOutput = typeof UsagesGetOutput.Type;

// The operation
/**
 * Get the current usage of a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param resourceName - Resource name for a given resource provider. For example:
- SKU name for Microsoft.Compute
- SKU or TotalLowPriorityCores for Microsoft.MachineLearningServices
 For Microsoft.Network PublicIPAddresses.
 */
export const UsagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesGetInput,
  outputSchema: UsagesGetOutput,
}));
// Input Schema
export const UsagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/{scope}/providers/Microsoft.Quota/usages" }),
);
export type UsagesListInput = typeof UsagesListInput.Type;

// Output Schema
export const UsagesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type UsagesListOutput = typeof UsagesListOutput.Type;

// The operation
/**
 * Get a list of current usage for all resources for the scope specified.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 */
export const UsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesListInput,
  outputSchema: UsagesListOutput,
}));
