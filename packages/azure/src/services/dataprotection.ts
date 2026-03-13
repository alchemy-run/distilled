/**
 * Azure Dataprotection API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BackupInstancesAdhocBackupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/backup",
    }),
  );
export type BackupInstancesAdhocBackupInput =
  typeof BackupInstancesAdhocBackupInput.Type;

// Output Schema
export const BackupInstancesAdhocBackupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type BackupInstancesAdhocBackupOutput =
  typeof BackupInstancesAdhocBackupOutput.Type;

// The operation
/**
 * Trigger adhoc backup
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesAdhocBackup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupInstancesAdhocBackupInput,
    outputSchema: BackupInstancesAdhocBackupOutput,
  }),
);
// Input Schema
export const BackupInstancesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}",
    }),
  );
export type BackupInstancesCreateOrUpdateInput =
  typeof BackupInstancesCreateOrUpdateInput.Type;

// Output Schema
export const BackupInstancesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupInstancesCreateOrUpdateOutput =
  typeof BackupInstancesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a backup instance in a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesCreateOrUpdateInput,
    outputSchema: BackupInstancesCreateOrUpdateOutput,
  }));
// Input Schema
export const BackupInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}",
    }),
  );
export type BackupInstancesDeleteInput = typeof BackupInstancesDeleteInput.Type;

// Output Schema
export const BackupInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupInstancesDeleteOutput =
  typeof BackupInstancesDeleteOutput.Type;

// The operation
/**
 * Delete a backup instance in a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupInstancesDeleteInput,
    outputSchema: BackupInstancesDeleteOutput,
  }),
);
// Input Schema
export const BackupInstancesExtensionRoutingListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/{resourceId}/providers/Microsoft.DataProtection/backupInstances",
    }),
  );
export type BackupInstancesExtensionRoutingListInput =
  typeof BackupInstancesExtensionRoutingListInput.Type;

// Output Schema
export const BackupInstancesExtensionRoutingListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupInstancesExtensionRoutingListOutput =
  typeof BackupInstancesExtensionRoutingListOutput.Type;

// The operation
/**
 * Gets a list of backup instances associated with a tracked resource
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceId - ARM path of the resource to be protected using Microsoft.DataProtection
 */
export const BackupInstancesExtensionRoutingList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesExtensionRoutingListInput,
    outputSchema: BackupInstancesExtensionRoutingListOutput,
  }));
// Input Schema
export const BackupInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}",
    }),
  );
export type BackupInstancesGetInput = typeof BackupInstancesGetInput.Type;

// Output Schema
export const BackupInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupInstancesGetOutput = typeof BackupInstancesGetOutput.Type;

// The operation
/**
 * Gets a backup instance with name in a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupInstancesGetInput,
  outputSchema: BackupInstancesGetOutput,
}));
// Input Schema
export const BackupInstancesGetBackupInstanceOperationResultInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/operationResults/{operationId}",
    }),
  );
export type BackupInstancesGetBackupInstanceOperationResultInput =
  typeof BackupInstancesGetBackupInstanceOperationResultInput.Type;

// Output Schema
export const BackupInstancesGetBackupInstanceOperationResultOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupInstancesGetBackupInstanceOperationResultOutput =
  typeof BackupInstancesGetBackupInstanceOperationResultOutput.Type;

// The operation
/**
 * Get result of backup instance creation operation
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 * @param backupInstanceName - The name of the BackupInstanceResource
 * @param operationId - The name of the BackupInstanceResource
 */
export const BackupInstancesGetBackupInstanceOperationResult =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesGetBackupInstanceOperationResultInput,
    outputSchema: BackupInstancesGetBackupInstanceOperationResultOutput,
  }));
// Input Schema
export const BackupInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances",
    }),
  );
export type BackupInstancesListInput = typeof BackupInstancesListInput.Type;

// Output Schema
export const BackupInstancesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupInstancesListOutput = typeof BackupInstancesListOutput.Type;

// The operation
/**
 * Gets a backup instances belonging to a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 */
export const BackupInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupInstancesListInput,
  outputSchema: BackupInstancesListOutput,
}));
// Input Schema
export const BackupInstancesResumeBackupsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/resumeBackups",
    }),
  );
export type BackupInstancesResumeBackupsInput =
  typeof BackupInstancesResumeBackupsInput.Type;

// Output Schema
export const BackupInstancesResumeBackupsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupInstancesResumeBackupsOutput =
  typeof BackupInstancesResumeBackupsOutput.Type;

// The operation
/**
 * This operation will resume backups for backup instance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesResumeBackups =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesResumeBackupsInput,
    outputSchema: BackupInstancesResumeBackupsOutput,
  }));
// Input Schema
export const BackupInstancesResumeProtectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/resumeProtection",
    }),
  );
export type BackupInstancesResumeProtectionInput =
  typeof BackupInstancesResumeProtectionInput.Type;

// Output Schema
export const BackupInstancesResumeProtectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupInstancesResumeProtectionOutput =
  typeof BackupInstancesResumeProtectionOutput.Type;

// The operation
/**
 * This operation will resume protection for a stopped backup instance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesResumeProtection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesResumeProtectionInput,
    outputSchema: BackupInstancesResumeProtectionOutput,
  }));
// Input Schema
export const BackupInstancesStopProtectionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/stopProtection",
    }),
  );
export type BackupInstancesStopProtectionInput =
  typeof BackupInstancesStopProtectionInput.Type;

// Output Schema
export const BackupInstancesStopProtectionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupInstancesStopProtectionOutput =
  typeof BackupInstancesStopProtectionOutput.Type;

// The operation
/**
 * This operation will stop protection of a backup instance and data will be held forever
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesStopProtection =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesStopProtectionInput,
    outputSchema: BackupInstancesStopProtectionOutput,
  }));
// Input Schema
export const BackupInstancesSuspendBackupsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/suspendBackups",
    }),
  );
export type BackupInstancesSuspendBackupsInput =
  typeof BackupInstancesSuspendBackupsInput.Type;

// Output Schema
export const BackupInstancesSuspendBackupsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupInstancesSuspendBackupsOutput =
  typeof BackupInstancesSuspendBackupsOutput.Type;

// The operation
/**
 * This operation will stop backup for a backup instance and retains the backup data as per the policy (except latest Recovery point, which will be retained forever)
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesSuspendBackups =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesSuspendBackupsInput,
    outputSchema: BackupInstancesSuspendBackupsOutput,
  }));
// Input Schema
export const BackupInstancesSyncBackupInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/sync",
    }),
  );
export type BackupInstancesSyncBackupInstanceInput =
  typeof BackupInstancesSyncBackupInstanceInput.Type;

// Output Schema
export const BackupInstancesSyncBackupInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupInstancesSyncBackupInstanceOutput =
  typeof BackupInstancesSyncBackupInstanceOutput.Type;

// The operation
/**
 * Sync backup instance again in case of failure
 * This action will retry last failed operation and will bring backup instance to valid state
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesSyncBackupInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesSyncBackupInstanceInput,
    outputSchema: BackupInstancesSyncBackupInstanceOutput,
  }));
// Input Schema
export const BackupInstancesTriggerCrossRegionRestoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/crossRegionRestore",
    }),
  );
export type BackupInstancesTriggerCrossRegionRestoreInput =
  typeof BackupInstancesTriggerCrossRegionRestoreInput.Type;

// Output Schema
export const BackupInstancesTriggerCrossRegionRestoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type BackupInstancesTriggerCrossRegionRestoreOutput =
  typeof BackupInstancesTriggerCrossRegionRestoreOutput.Type;

// The operation
/**
 * Triggers Cross Region Restore for BackupInstance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of the Azure region.
 */
export const BackupInstancesTriggerCrossRegionRestore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesTriggerCrossRegionRestoreInput,
    outputSchema: BackupInstancesTriggerCrossRegionRestoreOutput,
  }));
// Input Schema
export const BackupInstancesTriggerRehydrateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/rehydrate",
    }),
  );
export type BackupInstancesTriggerRehydrateInput =
  typeof BackupInstancesTriggerRehydrateInput.Type;

// Output Schema
export const BackupInstancesTriggerRehydrateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupInstancesTriggerRehydrateOutput =
  typeof BackupInstancesTriggerRehydrateOutput.Type;

// The operation
/**
 * rehydrate recovery point for restore for a BackupInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesTriggerRehydrate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesTriggerRehydrateInput,
    outputSchema: BackupInstancesTriggerRehydrateOutput,
  }));
// Input Schema
export const BackupInstancesTriggerRestoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/restore",
    }),
  );
export type BackupInstancesTriggerRestoreInput =
  typeof BackupInstancesTriggerRestoreInput.Type;

// Output Schema
export const BackupInstancesTriggerRestoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type BackupInstancesTriggerRestoreOutput =
  typeof BackupInstancesTriggerRestoreOutput.Type;

// The operation
/**
 * Triggers restore for a BackupInstance
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesTriggerRestore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesTriggerRestoreInput,
    outputSchema: BackupInstancesTriggerRestoreOutput,
  }));
// Input Schema
export const BackupInstancesValidateCrossRegionRestoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/validateCrossRegionRestore",
    }),
  );
export type BackupInstancesValidateCrossRegionRestoreInput =
  typeof BackupInstancesValidateCrossRegionRestoreInput.Type;

// Output Schema
export const BackupInstancesValidateCrossRegionRestoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type BackupInstancesValidateCrossRegionRestoreOutput =
  typeof BackupInstancesValidateCrossRegionRestoreOutput.Type;

// The operation
/**
 * Validates whether Cross Region Restore can be triggered for DataSource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of the Azure region.
 */
export const BackupInstancesValidateCrossRegionRestore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesValidateCrossRegionRestoreInput,
    outputSchema: BackupInstancesValidateCrossRegionRestoreOutput,
  }));
// Input Schema
export const BackupInstancesValidateForBackupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/validateForBackup",
    }),
  );
export type BackupInstancesValidateForBackupInput =
  typeof BackupInstancesValidateForBackupInput.Type;

// Output Schema
export const BackupInstancesValidateForBackupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type BackupInstancesValidateForBackupOutput =
  typeof BackupInstancesValidateForBackupOutput.Type;

// The operation
/**
 * Validate whether adhoc backup will be successful or not
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 */
export const BackupInstancesValidateForBackup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesValidateForBackupInput,
    outputSchema: BackupInstancesValidateForBackupOutput,
  }));
// Input Schema
export const BackupInstancesValidateForModifyBackupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/validateForModifyBackup",
    }),
  );
export type BackupInstancesValidateForModifyBackupInput =
  typeof BackupInstancesValidateForModifyBackupInput.Type;

// Output Schema
export const BackupInstancesValidateForModifyBackupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupInstancesValidateForModifyBackupOutput =
  typeof BackupInstancesValidateForModifyBackupOutput.Type;

// The operation
/**
 * Validate whether update for backup instance will be successful or not
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesValidateForModifyBackup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesValidateForModifyBackupInput,
    outputSchema: BackupInstancesValidateForModifyBackupOutput,
  }));
// Input Schema
export const BackupInstancesValidateForRestoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/validateRestore",
    }),
  );
export type BackupInstancesValidateForRestoreInput =
  typeof BackupInstancesValidateForRestoreInput.Type;

// Output Schema
export const BackupInstancesValidateForRestoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type BackupInstancesValidateForRestoreOutput =
  typeof BackupInstancesValidateForRestoreOutput.Type;

// The operation
/**
 * Validates if Restore can be triggered for a DataSource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const BackupInstancesValidateForRestore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupInstancesValidateForRestoreInput,
    outputSchema: BackupInstancesValidateForRestoreOutput,
  }));
// Input Schema
export const BackupPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupPolicies/{backupPolicyName}",
    }),
  );
export type BackupPoliciesCreateOrUpdateInput =
  typeof BackupPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const BackupPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupPoliciesCreateOrUpdateOutput =
  typeof BackupPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or Updates a backup policy belonging to a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 */
export const BackupPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupPoliciesCreateOrUpdateInput,
    outputSchema: BackupPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const BackupPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupPolicies/{backupPolicyName}",
    }),
  );
export type BackupPoliciesDeleteInput = typeof BackupPoliciesDeleteInput.Type;

// Output Schema
export const BackupPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupPoliciesDeleteOutput = typeof BackupPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes a backup policy belonging to a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
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
    vaultName: Schema.String.pipe(T.PathParam()),
    backupPolicyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupPolicies/{backupPolicyName}",
  }),
);
export type BackupPoliciesGetInput = typeof BackupPoliciesGetInput.Type;

// Output Schema
export const BackupPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupPoliciesGetOutput = typeof BackupPoliciesGetOutput.Type;

// The operation
/**
 * Gets a backup policy belonging to a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
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
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupPolicies",
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
 * Returns list of backup policies belonging to a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 */
export const BackupPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupPoliciesListInput,
  outputSchema: BackupPoliciesListOutput,
}));
// Input Schema
export const BackupVaultOperationResultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/operationResults/{operationId}",
    }),
  );
export type BackupVaultOperationResultsGetInput =
  typeof BackupVaultOperationResultsGetInput.Type;

// Output Schema
export const BackupVaultOperationResultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type BackupVaultOperationResultsGetOutput =
  typeof BackupVaultOperationResultsGetOutput.Type;

// The operation
/**
 * Get a BackupVaultResource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 * @param operationId - The name of the BackupVaultResource
 */
export const BackupVaultOperationResultsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupVaultOperationResultsGetInput,
    outputSchema: BackupVaultOperationResultsGetOutput,
  }));
// Input Schema
export const BackupVaultsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/checkNameAvailability",
    }),
  );
export type BackupVaultsCheckNameAvailabilityInput =
  typeof BackupVaultsCheckNameAvailabilityInput.Type;

// Output Schema
export const BackupVaultsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
  });
export type BackupVaultsCheckNameAvailabilityOutput =
  typeof BackupVaultsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * API to check for resource name availability
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const BackupVaultsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupVaultsCheckNameAvailabilityInput,
    outputSchema: BackupVaultsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const BackupVaultsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}",
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
 * Creates or updates a BackupVault resource belonging to a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 * @param x-ms-deleted-vault-id - The ID of the deleted backup vault to restore from during undelete flow.
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
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}",
    }),
  );
export type BackupVaultsDeleteInput = typeof BackupVaultsDeleteInput.Type;

// Output Schema
export const BackupVaultsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupVaultsDeleteOutput = typeof BackupVaultsDeleteOutput.Type;

// The operation
/**
 * Deletes a BackupVault resource from the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 */
export const BackupVaultsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupVaultsDeleteInput,
  outputSchema: BackupVaultsDeleteOutput,
}));
// Input Schema
export const BackupVaultsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}",
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
 * Returns a resource belonging to a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 */
export const BackupVaultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupVaultsGetInput,
  outputSchema: BackupVaultsGetOutput,
}));
// Input Schema
export const BackupVaultsGetInResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults",
    }),
  );
export type BackupVaultsGetInResourceGroupInput =
  typeof BackupVaultsGetInResourceGroupInput.Type;

// Output Schema
export const BackupVaultsGetInResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupVaultsGetInResourceGroupOutput =
  typeof BackupVaultsGetInResourceGroupOutput.Type;

// The operation
/**
 * Returns resource collection belonging to a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const BackupVaultsGetInResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupVaultsGetInResourceGroupInput,
    outputSchema: BackupVaultsGetInResourceGroupOutput,
  }));
// Input Schema
export const BackupVaultsGetInSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/backupVaults",
    }),
  );
export type BackupVaultsGetInSubscriptionInput =
  typeof BackupVaultsGetInSubscriptionInput.Type;

// Output Schema
export const BackupVaultsGetInSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type BackupVaultsGetInSubscriptionOutput =
  typeof BackupVaultsGetInSubscriptionOutput.Type;

// The operation
/**
 * Returns resource collection belonging to a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const BackupVaultsGetInSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupVaultsGetInSubscriptionInput,
    outputSchema: BackupVaultsGetInSubscriptionOutput,
  }));
// Input Schema
export const BackupVaultsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}",
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
 * Updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 */
export const BackupVaultsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupVaultsUpdateInput,
  outputSchema: BackupVaultsUpdateOutput,
}));
// Input Schema
export const DataProtectionCheckFeatureSupportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/checkFeatureSupport",
    }),
  );
export type DataProtectionCheckFeatureSupportInput =
  typeof DataProtectionCheckFeatureSupportInput.Type;

// Output Schema
export const DataProtectionCheckFeatureSupportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type DataProtectionCheckFeatureSupportOutput =
  typeof DataProtectionCheckFeatureSupportOutput.Type;

// The operation
/**
 * Validates if a feature is supported
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const DataProtectionCheckFeatureSupport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataProtectionCheckFeatureSupportInput,
    outputSchema: DataProtectionCheckFeatureSupportOutput,
  }));
// Input Schema
export const DeletedBackupInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/deletedBackupInstances/{backupInstanceName}",
    }),
  );
export type DeletedBackupInstancesGetInput =
  typeof DeletedBackupInstancesGetInput.Type;

// Output Schema
export const DeletedBackupInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeletedBackupInstancesGetOutput =
  typeof DeletedBackupInstancesGetOutput.Type;

// The operation
/**
 * Gets a deleted backup instance with name in a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the deleted backup instance
 */
export const DeletedBackupInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeletedBackupInstancesGetInput,
    outputSchema: DeletedBackupInstancesGetOutput,
  }),
);
// Input Schema
export const DeletedBackupInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/deletedBackupInstances",
    }),
  );
export type DeletedBackupInstancesListInput =
  typeof DeletedBackupInstancesListInput.Type;

// Output Schema
export const DeletedBackupInstancesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type DeletedBackupInstancesListOutput =
  typeof DeletedBackupInstancesListOutput.Type;

// The operation
/**
 * Gets deleted backup instances belonging to a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 */
export const DeletedBackupInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeletedBackupInstancesListInput,
    outputSchema: DeletedBackupInstancesListOutput,
  }),
);
// Input Schema
export const DeletedBackupInstancesUndeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/deletedBackupInstances/{backupInstanceName}/undelete",
    }),
  );
export type DeletedBackupInstancesUndeleteInput =
  typeof DeletedBackupInstancesUndeleteInput.Type;

// Output Schema
export const DeletedBackupInstancesUndeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeletedBackupInstancesUndeleteOutput =
  typeof DeletedBackupInstancesUndeleteOutput.Type;

// The operation
/**
 * A long-running resource action.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the deleted backup instance
 */
export const DeletedBackupInstancesUndelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletedBackupInstancesUndeleteInput,
    outputSchema: DeletedBackupInstancesUndeleteOutput,
  }));
// Input Schema
export const DeletedBackupVaultsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    deletedVaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/deletedVaults/{deletedVaultName}",
    }),
  );
export type DeletedBackupVaultsGetInput =
  typeof DeletedBackupVaultsGetInput.Type;

// Output Schema
export const DeletedBackupVaultsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeletedBackupVaultsGetOutput =
  typeof DeletedBackupVaultsGetOutput.Type;

// The operation
/**
 * Gets a deleted backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param deletedVaultName - The name of the DeletedBackupVaultResource
 */
export const DeletedBackupVaultsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeletedBackupVaultsGetInput,
    outputSchema: DeletedBackupVaultsGetOutput,
  }),
);
// Input Schema
export const DeletedBackupVaultsListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/deletedVaults",
    }),
  );
export type DeletedBackupVaultsListByLocationInput =
  typeof DeletedBackupVaultsListByLocationInput.Type;

// Output Schema
export const DeletedBackupVaultsListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DeletedBackupVaultsListByLocationOutput =
  typeof DeletedBackupVaultsListByLocationOutput.Type;

// The operation
/**
 * Lists deleted backup vaults by location
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const DeletedBackupVaultsListByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletedBackupVaultsListByLocationInput,
    outputSchema: DeletedBackupVaultsListByLocationOutput,
  }));
// Input Schema
export const DppResourceGuardProxyCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGuardProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}",
    }),
  );
export type DppResourceGuardProxyCreateOrUpdateInput =
  typeof DppResourceGuardProxyCreateOrUpdateInput.Type;

// Output Schema
export const DppResourceGuardProxyCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DppResourceGuardProxyCreateOrUpdateOutput =
  typeof DppResourceGuardProxyCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or Updates a ResourceGuardProxy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param resourceGuardProxyName - name of the resource guard proxy
 */
export const DppResourceGuardProxyCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DppResourceGuardProxyCreateOrUpdateInput,
    outputSchema: DppResourceGuardProxyCreateOrUpdateOutput,
  }));
// Input Schema
export const DppResourceGuardProxyDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGuardProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}",
    }),
  );
export type DppResourceGuardProxyDeleteInput =
  typeof DppResourceGuardProxyDeleteInput.Type;

// Output Schema
export const DppResourceGuardProxyDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DppResourceGuardProxyDeleteOutput =
  typeof DppResourceGuardProxyDeleteOutput.Type;

// The operation
/**
 * Deletes the ResourceGuardProxy
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param resourceGuardProxyName - name of the resource guard proxy
 */
export const DppResourceGuardProxyDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DppResourceGuardProxyDeleteInput,
    outputSchema: DppResourceGuardProxyDeleteOutput,
  }),
);
// Input Schema
export const DppResourceGuardProxyGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGuardProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}",
    }),
  );
export type DppResourceGuardProxyGetInput =
  typeof DppResourceGuardProxyGetInput.Type;

// Output Schema
export const DppResourceGuardProxyGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DppResourceGuardProxyGetOutput =
  typeof DppResourceGuardProxyGetOutput.Type;

// The operation
/**
 * Returns the ResourceGuardProxy object associated with the vault, and that matches the name in the request
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param resourceGuardProxyName - name of the resource guard proxy
 */
export const DppResourceGuardProxyGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DppResourceGuardProxyGetInput,
    outputSchema: DppResourceGuardProxyGetOutput,
  }),
);
// Input Schema
export const DppResourceGuardProxyListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies",
    }),
  );
export type DppResourceGuardProxyListInput =
  typeof DppResourceGuardProxyListInput.Type;

// Output Schema
export const DppResourceGuardProxyListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type DppResourceGuardProxyListOutput =
  typeof DppResourceGuardProxyListOutput.Type;

// The operation
/**
 * Returns the list of ResourceGuardProxies associated with the vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 */
export const DppResourceGuardProxyList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DppResourceGuardProxyListInput,
    outputSchema: DppResourceGuardProxyListOutput,
  }),
);
// Input Schema
export const DppResourceGuardProxyUnlockDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    resourceGuardProxyName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupResourceGuardProxies/{resourceGuardProxyName}/unlockDelete",
    }),
  );
export type DppResourceGuardProxyUnlockDeleteInput =
  typeof DppResourceGuardProxyUnlockDeleteInput.Type;

// Output Schema
export const DppResourceGuardProxyUnlockDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    unlockDeleteExpiryTime: Schema.optional(Schema.String),
  });
export type DppResourceGuardProxyUnlockDeleteOutput =
  typeof DppResourceGuardProxyUnlockDeleteOutput.Type;

// The operation
/**
 * UnlockDelete call for ResourceGuardProxy, executed before one can delete it
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param resourceGuardProxyName - name of the resource guard proxy
 */
export const DppResourceGuardProxyUnlockDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DppResourceGuardProxyUnlockDeleteInput,
    outputSchema: DppResourceGuardProxyUnlockDeleteOutput,
  }));
// Input Schema
export const ExportJobsOperationResultGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupJobs/operations/{operationId}",
    }),
  );
export type ExportJobsOperationResultGetInput =
  typeof ExportJobsOperationResultGetInput.Type;

// Output Schema
export const ExportJobsOperationResultGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    blobUrl: Schema.optional(Schema.String),
    blobSasKey: Schema.optional(Schema.String),
    excelFileBlobUrl: Schema.optional(Schema.String),
    excelFileBlobSasKey: Schema.optional(Schema.String),
  });
export type ExportJobsOperationResultGetOutput =
  typeof ExportJobsOperationResultGetOutput.Type;

// The operation
/**
 * Gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 * @param operationId - OperationID which represents the export job.
 */
export const ExportJobsOperationResultGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExportJobsOperationResultGetInput,
    outputSchema: ExportJobsOperationResultGetOutput,
  }));
// Input Schema
export const ExportJobsTriggerInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/exportBackupJobs",
  }),
);
export type ExportJobsTriggerInput = typeof ExportJobsTriggerInput.Type;

// Output Schema
export const ExportJobsTriggerOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ExportJobsTriggerOutput = typeof ExportJobsTriggerOutput.Type;

// The operation
/**
 * Triggers export of jobs and returns an OperationID to track.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 */
export const ExportJobsTrigger = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ExportJobsTriggerInput,
  outputSchema: ExportJobsTriggerOutput,
}));
// Input Schema
export const FetchCrossRegionRestoreJobGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/fetchCrossRegionRestoreJob",
    }),
  );
export type FetchCrossRegionRestoreJobGetInput =
  typeof FetchCrossRegionRestoreJobGetInput.Type;

// Output Schema
export const FetchCrossRegionRestoreJobGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FetchCrossRegionRestoreJobGetOutput =
  typeof FetchCrossRegionRestoreJobGetOutput.Type;

// The operation
/**
 * Fetches the Cross Region Restore Job
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const FetchCrossRegionRestoreJobGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FetchCrossRegionRestoreJobGetInput,
    outputSchema: FetchCrossRegionRestoreJobGetOutput,
  }));
// Input Schema
export const FetchCrossRegionRestoreJobsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/fetchCrossRegionRestoreJobs",
    }),
  );
export type FetchCrossRegionRestoreJobsListInput =
  typeof FetchCrossRegionRestoreJobsListInput.Type;

// Output Schema
export const FetchCrossRegionRestoreJobsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type FetchCrossRegionRestoreJobsListOutput =
  typeof FetchCrossRegionRestoreJobsListOutput.Type;

// The operation
/**
 * Fetches list of Cross Region Restore job belonging to the vault
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 * @param $filter - OData filter options.
 */
export const FetchCrossRegionRestoreJobsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FetchCrossRegionRestoreJobsListInput,
    outputSchema: FetchCrossRegionRestoreJobsListOutput,
  }));
// Input Schema
export const FetchSecondaryRecoveryPointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/fetchSecondaryRecoveryPoints",
    }),
  );
export type FetchSecondaryRecoveryPointsListInput =
  typeof FetchSecondaryRecoveryPointsListInput.Type;

// Output Schema
export const FetchSecondaryRecoveryPointsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type FetchSecondaryRecoveryPointsListOutput =
  typeof FetchSecondaryRecoveryPointsListOutput.Type;

// The operation
/**
 * Returns a list of Secondary Recovery Points for a DataSource in a vault, that can be used for Cross Region Restore.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of the Azure region.
 * @param $filter - OData filter options.
 * @param $skipToken - skipToken Filter.
 */
export const FetchSecondaryRecoveryPointsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FetchSecondaryRecoveryPointsListInput,
    outputSchema: FetchSecondaryRecoveryPointsListOutput,
  }));
// Input Schema
export const JobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  jobId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupJobs/{jobId}",
  }),
);
export type JobsGetInput = typeof JobsGetInput.Type;

// Output Schema
export const JobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobsGetOutput = typeof JobsGetOutput.Type;

// The operation
/**
 * Gets a job with id in a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param jobId - The Job ID. This is a GUID-formatted string (e.g. 00000000-0000-0000-0000-000000000000).
 */
export const JobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsGetInput,
  outputSchema: JobsGetOutput,
}));
// Input Schema
export const JobsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  vaultName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupJobs",
  }),
);
export type JobsListInput = typeof JobsListInput.Type;

// Output Schema
export const JobsListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
});
export type JobsListOutput = typeof JobsListOutput.Type;

// The operation
/**
 * Returns list of jobs belonging to a backup vault
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 */
export const JobsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListInput,
  outputSchema: JobsListOutput,
}));
// Input Schema
export const OperationResultGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/operationResults/{operationId}",
    }),
  );
export type OperationResultGetInput = typeof OperationResultGetInput.Type;

// Output Schema
export const OperationResultGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    objectType: Schema.String,
  });
export type OperationResultGetOutput = typeof OperationResultGetOutput.Type;

// The operation
/**
 * Gets the operation status for a resource.
 *
 * Gets the operation result for a resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const OperationResultGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationResultGetInput,
  outputSchema: OperationResultGetOutput,
}));
// Input Schema
export const OperationStatusBackupVaultContextGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/operationStatus/{operationId}",
    }),
  );
export type OperationStatusBackupVaultContextGetInput =
  typeof OperationStatusBackupVaultContextGetInput.Type;

// Output Schema
export const OperationStatusBackupVaultContextGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(Schema.Unknown),
            }),
          ),
        ),
        code: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        message: Schema.optional(Schema.String),
        target: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
    startTime: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
  });
export type OperationStatusBackupVaultContextGetOutput =
  typeof OperationStatusBackupVaultContextGetOutput.Type;

// The operation
/**
 * Gets the operation status for an operation over a BackupVault's context.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the BackupVaultResource
 */
export const OperationStatusBackupVaultContextGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OperationStatusBackupVaultContextGetInput,
    outputSchema: OperationStatusBackupVaultContextGetOutput,
  }));
// Input Schema
export const OperationStatusGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/operationStatus/{operationId}",
    }),
  );
export type OperationStatusGetInput = typeof OperationStatusGetInput.Type;

// Output Schema
export const OperationStatusGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(Schema.Unknown),
            }),
          ),
        ),
        code: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        message: Schema.optional(Schema.String),
        target: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
    startTime: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
  });
export type OperationStatusGetOutput = typeof OperationStatusGetOutput.Type;

// The operation
/**
 * Gets the operation status for a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param location - The name of the Azure region.
 */
export const OperationStatusGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationStatusGetInput,
  outputSchema: OperationStatusGetOutput,
}));
// Input Schema
export const OperationStatusResourceGroupContextGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/operationStatus/{operationId}",
    }),
  );
export type OperationStatusResourceGroupContextGetInput =
  typeof OperationStatusResourceGroupContextGetInput.Type;

// Output Schema
export const OperationStatusResourceGroupContextGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    endTime: Schema.optional(Schema.String),
    error: Schema.optional(
      Schema.Struct({
        additionalInfo: Schema.optional(
          Schema.Array(
            Schema.Struct({
              type: Schema.optional(Schema.String),
              info: Schema.optional(Schema.Unknown),
            }),
          ),
        ),
        code: Schema.optional(Schema.String),
        details: Schema.optional(Schema.Array(Schema.Unknown)),
        message: Schema.optional(Schema.String),
        target: Schema.optional(Schema.String),
      }),
    ),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    properties: Schema.optional(
      Schema.Struct({
        objectType: Schema.String,
      }),
    ),
    startTime: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
  });
export type OperationStatusResourceGroupContextGetOutput =
  typeof OperationStatusResourceGroupContextGetOutput.Type;

// The operation
/**
 * Gets the operation status for an operation over a ResourceGroup's context.
 *
 * @param api-version - The API version to use for this operation.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const OperationStatusResourceGroupContextGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OperationStatusResourceGroupContextGetInput,
    outputSchema: OperationStatusResourceGroupContextGetOutput,
  }));
// Input Schema
export const RecoveryPointsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    recoveryPointId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/recoveryPoints/{recoveryPointId}",
  }),
);
export type RecoveryPointsGetInput = typeof RecoveryPointsGetInput.Type;

// Output Schema
export const RecoveryPointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RecoveryPointsGetOutput = typeof RecoveryPointsGetOutput.Type;

// The operation
/**
 * Gets a Recovery Point using recoveryPointId for a Datasource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the backup instance.
 */
export const RecoveryPointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecoveryPointsGetInput,
  outputSchema: RecoveryPointsGetOutput,
}));
// Input Schema
export const RecoveryPointsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/recoveryPoints",
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
 * Returns a list of Recovery Points for a DataSource in a vault.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the backup instance.
 * @param $filter - OData filter options.
 * @param $skipToken - skipToken Filter.
 */
export const RecoveryPointsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RecoveryPointsListInput,
  outputSchema: RecoveryPointsListOutput,
}));
// Input Schema
export const ResourceGuardsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}",
    }),
  );
export type ResourceGuardsDeleteInput = typeof ResourceGuardsDeleteInput.Type;

// Output Schema
export const ResourceGuardsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ResourceGuardsDeleteOutput = typeof ResourceGuardsDeleteOutput.Type;

// The operation
/**
 * Deletes a ResourceGuard resource from the resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of ResourceGuard
 */
export const ResourceGuardsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ResourceGuardsDeleteInput,
    outputSchema: ResourceGuardsDeleteOutput,
  }),
);
// Input Schema
export const ResourceGuardsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}",
  }),
);
export type ResourceGuardsGetInput = typeof ResourceGuardsGetInput.Type;

// Output Schema
export const ResourceGuardsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ResourceGuardsGetOutput = typeof ResourceGuardsGetOutput.Type;

// The operation
/**
 * Returns a ResourceGuard belonging to a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of ResourceGuard
 */
export const ResourceGuardsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceGuardsGetInput,
  outputSchema: ResourceGuardsGetOutput,
}));
// Input Schema
export const ResourceGuardsGetBackupSecurityPINRequestsObjectsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/getBackupSecurityPINRequests",
    }),
  );
export type ResourceGuardsGetBackupSecurityPINRequestsObjectsInput =
  typeof ResourceGuardsGetBackupSecurityPINRequestsObjectsInput.Type;

// Output Schema
export const ResourceGuardsGetBackupSecurityPINRequestsObjectsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGuardsGetBackupSecurityPINRequestsObjectsOutput =
  typeof ResourceGuardsGetBackupSecurityPINRequestsObjectsOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 */
export const ResourceGuardsGetBackupSecurityPINRequestsObjects =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetBackupSecurityPINRequestsObjectsInput,
    outputSchema: ResourceGuardsGetBackupSecurityPINRequestsObjectsOutput,
  }));
// Input Schema
export const ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    requestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/getBackupSecurityPINRequests/{requestName}",
    }),
  );
export type ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectInput =
  typeof ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectInput.Type;

// Output Schema
export const ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOutput =
  typeof ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 * @param requestName - The name of the DppBaseResource
 */
export const ResourceGuardsGetDefaultBackupSecurityPINRequestsObject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectInput,
    outputSchema: ResourceGuardsGetDefaultBackupSecurityPINRequestsObjectOutput,
  }));
// Input Schema
export const ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    requestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/deleteProtectedItemRequests/{requestName}",
    }),
  );
export type ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectInput =
  typeof ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectInput.Type;

// Output Schema
export const ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOutput =
  typeof ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 * @param requestName - The name of the DppBaseResource
 */
export const ResourceGuardsGetDefaultDeleteProtectedItemRequestsObject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectInput,
    outputSchema:
      ResourceGuardsGetDefaultDeleteProtectedItemRequestsObjectOutput,
  }));
// Input Schema
export const ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    requestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/deleteResourceGuardProxyRequests/{requestName}",
    }),
  );
export type ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectInput =
  typeof ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectInput.Type;

// Output Schema
export const ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOutput =
  typeof ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 * @param requestName - The name of the DppBaseResource
 */
export const ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectInput,
    outputSchema:
      ResourceGuardsGetDefaultDeleteResourceGuardProxyRequestsObjectOutput,
  }));
// Input Schema
export const ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    requestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/disableSoftDeleteRequests/{requestName}",
    }),
  );
export type ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectInput =
  typeof ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectInput.Type;

// Output Schema
export const ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOutput =
  typeof ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 * @param requestName - The name of the DppBaseResource
 */
export const ResourceGuardsGetDefaultDisableSoftDeleteRequestsObject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectInput,
    outputSchema: ResourceGuardsGetDefaultDisableSoftDeleteRequestsObjectOutput,
  }));
// Input Schema
export const ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    requestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/updateProtectedItemRequests/{requestName}",
    }),
  );
export type ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectInput =
  typeof ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectInput.Type;

// Output Schema
export const ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOutput =
  typeof ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 * @param requestName - The name of the DppBaseResource
 */
export const ResourceGuardsGetDefaultUpdateProtectedItemRequestsObject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectInput,
    outputSchema:
      ResourceGuardsGetDefaultUpdateProtectedItemRequestsObjectOutput,
  }));
// Input Schema
export const ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    requestName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/updateProtectionPolicyRequests/{requestName}",
    }),
  );
export type ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectInput =
  typeof ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectInput.Type;

// Output Schema
export const ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOutput =
  typeof ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 * @param requestName - The name of the DppBaseResource
 */
export const ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObject =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectInput,
    outputSchema:
      ResourceGuardsGetDefaultUpdateProtectionPolicyRequestsObjectOutput,
  }));
// Input Schema
export const ResourceGuardsGetDeleteProtectedItemRequestsObjectsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/deleteProtectedItemRequests",
    }),
  );
export type ResourceGuardsGetDeleteProtectedItemRequestsObjectsInput =
  typeof ResourceGuardsGetDeleteProtectedItemRequestsObjectsInput.Type;

// Output Schema
export const ResourceGuardsGetDeleteProtectedItemRequestsObjectsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGuardsGetDeleteProtectedItemRequestsObjectsOutput =
  typeof ResourceGuardsGetDeleteProtectedItemRequestsObjectsOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 */
export const ResourceGuardsGetDeleteProtectedItemRequestsObjects =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetDeleteProtectedItemRequestsObjectsInput,
    outputSchema: ResourceGuardsGetDeleteProtectedItemRequestsObjectsOutput,
  }));
// Input Schema
export const ResourceGuardsGetDeleteResourceGuardProxyRequestsObjectsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/deleteResourceGuardProxyRequests",
    }),
  );
export type ResourceGuardsGetDeleteResourceGuardProxyRequestsObjectsInput =
  typeof ResourceGuardsGetDeleteResourceGuardProxyRequestsObjectsInput.Type;

// Output Schema
export const ResourceGuardsGetDeleteResourceGuardProxyRequestsObjectsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGuardsGetDeleteResourceGuardProxyRequestsObjectsOutput =
  typeof ResourceGuardsGetDeleteResourceGuardProxyRequestsObjectsOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 */
export const ResourceGuardsGetDeleteResourceGuardProxyRequestsObjects =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetDeleteResourceGuardProxyRequestsObjectsInput,
    outputSchema:
      ResourceGuardsGetDeleteResourceGuardProxyRequestsObjectsOutput,
  }));
// Input Schema
export const ResourceGuardsGetDisableSoftDeleteRequestsObjectsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/disableSoftDeleteRequests",
    }),
  );
export type ResourceGuardsGetDisableSoftDeleteRequestsObjectsInput =
  typeof ResourceGuardsGetDisableSoftDeleteRequestsObjectsInput.Type;

// Output Schema
export const ResourceGuardsGetDisableSoftDeleteRequestsObjectsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGuardsGetDisableSoftDeleteRequestsObjectsOutput =
  typeof ResourceGuardsGetDisableSoftDeleteRequestsObjectsOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 */
export const ResourceGuardsGetDisableSoftDeleteRequestsObjects =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetDisableSoftDeleteRequestsObjectsInput,
    outputSchema: ResourceGuardsGetDisableSoftDeleteRequestsObjectsOutput,
  }));
// Input Schema
export const ResourceGuardsGetResourcesInResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards",
    }),
  );
export type ResourceGuardsGetResourcesInResourceGroupInput =
  typeof ResourceGuardsGetResourcesInResourceGroupInput.Type;

// Output Schema
export const ResourceGuardsGetResourcesInResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGuardsGetResourcesInResourceGroupOutput =
  typeof ResourceGuardsGetResourcesInResourceGroupOutput.Type;

// The operation
/**
 * Returns ResourceGuards collection belonging to a ResourceGroup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ResourceGuardsGetResourcesInResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetResourcesInResourceGroupInput,
    outputSchema: ResourceGuardsGetResourcesInResourceGroupOutput,
  }));
// Input Schema
export const ResourceGuardsGetResourcesInSubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/resourceGuards",
    }),
  );
export type ResourceGuardsGetResourcesInSubscriptionInput =
  typeof ResourceGuardsGetResourcesInSubscriptionInput.Type;

// Output Schema
export const ResourceGuardsGetResourcesInSubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGuardsGetResourcesInSubscriptionOutput =
  typeof ResourceGuardsGetResourcesInSubscriptionOutput.Type;

// The operation
/**
 * Returns ResourceGuards collection belonging to a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ResourceGuardsGetResourcesInSubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetResourcesInSubscriptionInput,
    outputSchema: ResourceGuardsGetResourcesInSubscriptionOutput,
  }));
// Input Schema
export const ResourceGuardsGetUpdateProtectedItemRequestsObjectsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/updateProtectedItemRequests",
    }),
  );
export type ResourceGuardsGetUpdateProtectedItemRequestsObjectsInput =
  typeof ResourceGuardsGetUpdateProtectedItemRequestsObjectsInput.Type;

// Output Schema
export const ResourceGuardsGetUpdateProtectedItemRequestsObjectsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGuardsGetUpdateProtectedItemRequestsObjectsOutput =
  typeof ResourceGuardsGetUpdateProtectedItemRequestsObjectsOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 */
export const ResourceGuardsGetUpdateProtectedItemRequestsObjects =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetUpdateProtectedItemRequestsObjectsInput,
    outputSchema: ResourceGuardsGetUpdateProtectedItemRequestsObjectsOutput,
  }));
// Input Schema
export const ResourceGuardsGetUpdateProtectionPolicyRequestsObjectsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}/updateProtectionPolicyRequests",
    }),
  );
export type ResourceGuardsGetUpdateProtectionPolicyRequestsObjectsInput =
  typeof ResourceGuardsGetUpdateProtectionPolicyRequestsObjectsInput.Type;

// Output Schema
export const ResourceGuardsGetUpdateProtectionPolicyRequestsObjectsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ResourceGuardsGetUpdateProtectionPolicyRequestsObjectsOutput =
  typeof ResourceGuardsGetUpdateProtectionPolicyRequestsObjectsOutput.Type;

// The operation
/**
 * Returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of the ResourceGuardResource
 */
export const ResourceGuardsGetUpdateProtectionPolicyRequestsObjects =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ResourceGuardsGetUpdateProtectionPolicyRequestsObjectsInput,
    outputSchema: ResourceGuardsGetUpdateProtectionPolicyRequestsObjectsOutput,
  }));
// Input Schema
export const ResourceGuardsPatchInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}",
    }),
  );
export type ResourceGuardsPatchInput = typeof ResourceGuardsPatchInput.Type;

// Output Schema
export const ResourceGuardsPatchOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ResourceGuardsPatchOutput = typeof ResourceGuardsPatchOutput.Type;

// The operation
/**
 * Updates a ResourceGuard resource belonging to a resource group. For example, updating tags for a resource.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of ResourceGuard
 */
export const ResourceGuardsPatch = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceGuardsPatchInput,
  outputSchema: ResourceGuardsPatchOutput,
}));
// Input Schema
export const ResourceGuardsPutInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    resourceGuardsName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/resourceGuards/{resourceGuardsName}",
  }),
);
export type ResourceGuardsPutInput = typeof ResourceGuardsPutInput.Type;

// Output Schema
export const ResourceGuardsPutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ResourceGuardsPutOutput = typeof ResourceGuardsPutOutput.Type;

// The operation
/**
 * Creates or updates a ResourceGuard resource belonging to a resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param resourceGuardsName - The name of ResourceGuard
 */
export const ResourceGuardsPut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ResourceGuardsPutInput,
  outputSchema: ResourceGuardsPutOutput,
}));
// Input Schema
export const RestorableTimeRangesFindInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vaultName: Schema.String.pipe(T.PathParam()),
    backupInstanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/findRestorableTimeRanges",
    }),
  );
export type RestorableTimeRangesFindInput =
  typeof RestorableTimeRangesFindInput.Type;

// Output Schema
export const RestorableTimeRangesFindOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    systemData: Schema.optional(
      Schema.Struct({
        createdBy: Schema.optional(Schema.String),
        createdByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        createdAt: Schema.optional(Schema.String),
        lastModifiedBy: Schema.optional(Schema.String),
        lastModifiedByType: Schema.optional(
          Schema.Literals(["User", "Application", "ManagedIdentity", "Key"]),
        ),
        lastModifiedAt: Schema.optional(Schema.String),
      }),
    ),
  });
export type RestorableTimeRangesFindOutput =
  typeof RestorableTimeRangesFindOutput.Type;

// The operation
/**
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param vaultName - The name of the backup vault.
 * @param backupInstanceName - The name of the BackupInstanceResource
 */
export const RestorableTimeRangesFind = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RestorableTimeRangesFindInput,
    outputSchema: RestorableTimeRangesFindOutput,
  }),
);
