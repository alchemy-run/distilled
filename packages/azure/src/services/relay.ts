/**
 * Azure Relay API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const HybridConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    hybridConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections/{hybridConnectionName}",
    }),
  );
export type HybridConnectionsCreateOrUpdateInput =
  typeof HybridConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const HybridConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HybridConnectionsCreateOrUpdateOutput =
  typeof HybridConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a service hybrid connection. This operation is idempotent.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param hybridConnectionName - The hybrid connection name.
 */
export const HybridConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridConnectionsCreateOrUpdateInput,
    outputSchema: HybridConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const HybridConnectionsCreateOrUpdateAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    hybridConnectionName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections/{hybridConnectionName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type HybridConnectionsCreateOrUpdateAuthorizationRuleInput =
  typeof HybridConnectionsCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const HybridConnectionsCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HybridConnectionsCreateOrUpdateAuthorizationRuleOutput =
  typeof HybridConnectionsCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates or updates an authorization rule for a hybrid connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param hybridConnectionName - The hybrid connection name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const HybridConnectionsCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridConnectionsCreateOrUpdateAuthorizationRuleInput,
    outputSchema: HybridConnectionsCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const HybridConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    hybridConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections/{hybridConnectionName}",
    }),
  );
export type HybridConnectionsDeleteInput =
  typeof HybridConnectionsDeleteInput.Type;

// Output Schema
export const HybridConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HybridConnectionsDeleteOutput =
  typeof HybridConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a hybrid connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param hybridConnectionName - The hybrid connection name.
 */
export const HybridConnectionsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridConnectionsDeleteInput,
    outputSchema: HybridConnectionsDeleteOutput,
  }),
);
// Input Schema
export const HybridConnectionsDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    hybridConnectionName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections/{hybridConnectionName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type HybridConnectionsDeleteAuthorizationRuleInput =
  typeof HybridConnectionsDeleteAuthorizationRuleInput.Type;

// Output Schema
export const HybridConnectionsDeleteAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type HybridConnectionsDeleteAuthorizationRuleOutput =
  typeof HybridConnectionsDeleteAuthorizationRuleOutput.Type;

// The operation
/**
 * Deletes a hybrid connection authorization rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param hybridConnectionName - The hybrid connection name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const HybridConnectionsDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridConnectionsDeleteAuthorizationRuleInput,
    outputSchema: HybridConnectionsDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const HybridConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    hybridConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections/{hybridConnectionName}",
    }),
  );
export type HybridConnectionsGetInput = typeof HybridConnectionsGetInput.Type;

// Output Schema
export const HybridConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HybridConnectionsGetOutput = typeof HybridConnectionsGetOutput.Type;

// The operation
/**
 * Returns the description for the specified hybrid connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param hybridConnectionName - The hybrid connection name.
 */
export const HybridConnectionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridConnectionsGetInput,
    outputSchema: HybridConnectionsGetOutput,
  }),
);
// Input Schema
export const HybridConnectionsGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    hybridConnectionName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections/{hybridConnectionName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type HybridConnectionsGetAuthorizationRuleInput =
  typeof HybridConnectionsGetAuthorizationRuleInput.Type;

// Output Schema
export const HybridConnectionsGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type HybridConnectionsGetAuthorizationRuleOutput =
  typeof HybridConnectionsGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Hybrid connection authorization rule for a hybrid connection by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param hybridConnectionName - The hybrid connection name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const HybridConnectionsGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridConnectionsGetAuthorizationRuleInput,
    outputSchema: HybridConnectionsGetAuthorizationRuleOutput,
  }));
// Input Schema
export const HybridConnectionsListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    hybridConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections/{hybridConnectionName}/authorizationRules",
    }),
  );
export type HybridConnectionsListAuthorizationRulesInput =
  typeof HybridConnectionsListAuthorizationRulesInput.Type;

// Output Schema
export const HybridConnectionsListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HybridConnectionsListAuthorizationRulesOutput =
  typeof HybridConnectionsListAuthorizationRulesOutput.Type;

// The operation
/**
 * Authorization rules for a hybrid connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param hybridConnectionName - The hybrid connection name.
 */
export const HybridConnectionsListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridConnectionsListAuthorizationRulesInput,
    outputSchema: HybridConnectionsListAuthorizationRulesOutput,
  }));
// Input Schema
export const HybridConnectionsListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections",
    }),
  );
export type HybridConnectionsListByNamespaceInput =
  typeof HybridConnectionsListByNamespaceInput.Type;

// Output Schema
export const HybridConnectionsListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type HybridConnectionsListByNamespaceOutput =
  typeof HybridConnectionsListByNamespaceOutput.Type;

// The operation
/**
 * Lists the hybrid connection within the namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 */
export const HybridConnectionsListByNamespace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridConnectionsListByNamespaceInput,
    outputSchema: HybridConnectionsListByNamespaceOutput,
  }));
// Input Schema
export const HybridConnectionsListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    hybridConnectionName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections/{hybridConnectionName}/authorizationRules/{authorizationRuleName}/listKeys",
    }),
  );
export type HybridConnectionsListKeysInput =
  typeof HybridConnectionsListKeysInput.Type;

// Output Schema
export const HybridConnectionsListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type HybridConnectionsListKeysOutput =
  typeof HybridConnectionsListKeysOutput.Type;

// The operation
/**
 * Primary and secondary connection strings to the hybrid connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param hybridConnectionName - The hybrid connection name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const HybridConnectionsListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: HybridConnectionsListKeysInput,
    outputSchema: HybridConnectionsListKeysOutput,
  }),
);
// Input Schema
export const HybridConnectionsRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    hybridConnectionName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/hybridConnections/{hybridConnectionName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type HybridConnectionsRegenerateKeysInput =
  typeof HybridConnectionsRegenerateKeysInput.Type;

// Output Schema
export const HybridConnectionsRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type HybridConnectionsRegenerateKeysOutput =
  typeof HybridConnectionsRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates the primary or secondary connection strings to the hybrid connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param hybridConnectionName - The hybrid connection name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const HybridConnectionsRegenerateKeys =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: HybridConnectionsRegenerateKeysInput,
    outputSchema: HybridConnectionsRegenerateKeysOutput,
  }));
// Input Schema
export const NamespacesCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Relay/checkNameAvailability",
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
 * Check the specified namespace name availability.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NamespacesCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCheckNameAvailabilityInput,
    outputSchema: NamespacesCheckNameAvailabilityOutput,
  }));
// Input Schema
export const NamespacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}",
    }),
  );
export type NamespacesCreateOrUpdateInput =
  typeof NamespacesCreateOrUpdateInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type NamespacesCreateOrUpdateOutput =
  typeof NamespacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Azure Relay namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
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
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesCreateOrUpdateAuthorizationRuleInput =
  typeof NamespacesCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NamespacesCreateOrUpdateAuthorizationRuleOutput =
  typeof NamespacesCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates or updates an authorization rule for a namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 */
export const NamespacesCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCreateOrUpdateAuthorizationRuleInput,
    outputSchema: NamespacesCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesCreateOrUpdateNetworkRuleSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/networkRuleSets/default",
    }),
  );
export type NamespacesCreateOrUpdateNetworkRuleSetInput =
  typeof NamespacesCreateOrUpdateNetworkRuleSetInput.Type;

// Output Schema
export const NamespacesCreateOrUpdateNetworkRuleSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NamespacesCreateOrUpdateNetworkRuleSetOutput =
  typeof NamespacesCreateOrUpdateNetworkRuleSetOutput.Type;

// The operation
/**
 * Create or update NetworkRuleSet for a Namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 */
export const NamespacesCreateOrUpdateNetworkRuleSet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesCreateOrUpdateNetworkRuleSetInput,
    outputSchema: NamespacesCreateOrUpdateNetworkRuleSetOutput,
  }));
// Input Schema
export const NamespacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}",
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
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 */
export const NamespacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesDeleteInput,
  outputSchema: NamespacesDeleteOutput,
}));
// Input Schema
export const NamespacesDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}",
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
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 */
export const NamespacesDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesDeleteAuthorizationRuleInput,
    outputSchema: NamespacesDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}",
  }),
);
export type NamespacesGetInput = typeof NamespacesGetInput.Type;

// Output Schema
export const NamespacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type NamespacesGetOutput = typeof NamespacesGetOutput.Type;

// The operation
/**
 * Returns the description for the specified namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 */
export const NamespacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesGetInput,
  outputSchema: NamespacesGetOutput,
}));
// Input Schema
export const NamespacesGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type NamespacesGetAuthorizationRuleInput =
  typeof NamespacesGetAuthorizationRuleInput.Type;

// Output Schema
export const NamespacesGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NamespacesGetAuthorizationRuleOutput =
  typeof NamespacesGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Authorization rule for a namespace by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 */
export const NamespacesGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesGetAuthorizationRuleInput,
    outputSchema: NamespacesGetAuthorizationRuleOutput,
  }));
// Input Schema
export const NamespacesGetNetworkRuleSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/networkRuleSets/default",
    }),
  );
export type NamespacesGetNetworkRuleSetInput =
  typeof NamespacesGetNetworkRuleSetInput.Type;

// Output Schema
export const NamespacesGetNetworkRuleSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NamespacesGetNetworkRuleSetOutput =
  typeof NamespacesGetNetworkRuleSetOutput.Type;

// The operation
/**
 * Gets NetworkRuleSet for a Namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
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
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Relay/namespaces",
  }),
);
export type NamespacesListInput = typeof NamespacesListInput.Type;

// Output Schema
export const NamespacesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type NamespacesListOutput = typeof NamespacesListOutput.Type;

// The operation
/**
 * Lists all the available namespaces within the subscription regardless of the resourceGroups.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const NamespacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesListInput,
  outputSchema: NamespacesListOutput,
}));
// Input Schema
export const NamespacesListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules",
    }),
  );
export type NamespacesListAuthorizationRulesInput =
  typeof NamespacesListAuthorizationRulesInput.Type;

// Output Schema
export const NamespacesListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListAuthorizationRulesOutput =
  typeof NamespacesListAuthorizationRulesOutput.Type;

// The operation
/**
 * Authorization rules for a namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 */
export const NamespacesListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListAuthorizationRulesInput,
    outputSchema: NamespacesListAuthorizationRulesOutput,
  }));
// Input Schema
export const NamespacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces",
    }),
  );
export type NamespacesListByResourceGroupInput =
  typeof NamespacesListByResourceGroupInput.Type;

// Output Schema
export const NamespacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NamespacesListByResourceGroupOutput =
  typeof NamespacesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the available namespaces within the ResourceGroup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const NamespacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NamespacesListByResourceGroupInput,
    outputSchema: NamespacesListByResourceGroupOutput,
  }));
// Input Schema
export const NamespacesListKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}/listKeys",
    }),
  );
export type NamespacesListKeysInput = typeof NamespacesListKeysInput.Type;

// Output Schema
export const NamespacesListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NamespacesListKeysOutput = typeof NamespacesListKeysOutput.Type;

// The operation
/**
 * Primary and secondary connection strings to the namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 */
export const NamespacesListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesListKeysInput,
  outputSchema: NamespacesListKeysOutput,
}));
// Input Schema
export const NamespacesRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type NamespacesRegenerateKeysInput =
  typeof NamespacesRegenerateKeysInput.Type;

// Output Schema
export const NamespacesRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type NamespacesRegenerateKeysOutput =
  typeof NamespacesRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates the primary or secondary connection strings to the namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param authorizationRuleName - The authorization rule name.
 */
export const NamespacesRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NamespacesRegenerateKeysInput,
    outputSchema: NamespacesRegenerateKeysOutput,
  }),
);
// Input Schema
export const NamespacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}",
  }),
);
export type NamespacesUpdateInput = typeof NamespacesUpdateInput.Type;

// Output Schema
export const NamespacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type NamespacesUpdateOutput = typeof NamespacesUpdateOutput.Type;

// The operation
/**
 * Creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 */
export const NamespacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: NamespacesUpdateInput,
  outputSchema: NamespacesUpdateOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateOrUpdateInput =
  typeof PrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof PrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates PrivateEndpointConnections of service namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
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
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes an existing namespace. This operation also removes all associated resources under the namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
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
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsGetInput =
  typeof PrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const PrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsGetOutput =
  typeof PrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets a description for the specified Private Endpoint Connection name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param privateEndpointConnectionName - The PrivateEndpointConnection name
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListInput =
  typeof PrivateEndpointConnectionsListInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListOutput =
  typeof PrivateEndpointConnectionsListOutput.Type;

// The operation
/**
 * Gets the available PrivateEndpointConnections within a namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 */
export const PrivateEndpointConnectionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListInput,
    outputSchema: PrivateEndpointConnectionsListOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    privateLinkResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/privateLinkResources/{privateLinkResourceName}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets a private link resource by a specified group name for a container registry.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param privateLinkResourceName - The name of the private link resource.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListInput =
  typeof PrivateLinkResourcesListInput.Type;

// Output Schema
export const PrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListOutput =
  typeof PrivateLinkResourcesListOutput.Type;

// The operation
/**
 * Lists the private link resources for a container registry.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 */
export const PrivateLinkResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesListInput,
    outputSchema: PrivateLinkResourcesListOutput,
  }),
);
// Input Schema
export const WCFRelaysCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    relayName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays/{relayName}",
    }),
  );
export type WCFRelaysCreateOrUpdateInput =
  typeof WCFRelaysCreateOrUpdateInput.Type;

// Output Schema
export const WCFRelaysCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WCFRelaysCreateOrUpdateOutput =
  typeof WCFRelaysCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a WCF relay. This operation is idempotent.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param relayName - The relay name.
 */
export const WCFRelaysCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WCFRelaysCreateOrUpdateInput,
    outputSchema: WCFRelaysCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WCFRelaysCreateOrUpdateAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    relayName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays/{relayName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type WCFRelaysCreateOrUpdateAuthorizationRuleInput =
  typeof WCFRelaysCreateOrUpdateAuthorizationRuleInput.Type;

// Output Schema
export const WCFRelaysCreateOrUpdateAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WCFRelaysCreateOrUpdateAuthorizationRuleOutput =
  typeof WCFRelaysCreateOrUpdateAuthorizationRuleOutput.Type;

// The operation
/**
 * Creates or updates an authorization rule for a WCF relay.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param relayName - The relay name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const WCFRelaysCreateOrUpdateAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WCFRelaysCreateOrUpdateAuthorizationRuleInput,
    outputSchema: WCFRelaysCreateOrUpdateAuthorizationRuleOutput,
  }));
// Input Schema
export const WCFRelaysDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  relayName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays/{relayName}",
  }),
);
export type WCFRelaysDeleteInput = typeof WCFRelaysDeleteInput.Type;

// Output Schema
export const WCFRelaysDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WCFRelaysDeleteOutput = typeof WCFRelaysDeleteOutput.Type;

// The operation
/**
 * Deletes a WCF relay.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param relayName - The relay name.
 */
export const WCFRelaysDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WCFRelaysDeleteInput,
  outputSchema: WCFRelaysDeleteOutput,
}));
// Input Schema
export const WCFRelaysDeleteAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    relayName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays/{relayName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type WCFRelaysDeleteAuthorizationRuleInput =
  typeof WCFRelaysDeleteAuthorizationRuleInput.Type;

// Output Schema
export const WCFRelaysDeleteAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WCFRelaysDeleteAuthorizationRuleOutput =
  typeof WCFRelaysDeleteAuthorizationRuleOutput.Type;

// The operation
/**
 * Deletes a WCF relay authorization rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param relayName - The relay name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const WCFRelaysDeleteAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WCFRelaysDeleteAuthorizationRuleInput,
    outputSchema: WCFRelaysDeleteAuthorizationRuleOutput,
  }));
// Input Schema
export const WCFRelaysGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  namespaceName: Schema.String.pipe(T.PathParam()),
  relayName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays/{relayName}",
  }),
);
export type WCFRelaysGetInput = typeof WCFRelaysGetInput.Type;

// Output Schema
export const WCFRelaysGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WCFRelaysGetOutput = typeof WCFRelaysGetOutput.Type;

// The operation
/**
 * Returns the description for the specified WCF relay.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param relayName - The relay name.
 */
export const WCFRelaysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WCFRelaysGetInput,
  outputSchema: WCFRelaysGetOutput,
}));
// Input Schema
export const WCFRelaysGetAuthorizationRuleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    relayName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays/{relayName}/authorizationRules/{authorizationRuleName}",
    }),
  );
export type WCFRelaysGetAuthorizationRuleInput =
  typeof WCFRelaysGetAuthorizationRuleInput.Type;

// Output Schema
export const WCFRelaysGetAuthorizationRuleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WCFRelaysGetAuthorizationRuleOutput =
  typeof WCFRelaysGetAuthorizationRuleOutput.Type;

// The operation
/**
 * Get authorizationRule for a WCF relay by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param relayName - The relay name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const WCFRelaysGetAuthorizationRule =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WCFRelaysGetAuthorizationRuleInput,
    outputSchema: WCFRelaysGetAuthorizationRuleOutput,
  }));
// Input Schema
export const WCFRelaysListAuthorizationRulesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    relayName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays/{relayName}/authorizationRules",
    }),
  );
export type WCFRelaysListAuthorizationRulesInput =
  typeof WCFRelaysListAuthorizationRulesInput.Type;

// Output Schema
export const WCFRelaysListAuthorizationRulesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WCFRelaysListAuthorizationRulesOutput =
  typeof WCFRelaysListAuthorizationRulesOutput.Type;

// The operation
/**
 * Authorization rules for a WCF relay.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param relayName - The relay name.
 */
export const WCFRelaysListAuthorizationRules =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WCFRelaysListAuthorizationRulesInput,
    outputSchema: WCFRelaysListAuthorizationRulesOutput,
  }));
// Input Schema
export const WCFRelaysListByNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays",
    }),
  );
export type WCFRelaysListByNamespaceInput =
  typeof WCFRelaysListByNamespaceInput.Type;

// Output Schema
export const WCFRelaysListByNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type WCFRelaysListByNamespaceOutput =
  typeof WCFRelaysListByNamespaceOutput.Type;

// The operation
/**
 * Lists the WCF relays within the namespace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 */
export const WCFRelaysListByNamespace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WCFRelaysListByNamespaceInput,
    outputSchema: WCFRelaysListByNamespaceOutput,
  }),
);
// Input Schema
export const WCFRelaysListKeysInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    relayName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays/{relayName}/authorizationRules/{authorizationRuleName}/listKeys",
  }),
);
export type WCFRelaysListKeysInput = typeof WCFRelaysListKeysInput.Type;

// Output Schema
export const WCFRelaysListKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type WCFRelaysListKeysOutput = typeof WCFRelaysListKeysOutput.Type;

// The operation
/**
 * Primary and secondary connection strings to the WCF relay.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param relayName - The relay name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const WCFRelaysListKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WCFRelaysListKeysInput,
  outputSchema: WCFRelaysListKeysOutput,
}));
// Input Schema
export const WCFRelaysRegenerateKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    namespaceName: Schema.String.pipe(T.PathParam()),
    relayName: Schema.String.pipe(T.PathParam()),
    authorizationRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Relay/namespaces/{namespaceName}/wcfRelays/{relayName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
    }),
  );
export type WCFRelaysRegenerateKeysInput =
  typeof WCFRelaysRegenerateKeysInput.Type;

// Output Schema
export const WCFRelaysRegenerateKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    primaryConnectionString: Schema.optional(Schema.String),
    secondaryConnectionString: Schema.optional(Schema.String),
    primaryKey: Schema.optional(Schema.String),
    secondaryKey: Schema.optional(Schema.String),
    keyName: Schema.optional(Schema.String),
  });
export type WCFRelaysRegenerateKeysOutput =
  typeof WCFRelaysRegenerateKeysOutput.Type;

// The operation
/**
 * Regenerates the primary or secondary connection strings to the WCF relay.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param namespaceName - The namespace name
 * @param relayName - The relay name.
 * @param authorizationRuleName - The authorization rule name.
 */
export const WCFRelaysRegenerateKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WCFRelaysRegenerateKeysInput,
    outputSchema: WCFRelaysRegenerateKeysOutput,
  }),
);
