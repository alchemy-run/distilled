/**
 * Azure Msi API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const FederatedIdentityCredentialsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    federatedIdentityCredentialResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}/federatedIdentityCredentials/{federatedIdentityCredentialResourceName}",
    }),
  );
export type FederatedIdentityCredentialsCreateOrUpdateInput =
  typeof FederatedIdentityCredentialsCreateOrUpdateInput.Type;

// Output Schema
export const FederatedIdentityCredentialsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FederatedIdentityCredentialsCreateOrUpdateOutput =
  typeof FederatedIdentityCredentialsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a federated identity credential under the specified user assigned identity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the identity resource.
 * @param federatedIdentityCredentialResourceName - The name of the federated identity credential resource.
 */
export const FederatedIdentityCredentialsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FederatedIdentityCredentialsCreateOrUpdateInput,
    outputSchema: FederatedIdentityCredentialsCreateOrUpdateOutput,
  }));
// Input Schema
export const FederatedIdentityCredentialsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    federatedIdentityCredentialResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}/federatedIdentityCredentials/{federatedIdentityCredentialResourceName}",
    }),
  );
export type FederatedIdentityCredentialsDeleteInput =
  typeof FederatedIdentityCredentialsDeleteInput.Type;

// Output Schema
export const FederatedIdentityCredentialsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FederatedIdentityCredentialsDeleteOutput =
  typeof FederatedIdentityCredentialsDeleteOutput.Type;

// The operation
/**
 * Deletes the federated identity credential.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the identity resource.
 * @param federatedIdentityCredentialResourceName - The name of the federated identity credential resource.
 */
export const FederatedIdentityCredentialsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FederatedIdentityCredentialsDeleteInput,
    outputSchema: FederatedIdentityCredentialsDeleteOutput,
  }));
// Input Schema
export const FederatedIdentityCredentialsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    federatedIdentityCredentialResourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}/federatedIdentityCredentials/{federatedIdentityCredentialResourceName}",
    }),
  );
export type FederatedIdentityCredentialsGetInput =
  typeof FederatedIdentityCredentialsGetInput.Type;

// Output Schema
export const FederatedIdentityCredentialsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FederatedIdentityCredentialsGetOutput =
  typeof FederatedIdentityCredentialsGetOutput.Type;

// The operation
/**
 * Gets the federated identity credential.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the identity resource.
 * @param federatedIdentityCredentialResourceName - The name of the federated identity credential resource.
 */
export const FederatedIdentityCredentialsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FederatedIdentityCredentialsGetInput,
    outputSchema: FederatedIdentityCredentialsGetOutput,
  }));
// Input Schema
export const FederatedIdentityCredentialsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
    $skiptoken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}/federatedIdentityCredentials",
    }),
  );
export type FederatedIdentityCredentialsListInput =
  typeof FederatedIdentityCredentialsListInput.Type;

// Output Schema
export const FederatedIdentityCredentialsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FederatedIdentityCredentialsListOutput =
  typeof FederatedIdentityCredentialsListOutput.Type;

// The operation
/**
 * Lists all the federated identity credentials under the specified user assigned identity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the identity resource.
 * @param $top - Number of records to return.
 * @param $skiptoken - A skip token is used to continue retrieving items after an operation returns a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls.
 */
export const FederatedIdentityCredentialsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FederatedIdentityCredentialsListInput,
    outputSchema: FederatedIdentityCredentialsListOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.ManagedIdentity/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      name: Schema.optional(Schema.String),
      display: Schema.optional(
        Schema.Struct({
          provider: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          resource: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
        }),
      ),
    }),
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
export const SystemAssignedIdentitiesGetByScopeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    scope: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{scope}/providers/Microsoft.ManagedIdentity/identities/default",
    }),
  );
export type SystemAssignedIdentitiesGetByScopeInput =
  typeof SystemAssignedIdentitiesGetByScopeInput.Type;

// Output Schema
export const SystemAssignedIdentitiesGetByScopeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SystemAssignedIdentitiesGetByScopeOutput =
  typeof SystemAssignedIdentitiesGetByScopeOutput.Type;

// The operation
/**
 * Gets the systemAssignedIdentity available under the specified RP scope.
 *
 * @param api-version - The API version to use for this operation.
 * @param scope - The fully qualified Azure Resource manager identifier of the resource.
 */
export const SystemAssignedIdentitiesGetByScope =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SystemAssignedIdentitiesGetByScopeInput,
    outputSchema: SystemAssignedIdentitiesGetByScopeOutput,
  }));
// Input Schema
export const UserAssignedIdentitiesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}",
    }),
  );
export type UserAssignedIdentitiesCreateOrUpdateInput =
  typeof UserAssignedIdentitiesCreateOrUpdateInput.Type;

// Output Schema
export const UserAssignedIdentitiesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type UserAssignedIdentitiesCreateOrUpdateOutput =
  typeof UserAssignedIdentitiesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update an identity in the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the identity resource.
 */
export const UserAssignedIdentitiesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UserAssignedIdentitiesCreateOrUpdateInput,
    outputSchema: UserAssignedIdentitiesCreateOrUpdateOutput,
  }));
// Input Schema
export const UserAssignedIdentitiesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}",
    }),
  );
export type UserAssignedIdentitiesDeleteInput =
  typeof UserAssignedIdentitiesDeleteInput.Type;

// Output Schema
export const UserAssignedIdentitiesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UserAssignedIdentitiesDeleteOutput =
  typeof UserAssignedIdentitiesDeleteOutput.Type;

// The operation
/**
 * Deletes the identity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the identity resource.
 */
export const UserAssignedIdentitiesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UserAssignedIdentitiesDeleteInput,
    outputSchema: UserAssignedIdentitiesDeleteOutput,
  }));
// Input Schema
export const UserAssignedIdentitiesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}",
    }),
  );
export type UserAssignedIdentitiesGetInput =
  typeof UserAssignedIdentitiesGetInput.Type;

// Output Schema
export const UserAssignedIdentitiesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type UserAssignedIdentitiesGetOutput =
  typeof UserAssignedIdentitiesGetOutput.Type;

// The operation
/**
 * Gets the identity.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the identity resource.
 */
export const UserAssignedIdentitiesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UserAssignedIdentitiesGetInput,
    outputSchema: UserAssignedIdentitiesGetOutput,
  }),
);
// Input Schema
export const UserAssignedIdentitiesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities",
    }),
  );
export type UserAssignedIdentitiesListByResourceGroupInput =
  typeof UserAssignedIdentitiesListByResourceGroupInput.Type;

// Output Schema
export const UserAssignedIdentitiesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type UserAssignedIdentitiesListByResourceGroupOutput =
  typeof UserAssignedIdentitiesListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all the userAssignedIdentities available under the specified ResourceGroup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const UserAssignedIdentitiesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UserAssignedIdentitiesListByResourceGroupInput,
    outputSchema: UserAssignedIdentitiesListByResourceGroupOutput,
  }));
// Input Schema
export const UserAssignedIdentitiesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedIdentity/userAssignedIdentities",
    }),
  );
export type UserAssignedIdentitiesListBySubscriptionInput =
  typeof UserAssignedIdentitiesListBySubscriptionInput.Type;

// Output Schema
export const UserAssignedIdentitiesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type UserAssignedIdentitiesListBySubscriptionOutput =
  typeof UserAssignedIdentitiesListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all the userAssignedIdentities available under the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const UserAssignedIdentitiesListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UserAssignedIdentitiesListBySubscriptionInput,
    outputSchema: UserAssignedIdentitiesListBySubscriptionOutput,
  }));
// Input Schema
export const UserAssignedIdentitiesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}",
    }),
  );
export type UserAssignedIdentitiesUpdateInput =
  typeof UserAssignedIdentitiesUpdateInput.Type;

// Output Schema
export const UserAssignedIdentitiesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type UserAssignedIdentitiesUpdateOutput =
  typeof UserAssignedIdentitiesUpdateOutput.Type;

// The operation
/**
 * Update an identity in the specified subscription and resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceName - The name of the identity resource.
 */
export const UserAssignedIdentitiesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: UserAssignedIdentitiesUpdateInput,
    outputSchema: UserAssignedIdentitiesUpdateOutput,
  }));
