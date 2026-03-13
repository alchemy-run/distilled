/**
 * Azure Postgresql API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AdministratorsMicrosoftEntraCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    objectId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/administrators/{objectId}",
    }),
  );
export type AdministratorsMicrosoftEntraCreateOrUpdateInput =
  typeof AdministratorsMicrosoftEntraCreateOrUpdateInput.Type;

// Output Schema
export const AdministratorsMicrosoftEntraCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AdministratorsMicrosoftEntraCreateOrUpdateOutput =
  typeof AdministratorsMicrosoftEntraCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new server administrator associated to a Microsoft Entra principal.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param objectId - Object identifier of the Microsoft Entra principal.
 */
export const AdministratorsMicrosoftEntraCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdministratorsMicrosoftEntraCreateOrUpdateInput,
    outputSchema: AdministratorsMicrosoftEntraCreateOrUpdateOutput,
  }));
// Input Schema
export const AdministratorsMicrosoftEntraDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    objectId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/administrators/{objectId}",
    }),
  );
export type AdministratorsMicrosoftEntraDeleteInput =
  typeof AdministratorsMicrosoftEntraDeleteInput.Type;

// Output Schema
export const AdministratorsMicrosoftEntraDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AdministratorsMicrosoftEntraDeleteOutput =
  typeof AdministratorsMicrosoftEntraDeleteOutput.Type;

// The operation
/**
 * Deletes an existing server administrator associated to a Microsoft Entra principal.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param objectId - Object identifier of the Microsoft Entra principal.
 */
export const AdministratorsMicrosoftEntraDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdministratorsMicrosoftEntraDeleteInput,
    outputSchema: AdministratorsMicrosoftEntraDeleteOutput,
  }));
// Input Schema
export const AdministratorsMicrosoftEntraGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    objectId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/administrators/{objectId}",
    }),
  );
export type AdministratorsMicrosoftEntraGetInput =
  typeof AdministratorsMicrosoftEntraGetInput.Type;

// Output Schema
export const AdministratorsMicrosoftEntraGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type AdministratorsMicrosoftEntraGetOutput =
  typeof AdministratorsMicrosoftEntraGetOutput.Type;

// The operation
/**
 * Gets information about a server administrator associated to a Microsoft Entra principal.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param objectId - Object identifier of the Microsoft Entra principal.
 */
export const AdministratorsMicrosoftEntraGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdministratorsMicrosoftEntraGetInput,
    outputSchema: AdministratorsMicrosoftEntraGetOutput,
  }));
// Input Schema
export const AdministratorsMicrosoftEntraListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/administrators",
    }),
  );
export type AdministratorsMicrosoftEntraListByServerInput =
  typeof AdministratorsMicrosoftEntraListByServerInput.Type;

// Output Schema
export const AdministratorsMicrosoftEntraListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AdministratorsMicrosoftEntraListByServerOutput =
  typeof AdministratorsMicrosoftEntraListByServerOutput.Type;

// The operation
/**
 * List all server administrators associated to a Microsoft Entra principal.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const AdministratorsMicrosoftEntraListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdministratorsMicrosoftEntraListByServerInput,
    outputSchema: AdministratorsMicrosoftEntraListByServerOutput,
  }));
// Input Schema
export const AdvancedThreatProtectionSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    threatProtectionName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{threatProtectionName}",
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
 * Gets state of advanced threat protection settings for a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param threatProtectionName - Name of the advanced threat protection settings.
 */
export const AdvancedThreatProtectionSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdvancedThreatProtectionSettingsGetInput,
    outputSchema: AdvancedThreatProtectionSettingsGetOutput,
  }));
// Input Schema
export const AdvancedThreatProtectionSettingsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/advancedThreatProtectionSettings",
    }),
  );
export type AdvancedThreatProtectionSettingsListByServerInput =
  typeof AdvancedThreatProtectionSettingsListByServerInput.Type;

// Output Schema
export const AdvancedThreatProtectionSettingsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type AdvancedThreatProtectionSettingsListByServerOutput =
  typeof AdvancedThreatProtectionSettingsListByServerOutput.Type;

// The operation
/**
 * Lists state of advanced threat protection settings for a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const AdvancedThreatProtectionSettingsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AdvancedThreatProtectionSettingsListByServerInput,
    outputSchema: AdvancedThreatProtectionSettingsListByServerOutput,
  }));
// Input Schema
export const BackupsAutomaticAndOnDemandCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/backups/{backupName}",
    }),
  );
export type BackupsAutomaticAndOnDemandCreateInput =
  typeof BackupsAutomaticAndOnDemandCreateInput.Type;

// Output Schema
export const BackupsAutomaticAndOnDemandCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupsAutomaticAndOnDemandCreateOutput =
  typeof BackupsAutomaticAndOnDemandCreateOutput.Type;

// The operation
/**
 * Creates an on demand backup of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param backupName - Name of the backup.
 */
export const BackupsAutomaticAndOnDemandCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsAutomaticAndOnDemandCreateInput,
    outputSchema: BackupsAutomaticAndOnDemandCreateOutput,
  }));
// Input Schema
export const BackupsAutomaticAndOnDemandDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/backups/{backupName}",
    }),
  );
export type BackupsAutomaticAndOnDemandDeleteInput =
  typeof BackupsAutomaticAndOnDemandDeleteInput.Type;

// Output Schema
export const BackupsAutomaticAndOnDemandDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type BackupsAutomaticAndOnDemandDeleteOutput =
  typeof BackupsAutomaticAndOnDemandDeleteOutput.Type;

// The operation
/**
 * Deletes a specific backup, given its name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param backupName - Name of the backup.
 */
export const BackupsAutomaticAndOnDemandDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsAutomaticAndOnDemandDeleteInput,
    outputSchema: BackupsAutomaticAndOnDemandDeleteOutput,
  }));
// Input Schema
export const BackupsAutomaticAndOnDemandGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/backups/{backupName}",
    }),
  );
export type BackupsAutomaticAndOnDemandGetInput =
  typeof BackupsAutomaticAndOnDemandGetInput.Type;

// Output Schema
export const BackupsAutomaticAndOnDemandGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupsAutomaticAndOnDemandGetOutput =
  typeof BackupsAutomaticAndOnDemandGetOutput.Type;

// The operation
/**
 * Gets information of an on demand backup, given its name.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param backupName - Name of the backup.
 */
export const BackupsAutomaticAndOnDemandGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsAutomaticAndOnDemandGetInput,
    outputSchema: BackupsAutomaticAndOnDemandGetOutput,
  }));
// Input Schema
export const BackupsAutomaticAndOnDemandListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/backups",
    }),
  );
export type BackupsAutomaticAndOnDemandListByServerInput =
  typeof BackupsAutomaticAndOnDemandListByServerInput.Type;

// Output Schema
export const BackupsAutomaticAndOnDemandListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type BackupsAutomaticAndOnDemandListByServerOutput =
  typeof BackupsAutomaticAndOnDemandListByServerOutput.Type;

// The operation
/**
 * Lists all available backups of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const BackupsAutomaticAndOnDemandListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsAutomaticAndOnDemandListByServerInput,
    outputSchema: BackupsAutomaticAndOnDemandListByServerOutput,
  }));
// Input Schema
export const BackupsLongTermRetentionCheckPrerequisitesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/ltrPreBackup",
    }),
  );
export type BackupsLongTermRetentionCheckPrerequisitesInput =
  typeof BackupsLongTermRetentionCheckPrerequisitesInput.Type;

// Output Schema
export const BackupsLongTermRetentionCheckPrerequisitesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.Struct({
      numberOfContainers: Schema.Number,
    }),
  });
export type BackupsLongTermRetentionCheckPrerequisitesOutput =
  typeof BackupsLongTermRetentionCheckPrerequisitesOutput.Type;

// The operation
/**
 * Performs all checks required for a long term retention backup operation to succeed.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const BackupsLongTermRetentionCheckPrerequisites =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsLongTermRetentionCheckPrerequisitesInput,
    outputSchema: BackupsLongTermRetentionCheckPrerequisitesOutput,
  }));
// Input Schema
export const BackupsLongTermRetentionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/ltrBackupOperations/{backupName}",
    }),
  );
export type BackupsLongTermRetentionGetInput =
  typeof BackupsLongTermRetentionGetInput.Type;

// Output Schema
export const BackupsLongTermRetentionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupsLongTermRetentionGetOutput =
  typeof BackupsLongTermRetentionGetOutput.Type;

// The operation
/**
 * Gets the results of a long retention backup operation for a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param backupName - The name of the backup.
 */
export const BackupsLongTermRetentionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: BackupsLongTermRetentionGetInput,
    outputSchema: BackupsLongTermRetentionGetOutput,
  }),
);
// Input Schema
export const BackupsLongTermRetentionListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/ltrBackupOperations",
    }),
  );
export type BackupsLongTermRetentionListByServerInput =
  typeof BackupsLongTermRetentionListByServerInput.Type;

// Output Schema
export const BackupsLongTermRetentionListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type BackupsLongTermRetentionListByServerOutput =
  typeof BackupsLongTermRetentionListByServerOutput.Type;

// The operation
/**
 * Lists the results of the long term retention backup operations for a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const BackupsLongTermRetentionListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsLongTermRetentionListByServerInput,
    outputSchema: BackupsLongTermRetentionListByServerOutput,
  }));
// Input Schema
export const BackupsLongTermRetentionStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/startLtrBackup",
    }),
  );
export type BackupsLongTermRetentionStartInput =
  typeof BackupsLongTermRetentionStartInput.Type;

// Output Schema
export const BackupsLongTermRetentionStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    properties: Schema.optional(
      Schema.Struct({
        datasourceSizeInBytes: Schema.optional(Schema.Number),
        dataTransferredInBytes: Schema.optional(Schema.Number),
        backupName: Schema.optional(Schema.String),
        backupMetadata: Schema.optional(Schema.String),
        status: Schema.Literals([
          "Running",
          "Cancelled",
          "Failed",
          "Succeeded",
        ]),
        startTime: Schema.String,
        endTime: Schema.optional(Schema.String),
        percentComplete: Schema.optional(Schema.Number),
        errorCode: Schema.optional(Schema.String),
        errorMessage: Schema.optional(Schema.String),
      }),
    ),
  });
export type BackupsLongTermRetentionStartOutput =
  typeof BackupsLongTermRetentionStartOutput.Type;

// The operation
/**
 * Initiates a long term retention backup.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const BackupsLongTermRetentionStart =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupsLongTermRetentionStartInput,
    outputSchema: BackupsLongTermRetentionStartOutput,
  }));
// Input Schema
export const CapabilitiesByLocationListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/locations/{locationName}/capabilities",
    }),
  );
export type CapabilitiesByLocationListInput =
  typeof CapabilitiesByLocationListInput.Type;

// Output Schema
export const CapabilitiesByLocationListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        status: Schema.optional(
          Schema.Literals(["Visible", "Available", "Default", "Disabled"]),
        ),
        reason: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CapabilitiesByLocationListOutput =
  typeof CapabilitiesByLocationListOutput.Type;

// The operation
/**
 * Lists the capabilities available in a given location for a specific subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationName - The name of the location.
 */
export const CapabilitiesByLocationList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CapabilitiesByLocationListInput,
    outputSchema: CapabilitiesByLocationListOutput,
  }),
);
// Input Schema
export const CapabilitiesByServerListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/capabilities",
    }),
  );
export type CapabilitiesByServerListInput =
  typeof CapabilitiesByServerListInput.Type;

// Output Schema
export const CapabilitiesByServerListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        status: Schema.optional(
          Schema.Literals(["Visible", "Available", "Default", "Disabled"]),
        ),
        reason: Schema.optional(Schema.String),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type CapabilitiesByServerListOutput =
  typeof CapabilitiesByServerListOutput.Type;

// The operation
/**
 * Lists the capabilities available for a given server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const CapabilitiesByServerList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CapabilitiesByServerListInput,
    outputSchema: CapabilitiesByServerListOutput,
  }),
);
// Input Schema
export const CapturedLogsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/logFiles",
    }),
  );
export type CapturedLogsListByServerInput =
  typeof CapturedLogsListByServerInput.Type;

// Output Schema
export const CapturedLogsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type CapturedLogsListByServerOutput =
  typeof CapturedLogsListByServerOutput.Type;

// The operation
/**
 * Lists all captured logs for download in a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const CapturedLogsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CapturedLogsListByServerInput,
    outputSchema: CapturedLogsListByServerOutput,
  }),
);
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/configurations/{configurationName}",
  }),
);
export type ConfigurationsGetInput = typeof ConfigurationsGetInput.Type;

// Output Schema
export const ConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ConfigurationsGetOutput = typeof ConfigurationsGetOutput.Type;

// The operation
/**
 * Gets information about a specific configuration (also known as server parameter) of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param configurationName - Name of the configuration (also known as server parameter).
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
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/configurations",
    }),
  );
export type ConfigurationsListByServerInput =
  typeof ConfigurationsListByServerInput.Type;

// Output Schema
export const ConfigurationsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type ConfigurationsListByServerOutput =
  typeof ConfigurationsListByServerOutput.Type;

// The operation
/**
 * Lists all configurations (also known as server parameters) of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ConfigurationsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationsListByServerInput,
    outputSchema: ConfigurationsListByServerOutput,
  }),
);
// Input Schema
export const ConfigurationsPutInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    configurationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/configurations/{configurationName}",
  }),
);
export type ConfigurationsPutInput = typeof ConfigurationsPutInput.Type;

// Output Schema
export const ConfigurationsPutOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationsPutOutput = typeof ConfigurationsPutOutput.Type;

// The operation
/**
 * Updates, using Put verb, the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param configurationName - Name of the configuration (also known as server parameter).
 */
export const ConfigurationsPut = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ConfigurationsPutInput,
  outputSchema: ConfigurationsPutOutput,
}));
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/configurations/{configurationName}",
    }),
  );
export type ConfigurationsUpdateInput = typeof ConfigurationsUpdateInput.Type;

// Output Schema
export const ConfigurationsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ConfigurationsUpdateOutput = typeof ConfigurationsUpdateOutput.Type;

// The operation
/**
 * Updates the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param configurationName - Name of the configuration (also known as server parameter).
 */
export const ConfigurationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ConfigurationsUpdateInput,
    outputSchema: ConfigurationsUpdateOutput,
  }),
);
// Input Schema
export const DatabasesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/databases/{databaseName}",
  }),
);
export type DatabasesCreateInput = typeof DatabasesCreateInput.Type;

// Output Schema
export const DatabasesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesCreateOutput = typeof DatabasesCreateOutput.Type;

// The operation
/**
 * Creates a new database.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param databaseName - Name of the database (case-sensitive). Exact database names can be retrieved by getting the list of all existing databases in a server.
 */
export const DatabasesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesCreateInput,
  outputSchema: DatabasesCreateOutput,
}));
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/databases/{databaseName}",
  }),
);
export type DatabasesDeleteInput = typeof DatabasesDeleteInput.Type;

// Output Schema
export const DatabasesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesDeleteOutput = typeof DatabasesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing database.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param databaseName - Name of the database (case-sensitive). Exact database names can be retrieved by getting the list of all existing databases in a server.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/databases/{databaseName}",
  }),
);
export type DatabasesGetInput = typeof DatabasesGetInput.Type;

// Output Schema
export const DatabasesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabasesGetOutput = typeof DatabasesGetOutput.Type;

// The operation
/**
 * Gets information about an existing database.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param databaseName - Name of the database (case-sensitive). Exact database names can be retrieved by getting the list of all existing databases in a server.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/databases",
    }),
  );
export type DatabasesListByServerInput = typeof DatabasesListByServerInput.Type;

// Output Schema
export const DatabasesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabasesListByServerOutput =
  typeof DatabasesListByServerOutput.Type;

// The operation
/**
 * Lists all databases in a server.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesCreateOrUpdateInput =
  typeof FirewallRulesCreateOrUpdateInput.Type;

// Output Schema
export const FirewallRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
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
 * @param firewallRuleName - Name of the firewall rule.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/firewallRules/{firewallRuleName}",
    }),
  );
export type FirewallRulesDeleteInput = typeof FirewallRulesDeleteInput.Type;

// Output Schema
export const FirewallRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FirewallRulesDeleteOutput = typeof FirewallRulesDeleteOutput.Type;

// The operation
/**
 * Deletes an existing firewall rule.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param firewallRuleName - Name of the firewall rule.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/firewallRules/{firewallRuleName}",
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
 * Gets information about a firewall rule in a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param firewallRuleName - Name of the firewall rule.
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/firewallRules",
    }),
  );
export type FirewallRulesListByServerInput =
  typeof FirewallRulesListByServerInput.Type;

// Output Schema
export const FirewallRulesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type FirewallRulesListByServerOutput =
  typeof FirewallRulesListByServerOutput.Type;

// The operation
/**
 * Lists information about all firewall rules in a server.
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
export const MigrationsCancelInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  migrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations/{migrationName}",
  }),
);
export type MigrationsCancelInput = typeof MigrationsCancelInput.Type;

// Output Schema
export const MigrationsCancelOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type MigrationsCancelOutput = typeof MigrationsCancelOutput.Type;

// The operation
/**
 * Cancels an active migration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param migrationName - Name of migration.
 */
export const MigrationsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MigrationsCancelInput,
  outputSchema: MigrationsCancelOutput,
}));
// Input Schema
export const MigrationsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/checkMigrationNameAvailability",
    }),
  );
export type MigrationsCheckNameAvailabilityInput =
  typeof MigrationsCheckNameAvailabilityInput.Type;

// Output Schema
export const MigrationsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String,
    type: Schema.String,
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type MigrationsCheckNameAvailabilityOutput =
  typeof MigrationsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the validity and availability of the given name, to assign it to a new migration.
 *
 * Checks if a proposed migration name is valid and available.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const MigrationsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrationsCheckNameAvailabilityInput,
    outputSchema: MigrationsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const MigrationsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  migrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations/{migrationName}",
  }),
);
export type MigrationsCreateInput = typeof MigrationsCreateInput.Type;

// Output Schema
export const MigrationsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type MigrationsCreateOutput = typeof MigrationsCreateOutput.Type;

// The operation
/**
 * Creates a new migration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param migrationName - Name of migration.
 */
export const MigrationsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MigrationsCreateInput,
  outputSchema: MigrationsCreateOutput,
}));
// Input Schema
export const MigrationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  migrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations/{migrationName}",
  }),
);
export type MigrationsGetInput = typeof MigrationsGetInput.Type;

// Output Schema
export const MigrationsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type MigrationsGetOutput = typeof MigrationsGetOutput.Type;

// The operation
/**
 * Gets information about a migration.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param migrationName - Name of migration.
 */
export const MigrationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MigrationsGetInput,
  outputSchema: MigrationsGetOutput,
}));
// Input Schema
export const MigrationsListByTargetServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    migrationListFilter: Schema.optional(Schema.Literals(["Active", "All"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations",
    }),
  );
export type MigrationsListByTargetServerInput =
  typeof MigrationsListByTargetServerInput.Type;

// Output Schema
export const MigrationsListByTargetServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type MigrationsListByTargetServerOutput =
  typeof MigrationsListByTargetServerOutput.Type;

// The operation
/**
 * Lists all migrations of a target flexible server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param migrationListFilter - Migration list filter. Indicates if the request should retrieve only active migrations or all migrations. Defaults to Active.
 */
export const MigrationsListByTargetServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MigrationsListByTargetServerInput,
    outputSchema: MigrationsListByTargetServerOutput,
  }));
// Input Schema
export const MigrationsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  migrationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/migrations/{migrationName}",
  }),
);
export type MigrationsUpdateInput = typeof MigrationsUpdateInput.Type;

// Output Schema
export const MigrationsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type MigrationsUpdateOutput = typeof MigrationsUpdateOutput.Type;

// The operation
/**
 * Updates an existing migration. The request body can contain one to many of the mutable properties present in the migration definition. Certain property updates initiate migration state transitions.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param migrationName - Name of migration.
 */
export const MigrationsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MigrationsUpdateInput,
  outputSchema: MigrationsUpdateOutput,
}));
// Input Schema
export const NameAvailabilityCheckGloballyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/checkNameAvailability",
    }),
  );
export type NameAvailabilityCheckGloballyInput =
  typeof NameAvailabilityCheckGloballyInput.Type;

// Output Schema
export const NameAvailabilityCheckGloballyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type NameAvailabilityCheckGloballyOutput =
  typeof NameAvailabilityCheckGloballyOutput.Type;

// The operation
/**
 * Checks the validity and availability of the given name, to assign it to a new server or to use it as the base name of a new pair of virtual endpoints.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const NameAvailabilityCheckGlobally =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NameAvailabilityCheckGloballyInput,
    outputSchema: NameAvailabilityCheckGloballyOutput,
  }));
// Input Schema
export const NameAvailabilityCheckWithLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/locations/{locationName}/checkNameAvailability",
    }),
  );
export type NameAvailabilityCheckWithLocationInput =
  typeof NameAvailabilityCheckWithLocationInput.Type;

// Output Schema
export const NameAvailabilityCheckWithLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type NameAvailabilityCheckWithLocationOutput =
  typeof NameAvailabilityCheckWithLocationOutput.Type;

// The operation
/**
 * Check the availability of name for resource
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationName - The name of the location.
 * @param name - The name of the resource for which availability needs to be checked.
 * @param type - The resource type.
 */
export const NameAvailabilityCheckWithLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NameAvailabilityCheckWithLocationInput,
    outputSchema: NameAvailabilityCheckWithLocationOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.DBforPostgreSQL/operations",
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
          resource: Schema.optional(Schema.String),
          operation: Schema.optional(Schema.String),
          description: Schema.optional(Schema.String),
        }),
      ),
      isDataAction: Schema.optional(Schema.Boolean),
      origin: Schema.optional(
        Schema.Literals(["NotSpecified", "user", "system"]),
      ),
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
                    aggregationType: Schema.optional(Schema.String),
                    supportedAggregationTypes: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    supportedTimeGrainTypes: Schema.optional(
                      Schema.Array(Schema.String),
                    ),
                    category: Schema.optional(Schema.String),
                  }),
                ),
              ),
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
  nextLink: Schema.optional(Schema.String),
});
export type OperationsListOutput = typeof OperationsListOutput.Type;

// The operation
/**
 * Lists all available REST API operations.
 *
 * @param api-version - The API version to use for this operation.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const PrivateDnsZoneSuffixGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.DBforPostgreSQL/getPrivateDnsZoneSuffix",
    }),
  );
export type PrivateDnsZoneSuffixGetInput =
  typeof PrivateDnsZoneSuffixGetInput.Type;

// Output Schema
export const PrivateDnsZoneSuffixGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.String;
export type PrivateDnsZoneSuffixGetOutput =
  typeof PrivateDnsZoneSuffixGetOutput.Type;

// The operation
/**
 * Gets the private DNS zone suffix.
 *
 * @param api-version - The API version to use for this operation.
 */
export const PrivateDnsZoneSuffixGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateDnsZoneSuffixGetInput,
    outputSchema: PrivateDnsZoneSuffixGetOutput,
  }),
);
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Deletes a private endpoint connection.
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
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/privateLinkResources/{groupName}",
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
 * Gets a private link resource for PostgreSQL server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param groupName - The name of the private link resource.
 */
export const PrivateLinkResourcesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PrivateLinkResourcesGetInput,
    outputSchema: PrivateLinkResourcesGetOutput,
  }),
);
// Input Schema
export const PrivateLinkResourcesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByServerInput =
  typeof PrivateLinkResourcesListByServerInput.Type;

// Output Schema
export const PrivateLinkResourcesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListByServerOutput =
  typeof PrivateLinkResourcesListByServerOutput.Type;

// The operation
/**
 * Gets the private link resources for PostgreSQL server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const PrivateLinkResourcesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByServerInput,
    outputSchema: PrivateLinkResourcesListByServerOutput,
  }));
// Input Schema
export const QuotaUsagesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  locationName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/locations/{locationName}/resourceType/flexibleServers/usages",
  }),
);
export type QuotaUsagesListInput = typeof QuotaUsagesListInput.Type;

// Output Schema
export const QuotaUsagesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.Array(
    Schema.Struct({
      name: Schema.optional(
        Schema.Struct({
          value: Schema.optional(Schema.String),
          localizedValue: Schema.optional(Schema.String),
        }),
      ),
      limit: Schema.optional(Schema.Number),
      unit: Schema.optional(Schema.String),
      currentValue: Schema.optional(Schema.Number),
      id: Schema.optional(Schema.String),
    }),
  ),
  nextLink: Schema.optional(Schema.String),
});
export type QuotaUsagesListOutput = typeof QuotaUsagesListOutput.Type;

// The operation
/**
 * Get quota usages at specified location in a given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationName - The name of the location.
 */
export const QuotaUsagesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: QuotaUsagesListInput,
  outputSchema: QuotaUsagesListOutput,
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
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/replicas",
    }),
  );
export type ReplicasListByServerInput = typeof ReplicasListByServerInput.Type;

// Output Schema
export const ReplicasListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ReplicasListByServerOutput = typeof ReplicasListByServerOutput.Type;

// The operation
/**
 * Lists all read replicas of a server.
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
export const ServersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}",
    }),
  );
export type ServersCreateOrUpdateInput = typeof ServersCreateOrUpdateInput.Type;

// Output Schema
export const ServersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersCreateOrUpdateOutput =
  typeof ServersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const ServersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersCreateOrUpdateInput,
    outputSchema: ServersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}",
  }),
);
export type ServersDeleteInput = typeof ServersDeleteInput.Type;

// Output Schema
export const ServersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersDeleteOutput = typeof ServersDeleteOutput.Type;

// The operation
/**
 * Deletes or drops an existing server.
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
export const ServersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}",
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
 * Gets information about an existing server.
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
export const ServersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers",
    }),
  );
export type ServersListByResourceGroupInput =
  typeof ServersListByResourceGroupInput.Type;

// Output Schema
export const ServersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServersListByResourceGroupOutput =
  typeof ServersListByResourceGroupOutput.Type;

// The operation
/**
 * Lists all servers in a resource group.
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
export const ServersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/flexibleServers",
    }),
  );
export type ServersListBySubscriptionInput =
  typeof ServersListBySubscriptionInput.Type;

// Output Schema
export const ServersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServersListBySubscriptionOutput =
  typeof ServersListBySubscriptionOutput.Type;

// The operation
/**
 * Lists all servers in a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const ServersListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersListBySubscriptionInput,
    outputSchema: ServersListBySubscriptionOutput,
  }),
);
// Input Schema
export const ServersRestartInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/restart",
  }),
);
export type ServersRestartInput = typeof ServersRestartInput.Type;

// Output Schema
export const ServersRestartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersRestartOutput = typeof ServersRestartOutput.Type;

// The operation
/**
 * Restarts PostgreSQL database engine in a server.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/start",
  }),
);
export type ServersStartInput = typeof ServersStartInput.Type;

// Output Schema
export const ServersStartOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersStartOutput = typeof ServersStartOutput.Type;

// The operation
/**
 * Starts a stopped server.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/stop",
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}",
  }),
);
export type ServersUpdateInput = typeof ServersUpdateInput.Type;

// Output Schema
export const ServersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServersUpdateOutput = typeof ServersUpdateOutput.Type;

// The operation
/**
 * Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
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
export const ServerThreatProtectionSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    threatProtectionName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/advancedThreatProtectionSettings/{threatProtectionName}",
    }),
  );
export type ServerThreatProtectionSettingsCreateOrUpdateInput =
  typeof ServerThreatProtectionSettingsCreateOrUpdateInput.Type;

// Output Schema
export const ServerThreatProtectionSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerThreatProtectionSettingsCreateOrUpdateOutput =
  typeof ServerThreatProtectionSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a server's Advanced Threat Protection settings.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param threatProtectionName - Name of the advanced threat protection settings.
 */
export const ServerThreatProtectionSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerThreatProtectionSettingsCreateOrUpdateInput,
    outputSchema: ServerThreatProtectionSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const TuningOptionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  tuningOption: Schema.Literals(["index", "table"]).pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/tuningOptions/{tuningOption}",
  }),
);
export type TuningOptionsGetInput = typeof TuningOptionsGetInput.Type;

// Output Schema
export const TuningOptionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type TuningOptionsGetOutput = typeof TuningOptionsGetOutput.Type;

// The operation
/**
 * Gets the tuning options of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param tuningOption - The name of the tuning option.
 */
export const TuningOptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TuningOptionsGetInput,
  outputSchema: TuningOptionsGetOutput,
}));
// Input Schema
export const TuningOptionsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/tuningOptions",
    }),
  );
export type TuningOptionsListByServerInput =
  typeof TuningOptionsListByServerInput.Type;

// Output Schema
export const TuningOptionsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TuningOptionsListByServerOutput =
  typeof TuningOptionsListByServerOutput.Type;

// The operation
/**
 * Lists the tuning options of a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const TuningOptionsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TuningOptionsListByServerInput,
    outputSchema: TuningOptionsListByServerOutput,
  }),
);
// Input Schema
export const TuningOptionsListRecommendationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    tuningOption: Schema.Literals(["index", "table"]).pipe(T.PathParam()),
    "api-version": Schema.String,
    recommendationType: Schema.optional(
      Schema.Literals(["CreateIndex", "DropIndex", "ReIndex", "AnalyzeTable"]),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/tuningOptions/{tuningOption}/recommendations",
    }),
  );
export type TuningOptionsListRecommendationsInput =
  typeof TuningOptionsListRecommendationsInput.Type;

// Output Schema
export const TuningOptionsListRecommendationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type TuningOptionsListRecommendationsOutput =
  typeof TuningOptionsListRecommendationsOutput.Type;

// The operation
/**
 * Lists available object recommendations.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param tuningOption - The name of the tuning option.
 * @param recommendationType - Recommendations list filter. Retrieves recommendations based on type.
 */
export const TuningOptionsListRecommendations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TuningOptionsListRecommendationsInput,
    outputSchema: TuningOptionsListRecommendationsOutput,
  }));
// Input Schema
export const VirtualEndpointsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    virtualEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/virtualendpoints/{virtualEndpointName}",
    }),
  );
export type VirtualEndpointsCreateInput =
  typeof VirtualEndpointsCreateInput.Type;

// Output Schema
export const VirtualEndpointsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualEndpointsCreateOutput =
  typeof VirtualEndpointsCreateOutput.Type;

// The operation
/**
 * Creates a pair of virtual endpoints for a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param virtualEndpointName - Base name of the virtual endpoints.
 */
export const VirtualEndpointsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualEndpointsCreateInput,
    outputSchema: VirtualEndpointsCreateOutput,
  }),
);
// Input Schema
export const VirtualEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    virtualEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/virtualendpoints/{virtualEndpointName}",
    }),
  );
export type VirtualEndpointsDeleteInput =
  typeof VirtualEndpointsDeleteInput.Type;

// Output Schema
export const VirtualEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualEndpointsDeleteOutput =
  typeof VirtualEndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes a pair of virtual endpoints.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param virtualEndpointName - Base name of the virtual endpoints.
 */
export const VirtualEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualEndpointsDeleteInput,
    outputSchema: VirtualEndpointsDeleteOutput,
  }),
);
// Input Schema
export const VirtualEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    virtualEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/virtualendpoints/{virtualEndpointName}",
    }),
  );
export type VirtualEndpointsGetInput = typeof VirtualEndpointsGetInput.Type;

// Output Schema
export const VirtualEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualEndpointsGetOutput = typeof VirtualEndpointsGetOutput.Type;

// The operation
/**
 * Gets information about a pair of virtual endpoints.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param virtualEndpointName - Base name of the virtual endpoints.
 */
export const VirtualEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualEndpointsGetInput,
  outputSchema: VirtualEndpointsGetOutput,
}));
// Input Schema
export const VirtualEndpointsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/virtualendpoints",
    }),
  );
export type VirtualEndpointsListByServerInput =
  typeof VirtualEndpointsListByServerInput.Type;

// Output Schema
export const VirtualEndpointsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualEndpointsListByServerOutput =
  typeof VirtualEndpointsListByServerOutput.Type;

// The operation
/**
 * Lists pair of virtual endpoints associated to a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 */
export const VirtualEndpointsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualEndpointsListByServerInput,
    outputSchema: VirtualEndpointsListByServerOutput,
  }));
// Input Schema
export const VirtualEndpointsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    virtualEndpointName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/flexibleServers/{serverName}/virtualendpoints/{virtualEndpointName}",
    }),
  );
export type VirtualEndpointsUpdateInput =
  typeof VirtualEndpointsUpdateInput.Type;

// Output Schema
export const VirtualEndpointsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualEndpointsUpdateOutput =
  typeof VirtualEndpointsUpdateOutput.Type;

// The operation
/**
 * Updates a pair of virtual endpoints for a server.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param serverName - The name of the server.
 * @param virtualEndpointName - Base name of the virtual endpoints.
 */
export const VirtualEndpointsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualEndpointsUpdateInput,
    outputSchema: VirtualEndpointsUpdateOutput,
  }),
);
// Input Schema
export const VirtualNetworkSubnetUsageListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.DBforPostgreSQL/locations/{locationName}/checkVirtualNetworkSubnetUsage",
    }),
  );
export type VirtualNetworkSubnetUsageListInput =
  typeof VirtualNetworkSubnetUsageListInput.Type;

// Output Schema
export const VirtualNetworkSubnetUsageListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    delegatedSubnetsUsage: Schema.optional(
      Schema.Array(
        Schema.Struct({
          subnetName: Schema.optional(Schema.String),
          usage: Schema.optional(Schema.Number),
        }),
      ),
    ),
    location: Schema.optional(Schema.String),
    subscriptionId: Schema.optional(Schema.String),
  });
export type VirtualNetworkSubnetUsageListOutput =
  typeof VirtualNetworkSubnetUsageListOutput.Type;

// The operation
/**
 * Lists the virtual network subnet usage for a given virtual network.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param locationName - The name of the location.
 */
export const VirtualNetworkSubnetUsageList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualNetworkSubnetUsageListInput,
    outputSchema: VirtualNetworkSubnetUsageListOutput,
  }));
