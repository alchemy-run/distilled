/**
 * Azure CostManagement API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AlertsDismissInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  alertId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/{scope}/providers/Microsoft.CostManagement/alerts/{alertId}",
  }),
);
export type AlertsDismissInput = typeof AlertsDismissInput.Type;

// Output Schema
export const AlertsDismissOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type AlertsDismissOutput = typeof AlertsDismissOutput.Type;

// The operation
/**
 * Dismisses the specified alert
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param alertId - Alert ID
 */
export const AlertsDismiss = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AlertsDismissInput,
  outputSchema: AlertsDismissOutput,
}));
// Input Schema
export const AlertsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  alertId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/alerts/{alertId}",
  }),
);
export type AlertsGetInput = typeof AlertsGetInput.Type;

// Output Schema
export const AlertsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AlertsGetOutput = typeof AlertsGetOutput.Type;

// The operation
/**
 * Gets the alert for the scope by alert ID.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param alertId - Alert ID
 */
export const AlertsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AlertsGetInput,
  outputSchema: AlertsGetOutput,
}));
// Input Schema
export const AlertsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/alerts",
  }),
);
export type AlertsListInput = typeof AlertsListInput.Type;

// Output Schema
export const AlertsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type AlertsListOutput = typeof AlertsListOutput.Type;

// The operation
/**
 * Lists the alerts for scope defined.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The scope associated with alerts operations. This includes '/subscriptions/{subscriptionId}/' for subscription scope, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope and '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, '/providers/Microsoft.Management/managementGroups/{managementGroupId} for Management Group scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for billingProfile scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/invoiceSections/{invoiceSectionId}' for invoiceSection scope, and '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/customers/{customerId}' specific for partners.
 */
export const AlertsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AlertsListInput,
  outputSchema: AlertsListOutput,
}));
// Input Schema
export const AlertsListExternalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    externalCloudProviderType: Schema.Literals([
      "externalSubscriptions",
      "externalBillingAccounts",
    ]).pipe(T.PathParam()),
    externalCloudProviderId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.CostManagement/{externalCloudProviderType}/{externalCloudProviderId}/alerts",
    }),
  );
export type AlertsListExternalInput = typeof AlertsListExternalInput.Type;

// Output Schema
export const AlertsListExternalOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type AlertsListExternalOutput = typeof AlertsListExternalOutput.Type;

// The operation
/**
 * Lists the Alerts for external cloud provider type defined.
 *
 * @param api-version - The API version to use for this operation.
 * @param externalCloudProviderType - The external cloud provider type associated with dimension/query operations. This includes 'externalSubscriptions' for linked account and 'externalBillingAccounts' for consolidated account.
 * @param externalCloudProviderId - This can be '{externalSubscriptionId}' for linked account or '{externalBillingAccountId}' for consolidated account used with dimension/query operations.
 */
export const AlertsListExternal = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AlertsListExternalInput,
  outputSchema: AlertsListExternalOutput,
}));
// Input Schema
export const BenefitRecommendationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingScope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{billingScope}/providers/Microsoft.CostManagement/benefitRecommendations",
    }),
  );
export type BenefitRecommendationsListInput =
  typeof BenefitRecommendationsListInput.Type;

// Output Schema
export const BenefitRecommendationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kind: Schema.optional(
            Schema.Literals(["IncludedQuantity", "Reservation", "SavingsPlan"]),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BenefitRecommendationsListOutput =
  typeof BenefitRecommendationsListOutput.Type;

// The operation
/**
 * List of recommendations for purchasing savings plan.
 *
 * @param api-version - The API version to use for this operation.
 * @param $filter - Can be used to filter benefitRecommendations by: properties/scope with allowed values ['Single', 'Shared'] and default value 'Shared'; and properties/lookBackPeriod with allowed values ['Last7Days', 'Last30Days', 'Last60Days'] and default value 'Last60Days'; properties/term with allowed values ['P1Y', 'P3Y'] and default value 'P3Y'; properties/subscriptionId; properties/resourceGroup
 * @param $orderby - May be used to order the recommendations by: properties/armSkuName. For the savings plan, the results are in order by default. There is no need to use this clause.
 * @param $expand - May be used to expand the properties by: properties/usage, properties/allRecommendationDetails
 * @param billingScope - The scope associated with benefit recommendation operations. This includes '/subscriptions/{subscriptionId}/' for subscription scope, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resource group scope, /providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for enterprise agreement scope, and '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for billing profile scope
 */
export const BenefitRecommendationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BenefitRecommendationsListInput,
    outputSchema: BenefitRecommendationsListOutput,
  }),
);
// Input Schema
export const BudgetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    budgetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.CostManagement/budgets/{budgetName}",
    }),
  );
export type BudgetsCreateOrUpdateInput = typeof BudgetsCreateOrUpdateInput.Type;

// Output Schema
export const BudgetsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BudgetsCreateOrUpdateOutput =
  typeof BudgetsCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param budgetName - Budget Name.
 */
export const BudgetsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BudgetsCreateOrUpdateInput,
    outputSchema: BudgetsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const BudgetsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  budgetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{scope}/providers/Microsoft.CostManagement/budgets/{budgetName}",
  }),
);
export type BudgetsDeleteInput = typeof BudgetsDeleteInput.Type;

// Output Schema
export const BudgetsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BudgetsDeleteOutput = typeof BudgetsDeleteOutput.Type;

// The operation
/**
 * The operation to delete a budget.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param budgetName - Budget Name.
 */
export const BudgetsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BudgetsDeleteInput,
  outputSchema: BudgetsDeleteOutput,
}));
// Input Schema
export const BudgetsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  budgetName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/budgets/{budgetName}",
  }),
);
export type BudgetsGetInput = typeof BudgetsGetInput.Type;

// Output Schema
export const BudgetsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BudgetsGetOutput = typeof BudgetsGetOutput.Type;

// The operation
/**
 * Gets the budget for the scope by budget name.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param budgetName - Budget Name.
 */
export const BudgetsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BudgetsGetInput,
  outputSchema: BudgetsGetOutput,
}));
// Input Schema
export const BudgetsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $filter: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/budgets",
  }),
);
export type BudgetsListInput = typeof BudgetsListInput.Type;

// Output Schema
export const BudgetsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type BudgetsListOutput = typeof BudgetsListOutput.Type;

// The operation
/**
 * Lists all budgets for the defined scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param $filter - OData filter option. May be used to filter budgets by properties/category. The filter supports 'eq' only.
 */
export const BudgetsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BudgetsListInput,
  outputSchema: BudgetsListOutput,
}));
// Input Schema
export const CostAllocationRulesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules/checkNameAvailability",
    }),
  );
export type CostAllocationRulesCheckNameAvailabilityInput =
  typeof CostAllocationRulesCheckNameAvailabilityInput.Type;

// Output Schema
export const CostAllocationRulesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(
      Schema.Literals(["Invalid", "AlreadyExists", "Valid"]),
    ),
    message: Schema.optional(Schema.String),
  });
export type CostAllocationRulesCheckNameAvailabilityOutput =
  typeof CostAllocationRulesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks availability and correctness of a name for a cost allocation rule
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 */
export const CostAllocationRulesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CostAllocationRulesCheckNameAvailabilityInput,
    outputSchema: CostAllocationRulesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const CostAllocationRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    ruleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules/{ruleName}",
    }),
  );
export type CostAllocationRulesCreateOrUpdateInput =
  typeof CostAllocationRulesCreateOrUpdateInput.Type;

// Output Schema
export const CostAllocationRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CostAllocationRulesCreateOrUpdateOutput =
  typeof CostAllocationRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create/Update a rule to allocate cost between different resources within a billing account or enterprise enrollment.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param ruleName - Cost allocation rule name. The name cannot include spaces or any non alphanumeric characters other than '_' and '-'. The max length is 260 characters.
 */
export const CostAllocationRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CostAllocationRulesCreateOrUpdateInput,
    outputSchema: CostAllocationRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const CostAllocationRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    ruleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules/{ruleName}",
    }),
  );
export type CostAllocationRulesDeleteInput =
  typeof CostAllocationRulesDeleteInput.Type;

// Output Schema
export const CostAllocationRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CostAllocationRulesDeleteOutput =
  typeof CostAllocationRulesDeleteOutput.Type;

// The operation
/**
 * Delete cost allocation rule for billing account or enterprise enrollment.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param ruleName - Cost allocation rule name. The name cannot include spaces or any non alphanumeric characters other than '_' and '-'. The max length is 260 characters.
 */
export const CostAllocationRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CostAllocationRulesDeleteInput,
    outputSchema: CostAllocationRulesDeleteOutput,
  }),
);
// Input Schema
export const CostAllocationRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    ruleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules/{ruleName}",
    }),
  );
export type CostAllocationRulesGetInput =
  typeof CostAllocationRulesGetInput.Type;

// Output Schema
export const CostAllocationRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CostAllocationRulesGetOutput =
  typeof CostAllocationRulesGetOutput.Type;

// The operation
/**
 * Get a cost allocation rule by rule name and billing account or enterprise enrollment.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param ruleName - Cost allocation rule name. The name cannot include spaces or any non alphanumeric characters other than '_' and '-'. The max length is 260 characters.
 */
export const CostAllocationRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CostAllocationRulesGetInput,
    outputSchema: CostAllocationRulesGetOutput,
  }),
);
// Input Schema
export const CostAllocationRulesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/costAllocationRules",
    }),
  );
export type CostAllocationRulesListInput =
  typeof CostAllocationRulesListInput.Type;

// Output Schema
export const CostAllocationRulesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type CostAllocationRulesListOutput =
  typeof CostAllocationRulesListOutput.Type;

// The operation
/**
 * Get the list of all cost allocation rules for a billing account or enterprise enrollment.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 */
export const CostAllocationRulesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CostAllocationRulesListInput,
    outputSchema: CostAllocationRulesListOutput,
  }),
);
// Input Schema
export const DimensionsByExternalCloudProviderTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    externalCloudProviderType: Schema.Literals([
      "externalSubscriptions",
      "externalBillingAccounts",
    ]).pipe(T.PathParam()),
    externalCloudProviderId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $skiptoken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.CostManagement/{externalCloudProviderType}/{externalCloudProviderId}/dimensions",
    }),
  );
export type DimensionsByExternalCloudProviderTypeInput =
  typeof DimensionsByExternalCloudProviderTypeInput.Type;

// Output Schema
export const DimensionsByExternalCloudProviderTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
          sku: Schema.optional(Schema.String),
          eTag: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DimensionsByExternalCloudProviderTypeOutput =
  typeof DimensionsByExternalCloudProviderTypeOutput.Type;

// The operation
/**
 * Lists the dimensions by the external cloud provider type.
 *
 * @param api-version - The API version to use for this operation.
 * @param externalCloudProviderType - The external cloud provider type associated with dimension/query operations. This includes 'externalSubscriptions' for linked account and 'externalBillingAccounts' for consolidated account.
 * @param externalCloudProviderId - This can be '{externalSubscriptionId}' for linked account or '{externalBillingAccountId}' for consolidated account used with dimension/query operations.
 * @param $filter - May be used to filter dimensions by properties/category, properties/usageStart, properties/usageEnd. Supported operators are 'eq','lt', 'gt', 'le', 'ge'.
 * @param $expand - May be used to expand the properties/data within a dimension category. By default, data is not included when listing dimensions.
 * @param $skiptoken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the most recent N dimension data.
 */
export const DimensionsByExternalCloudProviderType =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DimensionsByExternalCloudProviderTypeInput,
    outputSchema: DimensionsByExternalCloudProviderTypeOutput,
  }));
// Input Schema
export const DimensionsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $filter: Schema.optional(Schema.String),
  $expand: Schema.optional(Schema.String),
  $skiptoken: Schema.optional(Schema.String),
  $top: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/dimensions",
  }),
);
export type DimensionsListInput = typeof DimensionsListInput.Type;

// Output Schema
export const DimensionsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        location: Schema.optional(Schema.String),
        sku: Schema.optional(Schema.String),
        eTag: Schema.optional(Schema.String),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type DimensionsListOutput = typeof DimensionsListOutput.Type;

// The operation
/**
 * Lists the dimensions by the defined scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The scope associated with dimension operations. This includes '/subscriptions/{subscriptionId}/' for subscription scope, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, '/providers/Microsoft.Management/managementGroups/{managementGroupId}' for Management Group scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for billingProfile scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/invoiceSections/{invoiceSectionId}' for invoiceSection scope, and 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/customers/{customerId}' specific for partners.
 * @param $filter - May be used to filter dimensions by properties/category, properties/usageStart, properties/usageEnd. Supported operators are 'eq','lt', 'gt', 'le', 'ge'.
 * @param $expand - May be used to expand the properties/data within a dimension category. By default, data is not included when listing dimensions.
 * @param $skiptoken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the most recent N dimension data.
 */
export const DimensionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DimensionsListInput,
  outputSchema: DimensionsListOutput,
}));
// Input Schema
export const ExportsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    exportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.CostManagement/exports/{exportName}",
    }),
  );
export type ExportsCreateOrUpdateInput = typeof ExportsCreateOrUpdateInput.Type;

// Output Schema
export const ExportsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExportsCreateOrUpdateOutput =
  typeof ExportsCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a export. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param exportName - Export Name.
 */
export const ExportsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExportsCreateOrUpdateInput,
    outputSchema: ExportsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ExportsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  exportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/{scope}/providers/Microsoft.CostManagement/exports/{exportName}",
  }),
);
export type ExportsDeleteInput = typeof ExportsDeleteInput.Type;

// Output Schema
export const ExportsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExportsDeleteOutput = typeof ExportsDeleteOutput.Type;

// The operation
/**
 * The operation to delete a export.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param exportName - Export Name.
 */
export const ExportsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportsDeleteInput,
  outputSchema: ExportsDeleteOutput,
}));
// Input Schema
export const ExportsExecuteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  exportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/{scope}/providers/Microsoft.CostManagement/exports/{exportName}/run",
  }),
);
export type ExportsExecuteInput = typeof ExportsExecuteInput.Type;

// Output Schema
export const ExportsExecuteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExportsExecuteOutput = typeof ExportsExecuteOutput.Type;

// The operation
/**
 * The operation to run an export.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param exportName - Export Name.
 */
export const ExportsExecute = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportsExecuteInput,
  outputSchema: ExportsExecuteOutput,
}));
// Input Schema
export const ExportsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  exportName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/exports/{exportName}",
  }),
);
export type ExportsGetInput = typeof ExportsGetInput.Type;

// Output Schema
export const ExportsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExportsGetOutput = typeof ExportsGetOutput.Type;

// The operation
/**
 * The operation to get the export for the defined scope by export name.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param exportName - Export Name.
 * @param $expand - May be used to expand the properties within an export. Currently only 'runHistory' is supported and will return information for the last 10 runs of the export.
 */
export const ExportsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportsGetInput,
  outputSchema: ExportsGetOutput,
}));
// Input Schema
export const ExportsGetExecutionHistoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    exportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.CostManagement/exports/{exportName}/runHistory",
    }),
  );
export type ExportsGetExecutionHistoryInput =
  typeof ExportsGetExecutionHistoryInput.Type;

// Output Schema
export const ExportsGetExecutionHistoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          eTag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ExportsGetExecutionHistoryOutput =
  typeof ExportsGetExecutionHistoryOutput.Type;

// The operation
/**
 * The operation to get the run history of an export for the defined scope and export name.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param exportName - Export Name.
 */
export const ExportsGetExecutionHistory = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ExportsGetExecutionHistoryInput,
    outputSchema: ExportsGetExecutionHistoryOutput,
  }),
);
// Input Schema
export const ExportsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/exports",
  }),
);
export type ExportsListInput = typeof ExportsListInput.Type;

// Output Schema
export const ExportsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type ExportsListOutput = typeof ExportsListOutput.Type;

// The operation
/**
 * The operation to list all exports at the given scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The scope associated with alerts operations. This includes '/subscriptions/{subscriptionId}/' for subscription scope, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope and '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, '/providers/Microsoft.Management/managementGroups/{managementGroupId} for Management Group scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for billingProfile scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/invoiceSections/{invoiceSectionId}' for invoiceSection scope, and '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/customers/{customerId}' specific for partners.
 * @param $expand - May be used to expand the properties within an export. Currently only 'runHistory' is supported and will return information for the last run of each export.
 */
export const ExportsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportsListInput,
  outputSchema: ExportsListOutput,
}));
// Input Schema
export const ForecastExternalCloudProviderUsageInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    externalCloudProviderType: Schema.Literals([
      "externalSubscriptions",
      "externalBillingAccounts",
    ]).pipe(T.PathParam()),
    externalCloudProviderId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.CostManagement/{externalCloudProviderType}/{externalCloudProviderId}/forecast",
    }),
  );
export type ForecastExternalCloudProviderUsageInput =
  typeof ForecastExternalCloudProviderUsageInput.Type;

// Output Schema
export const ForecastExternalCloudProviderUsageOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    sku: Schema.optional(Schema.String),
    eTag: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ForecastExternalCloudProviderUsageOutput =
  typeof ForecastExternalCloudProviderUsageOutput.Type;

// The operation
/**
 * Lists the forecast charges for external cloud provider type defined.
 *
 * @param api-version - The API version to use for this operation.
 * @param $filter - May be used to filter forecasts by properties/usageDate (Utc time), properties/chargeType or properties/grain. The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. It does not currently support 'ne', 'or', or 'not'.
 * @param externalCloudProviderType - The external cloud provider type associated with dimension/query operations. This includes 'externalSubscriptions' for linked account and 'externalBillingAccounts' for consolidated account.
 * @param externalCloudProviderId - This can be '{externalSubscriptionId}' for linked account or '{externalBillingAccountId}' for consolidated account used with dimension/query operations.
 */
export const ForecastExternalCloudProviderUsage =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ForecastExternalCloudProviderUsageInput,
    outputSchema: ForecastExternalCloudProviderUsageOutput,
  }));
// Input Schema
export const ForecastUsageInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $filter: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/{scope}/providers/Microsoft.CostManagement/forecast",
  }),
);
export type ForecastUsageInput = typeof ForecastUsageInput.Type;

// Output Schema
export const ForecastUsageOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  sku: Schema.optional(Schema.String),
  eTag: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ForecastUsageOutput = typeof ForecastUsageOutput.Type;

// The operation
/**
 * Lists the forecast charges for scope defined.
 *
 * @param api-version - The API version to use for this operation.
 * @param $filter - May be used to filter forecasts by properties/usageDate (Utc time), properties/chargeType or properties/grain. The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. It does not currently support 'ne', 'or', or 'not'.
 * @param scope - The scope associated with forecast operations. This includes '/subscriptions/{subscriptionId}/' for subscription scope, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope and '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, '/providers/Microsoft.Management/managementGroups/{managementGroupId} for Management Group scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for billingProfile scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/invoiceSections/{invoiceSectionId}' for invoiceSection scope, and '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/customers/{customerId}' specific for partners.
 */
export const ForecastUsage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ForecastUsageInput,
  outputSchema: ForecastUsageOutput,
}));
// Input Schema
export const GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport",
    }),
  );
export type GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountInput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountInput.Type;

// Output Schema
export const GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    input: Schema.optional(
      Schema.Struct({
        billingAccountId: Schema.optional(Schema.String),
        billingProfileId: Schema.optional(Schema.String),
        benefitOrderId: Schema.optional(Schema.String),
        benefitId: Schema.optional(Schema.String),
        grain: Schema.Literals(["Hourly", "Daily", "Monthly"]),
        startDate: Schema.String,
        endDate: Schema.String,
        kind: Schema.optional(
          Schema.Literals(["IncludedQuantity", "Reservation", "SavingsPlan"]),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        reportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        secondaryReportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        validUntil: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOutput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOutput.Type;

// The operation
/**
 * Triggers generation of a benefit utilization summaries report for the provided billing account. This API supports only enrollment accounts.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 */
export const GenerateBenefitUtilizationSummariesReportGenerateByBillingAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountInput,
    outputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateByBillingAccountOutput,
  }));
// Input Schema
export const GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    billingProfileId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport",
    }),
  );
export type GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileInput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileInput.Type;

// Output Schema
export const GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    input: Schema.optional(
      Schema.Struct({
        billingAccountId: Schema.optional(Schema.String),
        billingProfileId: Schema.optional(Schema.String),
        benefitOrderId: Schema.optional(Schema.String),
        benefitId: Schema.optional(Schema.String),
        grain: Schema.Literals(["Hourly", "Daily", "Monthly"]),
        startDate: Schema.String,
        endDate: Schema.String,
        kind: Schema.optional(
          Schema.Literals(["IncludedQuantity", "Reservation", "SavingsPlan"]),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        reportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        secondaryReportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        validUntil: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOutput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOutput.Type;

// The operation
/**
 * Triggers generation of a benefit utilization summaries report for the provided billing account and billing profile.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param billingProfileId - Billing Profile ID.
 */
export const GenerateBenefitUtilizationSummariesReportGenerateByBillingProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileInput,
    outputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateByBillingProfileOutput,
  }));
// Input Schema
export const GenerateBenefitUtilizationSummariesReportGenerateByReservationIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reservationOrderId: Schema.String.pipe(T.PathParam()),
    reservationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Capacity/reservationorders/{reservationOrderId}/reservations/{reservationId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport",
    }),
  );
export type GenerateBenefitUtilizationSummariesReportGenerateByReservationIdInput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateByReservationIdInput.Type;

// Output Schema
export const GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    input: Schema.optional(
      Schema.Struct({
        billingAccountId: Schema.optional(Schema.String),
        billingProfileId: Schema.optional(Schema.String),
        benefitOrderId: Schema.optional(Schema.String),
        benefitId: Schema.optional(Schema.String),
        grain: Schema.Literals(["Hourly", "Daily", "Monthly"]),
        startDate: Schema.String,
        endDate: Schema.String,
        kind: Schema.optional(
          Schema.Literals(["IncludedQuantity", "Reservation", "SavingsPlan"]),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        reportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        secondaryReportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        validUntil: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOutput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOutput.Type;

// The operation
/**
 * Triggers generation of a benefit utilization summaries report for the provided reservation.
 *
 * @param api-version - The API version to use for this operation.
 * @param reservationOrderId - Reservation Order ID
 * @param reservationId - Reservation ID
 */
export const GenerateBenefitUtilizationSummariesReportGenerateByReservationId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateByReservationIdInput,
    outputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateByReservationIdOutput,
  }));
// Input Schema
export const GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reservationOrderId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Capacity/reservationorders/{reservationOrderId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport",
    }),
  );
export type GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdInput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdInput.Type;

// Output Schema
export const GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    input: Schema.optional(
      Schema.Struct({
        billingAccountId: Schema.optional(Schema.String),
        billingProfileId: Schema.optional(Schema.String),
        benefitOrderId: Schema.optional(Schema.String),
        benefitId: Schema.optional(Schema.String),
        grain: Schema.Literals(["Hourly", "Daily", "Monthly"]),
        startDate: Schema.String,
        endDate: Schema.String,
        kind: Schema.optional(
          Schema.Literals(["IncludedQuantity", "Reservation", "SavingsPlan"]),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        reportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        secondaryReportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        validUntil: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOutput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOutput.Type;

// The operation
/**
 * Triggers generation of a benefit utilization summaries report for the provided reservation order.
 *
 * @param api-version - The API version to use for this operation.
 * @param reservationOrderId - Reservation Order ID
 */
export const GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdInput,
    outputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateByReservationOrderIdOutput,
  }));
// Input Schema
export const GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    savingsPlanOrderId: Schema.String.pipe(T.PathParam()),
    savingsPlanId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport",
    }),
  );
export type GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdInput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdInput.Type;

// Output Schema
export const GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    input: Schema.optional(
      Schema.Struct({
        billingAccountId: Schema.optional(Schema.String),
        billingProfileId: Schema.optional(Schema.String),
        benefitOrderId: Schema.optional(Schema.String),
        benefitId: Schema.optional(Schema.String),
        grain: Schema.Literals(["Hourly", "Daily", "Monthly"]),
        startDate: Schema.String,
        endDate: Schema.String,
        kind: Schema.optional(
          Schema.Literals(["IncludedQuantity", "Reservation", "SavingsPlan"]),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        reportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        secondaryReportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        validUntil: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOutput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOutput.Type;

// The operation
/**
 * Triggers generation of a benefit utilization summaries report for the provided savings plan.
 *
 * @param api-version - The API version to use for this operation.
 * @param savingsPlanOrderId - Savings plan order ID.
 * @param savingsPlanId - Savings plan ID.
 */
export const GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdInput,
    outputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanIdOutput,
  }));
// Input Schema
export const GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    savingsPlanOrderId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/providers/Microsoft.CostManagement/generateBenefitUtilizationSummariesReport",
    }),
  );
export type GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdInput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdInput.Type;

// Output Schema
export const GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    input: Schema.optional(
      Schema.Struct({
        billingAccountId: Schema.optional(Schema.String),
        billingProfileId: Schema.optional(Schema.String),
        benefitOrderId: Schema.optional(Schema.String),
        benefitId: Schema.optional(Schema.String),
        grain: Schema.Literals(["Hourly", "Daily", "Monthly"]),
        startDate: Schema.String,
        endDate: Schema.String,
        kind: Schema.optional(
          Schema.Literals(["IncludedQuantity", "Reservation", "SavingsPlan"]),
        ),
      }),
    ),
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        reportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        secondaryReportUrl: Schema.optional(
          Schema.Literals([
            "Kind",
            "AvgUtilizationPercentage",
            "BenefitOrderId",
            "BenefitId",
            "BenefitType",
            "MaxUtilizationPercentage",
            "MinUtilizationPercentage",
            "UsageDate",
            "UtilizedPercentage",
          ]),
        ),
        validUntil: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOutput =
  typeof GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOutput.Type;

// The operation
/**
 * Triggers generation of a benefit utilization summaries report for the provided savings plan order.
 *
 * @param api-version - The API version to use for this operation.
 * @param savingsPlanOrderId - Savings plan order ID.
 */
export const GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdInput,
    outputSchema:
      GenerateBenefitUtilizationSummariesReportGenerateBySavingsPlanOrderIdOutput,
  }));
// Input Schema
export const GenerateCostDetailsReportCreateOperationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{scope}/providers/Microsoft.CostManagement/generateCostDetailsReport",
    }),
  );
export type GenerateCostDetailsReportCreateOperationInput =
  typeof GenerateCostDetailsReportCreateOperationInput.Type;

// Output Schema
export const GenerateCostDetailsReportCreateOperationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["Completed", "NoDataFound", "Failed"]),
    ),
    manifest: Schema.optional(
      Schema.Struct({
        manifestVersion: Schema.optional(Schema.String),
        dataFormat: Schema.optional(Schema.Literals(["Csv"])),
        byteCount: Schema.optional(Schema.Number),
        blobCount: Schema.optional(Schema.Number),
        compressData: Schema.optional(Schema.Boolean),
        requestContext: Schema.optional(
          Schema.Struct({
            requestScope: Schema.optional(Schema.String),
            requestBody: Schema.optional(
              Schema.Struct({
                metric: Schema.optional(
                  Schema.Literals(["ActualCost", "AmortizedCost"]),
                ),
                timePeriod: Schema.optional(
                  Schema.Struct({
                    start: Schema.String,
                    end: Schema.String,
                  }),
                ),
                billingPeriod: Schema.optional(Schema.String),
                invoiceId: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
        blobs: Schema.optional(
          Schema.Array(
            Schema.Struct({
              blobLink: Schema.optional(Schema.String),
              byteCount: Schema.optional(Schema.Number),
            }),
          ),
        ),
      }),
    ),
    validTill: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateCostDetailsReportCreateOperationOutput =
  typeof GenerateCostDetailsReportCreateOperationOutput.Type;

// The operation
/**
 * This API is the replacement for all previously release Usage Details APIs. Request to generate a cost details report for the provided date range, billing period (Only enterprise customers) or Invoice Id asynchronously at a certain scope. The initial call to request a report will return a 202 with a 'Location' and 'Retry-After' header. The 'Location' header will provide the endpoint to poll to get the result of the report generation. The 'Retry-After' provides the duration to wait before polling for the generated report. A call to poll the report operation will provide a 202 response with a 'Location' header if the operation is still in progress. Once the report generation operation completes, the polling endpoint will provide a 200 response along with details on the report blob(s) that are available for download. The details on the file(s) available for download will be available in the polling response body. To Understand cost details (formerly known as usage details) fields found in files ,see https://learn.microsoft.com/en-us/azure/cost-management-billing/automate/understand-usage-details-fields
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The ARM Resource ID for subscription, billing account, or other billing scopes.Currently Resource Group and Management Group are not supported. For details, see https://aka.ms/costmgmt/scopes.
 */
export const GenerateCostDetailsReportCreateOperation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GenerateCostDetailsReportCreateOperationInput,
    outputSchema: GenerateCostDetailsReportCreateOperationOutput,
  }));
// Input Schema
export const GenerateCostDetailsReportGetOperationResultsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.CostManagement/costDetailsOperationResults/{operationId}",
    }),
  );
export type GenerateCostDetailsReportGetOperationResultsInput =
  typeof GenerateCostDetailsReportGetOperationResultsInput.Type;

// Output Schema
export const GenerateCostDetailsReportGetOperationResultsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["Completed", "NoDataFound", "Failed"]),
    ),
    manifest: Schema.optional(
      Schema.Struct({
        manifestVersion: Schema.optional(Schema.String),
        dataFormat: Schema.optional(Schema.Literals(["Csv"])),
        byteCount: Schema.optional(Schema.Number),
        blobCount: Schema.optional(Schema.Number),
        compressData: Schema.optional(Schema.Boolean),
        requestContext: Schema.optional(
          Schema.Struct({
            requestScope: Schema.optional(Schema.String),
            requestBody: Schema.optional(
              Schema.Struct({
                metric: Schema.optional(
                  Schema.Literals(["ActualCost", "AmortizedCost"]),
                ),
                timePeriod: Schema.optional(
                  Schema.Struct({
                    start: Schema.String,
                    end: Schema.String,
                  }),
                ),
                billingPeriod: Schema.optional(Schema.String),
                invoiceId: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
        blobs: Schema.optional(
          Schema.Array(
            Schema.Struct({
              blobLink: Schema.optional(Schema.String),
              byteCount: Schema.optional(Schema.Number),
            }),
          ),
        ),
      }),
    ),
    validTill: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateCostDetailsReportGetOperationResultsOutput =
  typeof GenerateCostDetailsReportGetOperationResultsOutput.Type;

// The operation
/**
 * Get the result of the specified operation. This link is provided in the CostDetails creation request response Location header.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The ARM Resource ID for subscription, billing account, or other billing scopes.Currently Resource Group and Management Group are not supported. For details, see https://aka.ms/costmgmt/scopes.
 * @param operationId - The target operation Id.
 */
export const GenerateCostDetailsReportGetOperationResults =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GenerateCostDetailsReportGetOperationResultsInput,
    outputSchema: GenerateCostDetailsReportGetOperationResultsOutput,
  }));
// Input Schema
export const GenerateDetailedCostReportCreateOperationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{scope}/providers/Microsoft.CostManagement/generateDetailedCostReport",
    }),
  );
export type GenerateDetailedCostReportCreateOperationInput =
  typeof GenerateDetailedCostReportCreateOperationInput.Type;

// Output Schema
export const GenerateDetailedCostReportCreateOperationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GenerateDetailedCostReportCreateOperationOutput =
  typeof GenerateDetailedCostReportCreateOperationOutput.Type;

// The operation
/**
 * Generates the detailed cost report for provided date range, billing period(only enterprise customers) or Invoice ID asynchronously at a certain scope. Call returns a 202 with header Azure-Consumption-AsyncOperation providing a link to the operation created. A call on the operation will provide the status and if the operation is completed the blob file where generated detailed cost report is being stored.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The ARM Resource ID for subscription, resource group, billing account, or other billing scopes. For details, see https://aka.ms/costmgmt/scopes.
 */
export const GenerateDetailedCostReportCreateOperation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GenerateDetailedCostReportCreateOperationInput,
    outputSchema: GenerateDetailedCostReportCreateOperationOutput,
  }));
// Input Schema
export const GenerateDetailedCostReportOperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.CostManagement/operationResults/{operationId}",
    }),
  );
export type GenerateDetailedCostReportOperationResultsGetInput =
  typeof GenerateDetailedCostReportOperationResultsGetInput.Type;

// Output Schema
export const GenerateDetailedCostReportOperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GenerateDetailedCostReportOperationResultsGetOutput =
  typeof GenerateDetailedCostReportOperationResultsGetOutput.Type;

// The operation
/**
 * Gets the result of the specified operation. The link with this operationId is provided as a response header of the initial request.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param operationId - The target operation Id.
 */
export const GenerateDetailedCostReportOperationResultsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GenerateDetailedCostReportOperationResultsGetInput,
    outputSchema: GenerateDetailedCostReportOperationResultsGetOutput,
  }));
// Input Schema
export const GenerateDetailedCostReportOperationStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.CostManagement/operationStatus/{operationId}",
    }),
  );
export type GenerateDetailedCostReportOperationStatusGetInput =
  typeof GenerateDetailedCostReportOperationStatusGetInput.Type;

// Output Schema
export const GenerateDetailedCostReportOperationStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GenerateDetailedCostReportOperationStatusGetOutput =
  typeof GenerateDetailedCostReportOperationStatusGetOutput.Type;

// The operation
/**
 * Get the status of the specified operation. This link is provided in the GenerateDetailedCostReport creation request response header.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param operationId - The target operation Id.
 */
export const GenerateDetailedCostReportOperationStatusGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GenerateDetailedCostReportOperationStatusGetInput,
    outputSchema: GenerateDetailedCostReportOperationStatusGetOutput,
  }));
// Input Schema
export const GenerateReservationDetailsReportByBillingAccountIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    startDate: Schema.String,
    endDate: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.CostManagement/generateReservationDetailsReport",
    }),
  );
export type GenerateReservationDetailsReportByBillingAccountIdInput =
  typeof GenerateReservationDetailsReportByBillingAccountIdInput.Type;

// Output Schema
export const GenerateReservationDetailsReportByBillingAccountIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        reportUrl: Schema.optional(
          Schema.Literals([
            "InstanceFlexibilityGroup",
            "InstanceFlexibilityRatio",
            "InstanceId",
            "Kind",
            "ReservationId",
            "ReservationOrderId",
            "ReservedHours",
            "SkuName",
            "TotalReservedQuantity",
            "UsageDate",
            "UsedHours",
          ]),
        ),
        validUntil: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateReservationDetailsReportByBillingAccountIdOutput =
  typeof GenerateReservationDetailsReportByBillingAccountIdOutput.Type;

// The operation
/**
 * Generates the reservations details report for provided date range asynchronously based on enrollment id. The Reservation usage details can be viewed only by certain enterprise roles. For more details on the roles see, https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/understand-ea-roles#usage-and-costs-access-by-role
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param startDate - Start Date
 * @param endDate - End Date
 */
export const GenerateReservationDetailsReportByBillingAccountId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GenerateReservationDetailsReportByBillingAccountIdInput,
    outputSchema: GenerateReservationDetailsReportByBillingAccountIdOutput,
  }));
// Input Schema
export const GenerateReservationDetailsReportByBillingProfileIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    billingProfileId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    startDate: Schema.String,
    endDate: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.CostManagement/generateReservationDetailsReport",
    }),
  );
export type GenerateReservationDetailsReportByBillingProfileIdInput =
  typeof GenerateReservationDetailsReportByBillingProfileIdInput.Type;

// Output Schema
export const GenerateReservationDetailsReportByBillingProfileIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        reportUrl: Schema.optional(
          Schema.Literals([
            "InstanceFlexibilityGroup",
            "InstanceFlexibilityRatio",
            "InstanceId",
            "Kind",
            "ReservationId",
            "ReservationOrderId",
            "ReservedHours",
            "SkuName",
            "TotalReservedQuantity",
            "UsageDate",
            "UsedHours",
          ]),
        ),
        validUntil: Schema.optional(Schema.String),
      }),
    ),
  });
export type GenerateReservationDetailsReportByBillingProfileIdOutput =
  typeof GenerateReservationDetailsReportByBillingProfileIdOutput.Type;

// The operation
/**
 * Generates the reservations details report for provided date range asynchronously by billing profile. The Reservation usage details can be viewed by only certain enterprise roles by default. For more details on the roles see, https://docs.microsoft.com/en-us/azure/cost-management-billing/reservations/reservation-utilization#view-utilization-in-the-azure-portal-with-azure-rbac-access
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param billingProfileId - Billing Profile ID.
 * @param startDate - Start Date
 * @param endDate - End Date
 */
export const GenerateReservationDetailsReportByBillingProfileId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GenerateReservationDetailsReportByBillingProfileIdInput,
    outputSchema: GenerateReservationDetailsReportByBillingProfileIdOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.CostManagement/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
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
        origin: Schema.optional(
          Schema.Literals(["user", "system", "user,system"]),
        ),
        actionType: Schema.optional(Schema.Literals(["Internal"])),
      }),
    ),
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
export const PriceSheetDownloadByBillingAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    billingPeriodName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountId}/billingPeriods/{billingPeriodName}/providers/Microsoft.CostManagement/pricesheets/default/download",
    }),
  );
export type PriceSheetDownloadByBillingAccountInput =
  typeof PriceSheetDownloadByBillingAccountInput.Type;

// Output Schema
export const PriceSheetDownloadByBillingAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        reportUrl: Schema.optional(
          Schema.Literals([
            "InstanceFlexibilityGroup",
            "InstanceFlexibilityRatio",
            "InstanceId",
            "Kind",
            "ReservationId",
            "ReservationOrderId",
            "ReservedHours",
            "SkuName",
            "TotalReservedQuantity",
            "UsageDate",
            "UsedHours",
          ]),
        ),
        validUntil: Schema.optional(Schema.String),
      }),
    ),
  });
export type PriceSheetDownloadByBillingAccountOutput =
  typeof PriceSheetDownloadByBillingAccountOutput.Type;

// The operation
/**
 * Generates the pricesheet for the provided billing period asynchronously based on the Enrollment ID. This is for Enterprise Agreement customers.
 * **Migrate to version 2025-03-01**
 * You can use the 2025-03-01 API version with the new URI:
 * '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingPeriods/{billingPeriodName}/providers/Microsoft.CostManagement/pricesheets/default/download'
 * With a new schema detailed below, the new version of the price sheet provides additional information and includes prices for Azure Reserved Instances (RI) for the current billing period. We recommend downloading an Azure Price Sheet for when entering a new billing period if you would maintain an ongoing record of past Azure Reserved Instance (RI) pricing.
 * The EA Azure price sheet is available for billing periods in the past 13 months. To request a price sheet for a billing period older than 13 months, please contact support.
 * The Azure price sheet download experience has been updated from a single .csv file to a zip file containing multiple .csv files, each with max size of 75MB. The 2023-11-01 version has been upgraded to use http POST method; details can be found below.
 * All versions of the Microsoft.Consumption Azure Price Sheet - Download by Billing Account (including 2022-06-01, 2021-10-01, 2020-01-01-preview, 2019-10-01, 2019-05-01) are scheduled to be retired on 01 June 2026 and will no longer be supported after this date.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param billingPeriodName - Billing Period Name.
 */
export const PriceSheetDownloadByBillingAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PriceSheetDownloadByBillingAccountInput,
    outputSchema: PriceSheetDownloadByBillingAccountOutput,
  }));
// Input Schema
export const PriceSheetDownloadByBillingProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountName: Schema.String.pipe(T.PathParam()),
    billingProfileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/providers/Microsoft.CostManagement/pricesheets/default/download",
    }),
  );
export type PriceSheetDownloadByBillingProfileInput =
  typeof PriceSheetDownloadByBillingProfileInput.Type;

// Output Schema
export const PriceSheetDownloadByBillingProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expiryTime: Schema.optional(Schema.String),
    downloadUrl: Schema.optional(Schema.String),
    downloadFileProperties: Schema.optional(
      Schema.Struct({
        billingAccountID: Schema.optional(Schema.String),
        billingAccountName: Schema.optional(Schema.String),
        billingProfileId: Schema.optional(Schema.String),
        billingProfileName: Schema.optional(Schema.String),
        productOrderName: Schema.optional(Schema.String),
        serviceFamily: Schema.optional(Schema.Number),
        product: Schema.optional(Schema.String),
        productId: Schema.optional(Schema.String),
        skuId: Schema.optional(Schema.String),
        unitOfMeasure: Schema.optional(Schema.String),
        meterId: Schema.optional(Schema.String),
        meterName: Schema.optional(Schema.String),
        meterType: Schema.optional(Schema.String),
        meterCategory: Schema.optional(Schema.String),
        meterSubCategory: Schema.optional(Schema.String),
        meterRegion: Schema.optional(Schema.String),
        tierMinimumUnits: Schema.optional(Schema.String),
        effectiveStartDate: Schema.optional(Schema.String),
        effectiveEndDate: Schema.optional(Schema.String),
        unitPrice: Schema.optional(Schema.String),
        basePrice: Schema.optional(Schema.String),
        marketPrice: Schema.optional(Schema.String),
        currency: Schema.optional(Schema.String),
        billingCurrency: Schema.optional(Schema.String),
        term: Schema.optional(Schema.String),
        priceType: Schema.optional(Schema.String),
      }),
    ),
  });
export type PriceSheetDownloadByBillingProfileOutput =
  typeof PriceSheetDownloadByBillingProfileOutput.Type;

// The operation
/**
 * Gets a URL to download the current month's pricesheet for a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 * You can use the new 2023-09-01 API version for billing periods January 2023 onwards. Azure Reserved Instance (RI) pricing is only available through the new version of the API.
 * Due to Azure product growth, the Azure price sheet download experience in this preview version will be updated from a single csv/json file to a Zip file containing multiple csv/json files, each with max size of 75MB.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountName - BillingAccount ID
 * @param billingProfileName - Billing Profile Name.
 */
export const PriceSheetDownloadByBillingProfile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PriceSheetDownloadByBillingProfileInput,
    outputSchema: PriceSheetDownloadByBillingProfileOutput,
  }));
// Input Schema
export const PriceSheetDownloadByInvoiceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountName: Schema.String.pipe(T.PathParam()),
    billingProfileName: Schema.String.pipe(T.PathParam()),
    invoiceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoices/{invoiceName}/providers/Microsoft.CostManagement/pricesheets/default/download",
    }),
  );
export type PriceSheetDownloadByInvoiceInput =
  typeof PriceSheetDownloadByInvoiceInput.Type;

// Output Schema
export const PriceSheetDownloadByInvoiceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expiryTime: Schema.optional(Schema.String),
    validTill: Schema.optional(Schema.String),
    downloadUrl: Schema.optional(Schema.String),
  });
export type PriceSheetDownloadByInvoiceOutput =
  typeof PriceSheetDownloadByInvoiceOutput.Type;

// The operation
/**
 * Gets a URL to download the pricesheet for an invoice. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountName - BillingAccount ID
 * @param billingProfileName - Billing Profile Name.
 * @param invoiceName - The ID that uniquely identifies an invoice.
 */
export const PriceSheetDownloadByInvoice = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PriceSheetDownloadByInvoiceInput,
    outputSchema: PriceSheetDownloadByInvoiceOutput,
  }),
);
// Input Schema
export const QueryUsageInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/{scope}/providers/Microsoft.CostManagement/query",
  }),
);
export type QueryUsageInput = typeof QueryUsageInput.Type;

// Output Schema
export const QueryUsageOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  sku: Schema.optional(Schema.String),
  eTag: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type QueryUsageOutput = typeof QueryUsageOutput.Type;

// The operation
/**
 * Query the usage data for scope defined.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The scope associated with query and export operations. This includes '/subscriptions/{subscriptionId}/' for subscription scope, '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope and '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, '/providers/Microsoft.Management/managementGroups/{managementGroupId} for Management Group scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for billingProfile scope, '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/invoiceSections/{invoiceSectionId}' for invoiceSection scope, and '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/customers/{customerId}' specific for partners.
 */
export const QueryUsage = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueryUsageInput,
  outputSchema: QueryUsageOutput,
}));
// Input Schema
export const QueryUsageByExternalCloudProviderTypeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    externalCloudProviderType: Schema.Literals([
      "externalSubscriptions",
      "externalBillingAccounts",
    ]).pipe(T.PathParam()),
    externalCloudProviderId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.CostManagement/{externalCloudProviderType}/{externalCloudProviderId}/query",
    }),
  );
export type QueryUsageByExternalCloudProviderTypeInput =
  typeof QueryUsageByExternalCloudProviderTypeInput.Type;

// Output Schema
export const QueryUsageByExternalCloudProviderTypeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
    sku: Schema.optional(Schema.String),
    eTag: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type QueryUsageByExternalCloudProviderTypeOutput =
  typeof QueryUsageByExternalCloudProviderTypeOutput.Type;

// The operation
/**
 * Query the usage data for external cloud provider type defined.
 *
 * @param api-version - The API version to use for this operation.
 * @param externalCloudProviderType - The external cloud provider type associated with dimension/query operations. This includes 'externalSubscriptions' for linked account and 'externalBillingAccounts' for consolidated account.
 * @param externalCloudProviderId - This can be '{externalSubscriptionId}' for linked account or '{externalBillingAccountId}' for consolidated account used with dimension/query operations.
 */
export const QueryUsageByExternalCloudProviderType =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QueryUsageByExternalCloudProviderTypeInput,
    outputSchema: QueryUsageByExternalCloudProviderTypeOutput,
  }));
// Input Schema
export const ScheduledActionsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.CostManagement/checkNameAvailability",
    }),
  );
export type ScheduledActionsCheckNameAvailabilityInput =
  typeof ScheduledActionsCheckNameAvailabilityInput.Type;

// Output Schema
export const ScheduledActionsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type ScheduledActionsCheckNameAvailabilityOutput =
  typeof ScheduledActionsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks availability and correctness of the name for a scheduled action.
 *
 * @param api-version - The API version to use for this operation.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const ScheduledActionsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsCheckNameAvailabilityInput,
    outputSchema: ScheduledActionsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ScheduledActionsCheckNameAvailabilityByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{scope}/providers/Microsoft.CostManagement/checkNameAvailability",
    }),
  );
export type ScheduledActionsCheckNameAvailabilityByScopeInput =
  typeof ScheduledActionsCheckNameAvailabilityByScopeInput.Type;

// Output Schema
export const ScheduledActionsCheckNameAvailabilityByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type ScheduledActionsCheckNameAvailabilityByScopeOutput =
  typeof ScheduledActionsCheckNameAvailabilityByScopeOutput.Type;

// The operation
/**
 * Checks availability and correctness of the name for a scheduled action within the given scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The scope associated with scheduled action operations. This includes 'subscriptions/{subscriptionId}' for subscription scope, 'subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}' for resourceGroup scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}' for Billing Account scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/departments/{departmentId}' for Department scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/enrollmentAccounts/{enrollmentAccountId}' for EnrollmentAccount scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}' for BillingProfile scope, 'providers/Microsoft.Billing/billingAccounts/{billingAccountId}/invoiceSections/{invoiceSectionId}' for InvoiceSection scope, 'providers/Microsoft.CostManagement/externalBillingAccounts/{externalBillingAccountName}' for External Billing Account scope and 'providers/Microsoft.CostManagement/externalSubscriptions/{externalSubscriptionName}' for External Subscription scope. Note: Insight Alerts are only available on subscription scope.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const ScheduledActionsCheckNameAvailabilityByScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsCheckNameAvailabilityByScopeInput,
    outputSchema: ScheduledActionsCheckNameAvailabilityByScopeOutput,
  }));
// Input Schema
export const ScheduledActionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.CostManagement/scheduledActions/{name}",
    }),
  );
export type ScheduledActionsCreateOrUpdateInput =
  typeof ScheduledActionsCreateOrUpdateInput.Type;

// Output Schema
export const ScheduledActionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScheduledActionsCreateOrUpdateOutput =
  typeof ScheduledActionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a private scheduled action.
 *
 * @param api-version - The API version to use for this operation.
 * @param name - Scheduled action name.
 * @param If-Match - ETag of the Entity. Not required when creating an entity. Optional when updating an entity and can be specified to achieve optimistic concurrency.
 */
export const ScheduledActionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsCreateOrUpdateInput,
    outputSchema: ScheduledActionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ScheduledActionsCreateOrUpdateByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.CostManagement/scheduledActions/{name}",
    }),
  );
export type ScheduledActionsCreateOrUpdateByScopeInput =
  typeof ScheduledActionsCreateOrUpdateByScopeInput.Type;

// Output Schema
export const ScheduledActionsCreateOrUpdateByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScheduledActionsCreateOrUpdateByScopeOutput =
  typeof ScheduledActionsCreateOrUpdateByScopeOutput.Type;

// The operation
/**
 * Create or update a shared scheduled action within the given scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param name - Scheduled action name.
 * @param If-Match - ETag of the Entity. Not required when creating an entity. Optional when updating an entity and can be specified to achieve optimistic concurrency.
 */
export const ScheduledActionsCreateOrUpdateByScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsCreateOrUpdateByScopeInput,
    outputSchema: ScheduledActionsCreateOrUpdateByScopeOutput,
  }));
// Input Schema
export const ScheduledActionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.CostManagement/scheduledActions/{name}",
    }),
  );
export type ScheduledActionsDeleteInput =
  typeof ScheduledActionsDeleteInput.Type;

// Output Schema
export const ScheduledActionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScheduledActionsDeleteOutput =
  typeof ScheduledActionsDeleteOutput.Type;

// The operation
/**
 * Delete a private scheduled action.
 *
 * @param api-version - The API version to use for this operation.
 * @param name - Scheduled action name.
 */
export const ScheduledActionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScheduledActionsDeleteInput,
    outputSchema: ScheduledActionsDeleteOutput,
  }),
);
// Input Schema
export const ScheduledActionsDeleteByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.CostManagement/scheduledActions/{name}",
    }),
  );
export type ScheduledActionsDeleteByScopeInput =
  typeof ScheduledActionsDeleteByScopeInput.Type;

// Output Schema
export const ScheduledActionsDeleteByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScheduledActionsDeleteByScopeOutput =
  typeof ScheduledActionsDeleteByScopeOutput.Type;

// The operation
/**
 * Delete a scheduled action within the given scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param name - Scheduled action name.
 */
export const ScheduledActionsDeleteByScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ScheduledActionsDeleteByScopeInput,
    outputSchema: ScheduledActionsDeleteByScopeOutput,
  }));
// Input Schema
export const ScheduledActionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.CostManagement/scheduledActions/{name}",
    }),
  );
export type ScheduledActionsGetInput = typeof ScheduledActionsGetInput.Type;

// Output Schema
export const ScheduledActionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScheduledActionsGetOutput = typeof ScheduledActionsGetOutput.Type;

// The operation
/**
 * Get the private scheduled action by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param name - Scheduled action name.
 */
export const ScheduledActionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScheduledActionsGetInput,
  outputSchema: ScheduledActionsGetOutput,
}));
// Input Schema
export const ScheduledActionsGetByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.CostManagement/scheduledActions/{name}",
    }),
  );
export type ScheduledActionsGetByScopeInput =
  typeof ScheduledActionsGetByScopeInput.Type;

// Output Schema
export const ScheduledActionsGetByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ScheduledActionsGetByScopeOutput =
  typeof ScheduledActionsGetByScopeOutput.Type;

// The operation
/**
 * Get the shared scheduled action from the given scope by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param name - Scheduled action name.
 */
export const ScheduledActionsGetByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScheduledActionsGetByScopeInput,
    outputSchema: ScheduledActionsGetByScopeOutput,
  }),
);
// Input Schema
export const ScheduledActionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.CostManagement/scheduledActions",
    }),
  );
export type ScheduledActionsListInput = typeof ScheduledActionsListInput.Type;

// Output Schema
export const ScheduledActionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ScheduledActionsListOutput = typeof ScheduledActionsListOutput.Type;

// The operation
/**
 * List all private scheduled actions.
 *
 * @param api-version - The API version to use for this operation.
 * @param $filter - May be used to filter scheduled actions by properties/viewId. Supported operator is 'eq'.
 */
export const ScheduledActionsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScheduledActionsListInput,
    outputSchema: ScheduledActionsListOutput,
  }),
);
// Input Schema
export const ScheduledActionsListByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.CostManagement/scheduledActions",
    }),
  );
export type ScheduledActionsListByScopeInput =
  typeof ScheduledActionsListByScopeInput.Type;

// Output Schema
export const ScheduledActionsListByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ScheduledActionsListByScopeOutput =
  typeof ScheduledActionsListByScopeOutput.Type;

// The operation
/**
 * List all shared scheduled actions within the given scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param $filter - May be used to filter scheduled actions by properties/viewId. Supported operator is 'eq'.
 */
export const ScheduledActionsListByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScheduledActionsListByScopeInput,
    outputSchema: ScheduledActionsListByScopeOutput,
  }),
);
// Input Schema
export const ScheduledActionsRunInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.CostManagement/scheduledActions/{name}/execute",
    }),
  );
export type ScheduledActionsRunInput = typeof ScheduledActionsRunInput.Type;

// Output Schema
export const ScheduledActionsRunOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScheduledActionsRunOutput = typeof ScheduledActionsRunOutput.Type;

// The operation
/**
 * Processes a private scheduled action.
 *
 * @param api-version - The API version to use for this operation.
 * @param name - Scheduled action name.
 */
export const ScheduledActionsRun = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ScheduledActionsRunInput,
  outputSchema: ScheduledActionsRunOutput,
}));
// Input Schema
export const ScheduledActionsRunByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    name: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/{scope}/providers/Microsoft.CostManagement/scheduledActions/{name}/execute",
    }),
  );
export type ScheduledActionsRunByScopeInput =
  typeof ScheduledActionsRunByScopeInput.Type;

// Output Schema
export const ScheduledActionsRunByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ScheduledActionsRunByScopeOutput =
  typeof ScheduledActionsRunByScopeOutput.Type;

// The operation
/**
 * Runs a shared scheduled action within the given scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param name - Scheduled action name.
 */
export const ScheduledActionsRunByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ScheduledActionsRunByScopeInput,
    outputSchema: ScheduledActionsRunByScopeOutput,
  }),
);
// Input Schema
export const SettingsCreateOrUpdateByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    type: Schema.Literals(["taginheritance"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.CostManagement/settings/{type}",
    }),
  );
export type SettingsCreateOrUpdateByScopeInput =
  typeof SettingsCreateOrUpdateByScopeInput.Type;

// Output Schema
export const SettingsCreateOrUpdateByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SettingsCreateOrUpdateByScopeOutput =
  typeof SettingsCreateOrUpdateByScopeOutput.Type;

// The operation
/**
 * Create or update a setting within the given scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param type - Setting type.
 */
export const SettingsCreateOrUpdateByScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SettingsCreateOrUpdateByScopeInput,
    outputSchema: SettingsCreateOrUpdateByScopeOutput,
  }));
// Input Schema
export const SettingsDeleteByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    type: Schema.Literals(["taginheritance"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.CostManagement/settings/{type}",
    }),
  );
export type SettingsDeleteByScopeInput = typeof SettingsDeleteByScopeInput.Type;

// Output Schema
export const SettingsDeleteByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SettingsDeleteByScopeOutput =
  typeof SettingsDeleteByScopeOutput.Type;

// The operation
/**
 * Delete a setting within the given scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param type - Setting type.
 */
export const SettingsDeleteByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SettingsDeleteByScopeInput,
    outputSchema: SettingsDeleteByScopeOutput,
  }),
);
// Input Schema
export const SettingsGetByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    type: Schema.Literals(["taginheritance"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.CostManagement/settings/{type}",
    }),
  );
export type SettingsGetByScopeInput = typeof SettingsGetByScopeInput.Type;

// Output Schema
export const SettingsGetByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SettingsGetByScopeOutput = typeof SettingsGetByScopeOutput.Type;

// The operation
/**
 * Get the setting from the given scope by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param type - Setting type.
 */
export const SettingsGetByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SettingsGetByScopeInput,
  outputSchema: SettingsGetByScopeOutput,
}));
// Input Schema
export const SettingsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/settings",
  }),
);
export type SettingsListInput = typeof SettingsListInput.Type;

// Output Schema
export const SettingsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type SettingsListOutput = typeof SettingsListOutput.Type;

// The operation
/**
 * List all cost management settings in the requested scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 */
export const SettingsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SettingsListInput,
  outputSchema: SettingsListOutput,
}));
// Input Schema
export const ViewsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    viewName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.CostManagement/views/{viewName}",
    }),
  );
export type ViewsCreateOrUpdateInput = typeof ViewsCreateOrUpdateInput.Type;

// Output Schema
export const ViewsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ViewsCreateOrUpdateOutput = typeof ViewsCreateOrUpdateOutput.Type;

// The operation
/**
 * The operation to create or update a view. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @param api-version - The API version to use for this operation.
 * @param viewName - View name
 */
export const ViewsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsCreateOrUpdateInput,
  outputSchema: ViewsCreateOrUpdateOutput,
}));
// Input Schema
export const ViewsCreateOrUpdateByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    viewName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.CostManagement/views/{viewName}",
    }),
  );
export type ViewsCreateOrUpdateByScopeInput =
  typeof ViewsCreateOrUpdateByScopeInput.Type;

// Output Schema
export const ViewsCreateOrUpdateByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ViewsCreateOrUpdateByScopeOutput =
  typeof ViewsCreateOrUpdateByScopeOutput.Type;

// The operation
/**
 * The operation to create or update a view. Update operation requires latest eTag to be set in the request. You may obtain the latest eTag by performing a get operation. Create operation does not require eTag.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param viewName - View name
 */
export const ViewsCreateOrUpdateByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ViewsCreateOrUpdateByScopeInput,
    outputSchema: ViewsCreateOrUpdateByScopeOutput,
  }),
);
// Input Schema
export const ViewsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  viewName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/providers/Microsoft.CostManagement/views/{viewName}",
  }),
);
export type ViewsDeleteInput = typeof ViewsDeleteInput.Type;

// Output Schema
export const ViewsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ViewsDeleteOutput = typeof ViewsDeleteOutput.Type;

// The operation
/**
 * The operation to delete a view.
 *
 * @param api-version - The API version to use for this operation.
 * @param viewName - View name
 */
export const ViewsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsDeleteInput,
  outputSchema: ViewsDeleteOutput,
}));
// Input Schema
export const ViewsDeleteByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    viewName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/{scope}/providers/Microsoft.CostManagement/views/{viewName}",
    }),
  );
export type ViewsDeleteByScopeInput = typeof ViewsDeleteByScopeInput.Type;

// Output Schema
export const ViewsDeleteByScopeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ViewsDeleteByScopeOutput = typeof ViewsDeleteByScopeOutput.Type;

// The operation
/**
 * The operation to delete a view.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param viewName - View name
 */
export const ViewsDeleteByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsDeleteByScopeInput,
  outputSchema: ViewsDeleteByScopeOutput,
}));
// Input Schema
export const ViewsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  viewName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.CostManagement/views/{viewName}",
  }),
);
export type ViewsGetInput = typeof ViewsGetInput.Type;

// Output Schema
export const ViewsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ViewsGetOutput = typeof ViewsGetOutput.Type;

// The operation
/**
 * Gets the view by view name.
 *
 * @param api-version - The API version to use for this operation.
 * @param viewName - View name
 */
export const ViewsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsGetInput,
  outputSchema: ViewsGetOutput,
}));
// Input Schema
export const ViewsGetByScopeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  viewName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/views/{viewName}",
  }),
);
export type ViewsGetByScopeInput = typeof ViewsGetByScopeInput.Type;

// Output Schema
export const ViewsGetByScopeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ViewsGetByScopeOutput = typeof ViewsGetByScopeOutput.Type;

// The operation
/**
 * Gets the view for the defined scope by view name.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 * @param viewName - View name
 */
export const ViewsGetByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsGetByScopeInput,
  outputSchema: ViewsGetByScopeOutput,
}));
// Input Schema
export const ViewsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.CostManagement/views" }),
);
export type ViewsListInput = typeof ViewsListInput.Type;

// Output Schema
export const ViewsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type ViewsListOutput = typeof ViewsListOutput.Type;

// The operation
/**
 * Lists all views by tenant and object.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ViewsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsListInput,
  outputSchema: ViewsListOutput,
}));
// Input Schema
export const ViewsListByScopeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.CostManagement/views",
  }),
);
export type ViewsListByScopeInput = typeof ViewsListByScopeInput.Type;

// Output Schema
export const ViewsListByScopeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  },
);
export type ViewsListByScopeOutput = typeof ViewsListByScopeOutput.Type;

// The operation
/**
 * Lists all views at the given scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - undefined
 */
export const ViewsListByScope = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ViewsListByScopeInput,
  outputSchema: ViewsListByScopeOutput,
}));
