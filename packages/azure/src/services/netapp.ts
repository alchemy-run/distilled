/**
 * Azure Netapp API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AccountsChangeKeyVaultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/changeKeyVault",
    }),
  );
export type AccountsChangeKeyVaultInput =
  typeof AccountsChangeKeyVaultInput.Type;

// Output Schema
export const AccountsChangeKeyVaultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsChangeKeyVaultOutput =
  typeof AccountsChangeKeyVaultOutput.Type;

// The operation
/**
 * Affects existing volumes that are encrypted with Key Vault/Managed HSM, and new volumes. Supports HSM to Key Vault, Key Vault to HSM, HSM to HSM and Key Vault to Key Vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const AccountsChangeKeyVault = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsChangeKeyVaultInput,
    outputSchema: AccountsChangeKeyVaultOutput,
  }),
);
// Input Schema
export const AccountsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}",
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
 * Create or update the specified NetApp account within the resource group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
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
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}",
  }),
);
export type AccountsDeleteInput = typeof AccountsDeleteInput.Type;

// Output Schema
export const AccountsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsDeleteOutput = typeof AccountsDeleteOutput.Type;

// The operation
/**
 * Delete the specified NetApp account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const AccountsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsDeleteInput,
  outputSchema: AccountsDeleteOutput,
}));
// Input Schema
export const AccountsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}",
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
 * Get the NetApp account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const AccountsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsGetInput,
  outputSchema: AccountsGetOutput,
}));
// Input Schema
export const AccountsGetChangeKeyVaultInformationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/getKeyVaultStatus",
    }),
  );
export type AccountsGetChangeKeyVaultInformationInput =
  typeof AccountsGetChangeKeyVaultInformationInput.Type;

// Output Schema
export const AccountsGetChangeKeyVaultInformationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        keyVaultUri: Schema.optional(Schema.String),
        keyName: Schema.optional(Schema.String),
        keyVaultResourceId: Schema.optional(Schema.String),
        keyVaultPrivateEndpoints: Schema.optional(
          Schema.Array(
            Schema.Struct({
              virtualNetworkId: Schema.optional(Schema.String),
              privateEndpointId: Schema.optional(Schema.String),
            }),
          ),
        ),
      }),
    ),
  });
export type AccountsGetChangeKeyVaultInformationOutput =
  typeof AccountsGetChangeKeyVaultInformationOutput.Type;

// The operation
/**
 * Contains data from encryption.keyVaultProperties as well as information about which private endpoint is used by each encryption sibling set. Response from this endpoint can be modified and used as request body for POST request.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const AccountsGetChangeKeyVaultInformation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AccountsGetChangeKeyVaultInformationInput,
    outputSchema: AccountsGetChangeKeyVaultInformationOutput,
  }));
// Input Schema
export const AccountsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts",
  }),
);
export type AccountsListInput = typeof AccountsListInput.Type;

// Output Schema
export const AccountsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type AccountsListOutput = typeof AccountsListOutput.Type;

// The operation
/**
 * List and describe all NetApp accounts in the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const AccountsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsListInput,
  outputSchema: AccountsListOutput,
}));
// Input Schema
export const AccountsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/netAppAccounts",
    }),
  );
export type AccountsListBySubscriptionInput =
  typeof AccountsListBySubscriptionInput.Type;

// Output Schema
export const AccountsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AccountsListBySubscriptionOutput =
  typeof AccountsListBySubscriptionOutput.Type;

// The operation
/**
 * List and describe all NetApp accounts in the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const AccountsListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsListBySubscriptionInput,
    outputSchema: AccountsListBySubscriptionOutput,
  }),
);
// Input Schema
export const AccountsRenewCredentialsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/renewCredentials",
    }),
  );
export type AccountsRenewCredentialsInput =
  typeof AccountsRenewCredentialsInput.Type;

// Output Schema
export const AccountsRenewCredentialsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsRenewCredentialsOutput =
  typeof AccountsRenewCredentialsOutput.Type;

// The operation
/**
 * Renew identity credentials that are used to authenticate to key vault, for customer-managed key encryption. If encryption.identity.principalId does not match identity.principalId, running this operation will fix it.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const AccountsRenewCredentials = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsRenewCredentialsInput,
    outputSchema: AccountsRenewCredentialsOutput,
  }),
);
// Input Schema
export const AccountsTransitionToCmkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/transitiontocmk",
    }),
  );
export type AccountsTransitionToCmkInput =
  typeof AccountsTransitionToCmkInput.Type;

// Output Schema
export const AccountsTransitionToCmkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AccountsTransitionToCmkOutput =
  typeof AccountsTransitionToCmkOutput.Type;

// The operation
/**
 * Transitions all volumes in a VNet to a different encryption key source (Microsoft-managed key or Azure Key Vault). Operation fails if targeted volumes share encryption sibling set with volumes from another account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const AccountsTransitionToCmk = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AccountsTransitionToCmkInput,
    outputSchema: AccountsTransitionToCmkOutput,
  }),
);
// Input Schema
export const AccountsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}",
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
 * Patch the specified NetApp account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const AccountsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AccountsUpdateInput,
  outputSchema: AccountsUpdateOutput,
}));
// Input Schema
export const BackupPoliciesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    backupPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}",
    }),
  );
export type BackupPoliciesCreateInput = typeof BackupPoliciesCreateInput.Type;

// Output Schema
export const BackupPoliciesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BackupPoliciesCreateOutput = typeof BackupPoliciesCreateOutput.Type;

// The operation
/**
 * Create a backup policy for Netapp Account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupPolicyName - Backup policy Name which uniquely identify backup policy.
 */
export const BackupPoliciesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupPoliciesCreateInput,
    outputSchema: BackupPoliciesCreateOutput,
  }),
);
// Input Schema
export const BackupPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    backupPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}",
    }),
  );
export type BackupPoliciesDeleteInput = typeof BackupPoliciesDeleteInput.Type;

// Output Schema
export const BackupPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupPoliciesDeleteOutput = typeof BackupPoliciesDeleteOutput.Type;

// The operation
/**
 * Delete backup policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupPolicyName - Backup policy Name which uniquely identify backup policy.
 */
export const BackupPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupPoliciesDeleteInput,
    outputSchema: BackupPoliciesDeleteOutput,
  }),
);
// Input Schema
export const BackupPoliciesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    backupPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}",
  }),
);
export type BackupPoliciesGetInput = typeof BackupPoliciesGetInput.Type;

// Output Schema
export const BackupPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BackupPoliciesGetOutput = typeof BackupPoliciesGetOutput.Type;

// The operation
/**
 * Get a particular backup Policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupPolicyName - Backup policy Name which uniquely identify backup policy.
 */
export const BackupPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupPoliciesGetInput,
  outputSchema: BackupPoliciesGetOutput,
}));
// Input Schema
export const BackupPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies",
    }),
  );
export type BackupPoliciesListInput = typeof BackupPoliciesListInput.Type;

// Output Schema
export const BackupPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BackupPoliciesListOutput = typeof BackupPoliciesListOutput.Type;

// The operation
/**
 * List backup policies for Netapp Account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const BackupPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupPoliciesListInput,
  outputSchema: BackupPoliciesListOutput,
}));
// Input Schema
export const BackupPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    backupPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}",
    }),
  );
export type BackupPoliciesUpdateInput = typeof BackupPoliciesUpdateInput.Type;

// Output Schema
export const BackupPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BackupPoliciesUpdateOutput = typeof BackupPoliciesUpdateOutput.Type;

// The operation
/**
 * Patch a backup policy for Netapp Account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupPolicyName - Backup policy Name which uniquely identify backup policy.
 */
export const BackupPoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupPoliciesUpdateInput,
    outputSchema: BackupPoliciesUpdateOutput,
  }),
);
// Input Schema
export const BackupsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  backupVaultName: Schema.String.pipe(T.PathParam()),
  backupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}",
  }),
);
export type BackupsCreateInput = typeof BackupsCreateInput.Type;

// Output Schema
export const BackupsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type BackupsCreateOutput = typeof BackupsCreateOutput.Type;

// The operation
/**
 * Create a backup under the Backup Vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 * @param backupName - The name of the backup
 */
export const BackupsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupsCreateInput,
  outputSchema: BackupsCreateOutput,
}));
// Input Schema
export const BackupsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  backupVaultName: Schema.String.pipe(T.PathParam()),
  backupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}",
  }),
);
export type BackupsDeleteInput = typeof BackupsDeleteInput.Type;

// Output Schema
export const BackupsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupsDeleteOutput = typeof BackupsDeleteOutput.Type;

// The operation
/**
 * Delete a Backup under the Backup Vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 * @param backupName - The name of the backup
 */
export const BackupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupsDeleteInput,
  outputSchema: BackupsDeleteOutput,
}));
// Input Schema
export const BackupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  backupVaultName: Schema.String.pipe(T.PathParam()),
  backupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}",
  }),
);
export type BackupsGetInput = typeof BackupsGetInput.Type;

// Output Schema
export const BackupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupsGetOutput = typeof BackupsGetOutput.Type;

// The operation
/**
 * Get the specified Backup under Backup Vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 * @param backupName - The name of the backup
 */
export const BackupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupsGetInput,
  outputSchema: BackupsGetOutput,
}));
// Input Schema
export const BackupsGetLatestStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/latestBackupStatus/current",
    }),
  );
export type BackupsGetLatestStatusInput =
  typeof BackupsGetLatestStatusInput.Type;

// Output Schema
export const BackupsGetLatestStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    healthy: Schema.optional(Schema.Boolean),
    relationshipStatus: Schema.optional(
      Schema.Literals(["Idle", "Transferring", "Failed", "Unknown"]),
    ),
    mirrorState: Schema.optional(
      Schema.Literals(["Uninitialized", "Mirrored", "Broken"]),
    ),
    unhealthyReason: Schema.optional(Schema.String),
    errorMessage: Schema.optional(Schema.String),
    lastTransferSize: Schema.optional(Schema.Number),
    lastTransferType: Schema.optional(Schema.String),
    totalTransferBytes: Schema.optional(Schema.Number),
    transferProgressBytes: Schema.optional(Schema.Number),
  });
export type BackupsGetLatestStatusOutput =
  typeof BackupsGetLatestStatusOutput.Type;

// The operation
/**
 * Get the latest status of the backup for a volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const BackupsGetLatestStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupsGetLatestStatusInput,
    outputSchema: BackupsGetLatestStatusOutput,
  }),
);
// Input Schema
export const BackupsGetVolumeLatestRestoreStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/latestRestoreStatus/current",
    }),
  );
export type BackupsGetVolumeLatestRestoreStatusInput =
  typeof BackupsGetVolumeLatestRestoreStatusInput.Type;

// Output Schema
export const BackupsGetVolumeLatestRestoreStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    healthy: Schema.optional(Schema.Boolean),
    relationshipStatus: Schema.optional(
      Schema.Literals(["Idle", "Transferring", "Failed", "Unknown"]),
    ),
    mirrorState: Schema.optional(
      Schema.Literals(["Uninitialized", "Mirrored", "Broken"]),
    ),
    unhealthyReason: Schema.optional(Schema.String),
    errorMessage: Schema.optional(Schema.String),
    totalTransferBytes: Schema.optional(Schema.Number),
  });
export type BackupsGetVolumeLatestRestoreStatusOutput =
  typeof BackupsGetVolumeLatestRestoreStatusOutput.Type;

// The operation
/**
 * Get the latest status of the restore for a volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const BackupsGetVolumeLatestRestoreStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsGetVolumeLatestRestoreStatusInput,
    outputSchema: BackupsGetVolumeLatestRestoreStatusOutput,
  }));
// Input Schema
export const BackupsListByVaultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    backupVaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups",
    }),
  );
export type BackupsListByVaultInput = typeof BackupsListByVaultInput.Type;

// Output Schema
export const BackupsListByVaultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type BackupsListByVaultOutput = typeof BackupsListByVaultOutput.Type;

// The operation
/**
 * List all backups Under a Backup Vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 * @param $filter - An option to specify the VolumeResourceId. If present, then only returns the backups under the specified volume
 */
export const BackupsListByVault = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupsListByVaultInput,
  outputSchema: BackupsListByVaultOutput,
}));
// Input Schema
export const BackupsUnderAccountMigrateBackupsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/migrateBackups",
    }),
  );
export type BackupsUnderAccountMigrateBackupsInput =
  typeof BackupsUnderAccountMigrateBackupsInput.Type;

// Output Schema
export const BackupsUnderAccountMigrateBackupsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupsUnderAccountMigrateBackupsOutput =
  typeof BackupsUnderAccountMigrateBackupsOutput.Type;

// The operation
/**
 * Migrate the backups under a NetApp account to backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const BackupsUnderAccountMigrateBackups =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsUnderAccountMigrateBackupsInput,
    outputSchema: BackupsUnderAccountMigrateBackupsOutput,
  }));
// Input Schema
export const BackupsUnderBackupVaultRestoreFilesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    backupVaultName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}/restoreFiles",
    }),
  );
export type BackupsUnderBackupVaultRestoreFilesInput =
  typeof BackupsUnderBackupVaultRestoreFilesInput.Type;

// Output Schema
export const BackupsUnderBackupVaultRestoreFilesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupsUnderBackupVaultRestoreFilesOutput =
  typeof BackupsUnderBackupVaultRestoreFilesOutput.Type;

// The operation
/**
 * Restore the specified files from the specified backup to the active filesystem
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 * @param backupName - The name of the backup
 */
export const BackupsUnderBackupVaultRestoreFiles =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsUnderBackupVaultRestoreFilesInput,
    outputSchema: BackupsUnderBackupVaultRestoreFilesOutput,
  }));
// Input Schema
export const BackupsUnderVolumeMigrateBackupsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/migrateBackups",
    }),
  );
export type BackupsUnderVolumeMigrateBackupsInput =
  typeof BackupsUnderVolumeMigrateBackupsInput.Type;

// Output Schema
export const BackupsUnderVolumeMigrateBackupsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupsUnderVolumeMigrateBackupsOutput =
  typeof BackupsUnderVolumeMigrateBackupsOutput.Type;

// The operation
/**
 * Migrate the backups under volume to backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const BackupsUnderVolumeMigrateBackups =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsUnderVolumeMigrateBackupsInput,
    outputSchema: BackupsUnderVolumeMigrateBackupsOutput,
  }));
// Input Schema
export const BackupsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  backupVaultName: Schema.String.pipe(T.PathParam()),
  backupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}/backups/{backupName}",
  }),
);
export type BackupsUpdateInput = typeof BackupsUpdateInput.Type;

// Output Schema
export const BackupsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type BackupsUpdateOutput = typeof BackupsUpdateOutput.Type;

// The operation
/**
 * Patch a Backup under the Backup Vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 * @param backupName - The name of the backup
 */
export const BackupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupsUpdateInput,
  outputSchema: BackupsUpdateOutput,
}));
// Input Schema
export const BackupVaultsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    backupVaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}",
    }),
  );
export type BackupVaultsCreateOrUpdateInput =
  typeof BackupVaultsCreateOrUpdateInput.Type;

// Output Schema
export const BackupVaultsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BackupVaultsCreateOrUpdateOutput =
  typeof BackupVaultsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the specified Backup Vault in the NetApp account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 */
export const BackupVaultsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupVaultsCreateOrUpdateInput,
    outputSchema: BackupVaultsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const BackupVaultsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    backupVaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}",
    }),
  );
export type BackupVaultsDeleteInput = typeof BackupVaultsDeleteInput.Type;

// Output Schema
export const BackupVaultsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupVaultsDeleteOutput = typeof BackupVaultsDeleteOutput.Type;

// The operation
/**
 * Delete the specified Backup Vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 */
export const BackupVaultsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupVaultsDeleteInput,
  outputSchema: BackupVaultsDeleteOutput,
}));
// Input Schema
export const BackupVaultsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  backupVaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}",
  }),
);
export type BackupVaultsGetInput = typeof BackupVaultsGetInput.Type;

// Output Schema
export const BackupVaultsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type BackupVaultsGetOutput = typeof BackupVaultsGetOutput.Type;

// The operation
/**
 * Get the Backup Vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 */
export const BackupVaultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupVaultsGetInput,
  outputSchema: BackupVaultsGetOutput,
}));
// Input Schema
export const BackupVaultsListByNetAppAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults",
    }),
  );
export type BackupVaultsListByNetAppAccountInput =
  typeof BackupVaultsListByNetAppAccountInput.Type;

// Output Schema
export const BackupVaultsListByNetAppAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type BackupVaultsListByNetAppAccountOutput =
  typeof BackupVaultsListByNetAppAccountOutput.Type;

// The operation
/**
 * List and describe all Backup Vaults in the NetApp account.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const BackupVaultsListByNetAppAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupVaultsListByNetAppAccountInput,
    outputSchema: BackupVaultsListByNetAppAccountOutput,
  }));
// Input Schema
export const BackupVaultsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    backupVaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupVaults/{backupVaultName}",
    }),
  );
export type BackupVaultsUpdateInput = typeof BackupVaultsUpdateInput.Type;

// Output Schema
export const BackupVaultsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BackupVaultsUpdateOutput = typeof BackupVaultsUpdateOutput.Type;

// The operation
/**
 * Patch the specified NetApp Backup Vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param backupVaultName - The name of the Backup Vault
 */
export const BackupVaultsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupVaultsUpdateInput,
  outputSchema: BackupVaultsUpdateOutput,
}));
// Input Schema
export const NetAppResourceCheckFilePathAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/checkFilePathAvailability",
    }),
  );
export type NetAppResourceCheckFilePathAvailabilityInput =
  typeof NetAppResourceCheckFilePathAvailabilityInput.Type;

// Output Schema
export const NetAppResourceCheckFilePathAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type NetAppResourceCheckFilePathAvailabilityOutput =
  typeof NetAppResourceCheckFilePathAvailabilityOutput.Type;

// The operation
/**
 * Check file path availability
 *
 * Check if a file path is available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceCheckFilePathAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceCheckFilePathAvailabilityInput,
    outputSchema: NetAppResourceCheckFilePathAvailabilityOutput,
  }));
// Input Schema
export const NetAppResourceCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/checkNameAvailability",
    }),
  );
export type NetAppResourceCheckNameAvailabilityInput =
  typeof NetAppResourceCheckNameAvailabilityInput.Type;

// Output Schema
export const NetAppResourceCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type NetAppResourceCheckNameAvailabilityOutput =
  typeof NetAppResourceCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check resource name availability
 *
 * Check if a resource name is available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceCheckNameAvailabilityInput,
    outputSchema: NetAppResourceCheckNameAvailabilityOutput,
  }));
// Input Schema
export const NetAppResourceCheckQuotaAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/checkQuotaAvailability",
    }),
  );
export type NetAppResourceCheckQuotaAvailabilityInput =
  typeof NetAppResourceCheckQuotaAvailabilityInput.Type;

// Output Schema
export const NetAppResourceCheckQuotaAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    isAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type NetAppResourceCheckQuotaAvailabilityOutput =
  typeof NetAppResourceCheckQuotaAvailabilityOutput.Type;

// The operation
/**
 * Check quota availability
 *
 * Check if a quota is available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceCheckQuotaAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceCheckQuotaAvailabilityInput,
    outputSchema: NetAppResourceCheckQuotaAvailabilityOutput,
  }));
// Input Schema
export const NetAppResourceQueryNetworkSiblingSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/queryNetworkSiblingSet",
    }),
  );
export type NetAppResourceQueryNetworkSiblingSetInput =
  typeof NetAppResourceQueryNetworkSiblingSetInput.Type;

// Output Schema
export const NetAppResourceQueryNetworkSiblingSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    networkSiblingSetId: Schema.optional(Schema.String),
    subnetId: Schema.optional(Schema.String),
    networkSiblingSetStateId: Schema.optional(Schema.String),
    networkFeatures: Schema.optional(
      Schema.Literals([
        "Basic",
        "Standard",
        "Basic_Standard",
        "Standard_Basic",
      ]),
    ),
    provisioningState: Schema.optional(
      Schema.Literals(["Succeeded", "Failed", "Canceled", "Updating"]),
    ),
    nicInfoList: Schema.optional(
      Schema.Array(
        Schema.Struct({
          ipAddress: Schema.optional(Schema.String),
          volumeResourceIds: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type NetAppResourceQueryNetworkSiblingSetOutput =
  typeof NetAppResourceQueryNetworkSiblingSetOutput.Type;

// The operation
/**
 * Describe a network sibling set
 *
 * Get details of the specified network sibling set.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceQueryNetworkSiblingSet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceQueryNetworkSiblingSetInput,
    outputSchema: NetAppResourceQueryNetworkSiblingSetOutput,
  }));
// Input Schema
export const NetAppResourceQueryRegionInfoInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/regionInfo",
    }),
  );
export type NetAppResourceQueryRegionInfoInput =
  typeof NetAppResourceQueryRegionInfoInput.Type;

// Output Schema
export const NetAppResourceQueryRegionInfoOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    storageToNetworkProximity: Schema.optional(
      Schema.Literals([
        "Default",
        "T1",
        "T2",
        "AcrossT2",
        "T1AndT2",
        "T1AndAcrossT2",
        "T2AndAcrossT2",
        "T1AndT2AndAcrossT2",
      ]),
    ),
    availabilityZoneMappings: Schema.optional(
      Schema.Array(
        Schema.Struct({
          availabilityZone: Schema.optional(Schema.String),
          isAvailable: Schema.optional(Schema.Boolean),
        }),
      ),
    ),
  });
export type NetAppResourceQueryRegionInfoOutput =
  typeof NetAppResourceQueryRegionInfoOutput.Type;

// The operation
/**
 * Describes region specific information.
 *
 * Provides storage to network proximity and logical zone mapping information.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceQueryRegionInfo =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceQueryRegionInfoInput,
    outputSchema: NetAppResourceQueryRegionInfoOutput,
  }));
// Input Schema
export const NetAppResourceQuotaLimitsAccountGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    quotaLimitName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/quotaLimits/{quotaLimitName}",
    }),
  );
export type NetAppResourceQuotaLimitsAccountGetInput =
  typeof NetAppResourceQuotaLimitsAccountGetInput.Type;

// Output Schema
export const NetAppResourceQuotaLimitsAccountGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetAppResourceQuotaLimitsAccountGetOutput =
  typeof NetAppResourceQuotaLimitsAccountGetOutput.Type;

// The operation
/**
 * Get the default, current and usages account quota limit
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param quotaLimitName - The name of the Quota Limit
 */
export const NetAppResourceQuotaLimitsAccountGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceQuotaLimitsAccountGetInput,
    outputSchema: NetAppResourceQuotaLimitsAccountGetOutput,
  }));
// Input Schema
export const NetAppResourceQuotaLimitsAccountListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/quotaLimits",
    }),
  );
export type NetAppResourceQuotaLimitsAccountListInput =
  typeof NetAppResourceQuotaLimitsAccountListInput.Type;

// Output Schema
export const NetAppResourceQuotaLimitsAccountListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type NetAppResourceQuotaLimitsAccountListOutput =
  typeof NetAppResourceQuotaLimitsAccountListOutput.Type;

// The operation
/**
 * Gets a list of quota limits for all quotas that are under account. Currently PoolsPerAccount is the only one.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const NetAppResourceQuotaLimitsAccountList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceQuotaLimitsAccountListInput,
    outputSchema: NetAppResourceQuotaLimitsAccountListOutput,
  }));
// Input Schema
export const NetAppResourceQuotaLimitsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    quotaLimitName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/quotaLimits/{quotaLimitName}",
    }),
  );
export type NetAppResourceQuotaLimitsGetInput =
  typeof NetAppResourceQuotaLimitsGetInput.Type;

// Output Schema
export const NetAppResourceQuotaLimitsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetAppResourceQuotaLimitsGetOutput =
  typeof NetAppResourceQuotaLimitsGetOutput.Type;

// The operation
/**
 * Get the default and current quota limit
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param quotaLimitName - The name of the Quota Limit
 */
export const NetAppResourceQuotaLimitsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceQuotaLimitsGetInput,
    outputSchema: NetAppResourceQuotaLimitsGetOutput,
  }));
// Input Schema
export const NetAppResourceQuotaLimitsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/quotaLimits",
    }),
  );
export type NetAppResourceQuotaLimitsListInput =
  typeof NetAppResourceQuotaLimitsListInput.Type;

// Output Schema
export const NetAppResourceQuotaLimitsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type NetAppResourceQuotaLimitsListOutput =
  typeof NetAppResourceQuotaLimitsListOutput.Type;

// The operation
/**
 * Get the default and current limits for quotas
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceQuotaLimitsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceQuotaLimitsListInput,
    outputSchema: NetAppResourceQuotaLimitsListOutput,
  }));
// Input Schema
export const NetAppResourceRegionInfosGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/regionInfos/default",
    }),
  );
export type NetAppResourceRegionInfosGetInput =
  typeof NetAppResourceRegionInfosGetInput.Type;

// Output Schema
export const NetAppResourceRegionInfosGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetAppResourceRegionInfosGetOutput =
  typeof NetAppResourceRegionInfosGetOutput.Type;

// The operation
/**
 * Provides storage to network proximity and logical zone mapping information.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceRegionInfosGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceRegionInfosGetInput,
    outputSchema: NetAppResourceRegionInfosGetOutput,
  }));
// Input Schema
export const NetAppResourceRegionInfosListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/regionInfos",
    }),
  );
export type NetAppResourceRegionInfosListInput =
  typeof NetAppResourceRegionInfosListInput.Type;

// Output Schema
export const NetAppResourceRegionInfosListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type NetAppResourceRegionInfosListOutput =
  typeof NetAppResourceRegionInfosListOutput.Type;

// The operation
/**
 * Provides region specific information.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceRegionInfosList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceRegionInfosListInput,
    outputSchema: NetAppResourceRegionInfosListOutput,
  }));
// Input Schema
export const NetAppResourceUpdateNetworkSiblingSetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/updateNetworkSiblingSet",
    }),
  );
export type NetAppResourceUpdateNetworkSiblingSetInput =
  typeof NetAppResourceUpdateNetworkSiblingSetInput.Type;

// Output Schema
export const NetAppResourceUpdateNetworkSiblingSetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    networkSiblingSetId: Schema.optional(Schema.String),
    subnetId: Schema.optional(Schema.String),
    networkSiblingSetStateId: Schema.optional(Schema.String),
    networkFeatures: Schema.optional(
      Schema.Literals([
        "Basic",
        "Standard",
        "Basic_Standard",
        "Standard_Basic",
      ]),
    ),
    provisioningState: Schema.optional(
      Schema.Literals(["Succeeded", "Failed", "Canceled", "Updating"]),
    ),
    nicInfoList: Schema.optional(
      Schema.Array(
        Schema.Struct({
          ipAddress: Schema.optional(Schema.String),
          volumeResourceIds: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    ),
  });
export type NetAppResourceUpdateNetworkSiblingSetOutput =
  typeof NetAppResourceUpdateNetworkSiblingSetOutput.Type;

// The operation
/**
 * Update the network features of a network sibling set
 *
 * Update the network features of the specified network sibling set.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceUpdateNetworkSiblingSet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetAppResourceUpdateNetworkSiblingSetInput,
    outputSchema: NetAppResourceUpdateNetworkSiblingSetOutput,
  }));
// Input Schema
export const NetAppResourceUsagesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    usageType: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/usages/{usageType}",
    }),
  );
export type NetAppResourceUsagesGetInput =
  typeof NetAppResourceUsagesGetInput.Type;

// Output Schema
export const NetAppResourceUsagesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(
      Schema.Struct({
        value: Schema.optional(Schema.String),
        localizedValue: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        currentValue: Schema.optional(Schema.Number),
        limit: Schema.optional(Schema.Number),
        unit: Schema.optional(Schema.String),
      }),
    ),
  });
export type NetAppResourceUsagesGetOutput =
  typeof NetAppResourceUsagesGetOutput.Type;

// The operation
/**
 * Get specific type of usage
 *
 * Get current subscription usage of the specific type
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param usageType - The type of usage
 */
export const NetAppResourceUsagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetAppResourceUsagesGetInput,
    outputSchema: NetAppResourceUsagesGetOutput,
  }),
);
// Input Schema
export const NetAppResourceUsagesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/usages",
    }),
  );
export type NetAppResourceUsagesListInput =
  typeof NetAppResourceUsagesListInput.Type;

// Output Schema
export const NetAppResourceUsagesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        id: Schema.optional(Schema.String),
        name: Schema.optional(
          Schema.Struct({
            value: Schema.optional(Schema.String),
            localizedValue: Schema.optional(Schema.String),
          }),
        ),
        properties: Schema.optional(
          Schema.Struct({
            currentValue: Schema.optional(Schema.Number),
            limit: Schema.optional(Schema.Number),
            unit: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type NetAppResourceUsagesListOutput =
  typeof NetAppResourceUsagesListOutput.Type;

// The operation
/**
 * Get usages
 *
 * Get current subscription usages
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const NetAppResourceUsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: NetAppResourceUsagesListInput,
    outputSchema: NetAppResourceUsagesListOutput,
  }),
);
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.NetApp/operations" }),
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
                    supportedAggregationTypes: Schema.optional(
                      Schema.Array(Schema.Literals(["Average"])),
                    ),
                    supportedTimeGrainTypes: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    internalMetricName: Schema.optional(Schema.String),
                    enableRegionalMdmAccount: Schema.optional(Schema.Boolean),
                    sourceMdmAccount: Schema.optional(Schema.String),
                    sourceMdmNamespace: Schema.optional(Schema.String),
                    dimensions: Schema.optional(
                      Schema.Array(
                        Schema.Struct({
                          name: Schema.optional(Schema.String),
                          displayName: Schema.optional(Schema.String),
                        }),
                      ),
                    ),
                    aggregationType: Schema.optional(Schema.String),
                    fillGapWithZero: Schema.optional(Schema.Boolean),
                    category: Schema.optional(Schema.String),
                    resourceIdDimensionNameOverride: Schema.optional(
                      Schema.String,
                    ),
                    isInternal: Schema.optional(Schema.Boolean),
                  }),
                ),
              ),
              logSpecifications: Schema.optional(
                Schema.Array(
                  Schema.Struct({
                    name: Schema.optional(Schema.String),
                    displayName: Schema.optional(Schema.String),
                  }),
                ),
              ),
            }),
          ),
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
export const PoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}",
    }),
  );
export type PoolsCreateOrUpdateInput = typeof PoolsCreateOrUpdateInput.Type;

// Output Schema
export const PoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type PoolsCreateOrUpdateOutput = typeof PoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or Update a capacity pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 */
export const PoolsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsCreateOrUpdateInput,
  outputSchema: PoolsCreateOrUpdateOutput,
}));
// Input Schema
export const PoolsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}",
  }),
);
export type PoolsDeleteInput = typeof PoolsDeleteInput.Type;

// Output Schema
export const PoolsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PoolsDeleteOutput = typeof PoolsDeleteOutput.Type;

// The operation
/**
 * Delete the specified capacity pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 */
export const PoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsDeleteInput,
  outputSchema: PoolsDeleteOutput,
}));
// Input Schema
export const PoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}",
  }),
);
export type PoolsGetInput = typeof PoolsGetInput.Type;

// Output Schema
export const PoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PoolsGetOutput = typeof PoolsGetOutput.Type;

// The operation
/**
 * Get details of the specified capacity pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 */
export const PoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsGetInput,
  outputSchema: PoolsGetOutput,
}));
// Input Schema
export const PoolsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools",
  }),
);
export type PoolsListInput = typeof PoolsListInput.Type;

// Output Schema
export const PoolsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type PoolsListOutput = typeof PoolsListOutput.Type;

// The operation
/**
 * List all capacity pools in the NetApp Account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const PoolsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsListInput,
  outputSchema: PoolsListOutput,
}));
// Input Schema
export const PoolsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}",
  }),
);
export type PoolsUpdateInput = typeof PoolsUpdateInput.Type;

// Output Schema
export const PoolsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type PoolsUpdateOutput = typeof PoolsUpdateOutput.Type;

// The operation
/**
 * Patch the specified capacity pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 */
export const PoolsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PoolsUpdateInput,
  outputSchema: PoolsUpdateOutput,
}));
// Input Schema
export const RansomwareReportsClearSuspectsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    ransomwareReportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/ransomwareReports/{ransomwareReportName}/clearSuspects",
    }),
  );
export type RansomwareReportsClearSuspectsInput =
  typeof RansomwareReportsClearSuspectsInput.Type;

// Output Schema
export const RansomwareReportsClearSuspectsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RansomwareReportsClearSuspectsOutput =
  typeof RansomwareReportsClearSuspectsOutput.Type;

// The operation
/**
 * Clear ransomware suspects for the given Advanced Ransomware Protection report. You should evaluate the report to determine whether the activity is acceptable (false positive) or whether an attack seems malicious.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data",
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param ransomwareReportName - The name of the ransomware report
 */
export const RansomwareReportsClearSuspects =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RansomwareReportsClearSuspectsInput,
    outputSchema: RansomwareReportsClearSuspectsOutput,
  }));
// Input Schema
export const RansomwareReportsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    ransomwareReportName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/ransomwareReports/{ransomwareReportName}",
    }),
  );
export type RansomwareReportsGetInput = typeof RansomwareReportsGetInput.Type;

// Output Schema
export const RansomwareReportsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RansomwareReportsGetOutput = typeof RansomwareReportsGetOutput.Type;

// The operation
/**
 * Get details of the specified ransomware report (ARP)
 * ARP reports are created with a list of suspected files when it detects any combination of high data entropy, abnormal volume activity with data encryption, and unusual file extensions.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param ransomwareReportName - The name of the ransomware report
 */
export const RansomwareReportsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RansomwareReportsGetInput,
    outputSchema: RansomwareReportsGetOutput,
  }),
);
// Input Schema
export const RansomwareReportsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/ransomwareReports",
    }),
  );
export type RansomwareReportsListInput = typeof RansomwareReportsListInput.Type;

// Output Schema
export const RansomwareReportsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type RansomwareReportsListOutput =
  typeof RansomwareReportsListOutput.Type;

// The operation
/**
 * List all ransomware reports for the volume
 * Returns a list of the Advanced Ransomware Protection (ARP) reports for the volume.
 * ARP reports are created with a list of suspected files when it detects any combination of high data entropy, abnormal volume activity with data encryption, and unusual file extensions.
 * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data"
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const RansomwareReportsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RansomwareReportsListInput,
    outputSchema: RansomwareReportsListOutput,
  }),
);
// Input Schema
export const SnapshotPoliciesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    snapshotPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}",
    }),
  );
export type SnapshotPoliciesCreateInput =
  typeof SnapshotPoliciesCreateInput.Type;

// Output Schema
export const SnapshotPoliciesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SnapshotPoliciesCreateOutput =
  typeof SnapshotPoliciesCreateOutput.Type;

// The operation
/**
 * Create a snapshot policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param snapshotPolicyName - The name of the snapshot policy
 */
export const SnapshotPoliciesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnapshotPoliciesCreateInput,
    outputSchema: SnapshotPoliciesCreateOutput,
  }),
);
// Input Schema
export const SnapshotPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    snapshotPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}",
    }),
  );
export type SnapshotPoliciesDeleteInput =
  typeof SnapshotPoliciesDeleteInput.Type;

// Output Schema
export const SnapshotPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SnapshotPoliciesDeleteOutput =
  typeof SnapshotPoliciesDeleteOutput.Type;

// The operation
/**
 * Delete snapshot policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param snapshotPolicyName - The name of the snapshot policy
 */
export const SnapshotPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnapshotPoliciesDeleteInput,
    outputSchema: SnapshotPoliciesDeleteOutput,
  }),
);
// Input Schema
export const SnapshotPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    snapshotPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}",
    }),
  );
export type SnapshotPoliciesGetInput = typeof SnapshotPoliciesGetInput.Type;

// Output Schema
export const SnapshotPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SnapshotPoliciesGetOutput = typeof SnapshotPoliciesGetOutput.Type;

// The operation
/**
 * Get a snapshot Policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param snapshotPolicyName - The name of the snapshot policy
 */
export const SnapshotPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotPoliciesGetInput,
  outputSchema: SnapshotPoliciesGetOutput,
}));
// Input Schema
export const SnapshotPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies",
    }),
  );
export type SnapshotPoliciesListInput = typeof SnapshotPoliciesListInput.Type;

// Output Schema
export const SnapshotPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SnapshotPoliciesListOutput = typeof SnapshotPoliciesListOutput.Type;

// The operation
/**
 * List snapshot policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const SnapshotPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnapshotPoliciesListInput,
    outputSchema: SnapshotPoliciesListOutput,
  }),
);
// Input Schema
export const SnapshotPoliciesListVolumesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    snapshotPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}/volumes",
    }),
  );
export type SnapshotPoliciesListVolumesInput =
  typeof SnapshotPoliciesListVolumesInput.Type;

// Output Schema
export const SnapshotPoliciesListVolumesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SnapshotPoliciesListVolumesOutput =
  typeof SnapshotPoliciesListVolumesOutput.Type;

// The operation
/**
 * Get volumes associated with snapshot policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param snapshotPolicyName - The name of the snapshot policy
 */
export const SnapshotPoliciesListVolumes = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnapshotPoliciesListVolumesInput,
    outputSchema: SnapshotPoliciesListVolumesOutput,
  }),
);
// Input Schema
export const SnapshotPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    snapshotPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}",
    }),
  );
export type SnapshotPoliciesUpdateInput =
  typeof SnapshotPoliciesUpdateInput.Type;

// Output Schema
export const SnapshotPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type SnapshotPoliciesUpdateOutput =
  typeof SnapshotPoliciesUpdateOutput.Type;

// The operation
/**
 * Patch a snapshot policy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param snapshotPolicyName - The name of the snapshot policy
 */
export const SnapshotPoliciesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnapshotPoliciesUpdateInput,
    outputSchema: SnapshotPoliciesUpdateOutput,
  }),
);
// Input Schema
export const SnapshotsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  snapshotName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}",
  }),
);
export type SnapshotsCreateInput = typeof SnapshotsCreateInput.Type;

// Output Schema
export const SnapshotsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SnapshotsCreateOutput = typeof SnapshotsCreateOutput.Type;

// The operation
/**
 * Create the specified snapshot within the given volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param snapshotName - The name of the snapshot
 */
export const SnapshotsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsCreateInput,
  outputSchema: SnapshotsCreateOutput,
}));
// Input Schema
export const SnapshotsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  snapshotName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}",
  }),
);
export type SnapshotsDeleteInput = typeof SnapshotsDeleteInput.Type;

// Output Schema
export const SnapshotsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SnapshotsDeleteOutput = typeof SnapshotsDeleteOutput.Type;

// The operation
/**
 * Delete snapshot
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param snapshotName - The name of the snapshot
 */
export const SnapshotsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsDeleteInput,
  outputSchema: SnapshotsDeleteOutput,
}));
// Input Schema
export const SnapshotsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  snapshotName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}",
  }),
);
export type SnapshotsGetInput = typeof SnapshotsGetInput.Type;

// Output Schema
export const SnapshotsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SnapshotsGetOutput = typeof SnapshotsGetOutput.Type;

// The operation
/**
 * Get details of the specified snapshot
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param snapshotName - The name of the snapshot
 */
export const SnapshotsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsGetInput,
  outputSchema: SnapshotsGetOutput,
}));
// Input Schema
export const SnapshotsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots",
  }),
);
export type SnapshotsListInput = typeof SnapshotsListInput.Type;

// Output Schema
export const SnapshotsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(Schema.Struct({})),
  nextLink: Schema.optional(Schema.String),
});
export type SnapshotsListOutput = typeof SnapshotsListOutput.Type;

// The operation
/**
 * List all snapshots associated with the volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const SnapshotsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsListInput,
  outputSchema: SnapshotsListOutput,
}));
// Input Schema
export const SnapshotsRestoreFilesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    snapshotName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}/restoreFiles",
    }),
  );
export type SnapshotsRestoreFilesInput = typeof SnapshotsRestoreFilesInput.Type;

// Output Schema
export const SnapshotsRestoreFilesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SnapshotsRestoreFilesOutput =
  typeof SnapshotsRestoreFilesOutput.Type;

// The operation
/**
 * Restore the specified files from the specified snapshot to the active filesystem
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param snapshotName - The name of the snapshot
 */
export const SnapshotsRestoreFiles = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SnapshotsRestoreFilesInput,
    outputSchema: SnapshotsRestoreFilesOutput,
  }),
);
// Input Schema
export const SnapshotsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  snapshotName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/snapshots/{snapshotName}",
  }),
);
export type SnapshotsUpdateInput = typeof SnapshotsUpdateInput.Type;

// Output Schema
export const SnapshotsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SnapshotsUpdateOutput = typeof SnapshotsUpdateOutput.Type;

// The operation
/**
 * Patch a snapshot
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param snapshotName - The name of the snapshot
 */
export const SnapshotsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SnapshotsUpdateInput,
  outputSchema: SnapshotsUpdateOutput,
}));
// Input Schema
export const SubvolumesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  subvolumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes/{subvolumeName}",
  }),
);
export type SubvolumesCreateInput = typeof SubvolumesCreateInput.Type;

// Output Schema
export const SubvolumesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SubvolumesCreateOutput = typeof SubvolumesCreateOutput.Type;

// The operation
/**
 * Creates a subvolume in the path or clones the subvolume mentioned in the parentPath
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param subvolumeName - The name of the subvolume.
 */
export const SubvolumesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubvolumesCreateInput,
  outputSchema: SubvolumesCreateOutput,
}));
// Input Schema
export const SubvolumesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  subvolumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes/{subvolumeName}",
  }),
);
export type SubvolumesDeleteInput = typeof SubvolumesDeleteInput.Type;

// Output Schema
export const SubvolumesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SubvolumesDeleteOutput = typeof SubvolumesDeleteOutput.Type;

// The operation
/**
 * Delete subvolume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param subvolumeName - The name of the subvolume.
 */
export const SubvolumesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubvolumesDeleteInput,
  outputSchema: SubvolumesDeleteOutput,
}));
// Input Schema
export const SubvolumesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  subvolumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes/{subvolumeName}",
  }),
);
export type SubvolumesGetInput = typeof SubvolumesGetInput.Type;

// Output Schema
export const SubvolumesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SubvolumesGetOutput = typeof SubvolumesGetOutput.Type;

// The operation
/**
 * Returns the path associated with the subvolumeName provided
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param subvolumeName - The name of the subvolume.
 */
export const SubvolumesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubvolumesGetInput,
  outputSchema: SubvolumesGetOutput,
}));
// Input Schema
export const SubvolumesGetMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    subvolumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes/{subvolumeName}/getMetadata",
    }),
  );
export type SubvolumesGetMetadataInput = typeof SubvolumesGetMetadataInput.Type;

// Output Schema
export const SubvolumesGetMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        path: Schema.optional(Schema.String),
        parentPath: Schema.optional(Schema.String),
        size: Schema.optional(Schema.Number),
        bytesUsed: Schema.optional(Schema.Number),
        permissions: Schema.optional(Schema.String),
        creationTimeStamp: Schema.optional(Schema.String),
        accessedTimeStamp: Schema.optional(Schema.String),
        modifiedTimeStamp: Schema.optional(Schema.String),
        changedTimeStamp: Schema.optional(Schema.String),
        provisioningState: Schema.optional(Schema.String),
      }),
    ),
  });
export type SubvolumesGetMetadataOutput =
  typeof SubvolumesGetMetadataOutput.Type;

// The operation
/**
 * Get details of the specified subvolume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param subvolumeName - The name of the subvolume.
 */
export const SubvolumesGetMetadata = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubvolumesGetMetadataInput,
    outputSchema: SubvolumesGetMetadataOutput,
  }),
);
// Input Schema
export const SubvolumesListByVolumeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes",
    }),
  );
export type SubvolumesListByVolumeInput =
  typeof SubvolumesListByVolumeInput.Type;

// Output Schema
export const SubvolumesListByVolumeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type SubvolumesListByVolumeOutput =
  typeof SubvolumesListByVolumeOutput.Type;

// The operation
/**
 * Returns a list of the subvolumes in the volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const SubvolumesListByVolume = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubvolumesListByVolumeInput,
    outputSchema: SubvolumesListByVolumeOutput,
  }),
);
// Input Schema
export const SubvolumesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  subvolumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/subvolumes/{subvolumeName}",
  }),
);
export type SubvolumesUpdateInput = typeof SubvolumesUpdateInput.Type;

// Output Schema
export const SubvolumesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SubvolumesUpdateOutput = typeof SubvolumesUpdateOutput.Type;

// The operation
/**
 * Patch a subvolume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param subvolumeName - The name of the subvolume.
 */
export const SubvolumesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SubvolumesUpdateInput,
  outputSchema: SubvolumesUpdateOutput,
}));
// Input Schema
export const VolumeGroupsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    volumeGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups/{volumeGroupName}",
    }),
  );
export type VolumeGroupsCreateInput = typeof VolumeGroupsCreateInput.Type;

// Output Schema
export const VolumeGroupsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VolumeGroupsCreateOutput = typeof VolumeGroupsCreateOutput.Type;

// The operation
/**
 * Create a volume group along with specified volumes
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param volumeGroupName - The name of the volumeGroup
 */
export const VolumeGroupsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumeGroupsCreateInput,
  outputSchema: VolumeGroupsCreateOutput,
}));
// Input Schema
export const VolumeGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    volumeGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups/{volumeGroupName}",
    }),
  );
export type VolumeGroupsDeleteInput = typeof VolumeGroupsDeleteInput.Type;

// Output Schema
export const VolumeGroupsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumeGroupsDeleteOutput = typeof VolumeGroupsDeleteOutput.Type;

// The operation
/**
 * Delete the specified volume group only if there are no volumes under volume group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param volumeGroupName - The name of the volumeGroup
 */
export const VolumeGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumeGroupsDeleteInput,
  outputSchema: VolumeGroupsDeleteOutput,
}));
// Input Schema
export const VolumeGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  volumeGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups/{volumeGroupName}",
  }),
);
export type VolumeGroupsGetInput = typeof VolumeGroupsGetInput.Type;

// Output Schema
export const VolumeGroupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type VolumeGroupsGetOutput = typeof VolumeGroupsGetOutput.Type;

// The operation
/**
 * Get details of the specified volume group
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param volumeGroupName - The name of the volumeGroup
 */
export const VolumeGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumeGroupsGetInput,
  outputSchema: VolumeGroupsGetOutput,
}));
// Input Schema
export const VolumeGroupsListByNetAppAccountInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups",
    }),
  );
export type VolumeGroupsListByNetAppAccountInput =
  typeof VolumeGroupsListByNetAppAccountInput.Type;

// Output Schema
export const VolumeGroupsListByNetAppAccountOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        location: Schema.optional(Schema.String),
        id: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.String),
        properties: Schema.optional(
          Schema.Struct({
            provisioningState: Schema.optional(Schema.String),
            groupMetaData: Schema.optional(
              Schema.Struct({
                groupDescription: Schema.optional(Schema.String),
                applicationType: Schema.optional(
                  Schema.Literals(["SAP-HANA", "ORACLE"]),
                ),
                applicationIdentifier: Schema.optional(Schema.String),
                globalPlacementRules: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      key: Schema.String,
                      value: Schema.String,
                    }),
                  ),
                ),
                volumesCount: Schema.optional(Schema.Number),
              }),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VolumeGroupsListByNetAppAccountOutput =
  typeof VolumeGroupsListByNetAppAccountOutput.Type;

// The operation
/**
 * List all volume groups for given account
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 */
export const VolumeGroupsListByNetAppAccount =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VolumeGroupsListByNetAppAccountInput,
    outputSchema: VolumeGroupsListByNetAppAccountOutput,
  }));
// Input Schema
export const VolumeQuotaRulesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    volumeQuotaRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/volumeQuotaRules/{volumeQuotaRuleName}",
    }),
  );
export type VolumeQuotaRulesCreateInput =
  typeof VolumeQuotaRulesCreateInput.Type;

// Output Schema
export const VolumeQuotaRulesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VolumeQuotaRulesCreateOutput =
  typeof VolumeQuotaRulesCreateOutput.Type;

// The operation
/**
 * Create the specified quota rule within the given volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param volumeQuotaRuleName - The name of volume quota rule
 */
export const VolumeQuotaRulesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumeQuotaRulesCreateInput,
    outputSchema: VolumeQuotaRulesCreateOutput,
  }),
);
// Input Schema
export const VolumeQuotaRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    volumeQuotaRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/volumeQuotaRules/{volumeQuotaRuleName}",
    }),
  );
export type VolumeQuotaRulesDeleteInput =
  typeof VolumeQuotaRulesDeleteInput.Type;

// Output Schema
export const VolumeQuotaRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumeQuotaRulesDeleteOutput =
  typeof VolumeQuotaRulesDeleteOutput.Type;

// The operation
/**
 * Delete quota rule
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param volumeQuotaRuleName - The name of volume quota rule
 */
export const VolumeQuotaRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumeQuotaRulesDeleteInput,
    outputSchema: VolumeQuotaRulesDeleteOutput,
  }),
);
// Input Schema
export const VolumeQuotaRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    volumeQuotaRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/volumeQuotaRules/{volumeQuotaRuleName}",
    }),
  );
export type VolumeQuotaRulesGetInput = typeof VolumeQuotaRulesGetInput.Type;

// Output Schema
export const VolumeQuotaRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VolumeQuotaRulesGetOutput = typeof VolumeQuotaRulesGetOutput.Type;

// The operation
/**
 * Get details of the specified quota rule
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param volumeQuotaRuleName - The name of volume quota rule
 */
export const VolumeQuotaRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumeQuotaRulesGetInput,
  outputSchema: VolumeQuotaRulesGetOutput,
}));
// Input Schema
export const VolumeQuotaRulesListByVolumeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/volumeQuotaRules",
    }),
  );
export type VolumeQuotaRulesListByVolumeInput =
  typeof VolumeQuotaRulesListByVolumeInput.Type;

// Output Schema
export const VolumeQuotaRulesListByVolumeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VolumeQuotaRulesListByVolumeOutput =
  typeof VolumeQuotaRulesListByVolumeOutput.Type;

// The operation
/**
 * List all quota rules associated with the volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumeQuotaRulesListByVolume =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VolumeQuotaRulesListByVolumeInput,
    outputSchema: VolumeQuotaRulesListByVolumeOutput,
  }));
// Input Schema
export const VolumeQuotaRulesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    volumeQuotaRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/volumeQuotaRules/{volumeQuotaRuleName}",
    }),
  );
export type VolumeQuotaRulesUpdateInput =
  typeof VolumeQuotaRulesUpdateInput.Type;

// Output Schema
export const VolumeQuotaRulesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VolumeQuotaRulesUpdateOutput =
  typeof VolumeQuotaRulesUpdateOutput.Type;

// The operation
/**
 * Patch a quota rule
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param volumeQuotaRuleName - The name of volume quota rule
 */
export const VolumeQuotaRulesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumeQuotaRulesUpdateInput,
    outputSchema: VolumeQuotaRulesUpdateOutput,
  }),
);
// Input Schema
export const VolumesAuthorizeExternalReplicationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/authorizeExternalReplication",
    }),
  );
export type VolumesAuthorizeExternalReplicationInput =
  typeof VolumesAuthorizeExternalReplicationInput.Type;

// Output Schema
export const VolumesAuthorizeExternalReplicationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    svmPeeringCommand: Schema.optional(Schema.String),
  });
export type VolumesAuthorizeExternalReplicationOutput =
  typeof VolumesAuthorizeExternalReplicationOutput.Type;

// The operation
/**
 * Starts SVM peering and returns a command to be run on the external ONTAP to accept it.  Once the SVM have been peered a SnapMirror will be created
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesAuthorizeExternalReplication =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VolumesAuthorizeExternalReplicationInput,
    outputSchema: VolumesAuthorizeExternalReplicationOutput,
  }));
// Input Schema
export const VolumesAuthorizeReplicationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/authorizeReplication",
    }),
  );
export type VolumesAuthorizeReplicationInput =
  typeof VolumesAuthorizeReplicationInput.Type;

// Output Schema
export const VolumesAuthorizeReplicationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesAuthorizeReplicationOutput =
  typeof VolumesAuthorizeReplicationOutput.Type;

// The operation
/**
 * Authorize the replication connection on the source volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesAuthorizeReplication = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesAuthorizeReplicationInput,
    outputSchema: VolumesAuthorizeReplicationOutput,
  }),
);
// Input Schema
export const VolumesBreakFileLocksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/breakFileLocks",
    }),
  );
export type VolumesBreakFileLocksInput = typeof VolumesBreakFileLocksInput.Type;

// Output Schema
export const VolumesBreakFileLocksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesBreakFileLocksOutput =
  typeof VolumesBreakFileLocksOutput.Type;

// The operation
/**
 * Break all the file locks on a volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesBreakFileLocks = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesBreakFileLocksInput,
    outputSchema: VolumesBreakFileLocksOutput,
  }),
);
// Input Schema
export const VolumesBreakReplicationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/breakReplication",
    }),
  );
export type VolumesBreakReplicationInput =
  typeof VolumesBreakReplicationInput.Type;

// Output Schema
export const VolumesBreakReplicationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesBreakReplicationOutput =
  typeof VolumesBreakReplicationOutput.Type;

// The operation
/**
 * Break the replication connection on the destination volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesBreakReplication = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesBreakReplicationInput,
    outputSchema: VolumesBreakReplicationOutput,
  }),
);
// Input Schema
export const VolumesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}",
    }),
  );
export type VolumesCreateOrUpdateInput = typeof VolumesCreateOrUpdateInput.Type;

// Output Schema
export const VolumesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VolumesCreateOrUpdateOutput =
  typeof VolumesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update the specified volume within the capacity pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesCreateOrUpdateInput,
    outputSchema: VolumesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const VolumesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  forceDelete: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}",
  }),
);
export type VolumesDeleteInput = typeof VolumesDeleteInput.Type;

// Output Schema
export const VolumesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesDeleteOutput = typeof VolumesDeleteOutput.Type;

// The operation
/**
 * Delete the specified volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 * @param forceDelete - An option to force delete the volume. Will cleanup resources connected to the particular volume
 */
export const VolumesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesDeleteInput,
  outputSchema: VolumesDeleteOutput,
}));
// Input Schema
export const VolumesDeleteReplicationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/deleteReplication",
    }),
  );
export type VolumesDeleteReplicationInput =
  typeof VolumesDeleteReplicationInput.Type;

// Output Schema
export const VolumesDeleteReplicationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesDeleteReplicationOutput =
  typeof VolumesDeleteReplicationOutput.Type;

// The operation
/**
 * Delete the replication connection on the destination volume, and send release to the source replication
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesDeleteReplication = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesDeleteReplicationInput,
    outputSchema: VolumesDeleteReplicationOutput,
  }),
);
// Input Schema
export const VolumesFinalizeExternalReplicationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/finalizeExternalReplication",
    }),
  );
export type VolumesFinalizeExternalReplicationInput =
  typeof VolumesFinalizeExternalReplicationInput.Type;

// Output Schema
export const VolumesFinalizeExternalReplicationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesFinalizeExternalReplicationOutput =
  typeof VolumesFinalizeExternalReplicationOutput.Type;

// The operation
/**
 * Finalizes the migration of an external volume by releasing the replication and breaking the external cluster peering if no other migration is active.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesFinalizeExternalReplication =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VolumesFinalizeExternalReplicationInput,
    outputSchema: VolumesFinalizeExternalReplicationOutput,
  }));
// Input Schema
export const VolumesFinalizeRelocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/finalizeRelocation",
    }),
  );
export type VolumesFinalizeRelocationInput =
  typeof VolumesFinalizeRelocationInput.Type;

// Output Schema
export const VolumesFinalizeRelocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesFinalizeRelocationOutput =
  typeof VolumesFinalizeRelocationOutput.Type;

// The operation
/**
 * Finalizes the relocation of the volume and cleans up the old volume.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesFinalizeRelocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesFinalizeRelocationInput,
    outputSchema: VolumesFinalizeRelocationOutput,
  }),
);
// Input Schema
export const VolumesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}",
  }),
);
export type VolumesGetInput = typeof VolumesGetInput.Type;

// Output Schema
export const VolumesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type VolumesGetOutput = typeof VolumesGetOutput.Type;

// The operation
/**
 * Get the details of the specified volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesGetInput,
  outputSchema: VolumesGetOutput,
}));
// Input Schema
export const VolumesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes",
  }),
);
export type VolumesListInput = typeof VolumesListInput.Type;

// Output Schema
export const VolumesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.String,
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type VolumesListOutput = typeof VolumesListOutput.Type;

// The operation
/**
 * List all volumes within the capacity pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 */
export const VolumesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesListInput,
  outputSchema: VolumesListOutput,
}));
// Input Schema
export const VolumesListGetGroupIdListForLdapUserInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/getGroupIdListForLdapUser",
    }),
  );
export type VolumesListGetGroupIdListForLdapUserInput =
  typeof VolumesListGetGroupIdListForLdapUserInput.Type;

// Output Schema
export const VolumesListGetGroupIdListForLdapUserOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupIdsForLdapUser: Schema.optional(Schema.Array(Schema.String)),
  });
export type VolumesListGetGroupIdListForLdapUserOutput =
  typeof VolumesListGetGroupIdListForLdapUserOutput.Type;

// The operation
/**
 * Returns the list of group Ids for a specific LDAP User
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesListGetGroupIdListForLdapUser =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VolumesListGetGroupIdListForLdapUserInput,
    outputSchema: VolumesListGetGroupIdListForLdapUserOutput,
  }));
// Input Schema
export const VolumesListQuotaReportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/listQuotaReport",
    }),
  );
export type VolumesListQuotaReportInput =
  typeof VolumesListQuotaReportInput.Type;

// Output Schema
export const VolumesListQuotaReportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        quotaReportRecords: Schema.optional(
          Schema.Array(
            Schema.Struct({
              quotaType: Schema.optional(
                Schema.Literals([
                  "DefaultUserQuota",
                  "DefaultGroupQuota",
                  "IndividualUserQuota",
                  "IndividualGroupQuota",
                ]),
              ),
              quotaTarget: Schema.optional(Schema.String),
              quotaLimitUsedInKiBs: Schema.optional(Schema.Number),
              quotaLimitTotalInKiBs: Schema.optional(Schema.Number),
              percentageUsed: Schema.optional(Schema.Number),
              isDerivedQuota: Schema.optional(Schema.Boolean),
            }),
          ),
        ),
      }),
    ),
  });
export type VolumesListQuotaReportOutput =
  typeof VolumesListQuotaReportOutput.Type;

// The operation
/**
 * Get quota report for volume (with filter support)
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesListQuotaReport = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesListQuotaReportInput,
    outputSchema: VolumesListQuotaReportOutput,
  }),
);
// Input Schema
export const VolumesListReplicationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/listReplications",
    }),
  );
export type VolumesListReplicationsInput =
  typeof VolumesListReplicationsInput.Type;

// Output Schema
export const VolumesListReplicationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        replicationId: Schema.optional(Schema.String),
        endpointType: Schema.optional(Schema.Literals(["src", "dst"])),
        replicationSchedule: Schema.optional(
          Schema.Literals(["_10minutely", "hourly", "daily"]),
        ),
        remoteVolumeResourceId: Schema.optional(Schema.String),
        remoteVolumeRegion: Schema.optional(Schema.String),
        mirrorState: Schema.optional(
          Schema.Literals(["Uninitialized", "Mirrored", "Broken"]),
        ),
        replicationCreationTime: Schema.optional(Schema.String),
        replicationDeletionTime: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type VolumesListReplicationsOutput =
  typeof VolumesListReplicationsOutput.Type;

// The operation
/**
 * List all replications for a specified volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesListReplications = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesListReplicationsInput,
    outputSchema: VolumesListReplicationsOutput,
  }),
);
// Input Schema
export const VolumesPeerExternalClusterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/peerExternalCluster",
    }),
  );
export type VolumesPeerExternalClusterInput =
  typeof VolumesPeerExternalClusterInput.Type;

// Output Schema
export const VolumesPeerExternalClusterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    peerAcceptCommand: Schema.optional(Schema.String),
  });
export type VolumesPeerExternalClusterOutput =
  typeof VolumesPeerExternalClusterOutput.Type;

// The operation
/**
 * Starts peering the external cluster for this migration volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesPeerExternalCluster = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesPeerExternalClusterInput,
    outputSchema: VolumesPeerExternalClusterOutput,
  }),
);
// Input Schema
export const VolumesPerformReplicationTransferInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/performReplicationTransfer",
    }),
  );
export type VolumesPerformReplicationTransferInput =
  typeof VolumesPerformReplicationTransferInput.Type;

// Output Schema
export const VolumesPerformReplicationTransferOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesPerformReplicationTransferOutput =
  typeof VolumesPerformReplicationTransferOutput.Type;

// The operation
/**
 * Performs an adhoc replication transfer on a volume with volumeType Migration
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesPerformReplicationTransfer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VolumesPerformReplicationTransferInput,
    outputSchema: VolumesPerformReplicationTransferOutput,
  }));
// Input Schema
export const VolumesPoolChangeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/poolChange",
  }),
);
export type VolumesPoolChangeInput = typeof VolumesPoolChangeInput.Type;

// Output Schema
export const VolumesPoolChangeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesPoolChangeOutput = typeof VolumesPoolChangeOutput.Type;

// The operation
/**
 * Moves volume to another pool
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesPoolChange = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesPoolChangeInput,
  outputSchema: VolumesPoolChangeOutput,
}));
// Input Schema
export const VolumesPopulateAvailabilityZoneInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/populateAvailabilityZone",
    }),
  );
export type VolumesPopulateAvailabilityZoneInput =
  typeof VolumesPopulateAvailabilityZoneInput.Type;

// Output Schema
export const VolumesPopulateAvailabilityZoneOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VolumesPopulateAvailabilityZoneOutput =
  typeof VolumesPopulateAvailabilityZoneOutput.Type;

// The operation
/**
 * This operation will populate availability zone information for a volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesPopulateAvailabilityZone =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VolumesPopulateAvailabilityZoneInput,
    outputSchema: VolumesPopulateAvailabilityZoneOutput,
  }));
// Input Schema
export const VolumesReestablishReplicationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/reestablishReplication",
    }),
  );
export type VolumesReestablishReplicationInput =
  typeof VolumesReestablishReplicationInput.Type;

// Output Schema
export const VolumesReestablishReplicationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesReestablishReplicationOutput =
  typeof VolumesReestablishReplicationOutput.Type;

// The operation
/**
 * Re-establish a previously deleted replication between 2 volumes that have a common ad-hoc or policy-based snapshots
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesReestablishReplication =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VolumesReestablishReplicationInput,
    outputSchema: VolumesReestablishReplicationOutput,
  }));
// Input Schema
export const VolumesReInitializeReplicationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/reinitializeReplication",
    }),
  );
export type VolumesReInitializeReplicationInput =
  typeof VolumesReInitializeReplicationInput.Type;

// Output Schema
export const VolumesReInitializeReplicationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesReInitializeReplicationOutput =
  typeof VolumesReInitializeReplicationOutput.Type;

// The operation
/**
 * Re-Initializes the replication connection on the destination volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesReInitializeReplication =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VolumesReInitializeReplicationInput,
    outputSchema: VolumesReInitializeReplicationOutput,
  }));
// Input Schema
export const VolumesRelocateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/relocate",
  }),
);
export type VolumesRelocateInput = typeof VolumesRelocateInput.Type;

// Output Schema
export const VolumesRelocateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesRelocateOutput = typeof VolumesRelocateOutput.Type;

// The operation
/**
 * Relocates volume to a new stamp
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesRelocate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesRelocateInput,
  outputSchema: VolumesRelocateOutput,
}));
// Input Schema
export const VolumesReplicationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/replicationStatus",
    }),
  );
export type VolumesReplicationStatusInput =
  typeof VolumesReplicationStatusInput.Type;

// Output Schema
export const VolumesReplicationStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    healthy: Schema.optional(Schema.Boolean),
    relationshipStatus: Schema.optional(
      Schema.Literals(["Idle", "Transferring"]),
    ),
    mirrorState: Schema.optional(
      Schema.Literals(["Uninitialized", "Mirrored", "Broken"]),
    ),
    totalProgress: Schema.optional(Schema.String),
    errorMessage: Schema.optional(Schema.String),
  });
export type VolumesReplicationStatusOutput =
  typeof VolumesReplicationStatusOutput.Type;

// The operation
/**
 * Get the status of the replication
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesReplicationStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesReplicationStatusInput,
    outputSchema: VolumesReplicationStatusOutput,
  }),
);
// Input Schema
export const VolumesResetCifsPasswordInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/resetCifsPassword",
    }),
  );
export type VolumesResetCifsPasswordInput =
  typeof VolumesResetCifsPasswordInput.Type;

// Output Schema
export const VolumesResetCifsPasswordOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesResetCifsPasswordOutput =
  typeof VolumesResetCifsPasswordOutput.Type;

// The operation
/**
 * Reset cifs password from volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesResetCifsPassword = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesResetCifsPasswordInput,
    outputSchema: VolumesResetCifsPasswordOutput,
  }),
);
// Input Schema
export const VolumesResyncReplicationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/resyncReplication",
    }),
  );
export type VolumesResyncReplicationInput =
  typeof VolumesResyncReplicationInput.Type;

// Output Schema
export const VolumesResyncReplicationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesResyncReplicationOutput =
  typeof VolumesResyncReplicationOutput.Type;

// The operation
/**
 * Resync the connection on the destination volume. If the operation is ran on the source volume it will reverse-resync the connection and sync from destination to source.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesResyncReplication = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesResyncReplicationInput,
    outputSchema: VolumesResyncReplicationOutput,
  }),
);
// Input Schema
export const VolumesRevertInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/revert",
  }),
);
export type VolumesRevertInput = typeof VolumesRevertInput.Type;

// Output Schema
export const VolumesRevertOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesRevertOutput = typeof VolumesRevertOutput.Type;

// The operation
/**
 * Revert a volume to the snapshot specified in the body
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesRevert = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesRevertInput,
  outputSchema: VolumesRevertOutput,
}));
// Input Schema
export const VolumesRevertRelocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/revertRelocation",
    }),
  );
export type VolumesRevertRelocationInput =
  typeof VolumesRevertRelocationInput.Type;

// Output Schema
export const VolumesRevertRelocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VolumesRevertRelocationOutput =
  typeof VolumesRevertRelocationOutput.Type;

// The operation
/**
 * Reverts the volume relocation process, cleans up the new volume and starts using the former-existing volume.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesRevertRelocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesRevertRelocationInput,
    outputSchema: VolumesRevertRelocationOutput,
  }),
);
// Input Schema
export const VolumesSplitCloneFromParentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    accountName: Schema.String.pipe(T.PathParam()),
    poolName: Schema.String.pipe(T.PathParam()),
    volumeName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}/splitCloneFromParent",
    }),
  );
export type VolumesSplitCloneFromParentInput =
  typeof VolumesSplitCloneFromParentInput.Type;

// Output Schema
export const VolumesSplitCloneFromParentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type VolumesSplitCloneFromParentOutput =
  typeof VolumesSplitCloneFromParentOutput.Type;

// The operation
/**
 * Split operation to convert clone volume to an independent volume.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesSplitCloneFromParent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VolumesSplitCloneFromParentInput,
    outputSchema: VolumesSplitCloneFromParentOutput,
  }),
);
// Input Schema
export const VolumesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  accountName: Schema.String.pipe(T.PathParam()),
  poolName: Schema.String.pipe(T.PathParam()),
  volumeName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/capacityPools/{poolName}/volumes/{volumeName}",
  }),
);
export type VolumesUpdateInput = typeof VolumesUpdateInput.Type;

// Output Schema
export const VolumesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type VolumesUpdateOutput = typeof VolumesUpdateOutput.Type;

// The operation
/**
 * Patch the specified volume
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param accountName - The name of the NetApp account
 * @param poolName - The name of the capacity pool
 * @param volumeName - The name of the volume
 */
export const VolumesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VolumesUpdateInput,
  outputSchema: VolumesUpdateOutput,
}));
