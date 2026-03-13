/**
 * Azure Maps API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccountsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}",
    }),
  );
export type AccountsCreateOrUpdateInput =
  typeof AccountsCreateOrUpdateInput.Type;

// Output Schema
export const AccountsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type AccountsCreateOrUpdateOutput =
  typeof AccountsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Maps Account. A Maps Account holds the keys which allow access to the Maps REST APIs.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsCreateOrUpdateInput,
    outputSchema: AccountsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const AccountsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}",
  }),
);
export type AccountsDeleteInput = typeof AccountsDeleteInput.Type;

// Output Schema
export const AccountsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsDeleteOutput = typeof AccountsDeleteOutput.Type;

// The operation
/**
 * Delete a Maps Account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsDeleteInput,
  outputSchema: AccountsDeleteOutput,
}));
// Input Schema
export const AccountsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}",
  }),
);
export type AccountsGetInput = typeof AccountsGetInput.Type;

// Output Schema
export const AccountsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AccountsGetOutput = typeof AccountsGetOutput.Type;

// The operation
/**
 * Get a Maps Account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsGetInput,
  outputSchema: AccountsGetOutput,
}));
// Input Schema
export const AccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts",
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
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccountsListByResourceGroupOutput =
  typeof AccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Get all Maps Accounts in a Resource Group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListByResourceGroupInput,
    outputSchema: AccountsListByResourceGroupOutput,
  }),
);
// Input Schema
export const AccountsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maps/accounts",
    }),
  );
export type AccountsListBySubscriptionInput =
  typeof AccountsListBySubscriptionInput.Type;

// Output Schema
export const AccountsListBySubscriptionOutput =
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
export type AccountsListBySubscriptionOutput =
  typeof AccountsListBySubscriptionOutput.Type;

// The operation
/**
 * Get all Maps Accounts in a Subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListBySubscriptionInput,
    outputSchema: AccountsListBySubscriptionOutput,
  }),
);
// Input Schema
export const AccountsListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/listKeys",
  }),
);
export type AccountsListKeysInput = typeof AccountsListKeysInput.Type;

// Output Schema
export const AccountsListKeysOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    primaryKeyLastUpdated: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    secondaryKeyLastUpdated: Schema.optional(Schema.String),
  },
);
export type AccountsListKeysOutput = typeof AccountsListKeysOutput.Type;

// The operation
/**
 * Get the keys to use with the Maps APIs. A key is used to authenticate and authorize access to the Maps REST APIs. Only one key is needed at a time; two are given to provide seamless key regeneration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListKeysInput,
  outputSchema: AccountsListKeysOutput,
}));
// Input Schema
export const AccountsListSasInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/listSas",
  }),
);
export type AccountsListSasInput = typeof AccountsListSasInput.Type;

// Output Schema
export const AccountsListSasOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  accountSasToken: Schema.optional(Schema.String),
});
export type AccountsListSasOutput = typeof AccountsListSasOutput.Type;

// The operation
/**
 * Create and list an account shared access signature token. Use this SAS token for authentication to Azure Maps REST APIs through various Azure Maps SDKs. As prerequisite to create a SAS Token.
 * Prerequisites:
 * 1. Create or have an existing User Assigned Managed Identity in the same Azure region as the account.
 * 2. Create or update an Azure Map account with the same Azure region as the User Assigned Managed Identity is placed.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsListSas = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListSasInput,
  outputSchema: AccountsListSasOutput,
}));
// Input Schema
export const AccountsRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/regenerateKey",
    }),
  );
export type AccountsRegenerateKeysInput =
  typeof AccountsRegenerateKeysInput.Type;

// Output Schema
export const AccountsRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryKeyLastUpdated: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    secondaryKeyLastUpdated: Schema.optional(Schema.String),
  });
export type AccountsRegenerateKeysOutput =
  typeof AccountsRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerate either the primary or secondary key for use with the Maps APIs. The old key will stop working immediately.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsRegenerateKeysInput,
    outputSchema: AccountsRegenerateKeysOutput,
  }),
);
// Input Schema
export const AccountsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}",
  }),
);
export type AccountsUpdateInput = typeof AccountsUpdateInput.Type;

// Output Schema
export const AccountsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AccountsUpdateOutput = typeof AccountsUpdateOutput.Type;

// The operation
/**
 * Updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsUpdateInput,
  outputSchema: AccountsUpdateOutput,
}));
// Input Schema
export const CreatorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/creators/{creatorName}",
    }),
  );
export type CreatorsCreateOrUpdateInput =
  typeof CreatorsCreateOrUpdateInput.Type;

// Output Schema
export const CreatorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type CreatorsCreateOrUpdateOutput =
  typeof CreatorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Maps Creator resource. Creator resource will manage Azure resources required to populate a custom set of mapping data. It requires an account to exist before it can be created.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CreatorsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreatorsCreateOrUpdateInput,
    outputSchema: CreatorsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const CreatorsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/creators/{creatorName}",
  }),
);
export type CreatorsDeleteInput = typeof CreatorsDeleteInput.Type;

// Output Schema
export const CreatorsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreatorsDeleteOutput = typeof CreatorsDeleteOutput.Type;

// The operation
/**
 * Delete a Maps Creator resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CreatorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreatorsDeleteInput,
  outputSchema: CreatorsDeleteOutput,
}));
// Input Schema
export const CreatorsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/creators/{creatorName}",
  }),
);
export type CreatorsGetInput = typeof CreatorsGetInput.Type;

// Output Schema
export const CreatorsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type CreatorsGetOutput = typeof CreatorsGetOutput.Type;

// The operation
/**
 * Get a Maps Creator resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CreatorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreatorsGetInput,
  outputSchema: CreatorsGetOutput,
}));
// Input Schema
export const CreatorsListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/creators",
    }),
  );
export type CreatorsListByAccountInput = typeof CreatorsListByAccountInput.Type;

// Output Schema
export const CreatorsListByAccountOutput =
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
export type CreatorsListByAccountOutput =
  typeof CreatorsListByAccountOutput.Type;

// The operation
/**
 * Get all Creator instances for an Azure Maps Account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CreatorsListByAccount = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreatorsListByAccountInput,
    outputSchema: CreatorsListByAccountOutput,
  }),
);
// Input Schema
export const CreatorsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Maps/accounts/{accountName}/creators/{creatorName}",
  }),
);
export type CreatorsUpdateInput = typeof CreatorsUpdateInput.Type;

// Output Schema
export const CreatorsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type CreatorsUpdateOutput = typeof CreatorsUpdateOutput.Type;

// The operation
/**
 * Updates the Maps Creator resource. Only a subset of the parameters may be updated after creation, such as Tags.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const CreatorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreatorsUpdateInput,
  outputSchema: CreatorsUpdateOutput,
}));
// Input Schema
export const MapsListOperationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({ method: "GET", path: "/providers/Microsoft.Maps/operations" }),
  );
export type MapsListOperationsInput = typeof MapsListOperationsInput.Type;

// Output Schema
export const MapsListOperationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
          properties: Schema.optional(
            Schema.Struct({
              serviceSpecification: Schema.optional(
                Schema.Struct({
                  metricSpecifications: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        displayName: Schema.optional(Schema.String),
                        displayDescription: Schema.optional(Schema.String),
                        unit: Schema.optional(Schema.String),
                        dimensions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              name: Schema.optional(Schema.String),
                              displayName: Schema.optional(Schema.String),
                              internalName: Schema.optional(Schema.String),
                              internalMetricName: Schema.optional(
                                Schema.String,
                              ),
                              sourceMdmNamespace: Schema.optional(
                                Schema.String,
                              ),
                              toBeExportedToShoebox: Schema.optional(
                                Schema.Boolean,
                              ),
                            }),
                          ),
                        ),
                        aggregationType: Schema.optional(Schema.String),
                        fillGapWithZero: Schema.optional(Schema.Boolean),
                        category: Schema.optional(Schema.String),
                        resourceIdDimensionNameOverride: Schema.optional(
                          Schema.String,
                        ),
                        sourceMdmAccount: Schema.optional(Schema.String),
                        internalMetricName: Schema.optional(Schema.String),
                        lockAggregationType: Schema.optional(Schema.String),
                        sourceMdmNamespace: Schema.optional(Schema.String),
                        supportedAggregationTypes: Schema.optional(
                          Schema.String,
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MapsListOperationsOutput = typeof MapsListOperationsOutput.Type;

// The operation
/**
 * List operations available for the Maps Resource Provider
 *
 * @param api-version - The API version to use for this operation.
 */
export const MapsListOperations = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MapsListOperationsInput,
  outputSchema: MapsListOperationsOutput,
}));
// Input Schema
export const MapsListSubscriptionOperationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Maps/operations",
    }),
  );
export type MapsListSubscriptionOperationsInput =
  typeof MapsListSubscriptionOperationsInput.Type;

// Output Schema
export const MapsListSubscriptionOperationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
          properties: Schema.optional(
            Schema.Struct({
              serviceSpecification: Schema.optional(
                Schema.Struct({
                  metricSpecifications: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        name: Schema.optional(Schema.String),
                        displayName: Schema.optional(Schema.String),
                        displayDescription: Schema.optional(Schema.String),
                        unit: Schema.optional(Schema.String),
                        dimensions: Schema.optional(
                          Schema.Array(
                            Schema.Struct({
                              name: Schema.optional(Schema.String),
                              displayName: Schema.optional(Schema.String),
                              internalName: Schema.optional(Schema.String),
                              internalMetricName: Schema.optional(
                                Schema.String,
                              ),
                              sourceMdmNamespace: Schema.optional(
                                Schema.String,
                              ),
                              toBeExportedToShoebox: Schema.optional(
                                Schema.Boolean,
                              ),
                            }),
                          ),
                        ),
                        aggregationType: Schema.optional(Schema.String),
                        fillGapWithZero: Schema.optional(Schema.Boolean),
                        category: Schema.optional(Schema.String),
                        resourceIdDimensionNameOverride: Schema.optional(
                          Schema.String,
                        ),
                        sourceMdmAccount: Schema.optional(Schema.String),
                        internalMetricName: Schema.optional(Schema.String),
                        lockAggregationType: Schema.optional(Schema.String),
                        sourceMdmNamespace: Schema.optional(Schema.String),
                        supportedAggregationTypes: Schema.optional(
                          Schema.String,
                        ),
                      }),
                    ),
                  ),
                }),
              ),
            }),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MapsListSubscriptionOperationsOutput =
  typeof MapsListSubscriptionOperationsOutput.Type;

// The operation
/**
 * List operations available for the Maps Resource Provider
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const MapsListSubscriptionOperations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MapsListSubscriptionOperationsInput,
    outputSchema: MapsListSubscriptionOperationsOutput,
  }));
