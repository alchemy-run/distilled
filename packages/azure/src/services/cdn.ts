/**
 * Azure Cdn API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AFDCustomDomainsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    customDomainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}",
    }),
  );
export type AFDCustomDomainsCreateInput =
  typeof AFDCustomDomainsCreateInput.Type;

// Output Schema
export const AFDCustomDomainsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AFDCustomDomainsCreateOutput =
  typeof AFDCustomDomainsCreateOutput.Type;

// The operation
/**
 * Creates a new domain within the specified profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param customDomainName - Name of the domain under the profile which is unique globally.
 */
export const AFDCustomDomainsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDCustomDomainsCreateInput,
    outputSchema: AFDCustomDomainsCreateOutput,
  }),
);
// Input Schema
export const AFDCustomDomainsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    customDomainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}",
    }),
  );
export type AFDCustomDomainsDeleteInput =
  typeof AFDCustomDomainsDeleteInput.Type;

// Output Schema
export const AFDCustomDomainsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AFDCustomDomainsDeleteOutput =
  typeof AFDCustomDomainsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param customDomainName - Name of the domain under the profile which is unique globally.
 */
export const AFDCustomDomainsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDCustomDomainsDeleteInput,
    outputSchema: AFDCustomDomainsDeleteOutput,
  }),
);
// Input Schema
export const AFDCustomDomainsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    customDomainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}",
    }),
  );
export type AFDCustomDomainsGetInput = typeof AFDCustomDomainsGetInput.Type;

// Output Schema
export const AFDCustomDomainsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AFDCustomDomainsGetOutput = typeof AFDCustomDomainsGetOutput.Type;

// The operation
/**
 * Gets an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param customDomainName - Name of the domain under the profile which is unique globally.
 */
export const AFDCustomDomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDCustomDomainsGetInput,
  outputSchema: AFDCustomDomainsGetOutput,
}));
// Input Schema
export const AFDCustomDomainsListByProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains",
    }),
  );
export type AFDCustomDomainsListByProfileInput =
  typeof AFDCustomDomainsListByProfileInput.Type;

// Output Schema
export const AFDCustomDomainsListByProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AFDCustomDomainsListByProfileOutput =
  typeof AFDCustomDomainsListByProfileOutput.Type;

// The operation
/**
 * Lists existing AzureFrontDoor domains.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const AFDCustomDomainsListByProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AFDCustomDomainsListByProfileInput,
    outputSchema: AFDCustomDomainsListByProfileOutput,
  }));
// Input Schema
export const AFDCustomDomainsRefreshValidationTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    customDomainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}/refreshValidationToken",
    }),
  );
export type AFDCustomDomainsRefreshValidationTokenInput =
  typeof AFDCustomDomainsRefreshValidationTokenInput.Type;

// Output Schema
export const AFDCustomDomainsRefreshValidationTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AFDCustomDomainsRefreshValidationTokenOutput =
  typeof AFDCustomDomainsRefreshValidationTokenOutput.Type;

// The operation
/**
 * Updates the domain validation token.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param customDomainName - Name of the domain under the profile which is unique globally.
 */
export const AFDCustomDomainsRefreshValidationToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AFDCustomDomainsRefreshValidationTokenInput,
    outputSchema: AFDCustomDomainsRefreshValidationTokenOutput,
  }));
// Input Schema
export const AFDCustomDomainsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    customDomainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}",
    }),
  );
export type AFDCustomDomainsUpdateInput =
  typeof AFDCustomDomainsUpdateInput.Type;

// Output Schema
export const AFDCustomDomainsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AFDCustomDomainsUpdateOutput =
  typeof AFDCustomDomainsUpdateOutput.Type;

// The operation
/**
 * Updates an existing domain within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param customDomainName - Name of the domain under the profile which is unique globally.
 */
export const AFDCustomDomainsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDCustomDomainsUpdateInput,
    outputSchema: AFDCustomDomainsUpdateOutput,
  }),
);
// Input Schema
export const AFDEndpointsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}",
    }),
  );
export type AFDEndpointsCreateInput = typeof AFDEndpointsCreateInput.Type;

// Output Schema
export const AFDEndpointsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AFDEndpointsCreateOutput = typeof AFDEndpointsCreateOutput.Type;

// The operation
/**
 * Creates a new AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const AFDEndpointsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDEndpointsCreateInput,
  outputSchema: AFDEndpointsCreateOutput,
}));
// Input Schema
export const AFDEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}",
    }),
  );
export type AFDEndpointsDeleteInput = typeof AFDEndpointsDeleteInput.Type;

// Output Schema
export const AFDEndpointsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AFDEndpointsDeleteOutput = typeof AFDEndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const AFDEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDEndpointsDeleteInput,
  outputSchema: AFDEndpointsDeleteOutput,
}));
// Input Schema
export const AFDEndpointsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}",
  }),
);
export type AFDEndpointsGetInput = typeof AFDEndpointsGetInput.Type;

// Output Schema
export const AFDEndpointsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AFDEndpointsGetOutput = typeof AFDEndpointsGetOutput.Type;

// The operation
/**
 * Gets an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const AFDEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDEndpointsGetInput,
  outputSchema: AFDEndpointsGetOutput,
}));
// Input Schema
export const AFDEndpointsListByProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints",
    }),
  );
export type AFDEndpointsListByProfileInput =
  typeof AFDEndpointsListByProfileInput.Type;

// Output Schema
export const AFDEndpointsListByProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AFDEndpointsListByProfileOutput =
  typeof AFDEndpointsListByProfileOutput.Type;

// The operation
/**
 * Lists existing AzureFrontDoor endpoints.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const AFDEndpointsListByProfile = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDEndpointsListByProfileInput,
    outputSchema: AFDEndpointsListByProfileOutput,
  }),
);
// Input Schema
export const AFDEndpointsListResourceUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/usages",
    }),
  );
export type AFDEndpointsListResourceUsageInput =
  typeof AFDEndpointsListResourceUsageInput.Type;

// Output Schema
export const AFDEndpointsListResourceUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        unit: Schema.Literals(["Count"]),
        currentValue: Schema.Number,
        limit: Schema.Number,
        name: Schema.Struct({
          value: Schema.optional(Schema.String),
          localizedValue: Schema.optional(Schema.String),
        }),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AFDEndpointsListResourceUsageOutput =
  typeof AFDEndpointsListResourceUsageOutput.Type;

// The operation
/**
 * Checks the quota and actual usage of endpoints under the given Azure Front Door profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const AFDEndpointsListResourceUsage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AFDEndpointsListResourceUsageInput,
    outputSchema: AFDEndpointsListResourceUsageOutput,
  }));
// Input Schema
export const AFDEndpointsPurgeContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/purge",
    }),
  );
export type AFDEndpointsPurgeContentInput =
  typeof AFDEndpointsPurgeContentInput.Type;

// Output Schema
export const AFDEndpointsPurgeContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AFDEndpointsPurgeContentOutput =
  typeof AFDEndpointsPurgeContentOutput.Type;

// The operation
/**
 * Removes a content from AzureFrontDoor.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const AFDEndpointsPurgeContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDEndpointsPurgeContentInput,
    outputSchema: AFDEndpointsPurgeContentOutput,
  }),
);
// Input Schema
export const AFDEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}",
    }),
  );
export type AFDEndpointsUpdateInput = typeof AFDEndpointsUpdateInput.Type;

// Output Schema
export const AFDEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AFDEndpointsUpdateOutput = typeof AFDEndpointsUpdateOutput.Type;

// The operation
/**
 * Updates an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile. Only tags can be updated after creating an endpoint. To update origins, use the Update Origin operation. To update origin groups, use the Update Origin group operation. To update domains, use the Update Custom Domain operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const AFDEndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDEndpointsUpdateInput,
  outputSchema: AFDEndpointsUpdateOutput,
}));
// Input Schema
export const AFDEndpointsValidateCustomDomainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/validateCustomDomain",
    }),
  );
export type AFDEndpointsValidateCustomDomainInput =
  typeof AFDEndpointsValidateCustomDomainInput.Type;

// Output Schema
export const AFDEndpointsValidateCustomDomainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customDomainValidated: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type AFDEndpointsValidateCustomDomainOutput =
  typeof AFDEndpointsValidateCustomDomainOutput.Type;

// The operation
/**
 * Validates the custom domain mapping to ensure it maps to the correct Azure Front Door endpoint in DNS.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const AFDEndpointsValidateCustomDomain =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AFDEndpointsValidateCustomDomainInput,
    outputSchema: AFDEndpointsValidateCustomDomainOutput,
  }));
// Input Schema
export const AFDOriginGroupsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    originGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}",
    }),
  );
export type AFDOriginGroupsCreateInput = typeof AFDOriginGroupsCreateInput.Type;

// Output Schema
export const AFDOriginGroupsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AFDOriginGroupsCreateOutput =
  typeof AFDOriginGroupsCreateOutput.Type;

// The operation
/**
 * Creates a new origin group within the specified profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const AFDOriginGroupsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDOriginGroupsCreateInput,
    outputSchema: AFDOriginGroupsCreateOutput,
  }),
);
// Input Schema
export const AFDOriginGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    originGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}",
    }),
  );
export type AFDOriginGroupsDeleteInput = typeof AFDOriginGroupsDeleteInput.Type;

// Output Schema
export const AFDOriginGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AFDOriginGroupsDeleteOutput =
  typeof AFDOriginGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing origin group within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const AFDOriginGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDOriginGroupsDeleteInput,
    outputSchema: AFDOriginGroupsDeleteOutput,
  }),
);
// Input Schema
export const AFDOriginGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    originGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}",
    }),
  );
export type AFDOriginGroupsGetInput = typeof AFDOriginGroupsGetInput.Type;

// Output Schema
export const AFDOriginGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AFDOriginGroupsGetOutput = typeof AFDOriginGroupsGetOutput.Type;

// The operation
/**
 * Gets an existing origin group within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const AFDOriginGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDOriginGroupsGetInput,
  outputSchema: AFDOriginGroupsGetOutput,
}));
// Input Schema
export const AFDOriginGroupsListByProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups",
    }),
  );
export type AFDOriginGroupsListByProfileInput =
  typeof AFDOriginGroupsListByProfileInput.Type;

// Output Schema
export const AFDOriginGroupsListByProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AFDOriginGroupsListByProfileOutput =
  typeof AFDOriginGroupsListByProfileOutput.Type;

// The operation
/**
 * Lists all of the existing origin groups within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const AFDOriginGroupsListByProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AFDOriginGroupsListByProfileInput,
    outputSchema: AFDOriginGroupsListByProfileOutput,
  }));
// Input Schema
export const AFDOriginGroupsListResourceUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    originGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/usages",
    }),
  );
export type AFDOriginGroupsListResourceUsageInput =
  typeof AFDOriginGroupsListResourceUsageInput.Type;

// Output Schema
export const AFDOriginGroupsListResourceUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        unit: Schema.Literals(["Count"]),
        currentValue: Schema.Number,
        limit: Schema.Number,
        name: Schema.Struct({
          value: Schema.optional(Schema.String),
          localizedValue: Schema.optional(Schema.String),
        }),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AFDOriginGroupsListResourceUsageOutput =
  typeof AFDOriginGroupsListResourceUsageOutput.Type;

// The operation
/**
 * Checks the quota and actual usage of endpoints under the given Azure Front Door profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const AFDOriginGroupsListResourceUsage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AFDOriginGroupsListResourceUsageInput,
    outputSchema: AFDOriginGroupsListResourceUsageOutput,
  }));
// Input Schema
export const AFDOriginGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    originGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}",
    }),
  );
export type AFDOriginGroupsUpdateInput = typeof AFDOriginGroupsUpdateInput.Type;

// Output Schema
export const AFDOriginGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AFDOriginGroupsUpdateOutput =
  typeof AFDOriginGroupsUpdateOutput.Type;

// The operation
/**
 * Updates an existing origin group within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const AFDOriginGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDOriginGroupsUpdateInput,
    outputSchema: AFDOriginGroupsUpdateOutput,
  }),
);
// Input Schema
export const AFDOriginsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  originGroupName: Schema.String.pipe(T.PathParam()),
  originName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins/{originName}",
  }),
);
export type AFDOriginsCreateInput = typeof AFDOriginsCreateInput.Type;

// Output Schema
export const AFDOriginsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type AFDOriginsCreateOutput = typeof AFDOriginsCreateOutput.Type;

// The operation
/**
 * Creates a new origin within the specified origin group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 * @param originName - Name of the origin which is unique within the profile.
 */
export const AFDOriginsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDOriginsCreateInput,
  outputSchema: AFDOriginsCreateOutput,
}));
// Input Schema
export const AFDOriginsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  originGroupName: Schema.String.pipe(T.PathParam()),
  originName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins/{originName}",
  }),
);
export type AFDOriginsDeleteInput = typeof AFDOriginsDeleteInput.Type;

// Output Schema
export const AFDOriginsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AFDOriginsDeleteOutput = typeof AFDOriginsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing origin within an origin group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 * @param originName - Name of the origin which is unique within the profile.
 */
export const AFDOriginsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDOriginsDeleteInput,
  outputSchema: AFDOriginsDeleteOutput,
}));
// Input Schema
export const AFDOriginsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  originGroupName: Schema.String.pipe(T.PathParam()),
  originName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins/{originName}",
  }),
);
export type AFDOriginsGetInput = typeof AFDOriginsGetInput.Type;

// Output Schema
export const AFDOriginsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type AFDOriginsGetOutput = typeof AFDOriginsGetOutput.Type;

// The operation
/**
 * Gets an existing origin within an origin group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 * @param originName - Name of the origin which is unique within the profile.
 */
export const AFDOriginsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDOriginsGetInput,
  outputSchema: AFDOriginsGetOutput,
}));
// Input Schema
export const AFDOriginsListByOriginGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    originGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins",
    }),
  );
export type AFDOriginsListByOriginGroupInput =
  typeof AFDOriginsListByOriginGroupInput.Type;

// Output Schema
export const AFDOriginsListByOriginGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AFDOriginsListByOriginGroupOutput =
  typeof AFDOriginsListByOriginGroupOutput.Type;

// The operation
/**
 * Lists all of the existing origins within an origin group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const AFDOriginsListByOriginGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDOriginsListByOriginGroupInput,
    outputSchema: AFDOriginsListByOriginGroupOutput,
  }),
);
// Input Schema
export const AFDOriginsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  originGroupName: Schema.String.pipe(T.PathParam()),
  originName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins/{originName}",
  }),
);
export type AFDOriginsUpdateInput = typeof AFDOriginsUpdateInput.Type;

// Output Schema
export const AFDOriginsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type AFDOriginsUpdateOutput = typeof AFDOriginsUpdateOutput.Type;

// The operation
/**
 * Updates an existing origin within an origin group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 * @param originName - Name of the origin which is unique within the profile.
 */
export const AFDOriginsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDOriginsUpdateInput,
  outputSchema: AFDOriginsUpdateOutput,
}));
// Input Schema
export const AFDProfilesCheckEndpointNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/checkEndpointNameAvailability",
    }),
  );
export type AFDProfilesCheckEndpointNameAvailabilityInput =
  typeof AFDProfilesCheckEndpointNameAvailabilityInput.Type;

// Output Schema
export const AFDProfilesCheckEndpointNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    availableHostname: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type AFDProfilesCheckEndpointNameAvailabilityOutput =
  typeof AFDProfilesCheckEndpointNameAvailabilityOutput.Type;

// The operation
/**
 * Check the availability of an afdx endpoint name, and return the globally unique endpoint host name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const AFDProfilesCheckEndpointNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AFDProfilesCheckEndpointNameAvailabilityInput,
    outputSchema: AFDProfilesCheckEndpointNameAvailabilityOutput,
  }));
// Input Schema
export const AFDProfilesCheckHostNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/checkHostNameAvailability",
    }),
  );
export type AFDProfilesCheckHostNameAvailabilityInput =
  typeof AFDProfilesCheckHostNameAvailabilityInput.Type;

// Output Schema
export const AFDProfilesCheckHostNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type AFDProfilesCheckHostNameAvailabilityOutput =
  typeof AFDProfilesCheckHostNameAvailabilityOutput.Type;

// The operation
/**
 * Validates the custom domain mapping to ensure it maps to the correct Azure Front Door endpoint in DNS.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const AFDProfilesCheckHostNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AFDProfilesCheckHostNameAvailabilityInput,
    outputSchema: AFDProfilesCheckHostNameAvailabilityOutput,
  }));
// Input Schema
export const AFDProfilesListResourceUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/usages",
    }),
  );
export type AFDProfilesListResourceUsageInput =
  typeof AFDProfilesListResourceUsageInput.Type;

// Output Schema
export const AFDProfilesListResourceUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        unit: Schema.Literals(["Count"]),
        currentValue: Schema.Number,
        limit: Schema.Number,
        name: Schema.Struct({
          value: Schema.optional(Schema.String),
          localizedValue: Schema.optional(Schema.String),
        }),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AFDProfilesListResourceUsageOutput =
  typeof AFDProfilesListResourceUsageOutput.Type;

// The operation
/**
 * Checks the quota and actual usage of endpoints under the given Azure Front Door profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const AFDProfilesListResourceUsage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AFDProfilesListResourceUsageInput,
    outputSchema: AFDProfilesListResourceUsageOutput,
  }));
// Input Schema
export const AFDProfilesUpgradeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/upgrade",
    }),
  );
export type AFDProfilesUpgradeInput = typeof AFDProfilesUpgradeInput.Type;

// Output Schema
export const AFDProfilesUpgradeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AFDProfilesUpgradeOutput = typeof AFDProfilesUpgradeOutput.Type;

// The operation
/**
 * Upgrade a profile from Standard_AzureFrontDoor to Premium_AzureFrontDoor.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const AFDProfilesUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AFDProfilesUpgradeInput,
  outputSchema: AFDProfilesUpgradeOutput,
}));
// Input Schema
export const AFDProfilesValidateSecretInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/validateSecret",
    }),
  );
export type AFDProfilesValidateSecretInput =
  typeof AFDProfilesValidateSecretInput.Type;

// Output Schema
export const AFDProfilesValidateSecretOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(
      Schema.Literals([
        "Valid",
        "Invalid",
        "AccessDenied",
        "CertificateExpired",
      ]),
    ),
    message: Schema.optional(Schema.String),
  });
export type AFDProfilesValidateSecretOutput =
  typeof AFDProfilesValidateSecretOutput.Type;

// The operation
/**
 * Validate a Secret in the profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const AFDProfilesValidateSecret = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AFDProfilesValidateSecretInput,
    outputSchema: AFDProfilesValidateSecretOutput,
  }),
);
// Input Schema
export const CheckEndpointNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/checkEndpointNameAvailability",
    }),
  );
export type CheckEndpointNameAvailabilityInput =
  typeof CheckEndpointNameAvailabilityInput.Type;

// Output Schema
export const CheckEndpointNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    availableHostname: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type CheckEndpointNameAvailabilityOutput =
  typeof CheckEndpointNameAvailabilityOutput.Type;

// The operation
/**
 * Check the availability of a resource name. This is needed for resources where name is globally unique, such as a afdx endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CheckEndpointNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CheckEndpointNameAvailabilityInput,
    outputSchema: CheckEndpointNameAvailabilityOutput,
  }));
// Input Schema
export const CheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Cdn/checkNameAvailability",
    }),
  );
export type CheckNameAvailabilityInput = typeof CheckNameAvailabilityInput.Type;

// Output Schema
export const CheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type CheckNameAvailabilityOutput =
  typeof CheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint.
 *
 * @param api-version - The API version to use for this operation.
 */
export const CheckNameAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CheckNameAvailabilityInput,
    outputSchema: CheckNameAvailabilityOutput,
  }),
);
// Input Schema
export const CheckNameAvailabilityWithSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Cdn/checkNameAvailability",
    }),
  );
export type CheckNameAvailabilityWithSubscriptionInput =
  typeof CheckNameAvailabilityWithSubscriptionInput.Type;

// Output Schema
export const CheckNameAvailabilityWithSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type CheckNameAvailabilityWithSubscriptionOutput =
  typeof CheckNameAvailabilityWithSubscriptionOutput.Type;

// The operation
/**
 * Check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CheckNameAvailabilityWithSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CheckNameAvailabilityWithSubscriptionInput,
    outputSchema: CheckNameAvailabilityWithSubscriptionOutput,
  }));
// Input Schema
export const CustomDomainsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    customDomainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}",
    }),
  );
export type CustomDomainsCreateInput = typeof CustomDomainsCreateInput.Type;

// Output Schema
export const CustomDomainsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CustomDomainsCreateOutput = typeof CustomDomainsCreateOutput.Type;

// The operation
/**
 * Creates a new custom domain within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param customDomainName - Name of the custom domain within an endpoint.
 */
export const CustomDomainsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CustomDomainsCreateInput,
  outputSchema: CustomDomainsCreateOutput,
}));
// Input Schema
export const CustomDomainsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    customDomainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}",
    }),
  );
export type CustomDomainsDeleteInput = typeof CustomDomainsDeleteInput.Type;

// Output Schema
export const CustomDomainsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CustomDomainsDeleteOutput = typeof CustomDomainsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing custom domain within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param customDomainName - Name of the custom domain within an endpoint.
 */
export const CustomDomainsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CustomDomainsDeleteInput,
  outputSchema: CustomDomainsDeleteOutput,
}));
// Input Schema
export const CustomDomainsDisableCustomHttpsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    customDomainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}/disableCustomHttps",
    }),
  );
export type CustomDomainsDisableCustomHttpsInput =
  typeof CustomDomainsDisableCustomHttpsInput.Type;

// Output Schema
export const CustomDomainsDisableCustomHttpsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CustomDomainsDisableCustomHttpsOutput =
  typeof CustomDomainsDisableCustomHttpsOutput.Type;

// The operation
/**
 * Disable https delivery of the custom domain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param customDomainName - Name of the custom domain within an endpoint.
 */
export const CustomDomainsDisableCustomHttps =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CustomDomainsDisableCustomHttpsInput,
    outputSchema: CustomDomainsDisableCustomHttpsOutput,
  }));
// Input Schema
export const CustomDomainsEnableCustomHttpsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    customDomainName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}/enableCustomHttps",
    }),
  );
export type CustomDomainsEnableCustomHttpsInput =
  typeof CustomDomainsEnableCustomHttpsInput.Type;

// Output Schema
export const CustomDomainsEnableCustomHttpsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CustomDomainsEnableCustomHttpsOutput =
  typeof CustomDomainsEnableCustomHttpsOutput.Type;

// The operation
/**
 * Enable https delivery of the custom domain.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param customDomainName - Name of the custom domain within an endpoint.
 */
export const CustomDomainsEnableCustomHttps =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CustomDomainsEnableCustomHttpsInput,
    outputSchema: CustomDomainsEnableCustomHttpsOutput,
  }));
// Input Schema
export const CustomDomainsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  customDomainName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}",
  }),
);
export type CustomDomainsGetInput = typeof CustomDomainsGetInput.Type;

// Output Schema
export const CustomDomainsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type CustomDomainsGetOutput = typeof CustomDomainsGetOutput.Type;

// The operation
/**
 * Gets an existing custom domain within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param customDomainName - Name of the custom domain within an endpoint.
 */
export const CustomDomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CustomDomainsGetInput,
  outputSchema: CustomDomainsGetOutput,
}));
// Input Schema
export const CustomDomainsListByEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains",
    }),
  );
export type CustomDomainsListByEndpointInput =
  typeof CustomDomainsListByEndpointInput.Type;

// Output Schema
export const CustomDomainsListByEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CustomDomainsListByEndpointOutput =
  typeof CustomDomainsListByEndpointOutput.Type;

// The operation
/**
 * Lists all of the existing custom domains within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const CustomDomainsListByEndpoint = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CustomDomainsListByEndpointInput,
    outputSchema: CustomDomainsListByEndpointOutput,
  }),
);
// Input Schema
export const EdgeNodesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(T.Http({ method: "GET", path: "/providers/Microsoft.Cdn/edgenodes" }));
export type EdgeNodesListInput = typeof EdgeNodesListInput.Type;

// Output Schema
export const EdgeNodesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type EdgeNodesListOutput = typeof EdgeNodesListOutput.Type;

// The operation
/**
 * Edgenodes are the global Point of Presence (POP) locations used to deliver CDN content to end users.
 *
 * @param api-version - The API version to use for this operation.
 */
export const EdgeNodesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EdgeNodesListInput,
  outputSchema: EdgeNodesListOutput,
}));
// Input Schema
export const EndpointsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}",
  }),
);
export type EndpointsCreateInput = typeof EndpointsCreateInput.Type;

// Output Schema
export const EndpointsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EndpointsCreateOutput = typeof EndpointsCreateOutput.Type;

// The operation
/**
 * Creates a new CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsCreateInput,
  outputSchema: EndpointsCreateOutput,
}));
// Input Schema
export const EndpointsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}",
  }),
);
export type EndpointsDeleteInput = typeof EndpointsDeleteInput.Type;

// Output Schema
export const EndpointsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EndpointsDeleteOutput = typeof EndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsDeleteInput,
  outputSchema: EndpointsDeleteOutput,
}));
// Input Schema
export const EndpointsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}",
  }),
);
export type EndpointsGetInput = typeof EndpointsGetInput.Type;

// Output Schema
export const EndpointsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EndpointsGetOutput = typeof EndpointsGetOutput.Type;

// The operation
/**
 * Gets an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsGetInput,
  outputSchema: EndpointsGetOutput,
}));
// Input Schema
export const EndpointsListByProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints",
    }),
  );
export type EndpointsListByProfileInput =
  typeof EndpointsListByProfileInput.Type;

// Output Schema
export const EndpointsListByProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EndpointsListByProfileOutput =
  typeof EndpointsListByProfileOutput.Type;

// The operation
/**
 * Lists existing CDN endpoints.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const EndpointsListByProfile = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EndpointsListByProfileInput,
    outputSchema: EndpointsListByProfileOutput,
  }),
);
// Input Schema
export const EndpointsListResourceUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/checkResourceUsage",
    }),
  );
export type EndpointsListResourceUsageInput =
  typeof EndpointsListResourceUsageInput.Type;

// Output Schema
export const EndpointsListResourceUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        unit: Schema.optional(Schema.Literals(["count"])),
        currentValue: Schema.optional(Schema.Number),
        limit: Schema.optional(Schema.Number),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type EndpointsListResourceUsageOutput =
  typeof EndpointsListResourceUsageOutput.Type;

// The operation
/**
 * Checks the quota and usage of geo filters and custom domains under the given endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsListResourceUsage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EndpointsListResourceUsageInput,
    outputSchema: EndpointsListResourceUsageOutput,
  }),
);
// Input Schema
export const EndpointsLoadContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/load",
    }),
  );
export type EndpointsLoadContentInput = typeof EndpointsLoadContentInput.Type;

// Output Schema
export const EndpointsLoadContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EndpointsLoadContentOutput = typeof EndpointsLoadContentOutput.Type;

// The operation
/**
 * Pre-loads a content to CDN. Available for Verizon Profiles.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsLoadContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EndpointsLoadContentInput,
    outputSchema: EndpointsLoadContentOutput,
  }),
);
// Input Schema
export const EndpointsPurgeContentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/purge",
    }),
  );
export type EndpointsPurgeContentInput = typeof EndpointsPurgeContentInput.Type;

// Output Schema
export const EndpointsPurgeContentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EndpointsPurgeContentOutput =
  typeof EndpointsPurgeContentOutput.Type;

// The operation
/**
 * Removes a content from CDN.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsPurgeContent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EndpointsPurgeContentInput,
    outputSchema: EndpointsPurgeContentOutput,
  }),
);
// Input Schema
export const EndpointsStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/start",
  }),
);
export type EndpointsStartInput = typeof EndpointsStartInput.Type;

// Output Schema
export const EndpointsStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EndpointsStartOutput = typeof EndpointsStartOutput.Type;

// The operation
/**
 * Starts an existing CDN endpoint that is on a stopped state.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsStartInput,
  outputSchema: EndpointsStartOutput,
}));
// Input Schema
export const EndpointsStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/stop",
  }),
);
export type EndpointsStopInput = typeof EndpointsStopInput.Type;

// Output Schema
export const EndpointsStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EndpointsStopOutput = typeof EndpointsStopOutput.Type;

// The operation
/**
 * Stops an existing running CDN endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsStopInput,
  outputSchema: EndpointsStopOutput,
}));
// Input Schema
export const EndpointsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}",
  }),
);
export type EndpointsUpdateInput = typeof EndpointsUpdateInput.Type;

// Output Schema
export const EndpointsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type EndpointsUpdateOutput = typeof EndpointsUpdateOutput.Type;

// The operation
/**
 * Updates an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. Only tags can be updated after creating an endpoint. To update origins, use the Update Origin operation. To update origin groups, use the Update Origin group operation. To update custom domains, use the Update Custom Domain operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EndpointsUpdateInput,
  outputSchema: EndpointsUpdateOutput,
}));
// Input Schema
export const EndpointsValidateCustomDomainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/validateCustomDomain",
    }),
  );
export type EndpointsValidateCustomDomainInput =
  typeof EndpointsValidateCustomDomainInput.Type;

// Output Schema
export const EndpointsValidateCustomDomainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customDomainValidated: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type EndpointsValidateCustomDomainOutput =
  typeof EndpointsValidateCustomDomainOutput.Type;

// The operation
/**
 * Validates the custom domain mapping to ensure it maps to the correct CDN endpoint in DNS.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const EndpointsValidateCustomDomain =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EndpointsValidateCustomDomainInput,
    outputSchema: EndpointsValidateCustomDomainOutput,
  }));
// Input Schema
export const LogAnalyticsGetLogAnalyticsLocationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getLogAnalyticsLocations",
    }),
  );
export type LogAnalyticsGetLogAnalyticsLocationsInput =
  typeof LogAnalyticsGetLogAnalyticsLocationsInput.Type;

// Output Schema
export const LogAnalyticsGetLogAnalyticsLocationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    continents: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    countryOrRegions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          continentId: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type LogAnalyticsGetLogAnalyticsLocationsOutput =
  typeof LogAnalyticsGetLogAnalyticsLocationsOutput.Type;

// The operation
/**
 * Get all available location names for AFD log analytics report.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const LogAnalyticsGetLogAnalyticsLocations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogAnalyticsGetLogAnalyticsLocationsInput,
    outputSchema: LogAnalyticsGetLogAnalyticsLocationsOutput,
  }));
// Input Schema
export const LogAnalyticsGetLogAnalyticsMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    metrics: Schema.String,
    dateTimeBegin: Schema.String,
    dateTimeEnd: Schema.String,
    granularity: Schema.Literals(["PT5M", "PT1H", "P1D"]),
    groupBy: Schema.optional(Schema.String),
    continents: Schema.optional(Schema.String),
    countryOrRegions: Schema.optional(Schema.String),
    customDomains: Schema.String,
    protocols: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getLogAnalyticsMetrics",
    }),
  );
export type LogAnalyticsGetLogAnalyticsMetricsInput =
  typeof LogAnalyticsGetLogAnalyticsMetricsInput.Type;

// Output Schema
export const LogAnalyticsGetLogAnalyticsMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dateTimeBegin: Schema.optional(Schema.String),
    dateTimeEnd: Schema.optional(Schema.String),
    granularity: Schema.optional(Schema.Literals(["PT5M", "PT1H", "P1D"])),
    series: Schema.optional(
      Schema.Array(
        Schema.Struct({
          metric: Schema.optional(Schema.String),
          unit: Schema.optional(
            Schema.Literals([
              "count",
              "bytes",
              "bitsPerSecond",
              "milliSeconds",
            ]),
          ),
          groups: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          data: Schema.optional(
            Schema.Array(
              Schema.Struct({
                dateTime: Schema.optional(Schema.String),
                value: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type LogAnalyticsGetLogAnalyticsMetricsOutput =
  typeof LogAnalyticsGetLogAnalyticsMetricsOutput.Type;

// The operation
/**
 * Get log report for AFD profile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const LogAnalyticsGetLogAnalyticsMetrics =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogAnalyticsGetLogAnalyticsMetricsInput,
    outputSchema: LogAnalyticsGetLogAnalyticsMetricsOutput,
  }));
// Input Schema
export const LogAnalyticsGetLogAnalyticsRankingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    rankings: Schema.String,
    metrics: Schema.String,
    maxRanking: Schema.Number,
    dateTimeBegin: Schema.String,
    dateTimeEnd: Schema.String,
    customDomains: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getLogAnalyticsRankings",
    }),
  );
export type LogAnalyticsGetLogAnalyticsRankingsInput =
  typeof LogAnalyticsGetLogAnalyticsRankingsInput.Type;

// Output Schema
export const LogAnalyticsGetLogAnalyticsRankingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dateTimeBegin: Schema.optional(Schema.String),
    dateTimeEnd: Schema.optional(Schema.String),
    tables: Schema.optional(
      Schema.Array(
        Schema.Struct({
          ranking: Schema.optional(Schema.String),
          data: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                metrics: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      metric: Schema.optional(Schema.String),
                      value: Schema.optional(Schema.Number),
                      percentage: Schema.optional(Schema.Number),
                    }),
                  ),
                ),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type LogAnalyticsGetLogAnalyticsRankingsOutput =
  typeof LogAnalyticsGetLogAnalyticsRankingsOutput.Type;

// The operation
/**
 * Get log analytics ranking report for AFD profile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const LogAnalyticsGetLogAnalyticsRankings =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogAnalyticsGetLogAnalyticsRankingsInput,
    outputSchema: LogAnalyticsGetLogAnalyticsRankingsOutput,
  }));
// Input Schema
export const LogAnalyticsGetLogAnalyticsResourcesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getLogAnalyticsResources",
    }),
  );
export type LogAnalyticsGetLogAnalyticsResourcesInput =
  typeof LogAnalyticsGetLogAnalyticsResourcesInput.Type;

// Output Schema
export const LogAnalyticsGetLogAnalyticsResourcesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endpoints: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          history: Schema.optional(Schema.Boolean),
          customDomains: Schema.optional(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(Schema.String),
                name: Schema.optional(Schema.String),
                endpointId: Schema.optional(Schema.String),
                history: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
        }),
      ),
    ),
    customDomains: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          endpointId: Schema.optional(Schema.String),
          history: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
  });
export type LogAnalyticsGetLogAnalyticsResourcesOutput =
  typeof LogAnalyticsGetLogAnalyticsResourcesOutput.Type;

// The operation
/**
 * Get all endpoints and custom domains available for AFD log report
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const LogAnalyticsGetLogAnalyticsResources =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogAnalyticsGetLogAnalyticsResourcesInput,
    outputSchema: LogAnalyticsGetLogAnalyticsResourcesOutput,
  }));
// Input Schema
export const LogAnalyticsGetWafLogAnalyticsMetricsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    metrics: Schema.String,
    dateTimeBegin: Schema.String,
    dateTimeEnd: Schema.String,
    granularity: Schema.Literals(["PT5M", "PT1H", "P1D"]),
    actions: Schema.optional(Schema.String),
    groupBy: Schema.optional(Schema.String),
    ruleTypes: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getWafLogAnalyticsMetrics",
    }),
  );
export type LogAnalyticsGetWafLogAnalyticsMetricsInput =
  typeof LogAnalyticsGetWafLogAnalyticsMetricsInput.Type;

// Output Schema
export const LogAnalyticsGetWafLogAnalyticsMetricsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dateTimeBegin: Schema.optional(Schema.String),
    dateTimeEnd: Schema.optional(Schema.String),
    granularity: Schema.optional(Schema.Literals(["PT5M", "PT1H", "P1D"])),
    series: Schema.optional(
      Schema.Array(
        Schema.Struct({
          metric: Schema.optional(Schema.String),
          unit: Schema.optional(Schema.Literals(["count"])),
          groups: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                value: Schema.optional(Schema.String),
              }),
            ),
          ),
          data: Schema.optional(
            Schema.Array(
              Schema.Struct({
                dateTime: Schema.optional(Schema.String),
                value: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type LogAnalyticsGetWafLogAnalyticsMetricsOutput =
  typeof LogAnalyticsGetWafLogAnalyticsMetricsOutput.Type;

// The operation
/**
 * Get Waf related log analytics report for AFD profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const LogAnalyticsGetWafLogAnalyticsMetrics =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogAnalyticsGetWafLogAnalyticsMetricsInput,
    outputSchema: LogAnalyticsGetWafLogAnalyticsMetricsOutput,
  }));
// Input Schema
export const LogAnalyticsGetWafLogAnalyticsRankingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    metrics: Schema.String,
    dateTimeBegin: Schema.String,
    dateTimeEnd: Schema.String,
    maxRanking: Schema.Number,
    rankings: Schema.String,
    actions: Schema.optional(Schema.String),
    ruleTypes: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getWafLogAnalyticsRankings",
    }),
  );
export type LogAnalyticsGetWafLogAnalyticsRankingsInput =
  typeof LogAnalyticsGetWafLogAnalyticsRankingsInput.Type;

// Output Schema
export const LogAnalyticsGetWafLogAnalyticsRankingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dateTimeBegin: Schema.optional(Schema.String),
    dateTimeEnd: Schema.optional(Schema.String),
    groups: Schema.optional(Schema.Array(Schema.String)),
    data: Schema.optional(
      Schema.Array(
        Schema.Struct({
          groupValues: Schema.optional(Schema.Array(Schema.String)),
          metrics: Schema.optional(
            Schema.Array(
              Schema.Struct({
                metric: Schema.optional(Schema.String),
                value: Schema.optional(Schema.Number),
                percentage: Schema.optional(Schema.Number),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type LogAnalyticsGetWafLogAnalyticsRankingsOutput =
  typeof LogAnalyticsGetWafLogAnalyticsRankingsOutput.Type;

// The operation
/**
 * Get WAF log analytics charts for AFD profile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const LogAnalyticsGetWafLogAnalyticsRankings =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LogAnalyticsGetWafLogAnalyticsRankingsInput,
    outputSchema: LogAnalyticsGetWafLogAnalyticsRankingsOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(T.Http({ method: "GET", path: "/providers/Microsoft.Cdn/operations" }));
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      properties: Schema.optional(
        Schema.Struct({
          serviceSpecification: Schema.optional(
            Schema.Struct({
              logSpecifications: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    blobDuration: Schema.optional(Schema.String),
                    logFilterPattern: Schema.optional(Schema.String),
                  }),
                ),
              ),
              metricSpecifications: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    displayDescription: Schema.optional(Schema.String),
                    unit: Schema.optional(Schema.String),
                    aggregationType: Schema.optional(Schema.String),
                    availabilities: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          timeGrain: Schema.optional(Schema.String),
                          blobDuration: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                    supportedTimeGrainTypes: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    dimensions: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          displayName: Schema.optional(Schema.String),
                          internalName: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                    fillGapWithZero: Schema.optional(Schema.Boolean),
                    metricFilterPattern: Schema.optional(Schema.String),
                    isInternal: Schema.optional(Schema.Boolean),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * List the operations for the provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const OriginGroupsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    originGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups/{originGroupName}",
    }),
  );
export type OriginGroupsCreateInput = typeof OriginGroupsCreateInput.Type;

// Output Schema
export const OriginGroupsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OriginGroupsCreateOutput = typeof OriginGroupsCreateOutput.Type;

// The operation
/**
 * Creates a new origin group within the specified endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const OriginGroupsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OriginGroupsCreateInput,
  outputSchema: OriginGroupsCreateOutput,
}));
// Input Schema
export const OriginGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    originGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups/{originGroupName}",
    }),
  );
export type OriginGroupsDeleteInput = typeof OriginGroupsDeleteInput.Type;

// Output Schema
export const OriginGroupsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OriginGroupsDeleteOutput = typeof OriginGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing origin group within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const OriginGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OriginGroupsDeleteInput,
  outputSchema: OriginGroupsDeleteOutput,
}));
// Input Schema
export const OriginGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  originGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups/{originGroupName}",
  }),
);
export type OriginGroupsGetInput = typeof OriginGroupsGetInput.Type;

// Output Schema
export const OriginGroupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type OriginGroupsGetOutput = typeof OriginGroupsGetOutput.Type;

// The operation
/**
 * Gets an existing origin group within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const OriginGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OriginGroupsGetInput,
  outputSchema: OriginGroupsGetOutput,
}));
// Input Schema
export const OriginGroupsListByEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups",
    }),
  );
export type OriginGroupsListByEndpointInput =
  typeof OriginGroupsListByEndpointInput.Type;

// Output Schema
export const OriginGroupsListByEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type OriginGroupsListByEndpointOutput =
  typeof OriginGroupsListByEndpointOutput.Type;

// The operation
/**
 * Lists all of the existing origin groups within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const OriginGroupsListByEndpoint = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OriginGroupsListByEndpointInput,
    outputSchema: OriginGroupsListByEndpointOutput,
  }),
);
// Input Schema
export const OriginGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    originGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups/{originGroupName}",
    }),
  );
export type OriginGroupsUpdateInput = typeof OriginGroupsUpdateInput.Type;

// Output Schema
export const OriginGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OriginGroupsUpdateOutput = typeof OriginGroupsUpdateOutput.Type;

// The operation
/**
 * Updates an existing origin group within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param originGroupName - Name of the origin group which is unique within the endpoint.
 */
export const OriginGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OriginGroupsUpdateInput,
  outputSchema: OriginGroupsUpdateOutput,
}));
// Input Schema
export const OriginsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  originName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/origins/{originName}",
  }),
);
export type OriginsCreateInput = typeof OriginsCreateInput.Type;

// Output Schema
export const OriginsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type OriginsCreateOutput = typeof OriginsCreateOutput.Type;

// The operation
/**
 * Creates a new origin within the specified endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param originName - Name of the origin which is unique within the endpoint.
 */
export const OriginsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OriginsCreateInput,
  outputSchema: OriginsCreateOutput,
}));
// Input Schema
export const OriginsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  originName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/origins/{originName}",
  }),
);
export type OriginsDeleteInput = typeof OriginsDeleteInput.Type;

// Output Schema
export const OriginsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OriginsDeleteOutput = typeof OriginsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing origin within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param originName - Name of the origin which is unique within the endpoint.
 */
export const OriginsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OriginsDeleteInput,
  outputSchema: OriginsDeleteOutput,
}));
// Input Schema
export const OriginsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  originName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/origins/{originName}",
  }),
);
export type OriginsGetInput = typeof OriginsGetInput.Type;

// Output Schema
export const OriginsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OriginsGetOutput = typeof OriginsGetOutput.Type;

// The operation
/**
 * Gets an existing origin within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param originName - Name of the origin which is unique within the endpoint.
 */
export const OriginsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OriginsGetInput,
  outputSchema: OriginsGetOutput,
}));
// Input Schema
export const OriginsListByEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/origins",
    }),
  );
export type OriginsListByEndpointInput = typeof OriginsListByEndpointInput.Type;

// Output Schema
export const OriginsListByEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type OriginsListByEndpointOutput =
  typeof OriginsListByEndpointOutput.Type;

// The operation
/**
 * Lists all of the existing origins within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const OriginsListByEndpoint = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OriginsListByEndpointInput,
    outputSchema: OriginsListByEndpointOutput,
  }),
);
// Input Schema
export const OriginsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  originName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/origins/{originName}",
  }),
);
export type OriginsUpdateInput = typeof OriginsUpdateInput.Type;

// Output Schema
export const OriginsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type OriginsUpdateOutput = typeof OriginsUpdateOutput.Type;

// The operation
/**
 * Updates an existing origin within an endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param originName - Name of the origin which is unique within the endpoint.
 */
export const OriginsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OriginsUpdateInput,
  outputSchema: OriginsUpdateOutput,
}));
// Input Schema
export const PoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies/{policyName}",
    }),
  );
export type PoliciesCreateOrUpdateInput =
  typeof PoliciesCreateOrUpdateInput.Type;

// Output Schema
export const PoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PoliciesCreateOrUpdateOutput =
  typeof PoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update policy with specified rule set name within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param policyName - The name of the CdnWebApplicationFirewallPolicy.
 */
export const PoliciesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PoliciesCreateOrUpdateInput,
    outputSchema: PoliciesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PoliciesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  policyName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies/{policyName}",
  }),
);
export type PoliciesDeleteInput = typeof PoliciesDeleteInput.Type;

// Output Schema
export const PoliciesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PoliciesDeleteOutput = typeof PoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes Policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param policyName - The name of the CdnWebApplicationFirewallPolicy.
 */
export const PoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoliciesDeleteInput,
  outputSchema: PoliciesDeleteOutput,
}));
// Input Schema
export const PoliciesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  policyName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies/{policyName}",
  }),
);
export type PoliciesGetInput = typeof PoliciesGetInput.Type;

// Output Schema
export const PoliciesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PoliciesGetOutput = typeof PoliciesGetOutput.Type;

// The operation
/**
 * Retrieve protection policy with specified name within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param policyName - The name of the CdnWebApplicationFirewallPolicy.
 */
export const PoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoliciesGetInput,
  outputSchema: PoliciesGetOutput,
}));
// Input Schema
export const PoliciesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies",
  }),
);
export type PoliciesListInput = typeof PoliciesListInput.Type;

// Output Schema
export const PoliciesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type PoliciesListOutput = typeof PoliciesListOutput.Type;

// The operation
/**
 * Lists all of the protection policies within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoliciesListInput,
  outputSchema: PoliciesListOutput,
}));
// Input Schema
export const PoliciesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  policyName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/cdnWebApplicationFirewallPolicies/{policyName}",
  }),
);
export type PoliciesUpdateInput = typeof PoliciesUpdateInput.Type;

// Output Schema
export const PoliciesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PoliciesUpdateOutput = typeof PoliciesUpdateOutput.Type;

// The operation
/**
 * Update an existing CdnWebApplicationFirewallPolicy with the specified policy name under the specified subscription and resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param policyName - The name of the CdnWebApplicationFirewallPolicy.
 */
export const PoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoliciesUpdateInput,
  outputSchema: PoliciesUpdateOutput,
}));
// Input Schema
export const ProfilesCanMigrateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/canMigrate",
    }),
  );
export type ProfilesCanMigrateInput = typeof ProfilesCanMigrateInput.Type;

// Output Schema
export const ProfilesCanMigrateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        canMigrate: Schema.optional(Schema.Boolean),
        defaultSku: Schema.optional(
          Schema.Literals([
            "Standard_AzureFrontDoor",
            "Premium_AzureFrontDoor",
          ]),
        ),
        errors: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              resourceName: Schema.optional(Schema.String),
              errorMessage: Schema.optional(Schema.String),
              nextSteps: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ProfilesCanMigrateOutput = typeof ProfilesCanMigrateOutput.Type;

// The operation
/**
 * Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ProfilesCanMigrate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesCanMigrateInput,
  outputSchema: ProfilesCanMigrateOutput,
}));
// Input Schema
export const ProfilesCdnCanMigrateToAfdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/cdnCanMigrateToAfd",
    }),
  );
export type ProfilesCdnCanMigrateToAfdInput =
  typeof ProfilesCdnCanMigrateToAfdInput.Type;

// Output Schema
export const ProfilesCdnCanMigrateToAfdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        canMigrate: Schema.optional(Schema.Boolean),
        defaultSku: Schema.optional(
          Schema.Literals([
            "Standard_AzureFrontDoor",
            "Premium_AzureFrontDoor",
          ]),
        ),
        errors: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              resourceName: Schema.optional(Schema.String),
              errorMessage: Schema.optional(Schema.String),
              nextSteps: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type ProfilesCdnCanMigrateToAfdOutput =
  typeof ProfilesCdnCanMigrateToAfdOutput.Type;

// The operation
/**
 * Checks if CDN profile can be migrated to Azure Frontdoor(Standard/Premium) profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesCdnCanMigrateToAfd = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProfilesCdnCanMigrateToAfdInput,
    outputSchema: ProfilesCdnCanMigrateToAfdOutput,
  }),
);
// Input Schema
export const ProfilesCdnMigrateToAfdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/cdnMigrateToAfd",
    }),
  );
export type ProfilesCdnMigrateToAfdInput =
  typeof ProfilesCdnMigrateToAfdInput.Type;

// Output Schema
export const ProfilesCdnMigrateToAfdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        migratedProfileResourceId: Schema.optional(
          Schema.Struct({
            id: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type ProfilesCdnMigrateToAfdOutput =
  typeof ProfilesCdnMigrateToAfdOutput.Type;

// The operation
/**
 * Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. This step prepares the profile for migration and will be followed by Commit to finalize the migration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesCdnMigrateToAfd = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProfilesCdnMigrateToAfdInput,
    outputSchema: ProfilesCdnMigrateToAfdOutput,
  }),
);
// Input Schema
export const ProfilesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}",
  }),
);
export type ProfilesCreateInput = typeof ProfilesCreateInput.Type;

// Output Schema
export const ProfilesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ProfilesCreateOutput = typeof ProfilesCreateOutput.Type;

// The operation
/**
 * Creates a new Azure Front Door Standard or Azure Front Door Premium or CDN profile with a profile name under the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesCreateInput,
  outputSchema: ProfilesCreateOutput,
}));
// Input Schema
export const ProfilesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}",
  }),
);
export type ProfilesDeleteInput = typeof ProfilesDeleteInput.Type;

// Output Schema
export const ProfilesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProfilesDeleteOutput = typeof ProfilesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing  Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified parameters. Deleting a profile will result in the deletion of all of the sub-resources including endpoints, origins and custom domains.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesDeleteInput,
  outputSchema: ProfilesDeleteOutput,
}));
// Input Schema
export const ProfilesGenerateSsoUriInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/generateSsoUri",
    }),
  );
export type ProfilesGenerateSsoUriInput =
  typeof ProfilesGenerateSsoUriInput.Type;

// Output Schema
export const ProfilesGenerateSsoUriOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ssoUriValue: Schema.optional(Schema.String),
  });
export type ProfilesGenerateSsoUriOutput =
  typeof ProfilesGenerateSsoUriOutput.Type;

// The operation
/**
 * Generates a dynamic SSO URI used to sign in to the CDN supplemental portal. Supplemental portal is used to configure advanced feature capabilities that are not yet available in the Azure portal, such as core reports in a standard profile; rules engine, advanced HTTP reports, and real-time stats and alerts in a premium profile. The SSO URI changes approximately every 10 minutes.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesGenerateSsoUri = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProfilesGenerateSsoUriInput,
    outputSchema: ProfilesGenerateSsoUriOutput,
  }),
);
// Input Schema
export const ProfilesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}",
  }),
);
export type ProfilesGetInput = typeof ProfilesGetInput.Type;

// Output Schema
export const ProfilesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ProfilesGetOutput = typeof ProfilesGetOutput.Type;

// The operation
/**
 * Gets an Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesGetInput,
  outputSchema: ProfilesGetOutput,
}));
// Input Schema
export const ProfilesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Cdn/profiles",
  }),
);
export type ProfilesListInput = typeof ProfilesListInput.Type;

// Output Schema
export const ProfilesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ProfilesListOutput = typeof ProfilesListOutput.Type;

// The operation
/**
 * Lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within an Azure subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ProfilesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesListInput,
  outputSchema: ProfilesListOutput,
}));
// Input Schema
export const ProfilesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles",
    }),
  );
export type ProfilesListByResourceGroupInput =
  typeof ProfilesListByResourceGroupInput.Type;

// Output Schema
export const ProfilesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProfilesListByResourceGroupOutput =
  typeof ProfilesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ProfilesListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProfilesListByResourceGroupInput,
    outputSchema: ProfilesListByResourceGroupOutput,
  }),
);
// Input Schema
export const ProfilesListResourceUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/checkResourceUsage",
    }),
  );
export type ProfilesListResourceUsageInput =
  typeof ProfilesListResourceUsageInput.Type;

// Output Schema
export const ProfilesListResourceUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        unit: Schema.optional(Schema.Literals(["count"])),
        currentValue: Schema.optional(Schema.Number),
        limit: Schema.optional(Schema.Number),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProfilesListResourceUsageOutput =
  typeof ProfilesListResourceUsageOutput.Type;

// The operation
/**
 * Checks the quota and actual usage of endpoints under the given Azure Front Door Standard or Azure Front Door Premium or CDN profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesListResourceUsage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProfilesListResourceUsageInput,
    outputSchema: ProfilesListResourceUsageOutput,
  }),
);
// Input Schema
export const ProfilesListSupportedOptimizationTypesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/getSupportedOptimizationTypes",
    }),
  );
export type ProfilesListSupportedOptimizationTypesInput =
  typeof ProfilesListSupportedOptimizationTypesInput.Type;

// Output Schema
export const ProfilesListSupportedOptimizationTypesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportedOptimizationTypes: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "GeneralWebDelivery",
          "GeneralMediaStreaming",
          "VideoOnDemandMediaStreaming",
          "LargeFileDownload",
          "DynamicSiteAcceleration",
        ]),
      ),
    ),
  });
export type ProfilesListSupportedOptimizationTypesOutput =
  typeof ProfilesListSupportedOptimizationTypesOutput.Type;

// The operation
/**
 * Gets the supported optimization types for the current profile. A user can create an endpoint with an optimization type from the listed values.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesListSupportedOptimizationTypes =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProfilesListSupportedOptimizationTypesInput,
    outputSchema: ProfilesListSupportedOptimizationTypesOutput,
  }));
// Input Schema
export const ProfilesMigrateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/migrate",
  }),
);
export type ProfilesMigrateInput = typeof ProfilesMigrateInput.Type;

// Output Schema
export const ProfilesMigrateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      migratedProfileResourceId: Schema.optional(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    }),
  ),
});
export type ProfilesMigrateOutput = typeof ProfilesMigrateOutput.Type;

// The operation
/**
 * Migrate the CDN profile to Azure Frontdoor(Standard/Premium) profile. The change need to be committed after this.
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ProfilesMigrate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesMigrateInput,
  outputSchema: ProfilesMigrateOutput,
}));
// Input Schema
export const ProfilesMigrationAbortInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/migrationAbort",
    }),
  );
export type ProfilesMigrationAbortInput =
  typeof ProfilesMigrationAbortInput.Type;

// Output Schema
export const ProfilesMigrationAbortOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProfilesMigrationAbortOutput =
  typeof ProfilesMigrationAbortOutput.Type;

// The operation
/**
 * Abort the migration to Azure Frontdoor Premium/Standard.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesMigrationAbort = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProfilesMigrationAbortInput,
    outputSchema: ProfilesMigrationAbortOutput,
  }),
);
// Input Schema
export const ProfilesMigrationCommitInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/migrationCommit",
    }),
  );
export type ProfilesMigrationCommitInput =
  typeof ProfilesMigrationCommitInput.Type;

// Output Schema
export const ProfilesMigrationCommitOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProfilesMigrationCommitOutput =
  typeof ProfilesMigrationCommitOutput.Type;

// The operation
/**
 * Commit the migrated Azure Frontdoor(Standard/Premium) profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesMigrationCommit = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProfilesMigrationCommitInput,
    outputSchema: ProfilesMigrationCommitOutput,
  }),
);
// Input Schema
export const ProfilesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}",
  }),
);
export type ProfilesUpdateInput = typeof ProfilesUpdateInput.Type;

// Output Schema
export const ProfilesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ProfilesUpdateOutput = typeof ProfilesUpdateOutput.Type;

// The operation
/**
 * Updates an existing Azure Front Door Standard or Azure Front Door Premium or CDN profile with the specified profile name under the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const ProfilesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProfilesUpdateInput,
  outputSchema: ProfilesUpdateOutput,
}));
// Input Schema
export const ResourceUsageListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Cdn/checkResourceUsage",
  }),
);
export type ResourceUsageListInput = typeof ResourceUsageListInput.Type;

// Output Schema
export const ResourceUsageListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        unit: Schema.optional(Schema.Literals(["count"])),
        currentValue: Schema.optional(Schema.Number),
        limit: Schema.optional(Schema.Number),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceUsageListOutput = typeof ResourceUsageListOutput.Type;

// The operation
/**
 * Check the quota and actual usage of the CDN profiles under the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ResourceUsageList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceUsageListInput,
  outputSchema: ResourceUsageListOutput,
}));
// Input Schema
export const RoutesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  routeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes/{routeName}",
  }),
);
export type RoutesCreateInput = typeof RoutesCreateInput.Type;

// Output Schema
export const RoutesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RoutesCreateOutput = typeof RoutesCreateOutput.Type;

// The operation
/**
 * Creates a new route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param routeName - Name of the routing rule.
 */
export const RoutesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoutesCreateInput,
  outputSchema: RoutesCreateOutput,
}));
// Input Schema
export const RoutesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  routeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes/{routeName}",
  }),
);
export type RoutesDeleteInput = typeof RoutesDeleteInput.Type;

// Output Schema
export const RoutesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RoutesDeleteOutput = typeof RoutesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param routeName - Name of the routing rule.
 */
export const RoutesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoutesDeleteInput,
  outputSchema: RoutesDeleteOutput,
}));
// Input Schema
export const RoutesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  routeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes/{routeName}",
  }),
);
export type RoutesGetInput = typeof RoutesGetInput.Type;

// Output Schema
export const RoutesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RoutesGetOutput = typeof RoutesGetOutput.Type;

// The operation
/**
 * Gets an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param routeName - Name of the routing rule.
 */
export const RoutesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoutesGetInput,
  outputSchema: RoutesGetOutput,
}));
// Input Schema
export const RoutesListByEndpointInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    endpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes",
    }),
  );
export type RoutesListByEndpointInput = typeof RoutesListByEndpointInput.Type;

// Output Schema
export const RoutesListByEndpointOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RoutesListByEndpointOutput = typeof RoutesListByEndpointOutput.Type;

// The operation
/**
 * Lists all of the existing origins within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 */
export const RoutesListByEndpoint = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RoutesListByEndpointInput,
    outputSchema: RoutesListByEndpointOutput,
  }),
);
// Input Schema
export const RoutesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  endpointName: Schema.String.pipe(T.PathParam()),
  routeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/routes/{routeName}",
  }),
);
export type RoutesUpdateInput = typeof RoutesUpdateInput.Type;

// Output Schema
export const RoutesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RoutesUpdateOutput = typeof RoutesUpdateOutput.Type;

// The operation
/**
 * Updates an existing route with the specified route name under the specified subscription, resource group, profile, and AzureFrontDoor endpoint.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param endpointName - Name of the endpoint under the profile which is unique globally.
 * @param routeName - Name of the routing rule.
 */
export const RoutesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoutesUpdateInput,
  outputSchema: RoutesUpdateOutput,
}));
// Input Schema
export const RulesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  ruleSetName: Schema.String.pipe(T.PathParam()),
  ruleName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules/{ruleName}",
  }),
);
export type RulesCreateInput = typeof RulesCreateInput.Type;

// Output Schema
export const RulesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RulesCreateOutput = typeof RulesCreateOutput.Type;

// The operation
/**
 * Creates a new delivery rule within the specified rule set.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param ruleSetName - Name of the rule set under the profile which is unique globally.
 * @param ruleName - Name of the delivery rule which is unique within the endpoint.
 */
export const RulesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesCreateInput,
  outputSchema: RulesCreateOutput,
}));
// Input Schema
export const RulesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  ruleSetName: Schema.String.pipe(T.PathParam()),
  ruleName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules/{ruleName}",
  }),
);
export type RulesDeleteInput = typeof RulesDeleteInput.Type;

// Output Schema
export const RulesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RulesDeleteOutput = typeof RulesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing delivery rule within a rule set.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param ruleSetName - Name of the rule set under the profile which is unique globally.
 * @param ruleName - Name of the delivery rule which is unique within the endpoint.
 */
export const RulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesDeleteInput,
  outputSchema: RulesDeleteOutput,
}));
// Input Schema
export const RuleSetsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  ruleSetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}",
  }),
);
export type RuleSetsCreateInput = typeof RuleSetsCreateInput.Type;

// Output Schema
export const RuleSetsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type RuleSetsCreateOutput = typeof RuleSetsCreateOutput.Type;

// The operation
/**
 * Creates a new rule set within the specified profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param ruleSetName - Name of the rule set under the profile which is unique globally.
 */
export const RuleSetsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RuleSetsCreateInput,
  outputSchema: RuleSetsCreateOutput,
}));
// Input Schema
export const RuleSetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  ruleSetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}",
  }),
);
export type RuleSetsDeleteInput = typeof RuleSetsDeleteInput.Type;

// Output Schema
export const RuleSetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RuleSetsDeleteOutput = typeof RuleSetsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing AzureFrontDoor rule set with the specified rule set name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param ruleSetName - Name of the rule set under the profile which is unique globally.
 */
export const RuleSetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RuleSetsDeleteInput,
  outputSchema: RuleSetsDeleteOutput,
}));
// Input Schema
export const RuleSetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  ruleSetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}",
  }),
);
export type RuleSetsGetInput = typeof RuleSetsGetInput.Type;

// Output Schema
export const RuleSetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RuleSetsGetOutput = typeof RuleSetsGetOutput.Type;

// The operation
/**
 * Gets an existing AzureFrontDoor rule set with the specified rule set name under the specified subscription, resource group and profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param ruleSetName - Name of the rule set under the profile which is unique globally.
 */
export const RuleSetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RuleSetsGetInput,
  outputSchema: RuleSetsGetOutput,
}));
// Input Schema
export const RuleSetsListByProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets",
    }),
  );
export type RuleSetsListByProfileInput = typeof RuleSetsListByProfileInput.Type;

// Output Schema
export const RuleSetsListByProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RuleSetsListByProfileOutput =
  typeof RuleSetsListByProfileOutput.Type;

// The operation
/**
 * Lists existing AzureFrontDoor rule sets within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const RuleSetsListByProfile = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RuleSetsListByProfileInput,
    outputSchema: RuleSetsListByProfileOutput,
  }),
);
// Input Schema
export const RuleSetsListResourceUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    ruleSetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/usages",
    }),
  );
export type RuleSetsListResourceUsageInput =
  typeof RuleSetsListResourceUsageInput.Type;

// Output Schema
export const RuleSetsListResourceUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        unit: Schema.Literals(["Count"]),
        currentValue: Schema.Number,
        limit: Schema.Number,
        name: Schema.Struct({
          value: Schema.optional(Schema.String),
          localizedValue: Schema.optional(Schema.String),
        }),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RuleSetsListResourceUsageOutput =
  typeof RuleSetsListResourceUsageOutput.Type;

// The operation
/**
 * Checks the quota and actual usage of endpoints under the given Azure Front Door profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param ruleSetName - Name of the rule set under the profile which is unique globally.
 */
export const RuleSetsListResourceUsage = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RuleSetsListResourceUsageInput,
    outputSchema: RuleSetsListResourceUsageOutput,
  }),
);
// Input Schema
export const RulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  ruleSetName: Schema.String.pipe(T.PathParam()),
  ruleName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules/{ruleName}",
  }),
);
export type RulesGetInput = typeof RulesGetInput.Type;

// Output Schema
export const RulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RulesGetOutput = typeof RulesGetOutput.Type;

// The operation
/**
 * Gets an existing delivery rule within a rule set.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param ruleSetName - Name of the rule set under the profile which is unique globally.
 * @param ruleName - Name of the delivery rule which is unique within the endpoint.
 */
export const RulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesGetInput,
  outputSchema: RulesGetOutput,
}));
// Input Schema
export const RulesListByRuleSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    ruleSetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules",
    }),
  );
export type RulesListByRuleSetInput = typeof RulesListByRuleSetInput.Type;

// Output Schema
export const RulesListByRuleSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RulesListByRuleSetOutput = typeof RulesListByRuleSetOutput.Type;

// The operation
/**
 * Lists all of the existing delivery rules within a rule set.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param ruleSetName - Name of the rule set under the profile which is unique globally.
 */
export const RulesListByRuleSet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesListByRuleSetInput,
  outputSchema: RulesListByRuleSetOutput,
}));
// Input Schema
export const RulesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  ruleSetName: Schema.String.pipe(T.PathParam()),
  ruleName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules/{ruleName}",
  }),
);
export type RulesUpdateInput = typeof RulesUpdateInput.Type;

// Output Schema
export const RulesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RulesUpdateOutput = typeof RulesUpdateOutput.Type;

// The operation
/**
 * Updates an existing delivery rule within a rule set.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param ruleSetName - Name of the rule set under the profile which is unique globally.
 * @param ruleName - Name of the delivery rule which is unique within the endpoint.
 */
export const RulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesUpdateInput,
  outputSchema: RulesUpdateOutput,
}));
// Input Schema
export const SecretsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  secretName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/secrets/{secretName}",
  }),
);
export type SecretsCreateInput = typeof SecretsCreateInput.Type;

// Output Schema
export const SecretsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SecretsCreateOutput = typeof SecretsCreateOutput.Type;

// The operation
/**
 * Creates a new Secret within the specified profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param secretName - Name of the Secret under the profile.
 */
export const SecretsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretsCreateInput,
  outputSchema: SecretsCreateOutput,
}));
// Input Schema
export const SecretsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  secretName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/secrets/{secretName}",
  }),
);
export type SecretsDeleteInput = typeof SecretsDeleteInput.Type;

// Output Schema
export const SecretsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SecretsDeleteOutput = typeof SecretsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing Secret within profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param secretName - Name of the Secret under the profile.
 */
export const SecretsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretsDeleteInput,
  outputSchema: SecretsDeleteOutput,
}));
// Input Schema
export const SecretsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  profileName: Schema.String.pipe(T.PathParam()),
  secretName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/secrets/{secretName}",
  }),
);
export type SecretsGetInput = typeof SecretsGetInput.Type;

// Output Schema
export const SecretsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SecretsGetOutput = typeof SecretsGetOutput.Type;

// The operation
/**
 * Gets an existing Secret within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param secretName - Name of the Secret under the profile.
 */
export const SecretsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretsGetInput,
  outputSchema: SecretsGetOutput,
}));
// Input Schema
export const SecretsListByProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/secrets",
    }),
  );
export type SecretsListByProfileInput = typeof SecretsListByProfileInput.Type;

// Output Schema
export const SecretsListByProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SecretsListByProfileOutput = typeof SecretsListByProfileOutput.Type;

// The operation
/**
 * Lists existing AzureFrontDoor secrets.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const SecretsListByProfile = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SecretsListByProfileInput,
    outputSchema: SecretsListByProfileOutput,
  }),
);
// Input Schema
export const SecurityPoliciesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    securityPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies/{securityPolicyName}",
    }),
  );
export type SecurityPoliciesCreateInput =
  typeof SecurityPoliciesCreateInput.Type;

// Output Schema
export const SecurityPoliciesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SecurityPoliciesCreateOutput =
  typeof SecurityPoliciesCreateOutput.Type;

// The operation
/**
 * Creates a new security policy within the specified profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param securityPolicyName - Name of the security policy under the profile.
 */
export const SecurityPoliciesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SecurityPoliciesCreateInput,
    outputSchema: SecurityPoliciesCreateOutput,
  }),
);
// Input Schema
export const SecurityPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    securityPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies/{securityPolicyName}",
    }),
  );
export type SecurityPoliciesDeleteInput =
  typeof SecurityPoliciesDeleteInput.Type;

// Output Schema
export const SecurityPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SecurityPoliciesDeleteOutput =
  typeof SecurityPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing security policy within profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param securityPolicyName - Name of the security policy under the profile.
 */
export const SecurityPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SecurityPoliciesDeleteInput,
    outputSchema: SecurityPoliciesDeleteOutput,
  }),
);
// Input Schema
export const SecurityPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    securityPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies/{securityPolicyName}",
    }),
  );
export type SecurityPoliciesGetInput = typeof SecurityPoliciesGetInput.Type;

// Output Schema
export const SecurityPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SecurityPoliciesGetOutput = typeof SecurityPoliciesGetOutput.Type;

// The operation
/**
 * Gets an existing security policy within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param securityPolicyName - Name of the security policy under the profile.
 */
export const SecurityPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecurityPoliciesGetInput,
  outputSchema: SecurityPoliciesGetOutput,
}));
// Input Schema
export const SecurityPoliciesListByProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies",
    }),
  );
export type SecurityPoliciesListByProfileInput =
  typeof SecurityPoliciesListByProfileInput.Type;

// Output Schema
export const SecurityPoliciesListByProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SecurityPoliciesListByProfileOutput =
  typeof SecurityPoliciesListByProfileOutput.Type;

// The operation
/**
 * Lists security policies associated with the profile
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 */
export const SecurityPoliciesListByProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SecurityPoliciesListByProfileInput,
    outputSchema: SecurityPoliciesListByProfileOutput,
  }));
// Input Schema
export const SecurityPoliciesPatchInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    profileName: Schema.String.pipe(T.PathParam()),
    securityPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies/{securityPolicyName}",
    }),
  );
export type SecurityPoliciesPatchInput = typeof SecurityPoliciesPatchInput.Type;

// Output Schema
export const SecurityPoliciesPatchOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SecurityPoliciesPatchOutput =
  typeof SecurityPoliciesPatchOutput.Type;

// The operation
/**
 * Updates an existing security policy within a profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param profileName - Name of the Azure Front Door Standard or Azure Front Door Premium or CDN profile which is unique within the resource group.
 * @param securityPolicyName - Name of the security policy under the profile.
 */
export const SecurityPoliciesPatch = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SecurityPoliciesPatchInput,
    outputSchema: SecurityPoliciesPatchOutput,
  }),
);
// Input Schema
export const ValidateProbeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Cdn/validateProbe",
  }),
);
export type ValidateProbeInput = typeof ValidateProbeInput.Type;

// Output Schema
export const ValidateProbeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  isValid: Schema.optional(Schema.Boolean),
  errorCode: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
});
export type ValidateProbeOutput = typeof ValidateProbeOutput.Type;

// The operation
/**
 * Check if the probe path is a valid path and the file can be accessed. Probe path is the path to a file hosted on the origin server to help accelerate the delivery of dynamic content via the CDN endpoint. This path is relative to the origin path specified in the endpoint configuration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ValidateProbe = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ValidateProbeInput,
  outputSchema: ValidateProbeOutput,
}));
