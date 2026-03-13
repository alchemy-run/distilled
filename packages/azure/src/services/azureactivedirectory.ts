/**
 * Azure Azureactivedirectory API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const PrivateEndpointConnectionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionsCreateInput =
  typeof PrivateEndpointConnectionsCreateInput.Type;

// Output Schema
export const PrivateEndpointConnectionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateEndpointConnectionsCreateOutput =
  typeof PrivateEndpointConnectionsCreateOutput.Type;

// The operation
/**
 * Creates specified private endpoint connection associated with the given policy.
 */
export const PrivateEndpointConnectionsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsCreateInput,
    outputSchema: PrivateEndpointConnectionsCreateOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes the specified private endpoint connection associated with the given policy.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Gets the specified private endpoint connection associated with the given policy.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByPolicyNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByPolicyNameInput =
  typeof PrivateEndpointConnectionsListByPolicyNameInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByPolicyNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByPolicyNameOutput =
  typeof PrivateEndpointConnectionsListByPolicyNameOutput.Type;

// The operation
/**
 * Lists all Private Endpoint Connections for the given policy.
 */
export const PrivateEndpointConnectionsListByPolicyName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByPolicyNameInput,
    outputSchema: PrivateEndpointConnectionsListByPolicyNameOutput,
  }));
// Input Schema
export const PrivateLinkForAzureAdCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}",
    }),
  );
export type PrivateLinkForAzureAdCreateInput =
  typeof PrivateLinkForAzureAdCreateInput.Type;

// Output Schema
export const PrivateLinkForAzureAdCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkForAzureAdCreateOutput =
  typeof PrivateLinkForAzureAdCreateOutput.Type;

// The operation
/**
 * Creates a private link policy.
 */
export const privateLinkForAzureAdCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkForAzureAdCreateInput,
    outputSchema: PrivateLinkForAzureAdCreateOutput,
  }),
);
// Input Schema
export const PrivateLinkForAzureAdDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}",
    }),
  );
export type PrivateLinkForAzureAdDeleteInput =
  typeof PrivateLinkForAzureAdDeleteInput.Type;

// Output Schema
export const PrivateLinkForAzureAdDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkForAzureAdDeleteOutput =
  typeof PrivateLinkForAzureAdDeleteOutput.Type;

// The operation
/**
 * Deletes a private link policy. When operation completes, status code 200 returned without content.
 */
export const privateLinkForAzureAdDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkForAzureAdDeleteInput,
    outputSchema: PrivateLinkForAzureAdDeleteOutput,
  }),
);
// Input Schema
export const PrivateLinkForAzureAdGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}",
    }),
  );
export type PrivateLinkForAzureAdGetInput =
  typeof PrivateLinkForAzureAdGetInput.Type;

// Output Schema
export const PrivateLinkForAzureAdGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkForAzureAdGetOutput =
  typeof PrivateLinkForAzureAdGetOutput.Type;

// The operation
/**
 * Gets a private link policy with a given name.
 */
export const privateLinkForAzureAdGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkForAzureAdGetInput,
    outputSchema: PrivateLinkForAzureAdGetOutput,
  }),
);
// Input Schema
export const PrivateLinkForAzureAdListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd",
    }),
  );
export type PrivateLinkForAzureAdListInput =
  typeof PrivateLinkForAzureAdListInput.Type;

// Output Schema
export const PrivateLinkForAzureAdListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkForAzureAdListOutput =
  typeof PrivateLinkForAzureAdListOutput.Type;

// The operation
/**
 * Operation to return the list of Private Link Policies For AzureAD scoped to the resourceGroup.
 */
export const privateLinkForAzureAdList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkForAzureAdListInput,
    outputSchema: PrivateLinkForAzureAdListOutput,
  }),
);
// Input Schema
export const PrivateLinkForAzureAdListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/microsoft.aadiam/privateLinkForAzureAd",
    }),
  );
export type PrivateLinkForAzureAdListBySubscriptionInput =
  typeof PrivateLinkForAzureAdListBySubscriptionInput.Type;

// Output Schema
export const PrivateLinkForAzureAdListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkForAzureAdListBySubscriptionOutput =
  typeof PrivateLinkForAzureAdListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all  Private Link Policies For AzureAD in the given subscription.
 */
export const privateLinkForAzureAdListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkForAzureAdListBySubscriptionInput,
    outputSchema: PrivateLinkForAzureAdListBySubscriptionOutput,
  }));
// Input Schema
export const PrivateLinkForAzureAdUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}",
    }),
  );
export type PrivateLinkForAzureAdUpdateInput =
  typeof PrivateLinkForAzureAdUpdateInput.Type;

// Output Schema
export const PrivateLinkForAzureAdUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkForAzureAdUpdateOutput =
  typeof PrivateLinkForAzureAdUpdateOutput.Type;

// The operation
/**
 * Updates private link policy tags with specified values.
 */
export const privateLinkForAzureAdUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkForAzureAdUpdateInput,
    outputSchema: PrivateLinkForAzureAdUpdateOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}/privateLinkResources/{groupName}",
    }),
  );
export type PrivateLinkResourcesGetInput =
  typeof PrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesGetOutput =
  typeof PrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a policy of AzureAD.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListByPrivateLinkPolicyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.aadiam/privateLinkForAzureAd/{policyName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByPrivateLinkPolicyInput =
  typeof PrivateLinkResourcesListByPrivateLinkPolicyInput.Type;

// Output Schema
export const PrivateLinkResourcesListByPrivateLinkPolicyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListByPrivateLinkPolicyOutput =
  typeof PrivateLinkResourcesListByPrivateLinkPolicyOutput.Type;

// The operation
/**
 * Gets the private link resources that need to be created for a policy of AzureAD.
 */
export const PrivateLinkResourcesListByPrivateLinkPolicy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByPrivateLinkPolicyInput,
    outputSchema: PrivateLinkResourcesListByPrivateLinkPolicyOutput,
  }));
