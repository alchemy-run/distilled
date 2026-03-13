/**
 * Azure Managednetworkfabric API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccessControlListsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}",
    }),
  );
export type AccessControlListsCreateInput =
  typeof AccessControlListsCreateInput.Type;

// Output Schema
export const AccessControlListsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccessControlListsCreateOutput =
  typeof AccessControlListsCreateOutput.Type;

// The operation
/**
 * Creates Access Control List.
 *
 * Implements Access Control List PUT method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccessControlListsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessControlListsCreateInput,
    outputSchema: AccessControlListsCreateOutput,
  }),
);
// Input Schema
export const AccessControlListsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}",
    }),
  );
export type AccessControlListsDeleteInput =
  typeof AccessControlListsDeleteInput.Type;

// Output Schema
export const AccessControlListsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccessControlListsDeleteOutput =
  typeof AccessControlListsDeleteOutput.Type;

// The operation
/**
 * Deletes a Access Control List.
 *
 * Implements Access Control List DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccessControlListsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessControlListsDeleteInput,
    outputSchema: AccessControlListsDeleteOutput,
  }),
);
// Input Schema
export const AccessControlListsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}",
    }),
  );
export type AccessControlListsGetInput = typeof AccessControlListsGetInput.Type;

// Output Schema
export const AccessControlListsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccessControlListsGetOutput =
  typeof AccessControlListsGetOutput.Type;

// The operation
/**
 * Gets a Access Control List.
 *
 * Implements Access Control List GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccessControlListsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessControlListsGetInput,
    outputSchema: AccessControlListsGetOutput,
  }),
);
// Input Schema
export const AccessControlListsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists",
    }),
  );
export type AccessControlListsListByResourceGroupInput =
  typeof AccessControlListsListByResourceGroupInput.Type;

// Output Schema
export const AccessControlListsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccessControlListsListByResourceGroupOutput =
  typeof AccessControlListsListByResourceGroupOutput.Type;

// The operation
/**
 * List AccessControlLists by resource group.
 *
 * Implements AccessControlLists list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccessControlListsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessControlListsListByResourceGroupInput,
    outputSchema: AccessControlListsListByResourceGroupOutput,
  }));
// Input Schema
export const AccessControlListsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/accessControlLists",
    }),
  );
export type AccessControlListsListBySubscriptionInput =
  typeof AccessControlListsListBySubscriptionInput.Type;

// Output Schema
export const AccessControlListsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccessControlListsListBySubscriptionOutput =
  typeof AccessControlListsListBySubscriptionOutput.Type;

// The operation
/**
 * List AccessControlLists by subscription.
 *
 * Implements AccessControlLists list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const AccessControlListsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccessControlListsListBySubscriptionInput,
    outputSchema: AccessControlListsListBySubscriptionOutput,
  }));
// Input Schema
export const AccessControlListsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/accessControlLists/{accessControlListName}",
    }),
  );
export type AccessControlListsUpdateInput =
  typeof AccessControlListsUpdateInput.Type;

// Output Schema
export const AccessControlListsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccessControlListsUpdateOutput =
  typeof AccessControlListsUpdateOutput.Type;

// The operation
/**
 * Updates the Access Control List.
 *
 * API to update certain properties of the Access Control List resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccessControlListsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccessControlListsUpdateInput,
    outputSchema: AccessControlListsUpdateOutput,
  }),
);
// Input Schema
export const ExternalNetworksCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}",
    }),
  );
export type ExternalNetworksCreateInput =
  typeof ExternalNetworksCreateInput.Type;

// Output Schema
export const ExternalNetworksCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExternalNetworksCreateOutput =
  typeof ExternalNetworksCreateOutput.Type;

// The operation
/**
 * Creates ExternalNetwork for Layer3 Isolation Domain for communication of computes with external services
 *
 * Creates ExternalNetwork PUT method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ExternalNetworksCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExternalNetworksCreateInput,
    outputSchema: ExternalNetworksCreateOutput,
  }),
);
// Input Schema
export const ExternalNetworksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}",
    }),
  );
export type ExternalNetworksDeleteInput =
  typeof ExternalNetworksDeleteInput.Type;

// Output Schema
export const ExternalNetworksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExternalNetworksDeleteOutput =
  typeof ExternalNetworksDeleteOutput.Type;

// The operation
/**
 * Deletes a ExternalNetworks.
 *
 * Implements ExternalNetworks DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ExternalNetworksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExternalNetworksDeleteInput,
    outputSchema: ExternalNetworksDeleteOutput,
  }),
);
// Input Schema
export const ExternalNetworksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}",
    }),
  );
export type ExternalNetworksGetInput = typeof ExternalNetworksGetInput.Type;

// Output Schema
export const ExternalNetworksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExternalNetworksGetOutput = typeof ExternalNetworksGetOutput.Type;

// The operation
/**
 * Retrieves details of ExternalNetwork.
 *
 * Implements ExternalNetworks GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ExternalNetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExternalNetworksGetInput,
  outputSchema: ExternalNetworksGetOutput,
}));
// Input Schema
export const ExternalNetworksListByL3IsolationDomainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks",
    }),
  );
export type ExternalNetworksListByL3IsolationDomainInput =
  typeof ExternalNetworksListByL3IsolationDomainInput.Type;

// Output Schema
export const ExternalNetworksListByL3IsolationDomainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ExternalNetworksListByL3IsolationDomainOutput =
  typeof ExternalNetworksListByL3IsolationDomainOutput.Type;

// The operation
/**
 * Executes list operation to display External Networks within an isolation domain.
 *
 * Implements External Networks list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ExternalNetworksListByL3IsolationDomain =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExternalNetworksListByL3IsolationDomainInput,
    outputSchema: ExternalNetworksListByL3IsolationDomainOutput,
  }));
// Input Schema
export const ExternalNetworksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}",
    }),
  );
export type ExternalNetworksUpdateInput =
  typeof ExternalNetworksUpdateInput.Type;

// Output Schema
export const ExternalNetworksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExternalNetworksUpdateOutput =
  typeof ExternalNetworksUpdateOutput.Type;

// The operation
/**
 * Updates a External Networks.
 *
 * API to update certain properties of the ExternalNetworks resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ExternalNetworksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExternalNetworksUpdateInput,
    outputSchema: ExternalNetworksUpdateOutput,
  }),
);
// Input Schema
export const InternalNetworksCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}",
    }),
  );
export type InternalNetworksCreateInput =
  typeof InternalNetworksCreateInput.Type;

// Output Schema
export const InternalNetworksCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InternalNetworksCreateOutput =
  typeof InternalNetworksCreateOutput.Type;

// The operation
/**
 * Creates InternalNetwork for Layer3 Isolation Domain for communication of compute within and across racks.
 *
 * Creates InternalNetwork PUT method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternalNetworksCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternalNetworksCreateInput,
    outputSchema: InternalNetworksCreateOutput,
  }),
);
// Input Schema
export const InternalNetworksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}",
    }),
  );
export type InternalNetworksDeleteInput =
  typeof InternalNetworksDeleteInput.Type;

// Output Schema
export const InternalNetworksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InternalNetworksDeleteOutput =
  typeof InternalNetworksDeleteOutput.Type;

// The operation
/**
 * Deletes a InternalNetworks.
 *
 * Implements InternalNetworks DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternalNetworksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternalNetworksDeleteInput,
    outputSchema: InternalNetworksDeleteOutput,
  }),
);
// Input Schema
export const InternalNetworksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}",
    }),
  );
export type InternalNetworksGetInput = typeof InternalNetworksGetInput.Type;

// Output Schema
export const InternalNetworksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InternalNetworksGetOutput = typeof InternalNetworksGetOutput.Type;

// The operation
/**
 * Retrieves details of InternalNetworks using GET method.
 *
 * Gets a InternalNetworks.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternalNetworksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InternalNetworksGetInput,
  outputSchema: InternalNetworksGetOutput,
}));
// Input Schema
export const InternalNetworksListByL3IsolationDomainInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks",
    }),
  );
export type InternalNetworksListByL3IsolationDomainInput =
  typeof InternalNetworksListByL3IsolationDomainInput.Type;

// Output Schema
export const InternalNetworksListByL3IsolationDomainOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type InternalNetworksListByL3IsolationDomainOutput =
  typeof InternalNetworksListByL3IsolationDomainOutput.Type;

// The operation
/**
 * Executes list operation to display list of all internal networks
 *
 * Displays InternalNetworks list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternalNetworksListByL3IsolationDomain =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InternalNetworksListByL3IsolationDomainInput,
    outputSchema: InternalNetworksListByL3IsolationDomainOutput,
  }));
// Input Schema
export const InternalNetworksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}",
    }),
  );
export type InternalNetworksUpdateInput =
  typeof InternalNetworksUpdateInput.Type;

// Output Schema
export const InternalNetworksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InternalNetworksUpdateOutput =
  typeof InternalNetworksUpdateOutput.Type;

// The operation
/**
 * API to update certain properties of the InternalNetworks resources.
 *
 * Updates a InternalNetworks.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternalNetworksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternalNetworksUpdateInput,
    outputSchema: InternalNetworksUpdateOutput,
  }),
);
// Input Schema
export const InternetGatewayRulesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/{internetGatewayRuleName}",
    }),
  );
export type InternetGatewayRulesCreateInput =
  typeof InternetGatewayRulesCreateInput.Type;

// Output Schema
export const InternetGatewayRulesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InternetGatewayRulesCreateOutput =
  typeof InternetGatewayRulesCreateOutput.Type;

// The operation
/**
 * Creates an Internet Gateway rule.
 *
 * Creates an Internet Gateway rule resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewayRulesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternetGatewayRulesCreateInput,
    outputSchema: InternetGatewayRulesCreateOutput,
  }),
);
// Input Schema
export const InternetGatewayRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/{internetGatewayRuleName}",
    }),
  );
export type InternetGatewayRulesDeleteInput =
  typeof InternetGatewayRulesDeleteInput.Type;

// Output Schema
export const InternetGatewayRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InternetGatewayRulesDeleteOutput =
  typeof InternetGatewayRulesDeleteOutput.Type;

// The operation
/**
 * Deletes an Internet Gateway Rule.
 *
 * Implements Internet Gateway Rules DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewayRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternetGatewayRulesDeleteInput,
    outputSchema: InternetGatewayRulesDeleteOutput,
  }),
);
// Input Schema
export const InternetGatewayRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/{internetGatewayRuleName}",
    }),
  );
export type InternetGatewayRulesGetInput =
  typeof InternetGatewayRulesGetInput.Type;

// Output Schema
export const InternetGatewayRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InternetGatewayRulesGetOutput =
  typeof InternetGatewayRulesGetOutput.Type;

// The operation
/**
 * Gets an Internet Gateway Rule.
 *
 * Gets an Internet Gateway Rule resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewayRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternetGatewayRulesGetInput,
    outputSchema: InternetGatewayRulesGetOutput,
  }),
);
// Input Schema
export const InternetGatewayRulesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules",
    }),
  );
export type InternetGatewayRulesListByResourceGroupInput =
  typeof InternetGatewayRulesListByResourceGroupInput.Type;

// Output Schema
export const InternetGatewayRulesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type InternetGatewayRulesListByResourceGroupOutput =
  typeof InternetGatewayRulesListByResourceGroupOutput.Type;

// The operation
/**
 * List Internet Gateway Rules by resource group.
 *
 * Implements Internet Gateway Rules list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewayRulesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InternetGatewayRulesListByResourceGroupInput,
    outputSchema: InternetGatewayRulesListByResourceGroupOutput,
  }));
// Input Schema
export const InternetGatewayRulesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules",
    }),
  );
export type InternetGatewayRulesListBySubscriptionInput =
  typeof InternetGatewayRulesListBySubscriptionInput.Type;

// Output Schema
export const InternetGatewayRulesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type InternetGatewayRulesListBySubscriptionOutput =
  typeof InternetGatewayRulesListBySubscriptionOutput.Type;

// The operation
/**
 * List Internet Gateway Rules by subscription.
 *
 * List all Internet Gateway rules in the given subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewayRulesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InternetGatewayRulesListBySubscriptionInput,
    outputSchema: InternetGatewayRulesListBySubscriptionOutput,
  }));
// Input Schema
export const InternetGatewayRulesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGatewayRules/{internetGatewayRuleName}",
    }),
  );
export type InternetGatewayRulesUpdateInput =
  typeof InternetGatewayRulesUpdateInput.Type;

// Output Schema
export const InternetGatewayRulesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InternetGatewayRulesUpdateOutput =
  typeof InternetGatewayRulesUpdateOutput.Type;

// The operation
/**
 * Updates an Internet Gateway Rule.
 *
 * API to update certain properties of the Internet Gateway Rule resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewayRulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternetGatewayRulesUpdateInput,
    outputSchema: InternetGatewayRulesUpdateOutput,
  }),
);
// Input Schema
export const InternetGatewaysCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGateways/{internetGatewayName}",
    }),
  );
export type InternetGatewaysCreateInput =
  typeof InternetGatewaysCreateInput.Type;

// Output Schema
export const InternetGatewaysCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InternetGatewaysCreateOutput =
  typeof InternetGatewaysCreateOutput.Type;

// The operation
/**
 * Create a Network Fabric Service Internet Gateway.
 *
 * Creates a Network Fabric Service Internet Gateway resource instance.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewaysCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternetGatewaysCreateInput,
    outputSchema: InternetGatewaysCreateOutput,
  }),
);
// Input Schema
export const InternetGatewaysDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGateways/{internetGatewayName}",
    }),
  );
export type InternetGatewaysDeleteInput =
  typeof InternetGatewaysDeleteInput.Type;

// Output Schema
export const InternetGatewaysDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InternetGatewaysDeleteOutput =
  typeof InternetGatewaysDeleteOutput.Type;

// The operation
/**
 * Deletes a Network Fabric Service Internet Gateway.
 *
 * Execute a delete on Network Fabric Service Internet Gateway.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewaysDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternetGatewaysDeleteInput,
    outputSchema: InternetGatewaysDeleteOutput,
  }),
);
// Input Schema
export const InternetGatewaysGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGateways/{internetGatewayName}",
    }),
  );
export type InternetGatewaysGetInput = typeof InternetGatewaysGetInput.Type;

// Output Schema
export const InternetGatewaysGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InternetGatewaysGetOutput = typeof InternetGatewaysGetOutput.Type;

// The operation
/**
 * Retrieves details of Network Fabric Service Internet Gateway.
 *
 * Implements Gateway GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewaysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InternetGatewaysGetInput,
  outputSchema: InternetGatewaysGetOutput,
}));
// Input Schema
export const InternetGatewaysListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGateways",
    }),
  );
export type InternetGatewaysListByResourceGroupInput =
  typeof InternetGatewaysListByResourceGroupInput.Type;

// Output Schema
export const InternetGatewaysListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type InternetGatewaysListByResourceGroupOutput =
  typeof InternetGatewaysListByResourceGroupOutput.Type;

// The operation
/**
 * List Internet Gateways by resource group.
 *
 * Displays Internet Gateways list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewaysListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InternetGatewaysListByResourceGroupInput,
    outputSchema: InternetGatewaysListByResourceGroupOutput,
  }));
// Input Schema
export const InternetGatewaysListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/internetGateways",
    }),
  );
export type InternetGatewaysListBySubscriptionInput =
  typeof InternetGatewaysListBySubscriptionInput.Type;

// Output Schema
export const InternetGatewaysListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type InternetGatewaysListBySubscriptionOutput =
  typeof InternetGatewaysListBySubscriptionOutput.Type;

// The operation
/**
 * List Internet Gateways by subscription.
 *
 * Displays Internet Gateways list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewaysListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InternetGatewaysListBySubscriptionInput,
    outputSchema: InternetGatewaysListBySubscriptionOutput,
  }));
// Input Schema
export const InternetGatewaysUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/internetGateways/{internetGatewayName}",
    }),
  );
export type InternetGatewaysUpdateInput =
  typeof InternetGatewaysUpdateInput.Type;

// Output Schema
export const InternetGatewaysUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InternetGatewaysUpdateOutput =
  typeof InternetGatewaysUpdateOutput.Type;

// The operation
/**
 * Updates a Network Fabric Service Internet Gateway.
 *
 * Execute patch on Network Fabric Service Internet Gateway.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const InternetGatewaysUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InternetGatewaysUpdateInput,
    outputSchema: InternetGatewaysUpdateOutput,
  }),
);
// Input Schema
export const IpCommunitiesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipCommunities/{ipCommunityName}",
    }),
  );
export type IpCommunitiesCreateInput = typeof IpCommunitiesCreateInput.Type;

// Output Schema
export const IpCommunitiesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IpCommunitiesCreateOutput = typeof IpCommunitiesCreateOutput.Type;

// The operation
/**
 * Create an IP Community.
 *
 * Implements an IP Community PUT method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpCommunitiesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IpCommunitiesCreateInput,
  outputSchema: IpCommunitiesCreateOutput,
}));
// Input Schema
export const IpCommunitiesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipCommunities/{ipCommunityName}",
    }),
  );
export type IpCommunitiesDeleteInput = typeof IpCommunitiesDeleteInput.Type;

// Output Schema
export const IpCommunitiesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IpCommunitiesDeleteOutput = typeof IpCommunitiesDeleteOutput.Type;

// The operation
/**
 * Deletes an IP Community.
 *
 * Implements IP Community DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpCommunitiesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IpCommunitiesDeleteInput,
  outputSchema: IpCommunitiesDeleteOutput,
}));
// Input Schema
export const IpCommunitiesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipCommunities/{ipCommunityName}",
  }),
);
export type IpCommunitiesGetInput = typeof IpCommunitiesGetInput.Type;

// Output Schema
export const IpCommunitiesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type IpCommunitiesGetOutput = typeof IpCommunitiesGetOutput.Type;

// The operation
/**
 * Gets an IP Community.
 *
 * Implements an IP Community GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpCommunitiesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IpCommunitiesGetInput,
  outputSchema: IpCommunitiesGetOutput,
}));
// Input Schema
export const IpCommunitiesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipCommunities",
    }),
  );
export type IpCommunitiesListByResourceGroupInput =
  typeof IpCommunitiesListByResourceGroupInput.Type;

// Output Schema
export const IpCommunitiesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IpCommunitiesListByResourceGroupOutput =
  typeof IpCommunitiesListByResourceGroupOutput.Type;

// The operation
/**
 * List IP Communities by resource group.
 *
 * Implements IP Communities list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpCommunitiesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IpCommunitiesListByResourceGroupInput,
    outputSchema: IpCommunitiesListByResourceGroupOutput,
  }));
// Input Schema
export const IpCommunitiesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/ipCommunities",
    }),
  );
export type IpCommunitiesListBySubscriptionInput =
  typeof IpCommunitiesListBySubscriptionInput.Type;

// Output Schema
export const IpCommunitiesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IpCommunitiesListBySubscriptionOutput =
  typeof IpCommunitiesListBySubscriptionOutput.Type;

// The operation
/**
 * List IP Communities by subscription.
 *
 * Implements IP Communities list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const IpCommunitiesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IpCommunitiesListBySubscriptionInput,
    outputSchema: IpCommunitiesListBySubscriptionOutput,
  }));
// Input Schema
export const IpCommunitiesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipCommunities/{ipCommunityName}",
    }),
  );
export type IpCommunitiesUpdateInput = typeof IpCommunitiesUpdateInput.Type;

// Output Schema
export const IpCommunitiesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IpCommunitiesUpdateOutput = typeof IpCommunitiesUpdateOutput.Type;

// The operation
/**
 * Updates an IP Community.
 *
 * API to update certain properties of the IP Community resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpCommunitiesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IpCommunitiesUpdateInput,
  outputSchema: IpCommunitiesUpdateOutput,
}));
// Input Schema
export const IpExtendedCommunitiesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/{ipExtendedCommunityName}",
    }),
  );
export type IpExtendedCommunitiesCreateInput =
  typeof IpExtendedCommunitiesCreateInput.Type;

// Output Schema
export const IpExtendedCommunitiesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IpExtendedCommunitiesCreateOutput =
  typeof IpExtendedCommunitiesCreateOutput.Type;

// The operation
/**
 * Create an IP Extended Community.
 *
 * Implements IP Extended Community PUT method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpExtendedCommunitiesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IpExtendedCommunitiesCreateInput,
    outputSchema: IpExtendedCommunitiesCreateOutput,
  }),
);
// Input Schema
export const IpExtendedCommunitiesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/{ipExtendedCommunityName}",
    }),
  );
export type IpExtendedCommunitiesDeleteInput =
  typeof IpExtendedCommunitiesDeleteInput.Type;

// Output Schema
export const IpExtendedCommunitiesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IpExtendedCommunitiesDeleteOutput =
  typeof IpExtendedCommunitiesDeleteOutput.Type;

// The operation
/**
 * Deletes the IP Extended Community.
 *
 * Implements IP Extended Community DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpExtendedCommunitiesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IpExtendedCommunitiesDeleteInput,
    outputSchema: IpExtendedCommunitiesDeleteOutput,
  }),
);
// Input Schema
export const IpExtendedCommunitiesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/{ipExtendedCommunityName}",
    }),
  );
export type IpExtendedCommunitiesGetInput =
  typeof IpExtendedCommunitiesGetInput.Type;

// Output Schema
export const IpExtendedCommunitiesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IpExtendedCommunitiesGetOutput =
  typeof IpExtendedCommunitiesGetOutput.Type;

// The operation
/**
 * Gets an IP Extended Community.
 *
 * Implements IP Extended Community GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpExtendedCommunitiesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IpExtendedCommunitiesGetInput,
    outputSchema: IpExtendedCommunitiesGetOutput,
  }),
);
// Input Schema
export const IpExtendedCommunitiesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities",
    }),
  );
export type IpExtendedCommunitiesListByResourceGroupInput =
  typeof IpExtendedCommunitiesListByResourceGroupInput.Type;

// Output Schema
export const IpExtendedCommunitiesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IpExtendedCommunitiesListByResourceGroupOutput =
  typeof IpExtendedCommunitiesListByResourceGroupOutput.Type;

// The operation
/**
 * List IpExtendedCommunities by resource group.
 *
 * Implements IpExtendedCommunities list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpExtendedCommunitiesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IpExtendedCommunitiesListByResourceGroupInput,
    outputSchema: IpExtendedCommunitiesListByResourceGroupOutput,
  }));
// Input Schema
export const IpExtendedCommunitiesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities",
    }),
  );
export type IpExtendedCommunitiesListBySubscriptionInput =
  typeof IpExtendedCommunitiesListBySubscriptionInput.Type;

// Output Schema
export const IpExtendedCommunitiesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IpExtendedCommunitiesListBySubscriptionOutput =
  typeof IpExtendedCommunitiesListBySubscriptionOutput.Type;

// The operation
/**
 * List IpExtendedCommunities by subscription.
 *
 * Implements IpExtendedCommunities list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const IpExtendedCommunitiesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IpExtendedCommunitiesListBySubscriptionInput,
    outputSchema: IpExtendedCommunitiesListBySubscriptionOutput,
  }));
// Input Schema
export const IpExtendedCommunitiesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/{ipExtendedCommunityName}",
    }),
  );
export type IpExtendedCommunitiesUpdateInput =
  typeof IpExtendedCommunitiesUpdateInput.Type;

// Output Schema
export const IpExtendedCommunitiesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type IpExtendedCommunitiesUpdateOutput =
  typeof IpExtendedCommunitiesUpdateOutput.Type;

// The operation
/**
 * Updates the IP Extended Community.
 *
 * API to update certain properties of the IP Extended Community resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpExtendedCommunitiesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IpExtendedCommunitiesUpdateInput,
    outputSchema: IpExtendedCommunitiesUpdateOutput,
  }),
);
// Input Schema
export const IpPrefixesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/{ipPrefixName}",
  }),
);
export type IpPrefixesCreateInput = typeof IpPrefixesCreateInput.Type;

// Output Schema
export const IpPrefixesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type IpPrefixesCreateOutput = typeof IpPrefixesCreateOutput.Type;

// The operation
/**
 * Create an IP Prefix.
 *
 * Implements IP Prefix PUT method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpPrefixesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IpPrefixesCreateInput,
  outputSchema: IpPrefixesCreateOutput,
}));
// Input Schema
export const IpPrefixesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/{ipPrefixName}",
  }),
);
export type IpPrefixesDeleteInput = typeof IpPrefixesDeleteInput.Type;

// Output Schema
export const IpPrefixesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IpPrefixesDeleteOutput = typeof IpPrefixesDeleteOutput.Type;

// The operation
/**
 * Deletes the IP Prefix.
 *
 * Implements IP Prefix DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpPrefixesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IpPrefixesDeleteInput,
  outputSchema: IpPrefixesDeleteOutput,
}));
// Input Schema
export const IpPrefixesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/{ipPrefixName}",
  }),
);
export type IpPrefixesGetInput = typeof IpPrefixesGetInput.Type;

// Output Schema
export const IpPrefixesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type IpPrefixesGetOutput = typeof IpPrefixesGetOutput.Type;

// The operation
/**
 * Gets an IP Prefix.
 *
 * Implements IP Prefix GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpPrefixesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IpPrefixesGetInput,
  outputSchema: IpPrefixesGetOutput,
}));
// Input Schema
export const IpPrefixesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipPrefixes",
    }),
  );
export type IpPrefixesListByResourceGroupInput =
  typeof IpPrefixesListByResourceGroupInput.Type;

// Output Schema
export const IpPrefixesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IpPrefixesListByResourceGroupOutput =
  typeof IpPrefixesListByResourceGroupOutput.Type;

// The operation
/**
 * List IpPrefixes by resource group.
 *
 * Implements IpPrefixes list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpPrefixesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IpPrefixesListByResourceGroupInput,
    outputSchema: IpPrefixesListByResourceGroupOutput,
  }));
// Input Schema
export const IpPrefixesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/ipPrefixes",
    }),
  );
export type IpPrefixesListBySubscriptionInput =
  typeof IpPrefixesListBySubscriptionInput.Type;

// Output Schema
export const IpPrefixesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IpPrefixesListBySubscriptionOutput =
  typeof IpPrefixesListBySubscriptionOutput.Type;

// The operation
/**
 * List IpPrefixes by subscription.
 *
 * Implements IpPrefixes list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const IpPrefixesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IpPrefixesListBySubscriptionInput,
    outputSchema: IpPrefixesListBySubscriptionOutput,
  }));
// Input Schema
export const IpPrefixesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/{ipPrefixName}",
  }),
);
export type IpPrefixesUpdateInput = typeof IpPrefixesUpdateInput.Type;

// Output Schema
export const IpPrefixesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type IpPrefixesUpdateOutput = typeof IpPrefixesUpdateOutput.Type;

// The operation
/**
 * Updates the IP Prefix.
 *
 * API to update certain properties of the IP Prefix resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const IpPrefixesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IpPrefixesUpdateInput,
  outputSchema: IpPrefixesUpdateOutput,
}));
// Input Schema
export const L2IsolationDomainsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}",
    }),
  );
export type L2IsolationDomainsCreateInput =
  typeof L2IsolationDomainsCreateInput.Type;

// Output Schema
export const L2IsolationDomainsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L2IsolationDomainsCreateOutput =
  typeof L2IsolationDomainsCreateOutput.Type;

// The operation
/**
 * Create L2 Isolation Domain.
 *
 * Creates layer 2 network connectivity between compute nodes within a rack and across racks.The configuration is applied on the devices only after the isolation domain is enabled.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L2IsolationDomainsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L2IsolationDomainsCreateInput,
    outputSchema: L2IsolationDomainsCreateOutput,
  }),
);
// Input Schema
export const L2IsolationDomainsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}",
    }),
  );
export type L2IsolationDomainsDeleteInput =
  typeof L2IsolationDomainsDeleteInput.Type;

// Output Schema
export const L2IsolationDomainsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type L2IsolationDomainsDeleteOutput =
  typeof L2IsolationDomainsDeleteOutput.Type;

// The operation
/**
 * Deletes the L2 Isolation Domain.
 *
 * Deletes layer 2 connectivity between compute nodes by managed by named L2 Isolation name.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L2IsolationDomainsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L2IsolationDomainsDeleteInput,
    outputSchema: L2IsolationDomainsDeleteOutput,
  }),
);
// Input Schema
export const L2IsolationDomainsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}",
    }),
  );
export type L2IsolationDomainsGetInput = typeof L2IsolationDomainsGetInput.Type;

// Output Schema
export const L2IsolationDomainsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L2IsolationDomainsGetOutput =
  typeof L2IsolationDomainsGetOutput.Type;

// The operation
/**
 * Retrieves details of this L2 Isolation Domain.
 *
 * Implements L2 Isolation Domain GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L2IsolationDomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L2IsolationDomainsGetInput,
    outputSchema: L2IsolationDomainsGetOutput,
  }),
);
// Input Schema
export const L2IsolationDomainsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains",
    }),
  );
export type L2IsolationDomainsListByResourceGroupInput =
  typeof L2IsolationDomainsListByResourceGroupInput.Type;

// Output Schema
export const L2IsolationDomainsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type L2IsolationDomainsListByResourceGroupOutput =
  typeof L2IsolationDomainsListByResourceGroupOutput.Type;

// The operation
/**
 * List L2IsolationDomains by resource group.
 *
 * Displays L2IsolationDomains list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L2IsolationDomainsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: L2IsolationDomainsListByResourceGroupInput,
    outputSchema: L2IsolationDomainsListByResourceGroupOutput,
  }));
// Input Schema
export const L2IsolationDomainsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains",
    }),
  );
export type L2IsolationDomainsListBySubscriptionInput =
  typeof L2IsolationDomainsListBySubscriptionInput.Type;

// Output Schema
export const L2IsolationDomainsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type L2IsolationDomainsListBySubscriptionOutput =
  typeof L2IsolationDomainsListBySubscriptionOutput.Type;

// The operation
/**
 * List L2IsolationDomains by subscription.
 *
 * Displays L2IsolationDomains list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const L2IsolationDomainsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: L2IsolationDomainsListBySubscriptionInput,
    outputSchema: L2IsolationDomainsListBySubscriptionOutput,
  }));
// Input Schema
export const L2IsolationDomainsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l2IsolationDomains/{l2IsolationDomainName}",
    }),
  );
export type L2IsolationDomainsUpdateInput =
  typeof L2IsolationDomainsUpdateInput.Type;

// Output Schema
export const L2IsolationDomainsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L2IsolationDomainsUpdateOutput =
  typeof L2IsolationDomainsUpdateOutput.Type;

// The operation
/**
 * Updates the L2 Isolation Domain.
 *
 * API to update certain properties of the L2 Isolation Domain resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L2IsolationDomainsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L2IsolationDomainsUpdateInput,
    outputSchema: L2IsolationDomainsUpdateOutput,
  }),
);
// Input Schema
export const L3IsolationDomainsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}",
    }),
  );
export type L3IsolationDomainsCreateInput =
  typeof L3IsolationDomainsCreateInput.Type;

// Output Schema
export const L3IsolationDomainsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L3IsolationDomainsCreateOutput =
  typeof L3IsolationDomainsCreateOutput.Type;

// The operation
/**
 * Create L3 Isolation Domain.
 *
 * Create isolation domain resources for layer 3 connectivity between compute nodes and for communication with external services .This configuration is applied on the devices only after the creation of networks is completed and isolation domain is enabled.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L3IsolationDomainsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L3IsolationDomainsCreateInput,
    outputSchema: L3IsolationDomainsCreateOutput,
  }),
);
// Input Schema
export const L3IsolationDomainsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}",
    }),
  );
export type L3IsolationDomainsDeleteInput =
  typeof L3IsolationDomainsDeleteInput.Type;

// Output Schema
export const L3IsolationDomainsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type L3IsolationDomainsDeleteOutput =
  typeof L3IsolationDomainsDeleteOutput.Type;

// The operation
/**
 * Deletes a L3 Isolation Domain.
 *
 * Deletes layer 3 connectivity between compute nodes by managed by named L3 Isolation name.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L3IsolationDomainsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L3IsolationDomainsDeleteInput,
    outputSchema: L3IsolationDomainsDeleteOutput,
  }),
);
// Input Schema
export const L3IsolationDomainsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}",
    }),
  );
export type L3IsolationDomainsGetInput = typeof L3IsolationDomainsGetInput.Type;

// Output Schema
export const L3IsolationDomainsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L3IsolationDomainsGetOutput =
  typeof L3IsolationDomainsGetOutput.Type;

// The operation
/**
 * Gets a L3 Isolation Domain.
 *
 * Retrieves details of this L3 Isolation Domain.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L3IsolationDomainsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L3IsolationDomainsGetInput,
    outputSchema: L3IsolationDomainsGetOutput,
  }),
);
// Input Schema
export const L3IsolationDomainsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains",
    }),
  );
export type L3IsolationDomainsListByResourceGroupInput =
  typeof L3IsolationDomainsListByResourceGroupInput.Type;

// Output Schema
export const L3IsolationDomainsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type L3IsolationDomainsListByResourceGroupOutput =
  typeof L3IsolationDomainsListByResourceGroupOutput.Type;

// The operation
/**
 * List L3IsolationDomains by resource group.
 *
 * Displays L3IsolationDomains list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L3IsolationDomainsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: L3IsolationDomainsListByResourceGroupInput,
    outputSchema: L3IsolationDomainsListByResourceGroupOutput,
  }));
// Input Schema
export const L3IsolationDomainsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains",
    }),
  );
export type L3IsolationDomainsListBySubscriptionInput =
  typeof L3IsolationDomainsListBySubscriptionInput.Type;

// Output Schema
export const L3IsolationDomainsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type L3IsolationDomainsListBySubscriptionOutput =
  typeof L3IsolationDomainsListBySubscriptionOutput.Type;

// The operation
/**
 * List L3IsolationDomains by subscription.
 *
 * Displays L3IsolationDomains list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const L3IsolationDomainsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: L3IsolationDomainsListBySubscriptionInput,
    outputSchema: L3IsolationDomainsListBySubscriptionOutput,
  }));
// Input Schema
export const L3IsolationDomainsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}",
    }),
  );
export type L3IsolationDomainsUpdateInput =
  typeof L3IsolationDomainsUpdateInput.Type;

// Output Schema
export const L3IsolationDomainsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type L3IsolationDomainsUpdateOutput =
  typeof L3IsolationDomainsUpdateOutput.Type;

// The operation
/**
 * Updates a L3 Isolation Domain.
 *
 * API to update certain properties of the L3 Isolation Domain resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const L3IsolationDomainsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: L3IsolationDomainsUpdateInput,
    outputSchema: L3IsolationDomainsUpdateOutput,
  }),
);
// Input Schema
export const NeighborGroupsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/neighborGroups/{neighborGroupName}",
    }),
  );
export type NeighborGroupsCreateInput = typeof NeighborGroupsCreateInput.Type;

// Output Schema
export const NeighborGroupsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NeighborGroupsCreateOutput = typeof NeighborGroupsCreateOutput.Type;

// The operation
/**
 * Creates the Neighbor Group.
 *
 * Implements the Neighbor Group PUT method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NeighborGroupsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NeighborGroupsCreateInput,
    outputSchema: NeighborGroupsCreateOutput,
  }),
);
// Input Schema
export const NeighborGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/neighborGroups/{neighborGroupName}",
    }),
  );
export type NeighborGroupsDeleteInput = typeof NeighborGroupsDeleteInput.Type;

// Output Schema
export const NeighborGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NeighborGroupsDeleteOutput = typeof NeighborGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a Neighbor Group.
 *
 * Implements Neighbor Group DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NeighborGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NeighborGroupsDeleteInput,
    outputSchema: NeighborGroupsDeleteOutput,
  }),
);
// Input Schema
export const NeighborGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/neighborGroups/{neighborGroupName}",
  }),
);
export type NeighborGroupsGetInput = typeof NeighborGroupsGetInput.Type;

// Output Schema
export const NeighborGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NeighborGroupsGetOutput = typeof NeighborGroupsGetOutput.Type;

// The operation
/**
 * Retrieves details of neighbor Group using GET method.
 *
 * Gets the Neighbor Group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NeighborGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NeighborGroupsGetInput,
  outputSchema: NeighborGroupsGetOutput,
}));
// Input Schema
export const NeighborGroupsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/neighborGroups",
    }),
  );
export type NeighborGroupsListByResourceGroupInput =
  typeof NeighborGroupsListByResourceGroupInput.Type;

// Output Schema
export const NeighborGroupsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NeighborGroupsListByResourceGroupOutput =
  typeof NeighborGroupsListByResourceGroupOutput.Type;

// The operation
/**
 * List Neighbor Groups by resource group.
 *
 * Displays NeighborGroups list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NeighborGroupsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NeighborGroupsListByResourceGroupInput,
    outputSchema: NeighborGroupsListByResourceGroupOutput,
  }));
// Input Schema
export const NeighborGroupsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/neighborGroups",
    }),
  );
export type NeighborGroupsListBySubscriptionInput =
  typeof NeighborGroupsListBySubscriptionInput.Type;

// Output Schema
export const NeighborGroupsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NeighborGroupsListBySubscriptionOutput =
  typeof NeighborGroupsListBySubscriptionOutput.Type;

// The operation
/**
 * List Neighbor Groups by subscription.
 *
 * Displays NeighborGroups list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NeighborGroupsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NeighborGroupsListBySubscriptionInput,
    outputSchema: NeighborGroupsListBySubscriptionOutput,
  }));
// Input Schema
export const NeighborGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/neighborGroups/{neighborGroupName}",
    }),
  );
export type NeighborGroupsUpdateInput = typeof NeighborGroupsUpdateInput.Type;

// Output Schema
export const NeighborGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NeighborGroupsUpdateOutput = typeof NeighborGroupsUpdateOutput.Type;

// The operation
/**
 * API to update certain properties of the Neighbor Group Resources.
 *
 * Updates the Neighbor Group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NeighborGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NeighborGroupsUpdateInput,
    outputSchema: NeighborGroupsUpdateOutput,
  }),
);
// Input Schema
export const NetworkDevicesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}",
    }),
  );
export type NetworkDevicesCreateInput = typeof NetworkDevicesCreateInput.Type;

// Output Schema
export const NetworkDevicesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkDevicesCreateOutput = typeof NetworkDevicesCreateOutput.Type;

// The operation
/**
 * Create Network Device.
 *
 * Create a Network Device resource
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkDevicesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkDevicesCreateInput,
    outputSchema: NetworkDevicesCreateOutput,
  }),
);
// Input Schema
export const NetworkDevicesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}",
    }),
  );
export type NetworkDevicesDeleteInput = typeof NetworkDevicesDeleteInput.Type;

// Output Schema
export const NetworkDevicesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkDevicesDeleteOutput = typeof NetworkDevicesDeleteOutput.Type;

// The operation
/**
 * Deletes a Network Device.
 *
 * Delete the Network Device resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkDevicesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkDevicesDeleteInput,
    outputSchema: NetworkDevicesDeleteOutput,
  }),
);
// Input Schema
export const NetworkDevicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}",
  }),
);
export type NetworkDevicesGetInput = typeof NetworkDevicesGetInput.Type;

// Output Schema
export const NetworkDevicesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkDevicesGetOutput = typeof NetworkDevicesGetOutput.Type;

// The operation
/**
 * Gets a Network Device.
 *
 * Gets the Network Device resource details.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkDevicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkDevicesGetInput,
  outputSchema: NetworkDevicesGetOutput,
}));
// Input Schema
export const NetworkDeviceSkusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkDeviceSkus/{networkDeviceSkuName}",
    }),
  );
export type NetworkDeviceSkusGetInput = typeof NetworkDeviceSkusGetInput.Type;

// Output Schema
export const NetworkDeviceSkusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkDeviceSkusGetOutput = typeof NetworkDeviceSkusGetOutput.Type;

// The operation
/**
 * Gets a Network Device Sku.
 *
 * Get a Network Device SKU details.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkDeviceSkusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkDeviceSkusGetInput,
    outputSchema: NetworkDeviceSkusGetOutput,
  }),
);
// Input Schema
export const NetworkDeviceSkusListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkDeviceSkus",
    }),
  );
export type NetworkDeviceSkusListBySubscriptionInput =
  typeof NetworkDeviceSkusListBySubscriptionInput.Type;

// Output Schema
export const NetworkDeviceSkusListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkDeviceSkusListBySubscriptionOutput =
  typeof NetworkDeviceSkusListBySubscriptionOutput.Type;

// The operation
/**
 * List Network Device SKUs by subscription.
 *
 * List Network Device SKUs for the given subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkDeviceSkusListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkDeviceSkusListBySubscriptionInput,
    outputSchema: NetworkDeviceSkusListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkDevicesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices",
    }),
  );
export type NetworkDevicesListByResourceGroupInput =
  typeof NetworkDevicesListByResourceGroupInput.Type;

// Output Schema
export const NetworkDevicesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkDevicesListByResourceGroupOutput =
  typeof NetworkDevicesListByResourceGroupOutput.Type;

// The operation
/**
 * List NetworkDevices by resource group.
 *
 * List all the Network Device resources in a given resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkDevicesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkDevicesListByResourceGroupInput,
    outputSchema: NetworkDevicesListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkDevicesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkDevices",
    }),
  );
export type NetworkDevicesListBySubscriptionInput =
  typeof NetworkDevicesListBySubscriptionInput.Type;

// Output Schema
export const NetworkDevicesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkDevicesListBySubscriptionOutput =
  typeof NetworkDevicesListBySubscriptionOutput.Type;

// The operation
/**
 * List NetworkDevices by subscription.
 *
 * List all the Network Device resources in a given subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkDevicesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkDevicesListBySubscriptionInput,
    outputSchema: NetworkDevicesListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkDevicesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}",
    }),
  );
export type NetworkDevicesUpdateInput = typeof NetworkDevicesUpdateInput.Type;

// Output Schema
export const NetworkDevicesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkDevicesUpdateOutput = typeof NetworkDevicesUpdateOutput.Type;

// The operation
/**
 * Updates a Network Device.
 *
 * Update certain properties of the Network Device resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkDevicesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkDevicesUpdateInput,
    outputSchema: NetworkDevicesUpdateOutput,
  }),
);
// Input Schema
export const NetworkFabricControllersCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/{networkFabricControllerName}",
    }),
  );
export type NetworkFabricControllersCreateInput =
  typeof NetworkFabricControllersCreateInput.Type;

// Output Schema
export const NetworkFabricControllersCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFabricControllersCreateOutput =
  typeof NetworkFabricControllersCreateOutput.Type;

// The operation
/**
 * Create Network fabric controller.
 *
 * Creates a Network Fabric Controller.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricControllersCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFabricControllersCreateInput,
    outputSchema: NetworkFabricControllersCreateOutput,
  }));
// Input Schema
export const NetworkFabricControllersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/{networkFabricControllerName}",
    }),
  );
export type NetworkFabricControllersDeleteInput =
  typeof NetworkFabricControllersDeleteInput.Type;

// Output Schema
export const NetworkFabricControllersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkFabricControllersDeleteOutput =
  typeof NetworkFabricControllersDeleteOutput.Type;

// The operation
/**
 * Deletes a Network Fabric Controller.
 *
 * Deletes the Network Fabric Controller resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricControllersDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFabricControllersDeleteInput,
    outputSchema: NetworkFabricControllersDeleteOutput,
  }));
// Input Schema
export const NetworkFabricControllersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/{networkFabricControllerName}",
    }),
  );
export type NetworkFabricControllersGetInput =
  typeof NetworkFabricControllersGetInput.Type;

// Output Schema
export const NetworkFabricControllersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFabricControllersGetOutput =
  typeof NetworkFabricControllersGetOutput.Type;

// The operation
/**
 * Gets a Network Fabric Controller.
 *
 * Shows the provisioning status of Network Fabric Controller.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricControllersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkFabricControllersGetInput,
    outputSchema: NetworkFabricControllersGetOutput,
  }),
);
// Input Schema
export const NetworkFabricControllersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers",
    }),
  );
export type NetworkFabricControllersListByResourceGroupInput =
  typeof NetworkFabricControllersListByResourceGroupInput.Type;

// Output Schema
export const NetworkFabricControllersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFabricControllersListByResourceGroupOutput =
  typeof NetworkFabricControllersListByResourceGroupOutput.Type;

// The operation
/**
 * List NetworkFabricControllers by resource group.
 *
 * Lists all the NetworkFabricControllers thats available in the resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricControllersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFabricControllersListByResourceGroupInput,
    outputSchema: NetworkFabricControllersListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkFabricControllersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers",
    }),
  );
export type NetworkFabricControllersListBySubscriptionInput =
  typeof NetworkFabricControllersListBySubscriptionInput.Type;

// Output Schema
export const NetworkFabricControllersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFabricControllersListBySubscriptionOutput =
  typeof NetworkFabricControllersListBySubscriptionOutput.Type;

// The operation
/**
 * List NetworkFabricControllers by subscription.
 *
 * Lists all the NetworkFabricControllers by subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricControllersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFabricControllersListBySubscriptionInput,
    outputSchema: NetworkFabricControllersListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkFabricControllersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabricControllers/{networkFabricControllerName}",
    }),
  );
export type NetworkFabricControllersUpdateInput =
  typeof NetworkFabricControllersUpdateInput.Type;

// Output Schema
export const NetworkFabricControllersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFabricControllersUpdateOutput =
  typeof NetworkFabricControllersUpdateOutput.Type;

// The operation
/**
 * Updates a Network Fabric Controller.
 *
 * Updates are currently not supported for the Network Fabric Controller resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricControllersUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFabricControllersUpdateInput,
    outputSchema: NetworkFabricControllersUpdateOutput,
  }));
// Input Schema
export const NetworkFabricsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}",
    }),
  );
export type NetworkFabricsCreateInput = typeof NetworkFabricsCreateInput.Type;

// Output Schema
export const NetworkFabricsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFabricsCreateOutput = typeof NetworkFabricsCreateOutput.Type;

// The operation
/**
 * Create Network Fabric.
 *
 * Create Network Fabric resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkFabricsCreateInput,
    outputSchema: NetworkFabricsCreateOutput,
  }),
);
// Input Schema
export const NetworkFabricsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}",
    }),
  );
export type NetworkFabricsDeleteInput = typeof NetworkFabricsDeleteInput.Type;

// Output Schema
export const NetworkFabricsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkFabricsDeleteOutput = typeof NetworkFabricsDeleteOutput.Type;

// The operation
/**
 * Deletes a Network Fabric.
 *
 * Delete Network Fabric resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkFabricsDeleteInput,
    outputSchema: NetworkFabricsDeleteOutput,
  }),
);
// Input Schema
export const NetworkFabricsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}",
  }),
);
export type NetworkFabricsGetInput = typeof NetworkFabricsGetInput.Type;

// Output Schema
export const NetworkFabricsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFabricsGetOutput = typeof NetworkFabricsGetOutput.Type;

// The operation
/**
 * Gets a Network Fabric.
 *
 * Get Network Fabric resource details.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkFabricsGetInput,
  outputSchema: NetworkFabricsGetOutput,
}));
// Input Schema
export const NetworkFabricSkusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkFabricSkus/{networkFabricSkuName}",
    }),
  );
export type NetworkFabricSkusGetInput = typeof NetworkFabricSkusGetInput.Type;

// Output Schema
export const NetworkFabricSkusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkFabricSkusGetOutput = typeof NetworkFabricSkusGetOutput.Type;

// The operation
/**
 * Gets a Network Fabric Sku.
 *
 * Implements Network Fabric SKU GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricSkusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkFabricSkusGetInput,
    outputSchema: NetworkFabricSkusGetOutput,
  }),
);
// Input Schema
export const NetworkFabricSkusListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkFabricSkus",
    }),
  );
export type NetworkFabricSkusListBySubscriptionInput =
  typeof NetworkFabricSkusListBySubscriptionInput.Type;

// Output Schema
export const NetworkFabricSkusListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFabricSkusListBySubscriptionOutput =
  typeof NetworkFabricSkusListBySubscriptionOutput.Type;

// The operation
/**
 * List Network Fabric SKUs by subscription.
 *
 * Implements Network Fabric SKUs list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricSkusListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFabricSkusListBySubscriptionInput,
    outputSchema: NetworkFabricSkusListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkFabricsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics",
    }),
  );
export type NetworkFabricsListByResourceGroupInput =
  typeof NetworkFabricsListByResourceGroupInput.Type;

// Output Schema
export const NetworkFabricsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFabricsListByResourceGroupOutput =
  typeof NetworkFabricsListByResourceGroupOutput.Type;

// The operation
/**
 * List Network Fabrics by resource group.
 *
 * List all the Network Fabric resources in the given resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFabricsListByResourceGroupInput,
    outputSchema: NetworkFabricsListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkFabricsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkFabrics",
    }),
  );
export type NetworkFabricsListBySubscriptionInput =
  typeof NetworkFabricsListBySubscriptionInput.Type;

// Output Schema
export const NetworkFabricsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkFabricsListBySubscriptionOutput =
  typeof NetworkFabricsListBySubscriptionOutput.Type;

// The operation
/**
 * List Network Fabrics by subscription.
 *
 * List all the Network Fabric resources in the given subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkFabricsListBySubscriptionInput,
    outputSchema: NetworkFabricsListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkFabricsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}",
    }),
  );
export type NetworkFabricsUpdateInput = typeof NetworkFabricsUpdateInput.Type;

// Output Schema
export const NetworkFabricsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkFabricsUpdateOutput = typeof NetworkFabricsUpdateOutput.Type;

// The operation
/**
 * Updates a Network Fabric.
 *
 * Update certain properties of the Network Fabric resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkFabricsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkFabricsUpdateInput,
    outputSchema: NetworkFabricsUpdateOutput,
  }),
);
// Input Schema
export const NetworkInterfacesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}",
    }),
  );
export type NetworkInterfacesCreateInput =
  typeof NetworkInterfacesCreateInput.Type;

// Output Schema
export const NetworkInterfacesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkInterfacesCreateOutput =
  typeof NetworkInterfacesCreateOutput.Type;

// The operation
/**
 * Create NetworkInterface.
 *
 * Create a Network Interface resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkInterfacesCreateInput,
    outputSchema: NetworkInterfacesCreateOutput,
  }),
);
// Input Schema
export const NetworkInterfacesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}",
    }),
  );
export type NetworkInterfacesDeleteInput =
  typeof NetworkInterfacesDeleteInput.Type;

// Output Schema
export const NetworkInterfacesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkInterfacesDeleteOutput =
  typeof NetworkInterfacesDeleteOutput.Type;

// The operation
/**
 * Deletes a NetworkInterface.
 *
 * Delete the Network Interface resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkInterfacesDeleteInput,
    outputSchema: NetworkInterfacesDeleteOutput,
  }),
);
// Input Schema
export const NetworkInterfacesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}",
    }),
  );
export type NetworkInterfacesGetInput = typeof NetworkInterfacesGetInput.Type;

// Output Schema
export const NetworkInterfacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkInterfacesGetOutput = typeof NetworkInterfacesGetOutput.Type;

// The operation
/**
 * Gets a NetworkInterface.
 *
 * Get the Network Interface resource details.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkInterfacesGetInput,
    outputSchema: NetworkInterfacesGetOutput,
  }),
);
// Input Schema
export const NetworkInterfacesListByNetworkDeviceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces",
    }),
  );
export type NetworkInterfacesListByNetworkDeviceInput =
  typeof NetworkInterfacesListByNetworkDeviceInput.Type;

// Output Schema
export const NetworkInterfacesListByNetworkDeviceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkInterfacesListByNetworkDeviceOutput =
  typeof NetworkInterfacesListByNetworkDeviceOutput.Type;

// The operation
/**
 * List all Network Interfaces that are available using an Network Device.
 *
 * List all the Network Interface resources in a given resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesListByNetworkDevice =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkInterfacesListByNetworkDeviceInput,
    outputSchema: NetworkInterfacesListByNetworkDeviceOutput,
  }));
// Input Schema
export const NetworkInterfacesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkDevices/{networkDeviceName}/networkInterfaces/{networkInterfaceName}",
    }),
  );
export type NetworkInterfacesUpdateInput =
  typeof NetworkInterfacesUpdateInput.Type;

// Output Schema
export const NetworkInterfacesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkInterfacesUpdateOutput =
  typeof NetworkInterfacesUpdateOutput.Type;

// The operation
/**
 * Updates a NetworkInterface.
 *
 * Update certain properties of the Network Interface resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkInterfacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkInterfacesUpdateInput,
    outputSchema: NetworkInterfacesUpdateOutput,
  }),
);
// Input Schema
export const NetworkPacketBrokersCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers/{networkPacketBrokerName}",
    }),
  );
export type NetworkPacketBrokersCreateInput =
  typeof NetworkPacketBrokersCreateInput.Type;

// Output Schema
export const NetworkPacketBrokersCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkPacketBrokersCreateOutput =
  typeof NetworkPacketBrokersCreateOutput.Type;

// The operation
/**
 * Create Network Packet Broker.
 *
 * Creates a Network Packet Broker.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkPacketBrokersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkPacketBrokersCreateInput,
    outputSchema: NetworkPacketBrokersCreateOutput,
  }),
);
// Input Schema
export const NetworkPacketBrokersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers/{networkPacketBrokerName}",
    }),
  );
export type NetworkPacketBrokersDeleteInput =
  typeof NetworkPacketBrokersDeleteInput.Type;

// Output Schema
export const NetworkPacketBrokersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkPacketBrokersDeleteOutput =
  typeof NetworkPacketBrokersDeleteOutput.Type;

// The operation
/**
 * Deletes a Network Packet Broker.
 *
 * Deletes Network Packet Broker.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkPacketBrokersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkPacketBrokersDeleteInput,
    outputSchema: NetworkPacketBrokersDeleteOutput,
  }),
);
// Input Schema
export const NetworkPacketBrokersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers/{networkPacketBrokerName}",
    }),
  );
export type NetworkPacketBrokersGetInput =
  typeof NetworkPacketBrokersGetInput.Type;

// Output Schema
export const NetworkPacketBrokersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkPacketBrokersGetOutput =
  typeof NetworkPacketBrokersGetOutput.Type;

// The operation
/**
 * Gets a Network Packet Broker.
 *
 * Retrieves details of this Network Packet Broker.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkPacketBrokersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkPacketBrokersGetInput,
    outputSchema: NetworkPacketBrokersGetOutput,
  }),
);
// Input Schema
export const NetworkPacketBrokersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers",
    }),
  );
export type NetworkPacketBrokersListByResourceGroupInput =
  typeof NetworkPacketBrokersListByResourceGroupInput.Type;

// Output Schema
export const NetworkPacketBrokersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkPacketBrokersListByResourceGroupOutput =
  typeof NetworkPacketBrokersListByResourceGroupOutput.Type;

// The operation
/**
 * List all Network Packet Brokers under resource group.
 *
 * Displays NetworkPacketBrokers list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkPacketBrokersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkPacketBrokersListByResourceGroupInput,
    outputSchema: NetworkPacketBrokersListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkPacketBrokersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers",
    }),
  );
export type NetworkPacketBrokersListBySubscriptionInput =
  typeof NetworkPacketBrokersListBySubscriptionInput.Type;

// Output Schema
export const NetworkPacketBrokersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkPacketBrokersListBySubscriptionOutput =
  typeof NetworkPacketBrokersListBySubscriptionOutput.Type;

// The operation
/**
 * List Network Packet Brokers by subscription.
 *
 * Displays Network Packet Brokers list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkPacketBrokersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkPacketBrokersListBySubscriptionInput,
    outputSchema: NetworkPacketBrokersListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkPacketBrokersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkPacketBrokers/{networkPacketBrokerName}",
    }),
  );
export type NetworkPacketBrokersUpdateInput =
  typeof NetworkPacketBrokersUpdateInput.Type;

// Output Schema
export const NetworkPacketBrokersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkPacketBrokersUpdateOutput =
  typeof NetworkPacketBrokersUpdateOutput.Type;

// The operation
/**
 * Updates the Network Packet Broker.
 *
 * API to update certain properties of the Network Packet Broker resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkPacketBrokersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkPacketBrokersUpdateInput,
    outputSchema: NetworkPacketBrokersUpdateOutput,
  }),
);
// Input Schema
export const NetworkRacksCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkRacks/{networkRackName}",
    }),
  );
export type NetworkRacksCreateInput = typeof NetworkRacksCreateInput.Type;

// Output Schema
export const NetworkRacksCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkRacksCreateOutput = typeof NetworkRacksCreateOutput.Type;

// The operation
/**
 * Create Network Rack.
 *
 * Create Network Rack resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkRacksCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkRacksCreateInput,
  outputSchema: NetworkRacksCreateOutput,
}));
// Input Schema
export const NetworkRacksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkRacks/{networkRackName}",
    }),
  );
export type NetworkRacksDeleteInput = typeof NetworkRacksDeleteInput.Type;

// Output Schema
export const NetworkRacksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkRacksDeleteOutput = typeof NetworkRacksDeleteOutput.Type;

// The operation
/**
 * Deletes a Network Rack.
 *
 * Delete Network Rack resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkRacksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkRacksDeleteInput,
  outputSchema: NetworkRacksDeleteOutput,
}));
// Input Schema
export const NetworkRacksGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkRacks/{networkRackName}",
  }),
);
export type NetworkRacksGetInput = typeof NetworkRacksGetInput.Type;

// Output Schema
export const NetworkRacksGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type NetworkRacksGetOutput = typeof NetworkRacksGetOutput.Type;

// The operation
/**
 * Gets a Network Rack.
 *
 * Get Network Rack resource details.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkRacksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkRacksGetInput,
  outputSchema: NetworkRacksGetOutput,
}));
// Input Schema
export const NetworkRacksListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkRacks",
    }),
  );
export type NetworkRacksListByResourceGroupInput =
  typeof NetworkRacksListByResourceGroupInput.Type;

// Output Schema
export const NetworkRacksListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkRacksListByResourceGroupOutput =
  typeof NetworkRacksListByResourceGroupOutput.Type;

// The operation
/**
 * List Network Racks by resource group.
 *
 * List all Network Rack resources in the given resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkRacksListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkRacksListByResourceGroupInput,
    outputSchema: NetworkRacksListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkRacksListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkRacks",
    }),
  );
export type NetworkRacksListBySubscriptionInput =
  typeof NetworkRacksListBySubscriptionInput.Type;

// Output Schema
export const NetworkRacksListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkRacksListBySubscriptionOutput =
  typeof NetworkRacksListBySubscriptionOutput.Type;

// The operation
/**
 * List Network Racks by subscription.
 *
 * List all Network Rack resources in the given subscription
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkRacksListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkRacksListBySubscriptionInput,
    outputSchema: NetworkRacksListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkRacksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkRacks/{networkRackName}",
    }),
  );
export type NetworkRacksUpdateInput = typeof NetworkRacksUpdateInput.Type;

// Output Schema
export const NetworkRacksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkRacksUpdateOutput = typeof NetworkRacksUpdateOutput.Type;

// The operation
/**
 * Updates a Network Rack.
 *
 * Update certain properties of the Network Rack resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkRacksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkRacksUpdateInput,
  outputSchema: NetworkRacksUpdateOutput,
}));
// Input Schema
export const NetworkTapRulesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}",
    }),
  );
export type NetworkTapRulesCreateInput = typeof NetworkTapRulesCreateInput.Type;

// Output Schema
export const NetworkTapRulesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkTapRulesCreateOutput =
  typeof NetworkTapRulesCreateOutput.Type;

// The operation
/**
 * Create Network Tap Rule.
 *
 * Create Network Tap Rule resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapRulesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkTapRulesCreateInput,
    outputSchema: NetworkTapRulesCreateOutput,
  }),
);
// Input Schema
export const NetworkTapRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}",
    }),
  );
export type NetworkTapRulesDeleteInput = typeof NetworkTapRulesDeleteInput.Type;

// Output Schema
export const NetworkTapRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkTapRulesDeleteOutput =
  typeof NetworkTapRulesDeleteOutput.Type;

// The operation
/**
 * Deletes a Network Tap Rule.
 *
 * Delete Network Tap Rule resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkTapRulesDeleteInput,
    outputSchema: NetworkTapRulesDeleteOutput,
  }),
);
// Input Schema
export const NetworkTapRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}",
    }),
  );
export type NetworkTapRulesGetInput = typeof NetworkTapRulesGetInput.Type;

// Output Schema
export const NetworkTapRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkTapRulesGetOutput = typeof NetworkTapRulesGetOutput.Type;

// The operation
/**
 * Gets a Network Tap Rule.
 *
 * Get Network Tap Rule resource details.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkTapRulesGetInput,
  outputSchema: NetworkTapRulesGetOutput,
}));
// Input Schema
export const NetworkTapRulesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules",
    }),
  );
export type NetworkTapRulesListByResourceGroupInput =
  typeof NetworkTapRulesListByResourceGroupInput.Type;

// Output Schema
export const NetworkTapRulesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkTapRulesListByResourceGroupOutput =
  typeof NetworkTapRulesListByResourceGroupOutput.Type;

// The operation
/**
 * List Network Tap Rules by resource group.
 *
 * List all the Network Tap Rule resources in the given resource group.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapRulesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkTapRulesListByResourceGroupInput,
    outputSchema: NetworkTapRulesListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkTapRulesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkTapRules",
    }),
  );
export type NetworkTapRulesListBySubscriptionInput =
  typeof NetworkTapRulesListBySubscriptionInput.Type;

// Output Schema
export const NetworkTapRulesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkTapRulesListBySubscriptionOutput =
  typeof NetworkTapRulesListBySubscriptionOutput.Type;

// The operation
/**
 * List NetworkTapRules by subscription.
 *
 * List all the Network Tap Rule resources in the given subscription.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapRulesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkTapRulesListBySubscriptionInput,
    outputSchema: NetworkTapRulesListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkTapRulesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTapRules/{networkTapRuleName}",
    }),
  );
export type NetworkTapRulesUpdateInput = typeof NetworkTapRulesUpdateInput.Type;

// Output Schema
export const NetworkTapRulesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkTapRulesUpdateOutput =
  typeof NetworkTapRulesUpdateOutput.Type;

// The operation
/**
 * Updates a Network Tap Rule.
 *
 * Update certain properties of the Network Tap Rule resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapRulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetworkTapRulesUpdateInput,
    outputSchema: NetworkTapRulesUpdateOutput,
  }),
);
// Input Schema
export const NetworkTapsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps/{networkTapName}",
  }),
);
export type NetworkTapsCreateInput = typeof NetworkTapsCreateInput.Type;

// Output Schema
export const NetworkTapsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkTapsCreateOutput = typeof NetworkTapsCreateOutput.Type;

// The operation
/**
 * Create Network Tap.
 *
 * Creates a Network Tap.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkTapsCreateInput,
  outputSchema: NetworkTapsCreateOutput,
}));
// Input Schema
export const NetworkTapsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps/{networkTapName}",
  }),
);
export type NetworkTapsDeleteInput = typeof NetworkTapsDeleteInput.Type;

// Output Schema
export const NetworkTapsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkTapsDeleteOutput = typeof NetworkTapsDeleteOutput.Type;

// The operation
/**
 * Deletes a Network Tap.
 *
 * Deletes Network Tap.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkTapsDeleteInput,
  outputSchema: NetworkTapsDeleteOutput,
}));
// Input Schema
export const NetworkTapsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps/{networkTapName}",
  }),
);
export type NetworkTapsGetInput = typeof NetworkTapsGetInput.Type;

// Output Schema
export const NetworkTapsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type NetworkTapsGetOutput = typeof NetworkTapsGetOutput.Type;

// The operation
/**
 * Gets a Network Tap.
 *
 * Retrieves details of this Network Tap.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkTapsGetInput,
  outputSchema: NetworkTapsGetOutput,
}));
// Input Schema
export const NetworkTapsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps",
    }),
  );
export type NetworkTapsListByResourceGroupInput =
  typeof NetworkTapsListByResourceGroupInput.Type;

// Output Schema
export const NetworkTapsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkTapsListByResourceGroupOutput =
  typeof NetworkTapsListByResourceGroupOutput.Type;

// The operation
/**
 * List Network Taps by resource group.
 *
 * Displays Network Taps list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkTapsListByResourceGroupInput,
    outputSchema: NetworkTapsListByResourceGroupOutput,
  }));
// Input Schema
export const NetworkTapsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkTaps",
    }),
  );
export type NetworkTapsListBySubscriptionInput =
  typeof NetworkTapsListBySubscriptionInput.Type;

// Output Schema
export const NetworkTapsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkTapsListBySubscriptionOutput =
  typeof NetworkTapsListBySubscriptionOutput.Type;

// The operation
/**
 * List Network Taps by subscription.
 *
 * Displays Network Taps list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkTapsListBySubscriptionInput,
    outputSchema: NetworkTapsListBySubscriptionOutput,
  }));
// Input Schema
export const NetworkTapsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkTaps/{networkTapName}",
  }),
);
export type NetworkTapsUpdateInput = typeof NetworkTapsUpdateInput.Type;

// Output Schema
export const NetworkTapsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NetworkTapsUpdateOutput = typeof NetworkTapsUpdateOutput.Type;

// The operation
/**
 * Updates the Network Taps.
 *
 * API to update certain properties of the Network Tap resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkTapsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NetworkTapsUpdateInput,
  outputSchema: NetworkTapsUpdateOutput,
}));
// Input Schema
export const NetworkToNetworkInterconnectsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}",
    }),
  );
export type NetworkToNetworkInterconnectsCreateInput =
  typeof NetworkToNetworkInterconnectsCreateInput.Type;

// Output Schema
export const NetworkToNetworkInterconnectsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkToNetworkInterconnectsCreateOutput =
  typeof NetworkToNetworkInterconnectsCreateOutput.Type;

// The operation
/**
 * Configuration used to setup CE-PE connectivity.
 *
 * Configuration used to setup CE-PE connectivity PUT Method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkToNetworkInterconnectsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkToNetworkInterconnectsCreateInput,
    outputSchema: NetworkToNetworkInterconnectsCreateOutput,
  }));
// Input Schema
export const NetworkToNetworkInterconnectsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}",
    }),
  );
export type NetworkToNetworkInterconnectsDeleteInput =
  typeof NetworkToNetworkInterconnectsDeleteInput.Type;

// Output Schema
export const NetworkToNetworkInterconnectsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NetworkToNetworkInterconnectsDeleteOutput =
  typeof NetworkToNetworkInterconnectsDeleteOutput.Type;

// The operation
/**
 * Deletes a NetworkToNetworkInterconnects.
 *
 * Implements NetworkToNetworkInterconnects DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkToNetworkInterconnectsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkToNetworkInterconnectsDeleteInput,
    outputSchema: NetworkToNetworkInterconnectsDeleteOutput,
  }));
// Input Schema
export const NetworkToNetworkInterconnectsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}",
    }),
  );
export type NetworkToNetworkInterconnectsGetInput =
  typeof NetworkToNetworkInterconnectsGetInput.Type;

// Output Schema
export const NetworkToNetworkInterconnectsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkToNetworkInterconnectsGetOutput =
  typeof NetworkToNetworkInterconnectsGetOutput.Type;

// The operation
/**
 * Configuration used to setup CE-PE connectivity.
 *
 * Implements NetworkToNetworkInterconnects GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkToNetworkInterconnectsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkToNetworkInterconnectsGetInput,
    outputSchema: NetworkToNetworkInterconnectsGetOutput,
  }));
// Input Schema
export const NetworkToNetworkInterconnectsListByNetworkFabricInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects",
    }),
  );
export type NetworkToNetworkInterconnectsListByNetworkFabricInput =
  typeof NetworkToNetworkInterconnectsListByNetworkFabricInput.Type;

// Output Schema
export const NetworkToNetworkInterconnectsListByNetworkFabricOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkToNetworkInterconnectsListByNetworkFabricOutput =
  typeof NetworkToNetworkInterconnectsListByNetworkFabricOutput.Type;

// The operation
/**
 * Executes list operation to display Network To Network Interconnects within a Network Fabric.
 *
 * Implements Network To Network Interconnects list by Network Fabric GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkToNetworkInterconnectsListByNetworkFabric =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkToNetworkInterconnectsListByNetworkFabricInput,
    outputSchema: NetworkToNetworkInterconnectsListByNetworkFabricOutput,
  }));
// Input Schema
export const NetworkToNetworkInterconnectsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/networkToNetworkInterconnects/{networkToNetworkInterconnectName}",
    }),
  );
export type NetworkToNetworkInterconnectsUpdateInput =
  typeof NetworkToNetworkInterconnectsUpdateInput.Type;

// Output Schema
export const NetworkToNetworkInterconnectsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkToNetworkInterconnectsUpdateOutput =
  typeof NetworkToNetworkInterconnectsUpdateOutput.Type;

// The operation
/**
 * Updates a Network To NetworkInterconnects.
 *
 * Update certain properties of the Network To NetworkInterconnects resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const NetworkToNetworkInterconnectsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkToNetworkInterconnectsUpdateInput,
    outputSchema: NetworkToNetworkInterconnectsUpdateOutput,
  }));
// Input Schema
export const RoutePoliciesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}",
    }),
  );
export type RoutePoliciesCreateInput = typeof RoutePoliciesCreateInput.Type;

// Output Schema
export const RoutePoliciesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RoutePoliciesCreateOutput = typeof RoutePoliciesCreateOutput.Type;

// The operation
/**
 * Create Route Policy.
 *
 * Implements Route Policy PUT method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const RoutePoliciesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoutePoliciesCreateInput,
  outputSchema: RoutePoliciesCreateOutput,
}));
// Input Schema
export const RoutePoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}",
    }),
  );
export type RoutePoliciesDeleteInput = typeof RoutePoliciesDeleteInput.Type;

// Output Schema
export const RoutePoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RoutePoliciesDeleteOutput = typeof RoutePoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes a Route Policy.
 *
 * Implements Route Policy DELETE method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const RoutePoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoutePoliciesDeleteInput,
  outputSchema: RoutePoliciesDeleteOutput,
}));
// Input Schema
export const RoutePoliciesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}",
  }),
);
export type RoutePoliciesGetInput = typeof RoutePoliciesGetInput.Type;

// Output Schema
export const RoutePoliciesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type RoutePoliciesGetOutput = typeof RoutePoliciesGetOutput.Type;

// The operation
/**
 * Gets a Route Policy.
 *
 * Implements Route Policy GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const RoutePoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoutePoliciesGetInput,
  outputSchema: RoutePoliciesGetOutput,
}));
// Input Schema
export const RoutePoliciesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies",
    }),
  );
export type RoutePoliciesListByResourceGroupInput =
  typeof RoutePoliciesListByResourceGroupInput.Type;

// Output Schema
export const RoutePoliciesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RoutePoliciesListByResourceGroupOutput =
  typeof RoutePoliciesListByResourceGroupOutput.Type;

// The operation
/**
 * List RoutePolicies by resource group.
 *
 * Implements RoutePolicies list by resource group GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const RoutePoliciesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RoutePoliciesListByResourceGroupInput,
    outputSchema: RoutePoliciesListByResourceGroupOutput,
  }));
// Input Schema
export const RoutePoliciesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/routePolicies",
    }),
  );
export type RoutePoliciesListBySubscriptionInput =
  typeof RoutePoliciesListBySubscriptionInput.Type;

// Output Schema
export const RoutePoliciesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RoutePoliciesListBySubscriptionOutput =
  typeof RoutePoliciesListBySubscriptionOutput.Type;

// The operation
/**
 * List RoutePolicies by subscription.
 *
 * Implements RoutePolicies list by subscription GET method.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param api-version - The API version to use for this operation.
 */
export const RoutePoliciesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RoutePoliciesListBySubscriptionInput,
    outputSchema: RoutePoliciesListBySubscriptionOutput,
  }));
// Input Schema
export const RoutePoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/routePolicies/{routePolicyName}",
    }),
  );
export type RoutePoliciesUpdateInput = typeof RoutePoliciesUpdateInput.Type;

// Output Schema
export const RoutePoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type RoutePoliciesUpdateOutput = typeof RoutePoliciesUpdateOutput.Type;

// The operation
/**
 * Updates a Route Policy.
 *
 * API to update certain properties of the Route Policy resource.
 *
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const RoutePoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RoutePoliciesUpdateInput,
  outputSchema: RoutePoliciesUpdateOutput,
}));
