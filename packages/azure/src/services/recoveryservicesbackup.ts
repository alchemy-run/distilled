/**
 * Azure Recoveryservicesbackup API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BackupEnginesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupEngines",
  }),
);
export type BackupEnginesListInput = typeof BackupEnginesListInput.Type;

// Output Schema
export const BackupEnginesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupEnginesListOutput = typeof BackupEnginesListOutput.Type;

// The operation
/**
 * Backup management servers registered to Recovery Services Vault. Returns a pageable list of servers.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param $filter - OData filter options.
 * @param $skipToken - skipToken Filter.
 */
export const BackupEnginesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupEnginesListInput,
  outputSchema: BackupEnginesListOutput,
}));
// Input Schema
export const BackupJobsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $filter: Schema.optional(Schema.String),
  $skipToken: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupJobs",
  }),
);
export type BackupJobsListInput = typeof BackupJobsListInput.Type;

// Output Schema
export const BackupJobsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
});
export type BackupJobsListOutput = typeof BackupJobsListOutput.Type;

// The operation
/**
 * Provides a pageable list of jobs.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param $filter - OData filter options.
 * @param $skipToken - skipToken Filter.
 */
export const BackupJobsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupJobsListInput,
  outputSchema: BackupJobsListOutput,
}));
// Input Schema
export const BackupOperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupOperationResults/{operationId}",
    }),
  );
export type BackupOperationResultsGetInput =
  typeof BackupOperationResultsGetInput.Type;

// Output Schema
export const BackupOperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupOperationResultsGetOutput =
  typeof BackupOperationResultsGetOutput.Type;

// The operation
/**
 * Provides the status of the delete operations such as deleting backed up item. Once the operation has started, the
 * status code in the response would be Accepted. It will continue to be in this state till it reaches completion. On
 * successful completion, the status code will be OK. This method expects OperationID as an argument. OperationID is
 * part of the Location header of the operation response.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param operationId - OperationID which represents the operation.
 */
export const BackupOperationResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupOperationResultsGetInput,
    outputSchema: BackupOperationResultsGetOutput,
  }),
);
// Input Schema
export const BackupOperationStatusesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupOperations/{operationId}",
    }),
  );
export type BackupOperationStatusesGetInput =
  typeof BackupOperationStatusesGetInput.Type;

// Output Schema
export const BackupOperationStatusesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Invalid",
        "InProgress",
        "Succeeded",
        "Failed",
        "Canceled",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
  });
export type BackupOperationStatusesGetOutput =
  typeof BackupOperationStatusesGetOutput.Type;

// The operation
/**
 * Fetches the status of an operation such as triggering a backup, restore. The status can be in progress, completed
 * or failed. You can refer to the OperationStatus enum for all the possible states of an operation. Some operations
 * create jobs. This method returns the list of jobs when the operation is complete.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param operationId - OperationID which represents the operation.
 */
export const BackupOperationStatusesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupOperationStatusesGetInput,
    outputSchema: BackupOperationStatusesGetOutput,
  }),
);
// Input Schema
export const BackupPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupPolicies",
    }),
  );
export type BackupPoliciesListInput = typeof BackupPoliciesListInput.Type;

// Output Schema
export const BackupPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupPoliciesListOutput = typeof BackupPoliciesListOutput.Type;

// The operation
/**
 * Lists of backup policies associated with Recovery Services Vault. API provides pagination parameters to fetch
 * scoped results.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param $filter - OData filter options.
 */
export const BackupPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupPoliciesListInput,
  outputSchema: BackupPoliciesListOutput,
}));
// Input Schema
export const BackupProtectableItemsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupProtectableItems",
    }),
  );
export type BackupProtectableItemsListInput =
  typeof BackupProtectableItemsListInput.Type;

// Output Schema
export const BackupProtectableItemsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupProtectableItemsListOutput =
  typeof BackupProtectableItemsListOutput.Type;

// The operation
/**
 * Provides a pageable list of protectable objects within your subscription according to the query filter and the
 * pagination parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param $filter - OData filter options.
 * @param $skipToken - skipToken Filter.
 */
export const BackupProtectableItemsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupProtectableItemsListInput,
    outputSchema: BackupProtectableItemsListOutput,
  }),
);
// Input Schema
export const BackupProtectedItemsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupProtectedItems",
    }),
  );
export type BackupProtectedItemsListInput =
  typeof BackupProtectedItemsListInput.Type;

// Output Schema
export const BackupProtectedItemsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupProtectedItemsListOutput =
  typeof BackupProtectedItemsListOutput.Type;

// The operation
/**
 * Provides a pageable list of all items that are backed up within a vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param $filter - OData filter options.
 * @param $skipToken - skipToken Filter.
 */
export const BackupProtectedItemsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupProtectedItemsListInput,
    outputSchema: BackupProtectedItemsListOutput,
  }),
);
// Input Schema
export const BackupProtectionContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupProtectionContainers",
    }),
  );
export type BackupProtectionContainersListInput =
  typeof BackupProtectionContainersListInput.Type;

// Output Schema
export const BackupProtectionContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupProtectionContainersListOutput =
  typeof BackupProtectionContainersListOutput.Type;

// The operation
/**
 * Lists the containers registered to Recovery Services Vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param $filter - OData filter options.
 */
export const BackupProtectionContainersList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupProtectionContainersListInput,
    outputSchema: BackupProtectionContainersListOutput,
  }));
// Input Schema
export const BackupProtectionIntentListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupProtectionIntents",
    }),
  );
export type BackupProtectionIntentListInput =
  typeof BackupProtectionIntentListInput.Type;

// Output Schema
export const BackupProtectionIntentListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupProtectionIntentListOutput =
  typeof BackupProtectionIntentListOutput.Type;

// The operation
/**
 * Provides a pageable list of all intents that are present within a vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param $filter - OData filter options.
 * @param $skipToken - skipToken Filter.
 */
export const BackupProtectionIntentList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupProtectionIntentListInput,
    outputSchema: BackupProtectionIntentListOutput,
  }),
);
// Input Schema
export const BackupResourceEncryptionConfigsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupEncryptionConfigs/backupResourceEncryptionConfig",
    }),
  );
export type BackupResourceEncryptionConfigsUpdateInput =
  typeof BackupResourceEncryptionConfigsUpdateInput.Type;

// Output Schema
export const BackupResourceEncryptionConfigsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupResourceEncryptionConfigsUpdateOutput =
  typeof BackupResourceEncryptionConfigsUpdateOutput.Type;

// The operation
/**
 * Updates Vault encryption config.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 */
export const BackupResourceEncryptionConfigsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupResourceEncryptionConfigsUpdateInput,
    outputSchema: BackupResourceEncryptionConfigsUpdateOutput,
  }));
// Input Schema
export const BackupResourceStorageConfigsNonCRRPatchInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupstorageconfig/vaultstorageconfig",
    }),
  );
export type BackupResourceStorageConfigsNonCRRPatchInput =
  typeof BackupResourceStorageConfigsNonCRRPatchInput.Type;

// Output Schema
export const BackupResourceStorageConfigsNonCRRPatchOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupResourceStorageConfigsNonCRRPatchOutput =
  typeof BackupResourceStorageConfigsNonCRRPatchOutput.Type;

// The operation
/**
 * Updates vault storage model type.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 */
export const BackupResourceStorageConfigsNonCRRPatch =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupResourceStorageConfigsNonCRRPatchInput,
    outputSchema: BackupResourceStorageConfigsNonCRRPatchOutput,
  }));
// Input Schema
export const BackupStatusGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  azureRegion: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{azureRegion}/backupStatus",
  }),
);
export type BackupStatusGetInput = typeof BackupStatusGetInput.Type;

// Output Schema
export const BackupStatusGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  protectionStatus: Schema.optional(
    Schema.Literals([
      "Invalid",
      "NotProtected",
      "Protecting",
      "Protected",
      "ProtectionFailed",
    ]),
  ),
  vaultId: Schema.optional(Schema.String),
  fabricName: Schema.optional(Schema.Literals(["Invalid", "Azure"])),
  containerName: Schema.optional(Schema.String),
  protectedItemName: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  policyName: Schema.optional(Schema.String),
  registrationStatus: Schema.optional(Schema.String),
  protectedItemsCount: Schema.optional(Schema.Number),
  acquireStorageAccountLock: Schema.optional(
    Schema.Literals(["Acquire", "NotAcquire"]),
  ),
});
export type BackupStatusGetOutput = typeof BackupStatusGetOutput.Type;

// The operation
/**
 * Get the container backup status
 *
 * @param api-version - The API version to use for this operation.
 * @param azureRegion - Azure region to hit Api
 * @param subscriptionId - The ID of the target subscription.
 */
export const BackupStatusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupStatusGetInput,
  outputSchema: BackupStatusGetOutput,
}));
// Input Schema
export const BackupsTriggerInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  fabricName: Schema.String.pipe(T.PathParam()),
  containerName: Schema.String.pipe(T.PathParam()),
  protectedItemName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/backup",
  }),
);
export type BackupsTriggerInput = typeof BackupsTriggerInput.Type;

// Output Schema
export const BackupsTriggerOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupsTriggerOutput = typeof BackupsTriggerOutput.Type;

// The operation
/**
 * Triggers backup for specified backed up item. This is an asynchronous operation. To know the status of the
 * operation, call GetProtectedItemOperationResult API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param protectedItemName - Backed up item name whose details are to be fetched.
 */
export const BackupsTrigger = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupsTriggerInput,
  outputSchema: BackupsTriggerOutput,
}));
// Input Schema
export const BackupUsageSummariesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupUsageSummaries",
    }),
  );
export type BackupUsageSummariesListInput =
  typeof BackupUsageSummariesListInput.Type;

// Output Schema
export const BackupUsageSummariesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupUsageSummariesListOutput =
  typeof BackupUsageSummariesListOutput.Type;

// The operation
/**
 * Fetches the backup management usage summaries of the vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param $filter - OData filter options.
 * @param $skipToken - skipToken Filter.
 */
export const BackupUsageSummariesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupUsageSummariesListInput,
    outputSchema: BackupUsageSummariesListOutput,
  }),
);
// Input Schema
export const BackupWorkloadItemsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/items",
    }),
  );
export type BackupWorkloadItemsListInput =
  typeof BackupWorkloadItemsListInput.Type;

// Output Schema
export const BackupWorkloadItemsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupWorkloadItemsListOutput =
  typeof BackupWorkloadItemsListOutput.Type;

// The operation
/**
 * Provides a pageable list of workload item of a specific container according to the query filter and the pagination
 * parameters.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param $filter - OData filter options.
 * @param $skipToken - skipToken Filter.
 */
export const BackupWorkloadItemsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupWorkloadItemsListInput,
    outputSchema: BackupWorkloadItemsListOutput,
  }),
);
// Input Schema
export const BMSPrepareDataMoveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupstorageconfig/vaultstorageconfig/prepareDataMove",
    }),
  );
export type BMSPrepareDataMoveInput = typeof BMSPrepareDataMoveInput.Type;

// Output Schema
export const BMSPrepareDataMoveOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BMSPrepareDataMoveOutput = typeof BMSPrepareDataMoveOutput.Type;

// The operation
/**
 * Prepares source vault for Data Move operation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 */
export const BMSPrepareDataMove = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BMSPrepareDataMoveInput,
  outputSchema: BMSPrepareDataMoveOutput,
}));
// Input Schema
export const BMSPrepareDataMoveOperationResultGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupstorageconfig/vaultstorageconfig/operationResults/{operationId}",
    }),
  );
export type BMSPrepareDataMoveOperationResultGetInput =
  typeof BMSPrepareDataMoveOperationResultGetInput.Type;

// Output Schema
export const BMSPrepareDataMoveOperationResultGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type BMSPrepareDataMoveOperationResultGetOutput =
  typeof BMSPrepareDataMoveOperationResultGetOutput.Type;

// The operation
/**
 * Fetches operation status for data move operation on vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - vaults
 * @param operationId - The name of the BackupResourceConfigResource
 */
export const BMSPrepareDataMoveOperationResultGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BMSPrepareDataMoveOperationResultGetInput,
    outputSchema: BMSPrepareDataMoveOperationResultGetOutput,
  }));
// Input Schema
export const BMSTriggerDataMoveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupstorageconfig/vaultstorageconfig/triggerDataMove",
    }),
  );
export type BMSTriggerDataMoveInput = typeof BMSTriggerDataMoveInput.Type;

// Output Schema
export const BMSTriggerDataMoveOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BMSTriggerDataMoveOutput = typeof BMSTriggerDataMoveOutput.Type;

// The operation
/**
 * Triggers Data Move Operation on target vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 */
export const BMSTriggerDataMove = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BMSTriggerDataMoveInput,
  outputSchema: BMSTriggerDataMoveOutput,
}));
// Input Schema
export const DeletedProtectionContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupDeletedProtectionContainers",
    }),
  );
export type DeletedProtectionContainersListInput =
  typeof DeletedProtectionContainersListInput.Type;

// Output Schema
export const DeletedProtectionContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type DeletedProtectionContainersListOutput =
  typeof DeletedProtectionContainersListOutput.Type;

// The operation
/**
 * Lists the soft deleted containers registered to Recovery Services Vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 * @param $filter - OData filter options.
 */
export const DeletedProtectionContainersList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletedProtectionContainersListInput,
    outputSchema: DeletedProtectionContainersListOutput,
  }));
// Input Schema
export const ExportJobsOperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupJobs/operationResults/{operationId}",
    }),
  );
export type ExportJobsOperationResultsGetInput =
  typeof ExportJobsOperationResultsGetInput.Type;

// Output Schema
export const ExportJobsOperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    statusCode: Schema.optional(
      Schema.Literals([
        "Continue",
        "SwitchingProtocols",
        "OK",
        "Created",
        "Accepted",
        "NonAuthoritativeInformation",
        "NoContent",
        "ResetContent",
        "PartialContent",
        "MultipleChoices",
        "Ambiguous",
        "MovedPermanently",
        "Moved",
        "Found",
        "Redirect",
        "SeeOther",
        "RedirectMethod",
        "NotModified",
        "UseProxy",
        "Unused",
        "TemporaryRedirect",
        "RedirectKeepVerb",
        "BadRequest",
        "Unauthorized",
        "PaymentRequired",
        "Forbidden",
        "NotFound",
        "MethodNotAllowed",
        "NotAcceptable",
        "ProxyAuthenticationRequired",
        "RequestTimeout",
        "Conflict",
        "Gone",
        "LengthRequired",
        "PreconditionFailed",
        "RequestEntityTooLarge",
        "RequestUriTooLong",
        "UnsupportedMediaType",
        "RequestedRangeNotSatisfiable",
        "ExpectationFailed",
        "UpgradeRequired",
        "InternalServerError",
        "NotImplemented",
        "BadGateway",
        "ServiceUnavailable",
        "GatewayTimeout",
        "HttpVersionNotSupported",
      ]),
    ),
    headers: Schema.optional(
      Schema.Record(Schema.String, Schema.Array(Schema.String)),
    ),
  });
export type ExportJobsOperationResultsGetOutput =
  typeof ExportJobsOperationResultsGetOutput.Type;

// The operation
/**
 * Gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also
 * contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - vaults
 * @param operationId - The name of the JobResource
 */
export const ExportJobsOperationResultsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExportJobsOperationResultsGetInput,
    outputSchema: ExportJobsOperationResultsGetOutput,
  }));
// Input Schema
export const FeatureSupportValidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    azureRegion: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{azureRegion}/backupValidateFeatures",
    }),
  );
export type FeatureSupportValidateInput =
  typeof FeatureSupportValidateInput.Type;

// Output Schema
export const FeatureSupportValidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportStatus: Schema.optional(
      Schema.Literals([
        "Invalid",
        "Supported",
        "DefaultOFF",
        "DefaultON",
        "NotSupported",
      ]),
    ),
  });
export type FeatureSupportValidateOutput =
  typeof FeatureSupportValidateOutput.Type;

// The operation
/**
 * It will validate if given feature with resource properties is supported in service
 *
 * @param api-version - The API version to use for this operation.
 * @param azureRegion - Azure region to hit Api
 * @param subscriptionId - The ID of the target subscription.
 */
export const FeatureSupportValidate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FeatureSupportValidateInput,
    outputSchema: FeatureSupportValidateOutput,
  }),
);
// Input Schema
export const FetchTieringCostPostInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupTieringCost/default/fetchTieringCost",
    }),
  );
export type FetchTieringCostPostInput = typeof FetchTieringCostPostInput.Type;

// Output Schema
export const FetchTieringCostPostOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type FetchTieringCostPostOutput = typeof FetchTieringCostPostOutput.Type;

// The operation
/**
 * Provides the details of the tiering related sizes and cost.
 * Status of the operation can be fetched using GetTieringCostOperationStatus API and result using GetTieringCostOperationResult API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 */
export const FetchTieringCostPost = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FetchTieringCostPostInput,
    outputSchema: FetchTieringCostPostOutput,
  }),
);
// Input Schema
export const GetOperationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupstorageconfig/vaultstorageconfig/operationStatus/{operationId}",
    }),
  );
export type GetOperationStatusInput = typeof GetOperationStatusInput.Type;

// Output Schema
export const GetOperationStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Invalid",
        "InProgress",
        "Succeeded",
        "Failed",
        "Canceled",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
  });
export type GetOperationStatusOutput = typeof GetOperationStatusOutput.Type;

// The operation
/**
 * Fetches Operation Result for Prepare Data Move
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - vaults
 * @param operationId - The name of the BackupResourceConfigResource
 */
export const GetOperationStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOperationStatusInput,
  outputSchema: GetOperationStatusOutput,
}));
// Input Schema
export const GetTieringCostOperationResultGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupTieringCost/default/operationResults/{operationId}",
    }),
  );
export type GetTieringCostOperationResultGetInput =
  typeof GetTieringCostOperationResultGetInput.Type;

// Output Schema
export const GetTieringCostOperationResultGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type GetTieringCostOperationResultGetOutput =
  typeof GetTieringCostOperationResultGetOutput.Type;

// The operation
/**
 * Gets the result of async operation for tiering cost
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 */
export const GetTieringCostOperationResultGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTieringCostOperationResultGetInput,
    outputSchema: GetTieringCostOperationResultGetOutput,
  }));
// Input Schema
export const ItemLevelRecoveryConnectionsProvisionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    recoveryPointId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointId}/provisionInstantItemRecovery",
    }),
  );
export type ItemLevelRecoveryConnectionsProvisionInput =
  typeof ItemLevelRecoveryConnectionsProvisionInput.Type;

// Output Schema
export const ItemLevelRecoveryConnectionsProvisionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ItemLevelRecoveryConnectionsProvisionOutput =
  typeof ItemLevelRecoveryConnectionsProvisionOutput.Type;

// The operation
/**
 * Provisions a script which invokes an iSCSI connection to the backup data. Executing this script opens a file
 * explorer displaying all the recoverable files and folders. This is an asynchronous operation. To know the status of
 * provisioning, call GetProtectedItemOperationResult API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param protectedItemName - Backed up item name whose details are to be fetched.
 * @param recoveryPointId - RecoveryPointID represents the backed up data to be fetched.
 */
export const ItemLevelRecoveryConnectionsProvision =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ItemLevelRecoveryConnectionsProvisionInput,
    outputSchema: ItemLevelRecoveryConnectionsProvisionOutput,
  }));
// Input Schema
export const ItemLevelRecoveryConnectionsRevokeInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    recoveryPointId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointId}/revokeInstantItemRecovery",
    }),
  );
export type ItemLevelRecoveryConnectionsRevokeInput =
  typeof ItemLevelRecoveryConnectionsRevokeInput.Type;

// Output Schema
export const ItemLevelRecoveryConnectionsRevokeOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ItemLevelRecoveryConnectionsRevokeOutput =
  typeof ItemLevelRecoveryConnectionsRevokeOutput.Type;

// The operation
/**
 * Revokes an iSCSI connection which can be used to download a script. Executing this script opens a file explorer
 * displaying all recoverable files and folders. This is an asynchronous operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param protectedItemName - Backed up item name whose details are to be fetched.
 * @param recoveryPointId - RecoveryPointID represents the backed up data to be fetched.
 */
export const ItemLevelRecoveryConnectionsRevoke =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ItemLevelRecoveryConnectionsRevokeInput,
    outputSchema: ItemLevelRecoveryConnectionsRevokeOutput,
  }));
// Input Schema
export const JobCancellationsTriggerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupJobs/{jobName}/cancel",
    }),
  );
export type JobCancellationsTriggerInput =
  typeof JobCancellationsTriggerInput.Type;

// Output Schema
export const JobCancellationsTriggerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobCancellationsTriggerOutput =
  typeof JobCancellationsTriggerOutput.Type;

// The operation
/**
 * Cancels a job. This is an asynchronous operation. To know the status of the cancellation, call
 * GetCancelOperationResult API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param jobName - Name of the job whose details are to be fetched.
 */
export const JobCancellationsTrigger = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobCancellationsTriggerInput,
    outputSchema: JobCancellationsTriggerOutput,
  }),
);
// Input Schema
export const JobOperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupJobs/{jobName}/operationResults/{operationId}",
    }),
  );
export type JobOperationResultsGetInput =
  typeof JobOperationResultsGetInput.Type;

// Output Schema
export const JobOperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobOperationResultsGetOutput =
  typeof JobOperationResultsGetOutput.Type;

// The operation
/**
 * Fetches the result of any operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - vaults
 * @param jobName - The name of the JobResource
 * @param operationId - The name of the JobResource
 */
export const JobOperationResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobOperationResultsGetInput,
    outputSchema: JobOperationResultsGetOutput,
  }),
);
// Input Schema
export const JobsExportInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  vaultName: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $filter: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupJobsExport",
  }),
);
export type JobsExportInput = typeof JobsExportInput.Type;

// Output Schema
export const JobsExportOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsExportOutput = typeof JobsExportOutput.Type;

// The operation
/**
 * Triggers export of jobs specified by filters and returns an OperationID to track.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param $filter - OData filter options.
 */
export const JobsExport = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsExportInput,
  outputSchema: JobsExportOutput,
}));
// Input Schema
export const MoveRecoveryPointInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    recoveryPointId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointId}/move",
  }),
);
export type MoveRecoveryPointInput = typeof MoveRecoveryPointInput.Type;

// Output Schema
export const MoveRecoveryPointOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MoveRecoveryPointOutput = typeof MoveRecoveryPointOutput.Type;

// The operation
/**
 * Move recovery point from one datastore to another store.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param protectedItemName - Backed up item name whose details are to be fetched.
 * @param recoveryPointId - RecoveryPointID represents the backed up data to be fetched.
 */
export const MoveRecoveryPoint = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MoveRecoveryPointInput,
  outputSchema: MoveRecoveryPointOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.RecoveryServices/operations",
  }),
);
export type OperationsListInput = typeof OperationsListInput.Type;

// Output Schema
export const OperationsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
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
                logSpecifications: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      displayName: Schema.optional(Schema.String),
                      blobDuration: Schema.optional(Schema.String),
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
export const OperationValidateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupValidateOperation",
  }),
);
export type OperationValidateInput = typeof OperationValidateInput.Type;

// Output Schema
export const OperationValidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    validateOperationResponse: Schema.optional(
      Schema.Struct({
        validationResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              recommendations: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
  });
export type OperationValidateOutput = typeof OperationValidateOutput.Type;

// The operation
/**
 * Validate operation for specified backed up item. This is a synchronous operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 */
export const OperationValidate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationValidateInput,
  outputSchema: OperationValidateOutput,
}));
// Input Schema
export const PrivateEndpointConnectionDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type PrivateEndpointConnectionDeleteInput =
  typeof PrivateEndpointConnectionDeleteInput.Type;

// Output Schema
export const PrivateEndpointConnectionDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PrivateEndpointConnectionDeleteOutput =
  typeof PrivateEndpointConnectionDeleteOutput.Type;

// The operation
/**
 * Delete Private Endpoint requests. This call is made by Backup Admin.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
 */
export const PrivateEndpointConnectionDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionDeleteInput,
    outputSchema: PrivateEndpointConnectionDeleteOutput,
  }));
// Input Schema
export const PrivateEndpointGetOperationStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/privateEndpointConnections/{privateEndpointConnectionName}/operationsStatus/{operationId}",
    }),
  );
export type PrivateEndpointGetOperationStatusInput =
  typeof PrivateEndpointGetOperationStatusInput.Type;

// Output Schema
export const PrivateEndpointGetOperationStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Invalid",
        "InProgress",
        "Succeeded",
        "Failed",
        "Canceled",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
  });
export type PrivateEndpointGetOperationStatusOutput =
  typeof PrivateEndpointGetOperationStatusOutput.Type;

// The operation
/**
 * Gets the operation status for a private endpoint connection.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - vaults
 * @param privateEndpointConnectionName - The name of the PrivateEndpointConnectionResource
 * @param operationId - The name of the PrivateEndpointConnectionResource
 */
export const PrivateEndpointGetOperationStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointGetOperationStatusInput,
    outputSchema: PrivateEndpointGetOperationStatusOutput,
  }));
// Input Schema
export const ProtectableContainersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectableContainers",
    }),
  );
export type ProtectableContainersListInput =
  typeof ProtectableContainersListInput.Type;

// Output Schema
export const ProtectableContainersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type ProtectableContainersListOutput =
  typeof ProtectableContainersListOutput.Type;

// The operation
/**
 * Lists the containers that can be registered to Recovery Services Vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param $filter - OData filter options.
 */
export const ProtectableContainersList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProtectableContainersListInput,
    outputSchema: ProtectableContainersListOutput,
  }),
);
// Input Schema
export const ProtectedItemOperationStatusesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/operationsStatus/{operationId}",
    }),
  );
export type ProtectedItemOperationStatusesGetInput =
  typeof ProtectedItemOperationStatusesGetInput.Type;

// Output Schema
export const ProtectedItemOperationStatusesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Invalid",
        "InProgress",
        "Succeeded",
        "Failed",
        "Canceled",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
  });
export type ProtectedItemOperationStatusesGetOutput =
  typeof ProtectedItemOperationStatusesGetOutput.Type;

// The operation
/**
 * Fetches the status of an operation such as triggering a backup, restore. The status can be in progress, completed
 * or failed. You can refer to the OperationStatus enum for all the possible states of the operation. Some operations
 * create jobs. This method returns the list of jobs associated with the operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - vaults
 * @param fabricName - backupFabrics
 * @param containerName - The name of the ProtectionContainerResource
 * @param protectedItemName - The name of the ProtectedItemResource
 * @param operationId - The name of the ProtectedItemResource
 */
export const ProtectedItemOperationStatusesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProtectedItemOperationStatusesGetInput,
    outputSchema: ProtectedItemOperationStatusesGetOutput,
  }));
// Input Schema
export const ProtectedItemsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}",
    }),
  );
export type ProtectedItemsDeleteInput = typeof ProtectedItemsDeleteInput.Type;

// Output Schema
export const ProtectedItemsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProtectedItemsDeleteOutput = typeof ProtectedItemsDeleteOutput.Type;

// The operation
/**
 * Used to disable backup of an item within a container. This is an asynchronous operation. To know the status of the
 * request, call the GetItemOperationResult API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param protectedItemName - Backed up item name whose details are to be fetched.
 */
export const ProtectedItemsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProtectedItemsDeleteInput,
    outputSchema: ProtectedItemsDeleteOutput,
  }),
);
// Input Schema
export const ProtectionContainerRefreshOperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/operationResults/{operationId}",
    }),
  );
export type ProtectionContainerRefreshOperationResultsGetInput =
  typeof ProtectionContainerRefreshOperationResultsGetInput.Type;

// Output Schema
export const ProtectionContainerRefreshOperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProtectionContainerRefreshOperationResultsGetOutput =
  typeof ProtectionContainerRefreshOperationResultsGetOutput.Type;

// The operation
/**
 * Provides the result of the refresh operation triggered by the BeginRefresh operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param fabricName - Fabric name associated with the container.
 * @param operationId - Operation ID associated with the operation whose result needs to be fetched.
 */
export const ProtectionContainerRefreshOperationResultsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProtectionContainerRefreshOperationResultsGetInput,
    outputSchema: ProtectionContainerRefreshOperationResultsGetOutput,
  }));
// Input Schema
export const ProtectionContainersInquireInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/inquire",
    }),
  );
export type ProtectionContainersInquireInput =
  typeof ProtectionContainersInquireInput.Type;

// Output Schema
export const ProtectionContainersInquireOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProtectionContainersInquireOutput =
  typeof ProtectionContainersInquireOutput.Type;

// The operation
/**
 * This is an async operation and the results should be tracked using location header or Azure-async-url.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param $filter - OData filter options.
 */
export const ProtectionContainersInquire = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProtectionContainersInquireInput,
    outputSchema: ProtectionContainersInquireOutput,
  }),
);
// Input Schema
export const ProtectionContainersRefreshInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/refreshContainers",
    }),
  );
export type ProtectionContainersRefreshInput =
  typeof ProtectionContainersRefreshInput.Type;

// Output Schema
export const ProtectionContainersRefreshOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProtectionContainersRefreshOutput =
  typeof ProtectionContainersRefreshOutput.Type;

// The operation
/**
 * Discovers all the containers in the subscription that can be backed up to Recovery Services Vault. This is an
 * asynchronous operation. To know the status of the operation, call GetRefreshOperationResult API.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param fabricName - Fabric name associated the container.
 * @param $filter - OData filter options.
 */
export const ProtectionContainersRefresh = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProtectionContainersRefreshInput,
    outputSchema: ProtectionContainersRefreshOutput,
  }),
);
// Input Schema
export const ProtectionContainersUnregisterInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}",
    }),
  );
export type ProtectionContainersUnregisterInput =
  typeof ProtectionContainersUnregisterInput.Type;

// Output Schema
export const ProtectionContainersUnregisterOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProtectionContainersUnregisterOutput =
  typeof ProtectionContainersUnregisterOutput.Type;

// The operation
/**
 * Unregisters the given container from your Recovery Services Vault. This is an asynchronous operation. To determine
 * whether the backend service has finished processing the request, call Get Container Operation Result API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 */
export const ProtectionContainersUnregister =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProtectionContainersUnregisterInput,
    outputSchema: ProtectionContainersUnregisterOutput,
  }));
// Input Schema
export const ProtectionIntentDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    intentObjectName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/backupProtectionIntent/{intentObjectName}",
    }),
  );
export type ProtectionIntentDeleteInput =
  typeof ProtectionIntentDeleteInput.Type;

// Output Schema
export const ProtectionIntentDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProtectionIntentDeleteOutput =
  typeof ProtectionIntentDeleteOutput.Type;

// The operation
/**
 * Used to remove intent from an item
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param intentObjectName - Backed up item name whose details are to be fetched.
 */
export const ProtectionIntentDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProtectionIntentDeleteInput,
    outputSchema: ProtectionIntentDeleteOutput,
  }),
);
// Input Schema
export const ProtectionIntentValidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    azureRegion: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{azureRegion}/backupPreValidateProtection",
    }),
  );
export type ProtectionIntentValidateInput =
  typeof ProtectionIntentValidateInput.Type;

// Output Schema
export const ProtectionIntentValidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    status: Schema.optional(
      Schema.Literals(["Invalid", "Succeeded", "Failed"]),
    ),
    errorCode: Schema.optional(Schema.String),
    errorMessage: Schema.optional(Schema.String),
    recommendation: Schema.optional(Schema.String),
    containerName: Schema.optional(Schema.String),
    protectedItemName: Schema.optional(Schema.String),
  });
export type ProtectionIntentValidateOutput =
  typeof ProtectionIntentValidateOutput.Type;

// The operation
/**
 * It will validate followings
1. Vault capacity
2. VM is already protected
3. Any VM related configuration passed in properties.
 *
 * It will validate followings
 * 1. Vault capacity
 * 2. VM is already protected
 * 3. Any VM related configuration passed in properties.
 *
 * @param api-version - The API version to use for this operation.
 * @param azureRegion - Azure region to hit Api
 * @param subscriptionId - The ID of the target subscription.
 */
export const ProtectionIntentValidate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProtectionIntentValidateInput,
    outputSchema: ProtectionIntentValidateOutput,
  }),
);
// Input Schema
export const ProtectionPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupPolicies/{policyName}",
    }),
  );
export type ProtectionPoliciesDeleteInput =
  typeof ProtectionPoliciesDeleteInput.Type;

// Output Schema
export const ProtectionPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ProtectionPoliciesDeleteOutput =
  typeof ProtectionPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes specified backup policy from your Recovery Services Vault. This is an asynchronous operation. Status of the
 * operation can be fetched using GetProtectionPolicyOperationResult API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param policyName - Backup policy information to be fetched.
 */
export const ProtectionPoliciesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProtectionPoliciesDeleteInput,
    outputSchema: ProtectionPoliciesDeleteOutput,
  }),
);
// Input Schema
export const ProtectionPolicyOperationStatusesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupPolicies/{policyName}/operations/{operationId}",
    }),
  );
export type ProtectionPolicyOperationStatusesGetInput =
  typeof ProtectionPolicyOperationStatusesGetInput.Type;

// Output Schema
export const ProtectionPolicyOperationStatusesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Invalid",
        "InProgress",
        "Succeeded",
        "Failed",
        "Canceled",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
  });
export type ProtectionPolicyOperationStatusesGetOutput =
  typeof ProtectionPolicyOperationStatusesGetOutput.Type;

// The operation
/**
 * Provides the status of the asynchronous operations like backup, restore. The status can be in progress, completed
 * or failed. You can refer to the Operation Status enum for all the possible states of an operation. Some operations
 * create jobs. This method returns the list of jobs associated with operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - vaults
 * @param policyName - The name of the ProtectionPolicyResource
 * @param operationId - The name of the ProtectionPolicyResource
 */
export const ProtectionPolicyOperationStatusesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProtectionPolicyOperationStatusesGetInput,
    outputSchema: ProtectionPolicyOperationStatusesGetOutput,
  }));
// Input Schema
export const RecoveryPointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints",
    }),
  );
export type RecoveryPointsListInput = typeof RecoveryPointsListInput.Type;

// Output Schema
export const RecoveryPointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type RecoveryPointsListOutput = typeof RecoveryPointsListOutput.Type;

// The operation
/**
 * Lists the backup copies for the backed up item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param protectedItemName - Backed up item name whose details are to be fetched.
 * @param $filter - OData filter options.
 */
export const RecoveryPointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecoveryPointsListInput,
  outputSchema: RecoveryPointsListOutput,
}));
// Input Schema
export const RecoveryPointsRecommendedForMoveListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    fabricName: Schema.String.pipe(T.PathParam()),
    containerName: Schema.String.pipe(T.PathParam()),
    protectedItemName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPointsRecommendedForMove",
    }),
  );
export type RecoveryPointsRecommendedForMoveListInput =
  typeof RecoveryPointsRecommendedForMoveListInput.Type;

// Output Schema
export const RecoveryPointsRecommendedForMoveListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type RecoveryPointsRecommendedForMoveListOutput =
  typeof RecoveryPointsRecommendedForMoveListOutput.Type;

// The operation
/**
 * Lists the recovery points recommended for move to another tier
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param protectedItemName - Backed up item name whose details are to be fetched.
 */
export const RecoveryPointsRecommendedForMoveList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RecoveryPointsRecommendedForMoveListInput,
    outputSchema: RecoveryPointsRecommendedForMoveListOutput,
  }));
// Input Schema
export const ResourceGuardProxiesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupResourceGuardProxies",
    }),
  );
export type ResourceGuardProxiesGetInput =
  typeof ResourceGuardProxiesGetInput.Type;

// Output Schema
export const ResourceGuardProxiesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGuardProxiesGetOutput =
  typeof ResourceGuardProxiesGetOutput.Type;

// The operation
/**
 * List the ResourceGuardProxies under vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 */
export const ResourceGuardProxiesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourceGuardProxiesGetInput,
    outputSchema: ResourceGuardProxiesGetOutput,
  }),
);
// Input Schema
export const ResourceGuardProxyDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGuardProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}",
    }),
  );
export type ResourceGuardProxyDeleteInput =
  typeof ResourceGuardProxyDeleteInput.Type;

// Output Schema
export const ResourceGuardProxyDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ResourceGuardProxyDeleteOutput =
  typeof ResourceGuardProxyDeleteOutput.Type;

// The operation
/**
 * Delete ResourceGuardProxy under vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 */
export const ResourceGuardProxyDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourceGuardProxyDeleteInput,
    outputSchema: ResourceGuardProxyDeleteOutput,
  }),
);
// Input Schema
export const ResourceGuardProxyUnlockDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGuardProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}/unlockDelete",
    }),
  );
export type ResourceGuardProxyUnlockDeleteInput =
  typeof ResourceGuardProxyUnlockDeleteInput.Type;

// Output Schema
export const ResourceGuardProxyUnlockDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    unlockDeleteExpiryTime: Schema.optional(Schema.String),
  });
export type ResourceGuardProxyUnlockDeleteOutput =
  typeof ResourceGuardProxyUnlockDeleteOutput.Type;

// The operation
/**
 * Secures delete ResourceGuardProxy operations.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 */
export const ResourceGuardProxyUnlockDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardProxyUnlockDeleteInput,
    outputSchema: ResourceGuardProxyUnlockDeleteOutput,
  }));
// Input Schema
export const RestoresTriggerInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  fabricName: Schema.String.pipe(T.PathParam()),
  containerName: Schema.String.pipe(T.PathParam()),
  protectedItemName: Schema.String.pipe(T.PathParam()),
  recoveryPointId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupFabrics/{fabricName}/protectionContainers/{containerName}/protectedItems/{protectedItemName}/recoveryPoints/{recoveryPointId}/restore",
  }),
);
export type RestoresTriggerInput = typeof RestoresTriggerInput.Type;

// Output Schema
export const RestoresTriggerOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RestoresTriggerOutput = typeof RestoresTriggerOutput.Type;

// The operation
/**
 * Restores the specified backed up data. This is an asynchronous operation. To know the status of this API call, use
 * GetProtectedItemOperationResult API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the VaultResource
 * @param fabricName - The name of the BackupFabricResource
 * @param containerName - Name of the container whose details need to be fetched.
 * @param protectedItemName - Backed up item name whose details are to be fetched.
 * @param recoveryPointId - RecoveryPointID represents the backed up data to be fetched.
 */
export const RestoresTrigger = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RestoresTriggerInput,
  outputSchema: RestoresTriggerOutput,
}));
// Input Schema
export const SecurityPINsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  vaultName: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupSecurityPIN",
  }),
);
export type SecurityPINsGetInput = typeof SecurityPINsGetInput.Type;

// Output Schema
export const SecurityPINsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  token: Schema.optional(Schema.String),
  expiryTimeInUtcTicks: Schema.optional(Schema.Number),
  securityPIN: Schema.optional(Schema.String),
});
export type SecurityPINsGetOutput = typeof SecurityPINsGetOutput.Type;

// The operation
/**
 * Get the security PIN.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 */
export const SecurityPINsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecurityPINsGetInput,
  outputSchema: SecurityPINsGetOutput,
}));
// Input Schema
export const TieringCostOperationStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupTieringCost/default/operationsStatus/{operationId}",
    }),
  );
export type TieringCostOperationStatusGetInput =
  typeof TieringCostOperationStatusGetInput.Type;

// Output Schema
export const TieringCostOperationStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Invalid",
        "InProgress",
        "Succeeded",
        "Failed",
        "Canceled",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
  });
export type TieringCostOperationStatusGetOutput =
  typeof TieringCostOperationStatusGetOutput.Type;

// The operation
/**
 * Gets the status of async operations of tiering cost
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the recovery services vault.
 */
export const TieringCostOperationStatusGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TieringCostOperationStatusGetInput,
    outputSchema: TieringCostOperationStatusGetOutput,
  }));
// Input Schema
export const ValidateOperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupValidateOperationResults/{operationId}",
    }),
  );
export type ValidateOperationResultsGetInput =
  typeof ValidateOperationResultsGetInput.Type;

// Output Schema
export const ValidateOperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    validateOperationResponse: Schema.optional(
      Schema.Struct({
        validationResults: Schema.optional(
          Schema.Array(
            Schema.Struct({
              code: Schema.optional(Schema.String),
              message: Schema.optional(Schema.String),
              recommendations: Schema.optional(Schema.Array(Schema.String)),
            }),
          ),
        ),
      }),
    ),
  });
export type ValidateOperationResultsGetOutput =
  typeof ValidateOperationResultsGetOutput.Type;

// The operation
/**
 * Fetches the result of a triggered validate operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param operationId - OperationID which represents the operation whose result needs to be fetched.
 */
export const ValidateOperationResultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ValidateOperationResultsGetInput,
    outputSchema: ValidateOperationResultsGetOutput,
  }),
);
// Input Schema
export const ValidateOperationStatusesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupValidateOperationsStatuses/{operationId}",
    }),
  );
export type ValidateOperationStatusesGetInput =
  typeof ValidateOperationStatusesGetInput.Type;

// Output Schema
export const ValidateOperationStatusesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    status: Schema.optional(
      Schema.Literals([
        "Invalid",
        "InProgress",
        "Succeeded",
        "Failed",
        "Canceled",
      ]),
    ),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        code: Schema.optional(Schema.String),
        message: Schema.optional(Schema.String),
      }),
    ),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
  });
export type ValidateOperationStatusesGetOutput =
  typeof ValidateOperationStatusesGetOutput.Type;

// The operation
/**
 * Fetches the status of a triggered validate operation. The status can be in progress, completed
 * or failed. You can refer to the OperationStatus enum for all the possible states of the operation.
 * If operation has completed, this method returns the list of errors obtained while validating the operation.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 * @param operationId - OperationID represents the operation whose status needs to be fetched.
 */
export const ValidateOperationStatusesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ValidateOperationStatusesGetInput,
    outputSchema: ValidateOperationStatusesGetOutput,
  }));
// Input Schema
export const ValidateOperationTriggerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupTriggerValidateOperation",
    }),
  );
export type ValidateOperationTriggerInput =
  typeof ValidateOperationTriggerInput.Type;

// Output Schema
export const ValidateOperationTriggerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ValidateOperationTriggerOutput =
  typeof ValidateOperationTriggerOutput.Type;

// The operation
/**
 * Validate operation for specified backed up item in the form of an asynchronous operation. Returns tracking headers which can be tracked using GetValidateOperationResult API.
 *
 * @param api-version - The API version to use for this operation.
 * @param vaultName - The name of the recovery services vault.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ValidateOperationTrigger = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ValidateOperationTriggerInput,
    outputSchema: ValidateOperationTriggerOutput,
  }),
);
