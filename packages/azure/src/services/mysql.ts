/**
 * Azure Mysql API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AdvancedThreatProtectionSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type AdvancedThreatProtectionSettingsGetInput =
  typeof AdvancedThreatProtectionSettingsGetInput.Type;

// Output Schema
export const AdvancedThreatProtectionSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AdvancedThreatProtectionSettingsGetOutput =
  typeof AdvancedThreatProtectionSettingsGetOutput.Type;

// The operation
/**
 * Get a server's Advanced Threat Protection state
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 */
export const AdvancedThreatProtectionSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdvancedThreatProtectionSettingsGetInput,
    outputSchema: AdvancedThreatProtectionSettingsGetOutput,
  }));
// Input Schema
export const AdvancedThreatProtectionSettingsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/advancedThreatProtectionSettings",
    }),
  );
export type AdvancedThreatProtectionSettingsListInput =
  typeof AdvancedThreatProtectionSettingsListInput.Type;

// Output Schema
export const AdvancedThreatProtectionSettingsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type AdvancedThreatProtectionSettingsListOutput =
  typeof AdvancedThreatProtectionSettingsListOutput.Type;

// The operation
/**
 * Gets a list of server's Advanced Threat Protection states.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const AdvancedThreatProtectionSettingsList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdvancedThreatProtectionSettingsListInput,
    outputSchema: AdvancedThreatProtectionSettingsListOutput,
  }));
// Input Schema
export const AdvancedThreatProtectionSettingsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type AdvancedThreatProtectionSettingsUpdateInput =
  typeof AdvancedThreatProtectionSettingsUpdateInput.Type;

// Output Schema
export const AdvancedThreatProtectionSettingsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AdvancedThreatProtectionSettingsUpdateOutput =
  typeof AdvancedThreatProtectionSettingsUpdateOutput.Type;

// The operation
/**
 * Updates a server's Advanced Threat Protection state.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 */
export const AdvancedThreatProtectionSettingsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdvancedThreatProtectionSettingsUpdateInput,
    outputSchema: AdvancedThreatProtectionSettingsUpdateOutput,
  }));
// Input Schema
export const AdvancedThreatProtectionSettingsUpdatePutInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type AdvancedThreatProtectionSettingsUpdatePutInput =
  typeof AdvancedThreatProtectionSettingsUpdatePutInput.Type;

// Output Schema
export const AdvancedThreatProtectionSettingsUpdatePutOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AdvancedThreatProtectionSettingsUpdatePutOutput =
  typeof AdvancedThreatProtectionSettingsUpdatePutOutput.Type;

// The operation
/**
 * Updates a server's Advanced Threat Protection state.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 */
export const AdvancedThreatProtectionSettingsUpdatePut =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdvancedThreatProtectionSettingsUpdatePutInput,
    outputSchema: AdvancedThreatProtectionSettingsUpdatePutOutput,
  }));
// Input Schema
export const AzureADAdministratorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    administratorName: Schema.Literals(["ActiveDirectory"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/administrators/{administratorName}",
    }),
  );
export type AzureADAdministratorsCreateOrUpdateInput =
  typeof AzureADAdministratorsCreateOrUpdateInput.Type;

// Output Schema
export const AzureADAdministratorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AzureADAdministratorsCreateOrUpdateOutput =
  typeof AzureADAdministratorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an existing Azure Active Directory administrator.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param administratorName - The name of the Azure AD Administrator.
 */
export const AzureADAdministratorsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureADAdministratorsCreateOrUpdateInput,
    outputSchema: AzureADAdministratorsCreateOrUpdateOutput,
  }));
// Input Schema
export const AzureADAdministratorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    administratorName: Schema.Literals(["ActiveDirectory"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/administrators/{administratorName}",
    }),
  );
export type AzureADAdministratorsDeleteInput =
  typeof AzureADAdministratorsDeleteInput.Type;

// Output Schema
export const AzureADAdministratorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AzureADAdministratorsDeleteOutput =
  typeof AzureADAdministratorsDeleteOutput.Type;

// The operation
/**
 * Deletes an Azure AD Administrator.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param administratorName - The name of the Azure AD Administrator.
 */
export const AzureADAdministratorsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AzureADAdministratorsDeleteInput,
    outputSchema: AzureADAdministratorsDeleteOutput,
  }),
);
// Input Schema
export const AzureADAdministratorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    administratorName: Schema.Literals(["ActiveDirectory"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/administrators/{administratorName}",
    }),
  );
export type AzureADAdministratorsGetInput =
  typeof AzureADAdministratorsGetInput.Type;

// Output Schema
export const AzureADAdministratorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AzureADAdministratorsGetOutput =
  typeof AzureADAdministratorsGetOutput.Type;

// The operation
/**
 * Gets information about an azure ad administrator.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param administratorName - The name of the Azure AD Administrator.
 */
export const AzureADAdministratorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AzureADAdministratorsGetInput,
    outputSchema: AzureADAdministratorsGetOutput,
  }),
);
// Input Schema
export const AzureADAdministratorsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/administrators",
    }),
  );
export type AzureADAdministratorsListByServerInput =
  typeof AzureADAdministratorsListByServerInput.Type;

// Output Schema
export const AzureADAdministratorsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type AzureADAdministratorsListByServerOutput =
  typeof AzureADAdministratorsListByServerOutput.Type;

// The operation
/**
 * List all the AAD administrators in a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const AzureADAdministratorsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AzureADAdministratorsListByServerInput,
    outputSchema: AzureADAdministratorsListByServerOutput,
  }));
// Input Schema
export const BackupAndExportCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backupAndExport",
    }),
  );
export type BackupAndExportCreateInput = typeof BackupAndExportCreateInput.Type;

// Output Schema
export const BackupAndExportCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupAndExportCreateOutput =
  typeof BackupAndExportCreateOutput.Type;

// The operation
/**
 * Exports the backup of the given server by creating a backup if not existing.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const BackupAndExportCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupAndExportCreateInput,
    outputSchema: BackupAndExportCreateOutput,
  }),
);
// Input Schema
export const BackupAndExportValidateBackupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/validateBackup",
    }),
  );
export type BackupAndExportValidateBackupInput =
  typeof BackupAndExportValidateBackupInput.Type;

// Output Schema
export const BackupAndExportValidateBackupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        numberOfContainers: Schema.optional(Schema.Number),
      }),
    ),
  });
export type BackupAndExportValidateBackupOutput =
  typeof BackupAndExportValidateBackupOutput.Type;

// The operation
/**
 * Validates if backup can be performed for given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const BackupAndExportValidateBackup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupAndExportValidateBackupInput,
    outputSchema: BackupAndExportValidateBackupOutput,
  }));
// Input Schema
export const BackupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  backupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backups/{backupName}",
  }),
);
export type BackupsGetInput = typeof BackupsGetInput.Type;

// Output Schema
export const BackupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupsGetOutput = typeof BackupsGetOutput.Type;

// The operation
/**
 * List all the backups for a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param backupName - The name of the backup.
 */
export const BackupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupsGetInput,
  outputSchema: BackupsGetOutput,
}));
// Input Schema
export const BackupsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backups",
    }),
  );
export type BackupsListByServerInput = typeof BackupsListByServerInput.Type;

// Output Schema
export const BackupsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type BackupsListByServerOutput = typeof BackupsListByServerOutput.Type;

// The operation
/**
 * List all the backups for a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const BackupsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupsListByServerInput,
  outputSchema: BackupsListByServerOutput,
}));
// Input Schema
export const BackupsPutInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  backupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backups/{backupName}",
  }),
);
export type BackupsPutInput = typeof BackupsPutInput.Type;

// Output Schema
export const BackupsPutOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupsPutOutput = typeof BackupsPutOutput.Type;

// The operation
/**
 * Create backup for a given server with specified backup name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param backupName - The name of the backup.
 */
export const BackupsPut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: BackupsPutInput,
  outputSchema: BackupsPutOutput,
}));
// Input Schema
export const CheckNameAvailabilityExecuteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/checkNameAvailability",
    }),
  );
export type CheckNameAvailabilityExecuteInput =
  typeof CheckNameAvailabilityExecuteInput.Type;

// Output Schema
export const CheckNameAvailabilityExecuteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
  });
export type CheckNameAvailabilityExecuteOutput =
  typeof CheckNameAvailabilityExecuteOutput.Type;

// The operation
/**
 * Check the availability of name for server
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CheckNameAvailabilityExecute =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CheckNameAvailabilityExecuteInput,
    outputSchema: CheckNameAvailabilityExecuteOutput,
  }));
// Input Schema
export const CheckNameAvailabilityWithoutLocationExecuteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/checkNameAvailability",
    }),
  );
export type CheckNameAvailabilityWithoutLocationExecuteInput =
  typeof CheckNameAvailabilityWithoutLocationExecuteInput.Type;

// Output Schema
export const CheckNameAvailabilityWithoutLocationExecuteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.optional(Schema.String),
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
  });
export type CheckNameAvailabilityWithoutLocationExecuteOutput =
  typeof CheckNameAvailabilityWithoutLocationExecuteOutput.Type;

// The operation
/**
 * Check the availability of name for server
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CheckNameAvailabilityWithoutLocationExecute =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CheckNameAvailabilityWithoutLocationExecuteInput,
    outputSchema: CheckNameAvailabilityWithoutLocationExecuteOutput,
  }));
// Input Schema
export const CheckVirtualNetworkSubnetUsageExecuteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/checkVirtualNetworkSubnetUsage",
    }),
  );
export type CheckVirtualNetworkSubnetUsageExecuteInput =
  typeof CheckVirtualNetworkSubnetUsageExecuteInput.Type;

// Output Schema
export const CheckVirtualNetworkSubnetUsageExecuteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.optional(Schema.String),
    subscriptionId: Schema.optional(Schema.String),
    delegatedSubnetsUsage: Schema.optional(
      Schema.Array(
        Schema.Struct({
          subnetName: Schema.optional(Schema.String),
          usage: Schema.optional(Schema.Number),
        }),
      ),
    ),
  });
export type CheckVirtualNetworkSubnetUsageExecuteOutput =
  typeof CheckVirtualNetworkSubnetUsageExecuteOutput.Type;

// The operation
/**
 * Get virtual network subnet usage for a given vNet resource id.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const CheckVirtualNetworkSubnetUsageExecute =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CheckVirtualNetworkSubnetUsageExecuteInput,
    outputSchema: CheckVirtualNetworkSubnetUsageExecuteOutput,
  }));
// Input Schema
export const ConfigurationsBatchUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/updateConfigurations",
    }),
  );
export type ConfigurationsBatchUpdateInput =
  typeof ConfigurationsBatchUpdateInput.Type;

// Output Schema
export const ConfigurationsBatchUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigurationsBatchUpdateOutput =
  typeof ConfigurationsBatchUpdateOutput.Type;

// The operation
/**
 * Update a list of configurations in a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ConfigurationsBatchUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationsBatchUpdateInput,
    outputSchema: ConfigurationsBatchUpdateOutput,
  }),
);
// Input Schema
export const ConfigurationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/configurations/{configurationName}",
    }),
  );
export type ConfigurationsCreateOrUpdateInput =
  typeof ConfigurationsCreateOrUpdateInput.Type;

// Output Schema
export const ConfigurationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationsCreateOrUpdateOutput =
  typeof ConfigurationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates a configuration of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param configurationName - The name of the server configuration.
 */
export const ConfigurationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ConfigurationsCreateOrUpdateInput,
    outputSchema: ConfigurationsCreateOrUpdateOutput,
  }));
// Input Schema
export const ConfigurationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/configurations/{configurationName}",
  }),
);
export type ConfigurationsGetInput = typeof ConfigurationsGetInput.Type;

// Output Schema
export const ConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationsGetOutput = typeof ConfigurationsGetOutput.Type;

// The operation
/**
 * Gets information about a configuration of server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param configurationName - The name of the server configuration.
 */
export const ConfigurationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConfigurationsGetInput,
  outputSchema: ConfigurationsGetOutput,
}));
// Input Schema
export const ConfigurationsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    tags: Schema.optional(Schema.String),
    keyword: Schema.optional(Schema.String),
    page: Schema.optional(Schema.Number),
    pageSize: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/configurations",
    }),
  );
export type ConfigurationsListByServerInput =
  typeof ConfigurationsListByServerInput.Type;

// Output Schema
export const ConfigurationsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigurationsListByServerOutput =
  typeof ConfigurationsListByServerOutput.Type;

// The operation
/**
 * List all the configurations in a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param tags - The tags of the server configuration.
 * @param keyword - The keyword of the server configuration.
 * @param page - The page of the server configuration.
 * @param pageSize - The pageSize of the server configuration.
 */
export const ConfigurationsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationsListByServerInput,
    outputSchema: ConfigurationsListByServerOutput,
  }),
);
// Input Schema
export const ConfigurationsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/configurations/{configurationName}",
    }),
  );
export type ConfigurationsUpdateInput = typeof ConfigurationsUpdateInput.Type;

// Output Schema
export const ConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationsUpdateOutput = typeof ConfigurationsUpdateOutput.Type;

// The operation
/**
 * Updates a configuration of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param configurationName - The name of the server configuration.
 */
export const ConfigurationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationsUpdateInput,
    outputSchema: ConfigurationsUpdateOutput,
  }),
);
// Input Schema
export const DatabasesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/databases/{databaseName}",
    }),
  );
export type DatabasesCreateOrUpdateInput =
  typeof DatabasesCreateOrUpdateInput.Type;

// Output Schema
export const DatabasesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabasesCreateOrUpdateOutput =
  typeof DatabasesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new database or updates an existing database.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param databaseName - The name of the database.
 */
export const DatabasesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesCreateOrUpdateInput,
    outputSchema: DatabasesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DatabasesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/databases/{databaseName}",
  }),
);
export type DatabasesDeleteInput = typeof DatabasesDeleteInput.Type;

// Output Schema
export const DatabasesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesDeleteOutput = typeof DatabasesDeleteOutput.Type;

// The operation
/**
 * Deletes a database.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param databaseName - The name of the database.
 */
export const DatabasesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesDeleteInput,
  outputSchema: DatabasesDeleteOutput,
}));
// Input Schema
export const DatabasesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/databases/{databaseName}",
  }),
);
export type DatabasesGetInput = typeof DatabasesGetInput.Type;

// Output Schema
export const DatabasesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabasesGetOutput = typeof DatabasesGetOutput.Type;

// The operation
/**
 * Gets information about a database.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param databaseName - The name of the database.
 */
export const DatabasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesGetInput,
  outputSchema: DatabasesGetOutput,
}));
// Input Schema
export const DatabasesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/databases",
    }),
  );
export type DatabasesListByServerInput = typeof DatabasesListByServerInput.Type;

// Output Schema
export const DatabasesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabasesListByServerOutput =
  typeof DatabasesListByServerOutput.Type;

// The operation
/**
 * List all the databases in a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const DatabasesListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesListByServerInput,
    outputSchema: DatabasesListByServerOutput,
  }),
);
// Input Schema
export const FirewallRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    firewallRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesCreateOrUpdateInput =
  typeof FirewallRulesCreateOrUpdateInput.Type;

// Output Schema
export const FirewallRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FirewallRulesCreateOrUpdateOutput =
  typeof FirewallRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new firewall rule or updates an existing firewall rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param firewallRuleName - The name of the server firewall rule.
 */
export const FirewallRulesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FirewallRulesCreateOrUpdateInput,
    outputSchema: FirewallRulesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const FirewallRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    firewallRuleName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesDeleteInput = typeof FirewallRulesDeleteInput.Type;

// Output Schema
export const FirewallRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FirewallRulesDeleteOutput = typeof FirewallRulesDeleteOutput.Type;

// The operation
/**
 * Deletes a firewall rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param firewallRuleName - The name of the server firewall rule.
 */
export const FirewallRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirewallRulesDeleteInput,
  outputSchema: FirewallRulesDeleteOutput,
}));
// Input Schema
export const FirewallRulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  firewallRuleName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/firewallRules/{firewallRuleName}",
  }),
);
export type FirewallRulesGetInput = typeof FirewallRulesGetInput.Type;

// Output Schema
export const FirewallRulesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type FirewallRulesGetOutput = typeof FirewallRulesGetOutput.Type;

// The operation
/**
 * Gets information about a server firewall rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param firewallRuleName - The name of the server firewall rule.
 */
export const FirewallRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirewallRulesGetInput,
  outputSchema: FirewallRulesGetOutput,
}));
// Input Schema
export const FirewallRulesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/firewallRules",
    }),
  );
export type FirewallRulesListByServerInput =
  typeof FirewallRulesListByServerInput.Type;

// Output Schema
export const FirewallRulesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type FirewallRulesListByServerOutput =
  typeof FirewallRulesListByServerOutput.Type;

// The operation
/**
 * List all the firewall rules in a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const FirewallRulesListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FirewallRulesListByServerInput,
    outputSchema: FirewallRulesListByServerOutput,
  }),
);
// Input Schema
export const GetPrivateDnsZoneSuffixExecuteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.DBforMySQL/getPrivateDnsZoneSuffix",
    }),
  );
export type GetPrivateDnsZoneSuffixExecuteInput =
  typeof GetPrivateDnsZoneSuffixExecuteInput.Type;

// Output Schema
export const GetPrivateDnsZoneSuffixExecuteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    privateDnsZoneSuffix: Schema.optional(Schema.String),
  });
export type GetPrivateDnsZoneSuffixExecuteOutput =
  typeof GetPrivateDnsZoneSuffixExecuteOutput.Type;

// The operation
/**
 * Get private DNS zone suffix in the cloud.
 *
 * @param api-version - The API version to use for this operation.
 */
export const GetPrivateDnsZoneSuffixExecute =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetPrivateDnsZoneSuffixExecuteInput,
    outputSchema: GetPrivateDnsZoneSuffixExecuteOutput,
  }));
// Input Schema
export const LocationBasedCapabilitiesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/capabilities",
    }),
  );
export type LocationBasedCapabilitiesListInput =
  typeof LocationBasedCapabilitiesListInput.Type;

// Output Schema
export const LocationBasedCapabilitiesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          zone: Schema.optional(Schema.String),
          supportedHAMode: Schema.optional(Schema.Array(Schema.String)),
          supportedGeoBackupRegions: Schema.optional(
            Schema.Array(Schema.String),
          ),
          supportedFlexibleServerEditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                supportedStorageEditions: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      minStorageSize: Schema.optional(Schema.Number),
                      maxStorageSize: Schema.optional(Schema.Number),
                      minBackupRetentionDays: Schema.optional(Schema.Number),
                      maxBackupRetentionDays: Schema.optional(Schema.Number),
                      minBackupIntervalHours: Schema.optional(Schema.Number),
                      maxBackupIntervalHours: Schema.optional(Schema.Number),
                    }),
                  ),
                ),
                supportedServerVersions: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      supportedSkus: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            vCores: Schema.optional(Schema.Number),
                            supportedIops: Schema.optional(Schema.Number),
                            supportedMemoryPerVCoreMB: Schema.optional(
                              Schema.Number,
                            ),
                          }),
                        ),
                      ),
                    }),
                  ),
                ),
              }),
            ),
          ),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type LocationBasedCapabilitiesListOutput =
  typeof LocationBasedCapabilitiesListOutput.Type;

// The operation
/**
 * Get capabilities at specified location in a given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LocationBasedCapabilitiesList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LocationBasedCapabilitiesListInput,
    outputSchema: LocationBasedCapabilitiesListOutput,
  }));
// Input Schema
export const LocationBasedCapabilitySetGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    capabilitySetName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/capabilitySets/{capabilitySetName}",
    }),
  );
export type LocationBasedCapabilitySetGetInput =
  typeof LocationBasedCapabilitySetGetInput.Type;

// Output Schema
export const LocationBasedCapabilitySetGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LocationBasedCapabilitySetGetOutput =
  typeof LocationBasedCapabilitySetGetOutput.Type;

// The operation
/**
 * Get capabilities at specified location in a given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param capabilitySetName - Name of capability set
 */
export const LocationBasedCapabilitySetGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LocationBasedCapabilitySetGetInput,
    outputSchema: LocationBasedCapabilitySetGetOutput,
  }));
// Input Schema
export const LocationBasedCapabilitySetListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/capabilitySets",
    }),
  );
export type LocationBasedCapabilitySetListInput =
  typeof LocationBasedCapabilitySetListInput.Type;

// Output Schema
export const LocationBasedCapabilitySetListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LocationBasedCapabilitySetListOutput =
  typeof LocationBasedCapabilitySetListOutput.Type;

// The operation
/**
 * Get capabilities at specified location in a given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const LocationBasedCapabilitySetList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LocationBasedCapabilitySetListInput,
    outputSchema: LocationBasedCapabilitySetListOutput,
  }));
// Input Schema
export const LogFilesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/logFiles",
    }),
  );
export type LogFilesListByServerInput = typeof LogFilesListByServerInput.Type;

// Output Schema
export const LogFilesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LogFilesListByServerOutput = typeof LogFilesListByServerOutput.Type;

// The operation
/**
 * List all the server log files in a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const LogFilesListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LogFilesListByServerInput,
    outputSchema: LogFilesListByServerOutput,
  }),
);
// Input Schema
export const LongRunningBackupCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backupsV2/{backupName}",
    }),
  );
export type LongRunningBackupCreateInput =
  typeof LongRunningBackupCreateInput.Type;

// Output Schema
export const LongRunningBackupCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongRunningBackupCreateOutput =
  typeof LongRunningBackupCreateOutput.Type;

// The operation
/**
 * Create backup for a given server with specified backup name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param backupName - The name of the backup.
 */
export const LongRunningBackupCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LongRunningBackupCreateInput,
    outputSchema: LongRunningBackupCreateOutput,
  }),
);
// Input Schema
export const LongRunningBackupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backupsV2/{backupName}",
    }),
  );
export type LongRunningBackupsGetInput = typeof LongRunningBackupsGetInput.Type;

// Output Schema
export const LongRunningBackupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongRunningBackupsGetOutput =
  typeof LongRunningBackupsGetOutput.Type;

// The operation
/**
 * Get backup for a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param backupName - The name of the backup.
 */
export const LongRunningBackupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LongRunningBackupsGetInput,
    outputSchema: LongRunningBackupsGetOutput,
  }),
);
// Input Schema
export const LongRunningBackupsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backupsV2",
    }),
  );
export type LongRunningBackupsListInput =
  typeof LongRunningBackupsListInput.Type;

// Output Schema
export const LongRunningBackupsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongRunningBackupsListOutput =
  typeof LongRunningBackupsListOutput.Type;

// The operation
/**
 * List all the backups for a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const LongRunningBackupsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LongRunningBackupsListInput,
    outputSchema: LongRunningBackupsListOutput,
  }),
);
// Input Schema
export const MaintenancesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/maintenances",
  }),
);
export type MaintenancesListInput = typeof MaintenancesListInput.Type;

// Output Schema
export const MaintenancesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  },
);
export type MaintenancesListOutput = typeof MaintenancesListOutput.Type;

// The operation
/**
 * List maintenances.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const MaintenancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MaintenancesListInput,
  outputSchema: MaintenancesListOutput,
}));
// Input Schema
export const MaintenancesReadInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  maintenanceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/maintenances/{maintenanceName}",
  }),
);
export type MaintenancesReadInput = typeof MaintenancesReadInput.Type;

// Output Schema
export const MaintenancesReadOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type MaintenancesReadOutput = typeof MaintenancesReadOutput.Type;

// The operation
/**
 * Read maintenance.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param maintenanceName - The name of the maintenance.
 */
export const MaintenancesRead = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MaintenancesReadInput,
  outputSchema: MaintenancesReadOutput,
}));
// Input Schema
export const MaintenancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    maintenanceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/maintenances/{maintenanceName}",
    }),
  );
export type MaintenancesUpdateInput = typeof MaintenancesUpdateInput.Type;

// Output Schema
export const MaintenancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenancesUpdateOutput = typeof MaintenancesUpdateOutput.Type;

// The operation
/**
 * Update maintenances.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param maintenanceName - The name of the maintenance.
 */
export const MaintenancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MaintenancesUpdateInput,
  outputSchema: MaintenancesUpdateOutput,
}));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.DBforMySQL/operations" }),
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
        origin: Schema.optional(
          Schema.Literals(["user", "system", "user,system"]),
        ),
        properties: Schema.optional(
          Schema.Record(Schema.String, Schema.Unknown),
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
export const PrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes a private endpoint connection with a given name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param privateEndpointConnectionName - The name of the private endpoint connection associated with the Azure resource.
 */
export const PrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsDeleteInput,
    outputSchema: PrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const ReplicasListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/replicas",
    }),
  );
export type ReplicasListByServerInput = typeof ReplicasListByServerInput.Type;

// Output Schema
export const ReplicasListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ReplicasListByServerOutput = typeof ReplicasListByServerOutput.Type;

// The operation
/**
 * List all the replicas for a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ReplicasListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicasListByServerInput,
    outputSchema: ReplicasListByServerOutput,
  }),
);
// Input Schema
export const ServerKeysCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    keyName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/servers/{serverName}/keys/{keyName}",
    }),
  );
export type ServerKeysCreateOrUpdateInput =
  typeof ServerKeysCreateOrUpdateInput.Type;

// Output Schema
export const ServerKeysCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerKeysCreateOrUpdateOutput =
  typeof ServerKeysCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a MySQL Server key.
 *
 * @param keyName - The name of the MySQL Server key to be operated on (updated or created).
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ServerKeysCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerKeysCreateOrUpdateInput,
    outputSchema: ServerKeysCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServerKeysDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  keyName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/servers/{serverName}/keys/{keyName}",
  }),
);
export type ServerKeysDeleteInput = typeof ServerKeysDeleteInput.Type;

// Output Schema
export const ServerKeysDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerKeysDeleteOutput = typeof ServerKeysDeleteOutput.Type;

// The operation
/**
 * Deletes the MySQL Server key with the given name.
 *
 * @param keyName - The name of the MySQL Server key to be deleted.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ServerKeysDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServerKeysDeleteInput,
  outputSchema: ServerKeysDeleteOutput,
}));
// Input Schema
export const ServerKeysGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  keyName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/servers/{serverName}/keys/{keyName}",
  }),
);
export type ServerKeysGetInput = typeof ServerKeysGetInput.Type;

// Output Schema
export const ServerKeysGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type ServerKeysGetOutput = typeof ServerKeysGetOutput.Type;

// The operation
/**
 * Gets a MySQL Server key.
 *
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param keyName - The name of the MySQL Server key to be retrieved.
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 */
export const ServerKeysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServerKeysGetInput,
  outputSchema: ServerKeysGetOutput,
}));
// Input Schema
export const ServerKeysListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/servers/{serverName}/keys",
  }),
);
export type ServerKeysListInput = typeof ServerKeysListInput.Type;

// Output Schema
export const ServerKeysListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type ServerKeysListOutput = typeof ServerKeysListOutput.Type;

// The operation
/**
 * Gets a list of  Server keys.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ServerKeysList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServerKeysListInput,
  outputSchema: ServerKeysListOutput,
}));
// Input Schema
export const ServersCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}",
  }),
);
export type ServersCreateInput = typeof ServersCreateInput.Type;

// Output Schema
export const ServersCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServersCreateOutput = typeof ServersCreateOutput.Type;

// The operation
/**
 * Creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersCreateInput,
  outputSchema: ServersCreateOutput,
}));
// Input Schema
export const ServersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}",
  }),
);
export type ServersDeleteInput = typeof ServersDeleteInput.Type;

// Output Schema
export const ServersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersDeleteOutput = typeof ServersDeleteOutput.Type;

// The operation
/**
 * Deletes a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersDeleteInput,
  outputSchema: ServersDeleteOutput,
}));
// Input Schema
export const ServersDetachVNetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/detachVNet",
  }),
);
export type ServersDetachVNetInput = typeof ServersDetachVNetInput.Type;

// Output Schema
export const ServersDetachVNetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServersDetachVNetOutput = typeof ServersDetachVNetOutput.Type;

// The operation
/**
 * Detach VNet on a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersDetachVNet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersDetachVNetInput,
  outputSchema: ServersDetachVNetOutput,
}));
// Input Schema
export const ServersFailoverInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/failover",
  }),
);
export type ServersFailoverInput = typeof ServersFailoverInput.Type;

// Output Schema
export const ServersFailoverOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersFailoverOutput = typeof ServersFailoverOutput.Type;

// The operation
/**
 * Manual failover a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersFailover = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersFailoverInput,
  outputSchema: ServersFailoverOutput,
}));
// Input Schema
export const ServersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}",
  }),
);
export type ServersGetInput = typeof ServersGetInput.Type;

// Output Schema
export const ServersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServersGetOutput = typeof ServersGetOutput.Type;

// The operation
/**
 * Gets information about a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersGetInput,
  outputSchema: ServersGetOutput,
}));
// Input Schema
export const ServersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/flexibleServers",
  }),
);
export type ServersListInput = typeof ServersListInput.Type;

// Output Schema
export const ServersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(
    Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type ServersListOutput = typeof ServersListOutput.Type;

// The operation
/**
 * List all the servers in a given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ServersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersListInput,
  outputSchema: ServersListOutput,
}));
// Input Schema
export const ServersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers",
    }),
  );
export type ServersListByResourceGroupInput =
  typeof ServersListByResourceGroupInput.Type;

// Output Schema
export const ServersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
          location: Schema.String,
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServersListByResourceGroupOutput =
  typeof ServersListByResourceGroupOutput.Type;

// The operation
/**
 * List all the servers in a given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ServersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersListByResourceGroupInput,
    outputSchema: ServersListByResourceGroupOutput,
  }),
);
// Input Schema
export const ServersMigrationCutoverMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/cutoverMigration",
    }),
  );
export type ServersMigrationCutoverMigrationInput =
  typeof ServersMigrationCutoverMigrationInput.Type;

// Output Schema
export const ServersMigrationCutoverMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  });
export type ServersMigrationCutoverMigrationOutput =
  typeof ServersMigrationCutoverMigrationOutput.Type;

// The operation
/**
 * Cutover migration for MySQL import, it will switch source elastic server DNS to flexible server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersMigrationCutoverMigration =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServersMigrationCutoverMigrationInput,
    outputSchema: ServersMigrationCutoverMigrationOutput,
  }));
// Input Schema
export const ServersResetGtidInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/resetGtid",
  }),
);
export type ServersResetGtidInput = typeof ServersResetGtidInput.Type;

// Output Schema
export const ServersResetGtidOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersResetGtidOutput = typeof ServersResetGtidOutput.Type;

// The operation
/**
 * Resets GTID on a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersResetGtid = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersResetGtidInput,
  outputSchema: ServersResetGtidOutput,
}));
// Input Schema
export const ServersRestartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/restart",
  }),
);
export type ServersRestartInput = typeof ServersRestartInput.Type;

// Output Schema
export const ServersRestartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersRestartOutput = typeof ServersRestartOutput.Type;

// The operation
/**
 * Restarts a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersRestart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersRestartInput,
  outputSchema: ServersRestartOutput,
}));
// Input Schema
export const ServersStartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/start",
  }),
);
export type ServersStartInput = typeof ServersStartInput.Type;

// Output Schema
export const ServersStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersStartOutput = typeof ServersStartOutput.Type;

// The operation
/**
 * Starts a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersStart = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersStartInput,
  outputSchema: ServersStartOutput,
}));
// Input Schema
export const ServersStopInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/stop",
  }),
);
export type ServersStopInput = typeof ServersStopInput.Type;

// Output Schema
export const ServersStopOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersStopOutput = typeof ServersStopOutput.Type;

// The operation
/**
 * Stops a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersStop = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersStopInput,
  outputSchema: ServersStopOutput,
}));
// Input Schema
export const ServersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}",
  }),
);
export type ServersUpdateInput = typeof ServersUpdateInput.Type;

// Output Schema
export const ServersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type ServersUpdateOutput = typeof ServersUpdateOutput.Type;

// The operation
/**
 * Updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersUpdateInput,
  outputSchema: ServersUpdateOutput,
}));
// Input Schema
export const ServersUpgradeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/servers/{serverName}/upgrade",
  }),
);
export type ServersUpgradeInput = typeof ServersUpgradeInput.Type;

// Output Schema
export const ServersUpgradeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersUpgradeOutput = typeof ServersUpgradeOutput.Type;

// The operation
/**
 * Upgrade server version.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 */
export const ServersUpgrade = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersUpgradeInput,
  outputSchema: ServersUpgradeOutput,
}));
// Input Schema
export const ServersValidateEstimateHighAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/validateEstimateHighAvailability",
    }),
  );
export type ServersValidateEstimateHighAvailabilityInput =
  typeof ServersValidateEstimateHighAvailabilityInput.Type;

// Output Schema
export const ServersValidateEstimateHighAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    estimatedDowntime: Schema.optional(Schema.Number),
    scheduledStandbyAvailabilityZone: Schema.optional(Schema.String),
    expectedStandbyAvailabilityZone: Schema.optional(Schema.String),
  });
export type ServersValidateEstimateHighAvailabilityOutput =
  typeof ServersValidateEstimateHighAvailabilityOutput.Type;

// The operation
/**
 * Validate a deployment of high availability.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersValidateEstimateHighAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServersValidateEstimateHighAvailabilityInput,
    outputSchema: ServersValidateEstimateHighAvailabilityOutput,
  }));
