/**
 * Azure DatalakeStore API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccountsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataLakeStore/locations/{location}/checkNameAvailability",
    }),
  );
export type AccountsCheckNameAvailabilityInput =
  typeof AccountsCheckNameAvailabilityInput.Type;

// Output Schema
export const AccountsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type AccountsCheckNameAvailabilityOutput =
  typeof AccountsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks whether the specified account name is available or taken.
 *
 * @param location - The resource location without whitespace.
 */
export const AccountsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccountsCheckNameAvailabilityInput,
    outputSchema: AccountsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const AccountsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}",
  }),
);
export type AccountsCreateInput = typeof AccountsCreateInput.Type;

// Output Schema
export const AccountsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type AccountsCreateOutput = typeof AccountsCreateOutput.Type;

// The operation
/**
 * Creates the specified Data Lake Store account.
 */
export const AccountsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsCreateInput,
  outputSchema: AccountsCreateOutput,
}));
// Input Schema
export const AccountsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}",
  }),
);
export type AccountsDeleteInput = typeof AccountsDeleteInput.Type;

// Output Schema
export const AccountsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsDeleteOutput = typeof AccountsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Data Lake Store account.
 */
export const AccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsDeleteInput,
  outputSchema: AccountsDeleteOutput,
}));
// Input Schema
export const AccountsEnableKeyVaultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/enableKeyVault",
    }),
  );
export type AccountsEnableKeyVaultInput =
  typeof AccountsEnableKeyVaultInput.Type;

// Output Schema
export const AccountsEnableKeyVaultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsEnableKeyVaultOutput =
  typeof AccountsEnableKeyVaultOutput.Type;

// The operation
/**
 * Attempts to enable a user managed Key Vault for encryption of the specified Data Lake Store account.
 */
export const AccountsEnableKeyVault = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsEnableKeyVaultInput,
    outputSchema: AccountsEnableKeyVaultOutput,
  }),
);
// Input Schema
export const AccountsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}",
  }),
);
export type AccountsGetInput = typeof AccountsGetInput.Type;

// Output Schema
export const AccountsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type AccountsGetOutput = typeof AccountsGetOutput.Type;

// The operation
/**
 * Gets the specified Data Lake Store account.
 */
export const AccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsGetInput,
  outputSchema: AccountsGetOutput,
}));
// Input Schema
export const AccountsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  $filter: Schema.optional(Schema.String),
  $top: Schema.optional(Schema.Number),
  $skip: Schema.optional(Schema.Number),
  $select: Schema.optional(Schema.String),
  $orderby: Schema.optional(Schema.String),
  $count: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataLakeStore/accounts",
  }),
);
export type AccountsListInput = typeof AccountsListInput.Type;

// Output Schema
export const AccountsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type AccountsListOutput = typeof AccountsListOutput.Type;

// The operation
/**
 * Lists the Data Lake Store accounts within the subscription. The response includes a link to the next page of results, if any.
 *
 * @param $filter - OData filter. Optional.
 * @param $top - The number of items to return. Optional.
 * @param $skip - The number of items to skip over before returning elements. Optional.
 * @param $select - OData Select statement. Limits the properties on each entry to just those requested, e.g. Categories?$select=CategoryName,Description. Optional.
 * @param $orderby - OrderBy clause. One or more comma-separated expressions with an optional "asc" (the default) or "desc" depending on the order you'd like the values sorted, e.g. Categories?$orderby=CategoryName desc. Optional.
 * @param $count - The Boolean value of true or false to request a count of the matching resources included with the resources in the response, e.g. Categories?$count=true. Optional.
 */
export const AccountsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListInput,
  outputSchema: AccountsListOutput,
}));
// Input Schema
export const AccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
    $skip: Schema.optional(Schema.Number),
    $select: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
    $count: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts",
    }),
  );
export type AccountsListByResourceGroupInput =
  typeof AccountsListByResourceGroupInput.Type;

// Output Schema
export const AccountsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccountsListByResourceGroupOutput =
  typeof AccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Lists the Data Lake Store accounts within a specific resource group. The response includes a link to the next page of results, if any.
 *
 * @param $filter - OData filter. Optional.
 * @param $top - The number of items to return. Optional.
 * @param $skip - The number of items to skip over before returning elements. Optional.
 * @param $select - OData Select statement. Limits the properties on each entry to just those requested, e.g. Categories?$select=CategoryName,Description. Optional.
 * @param $orderby - OrderBy clause. One or more comma-separated expressions with an optional "asc" (the default) or "desc" depending on the order you'd like the values sorted, e.g. Categories?$orderby=CategoryName desc. Optional.
 * @param $count - A Boolean value of true or false to request a count of the matching resources included with the resources in the response, e.g. Categories?$count=true. Optional.
 */
export const AccountsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListByResourceGroupInput,
    outputSchema: AccountsListByResourceGroupOutput,
  }),
);
// Input Schema
export const AccountsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}",
  }),
);
export type AccountsUpdateInput = typeof AccountsUpdateInput.Type;

// Output Schema
export const AccountsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type AccountsUpdateOutput = typeof AccountsUpdateOutput.Type;

// The operation
/**
 * Updates the specified Data Lake Store account information.
 */
export const AccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsUpdateInput,
  outputSchema: AccountsUpdateOutput,
}));
// Input Schema
export const FirewallRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    firewallRuleName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesCreateOrUpdateInput =
  typeof FirewallRulesCreateOrUpdateInput.Type;

// Output Schema
export const FirewallRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type FirewallRulesCreateOrUpdateOutput =
  typeof FirewallRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the specified firewall rule. During update, the firewall rule with the specified name will be replaced with this new firewall rule.
 *
 * @param firewallRuleName - The name of the firewall rule to create or update.
 */
export const FirewallRulesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FirewallRulesCreateOrUpdateInput,
    outputSchema: FirewallRulesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const FirewallRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    firewallRuleName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesDeleteInput = typeof FirewallRulesDeleteInput.Type;

// Output Schema
export const FirewallRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FirewallRulesDeleteOutput = typeof FirewallRulesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified firewall rule from the specified Data Lake Store account.
 *
 * @param firewallRuleName - The name of the firewall rule to delete.
 */
export const FirewallRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirewallRulesDeleteInput,
  outputSchema: FirewallRulesDeleteOutput,
}));
// Input Schema
export const FirewallRulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  firewallRuleName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/firewallRules/{firewallRuleName}",
  }),
);
export type FirewallRulesGetInput = typeof FirewallRulesGetInput.Type;

// Output Schema
export const FirewallRulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  },
);
export type FirewallRulesGetOutput = typeof FirewallRulesGetOutput.Type;

// The operation
/**
 * Gets the specified Data Lake Store firewall rule.
 *
 * @param firewallRuleName - The name of the firewall rule to retrieve.
 */
export const FirewallRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirewallRulesGetInput,
  outputSchema: FirewallRulesGetOutput,
}));
// Input Schema
export const FirewallRulesListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/firewallRules",
    }),
  );
export type FirewallRulesListByAccountInput =
  typeof FirewallRulesListByAccountInput.Type;

// Output Schema
export const FirewallRulesListByAccountOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type FirewallRulesListByAccountOutput =
  typeof FirewallRulesListByAccountOutput.Type;

// The operation
/**
 * Lists the Data Lake Store firewall rules within the specified Data Lake Store account.
 */
export const FirewallRulesListByAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FirewallRulesListByAccountInput,
    outputSchema: FirewallRulesListByAccountOutput,
  }),
);
// Input Schema
export const FirewallRulesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    firewallRuleName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesUpdateInput = typeof FirewallRulesUpdateInput.Type;

// Output Schema
export const FirewallRulesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type FirewallRulesUpdateOutput = typeof FirewallRulesUpdateOutput.Type;

// The operation
/**
 * Updates the specified firewall rule.
 *
 * @param firewallRuleName - The name of the firewall rule to update.
 */
export const FirewallRulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirewallRulesUpdateInput,
  outputSchema: FirewallRulesUpdateOutput,
}));
// Input Schema
export const LocationsGetCapabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataLakeStore/locations/{location}/capability",
    }),
  );
export type LocationsGetCapabilityInput =
  typeof LocationsGetCapabilityInput.Type;

// Output Schema
export const LocationsGetCapabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.optional(Schema.String),
    state: Schema.optional(
      Schema.Literals([
        "Registered",
        "Suspended",
        "Deleted",
        "Unregistered",
        "Warned",
      ]),
    ),
    maxAccountCount: Schema.optional(Schema.Number),
    accountCount: Schema.optional(Schema.Number),
    migrationState: Schema.optional(Schema.Boolean),
  });
export type LocationsGetCapabilityOutput =
  typeof LocationsGetCapabilityOutput.Type;

// The operation
/**
 * Gets subscription-level properties and limits for Data Lake Store specified by resource location.
 *
 * @param location - The resource location without whitespace.
 */
export const LocationsGetCapability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LocationsGetCapabilityInput,
    outputSchema: LocationsGetCapabilityOutput,
  }),
);
// Input Schema
export const LocationsGetUsageInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    location: Schema.String.pipe(T.PathParam()),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataLakeStore/locations/{location}/usages",
  }),
);
export type LocationsGetUsageInput = typeof LocationsGetUsageInput.Type;

// Output Schema
export const LocationsGetUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountsPerSecond",
              "BytesPerSecond",
            ]),
          ),
          id: Schema.optional(Schema.String),
          currentValue: Schema.optional(Schema.Number),
          limit: Schema.optional(Schema.Number),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type LocationsGetUsageOutput = typeof LocationsGetUsageOutput.Type;

// The operation
/**
 * Gets the current usage count and the limit for the resources of the location under the subscription.
 *
 * @param location - The resource location without whitespace.
 */
export const LocationsGetUsage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LocationsGetUsageInput,
  outputSchema: LocationsGetUsageOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.DataLakeStore/operations",
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
        origin: Schema.optional(
          Schema.Literals(["user", "system", "user,system"]),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Data Lake Store REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const TrustedIdProvidersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    trustedIdProviderName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/trustedIdProviders/{trustedIdProviderName}",
    }),
  );
export type TrustedIdProvidersCreateOrUpdateInput =
  typeof TrustedIdProvidersCreateOrUpdateInput.Type;

// Output Schema
export const TrustedIdProvidersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TrustedIdProvidersCreateOrUpdateOutput =
  typeof TrustedIdProvidersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the specified trusted identity provider. During update, the trusted identity provider with the specified name will be replaced with this new provider
 *
 * @param trustedIdProviderName - The name of the trusted identity provider. This is used for differentiation of providers in the account.
 */
export const TrustedIdProvidersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TrustedIdProvidersCreateOrUpdateInput,
    outputSchema: TrustedIdProvidersCreateOrUpdateOutput,
  }));
// Input Schema
export const TrustedIdProvidersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    trustedIdProviderName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/trustedIdProviders/{trustedIdProviderName}",
    }),
  );
export type TrustedIdProvidersDeleteInput =
  typeof TrustedIdProvidersDeleteInput.Type;

// Output Schema
export const TrustedIdProvidersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TrustedIdProvidersDeleteOutput =
  typeof TrustedIdProvidersDeleteOutput.Type;

// The operation
/**
 * Deletes the specified trusted identity provider from the specified Data Lake Store account
 *
 * @param trustedIdProviderName - The name of the trusted identity provider to delete.
 */
export const TrustedIdProvidersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TrustedIdProvidersDeleteInput,
    outputSchema: TrustedIdProvidersDeleteOutput,
  }),
);
// Input Schema
export const TrustedIdProvidersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    trustedIdProviderName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/trustedIdProviders/{trustedIdProviderName}",
    }),
  );
export type TrustedIdProvidersGetInput = typeof TrustedIdProvidersGetInput.Type;

// Output Schema
export const TrustedIdProvidersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TrustedIdProvidersGetOutput =
  typeof TrustedIdProvidersGetOutput.Type;

// The operation
/**
 * Gets the specified Data Lake Store trusted identity provider.
 *
 * @param trustedIdProviderName - The name of the trusted identity provider to retrieve.
 */
export const TrustedIdProvidersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TrustedIdProvidersGetInput,
    outputSchema: TrustedIdProvidersGetOutput,
  }),
);
// Input Schema
export const TrustedIdProvidersListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/trustedIdProviders",
    }),
  );
export type TrustedIdProvidersListByAccountInput =
  typeof TrustedIdProvidersListByAccountInput.Type;

// Output Schema
export const TrustedIdProvidersListByAccountOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type TrustedIdProvidersListByAccountOutput =
  typeof TrustedIdProvidersListByAccountOutput.Type;

// The operation
/**
 * Lists the Data Lake Store trusted identity providers within the specified Data Lake Store account.
 */
export const TrustedIdProvidersListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TrustedIdProvidersListByAccountInput,
    outputSchema: TrustedIdProvidersListByAccountOutput,
  }));
// Input Schema
export const TrustedIdProvidersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    trustedIdProviderName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/trustedIdProviders/{trustedIdProviderName}",
    }),
  );
export type TrustedIdProvidersUpdateInput =
  typeof TrustedIdProvidersUpdateInput.Type;

// Output Schema
export const TrustedIdProvidersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type TrustedIdProvidersUpdateOutput =
  typeof TrustedIdProvidersUpdateOutput.Type;

// The operation
/**
 * Updates the specified trusted identity provider.
 *
 * @param trustedIdProviderName - The name of the trusted identity provider. This is used for differentiation of providers in the account.
 */
export const TrustedIdProvidersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TrustedIdProvidersUpdateInput,
    outputSchema: TrustedIdProvidersUpdateOutput,
  }),
);
// Input Schema
export const VirtualNetworkRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualNetworkRuleName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/virtualNetworkRules/{virtualNetworkRuleName}",
    }),
  );
export type VirtualNetworkRulesCreateOrUpdateInput =
  typeof VirtualNetworkRulesCreateOrUpdateInput.Type;

// Output Schema
export const VirtualNetworkRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type VirtualNetworkRulesCreateOrUpdateOutput =
  typeof VirtualNetworkRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the specified virtual network rule. During update, the virtual network rule with the specified name will be replaced with this new virtual network rule.
 *
 * @param virtualNetworkRuleName - The name of the virtual network rule to create or update.
 */
export const VirtualNetworkRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualNetworkRulesCreateOrUpdateInput,
    outputSchema: VirtualNetworkRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const VirtualNetworkRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualNetworkRuleName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/virtualNetworkRules/{virtualNetworkRuleName}",
    }),
  );
export type VirtualNetworkRulesDeleteInput =
  typeof VirtualNetworkRulesDeleteInput.Type;

// Output Schema
export const VirtualNetworkRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualNetworkRulesDeleteOutput =
  typeof VirtualNetworkRulesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified virtual network rule from the specified Data Lake Store account.
 *
 * @param virtualNetworkRuleName - The name of the virtual network rule to delete.
 */
export const VirtualNetworkRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkRulesDeleteInput,
    outputSchema: VirtualNetworkRulesDeleteOutput,
  }),
);
// Input Schema
export const VirtualNetworkRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualNetworkRuleName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/virtualNetworkRules/{virtualNetworkRuleName}",
    }),
  );
export type VirtualNetworkRulesGetInput =
  typeof VirtualNetworkRulesGetInput.Type;

// Output Schema
export const VirtualNetworkRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type VirtualNetworkRulesGetOutput =
  typeof VirtualNetworkRulesGetOutput.Type;

// The operation
/**
 * Gets the specified Data Lake Store virtual network rule.
 *
 * @param virtualNetworkRuleName - The name of the virtual network rule to retrieve.
 */
export const VirtualNetworkRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkRulesGetInput,
    outputSchema: VirtualNetworkRulesGetOutput,
  }),
);
// Input Schema
export const VirtualNetworkRulesListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/virtualNetworkRules",
    }),
  );
export type VirtualNetworkRulesListByAccountInput =
  typeof VirtualNetworkRulesListByAccountInput.Type;

// Output Schema
export const VirtualNetworkRulesListByAccountOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualNetworkRulesListByAccountOutput =
  typeof VirtualNetworkRulesListByAccountOutput.Type;

// The operation
/**
 * Lists the Data Lake Store virtual network rules within the specified Data Lake Store account.
 */
export const VirtualNetworkRulesListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualNetworkRulesListByAccountInput,
    outputSchema: VirtualNetworkRulesListByAccountOutput,
  }));
// Input Schema
export const VirtualNetworkRulesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    virtualNetworkRuleName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/virtualNetworkRules/{virtualNetworkRuleName}",
    }),
  );
export type VirtualNetworkRulesUpdateInput =
  typeof VirtualNetworkRulesUpdateInput.Type;

// Output Schema
export const VirtualNetworkRulesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type VirtualNetworkRulesUpdateOutput =
  typeof VirtualNetworkRulesUpdateOutput.Type;

// The operation
/**
 * Updates the specified virtual network rule.
 *
 * @param virtualNetworkRuleName - The name of the virtual network rule to update.
 */
export const VirtualNetworkRulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkRulesUpdateInput,
    outputSchema: VirtualNetworkRulesUpdateOutput,
  }),
);
