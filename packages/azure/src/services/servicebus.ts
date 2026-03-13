/**
 * Azure Servicebus API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const DisasterRecoveryConfigsBreakPairingInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/breakPairing",
    }),
  );
export type DisasterRecoveryConfigsBreakPairingInput =
  typeof DisasterRecoveryConfigsBreakPairingInput.Type;

// Output Schema
export const DisasterRecoveryConfigsBreakPairingOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DisasterRecoveryConfigsBreakPairingOutput =
  typeof DisasterRecoveryConfigsBreakPairingOutput.Type;

// The operation
/**
 * This operation disables the Disaster Recovery and stops replicating changes from primary to secondary namespaces
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsBreakPairing =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsBreakPairingInput,
    outputSchema: DisasterRecoveryConfigsBreakPairingOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/CheckNameAvailability",
    }),
  );
export type DisasterRecoveryConfigsCheckNameAvailabilityInput =
  typeof DisasterRecoveryConfigsCheckNameAvailabilityInput.Type;

// Output Schema
export const DisasterRecoveryConfigsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(
      Schema.Literals([
        "None",
        "InvalidName",
        "SubscriptionIsDisabled",
        "NameInUse",
        "NameInLockdown",
        "TooManyNamespaceInCurrentSubscription",
      ]),
    ),
  });
export type DisasterRecoveryConfigsCheckNameAvailabilityOutput =
  typeof DisasterRecoveryConfigsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the give namespace name availability.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsCheckNameAvailabilityInput,
    outputSchema: DisasterRecoveryConfigsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}",
    }),
  );
export type DisasterRecoveryConfigsCreateOrUpdateInput =
  typeof DisasterRecoveryConfigsCreateOrUpdateInput.Type;

// Output Schema
export const DisasterRecoveryConfigsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsCreateOrUpdateOutput =
  typeof DisasterRecoveryConfigsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a new Alias(Disaster Recovery configuration)
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsCreateOrUpdateInput,
    outputSchema: DisasterRecoveryConfigsCreateOrUpdateOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}",
    }),
  );
export type DisasterRecoveryConfigsDeleteInput =
  typeof DisasterRecoveryConfigsDeleteInput.Type;

// Output Schema
export const DisasterRecoveryConfigsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DisasterRecoveryConfigsDeleteOutput =
  typeof DisasterRecoveryConfigsDeleteOutput.Type;

// The operation
/**
 * Deletes an Alias(Disaster Recovery configuration)
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsDeleteInput,
    outputSchema: DisasterRecoveryConfigsDeleteOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsFailOverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/failover",
    }),
  );
export type DisasterRecoveryConfigsFailOverInput =
  typeof DisasterRecoveryConfigsFailOverInput.Type;

// Output Schema
export const DisasterRecoveryConfigsFailOverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DisasterRecoveryConfigsFailOverOutput =
  typeof DisasterRecoveryConfigsFailOverOutput.Type;

// The operation
/**
 * Invokes GEO DR failover and reconfigure the alias to point to the secondary namespace
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsFailOver =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsFailOverInput,
    outputSchema: DisasterRecoveryConfigsFailOverOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}",
    }),
  );
export type DisasterRecoveryConfigsGetInput =
  typeof DisasterRecoveryConfigsGetInput.Type;

// Output Schema
export const DisasterRecoveryConfigsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsGetOutput =
  typeof DisasterRecoveryConfigsGetOutput.Type;

// The operation
/**
 * Retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DisasterRecoveryConfigsGetInput,
    outputSchema: DisasterRecoveryConfigsGetOutput,
  }),
);
// Input Schema
export const DisasterRecoveryConfigsGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type DisasterRecoveryConfigsGetAuthorizationRuleInput =
  typeof DisasterRecoveryConfigsGetAuthorizationRuleInput.Type;

// Output Schema
export const DisasterRecoveryConfigsGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsGetAuthorizationRuleOutput =
  typeof DisasterRecoveryConfigsGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Gets an authorization rule for a namespace by rule name.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsGetAuthorizationRuleInput,
    outputSchema: DisasterRecoveryConfigsGetAuthorizationRuleOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs",
    }),
  );
export type DisasterRecoveryConfigsListInput =
  typeof DisasterRecoveryConfigsListInput.Type;

// Output Schema
export const DisasterRecoveryConfigsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsListOutput =
  typeof DisasterRecoveryConfigsListOutput.Type;

// The operation
/**
 * Gets all Alias(Disaster Recovery configurations)
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DisasterRecoveryConfigsListInput,
    outputSchema: DisasterRecoveryConfigsListOutput,
  }),
);
// Input Schema
export const DisasterRecoveryConfigsListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/authorizationRules",
    }),
  );
export type DisasterRecoveryConfigsListAuthorizationRulesInput =
  typeof DisasterRecoveryConfigsListAuthorizationRulesInput.Type;

// Output Schema
export const DisasterRecoveryConfigsListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsListAuthorizationRulesOutput =
  typeof DisasterRecoveryConfigsListAuthorizationRulesOutput.Type;

// The operation
/**
 * Gets the authorization rules for a namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsListAuthorizationRulesInput,
    outputSchema: DisasterRecoveryConfigsListAuthorizationRulesOutput,
  }));
// Input Schema
export const DisasterRecoveryConfigsListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    alias: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/disasterRecoveryConfigs/{alias}/authorizationRules/{authorizationRuleName}/listKeys",
    }),
  );
export type DisasterRecoveryConfigsListKeysInput =
  typeof DisasterRecoveryConfigsListKeysInput.Type;

// Output Schema
export const DisasterRecoveryConfigsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type DisasterRecoveryConfigsListKeysOutput =
  typeof DisasterRecoveryConfigsListKeysOutput.Type;

// The operation
/**
 * Gets the primary and secondary connection strings for the namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param alias - The Disaster Recovery configuration name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const DisasterRecoveryConfigsListKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisasterRecoveryConfigsListKeysInput,
    outputSchema: DisasterRecoveryConfigsListKeysOutput,
  }));
// Input Schema
export const MigrationConfigsCompleteMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    configName: Schema.Literals(["$default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}/upgrade",
    }),
  );
export type MigrationConfigsCompleteMigrationInput =
  typeof MigrationConfigsCompleteMigrationInput.Type;

// Output Schema
export const MigrationConfigsCompleteMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MigrationConfigsCompleteMigrationOutput =
  typeof MigrationConfigsCompleteMigrationOutput.Type;

// The operation
/**
 * This operation Completes Migration of entities by pointing the connection strings to Premium namespace and any entities created after the operation will be under Premium Namespace. CompleteMigration operation will fail when entity migration is in-progress.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param configName - The configuration name. Should always be "$default".
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const MigrationConfigsCompleteMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrationConfigsCompleteMigrationInput,
    outputSchema: MigrationConfigsCompleteMigrationOutput,
  }));
// Input Schema
export const MigrationConfigsCreateAndStartMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    configName: Schema.Literals(["$default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}",
    }),
  );
export type MigrationConfigsCreateAndStartMigrationInput =
  typeof MigrationConfigsCreateAndStartMigrationInput.Type;

// Output Schema
export const MigrationConfigsCreateAndStartMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type MigrationConfigsCreateAndStartMigrationOutput =
  typeof MigrationConfigsCreateAndStartMigrationOutput.Type;

// The operation
/**
 * Creates Migration configuration and starts migration of entities from Standard to Premium namespace
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param configName - The configuration name. Should always be "$default".
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const MigrationConfigsCreateAndStartMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrationConfigsCreateAndStartMigrationInput,
    outputSchema: MigrationConfigsCreateAndStartMigrationOutput,
  }));
// Input Schema
export const MigrationConfigsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    configName: Schema.Literals(["$default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}",
    }),
  );
export type MigrationConfigsDeleteInput =
  typeof MigrationConfigsDeleteInput.Type;

// Output Schema
export const MigrationConfigsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MigrationConfigsDeleteOutput =
  typeof MigrationConfigsDeleteOutput.Type;

// The operation
/**
 * Deletes a MigrationConfiguration
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param configName - The configuration name. Should always be "$default".
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const MigrationConfigsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MigrationConfigsDeleteInput,
    outputSchema: MigrationConfigsDeleteOutput,
  }),
);
// Input Schema
export const MigrationConfigsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    configName: Schema.Literals(["$default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}",
    }),
  );
export type MigrationConfigsGetInput = typeof MigrationConfigsGetInput.Type;

// Output Schema
export const MigrationConfigsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type MigrationConfigsGetOutput = typeof MigrationConfigsGetOutput.Type;

// The operation
/**
 * Retrieves Migration Config
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param configName - The configuration name. Should always be "$default".
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const MigrationConfigsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MigrationConfigsGetInput,
  outputSchema: MigrationConfigsGetOutput,
}));
// Input Schema
export const MigrationConfigsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations",
    }),
  );
export type MigrationConfigsListInput = typeof MigrationConfigsListInput.Type;

// Output Schema
export const MigrationConfigsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MigrationConfigsListOutput = typeof MigrationConfigsListOutput.Type;

// The operation
/**
 * Gets all migrationConfigurations
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const MigrationConfigsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MigrationConfigsListInput,
    outputSchema: MigrationConfigsListOutput,
  }),
);
// Input Schema
export const MigrationConfigsRevertInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    configName: Schema.Literals(["$default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/migrationConfigurations/{configName}/revert",
    }),
  );
export type MigrationConfigsRevertInput =
  typeof MigrationConfigsRevertInput.Type;

// Output Schema
export const MigrationConfigsRevertOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MigrationConfigsRevertOutput =
  typeof MigrationConfigsRevertOutput.Type;

// The operation
/**
 * This operation reverts Migration
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param configName - The configuration name. Should always be "$default".
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const MigrationConfigsRevert = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MigrationConfigsRevertInput,
    outputSchema: MigrationConfigsRevertOutput,
  }),
);
// Input Schema
export const NamespacesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceBus/CheckNameAvailability",
    }),
  );
export type NamespacesCheckNameAvailabilityInput =
  typeof NamespacesCheckNameAvailabilityInput.Type;

// Output Schema
export const NamespacesCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(
      Schema.Literals([
        "None",
        "InvalidName",
        "SubscriptionIsDisabled",
        "NameInUse",
        "NameInLockdown",
        "TooManyNamespaceInCurrentSubscription",
      ]),
    ),
  });
export type NamespacesCheckNameAvailabilityOutput =
  typeof NamespacesCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the give namespace name availability.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCheckNameAvailabilityInput,
    outputSchema: NamespacesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const NamespacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}",
    }),
  );
export type NamespacesCreateOrUpdateInput =
  typeof NamespacesCreateOrUpdateInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type NamespacesCreateOrUpdateOutput =
  typeof NamespacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesCreateOrUpdateInput,
    outputSchema: NamespacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const NamespacesCreateOrUpdateAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesCreateOrUpdateAuthorizationRuleInput =
  typeof NamespacesCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type NamespacesCreateOrUpdateAuthorizationRuleOutput =
  typeof NamespacesCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates or updates an authorization rule for a namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCreateOrUpdateAuthorizationRuleInput,
    outputSchema: NamespacesCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesCreateOrUpdateNetworkRuleSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/networkRuleSets/default",
    }),
  );
export type NamespacesCreateOrUpdateNetworkRuleSetInput =
  typeof NamespacesCreateOrUpdateNetworkRuleSetInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateNetworkRuleSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type NamespacesCreateOrUpdateNetworkRuleSetOutput =
  typeof NamespacesCreateOrUpdateNetworkRuleSetOutput.Type;

// The operation
/**
 * Create or update NetworkRuleSet for a Namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesCreateOrUpdateNetworkRuleSet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCreateOrUpdateNetworkRuleSetInput,
    outputSchema: NamespacesCreateOrUpdateNetworkRuleSetOutput,
  }));
// Input Schema
export const NamespacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}",
  }),
);
export type NamespacesDeleteInput = typeof NamespacesDeleteInput.Type;

// Output Schema
export const NamespacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespacesDeleteOutput = typeof NamespacesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing namespace. This operation also removes all associated resources under the namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesDeleteInput,
  outputSchema: NamespacesDeleteOutput,
}));
// Input Schema
export const NamespacesDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesDeleteAuthorizationRuleInput =
  typeof NamespacesDeleteAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesDeleteAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type NamespacesDeleteAuthorizationRuleOutput =
  typeof NamespacesDeleteAuthorizationRuleOutput.Type;

// The operation
/**
 * Deletes a namespace authorization rule.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesDeleteAuthorizationRuleInput,
    outputSchema: NamespacesDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}",
  }),
);
export type NamespacesGetInput = typeof NamespacesGetInput.Type;

// Output Schema
export const NamespacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type NamespacesGetOutput = typeof NamespacesGetOutput.Type;

// The operation
/**
 * Gets a description for the specified namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesGetInput,
  outputSchema: NamespacesGetOutput,
}));
// Input Schema
export const NamespacesGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesGetAuthorizationRuleInput =
  typeof NamespacesGetAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type NamespacesGetAuthorizationRuleOutput =
  typeof NamespacesGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Gets an authorization rule for a namespace by rule name.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesGetAuthorizationRuleInput,
    outputSchema: NamespacesGetAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesGetNetworkRuleSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/networkRuleSets/default",
    }),
  );
export type NamespacesGetNetworkRuleSetInput =
  typeof NamespacesGetNetworkRuleSetInput.Type;

// Output Schema
export const NamespacesGetNetworkRuleSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type NamespacesGetNetworkRuleSetOutput =
  typeof NamespacesGetNetworkRuleSetOutput.Type;

// The operation
/**
 * Gets NetworkRuleSet for a Namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesGetNetworkRuleSet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesGetNetworkRuleSetInput,
    outputSchema: NamespacesGetNetworkRuleSetOutput,
  }),
);
// Input Schema
export const NamespacesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceBus/namespaces",
  }),
);
export type NamespacesListInput = typeof NamespacesListInput.Type;

// Output Schema
export const NamespacesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        location: Schema.String,
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type NamespacesListOutput = typeof NamespacesListOutput.Type;

// The operation
/**
 * Gets all the available namespaces within the subscription, irrespective of the resource groups.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesListInput,
  outputSchema: NamespacesListOutput,
}));
// Input Schema
export const NamespacesListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules",
    }),
  );
export type NamespacesListAuthorizationRulesInput =
  typeof NamespacesListAuthorizationRulesInput.Type;

// Output Schema
export const NamespacesListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListAuthorizationRulesOutput =
  typeof NamespacesListAuthorizationRulesOutput.Type;

// The operation
/**
 * Gets the authorization rules for a namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListAuthorizationRulesInput,
    outputSchema: NamespacesListAuthorizationRulesOutput,
  }));
// Input Schema
export const NamespacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces",
    }),
  );
export type NamespacesListByResourceGroupInput =
  typeof NamespacesListByResourceGroupInput.Type;

// Output Schema
export const NamespacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListByResourceGroupOutput =
  typeof NamespacesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets the available namespaces within a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListByResourceGroupInput,
    outputSchema: NamespacesListByResourceGroupOutput,
  }));
// Input Schema
export const NamespacesListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}/listKeys",
    }),
  );
export type NamespacesListKeysInput = typeof NamespacesListKeysInput.Type;

// Output Schema
export const NamespacesListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NamespacesListKeysOutput = typeof NamespacesListKeysOutput.Type;

// The operation
/**
 * Gets the primary and secondary connection strings for the namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesListKeysInput,
  outputSchema: NamespacesListKeysOutput,
}));
// Input Schema
export const NamespacesListNetworkRuleSetsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/networkRuleSets",
    }),
  );
export type NamespacesListNetworkRuleSetsInput =
  typeof NamespacesListNetworkRuleSetsInput.Type;

// Output Schema
export const NamespacesListNetworkRuleSetsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListNetworkRuleSetsOutput =
  typeof NamespacesListNetworkRuleSetsOutput.Type;

// The operation
/**
 * Gets list of NetworkRuleSet for a Namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesListNetworkRuleSets =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListNetworkRuleSetsInput,
    outputSchema: NamespacesListNetworkRuleSetsOutput,
  }));
// Input Schema
export const NamespacesRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type NamespacesRegenerateKeysInput =
  typeof NamespacesRegenerateKeysInput.Type;

// Output Schema
export const NamespacesRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NamespacesRegenerateKeysOutput =
  typeof NamespacesRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates the primary or secondary connection strings for the namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesRegenerateKeysInput,
    outputSchema: NamespacesRegenerateKeysOutput,
  }),
);
// Input Schema
export const NamespacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}",
  }),
);
export type NamespacesUpdateInput = typeof NamespacesUpdateInput.Type;

// Output Schema
export const NamespacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  },
);
export type NamespacesUpdateOutput = typeof NamespacesUpdateOutput.Type;

// The operation
/**
 * Updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const NamespacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesUpdateInput,
  outputSchema: NamespacesUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.ServiceBus/operations" }),
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
 * Lists all of the available ServiceBus REST API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates PrivateEndpointConnections of service namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param privateEndpointConnectionName - The PrivateEndpointConnection name
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
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes an existing Private Endpoint Connection.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param privateEndpointConnectionName - The PrivateEndpointConnection name
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
    namespaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets a description for the specified Private Endpoint Connection.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param privateEndpointConnectionName - The PrivateEndpointConnection name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
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
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/privateEndpointConnections",
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
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * Gets the available PrivateEndpointConnections within a namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          properties: Schema.optional(
            Schema.Struct({
              groupId: Schema.optional(Schema.String),
              requiredMembers: Schema.optional(Schema.Array(Schema.String)),
              requiredZoneNames: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets lists of resources that supports Privatelinks.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const QueuesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    queueName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}",
    }),
  );
export type QueuesCreateOrUpdateInput = typeof QueuesCreateOrUpdateInput.Type;

// Output Schema
export const QueuesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type QueuesCreateOrUpdateOutput = typeof QueuesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Service Bus queue. This operation is idempotent.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param queueName - The queue name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const QueuesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QueuesCreateOrUpdateInput,
    outputSchema: QueuesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const QueuesCreateOrUpdateAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    queueName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type QueuesCreateOrUpdateAuthorizationRuleInput =
  typeof QueuesCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const QueuesCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type QueuesCreateOrUpdateAuthorizationRuleOutput =
  typeof QueuesCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates an authorization rule for a queue.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param queueName - The queue name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const QueuesCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QueuesCreateOrUpdateAuthorizationRuleInput,
    outputSchema: QueuesCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const QueuesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  queueName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}",
  }),
);
export type QueuesDeleteInput = typeof QueuesDeleteInput.Type;

// Output Schema
export const QueuesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type QueuesDeleteOutput = typeof QueuesDeleteOutput.Type;

// The operation
/**
 * Deletes a queue from the specified namespace in a resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param queueName - The queue name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const QueuesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueuesDeleteInput,
  outputSchema: QueuesDeleteOutput,
}));
// Input Schema
export const QueuesDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    queueName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type QueuesDeleteAuthorizationRuleInput =
  typeof QueuesDeleteAuthorizationRuleInput.Type;

// Output Schema
export const QueuesDeleteAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type QueuesDeleteAuthorizationRuleOutput =
  typeof QueuesDeleteAuthorizationRuleOutput.Type;

// The operation
/**
 * Deletes a queue authorization rule.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param queueName - The queue name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const QueuesDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QueuesDeleteAuthorizationRuleInput,
    outputSchema: QueuesDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const QueuesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  queueName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}",
  }),
);
export type QueuesGetInput = typeof QueuesGetInput.Type;

// Output Schema
export const QueuesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
});
export type QueuesGetOutput = typeof QueuesGetOutput.Type;

// The operation
/**
 * Returns a description for the specified queue.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param queueName - The queue name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const QueuesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueuesGetInput,
  outputSchema: QueuesGetOutput,
}));
// Input Schema
export const QueuesGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    queueName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type QueuesGetAuthorizationRuleInput =
  typeof QueuesGetAuthorizationRuleInput.Type;

// Output Schema
export const QueuesGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type QueuesGetAuthorizationRuleOutput =
  typeof QueuesGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Gets an authorization rule for a queue by rule name.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param queueName - The queue name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const QueuesGetAuthorizationRule = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QueuesGetAuthorizationRuleInput,
    outputSchema: QueuesGetAuthorizationRuleOutput,
  }),
);
// Input Schema
export const QueuesListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    queueName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules",
    }),
  );
export type QueuesListAuthorizationRulesInput =
  typeof QueuesListAuthorizationRulesInput.Type;

// Output Schema
export const QueuesListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type QueuesListAuthorizationRulesOutput =
  typeof QueuesListAuthorizationRulesOutput.Type;

// The operation
/**
 * Gets all authorization rules for a queue.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param queueName - The queue name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const QueuesListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: QueuesListAuthorizationRulesInput,
    outputSchema: QueuesListAuthorizationRulesOutput,
  }));
// Input Schema
export const QueuesListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues",
    }),
  );
export type QueuesListByNamespaceInput = typeof QueuesListByNamespaceInput.Type;

// Output Schema
export const QueuesListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type QueuesListByNamespaceOutput =
  typeof QueuesListByNamespaceOutput.Type;

// The operation
/**
 * Gets the queues within a namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param $skip - Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the most recent N usageDetails.
 */
export const QueuesListByNamespace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QueuesListByNamespaceInput,
    outputSchema: QueuesListByNamespaceOutput,
  }),
);
// Input Schema
export const QueuesListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  queueName: Schema.String.pipe(T.PathParam()),
  authorizationRuleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}/ListKeys",
  }),
);
export type QueuesListKeysInput = typeof QueuesListKeysInput.Type;

// Output Schema
export const QueuesListKeysOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  primaryConnectionString: Schema.optional(Schema.String),
  secondaryConnectionString: Schema.optional(Schema.String),
  aliasPrimaryConnectionString: Schema.optional(Schema.String),
  aliasSecondaryConnectionString: Schema.optional(Schema.String),
  primaryKey: Schema.optional(Schema.String),
  secondaryKey: Schema.optional(Schema.String),
  keyName: Schema.optional(Schema.String),
});
export type QueuesListKeysOutput = typeof QueuesListKeysOutput.Type;

// The operation
/**
 * Primary and secondary connection strings to the queue.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param queueName - The queue name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const QueuesListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QueuesListKeysInput,
  outputSchema: QueuesListKeysOutput,
}));
// Input Schema
export const QueuesRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    queueName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/queues/{queueName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type QueuesRegenerateKeysInput = typeof QueuesRegenerateKeysInput.Type;

// Output Schema
export const QueuesRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type QueuesRegenerateKeysOutput = typeof QueuesRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates the primary or secondary connection strings to the queue.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param queueName - The queue name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const QueuesRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: QueuesRegenerateKeysInput,
    outputSchema: QueuesRegenerateKeysOutput,
  }),
);
// Input Schema
export const RulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    subscriptionName: Schema.String.pipe(T.PathParam()),
    ruleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}/rules/{ruleName}",
    }),
  );
export type RulesCreateOrUpdateInput = typeof RulesCreateOrUpdateInput.Type;

// Output Schema
export const RulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type RulesCreateOrUpdateOutput = typeof RulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new rule and updates an existing rule
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param subscriptionName - The subscription name.
 * @param ruleName - The rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const RulesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesCreateOrUpdateInput,
  outputSchema: RulesCreateOrUpdateOutput,
}));
// Input Schema
export const RulesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
  subscriptionName: Schema.String.pipe(T.PathParam()),
  ruleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}/rules/{ruleName}",
  }),
);
export type RulesDeleteInput = typeof RulesDeleteInput.Type;

// Output Schema
export const RulesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RulesDeleteOutput = typeof RulesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing rule.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param subscriptionName - The subscription name.
 * @param ruleName - The rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const RulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesDeleteInput,
  outputSchema: RulesDeleteOutput,
}));
// Input Schema
export const RulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
  subscriptionName: Schema.String.pipe(T.PathParam()),
  ruleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}/rules/{ruleName}",
  }),
);
export type RulesGetInput = typeof RulesGetInput.Type;

// Output Schema
export const RulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
});
export type RulesGetOutput = typeof RulesGetOutput.Type;

// The operation
/**
 * Retrieves the description for the specified rule.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param subscriptionName - The subscription name.
 * @param ruleName - The rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const RulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RulesGetInput,
  outputSchema: RulesGetOutput,
}));
// Input Schema
export const RulesListBySubscriptionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    subscriptionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}/rules",
    }),
  );
export type RulesListBySubscriptionsInput =
  typeof RulesListBySubscriptionsInput.Type;

// Output Schema
export const RulesListBySubscriptionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type RulesListBySubscriptionsOutput =
  typeof RulesListBySubscriptionsOutput.Type;

// The operation
/**
 * List all the rules within given topic-subscription
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param subscriptionName - The subscription name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param $skip - Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the most recent N usageDetails.
 */
export const RulesListBySubscriptions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RulesListBySubscriptionsInput,
    outputSchema: RulesListBySubscriptionsOutput,
  }),
);
// Input Schema
export const SubscriptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    subscriptionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}",
    }),
  );
export type SubscriptionsCreateOrUpdateInput =
  typeof SubscriptionsCreateOrUpdateInput.Type;

// Output Schema
export const SubscriptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type SubscriptionsCreateOrUpdateOutput =
  typeof SubscriptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a topic subscription.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param subscriptionName - The subscription name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const SubscriptionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubscriptionsCreateOrUpdateInput,
    outputSchema: SubscriptionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SubscriptionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    subscriptionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}",
    }),
  );
export type SubscriptionsDeleteInput = typeof SubscriptionsDeleteInput.Type;

// Output Schema
export const SubscriptionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SubscriptionsDeleteOutput = typeof SubscriptionsDeleteOutput.Type;

// The operation
/**
 * Deletes a subscription from the specified topic.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param subscriptionName - The subscription name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const SubscriptionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubscriptionsDeleteInput,
  outputSchema: SubscriptionsDeleteOutput,
}));
// Input Schema
export const SubscriptionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
  subscriptionName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions/{subscriptionName}",
  }),
);
export type SubscriptionsGetInput = typeof SubscriptionsGetInput.Type;

// Output Schema
export const SubscriptionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  },
);
export type SubscriptionsGetOutput = typeof SubscriptionsGetOutput.Type;

// The operation
/**
 * Returns a subscription description for the specified topic.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param subscriptionName - The subscription name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const SubscriptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubscriptionsGetInput,
  outputSchema: SubscriptionsGetOutput,
}));
// Input Schema
export const SubscriptionsListByTopicInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/subscriptions",
    }),
  );
export type SubscriptionsListByTopicInput =
  typeof SubscriptionsListByTopicInput.Type;

// Output Schema
export const SubscriptionsListByTopicOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SubscriptionsListByTopicOutput =
  typeof SubscriptionsListByTopicOutput.Type;

// The operation
/**
 * List all the subscriptions under a specified topic.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param $skip - Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the most recent N usageDetails.
 */
export const SubscriptionsListByTopic = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubscriptionsListByTopicInput,
    outputSchema: SubscriptionsListByTopicOutput,
  }),
);
// Input Schema
export const TopicsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}",
    }),
  );
export type TopicsCreateOrUpdateInput = typeof TopicsCreateOrUpdateInput.Type;

// Output Schema
export const TopicsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type TopicsCreateOrUpdateOutput = typeof TopicsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a topic in the specified namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const TopicsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicsCreateOrUpdateInput,
    outputSchema: TopicsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const TopicsCreateOrUpdateAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type TopicsCreateOrUpdateAuthorizationRuleInput =
  typeof TopicsCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const TopicsCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type TopicsCreateOrUpdateAuthorizationRuleOutput =
  typeof TopicsCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates an authorization rule for the specified topic.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const TopicsCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TopicsCreateOrUpdateAuthorizationRuleInput,
    outputSchema: TopicsCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const TopicsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}",
  }),
);
export type TopicsDeleteInput = typeof TopicsDeleteInput.Type;

// Output Schema
export const TopicsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TopicsDeleteOutput = typeof TopicsDeleteOutput.Type;

// The operation
/**
 * Deletes a topic from the specified namespace and resource group.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const TopicsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsDeleteInput,
  outputSchema: TopicsDeleteOutput,
}));
// Input Schema
export const TopicsDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type TopicsDeleteAuthorizationRuleInput =
  typeof TopicsDeleteAuthorizationRuleInput.Type;

// Output Schema
export const TopicsDeleteAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TopicsDeleteAuthorizationRuleOutput =
  typeof TopicsDeleteAuthorizationRuleOutput.Type;

// The operation
/**
 * Deletes a topic authorization rule.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const TopicsDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TopicsDeleteAuthorizationRuleInput,
    outputSchema: TopicsDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const TopicsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}",
  }),
);
export type TopicsGetInput = typeof TopicsGetInput.Type;

// Output Schema
export const TopicsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
});
export type TopicsGetOutput = typeof TopicsGetOutput.Type;

// The operation
/**
 * Returns a description for the specified topic.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const TopicsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsGetInput,
  outputSchema: TopicsGetOutput,
}));
// Input Schema
export const TopicsGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type TopicsGetAuthorizationRuleInput =
  typeof TopicsGetAuthorizationRuleInput.Type;

// Output Schema
export const TopicsGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    location: Schema.optional(Schema.String),
  });
export type TopicsGetAuthorizationRuleOutput =
  typeof TopicsGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Returns the specified authorization rule.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const TopicsGetAuthorizationRule = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicsGetAuthorizationRuleInput,
    outputSchema: TopicsGetAuthorizationRuleOutput,
  }),
);
// Input Schema
export const TopicsListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules",
    }),
  );
export type TopicsListAuthorizationRulesInput =
  typeof TopicsListAuthorizationRulesInput.Type;

// Output Schema
export const TopicsListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TopicsListAuthorizationRulesOutput =
  typeof TopicsListAuthorizationRulesOutput.Type;

// The operation
/**
 * Gets authorization rules for a topic.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const TopicsListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TopicsListAuthorizationRulesInput,
    outputSchema: TopicsListAuthorizationRulesOutput,
  }));
// Input Schema
export const TopicsListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics",
    }),
  );
export type TopicsListByNamespaceInput = typeof TopicsListByNamespaceInput.Type;

// Output Schema
export const TopicsListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
          location: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type TopicsListByNamespaceOutput =
  typeof TopicsListByNamespaceOutput.Type;

// The operation
/**
 * Gets all the topics in a namespace.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 * @param $skip - Skip is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skip parameter that specifies a starting point to use for subsequent calls.
 * @param $top - May be used to limit the number of results to the most recent N usageDetails.
 */
export const TopicsListByNamespace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicsListByNamespaceInput,
    outputSchema: TopicsListByNamespaceOutput,
  }),
);
// Input Schema
export const TopicsListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  topicName: Schema.String.pipe(T.PathParam()),
  authorizationRuleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}/ListKeys",
  }),
);
export type TopicsListKeysInput = typeof TopicsListKeysInput.Type;

// Output Schema
export const TopicsListKeysOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  primaryConnectionString: Schema.optional(Schema.String),
  secondaryConnectionString: Schema.optional(Schema.String),
  aliasPrimaryConnectionString: Schema.optional(Schema.String),
  aliasSecondaryConnectionString: Schema.optional(Schema.String),
  primaryKey: Schema.optional(Schema.String),
  secondaryKey: Schema.optional(Schema.String),
  keyName: Schema.optional(Schema.String),
});
export type TopicsListKeysOutput = typeof TopicsListKeysOutput.Type;

// The operation
/**
 * Gets the primary and secondary connection strings for the topic.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const TopicsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TopicsListKeysInput,
  outputSchema: TopicsListKeysOutput,
}));
// Input Schema
export const TopicsRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    topicName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/{namespaceName}/topics/{topicName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type TopicsRegenerateKeysInput = typeof TopicsRegenerateKeysInput.Type;

// Output Schema
export const TopicsRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    aliasPrimaryConnectionString: Schema.optional(Schema.String),
    aliasSecondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type TopicsRegenerateKeysOutput = typeof TopicsRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates primary or secondary connection strings for the topic.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param topicName - The topic name.
 * @param authorizationRuleName - The authorization rule name.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - Subscription credentials that uniquely identify a Microsoft Azure subscription. The subscription ID forms part of the URI for every service call.
 */
export const TopicsRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TopicsRegenerateKeysInput,
    outputSchema: TopicsRegenerateKeysOutput,
  }),
);
