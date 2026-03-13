/**
 * Azure Cognitiveservices API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccountCapabilityHostsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/capabilityHosts/{capabilityHostName}",
    }),
  );
export type AccountCapabilityHostsCreateOrUpdateInput =
  typeof AccountCapabilityHostsCreateOrUpdateInput.Type;

// Output Schema
export const AccountCapabilityHostsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AccountCapabilityHostsCreateOrUpdateOutput =
  typeof AccountCapabilityHostsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update account capabilityHost.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccountCapabilityHostsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccountCapabilityHostsCreateOrUpdateInput,
    outputSchema: AccountCapabilityHostsCreateOrUpdateOutput,
  }));
// Input Schema
export const AccountCapabilityHostsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/capabilityHosts/{capabilityHostName}",
    }),
  );
export type AccountCapabilityHostsDeleteInput =
  typeof AccountCapabilityHostsDeleteInput.Type;

// Output Schema
export const AccountCapabilityHostsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountCapabilityHostsDeleteOutput =
  typeof AccountCapabilityHostsDeleteOutput.Type;

// The operation
/**
 * Delete account capabilityHost.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccountCapabilityHostsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccountCapabilityHostsDeleteInput,
    outputSchema: AccountCapabilityHostsDeleteOutput,
  }));
// Input Schema
export const AccountCapabilityHostsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/capabilityHosts/{capabilityHostName}",
    }),
  );
export type AccountCapabilityHostsGetInput =
  typeof AccountCapabilityHostsGetInput.Type;

// Output Schema
export const AccountCapabilityHostsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AccountCapabilityHostsGetOutput =
  typeof AccountCapabilityHostsGetOutput.Type;

// The operation
/**
 * Get account capabilityHost.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccountCapabilityHostsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountCapabilityHostsGetInput,
    outputSchema: AccountCapabilityHostsGetOutput,
  }),
);
// Input Schema
export const AccountCapabilityHostsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/capabilityHosts",
    }),
  );
export type AccountCapabilityHostsListInput =
  typeof AccountCapabilityHostsListInput.Type;

// Output Schema
export const AccountCapabilityHostsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.NullOr(Schema.String)),
    value: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
  });
export type AccountCapabilityHostsListOutput =
  typeof AccountCapabilityHostsListOutput.Type;

// The operation
/**
 * List capabilityHost.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccountCapabilityHostsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountCapabilityHostsListInput,
    outputSchema: AccountCapabilityHostsListOutput,
  }),
);
// Input Schema
export const AccountConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/connections/{connectionName}",
    }),
  );
export type AccountConnectionsDeleteInput =
  typeof AccountConnectionsDeleteInput.Type;

// Output Schema
export const AccountConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountConnectionsDeleteOutput =
  typeof AccountConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete Cognitive Services account connection by name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const AccountConnectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountConnectionsDeleteInput,
    outputSchema: AccountConnectionsDeleteOutput,
  }),
);
// Input Schema
export const AccountsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}",
  }),
);
export type AccountsCreateInput = typeof AccountsCreateInput.Type;

// Output Schema
export const AccountsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type AccountsCreateOutput = typeof AccountsCreateOutput.Type;

// The operation
/**
 * Create Cognitive Services Account. Accounts is a resource group wide resource type. It holds the keys for developer to access intelligent APIs. It's also the resource type for billing.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsCreateInput,
  outputSchema: AccountsCreateOutput,
}));
// Input Schema
export const AccountsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}",
  }),
);
export type AccountsDeleteInput = typeof AccountsDeleteInput.Type;

// Output Schema
export const AccountsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsDeleteOutput = typeof AccountsDeleteOutput.Type;

// The operation
/**
 * Deletes a Cognitive Services account from the resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsDeleteInput,
  outputSchema: AccountsDeleteOutput,
}));
// Input Schema
export const AccountsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}",
  }),
);
export type AccountsGetInput = typeof AccountsGetInput.Type;

// Output Schema
export const AccountsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type AccountsGetOutput = typeof AccountsGetOutput.Type;

// The operation
/**
 * Returns a Cognitive Services account specified by the parameters.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsGetInput,
  outputSchema: AccountsGetOutput,
}));
// Input Schema
export const AccountsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/accounts",
  }),
);
export type AccountsListInput = typeof AccountsListInput.Type;

// Output Schema
export const AccountsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type AccountsListOutput = typeof AccountsListOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListInput,
  outputSchema: AccountsListOutput,
}));
// Input Schema
export const AccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts",
    }),
  );
export type AccountsListByResourceGroupInput =
  typeof AccountsListByResourceGroupInput.Type;

// Output Schema
export const AccountsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type AccountsListByResourceGroupOutput =
  typeof AccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a resource group
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const AccountsListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListByResourceGroupInput,
    outputSchema: AccountsListByResourceGroupOutput,
  }),
);
// Input Schema
export const AccountsListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/listKeys",
  }),
);
export type AccountsListKeysInput = typeof AccountsListKeysInput.Type;

// Output Schema
export const AccountsListKeysOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  },
);
export type AccountsListKeysOutput = typeof AccountsListKeysOutput.Type;

// The operation
/**
 * Lists the account keys for the specified Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListKeysInput,
  outputSchema: AccountsListKeysOutput,
}));
// Input Schema
export const AccountsListModelsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/models",
    }),
  );
export type AccountsListModelsInput = typeof AccountsListModelsInput.Type;

// Output Schema
export const AccountsListModelsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          publisher: Schema.optional(Schema.String),
          format: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          version: Schema.optional(Schema.String),
          source: Schema.optional(Schema.String),
          sourceAccount: Schema.optional(Schema.String),
          callRateLimit: Schema.optional(
            Schema.Struct({
              count: Schema.optional(Schema.Number),
              renewalPeriod: Schema.optional(Schema.Number),
              rules: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    key: Schema.optional(Schema.String),
                    renewalPeriod: Schema.optional(Schema.Number),
                    count: Schema.optional(Schema.Number),
                    minCount: Schema.optional(Schema.Number),
                    dynamicThrottlingEnabled: Schema.optional(Schema.Boolean),
                    matchPatterns: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          path: Schema.optional(Schema.String),
                          method: Schema.optional(Schema.String),
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
  });
export type AccountsListModelsOutput = typeof AccountsListModelsOutput.Type;

// The operation
/**
 * List available Models for the requested Cognitive Services account
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsListModels = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListModelsInput,
  outputSchema: AccountsListModelsOutput,
}));
// Input Schema
export const AccountsListSkusInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/skus",
  }),
);
export type AccountsListSkusInput = typeof AccountsListSkusInput.Type;

// Output Schema
export const AccountsListSkusOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(
                Schema.Literals([
                  "Free",
                  "Basic",
                  "Standard",
                  "Premium",
                  "Enterprise",
                ]),
              ),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    ),
  },
);
export type AccountsListSkusOutput = typeof AccountsListSkusOutput.Type;

// The operation
/**
 * List available SKUs for the requested Cognitive Services account
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsListSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListSkusInput,
  outputSchema: AccountsListSkusOutput,
}));
// Input Schema
export const AccountsListUsagesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/usages",
    }),
  );
export type AccountsListUsagesInput = typeof AccountsListUsagesInput.Type;

// Output Schema
export const AccountsListUsagesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          unit: Schema.optional(
            Schema.Literals([
              "Count",
              "Bytes",
              "Seconds",
              "Percent",
              "CountPerSecond",
              "BytesPerSecond",
              "Milliseconds",
            ]),
          ),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          quotaPeriod: Schema.optional(Schema.String),
          limit: Schema.optional(Schema.Number),
          currentValue: Schema.optional(Schema.Number),
          nextResetTime: Schema.optional(Schema.String),
          status: Schema.optional(
            Schema.Literals(["Included", "Blocked", "InOverage", "Unknown"]),
          ),
        }),
      ),
    ),
  });
export type AccountsListUsagesOutput = typeof AccountsListUsagesOutput.Type;

// The operation
/**
 * Get usages for the requested Cognitive Services account
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsListUsages = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListUsagesInput,
  outputSchema: AccountsListUsagesOutput,
}));
// Input Schema
export const AccountsRegenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/regenerateKey",
    }),
  );
export type AccountsRegenerateKeyInput = typeof AccountsRegenerateKeyInput.Type;

// Output Schema
export const AccountsRegenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    key1: Schema.optional(Schema.String),
    key2: Schema.optional(Schema.String),
  });
export type AccountsRegenerateKeyOutput =
  typeof AccountsRegenerateKeyOutput.Type;

// The operation
/**
 * Regenerates the specified account key for the specified Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsRegenerateKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsRegenerateKeyInput,
    outputSchema: AccountsRegenerateKeyOutput,
  }),
);
// Input Schema
export const AccountsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}",
  }),
);
export type AccountsUpdateInput = typeof AccountsUpdateInput.Type;

// Output Schema
export const AccountsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type AccountsUpdateOutput = typeof AccountsUpdateOutput.Type;

// The operation
/**
 * Updates a Cognitive Services account
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const AccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsUpdateInput,
  outputSchema: AccountsUpdateOutput,
}));
// Input Schema
export const CalculateModelCapacityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/calculateModelCapacity",
    }),
  );
export type CalculateModelCapacityInput =
  typeof CalculateModelCapacityInput.Type;

// Output Schema
export const CalculateModelCapacityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    model: Schema.optional(
      Schema.Struct({
        publisher: Schema.optional(Schema.String),
        format: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        version: Schema.optional(Schema.String),
        source: Schema.optional(Schema.String),
        sourceAccount: Schema.optional(Schema.String),
        callRateLimit: Schema.optional(
          Schema.Struct({
            count: Schema.optional(Schema.Number),
            renewalPeriod: Schema.optional(Schema.Number),
            rules: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  key: Schema.optional(Schema.String),
                  renewalPeriod: Schema.optional(Schema.Number),
                  count: Schema.optional(Schema.Number),
                  minCount: Schema.optional(Schema.Number),
                  dynamicThrottlingEnabled: Schema.optional(Schema.Boolean),
                  matchPatterns: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        path: Schema.optional(Schema.String),
                        method: Schema.optional(Schema.String),
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
    skuName: Schema.optional(Schema.String),
    estimatedCapacity: Schema.optional(
      Schema.Struct({
        value: Schema.optional(Schema.Number),
        deployableValue: Schema.optional(Schema.Number),
      }),
    ),
  });
export type CalculateModelCapacityOutput =
  typeof CalculateModelCapacityOutput.Type;

// The operation
/**
 * Model capacity calculator.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const calculateModelCapacity = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CalculateModelCapacityInput,
    outputSchema: CalculateModelCapacityOutput,
  }),
);
// Input Schema
export const CheckDomainAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/checkDomainAvailability",
    }),
  );
export type CheckDomainAvailabilityInput =
  typeof CheckDomainAvailabilityInput.Type;

// Output Schema
export const CheckDomainAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isSubdomainAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    subdomainName: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
  });
export type CheckDomainAvailabilityOutput =
  typeof CheckDomainAvailabilityOutput.Type;

// The operation
/**
 * Check whether a domain is available.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const CheckDomainAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CheckDomainAvailabilityInput,
    outputSchema: CheckDomainAvailabilityOutput,
  }),
);
// Input Schema
export const CheckSkuAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/checkSkuAvailability",
    }),
  );
export type CheckSkuAvailabilityInput = typeof CheckSkuAvailabilityInput.Type;

// Output Schema
export const CheckSkuAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kind: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          skuName: Schema.optional(Schema.String),
          skuAvailable: Schema.optional(Schema.Boolean),
          reason: Schema.optional(Schema.String),
          message: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type CheckSkuAvailabilityOutput = typeof CheckSkuAvailabilityOutput.Type;

// The operation
/**
 * Check available SKUs.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const CheckSkuAvailability = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CheckSkuAvailabilityInput,
    outputSchema: CheckSkuAvailabilityOutput,
  }),
);
// Input Schema
export const CommitmentPlansCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/commitmentPlans/{commitmentPlanName}",
    }),
  );
export type CommitmentPlansCreateOrUpdateInput =
  typeof CommitmentPlansCreateOrUpdateInput.Type;

// Output Schema
export const CommitmentPlansCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommitmentPlansCreateOrUpdateOutput =
  typeof CommitmentPlansCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of specified commitmentPlans associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommitmentPlansCreateOrUpdateInput,
    outputSchema: CommitmentPlansCreateOrUpdateOutput,
  }));
// Input Schema
export const CommitmentPlansCreateOrUpdateAssociationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations/{commitmentPlanAssociationName}",
    }),
  );
export type CommitmentPlansCreateOrUpdateAssociationInput =
  typeof CommitmentPlansCreateOrUpdateAssociationInput.Type;

// Output Schema
export const CommitmentPlansCreateOrUpdateAssociationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommitmentPlansCreateOrUpdateAssociationOutput =
  typeof CommitmentPlansCreateOrUpdateAssociationOutput.Type;

// The operation
/**
 * Create or update the association of the Cognitive Services commitment plan.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansCreateOrUpdateAssociation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommitmentPlansCreateOrUpdateAssociationInput,
    outputSchema: CommitmentPlansCreateOrUpdateAssociationOutput,
  }));
// Input Schema
export const CommitmentPlansCreateOrUpdatePlanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}",
    }),
  );
export type CommitmentPlansCreateOrUpdatePlanInput =
  typeof CommitmentPlansCreateOrUpdatePlanInput.Type;

// Output Schema
export const CommitmentPlansCreateOrUpdatePlanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommitmentPlansCreateOrUpdatePlanOutput =
  typeof CommitmentPlansCreateOrUpdatePlanOutput.Type;

// The operation
/**
 * Create Cognitive Services commitment plan.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansCreateOrUpdatePlan =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommitmentPlansCreateOrUpdatePlanInput,
    outputSchema: CommitmentPlansCreateOrUpdatePlanOutput,
  }));
// Input Schema
export const CommitmentPlansDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/commitmentPlans/{commitmentPlanName}",
    }),
  );
export type CommitmentPlansDeleteInput = typeof CommitmentPlansDeleteInput.Type;

// Output Schema
export const CommitmentPlansDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CommitmentPlansDeleteOutput =
  typeof CommitmentPlansDeleteOutput.Type;

// The operation
/**
 * Deletes the specified commitmentPlan associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommitmentPlansDeleteInput,
    outputSchema: CommitmentPlansDeleteOutput,
  }),
);
// Input Schema
export const CommitmentPlansDeleteAssociationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations/{commitmentPlanAssociationName}",
    }),
  );
export type CommitmentPlansDeleteAssociationInput =
  typeof CommitmentPlansDeleteAssociationInput.Type;

// Output Schema
export const CommitmentPlansDeleteAssociationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CommitmentPlansDeleteAssociationOutput =
  typeof CommitmentPlansDeleteAssociationOutput.Type;

// The operation
/**
 * Deletes the association of the Cognitive Services commitment plan.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansDeleteAssociation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommitmentPlansDeleteAssociationInput,
    outputSchema: CommitmentPlansDeleteAssociationOutput,
  }));
// Input Schema
export const CommitmentPlansDeletePlanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}",
    }),
  );
export type CommitmentPlansDeletePlanInput =
  typeof CommitmentPlansDeletePlanInput.Type;

// Output Schema
export const CommitmentPlansDeletePlanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CommitmentPlansDeletePlanOutput =
  typeof CommitmentPlansDeletePlanOutput.Type;

// The operation
/**
 * Deletes a Cognitive Services commitment plan from the resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansDeletePlan = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommitmentPlansDeletePlanInput,
    outputSchema: CommitmentPlansDeletePlanOutput,
  }),
);
// Input Schema
export const CommitmentPlansGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/commitmentPlans/{commitmentPlanName}",
    }),
  );
export type CommitmentPlansGetInput = typeof CommitmentPlansGetInput.Type;

// Output Schema
export const CommitmentPlansGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommitmentPlansGetOutput = typeof CommitmentPlansGetOutput.Type;

// The operation
/**
 * Gets the specified commitmentPlans associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CommitmentPlansGetInput,
  outputSchema: CommitmentPlansGetOutput,
}));
// Input Schema
export const CommitmentPlansGetAssociationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations/{commitmentPlanAssociationName}",
    }),
  );
export type CommitmentPlansGetAssociationInput =
  typeof CommitmentPlansGetAssociationInput.Type;

// Output Schema
export const CommitmentPlansGetAssociationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommitmentPlansGetAssociationOutput =
  typeof CommitmentPlansGetAssociationOutput.Type;

// The operation
/**
 * Gets the association of the Cognitive Services commitment plan.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansGetAssociation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommitmentPlansGetAssociationInput,
    outputSchema: CommitmentPlansGetAssociationOutput,
  }));
// Input Schema
export const CommitmentPlansGetPlanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}",
    }),
  );
export type CommitmentPlansGetPlanInput =
  typeof CommitmentPlansGetPlanInput.Type;

// Output Schema
export const CommitmentPlansGetPlanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommitmentPlansGetPlanOutput =
  typeof CommitmentPlansGetPlanOutput.Type;

// The operation
/**
 * Returns a Cognitive Services commitment plan specified by the parameters.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansGetPlan = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommitmentPlansGetPlanInput,
    outputSchema: CommitmentPlansGetPlanOutput,
  }),
);
// Input Schema
export const CommitmentPlansListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/commitmentPlans",
    }),
  );
export type CommitmentPlansListInput = typeof CommitmentPlansListInput.Type;

// Output Schema
export const CommitmentPlansListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type CommitmentPlansListOutput = typeof CommitmentPlansListOutput.Type;

// The operation
/**
 * Gets the commitmentPlans associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CommitmentPlansListInput,
  outputSchema: CommitmentPlansListOutput,
}));
// Input Schema
export const CommitmentPlansListAssociationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}/accountAssociations",
    }),
  );
export type CommitmentPlansListAssociationsInput =
  typeof CommitmentPlansListAssociationsInput.Type;

// Output Schema
export const CommitmentPlansListAssociationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type CommitmentPlansListAssociationsOutput =
  typeof CommitmentPlansListAssociationsOutput.Type;

// The operation
/**
 * Gets the associations of the Cognitive Services commitment plan.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansListAssociations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommitmentPlansListAssociationsInput,
    outputSchema: CommitmentPlansListAssociationsOutput,
  }));
// Input Schema
export const CommitmentPlansListPlansByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans",
    }),
  );
export type CommitmentPlansListPlansByResourceGroupInput =
  typeof CommitmentPlansListPlansByResourceGroupInput.Type;

// Output Schema
export const CommitmentPlansListPlansByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type CommitmentPlansListPlansByResourceGroupOutput =
  typeof CommitmentPlansListPlansByResourceGroupOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a resource group
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const CommitmentPlansListPlansByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommitmentPlansListPlansByResourceGroupInput,
    outputSchema: CommitmentPlansListPlansByResourceGroupOutput,
  }));
// Input Schema
export const CommitmentPlansListPlansBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/commitmentPlans",
    }),
  );
export type CommitmentPlansListPlansBySubscriptionInput =
  typeof CommitmentPlansListPlansBySubscriptionInput.Type;

// Output Schema
export const CommitmentPlansListPlansBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type CommitmentPlansListPlansBySubscriptionOutput =
  typeof CommitmentPlansListPlansBySubscriptionOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansListPlansBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommitmentPlansListPlansBySubscriptionInput,
    outputSchema: CommitmentPlansListPlansBySubscriptionOutput,
  }));
// Input Schema
export const CommitmentPlansUpdatePlanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/commitmentPlans/{commitmentPlanName}",
    }),
  );
export type CommitmentPlansUpdatePlanInput =
  typeof CommitmentPlansUpdatePlanInput.Type;

// Output Schema
export const CommitmentPlansUpdatePlanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommitmentPlansUpdatePlanOutput =
  typeof CommitmentPlansUpdatePlanOutput.Type;

// The operation
/**
 * Create Cognitive Services commitment plan.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const CommitmentPlansUpdatePlan = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommitmentPlansUpdatePlanInput,
    outputSchema: CommitmentPlansUpdatePlanOutput,
  }),
);
// Input Schema
export const CommitmentTiersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/commitmentTiers",
    }),
  );
export type CommitmentTiersListInput = typeof CommitmentTiersListInput.Type;

// Output Schema
export const CommitmentTiersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          kind: Schema.optional(Schema.String),
          skuName: Schema.optional(Schema.String),
          hostingModel: Schema.optional(
            Schema.Literals([
              "Web",
              "ConnectedContainer",
              "DisconnectedContainer",
              "ProvisionedWeb",
            ]),
          ),
          planType: Schema.optional(Schema.String),
          tier: Schema.optional(Schema.String),
          maxCount: Schema.optional(Schema.Number),
          quota: Schema.optional(
            Schema.Struct({
              quantity: Schema.optional(Schema.Number),
              unit: Schema.optional(Schema.String),
            }),
          ),
          cost: Schema.optional(
            Schema.Struct({
              commitmentMeterId: Schema.optional(Schema.String),
              overageMeterId: Schema.optional(Schema.String),
            }),
          ),
        }),
      ),
    ),
  });
export type CommitmentTiersListOutput = typeof CommitmentTiersListOutput.Type;

// The operation
/**
 * List Commitment Tiers.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const CommitmentTiersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CommitmentTiersListInput,
  outputSchema: CommitmentTiersListOutput,
}));
// Input Schema
export const DefenderForAISettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/defenderForAISettings/{defenderForAISettingName}",
    }),
  );
export type DefenderForAISettingsCreateOrUpdateInput =
  typeof DefenderForAISettingsCreateOrUpdateInput.Type;

// Output Schema
export const DefenderForAISettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DefenderForAISettingsCreateOrUpdateOutput =
  typeof DefenderForAISettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or Updates the specified Defender for AI setting.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DefenderForAISettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DefenderForAISettingsCreateOrUpdateInput,
    outputSchema: DefenderForAISettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const DefenderForAISettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/defenderForAISettings/{defenderForAISettingName}",
    }),
  );
export type DefenderForAISettingsGetInput =
  typeof DefenderForAISettingsGetInput.Type;

// Output Schema
export const DefenderForAISettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DefenderForAISettingsGetOutput =
  typeof DefenderForAISettingsGetOutput.Type;

// The operation
/**
 * Gets the specified Defender for AI setting by name.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DefenderForAISettingsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DefenderForAISettingsGetInput,
    outputSchema: DefenderForAISettingsGetOutput,
  }),
);
// Input Schema
export const DefenderForAISettingsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/defenderForAISettings",
    }),
  );
export type DefenderForAISettingsListInput =
  typeof DefenderForAISettingsListInput.Type;

// Output Schema
export const DefenderForAISettingsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type DefenderForAISettingsListOutput =
  typeof DefenderForAISettingsListOutput.Type;

// The operation
/**
 * Lists the Defender for AI settings.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DefenderForAISettingsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DefenderForAISettingsListInput,
    outputSchema: DefenderForAISettingsListOutput,
  }),
);
// Input Schema
export const DefenderForAISettingsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/defenderForAISettings/{defenderForAISettingName}",
    }),
  );
export type DefenderForAISettingsUpdateInput =
  typeof DefenderForAISettingsUpdateInput.Type;

// Output Schema
export const DefenderForAISettingsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DefenderForAISettingsUpdateOutput =
  typeof DefenderForAISettingsUpdateOutput.Type;

// The operation
/**
 * Updates the specified Defender for AI setting.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DefenderForAISettingsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DefenderForAISettingsUpdateInput,
    outputSchema: DefenderForAISettingsUpdateOutput,
  }),
);
// Input Schema
export const DeletedAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/resourceGroups/{resourceGroupName}/deletedAccounts/{accountName}",
    }),
  );
export type DeletedAccountsGetInput = typeof DeletedAccountsGetInput.Type;

// Output Schema
export const DeletedAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type DeletedAccountsGetOutput = typeof DeletedAccountsGetOutput.Type;

// The operation
/**
 * Returns a Cognitive Services account specified by the parameters.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeletedAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletedAccountsGetInput,
  outputSchema: DeletedAccountsGetOutput,
}));
// Input Schema
export const DeletedAccountsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/deletedAccounts",
    }),
  );
export type DeletedAccountsListInput = typeof DeletedAccountsListInput.Type;

// Output Schema
export const DeletedAccountsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type DeletedAccountsListOutput = typeof DeletedAccountsListOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeletedAccountsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletedAccountsListInput,
  outputSchema: DeletedAccountsListOutput,
}));
// Input Schema
export const DeletedAccountsPurgeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/resourceGroups/{resourceGroupName}/deletedAccounts/{accountName}",
    }),
  );
export type DeletedAccountsPurgeInput = typeof DeletedAccountsPurgeInput.Type;

// Output Schema
export const DeletedAccountsPurgeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeletedAccountsPurgeOutput = typeof DeletedAccountsPurgeOutput.Type;

// The operation
/**
 * Deletes a Cognitive Services account from the resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeletedAccountsPurge = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeletedAccountsPurgeInput,
    outputSchema: DeletedAccountsPurgeOutput,
  }),
);
// Input Schema
export const DeploymentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/deployments/{deploymentName}",
    }),
  );
export type DeploymentsCreateOrUpdateInput =
  typeof DeploymentsCreateOrUpdateInput.Type;

// Output Schema
export const DeploymentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentsCreateOrUpdateOutput =
  typeof DeploymentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of specified deployments associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeploymentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeploymentsCreateOrUpdateInput,
    outputSchema: DeploymentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DeploymentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/deployments/{deploymentName}",
  }),
);
export type DeploymentsDeleteInput = typeof DeploymentsDeleteInput.Type;

// Output Schema
export const DeploymentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeploymentsDeleteOutput = typeof DeploymentsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified deployment associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeploymentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsDeleteInput,
  outputSchema: DeploymentsDeleteOutput,
}));
// Input Schema
export const DeploymentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/deployments/{deploymentName}",
  }),
);
export type DeploymentsGetInput = typeof DeploymentsGetInput.Type;

// Output Schema
export const DeploymentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DeploymentsGetOutput = typeof DeploymentsGetOutput.Type;

// The operation
/**
 * Gets the specified deployments associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeploymentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsGetInput,
  outputSchema: DeploymentsGetOutput,
}));
// Input Schema
export const DeploymentsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/deployments",
  }),
);
export type DeploymentsListInput = typeof DeploymentsListInput.Type;

// Output Schema
export const DeploymentsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type DeploymentsListOutput = typeof DeploymentsListOutput.Type;

// The operation
/**
 * Gets the deployments associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeploymentsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsListInput,
  outputSchema: DeploymentsListOutput,
}));
// Input Schema
export const DeploymentsListSkusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/deployments/{deploymentName}/skus",
    }),
  );
export type DeploymentsListSkusInput = typeof DeploymentsListSkusInput.Type;

// Output Schema
export const DeploymentsListSkusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          resourceType: Schema.optional(Schema.String),
          sku: Schema.optional(
            Schema.Struct({
              name: Schema.String,
              tier: Schema.optional(
                Schema.Literals([
                  "Free",
                  "Basic",
                  "Standard",
                  "Premium",
                  "Enterprise",
                ]),
              ),
              size: Schema.optional(Schema.String),
              family: Schema.optional(Schema.String),
              capacity: Schema.optional(Schema.Number),
            }),
          ),
          capacity: Schema.optional(
            Schema.Struct({
              minimum: Schema.optional(Schema.Number),
              maximum: Schema.optional(Schema.Number),
              step: Schema.optional(Schema.Number),
              default: Schema.optional(Schema.Number),
              allowedValues: Schema.optional(Schema.Array(Schema.Number)),
            }),
          ),
        }),
      ),
    ),
  });
export type DeploymentsListSkusOutput = typeof DeploymentsListSkusOutput.Type;

// The operation
/**
 * Lists the specified deployments skus associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeploymentsListSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsListSkusInput,
  outputSchema: DeploymentsListSkusOutput,
}));
// Input Schema
export const DeploymentsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/deployments/{deploymentName}",
  }),
);
export type DeploymentsUpdateInput = typeof DeploymentsUpdateInput.Type;

// Output Schema
export const DeploymentsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeploymentsUpdateOutput = typeof DeploymentsUpdateOutput.Type;

// The operation
/**
 * Update specified deployments associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const DeploymentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeploymentsUpdateInput,
  outputSchema: DeploymentsUpdateOutput,
}));
// Input Schema
export const EncryptionScopesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/encryptionScopes/{encryptionScopeName}",
    }),
  );
export type EncryptionScopesCreateOrUpdateInput =
  typeof EncryptionScopesCreateOrUpdateInput.Type;

// Output Schema
export const EncryptionScopesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EncryptionScopesCreateOrUpdateOutput =
  typeof EncryptionScopesCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of specified encryptionScope associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const EncryptionScopesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EncryptionScopesCreateOrUpdateInput,
    outputSchema: EncryptionScopesCreateOrUpdateOutput,
  }));
// Input Schema
export const EncryptionScopesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/encryptionScopes/{encryptionScopeName}",
    }),
  );
export type EncryptionScopesDeleteInput =
  typeof EncryptionScopesDeleteInput.Type;

// Output Schema
export const EncryptionScopesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EncryptionScopesDeleteOutput =
  typeof EncryptionScopesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified encryptionScope associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const EncryptionScopesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EncryptionScopesDeleteInput,
    outputSchema: EncryptionScopesDeleteOutput,
  }),
);
// Input Schema
export const EncryptionScopesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/encryptionScopes/{encryptionScopeName}",
    }),
  );
export type EncryptionScopesGetInput = typeof EncryptionScopesGetInput.Type;

// Output Schema
export const EncryptionScopesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EncryptionScopesGetOutput = typeof EncryptionScopesGetOutput.Type;

// The operation
/**
 * Gets the specified EncryptionScope associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const EncryptionScopesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: EncryptionScopesGetInput,
  outputSchema: EncryptionScopesGetOutput,
}));
// Input Schema
export const EncryptionScopesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/encryptionScopes",
    }),
  );
export type EncryptionScopesListInput = typeof EncryptionScopesListInput.Type;

// Output Schema
export const EncryptionScopesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type EncryptionScopesListOutput = typeof EncryptionScopesListOutput.Type;

// The operation
/**
 * Gets the content filters associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const EncryptionScopesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EncryptionScopesListInput,
    outputSchema: EncryptionScopesListOutput,
  }),
);
// Input Schema
export const LocationBasedModelCapacitiesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/modelCapacities",
    }),
  );
export type LocationBasedModelCapacitiesListInput =
  typeof LocationBasedModelCapacitiesListInput.Type;

// Output Schema
export const LocationBasedModelCapacitiesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type LocationBasedModelCapacitiesListOutput =
  typeof LocationBasedModelCapacitiesListOutput.Type;

// The operation
/**
 * List Location Based ModelCapacities.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const LocationBasedModelCapacitiesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LocationBasedModelCapacitiesListInput,
    outputSchema: LocationBasedModelCapacitiesListOutput,
  }));
// Input Schema
export const ModelCapacitiesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/modelCapacities",
    }),
  );
export type ModelCapacitiesListInput = typeof ModelCapacitiesListInput.Type;

// Output Schema
export const ModelCapacitiesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ModelCapacitiesListOutput = typeof ModelCapacitiesListOutput.Type;

// The operation
/**
 * List ModelCapacities.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ModelCapacitiesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModelCapacitiesListInput,
  outputSchema: ModelCapacitiesListOutput,
}));
// Input Schema
export const ModelsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/models",
  }),
);
export type ModelsListInput = typeof ModelsListInput.Type;

// Output Schema
export const ModelsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        model: Schema.optional(
          Schema.Struct({
            publisher: Schema.optional(Schema.String),
            format: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            version: Schema.optional(Schema.String),
            source: Schema.optional(Schema.String),
            sourceAccount: Schema.optional(Schema.String),
            callRateLimit: Schema.optional(
              Schema.Struct({
                count: Schema.optional(Schema.Number),
                renewalPeriod: Schema.optional(Schema.Number),
                rules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      key: Schema.optional(Schema.String),
                      renewalPeriod: Schema.optional(Schema.Number),
                      count: Schema.optional(Schema.Number),
                      minCount: Schema.optional(Schema.Number),
                      dynamicThrottlingEnabled: Schema.optional(Schema.Boolean),
                      matchPatterns: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            path: Schema.optional(Schema.String),
                            method: Schema.optional(Schema.String),
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
        kind: Schema.optional(Schema.String),
        skuName: Schema.optional(Schema.String),
        description: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type ModelsListOutput = typeof ModelsListOutput.Type;

// The operation
/**
 * List Models.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const ModelsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ModelsListInput,
  outputSchema: ModelsListOutput,
}));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/networkSecurityPerimeterConfigurations/{nspConfigurationName}",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsGetInput =
  typeof NetworkSecurityPerimeterConfigurationsGetInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkSecurityPerimeterConfigurationsGetOutput =
  typeof NetworkSecurityPerimeterConfigurationsGetOutput.Type;

// The operation
/**
 * Gets the specified NSP configurations for an account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkSecurityPerimeterConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsGetInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsGetOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/networkSecurityPerimeterConfigurations",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsListInput =
  typeof NetworkSecurityPerimeterConfigurationsListInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkSecurityPerimeterConfigurationsListOutput =
  typeof NetworkSecurityPerimeterConfigurationsListOutput.Type;

// The operation
/**
 * Gets a list of NSP configurations for an account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkSecurityPerimeterConfigurationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsListInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsListOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsReconcileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/networkSecurityPerimeterConfigurations/{nspConfigurationName}/reconcile",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsReconcileInput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsReconcileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkSecurityPerimeterConfigurationsReconcileOutput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileOutput.Type;

// The operation
/**
 * Reconcile the NSP configuration for an account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NetworkSecurityPerimeterConfigurationsReconcile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsReconcileInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsReconcileOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of specified private endpoint connection associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateEndpointConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsDeleteInput =
  typeof PrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionsDeleteOutput =
  typeof PrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified private endpoint connection associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    etag: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets the specified private endpoint connection associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          etag: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * Gets the private endpoint connections associated with the Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const ProjectCapabilityHostsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/capabilityHosts/{capabilityHostName}",
    }),
  );
export type ProjectCapabilityHostsCreateOrUpdateInput =
  typeof ProjectCapabilityHostsCreateOrUpdateInput.Type;

// Output Schema
export const ProjectCapabilityHostsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProjectCapabilityHostsCreateOrUpdateOutput =
  typeof ProjectCapabilityHostsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update project capabilityHost.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ProjectCapabilityHostsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCapabilityHostsCreateOrUpdateInput,
    outputSchema: ProjectCapabilityHostsCreateOrUpdateOutput,
  }));
// Input Schema
export const ProjectCapabilityHostsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/capabilityHosts/{capabilityHostName}",
    }),
  );
export type ProjectCapabilityHostsDeleteInput =
  typeof ProjectCapabilityHostsDeleteInput.Type;

// Output Schema
export const ProjectCapabilityHostsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectCapabilityHostsDeleteOutput =
  typeof ProjectCapabilityHostsDeleteOutput.Type;

// The operation
/**
 * Delete project capabilityHost.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ProjectCapabilityHostsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProjectCapabilityHostsDeleteInput,
    outputSchema: ProjectCapabilityHostsDeleteOutput,
  }));
// Input Schema
export const ProjectCapabilityHostsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/capabilityHosts/{capabilityHostName}",
    }),
  );
export type ProjectCapabilityHostsGetInput =
  typeof ProjectCapabilityHostsGetInput.Type;

// Output Schema
export const ProjectCapabilityHostsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProjectCapabilityHostsGetOutput =
  typeof ProjectCapabilityHostsGetOutput.Type;

// The operation
/**
 * Get project capabilityHost.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ProjectCapabilityHostsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectCapabilityHostsGetInput,
    outputSchema: ProjectCapabilityHostsGetOutput,
  }),
);
// Input Schema
export const ProjectCapabilityHostsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/capabilityHosts",
    }),
  );
export type ProjectCapabilityHostsListInput =
  typeof ProjectCapabilityHostsListInput.Type;

// Output Schema
export const ProjectCapabilityHostsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.NullOr(Schema.String)),
    value: Schema.optional(Schema.NullOr(Schema.Array(Schema.Struct({})))),
  });
export type ProjectCapabilityHostsListOutput =
  typeof ProjectCapabilityHostsListOutput.Type;

// The operation
/**
 * List capabilityHost.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ProjectCapabilityHostsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectCapabilityHostsListInput,
    outputSchema: ProjectCapabilityHostsListOutput,
  }),
);
// Input Schema
export const ProjectConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}/connections/{connectionName}",
    }),
  );
export type ProjectConnectionsDeleteInput =
  typeof ProjectConnectionsDeleteInput.Type;

// Output Schema
export const ProjectConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectConnectionsDeleteOutput =
  typeof ProjectConnectionsDeleteOutput.Type;

// The operation
/**
 * Delete Cognitive Services project connection by name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const ProjectConnectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProjectConnectionsDeleteInput,
    outputSchema: ProjectConnectionsDeleteOutput,
  }),
);
// Input Schema
export const ProjectsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}",
  }),
);
export type ProjectsCreateInput = typeof ProjectsCreateInput.Type;

// Output Schema
export const ProjectsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type ProjectsCreateOutput = typeof ProjectsCreateOutput.Type;

// The operation
/**
 * Create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ProjectsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsCreateInput,
  outputSchema: ProjectsCreateOutput,
}));
// Input Schema
export const ProjectsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}",
  }),
);
export type ProjectsDeleteInput = typeof ProjectsDeleteInput.Type;

// Output Schema
export const ProjectsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProjectsDeleteOutput = typeof ProjectsDeleteOutput.Type;

// The operation
/**
 * Deletes a Cognitive Services project from the resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ProjectsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsDeleteInput,
  outputSchema: ProjectsDeleteOutput,
}));
// Input Schema
export const ProjectsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}",
  }),
);
export type ProjectsGetInput = typeof ProjectsGetInput.Type;

// Output Schema
export const ProjectsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type ProjectsGetOutput = typeof ProjectsGetOutput.Type;

// The operation
/**
 * Returns a Cognitive Services project specified by the parameters.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ProjectsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsGetInput,
  outputSchema: ProjectsGetOutput,
}));
// Input Schema
export const ProjectsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects",
  }),
);
export type ProjectsListInput = typeof ProjectsListInput.Type;

// Output Schema
export const ProjectsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        etag: Schema.optional(Schema.String),
      }),
    ),
  ),
});
export type ProjectsListOutput = typeof ProjectsListOutput.Type;

// The operation
/**
 * Returns all the projects in a Cognitive Services account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ProjectsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsListInput,
  outputSchema: ProjectsListOutput,
}));
// Input Schema
export const ProjectsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/projects/{projectName}",
  }),
);
export type ProjectsUpdateInput = typeof ProjectsUpdateInput.Type;

// Output Schema
export const ProjectsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  etag: Schema.optional(Schema.String),
});
export type ProjectsUpdateOutput = typeof ProjectsUpdateOutput.Type;

// The operation
/**
 * Updates a Cognitive Services Project
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ProjectsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ProjectsUpdateInput,
  outputSchema: ProjectsUpdateOutput,
}));
// Input Schema
export const QuotaTiersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/quotaTiers/{default}",
    }),
  );
export type QuotaTiersCreateOrUpdateInput =
  typeof QuotaTiersCreateOrUpdateInput.Type;

// Output Schema
export const QuotaTiersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type QuotaTiersCreateOrUpdateOutput =
  typeof QuotaTiersCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates the Quota Tier resource for a subscription.
 *
 * Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const QuotaTiersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QuotaTiersCreateOrUpdateInput,
    outputSchema: QuotaTiersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const QuotaTiersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/quotaTiers/{default}",
  }),
);
export type QuotaTiersGetInput = typeof QuotaTiersGetInput.Type;

// Output Schema
export const QuotaTiersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type QuotaTiersGetOutput = typeof QuotaTiersGetOutput.Type;

// The operation
/**
 * Gets the Quota Tier for a subscription
 *
 * Gets the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const QuotaTiersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotaTiersGetInput,
  outputSchema: QuotaTiersGetOutput,
}));
// Input Schema
export const QuotaTiersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/quotaTiers",
    }),
  );
export type QuotaTiersListBySubscriptionInput =
  typeof QuotaTiersListBySubscriptionInput.Type;

// Output Schema
export const QuotaTiersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type QuotaTiersListBySubscriptionOutput =
  typeof QuotaTiersListBySubscriptionOutput.Type;

// The operation
/**
 * Returns all the resources of a particular type belonging to a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const QuotaTiersListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QuotaTiersListBySubscriptionInput,
    outputSchema: QuotaTiersListBySubscriptionOutput,
  }));
// Input Schema
export const QuotaTiersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/quotaTiers/{default}",
  }),
);
export type QuotaTiersUpdateInput = typeof QuotaTiersUpdateInput.Type;

// Output Schema
export const QuotaTiersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type QuotaTiersUpdateOutput = typeof QuotaTiersUpdateOutput.Type;

// The operation
/**
 * Updates the Quota Tier resource for a subscription. The only properties that can be updated are  "tierUpgradePolicy"
 *
 * Update the Quota Tier information for the given subscription. QuotaTiers is a subscription wide resource type. It holds current tier information.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const QuotaTiersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotaTiersUpdateInput,
  outputSchema: QuotaTiersUpdateOutput,
}));
// Input Schema
export const RaiBlocklistItemsBatchAddInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/addRaiBlocklistItems",
    }),
  );
export type RaiBlocklistItemsBatchAddInput =
  typeof RaiBlocklistItemsBatchAddInput.Type;

// Output Schema
export const RaiBlocklistItemsBatchAddOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RaiBlocklistItemsBatchAddOutput =
  typeof RaiBlocklistItemsBatchAddOutput.Type;

// The operation
/**
 * Batch operation to add blocklist items.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistItemsBatchAdd = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RaiBlocklistItemsBatchAddInput,
    outputSchema: RaiBlocklistItemsBatchAddOutput,
  }),
);
// Input Schema
export const RaiBlocklistItemsBatchDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/deleteRaiBlocklistItems",
    }),
  );
export type RaiBlocklistItemsBatchDeleteInput =
  typeof RaiBlocklistItemsBatchDeleteInput.Type;

// Output Schema
export const RaiBlocklistItemsBatchDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RaiBlocklistItemsBatchDeleteOutput =
  typeof RaiBlocklistItemsBatchDeleteOutput.Type;

// The operation
/**
 * Batch operation to delete blocklist items.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistItemsBatchDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RaiBlocklistItemsBatchDeleteInput,
    outputSchema: RaiBlocklistItemsBatchDeleteOutput,
  }));
// Input Schema
export const RaiBlocklistItemsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}",
    }),
  );
export type RaiBlocklistItemsCreateOrUpdateInput =
  typeof RaiBlocklistItemsCreateOrUpdateInput.Type;

// Output Schema
export const RaiBlocklistItemsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RaiBlocklistItemsCreateOrUpdateOutput =
  typeof RaiBlocklistItemsCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of specified blocklist item associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistItemsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RaiBlocklistItemsCreateOrUpdateInput,
    outputSchema: RaiBlocklistItemsCreateOrUpdateOutput,
  }));
// Input Schema
export const RaiBlocklistItemsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}",
    }),
  );
export type RaiBlocklistItemsDeleteInput =
  typeof RaiBlocklistItemsDeleteInput.Type;

// Output Schema
export const RaiBlocklistItemsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RaiBlocklistItemsDeleteOutput =
  typeof RaiBlocklistItemsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified blocklist Item associated with the custom blocklist.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistItemsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RaiBlocklistItemsDeleteInput,
    outputSchema: RaiBlocklistItemsDeleteOutput,
  }),
);
// Input Schema
export const RaiBlocklistItemsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems/{raiBlocklistItemName}",
    }),
  );
export type RaiBlocklistItemsGetInput = typeof RaiBlocklistItemsGetInput.Type;

// Output Schema
export const RaiBlocklistItemsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RaiBlocklistItemsGetOutput = typeof RaiBlocklistItemsGetOutput.Type;

// The operation
/**
 * Gets the specified custom blocklist Item associated with the custom blocklist.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistItemsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RaiBlocklistItemsGetInput,
    outputSchema: RaiBlocklistItemsGetOutput,
  }),
);
// Input Schema
export const RaiBlocklistItemsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems",
    }),
  );
export type RaiBlocklistItemsListInput = typeof RaiBlocklistItemsListInput.Type;

// Output Schema
export const RaiBlocklistItemsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type RaiBlocklistItemsListOutput =
  typeof RaiBlocklistItemsListOutput.Type;

// The operation
/**
 * Gets the blocklist items associated with the custom blocklist.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistItemsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RaiBlocklistItemsListInput,
    outputSchema: RaiBlocklistItemsListOutput,
  }),
);
// Input Schema
export const RaiBlocklistsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}",
    }),
  );
export type RaiBlocklistsCreateOrUpdateInput =
  typeof RaiBlocklistsCreateOrUpdateInput.Type;

// Output Schema
export const RaiBlocklistsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RaiBlocklistsCreateOrUpdateOutput =
  typeof RaiBlocklistsCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of specified blocklist associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RaiBlocklistsCreateOrUpdateInput,
    outputSchema: RaiBlocklistsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const RaiBlocklistsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}",
    }),
  );
export type RaiBlocklistsDeleteInput = typeof RaiBlocklistsDeleteInput.Type;

// Output Schema
export const RaiBlocklistsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RaiBlocklistsDeleteOutput = typeof RaiBlocklistsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified custom blocklist associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RaiBlocklistsDeleteInput,
  outputSchema: RaiBlocklistsDeleteOutput,
}));
// Input Schema
export const RaiBlocklistsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists/{raiBlocklistName}",
  }),
);
export type RaiBlocklistsGetInput = typeof RaiBlocklistsGetInput.Type;

// Output Schema
export const RaiBlocklistsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type RaiBlocklistsGetOutput = typeof RaiBlocklistsGetOutput.Type;

// The operation
/**
 * Gets the specified custom blocklist associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RaiBlocklistsGetInput,
  outputSchema: RaiBlocklistsGetOutput,
}));
// Input Schema
export const RaiBlocklistsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiBlocklists",
  }),
);
export type RaiBlocklistsListInput = typeof RaiBlocklistsListInput.Type;

// Output Schema
export const RaiBlocklistsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type RaiBlocklistsListOutput = typeof RaiBlocklistsListOutput.Type;

// The operation
/**
 * Gets the custom blocklists associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiBlocklistsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RaiBlocklistsListInput,
  outputSchema: RaiBlocklistsListOutput,
}));
// Input Schema
export const RaiContentFiltersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/raiContentFilters/{filterName}",
    }),
  );
export type RaiContentFiltersGetInput = typeof RaiContentFiltersGetInput.Type;

// Output Schema
export const RaiContentFiltersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RaiContentFiltersGetOutput = typeof RaiContentFiltersGetOutput.Type;

// The operation
/**
 * Get Content Filters by Name.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const RaiContentFiltersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RaiContentFiltersGetInput,
    outputSchema: RaiContentFiltersGetOutput,
  }),
);
// Input Schema
export const RaiContentFiltersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/raiContentFilters",
    }),
  );
export type RaiContentFiltersListInput = typeof RaiContentFiltersListInput.Type;

// Output Schema
export const RaiContentFiltersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type RaiContentFiltersListOutput =
  typeof RaiContentFiltersListOutput.Type;

// The operation
/**
 * List Content Filters types.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const RaiContentFiltersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RaiContentFiltersListInput,
    outputSchema: RaiContentFiltersListOutput,
  }),
);
// Input Schema
export const RaiPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies/{raiPolicyName}",
    }),
  );
export type RaiPoliciesCreateOrUpdateInput =
  typeof RaiPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const RaiPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RaiPoliciesCreateOrUpdateOutput =
  typeof RaiPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Update the state of specified Content Filters associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiPoliciesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RaiPoliciesCreateOrUpdateInput,
    outputSchema: RaiPoliciesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const RaiPoliciesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies/{raiPolicyName}",
  }),
);
export type RaiPoliciesDeleteInput = typeof RaiPoliciesDeleteInput.Type;

// Output Schema
export const RaiPoliciesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RaiPoliciesDeleteOutput = typeof RaiPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes the specified Content Filters associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RaiPoliciesDeleteInput,
  outputSchema: RaiPoliciesDeleteOutput,
}));
// Input Schema
export const RaiPoliciesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies/{raiPolicyName}",
  }),
);
export type RaiPoliciesGetInput = typeof RaiPoliciesGetInput.Type;

// Output Schema
export const RaiPoliciesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type RaiPoliciesGetOutput = typeof RaiPoliciesGetOutput.Type;

// The operation
/**
 * Gets the specified Content Filters associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RaiPoliciesGetInput,
  outputSchema: RaiPoliciesGetOutput,
}));
// Input Schema
export const RaiPoliciesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raiPolicies",
  }),
);
export type RaiPoliciesListInput = typeof RaiPoliciesListInput.Type;

// Output Schema
export const RaiPoliciesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type RaiPoliciesListOutput = typeof RaiPoliciesListOutput.Type;

// The operation
/**
 * Gets the content filters associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RaiPoliciesListInput,
  outputSchema: RaiPoliciesListOutput,
}));
// Input Schema
export const RaiTopicsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raitopics/{raiTopicName}",
    }),
  );
export type RaiTopicsCreateOrUpdateInput =
  typeof RaiTopicsCreateOrUpdateInput.Type;

// Output Schema
export const RaiTopicsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RaiTopicsCreateOrUpdateOutput =
  typeof RaiTopicsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create the rai topic associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiTopicsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RaiTopicsCreateOrUpdateInput,
    outputSchema: RaiTopicsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const RaiTopicsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raitopics/{raiTopicName}",
  }),
);
export type RaiTopicsDeleteInput = typeof RaiTopicsDeleteInput.Type;

// Output Schema
export const RaiTopicsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RaiTopicsDeleteOutput = typeof RaiTopicsDeleteOutput.Type;

// The operation
/**
 * Deletes the specified custom topic associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiTopicsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RaiTopicsDeleteInput,
  outputSchema: RaiTopicsDeleteOutput,
}));
// Input Schema
export const RaiTopicsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raitopics/{raiTopicName}",
  }),
);
export type RaiTopicsGetInput = typeof RaiTopicsGetInput.Type;

// Output Schema
export const RaiTopicsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RaiTopicsGetOutput = typeof RaiTopicsGetOutput.Type;

// The operation
/**
 * Gets the specified custom topic associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiTopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RaiTopicsGetInput,
  outputSchema: RaiTopicsGetOutput,
}));
// Input Schema
export const RaiTopicsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/raitopics",
  }),
);
export type RaiTopicsListInput = typeof RaiTopicsListInput.Type;

// Output Schema
export const RaiTopicsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type RaiTopicsListOutput = typeof RaiTopicsListOutput.Type;

// The operation
/**
 * Gets the custom topics associated with the Azure OpenAI account.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const RaiTopicsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RaiTopicsListInput,
  outputSchema: RaiTopicsListOutput,
}));
// Input Schema
export const ResourceSkusListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/skus",
  }),
);
export type ResourceSkusListInput = typeof ResourceSkusListInput.Type;

// Output Schema
export const ResourceSkusListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.Array(
      Schema.Struct({
        resourceType: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        tier: Schema.optional(Schema.String),
        kind: Schema.optional(Schema.String),
        locations: Schema.optional(Schema.Array(Schema.String)),
        restrictions: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.Literals(["Location", "Zone"])),
              values: Schema.optional(Schema.Array(Schema.String)),
              restrictionInfo: Schema.optional(
                Schema.Struct({
                  locations: Schema.optional(Schema.Array(Schema.String)),
                  zones: Schema.optional(Schema.Array(Schema.String)),
                }),
              ),
              reasonCode: Schema.optional(
                Schema.Literals(["QuotaId", "NotAvailableForSubscription"]),
              ),
            }),
          ),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  },
);
export type ResourceSkusListOutput = typeof ResourceSkusListOutput.Type;

// The operation
/**
 * Gets the list of Microsoft.CognitiveServices SKUs available for your Subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ResourceSkusList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceSkusListInput,
  outputSchema: ResourceSkusListOutput,
}));
// Input Schema
export const UsagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/usages",
  }),
);
export type UsagesListInput = typeof UsagesListInput.Type;

// Output Schema
export const UsagesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        unit: Schema.optional(
          Schema.Literals([
            "Count",
            "Bytes",
            "Seconds",
            "Percent",
            "CountPerSecond",
            "BytesPerSecond",
            "Milliseconds",
          ]),
        ),
        name: Schema.optional(
          Schema.Struct({
            value: Schema.optional(Schema.String),
            localizedValue: Schema.optional(Schema.String),
          }),
        ),
        quotaPeriod: Schema.optional(Schema.String),
        limit: Schema.optional(Schema.Number),
        currentValue: Schema.optional(Schema.Number),
        nextResetTime: Schema.optional(Schema.String),
        status: Schema.optional(
          Schema.Literals(["Included", "Blocked", "InOverage", "Unknown"]),
        ),
      }),
    ),
  ),
});
export type UsagesListOutput = typeof UsagesListOutput.Type;

// The operation
/**
 * Get usages for the requested subscription
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param api-version - The API version to use for this operation.
 */
export const UsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesListInput,
  outputSchema: UsagesListOutput,
}));
