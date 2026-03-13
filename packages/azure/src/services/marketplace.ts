/**
 * Azure Marketplace API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Marketplace/operations",
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
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all of the available Microsoft.Marketplace REST API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateStoreAcknowledgeOfferNotificationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    offerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/offers/{offerId}/acknowledgeNotification",
    }),
  );
export type PrivateStoreAcknowledgeOfferNotificationInput =
  typeof PrivateStoreAcknowledgeOfferNotificationInput.Type;

// Output Schema
export const PrivateStoreAcknowledgeOfferNotificationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateStoreAcknowledgeOfferNotificationOutput =
  typeof PrivateStoreAcknowledgeOfferNotificationOutput.Type;

// The operation
/**
 * Acknowledge notification for offer
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param offerId - The offer ID to update or delete
 */
export const PrivateStoreAcknowledgeOfferNotification =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreAcknowledgeOfferNotificationInput,
    outputSchema: PrivateStoreAcknowledgeOfferNotificationOutput,
  }));
// Input Schema
export const PrivateStoreAdminRequestApprovalsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/adminRequestApprovals",
    }),
  );
export type PrivateStoreAdminRequestApprovalsListInput =
  typeof PrivateStoreAdminRequestApprovalsListInput.Type;

// Output Schema
export const PrivateStoreAdminRequestApprovalsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateStoreAdminRequestApprovalsListOutput =
  typeof PrivateStoreAdminRequestApprovalsListOutput.Type;

// The operation
/**
 * Get list of admin request approvals
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreAdminRequestApprovalsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreAdminRequestApprovalsListInput,
    outputSchema: PrivateStoreAdminRequestApprovalsListOutput,
  }));
// Input Schema
export const PrivateStoreAnyExistingOffersInTheCollectionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/anyExistingOffersInTheCollections",
    }),
  );
export type PrivateStoreAnyExistingOffersInTheCollectionsInput =
  typeof PrivateStoreAnyExistingOffersInTheCollectionsInput.Type;

// Output Schema
export const PrivateStoreAnyExistingOffersInTheCollectionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Boolean),
  });
export type PrivateStoreAnyExistingOffersInTheCollectionsOutput =
  typeof PrivateStoreAnyExistingOffersInTheCollectionsOutput.Type;

// The operation
/**
 * Query whether exists any offer in the collections.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreAnyExistingOffersInTheCollections =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreAnyExistingOffersInTheCollectionsInput,
    outputSchema: PrivateStoreAnyExistingOffersInTheCollectionsOutput,
  }));
// Input Schema
export const PrivateStoreBillingAccountsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/billingAccounts",
    }),
  );
export type PrivateStoreBillingAccountsInput =
  typeof PrivateStoreBillingAccountsInput.Type;

// Output Schema
export const PrivateStoreBillingAccountsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    billingAccounts: Schema.optional(Schema.Array(Schema.String)),
  });
export type PrivateStoreBillingAccountsOutput =
  typeof PrivateStoreBillingAccountsOutput.Type;

// The operation
/**
 * Tenant billing accounts names
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreBillingAccounts = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateStoreBillingAccountsInput,
    outputSchema: PrivateStoreBillingAccountsOutput,
  }),
);
// Input Schema
export const PrivateStoreBulkCollectionsActionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/bulkCollectionsAction",
    }),
  );
export type PrivateStoreBulkCollectionsActionInput =
  typeof PrivateStoreBulkCollectionsActionInput.Type;

// Output Schema
export const PrivateStoreBulkCollectionsActionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    succeeded: Schema.optional(
      Schema.Array(
        Schema.Struct({
          collectionName: Schema.optional(Schema.String),
          collectionId: Schema.optional(Schema.String),
        }),
      ),
    ),
    failed: Schema.optional(
      Schema.Array(
        Schema.Struct({
          collectionName: Schema.optional(Schema.String),
          collectionId: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PrivateStoreBulkCollectionsActionOutput =
  typeof PrivateStoreBulkCollectionsActionOutput.Type;

// The operation
/**
 * Perform an action on bulk collections
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreBulkCollectionsAction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreBulkCollectionsActionInput,
    outputSchema: PrivateStoreBulkCollectionsActionOutput,
  }));
// Input Schema
export const PrivateStoreCollectionApproveAllItemsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/approveAllItems",
    }),
  );
export type PrivateStoreCollectionApproveAllItemsInput =
  typeof PrivateStoreCollectionApproveAllItemsInput.Type;

// Output Schema
export const PrivateStoreCollectionApproveAllItemsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreCollectionApproveAllItemsOutput =
  typeof PrivateStoreCollectionApproveAllItemsOutput.Type;

// The operation
/**
 * Delete all existing offers from the collection and enable approve all items.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const PrivateStoreCollectionApproveAllItems =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionApproveAllItemsInput,
    outputSchema: PrivateStoreCollectionApproveAllItemsOutput,
  }));
// Input Schema
export const PrivateStoreCollectionCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}",
    }),
  );
export type PrivateStoreCollectionCreateOrUpdateInput =
  typeof PrivateStoreCollectionCreateOrUpdateInput.Type;

// Output Schema
export const PrivateStoreCollectionCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreCollectionCreateOrUpdateOutput =
  typeof PrivateStoreCollectionCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update private store collection
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const PrivateStoreCollectionCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionCreateOrUpdateInput,
    outputSchema: PrivateStoreCollectionCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateStoreCollectionDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}",
    }),
  );
export type PrivateStoreCollectionDeleteInput =
  typeof PrivateStoreCollectionDeleteInput.Type;

// Output Schema
export const PrivateStoreCollectionDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateStoreCollectionDeleteOutput =
  typeof PrivateStoreCollectionDeleteOutput.Type;

// The operation
/**
 * Delete a collection from the given private store.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const PrivateStoreCollectionDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionDeleteInput,
    outputSchema: PrivateStoreCollectionDeleteOutput,
  }));
// Input Schema
export const PrivateStoreCollectionDisableApproveAllItemsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/disableApproveAllItems",
    }),
  );
export type PrivateStoreCollectionDisableApproveAllItemsInput =
  typeof PrivateStoreCollectionDisableApproveAllItemsInput.Type;

// Output Schema
export const PrivateStoreCollectionDisableApproveAllItemsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreCollectionDisableApproveAllItemsOutput =
  typeof PrivateStoreCollectionDisableApproveAllItemsOutput.Type;

// The operation
/**
 * Disable approve all items for the collection.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const PrivateStoreCollectionDisableApproveAllItems =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionDisableApproveAllItemsInput,
    outputSchema: PrivateStoreCollectionDisableApproveAllItemsOutput,
  }));
// Input Schema
export const PrivateStoreCollectionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}",
    }),
  );
export type PrivateStoreCollectionGetInput =
  typeof PrivateStoreCollectionGetInput.Type;

// Output Schema
export const PrivateStoreCollectionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreCollectionGetOutput =
  typeof PrivateStoreCollectionGetOutput.Type;

// The operation
/**
 * Gets private store collection
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const PrivateStoreCollectionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateStoreCollectionGetInput,
    outputSchema: PrivateStoreCollectionGetOutput,
  }),
);
// Input Schema
export const PrivateStoreCollectionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections",
    }),
  );
export type PrivateStoreCollectionListInput =
  typeof PrivateStoreCollectionListInput.Type;

// Output Schema
export const PrivateStoreCollectionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateStoreCollectionListOutput =
  typeof PrivateStoreCollectionListOutput.Type;

// The operation
/**
 * Gets private store collections list
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreCollectionList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateStoreCollectionListInput,
    outputSchema: PrivateStoreCollectionListOutput,
  }),
);
// Input Schema
export const PrivateStoreCollectionOfferContextsViewInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    offerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}/contextsView",
    }),
  );
export type PrivateStoreCollectionOfferContextsViewInput =
  typeof PrivateStoreCollectionOfferContextsViewInput.Type;

// Output Schema
export const PrivateStoreCollectionOfferContextsViewOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreCollectionOfferContextsViewOutput =
  typeof PrivateStoreCollectionOfferContextsViewOutput.Type;

// The operation
/**
 * Retrieve offer information with plans under required contexts restrictions.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 * @param offerId - The offer ID to update or delete
 */
export const PrivateStoreCollectionOfferContextsView =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionOfferContextsViewInput,
    outputSchema: PrivateStoreCollectionOfferContextsViewOutput,
  }));
// Input Schema
export const PrivateStoreCollectionOfferCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    offerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}",
    }),
  );
export type PrivateStoreCollectionOfferCreateOrUpdateInput =
  typeof PrivateStoreCollectionOfferCreateOrUpdateInput.Type;

// Output Schema
export const PrivateStoreCollectionOfferCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreCollectionOfferCreateOrUpdateOutput =
  typeof PrivateStoreCollectionOfferCreateOrUpdateOutput.Type;

// The operation
/**
 * Update or add an offer to a specific collection of the private store.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 * @param offerId - The offer ID to update or delete
 */
export const PrivateStoreCollectionOfferCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionOfferCreateOrUpdateInput,
    outputSchema: PrivateStoreCollectionOfferCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateStoreCollectionOfferDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    offerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}",
    }),
  );
export type PrivateStoreCollectionOfferDeleteInput =
  typeof PrivateStoreCollectionOfferDeleteInput.Type;

// Output Schema
export const PrivateStoreCollectionOfferDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateStoreCollectionOfferDeleteOutput =
  typeof PrivateStoreCollectionOfferDeleteOutput.Type;

// The operation
/**
 * Deletes an offer from the given collection of private store.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 * @param offerId - The offer ID to update or delete
 */
export const PrivateStoreCollectionOfferDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionOfferDeleteInput,
    outputSchema: PrivateStoreCollectionOfferDeleteOutput,
  }));
// Input Schema
export const PrivateStoreCollectionOfferGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    offerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}",
    }),
  );
export type PrivateStoreCollectionOfferGetInput =
  typeof PrivateStoreCollectionOfferGetInput.Type;

// Output Schema
export const PrivateStoreCollectionOfferGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreCollectionOfferGetOutput =
  typeof PrivateStoreCollectionOfferGetOutput.Type;

// The operation
/**
 * Gets information about a specific offer.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 * @param offerId - The offer ID to update or delete
 */
export const PrivateStoreCollectionOfferGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionOfferGetInput,
    outputSchema: PrivateStoreCollectionOfferGetOutput,
  }));
// Input Schema
export const PrivateStoreCollectionOfferListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers",
    }),
  );
export type PrivateStoreCollectionOfferListInput =
  typeof PrivateStoreCollectionOfferListInput.Type;

// Output Schema
export const PrivateStoreCollectionOfferListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateStoreCollectionOfferListOutput =
  typeof PrivateStoreCollectionOfferListOutput.Type;

// The operation
/**
 * Get a list of all private offers in the given private store and collection
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const PrivateStoreCollectionOfferList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionOfferListInput,
    outputSchema: PrivateStoreCollectionOfferListOutput,
  }));
// Input Schema
export const PrivateStoreCollectionOfferListByContextsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/mapOffersToContexts",
    }),
  );
export type PrivateStoreCollectionOfferListByContextsInput =
  typeof PrivateStoreCollectionOfferListByContextsInput.Type;

// Output Schema
export const PrivateStoreCollectionOfferListByContextsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          context: Schema.optional(Schema.String),
          offers: Schema.optional(
            Schema.Struct({
              value: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    uniqueOfferId: Schema.optional(Schema.String),
                    offerDisplayName: Schema.optional(Schema.String),
                    publisherDisplayName: Schema.optional(Schema.String),
                    eTag: Schema.optional(Schema.String),
                    privateStoreId: Schema.optional(Schema.String),
                    createdAt: Schema.optional(Schema.String),
                    modifiedAt: Schema.optional(Schema.String),
                    specificPlanIdsLimitation: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    updateSuppressedDueIdempotence: Schema.optional(
                      Schema.Boolean,
                    ),
                    iconFileUris: Schema.optional(
                      Schema.Record(Schema.String, Schema.String),
                    ),
                    isStopSell: Schema.optional(Schema.Boolean),
                    plans: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          skuId: Schema.optional(Schema.String),
                          planId: Schema.optional(Schema.String),
                          planDisplayName: Schema.optional(Schema.String),
                          accessibility: Schema.optional(
                            Schema.Literals([
                              "Unknown",
                              "Public",
                              "PrivateTenantOnLevel",
                              "PrivateSubscriptionOnLevel",
                            ]),
                          ),
                          altStackReference: Schema.optional(Schema.String),
                          stackType: Schema.optional(Schema.String),
                          isStopSell: Schema.optional(Schema.Boolean),
                        }),
                      ),
                    ),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateStoreCollectionOfferListByContextsOutput =
  typeof PrivateStoreCollectionOfferListByContextsOutput.Type;

// The operation
/**
 * Get a list of all offers in the given collection according to the required contexts.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const PrivateStoreCollectionOfferListByContexts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionOfferListByContextsInput,
    outputSchema: PrivateStoreCollectionOfferListByContextsOutput,
  }));
// Input Schema
export const PrivateStoreCollectionOfferPostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    offerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}",
    }),
  );
export type PrivateStoreCollectionOfferPostInput =
  typeof PrivateStoreCollectionOfferPostInput.Type;

// Output Schema
export const PrivateStoreCollectionOfferPostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateStoreCollectionOfferPostOutput =
  typeof PrivateStoreCollectionOfferPostOutput.Type;

// The operation
/**
 * Delete Private store offer. This is a workaround.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 * @param offerId - The offer ID to update or delete
 */
export const PrivateStoreCollectionOfferPost =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionOfferPostInput,
    outputSchema: PrivateStoreCollectionOfferPostOutput,
  }));
// Input Schema
export const PrivateStoreCollectionOfferUpsertOfferWithMultiContextInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    offerId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/offers/{offerId}/upsertOfferWithMultiContext",
    }),
  );
export type PrivateStoreCollectionOfferUpsertOfferWithMultiContextInput =
  typeof PrivateStoreCollectionOfferUpsertOfferWithMultiContextInput.Type;

// Output Schema
export const PrivateStoreCollectionOfferUpsertOfferWithMultiContextOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreCollectionOfferUpsertOfferWithMultiContextOutput =
  typeof PrivateStoreCollectionOfferUpsertOfferWithMultiContextOutput.Type;

// The operation
/**
 * Upsert an offer with multiple context details.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 * @param offerId - The offer ID to update or delete
 */
export const PrivateStoreCollectionOfferUpsertOfferWithMultiContext =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionOfferUpsertOfferWithMultiContextInput,
    outputSchema: PrivateStoreCollectionOfferUpsertOfferWithMultiContextOutput,
  }));
// Input Schema
export const PrivateStoreCollectionPostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}",
    }),
  );
export type PrivateStoreCollectionPostInput =
  typeof PrivateStoreCollectionPostInput.Type;

// Output Schema
export const PrivateStoreCollectionPostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateStoreCollectionPostOutput =
  typeof PrivateStoreCollectionPostOutput.Type;

// The operation
/**
 * Delete Private store collection. This is a workaround.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const PrivateStoreCollectionPost = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateStoreCollectionPostInput,
    outputSchema: PrivateStoreCollectionPostOutput,
  }),
);
// Input Schema
export const PrivateStoreCollectionsToSubscriptionsMappingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collectionsToSubscriptionsMapping",
    }),
  );
export type PrivateStoreCollectionsToSubscriptionsMappingInput =
  typeof PrivateStoreCollectionsToSubscriptionsMappingInput.Type;

// Output Schema
export const PrivateStoreCollectionsToSubscriptionsMappingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    details: Schema.optional(
      Schema.Record(
        Schema.String,
        Schema.Struct({
          collectionName: Schema.optional(Schema.String),
          subscriptions: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type PrivateStoreCollectionsToSubscriptionsMappingOutput =
  typeof PrivateStoreCollectionsToSubscriptionsMappingOutput.Type;

// The operation
/**
 * For a given subscriptions list, the API will return a map of collections and the related subscriptions from the supplied list.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreCollectionsToSubscriptionsMapping =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionsToSubscriptionsMappingInput,
    outputSchema: PrivateStoreCollectionsToSubscriptionsMappingOutput,
  }));
// Input Schema
export const PrivateStoreCollectionTransferOffersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/transferOffers",
    }),
  );
export type PrivateStoreCollectionTransferOffersInput =
  typeof PrivateStoreCollectionTransferOffersInput.Type;

// Output Schema
export const PrivateStoreCollectionTransferOffersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    succeeded: Schema.optional(
      Schema.Array(
        Schema.Struct({
          collectionName: Schema.optional(Schema.String),
          collectionId: Schema.optional(Schema.String),
        }),
      ),
    ),
    failed: Schema.optional(
      Schema.Array(
        Schema.Struct({
          collectionName: Schema.optional(Schema.String),
          collectionId: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PrivateStoreCollectionTransferOffersOutput =
  typeof PrivateStoreCollectionTransferOffersOutput.Type;

// The operation
/**
 * transferring offers (copy or move) from source collection to target collection(s)
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const PrivateStoreCollectionTransferOffers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCollectionTransferOffersInput,
    outputSchema: PrivateStoreCollectionTransferOffersOutput,
  }));
// Input Schema
export const PrivateStoreCreateApprovalRequestInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    requestApprovalId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals/{requestApprovalId}",
    }),
  );
export type PrivateStoreCreateApprovalRequestInput =
  typeof PrivateStoreCreateApprovalRequestInput.Type;

// Output Schema
export const PrivateStoreCreateApprovalRequestOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreCreateApprovalRequestOutput =
  typeof PrivateStoreCreateApprovalRequestOutput.Type;

// The operation
/**
 * Create approval request
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param requestApprovalId - The request approval ID to get create or update
 */
export const PrivateStoreCreateApprovalRequest =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreCreateApprovalRequestInput,
    outputSchema: PrivateStoreCreateApprovalRequestOutput,
  }));
// Input Schema
export const PrivateStoreCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}",
    }),
  );
export type PrivateStoreCreateOrUpdateInput =
  typeof PrivateStoreCreateOrUpdateInput.Type;

// Output Schema
export const PrivateStoreCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateStoreCreateOrUpdateOutput =
  typeof PrivateStoreCreateOrUpdateOutput.Type;

// The operation
/**
 * Changes private store properties
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateStoreCreateOrUpdateInput,
    outputSchema: PrivateStoreCreateOrUpdateOutput,
  }),
);
// Input Schema
export const PrivateStoreDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}",
    }),
  );
export type PrivateStoreDeleteInput = typeof PrivateStoreDeleteInput.Type;

// Output Schema
export const PrivateStoreDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateStoreDeleteOutput = typeof PrivateStoreDeleteOutput.Type;

// The operation
/**
 * Deletes the private store. All that is not saved will be lost.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateStoreDeleteInput,
  outputSchema: PrivateStoreDeleteOutput,
}));
// Input Schema
export const PrivateStoreFetchAllSubscriptionsInTenantInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/fetchAllSubscriptionsInTenant",
    }),
  );
export type PrivateStoreFetchAllSubscriptionsInTenantInput =
  typeof PrivateStoreFetchAllSubscriptionsInTenantInput.Type;

// Output Schema
export const PrivateStoreFetchAllSubscriptionsInTenantOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          subscriptionId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          state: Schema.optional(
            Schema.Literals([
              "Enabled",
              "Warned",
              "PastDue",
              "Disabled",
              "Deleted",
            ]),
          ),
        }),
      ),
    ),
    skipToken: Schema.optional(Schema.String),
    count: Schema.optional(Schema.Number),
  });
export type PrivateStoreFetchAllSubscriptionsInTenantOutput =
  typeof PrivateStoreFetchAllSubscriptionsInTenantOutput.Type;

// The operation
/**
 * Fetch all subscriptions in tenant, only for marketplace admin
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param next-page-token - The skip token to get the next page.
 */
export const PrivateStoreFetchAllSubscriptionsInTenant =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreFetchAllSubscriptionsInTenantInput,
    outputSchema: PrivateStoreFetchAllSubscriptionsInTenantOutput,
  }));
// Input Schema
export const PrivateStoreGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  privateStoreId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}",
  }),
);
export type PrivateStoreGetInput = typeof PrivateStoreGetInput.Type;

// Output Schema
export const PrivateStoreGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type PrivateStoreGetOutput = typeof PrivateStoreGetOutput.Type;

// The operation
/**
 * Get information about the private store
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateStoreGetInput,
  outputSchema: PrivateStoreGetOutput,
}));
// Input Schema
export const PrivateStoreGetAdminRequestApprovalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    adminRequestApprovalId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    publisherId: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/adminRequestApprovals/{adminRequestApprovalId}",
    }),
  );
export type PrivateStoreGetAdminRequestApprovalInput =
  typeof PrivateStoreGetAdminRequestApprovalInput.Type;

// Output Schema
export const PrivateStoreGetAdminRequestApprovalOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreGetAdminRequestApprovalOutput =
  typeof PrivateStoreGetAdminRequestApprovalOutput.Type;

// The operation
/**
 * Get open approval requests
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param adminRequestApprovalId - The admin request approval ID to get create or update
 * @param publisherId - The publisher id of this offer.
 */
export const PrivateStoreGetAdminRequestApproval =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreGetAdminRequestApprovalInput,
    outputSchema: PrivateStoreGetAdminRequestApprovalOutput,
  }));
// Input Schema
export const PrivateStoreGetApprovalRequestsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals",
    }),
  );
export type PrivateStoreGetApprovalRequestsListInput =
  typeof PrivateStoreGetApprovalRequestsListInput.Type;

// Output Schema
export const PrivateStoreGetApprovalRequestsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateStoreGetApprovalRequestsListOutput =
  typeof PrivateStoreGetApprovalRequestsListOutput.Type;

// The operation
/**
 * Get all open approval requests of current user
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreGetApprovalRequestsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreGetApprovalRequestsListInput,
    outputSchema: PrivateStoreGetApprovalRequestsListOutput,
  }));
// Input Schema
export const PrivateStoreGetRequestApprovalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    requestApprovalId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals/{requestApprovalId}",
    }),
  );
export type PrivateStoreGetRequestApprovalInput =
  typeof PrivateStoreGetRequestApprovalInput.Type;

// Output Schema
export const PrivateStoreGetRequestApprovalOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreGetRequestApprovalOutput =
  typeof PrivateStoreGetRequestApprovalOutput.Type;

// The operation
/**
 * Get open request approval details
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param requestApprovalId - The request approval ID to get create or update
 */
export const PrivateStoreGetRequestApproval =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreGetRequestApprovalInput,
    outputSchema: PrivateStoreGetRequestApprovalOutput,
  }));
// Input Schema
export const PrivateStoreListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
  "use-cache": Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Marketplace/privateStores",
  }),
);
export type PrivateStoreListInput = typeof PrivateStoreListInput.Type;

// Output Schema
export const PrivateStoreListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  },
);
export type PrivateStoreListOutput = typeof PrivateStoreListOutput.Type;

// The operation
/**
 * Gets the list of available private stores.
 *
 * @param api-version - The API version to use for this operation.
 * @param use-cache - Determines if to use cache or DB for serving this request
 */
export const PrivateStoreList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateStoreListInput,
  outputSchema: PrivateStoreListOutput,
}));
// Input Schema
export const PrivateStoreListNewPlansNotificationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/listNewPlansNotifications",
    }),
  );
export type PrivateStoreListNewPlansNotificationsInput =
  typeof PrivateStoreListNewPlansNotificationsInput.Type;

// Output Schema
export const PrivateStoreListNewPlansNotificationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    newPlansNotifications: Schema.optional(
      Schema.Array(
        Schema.Struct({
          offerId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          isFuturePlansEnabled: Schema.optional(Schema.Boolean),
          messageCode: Schema.optional(Schema.Number),
          icon: Schema.optional(Schema.String),
          plans: Schema.optional(
            Schema.Array(
              Schema.Struct({
                planId: Schema.optional(Schema.String),
                planDisplayName: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type PrivateStoreListNewPlansNotificationsOutput =
  typeof PrivateStoreListNewPlansNotificationsOutput.Type;

// The operation
/**
 * List new plans notifications
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreListNewPlansNotifications =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreListNewPlansNotificationsInput,
    outputSchema: PrivateStoreListNewPlansNotificationsOutput,
  }));
// Input Schema
export const PrivateStoreListStopSellOffersPlansNotificationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/listStopSellOffersPlansNotifications",
    }),
  );
export type PrivateStoreListStopSellOffersPlansNotificationsInput =
  typeof PrivateStoreListStopSellOffersPlansNotificationsInput.Type;

// Output Schema
export const PrivateStoreListStopSellOffersPlansNotificationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    stopSellNotifications: Schema.optional(
      Schema.Array(
        Schema.Struct({
          offerId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          isEntire: Schema.optional(Schema.Boolean),
          messageCode: Schema.optional(Schema.Number),
          icon: Schema.optional(Schema.String),
          plans: Schema.optional(
            Schema.Array(
              Schema.Struct({
                planId: Schema.optional(Schema.String),
                planDisplayName: Schema.optional(Schema.String),
              }),
            ),
          ),
          publicContext: Schema.optional(Schema.Boolean),
          subscriptionsIds: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type PrivateStoreListStopSellOffersPlansNotificationsOutput =
  typeof PrivateStoreListStopSellOffersPlansNotificationsOutput.Type;

// The operation
/**
 * List stop sell notifications for both stop sell offers and stop sell plans
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreListStopSellOffersPlansNotifications =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreListStopSellOffersPlansNotificationsInput,
    outputSchema: PrivateStoreListStopSellOffersPlansNotificationsOutput,
  }));
// Input Schema
export const PrivateStoreListSubscriptionsContextInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/listSubscriptionsContext",
    }),
  );
export type PrivateStoreListSubscriptionsContextInput =
  typeof PrivateStoreListSubscriptionsContextInput.Type;

// Output Schema
export const PrivateStoreListSubscriptionsContextOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionsIds: Schema.optional(Schema.Array(Schema.String)),
  });
export type PrivateStoreListSubscriptionsContextOutput =
  typeof PrivateStoreListSubscriptionsContextOutput.Type;

// The operation
/**
 * List all the subscriptions in the private store context
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreListSubscriptionsContext =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreListSubscriptionsContextInput,
    outputSchema: PrivateStoreListSubscriptionsContextOutput,
  }));
// Input Schema
export const PrivateStoreQueryApprovedPlansInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryApprovedPlans",
    }),
  );
export type PrivateStoreQueryApprovedPlansInput =
  typeof PrivateStoreQueryApprovedPlansInput.Type;

// Output Schema
export const PrivateStoreQueryApprovedPlansOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    details: Schema.optional(
      Schema.Array(
        Schema.Struct({
          planId: Schema.optional(Schema.String),
          subscriptionIds: Schema.optional(Schema.Array(Schema.String)),
          allSubscriptions: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
  });
export type PrivateStoreQueryApprovedPlansOutput =
  typeof PrivateStoreQueryApprovedPlansOutput.Type;

// The operation
/**
 * Get map of plans and related approved subscriptions.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreQueryApprovedPlans =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreQueryApprovedPlansInput,
    outputSchema: PrivateStoreQueryApprovedPlansOutput,
  }));
// Input Schema
export const PrivateStoreQueryNotificationsStateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryNotificationsState",
    }),
  );
export type PrivateStoreQueryNotificationsStateInput =
  typeof PrivateStoreQueryNotificationsStateInput.Type;

// Output Schema
export const PrivateStoreQueryNotificationsStateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    stopSellNotifications: Schema.optional(
      Schema.Array(
        Schema.Struct({
          offerId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          isEntire: Schema.optional(Schema.Boolean),
          messageCode: Schema.optional(Schema.Number),
          icon: Schema.optional(Schema.String),
          plans: Schema.optional(
            Schema.Array(
              Schema.Struct({
                planId: Schema.optional(Schema.String),
                planDisplayName: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    newNotifications: Schema.optional(
      Schema.Array(
        Schema.Struct({
          offerId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          isFuturePlansEnabled: Schema.optional(Schema.Boolean),
          messageCode: Schema.optional(Schema.Number),
          icon: Schema.optional(Schema.String),
          plans: Schema.optional(
            Schema.Array(
              Schema.Struct({
                planId: Schema.optional(Schema.String),
                planDisplayName: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
    approvalRequests: Schema.optional(
      Schema.Array(
        Schema.Struct({
          offerId: Schema.optional(Schema.String),
          displayName: Schema.optional(Schema.String),
          publisherId: Schema.optional(Schema.String),
          messageCode: Schema.optional(Schema.Number),
          icon: Schema.optional(Schema.String),
          plans: Schema.optional(
            Schema.Array(
              Schema.Struct({
                planId: Schema.optional(Schema.String),
                planDisplayName: Schema.optional(Schema.String),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type PrivateStoreQueryNotificationsStateOutput =
  typeof PrivateStoreQueryNotificationsStateOutput.Type;

// The operation
/**
 * Get private store notifications state
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreQueryNotificationsState =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreQueryNotificationsStateInput,
    outputSchema: PrivateStoreQueryNotificationsStateOutput,
  }));
// Input Schema
export const PrivateStoreQueryOffersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryOffers",
    }),
  );
export type PrivateStoreQueryOffersInput =
  typeof PrivateStoreQueryOffersInput.Type;

// Output Schema
export const PrivateStoreQueryOffersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          uniqueOfferId: Schema.optional(Schema.String),
          offerDisplayName: Schema.optional(Schema.String),
          publisherDisplayName: Schema.optional(Schema.String),
          eTag: Schema.optional(Schema.String),
          privateStoreId: Schema.optional(Schema.String),
          createdAt: Schema.optional(Schema.String),
          modifiedAt: Schema.optional(Schema.String),
          specificPlanIdsLimitation: Schema.optional(
            Schema.Array(Schema.String),
          ),
          updateSuppressedDueIdempotence: Schema.optional(Schema.Boolean),
          iconFileUris: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          isStopSell: Schema.optional(Schema.Boolean),
          plans: Schema.optional(
            Schema.Array(
              Schema.Struct({
                skuId: Schema.optional(Schema.String),
                planId: Schema.optional(Schema.String),
                planDisplayName: Schema.optional(Schema.String),
                accessibility: Schema.optional(
                  Schema.Literals([
                    "Unknown",
                    "Public",
                    "PrivateTenantOnLevel",
                    "PrivateSubscriptionOnLevel",
                  ]),
                ),
                altStackReference: Schema.optional(Schema.String),
                stackType: Schema.optional(Schema.String),
                isStopSell: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateStoreQueryOffersOutput =
  typeof PrivateStoreQueryOffersOutput.Type;

// The operation
/**
 * List of offers, regardless the collections
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreQueryOffers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateStoreQueryOffersInput,
    outputSchema: PrivateStoreQueryOffersOutput,
  }),
);
// Input Schema
export const PrivateStoreQueryRequestApprovalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    requestApprovalId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals/{requestApprovalId}/query",
    }),
  );
export type PrivateStoreQueryRequestApprovalInput =
  typeof PrivateStoreQueryRequestApprovalInput.Type;

// Output Schema
export const PrivateStoreQueryRequestApprovalOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    uniqueOfferId: Schema.optional(Schema.String),
    plansDetails: Schema.optional(
      Schema.Record(
        Schema.String,
        Schema.Struct({
          planId: Schema.optional(Schema.String),
          status: Schema.optional(
            Schema.Literals(["Pending", "Rejected", "Approved", "None"]),
          ),
          requestDate: Schema.optional(Schema.Unknown),
          justification: Schema.optional(Schema.String),
          subscriptionId: Schema.optional(Schema.String),
          subscriptionName: Schema.optional(Schema.String),
        }),
      ),
    ),
    etag: Schema.optional(Schema.String),
    messageCode: Schema.optional(Schema.Number),
  });
export type PrivateStoreQueryRequestApprovalOutput =
  typeof PrivateStoreQueryRequestApprovalOutput.Type;

// The operation
/**
 * Get request statuses foreach plan, this api is used as a complex GET action.
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param requestApprovalId - The request approval ID to get create or update
 */
export const PrivateStoreQueryRequestApproval =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreQueryRequestApprovalInput,
    outputSchema: PrivateStoreQueryRequestApprovalOutput,
  }));
// Input Schema
export const PrivateStoreQueryUserOffersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryUserOffers",
    }),
  );
export type PrivateStoreQueryUserOffersInput =
  typeof PrivateStoreQueryUserOffersInput.Type;

// Output Schema
export const PrivateStoreQueryUserOffersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          uniqueOfferId: Schema.optional(Schema.String),
          offerDisplayName: Schema.optional(Schema.String),
          publisherDisplayName: Schema.optional(Schema.String),
          eTag: Schema.optional(Schema.String),
          privateStoreId: Schema.optional(Schema.String),
          createdAt: Schema.optional(Schema.String),
          modifiedAt: Schema.optional(Schema.String),
          specificPlanIdsLimitation: Schema.optional(
            Schema.Array(Schema.String),
          ),
          updateSuppressedDueIdempotence: Schema.optional(Schema.Boolean),
          iconFileUris: Schema.optional(
            Schema.Record(Schema.String, Schema.String),
          ),
          isStopSell: Schema.optional(Schema.Boolean),
          plans: Schema.optional(
            Schema.Array(
              Schema.Struct({
                skuId: Schema.optional(Schema.String),
                planId: Schema.optional(Schema.String),
                planDisplayName: Schema.optional(Schema.String),
                accessibility: Schema.optional(
                  Schema.Literals([
                    "Unknown",
                    "Public",
                    "PrivateTenantOnLevel",
                    "PrivateSubscriptionOnLevel",
                  ]),
                ),
                altStackReference: Schema.optional(Schema.String),
                stackType: Schema.optional(Schema.String),
                isStopSell: Schema.optional(Schema.Boolean),
              }),
            ),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateStoreQueryUserOffersOutput =
  typeof PrivateStoreQueryUserOffersOutput.Type;

// The operation
/**
 * List of user's approved offers for the provided offers and subscriptions
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const PrivateStoreQueryUserOffers = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateStoreQueryUserOffersInput,
    outputSchema: PrivateStoreQueryUserOffersOutput,
  }),
);
// Input Schema
export const PrivateStoreUpdateAdminRequestApprovalInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    adminRequestApprovalId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/adminRequestApprovals/{adminRequestApprovalId}",
    }),
  );
export type PrivateStoreUpdateAdminRequestApprovalInput =
  typeof PrivateStoreUpdateAdminRequestApprovalInput.Type;

// Output Schema
export const PrivateStoreUpdateAdminRequestApprovalOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateStoreUpdateAdminRequestApprovalOutput =
  typeof PrivateStoreUpdateAdminRequestApprovalOutput.Type;

// The operation
/**
 * Update the admin action, weather the request is approved or rejected and the approved plans
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param adminRequestApprovalId - The admin request approval ID to get create or update
 */
export const PrivateStoreUpdateAdminRequestApproval =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateStoreUpdateAdminRequestApprovalInput,
    outputSchema: PrivateStoreUpdateAdminRequestApprovalOutput,
  }));
// Input Schema
export const PrivateStoreWithdrawPlanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    requestApprovalId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals/{requestApprovalId}/withdrawPlan",
    }),
  );
export type PrivateStoreWithdrawPlanInput =
  typeof PrivateStoreWithdrawPlanInput.Type;

// Output Schema
export const PrivateStoreWithdrawPlanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateStoreWithdrawPlanOutput =
  typeof PrivateStoreWithdrawPlanOutput.Type;

// The operation
/**
 * Withdraw a user request approval on specific plan
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param requestApprovalId - The request approval ID to get create or update
 */
export const PrivateStoreWithdrawPlan = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateStoreWithdrawPlanInput,
    outputSchema: PrivateStoreWithdrawPlanOutput,
  }),
);
// Input Schema
export const QueryRulesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  privateStoreId: Schema.String.pipe(T.PathParam()),
  collectionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/queryRules",
  }),
);
export type QueryRulesInput = typeof QueryRulesInput.Type;

// Output Schema
export const QueryRulesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.optional(
          Schema.Literals(["PrivateProducts", "TermsAndCondition"]),
        ),
        value: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type QueryRulesOutput = typeof QueryRulesOutput.Type;

// The operation
/**
 * Get a list of all private store rules in the given private store and collection
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const QueryRules = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueryRulesInput,
  outputSchema: QueryRulesOutput,
}));
// Input Schema
export const QueryUserRulesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  privateStoreId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryUserRules",
  }),
);
export type QueryUserRulesInput = typeof QueryUserRulesInput.Type;

// Output Schema
export const QueryUserRulesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        type: Schema.optional(
          Schema.Literals(["PrivateProducts", "TermsAndCondition"]),
        ),
        value: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type QueryUserRulesOutput = typeof QueryUserRulesOutput.Type;

// The operation
/**
 * All rules approved in the private store that are relevant for user subscriptions
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 */
export const QueryUserRules = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueryUserRulesInput,
  outputSchema: QueryUserRulesOutput,
}));
// Input Schema
export const SetCollectionRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateStoreId: Schema.String.pipe(T.PathParam()),
    collectionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collections/{collectionId}/setRules",
    }),
  );
export type SetCollectionRulesInput = typeof SetCollectionRulesInput.Type;

// Output Schema
export const SetCollectionRulesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SetCollectionRulesOutput = typeof SetCollectionRulesOutput.Type;

// The operation
/**
 * Set rule for specific private store and collection
 *
 * @param api-version - The API version to use for this operation.
 * @param privateStoreId - The store ID - must use the tenant ID
 * @param collectionId - The collection ID
 */
export const SetCollectionRules = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SetCollectionRulesInput,
  outputSchema: SetCollectionRulesOutput,
}));
