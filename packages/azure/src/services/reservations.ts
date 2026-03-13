/**
 * Azure Reservations API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const CalculateExchangePostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Capacity/calculateExchange",
    }),
  );
export type CalculateExchangePostInput = typeof CalculateExchangePostInput.Type;

// Output Schema
export const CalculateExchangePostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals(["Succeeded", "Failed", "Cancelled", "Pending"]),
    ),
    properties: Schema.optional(
      Schema.Struct({
        sessionId: Schema.optional(Schema.String),
        netPayable: Schema.optional(
          Schema.Struct({
            currencyCode: Schema.optional(Schema.String),
            amount: Schema.optional(Schema.Number),
          }),
        ),
        refundsTotal: Schema.optional(
          Schema.Struct({
            currencyCode: Schema.optional(Schema.String),
            amount: Schema.optional(Schema.Number),
          }),
        ),
        purchasesTotal: Schema.optional(
          Schema.Struct({
            currencyCode: Schema.optional(Schema.String),
            amount: Schema.optional(Schema.Number),
          }),
        ),
        reservationsToPurchase: Schema.optional(
          Schema.Array(
            Schema.Struct({
              properties: Schema.optional(
                Schema.Struct({
                  sku: Schema.optional(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                    }),
                  ),
                  location: Schema.optional(Schema.String),
                  properties: Schema.optional(
                    Schema.Struct({
                      reservedResourceType: Schema.optional(
                        Schema.Literals([
                          "VirtualMachines",
                          "SqlDatabases",
                          "SuseLinux",
                          "CosmosDb",
                          "RedHat",
                          "SqlDataWarehouse",
                          "VMwareCloudSimple",
                          "RedHatOsa",
                          "Databricks",
                          "AppService",
                          "ManagedDisk",
                          "BlockBlob",
                          "RedisCache",
                          "AzureDataExplorer",
                          "MySql",
                          "MariaDb",
                          "PostgreSql",
                          "DedicatedHost",
                          "SapHana",
                          "SqlAzureHybridBenefit",
                          "AVS",
                          "DataFactory",
                          "NetAppStorage",
                          "AzureFiles",
                          "SqlEdge",
                          "VirtualMachineSoftware",
                        ]),
                      ),
                      billingScopeId: Schema.optional(Schema.String),
                      term: Schema.optional(
                        Schema.Literals(["P1Y", "P3Y", "P5Y"]),
                      ),
                      billingPlan: Schema.optional(
                        Schema.Literals(["Upfront", "Monthly"]),
                      ),
                      quantity: Schema.optional(Schema.Number),
                      displayName: Schema.optional(Schema.String),
                      appliedScopeType: Schema.optional(
                        Schema.Literals([
                          "Single",
                          "Shared",
                          "ManagementGroup",
                        ]),
                      ),
                      appliedScopes: Schema.optional(
                        Schema.Array(Schema.String),
                      ),
                      appliedScopeProperties: Schema.optional(
                        Schema.Struct({
                          tenantId: Schema.optional(Schema.String),
                          managementGroupId: Schema.optional(Schema.String),
                          subscriptionId: Schema.optional(Schema.String),
                          resourceGroupId: Schema.optional(Schema.String),
                          displayName: Schema.optional(Schema.String),
                        }),
                      ),
                      renew: Schema.optional(Schema.Boolean),
                      reservedResourceProperties: Schema.optional(
                        Schema.Struct({
                          instanceFlexibility: Schema.optional(
                            Schema.Literals(["On", "Off"]),
                          ),
                        }),
                      ),
                      reviewDateTime: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
              billingCurrencyTotal: Schema.optional(
                Schema.Struct({
                  currencyCode: Schema.optional(Schema.String),
                  amount: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        ),
        savingsPlansToPurchase: Schema.optional(
          Schema.Array(
            Schema.Struct({
              properties: Schema.optional(
                Schema.Struct({
                  sku: Schema.optional(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                    }),
                  ),
                  properties: Schema.optional(
                    Schema.Struct({
                      displayName: Schema.optional(Schema.String),
                      billingScopeId: Schema.optional(Schema.String),
                      term: Schema.optional(Schema.Literals(["P1Y", "P3Y"])),
                      billingPlan: Schema.optional(Schema.Literals(["P1M"])),
                      appliedScopeType: Schema.optional(
                        Schema.Literals([
                          "Single",
                          "Shared",
                          "ManagementGroup",
                        ]),
                      ),
                      appliedScopeProperties: Schema.optional(
                        Schema.Struct({
                          tenantId: Schema.optional(Schema.String),
                          managementGroupId: Schema.optional(Schema.String),
                          subscriptionId: Schema.optional(Schema.String),
                          resourceGroupId: Schema.optional(Schema.String),
                          displayName: Schema.optional(Schema.String),
                        }),
                      ),
                      commitment: Schema.optional(
                        Schema.Struct({
                          currencyCode: Schema.optional(Schema.String),
                          amount: Schema.optional(Schema.Number),
                        }),
                      ),
                    }),
                  ),
                }),
              ),
              billingCurrencyTotal: Schema.optional(
                Schema.Struct({
                  currencyCode: Schema.optional(Schema.String),
                  amount: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        ),
        reservationsToExchange: Schema.optional(
          Schema.Array(
            Schema.Struct({
              reservationId: Schema.optional(Schema.String),
              quantity: Schema.optional(Schema.Number),
              billingRefundAmount: Schema.optional(
                Schema.Struct({
                  currencyCode: Schema.optional(Schema.String),
                  amount: Schema.optional(Schema.Number),
                }),
              ),
              billingInformation: Schema.optional(
                Schema.Struct({
                  billingCurrencyTotalPaidAmount: Schema.optional(
                    Schema.Struct({
                      currencyCode: Schema.optional(Schema.String),
                      amount: Schema.optional(Schema.Number),
                    }),
                  ),
                  billingCurrencyProratedAmount: Schema.optional(
                    Schema.Struct({
                      currencyCode: Schema.optional(Schema.String),
                      amount: Schema.optional(Schema.Number),
                    }),
                  ),
                  billingCurrencyRemainingCommitmentAmount: Schema.optional(
                    Schema.Struct({
                      currencyCode: Schema.optional(Schema.String),
                      amount: Schema.optional(Schema.Number),
                    }),
                  ),
                }),
              ),
            }),
          ),
        ),
        policyResult: Schema.optional(
          Schema.Struct({
            policyErrors: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  code: Schema.optional(Schema.String),
                  message: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
  });
export type CalculateExchangePostOutput =
  typeof CalculateExchangePostOutput.Type;

// The operation
/**
 * Calculates the refund amounts and price of the new purchases.
 *
 * Calculates price for exchanging `Reservations` if there are no policy errors.
 */
export const CalculateExchangePost = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CalculateExchangePostInput,
    outputSchema: CalculateExchangePostOutput,
  }),
);
// Input Schema
export const CalculateRefundPostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/calculateRefund",
    }),
  );
export type CalculateRefundPostInput = typeof CalculateRefundPostInput.Type;

// Output Schema
export const CalculateRefundPostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        sessionId: Schema.optional(Schema.String),
        quantity: Schema.optional(Schema.Number),
        billingRefundAmount: Schema.optional(
          Schema.Struct({
            currencyCode: Schema.optional(Schema.String),
            amount: Schema.optional(Schema.Number),
          }),
        ),
        pricingRefundAmount: Schema.optional(
          Schema.Struct({
            currencyCode: Schema.optional(Schema.String),
            amount: Schema.optional(Schema.Number),
          }),
        ),
        policyResult: Schema.optional(
          Schema.Struct({
            properties: Schema.optional(
              Schema.Struct({
                consumedRefundsTotal: Schema.optional(
                  Schema.Struct({
                    currencyCode: Schema.optional(Schema.String),
                    amount: Schema.optional(Schema.Number),
                  }),
                ),
                maxRefundLimit: Schema.optional(
                  Schema.Struct({
                    currencyCode: Schema.optional(Schema.String),
                    amount: Schema.optional(Schema.Number),
                  }),
                ),
                policyErrors: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      code: Schema.optional(
                        Schema.Literals([
                          "NotSpecified",
                          "InternalServerError",
                          "ServerTimeout",
                          "AuthorizationFailed",
                          "BadRequest",
                          "ClientCertificateThumbprintNotSet",
                          "InvalidRequestContent",
                          "OperationFailed",
                          "HttpMethodNotSupported",
                          "InvalidRequestUri",
                          "MissingTenantId",
                          "InvalidTenantId",
                          "InvalidReservationOrderId",
                          "InvalidReservationId",
                          "ReservationIdNotInReservationOrder",
                          "ReservationOrderNotFound",
                          "InvalidSubscriptionId",
                          "InvalidAccessToken",
                          "InvalidLocationId",
                          "UnauthenticatedRequestsThrottled",
                          "InvalidHealthCheckType",
                          "Forbidden",
                          "BillingScopeIdCannotBeChanged",
                          "AppliedScopesNotAssociatedWithCommerceAccount",
                          "PatchValuesSameAsExisting",
                          "RoleAssignmentCreationFailed",
                          "ReservationOrderCreationFailed",
                          "ReservationOrderNotEnabled",
                          "CapacityUpdateScopesFailed",
                          "UnsupportedReservationTerm",
                          "ReservationOrderIdAlreadyExists",
                          "RiskCheckFailed",
                          "CreateQuoteFailed",
                          "ActivateQuoteFailed",
                          "NonsupportedAccountId",
                          "PaymentInstrumentNotFound",
                          "MissingAppliedScopesForSingle",
                          "NoValidReservationsToReRate",
                          "ReRateOnlyAllowedForEA",
                          "OperationCannotBePerformedInCurrentState",
                          "InvalidSingleAppliedScopesCount",
                          "InvalidFulfillmentRequestParameters",
                          "NotSupportedCountry",
                          "InvalidRefundQuantity",
                          "PurchaseError",
                          "BillingCustomerInputError",
                          "BillingPaymentInstrumentSoftError",
                          "BillingPaymentInstrumentHardError",
                          "BillingTransientError",
                          "BillingError",
                          "FulfillmentConfigurationError",
                          "FulfillmentOutOfStockError",
                          "FulfillmentTransientError",
                          "FulfillmentError",
                          "CalculatePriceFailed",
                          "AppliedScopesSameAsExisting",
                          "SelfServiceRefundNotSupported",
                          "RefundLimitExceeded",
                        ]),
                      ),
                      message: Schema.optional(Schema.String),
                    }),
                  ),
                ),
              }),
            ),
          }),
        ),
        billingInformation: Schema.optional(
          Schema.Struct({
            billingPlan: Schema.optional(
              Schema.Literals(["Upfront", "Monthly"]),
            ),
            completedTransactions: Schema.optional(Schema.Number),
            totalTransactions: Schema.optional(Schema.Number),
            billingCurrencyTotalPaidAmount: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
            billingCurrencyProratedAmount: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
            billingCurrencyRemainingCommitmentAmount: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type CalculateRefundPostOutput = typeof CalculateRefundPostOutput.Type;

// The operation
/**
 * Calculate the refund amount of a reservation order.
 *
 * Calculate price for returning `Reservations` if there are no policy errors.
 */
export const CalculateRefundPost = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CalculateRefundPostInput,
  outputSchema: CalculateRefundPostOutput,
}));
// Input Schema
export const ExchangePostInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "POST", path: "/providers/Microsoft.Capacity/exchange" }),
);
export type ExchangePostInput = typeof ExchangePostInput.Type;

// Output Schema
export const ExchangePostOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  status: Schema.optional(
    Schema.Literals([
      "Succeeded",
      "Failed",
      "Cancelled",
      "PendingRefunds",
      "PendingPurchases",
    ]),
  ),
  properties: Schema.optional(
    Schema.Struct({
      sessionId: Schema.optional(Schema.String),
      netPayable: Schema.optional(
        Schema.Struct({
          currencyCode: Schema.optional(Schema.String),
          amount: Schema.optional(Schema.Number),
        }),
      ),
      refundsTotal: Schema.optional(
        Schema.Struct({
          currencyCode: Schema.optional(Schema.String),
          amount: Schema.optional(Schema.Number),
        }),
      ),
      purchasesTotal: Schema.optional(
        Schema.Struct({
          currencyCode: Schema.optional(Schema.String),
          amount: Schema.optional(Schema.Number),
        }),
      ),
      reservationsToPurchase: Schema.optional(
        Schema.Array(
          Schema.Struct({
            reservationOrderId: Schema.optional(Schema.String),
            reservationId: Schema.optional(Schema.String),
            properties: Schema.optional(
              Schema.Struct({
                sku: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                  }),
                ),
                location: Schema.optional(Schema.String),
                properties: Schema.optional(
                  Schema.Struct({
                    reservedResourceType: Schema.optional(
                      Schema.Literals([
                        "VirtualMachines",
                        "SqlDatabases",
                        "SuseLinux",
                        "CosmosDb",
                        "RedHat",
                        "SqlDataWarehouse",
                        "VMwareCloudSimple",
                        "RedHatOsa",
                        "Databricks",
                        "AppService",
                        "ManagedDisk",
                        "BlockBlob",
                        "RedisCache",
                        "AzureDataExplorer",
                        "MySql",
                        "MariaDb",
                        "PostgreSql",
                        "DedicatedHost",
                        "SapHana",
                        "SqlAzureHybridBenefit",
                        "AVS",
                        "DataFactory",
                        "NetAppStorage",
                        "AzureFiles",
                        "SqlEdge",
                        "VirtualMachineSoftware",
                      ]),
                    ),
                    billingScopeId: Schema.optional(Schema.String),
                    term: Schema.optional(
                      Schema.Literals(["P1Y", "P3Y", "P5Y"]),
                    ),
                    billingPlan: Schema.optional(
                      Schema.Literals(["Upfront", "Monthly"]),
                    ),
                    quantity: Schema.optional(Schema.Number),
                    displayName: Schema.optional(Schema.String),
                    appliedScopeType: Schema.optional(
                      Schema.Literals(["Single", "Shared", "ManagementGroup"]),
                    ),
                    appliedScopes: Schema.optional(Schema.Array(Schema.String)),
                    appliedScopeProperties: Schema.optional(
                      Schema.Struct({
                        tenantId: Schema.optional(Schema.String),
                        managementGroupId: Schema.optional(Schema.String),
                        subscriptionId: Schema.optional(Schema.String),
                        resourceGroupId: Schema.optional(Schema.String),
                        displayName: Schema.optional(Schema.String),
                      }),
                    ),
                    renew: Schema.optional(Schema.Boolean),
                    reservedResourceProperties: Schema.optional(
                      Schema.Struct({
                        instanceFlexibility: Schema.optional(
                          Schema.Literals(["On", "Off"]),
                        ),
                      }),
                    ),
                    reviewDateTime: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            billingCurrencyTotal: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
            status: Schema.optional(
              Schema.Literals(["Succeeded", "Failed", "Cancelled", "Pending"]),
            ),
          }),
        ),
      ),
      savingsPlansToPurchase: Schema.optional(
        Schema.Array(
          Schema.Struct({
            savingsPlanOrderId: Schema.optional(Schema.String),
            savingsPlanId: Schema.optional(Schema.String),
            properties: Schema.optional(
              Schema.Struct({
                sku: Schema.optional(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                  }),
                ),
                properties: Schema.optional(
                  Schema.Struct({
                    displayName: Schema.optional(Schema.String),
                    billingScopeId: Schema.optional(Schema.String),
                    term: Schema.optional(Schema.Literals(["P1Y", "P3Y"])),
                    billingPlan: Schema.optional(Schema.Literals(["P1M"])),
                    appliedScopeType: Schema.optional(
                      Schema.Literals(["Single", "Shared", "ManagementGroup"]),
                    ),
                    appliedScopeProperties: Schema.optional(
                      Schema.Struct({
                        tenantId: Schema.optional(Schema.String),
                        managementGroupId: Schema.optional(Schema.String),
                        subscriptionId: Schema.optional(Schema.String),
                        resourceGroupId: Schema.optional(Schema.String),
                        displayName: Schema.optional(Schema.String),
                      }),
                    ),
                    commitment: Schema.optional(
                      Schema.Struct({
                        currencyCode: Schema.optional(Schema.String),
                        amount: Schema.optional(Schema.Number),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            billingCurrencyTotal: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
            status: Schema.optional(
              Schema.Literals(["Succeeded", "Failed", "Cancelled", "Pending"]),
            ),
          }),
        ),
      ),
      reservationsToExchange: Schema.optional(
        Schema.Array(
          Schema.Struct({
            reservationId: Schema.optional(Schema.String),
            quantity: Schema.optional(Schema.Number),
            billingRefundAmount: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
            billingInformation: Schema.optional(
              Schema.Struct({
                billingCurrencyTotalPaidAmount: Schema.optional(
                  Schema.Struct({
                    currencyCode: Schema.optional(Schema.String),
                    amount: Schema.optional(Schema.Number),
                  }),
                ),
                billingCurrencyProratedAmount: Schema.optional(
                  Schema.Struct({
                    currencyCode: Schema.optional(Schema.String),
                    amount: Schema.optional(Schema.Number),
                  }),
                ),
                billingCurrencyRemainingCommitmentAmount: Schema.optional(
                  Schema.Struct({
                    currencyCode: Schema.optional(Schema.String),
                    amount: Schema.optional(Schema.Number),
                  }),
                ),
              }),
            ),
            status: Schema.optional(
              Schema.Literals(["Succeeded", "Failed", "Cancelled", "Pending"]),
            ),
          }),
        ),
      ),
      policyResult: Schema.optional(
        Schema.Struct({
          policyErrors: Schema.optional(
            Schema.Array(
              Schema.Struct({
                code: Schema.optional(Schema.String),
                message: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    }),
  ),
  error: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
      message: Schema.optional(Schema.String),
    }),
  ),
});
export type ExchangePostOutput = typeof ExchangePostOutput.Type;

// The operation
/**
 * Exchange Reservation(s)
 *
 * Returns one or more `Reservations` in exchange for one or more `Reservation` purchases.
 */
export const ExchangePost = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExchangePostInput,
  outputSchema: ExchangePostOutput,
}));
// Input Schema
export const GetAppliedReservationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/appliedReservations",
    }),
  );
export type GetAppliedReservationListInput =
  typeof GetAppliedReservationListInput.Type;

// Output Schema
export const GetAppliedReservationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        reservationOrderIds: Schema.optional(
          Schema.Struct({
            value: Schema.optional(Schema.Array(Schema.String)),
            nextLink: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  });
export type GetAppliedReservationListOutput =
  typeof GetAppliedReservationListOutput.Type;

// The operation
/**
 * Get list of applicable `Reservation`s.
 *
 * Get applicable `Reservation`s that are applied to this subscription or a resource group under this subscription.
 */
export const GetAppliedReservationList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetAppliedReservationListInput,
    outputSchema: GetAppliedReservationListOutput,
  }),
);
// Input Schema
export const GetCatalogInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  publisherId: Schema.optional(Schema.String),
  offerId: Schema.optional(Schema.String),
  planId: Schema.optional(Schema.String),
  $filter: Schema.optional(Schema.String),
  $skip: Schema.optional(Schema.Number),
  $take: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Capacity/catalogs",
  }),
);
export type GetCatalogInput = typeof GetCatalogInput.Type;

// Output Schema
export const GetCatalogOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        billingPlans: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Array(Schema.Literals(["Upfront", "Monthly"])),
          ),
        ),
        terms: Schema.optional(
          Schema.Array(Schema.Literals(["P1Y", "P3Y", "P5Y"])),
        ),
        locations: Schema.optional(Schema.Array(Schema.String)),
        skuProperties: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
        msrp: Schema.optional(
          Schema.Struct({
            p1Y: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
            p3Y: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
            p5Y: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
          }),
        ),
        restrictions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              values: Schema.optional(Schema.Array(Schema.String)),
              reasonCode: Schema.optional(Schema.String),
            }),
          ),
        ),
        tier: Schema.optional(Schema.String),
        size: Schema.optional(Schema.String),
        capabilities: Schema.optional(
          Schema.Array(
            Schema.Struct({
              name: Schema.optional(Schema.String),
              value: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
  totalItems: Schema.optional(Schema.Number),
});
export type GetCatalogOutput = typeof GetCatalogOutput.Type;

// The operation
/**
 * Get the regions and skus that are available for RI purchase for the specified Azure subscription.
 *
 * @param publisherId - Publisher id used to get the third party products
 * @param offerId - Offer id used to get the third party products
 * @param planId - Plan id used to get the third party products
 * @param $filter - May be used to filter by Catalog properties. The filter supports 'eq', 'or', and 'and'.
 * @param $skip - The number of reservations to skip from the list before returning results
 * @param $take - To number of reservations to return
 */
export const GetCatalog = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetCatalogInput,
  outputSchema: GetCatalogOutput,
}));
// Input Schema
export const OperationListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Capacity/operations" }),
);
export type OperationListInput = typeof OperationListInput.Type;

// Output Schema
export const OperationListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
        origin: Schema.optional(Schema.String),
        properties: Schema.optional(Schema.Unknown),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type OperationListOutput = typeof OperationListOutput.Type;

// The operation
/**
 * Get operations.
 *
 * List all the operations.
 */
export const OperationList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationListInput,
  outputSchema: OperationListOutput,
}));
// Input Schema
export const ReservationArchiveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}/archive",
    }),
  );
export type ReservationArchiveInput = typeof ReservationArchiveInput.Type;

// Output Schema
export const ReservationArchiveOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReservationArchiveOutput = typeof ReservationArchiveOutput.Type;

// The operation
/**
 * Archive a `Reservation`.
 *
 * Archiving a `Reservation` moves it to `Archived` state.
 */
export const ReservationArchive = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReservationArchiveInput,
  outputSchema: ReservationArchiveOutput,
}));
// Input Schema
export const ReservationAvailableScopesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}/availableScopes",
    }),
  );
export type ReservationAvailableScopesInput =
  typeof ReservationAvailableScopesInput.Type;

// Output Schema
export const ReservationAvailableScopesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        scopes: Schema.optional(
          Schema.Array(
            Schema.Struct({
              scope: Schema.optional(Schema.String),
              valid: Schema.optional(Schema.Boolean),
            }),
          ),
        ),
      }),
    ),
  });
export type ReservationAvailableScopesOutput =
  typeof ReservationAvailableScopesOutput.Type;

// The operation
/**
 * Get Available Scopes for `Reservation`.
 *
 * Check whether the scopes from request is valid for `Reservation`.
 */
export const ReservationAvailableScopes = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReservationAvailableScopesInput,
    outputSchema: ReservationAvailableScopesOutput,
  }),
);
// Input Schema
export const ReservationGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}",
  }),
);
export type ReservationGetInput = typeof ReservationGetInput.Type;

// Output Schema
export const ReservationGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ReservationGetOutput = typeof ReservationGetOutput.Type;

// The operation
/**
 * Get `Reservation` details.
 *
 * Get specific `Reservation` details.
 */
export const ReservationGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReservationGetInput,
  outputSchema: ReservationGetOutput,
}));
// Input Schema
export const ReservationListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations",
  }),
);
export type ReservationListInput = typeof ReservationListInput.Type;

// Output Schema
export const ReservationListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type ReservationListOutput = typeof ReservationListOutput.Type;

// The operation
/**
 * Get `Reservation`s in a given reservation Order
 *
 * List `Reservation`s within a single `ReservationOrder`.
 */
export const ReservationList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReservationListInput,
  outputSchema: ReservationListOutput,
}));
// Input Schema
export const ReservationListAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $filter: Schema.optional(Schema.String),
    $orderby: Schema.optional(Schema.String),
    refreshSummary: Schema.optional(Schema.String),
    $skiptoken: Schema.optional(Schema.Number),
    selectedState: Schema.optional(Schema.String),
    take: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Capacity/reservations",
    }),
  );
export type ReservationListAllInput = typeof ReservationListAllInput.Type;

// Output Schema
export const ReservationListAllOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
    summary: Schema.optional(
      Schema.Struct({
        succeededCount: Schema.optional(Schema.Number),
        failedCount: Schema.optional(Schema.Number),
        expiringCount: Schema.optional(Schema.Number),
        expiredCount: Schema.optional(Schema.Number),
        pendingCount: Schema.optional(Schema.Number),
        cancelledCount: Schema.optional(Schema.Number),
        processingCount: Schema.optional(Schema.Number),
        warningCount: Schema.optional(Schema.Number),
        noBenefitCount: Schema.optional(Schema.Number),
      }),
    ),
  });
export type ReservationListAllOutput = typeof ReservationListAllOutput.Type;

// The operation
/**
 * List the reservations and the roll up counts of reservations group by provisioning states that the user has access to in the current tenant.
 *
 * @param $filter - May be used to filter by reservation properties. The filter supports 'eq', 'or', and 'and'. It does not currently support 'ne', 'gt', 'le', 'ge', or 'not'. Reservation properties include sku/name, properties/{appliedScopeType, archived, displayName, displayProvisioningState, effectiveDateTime, expiryDate, expiryDateTime, provisioningState, quantity, renew, reservedResourceType, term, userFriendlyAppliedScopeType, userFriendlyRenewState}
 * @param $orderby - May be used to sort order by reservation properties.
 * @param refreshSummary - To indicate whether to refresh the roll up counts of the reservations group by provisioning states
 * @param $skiptoken - The number of reservations to skip from the list before returning results
 * @param selectedState - The selected provisioning state
 * @param take - To number of reservations to return
 */
export const ReservationListAll = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReservationListAllInput,
  outputSchema: ReservationListAllOutput,
}));
// Input Schema
export const ReservationListRevisionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}/revisions",
    }),
  );
export type ReservationListRevisionsInput =
  typeof ReservationListRevisionsInput.Type;

// Output Schema
export const ReservationListRevisionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ReservationListRevisionsOutput =
  typeof ReservationListRevisionsOutput.Type;

// The operation
/**
 * Get `Reservation` revisions.
 *
 * List of all the revisions for the `Reservation`.
 */
export const ReservationListRevisions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReservationListRevisionsInput,
    outputSchema: ReservationListRevisionsOutput,
  }),
);
// Input Schema
export const ReservationMergeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/merge",
  }),
);
export type ReservationMergeInput = typeof ReservationMergeInput.Type;

// Output Schema
export const ReservationMergeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({}),
);
export type ReservationMergeOutput = typeof ReservationMergeOutput.Type;

// The operation
/**
 * Merges two `Reservation`s.
 *
 * Merge the specified `Reservation`s into a new `Reservation`. The two `Reservation`s being merged must have same properties.
 */
export const ReservationMerge = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReservationMergeInput,
  outputSchema: ReservationMergeOutput,
}));
// Input Schema
export const ReservationOrderCalculateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Capacity/calculatePrice",
    }),
  );
export type ReservationOrderCalculateInput =
  typeof ReservationOrderCalculateInput.Type;

// Output Schema
export const ReservationOrderCalculateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        billingCurrencyTotal: Schema.optional(
          Schema.Struct({
            currencyCode: Schema.optional(Schema.String),
            amount: Schema.optional(Schema.Number),
          }),
        ),
        netTotal: Schema.optional(Schema.Number),
        taxTotal: Schema.optional(Schema.Number),
        grandTotal: Schema.optional(Schema.Number),
        isTaxIncluded: Schema.optional(Schema.Boolean),
        isBillingPartnerManaged: Schema.optional(Schema.Boolean),
        reservationOrderId: Schema.optional(Schema.String),
        skuTitle: Schema.optional(Schema.String),
        skuDescription: Schema.optional(Schema.String),
        pricingCurrencyTotal: Schema.optional(
          Schema.Struct({
            currencyCode: Schema.optional(Schema.String),
            amount: Schema.optional(Schema.Number),
          }),
        ),
        paymentSchedule: Schema.optional(
          Schema.Array(
            Schema.Struct({
              dueDate: Schema.optional(Schema.String),
              paymentDate: Schema.optional(Schema.String),
              pricingCurrencyTotal: Schema.optional(
                Schema.Struct({
                  currencyCode: Schema.optional(Schema.String),
                  amount: Schema.optional(Schema.Number),
                }),
              ),
              billingCurrencyTotal: Schema.optional(
                Schema.Struct({
                  currencyCode: Schema.optional(Schema.String),
                  amount: Schema.optional(Schema.Number),
                }),
              ),
              billingAccount: Schema.optional(Schema.String),
              status: Schema.optional(
                Schema.Literals([
                  "Succeeded",
                  "Failed",
                  "Scheduled",
                  "Cancelled",
                ]),
              ),
              extendedStatusInfo: Schema.optional(
                Schema.Struct({
                  statusCode: Schema.optional(
                    Schema.Literals([
                      "None",
                      "Pending",
                      "Processing",
                      "Active",
                      "PurchaseError",
                      "PaymentInstrumentError",
                      "Split",
                      "Merged",
                      "Expired",
                      "Succeeded",
                    ]),
                  ),
                  message: Schema.optional(Schema.String),
                }),
              ),
            }),
          ),
        ),
      }),
    ),
  });
export type ReservationOrderCalculateOutput =
  typeof ReservationOrderCalculateOutput.Type;

// The operation
/**
 * Calculate price for a `ReservationOrder`.
 *
 * Calculate price for placing a `ReservationOrder`.
 */
export const ReservationOrderCalculate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReservationOrderCalculateInput,
    outputSchema: ReservationOrderCalculateOutput,
  }),
);
// Input Schema
export const ReservationOrderChangeDirectoryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/changeDirectory",
    }),
  );
export type ReservationOrderChangeDirectoryInput =
  typeof ReservationOrderChangeDirectoryInput.Type;

// Output Schema
export const ReservationOrderChangeDirectoryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reservationOrder: Schema.optional(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        isSucceeded: Schema.optional(Schema.Boolean),
        error: Schema.optional(Schema.String),
      }),
    ),
    reservations: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          isSucceeded: Schema.optional(Schema.Boolean),
          error: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ReservationOrderChangeDirectoryOutput =
  typeof ReservationOrderChangeDirectoryOutput.Type;

// The operation
/**
 * Change directory of `ReservationOrder`.
 *
 * Change directory (tenant) of `ReservationOrder` and all `Reservation` under it to specified tenant id
 */
export const ReservationOrderChangeDirectory =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReservationOrderChangeDirectoryInput,
    outputSchema: ReservationOrderChangeDirectoryOutput,
  }));
// Input Schema
export const ReservationOrderGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}",
    }),
  );
export type ReservationOrderGetInput = typeof ReservationOrderGetInput.Type;

// Output Schema
export const ReservationOrderGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.Number),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        requestDateTime: Schema.optional(Schema.String),
        createdDateTime: Schema.optional(Schema.String),
        expiryDate: Schema.optional(Schema.String),
        expiryDateTime: Schema.optional(Schema.String),
        benefitStartTime: Schema.optional(Schema.String),
        originalQuantity: Schema.optional(Schema.Number),
        term: Schema.optional(Schema.Literals(["P1Y", "P3Y", "P5Y"])),
        provisioningState: Schema.optional(
          Schema.Literals([
            "Creating",
            "PendingResourceHold",
            "ConfirmedResourceHold",
            "PendingBilling",
            "ConfirmedBilling",
            "Created",
            "Succeeded",
            "Cancelled",
            "Expired",
            "BillingFailed",
            "Failed",
            "Split",
            "Merged",
          ]),
        ),
        billingPlan: Schema.optional(Schema.Literals(["Upfront", "Monthly"])),
        planInformation: Schema.optional(
          Schema.Struct({
            pricingCurrencyTotal: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
            startDate: Schema.optional(Schema.String),
            nextPaymentDueDate: Schema.optional(Schema.String),
            transactions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  dueDate: Schema.optional(Schema.String),
                  paymentDate: Schema.optional(Schema.String),
                  pricingCurrencyTotal: Schema.optional(
                    Schema.Struct({
                      currencyCode: Schema.optional(Schema.String),
                      amount: Schema.optional(Schema.Number),
                    }),
                  ),
                  billingCurrencyTotal: Schema.optional(
                    Schema.Struct({
                      currencyCode: Schema.optional(Schema.String),
                      amount: Schema.optional(Schema.Number),
                    }),
                  ),
                  billingAccount: Schema.optional(Schema.String),
                  status: Schema.optional(
                    Schema.Literals([
                      "Succeeded",
                      "Failed",
                      "Scheduled",
                      "Cancelled",
                    ]),
                  ),
                  extendedStatusInfo: Schema.optional(
                    Schema.Struct({
                      statusCode: Schema.optional(
                        Schema.Literals([
                          "None",
                          "Pending",
                          "Processing",
                          "Active",
                          "PurchaseError",
                          "PaymentInstrumentError",
                          "Split",
                          "Merged",
                          "Expired",
                          "Succeeded",
                        ]),
                      ),
                      message: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
        reservations: Schema.optional(Schema.Array(Schema.Struct({}))),
        reviewDateTime: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReservationOrderGetOutput = typeof ReservationOrderGetOutput.Type;

// The operation
/**
 * Get a specific `ReservationOrder`.
 *
 * Get the details of the `ReservationOrder`.
 *
 * @param $expand - May be used to expand the planInformation.
 */
export const ReservationOrderGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReservationOrderGetInput,
  outputSchema: ReservationOrderGetOutput,
}));
// Input Schema
export const ReservationOrderListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Capacity/reservationOrders",
    }),
  );
export type ReservationOrderListInput = typeof ReservationOrderListInput.Type;

// Output Schema
export const ReservationOrderListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          etag: Schema.optional(Schema.Number),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          properties: Schema.optional(
            Schema.Struct({
              displayName: Schema.optional(Schema.String),
              requestDateTime: Schema.optional(Schema.String),
              createdDateTime: Schema.optional(Schema.String),
              expiryDate: Schema.optional(Schema.String),
              expiryDateTime: Schema.optional(Schema.String),
              benefitStartTime: Schema.optional(Schema.String),
              originalQuantity: Schema.optional(Schema.Number),
              term: Schema.optional(Schema.Literals(["P1Y", "P3Y", "P5Y"])),
              provisioningState: Schema.optional(
                Schema.Literals([
                  "Creating",
                  "PendingResourceHold",
                  "ConfirmedResourceHold",
                  "PendingBilling",
                  "ConfirmedBilling",
                  "Created",
                  "Succeeded",
                  "Cancelled",
                  "Expired",
                  "BillingFailed",
                  "Failed",
                  "Split",
                  "Merged",
                ]),
              ),
              billingPlan: Schema.optional(
                Schema.Literals(["Upfront", "Monthly"]),
              ),
              planInformation: Schema.optional(
                Schema.Struct({
                  pricingCurrencyTotal: Schema.optional(
                    Schema.Struct({
                      currencyCode: Schema.optional(Schema.String),
                      amount: Schema.optional(Schema.Number),
                    }),
                  ),
                  startDate: Schema.optional(Schema.String),
                  nextPaymentDueDate: Schema.optional(Schema.String),
                  transactions: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        dueDate: Schema.optional(Schema.String),
                        paymentDate: Schema.optional(Schema.String),
                        pricingCurrencyTotal: Schema.optional(
                          Schema.Struct({
                            currencyCode: Schema.optional(Schema.String),
                            amount: Schema.optional(Schema.Number),
                          }),
                        ),
                        billingCurrencyTotal: Schema.optional(
                          Schema.Struct({
                            currencyCode: Schema.optional(Schema.String),
                            amount: Schema.optional(Schema.Number),
                          }),
                        ),
                        billingAccount: Schema.optional(Schema.String),
                        status: Schema.optional(
                          Schema.Literals([
                            "Succeeded",
                            "Failed",
                            "Scheduled",
                            "Cancelled",
                          ]),
                        ),
                        extendedStatusInfo: Schema.optional(
                          Schema.Struct({
                            statusCode: Schema.optional(
                              Schema.Literals([
                                "None",
                                "Pending",
                                "Processing",
                                "Active",
                                "PurchaseError",
                                "PaymentInstrumentError",
                                "Split",
                                "Merged",
                                "Expired",
                                "Succeeded",
                              ]),
                            ),
                            message: Schema.optional(Schema.String),
                          }),
                        ),
                      }),
                    ),
                  ),
                }),
              ),
              reservations: Schema.optional(Schema.Array(Schema.Struct({}))),
              reviewDateTime: Schema.optional(Schema.String),
            }),
          ),
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
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ReservationOrderListOutput = typeof ReservationOrderListOutput.Type;

// The operation
/**
 * Get all `ReservationOrder`s.
 *
 * List of all the `ReservationOrder`s that the user has access to in the current tenant.
 */
export const ReservationOrderList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReservationOrderListInput,
    outputSchema: ReservationOrderListOutput,
  }),
);
// Input Schema
export const ReservationOrderPurchaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}",
    }),
  );
export type ReservationOrderPurchaseInput =
  typeof ReservationOrderPurchaseInput.Type;

// Output Schema
export const ReservationOrderPurchaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.Number),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        displayName: Schema.optional(Schema.String),
        requestDateTime: Schema.optional(Schema.String),
        createdDateTime: Schema.optional(Schema.String),
        expiryDate: Schema.optional(Schema.String),
        expiryDateTime: Schema.optional(Schema.String),
        benefitStartTime: Schema.optional(Schema.String),
        originalQuantity: Schema.optional(Schema.Number),
        term: Schema.optional(Schema.Literals(["P1Y", "P3Y", "P5Y"])),
        provisioningState: Schema.optional(
          Schema.Literals([
            "Creating",
            "PendingResourceHold",
            "ConfirmedResourceHold",
            "PendingBilling",
            "ConfirmedBilling",
            "Created",
            "Succeeded",
            "Cancelled",
            "Expired",
            "BillingFailed",
            "Failed",
            "Split",
            "Merged",
          ]),
        ),
        billingPlan: Schema.optional(Schema.Literals(["Upfront", "Monthly"])),
        planInformation: Schema.optional(
          Schema.Struct({
            pricingCurrencyTotal: Schema.optional(
              Schema.Struct({
                currencyCode: Schema.optional(Schema.String),
                amount: Schema.optional(Schema.Number),
              }),
            ),
            startDate: Schema.optional(Schema.String),
            nextPaymentDueDate: Schema.optional(Schema.String),
            transactions: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  dueDate: Schema.optional(Schema.String),
                  paymentDate: Schema.optional(Schema.String),
                  pricingCurrencyTotal: Schema.optional(
                    Schema.Struct({
                      currencyCode: Schema.optional(Schema.String),
                      amount: Schema.optional(Schema.Number),
                    }),
                  ),
                  billingCurrencyTotal: Schema.optional(
                    Schema.Struct({
                      currencyCode: Schema.optional(Schema.String),
                      amount: Schema.optional(Schema.Number),
                    }),
                  ),
                  billingAccount: Schema.optional(Schema.String),
                  status: Schema.optional(
                    Schema.Literals([
                      "Succeeded",
                      "Failed",
                      "Scheduled",
                      "Cancelled",
                    ]),
                  ),
                  extendedStatusInfo: Schema.optional(
                    Schema.Struct({
                      statusCode: Schema.optional(
                        Schema.Literals([
                          "None",
                          "Pending",
                          "Processing",
                          "Active",
                          "PurchaseError",
                          "PaymentInstrumentError",
                          "Split",
                          "Merged",
                          "Expired",
                          "Succeeded",
                        ]),
                      ),
                      message: Schema.optional(Schema.String),
                    }),
                  ),
                }),
              ),
            ),
          }),
        ),
        reservations: Schema.optional(Schema.Array(Schema.Struct({}))),
        reviewDateTime: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type ReservationOrderPurchaseOutput =
  typeof ReservationOrderPurchaseOutput.Type;

// The operation
/**
 * Purchase `ReservationOrder`
 *
 * Purchase `ReservationOrder` and create resource under the specified URI.
 */
export const ReservationOrderPurchase = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReservationOrderPurchaseInput,
    outputSchema: ReservationOrderPurchaseOutput,
  }),
);
// Input Schema
export const ReservationSplitInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/split",
  }),
);
export type ReservationSplitInput = typeof ReservationSplitInput.Type;

// Output Schema
export const ReservationSplitOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({}),
);
export type ReservationSplitOutput = typeof ReservationSplitOutput.Type;

// The operation
/**
 * Split the `Reservation`.
 *
 * Split a `Reservation` into two `Reservation`s with specified quantity distribution.
 */
export const ReservationSplit = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReservationSplitInput,
  outputSchema: ReservationSplitOutput,
}));
// Input Schema
export const ReservationUnarchiveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}/unarchive",
    }),
  );
export type ReservationUnarchiveInput = typeof ReservationUnarchiveInput.Type;

// Output Schema
export const ReservationUnarchiveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReservationUnarchiveOutput = typeof ReservationUnarchiveOutput.Type;

// The operation
/**
 * Unarchive a `Reservation`.
 *
 * Restores a `Reservation` to the state it was before archiving.
 */
export const ReservationUnarchive = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReservationUnarchiveInput,
    outputSchema: ReservationUnarchiveOutput,
  }),
);
// Input Schema
export const ReservationUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}",
  }),
);
export type ReservationUpdateInput = typeof ReservationUpdateInput.Type;

// Output Schema
export const ReservationUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReservationUpdateOutput = typeof ReservationUpdateOutput.Type;

// The operation
/**
 * Updates a `Reservation`.
 *
 * Updates the applied scopes of the `Reservation`.
 */
export const ReservationUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReservationUpdateInput,
  outputSchema: ReservationUpdateOutput,
}));
// Input Schema
export const ReturnPostInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/return",
  }),
);
export type ReturnPostInput = typeof ReturnPostInput.Type;

// Output Schema
export const ReturnPostOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  properties: Schema.optional(
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      requestDateTime: Schema.optional(Schema.String),
      createdDateTime: Schema.optional(Schema.String),
      expiryDate: Schema.optional(Schema.String),
      expiryDateTime: Schema.optional(Schema.String),
      benefitStartTime: Schema.optional(Schema.String),
      originalQuantity: Schema.optional(Schema.Number),
      term: Schema.optional(Schema.Literals(["P1Y", "P3Y", "P5Y"])),
      provisioningState: Schema.optional(
        Schema.Literals([
          "Creating",
          "PendingResourceHold",
          "ConfirmedResourceHold",
          "PendingBilling",
          "ConfirmedBilling",
          "Created",
          "Succeeded",
          "Cancelled",
          "Expired",
          "BillingFailed",
          "Failed",
          "Split",
          "Merged",
        ]),
      ),
      billingPlan: Schema.optional(Schema.Literals(["Upfront", "Monthly"])),
      planInformation: Schema.optional(
        Schema.Struct({
          pricingCurrencyTotal: Schema.optional(
            Schema.Struct({
              currencyCode: Schema.optional(Schema.String),
              amount: Schema.optional(Schema.Number),
            }),
          ),
          startDate: Schema.optional(Schema.String),
          nextPaymentDueDate: Schema.optional(Schema.String),
          transactions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                dueDate: Schema.optional(Schema.String),
                paymentDate: Schema.optional(Schema.String),
                pricingCurrencyTotal: Schema.optional(
                  Schema.Struct({
                    currencyCode: Schema.optional(Schema.String),
                    amount: Schema.optional(Schema.Number),
                  }),
                ),
                billingCurrencyTotal: Schema.optional(
                  Schema.Struct({
                    currencyCode: Schema.optional(Schema.String),
                    amount: Schema.optional(Schema.Number),
                  }),
                ),
                billingAccount: Schema.optional(Schema.String),
                status: Schema.optional(
                  Schema.Literals([
                    "Succeeded",
                    "Failed",
                    "Scheduled",
                    "Cancelled",
                  ]),
                ),
                extendedStatusInfo: Schema.optional(
                  Schema.Struct({
                    statusCode: Schema.optional(
                      Schema.Literals([
                        "None",
                        "Pending",
                        "Processing",
                        "Active",
                        "PurchaseError",
                        "PaymentInstrumentError",
                        "Split",
                        "Merged",
                        "Expired",
                        "Succeeded",
                      ]),
                    ),
                    message: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          ),
        }),
      ),
      reservations: Schema.optional(Schema.Array(Schema.Struct({}))),
      reviewDateTime: Schema.optional(Schema.String),
    }),
  ),
  type: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      createdAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
    }),
  ),
});
export type ReturnPostOutput = typeof ReturnPostOutput.Type;

// The operation
/**
 * Return a reservation.
 *
 * Return a reservation and get refund information.
 */
export const ReturnPost = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReturnPostInput,
  outputSchema: ReturnPostOutput,
}));
