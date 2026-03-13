/**
 * Azure Dnsresolver API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DnsForwardingRulesetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}",
    }),
  );
export type DnsForwardingRulesetsCreateOrUpdateInput =
  typeof DnsForwardingRulesetsCreateOrUpdateInput.Type;

// Output Schema
export const DnsForwardingRulesetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsForwardingRulesetsCreateOrUpdateOutput =
  typeof DnsForwardingRulesetsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const DnsForwardingRulesetsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsForwardingRulesetsCreateOrUpdateInput,
    outputSchema: DnsForwardingRulesetsCreateOrUpdateOutput,
  }));
// Input Schema
export const DnsForwardingRulesetsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}",
    }),
  );
export type DnsForwardingRulesetsDeleteInput =
  typeof DnsForwardingRulesetsDeleteInput.Type;

// Output Schema
export const DnsForwardingRulesetsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DnsForwardingRulesetsDeleteOutput =
  typeof DnsForwardingRulesetsDeleteOutput.Type;

// The operation
/**
 * Deletes a DNS forwarding ruleset. WARNING: This operation cannot be undone. All forwarding rules within the ruleset will be deleted.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsForwardingRulesetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsForwardingRulesetsDeleteInput,
    outputSchema: DnsForwardingRulesetsDeleteOutput,
  }),
);
// Input Schema
export const DnsForwardingRulesetsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}",
    }),
  );
export type DnsForwardingRulesetsGetInput =
  typeof DnsForwardingRulesetsGetInput.Type;

// Output Schema
export const DnsForwardingRulesetsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsForwardingRulesetsGetOutput =
  typeof DnsForwardingRulesetsGetOutput.Type;

// The operation
/**
 * Gets a DNS forwarding ruleset properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 */
export const DnsForwardingRulesetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsForwardingRulesetsGetInput,
    outputSchema: DnsForwardingRulesetsGetOutput,
  }),
);
// Input Schema
export const DnsForwardingRulesetsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/dnsForwardingRulesets",
    }),
  );
export type DnsForwardingRulesetsListInput =
  typeof DnsForwardingRulesetsListInput.Type;

// Output Schema
export const DnsForwardingRulesetsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsForwardingRulesetsListOutput =
  typeof DnsForwardingRulesetsListOutput.Type;

// The operation
/**
 * Lists DNS forwarding rulesets in all resource groups of a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsForwardingRulesetsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsForwardingRulesetsListInput,
    outputSchema: DnsForwardingRulesetsListOutput,
  }),
);
// Input Schema
export const DnsForwardingRulesetsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets",
    }),
  );
export type DnsForwardingRulesetsListByResourceGroupInput =
  typeof DnsForwardingRulesetsListByResourceGroupInput.Type;

// Output Schema
export const DnsForwardingRulesetsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsForwardingRulesetsListByResourceGroupOutput =
  typeof DnsForwardingRulesetsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists DNS forwarding rulesets within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsForwardingRulesetsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsForwardingRulesetsListByResourceGroupInput,
    outputSchema: DnsForwardingRulesetsListByResourceGroupOutput,
  }));
// Input Schema
export const DnsForwardingRulesetsListByVirtualNetworkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/listDnsForwardingRulesets",
    }),
  );
export type DnsForwardingRulesetsListByVirtualNetworkInput =
  typeof DnsForwardingRulesetsListByVirtualNetworkInput.Type;

// Output Schema
export const DnsForwardingRulesetsListByVirtualNetworkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            virtualNetworkLink: Schema.optional(
              Schema.Struct({
                id: Schema.String,
              }),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsForwardingRulesetsListByVirtualNetworkOutput =
  typeof DnsForwardingRulesetsListByVirtualNetworkOutput.Type;

// The operation
/**
 * Lists DNS forwarding ruleset resource IDs attached to a virtual network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualNetworkName - The name of the VirtualNetwork
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsForwardingRulesetsListByVirtualNetwork =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsForwardingRulesetsListByVirtualNetworkInput,
    outputSchema: DnsForwardingRulesetsListByVirtualNetworkOutput,
  }));
// Input Schema
export const DnsForwardingRulesetsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}",
    }),
  );
export type DnsForwardingRulesetsUpdateInput =
  typeof DnsForwardingRulesetsUpdateInput.Type;

// Output Schema
export const DnsForwardingRulesetsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsForwardingRulesetsUpdateOutput =
  typeof DnsForwardingRulesetsUpdateOutput.Type;

// The operation
/**
 * Updates a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsForwardingRulesetsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsForwardingRulesetsUpdateInput,
    outputSchema: DnsForwardingRulesetsUpdateOutput,
  }),
);
// Input Schema
export const DnsResolverDomainListsBulkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverDomainListName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}/bulk",
    }),
  );
export type DnsResolverDomainListsBulkInput =
  typeof DnsResolverDomainListsBulkInput.Type;

// Output Schema
export const DnsResolverDomainListsBulkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverDomainListsBulkOutput =
  typeof DnsResolverDomainListsBulkOutput.Type;

// The operation
/**
 * Uploads or downloads the list of domains for a DNS Resolver Domain List from a storage link.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverDomainListName - The name of the DNS resolver domain list.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const DnsResolverDomainListsBulk = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsResolverDomainListsBulkInput,
    outputSchema: DnsResolverDomainListsBulkOutput,
  }),
);
// Input Schema
export const DnsResolverDomainListsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverDomainListName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}",
    }),
  );
export type DnsResolverDomainListsCreateOrUpdateInput =
  typeof DnsResolverDomainListsCreateOrUpdateInput.Type;

// Output Schema
export const DnsResolverDomainListsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverDomainListsCreateOrUpdateOutput =
  typeof DnsResolverDomainListsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a DNS resolver domain list.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverDomainListName - The name of the DNS resolver domain list.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const DnsResolverDomainListsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverDomainListsCreateOrUpdateInput,
    outputSchema: DnsResolverDomainListsCreateOrUpdateOutput,
  }));
// Input Schema
export const DnsResolverDomainListsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverDomainListName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}",
    }),
  );
export type DnsResolverDomainListsDeleteInput =
  typeof DnsResolverDomainListsDeleteInput.Type;

// Output Schema
export const DnsResolverDomainListsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DnsResolverDomainListsDeleteOutput =
  typeof DnsResolverDomainListsDeleteOutput.Type;

// The operation
/**
 * Deletes a DNS resolver domain list. WARNING: This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverDomainListName - The name of the DNS resolver domain list.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsResolverDomainListsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverDomainListsDeleteInput,
    outputSchema: DnsResolverDomainListsDeleteOutput,
  }));
// Input Schema
export const DnsResolverDomainListsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverDomainListName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}",
    }),
  );
export type DnsResolverDomainListsGetInput =
  typeof DnsResolverDomainListsGetInput.Type;

// Output Schema
export const DnsResolverDomainListsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverDomainListsGetOutput =
  typeof DnsResolverDomainListsGetOutput.Type;

// The operation
/**
 * Gets properties of a DNS resolver domain list.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverDomainListName - The name of the DNS resolver domain list.
 */
export const DnsResolverDomainListsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsResolverDomainListsGetInput,
    outputSchema: DnsResolverDomainListsGetOutput,
  }),
);
// Input Schema
export const DnsResolverDomainListsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/dnsResolverDomainLists",
    }),
  );
export type DnsResolverDomainListsListInput =
  typeof DnsResolverDomainListsListInput.Type;

// Output Schema
export const DnsResolverDomainListsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsResolverDomainListsListOutput =
  typeof DnsResolverDomainListsListOutput.Type;

// The operation
/**
 * Lists DNS resolver domain lists in all resource groups of a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsResolverDomainListsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsResolverDomainListsListInput,
    outputSchema: DnsResolverDomainListsListOutput,
  }),
);
// Input Schema
export const DnsResolverDomainListsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists",
    }),
  );
export type DnsResolverDomainListsListByResourceGroupInput =
  typeof DnsResolverDomainListsListByResourceGroupInput.Type;

// Output Schema
export const DnsResolverDomainListsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsResolverDomainListsListByResourceGroupOutput =
  typeof DnsResolverDomainListsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists DNS resolver domain lists within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsResolverDomainListsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverDomainListsListByResourceGroupInput,
    outputSchema: DnsResolverDomainListsListByResourceGroupOutput,
  }));
// Input Schema
export const DnsResolverDomainListsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverDomainListName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverDomainLists/{dnsResolverDomainListName}",
    }),
  );
export type DnsResolverDomainListsUpdateInput =
  typeof DnsResolverDomainListsUpdateInput.Type;

// Output Schema
export const DnsResolverDomainListsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverDomainListsUpdateOutput =
  typeof DnsResolverDomainListsUpdateOutput.Type;

// The operation
/**
 * Updates a DNS resolver domain list.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverDomainListName - The name of the DNS resolver domain list.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsResolverDomainListsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverDomainListsUpdateInput,
    outputSchema: DnsResolverDomainListsUpdateOutput,
  }));
// Input Schema
export const DnsResolverPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}",
    }),
  );
export type DnsResolverPoliciesCreateOrUpdateInput =
  typeof DnsResolverPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const DnsResolverPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverPoliciesCreateOrUpdateOutput =
  typeof DnsResolverPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a DNS resolver policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const DnsResolverPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverPoliciesCreateOrUpdateInput,
    outputSchema: DnsResolverPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const DnsResolverPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}",
    }),
  );
export type DnsResolverPoliciesDeleteInput =
  typeof DnsResolverPoliciesDeleteInput.Type;

// Output Schema
export const DnsResolverPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DnsResolverPoliciesDeleteOutput =
  typeof DnsResolverPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes a DNS resolver policy. WARNING: This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsResolverPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsResolverPoliciesDeleteInput,
    outputSchema: DnsResolverPoliciesDeleteOutput,
  }),
);
// Input Schema
export const DnsResolverPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}",
    }),
  );
export type DnsResolverPoliciesGetInput =
  typeof DnsResolverPoliciesGetInput.Type;

// Output Schema
export const DnsResolverPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverPoliciesGetOutput =
  typeof DnsResolverPoliciesGetOutput.Type;

// The operation
/**
 * Gets properties of a DNS resolver policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 */
export const DnsResolverPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsResolverPoliciesGetInput,
    outputSchema: DnsResolverPoliciesGetOutput,
  }),
);
// Input Schema
export const DnsResolverPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/dnsResolverPolicies",
    }),
  );
export type DnsResolverPoliciesListInput =
  typeof DnsResolverPoliciesListInput.Type;

// Output Schema
export const DnsResolverPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsResolverPoliciesListOutput =
  typeof DnsResolverPoliciesListOutput.Type;

// The operation
/**
 * Lists DNS resolver policies in all resource groups of a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsResolverPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsResolverPoliciesListInput,
    outputSchema: DnsResolverPoliciesListOutput,
  }),
);
// Input Schema
export const DnsResolverPoliciesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies",
    }),
  );
export type DnsResolverPoliciesListByResourceGroupInput =
  typeof DnsResolverPoliciesListByResourceGroupInput.Type;

// Output Schema
export const DnsResolverPoliciesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsResolverPoliciesListByResourceGroupOutput =
  typeof DnsResolverPoliciesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists DNS resolver policies within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsResolverPoliciesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverPoliciesListByResourceGroupInput,
    outputSchema: DnsResolverPoliciesListByResourceGroupOutput,
  }));
// Input Schema
export const DnsResolverPoliciesListByVirtualNetworkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/listDnsResolverPolicies",
    }),
  );
export type DnsResolverPoliciesListByVirtualNetworkInput =
  typeof DnsResolverPoliciesListByVirtualNetworkInput.Type;

// Output Schema
export const DnsResolverPoliciesListByVirtualNetworkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsResolverPoliciesListByVirtualNetworkOutput =
  typeof DnsResolverPoliciesListByVirtualNetworkOutput.Type;

// The operation
/**
 * Lists DNS resolver policy resource IDs linked to a virtual network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualNetworkName - The name of the VirtualNetwork
 */
export const DnsResolverPoliciesListByVirtualNetwork =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverPoliciesListByVirtualNetworkInput,
    outputSchema: DnsResolverPoliciesListByVirtualNetworkOutput,
  }));
// Input Schema
export const DnsResolverPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}",
    }),
  );
export type DnsResolverPoliciesUpdateInput =
  typeof DnsResolverPoliciesUpdateInput.Type;

// Output Schema
export const DnsResolverPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverPoliciesUpdateOutput =
  typeof DnsResolverPoliciesUpdateOutput.Type;

// The operation
/**
 * Updates a DNS resolver policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsResolverPoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsResolverPoliciesUpdateInput,
    outputSchema: DnsResolverPoliciesUpdateOutput,
  }),
);
// Input Schema
export const DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyVirtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/virtualNetworkLinks/{dnsResolverPolicyVirtualNetworkLinkName}",
    }),
  );
export type DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateInput =
  typeof DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateInput.Type;

// Output Schema
export const DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOutput =
  typeof DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a DNS resolver policy virtual network link.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param dnsResolverPolicyVirtualNetworkLinkName - The name of the DNS resolver policy virtual network link for the DNS resolver policy.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const DnsResolverPolicyVirtualNetworkLinksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateInput,
    outputSchema: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOutput,
  }));
// Input Schema
export const DnsResolverPolicyVirtualNetworkLinksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyVirtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/virtualNetworkLinks/{dnsResolverPolicyVirtualNetworkLinkName}",
    }),
  );
export type DnsResolverPolicyVirtualNetworkLinksDeleteInput =
  typeof DnsResolverPolicyVirtualNetworkLinksDeleteInput.Type;

// Output Schema
export const DnsResolverPolicyVirtualNetworkLinksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DnsResolverPolicyVirtualNetworkLinksDeleteOutput =
  typeof DnsResolverPolicyVirtualNetworkLinksDeleteOutput.Type;

// The operation
/**
 * Deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param dnsResolverPolicyVirtualNetworkLinkName - The name of the DNS resolver policy virtual network link for the DNS resolver policy.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsResolverPolicyVirtualNetworkLinksDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverPolicyVirtualNetworkLinksDeleteInput,
    outputSchema: DnsResolverPolicyVirtualNetworkLinksDeleteOutput,
  }));
// Input Schema
export const DnsResolverPolicyVirtualNetworkLinksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyVirtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/virtualNetworkLinks/{dnsResolverPolicyVirtualNetworkLinkName}",
    }),
  );
export type DnsResolverPolicyVirtualNetworkLinksGetInput =
  typeof DnsResolverPolicyVirtualNetworkLinksGetInput.Type;

// Output Schema
export const DnsResolverPolicyVirtualNetworkLinksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverPolicyVirtualNetworkLinksGetOutput =
  typeof DnsResolverPolicyVirtualNetworkLinksGetOutput.Type;

// The operation
/**
 * Gets properties of a DNS resolver policy virtual network link.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param dnsResolverPolicyVirtualNetworkLinkName - The name of the DNS resolver policy virtual network link for the DNS resolver policy.
 */
export const DnsResolverPolicyVirtualNetworkLinksGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverPolicyVirtualNetworkLinksGetInput,
    outputSchema: DnsResolverPolicyVirtualNetworkLinksGetOutput,
  }));
// Input Schema
export const DnsResolverPolicyVirtualNetworkLinksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/virtualNetworkLinks",
    }),
  );
export type DnsResolverPolicyVirtualNetworkLinksListInput =
  typeof DnsResolverPolicyVirtualNetworkLinksListInput.Type;

// Output Schema
export const DnsResolverPolicyVirtualNetworkLinksListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsResolverPolicyVirtualNetworkLinksListOutput =
  typeof DnsResolverPolicyVirtualNetworkLinksListOutput.Type;

// The operation
/**
 * Lists DNS resolver policy virtual network links.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsResolverPolicyVirtualNetworkLinksList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverPolicyVirtualNetworkLinksListInput,
    outputSchema: DnsResolverPolicyVirtualNetworkLinksListOutput,
  }));
// Input Schema
export const DnsResolverPolicyVirtualNetworkLinksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyVirtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/virtualNetworkLinks/{dnsResolverPolicyVirtualNetworkLinkName}",
    }),
  );
export type DnsResolverPolicyVirtualNetworkLinksUpdateInput =
  typeof DnsResolverPolicyVirtualNetworkLinksUpdateInput.Type;

// Output Schema
export const DnsResolverPolicyVirtualNetworkLinksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolverPolicyVirtualNetworkLinksUpdateOutput =
  typeof DnsResolverPolicyVirtualNetworkLinksUpdateOutput.Type;

// The operation
/**
 * Updates a DNS resolver policy virtual network link.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param dnsResolverPolicyVirtualNetworkLinkName - The name of the DNS resolver policy virtual network link for the DNS resolver policy.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsResolverPolicyVirtualNetworkLinksUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolverPolicyVirtualNetworkLinksUpdateInput,
    outputSchema: DnsResolverPolicyVirtualNetworkLinksUpdateOutput,
  }));
// Input Schema
export const DnsResolversCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}",
    }),
  );
export type DnsResolversCreateOrUpdateInput =
  typeof DnsResolversCreateOrUpdateInput.Type;

// Output Schema
export const DnsResolversCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolversCreateOrUpdateOutput =
  typeof DnsResolversCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const DnsResolversCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsResolversCreateOrUpdateInput,
    outputSchema: DnsResolversCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DnsResolversDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}",
    }),
  );
export type DnsResolversDeleteInput = typeof DnsResolversDeleteInput.Type;

// Output Schema
export const DnsResolversDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DnsResolversDeleteOutput = typeof DnsResolversDeleteOutput.Type;

// The operation
/**
 * Deletes a DNS resolver. WARNING: This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsResolversDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DnsResolversDeleteInput,
  outputSchema: DnsResolversDeleteOutput,
}));
// Input Schema
export const DnsResolversGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  dnsResolverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}",
  }),
);
export type DnsResolversGetInput = typeof DnsResolversGetInput.Type;

// Output Schema
export const DnsResolversGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type DnsResolversGetOutput = typeof DnsResolversGetOutput.Type;

// The operation
/**
 * Gets properties of a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 */
export const DnsResolversGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DnsResolversGetInput,
  outputSchema: DnsResolversGetOutput,
}));
// Input Schema
export const DnsResolversListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $top: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Network/dnsResolvers",
  }),
);
export type DnsResolversListInput = typeof DnsResolversListInput.Type;

// Output Schema
export const DnsResolversListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  },
);
export type DnsResolversListOutput = typeof DnsResolversListOutput.Type;

// The operation
/**
 * Lists DNS resolvers in all resource groups of a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsResolversList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DnsResolversListInput,
  outputSchema: DnsResolversListOutput,
}));
// Input Schema
export const DnsResolversListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers",
    }),
  );
export type DnsResolversListByResourceGroupInput =
  typeof DnsResolversListByResourceGroupInput.Type;

// Output Schema
export const DnsResolversListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsResolversListByResourceGroupOutput =
  typeof DnsResolversListByResourceGroupOutput.Type;

// The operation
/**
 * Lists DNS resolvers within a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsResolversListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolversListByResourceGroupInput,
    outputSchema: DnsResolversListByResourceGroupOutput,
  }));
// Input Schema
export const DnsResolversListByVirtualNetworkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualNetworkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/listDnsResolvers",
    }),
  );
export type DnsResolversListByVirtualNetworkInput =
  typeof DnsResolversListByVirtualNetworkInput.Type;

// Output Schema
export const DnsResolversListByVirtualNetworkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsResolversListByVirtualNetworkOutput =
  typeof DnsResolversListByVirtualNetworkOutput.Type;

// The operation
/**
 * Lists DNS resolver resource IDs linked to a virtual network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param virtualNetworkName - The name of the VirtualNetwork
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsResolversListByVirtualNetwork =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsResolversListByVirtualNetworkInput,
    outputSchema: DnsResolversListByVirtualNetworkOutput,
  }));
// Input Schema
export const DnsResolversUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}",
    }),
  );
export type DnsResolversUpdateInput = typeof DnsResolversUpdateInput.Type;

// Output Schema
export const DnsResolversUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsResolversUpdateOutput = typeof DnsResolversUpdateOutput.Type;

// The operation
/**
 * Updates a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsResolversUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DnsResolversUpdateInput,
  outputSchema: DnsResolversUpdateOutput,
}));
// Input Schema
export const DnsSecurityRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    dnsSecurityRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules/{dnsSecurityRuleName}",
    }),
  );
export type DnsSecurityRulesCreateOrUpdateInput =
  typeof DnsSecurityRulesCreateOrUpdateInput.Type;

// Output Schema
export const DnsSecurityRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsSecurityRulesCreateOrUpdateOutput =
  typeof DnsSecurityRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a DNS security rule for a DNS resolver policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param dnsSecurityRuleName - The name of the DNS security rule.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const DnsSecurityRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DnsSecurityRulesCreateOrUpdateInput,
    outputSchema: DnsSecurityRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const DnsSecurityRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    dnsSecurityRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules/{dnsSecurityRuleName}",
    }),
  );
export type DnsSecurityRulesDeleteInput =
  typeof DnsSecurityRulesDeleteInput.Type;

// Output Schema
export const DnsSecurityRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DnsSecurityRulesDeleteOutput =
  typeof DnsSecurityRulesDeleteOutput.Type;

// The operation
/**
 * Deletes a DNS security rule for a DNS resolver policy. WARNING: This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param dnsSecurityRuleName - The name of the DNS security rule.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsSecurityRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsSecurityRulesDeleteInput,
    outputSchema: DnsSecurityRulesDeleteOutput,
  }),
);
// Input Schema
export const DnsSecurityRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    dnsSecurityRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules/{dnsSecurityRuleName}",
    }),
  );
export type DnsSecurityRulesGetInput = typeof DnsSecurityRulesGetInput.Type;

// Output Schema
export const DnsSecurityRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsSecurityRulesGetOutput = typeof DnsSecurityRulesGetOutput.Type;

// The operation
/**
 * Gets properties of a DNS security rule for a DNS resolver policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param dnsSecurityRuleName - The name of the DNS security rule.
 */
export const DnsSecurityRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DnsSecurityRulesGetInput,
  outputSchema: DnsSecurityRulesGetOutput,
}));
// Input Schema
export const DnsSecurityRulesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules",
    }),
  );
export type DnsSecurityRulesListInput = typeof DnsSecurityRulesListInput.Type;

// Output Schema
export const DnsSecurityRulesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DnsSecurityRulesListOutput = typeof DnsSecurityRulesListOutput.Type;

// The operation
/**
 * Lists DNS security rules for a DNS resolver policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const DnsSecurityRulesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsSecurityRulesListInput,
    outputSchema: DnsSecurityRulesListOutput,
  }),
);
// Input Schema
export const DnsSecurityRulesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverPolicyName: Schema.String.pipe(T.PathParam()),
    dnsSecurityRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolverPolicies/{dnsResolverPolicyName}/dnsSecurityRules/{dnsSecurityRuleName}",
    }),
  );
export type DnsSecurityRulesUpdateInput =
  typeof DnsSecurityRulesUpdateInput.Type;

// Output Schema
export const DnsSecurityRulesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type DnsSecurityRulesUpdateOutput =
  typeof DnsSecurityRulesUpdateOutput.Type;

// The operation
/**
 * Updates a DNS security rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverPolicyName - The name of the DNS resolver policy.
 * @param dnsSecurityRuleName - The name of the DNS security rule.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const DnsSecurityRulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DnsSecurityRulesUpdateInput,
    outputSchema: DnsSecurityRulesUpdateOutput,
  }),
);
// Input Schema
export const ForwardingRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    forwardingRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules/{forwardingRuleName}",
    }),
  );
export type ForwardingRulesCreateOrUpdateInput =
  typeof ForwardingRulesCreateOrUpdateInput.Type;

// Output Schema
export const ForwardingRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ForwardingRulesCreateOrUpdateOutput =
  typeof ForwardingRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a forwarding rule in a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param forwardingRuleName - The name of the forwarding rule.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const ForwardingRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ForwardingRulesCreateOrUpdateInput,
    outputSchema: ForwardingRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const ForwardingRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    forwardingRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules/{forwardingRuleName}",
    }),
  );
export type ForwardingRulesDeleteInput = typeof ForwardingRulesDeleteInput.Type;

// Output Schema
export const ForwardingRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ForwardingRulesDeleteOutput =
  typeof ForwardingRulesDeleteOutput.Type;

// The operation
/**
 * Deletes a forwarding rule in a DNS forwarding ruleset. WARNING: This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param forwardingRuleName - The name of the forwarding rule.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const ForwardingRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ForwardingRulesDeleteInput,
    outputSchema: ForwardingRulesDeleteOutput,
  }),
);
// Input Schema
export const ForwardingRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    forwardingRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules/{forwardingRuleName}",
    }),
  );
export type ForwardingRulesGetInput = typeof ForwardingRulesGetInput.Type;

// Output Schema
export const ForwardingRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ForwardingRulesGetOutput = typeof ForwardingRulesGetOutput.Type;

// The operation
/**
 * Gets properties of a forwarding rule in a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param forwardingRuleName - The name of the forwarding rule.
 */
export const ForwardingRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ForwardingRulesGetInput,
  outputSchema: ForwardingRulesGetOutput,
}));
// Input Schema
export const ForwardingRulesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules",
    }),
  );
export type ForwardingRulesListInput = typeof ForwardingRulesListInput.Type;

// Output Schema
export const ForwardingRulesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ForwardingRulesListOutput = typeof ForwardingRulesListOutput.Type;

// The operation
/**
 * Lists forwarding rules in a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const ForwardingRulesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ForwardingRulesListInput,
  outputSchema: ForwardingRulesListOutput,
}));
// Input Schema
export const ForwardingRulesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    forwardingRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/forwardingRules/{forwardingRuleName}",
    }),
  );
export type ForwardingRulesUpdateInput = typeof ForwardingRulesUpdateInput.Type;

// Output Schema
export const ForwardingRulesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ForwardingRulesUpdateOutput =
  typeof ForwardingRulesUpdateOutput.Type;

// The operation
/**
 * Updates a forwarding rule in a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param forwardingRuleName - The name of the forwarding rule.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const ForwardingRulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ForwardingRulesUpdateInput,
    outputSchema: ForwardingRulesUpdateOutput,
  }),
);
// Input Schema
export const InboundEndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    inboundEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints/{inboundEndpointName}",
    }),
  );
export type InboundEndpointsCreateOrUpdateInput =
  typeof InboundEndpointsCreateOrUpdateInput.Type;

// Output Schema
export const InboundEndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InboundEndpointsCreateOrUpdateOutput =
  typeof InboundEndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an inbound endpoint for a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param inboundEndpointName - The name of the inbound endpoint for the DNS resolver.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const InboundEndpointsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InboundEndpointsCreateOrUpdateInput,
    outputSchema: InboundEndpointsCreateOrUpdateOutput,
  }));
// Input Schema
export const InboundEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    inboundEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints/{inboundEndpointName}",
    }),
  );
export type InboundEndpointsDeleteInput =
  typeof InboundEndpointsDeleteInput.Type;

// Output Schema
export const InboundEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InboundEndpointsDeleteOutput =
  typeof InboundEndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param inboundEndpointName - The name of the inbound endpoint for the DNS resolver.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const InboundEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InboundEndpointsDeleteInput,
    outputSchema: InboundEndpointsDeleteOutput,
  }),
);
// Input Schema
export const InboundEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    inboundEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints/{inboundEndpointName}",
    }),
  );
export type InboundEndpointsGetInput = typeof InboundEndpointsGetInput.Type;

// Output Schema
export const InboundEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InboundEndpointsGetOutput = typeof InboundEndpointsGetOutput.Type;

// The operation
/**
 * Gets properties of an inbound endpoint for a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param inboundEndpointName - The name of the inbound endpoint for the DNS resolver.
 */
export const InboundEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InboundEndpointsGetInput,
  outputSchema: InboundEndpointsGetOutput,
}));
// Input Schema
export const InboundEndpointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints",
    }),
  );
export type InboundEndpointsListInput = typeof InboundEndpointsListInput.Type;

// Output Schema
export const InboundEndpointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type InboundEndpointsListOutput = typeof InboundEndpointsListOutput.Type;

// The operation
/**
 * Lists inbound endpoints for a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const InboundEndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InboundEndpointsListInput,
    outputSchema: InboundEndpointsListOutput,
  }),
);
// Input Schema
export const InboundEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    inboundEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints/{inboundEndpointName}",
    }),
  );
export type InboundEndpointsUpdateInput =
  typeof InboundEndpointsUpdateInput.Type;

// Output Schema
export const InboundEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type InboundEndpointsUpdateOutput =
  typeof InboundEndpointsUpdateOutput.Type;

// The operation
/**
 * Updates an inbound endpoint for a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param inboundEndpointName - The name of the inbound endpoint for the DNS resolver.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const InboundEndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InboundEndpointsUpdateInput,
    outputSchema: InboundEndpointsUpdateOutput,
  }),
);
// Input Schema
export const OutboundEndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    outboundEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints/{outboundEndpointName}",
    }),
  );
export type OutboundEndpointsCreateOrUpdateInput =
  typeof OutboundEndpointsCreateOrUpdateInput.Type;

// Output Schema
export const OutboundEndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OutboundEndpointsCreateOrUpdateOutput =
  typeof OutboundEndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an outbound endpoint for a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param outboundEndpointName - The name of the outbound endpoint for the DNS resolver.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const OutboundEndpointsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OutboundEndpointsCreateOrUpdateInput,
    outputSchema: OutboundEndpointsCreateOrUpdateOutput,
  }));
// Input Schema
export const OutboundEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    outboundEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints/{outboundEndpointName}",
    }),
  );
export type OutboundEndpointsDeleteInput =
  typeof OutboundEndpointsDeleteInput.Type;

// Output Schema
export const OutboundEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OutboundEndpointsDeleteOutput =
  typeof OutboundEndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param outboundEndpointName - The name of the outbound endpoint for the DNS resolver.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const OutboundEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OutboundEndpointsDeleteInput,
    outputSchema: OutboundEndpointsDeleteOutput,
  }),
);
// Input Schema
export const OutboundEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    outboundEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints/{outboundEndpointName}",
    }),
  );
export type OutboundEndpointsGetInput = typeof OutboundEndpointsGetInput.Type;

// Output Schema
export const OutboundEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OutboundEndpointsGetOutput = typeof OutboundEndpointsGetOutput.Type;

// The operation
/**
 * Gets properties of an outbound endpoint for a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param outboundEndpointName - The name of the outbound endpoint for the DNS resolver.
 */
export const OutboundEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OutboundEndpointsGetInput,
    outputSchema: OutboundEndpointsGetOutput,
  }),
);
// Input Schema
export const OutboundEndpointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints",
    }),
  );
export type OutboundEndpointsListInput = typeof OutboundEndpointsListInput.Type;

// Output Schema
export const OutboundEndpointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OutboundEndpointsListOutput =
  typeof OutboundEndpointsListOutput.Type;

// The operation
/**
 * Lists outbound endpoints for a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const OutboundEndpointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OutboundEndpointsListInput,
    outputSchema: OutboundEndpointsListOutput,
  }),
);
// Input Schema
export const OutboundEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsResolverName: Schema.String.pipe(T.PathParam()),
    outboundEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints/{outboundEndpointName}",
    }),
  );
export type OutboundEndpointsUpdateInput =
  typeof OutboundEndpointsUpdateInput.Type;

// Output Schema
export const OutboundEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type OutboundEndpointsUpdateOutput =
  typeof OutboundEndpointsUpdateOutput.Type;

// The operation
/**
 * Updates an outbound endpoint for a DNS resolver.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsResolverName - The name of the DNS resolver.
 * @param outboundEndpointName - The name of the outbound endpoint for the DNS resolver.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const OutboundEndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OutboundEndpointsUpdateInput,
    outputSchema: OutboundEndpointsUpdateOutput,
  }),
);
// Input Schema
export const VirtualNetworkLinksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    virtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks/{virtualNetworkLinkName}",
    }),
  );
export type VirtualNetworkLinksCreateOrUpdateInput =
  typeof VirtualNetworkLinksCreateOrUpdateInput.Type;

// Output Schema
export const VirtualNetworkLinksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualNetworkLinksCreateOrUpdateOutput =
  typeof VirtualNetworkLinksCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a virtual network link to a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param virtualNetworkLinkName - The name of the virtual network link.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 * @param if-none-match - Set to '*' to allow a new resource to be created, but to prevent updating an existing resource. Other values will be ignored.
 */
export const VirtualNetworkLinksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualNetworkLinksCreateOrUpdateInput,
    outputSchema: VirtualNetworkLinksCreateOrUpdateOutput,
  }));
// Input Schema
export const VirtualNetworkLinksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    virtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks/{virtualNetworkLinkName}",
    }),
  );
export type VirtualNetworkLinksDeleteInput =
  typeof VirtualNetworkLinksDeleteInput.Type;

// Output Schema
export const VirtualNetworkLinksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualNetworkLinksDeleteOutput =
  typeof VirtualNetworkLinksDeleteOutput.Type;

// The operation
/**
 * Deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param virtualNetworkLinkName - The name of the virtual network link.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const VirtualNetworkLinksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkLinksDeleteInput,
    outputSchema: VirtualNetworkLinksDeleteOutput,
  }),
);
// Input Schema
export const VirtualNetworkLinksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    virtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks/{virtualNetworkLinkName}",
    }),
  );
export type VirtualNetworkLinksGetInput =
  typeof VirtualNetworkLinksGetInput.Type;

// Output Schema
export const VirtualNetworkLinksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualNetworkLinksGetOutput =
  typeof VirtualNetworkLinksGetOutput.Type;

// The operation
/**
 * Gets properties of a virtual network link to a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param virtualNetworkLinkName - The name of the virtual network link.
 */
export const VirtualNetworkLinksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkLinksGetInput,
    outputSchema: VirtualNetworkLinksGetOutput,
  }),
);
// Input Schema
export const VirtualNetworkLinksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks",
    }),
  );
export type VirtualNetworkLinksListInput =
  typeof VirtualNetworkLinksListInput.Type;

// Output Schema
export const VirtualNetworkLinksListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualNetworkLinksListOutput =
  typeof VirtualNetworkLinksListOutput.Type;

// The operation
/**
 * Lists virtual network links to a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param $top - The maximum number of results to return. If not specified, returns up to 100 results.
 */
export const VirtualNetworkLinksList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkLinksListInput,
    outputSchema: VirtualNetworkLinksListOutput,
  }),
);
// Input Schema
export const VirtualNetworkLinksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsForwardingRulesetName: Schema.String.pipe(T.PathParam()),
    virtualNetworkLinkName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks/{virtualNetworkLinkName}",
    }),
  );
export type VirtualNetworkLinksUpdateInput =
  typeof VirtualNetworkLinksUpdateInput.Type;

// Output Schema
export const VirtualNetworkLinksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualNetworkLinksUpdateOutput =
  typeof VirtualNetworkLinksUpdateOutput.Type;

// The operation
/**
 * Updates a virtual network link to a DNS forwarding ruleset.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param dnsForwardingRulesetName - The name of the DNS forwarding ruleset.
 * @param virtualNetworkLinkName - The name of the virtual network link.
 * @param if-match - ETag of the resource. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes.
 */
export const VirtualNetworkLinksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkLinksUpdateInput,
    outputSchema: VirtualNetworkLinksUpdateOutput,
  }),
);
