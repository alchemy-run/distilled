/**
 * Azure Purview API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccountsAddRootCollectionAdminInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/addRootCollectionAdmin",
    }),
  );
export type AccountsAddRootCollectionAdminInput =
  typeof AccountsAddRootCollectionAdminInput.Type;

// Output Schema
export const AccountsAddRootCollectionAdminOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsAddRootCollectionAdminOutput =
  typeof AccountsAddRootCollectionAdminOutput.Type;

// The operation
/**
 * Add the administrator for root collection.
 *
 * Add the administrator for root collection associated with this account.
 */
export const AccountsAddRootCollectionAdmin =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccountsAddRootCollectionAdminInput,
    outputSchema: AccountsAddRootCollectionAdminOutput,
  }));
// Input Schema
export const AccountsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Purview/checkNameAvailability",
    }),
  );
export type AccountsCheckNameAvailabilityInput =
  typeof AccountsCheckNameAvailabilityInput.Type;

// Output Schema
export const AccountsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
  });
export type AccountsCheckNameAvailabilityOutput =
  typeof AccountsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Checks the account name availability.
 *
 * Checks if account name is available.
 */
export const AccountsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccountsCheckNameAvailabilityInput,
    outputSchema: AccountsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const AccountsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}",
    }),
  );
export type AccountsCreateOrUpdateInput =
  typeof AccountsCreateOrUpdateInput.Type;

// Output Schema
export const AccountsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        principalId: Schema.optional(Schema.String),
        tenantId: Schema.optional(Schema.String),
        type: Schema.optional(
          Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
        ),
        userAssignedIdentities: Schema.optional(
          Schema.Record(
            Schema.String,
            Schema.Struct({
              clientId: Schema.optional(Schema.String),
              principalId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
    location: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    type: Schema.optional(Schema.String),
  });
export type AccountsCreateOrUpdateOutput =
  typeof AccountsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an account resource
 *
 * Creates or updates an account
 */
export const AccountsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsCreateOrUpdateInput,
    outputSchema: AccountsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const AccountsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}",
  }),
);
export type AccountsDeleteInput = typeof AccountsDeleteInput.Type;

// Output Schema
export const AccountsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsDeleteOutput = typeof AccountsDeleteOutput.Type;

// The operation
/**
 * Deletes the account resource.
 *
 * Deletes an account resource
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}",
  }),
);
export type AccountsGetInput = typeof AccountsGetInput.Type;

// Output Schema
export const AccountsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  identity: Schema.optional(
    Schema.Struct({
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
      type: Schema.optional(
        Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
      ),
      userAssignedIdentities: Schema.optional(
        Schema.Record(
          Schema.String,
          Schema.Struct({
            clientId: Schema.optional(Schema.String),
            principalId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
  location: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdAt: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
    }),
  ),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  type: Schema.optional(Schema.String),
});
export type AccountsGetOutput = typeof AccountsGetOutput.Type;

// The operation
/**
 * Gets the account resource.
 *
 * Get an account
 */
export const AccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsGetInput,
  outputSchema: AccountsGetOutput,
}));
// Input Schema
export const AccountsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts",
    }),
  );
export type AccountsListByResourceGroupInput =
  typeof AccountsListByResourceGroupInput.Type;

// Output Schema
export const AccountsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    count: Schema.optional(Schema.Number),
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        identity: Schema.optional(
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            tenantId: Schema.optional(Schema.String),
            type: Schema.optional(
              Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
            ),
            userAssignedIdentities: Schema.optional(
              Schema.Record(
                Schema.String,
                Schema.Struct({
                  clientId: Schema.optional(Schema.String),
                  principalId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        location: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type AccountsListByResourceGroupOutput =
  typeof AccountsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets the accounts resources by resource group.
 *
 * List accounts in ResourceGroup
 *
 * @param $skipToken - The skip token.
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
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Purview/accounts",
    }),
  );
export type AccountsListBySubscriptionInput =
  typeof AccountsListBySubscriptionInput.Type;

// Output Schema
export const AccountsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    count: Schema.optional(Schema.Number),
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        identity: Schema.optional(
          Schema.Struct({
            principalId: Schema.optional(Schema.String),
            tenantId: Schema.optional(Schema.String),
            type: Schema.optional(
              Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
            ),
            userAssignedIdentities: Schema.optional(
              Schema.Record(
                Schema.String,
                Schema.Struct({
                  clientId: Schema.optional(Schema.String),
                  principalId: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
        location: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type AccountsListBySubscriptionOutput =
  typeof AccountsListBySubscriptionOutput.Type;

// The operation
/**
 * Gets the accounts resources by subscription.
 *
 * List accounts in Subscription
 *
 * @param $skipToken - The skip token.
 */
export const AccountsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListBySubscriptionInput,
    outputSchema: AccountsListBySubscriptionOutput,
  }),
);
// Input Schema
export const AccountsListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/listkeys",
  }),
);
export type AccountsListKeysInput = typeof AccountsListKeysInput.Type;

// Output Schema
export const AccountsListKeysOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    atlasKafkaPrimaryEndpoint: Schema.optional(Schema.String),
    atlasKafkaSecondaryEndpoint: Schema.optional(Schema.String),
  },
);
export type AccountsListKeysOutput = typeof AccountsListKeysOutput.Type;

// The operation
/**
 * Lists the keys asynchronous.
 *
 * List the authorization keys associated with this account.
 */
export const AccountsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListKeysInput,
  outputSchema: AccountsListKeysOutput,
}));
// Input Schema
export const AccountsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}",
  }),
);
export type AccountsUpdateInput = typeof AccountsUpdateInput.Type;

// Output Schema
export const AccountsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  identity: Schema.optional(
    Schema.Struct({
      principalId: Schema.optional(Schema.String),
      tenantId: Schema.optional(Schema.String),
      type: Schema.optional(
        Schema.Literals(["None", "SystemAssigned", "UserAssigned"]),
      ),
      userAssignedIdentities: Schema.optional(
        Schema.Record(
          Schema.String,
          Schema.Struct({
            clientId: Schema.optional(Schema.String),
            principalId: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
  location: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  systemData: Schema.optional(
    Schema.Struct({
      createdAt: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      createdByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
      lastModifiedAt: Schema.optional(Schema.String),
      lastModifiedBy: Schema.optional(Schema.String),
      lastModifiedByType: Schema.optional(
        Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
      ),
    }),
  ),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  type: Schema.optional(Schema.String),
});
export type AccountsUpdateOutput = typeof AccountsUpdateOutput.Type;

// The operation
/**
 * Patches the account resource.
 *
 * Updates an account
 */
export const AccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsUpdateInput,
  outputSchema: AccountsUpdateOutput,
}));
// Input Schema
export const DefaultAccountsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scopeTenantId: Schema.String,
    scopeType: Schema.Literals(["Tenant", "Subscription"]),
    scope: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Purview/getDefaultAccount",
    }),
  );
export type DefaultAccountsGetInput = typeof DefaultAccountsGetInput.Type;

// Output Schema
export const DefaultAccountsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountName: Schema.optional(Schema.String),
    resourceGroupName: Schema.optional(Schema.String),
    scope: Schema.optional(Schema.String),
    scopeTenantId: Schema.optional(Schema.String),
    scopeType: Schema.optional(Schema.Literals(["Tenant", "Subscription"])),
    subscriptionId: Schema.optional(Schema.String),
  });
export type DefaultAccountsGetOutput = typeof DefaultAccountsGetOutput.Type;

// The operation
/**
 * Gets the default account information set for the scope.
 *
 * Get the default account for the scope.
 *
 * @param scopeTenantId - The tenant ID.
 * @param scopeType - The scope for the default account.
 * @param scope - The Id of the scope object, for example if the scope is "Subscription" then it is the ID of that subscription.
 */
export const DefaultAccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DefaultAccountsGetInput,
  outputSchema: DefaultAccountsGetOutput,
}));
// Input Schema
export const DefaultAccountsRemoveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scopeTenantId: Schema.String,
    scopeType: Schema.Literals(["Tenant", "Subscription"]),
    scope: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Purview/removeDefaultAccount",
    }),
  );
export type DefaultAccountsRemoveInput = typeof DefaultAccountsRemoveInput.Type;

// Output Schema
export const DefaultAccountsRemoveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DefaultAccountsRemoveOutput =
  typeof DefaultAccountsRemoveOutput.Type;

// The operation
/**
 * Removes the default account from the scope.
 *
 * @param scopeTenantId - The tenant ID.
 * @param scopeType - The scope for the default account.
 * @param scope - The Id of the scope object, for example if the scope is "Subscription" then it is the ID of that subscription.
 */
export const DefaultAccountsRemove = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DefaultAccountsRemoveInput,
    outputSchema: DefaultAccountsRemoveOutput,
  }),
);
// Input Schema
export const DefaultAccountsSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Purview/setDefaultAccount",
    }),
  );
export type DefaultAccountsSetInput = typeof DefaultAccountsSetInput.Type;

// Output Schema
export const DefaultAccountsSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    accountName: Schema.optional(Schema.String),
    resourceGroupName: Schema.optional(Schema.String),
    scope: Schema.optional(Schema.String),
    scopeTenantId: Schema.optional(Schema.String),
    scopeType: Schema.optional(Schema.Literals(["Tenant", "Subscription"])),
    subscriptionId: Schema.optional(Schema.String),
  });
export type DefaultAccountsSetOutput = typeof DefaultAccountsSetOutput.Type;

// The operation
/**
 * Sets the default account for the scope.
 */
export const DefaultAccountsSet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DefaultAccountsSetInput,
  outputSchema: DefaultAccountsSetOutput,
}));
// Input Schema
export const FeaturesAccountGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/listFeatures",
    }),
  );
export type FeaturesAccountGetInput = typeof FeaturesAccountGetInput.Type;

// Output Schema
export const FeaturesAccountGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    features: Schema.optional(Schema.Record(Schema.String, Schema.Boolean)),
  });
export type FeaturesAccountGetOutput = typeof FeaturesAccountGetOutput.Type;

// The operation
/**
 * Gets a list of features and their status for the account.
Status of enabled features will be true. Status of disabled features will be false.
Features that don't exist will be excluded from the results.
 *
 * Gets details from a list of feature names.
 */
export const FeaturesAccountGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FeaturesAccountGetInput,
  outputSchema: FeaturesAccountGetOutput,
}));
// Input Schema
export const FeaturesSubscriptionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locations: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Purview/locations/{locations}/listFeatures",
    }),
  );
export type FeaturesSubscriptionGetInput =
  typeof FeaturesSubscriptionGetInput.Type;

// Output Schema
export const FeaturesSubscriptionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    features: Schema.optional(Schema.Record(Schema.String, Schema.Boolean)),
  });
export type FeaturesSubscriptionGetOutput =
  typeof FeaturesSubscriptionGetOutput.Type;

// The operation
/**
 * Gets a list of features and their status for the location and subscription.
Status of enabled features will be true. Status of disabled features will be false.
Features that don't exist will be excluded from the results.
 *
 * Gets details from a list of feature names.
 *
 * @param locations - Location of feature.
 */
export const FeaturesSubscriptionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FeaturesSubscriptionGetInput,
    outputSchema: FeaturesSubscriptionGetOutput,
  }),
);
// Input Schema
export const KafkaConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kafkaConfigurationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/kafkaConfigurations/{kafkaConfigurationName}",
    }),
  );
export type KafkaConfigurationsCreateOrUpdateInput =
  typeof KafkaConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const KafkaConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type KafkaConfigurationsCreateOrUpdateOutput =
  typeof KafkaConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the kafka configuration.
 *
 * Create or update Kafka Configuration
 *
 * @param kafkaConfigurationName - The kafka configuration name.
 */
export const KafkaConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KafkaConfigurationsCreateOrUpdateInput,
    outputSchema: KafkaConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const KafkaConfigurationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kafkaConfigurationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/kafkaConfigurations/{kafkaConfigurationName}",
    }),
  );
export type KafkaConfigurationsDeleteInput =
  typeof KafkaConfigurationsDeleteInput.Type;

// Output Schema
export const KafkaConfigurationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type KafkaConfigurationsDeleteOutput =
  typeof KafkaConfigurationsDeleteOutput.Type;

// The operation
/**
 * Deletes the kafka configuration on the account.
 *
 * Deletes a KafkaConfiguration resource.
 *
 * @param kafkaConfigurationName - Name of kafka configuration.
 */
export const KafkaConfigurationsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KafkaConfigurationsDeleteInput,
    outputSchema: KafkaConfigurationsDeleteOutput,
  }),
);
// Input Schema
export const KafkaConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    kafkaConfigurationName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/kafkaConfigurations/{kafkaConfigurationName}",
    }),
  );
export type KafkaConfigurationsGetInput =
  typeof KafkaConfigurationsGetInput.Type;

// Output Schema
export const KafkaConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type KafkaConfigurationsGetOutput =
  typeof KafkaConfigurationsGetOutput.Type;

// The operation
/**
 * Gets the kafka configuration.
 *
 * Gets the kafka configuration for the account
 *
 * @param kafkaConfigurationName - Name of kafka configuration.
 */
export const KafkaConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: KafkaConfigurationsGetInput,
    outputSchema: KafkaConfigurationsGetOutput,
  }),
);
// Input Schema
export const KafkaConfigurationsListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/kafkaConfigurations",
    }),
  );
export type KafkaConfigurationsListByAccountInput =
  typeof KafkaConfigurationsListByAccountInput.Type;

// Output Schema
export const KafkaConfigurationsListByAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type KafkaConfigurationsListByAccountOutput =
  typeof KafkaConfigurationsListByAccountOutput.Type;

// The operation
/**
 * Gets the list of Kafka configurations for the account.
 *
 * Lists the Kafka configurations in the Account
 *
 * @param $skipToken - The skip token.
 */
export const KafkaConfigurationsListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: KafkaConfigurationsListByAccountInput,
    outputSchema: KafkaConfigurationsListByAccountOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Purview/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.Array(
    Schema.Struct({
      display: Schema.optional(
        Schema.Struct({
          description: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          provider: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
        }),
      ),
      isDataAction: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      origin: Schema.optional(Schema.String),
      properties: Schema.optional(
        Schema.Struct({
          serviceSpecification: Schema.optional(
            Schema.Struct({
              logSpecifications: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    blobDuration: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                  }),
                ),
              ),
              metricSpecifications: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    aggregationType: Schema.optional(Schema.String),
                    dimensions: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          displayName: Schema.optional(Schema.String),
                          name: Schema.optional(Schema.String),
                          toBeExportedForCustomer: Schema.optional(
                            Schema.Boolean,
                          ),
                        }),
                      ),
                    ),
                    displayDescription: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                    enableRegionalMdmAccount: Schema.optional(Schema.String),
                    internalMetricName: Schema.optional(Schema.String),
                    name: Schema.optional(Schema.String),
                    resourceIdDimensionNameOverride: Schema.optional(
                      Schema.String,
                    ),
                    sourceMdmNamespace: Schema.optional(Schema.String),
                    supportedAggregationTypes: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    supportedTimeGrainTypes: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    unit: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    }),
  ),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists the available operations
 *
 * List of available operations
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Approves/Rejects private endpoint connection request.
 *
 * Create or update a private endpoint connection
 *
 * @param privateEndpointConnectionName - Name of the private endpoint connection.
 */
export const PrivateEndpointConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateOrUpdateInput,
    outputSchema: PrivateEndpointConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes private endpoint connection.
 *
 * Delete a private endpoint connection
 *
 * @param privateEndpointConnectionName - Name of the private endpoint connection.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdAt: Schema.optional(Schema.String),
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets private endpoint connection information.
 *
 * Get a private endpoint connection
 *
 * @param privateEndpointConnectionName - Name of the private endpoint connection.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByAccountInput =
  typeof PrivateEndpointConnectionsListByAccountInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        systemData: Schema.optional(
          Schema.Struct({
            createdAt: Schema.optional(Schema.String),
            createdBy: Schema.optional(Schema.String),
            createdByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
            lastModifiedAt: Schema.optional(Schema.String),
            lastModifiedBy: Schema.optional(Schema.String),
            lastModifiedByType: Schema.optional(
              Schema.Literals([
                "User",
                "Application",
                "ManagedIdentity",
                "Key",
              ]),
            ),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type PrivateEndpointConnectionsListByAccountOutput =
  typeof PrivateEndpointConnectionsListByAccountOutput.Type;

// The operation
/**
 * Gets private endpoint connections.
 *
 * Get private endpoint connections for account
 *
 * @param $skipToken - The skip token.
 */
export const PrivateEndpointConnectionsListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByAccountInput,
    outputSchema: PrivateEndpointConnectionsListByAccountOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetByGroupIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/privateLinkResources/{groupId}",
    }),
  );
export type PrivateLinkResourcesGetByGroupIdInput =
  typeof PrivateLinkResourcesGetByGroupIdInput.Type;

// Output Schema
export const PrivateLinkResourcesGetByGroupIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        groupId: Schema.optional(Schema.String),
        requiredMembers: Schema.optional(Schema.Array(Schema.String)),
        requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
      }),
    ),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesGetByGroupIdOutput =
  typeof PrivateLinkResourcesGetByGroupIdOutput.Type;

// The operation
/**
 * Gets a privately linkable resources for an account with given group identifier.
 *
 * Gets a privately linkable resources for an account with given group identifier
 *
 * @param groupId - The group identifier.
 */
export const PrivateLinkResourcesGetByGroupId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesGetByGroupIdInput,
    outputSchema: PrivateLinkResourcesGetByGroupIdOutput,
  }));
// Input Schema
export const PrivateLinkResourcesListByAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Purview/accounts/{accountName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByAccountInput =
  typeof PrivateLinkResourcesListByAccountInput.Type;

// Output Schema
export const PrivateLinkResourcesListByAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            groupId: Schema.optional(Schema.String),
            requiredMembers: Schema.optional(Schema.Array(Schema.String)),
            requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
          }),
        ),
        type: Schema.optional(Schema.String),
      }),
    ),
  });
export type PrivateLinkResourcesListByAccountOutput =
  typeof PrivateLinkResourcesListByAccountOutput.Type;

// The operation
/**
 * Gets a list of privately linkable resources for an account.
 *
 * Gets a list of privately linkable resources for an account
 */
export const PrivateLinkResourcesListByAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByAccountInput,
    outputSchema: PrivateLinkResourcesListByAccountOutput,
  }));
// Input Schema
export const UsagesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String.pipe(T.PathParam()),
  $filter: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Purview/locations/{location}/usages",
  }),
);
export type UsagesGetInput = typeof UsagesGetInput.Type;

// Output Schema
export const UsagesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        currentValue: Schema.optional(Schema.Number),
        id: Schema.optional(Schema.String),
        limit: Schema.optional(Schema.Number),
        name: Schema.optional(
          Schema.Struct({
            localizedValue: Schema.optional(Schema.String),
            value: Schema.optional(Schema.String),
          }),
        ),
        unit: Schema.optional(Schema.String),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type UsagesGetOutput = typeof UsagesGetOutput.Type;

// The operation
/**
 * Gets the Usage quota configuration.
 *
 * Get the usage quota configuration
 *
 * @param location - The region.
 */
export const UsagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UsagesGetInput,
  outputSchema: UsagesGetOutput,
}));
