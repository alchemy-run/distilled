/**
 * Azure Consumption API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BudgetsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    budgetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/{scope}/providers/Microsoft.Consumption/budgets/{budgetName}",
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
    path: "/{scope}/providers/Microsoft.Consumption/budgets/{budgetName}",
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
    path: "/{scope}/providers/Microsoft.Consumption/budgets/{budgetName}",
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
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.Consumption/budgets",
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
 */
export const BudgetsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BudgetsListInput,
  outputSchema: BudgetsListOutput,
}));
// Input Schema
export const ChargesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  startDate: Schema.optional(Schema.String),
  endDate: Schema.optional(Schema.String),
  $filter: Schema.optional(Schema.String),
  $apply: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.Consumption/charges",
  }),
);
export type ChargesListInput = typeof ChargesListInput.Type;

// Output Schema
export const ChargesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type ChargesListOutput = typeof ChargesListOutput.Type;

// The operation
/**
 * Lists the charges based for the defined scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 * @param startDate - Start date
 * @param endDate - End date
 * @param $filter - May be used to filter charges by properties/usageEnd (Utc time), properties/usageStart (Utc time). The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. It does not currently support 'ne', 'or', or 'not'. Tag filter is a key value pair string where key and value is separated by a colon (:).
 * @param $apply - May be used to group charges for billingAccount scope by properties/billingProfileId, properties/invoiceSectionId, properties/customerId (specific for Partner Led), or for billingProfile scope by properties/invoiceSectionId.
 */
export const ChargesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChargesListInput,
  outputSchema: ChargesListOutput,
}));
// Input Schema
export const CreditsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  billingAccountId: Schema.String.pipe(T.PathParam()),
  billingProfileId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.Consumption/credits/balanceSummary",
  }),
);
export type CreditsGetInput = typeof CreditsGetInput.Type;

// Output Schema
export const CreditsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CreditsGetOutput = typeof CreditsGetOutput.Type;

// The operation
/**
 * The credit summary by billingAccountId and billingProfileId.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param billingProfileId - Azure Billing Profile ID.
 */
export const CreditsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreditsGetInput,
  outputSchema: CreditsGetOutput,
}));
// Input Schema
export const EventsListByBillingAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Consumption/events",
    }),
  );
export type EventsListByBillingAccountInput =
  typeof EventsListByBillingAccountInput.Type;

// Output Schema
export const EventsListByBillingAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type EventsListByBillingAccountOutput =
  typeof EventsListByBillingAccountOutput.Type;

// The operation
/**
 * Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param $filter - May be used to filter the events by lotId, lotSource etc. The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. It does not currently support 'ne', 'or', or 'not'. Tag filter is a key value pair string where key and value is separated by a colon (:).
 */
export const EventsListByBillingAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventsListByBillingAccountInput,
    outputSchema: EventsListByBillingAccountOutput,
  }),
);
// Input Schema
export const EventsListByBillingProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    billingProfileId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    startDate: Schema.String,
    endDate: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.Consumption/events",
    }),
  );
export type EventsListByBillingProfileInput =
  typeof EventsListByBillingProfileInput.Type;

// Output Schema
export const EventsListByBillingProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type EventsListByBillingProfileOutput =
  typeof EventsListByBillingProfileOutput.Type;

// The operation
/**
 * Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param billingProfileId - Azure Billing Profile ID.
 * @param startDate - Start date
 * @param endDate - End date
 */
export const EventsListByBillingProfile = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EventsListByBillingProfileInput,
    outputSchema: EventsListByBillingProfileOutput,
  }),
);
// Input Schema
export const LotsListByBillingAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Consumption/lots",
    }),
  );
export type LotsListByBillingAccountInput =
  typeof LotsListByBillingAccountInput.Type;

// Output Schema
export const LotsListByBillingAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LotsListByBillingAccountOutput =
  typeof LotsListByBillingAccountOutput.Type;

// The operation
/**
 * Lists all Microsoft Azure consumption commitments for a billing account. The API is only supported for Microsoft Customer Agreements (MCA) and Direct Enterprise Agreement (EA)  billing accounts.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param $filter - May be used to filter the lots by Status, Source etc. The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. It does not currently support 'ne', 'or', or 'not'. Tag filter is a key value pair string where key and value is separated by a colon (:).
 */
export const LotsListByBillingAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LotsListByBillingAccountInput,
    outputSchema: LotsListByBillingAccountOutput,
  }),
);
// Input Schema
export const LotsListByBillingProfileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    billingProfileId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.Consumption/lots",
    }),
  );
export type LotsListByBillingProfileInput =
  typeof LotsListByBillingProfileInput.Type;

// Output Schema
export const LotsListByBillingProfileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LotsListByBillingProfileOutput =
  typeof LotsListByBillingProfileOutput.Type;

// The operation
/**
 * Lists all Azure credits for a billing account or a billing profile. The API is only supported for Microsoft Customer Agreements (MCA) billing accounts.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param billingProfileId - Azure Billing Profile ID.
 */
export const LotsListByBillingProfile = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LotsListByBillingProfileInput,
    outputSchema: LotsListByBillingProfileOutput,
  }),
);
// Input Schema
export const LotsListByCustomerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    customerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/customers/{customerId}/providers/Microsoft.Consumption/lots",
    }),
  );
export type LotsListByCustomerInput = typeof LotsListByCustomerInput.Type;

// Output Schema
export const LotsListByCustomerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LotsListByCustomerOutput = typeof LotsListByCustomerOutput.Type;

// The operation
/**
 * Lists all Azure credits for a customer. The API is only supported for Microsoft Partner  Agreements (MPA) billing accounts.
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param customerId - Customer ID
 * @param $filter - May be used to filter the lots by Status, Source etc. The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. Tag filter is a key value pair string where key and value is separated by a colon (:).
 */
export const LotsListByCustomer = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LotsListByCustomerInput,
  outputSchema: LotsListByCustomerOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Consumption/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        display: Schema.optional(
          Schema.Struct({
            provider: Schema.optional(Schema.String),
            resource: Schema.optional(Schema.String),
            operation: Schema.optional(Schema.String),
            description: Schema.optional(Schema.String),
          }),
        ),
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
export const PriceSheetDownloadByBillingAccountPeriodInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccountId: Schema.String.pipe(T.PathParam()),
    billingPeriodName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingPeriods/{billingPeriodName}/providers/Microsoft.Consumption/pricesheets/download",
    }),
  );
export type PriceSheetDownloadByBillingAccountPeriodInput =
  typeof PriceSheetDownloadByBillingAccountPeriodInput.Type;

// Output Schema
export const PriceSheetDownloadByBillingAccountPeriodOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(
      Schema.Literals(["Running", "Completed", "Failed"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        downloadUrl: Schema.optional(Schema.String),
        validTill: Schema.optional(Schema.String),
      }),
    ),
  });
export type PriceSheetDownloadByBillingAccountPeriodOutput =
  typeof PriceSheetDownloadByBillingAccountPeriodOutput.Type;

// The operation
/**
 * Generates the pricesheet for the provided billing period asynchronously based on the enrollment id
 *
 * @param api-version - The API version to use for this operation.
 * @param billingAccountId - BillingAccount ID
 * @param billingPeriodName - Billing Period Name.
 */
export const PriceSheetDownloadByBillingAccountPeriod =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PriceSheetDownloadByBillingAccountPeriodInput,
    outputSchema: PriceSheetDownloadByBillingAccountPeriodOutput,
  }));
// Input Schema
export const PriceSheetGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
  $skiptoken: Schema.optional(Schema.String),
  $top: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Consumption/pricesheets/default",
  }),
);
export type PriceSheetGetInput = typeof PriceSheetGetInput.Type;

// Output Schema
export const PriceSheetGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type PriceSheetGetOutput = typeof PriceSheetGetOutput.Type;

// The operation
/**
 * Gets the price sheet for a subscription. Price sheet is available via this API only for May 1, 2014 or later.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param $expand - May be used to expand the properties/meterDetails within a price sheet. By default, these fields are not included when returning price sheet.
 * @param $skiptoken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the top N results.
 */
export const PriceSheetGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PriceSheetGetInput,
  outputSchema: PriceSheetGetOutput,
}));
// Input Schema
export const PriceSheetGetByBillingPeriodInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    billingPeriodName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
    $skiptoken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}/providers/Microsoft.Consumption/pricesheets/default",
    }),
  );
export type PriceSheetGetByBillingPeriodInput =
  typeof PriceSheetGetByBillingPeriodInput.Type;

// Output Schema
export const PriceSheetGetByBillingPeriodOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PriceSheetGetByBillingPeriodOutput =
  typeof PriceSheetGetByBillingPeriodOutput.Type;

// The operation
/**
 * Get the price sheet for a scope by subscriptionId and billing period. Price sheet is available via this API only for May 1, 2014 or later.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param billingPeriodName - Billing Period Name.
 * @param $expand - May be used to expand the properties/meterDetails within a price sheet. By default, these fields are not included when returning price sheet.
 * @param $skiptoken - Skiptoken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skiptoken parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the top N results.
 */
export const PriceSheetGetByBillingPeriod =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PriceSheetGetByBillingPeriodInput,
    outputSchema: PriceSheetGetByBillingPeriodOutput,
  }));
// Input Schema
export const ReservationRecommendationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceScope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceScope}/providers/Microsoft.Consumption/reservationRecommendations",
    }),
  );
export type ReservationRecommendationsListInput =
  typeof ReservationRecommendationsListInput.Type;

// Output Schema
export const ReservationRecommendationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          systemData: Schema.optional(
            Schema.Struct({
              createdBy: Schema.optional(Schema.String),
              createdByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              createdAt: Schema.optional(Schema.String),
              lastModifiedBy: Schema.optional(Schema.String),
              lastModifiedByType: Schema.optional(
                Schema.Literals([
                  "User",
                  "Application",
                  "ManagedIdentity",
                  "Key",
                ]),
              ),
              lastModifiedAt: Schema.optional(Schema.String),
            }),
          ),
          location: Schema.optional(Schema.String),
          sku: Schema.optional(Schema.String),
          etag: Schema.optional(Schema.String),
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          kind: Schema.Literals(["legacy", "modern"]),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
    previousLink: Schema.optional(Schema.String),
  });
export type ReservationRecommendationsListOutput =
  typeof ReservationRecommendationsListOutput.Type;

// The operation
/**
 * List of recommendations for purchasing reserved instances.
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceScope - The fully qualified Azure Resource manager identifier of the resource.
 * @param $filter - May be used to filter reservationRecommendations by: properties/scope with allowed values ['Single', 'Shared'] and default value 'Single'; properties/resourceType with allowed values ['VirtualMachines', 'SQLDatabases', 'PostgreSQL', 'ManagedDisk', 'MySQL', 'RedHat', 'MariaDB', 'RedisCache', 'CosmosDB', 'SqlDataWarehouse', 'SUSELinux', 'AppService', 'BlockBlob', 'AzureDataExplorer', 'VMwareCloudSimple'] and default value 'VirtualMachines'; and properties/lookBackPeriod with allowed values ['Last7Days', 'Last30Days', 'Last60Days'] and default value 'Last7Days'.
 */
export const ReservationRecommendationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReservationRecommendationsListInput,
    outputSchema: ReservationRecommendationsListOutput,
  }));
// Input Schema
export const TagsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  scope: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/{scope}/providers/Microsoft.Consumption/tags",
  }),
);
export type TagsGetInput = typeof TagsGetInput.Type;

// Output Schema
export const TagsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TagsGetOutput = typeof TagsGetOutput.Type;

// The operation
/**
 * Get all available tag keys for the defined scope
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 */
export const TagsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TagsGetInput,
  outputSchema: TagsGetOutput,
}));
