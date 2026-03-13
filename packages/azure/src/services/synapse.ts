/**
 * Azure Synapse API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AzureADOnlyAuthenticationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    azureADOnlyAuthenticationName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/azureADOnlyAuthentications/{azureADOnlyAuthenticationName}",
    }),
  );
export type AzureADOnlyAuthenticationsCreateInput =
  typeof AzureADOnlyAuthenticationsCreateInput.Type;

// Output Schema
export const AzureADOnlyAuthenticationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AzureADOnlyAuthenticationsCreateOutput =
  typeof AzureADOnlyAuthenticationsCreateOutput.Type;

// The operation
/**
 * Create or Update Azure Active Directory only authentication property
 *
 * Create or Update a Azure Active Directory only authentication property for the workspaces
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param azureADOnlyAuthenticationName - name of the property
 */
export const AzureADOnlyAuthenticationsCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureADOnlyAuthenticationsCreateInput,
    outputSchema: AzureADOnlyAuthenticationsCreateOutput,
  }));
// Input Schema
export const AzureADOnlyAuthenticationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    azureADOnlyAuthenticationName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/azureADOnlyAuthentications/{azureADOnlyAuthenticationName}",
    }),
  );
export type AzureADOnlyAuthenticationsGetInput =
  typeof AzureADOnlyAuthenticationsGetInput.Type;

// Output Schema
export const AzureADOnlyAuthenticationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AzureADOnlyAuthenticationsGetOutput =
  typeof AzureADOnlyAuthenticationsGetOutput.Type;

// The operation
/**
 * Get Azure Active Directory only authentication property
 *
 * Gets a Azure Active Directory only authentication property
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param azureADOnlyAuthenticationName - name of the property
 */
export const AzureADOnlyAuthenticationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureADOnlyAuthenticationsGetInput,
    outputSchema: AzureADOnlyAuthenticationsGetOutput,
  }));
// Input Schema
export const AzureADOnlyAuthenticationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/azureADOnlyAuthentications",
    }),
  );
export type AzureADOnlyAuthenticationsListInput =
  typeof AzureADOnlyAuthenticationsListInput.Type;

// Output Schema
export const AzureADOnlyAuthenticationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureADOnlyAuthenticationsListOutput =
  typeof AzureADOnlyAuthenticationsListOutput.Type;

// The operation
/**
 * Gets a list of Azure Active Directory only authentication property
 *
 * Gets a list of Azure Active Directory only authentication property for a workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const AzureADOnlyAuthenticationsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureADOnlyAuthenticationsListInput,
    outputSchema: AzureADOnlyAuthenticationsListOutput,
  }));
// Input Schema
export const BigDataPoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    bigDataPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    force: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/bigDataPools/{bigDataPoolName}",
    }),
  );
export type BigDataPoolsCreateOrUpdateInput =
  typeof BigDataPoolsCreateOrUpdateInput.Type;

// Output Schema
export const BigDataPoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BigDataPoolsCreateOrUpdateOutput =
  typeof BigDataPoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a Big Data pool.
 *
 * Create a new Big Data pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param bigDataPoolName - Big Data pool name
 * @param force - Whether to stop any running jobs in the Big Data pool
 */
export const BigDataPoolsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BigDataPoolsCreateOrUpdateInput,
    outputSchema: BigDataPoolsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const BigDataPoolsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    bigDataPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/bigDataPools/{bigDataPoolName}",
    }),
  );
export type BigDataPoolsDeleteInput = typeof BigDataPoolsDeleteInput.Type;

// Output Schema
export const BigDataPoolsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BigDataPoolsDeleteOutput = typeof BigDataPoolsDeleteOutput.Type;

// The operation
/**
 * Delete a Big Data pool.
 *
 * Delete a Big Data pool from the workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param bigDataPoolName - Big Data pool name
 */
export const BigDataPoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BigDataPoolsDeleteInput,
  outputSchema: BigDataPoolsDeleteOutput,
}));
// Input Schema
export const BigDataPoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  bigDataPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/bigDataPools/{bigDataPoolName}",
  }),
);
export type BigDataPoolsGetInput = typeof BigDataPoolsGetInput.Type;

// Output Schema
export const BigDataPoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type BigDataPoolsGetOutput = typeof BigDataPoolsGetOutput.Type;

// The operation
/**
 * Get Big Data pool
 *
 * Get a Big Data pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param bigDataPoolName - Big Data pool name
 */
export const BigDataPoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BigDataPoolsGetInput,
  outputSchema: BigDataPoolsGetOutput,
}));
// Input Schema
export const BigDataPoolsListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/bigDataPools",
    }),
  );
export type BigDataPoolsListByWorkspaceInput =
  typeof BigDataPoolsListByWorkspaceInput.Type;

// Output Schema
export const BigDataPoolsListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type BigDataPoolsListByWorkspaceOutput =
  typeof BigDataPoolsListByWorkspaceOutput.Type;

// The operation
/**
 * List the Big Data pools in a workspace.
 *
 * List Big Data pools in a workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const BigDataPoolsListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BigDataPoolsListByWorkspaceInput,
    outputSchema: BigDataPoolsListByWorkspaceOutput,
  }),
);
// Input Schema
export const BigDataPoolsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    bigDataPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/bigDataPools/{bigDataPoolName}",
    }),
  );
export type BigDataPoolsUpdateInput = typeof BigDataPoolsUpdateInput.Type;

// Output Schema
export const BigDataPoolsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BigDataPoolsUpdateOutput = typeof BigDataPoolsUpdateOutput.Type;

// The operation
/**
 * Update a Big Data pool.
 *
 * Patch a Big Data pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param bigDataPoolName - Big Data pool name
 */
export const BigDataPoolsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BigDataPoolsUpdateInput,
  outputSchema: BigDataPoolsUpdateOutput,
}));
// Input Schema
export const DataMaskingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/dataMaskingPolicies/{dataMaskingPolicyName}",
    }),
  );
export type DataMaskingPoliciesCreateOrUpdateInput =
  typeof DataMaskingPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const DataMaskingPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataMaskingPoliciesCreateOrUpdateOutput =
  typeof DataMaskingPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Sql pool data masking policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const DataMaskingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataMaskingPoliciesCreateOrUpdateInput,
    outputSchema: DataMaskingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const DataMaskingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/dataMaskingPolicies/{dataMaskingPolicyName}",
    }),
  );
export type DataMaskingPoliciesGetInput =
  typeof DataMaskingPoliciesGetInput.Type;

// Output Schema
export const DataMaskingPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataMaskingPoliciesGetOutput =
  typeof DataMaskingPoliciesGetOutput.Type;

// The operation
/**
 * Gets a Sql pool data masking policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const DataMaskingPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DataMaskingPoliciesGetInput,
    outputSchema: DataMaskingPoliciesGetOutput,
  }),
);
// Input Schema
export const DataMaskingRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    dataMaskingRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/dataMaskingPolicies/{dataMaskingPolicyName}/rules/{dataMaskingRuleName}",
    }),
  );
export type DataMaskingRulesCreateOrUpdateInput =
  typeof DataMaskingRulesCreateOrUpdateInput.Type;

// Output Schema
export const DataMaskingRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataMaskingRulesCreateOrUpdateOutput =
  typeof DataMaskingRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Sql pool data masking rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param dataMaskingRuleName - The name of the data masking rule.
 */
export const DataMaskingRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataMaskingRulesCreateOrUpdateInput,
    outputSchema: DataMaskingRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const DataMaskingRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    dataMaskingRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/dataMaskingPolicies/{dataMaskingPolicyName}/rules/{dataMaskingRuleName}",
    }),
  );
export type DataMaskingRulesGetInput = typeof DataMaskingRulesGetInput.Type;

// Output Schema
export const DataMaskingRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataMaskingRulesGetOutput = typeof DataMaskingRulesGetOutput.Type;

// The operation
/**
 * Gets the specific Sql pool data masking rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param dataMaskingRuleName - The name of the data masking rule.
 */
export const DataMaskingRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DataMaskingRulesGetInput,
  outputSchema: DataMaskingRulesGetOutput,
}));
// Input Schema
export const DataMaskingRulesListBySqlPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/dataMaskingPolicies/{dataMaskingPolicyName}/rules",
    }),
  );
export type DataMaskingRulesListBySqlPoolInput =
  typeof DataMaskingRulesListBySqlPoolInput.Type;

// Output Schema
export const DataMaskingRulesListBySqlPoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type DataMaskingRulesListBySqlPoolOutput =
  typeof DataMaskingRulesListBySqlPoolOutput.Type;

// The operation
/**
 * Gets a list of Sql pool data masking rules.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const DataMaskingRulesListBySqlPool =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataMaskingRulesListBySqlPoolInput,
    outputSchema: DataMaskingRulesListBySqlPoolOutput,
  }));
// Input Schema
export const ExtendedSqlPoolBlobAuditingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    blobAuditingPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/extendedAuditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type ExtendedSqlPoolBlobAuditingPoliciesCreateOrUpdateInput =
  typeof ExtendedSqlPoolBlobAuditingPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ExtendedSqlPoolBlobAuditingPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExtendedSqlPoolBlobAuditingPoliciesCreateOrUpdateOutput =
  typeof ExtendedSqlPoolBlobAuditingPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an extended Sql pool's blob auditing policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param blobAuditingPolicyName - The name of the blob auditing policy.
 */
export const ExtendedSqlPoolBlobAuditingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExtendedSqlPoolBlobAuditingPoliciesCreateOrUpdateInput,
    outputSchema: ExtendedSqlPoolBlobAuditingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ExtendedSqlPoolBlobAuditingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    blobAuditingPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/extendedAuditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type ExtendedSqlPoolBlobAuditingPoliciesGetInput =
  typeof ExtendedSqlPoolBlobAuditingPoliciesGetInput.Type;

// Output Schema
export const ExtendedSqlPoolBlobAuditingPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExtendedSqlPoolBlobAuditingPoliciesGetOutput =
  typeof ExtendedSqlPoolBlobAuditingPoliciesGetOutput.Type;

// The operation
/**
 * Gets an extended Sql pool's blob auditing policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param blobAuditingPolicyName - The name of the blob auditing policy.
 */
export const ExtendedSqlPoolBlobAuditingPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExtendedSqlPoolBlobAuditingPoliciesGetInput,
    outputSchema: ExtendedSqlPoolBlobAuditingPoliciesGetOutput,
  }));
// Input Schema
export const ExtendedSqlPoolBlobAuditingPoliciesListBySqlPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/extendedAuditingSettings",
    }),
  );
export type ExtendedSqlPoolBlobAuditingPoliciesListBySqlPoolInput =
  typeof ExtendedSqlPoolBlobAuditingPoliciesListBySqlPoolInput.Type;

// Output Schema
export const ExtendedSqlPoolBlobAuditingPoliciesListBySqlPoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ExtendedSqlPoolBlobAuditingPoliciesListBySqlPoolOutput =
  typeof ExtendedSqlPoolBlobAuditingPoliciesListBySqlPoolOutput.Type;

// The operation
/**
 * Lists extended auditing settings of a Sql pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const ExtendedSqlPoolBlobAuditingPoliciesListBySqlPool =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExtendedSqlPoolBlobAuditingPoliciesListBySqlPoolInput,
    outputSchema: ExtendedSqlPoolBlobAuditingPoliciesListBySqlPoolOutput,
  }));
// Input Schema
export const IntegrationRuntimeAuthKeysListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/listAuthKeys",
    }),
  );
export type IntegrationRuntimeAuthKeysListInput =
  typeof IntegrationRuntimeAuthKeysListInput.Type;

// Output Schema
export const IntegrationRuntimeAuthKeysListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    authKey1: Schema.optional(Schema.String),
    authKey2: Schema.optional(Schema.String),
  });
export type IntegrationRuntimeAuthKeysListOutput =
  typeof IntegrationRuntimeAuthKeysListOutput.Type;

// The operation
/**
 * List integration runtime authentication keys
 *
 * List authentication keys in an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimeAuthKeysList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeAuthKeysListInput,
    outputSchema: IntegrationRuntimeAuthKeysListOutput,
  }));
// Input Schema
export const IntegrationRuntimeAuthKeysRegenerateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/regenerateAuthKey",
    }),
  );
export type IntegrationRuntimeAuthKeysRegenerateInput =
  typeof IntegrationRuntimeAuthKeysRegenerateInput.Type;

// Output Schema
export const IntegrationRuntimeAuthKeysRegenerateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    authKey1: Schema.optional(Schema.String),
    authKey2: Schema.optional(Schema.String),
  });
export type IntegrationRuntimeAuthKeysRegenerateOutput =
  typeof IntegrationRuntimeAuthKeysRegenerateOutput.Type;

// The operation
/**
 * Regenerate integration runtime authentication key
 *
 * Regenerate the authentication key for an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimeAuthKeysRegenerate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeAuthKeysRegenerateInput,
    outputSchema: IntegrationRuntimeAuthKeysRegenerateOutput,
  }));
// Input Schema
export const IntegrationRuntimeConnectionInfosGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/getConnectionInfo",
    }),
  );
export type IntegrationRuntimeConnectionInfosGetInput =
  typeof IntegrationRuntimeConnectionInfosGetInput.Type;

// Output Schema
export const IntegrationRuntimeConnectionInfosGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceToken: Schema.optional(Schema.String),
    identityCertThumbprint: Schema.optional(Schema.String),
    hostServiceUri: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    publicKey: Schema.optional(Schema.String),
    isIdentityCertExprired: Schema.optional(Schema.Boolean),
  });
export type IntegrationRuntimeConnectionInfosGetOutput =
  typeof IntegrationRuntimeConnectionInfosGetOutput.Type;

// The operation
/**
 * Get integration runtime connection info
 *
 * Get connection info for an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimeConnectionInfosGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeConnectionInfosGetInput,
    outputSchema: IntegrationRuntimeConnectionInfosGetOutput,
  }));
// Input Schema
export const IntegrationRuntimeCredentialsSyncInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/syncCredentials",
    }),
  );
export type IntegrationRuntimeCredentialsSyncInput =
  typeof IntegrationRuntimeCredentialsSyncInput.Type;

// Output Schema
export const IntegrationRuntimeCredentialsSyncOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimeCredentialsSyncOutput =
  typeof IntegrationRuntimeCredentialsSyncOutput.Type;

// The operation
/**
 * Sync integration runtime credentials
 *
 * Force the integration runtime to synchronize credentials across integration runtime nodes, and this will override the credentials across all worker nodes with those available on the dispatcher node. If you already have the latest credential backup file, you should manually import it (preferred) on any self-hosted integration runtime node than using this API directly.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimeCredentialsSync =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeCredentialsSyncInput,
    outputSchema: IntegrationRuntimeCredentialsSyncOutput,
  }));
// Input Schema
export const IntegrationRuntimeMonitoringDataListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/monitoringData",
    }),
  );
export type IntegrationRuntimeMonitoringDataListInput =
  typeof IntegrationRuntimeMonitoringDataListInput.Type;

// Output Schema
export const IntegrationRuntimeMonitoringDataListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    nodes: Schema.optional(
      Schema.Array(
        Schema.Struct({
          nodeName: Schema.optional(Schema.String),
          availableMemoryInMB: Schema.optional(Schema.Number),
          cpuUtilization: Schema.optional(Schema.Number),
          concurrentJobsLimit: Schema.optional(Schema.Number),
          concurrentJobsRunning: Schema.optional(Schema.Number),
          maxConcurrentJobs: Schema.optional(Schema.Number),
          sentBytes: Schema.optional(Schema.Number),
          receivedBytes: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type IntegrationRuntimeMonitoringDataListOutput =
  typeof IntegrationRuntimeMonitoringDataListOutput.Type;

// The operation
/**
 * Get integration runtime monitoring data
 *
 * Get monitoring data for an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimeMonitoringDataList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeMonitoringDataListInput,
    outputSchema: IntegrationRuntimeMonitoringDataListOutput,
  }));
// Input Schema
export const IntegrationRuntimeNodeIpAddressGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    nodeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}/ipAddress",
    }),
  );
export type IntegrationRuntimeNodeIpAddressGetInput =
  typeof IntegrationRuntimeNodeIpAddressGetInput.Type;

// Output Schema
export const IntegrationRuntimeNodeIpAddressGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ipAddress: Schema.optional(Schema.String),
  });
export type IntegrationRuntimeNodeIpAddressGetOutput =
  typeof IntegrationRuntimeNodeIpAddressGetOutput.Type;

// The operation
/**
 * Get integration runtime node IP address
 *
 * Get the IP address of an integration runtime node
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param nodeName - Integration runtime node name
 */
export const IntegrationRuntimeNodeIpAddressGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeNodeIpAddressGetInput,
    outputSchema: IntegrationRuntimeNodeIpAddressGetOutput,
  }));
// Input Schema
export const IntegrationRuntimeNodesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    nodeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}",
    }),
  );
export type IntegrationRuntimeNodesDeleteInput =
  typeof IntegrationRuntimeNodesDeleteInput.Type;

// Output Schema
export const IntegrationRuntimeNodesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimeNodesDeleteOutput =
  typeof IntegrationRuntimeNodesDeleteOutput.Type;

// The operation
/**
 * Delete integration runtime node
 *
 * Delete an integration runtime node
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param nodeName - Integration runtime node name
 */
export const IntegrationRuntimeNodesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeNodesDeleteInput,
    outputSchema: IntegrationRuntimeNodesDeleteOutput,
  }));
// Input Schema
export const IntegrationRuntimeNodesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    nodeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}",
    }),
  );
export type IntegrationRuntimeNodesGetInput =
  typeof IntegrationRuntimeNodesGetInput.Type;

// Output Schema
export const IntegrationRuntimeNodesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nodeName: Schema.optional(Schema.String),
    machineName: Schema.optional(Schema.String),
    hostServiceUri: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "NeedRegistration",
        "Online",
        "Limited",
        "Offline",
        "Upgrading",
        "Initializing",
        "InitializeFailed",
      ]),
    ),
    capabilities: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    versionStatus: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    registerTime: Schema.optional(Schema.String),
    lastConnectTime: Schema.optional(Schema.String),
    expiryTime: Schema.optional(Schema.String),
    lastStartTime: Schema.optional(Schema.String),
    lastStopTime: Schema.optional(Schema.String),
    lastUpdateResult: Schema.optional(
      Schema.Literals(["None", "Succeed", "Fail"]),
    ),
    lastStartUpdateTime: Schema.optional(Schema.String),
    lastEndUpdateTime: Schema.optional(Schema.String),
    isActiveDispatcher: Schema.optional(Schema.Boolean),
    concurrentJobsLimit: Schema.optional(Schema.Number),
    maxConcurrentJobs: Schema.optional(Schema.Number),
  });
export type IntegrationRuntimeNodesGetOutput =
  typeof IntegrationRuntimeNodesGetOutput.Type;

// The operation
/**
 * Get integration runtime node
 *
 * Get an integration runtime node
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param nodeName - Integration runtime node name
 */
export const IntegrationRuntimeNodesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimeNodesGetInput,
    outputSchema: IntegrationRuntimeNodesGetOutput,
  }),
);
// Input Schema
export const IntegrationRuntimeNodesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    nodeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/nodes/{nodeName}",
    }),
  );
export type IntegrationRuntimeNodesUpdateInput =
  typeof IntegrationRuntimeNodesUpdateInput.Type;

// Output Schema
export const IntegrationRuntimeNodesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nodeName: Schema.optional(Schema.String),
    machineName: Schema.optional(Schema.String),
    hostServiceUri: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "NeedRegistration",
        "Online",
        "Limited",
        "Offline",
        "Upgrading",
        "Initializing",
        "InitializeFailed",
      ]),
    ),
    capabilities: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    versionStatus: Schema.optional(Schema.String),
    version: Schema.optional(Schema.String),
    registerTime: Schema.optional(Schema.String),
    lastConnectTime: Schema.optional(Schema.String),
    expiryTime: Schema.optional(Schema.String),
    lastStartTime: Schema.optional(Schema.String),
    lastStopTime: Schema.optional(Schema.String),
    lastUpdateResult: Schema.optional(
      Schema.Literals(["None", "Succeed", "Fail"]),
    ),
    lastStartUpdateTime: Schema.optional(Schema.String),
    lastEndUpdateTime: Schema.optional(Schema.String),
    isActiveDispatcher: Schema.optional(Schema.Boolean),
    concurrentJobsLimit: Schema.optional(Schema.Number),
    maxConcurrentJobs: Schema.optional(Schema.Number),
  });
export type IntegrationRuntimeNodesUpdateOutput =
  typeof IntegrationRuntimeNodesUpdateOutput.Type;

// The operation
/**
 * Create integration runtime node
 *
 * Create an integration runtime node
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param nodeName - Integration runtime node name
 */
export const IntegrationRuntimeNodesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeNodesUpdateInput,
    outputSchema: IntegrationRuntimeNodesUpdateOutput,
  }));
// Input Schema
export const IntegrationRuntimeObjectMetadataListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/getObjectMetadata",
    }),
  );
export type IntegrationRuntimeObjectMetadataListInput =
  typeof IntegrationRuntimeObjectMetadataListInput.Type;

// Output Schema
export const IntegrationRuntimeObjectMetadataListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          type: Schema.Literals([
            "Folder",
            "Project",
            "Package",
            "Environment",
          ]),
          id: Schema.optional(Schema.Number),
          name: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationRuntimeObjectMetadataListOutput =
  typeof IntegrationRuntimeObjectMetadataListOutput.Type;

// The operation
/**
 * Get integration runtime object metadata
 *
 * Get object metadata from an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimeObjectMetadataList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeObjectMetadataListInput,
    outputSchema: IntegrationRuntimeObjectMetadataListOutput,
  }));
// Input Schema
export const IntegrationRuntimeObjectMetadataRefreshInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/refreshObjectMetadata",
    }),
  );
export type IntegrationRuntimeObjectMetadataRefreshInput =
  typeof IntegrationRuntimeObjectMetadataRefreshInput.Type;

// Output Schema
export const IntegrationRuntimeObjectMetadataRefreshOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(Schema.String),
    error: Schema.optional(Schema.String),
  });
export type IntegrationRuntimeObjectMetadataRefreshOutput =
  typeof IntegrationRuntimeObjectMetadataRefreshOutput.Type;

// The operation
/**
 * Refresh integration runtime object metadata
 *
 * Refresh the object metadata in an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimeObjectMetadataRefresh =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimeObjectMetadataRefreshInput,
    outputSchema: IntegrationRuntimeObjectMetadataRefreshOutput,
  }));
// Input Schema
export const IntegrationRuntimesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}",
    }),
  );
export type IntegrationRuntimesCreateInput =
  typeof IntegrationRuntimesCreateInput.Type;

// Output Schema
export const IntegrationRuntimesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IntegrationRuntimesCreateOutput =
  typeof IntegrationRuntimesCreateOutput.Type;

// The operation
/**
 * Create integration runtime
 *
 * Create an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param If-Match - ETag of the integration runtime entity. Should only be specified for update, for which it should match existing entity or can be * for unconditional update.
 */
export const IntegrationRuntimesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesCreateInput,
    outputSchema: IntegrationRuntimesCreateOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}",
    }),
  );
export type IntegrationRuntimesDeleteInput =
  typeof IntegrationRuntimesDeleteInput.Type;

// Output Schema
export const IntegrationRuntimesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesDeleteOutput =
  typeof IntegrationRuntimesDeleteOutput.Type;

// The operation
/**
 * Delete integration runtime
 *
 * Delete an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesDeleteInput,
    outputSchema: IntegrationRuntimesDeleteOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesDisableInteractiveQueryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/disableInteractiveQuery",
    }),
  );
export type IntegrationRuntimesDisableInteractiveQueryInput =
  typeof IntegrationRuntimesDisableInteractiveQueryInput.Type;

// Output Schema
export const IntegrationRuntimesDisableInteractiveQueryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesDisableInteractiveQueryOutput =
  typeof IntegrationRuntimesDisableInteractiveQueryOutput.Type;

// The operation
/**
 * Disable interactive query in integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimesDisableInteractiveQuery =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesDisableInteractiveQueryInput,
    outputSchema: IntegrationRuntimesDisableInteractiveQueryOutput,
  }));
// Input Schema
export const IntegrationRuntimesEnableInteractiveQueryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/enableInteractiveQuery",
    }),
  );
export type IntegrationRuntimesEnableInteractiveQueryInput =
  typeof IntegrationRuntimesEnableInteractiveQueryInput.Type;

// Output Schema
export const IntegrationRuntimesEnableInteractiveQueryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesEnableInteractiveQueryOutput =
  typeof IntegrationRuntimesEnableInteractiveQueryOutput.Type;

// The operation
/**
 * Enable interactive query in integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimesEnableInteractiveQuery =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesEnableInteractiveQueryInput,
    outputSchema: IntegrationRuntimesEnableInteractiveQueryOutput,
  }));
// Input Schema
export const IntegrationRuntimesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}",
    }),
  );
export type IntegrationRuntimesGetInput =
  typeof IntegrationRuntimesGetInput.Type;

// Output Schema
export const IntegrationRuntimesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IntegrationRuntimesGetOutput =
  typeof IntegrationRuntimesGetOutput.Type;

// The operation
/**
 * Get integration runtime
 *
 * Get an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param If-None-Match - ETag of the integration runtime entity. Should only be specified for get. If the ETag matches the existing entity tag, or if * was provided, then no content will be returned.
 */
export const IntegrationRuntimesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesGetInput,
    outputSchema: IntegrationRuntimesGetOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes",
    }),
  );
export type IntegrationRuntimesListByWorkspaceInput =
  typeof IntegrationRuntimesListByWorkspaceInput.Type;

// Output Schema
export const IntegrationRuntimesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type IntegrationRuntimesListByWorkspaceOutput =
  typeof IntegrationRuntimesListByWorkspaceOutput.Type;

// The operation
/**
 * List integration runtimes
 *
 * List all integration runtimes
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimesListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IntegrationRuntimesListByWorkspaceInput,
    outputSchema: IntegrationRuntimesListByWorkspaceOutput,
  }));
// Input Schema
export const IntegrationRuntimesListOutboundNetworkDependenciesEndpointsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type IntegrationRuntimesListOutboundNetworkDependenciesEndpointsInput =
  typeof IntegrationRuntimesListOutboundNetworkDependenciesEndpointsInput.Type;

// Output Schema
export const IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          category: Schema.optional(Schema.String),
          endpoints: Schema.optional(
            Schema.Array(
              Schema.Struct({
                domainName: Schema.optional(Schema.String),
                endpointDetails: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      port: Schema.optional(Schema.Number),
                    }),
                  ),
                ),
              }),
            ),
          ),
        }),
      ),
    ),
  });
export type IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOutput =
  typeof IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOutput.Type;

// The operation
/**
 * Gets list of outbound network dependencies for a given Azure-SSIS integration runtime.
 *
 * Gets the list of outbound network dependencies for a given Azure-SSIS integration runtime.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimesListOutboundNetworkDependenciesEndpoints =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      IntegrationRuntimesListOutboundNetworkDependenciesEndpointsInput,
    outputSchema:
      IntegrationRuntimesListOutboundNetworkDependenciesEndpointsOutput,
  }));
// Input Schema
export const IntegrationRuntimesStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/start",
    }),
  );
export type IntegrationRuntimesStartInput =
  typeof IntegrationRuntimesStartInput.Type;

// Output Schema
export const IntegrationRuntimesStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    properties: Schema.Struct({
      type: Schema.Literals(["Managed", "SelfHosted"]),
      dataFactoryName: Schema.optional(Schema.String),
      state: Schema.optional(
        Schema.Literals([
          "Initial",
          "Stopped",
          "Started",
          "Starting",
          "Stopping",
          "NeedRegistration",
          "Online",
          "Limited",
          "Offline",
          "AccessDenied",
        ]),
      ),
    }),
  });
export type IntegrationRuntimesStartOutput =
  typeof IntegrationRuntimesStartOutput.Type;

// The operation
/**
 * Start integration runtime
 *
 * Start an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesStartInput,
    outputSchema: IntegrationRuntimesStartOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/stop",
    }),
  );
export type IntegrationRuntimesStopInput =
  typeof IntegrationRuntimesStopInput.Type;

// Output Schema
export const IntegrationRuntimesStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesStopOutput =
  typeof IntegrationRuntimesStopOutput.Type;

// The operation
/**
 * Stop integration runtime
 *
 * Stop an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimesStop = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesStopInput,
    outputSchema: IntegrationRuntimesStopOutput,
  }),
);
// Input Schema
export const IntegrationRuntimeStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/getStatus",
    }),
  );
export type IntegrationRuntimeStatusGetInput =
  typeof IntegrationRuntimeStatusGetInput.Type;

// Output Schema
export const IntegrationRuntimeStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    properties: Schema.Struct({
      type: Schema.Literals(["Managed", "SelfHosted"]),
      dataFactoryName: Schema.optional(Schema.String),
      state: Schema.optional(
        Schema.Literals([
          "Initial",
          "Stopped",
          "Started",
          "Starting",
          "Stopping",
          "NeedRegistration",
          "Online",
          "Limited",
          "Offline",
          "AccessDenied",
        ]),
      ),
    }),
  });
export type IntegrationRuntimeStatusGetOutput =
  typeof IntegrationRuntimeStatusGetOutput.Type;

// The operation
/**
 * Get integration runtime status
 *
 * Get the integration runtime status
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimeStatusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimeStatusGetInput,
    outputSchema: IntegrationRuntimeStatusGetOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}",
    }),
  );
export type IntegrationRuntimesUpdateInput =
  typeof IntegrationRuntimesUpdateInput.Type;

// Output Schema
export const IntegrationRuntimesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IntegrationRuntimesUpdateOutput =
  typeof IntegrationRuntimesUpdateOutput.Type;

// The operation
/**
 * Update integration runtime
 *
 * Update an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesUpdateInput,
    outputSchema: IntegrationRuntimesUpdateOutput,
  }),
);
// Input Schema
export const IntegrationRuntimesUpgradeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/integrationRuntimes/{integrationRuntimeName}/upgrade",
    }),
  );
export type IntegrationRuntimesUpgradeInput =
  typeof IntegrationRuntimesUpgradeInput.Type;

// Output Schema
export const IntegrationRuntimesUpgradeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IntegrationRuntimesUpgradeOutput =
  typeof IntegrationRuntimesUpgradeOutput.Type;

// The operation
/**
 * Upgrade integration runtime
 *
 * Upgrade an integration runtime
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IntegrationRuntimesUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IntegrationRuntimesUpgradeInput,
    outputSchema: IntegrationRuntimesUpgradeOutput,
  }),
);
// Input Schema
export const IpFirewallRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/firewallRules/{ruleName}",
    }),
  );
export type IpFirewallRulesCreateOrUpdateInput =
  typeof IpFirewallRulesCreateOrUpdateInput.Type;

// Output Schema
export const IpFirewallRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IpFirewallRulesCreateOrUpdateOutput =
  typeof IpFirewallRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a firewall rule
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IpFirewallRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IpFirewallRulesCreateOrUpdateInput,
    outputSchema: IpFirewallRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const IpFirewallRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/firewallRules/{ruleName}",
    }),
  );
export type IpFirewallRulesDeleteInput = typeof IpFirewallRulesDeleteInput.Type;

// Output Schema
export const IpFirewallRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IpFirewallRulesDeleteOutput =
  typeof IpFirewallRulesDeleteOutput.Type;

// The operation
/**
 * Deletes a firewall rule
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IpFirewallRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IpFirewallRulesDeleteInput,
    outputSchema: IpFirewallRulesDeleteOutput,
  }),
);
// Input Schema
export const IpFirewallRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/firewallRules/{ruleName}",
    }),
  );
export type IpFirewallRulesGetInput = typeof IpFirewallRulesGetInput.Type;

// Output Schema
export const IpFirewallRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IpFirewallRulesGetOutput = typeof IpFirewallRulesGetOutput.Type;

// The operation
/**
 * Get a firewall rule
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IpFirewallRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: IpFirewallRulesGetInput,
  outputSchema: IpFirewallRulesGetOutput,
}));
// Input Schema
export const IpFirewallRulesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/firewallRules",
    }),
  );
export type IpFirewallRulesListByWorkspaceInput =
  typeof IpFirewallRulesListByWorkspaceInput.Type;

// Output Schema
export const IpFirewallRulesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type IpFirewallRulesListByWorkspaceOutput =
  typeof IpFirewallRulesListByWorkspaceOutput.Type;

// The operation
/**
 * Returns a list of firewall rules
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IpFirewallRulesListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IpFirewallRulesListByWorkspaceInput,
    outputSchema: IpFirewallRulesListByWorkspaceOutput,
  }));
// Input Schema
export const IpFirewallRulesReplaceAllInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/replaceAllIpFirewallRules",
    }),
  );
export type IpFirewallRulesReplaceAllInput =
  typeof IpFirewallRulesReplaceAllInput.Type;

// Output Schema
export const IpFirewallRulesReplaceAllOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    operationId: Schema.optional(Schema.String),
  });
export type IpFirewallRulesReplaceAllOutput =
  typeof IpFirewallRulesReplaceAllOutput.Type;

// The operation
/**
 * Replaces firewall rules
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const IpFirewallRulesReplaceAll = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IpFirewallRulesReplaceAllInput,
    outputSchema: IpFirewallRulesReplaceAllOutput,
  }),
);
// Input Schema
export const KeysCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/keys/{keyName}",
    }),
  );
export type KeysCreateOrUpdateInput = typeof KeysCreateOrUpdateInput.Type;

// Output Schema
export const KeysCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type KeysCreateOrUpdateOutput = typeof KeysCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workspace key
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const KeysCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KeysCreateOrUpdateInput,
  outputSchema: KeysCreateOrUpdateOutput,
}));
// Input Schema
export const KeysDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/keys/{keyName}",
  }),
);
export type KeysDeleteInput = typeof KeysDeleteInput.Type;

// Output Schema
export const KeysDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type KeysDeleteOutput = typeof KeysDeleteOutput.Type;

// The operation
/**
 * Deletes a workspace key
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const KeysDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KeysDeleteInput,
  outputSchema: KeysDeleteOutput,
}));
// Input Schema
export const KeysGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/keys/{keyName}",
  }),
);
export type KeysGetInput = typeof KeysGetInput.Type;

// Output Schema
export const KeysGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type KeysGetOutput = typeof KeysGetOutput.Type;

// The operation
/**
 * Gets a workspace key
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const KeysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KeysGetInput,
  outputSchema: KeysGetOutput,
}));
// Input Schema
export const KeysListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/keys",
    }),
  );
export type KeysListByWorkspaceInput = typeof KeysListByWorkspaceInput.Type;

// Output Schema
export const KeysListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type KeysListByWorkspaceOutput = typeof KeysListByWorkspaceOutput.Type;

// The operation
/**
 * Returns a list of keys in a workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const KeysListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: KeysListByWorkspaceInput,
  outputSchema: KeysListByWorkspaceOutput,
}));
// Input Schema
export const LibrariesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/libraries",
    }),
  );
export type LibrariesListByWorkspaceInput =
  typeof LibrariesListByWorkspaceInput.Type;

// Output Schema
export const LibrariesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type LibrariesListByWorkspaceOutput =
  typeof LibrariesListByWorkspaceOutput.Type;

// The operation
/**
 * List the libraries in a workspace.
 *
 * List libraries in a workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const LibrariesListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LibrariesListByWorkspaceInput,
    outputSchema: LibrariesListByWorkspaceOutput,
  }),
);
// Input Schema
export const LibraryGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/libraries/{libraryName}",
  }),
);
export type LibraryGetInput = typeof LibraryGetInput.Type;

// Output Schema
export const LibraryGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LibraryGetOutput = typeof LibraryGetOutput.Type;

// The operation
/**
 * Get library by name.
 *
 * Get library by name in a workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const LibraryGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: LibraryGetInput,
  outputSchema: LibraryGetOutput,
}));
// Input Schema
export const OperationsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Synapse/checkNameAvailability",
    }),
  );
export type OperationsCheckNameAvailabilityInput =
  typeof OperationsCheckNameAvailabilityInput.Type;

// Output Schema
export const OperationsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    available: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  });
export type OperationsCheckNameAvailabilityOutput =
  typeof OperationsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check name availability
 *
 * Check whether a workspace name is available
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const OperationsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OperationsCheckNameAvailabilityInput,
    outputSchema: OperationsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const OperationsGetLocationHeaderResultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/operationResults/{operationId}",
    }),
  );
export type OperationsGetLocationHeaderResultInput =
  typeof OperationsGetLocationHeaderResultInput.Type;

// Output Schema
export const OperationsGetLocationHeaderResultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OperationsGetLocationHeaderResultOutput =
  typeof OperationsGetLocationHeaderResultOutput.Type;

// The operation
/**
 * Get operation result
 *
 * Get the result of an operation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param operationId - Operation ID
 */
export const OperationsGetLocationHeaderResult =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OperationsGetLocationHeaderResultInput,
    outputSchema: OperationsGetLocationHeaderResultOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Synapse/operations" }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
  Schema.Struct({
    display: Schema.optional(
      Schema.Struct({
        description: Schema.optional(Schema.String),
        resource: Schema.optional(Schema.String),
        provider: Schema.optional(Schema.String),
        operation: Schema.optional(Schema.String),
      }),
    ),
    isDataAction: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        serviceSpecification: Schema.optional(
          Schema.Struct({
            metricSpecifications: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  sourceMdmNamespace: Schema.optional(Schema.String),
                  displayName: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                  aggregationType: Schema.optional(Schema.String),
                  displayDescription: Schema.optional(Schema.String),
                  sourceMdmAccount: Schema.optional(Schema.String),
                  enableRegionalMdmAccount: Schema.optional(Schema.Boolean),
                  unit: Schema.optional(Schema.String),
                  dimensions: Schema.optional(
                    Schema.Array(
                      Schema.Struct({
                        displayName: Schema.optional(Schema.String),
                        name: Schema.optional(Schema.String),
                        toBeExportedForShoebox: Schema.optional(Schema.Boolean),
                      }),
                    ),
                  ),
                  supportsInstanceLevelAggregation: Schema.optional(
                    Schema.Boolean,
                  ),
                  metricFilterPattern: Schema.optional(Schema.String),
                }),
              ),
            ),
            logSpecifications: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  displayName: Schema.optional(Schema.String),
                  blobDuration: Schema.optional(Schema.String),
                  name: Schema.optional(Schema.String),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    origin: Schema.optional(Schema.String),
  }),
);
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * All operations
 *
 * Get all available operations
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Delete a private endpoint connection.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Gets a private endpoint connection.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateLinkHubPrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/privateLinkHubs/{privateLinkHubName}/privateLinkResources/{privateLinkResourceName}",
    }),
  );
export type PrivateLinkHubPrivateLinkResourcesGetInput =
  typeof PrivateLinkHubPrivateLinkResourcesGetInput.Type;

// Output Schema
export const PrivateLinkHubPrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type PrivateLinkHubPrivateLinkResourcesGetOutput =
  typeof PrivateLinkHubPrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Get Private Link Hub Private Link Resource
 *
 * Get private link resource in private link hub
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PrivateLinkHubPrivateLinkResourcesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkHubPrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkHubPrivateLinkResourcesGetOutput,
  }));
// Input Schema
export const PrivateLinkHubPrivateLinkResourcesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/privateLinkHubs/{privateLinkHubName}/privateLinkResources",
    }),
  );
export type PrivateLinkHubPrivateLinkResourcesListInput =
  typeof PrivateLinkHubPrivateLinkResourcesListInput.Type;

// Output Schema
export const PrivateLinkHubPrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkHubPrivateLinkResourcesListOutput =
  typeof PrivateLinkHubPrivateLinkResourcesListOutput.Type;

// The operation
/**
 * Private Link Resources
 *
 * Get all private link resources for a private link hub
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const PrivateLinkHubPrivateLinkResourcesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkHubPrivateLinkResourcesListInput,
    outputSchema: PrivateLinkHubPrivateLinkResourcesListOutput,
  }));
// Input Schema
export const PrivateLinkHubsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/privateLinkHubs/{privateLinkHubName}",
    }),
  );
export type PrivateLinkHubsCreateOrUpdateInput =
  typeof PrivateLinkHubsCreateOrUpdateInput.Type;

// Output Schema
export const PrivateLinkHubsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PrivateLinkHubsCreateOrUpdateOutput =
  typeof PrivateLinkHubsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a privateLinkHub
 */
export const PrivateLinkHubsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkHubsCreateOrUpdateInput,
    outputSchema: PrivateLinkHubsCreateOrUpdateOutput,
  }));
// Input Schema
export const PrivateLinkHubsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/privateLinkHubs/{privateLinkHubName}",
    }),
  );
export type PrivateLinkHubsDeleteInput = typeof PrivateLinkHubsDeleteInput.Type;

// Output Schema
export const PrivateLinkHubsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateLinkHubsDeleteOutput =
  typeof PrivateLinkHubsDeleteOutput.Type;

// The operation
/**
 * Deletes a privateLinkHub
 */
export const PrivateLinkHubsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkHubsDeleteInput,
    outputSchema: PrivateLinkHubsDeleteOutput,
  }),
);
// Input Schema
export const PrivateLinkHubsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/privateLinkHubs/{privateLinkHubName}",
    }),
  );
export type PrivateLinkHubsGetInput = typeof PrivateLinkHubsGetInput.Type;

// Output Schema
export const PrivateLinkHubsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PrivateLinkHubsGetOutput = typeof PrivateLinkHubsGetOutput.Type;

// The operation
/**
 * Gets a privateLinkHub
 */
export const PrivateLinkHubsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateLinkHubsGetInput,
  outputSchema: PrivateLinkHubsGetOutput,
}));
// Input Schema
export const PrivateLinkHubsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Synapse/privateLinkHubs",
    }),
  );
export type PrivateLinkHubsListInput = typeof PrivateLinkHubsListInput.Type;

// Output Schema
export const PrivateLinkHubsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type PrivateLinkHubsListOutput = typeof PrivateLinkHubsListOutput.Type;

// The operation
/**
 * Returns a list of privateLinkHubs in a subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const PrivateLinkHubsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PrivateLinkHubsListInput,
  outputSchema: PrivateLinkHubsListOutput,
}));
// Input Schema
export const PrivateLinkHubsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/privateLinkHubs",
    }),
  );
export type PrivateLinkHubsListByResourceGroupInput =
  typeof PrivateLinkHubsListByResourceGroupInput.Type;

// Output Schema
export const PrivateLinkHubsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type PrivateLinkHubsListByResourceGroupOutput =
  typeof PrivateLinkHubsListByResourceGroupOutput.Type;

// The operation
/**
 * Returns a list of privateLinkHubs in a resource group
 */
export const PrivateLinkHubsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkHubsListByResourceGroupInput,
    outputSchema: PrivateLinkHubsListByResourceGroupOutput,
  }));
// Input Schema
export const PrivateLinkHubsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/privateLinkHubs/{privateLinkHubName}",
    }),
  );
export type PrivateLinkHubsUpdateInput = typeof PrivateLinkHubsUpdateInput.Type;

// Output Schema
export const PrivateLinkHubsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PrivateLinkHubsUpdateOutput =
  typeof PrivateLinkHubsUpdateOutput.Type;

// The operation
/**
 * Updates a privateLinkHub
 */
export const PrivateLinkHubsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkHubsUpdateInput,
    outputSchema: PrivateLinkHubsUpdateOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/privateLinkResources/{privateLinkResourceName}",
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
 * Get Private Link Resource
 *
 * Get private link resource in workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
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
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListInput =
  typeof PrivateLinkResourcesListInput.Type;

// Output Schema
export const PrivateLinkResourcesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListOutput =
  typeof PrivateLinkResourcesListOutput.Type;

// The operation
/**
 * Private Link Resources
 *
 * Get all private link resources for a workspaces
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const PrivateLinkResourcesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesListInput,
    outputSchema: PrivateLinkResourcesListOutput,
  }),
);
// Input Schema
export const RestorableDroppedSqlPoolsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    restorableDroppedSqlPoolId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/restorableDroppedSqlPools/{restorableDroppedSqlPoolId}",
    }),
  );
export type RestorableDroppedSqlPoolsGetInput =
  typeof RestorableDroppedSqlPoolsGetInput.Type;

// Output Schema
export const RestorableDroppedSqlPoolsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RestorableDroppedSqlPoolsGetOutput =
  typeof RestorableDroppedSqlPoolsGetOutput.Type;

// The operation
/**
 * Gets a deleted sql pool that can be restored
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param restorableDroppedSqlPoolId - The id of the deleted Sql Pool in the form of sqlPoolName,deletionTimeInFileTimeFormat
 */
export const RestorableDroppedSqlPoolsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableDroppedSqlPoolsGetInput,
    outputSchema: RestorableDroppedSqlPoolsGetOutput,
  }));
// Input Schema
export const RestorableDroppedSqlPoolsListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/restorableDroppedSqlPools",
    }),
  );
export type RestorableDroppedSqlPoolsListByWorkspaceInput =
  typeof RestorableDroppedSqlPoolsListByWorkspaceInput.Type;

// Output Schema
export const RestorableDroppedSqlPoolsListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
  });
export type RestorableDroppedSqlPoolsListByWorkspaceOutput =
  typeof RestorableDroppedSqlPoolsListByWorkspaceOutput.Type;

// The operation
/**
 * Gets a list of deleted Sql pools that can be restored
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const RestorableDroppedSqlPoolsListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableDroppedSqlPoolsListByWorkspaceInput,
    outputSchema: RestorableDroppedSqlPoolsListByWorkspaceOutput,
  }));
// Input Schema
export const SqlPoolBlobAuditingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    blobAuditingPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/auditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type SqlPoolBlobAuditingPoliciesCreateOrUpdateInput =
  typeof SqlPoolBlobAuditingPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolBlobAuditingPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolBlobAuditingPoliciesCreateOrUpdateOutput =
  typeof SqlPoolBlobAuditingPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a SQL pool's blob auditing policy
 *
 * Creates or updates a SQL pool's blob auditing policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param blobAuditingPolicyName - The name of the blob auditing policy.
 */
export const SqlPoolBlobAuditingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolBlobAuditingPoliciesCreateOrUpdateInput,
    outputSchema: SqlPoolBlobAuditingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolBlobAuditingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    blobAuditingPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/auditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type SqlPoolBlobAuditingPoliciesGetInput =
  typeof SqlPoolBlobAuditingPoliciesGetInput.Type;

// Output Schema
export const SqlPoolBlobAuditingPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolBlobAuditingPoliciesGetOutput =
  typeof SqlPoolBlobAuditingPoliciesGetOutput.Type;

// The operation
/**
 * Get a SQL pool's blob auditing policy
 *
 * Get a SQL pool's blob auditing policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param blobAuditingPolicyName - The name of the blob auditing policy.
 */
export const SqlPoolBlobAuditingPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolBlobAuditingPoliciesGetInput,
    outputSchema: SqlPoolBlobAuditingPoliciesGetOutput,
  }));
// Input Schema
export const SqlPoolBlobAuditingPoliciesListBySqlPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/auditingSettings",
    }),
  );
export type SqlPoolBlobAuditingPoliciesListBySqlPoolInput =
  typeof SqlPoolBlobAuditingPoliciesListBySqlPoolInput.Type;

// Output Schema
export const SqlPoolBlobAuditingPoliciesListBySqlPoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolBlobAuditingPoliciesListBySqlPoolOutput =
  typeof SqlPoolBlobAuditingPoliciesListBySqlPoolOutput.Type;

// The operation
/**
 * Lists auditing settings of a Sql pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolBlobAuditingPoliciesListBySqlPool =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolBlobAuditingPoliciesListBySqlPoolInput,
    outputSchema: SqlPoolBlobAuditingPoliciesListBySqlPoolOutput,
  }));
// Input Schema
export const SqlPoolColumnsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}",
  }),
);
export type SqlPoolColumnsGetInput = typeof SqlPoolColumnsGetInput.Type;

// Output Schema
export const SqlPoolColumnsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolColumnsGetOutput = typeof SqlPoolColumnsGetOutput.Type;

// The operation
/**
 * Get Sql pool column
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 */
export const SqlPoolColumnsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolColumnsGetInput,
  outputSchema: SqlPoolColumnsGetOutput,
}));
// Input Schema
export const SqlPoolDataWarehouseUserActivitiesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    dataWarehouseUserActivityName: Schema.Literals(["current"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/dataWarehouseUserActivities/{dataWarehouseUserActivityName}",
    }),
  );
export type SqlPoolDataWarehouseUserActivitiesGetInput =
  typeof SqlPoolDataWarehouseUserActivitiesGetInput.Type;

// Output Schema
export const SqlPoolDataWarehouseUserActivitiesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolDataWarehouseUserActivitiesGetOutput =
  typeof SqlPoolDataWarehouseUserActivitiesGetOutput.Type;

// The operation
/**
 * Get SQL pool user activities
 *
 * Gets the user activities of a SQL pool which includes running and suspended queries
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param dataWarehouseUserActivityName - The activity name of the Sql pool.
 */
export const SqlPoolDataWarehouseUserActivitiesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolDataWarehouseUserActivitiesGetInput,
    outputSchema: SqlPoolDataWarehouseUserActivitiesGetOutput,
  }));
// Input Schema
export const SqlPoolGeoBackupPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    geoBackupPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/geoBackupPolicies/{geoBackupPolicyName}",
    }),
  );
export type SqlPoolGeoBackupPoliciesCreateOrUpdateInput =
  typeof SqlPoolGeoBackupPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolGeoBackupPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolGeoBackupPoliciesCreateOrUpdateOutput =
  typeof SqlPoolGeoBackupPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates a SQL Pool geo backup policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param geoBackupPolicyName - The name of the geo backup policy.
 */
export const SqlPoolGeoBackupPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolGeoBackupPoliciesCreateOrUpdateInput,
    outputSchema: SqlPoolGeoBackupPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolGeoBackupPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    geoBackupPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/geoBackupPolicies/{geoBackupPolicyName}",
    }),
  );
export type SqlPoolGeoBackupPoliciesGetInput =
  typeof SqlPoolGeoBackupPoliciesGetInput.Type;

// Output Schema
export const SqlPoolGeoBackupPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolGeoBackupPoliciesGetOutput =
  typeof SqlPoolGeoBackupPoliciesGetOutput.Type;

// The operation
/**
 * Get a SQL pool geo backup policy
 *
 * Get the specified SQL pool geo backup policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param geoBackupPolicyName - The name of the geo backup policy.
 */
export const SqlPoolGeoBackupPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolGeoBackupPoliciesGetInput,
    outputSchema: SqlPoolGeoBackupPoliciesGetOutput,
  }),
);
// Input Schema
export const SqlPoolGeoBackupPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/geoBackupPolicies",
    }),
  );
export type SqlPoolGeoBackupPoliciesListInput =
  typeof SqlPoolGeoBackupPoliciesListInput.Type;

// Output Schema
export const SqlPoolGeoBackupPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type SqlPoolGeoBackupPoliciesListOutput =
  typeof SqlPoolGeoBackupPoliciesListOutput.Type;

// The operation
/**
 * List SQL pool geo backup policies
 *
 * Get list of SQL pool geo backup policies
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolGeoBackupPoliciesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolGeoBackupPoliciesListInput,
    outputSchema: SqlPoolGeoBackupPoliciesListOutput,
  }));
// Input Schema
export const SqlPoolMaintenanceWindowOptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    maintenanceWindowOptionsName: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/maintenanceWindowOptions/current",
    }),
  );
export type SqlPoolMaintenanceWindowOptionsGetInput =
  typeof SqlPoolMaintenanceWindowOptionsGetInput.Type;

// Output Schema
export const SqlPoolMaintenanceWindowOptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolMaintenanceWindowOptionsGetOutput =
  typeof SqlPoolMaintenanceWindowOptionsGetOutput.Type;

// The operation
/**
 * SQL pool's available maintenance windows.
 *
 * Get list of SQL pool's available maintenance windows.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param maintenanceWindowOptionsName - Maintenance window options name.
 */
export const SqlPoolMaintenanceWindowOptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolMaintenanceWindowOptionsGetInput,
    outputSchema: SqlPoolMaintenanceWindowOptionsGetOutput,
  }));
// Input Schema
export const SqlPoolMaintenanceWindowsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    maintenanceWindowName: Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/maintenancewindows/current",
    }),
  );
export type SqlPoolMaintenanceWindowsCreateOrUpdateInput =
  typeof SqlPoolMaintenanceWindowsCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolMaintenanceWindowsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolMaintenanceWindowsCreateOrUpdateOutput =
  typeof SqlPoolMaintenanceWindowsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Sql pool's maintenance windows settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param maintenanceWindowName - Maintenance window name.
 */
export const SqlPoolMaintenanceWindowsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolMaintenanceWindowsCreateOrUpdateInput,
    outputSchema: SqlPoolMaintenanceWindowsCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolMaintenanceWindowsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    maintenanceWindowName: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/maintenancewindows/current",
    }),
  );
export type SqlPoolMaintenanceWindowsGetInput =
  typeof SqlPoolMaintenanceWindowsGetInput.Type;

// Output Schema
export const SqlPoolMaintenanceWindowsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolMaintenanceWindowsGetOutput =
  typeof SqlPoolMaintenanceWindowsGetOutput.Type;

// The operation
/**
 * Get a SQL pool's Maintenance Windows.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param maintenanceWindowName - Maintenance window name.
 */
export const SqlPoolMaintenanceWindowsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolMaintenanceWindowsGetInput,
    outputSchema: SqlPoolMaintenanceWindowsGetOutput,
  }));
// Input Schema
export const SqlPoolOperationResultsGetLocationHeaderResultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/operationResults/{operationId}",
    }),
  );
export type SqlPoolOperationResultsGetLocationHeaderResultInput =
  typeof SqlPoolOperationResultsGetLocationHeaderResultInput.Type;

// Output Schema
export const SqlPoolOperationResultsGetLocationHeaderResultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SqlPoolOperationResultsGetLocationHeaderResultOutput =
  typeof SqlPoolOperationResultsGetLocationHeaderResultOutput.Type;

// The operation
/**
 * Get SQL pool operation status
 *
 * Get the status of a SQL pool operation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param operationId - Operation ID
 */
export const SqlPoolOperationResultsGetLocationHeaderResult =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolOperationResultsGetLocationHeaderResultInput,
    outputSchema: SqlPoolOperationResultsGetLocationHeaderResultOutput,
  }));
// Input Schema
export const SqlPoolOperationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/operations",
    }),
  );
export type SqlPoolOperationsListInput = typeof SqlPoolOperationsListInput.Type;

// Output Schema
export const SqlPoolOperationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolOperationsListOutput =
  typeof SqlPoolOperationsListOutput.Type;

// The operation
/**
 * Gets a list of operations performed on the SQL pool
 *
 * Gets a list of operations performed on the SQL pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolOperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolOperationsListInput,
    outputSchema: SqlPoolOperationsListOutput,
  }),
);
// Input Schema
export const SqlPoolRecommendedSensitivityLabelsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/recommendedSensitivityLabels",
    }),
  );
export type SqlPoolRecommendedSensitivityLabelsUpdateInput =
  typeof SqlPoolRecommendedSensitivityLabelsUpdateInput.Type;

// Output Schema
export const SqlPoolRecommendedSensitivityLabelsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolRecommendedSensitivityLabelsUpdateOutput =
  typeof SqlPoolRecommendedSensitivityLabelsUpdateOutput.Type;

// The operation
/**
 * Update recommended sensitivity labels states of a given SQL Pool using an operations batch.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolRecommendedSensitivityLabelsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolRecommendedSensitivityLabelsUpdateInput,
    outputSchema: SqlPoolRecommendedSensitivityLabelsUpdateOutput,
  }));
// Input Schema
export const SqlPoolReplicationLinksGetByNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    linkId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/replicationLinks/{linkId}",
    }),
  );
export type SqlPoolReplicationLinksGetByNameInput =
  typeof SqlPoolReplicationLinksGetByNameInput.Type;

// Output Schema
export const SqlPoolReplicationLinksGetByNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolReplicationLinksGetByNameOutput =
  typeof SqlPoolReplicationLinksGetByNameOutput.Type;

// The operation
/**
 * Get SQL pool replication link by name
 *
 * Get SQL pool replication link by name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param linkId - The ID of the replication link.
 */
export const SqlPoolReplicationLinksGetByName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolReplicationLinksGetByNameInput,
    outputSchema: SqlPoolReplicationLinksGetByNameOutput,
  }));
// Input Schema
export const SqlPoolReplicationLinksListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/replicationLinks",
    }),
  );
export type SqlPoolReplicationLinksListInput =
  typeof SqlPoolReplicationLinksListInput.Type;

// Output Schema
export const SqlPoolReplicationLinksListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolReplicationLinksListOutput =
  typeof SqlPoolReplicationLinksListOutput.Type;

// The operation
/**
 * Get SQL pool replication links
 *
 * Lists a Sql pool's replication links.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolReplicationLinksList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolReplicationLinksListInput,
    outputSchema: SqlPoolReplicationLinksListOutput,
  }),
);
// Input Schema
export const SqlPoolRestorePointsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/restorePoints",
    }),
  );
export type SqlPoolRestorePointsCreateInput =
  typeof SqlPoolRestorePointsCreateInput.Type;

// Output Schema
export const SqlPoolRestorePointsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolRestorePointsCreateOutput =
  typeof SqlPoolRestorePointsCreateOutput.Type;

// The operation
/**
 * Creates a restore point for a data warehouse.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolRestorePointsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolRestorePointsCreateInput,
    outputSchema: SqlPoolRestorePointsCreateOutput,
  }),
);
// Input Schema
export const SqlPoolRestorePointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    restorePointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/restorePoints/{restorePointName}",
    }),
  );
export type SqlPoolRestorePointsDeleteInput =
  typeof SqlPoolRestorePointsDeleteInput.Type;

// Output Schema
export const SqlPoolRestorePointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolRestorePointsDeleteOutput =
  typeof SqlPoolRestorePointsDeleteOutput.Type;

// The operation
/**
 * Deletes a restore point.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param restorePointName - The name of the restore point.
 */
export const SqlPoolRestorePointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolRestorePointsDeleteInput,
    outputSchema: SqlPoolRestorePointsDeleteOutput,
  }),
);
// Input Schema
export const SqlPoolRestorePointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    restorePointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/restorePoints/{restorePointName}",
    }),
  );
export type SqlPoolRestorePointsGetInput =
  typeof SqlPoolRestorePointsGetInput.Type;

// Output Schema
export const SqlPoolRestorePointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolRestorePointsGetOutput =
  typeof SqlPoolRestorePointsGetOutput.Type;

// The operation
/**
 * Gets a restore point.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param restorePointName - The name of the restore point.
 */
export const SqlPoolRestorePointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolRestorePointsGetInput,
    outputSchema: SqlPoolRestorePointsGetOutput,
  }),
);
// Input Schema
export const SqlPoolRestorePointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/restorePoints",
    }),
  );
export type SqlPoolRestorePointsListInput =
  typeof SqlPoolRestorePointsListInput.Type;

// Output Schema
export const SqlPoolRestorePointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolRestorePointsListOutput =
  typeof SqlPoolRestorePointsListOutput.Type;

// The operation
/**
 * Get SQL pool backup
 *
 * Get SQL pool backup information
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolRestorePointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolRestorePointsListInput,
    outputSchema: SqlPoolRestorePointsListOutput,
  }),
);
// Input Schema
export const SqlPoolSchemasGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}",
  }),
);
export type SqlPoolSchemasGetInput = typeof SqlPoolSchemasGetInput.Type;

// Output Schema
export const SqlPoolSchemasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolSchemasGetOutput = typeof SqlPoolSchemasGetOutput.Type;

// The operation
/**
 * Get Sql Pool schema
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 */
export const SqlPoolSchemasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolSchemasGetInput,
  outputSchema: SqlPoolSchemasGetOutput,
}));
// Input Schema
export const SqlPoolSchemasListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas",
    }),
  );
export type SqlPoolSchemasListInput = typeof SqlPoolSchemasListInput.Type;

// Output Schema
export const SqlPoolSchemasListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolSchemasListOutput = typeof SqlPoolSchemasListOutput.Type;

// The operation
/**
 * Gets schemas of a given SQL pool
 *
 * Gets schemas of a given SQL pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param $filter - An OData filter expression that filters elements in the collection.
 */
export const SqlPoolSchemasList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolSchemasListInput,
  outputSchema: SqlPoolSchemasListOutput,
}));
// Input Schema
export const SqlPoolsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  sqlPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}",
  }),
);
export type SqlPoolsCreateInput = typeof SqlPoolsCreateInput.Type;

// Output Schema
export const SqlPoolsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SqlPoolsCreateOutput = typeof SqlPoolsCreateOutput.Type;

// The operation
/**
 * Create SQL pool
 *
 * Create a SQL pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolsCreateInput,
  outputSchema: SqlPoolsCreateOutput,
}));
// Input Schema
export const SqlPoolsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  sqlPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}",
  }),
);
export type SqlPoolsDeleteInput = typeof SqlPoolsDeleteInput.Type;

// Output Schema
export const SqlPoolsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SqlPoolsDeleteOutput = typeof SqlPoolsDeleteOutput.Type;

// The operation
/**
 * Delete SQL pool
 *
 * Delete a SQL pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolsDeleteInput,
  outputSchema: SqlPoolsDeleteOutput,
}));
// Input Schema
export const SqlPoolSecurityAlertPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type SqlPoolSecurityAlertPoliciesCreateOrUpdateInput =
  typeof SqlPoolSecurityAlertPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolSecurityAlertPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolSecurityAlertPoliciesCreateOrUpdateOutput =
  typeof SqlPoolSecurityAlertPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a Sql pool's security alert policy
 *
 * Create or update a Sql pool's security alert policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param securityAlertPolicyName - The name of the security alert policy.
 */
export const SqlPoolSecurityAlertPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSecurityAlertPoliciesCreateOrUpdateInput,
    outputSchema: SqlPoolSecurityAlertPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolSecurityAlertPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type SqlPoolSecurityAlertPoliciesGetInput =
  typeof SqlPoolSecurityAlertPoliciesGetInput.Type;

// Output Schema
export const SqlPoolSecurityAlertPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolSecurityAlertPoliciesGetOutput =
  typeof SqlPoolSecurityAlertPoliciesGetOutput.Type;

// The operation
/**
 * Get a Sql pool's security alert policy
 *
 * Get a Sql pool's security alert policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param securityAlertPolicyName - The name of the security alert policy.
 */
export const SqlPoolSecurityAlertPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSecurityAlertPoliciesGetInput,
    outputSchema: SqlPoolSecurityAlertPoliciesGetOutput,
  }));
// Input Schema
export const SqlPoolSecurityAlertPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/securityAlertPolicies",
    }),
  );
export type SqlPoolSecurityAlertPoliciesListInput =
  typeof SqlPoolSecurityAlertPoliciesListInput.Type;

// Output Schema
export const SqlPoolSecurityAlertPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolSecurityAlertPoliciesListOutput =
  typeof SqlPoolSecurityAlertPoliciesListOutput.Type;

// The operation
/**
 * List Sql pool's security alert policies
 *
 * Get a list of Sql pool's security alert policies.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolSecurityAlertPoliciesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSecurityAlertPoliciesListInput,
    outputSchema: SqlPoolSecurityAlertPoliciesListOutput,
  }));
// Input Schema
export const SqlPoolSensitivityLabelsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["current"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
    }),
  );
export type SqlPoolSensitivityLabelsCreateOrUpdateInput =
  typeof SqlPoolSensitivityLabelsCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolSensitivityLabelsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolSensitivityLabelsCreateOrUpdateOutput =
  typeof SqlPoolSensitivityLabelsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the sensitivity label of a given column in a Sql pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 */
export const SqlPoolSensitivityLabelsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSensitivityLabelsCreateOrUpdateInput,
    outputSchema: SqlPoolSensitivityLabelsCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolSensitivityLabelsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["current"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
    }),
  );
export type SqlPoolSensitivityLabelsDeleteInput =
  typeof SqlPoolSensitivityLabelsDeleteInput.Type;

// Output Schema
export const SqlPoolSensitivityLabelsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolSensitivityLabelsDeleteOutput =
  typeof SqlPoolSensitivityLabelsDeleteOutput.Type;

// The operation
/**
 * Deletes the sensitivity label of a given column in a Sql pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 */
export const SqlPoolSensitivityLabelsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSensitivityLabelsDeleteInput,
    outputSchema: SqlPoolSensitivityLabelsDeleteOutput,
  }));
// Input Schema
export const SqlPoolSensitivityLabelsDisableRecommendationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["recommended"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/disable",
    }),
  );
export type SqlPoolSensitivityLabelsDisableRecommendationInput =
  typeof SqlPoolSensitivityLabelsDisableRecommendationInput.Type;

// Output Schema
export const SqlPoolSensitivityLabelsDisableRecommendationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolSensitivityLabelsDisableRecommendationOutput =
  typeof SqlPoolSensitivityLabelsDisableRecommendationOutput.Type;

// The operation
/**
 * Disables sensitivity recommendations on a given column
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 */
export const SqlPoolSensitivityLabelsDisableRecommendation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSensitivityLabelsDisableRecommendationInput,
    outputSchema: SqlPoolSensitivityLabelsDisableRecommendationOutput,
  }));
// Input Schema
export const SqlPoolSensitivityLabelsEnableRecommendationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["recommended"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/enable",
    }),
  );
export type SqlPoolSensitivityLabelsEnableRecommendationInput =
  typeof SqlPoolSensitivityLabelsEnableRecommendationInput.Type;

// Output Schema
export const SqlPoolSensitivityLabelsEnableRecommendationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolSensitivityLabelsEnableRecommendationOutput =
  typeof SqlPoolSensitivityLabelsEnableRecommendationOutput.Type;

// The operation
/**
 * Enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns)
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 */
export const SqlPoolSensitivityLabelsEnableRecommendation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSensitivityLabelsEnableRecommendationInput,
    outputSchema: SqlPoolSensitivityLabelsEnableRecommendationOutput,
  }));
// Input Schema
export const SqlPoolSensitivityLabelsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["current", "recommended"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
    }),
  );
export type SqlPoolSensitivityLabelsGetInput =
  typeof SqlPoolSensitivityLabelsGetInput.Type;

// Output Schema
export const SqlPoolSensitivityLabelsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolSensitivityLabelsGetOutput =
  typeof SqlPoolSensitivityLabelsGetOutput.Type;

// The operation
/**
 * Gets the sensitivity label of a given column
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 */
export const SqlPoolSensitivityLabelsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolSensitivityLabelsGetInput,
    outputSchema: SqlPoolSensitivityLabelsGetOutput,
  }),
);
// Input Schema
export const SqlPoolSensitivityLabelsListCurrentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/currentSensitivityLabels",
    }),
  );
export type SqlPoolSensitivityLabelsListCurrentInput =
  typeof SqlPoolSensitivityLabelsListCurrentInput.Type;

// Output Schema
export const SqlPoolSensitivityLabelsListCurrentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolSensitivityLabelsListCurrentOutput =
  typeof SqlPoolSensitivityLabelsListCurrentOutput.Type;

// The operation
/**
 * Gets SQL pool sensitivity labels
 *
 * Gets SQL pool sensitivity labels.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param $filter - An OData filter expression that filters elements in the collection.
 */
export const SqlPoolSensitivityLabelsListCurrent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSensitivityLabelsListCurrentInput,
    outputSchema: SqlPoolSensitivityLabelsListCurrentOutput,
  }));
// Input Schema
export const SqlPoolSensitivityLabelsListRecommendedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    includeDisabledRecommendations: Schema.optional(Schema.Boolean),
    $skipToken: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/recommendedSensitivityLabels",
    }),
  );
export type SqlPoolSensitivityLabelsListRecommendedInput =
  typeof SqlPoolSensitivityLabelsListRecommendedInput.Type;

// Output Schema
export const SqlPoolSensitivityLabelsListRecommendedOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolSensitivityLabelsListRecommendedOutput =
  typeof SqlPoolSensitivityLabelsListRecommendedOutput.Type;

// The operation
/**
 * Gets sensitivity labels of a given SQL pool
 *
 * Gets sensitivity labels of a given SQL pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param includeDisabledRecommendations - Specifies whether to include disabled recommendations or not.
 * @param $skipToken - An OData query option to indicate how many elements to skip in the collection.
 * @param $filter - An OData filter expression that filters elements in the collection.
 */
export const SqlPoolSensitivityLabelsListRecommended =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSensitivityLabelsListRecommendedInput,
    outputSchema: SqlPoolSensitivityLabelsListRecommendedOutput,
  }));
// Input Schema
export const SqlPoolSensitivityLabelsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/currentSensitivityLabels",
    }),
  );
export type SqlPoolSensitivityLabelsUpdateInput =
  typeof SqlPoolSensitivityLabelsUpdateInput.Type;

// Output Schema
export const SqlPoolSensitivityLabelsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolSensitivityLabelsUpdateOutput =
  typeof SqlPoolSensitivityLabelsUpdateOutput.Type;

// The operation
/**
 * Update sensitivity labels of a given SQL Pool using an operations batch.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolSensitivityLabelsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolSensitivityLabelsUpdateInput,
    outputSchema: SqlPoolSensitivityLabelsUpdateOutput,
  }));
// Input Schema
export const SqlPoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  sqlPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}",
  }),
);
export type SqlPoolsGetInput = typeof SqlPoolsGetInput.Type;

// Output Schema
export const SqlPoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SqlPoolsGetOutput = typeof SqlPoolsGetOutput.Type;

// The operation
/**
 * Get SQL pool
 *
 * Get SQL pool properties
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolsGetInput,
  outputSchema: SqlPoolsGetOutput,
}));
// Input Schema
export const SqlPoolsListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools",
    }),
  );
export type SqlPoolsListByWorkspaceInput =
  typeof SqlPoolsListByWorkspaceInput.Type;

// Output Schema
export const SqlPoolsListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type SqlPoolsListByWorkspaceOutput =
  typeof SqlPoolsListByWorkspaceOutput.Type;

// The operation
/**
 * List SQL pools
 *
 * List all SQL pools
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const SqlPoolsListByWorkspace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolsListByWorkspaceInput,
    outputSchema: SqlPoolsListByWorkspaceOutput,
  }),
);
// Input Schema
export const SqlPoolsPauseInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  sqlPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/pause",
  }),
);
export type SqlPoolsPauseInput = typeof SqlPoolsPauseInput.Type;

// Output Schema
export const SqlPoolsPauseOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SqlPoolsPauseOutput = typeof SqlPoolsPauseOutput.Type;

// The operation
/**
 * Pause SQL pool
 *
 * Pause a SQL pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolsPause = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolsPauseInput,
  outputSchema: SqlPoolsPauseOutput,
}));
// Input Schema
export const SqlPoolsResumeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  sqlPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/resume",
  }),
);
export type SqlPoolsResumeInput = typeof SqlPoolsResumeInput.Type;

// Output Schema
export const SqlPoolsResumeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SqlPoolsResumeOutput = typeof SqlPoolsResumeOutput.Type;

// The operation
/**
 * Resume SQL pool
 *
 * Resume a SQL pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolsResume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolsResumeInput,
  outputSchema: SqlPoolsResumeOutput,
}));
// Input Schema
export const SqlPoolsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  sqlPoolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}",
  }),
);
export type SqlPoolsUpdateInput = typeof SqlPoolsUpdateInput.Type;

// Output Schema
export const SqlPoolsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type SqlPoolsUpdateOutput = typeof SqlPoolsUpdateOutput.Type;

// The operation
/**
 * Update SQL pool
 *
 * Apply a partial update to a SQL pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolsUpdateInput,
  outputSchema: SqlPoolsUpdateOutput,
}));
// Input Schema
export const SqlPoolTableColumnsListByTableNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}/tables/{tableName}/columns",
    }),
  );
export type SqlPoolTableColumnsListByTableNameInput =
  typeof SqlPoolTableColumnsListByTableNameInput.Type;

// Output Schema
export const SqlPoolTableColumnsListByTableNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolTableColumnsListByTableNameOutput =
  typeof SqlPoolTableColumnsListByTableNameOutput.Type;

// The operation
/**
 * Gets columns in a given table in a SQL pool
 *
 * Gets columns in a given table in a SQL pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param $filter - An OData filter expression that filters elements in the collection.
 */
export const SqlPoolTableColumnsListByTableName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolTableColumnsListByTableNameInput,
    outputSchema: SqlPoolTableColumnsListByTableNameOutput,
  }));
// Input Schema
export const SqlPoolTablesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  sqlPoolName: Schema.String.pipe(T.PathParam()),
  schemaName: Schema.String.pipe(T.PathParam()),
  tableName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}/tables/{tableName}",
  }),
);
export type SqlPoolTablesGetInput = typeof SqlPoolTablesGetInput.Type;

// Output Schema
export const SqlPoolTablesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SqlPoolTablesGetOutput = typeof SqlPoolTablesGetOutput.Type;

// The operation
/**
 * Get Sql pool table
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 */
export const SqlPoolTablesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolTablesGetInput,
  outputSchema: SqlPoolTablesGetOutput,
}));
// Input Schema
export const SqlPoolTablesListBySchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/schemas/{schemaName}/tables",
    }),
  );
export type SqlPoolTablesListBySchemaInput =
  typeof SqlPoolTablesListBySchemaInput.Type;

// Output Schema
export const SqlPoolTablesListBySchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolTablesListBySchemaOutput =
  typeof SqlPoolTablesListBySchemaOutput.Type;

// The operation
/**
 * Gets tables of a given schema in a SQL pool
 *
 * Gets tables of a given schema in a SQL pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param schemaName - The name of the schema.
 * @param $filter - An OData filter expression that filters elements in the collection.
 */
export const SqlPoolTablesListBySchema = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolTablesListBySchemaInput,
    outputSchema: SqlPoolTablesListBySchemaOutput,
  }),
);
// Input Schema
export const SqlPoolTransparentDataEncryptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    transparentDataEncryptionName: Schema.Literals(["current"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/transparentDataEncryption/{transparentDataEncryptionName}",
    }),
  );
export type SqlPoolTransparentDataEncryptionsCreateOrUpdateInput =
  typeof SqlPoolTransparentDataEncryptionsCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolTransparentDataEncryptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolTransparentDataEncryptionsCreateOrUpdateOutput =
  typeof SqlPoolTransparentDataEncryptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Sql pool's transparent data encryption configuration
 *
 * Creates or updates a Sql pool's transparent data encryption configuration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param transparentDataEncryptionName - The name of the transparent data encryption configuration.
 */
export const SqlPoolTransparentDataEncryptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolTransparentDataEncryptionsCreateOrUpdateInput,
    outputSchema: SqlPoolTransparentDataEncryptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolTransparentDataEncryptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    transparentDataEncryptionName: Schema.Literals(["current"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/transparentDataEncryption/{transparentDataEncryptionName}",
    }),
  );
export type SqlPoolTransparentDataEncryptionsGetInput =
  typeof SqlPoolTransparentDataEncryptionsGetInput.Type;

// Output Schema
export const SqlPoolTransparentDataEncryptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolTransparentDataEncryptionsGetOutput =
  typeof SqlPoolTransparentDataEncryptionsGetOutput.Type;

// The operation
/**
 * Get a SQL pool's transparent data encryption configuration
 *
 * Get a SQL pool's transparent data encryption configuration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param transparentDataEncryptionName - The name of the transparent data encryption configuration.
 */
export const SqlPoolTransparentDataEncryptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolTransparentDataEncryptionsGetInput,
    outputSchema: SqlPoolTransparentDataEncryptionsGetOutput,
  }));
// Input Schema
export const SqlPoolTransparentDataEncryptionsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/transparentDataEncryption",
    }),
  );
export type SqlPoolTransparentDataEncryptionsListInput =
  typeof SqlPoolTransparentDataEncryptionsListInput.Type;

// Output Schema
export const SqlPoolTransparentDataEncryptionsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolTransparentDataEncryptionsListOutput =
  typeof SqlPoolTransparentDataEncryptionsListOutput.Type;

// The operation
/**
 * SQL pool's transparent data encryption configurations
 *
 * Get list of SQL pool's transparent data encryption configurations.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolTransparentDataEncryptionsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolTransparentDataEncryptionsListInput,
    outputSchema: SqlPoolTransparentDataEncryptionsListOutput,
  }));
// Input Schema
export const SqlPoolUsagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/usages",
  }),
);
export type SqlPoolUsagesListInput = typeof SqlPoolUsagesListInput.Type;

// Output Schema
export const SqlPoolUsagesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        resourceName: Schema.optional(Schema.String),
        displayName: Schema.optional(Schema.String),
        currentValue: Schema.optional(Schema.Number),
        limit: Schema.optional(Schema.Number),
        unit: Schema.optional(Schema.String),
        nextResetTime: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolUsagesListOutput = typeof SqlPoolUsagesListOutput.Type;

// The operation
/**
 * Gets SQL pool usages
 *
 * Gets SQL pool usages.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolUsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlPoolUsagesListInput,
  outputSchema: SqlPoolUsagesListOutput,
}));
// Input Schema
export const SqlPoolVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    ruleId: Schema.String.pipe(T.PathParam()),
    baselineName: Schema.Literals(["master", "default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/rules/{ruleId}/baselines/{baselineName}",
    }),
  );
export type SqlPoolVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput =
  typeof SqlPoolVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput =
  typeof SqlPoolVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a Sql pool's vulnerability assessment rule baseline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param baselineName - The name of the vulnerability assessment rule baseline (default implies a baseline on a Sql pool level rule and master for workspace level rule).
 */
export const SqlPoolVulnerabilityAssessmentRuleBaselinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput,
    outputSchema:
      SqlPoolVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentRuleBaselinesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    ruleId: Schema.String.pipe(T.PathParam()),
    baselineName: Schema.Literals(["master", "default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/rules/{ruleId}/baselines/{baselineName}",
    }),
  );
export type SqlPoolVulnerabilityAssessmentRuleBaselinesDeleteInput =
  typeof SqlPoolVulnerabilityAssessmentRuleBaselinesDeleteInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  typeof SqlPoolVulnerabilityAssessmentRuleBaselinesDeleteOutput.Type;

// The operation
/**
 * Removes the database's vulnerability assessment rule baseline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param baselineName - The name of the vulnerability assessment rule baseline (default implies a baseline on a Sql pool level rule and master for workspace level rule).
 */
export const SqlPoolVulnerabilityAssessmentRuleBaselinesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentRuleBaselinesDeleteInput,
    outputSchema: SqlPoolVulnerabilityAssessmentRuleBaselinesDeleteOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentRuleBaselinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    ruleId: Schema.String.pipe(T.PathParam()),
    baselineName: Schema.Literals(["master", "default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/rules/{ruleId}/baselines/{baselineName}",
    }),
  );
export type SqlPoolVulnerabilityAssessmentRuleBaselinesGetInput =
  typeof SqlPoolVulnerabilityAssessmentRuleBaselinesGetInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentRuleBaselinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolVulnerabilityAssessmentRuleBaselinesGetOutput =
  typeof SqlPoolVulnerabilityAssessmentRuleBaselinesGetOutput.Type;

// The operation
/**
 * Gets a SqlPool's vulnerability assessment rule baseline.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param baselineName - The name of the vulnerability assessment rule baseline (default implies a baseline on a Sql pool level rule and master for server level rule).
 */
export const SqlPoolVulnerabilityAssessmentRuleBaselinesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentRuleBaselinesGetInput,
    outputSchema: SqlPoolVulnerabilityAssessmentRuleBaselinesGetOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentScansExportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/export",
    }),
  );
export type SqlPoolVulnerabilityAssessmentScansExportInput =
  typeof SqlPoolVulnerabilityAssessmentScansExportInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentScansExportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolVulnerabilityAssessmentScansExportOutput =
  typeof SqlPoolVulnerabilityAssessmentScansExportOutput.Type;

// The operation
/**
 * Convert an existing scan result to a human readable format. If already exists nothing happens
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id of the scan to retrieve.
 */
export const SqlPoolVulnerabilityAssessmentScansExport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentScansExportInput,
    outputSchema: SqlPoolVulnerabilityAssessmentScansExportOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentScansGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}",
    }),
  );
export type SqlPoolVulnerabilityAssessmentScansGetInput =
  typeof SqlPoolVulnerabilityAssessmentScansGetInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentScansGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolVulnerabilityAssessmentScansGetOutput =
  typeof SqlPoolVulnerabilityAssessmentScansGetOutput.Type;

// The operation
/**
 * Gets a vulnerability assessment scan record of a Sql pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id of the scan to retrieve.
 */
export const SqlPoolVulnerabilityAssessmentScansGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentScansGetInput,
    outputSchema: SqlPoolVulnerabilityAssessmentScansGetOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentScansInitiateScanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/initiateScan",
    }),
  );
export type SqlPoolVulnerabilityAssessmentScansInitiateScanInput =
  typeof SqlPoolVulnerabilityAssessmentScansInitiateScanInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentScansInitiateScanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolVulnerabilityAssessmentScansInitiateScanOutput =
  typeof SqlPoolVulnerabilityAssessmentScansInitiateScanOutput.Type;

// The operation
/**
 * Executes a Vulnerability Assessment database scan.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id of the scan to retrieve.
 */
export const SqlPoolVulnerabilityAssessmentScansInitiateScan =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentScansInitiateScanInput,
    outputSchema: SqlPoolVulnerabilityAssessmentScansInitiateScanOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentScansListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans",
    }),
  );
export type SqlPoolVulnerabilityAssessmentScansListInput =
  typeof SqlPoolVulnerabilityAssessmentScansListInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentScansListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolVulnerabilityAssessmentScansListOutput =
  typeof SqlPoolVulnerabilityAssessmentScansListOutput.Type;

// The operation
/**
 * Lists the vulnerability assessment scans of a SQL pool
 *
 * Lists the vulnerability assessment scans of a SQL pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 */
export const SqlPoolVulnerabilityAssessmentScansList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentScansListInput,
    outputSchema: SqlPoolVulnerabilityAssessmentScansListOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type SqlPoolVulnerabilityAssessmentsCreateOrUpdateInput =
  typeof SqlPoolVulnerabilityAssessmentsCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolVulnerabilityAssessmentsCreateOrUpdateOutput =
  typeof SqlPoolVulnerabilityAssessmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the Sql pool vulnerability assessment
 *
 * Creates or updates the Sql pool vulnerability assessment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 */
export const SqlPoolVulnerabilityAssessmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentsCreateOrUpdateInput,
    outputSchema: SqlPoolVulnerabilityAssessmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type SqlPoolVulnerabilityAssessmentsDeleteInput =
  typeof SqlPoolVulnerabilityAssessmentsDeleteInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolVulnerabilityAssessmentsDeleteOutput =
  typeof SqlPoolVulnerabilityAssessmentsDeleteOutput.Type;

// The operation
/**
 * Removes the database's vulnerability assessment
 *
 * Removes the database's vulnerability assessment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 */
export const SqlPoolVulnerabilityAssessmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentsDeleteInput,
    outputSchema: SqlPoolVulnerabilityAssessmentsDeleteOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type SqlPoolVulnerabilityAssessmentsGetInput =
  typeof SqlPoolVulnerabilityAssessmentsGetInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolVulnerabilityAssessmentsGetOutput =
  typeof SqlPoolVulnerabilityAssessmentsGetOutput.Type;

// The operation
/**
 * Gets the Sql pool's vulnerability assessment
 *
 * Gets the Sql pool's vulnerability assessment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 */
export const SqlPoolVulnerabilityAssessmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentsGetInput,
    outputSchema: SqlPoolVulnerabilityAssessmentsGetOutput,
  }));
// Input Schema
export const SqlPoolVulnerabilityAssessmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/vulnerabilityAssessments",
    }),
  );
export type SqlPoolVulnerabilityAssessmentsListInput =
  typeof SqlPoolVulnerabilityAssessmentsListInput.Type;

// Output Schema
export const SqlPoolVulnerabilityAssessmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolVulnerabilityAssessmentsListOutput =
  typeof SqlPoolVulnerabilityAssessmentsListOutput.Type;

// The operation
/**
 * Lists the vulnerability assessment policies associated with a SQL pool
 *
 * Lists the vulnerability assessment policies associated with a SQL pool.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolVulnerabilityAssessmentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolVulnerabilityAssessmentsListInput,
    outputSchema: SqlPoolVulnerabilityAssessmentsListOutput,
  }));
// Input Schema
export const SqlPoolWorkloadClassifierCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    workloadClassifierName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}",
    }),
  );
export type SqlPoolWorkloadClassifierCreateOrUpdateInput =
  typeof SqlPoolWorkloadClassifierCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolWorkloadClassifierCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolWorkloadClassifierCreateOrUpdateOutput =
  typeof SqlPoolWorkloadClassifierCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Or Update workload classifier
 *
 * Create Or Update workload classifier for a Sql pool's workload group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param workloadGroupName - The name of the workload group.
 * @param workloadClassifierName - The name of the workload classifier.
 */
export const SqlPoolWorkloadClassifierCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolWorkloadClassifierCreateOrUpdateInput,
    outputSchema: SqlPoolWorkloadClassifierCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolWorkloadClassifierDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    workloadClassifierName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}",
    }),
  );
export type SqlPoolWorkloadClassifierDeleteInput =
  typeof SqlPoolWorkloadClassifierDeleteInput.Type;

// Output Schema
export const SqlPoolWorkloadClassifierDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolWorkloadClassifierDeleteOutput =
  typeof SqlPoolWorkloadClassifierDeleteOutput.Type;

// The operation
/**
 * Remove workload classifier
 *
 * Remove workload classifier of a Sql pool's workload group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param workloadGroupName - The name of the workload group.
 * @param workloadClassifierName - The name of the workload classifier.
 */
export const SqlPoolWorkloadClassifierDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolWorkloadClassifierDeleteInput,
    outputSchema: SqlPoolWorkloadClassifierDeleteOutput,
  }));
// Input Schema
export const SqlPoolWorkloadClassifierGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    workloadClassifierName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}",
    }),
  );
export type SqlPoolWorkloadClassifierGetInput =
  typeof SqlPoolWorkloadClassifierGetInput.Type;

// Output Schema
export const SqlPoolWorkloadClassifierGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolWorkloadClassifierGetOutput =
  typeof SqlPoolWorkloadClassifierGetOutput.Type;

// The operation
/**
 * Get workload classifier
 *
 * Get a workload classifier of Sql pool's workload group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param workloadGroupName - The name of the workload group.
 * @param workloadClassifierName - The name of the workload classifier.
 */
export const SqlPoolWorkloadClassifierGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolWorkloadClassifierGetInput,
    outputSchema: SqlPoolWorkloadClassifierGetOutput,
  }));
// Input Schema
export const SqlPoolWorkloadClassifierListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/workloadGroups/{workloadGroupName}/workloadClassifiers",
    }),
  );
export type SqlPoolWorkloadClassifierListInput =
  typeof SqlPoolWorkloadClassifierListInput.Type;

// Output Schema
export const SqlPoolWorkloadClassifierListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolWorkloadClassifierListOutput =
  typeof SqlPoolWorkloadClassifierListOutput.Type;

// The operation
/**
 * Sql pool's workload classifier
 *
 * Get list of  Sql pool's workload classifier for workload groups.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param workloadGroupName - The name of the workload group.
 */
export const SqlPoolWorkloadClassifierList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolWorkloadClassifierListInput,
    outputSchema: SqlPoolWorkloadClassifierListOutput,
  }));
// Input Schema
export const SqlPoolWorkloadGroupCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/workloadGroups/{workloadGroupName}",
    }),
  );
export type SqlPoolWorkloadGroupCreateOrUpdateInput =
  typeof SqlPoolWorkloadGroupCreateOrUpdateInput.Type;

// Output Schema
export const SqlPoolWorkloadGroupCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolWorkloadGroupCreateOrUpdateOutput =
  typeof SqlPoolWorkloadGroupCreateOrUpdateOutput.Type;

// The operation
/**
 * Create Or Update workload group
 *
 * Create Or Update a Sql pool's workload group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param workloadGroupName - The name of the workload group.
 */
export const SqlPoolWorkloadGroupCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlPoolWorkloadGroupCreateOrUpdateInput,
    outputSchema: SqlPoolWorkloadGroupCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlPoolWorkloadGroupDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/workloadGroups/{workloadGroupName}",
    }),
  );
export type SqlPoolWorkloadGroupDeleteInput =
  typeof SqlPoolWorkloadGroupDeleteInput.Type;

// Output Schema
export const SqlPoolWorkloadGroupDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlPoolWorkloadGroupDeleteOutput =
  typeof SqlPoolWorkloadGroupDeleteOutput.Type;

// The operation
/**
 * Remove workload group
 *
 * Remove Sql pool's workload group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param workloadGroupName - The name of the workload group.
 */
export const SqlPoolWorkloadGroupDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolWorkloadGroupDeleteInput,
    outputSchema: SqlPoolWorkloadGroupDeleteOutput,
  }),
);
// Input Schema
export const SqlPoolWorkloadGroupGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/workloadGroups/{workloadGroupName}",
    }),
  );
export type SqlPoolWorkloadGroupGetInput =
  typeof SqlPoolWorkloadGroupGetInput.Type;

// Output Schema
export const SqlPoolWorkloadGroupGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlPoolWorkloadGroupGetOutput =
  typeof SqlPoolWorkloadGroupGetOutput.Type;

// The operation
/**
 * Sql pool's workload group
 *
 * Get a Sql pool's workload group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 * @param workloadGroupName - The name of the workload group.
 */
export const SqlPoolWorkloadGroupGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolWorkloadGroupGetInput,
    outputSchema: SqlPoolWorkloadGroupGetOutput,
  }),
);
// Input Schema
export const SqlPoolWorkloadGroupListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/workloadGroups",
    }),
  );
export type SqlPoolWorkloadGroupListInput =
  typeof SqlPoolWorkloadGroupListInput.Type;

// Output Schema
export const SqlPoolWorkloadGroupListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlPoolWorkloadGroupListOutput =
  typeof SqlPoolWorkloadGroupListOutput.Type;

// The operation
/**
 * Sql pool's workload groups
 *
 * Get list of  Sql pool's workload groups.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - SQL pool name
 */
export const SqlPoolWorkloadGroupList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlPoolWorkloadGroupListInput,
    outputSchema: SqlPoolWorkloadGroupListOutput,
  }),
);
// Input Schema
export const WorkspaceAadAdminsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/administrators/activeDirectory",
    }),
  );
export type WorkspaceAadAdminsCreateOrUpdateInput =
  typeof WorkspaceAadAdminsCreateOrUpdateInput.Type;

// Output Schema
export const WorkspaceAadAdminsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceAadAdminsCreateOrUpdateOutput =
  typeof WorkspaceAadAdminsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workspace active directory admin
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceAadAdminsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceAadAdminsCreateOrUpdateInput,
    outputSchema: WorkspaceAadAdminsCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkspaceAadAdminsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/administrators/activeDirectory",
    }),
  );
export type WorkspaceAadAdminsDeleteInput =
  typeof WorkspaceAadAdminsDeleteInput.Type;

// Output Schema
export const WorkspaceAadAdminsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspaceAadAdminsDeleteOutput =
  typeof WorkspaceAadAdminsDeleteOutput.Type;

// The operation
/**
 * Deletes a workspace active directory admin
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceAadAdminsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceAadAdminsDeleteInput,
    outputSchema: WorkspaceAadAdminsDeleteOutput,
  }),
);
// Input Schema
export const WorkspaceAadAdminsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/administrators/activeDirectory",
    }),
  );
export type WorkspaceAadAdminsGetInput = typeof WorkspaceAadAdminsGetInput.Type;

// Output Schema
export const WorkspaceAadAdminsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceAadAdminsGetOutput =
  typeof WorkspaceAadAdminsGetOutput.Type;

// The operation
/**
 * Gets a workspace active directory admin
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceAadAdminsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceAadAdminsGetInput,
    outputSchema: WorkspaceAadAdminsGetOutput,
  }),
);
// Input Schema
export const WorkspaceManagedIdentitySqlControlSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/managedIdentitySqlControlSettings/default",
    }),
  );
export type WorkspaceManagedIdentitySqlControlSettingsCreateOrUpdateInput =
  typeof WorkspaceManagedIdentitySqlControlSettingsCreateOrUpdateInput.Type;

// Output Schema
export const WorkspaceManagedIdentitySqlControlSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedIdentitySqlControlSettingsCreateOrUpdateOutput =
  typeof WorkspaceManagedIdentitySqlControlSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update Managed Identity Sql Control Settings
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedIdentitySqlControlSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedIdentitySqlControlSettingsCreateOrUpdateInput,
    outputSchema:
      WorkspaceManagedIdentitySqlControlSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkspaceManagedIdentitySqlControlSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/managedIdentitySqlControlSettings/default",
    }),
  );
export type WorkspaceManagedIdentitySqlControlSettingsGetInput =
  typeof WorkspaceManagedIdentitySqlControlSettingsGetInput.Type;

// Output Schema
export const WorkspaceManagedIdentitySqlControlSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedIdentitySqlControlSettingsGetOutput =
  typeof WorkspaceManagedIdentitySqlControlSettingsGetOutput.Type;

// The operation
/**
 * Get Managed Identity Sql Control Settings
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedIdentitySqlControlSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedIdentitySqlControlSettingsGetInput,
    outputSchema: WorkspaceManagedIdentitySqlControlSettingsGetOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerBlobAuditingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    blobAuditingPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/auditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type WorkspaceManagedSqlServerBlobAuditingPoliciesCreateOrUpdateInput =
  typeof WorkspaceManagedSqlServerBlobAuditingPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerBlobAuditingPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerBlobAuditingPoliciesCreateOrUpdateOutput =
  typeof WorkspaceManagedSqlServerBlobAuditingPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update server's blob auditing policy.
 *
 * Create or Update a workspace managed sql server's blob auditing policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param blobAuditingPolicyName - The name of the blob auditing policy.
 */
export const WorkspaceManagedSqlServerBlobAuditingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerBlobAuditingPoliciesCreateOrUpdateInput,
    outputSchema:
      WorkspaceManagedSqlServerBlobAuditingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerBlobAuditingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    blobAuditingPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/auditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type WorkspaceManagedSqlServerBlobAuditingPoliciesGetInput =
  typeof WorkspaceManagedSqlServerBlobAuditingPoliciesGetInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerBlobAuditingPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerBlobAuditingPoliciesGetOutput =
  typeof WorkspaceManagedSqlServerBlobAuditingPoliciesGetOutput.Type;

// The operation
/**
 * Get server's blob auditing policy.
 *
 * Get a workspace managed sql server's blob auditing policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param blobAuditingPolicyName - The name of the blob auditing policy.
 */
export const WorkspaceManagedSqlServerBlobAuditingPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerBlobAuditingPoliciesGetInput,
    outputSchema: WorkspaceManagedSqlServerBlobAuditingPoliciesGetOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerBlobAuditingPoliciesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/auditingSettings",
    }),
  );
export type WorkspaceManagedSqlServerBlobAuditingPoliciesListByWorkspaceInput =
  typeof WorkspaceManagedSqlServerBlobAuditingPoliciesListByWorkspaceInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerBlobAuditingPoliciesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceManagedSqlServerBlobAuditingPoliciesListByWorkspaceOutput =
  typeof WorkspaceManagedSqlServerBlobAuditingPoliciesListByWorkspaceOutput.Type;

// The operation
/**
 * List workspace server's blob auditing policies.
 *
 * List workspace managed sql server's blob auditing policies.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedSqlServerBlobAuditingPoliciesListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerBlobAuditingPoliciesListByWorkspaceInput,
    outputSchema:
      WorkspaceManagedSqlServerBlobAuditingPoliciesListByWorkspaceOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    dedicatedSQLminimalTlsSettingsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/dedicatedSQLminimalTlsSettings/{dedicatedSQLminimalTlsSettingsName}",
    }),
  );
export type WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetInput =
  typeof WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetOutput =
  typeof WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetOutput.Type;

// The operation
/**
 * Get server's minimal tls settings.
 *
 * Get workspace managed sql server's minimal tls settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param dedicatedSQLminimalTlsSettingsName - The name of the dedicated sql minimal tls settings.
 */
export const WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetInput,
    outputSchema:
      WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsGetOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/dedicatedSQLminimalTlsSettings",
    }),
  );
export type WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListInput =
  typeof WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListOutput =
  typeof WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListOutput.Type;

// The operation
/**
 * List workspace server's minimal tls settings.
 *
 * List workspace managed sql server's minimal tls settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListInput,
    outputSchema:
      WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsListOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    dedicatedSQLminimalTlsSettingsName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/dedicatedSQLminimalTlsSettings/{dedicatedSQLminimalTlsSettingsName}",
    }),
  );
export type WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateInput =
  typeof WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateOutput =
  typeof WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateOutput.Type;

// The operation
/**
 * Update server's tls settings.
 *
 * Update workspace managed sql server's minimal tls settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param dedicatedSQLminimalTlsSettingsName - The name of the dedicated sql minimal tls settings.
 */
export const WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateInput,
    outputSchema:
      WorkspaceManagedSqlServerDedicatedSQLMinimalTlsSettingsUpdateOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerEncryptionProtectorCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/encryptionProtector/{encryptionProtectorName}",
    }),
  );
export type WorkspaceManagedSqlServerEncryptionProtectorCreateOrUpdateInput =
  typeof WorkspaceManagedSqlServerEncryptionProtectorCreateOrUpdateInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerEncryptionProtectorCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerEncryptionProtectorCreateOrUpdateOutput =
  typeof WorkspaceManagedSqlServerEncryptionProtectorCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates workspace server's encryption protector.
 *
 * Updates workspace managed sql server's encryption protector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param encryptionProtectorName - The name of the encryption protector.
 */
export const WorkspaceManagedSqlServerEncryptionProtectorCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerEncryptionProtectorCreateOrUpdateInput,
    outputSchema:
      WorkspaceManagedSqlServerEncryptionProtectorCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerEncryptionProtectorGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/encryptionProtector/{encryptionProtectorName}",
    }),
  );
export type WorkspaceManagedSqlServerEncryptionProtectorGetInput =
  typeof WorkspaceManagedSqlServerEncryptionProtectorGetInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerEncryptionProtectorGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerEncryptionProtectorGetOutput =
  typeof WorkspaceManagedSqlServerEncryptionProtectorGetOutput.Type;

// The operation
/**
 * Get workspace server's encryption protector.
 *
 * Get workspace managed sql server's encryption protector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param encryptionProtectorName - The name of the encryption protector.
 */
export const WorkspaceManagedSqlServerEncryptionProtectorGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerEncryptionProtectorGetInput,
    outputSchema: WorkspaceManagedSqlServerEncryptionProtectorGetOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerEncryptionProtectorListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/encryptionProtector",
    }),
  );
export type WorkspaceManagedSqlServerEncryptionProtectorListInput =
  typeof WorkspaceManagedSqlServerEncryptionProtectorListInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerEncryptionProtectorListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceManagedSqlServerEncryptionProtectorListOutput =
  typeof WorkspaceManagedSqlServerEncryptionProtectorListOutput.Type;

// The operation
/**
 * Get list of encryption protectors for the server.
 *
 * Get list of encryption protectors for workspace managed sql server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedSqlServerEncryptionProtectorList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerEncryptionProtectorListInput,
    outputSchema: WorkspaceManagedSqlServerEncryptionProtectorListOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerEncryptionProtectorRevalidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/encryptionProtector/{encryptionProtectorName}/revalidate",
    }),
  );
export type WorkspaceManagedSqlServerEncryptionProtectorRevalidateInput =
  typeof WorkspaceManagedSqlServerEncryptionProtectorRevalidateInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerEncryptionProtectorRevalidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspaceManagedSqlServerEncryptionProtectorRevalidateOutput =
  typeof WorkspaceManagedSqlServerEncryptionProtectorRevalidateOutput.Type;

// The operation
/**
 * Revalidates server's existing encryption protector.
 *
 * Revalidates workspace managed sql server's existing encryption protector.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param encryptionProtectorName - The name of the encryption protector.
 */
export const WorkspaceManagedSqlServerEncryptionProtectorRevalidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerEncryptionProtectorRevalidateInput,
    outputSchema: WorkspaceManagedSqlServerEncryptionProtectorRevalidateOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    blobAuditingPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/extendedAuditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesCreateOrUpdateInput =
  typeof WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesCreateOrUpdateOutput =
  typeof WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update server's extended blob auditing policy.
 *
 * Create or Update a workspace managed sql server's extended blob auditing policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param blobAuditingPolicyName - The name of the blob auditing policy.
 */
export const WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesCreateOrUpdateInput,
    outputSchema:
      WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    blobAuditingPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/extendedAuditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesGetInput =
  typeof WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesGetInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesGetOutput =
  typeof WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesGetOutput.Type;

// The operation
/**
 * Get server's extended blob auditing policy.
 *
 * Get a workspace SQL server's extended blob auditing policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param blobAuditingPolicyName - The name of the blob auditing policy.
 */
export const WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesGetInput,
    outputSchema:
      WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesGetOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesListByWorkspaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/extendedAuditingSettings",
    }),
  );
export type WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesListByWorkspaceInput =
  typeof WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesListByWorkspaceInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesListByWorkspaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesListByWorkspaceOutput =
  typeof WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesListByWorkspaceOutput.Type;

// The operation
/**
 * List server's extended blob auditing policies.
 *
 * List workspace managed sql server's extended blob auditing policies.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesListByWorkspace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesListByWorkspaceInput,
    outputSchema:
      WorkspaceManagedSqlServerExtendedBlobAuditingPoliciesListByWorkspaceOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerRecoverableSqlPoolsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    sqlPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/recoverableSqlPools/{sqlPoolName}",
    }),
  );
export type WorkspaceManagedSqlServerRecoverableSqlPoolsGetInput =
  typeof WorkspaceManagedSqlServerRecoverableSqlPoolsGetInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerRecoverableSqlPoolsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerRecoverableSqlPoolsGetOutput =
  typeof WorkspaceManagedSqlServerRecoverableSqlPoolsGetOutput.Type;

// The operation
/**
 * Get recoverable sql pools for the server.
 *
 * Get recoverable sql pools for workspace managed sql server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param sqlPoolName - The name of the sql pool
 */
export const WorkspaceManagedSqlServerRecoverableSqlPoolsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerRecoverableSqlPoolsGetInput,
    outputSchema: WorkspaceManagedSqlServerRecoverableSqlPoolsGetOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerRecoverableSqlPoolsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/recoverableSqlPools",
    }),
  );
export type WorkspaceManagedSqlServerRecoverableSqlPoolsListInput =
  typeof WorkspaceManagedSqlServerRecoverableSqlPoolsListInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerRecoverableSqlPoolsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceManagedSqlServerRecoverableSqlPoolsListOutput =
  typeof WorkspaceManagedSqlServerRecoverableSqlPoolsListOutput.Type;

// The operation
/**
 * Get list of recoverable sql pools for the server.
 *
 * Get list of recoverable sql pools for workspace managed sql server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedSqlServerRecoverableSqlPoolsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerRecoverableSqlPoolsListInput,
    outputSchema: WorkspaceManagedSqlServerRecoverableSqlPoolsListOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerSecurityAlertPolicyCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type WorkspaceManagedSqlServerSecurityAlertPolicyCreateOrUpdateInput =
  typeof WorkspaceManagedSqlServerSecurityAlertPolicyCreateOrUpdateInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerSecurityAlertPolicyCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerSecurityAlertPolicyCreateOrUpdateOutput =
  typeof WorkspaceManagedSqlServerSecurityAlertPolicyCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update server's threat detection policy.
 *
 * Create or Update a workspace managed sql server's threat detection policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param securityAlertPolicyName - The name of the security alert policy.
 */
export const WorkspaceManagedSqlServerSecurityAlertPolicyCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerSecurityAlertPolicyCreateOrUpdateInput,
    outputSchema:
      WorkspaceManagedSqlServerSecurityAlertPolicyCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerSecurityAlertPolicyGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type WorkspaceManagedSqlServerSecurityAlertPolicyGetInput =
  typeof WorkspaceManagedSqlServerSecurityAlertPolicyGetInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerSecurityAlertPolicyGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerSecurityAlertPolicyGetOutput =
  typeof WorkspaceManagedSqlServerSecurityAlertPolicyGetOutput.Type;

// The operation
/**
 * Get server's security alert policy.
 *
 * Get a workspace managed sql server's security alert policy.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param securityAlertPolicyName - The name of the security alert policy.
 */
export const WorkspaceManagedSqlServerSecurityAlertPolicyGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerSecurityAlertPolicyGetInput,
    outputSchema: WorkspaceManagedSqlServerSecurityAlertPolicyGetOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerSecurityAlertPolicyListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/securityAlertPolicies",
    }),
  );
export type WorkspaceManagedSqlServerSecurityAlertPolicyListInput =
  typeof WorkspaceManagedSqlServerSecurityAlertPolicyListInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerSecurityAlertPolicyListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceManagedSqlServerSecurityAlertPolicyListOutput =
  typeof WorkspaceManagedSqlServerSecurityAlertPolicyListOutput.Type;

// The operation
/**
 * Get server's threat detection policies.
 *
 * Get workspace managed sql server's threat detection policies.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedSqlServerSecurityAlertPolicyList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerSecurityAlertPolicyListInput,
    outputSchema: WorkspaceManagedSqlServerSecurityAlertPolicyListOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerUsagesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlUsages",
    }),
  );
export type WorkspaceManagedSqlServerUsagesListInput =
  typeof WorkspaceManagedSqlServerUsagesListInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerUsagesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        name: Schema.optional(Schema.String),
        resourceName: Schema.optional(Schema.String),
        displayName: Schema.optional(Schema.String),
        currentValue: Schema.optional(Schema.Number),
        limit: Schema.optional(Schema.Number),
        unit: Schema.optional(Schema.String),
        nextResetTime: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceManagedSqlServerUsagesListOutput =
  typeof WorkspaceManagedSqlServerUsagesListOutput.Type;

// The operation
/**
 * Get list of usages metric for the server.
 *
 * Get list of server usages metric for workspace managed sql server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedSqlServerUsagesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerUsagesListInput,
    outputSchema: WorkspaceManagedSqlServerUsagesListOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type WorkspaceManagedSqlServerVulnerabilityAssessmentsCreateOrUpdateInput =
  typeof WorkspaceManagedSqlServerVulnerabilityAssessmentsCreateOrUpdateInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerVulnerabilityAssessmentsCreateOrUpdateOutput =
  typeof WorkspaceManagedSqlServerVulnerabilityAssessmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update server's vulnerability assessment.
 *
 * Create or Update workspace managed sql server's vulnerability assessment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 */
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      WorkspaceManagedSqlServerVulnerabilityAssessmentsCreateOrUpdateInput,
    outputSchema:
      WorkspaceManagedSqlServerVulnerabilityAssessmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type WorkspaceManagedSqlServerVulnerabilityAssessmentsDeleteInput =
  typeof WorkspaceManagedSqlServerVulnerabilityAssessmentsDeleteInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspaceManagedSqlServerVulnerabilityAssessmentsDeleteOutput =
  typeof WorkspaceManagedSqlServerVulnerabilityAssessmentsDeleteOutput.Type;

// The operation
/**
 * Remove server's vulnerability assessment.
 *
 * Remove workspace managed sql server's vulnerability assessment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 */
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerVulnerabilityAssessmentsDeleteInput,
    outputSchema: WorkspaceManagedSqlServerVulnerabilityAssessmentsDeleteOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type WorkspaceManagedSqlServerVulnerabilityAssessmentsGetInput =
  typeof WorkspaceManagedSqlServerVulnerabilityAssessmentsGetInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceManagedSqlServerVulnerabilityAssessmentsGetOutput =
  typeof WorkspaceManagedSqlServerVulnerabilityAssessmentsGetOutput.Type;

// The operation
/**
 * Get server's vulnerability assessment.
 *
 * Get workspace managed sql server's vulnerability assessment.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 */
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerVulnerabilityAssessmentsGetInput,
    outputSchema: WorkspaceManagedSqlServerVulnerabilityAssessmentsGetOutput,
  }));
// Input Schema
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/vulnerabilityAssessments",
    }),
  );
export type WorkspaceManagedSqlServerVulnerabilityAssessmentsListInput =
  typeof WorkspaceManagedSqlServerVulnerabilityAssessmentsListInput.Type;

// Output Schema
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkspaceManagedSqlServerVulnerabilityAssessmentsListOutput =
  typeof WorkspaceManagedSqlServerVulnerabilityAssessmentsListOutput.Type;

// The operation
/**
 * Lists the vulnerability assessment policies associated with a server.
 *
 * Lists the vulnerability assessment policies associated with a workspace managed sql server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceManagedSqlServerVulnerabilityAssessmentsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceManagedSqlServerVulnerabilityAssessmentsListInput,
    outputSchema: WorkspaceManagedSqlServerVulnerabilityAssessmentsListOutput,
  }));
// Input Schema
export const WorkspacesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}",
    }),
  );
export type WorkspacesCreateOrUpdateInput =
  typeof WorkspacesCreateOrUpdateInput.Type;

// Output Schema
export const WorkspacesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type WorkspacesCreateOrUpdateOutput =
  typeof WorkspacesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspacesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspacesCreateOrUpdateInput,
    outputSchema: WorkspacesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const WorkspacesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}",
  }),
);
export type WorkspacesDeleteInput = typeof WorkspacesDeleteInput.Type;

// Output Schema
export const WorkspacesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type WorkspacesDeleteOutput = typeof WorkspacesDeleteOutput.Type;

// The operation
/**
 * Deletes a workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspacesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesDeleteInput,
  outputSchema: WorkspacesDeleteOutput,
}));
// Input Schema
export const WorkspacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}",
  }),
);
export type WorkspacesGetInput = typeof WorkspacesGetInput.Type;

// Output Schema
export const WorkspacesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type WorkspacesGetOutput = typeof WorkspacesGetOutput.Type;

// The operation
/**
 * Gets a workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesGetInput,
  outputSchema: WorkspacesGetOutput,
}));
// Input Schema
export const WorkspacesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Synapse/workspaces",
  }),
);
export type WorkspacesListInput = typeof WorkspacesListInput.Type;

// Output Schema
export const WorkspacesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
  ),
});
export type WorkspacesListOutput = typeof WorkspacesListOutput.Type;

// The operation
/**
 * Returns a list of workspaces in a subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const WorkspacesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesListInput,
  outputSchema: WorkspacesListOutput,
}));
// Input Schema
export const WorkspacesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces",
    }),
  );
export type WorkspacesListByResourceGroupInput =
  typeof WorkspacesListByResourceGroupInput.Type;

// Output Schema
export const WorkspacesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
  });
export type WorkspacesListByResourceGroupOutput =
  typeof WorkspacesListByResourceGroupOutput.Type;

// The operation
/**
 * Returns a list of workspaces in a resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const WorkspacesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspacesListByResourceGroupInput,
    outputSchema: WorkspacesListByResourceGroupOutput,
  }));
// Input Schema
export const WorkspaceSqlAadAdminsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlAdministrators/activeDirectory",
    }),
  );
export type WorkspaceSqlAadAdminsCreateOrUpdateInput =
  typeof WorkspaceSqlAadAdminsCreateOrUpdateInput.Type;

// Output Schema
export const WorkspaceSqlAadAdminsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceSqlAadAdminsCreateOrUpdateOutput =
  typeof WorkspaceSqlAadAdminsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workspace SQL active directory admin
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceSqlAadAdminsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkspaceSqlAadAdminsCreateOrUpdateInput,
    outputSchema: WorkspaceSqlAadAdminsCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkspaceSqlAadAdminsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlAdministrators/activeDirectory",
    }),
  );
export type WorkspaceSqlAadAdminsDeleteInput =
  typeof WorkspaceSqlAadAdminsDeleteInput.Type;

// Output Schema
export const WorkspaceSqlAadAdminsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkspaceSqlAadAdminsDeleteOutput =
  typeof WorkspaceSqlAadAdminsDeleteOutput.Type;

// The operation
/**
 * Deletes a workspace SQL active directory admin
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceSqlAadAdminsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceSqlAadAdminsDeleteInput,
    outputSchema: WorkspaceSqlAadAdminsDeleteOutput,
  }),
);
// Input Schema
export const WorkspaceSqlAadAdminsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlAdministrators/activeDirectory",
    }),
  );
export type WorkspaceSqlAadAdminsGetInput =
  typeof WorkspaceSqlAadAdminsGetInput.Type;

// Output Schema
export const WorkspaceSqlAadAdminsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkspaceSqlAadAdminsGetOutput =
  typeof WorkspaceSqlAadAdminsGetOutput.Type;

// The operation
/**
 * Gets a workspace SQL active directory admin
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspaceSqlAadAdminsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkspaceSqlAadAdminsGetInput,
    outputSchema: WorkspaceSqlAadAdminsGetOutput,
  }),
);
// Input Schema
export const WorkspacesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  workspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}",
  }),
);
export type WorkspacesUpdateInput = typeof WorkspacesUpdateInput.Type;

// Output Schema
export const WorkspacesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type WorkspacesUpdateOutput = typeof WorkspacesUpdateOutput.Type;

// The operation
/**
 * Updates a workspace
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param workspaceName - The name of the workspace.
 */
export const WorkspacesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkspacesUpdateInput,
  outputSchema: WorkspacesUpdateOutput,
}));
