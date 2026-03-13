/**
 * Azure DatalakeAnalytics API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";
import { SensitiveString } from "../sensitive.ts";

// Input Schema
export const AccountsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataLakeAnalytics/locations/{location}/checkNameAvailability",
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}",
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
 * Creates the specified Data Lake Analytics account. This supplies the user with computation services for Data Lake Analytics workloads.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}",
  }),
);
export type AccountsDeleteInput = typeof AccountsDeleteInput.Type;

// Output Schema
export const AccountsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsDeleteOutput = typeof AccountsDeleteOutput.Type;

// The operation
/**
 * Begins the delete process for the Data Lake Analytics account object specified by the account name.
 */
export const AccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsDeleteInput,
  outputSchema: AccountsDeleteOutput,
}));
// Input Schema
export const AccountsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}",
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
 * Gets details of the specified Data Lake Analytics account.
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
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataLakeAnalytics/accounts",
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
  count: Schema.optional(Schema.Number),
  nextLink: Schema.optional(Schema.String),
});
export type AccountsListOutput = typeof AccountsListOutput.Type;

// The operation
/**
 * Gets the first page of Data Lake Analytics accounts, if any, within the current subscription. This includes a link to the next page, if any.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts",
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
    count: Schema.optional(Schema.Number),
    nextLink: Schema.optional(Schema.String),
  });
export type AccountsListByResourceGroupOutput =
  typeof AccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets the first page of Data Lake Analytics accounts, if any, within a specific resource group. This includes a link to the next page, if any.
 *
 * @param $filter - OData filter. Optional.
 * @param $top - The number of items to return. Optional.
 * @param $skip - The number of items to skip over before returning elements. Optional.
 * @param $select - OData Select statement. Limits the properties on each entry to just those requested, e.g. Categories?$select=CategoryName,Description. Optional.
 * @param $orderby - OrderBy clause. One or more comma-separated expressions with an optional "asc" (the default) or "desc" depending on the order you'd like the values sorted, e.g. Categories?$orderby=CategoryName desc. Optional.
 * @param $count - The Boolean value of true or false to request a count of the matching resources included with the resources in the response, e.g. Categories?$count=true. Optional.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}",
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
 * Updates the Data Lake Analytics account object specified by the accountName with the contents of the account object.
 */
export const AccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsUpdateInput,
  outputSchema: AccountsUpdateOutput,
}));
// Input Schema
export const ComputePoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    computePolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/computePolicies/{computePolicyName}",
    }),
  );
export type ComputePoliciesCreateOrUpdateInput =
  typeof ComputePoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ComputePoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ComputePoliciesCreateOrUpdateOutput =
  typeof ComputePoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the specified compute policy. During update, the compute policy with the specified name will be replaced with this new compute policy. An account supports, at most, 50 policies
 *
 * @param computePolicyName - The name of the compute policy to create or update.
 */
export const ComputePoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ComputePoliciesCreateOrUpdateInput,
    outputSchema: ComputePoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ComputePoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    computePolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/computePolicies/{computePolicyName}",
    }),
  );
export type ComputePoliciesDeleteInput = typeof ComputePoliciesDeleteInput.Type;

// Output Schema
export const ComputePoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ComputePoliciesDeleteOutput =
  typeof ComputePoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified compute policy from the specified Data Lake Analytics account
 *
 * @param computePolicyName - The name of the compute policy to delete.
 */
export const ComputePoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComputePoliciesDeleteInput,
    outputSchema: ComputePoliciesDeleteOutput,
  }),
);
// Input Schema
export const ComputePoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    computePolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/computePolicies/{computePolicyName}",
    }),
  );
export type ComputePoliciesGetInput = typeof ComputePoliciesGetInput.Type;

// Output Schema
export const ComputePoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ComputePoliciesGetOutput = typeof ComputePoliciesGetOutput.Type;

// The operation
/**
 * Gets the specified Data Lake Analytics compute policy.
 *
 * @param computePolicyName - The name of the compute policy to retrieve.
 */
export const ComputePoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ComputePoliciesGetInput,
  outputSchema: ComputePoliciesGetOutput,
}));
// Input Schema
export const ComputePoliciesListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/computePolicies",
    }),
  );
export type ComputePoliciesListByAccountInput =
  typeof ComputePoliciesListByAccountInput.Type;

// Output Schema
export const ComputePoliciesListByAccountOutput =
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
export type ComputePoliciesListByAccountOutput =
  typeof ComputePoliciesListByAccountOutput.Type;

// The operation
/**
 * Lists the Data Lake Analytics compute policies within the specified Data Lake Analytics account. An account supports, at most, 50 policies
 */
export const ComputePoliciesListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ComputePoliciesListByAccountInput,
    outputSchema: ComputePoliciesListByAccountOutput,
  }));
// Input Schema
export const ComputePoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    computePolicyName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/computePolicies/{computePolicyName}",
    }),
  );
export type ComputePoliciesUpdateInput = typeof ComputePoliciesUpdateInput.Type;

// Output Schema
export const ComputePoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type ComputePoliciesUpdateOutput =
  typeof ComputePoliciesUpdateOutput.Type;

// The operation
/**
 * Updates the specified compute policy.
 *
 * @param computePolicyName - The name of the compute policy to update.
 */
export const ComputePoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ComputePoliciesUpdateInput,
    outputSchema: ComputePoliciesUpdateOutput,
  }),
);
// Input Schema
export const DataLakeStoreAccountsAddInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dataLakeStoreAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/dataLakeStoreAccounts/{dataLakeStoreAccountName}",
    }),
  );
export type DataLakeStoreAccountsAddInput =
  typeof DataLakeStoreAccountsAddInput.Type;

// Output Schema
export const DataLakeStoreAccountsAddOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataLakeStoreAccountsAddOutput =
  typeof DataLakeStoreAccountsAddOutput.Type;

// The operation
/**
 * Updates the specified Data Lake Analytics account to include the additional Data Lake Store account.
 *
 * @param dataLakeStoreAccountName - The name of the Data Lake Store account to add.
 */
export const DataLakeStoreAccountsAdd = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataLakeStoreAccountsAddInput,
    outputSchema: DataLakeStoreAccountsAddOutput,
  }),
);
// Input Schema
export const DataLakeStoreAccountsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dataLakeStoreAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/dataLakeStoreAccounts/{dataLakeStoreAccountName}",
    }),
  );
export type DataLakeStoreAccountsDeleteInput =
  typeof DataLakeStoreAccountsDeleteInput.Type;

// Output Schema
export const DataLakeStoreAccountsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DataLakeStoreAccountsDeleteOutput =
  typeof DataLakeStoreAccountsDeleteOutput.Type;

// The operation
/**
 * Updates the Data Lake Analytics account specified to remove the specified Data Lake Store account.
 *
 * @param dataLakeStoreAccountName - The name of the Data Lake Store account to remove
 */
export const DataLakeStoreAccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataLakeStoreAccountsDeleteInput,
    outputSchema: DataLakeStoreAccountsDeleteOutput,
  }),
);
// Input Schema
export const DataLakeStoreAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    dataLakeStoreAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/dataLakeStoreAccounts/{dataLakeStoreAccountName}",
    }),
  );
export type DataLakeStoreAccountsGetInput =
  typeof DataLakeStoreAccountsGetInput.Type;

// Output Schema
export const DataLakeStoreAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type DataLakeStoreAccountsGetOutput =
  typeof DataLakeStoreAccountsGetOutput.Type;

// The operation
/**
 * Gets the specified Data Lake Store account details in the specified Data Lake Analytics account.
 *
 * @param dataLakeStoreAccountName - The name of the Data Lake Store account to retrieve
 */
export const DataLakeStoreAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataLakeStoreAccountsGetInput,
    outputSchema: DataLakeStoreAccountsGetOutput,
  }),
);
// Input Schema
export const DataLakeStoreAccountsListByAccountInput =
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/dataLakeStoreAccounts",
    }),
  );
export type DataLakeStoreAccountsListByAccountInput =
  typeof DataLakeStoreAccountsListByAccountInput.Type;

// Output Schema
export const DataLakeStoreAccountsListByAccountOutput =
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
export type DataLakeStoreAccountsListByAccountOutput =
  typeof DataLakeStoreAccountsListByAccountOutput.Type;

// The operation
/**
 * Gets the first page of Data Lake Store accounts linked to the specified Data Lake Analytics account. The response includes a link to the next page, if any.
 *
 * @param $filter - OData filter. Optional.
 * @param $top - The number of items to return. Optional.
 * @param $skip - The number of items to skip over before returning elements. Optional.
 * @param $select - OData Select statement. Limits the properties on each entry to just those requested, e.g. Categories?$select=CategoryName,Description. Optional.
 * @param $orderby - OrderBy clause. One or more comma-separated expressions with an optional "asc" (the default) or "desc" depending on the order you'd like the values sorted, e.g. Categories?$orderby=CategoryName desc. Optional.
 * @param $count - The Boolean value of true or false to request a count of the matching resources included with the resources in the response, e.g. Categories?$count=true. Optional.
 */
export const DataLakeStoreAccountsListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataLakeStoreAccountsListByAccountInput,
    outputSchema: DataLakeStoreAccountsListByAccountOutput,
  }));
// Input Schema
export const FirewallRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    firewallRuleName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/firewallRules/{firewallRuleName}",
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesDeleteInput = typeof FirewallRulesDeleteInput.Type;

// Output Schema
export const FirewallRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FirewallRulesDeleteOutput = typeof FirewallRulesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified firewall rule from the specified Data Lake Analytics account
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/firewallRules/{firewallRuleName}",
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
 * Gets the specified Data Lake Analytics firewall rule.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/firewallRules",
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
 * Lists the Data Lake Analytics firewall rules within the specified Data Lake Analytics account.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/firewallRules/{firewallRuleName}",
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
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataLakeAnalytics/locations/{location}/capability",
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
 * Gets subscription-level properties and limits for Data Lake Analytics specified by resource location.
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
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.DataLakeAnalytics/operations",
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
        properties: Schema.optional(
          Schema.Struct({
            serviceSpecification: Schema.optional(
              Schema.Struct({
                metricSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayDescription: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
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
                    }),
                  ),
                ),
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
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
 * Lists all of the available Data Lake Analytics REST API operations.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const StorageAccountsAddInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}",
    }),
  );
export type StorageAccountsAddInput = typeof StorageAccountsAddInput.Type;

// Output Schema
export const StorageAccountsAddOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAccountsAddOutput = typeof StorageAccountsAddOutput.Type;

// The operation
/**
 * Updates the specified Data Lake Analytics account to add an Azure Storage account.
 *
 * @param storageAccountName - The name of the Azure Storage account to add
 */
export const StorageAccountsAdd = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageAccountsAddInput,
  outputSchema: StorageAccountsAddOutput,
}));
// Input Schema
export const StorageAccountsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}",
    }),
  );
export type StorageAccountsDeleteInput = typeof StorageAccountsDeleteInput.Type;

// Output Schema
export const StorageAccountsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAccountsDeleteOutput =
  typeof StorageAccountsDeleteOutput.Type;

// The operation
/**
 * Updates the specified Data Lake Analytics account to remove an Azure Storage account.
 *
 * @param storageAccountName - The name of the Azure Storage account to remove
 */
export const StorageAccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAccountsDeleteInput,
    outputSchema: StorageAccountsDeleteOutput,
  }),
);
// Input Schema
export const StorageAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}",
    }),
  );
export type StorageAccountsGetInput = typeof StorageAccountsGetInput.Type;

// Output Schema
export const StorageAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type StorageAccountsGetOutput = typeof StorageAccountsGetOutput.Type;

// The operation
/**
 * Gets the specified Azure Storage account linked to the given Data Lake Analytics account.
 *
 * @param storageAccountName - The name of the Azure Storage account for which to retrieve the details.
 */
export const StorageAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: StorageAccountsGetInput,
  outputSchema: StorageAccountsGetOutput,
}));
// Input Schema
export const StorageAccountsGetStorageContainerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageAccountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}/containers/{containerName}",
    }),
  );
export type StorageAccountsGetStorageContainerInput =
  typeof StorageAccountsGetStorageContainerInput.Type;

// Output Schema
export const StorageAccountsGetStorageContainerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type StorageAccountsGetStorageContainerOutput =
  typeof StorageAccountsGetStorageContainerOutput.Type;

// The operation
/**
 * Gets the specified Azure Storage container associated with the given Data Lake Analytics and Azure Storage accounts.
 *
 * @param storageAccountName - The name of the Azure storage account from which to retrieve the blob container.
 * @param containerName - The name of the Azure storage container to retrieve
 */
export const StorageAccountsGetStorageContainer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsGetStorageContainerInput,
    outputSchema: StorageAccountsGetStorageContainerOutput,
  }));
// Input Schema
export const StorageAccountsListByAccountInput =
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts",
    }),
  );
export type StorageAccountsListByAccountInput =
  typeof StorageAccountsListByAccountInput.Type;

// Output Schema
export const StorageAccountsListByAccountOutput =
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
export type StorageAccountsListByAccountOutput =
  typeof StorageAccountsListByAccountOutput.Type;

// The operation
/**
 * Gets the first page of Azure Storage accounts, if any, linked to the specified Data Lake Analytics account. The response includes a link to the next page, if any.
 *
 * @param $filter - The OData filter. Optional.
 * @param $top - The number of items to return. Optional.
 * @param $skip - The number of items to skip over before returning elements. Optional.
 * @param $select - OData Select statement. Limits the properties on each entry to just those requested, e.g. Categories?$select=CategoryName,Description. Optional.
 * @param $orderby - OrderBy clause. One or more comma-separated expressions with an optional "asc" (the default) or "desc" depending on the order you'd like the values sorted, e.g. Categories?$orderby=CategoryName desc. Optional.
 * @param $count - The Boolean value of true or false to request a count of the matching resources included with the resources in the response, e.g. Categories?$count=true. Optional.
 */
export const StorageAccountsListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsListByAccountInput,
    outputSchema: StorageAccountsListByAccountOutput,
  }));
// Input Schema
export const StorageAccountsListSasTokensInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageAccountName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}/containers/{containerName}/listSasTokens",
    }),
  );
export type StorageAccountsListSasTokensInput =
  typeof StorageAccountsListSasTokensInput.Type;

// Output Schema
export const StorageAccountsListSasTokensOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          accessToken: Schema.optional(SensitiveString),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type StorageAccountsListSasTokensOutput =
  typeof StorageAccountsListSasTokensOutput.Type;

// The operation
/**
 * Gets the SAS token associated with the specified Data Lake Analytics and Azure Storage account and container combination.
 *
 * @param storageAccountName - The name of the Azure storage account for which the SAS token is being requested.
 * @param containerName - The name of the Azure storage container for which the SAS token is being requested.
 */
export const StorageAccountsListSasTokens =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsListSasTokensInput,
    outputSchema: StorageAccountsListSasTokensOutput,
  }));
// Input Schema
export const StorageAccountsListStorageContainersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}/containers",
    }),
  );
export type StorageAccountsListStorageContainersInput =
  typeof StorageAccountsListStorageContainersInput.Type;

// Output Schema
export const StorageAccountsListStorageContainersOutput =
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
export type StorageAccountsListStorageContainersOutput =
  typeof StorageAccountsListStorageContainersOutput.Type;

// The operation
/**
 * Lists the Azure Storage containers, if any, associated with the specified Data Lake Analytics and Azure Storage account combination. The response includes a link to the next page of results, if any.
 *
 * @param storageAccountName - The name of the Azure storage account from which to list blob containers.
 */
export const StorageAccountsListStorageContainers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StorageAccountsListStorageContainersInput,
    outputSchema: StorageAccountsListStorageContainersOutput,
  }));
// Input Schema
export const StorageAccountsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageAccountName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}",
    }),
  );
export type StorageAccountsUpdateInput = typeof StorageAccountsUpdateInput.Type;

// Output Schema
export const StorageAccountsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StorageAccountsUpdateOutput =
  typeof StorageAccountsUpdateOutput.Type;

// The operation
/**
 * Updates the Data Lake Analytics account to replace Azure Storage blob account details, such as the access key and/or suffix.
 *
 * @param storageAccountName - The Azure Storage account to modify
 */
export const StorageAccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: StorageAccountsUpdateInput,
    outputSchema: StorageAccountsUpdateOutput,
  }),
);
