/**
 * Azure Sql API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const BackupShortTermRetentionPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}",
    }),
  );
export type BackupShortTermRetentionPoliciesCreateOrUpdateInput =
  typeof BackupShortTermRetentionPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const BackupShortTermRetentionPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupShortTermRetentionPoliciesCreateOrUpdateOutput =
  typeof BackupShortTermRetentionPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates a database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be "default".
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const BackupShortTermRetentionPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupShortTermRetentionPoliciesCreateOrUpdateInput,
    outputSchema: BackupShortTermRetentionPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const BackupShortTermRetentionPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}",
    }),
  );
export type BackupShortTermRetentionPoliciesGetInput =
  typeof BackupShortTermRetentionPoliciesGetInput.Type;

// Output Schema
export const BackupShortTermRetentionPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupShortTermRetentionPoliciesGetOutput =
  typeof BackupShortTermRetentionPoliciesGetOutput.Type;

// The operation
/**
 * Gets a database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be "default".
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const BackupShortTermRetentionPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupShortTermRetentionPoliciesGetInput,
    outputSchema: BackupShortTermRetentionPoliciesGetOutput,
  }));
// Input Schema
export const BackupShortTermRetentionPoliciesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupShortTermRetentionPolicies",
    }),
  );
export type BackupShortTermRetentionPoliciesListByDatabaseInput =
  typeof BackupShortTermRetentionPoliciesListByDatabaseInput.Type;

// Output Schema
export const BackupShortTermRetentionPoliciesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type BackupShortTermRetentionPoliciesListByDatabaseOutput =
  typeof BackupShortTermRetentionPoliciesListByDatabaseOutput.Type;

// The operation
/**
 * Gets a database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const BackupShortTermRetentionPoliciesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupShortTermRetentionPoliciesListByDatabaseInput,
    outputSchema: BackupShortTermRetentionPoliciesListByDatabaseOutput,
  }));
// Input Schema
export const BackupShortTermRetentionPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}",
    }),
  );
export type BackupShortTermRetentionPoliciesUpdateInput =
  typeof BackupShortTermRetentionPoliciesUpdateInput.Type;

// Output Schema
export const BackupShortTermRetentionPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type BackupShortTermRetentionPoliciesUpdateOutput =
  typeof BackupShortTermRetentionPoliciesUpdateOutput.Type;

// The operation
/**
 * Updates a database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be "default".
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const BackupShortTermRetentionPoliciesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: BackupShortTermRetentionPoliciesUpdateInput,
    outputSchema: BackupShortTermRetentionPoliciesUpdateOutput,
  }));
// Input Schema
export const CapabilitiesListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    include: Schema.optional(
      Schema.Literals([
        "supportedEditions",
        "supportedElasticPoolEditions",
        "supportedManagedInstanceVersions",
        "supportedInstancePoolEditions",
        "supportedManagedInstanceEditions",
        "supportedJobAgentVersions",
      ]),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/capabilities",
    }),
  );
export type CapabilitiesListByLocationInput =
  typeof CapabilitiesListByLocationInput.Type;

// Output Schema
export const CapabilitiesListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    supportedServerVersions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          supportedEditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                supportedServiceLevelObjectives: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      id: Schema.optional(Schema.String),
                      name: Schema.optional(Schema.String),
                      supportedMaxSizes: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            minValue: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            maxValue: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            scaleSize: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            logSize: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                    "Percent",
                                  ]),
                                ),
                              }),
                            ),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      performanceLevel: Schema.optional(
                        Schema.Struct({
                          value: Schema.optional(Schema.Number),
                          unit: Schema.optional(
                            Schema.Literals(["DTU", "VCores"]),
                          ),
                        }),
                      ),
                      sku: Schema.optional(
                        Schema.Struct({
                          name: Schema.String,
                          tier: Schema.optional(Schema.String),
                          size: Schema.optional(Schema.String),
                          family: Schema.optional(Schema.String),
                          capacity: Schema.optional(Schema.Number),
                        }),
                      ),
                      supportedLicenseTypes: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      includedMaxSize: Schema.optional(
                        Schema.Struct({
                          limit: Schema.optional(Schema.Number),
                          unit: Schema.optional(
                            Schema.Literals([
                              "Megabytes",
                              "Gigabytes",
                              "Terabytes",
                              "Petabytes",
                            ]),
                          ),
                        }),
                      ),
                      zoneRedundant: Schema.optional(Schema.Boolean),
                      supportedAutoPauseDelay: Schema.optional(
                        Schema.Struct({
                          minValue: Schema.optional(Schema.Number),
                          maxValue: Schema.optional(Schema.Number),
                          stepSize: Schema.optional(Schema.Number),
                          default: Schema.optional(Schema.Number),
                          unit: Schema.optional(Schema.Literals(["Minutes"])),
                          doNotPauseValue: Schema.optional(Schema.Number),
                        }),
                      ),
                      supportedMinCapacities: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            value: Schema.optional(Schema.Number),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      computeModel: Schema.optional(Schema.String),
                      supportedMaintenanceConfigurations: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            zoneRedundant: Schema.optional(Schema.Boolean),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      zonePinning: Schema.optional(Schema.Boolean),
                      supportedZones: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            availabilityZone: Schema.optional(Schema.String),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      supportedFreeLimitExhaustionBehaviors: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            exhaustionBehaviorType: Schema.optional(
                              Schema.Literals(["AutoPause", "BillOverUsage"]),
                            ),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                          }),
                        ),
                      ),
                      status: Schema.optional(
                        Schema.Literals([
                          "Visible",
                          "Available",
                          "Default",
                          "Disabled",
                        ]),
                      ),
                      reason: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                zoneRedundant: Schema.optional(Schema.Boolean),
                readScale: Schema.optional(
                  Schema.Struct({
                    maxNumberOfReplicas: Schema.optional(Schema.Number),
                    status: Schema.optional(
                      Schema.Literals([
                        "Visible",
                        "Available",
                        "Default",
                        "Disabled",
                      ]),
                    ),
                    reason: Schema.optional(Schema.String),
                  }),
                ),
                supportedStorageCapabilities: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      storageAccountType: Schema.optional(
                        Schema.Literals(["GRS", "LRS", "ZRS", "GZRS"]),
                      ),
                      status: Schema.optional(
                        Schema.Literals([
                          "Visible",
                          "Available",
                          "Default",
                          "Disabled",
                        ]),
                      ),
                      reason: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                zonePinning: Schema.optional(Schema.Boolean),
                status: Schema.optional(
                  Schema.Literals([
                    "Visible",
                    "Available",
                    "Default",
                    "Disabled",
                  ]),
                ),
                reason: Schema.optional(Schema.String),
              }),
            ),
          ),
          supportedElasticPoolEditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                supportedElasticPoolPerformanceLevels: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      performanceLevel: Schema.optional(
                        Schema.Struct({
                          value: Schema.optional(Schema.Number),
                          unit: Schema.optional(
                            Schema.Literals(["DTU", "VCores"]),
                          ),
                        }),
                      ),
                      sku: Schema.optional(
                        Schema.Struct({
                          name: Schema.String,
                          tier: Schema.optional(Schema.String),
                          size: Schema.optional(Schema.String),
                          family: Schema.optional(Schema.String),
                          capacity: Schema.optional(Schema.Number),
                        }),
                      ),
                      supportedLicenseTypes: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      maxDatabaseCount: Schema.optional(Schema.Number),
                      includedMaxSize: Schema.optional(
                        Schema.Struct({
                          limit: Schema.optional(Schema.Number),
                          unit: Schema.optional(
                            Schema.Literals([
                              "Megabytes",
                              "Gigabytes",
                              "Terabytes",
                              "Petabytes",
                            ]),
                          ),
                        }),
                      ),
                      supportedMaxSizes: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            minValue: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            maxValue: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            scaleSize: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            logSize: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                    "Percent",
                                  ]),
                                ),
                              }),
                            ),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      supportedPerDatabaseMaxSizes: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            minValue: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            maxValue: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            scaleSize: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            logSize: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                    "Percent",
                                  ]),
                                ),
                              }),
                            ),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      supportedPerDatabaseMaxPerformanceLevels: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            limit: Schema.optional(Schema.Number),
                            unit: Schema.optional(
                              Schema.Literals(["DTU", "VCores"]),
                            ),
                            supportedPerDatabaseMinPerformanceLevels:
                              Schema.optional(
                                Schema.Array(
                                  Schema.Struct({
                                    limit: Schema.optional(Schema.Number),
                                    unit: Schema.optional(
                                      Schema.Literals(["DTU", "VCores"]),
                                    ),
                                    status: Schema.optional(
                                      Schema.Literals([
                                        "Visible",
                                        "Available",
                                        "Default",
                                        "Disabled",
                                      ]),
                                    ),
                                    reason: Schema.optional(Schema.String),
                                  }),
                                ),
                              ),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      zoneRedundant: Schema.optional(Schema.Boolean),
                      supportedMaintenanceConfigurations: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            zoneRedundant: Schema.optional(Schema.Boolean),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      supportedMinCapacities: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            value: Schema.optional(Schema.Number),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      supportedAutoPauseDelay: Schema.optional(
                        Schema.Struct({
                          minValue: Schema.optional(Schema.Number),
                          maxValue: Schema.optional(Schema.Number),
                          stepSize: Schema.optional(Schema.Number),
                          default: Schema.optional(Schema.Number),
                          unit: Schema.optional(Schema.Literals(["Minutes"])),
                          doNotPauseValue: Schema.optional(Schema.Number),
                        }),
                      ),
                      supportedPerDatabaseAutoPauseDelay: Schema.optional(
                        Schema.Struct({
                          minValue: Schema.optional(Schema.Number),
                          maxValue: Schema.optional(Schema.Number),
                          stepSize: Schema.optional(Schema.Number),
                          default: Schema.optional(Schema.Number),
                          unit: Schema.optional(Schema.Literals(["Minutes"])),
                          doNotPauseValue: Schema.optional(Schema.Number),
                        }),
                      ),
                      supportedZones: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            availabilityZone: Schema.optional(Schema.String),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      status: Schema.optional(
                        Schema.Literals([
                          "Visible",
                          "Available",
                          "Default",
                          "Disabled",
                        ]),
                      ),
                      reason: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                zoneRedundant: Schema.optional(Schema.Boolean),
                zonePinning: Schema.optional(Schema.Boolean),
                status: Schema.optional(
                  Schema.Literals([
                    "Visible",
                    "Available",
                    "Default",
                    "Disabled",
                  ]),
                ),
                reason: Schema.optional(Schema.String),
              }),
            ),
          ),
          status: Schema.optional(
            Schema.Literals(["Visible", "Available", "Default", "Disabled"]),
          ),
          reason: Schema.optional(Schema.String),
        }),
      ),
    ),
    supportedManagedInstanceVersions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          supportedEditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                isGeneralPurposeV2: Schema.optional(Schema.Boolean),
                supportedFamilies: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      sku: Schema.optional(Schema.String),
                      zoneRedundant: Schema.optional(Schema.Boolean),
                      supportedLicenseTypes: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      supportedVcoresValues: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.Number),
                            supportedMemoryLimitsMB: Schema.optional(
                              Schema.Struct({
                                minValue: Schema.optional(Schema.Number),
                                maxValue: Schema.optional(Schema.Number),
                                scaleSize: Schema.optional(Schema.Number),
                                status: Schema.optional(
                                  Schema.Literals([
                                    "Visible",
                                    "Available",
                                    "Default",
                                    "Disabled",
                                  ]),
                                ),
                                reason: Schema.optional(Schema.String),
                              }),
                            ),
                            includedMaxSize: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            supportedStorageSizes: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  minValue: Schema.optional(
                                    Schema.Struct({
                                      limit: Schema.optional(Schema.Number),
                                      unit: Schema.optional(
                                        Schema.Literals([
                                          "Megabytes",
                                          "Gigabytes",
                                          "Terabytes",
                                          "Petabytes",
                                        ]),
                                      ),
                                    }),
                                  ),
                                  maxValue: Schema.optional(
                                    Schema.Struct({
                                      limit: Schema.optional(Schema.Number),
                                      unit: Schema.optional(
                                        Schema.Literals([
                                          "Megabytes",
                                          "Gigabytes",
                                          "Terabytes",
                                          "Petabytes",
                                        ]),
                                      ),
                                    }),
                                  ),
                                  scaleSize: Schema.optional(
                                    Schema.Struct({
                                      limit: Schema.optional(Schema.Number),
                                      unit: Schema.optional(
                                        Schema.Literals([
                                          "Megabytes",
                                          "Gigabytes",
                                          "Terabytes",
                                          "Petabytes",
                                        ]),
                                      ),
                                    }),
                                  ),
                                  logSize: Schema.optional(
                                    Schema.Struct({
                                      limit: Schema.optional(Schema.Number),
                                      unit: Schema.optional(
                                        Schema.Literals([
                                          "Megabytes",
                                          "Gigabytes",
                                          "Terabytes",
                                          "Petabytes",
                                          "Percent",
                                        ]),
                                      ),
                                    }),
                                  ),
                                  status: Schema.optional(
                                    Schema.Literals([
                                      "Visible",
                                      "Available",
                                      "Default",
                                      "Disabled",
                                    ]),
                                  ),
                                  reason: Schema.optional(Schema.String),
                                }),
                              ),
                            ),
                            includedStorageIOps: Schema.optional(Schema.Number),
                            supportedStorageIOps: Schema.optional(
                              Schema.Struct({
                                minValue: Schema.optional(Schema.Number),
                                maxValue: Schema.optional(Schema.Number),
                                scaleSize: Schema.optional(Schema.Number),
                                status: Schema.optional(
                                  Schema.Literals([
                                    "Visible",
                                    "Available",
                                    "Default",
                                    "Disabled",
                                  ]),
                                ),
                                reason: Schema.optional(Schema.String),
                              }),
                            ),
                            iopsMinValueOverrideFactorPerSelectedStorageGB:
                              Schema.optional(Schema.Number),
                            iopsIncludedValueOverrideFactorPerSelectedStorageGB:
                              Schema.optional(Schema.Number),
                            includedStorageThroughputMBps: Schema.optional(
                              Schema.Number,
                            ),
                            supportedStorageThroughputMBps: Schema.optional(
                              Schema.Struct({
                                minValue: Schema.optional(Schema.Number),
                                maxValue: Schema.optional(Schema.Number),
                                scaleSize: Schema.optional(Schema.Number),
                                status: Schema.optional(
                                  Schema.Literals([
                                    "Visible",
                                    "Available",
                                    "Default",
                                    "Disabled",
                                  ]),
                                ),
                                reason: Schema.optional(Schema.String),
                              }),
                            ),
                            throughputMBpsMinValueOverrideFactorPerSelectedStorageGB:
                              Schema.optional(Schema.Number),
                            throughputMBpsIncludedValueOverrideFactorPerSelectedStorageGB:
                              Schema.optional(Schema.Number),
                            instancePoolSupported: Schema.optional(
                              Schema.Boolean,
                            ),
                            standaloneSupported: Schema.optional(
                              Schema.Boolean,
                            ),
                            supportedMaintenanceConfigurations: Schema.optional(
                              Schema.Array(
                                Schema.Struct({
                                  name: Schema.optional(Schema.String),
                                  status: Schema.optional(
                                    Schema.Literals([
                                      "Visible",
                                      "Available",
                                      "Default",
                                      "Disabled",
                                    ]),
                                  ),
                                  reason: Schema.optional(Schema.String),
                                }),
                              ),
                            ),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      status: Schema.optional(
                        Schema.Literals([
                          "Visible",
                          "Available",
                          "Default",
                          "Disabled",
                        ]),
                      ),
                      reason: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                supportedStorageCapabilities: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      storageAccountType: Schema.optional(
                        Schema.Literals(["GRS", "LRS", "ZRS", "GZRS"]),
                      ),
                      status: Schema.optional(
                        Schema.Literals([
                          "Visible",
                          "Available",
                          "Default",
                          "Disabled",
                        ]),
                      ),
                      reason: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                status: Schema.optional(
                  Schema.Literals([
                    "Visible",
                    "Available",
                    "Default",
                    "Disabled",
                  ]),
                ),
                reason: Schema.optional(Schema.String),
              }),
            ),
          ),
          supportedInstancePoolEditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                supportedFamilies: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      supportedLicenseTypes: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      supportedVcoresValues: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            value: Schema.optional(Schema.Number),
                            storageLimit: Schema.optional(
                              Schema.Struct({
                                limit: Schema.optional(Schema.Number),
                                unit: Schema.optional(
                                  Schema.Literals([
                                    "Megabytes",
                                    "Gigabytes",
                                    "Terabytes",
                                    "Petabytes",
                                  ]),
                                ),
                              }),
                            ),
                            status: Schema.optional(
                              Schema.Literals([
                                "Visible",
                                "Available",
                                "Default",
                                "Disabled",
                              ]),
                            ),
                            reason: Schema.optional(Schema.String),
                          }),
                        ),
                      ),
                      status: Schema.optional(
                        Schema.Literals([
                          "Visible",
                          "Available",
                          "Default",
                          "Disabled",
                        ]),
                      ),
                      reason: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                status: Schema.optional(
                  Schema.Literals([
                    "Visible",
                    "Available",
                    "Default",
                    "Disabled",
                  ]),
                ),
                reason: Schema.optional(Schema.String),
              }),
            ),
          ),
          status: Schema.optional(
            Schema.Literals(["Visible", "Available", "Default", "Disabled"]),
          ),
          reason: Schema.optional(Schema.String),
        }),
      ),
    ),
    supportedJobAgentVersions: Schema.optional(
      Schema.Array(
        Schema.Struct({
          name: Schema.optional(Schema.String),
          supportedEditions: Schema.optional(
            Schema.Array(
              Schema.Struct({
                name: Schema.optional(Schema.String),
                supportedServiceLevelObjectives: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      name: Schema.optional(Schema.String),
                      sku: Schema.optional(
                        Schema.Struct({
                          name: Schema.String,
                          tier: Schema.optional(Schema.String),
                          size: Schema.optional(Schema.String),
                          family: Schema.optional(Schema.String),
                          capacity: Schema.optional(Schema.Number),
                        }),
                      ),
                      status: Schema.optional(
                        Schema.Literals([
                          "Visible",
                          "Available",
                          "Default",
                          "Disabled",
                        ]),
                      ),
                      reason: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                status: Schema.optional(
                  Schema.Literals([
                    "Visible",
                    "Available",
                    "Default",
                    "Disabled",
                  ]),
                ),
                reason: Schema.optional(Schema.String),
              }),
            ),
          ),
          status: Schema.optional(
            Schema.Literals(["Visible", "Available", "Default", "Disabled"]),
          ),
          reason: Schema.optional(Schema.String),
        }),
      ),
    ),
    status: Schema.optional(
      Schema.Literals(["Visible", "Available", "Default", "Disabled"]),
    ),
    reason: Schema.optional(Schema.String),
  });
export type CapabilitiesListByLocationOutput =
  typeof CapabilitiesListByLocationOutput.Type;

// The operation
/**
 * Gets the subscription capabilities available for the specified location.
 *
 * @param locationName - The location name whose capabilities are retrieved.
 * @param include - If specified, restricts the response to only include the selected item.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const CapabilitiesListByLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CapabilitiesListByLocationInput,
    outputSchema: CapabilitiesListByLocationOutput,
  }),
);
// Input Schema
export const DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateInput =
  typeof DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOutput =
  typeof DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a database's Advanced Threat Protection state.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseAdvancedThreatProtectionSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateInput,
    outputSchema: DatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseAdvancedThreatProtectionSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type DatabaseAdvancedThreatProtectionSettingsGetInput =
  typeof DatabaseAdvancedThreatProtectionSettingsGetInput.Type;

// Output Schema
export const DatabaseAdvancedThreatProtectionSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseAdvancedThreatProtectionSettingsGetOutput =
  typeof DatabaseAdvancedThreatProtectionSettingsGetOutput.Type;

// The operation
/**
 * Gets a database's Advanced Threat Protection state.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseAdvancedThreatProtectionSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAdvancedThreatProtectionSettingsGetInput,
    outputSchema: DatabaseAdvancedThreatProtectionSettingsGetOutput,
  }));
// Input Schema
export const DatabaseAdvancedThreatProtectionSettingsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advancedThreatProtectionSettings",
    }),
  );
export type DatabaseAdvancedThreatProtectionSettingsListByDatabaseInput =
  typeof DatabaseAdvancedThreatProtectionSettingsListByDatabaseInput.Type;

// Output Schema
export const DatabaseAdvancedThreatProtectionSettingsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseAdvancedThreatProtectionSettingsListByDatabaseOutput =
  typeof DatabaseAdvancedThreatProtectionSettingsListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of database's Advanced Threat Protection states.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseAdvancedThreatProtectionSettingsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAdvancedThreatProtectionSettingsListByDatabaseInput,
    outputSchema: DatabaseAdvancedThreatProtectionSettingsListByDatabaseOutput,
  }));
// Input Schema
export const DatabaseAdvisorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advisorName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}",
    }),
  );
export type DatabaseAdvisorsGetInput = typeof DatabaseAdvisorsGetInput.Type;

// Output Schema
export const DatabaseAdvisorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseAdvisorsGetOutput = typeof DatabaseAdvisorsGetOutput.Type;

// The operation
/**
 * Gets a database advisor.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advisorName - The name of the Database Advisor.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseAdvisorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabaseAdvisorsGetInput,
  outputSchema: DatabaseAdvisorsGetOutput,
}));
// Input Schema
export const DatabaseAdvisorsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors",
    }),
  );
export type DatabaseAdvisorsListByDatabaseInput =
  typeof DatabaseAdvisorsListByDatabaseInput.Type;

// Output Schema
export const DatabaseAdvisorsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(Schema.Struct({}));
export type DatabaseAdvisorsListByDatabaseOutput =
  typeof DatabaseAdvisorsListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of database advisors.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $expand - The child resources to include in the response.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseAdvisorsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAdvisorsListByDatabaseInput,
    outputSchema: DatabaseAdvisorsListByDatabaseOutput,
  }));
// Input Schema
export const DatabaseAdvisorsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advisorName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}",
    }),
  );
export type DatabaseAdvisorsUpdateInput =
  typeof DatabaseAdvisorsUpdateInput.Type;

// Output Schema
export const DatabaseAdvisorsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseAdvisorsUpdateOutput =
  typeof DatabaseAdvisorsUpdateOutput.Type;

// The operation
/**
 * Updates a database advisor.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advisorName - The name of the Database Advisor.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseAdvisorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseAdvisorsUpdateInput,
    outputSchema: DatabaseAdvisorsUpdateOutput,
  }),
);
// Input Schema
export const DatabaseAutomaticTuningGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/automaticTuning/current",
    }),
  );
export type DatabaseAutomaticTuningGetInput =
  typeof DatabaseAutomaticTuningGetInput.Type;

// Output Schema
export const DatabaseAutomaticTuningGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseAutomaticTuningGetOutput =
  typeof DatabaseAutomaticTuningGetOutput.Type;

// The operation
/**
 * Gets a database's automatic tuning.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseAutomaticTuningGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseAutomaticTuningGetInput,
    outputSchema: DatabaseAutomaticTuningGetOutput,
  }),
);
// Input Schema
export const DatabaseAutomaticTuningUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/automaticTuning/current",
    }),
  );
export type DatabaseAutomaticTuningUpdateInput =
  typeof DatabaseAutomaticTuningUpdateInput.Type;

// Output Schema
export const DatabaseAutomaticTuningUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseAutomaticTuningUpdateOutput =
  typeof DatabaseAutomaticTuningUpdateOutput.Type;

// The operation
/**
 * Update automatic tuning properties for target database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseAutomaticTuningUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseAutomaticTuningUpdateInput,
    outputSchema: DatabaseAutomaticTuningUpdateOutput,
  }));
// Input Schema
export const DatabaseBlobAuditingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/auditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type DatabaseBlobAuditingPoliciesCreateOrUpdateInput =
  typeof DatabaseBlobAuditingPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseBlobAuditingPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseBlobAuditingPoliciesCreateOrUpdateOutput =
  typeof DatabaseBlobAuditingPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a database's blob auditing policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseBlobAuditingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseBlobAuditingPoliciesCreateOrUpdateInput,
    outputSchema: DatabaseBlobAuditingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseBlobAuditingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/auditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type DatabaseBlobAuditingPoliciesGetInput =
  typeof DatabaseBlobAuditingPoliciesGetInput.Type;

// Output Schema
export const DatabaseBlobAuditingPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseBlobAuditingPoliciesGetOutput =
  typeof DatabaseBlobAuditingPoliciesGetOutput.Type;

// The operation
/**
 * Gets a database's blob auditing policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseBlobAuditingPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseBlobAuditingPoliciesGetInput,
    outputSchema: DatabaseBlobAuditingPoliciesGetOutput,
  }));
// Input Schema
export const DatabaseBlobAuditingPoliciesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/auditingSettings",
    }),
  );
export type DatabaseBlobAuditingPoliciesListByDatabaseInput =
  typeof DatabaseBlobAuditingPoliciesListByDatabaseInput.Type;

// Output Schema
export const DatabaseBlobAuditingPoliciesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseBlobAuditingPoliciesListByDatabaseOutput =
  typeof DatabaseBlobAuditingPoliciesListByDatabaseOutput.Type;

// The operation
/**
 * Lists auditing settings of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseBlobAuditingPoliciesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseBlobAuditingPoliciesListByDatabaseInput,
    outputSchema: DatabaseBlobAuditingPoliciesListByDatabaseOutput,
  }));
// Input Schema
export const DatabaseColumnsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}",
    }),
  );
export type DatabaseColumnsGetInput = typeof DatabaseColumnsGetInput.Type;

// Output Schema
export const DatabaseColumnsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseColumnsGetOutput = typeof DatabaseColumnsGetOutput.Type;

// The operation
/**
 * Get database column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseColumnsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabaseColumnsGetInput,
  outputSchema: DatabaseColumnsGetOutput,
}));
// Input Schema
export const DatabaseColumnsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    schema: Schema.optional(Schema.String),
    table: Schema.optional(Schema.String),
    column: Schema.optional(Schema.String),
    orderBy: Schema.optional(Schema.String),
    $skiptoken: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/columns",
    }),
  );
export type DatabaseColumnsListByDatabaseInput =
  typeof DatabaseColumnsListByDatabaseInput.Type;

// Output Schema
export const DatabaseColumnsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseColumnsListByDatabaseOutput =
  typeof DatabaseColumnsListByDatabaseOutput.Type;

// The operation
/**
 * List database columns
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $skiptoken - An opaque token that identifies a starting point in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseColumnsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseColumnsListByDatabaseInput,
    outputSchema: DatabaseColumnsListByDatabaseOutput,
  }));
// Input Schema
export const DatabaseColumnsListByTableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns",
    }),
  );
export type DatabaseColumnsListByTableInput =
  typeof DatabaseColumnsListByTableInput.Type;

// Output Schema
export const DatabaseColumnsListByTableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseColumnsListByTableOutput =
  typeof DatabaseColumnsListByTableOutput.Type;

// The operation
/**
 * List database columns
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseColumnsListByTable = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseColumnsListByTableInput,
    outputSchema: DatabaseColumnsListByTableOutput,
  }),
);
// Input Schema
export const DatabaseEncryptionProtectorsRevalidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/encryptionProtector/{encryptionProtectorName}/revalidate",
    }),
  );
export type DatabaseEncryptionProtectorsRevalidateInput =
  typeof DatabaseEncryptionProtectorsRevalidateInput.Type;

// Output Schema
export const DatabaseEncryptionProtectorsRevalidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseEncryptionProtectorsRevalidateOutput =
  typeof DatabaseEncryptionProtectorsRevalidateOutput.Type;

// The operation
/**
 * Revalidates an existing encryption protector for a particular database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param encryptionProtectorName - The name of the encryption protector to be updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseEncryptionProtectorsRevalidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseEncryptionProtectorsRevalidateInput,
    outputSchema: DatabaseEncryptionProtectorsRevalidateOutput,
  }));
// Input Schema
export const DatabaseEncryptionProtectorsRevertInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/encryptionProtector/{encryptionProtectorName}/revert",
    }),
  );
export type DatabaseEncryptionProtectorsRevertInput =
  typeof DatabaseEncryptionProtectorsRevertInput.Type;

// Output Schema
export const DatabaseEncryptionProtectorsRevertOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseEncryptionProtectorsRevertOutput =
  typeof DatabaseEncryptionProtectorsRevertOutput.Type;

// The operation
/**
 * Reverts an existing encryption protector for a particular database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param encryptionProtectorName - The name of the encryption protector to be updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseEncryptionProtectorsRevert =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseEncryptionProtectorsRevertInput,
    outputSchema: DatabaseEncryptionProtectorsRevertOutput,
  }));
// Input Schema
export const DatabaseExtensionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    extensionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extensions/{extensionName}",
    }),
  );
export type DatabaseExtensionsCreateOrUpdateInput =
  typeof DatabaseExtensionsCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseExtensionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseExtensionsCreateOrUpdateOutput =
  typeof DatabaseExtensionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Perform a database extension operation, like database import, database export, or polybase import
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseExtensionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseExtensionsCreateOrUpdateInput,
    outputSchema: DatabaseExtensionsCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseExtensionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    extensionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extensions/{extensionName}",
    }),
  );
export type DatabaseExtensionsGetInput = typeof DatabaseExtensionsGetInput.Type;

// Output Schema
export const DatabaseExtensionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseExtensionsGetOutput =
  typeof DatabaseExtensionsGetOutput.Type;

// The operation
/**
 * Gets a database extension. This will return resource not found as it is not supported.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseExtensionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseExtensionsGetInput,
    outputSchema: DatabaseExtensionsGetOutput,
  }),
);
// Input Schema
export const DatabaseExtensionsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extensions",
    }),
  );
export type DatabaseExtensionsListByDatabaseInput =
  typeof DatabaseExtensionsListByDatabaseInput.Type;

// Output Schema
export const DatabaseExtensionsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseExtensionsListByDatabaseOutput =
  typeof DatabaseExtensionsListByDatabaseOutput.Type;

// The operation
/**
 * List database extension. This will return an empty list as it is not supported.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseExtensionsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseExtensionsListByDatabaseInput,
    outputSchema: DatabaseExtensionsListByDatabaseOutput,
  }));
// Input Schema
export const DatabaseOperationsCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/operations/{operationId}/cancel",
    }),
  );
export type DatabaseOperationsCancelInput =
  typeof DatabaseOperationsCancelInput.Type;

// Output Schema
export const DatabaseOperationsCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseOperationsCancelOutput =
  typeof DatabaseOperationsCancelOutput.Type;

// The operation
/**
 * Cancels the asynchronous operation on the database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param operationId - The operation identifier.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseOperationsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseOperationsCancelInput,
    outputSchema: DatabaseOperationsCancelOutput,
  }),
);
// Input Schema
export const DatabaseOperationsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/operations",
    }),
  );
export type DatabaseOperationsListByDatabaseInput =
  typeof DatabaseOperationsListByDatabaseInput.Type;

// Output Schema
export const DatabaseOperationsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseOperationsListByDatabaseOutput =
  typeof DatabaseOperationsListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of operations performed on the database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseOperationsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseOperationsListByDatabaseInput,
    outputSchema: DatabaseOperationsListByDatabaseOutput,
  }));
// Input Schema
export const DatabaseRecommendedActionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advisorName: Schema.String.pipe(T.PathParam()),
    recommendedActionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}/recommendedActions/{recommendedActionName}",
    }),
  );
export type DatabaseRecommendedActionsGetInput =
  typeof DatabaseRecommendedActionsGetInput.Type;

// Output Schema
export const DatabaseRecommendedActionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseRecommendedActionsGetOutput =
  typeof DatabaseRecommendedActionsGetOutput.Type;

// The operation
/**
 * Gets a database recommended action.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advisorName - The name of the Database Advisor.
 * @param recommendedActionName - The name of Database Recommended Action.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseRecommendedActionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseRecommendedActionsGetInput,
    outputSchema: DatabaseRecommendedActionsGetOutput,
  }));
// Input Schema
export const DatabaseRecommendedActionsListByDatabaseAdvisorInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advisorName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}/recommendedActions",
    }),
  );
export type DatabaseRecommendedActionsListByDatabaseAdvisorInput =
  typeof DatabaseRecommendedActionsListByDatabaseAdvisorInput.Type;

// Output Schema
export const DatabaseRecommendedActionsListByDatabaseAdvisorOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(Schema.Struct({}));
export type DatabaseRecommendedActionsListByDatabaseAdvisorOutput =
  typeof DatabaseRecommendedActionsListByDatabaseAdvisorOutput.Type;

// The operation
/**
 * Gets list of Database Recommended Actions.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advisorName - The name of the Database Advisor.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseRecommendedActionsListByDatabaseAdvisor =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseRecommendedActionsListByDatabaseAdvisorInput,
    outputSchema: DatabaseRecommendedActionsListByDatabaseAdvisorOutput,
  }));
// Input Schema
export const DatabaseRecommendedActionsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advisorName: Schema.String.pipe(T.PathParam()),
    recommendedActionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}/recommendedActions/{recommendedActionName}",
    }),
  );
export type DatabaseRecommendedActionsUpdateInput =
  typeof DatabaseRecommendedActionsUpdateInput.Type;

// Output Schema
export const DatabaseRecommendedActionsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseRecommendedActionsUpdateOutput =
  typeof DatabaseRecommendedActionsUpdateOutput.Type;

// The operation
/**
 * Updates a database recommended action.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advisorName - The name of the Database Advisor.
 * @param recommendedActionName - The name of Database Recommended Action.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseRecommendedActionsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseRecommendedActionsUpdateInput,
    outputSchema: DatabaseRecommendedActionsUpdateOutput,
  }));
// Input Schema
export const DatabaseSchemasGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}",
    }),
  );
export type DatabaseSchemasGetInput = typeof DatabaseSchemasGetInput.Type;

// Output Schema
export const DatabaseSchemasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSchemasGetOutput = typeof DatabaseSchemasGetOutput.Type;

// The operation
/**
 * Get database schema
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSchemasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabaseSchemasGetInput,
  outputSchema: DatabaseSchemasGetOutput,
}));
// Input Schema
export const DatabaseSchemasListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas",
    }),
  );
export type DatabaseSchemasListByDatabaseInput =
  typeof DatabaseSchemasListByDatabaseInput.Type;

// Output Schema
export const DatabaseSchemasListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseSchemasListByDatabaseOutput =
  typeof DatabaseSchemasListByDatabaseOutput.Type;

// The operation
/**
 * List database schemas
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSchemasListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSchemasListByDatabaseInput,
    outputSchema: DatabaseSchemasListByDatabaseOutput,
  }));
// Input Schema
export const DatabasesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}",
    }),
  );
export type DatabasesCreateOrUpdateInput =
  typeof DatabasesCreateOrUpdateInput.Type;

// Output Schema
export const DatabasesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type DatabasesCreateOrUpdateOutput =
  typeof DatabasesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new database or updates an existing database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesCreateOrUpdateInput,
    outputSchema: DatabasesCreateOrUpdateOutput,
  }),
);
// Input Schema
export const DatabasesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}",
  }),
);
export type DatabasesDeleteInput = typeof DatabasesDeleteInput.Type;

// Output Schema
export const DatabasesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesDeleteOutput = typeof DatabasesDeleteOutput.Type;

// The operation
/**
 * Deletes the database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesDeleteInput,
  outputSchema: DatabasesDeleteOutput,
}));
// Input Schema
export const DatabaseSecurityAlertPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type DatabaseSecurityAlertPoliciesCreateOrUpdateInput =
  typeof DatabaseSecurityAlertPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseSecurityAlertPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSecurityAlertPoliciesCreateOrUpdateOutput =
  typeof DatabaseSecurityAlertPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a database's security alert policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the  server.
 * @param databaseName - The name of the  database for which the security alert policy is defined.
 * @param securityAlertPolicyName - The name of the security alert policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSecurityAlertPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSecurityAlertPoliciesCreateOrUpdateInput,
    outputSchema: DatabaseSecurityAlertPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseSecurityAlertPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type DatabaseSecurityAlertPoliciesGetInput =
  typeof DatabaseSecurityAlertPoliciesGetInput.Type;

// Output Schema
export const DatabaseSecurityAlertPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSecurityAlertPoliciesGetOutput =
  typeof DatabaseSecurityAlertPoliciesGetOutput.Type;

// The operation
/**
 * Gets a database's security alert policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the  server.
 * @param databaseName - The name of the  database for which the security alert policy is defined.
 * @param securityAlertPolicyName - The name of the security alert policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSecurityAlertPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSecurityAlertPoliciesGetInput,
    outputSchema: DatabaseSecurityAlertPoliciesGetOutput,
  }));
// Input Schema
export const DatabaseSecurityAlertPoliciesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/securityAlertPolicies",
    }),
  );
export type DatabaseSecurityAlertPoliciesListByDatabaseInput =
  typeof DatabaseSecurityAlertPoliciesListByDatabaseInput.Type;

// Output Schema
export const DatabaseSecurityAlertPoliciesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseSecurityAlertPoliciesListByDatabaseOutput =
  typeof DatabaseSecurityAlertPoliciesListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of database's security alert policies.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the  server.
 * @param databaseName - The name of the  database for which the security alert policy is defined.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSecurityAlertPoliciesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSecurityAlertPoliciesListByDatabaseInput,
    outputSchema: DatabaseSecurityAlertPoliciesListByDatabaseOutput,
  }));
// Input Schema
export const DatabasesExportInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/export",
  }),
);
export type DatabasesExportInput = typeof DatabasesExportInput.Type;

// Output Schema
export const DatabasesExportOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DatabasesExportOutput = typeof DatabasesExportOutput.Type;

// The operation
/**
 * Exports a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesExport = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesExportInput,
  outputSchema: DatabasesExportOutput,
}));
// Input Schema
export const DatabasesFailoverInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    replicaType: Schema.optional(
      Schema.Literals(["Primary", "ReadableSecondary"]),
    ),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/failover",
  }),
);
export type DatabasesFailoverInput = typeof DatabasesFailoverInput.Type;

// Output Schema
export const DatabasesFailoverOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesFailoverOutput = typeof DatabasesFailoverOutput.Type;

// The operation
/**
 * Failovers a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database to failover.
 * @param replicaType - The type of replica to be failed over.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesFailover = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesFailoverInput,
  outputSchema: DatabasesFailoverOutput,
}));
// Input Schema
export const DatabasesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  $expand: Schema.optional(Schema.String),
  $filter: Schema.optional(Schema.String),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}",
  }),
);
export type DatabasesGetInput = typeof DatabasesGetInput.Type;

// Output Schema
export const DatabasesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type DatabasesGetOutput = typeof DatabasesGetOutput.Type;

// The operation
/**
 * Gets a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $expand - The child resources to include in the response.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesGetInput,
  outputSchema: DatabasesGetOutput,
}));
// Input Schema
export const DatabasesImportInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/import",
  }),
);
export type DatabasesImportInput = typeof DatabasesImportInput.Type;

// Output Schema
export const DatabasesImportOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type DatabasesImportOutput = typeof DatabasesImportOutput.Type;

// The operation
/**
 * Imports a bacpac into a new database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesImport = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesImportInput,
  outputSchema: DatabasesImportOutput,
}));
// Input Schema
export const DatabasesListByElasticPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    elasticPoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/databases",
    }),
  );
export type DatabasesListByElasticPoolInput =
  typeof DatabasesListByElasticPoolInput.Type;

// Output Schema
export const DatabasesListByElasticPoolOutput =
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
export type DatabasesListByElasticPoolOutput =
  typeof DatabasesListByElasticPoolOutput.Type;

// The operation
/**
 * Gets a list of databases in an elastic pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param elasticPoolName - The name of the elastic pool.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesListByElasticPool = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesListByElasticPoolInput,
    outputSchema: DatabasesListByElasticPoolOutput,
  }),
);
// Input Schema
export const DatabasesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases",
    }),
  );
export type DatabasesListByServerInput = typeof DatabasesListByServerInput.Type;

// Output Schema
export const DatabasesListByServerOutput =
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
export type DatabasesListByServerOutput =
  typeof DatabasesListByServerOutput.Type;

// The operation
/**
 * Gets a list of databases.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabasesListByServerInput,
    outputSchema: DatabasesListByServerOutput,
  }),
);
// Input Schema
export const DatabasesListInaccessibleByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/inaccessibleDatabases",
    }),
  );
export type DatabasesListInaccessibleByServerInput =
  typeof DatabasesListInaccessibleByServerInput.Type;

// Output Schema
export const DatabasesListInaccessibleByServerOutput =
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
export type DatabasesListInaccessibleByServerOutput =
  typeof DatabasesListInaccessibleByServerOutput.Type;

// The operation
/**
 * Gets a list of inaccessible databases in a logical server
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesListInaccessibleByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasesListInaccessibleByServerInput,
    outputSchema: DatabasesListInaccessibleByServerOutput,
  }));
// Input Schema
export const DatabasesPauseInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/pause",
  }),
);
export type DatabasesPauseInput = typeof DatabasesPauseInput.Type;

// Output Schema
export const DatabasesPauseOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type DatabasesPauseOutput = typeof DatabasesPauseOutput.Type;

// The operation
/**
 * Pauses a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database to be paused.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesPause = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesPauseInput,
  outputSchema: DatabasesPauseOutput,
}));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentBaselinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentBaselinesCreateOrUpdateInput =
  typeof DatabaseSqlVulnerabilityAssessmentBaselinesCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentBaselinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSqlVulnerabilityAssessmentBaselinesCreateOrUpdateOutput =
  typeof DatabaseSqlVulnerabilityAssessmentBaselinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Add a database's vulnerability assessment rule baseline list.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentBaselinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentBaselinesCreateOrUpdateInput,
    outputSchema:
      DatabaseSqlVulnerabilityAssessmentBaselinesCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentBaselinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentBaselinesGetInput =
  typeof DatabaseSqlVulnerabilityAssessmentBaselinesGetInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentBaselinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSqlVulnerabilityAssessmentBaselinesGetOutput =
  typeof DatabaseSqlVulnerabilityAssessmentBaselinesGetOutput.Type;

// The operation
/**
 * Gets a list of database's sql vulnerability assessment rule baselines.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentBaselinesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentBaselinesGetInput,
    outputSchema: DatabaseSqlVulnerabilityAssessmentBaselinesGetOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentBaselinesListBySqlVulnerabilityAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentBaselinesListBySqlVulnerabilityAssessmentInput =
  typeof DatabaseSqlVulnerabilityAssessmentBaselinesListBySqlVulnerabilityAssessmentInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentBaselinesListBySqlVulnerabilityAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseSqlVulnerabilityAssessmentBaselinesListBySqlVulnerabilityAssessmentOutput =
  typeof DatabaseSqlVulnerabilityAssessmentBaselinesListBySqlVulnerabilityAssessmentOutput.Type;

// The operation
/**
 * Gets a list of database's sql vulnerability assessment rule baselines.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentBaselinesListBySqlVulnerabilityAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DatabaseSqlVulnerabilityAssessmentBaselinesListBySqlVulnerabilityAssessmentInput,
    outputSchema:
      DatabaseSqlVulnerabilityAssessmentBaselinesListBySqlVulnerabilityAssessmentOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentExecuteScanExecuteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/initiateScan",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentExecuteScanExecuteInput =
  typeof DatabaseSqlVulnerabilityAssessmentExecuteScanExecuteInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentExecuteScanExecuteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseSqlVulnerabilityAssessmentExecuteScanExecuteOutput =
  typeof DatabaseSqlVulnerabilityAssessmentExecuteScanExecuteOutput.Type;

// The operation
/**
 * Executes a Vulnerability Assessment database scan.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentExecuteScanExecute =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentExecuteScanExecuteInput,
    outputSchema: DatabaseSqlVulnerabilityAssessmentExecuteScanExecuteOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    ruleId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}/rules/{ruleId}",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput =
  typeof DatabaseSqlVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSqlVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput =
  typeof DatabaseSqlVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DatabaseSqlVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput,
    outputSchema:
      DatabaseSqlVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    ruleId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}/rules/{ruleId}",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentRuleBaselinesDeleteInput =
  typeof DatabaseSqlVulnerabilityAssessmentRuleBaselinesDeleteInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseSqlVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  typeof DatabaseSqlVulnerabilityAssessmentRuleBaselinesDeleteOutput.Type;

// The operation
/**
 * Removes the database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentRuleBaselinesDeleteInput,
    outputSchema: DatabaseSqlVulnerabilityAssessmentRuleBaselinesDeleteOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    ruleId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}/rules/{ruleId}",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentRuleBaselinesGetInput =
  typeof DatabaseSqlVulnerabilityAssessmentRuleBaselinesGetInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSqlVulnerabilityAssessmentRuleBaselinesGetOutput =
  typeof DatabaseSqlVulnerabilityAssessmentRuleBaselinesGetOutput.Type;

// The operation
/**
 * Gets a database's sql vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentRuleBaselinesGetInput,
    outputSchema: DatabaseSqlVulnerabilityAssessmentRuleBaselinesGetOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesListByBaselineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}/rules",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentRuleBaselinesListByBaselineInput =
  typeof DatabaseSqlVulnerabilityAssessmentRuleBaselinesListByBaselineInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesListByBaselineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseSqlVulnerabilityAssessmentRuleBaselinesListByBaselineOutput =
  typeof DatabaseSqlVulnerabilityAssessmentRuleBaselinesListByBaselineOutput.Type;

// The operation
/**
 * Gets a list of database's sql vulnerability assessment rule baselines.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentRuleBaselinesListByBaseline =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DatabaseSqlVulnerabilityAssessmentRuleBaselinesListByBaselineInput,
    outputSchema:
      DatabaseSqlVulnerabilityAssessmentRuleBaselinesListByBaselineOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentScanResultGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    scanResultId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/scanResults/{scanResultId}",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentScanResultGetInput =
  typeof DatabaseSqlVulnerabilityAssessmentScanResultGetInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentScanResultGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSqlVulnerabilityAssessmentScanResultGetOutput =
  typeof DatabaseSqlVulnerabilityAssessmentScanResultGetOutput.Type;

// The operation
/**
 * Gets a vulnerability assessment scan record of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the SQL Vulnerability Assessment.
 * @param scanId - The scan id of the SQL Vulnerability Assessment scan to retrieve result from.
 * @param scanResultId - The scan result id of the specific result to retrieve.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentScanResultGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentScanResultGetInput,
    outputSchema: DatabaseSqlVulnerabilityAssessmentScanResultGetOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentScanResultListByScanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/scanResults",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentScanResultListByScanInput =
  typeof DatabaseSqlVulnerabilityAssessmentScanResultListByScanInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentScanResultListByScanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseSqlVulnerabilityAssessmentScanResultListByScanOutput =
  typeof DatabaseSqlVulnerabilityAssessmentScanResultListByScanOutput.Type;

// The operation
/**
 * Gets a vulnerability assessment scan record of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the SQL Vulnerability Assessment.
 * @param scanId - The scan id of the SQL Vulnerability Assessment scan to retrieve result from.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentScanResultListByScan =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentScanResultListByScanInput,
    outputSchema: DatabaseSqlVulnerabilityAssessmentScanResultListByScanOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentScansGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentScansGetInput =
  typeof DatabaseSqlVulnerabilityAssessmentScansGetInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentScansGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSqlVulnerabilityAssessmentScansGetOutput =
  typeof DatabaseSqlVulnerabilityAssessmentScansGetOutput.Type;

// The operation
/**
 * Get a database vulnerability assessment scan result.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id of the scan to retrieve.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentScansGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentScansGetInput,
    outputSchema: DatabaseSqlVulnerabilityAssessmentScansGetOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/scans",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsInput =
  typeof DatabaseSqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseSqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsOutput =
  typeof DatabaseSqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsOutput.Type;

// The operation
/**
 * Lists the vulnerability assessment scans of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DatabaseSqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsInput,
    outputSchema:
      DatabaseSqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentsSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentsSettingsGetInput =
  typeof DatabaseSqlVulnerabilityAssessmentsSettingsGetInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentsSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseSqlVulnerabilityAssessmentsSettingsGetOutput =
  typeof DatabaseSqlVulnerabilityAssessmentsSettingsGetOutput.Type;

// The operation
/**
 * Gets SQL Vulnerability Assessment policy for database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the SQL Vulnerability Assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentsSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentsSettingsGetInput,
    outputSchema: DatabaseSqlVulnerabilityAssessmentsSettingsGetOutput,
  }));
// Input Schema
export const DatabaseSqlVulnerabilityAssessmentsSettingsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sqlVulnerabilityAssessments",
    }),
  );
export type DatabaseSqlVulnerabilityAssessmentsSettingsListByDatabaseInput =
  typeof DatabaseSqlVulnerabilityAssessmentsSettingsListByDatabaseInput.Type;

// Output Schema
export const DatabaseSqlVulnerabilityAssessmentsSettingsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseSqlVulnerabilityAssessmentsSettingsListByDatabaseOutput =
  typeof DatabaseSqlVulnerabilityAssessmentsSettingsListByDatabaseOutput.Type;

// The operation
/**
 * Lists SQL Vulnerability Assessment policies associated with a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseSqlVulnerabilityAssessmentsSettingsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseSqlVulnerabilityAssessmentsSettingsListByDatabaseInput,
    outputSchema:
      DatabaseSqlVulnerabilityAssessmentsSettingsListByDatabaseOutput,
  }));
// Input Schema
export const DatabasesRenameInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/move",
  }),
);
export type DatabasesRenameInput = typeof DatabasesRenameInput.Type;

// Output Schema
export const DatabasesRenameOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesRenameOutput = typeof DatabasesRenameOutput.Type;

// The operation
/**
 * Renames a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database to rename.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesRename = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesRenameInput,
  outputSchema: DatabasesRenameOutput,
}));
// Input Schema
export const DatabasesResumeInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/resume",
  }),
);
export type DatabasesResumeInput = typeof DatabasesResumeInput.Type;

// Output Schema
export const DatabasesResumeOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type DatabasesResumeOutput = typeof DatabasesResumeOutput.Type;

// The operation
/**
 * Resumes a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database to be resumed.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesResume = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesResumeInput,
  outputSchema: DatabasesResumeOutput,
}));
// Input Schema
export const DatabasesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}",
  }),
);
export type DatabasesUpdateInput = typeof DatabasesUpdateInput.Type;

// Output Schema
export const DatabasesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type DatabasesUpdateOutput = typeof DatabasesUpdateOutput.Type;

// The operation
/**
 * Updates an existing database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabasesUpdateInput,
  outputSchema: DatabasesUpdateOutput,
}));
// Input Schema
export const DatabasesUpgradeDataWarehouseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/upgradeDataWarehouse",
    }),
  );
export type DatabasesUpgradeDataWarehouseInput =
  typeof DatabasesUpgradeDataWarehouseInput.Type;

// Output Schema
export const DatabasesUpgradeDataWarehouseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabasesUpgradeDataWarehouseOutput =
  typeof DatabasesUpgradeDataWarehouseOutput.Type;

// The operation
/**
 * Upgrades a data warehouse.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database to be upgraded.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabasesUpgradeDataWarehouse =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabasesUpgradeDataWarehouseInput,
    outputSchema: DatabasesUpgradeDataWarehouseOutput,
  }));
// Input Schema
export const DatabaseTablesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}",
  }),
);
export type DatabaseTablesGetInput = typeof DatabaseTablesGetInput.Type;

// Output Schema
export const DatabaseTablesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseTablesGetOutput = typeof DatabaseTablesGetOutput.Type;

// The operation
/**
 * Get database table
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseTablesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DatabaseTablesGetInput,
  outputSchema: DatabaseTablesGetOutput,
}));
// Input Schema
export const DatabaseTablesListBySchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables",
    }),
  );
export type DatabaseTablesListBySchemaInput =
  typeof DatabaseTablesListBySchemaInput.Type;

// Output Schema
export const DatabaseTablesListBySchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseTablesListBySchemaOutput =
  typeof DatabaseTablesListBySchemaOutput.Type;

// The operation
/**
 * List database tables
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseTablesListBySchema = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DatabaseTablesListBySchemaInput,
    outputSchema: DatabaseTablesListBySchemaOutput,
  }),
);
// Input Schema
export const DatabaseUsagesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/usages",
    }),
  );
export type DatabaseUsagesListByDatabaseInput =
  typeof DatabaseUsagesListByDatabaseInput.Type;

// Output Schema
export const DatabaseUsagesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseUsagesListByDatabaseOutput =
  typeof DatabaseUsagesListByDatabaseOutput.Type;

// The operation
/**
 * Gets database usages.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseUsagesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseUsagesListByDatabaseInput,
    outputSchema: DatabaseUsagesListByDatabaseOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    ruleId: Schema.String.pipe(T.PathParam()),
    baselineName: Schema.Literals(["master", "default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/rules/{ruleId}/baselines/{baselineName}",
    }),
  );
export type DatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput =
  typeof DatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput =
  typeof DatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database for which the vulnerability assessment rule baseline is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param baselineName - The name of the vulnerability assessment rule baseline (default implies a baseline on a database level rule and master for server level rule).
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      DatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput,
    outputSchema:
      DatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentRuleBaselinesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    ruleId: Schema.String.pipe(T.PathParam()),
    baselineName: Schema.Literals(["master", "default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/rules/{ruleId}/baselines/{baselineName}",
    }),
  );
export type DatabaseVulnerabilityAssessmentRuleBaselinesDeleteInput =
  typeof DatabaseVulnerabilityAssessmentRuleBaselinesDeleteInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  typeof DatabaseVulnerabilityAssessmentRuleBaselinesDeleteOutput.Type;

// The operation
/**
 * Removes the database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database for which the vulnerability assessment rule baseline is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param baselineName - The name of the vulnerability assessment rule baseline (default implies a baseline on a database level rule and master for server level rule).
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentRuleBaselinesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentRuleBaselinesDeleteInput,
    outputSchema: DatabaseVulnerabilityAssessmentRuleBaselinesDeleteOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentRuleBaselinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    ruleId: Schema.String.pipe(T.PathParam()),
    baselineName: Schema.Literals(["master", "default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/rules/{ruleId}/baselines/{baselineName}",
    }),
  );
export type DatabaseVulnerabilityAssessmentRuleBaselinesGetInput =
  typeof DatabaseVulnerabilityAssessmentRuleBaselinesGetInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentRuleBaselinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseVulnerabilityAssessmentRuleBaselinesGetOutput =
  typeof DatabaseVulnerabilityAssessmentRuleBaselinesGetOutput.Type;

// The operation
/**
 * Gets a database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database for which the vulnerability assessment rule baseline is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param baselineName - The name of the vulnerability assessment rule baseline (default implies a baseline on a database level rule and master for server level rule).
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentRuleBaselinesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentRuleBaselinesGetInput,
    outputSchema: DatabaseVulnerabilityAssessmentRuleBaselinesGetOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentScansExportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/export",
    }),
  );
export type DatabaseVulnerabilityAssessmentScansExportInput =
  typeof DatabaseVulnerabilityAssessmentScansExportInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentScansExportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseVulnerabilityAssessmentScansExportOutput =
  typeof DatabaseVulnerabilityAssessmentScansExportOutput.Type;

// The operation
/**
 * Convert an existing scan result to a human readable format. If already exists nothing happens
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the scanned database.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentScansExport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentScansExportInput,
    outputSchema: DatabaseVulnerabilityAssessmentScansExportOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentScansGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}",
    }),
  );
export type DatabaseVulnerabilityAssessmentScansGetInput =
  typeof DatabaseVulnerabilityAssessmentScansGetInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentScansGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseVulnerabilityAssessmentScansGetOutput =
  typeof DatabaseVulnerabilityAssessmentScansGetOutput.Type;

// The operation
/**
 * Gets a vulnerability assessment scan record of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id of the scan to retrieve.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentScansGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentScansGetInput,
    outputSchema: DatabaseVulnerabilityAssessmentScansGetOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentScansInitiateScanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/initiateScan",
    }),
  );
export type DatabaseVulnerabilityAssessmentScansInitiateScanInput =
  typeof DatabaseVulnerabilityAssessmentScansInitiateScanInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentScansInitiateScanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseVulnerabilityAssessmentScansInitiateScanOutput =
  typeof DatabaseVulnerabilityAssessmentScansInitiateScanOutput.Type;

// The operation
/**
 * Executes a Vulnerability Assessment database scan.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id of the scan to retrieve.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentScansInitiateScan =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentScansInitiateScanInput,
    outputSchema: DatabaseVulnerabilityAssessmentScansInitiateScanOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentScansListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans",
    }),
  );
export type DatabaseVulnerabilityAssessmentScansListByDatabaseInput =
  typeof DatabaseVulnerabilityAssessmentScansListByDatabaseInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentScansListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseVulnerabilityAssessmentScansListByDatabaseOutput =
  typeof DatabaseVulnerabilityAssessmentScansListByDatabaseOutput.Type;

// The operation
/**
 * Lists the vulnerability assessment scans of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentScansListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentScansListByDatabaseInput,
    outputSchema: DatabaseVulnerabilityAssessmentScansListByDatabaseOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type DatabaseVulnerabilityAssessmentsCreateOrUpdateInput =
  typeof DatabaseVulnerabilityAssessmentsCreateOrUpdateInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseVulnerabilityAssessmentsCreateOrUpdateOutput =
  typeof DatabaseVulnerabilityAssessmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the database's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentsCreateOrUpdateInput,
    outputSchema: DatabaseVulnerabilityAssessmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type DatabaseVulnerabilityAssessmentsDeleteInput =
  typeof DatabaseVulnerabilityAssessmentsDeleteInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DatabaseVulnerabilityAssessmentsDeleteOutput =
  typeof DatabaseVulnerabilityAssessmentsDeleteOutput.Type;

// The operation
/**
 * Removes the database's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentsDeleteInput,
    outputSchema: DatabaseVulnerabilityAssessmentsDeleteOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type DatabaseVulnerabilityAssessmentsGetInput =
  typeof DatabaseVulnerabilityAssessmentsGetInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DatabaseVulnerabilityAssessmentsGetOutput =
  typeof DatabaseVulnerabilityAssessmentsGetOutput.Type;

// The operation
/**
 * Gets the database's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentsGetInput,
    outputSchema: DatabaseVulnerabilityAssessmentsGetOutput,
  }));
// Input Schema
export const DatabaseVulnerabilityAssessmentsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/vulnerabilityAssessments",
    }),
  );
export type DatabaseVulnerabilityAssessmentsListByDatabaseInput =
  typeof DatabaseVulnerabilityAssessmentsListByDatabaseInput.Type;

// Output Schema
export const DatabaseVulnerabilityAssessmentsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DatabaseVulnerabilityAssessmentsListByDatabaseOutput =
  typeof DatabaseVulnerabilityAssessmentsListByDatabaseOutput.Type;

// The operation
/**
 * Lists the vulnerability assessment policies associated with a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database for which the vulnerability assessment policies are defined.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DatabaseVulnerabilityAssessmentsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DatabaseVulnerabilityAssessmentsListByDatabaseInput,
    outputSchema: DatabaseVulnerabilityAssessmentsListByDatabaseOutput,
  }));
// Input Schema
export const DataMaskingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dataMaskingPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/dataMaskingPolicies/{dataMaskingPolicyName}",
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
 * Creates or updates a database data masking policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param dataMaskingPolicyName - The name of the database for which the data masking policy applies.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DataMaskingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataMaskingPoliciesCreateOrUpdateInput,
    outputSchema: DataMaskingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const DataMaskingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dataMaskingPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/dataMaskingPolicies/{dataMaskingPolicyName}",
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
 * Gets the database data masking policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param dataMaskingPolicyName - The name of the database for which the data masking policy applies.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
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
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dataMaskingPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    dataMaskingRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/dataMaskingPolicies/{dataMaskingPolicyName}/rules/{dataMaskingRuleName}",
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
 * Creates or updates a database data masking rule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param dataMaskingPolicyName - The name of the database for which the data masking policy applies.
 * @param dataMaskingRuleName - The name of the data masking rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DataMaskingRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataMaskingRulesCreateOrUpdateInput,
    outputSchema: DataMaskingRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const DataMaskingRulesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dataMaskingPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/dataMaskingPolicies/{dataMaskingPolicyName}/rules",
    }),
  );
export type DataMaskingRulesListByDatabaseInput =
  typeof DataMaskingRulesListByDatabaseInput.Type;

// Output Schema
export const DataMaskingRulesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DataMaskingRulesListByDatabaseOutput =
  typeof DataMaskingRulesListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of database data masking rules.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param dataMaskingPolicyName - The name of the database for which the data masking rule applies.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DataMaskingRulesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataMaskingRulesListByDatabaseInput,
    outputSchema: DataMaskingRulesListByDatabaseOutput,
  }));
// Input Schema
export const DataWarehouseUserActivitiesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dataWarehouseUserActivityName: Schema.Literals(["current"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/dataWarehouseUserActivities/{dataWarehouseUserActivityName}",
    }),
  );
export type DataWarehouseUserActivitiesGetInput =
  typeof DataWarehouseUserActivitiesGetInput.Type;

// Output Schema
export const DataWarehouseUserActivitiesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DataWarehouseUserActivitiesGetOutput =
  typeof DataWarehouseUserActivitiesGetOutput.Type;

// The operation
/**
 * Gets the user activities of a data warehouse which includes running and suspended queries
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param dataWarehouseUserActivityName - The activity name of the data warehouse.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DataWarehouseUserActivitiesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataWarehouseUserActivitiesGetInput,
    outputSchema: DataWarehouseUserActivitiesGetOutput,
  }));
// Input Schema
export const DataWarehouseUserActivitiesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/dataWarehouseUserActivities",
    }),
  );
export type DataWarehouseUserActivitiesListByDatabaseInput =
  typeof DataWarehouseUserActivitiesListByDatabaseInput.Type;

// Output Schema
export const DataWarehouseUserActivitiesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DataWarehouseUserActivitiesListByDatabaseOutput =
  typeof DataWarehouseUserActivitiesListByDatabaseOutput.Type;

// The operation
/**
 * List the user activities of a data warehouse which includes running and suspended queries
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DataWarehouseUserActivitiesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DataWarehouseUserActivitiesListByDatabaseInput,
    outputSchema: DataWarehouseUserActivitiesListByDatabaseOutput,
  }));
// Input Schema
export const DeletedServersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    locationName: Schema.String.pipe(T.PathParam()),
    deletedServerName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/deletedServers/{deletedServerName}",
  }),
);
export type DeletedServersGetInput = typeof DeletedServersGetInput.Type;

// Output Schema
export const DeletedServersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeletedServersGetOutput = typeof DeletedServersGetOutput.Type;

// The operation
/**
 * Gets a deleted server.
 *
 * @param locationName - The name of the region where the resource is located.
 * @param deletedServerName - The name of the deleted server.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DeletedServersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletedServersGetInput,
  outputSchema: DeletedServersGetOutput,
}));
// Input Schema
export const DeletedServersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/deletedServers",
    }),
  );
export type DeletedServersListInput = typeof DeletedServersListInput.Type;

// Output Schema
export const DeletedServersListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DeletedServersListOutput = typeof DeletedServersListOutput.Type;

// The operation
/**
 * Gets a list of all deleted servers in a subscription.
 *
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DeletedServersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletedServersListInput,
  outputSchema: DeletedServersListOutput,
}));
// Input Schema
export const DeletedServersListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/deletedServers",
    }),
  );
export type DeletedServersListByLocationInput =
  typeof DeletedServersListByLocationInput.Type;

// Output Schema
export const DeletedServersListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DeletedServersListByLocationOutput =
  typeof DeletedServersListByLocationOutput.Type;

// The operation
/**
 * Gets a list of deleted servers for a location.
 *
 * @param locationName - The name of the region where the resource is located.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DeletedServersListByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeletedServersListByLocationInput,
    outputSchema: DeletedServersListByLocationOutput,
  }));
// Input Schema
export const DeletedServersRecoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    deletedServerName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/deletedServers/{deletedServerName}/recover",
    }),
  );
export type DeletedServersRecoverInput = typeof DeletedServersRecoverInput.Type;

// Output Schema
export const DeletedServersRecoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DeletedServersRecoverOutput =
  typeof DeletedServersRecoverOutput.Type;

// The operation
/**
 * Recovers a deleted server.
 *
 * @param locationName - The name of the region where the resource is located.
 * @param deletedServerName - The name of the deleted server.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DeletedServersRecover = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeletedServersRecoverInput,
    outputSchema: DeletedServersRecoverOutput,
  }),
);
// Input Schema
export const DistributedAvailabilityGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    distributedAvailabilityGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}",
    }),
  );
export type DistributedAvailabilityGroupsCreateOrUpdateInput =
  typeof DistributedAvailabilityGroupsCreateOrUpdateInput.Type;

// Output Schema
export const DistributedAvailabilityGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DistributedAvailabilityGroupsCreateOrUpdateOutput =
  typeof DistributedAvailabilityGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a distributed availability group between Sql On-Prem and Sql Managed Instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param distributedAvailabilityGroupName - The distributed availability group name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DistributedAvailabilityGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DistributedAvailabilityGroupsCreateOrUpdateInput,
    outputSchema: DistributedAvailabilityGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const DistributedAvailabilityGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    distributedAvailabilityGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}",
    }),
  );
export type DistributedAvailabilityGroupsDeleteInput =
  typeof DistributedAvailabilityGroupsDeleteInput.Type;

// Output Schema
export const DistributedAvailabilityGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DistributedAvailabilityGroupsDeleteOutput =
  typeof DistributedAvailabilityGroupsDeleteOutput.Type;

// The operation
/**
 * Drops a distributed availability group between Sql On-Prem and Sql Managed Instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param distributedAvailabilityGroupName - The distributed availability group name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DistributedAvailabilityGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DistributedAvailabilityGroupsDeleteInput,
    outputSchema: DistributedAvailabilityGroupsDeleteOutput,
  }));
// Input Schema
export const DistributedAvailabilityGroupsFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    distributedAvailabilityGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}/failover",
    }),
  );
export type DistributedAvailabilityGroupsFailoverInput =
  typeof DistributedAvailabilityGroupsFailoverInput.Type;

// Output Schema
export const DistributedAvailabilityGroupsFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DistributedAvailabilityGroupsFailoverOutput =
  typeof DistributedAvailabilityGroupsFailoverOutput.Type;

// The operation
/**
 * Performs requested failover type in this distributed availability group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param distributedAvailabilityGroupName - The distributed availability group name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DistributedAvailabilityGroupsFailover =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DistributedAvailabilityGroupsFailoverInput,
    outputSchema: DistributedAvailabilityGroupsFailoverOutput,
  }));
// Input Schema
export const DistributedAvailabilityGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    distributedAvailabilityGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}",
    }),
  );
export type DistributedAvailabilityGroupsGetInput =
  typeof DistributedAvailabilityGroupsGetInput.Type;

// Output Schema
export const DistributedAvailabilityGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DistributedAvailabilityGroupsGetOutput =
  typeof DistributedAvailabilityGroupsGetOutput.Type;

// The operation
/**
 * Gets a distributed availability group info.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param distributedAvailabilityGroupName - The distributed availability group name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DistributedAvailabilityGroupsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DistributedAvailabilityGroupsGetInput,
    outputSchema: DistributedAvailabilityGroupsGetOutput,
  }));
// Input Schema
export const DistributedAvailabilityGroupsListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups",
    }),
  );
export type DistributedAvailabilityGroupsListByInstanceInput =
  typeof DistributedAvailabilityGroupsListByInstanceInput.Type;

// Output Schema
export const DistributedAvailabilityGroupsListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type DistributedAvailabilityGroupsListByInstanceOutput =
  typeof DistributedAvailabilityGroupsListByInstanceOutput.Type;

// The operation
/**
 * Gets a list of a distributed availability groups in instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DistributedAvailabilityGroupsListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DistributedAvailabilityGroupsListByInstanceInput,
    outputSchema: DistributedAvailabilityGroupsListByInstanceOutput,
  }));
// Input Schema
export const DistributedAvailabilityGroupsSetRoleInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    distributedAvailabilityGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}/setRole",
    }),
  );
export type DistributedAvailabilityGroupsSetRoleInput =
  typeof DistributedAvailabilityGroupsSetRoleInput.Type;

// Output Schema
export const DistributedAvailabilityGroupsSetRoleOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DistributedAvailabilityGroupsSetRoleOutput =
  typeof DistributedAvailabilityGroupsSetRoleOutput.Type;

// The operation
/**
 * Sets the role for managed instance in a distributed availability group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param distributedAvailabilityGroupName - The distributed availability group name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DistributedAvailabilityGroupsSetRole =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DistributedAvailabilityGroupsSetRoleInput,
    outputSchema: DistributedAvailabilityGroupsSetRoleOutput,
  }));
// Input Schema
export const DistributedAvailabilityGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    distributedAvailabilityGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}",
    }),
  );
export type DistributedAvailabilityGroupsUpdateInput =
  typeof DistributedAvailabilityGroupsUpdateInput.Type;

// Output Schema
export const DistributedAvailabilityGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type DistributedAvailabilityGroupsUpdateOutput =
  typeof DistributedAvailabilityGroupsUpdateOutput.Type;

// The operation
/**
 * Updates a distributed availability group replication mode.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param distributedAvailabilityGroupName - The distributed availability group name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const DistributedAvailabilityGroupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DistributedAvailabilityGroupsUpdateInput,
    outputSchema: DistributedAvailabilityGroupsUpdateOutput,
  }));
// Input Schema
export const ElasticPoolActivitiesListByElasticPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    elasticPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/elasticPoolActivity",
    }),
  );
export type ElasticPoolActivitiesListByElasticPoolInput =
  typeof ElasticPoolActivitiesListByElasticPoolInput.Type;

// Output Schema
export const ElasticPoolActivitiesListByElasticPoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
  });
export type ElasticPoolActivitiesListByElasticPoolOutput =
  typeof ElasticPoolActivitiesListByElasticPoolOutput.Type;

// The operation
/**
 * Returns elastic pool activities.
 *
 * @param api-version - The API version to use for the request.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param elasticPoolName - The name of the elastic pool for which to get the current activity.
 */
export const ElasticPoolActivitiesListByElasticPool =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticPoolActivitiesListByElasticPoolInput,
    outputSchema: ElasticPoolActivitiesListByElasticPoolOutput,
  }));
// Input Schema
export const ElasticPoolDatabaseActivitiesListByElasticPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    elasticPoolName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/elasticPoolDatabaseActivity",
    }),
  );
export type ElasticPoolDatabaseActivitiesListByElasticPoolInput =
  typeof ElasticPoolDatabaseActivitiesListByElasticPoolInput.Type;

// Output Schema
export const ElasticPoolDatabaseActivitiesListByElasticPoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
  });
export type ElasticPoolDatabaseActivitiesListByElasticPoolOutput =
  typeof ElasticPoolDatabaseActivitiesListByElasticPoolOutput.Type;

// The operation
/**
 * Returns activity on databases inside of an elastic pool.
 *
 * @param api-version - The API version to use for the request.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param elasticPoolName - The name of the elastic pool.
 */
export const ElasticPoolDatabaseActivitiesListByElasticPool =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticPoolDatabaseActivitiesListByElasticPoolInput,
    outputSchema: ElasticPoolDatabaseActivitiesListByElasticPoolOutput,
  }));
// Input Schema
export const ElasticPoolOperationsCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    elasticPoolName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/operations/{operationId}/cancel",
    }),
  );
export type ElasticPoolOperationsCancelInput =
  typeof ElasticPoolOperationsCancelInput.Type;

// Output Schema
export const ElasticPoolOperationsCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticPoolOperationsCancelOutput =
  typeof ElasticPoolOperationsCancelOutput.Type;

// The operation
/**
 * Cancels the asynchronous operation on the elastic pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param operationId - The operation identifier.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ElasticPoolOperationsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ElasticPoolOperationsCancelInput,
    outputSchema: ElasticPoolOperationsCancelOutput,
  }),
);
// Input Schema
export const ElasticPoolOperationsListByElasticPoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    elasticPoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/operations",
    }),
  );
export type ElasticPoolOperationsListByElasticPoolInput =
  typeof ElasticPoolOperationsListByElasticPoolInput.Type;

// Output Schema
export const ElasticPoolOperationsListByElasticPoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ElasticPoolOperationsListByElasticPoolOutput =
  typeof ElasticPoolOperationsListByElasticPoolOutput.Type;

// The operation
/**
 * Gets a list of operations performed on the elastic pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ElasticPoolOperationsListByElasticPool =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ElasticPoolOperationsListByElasticPoolInput,
    outputSchema: ElasticPoolOperationsListByElasticPoolOutput,
  }));
// Input Schema
export const ElasticPoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    elasticPoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}",
    }),
  );
export type ElasticPoolsCreateOrUpdateInput =
  typeof ElasticPoolsCreateOrUpdateInput.Type;

// Output Schema
export const ElasticPoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ElasticPoolsCreateOrUpdateOutput =
  typeof ElasticPoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an elastic pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param elasticPoolName - The name of the elastic pool.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ElasticPoolsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ElasticPoolsCreateOrUpdateInput,
    outputSchema: ElasticPoolsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ElasticPoolsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    elasticPoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}",
    }),
  );
export type ElasticPoolsDeleteInput = typeof ElasticPoolsDeleteInput.Type;

// Output Schema
export const ElasticPoolsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticPoolsDeleteOutput = typeof ElasticPoolsDeleteOutput.Type;

// The operation
/**
 * Deletes an elastic pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param elasticPoolName - The name of the elastic pool.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ElasticPoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ElasticPoolsDeleteInput,
  outputSchema: ElasticPoolsDeleteOutput,
}));
// Input Schema
export const ElasticPoolsFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    elasticPoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/failover",
    }),
  );
export type ElasticPoolsFailoverInput = typeof ElasticPoolsFailoverInput.Type;

// Output Schema
export const ElasticPoolsFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ElasticPoolsFailoverOutput = typeof ElasticPoolsFailoverOutput.Type;

// The operation
/**
 * Failovers an elastic pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param elasticPoolName - The name of the elastic pool to failover.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ElasticPoolsFailover = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ElasticPoolsFailoverInput,
    outputSchema: ElasticPoolsFailoverOutput,
  }),
);
// Input Schema
export const ElasticPoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  elasticPoolName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}",
  }),
);
export type ElasticPoolsGetInput = typeof ElasticPoolsGetInput.Type;

// Output Schema
export const ElasticPoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ElasticPoolsGetOutput = typeof ElasticPoolsGetOutput.Type;

// The operation
/**
 * Gets an elastic pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param elasticPoolName - The name of the elastic pool.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ElasticPoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ElasticPoolsGetInput,
  outputSchema: ElasticPoolsGetOutput,
}));
// Input Schema
export const ElasticPoolsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $skip: Schema.optional(Schema.Number),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools",
    }),
  );
export type ElasticPoolsListByServerInput =
  typeof ElasticPoolsListByServerInput.Type;

// Output Schema
export const ElasticPoolsListByServerOutput =
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
export type ElasticPoolsListByServerOutput =
  typeof ElasticPoolsListByServerOutput.Type;

// The operation
/**
 * Gets all elastic pools in a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $skip - The number of elements in the collection to skip.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ElasticPoolsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ElasticPoolsListByServerInput,
    outputSchema: ElasticPoolsListByServerOutput,
  }),
);
// Input Schema
export const ElasticPoolsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    elasticPoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}",
    }),
  );
export type ElasticPoolsUpdateInput = typeof ElasticPoolsUpdateInput.Type;

// Output Schema
export const ElasticPoolsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ElasticPoolsUpdateOutput = typeof ElasticPoolsUpdateOutput.Type;

// The operation
/**
 * Updates an elastic pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param elasticPoolName - The name of the elastic pool.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ElasticPoolsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ElasticPoolsUpdateInput,
  outputSchema: ElasticPoolsUpdateOutput,
}));
// Input Schema
export const EncryptionProtectorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector/{encryptionProtectorName}",
    }),
  );
export type EncryptionProtectorsCreateOrUpdateInput =
  typeof EncryptionProtectorsCreateOrUpdateInput.Type;

// Output Schema
export const EncryptionProtectorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EncryptionProtectorsCreateOrUpdateOutput =
  typeof EncryptionProtectorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates an existing encryption protector.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param encryptionProtectorName - The name of the encryption protector to be updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const EncryptionProtectorsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EncryptionProtectorsCreateOrUpdateInput,
    outputSchema: EncryptionProtectorsCreateOrUpdateOutput,
  }));
// Input Schema
export const EncryptionProtectorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector/{encryptionProtectorName}",
    }),
  );
export type EncryptionProtectorsGetInput =
  typeof EncryptionProtectorsGetInput.Type;

// Output Schema
export const EncryptionProtectorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EncryptionProtectorsGetOutput =
  typeof EncryptionProtectorsGetOutput.Type;

// The operation
/**
 * Gets a server encryption protector.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param encryptionProtectorName - The name of the encryption protector to be retrieved.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const EncryptionProtectorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EncryptionProtectorsGetInput,
    outputSchema: EncryptionProtectorsGetOutput,
  }),
);
// Input Schema
export const EncryptionProtectorsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector",
    }),
  );
export type EncryptionProtectorsListByServerInput =
  typeof EncryptionProtectorsListByServerInput.Type;

// Output Schema
export const EncryptionProtectorsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type EncryptionProtectorsListByServerOutput =
  typeof EncryptionProtectorsListByServerOutput.Type;

// The operation
/**
 * Gets a list of server encryption protectors
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const EncryptionProtectorsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EncryptionProtectorsListByServerInput,
    outputSchema: EncryptionProtectorsListByServerOutput,
  }));
// Input Schema
export const EncryptionProtectorsRevalidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/encryptionProtector/{encryptionProtectorName}/revalidate",
    }),
  );
export type EncryptionProtectorsRevalidateInput =
  typeof EncryptionProtectorsRevalidateInput.Type;

// Output Schema
export const EncryptionProtectorsRevalidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type EncryptionProtectorsRevalidateOutput =
  typeof EncryptionProtectorsRevalidateOutput.Type;

// The operation
/**
 * Revalidates an existing encryption protector.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param encryptionProtectorName - The name of the encryption protector to be updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const EncryptionProtectorsRevalidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EncryptionProtectorsRevalidateInput,
    outputSchema: EncryptionProtectorsRevalidateOutput,
  }));
// Input Schema
export const EndpointCertificatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    endpointType: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/endpointCertificates/{endpointType}",
    }),
  );
export type EndpointCertificatesGetInput =
  typeof EndpointCertificatesGetInput.Type;

// Output Schema
export const EndpointCertificatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type EndpointCertificatesGetOutput =
  typeof EndpointCertificatesGetOutput.Type;

// The operation
/**
 * Gets a certificate used on the endpoint with the given id.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param endpointType - Type of the endpoint whose certificate the customer is looking for.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const EndpointCertificatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: EndpointCertificatesGetInput,
    outputSchema: EndpointCertificatesGetOutput,
  }),
);
// Input Schema
export const EndpointCertificatesListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/endpointCertificates",
    }),
  );
export type EndpointCertificatesListByInstanceInput =
  typeof EndpointCertificatesListByInstanceInput.Type;

// Output Schema
export const EndpointCertificatesListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type EndpointCertificatesListByInstanceOutput =
  typeof EndpointCertificatesListByInstanceOutput.Type;

// The operation
/**
 * List certificates used on endpoints on the target instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const EndpointCertificatesListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: EndpointCertificatesListByInstanceInput,
    outputSchema: EndpointCertificatesListByInstanceOutput,
  }));
// Input Schema
export const ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extendedAuditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateInput =
  typeof ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOutput =
  typeof ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an extended database's blob auditing policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateInput,
    outputSchema: ExtendedDatabaseBlobAuditingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ExtendedDatabaseBlobAuditingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extendedAuditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type ExtendedDatabaseBlobAuditingPoliciesGetInput =
  typeof ExtendedDatabaseBlobAuditingPoliciesGetInput.Type;

// Output Schema
export const ExtendedDatabaseBlobAuditingPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExtendedDatabaseBlobAuditingPoliciesGetOutput =
  typeof ExtendedDatabaseBlobAuditingPoliciesGetOutput.Type;

// The operation
/**
 * Gets an extended database's blob auditing policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ExtendedDatabaseBlobAuditingPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExtendedDatabaseBlobAuditingPoliciesGetInput,
    outputSchema: ExtendedDatabaseBlobAuditingPoliciesGetOutput,
  }));
// Input Schema
export const ExtendedDatabaseBlobAuditingPoliciesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/extendedAuditingSettings",
    }),
  );
export type ExtendedDatabaseBlobAuditingPoliciesListByDatabaseInput =
  typeof ExtendedDatabaseBlobAuditingPoliciesListByDatabaseInput.Type;

// Output Schema
export const ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOutput =
  typeof ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOutput.Type;

// The operation
/**
 * Lists extended auditing settings of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ExtendedDatabaseBlobAuditingPoliciesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExtendedDatabaseBlobAuditingPoliciesListByDatabaseInput,
    outputSchema: ExtendedDatabaseBlobAuditingPoliciesListByDatabaseOutput,
  }));
// Input Schema
export const ExtendedServerBlobAuditingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/extendedAuditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type ExtendedServerBlobAuditingPoliciesCreateOrUpdateInput =
  typeof ExtendedServerBlobAuditingPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ExtendedServerBlobAuditingPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExtendedServerBlobAuditingPoliciesCreateOrUpdateOutput =
  typeof ExtendedServerBlobAuditingPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an extended server's blob auditing policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ExtendedServerBlobAuditingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExtendedServerBlobAuditingPoliciesCreateOrUpdateInput,
    outputSchema: ExtendedServerBlobAuditingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ExtendedServerBlobAuditingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/extendedAuditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type ExtendedServerBlobAuditingPoliciesGetInput =
  typeof ExtendedServerBlobAuditingPoliciesGetInput.Type;

// Output Schema
export const ExtendedServerBlobAuditingPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ExtendedServerBlobAuditingPoliciesGetOutput =
  typeof ExtendedServerBlobAuditingPoliciesGetOutput.Type;

// The operation
/**
 * Gets an extended server's blob auditing policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ExtendedServerBlobAuditingPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExtendedServerBlobAuditingPoliciesGetInput,
    outputSchema: ExtendedServerBlobAuditingPoliciesGetOutput,
  }));
// Input Schema
export const ExtendedServerBlobAuditingPoliciesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/extendedAuditingSettings",
    }),
  );
export type ExtendedServerBlobAuditingPoliciesListByServerInput =
  typeof ExtendedServerBlobAuditingPoliciesListByServerInput.Type;

// Output Schema
export const ExtendedServerBlobAuditingPoliciesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ExtendedServerBlobAuditingPoliciesListByServerOutput =
  typeof ExtendedServerBlobAuditingPoliciesListByServerOutput.Type;

// The operation
/**
 * Lists extended auditing settings of a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ExtendedServerBlobAuditingPoliciesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ExtendedServerBlobAuditingPoliciesListByServerInput,
    outputSchema: ExtendedServerBlobAuditingPoliciesListByServerOutput,
  }));
// Input Schema
export const FailoverGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}",
    }),
  );
export type FailoverGroupsCreateOrUpdateInput =
  typeof FailoverGroupsCreateOrUpdateInput.Type;

// Output Schema
export const FailoverGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FailoverGroupsCreateOrUpdateOutput =
  typeof FailoverGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a failover group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server containing the failover group.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FailoverGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FailoverGroupsCreateOrUpdateInput,
    outputSchema: FailoverGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const FailoverGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}",
    }),
  );
export type FailoverGroupsDeleteInput = typeof FailoverGroupsDeleteInput.Type;

// Output Schema
export const FailoverGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FailoverGroupsDeleteOutput = typeof FailoverGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a failover group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server containing the failover group.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FailoverGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FailoverGroupsDeleteInput,
    outputSchema: FailoverGroupsDeleteOutput,
  }),
);
// Input Schema
export const FailoverGroupsFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}/failover",
    }),
  );
export type FailoverGroupsFailoverInput =
  typeof FailoverGroupsFailoverInput.Type;

// Output Schema
export const FailoverGroupsFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FailoverGroupsFailoverOutput =
  typeof FailoverGroupsFailoverOutput.Type;

// The operation
/**
 * Fails over from the current primary server to this server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server containing the failover group.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FailoverGroupsFailover = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FailoverGroupsFailoverInput,
    outputSchema: FailoverGroupsFailoverOutput,
  }),
);
// Input Schema
export const FailoverGroupsForceFailoverAllowDataLossInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}/forceFailoverAllowDataLoss",
    }),
  );
export type FailoverGroupsForceFailoverAllowDataLossInput =
  typeof FailoverGroupsForceFailoverAllowDataLossInput.Type;

// Output Schema
export const FailoverGroupsForceFailoverAllowDataLossOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FailoverGroupsForceFailoverAllowDataLossOutput =
  typeof FailoverGroupsForceFailoverAllowDataLossOutput.Type;

// The operation
/**
 * Fails over from the current primary server to this server. This operation might result in data loss.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server containing the failover group.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FailoverGroupsForceFailoverAllowDataLoss =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FailoverGroupsForceFailoverAllowDataLossInput,
    outputSchema: FailoverGroupsForceFailoverAllowDataLossOutput,
  }));
// Input Schema
export const FailoverGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}",
  }),
);
export type FailoverGroupsGetInput = typeof FailoverGroupsGetInput.Type;

// Output Schema
export const FailoverGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FailoverGroupsGetOutput = typeof FailoverGroupsGetOutput.Type;

// The operation
/**
 * Gets a failover group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server containing the failover group.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FailoverGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FailoverGroupsGetInput,
  outputSchema: FailoverGroupsGetOutput,
}));
// Input Schema
export const FailoverGroupsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups",
    }),
  );
export type FailoverGroupsListByServerInput =
  typeof FailoverGroupsListByServerInput.Type;

// Output Schema
export const FailoverGroupsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type FailoverGroupsListByServerOutput =
  typeof FailoverGroupsListByServerOutput.Type;

// The operation
/**
 * Lists the failover groups in a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server containing the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FailoverGroupsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FailoverGroupsListByServerInput,
    outputSchema: FailoverGroupsListByServerOutput,
  }),
);
// Input Schema
export const FailoverGroupsTryPlannedBeforeForcedFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}/tryPlannedBeforeForcedFailover",
    }),
  );
export type FailoverGroupsTryPlannedBeforeForcedFailoverInput =
  typeof FailoverGroupsTryPlannedBeforeForcedFailoverInput.Type;

// Output Schema
export const FailoverGroupsTryPlannedBeforeForcedFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FailoverGroupsTryPlannedBeforeForcedFailoverOutput =
  typeof FailoverGroupsTryPlannedBeforeForcedFailoverOutput.Type;

// The operation
/**
 * Fails over from the current primary server to this server. This operation tries planned before forced failover but might still result in data loss.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FailoverGroupsTryPlannedBeforeForcedFailover =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FailoverGroupsTryPlannedBeforeForcedFailoverInput,
    outputSchema: FailoverGroupsTryPlannedBeforeForcedFailoverOutput,
  }));
// Input Schema
export const FailoverGroupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/failoverGroups/{failoverGroupName}",
    }),
  );
export type FailoverGroupsUpdateInput = typeof FailoverGroupsUpdateInput.Type;

// Output Schema
export const FailoverGroupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FailoverGroupsUpdateOutput = typeof FailoverGroupsUpdateOutput.Type;

// The operation
/**
 * Updates a failover group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server containing the failover group.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FailoverGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FailoverGroupsUpdateInput,
    outputSchema: FailoverGroupsUpdateOutput,
  }),
);
// Input Schema
export const FirewallRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    firewallRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/firewallRules/{firewallRuleName}",
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
 * Creates or updates a firewall rule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param firewallRuleName - The name of the firewall rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
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
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    firewallRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/firewallRules/{firewallRuleName}",
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
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param firewallRuleName - The name of the firewall rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FirewallRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirewallRulesDeleteInput,
  outputSchema: FirewallRulesDeleteOutput,
}));
// Input Schema
export const FirewallRulesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  firewallRuleName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/firewallRules/{firewallRuleName}",
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
 * Gets a firewall rule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param firewallRuleName - The name of the firewall rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FirewallRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FirewallRulesGetInput,
  outputSchema: FirewallRulesGetOutput,
}));
// Input Schema
export const FirewallRulesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/firewallRules",
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
 * Gets a list of firewall rules.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FirewallRulesListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FirewallRulesListByServerInput,
    outputSchema: FirewallRulesListByServerOutput,
  }),
);
// Input Schema
export const FirewallRulesReplaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/firewallRules",
    }),
  );
export type FirewallRulesReplaceInput = typeof FirewallRulesReplaceInput.Type;

// Output Schema
export const FirewallRulesReplaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FirewallRulesReplaceOutput = typeof FirewallRulesReplaceOutput.Type;

// The operation
/**
 * Replaces all firewall rules on the server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const FirewallRulesReplace = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FirewallRulesReplaceInput,
    outputSchema: FirewallRulesReplaceOutput,
  }),
);
// Input Schema
export const GeoBackupPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    geoBackupPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/geoBackupPolicies/{geoBackupPolicyName}",
    }),
  );
export type GeoBackupPoliciesCreateOrUpdateInput =
  typeof GeoBackupPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const GeoBackupPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GeoBackupPoliciesCreateOrUpdateOutput =
  typeof GeoBackupPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create or update a database default Geo backup policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param geoBackupPolicyName - The name of the Geo backup policy. This should always be 'Default'.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const GeoBackupPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GeoBackupPoliciesCreateOrUpdateInput,
    outputSchema: GeoBackupPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const GeoBackupPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    geoBackupPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/geoBackupPolicies/{geoBackupPolicyName}",
    }),
  );
export type GeoBackupPoliciesGetInput = typeof GeoBackupPoliciesGetInput.Type;

// Output Schema
export const GeoBackupPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type GeoBackupPoliciesGetOutput = typeof GeoBackupPoliciesGetOutput.Type;

// The operation
/**
 * Gets a Geo backup policy for the given database resource.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param geoBackupPolicyName - The name of the Geo backup policy. This should always be 'Default'.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const GeoBackupPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GeoBackupPoliciesGetInput,
    outputSchema: GeoBackupPoliciesGetOutput,
  }),
);
// Input Schema
export const GeoBackupPoliciesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/geoBackupPolicies",
    }),
  );
export type GeoBackupPoliciesListInput = typeof GeoBackupPoliciesListInput.Type;

// Output Schema
export const GeoBackupPoliciesListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type GeoBackupPoliciesListOutput =
  typeof GeoBackupPoliciesListOutput.Type;

// The operation
/**
 * Gets a list of Geo backup policies for the given database resource.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const GeoBackupPoliciesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GeoBackupPoliciesListInput,
    outputSchema: GeoBackupPoliciesListOutput,
  }),
);
// Input Schema
export const InstanceFailoverGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}",
    }),
  );
export type InstanceFailoverGroupsCreateOrUpdateInput =
  typeof InstanceFailoverGroupsCreateOrUpdateInput.Type;

// Output Schema
export const InstanceFailoverGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InstanceFailoverGroupsCreateOrUpdateOutput =
  typeof InstanceFailoverGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a failover group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstanceFailoverGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InstanceFailoverGroupsCreateOrUpdateInput,
    outputSchema: InstanceFailoverGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const InstanceFailoverGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}",
    }),
  );
export type InstanceFailoverGroupsDeleteInput =
  typeof InstanceFailoverGroupsDeleteInput.Type;

// Output Schema
export const InstanceFailoverGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InstanceFailoverGroupsDeleteOutput =
  typeof InstanceFailoverGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a failover group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstanceFailoverGroupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InstanceFailoverGroupsDeleteInput,
    outputSchema: InstanceFailoverGroupsDeleteOutput,
  }));
// Input Schema
export const InstanceFailoverGroupsFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}/failover",
    }),
  );
export type InstanceFailoverGroupsFailoverInput =
  typeof InstanceFailoverGroupsFailoverInput.Type;

// Output Schema
export const InstanceFailoverGroupsFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InstanceFailoverGroupsFailoverOutput =
  typeof InstanceFailoverGroupsFailoverOutput.Type;

// The operation
/**
 * Fails over from the current primary managed instance to this managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstanceFailoverGroupsFailover =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InstanceFailoverGroupsFailoverInput,
    outputSchema: InstanceFailoverGroupsFailoverOutput,
  }));
// Input Schema
export const InstanceFailoverGroupsForceFailoverAllowDataLossInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}/forceFailoverAllowDataLoss",
    }),
  );
export type InstanceFailoverGroupsForceFailoverAllowDataLossInput =
  typeof InstanceFailoverGroupsForceFailoverAllowDataLossInput.Type;

// Output Schema
export const InstanceFailoverGroupsForceFailoverAllowDataLossOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InstanceFailoverGroupsForceFailoverAllowDataLossOutput =
  typeof InstanceFailoverGroupsForceFailoverAllowDataLossOutput.Type;

// The operation
/**
 * Fails over from the current primary managed instance to this managed instance. This operation might result in data loss.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstanceFailoverGroupsForceFailoverAllowDataLoss =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InstanceFailoverGroupsForceFailoverAllowDataLossInput,
    outputSchema: InstanceFailoverGroupsForceFailoverAllowDataLossOutput,
  }));
// Input Schema
export const InstanceFailoverGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    failoverGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups/{failoverGroupName}",
    }),
  );
export type InstanceFailoverGroupsGetInput =
  typeof InstanceFailoverGroupsGetInput.Type;

// Output Schema
export const InstanceFailoverGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type InstanceFailoverGroupsGetOutput =
  typeof InstanceFailoverGroupsGetOutput.Type;

// The operation
/**
 * Gets a failover group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param failoverGroupName - The name of the failover group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstanceFailoverGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InstanceFailoverGroupsGetInput,
    outputSchema: InstanceFailoverGroupsGetOutput,
  }),
);
// Input Schema
export const InstanceFailoverGroupsListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/instanceFailoverGroups",
    }),
  );
export type InstanceFailoverGroupsListByLocationInput =
  typeof InstanceFailoverGroupsListByLocationInput.Type;

// Output Schema
export const InstanceFailoverGroupsListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type InstanceFailoverGroupsListByLocationOutput =
  typeof InstanceFailoverGroupsListByLocationOutput.Type;

// The operation
/**
 * Lists the failover groups in a location.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstanceFailoverGroupsListByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InstanceFailoverGroupsListByLocationInput,
    outputSchema: InstanceFailoverGroupsListByLocationOutput,
  }));
// Input Schema
export const InstancePoolsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    instancePoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}",
    }),
  );
export type InstancePoolsCreateOrUpdateInput =
  typeof InstancePoolsCreateOrUpdateInput.Type;

// Output Schema
export const InstancePoolsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type InstancePoolsCreateOrUpdateOutput =
  typeof InstancePoolsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an instance pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param instancePoolName - The name of the instance pool to be created or updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstancePoolsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InstancePoolsCreateOrUpdateInput,
    outputSchema: InstancePoolsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const InstancePoolsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    instancePoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}",
    }),
  );
export type InstancePoolsDeleteInput = typeof InstancePoolsDeleteInput.Type;

// Output Schema
export const InstancePoolsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InstancePoolsDeleteOutput = typeof InstancePoolsDeleteOutput.Type;

// The operation
/**
 * Deletes an instance pool
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param instancePoolName - The name of the instance pool to be deleted
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstancePoolsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancePoolsDeleteInput,
  outputSchema: InstancePoolsDeleteOutput,
}));
// Input Schema
export const InstancePoolsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  instancePoolName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}",
  }),
);
export type InstancePoolsGetInput = typeof InstancePoolsGetInput.Type;

// Output Schema
export const InstancePoolsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  },
);
export type InstancePoolsGetOutput = typeof InstancePoolsGetOutput.Type;

// The operation
/**
 * Gets an instance pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param instancePoolName - The name of the instance pool to be retrieved.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstancePoolsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancePoolsGetInput,
  outputSchema: InstancePoolsGetOutput,
}));
// Input Schema
export const InstancePoolsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/instancePools",
  }),
);
export type InstancePoolsListInput = typeof InstancePoolsListInput.Type;

// Output Schema
export const InstancePoolsListOutput =
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
export type InstancePoolsListOutput = typeof InstancePoolsListOutput.Type;

// The operation
/**
 * Gets a list of all instance pools in the subscription.
 *
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstancePoolsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancePoolsListInput,
  outputSchema: InstancePoolsListOutput,
}));
// Input Schema
export const InstancePoolsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools",
    }),
  );
export type InstancePoolsListByResourceGroupInput =
  typeof InstancePoolsListByResourceGroupInput.Type;

// Output Schema
export const InstancePoolsListByResourceGroupOutput =
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
export type InstancePoolsListByResourceGroupOutput =
  typeof InstancePoolsListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of instance pools in the resource group
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstancePoolsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: InstancePoolsListByResourceGroupInput,
    outputSchema: InstancePoolsListByResourceGroupOutput,
  }));
// Input Schema
export const InstancePoolsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    instancePoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}",
    }),
  );
export type InstancePoolsUpdateInput = typeof InstancePoolsUpdateInput.Type;

// Output Schema
export const InstancePoolsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type InstancePoolsUpdateOutput = typeof InstancePoolsUpdateOutput.Type;

// The operation
/**
 * Updates an instance pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param instancePoolName - The name of the instance pool to be updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const InstancePoolsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: InstancePoolsUpdateInput,
  outputSchema: InstancePoolsUpdateOutput,
}));
// Input Schema
export const IPv6FirewallRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    firewallRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/ipv6FirewallRules/{firewallRuleName}",
    }),
  );
export type IPv6FirewallRulesCreateOrUpdateInput =
  typeof IPv6FirewallRulesCreateOrUpdateInput.Type;

// Output Schema
export const IPv6FirewallRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IPv6FirewallRulesCreateOrUpdateOutput =
  typeof IPv6FirewallRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an IPv6 firewall rule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param firewallRuleName - The name of the firewall rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const IPv6FirewallRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IPv6FirewallRulesCreateOrUpdateInput,
    outputSchema: IPv6FirewallRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const IPv6FirewallRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    firewallRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/ipv6FirewallRules/{firewallRuleName}",
    }),
  );
export type IPv6FirewallRulesDeleteInput =
  typeof IPv6FirewallRulesDeleteInput.Type;

// Output Schema
export const IPv6FirewallRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type IPv6FirewallRulesDeleteOutput =
  typeof IPv6FirewallRulesDeleteOutput.Type;

// The operation
/**
 * Deletes an IPv6 firewall rule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param firewallRuleName - The name of the firewall rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const IPv6FirewallRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IPv6FirewallRulesDeleteInput,
    outputSchema: IPv6FirewallRulesDeleteOutput,
  }),
);
// Input Schema
export const IPv6FirewallRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    firewallRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/ipv6FirewallRules/{firewallRuleName}",
    }),
  );
export type IPv6FirewallRulesGetInput = typeof IPv6FirewallRulesGetInput.Type;

// Output Schema
export const IPv6FirewallRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type IPv6FirewallRulesGetOutput = typeof IPv6FirewallRulesGetOutput.Type;

// The operation
/**
 * Gets an IPv6 firewall rule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param firewallRuleName - The name of the firewall rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const IPv6FirewallRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: IPv6FirewallRulesGetInput,
    outputSchema: IPv6FirewallRulesGetOutput,
  }),
);
// Input Schema
export const IPv6FirewallRulesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/ipv6FirewallRules",
    }),
  );
export type IPv6FirewallRulesListByServerInput =
  typeof IPv6FirewallRulesListByServerInput.Type;

// Output Schema
export const IPv6FirewallRulesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type IPv6FirewallRulesListByServerOutput =
  typeof IPv6FirewallRulesListByServerOutput.Type;

// The operation
/**
 * Gets a list of IPv6 firewall rules.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const IPv6FirewallRulesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: IPv6FirewallRulesListByServerInput,
    outputSchema: IPv6FirewallRulesListByServerOutput,
  }));
// Input Schema
export const JobAgentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}",
    }),
  );
export type JobAgentsCreateOrUpdateInput =
  typeof JobAgentsCreateOrUpdateInput.Type;

// Output Schema
export const JobAgentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type JobAgentsCreateOrUpdateOutput =
  typeof JobAgentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a job agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent to be created or updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobAgentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobAgentsCreateOrUpdateInput,
    outputSchema: JobAgentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const JobAgentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}",
  }),
);
export type JobAgentsDeleteInput = typeof JobAgentsDeleteInput.Type;

// Output Schema
export const JobAgentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobAgentsDeleteOutput = typeof JobAgentsDeleteOutput.Type;

// The operation
/**
 * Deletes a job agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent to be deleted.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobAgentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobAgentsDeleteInput,
  outputSchema: JobAgentsDeleteOutput,
}));
// Input Schema
export const JobAgentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}",
  }),
);
export type JobAgentsGetInput = typeof JobAgentsGetInput.Type;

// Output Schema
export const JobAgentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type JobAgentsGetOutput = typeof JobAgentsGetOutput.Type;

// The operation
/**
 * Gets a job agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent to be retrieved.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobAgentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobAgentsGetInput,
  outputSchema: JobAgentsGetOutput,
}));
// Input Schema
export const JobAgentsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents",
    }),
  );
export type JobAgentsListByServerInput = typeof JobAgentsListByServerInput.Type;

// Output Schema
export const JobAgentsListByServerOutput =
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
export type JobAgentsListByServerOutput =
  typeof JobAgentsListByServerOutput.Type;

// The operation
/**
 * Gets a list of job agents in a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobAgentsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobAgentsListByServerInput,
    outputSchema: JobAgentsListByServerOutput,
  }),
);
// Input Schema
export const JobAgentsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}",
  }),
);
export type JobAgentsUpdateInput = typeof JobAgentsUpdateInput.Type;

// Output Schema
export const JobAgentsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type JobAgentsUpdateOutput = typeof JobAgentsUpdateOutput.Type;

// The operation
/**
 * Updates a job agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent to be updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobAgentsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobAgentsUpdateInput,
  outputSchema: JobAgentsUpdateOutput,
}));
// Input Schema
export const JobCredentialsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    credentialName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/credentials/{credentialName}",
    }),
  );
export type JobCredentialsCreateOrUpdateInput =
  typeof JobCredentialsCreateOrUpdateInput.Type;

// Output Schema
export const JobCredentialsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobCredentialsCreateOrUpdateOutput =
  typeof JobCredentialsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a job credential.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param credentialName - The name of the credential.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobCredentialsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobCredentialsCreateOrUpdateInput,
    outputSchema: JobCredentialsCreateOrUpdateOutput,
  }));
// Input Schema
export const JobCredentialsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    credentialName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/credentials/{credentialName}",
    }),
  );
export type JobCredentialsDeleteInput = typeof JobCredentialsDeleteInput.Type;

// Output Schema
export const JobCredentialsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobCredentialsDeleteOutput = typeof JobCredentialsDeleteOutput.Type;

// The operation
/**
 * Deletes a job credential.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param credentialName - The name of the credential.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobCredentialsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobCredentialsDeleteInput,
    outputSchema: JobCredentialsDeleteOutput,
  }),
);
// Input Schema
export const JobCredentialsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    credentialName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/credentials/{credentialName}",
  }),
);
export type JobCredentialsGetInput = typeof JobCredentialsGetInput.Type;

// Output Schema
export const JobCredentialsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobCredentialsGetOutput = typeof JobCredentialsGetOutput.Type;

// The operation
/**
 * Gets a jobs credential.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param credentialName - The name of the credential.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobCredentialsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobCredentialsGetInput,
  outputSchema: JobCredentialsGetOutput,
}));
// Input Schema
export const JobCredentialsListByAgentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/credentials",
    }),
  );
export type JobCredentialsListByAgentInput =
  typeof JobCredentialsListByAgentInput.Type;

// Output Schema
export const JobCredentialsListByAgentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobCredentialsListByAgentOutput =
  typeof JobCredentialsListByAgentOutput.Type;

// The operation
/**
 * Gets a list of jobs credentials.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobCredentialsListByAgent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobCredentialsListByAgentInput,
    outputSchema: JobCredentialsListByAgentOutput,
  }),
);
// Input Schema
export const JobExecutionsCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    jobExecutionId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/cancel",
    }),
  );
export type JobExecutionsCancelInput = typeof JobExecutionsCancelInput.Type;

// Output Schema
export const JobExecutionsCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobExecutionsCancelOutput = typeof JobExecutionsCancelOutput.Type;

// The operation
/**
 * Requests cancellation of a job execution.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job.
 * @param jobExecutionId - The id of the job execution to cancel.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobExecutionsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobExecutionsCancelInput,
  outputSchema: JobExecutionsCancelOutput,
}));
// Input Schema
export const JobExecutionsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/start",
    }),
  );
export type JobExecutionsCreateInput = typeof JobExecutionsCreateInput.Type;

// Output Schema
export const JobExecutionsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobExecutionsCreateOutput = typeof JobExecutionsCreateOutput.Type;

// The operation
/**
 * Starts an elastic job execution.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobExecutionsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobExecutionsCreateInput,
  outputSchema: JobExecutionsCreateOutput,
}));
// Input Schema
export const JobExecutionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    jobExecutionId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}",
    }),
  );
export type JobExecutionsCreateOrUpdateInput =
  typeof JobExecutionsCreateOrUpdateInput.Type;

// Output Schema
export const JobExecutionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobExecutionsCreateOrUpdateOutput =
  typeof JobExecutionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a job execution.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param jobExecutionId - The job execution id to create the job execution under.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobExecutionsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobExecutionsCreateOrUpdateInput,
    outputSchema: JobExecutionsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const JobExecutionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  jobExecutionId: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}",
  }),
);
export type JobExecutionsGetInput = typeof JobExecutionsGetInput.Type;

// Output Schema
export const JobExecutionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type JobExecutionsGetOutput = typeof JobExecutionsGetOutput.Type;

// The operation
/**
 * Gets a job execution.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job.
 * @param jobExecutionId - The id of the job execution
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobExecutionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobExecutionsGetInput,
  outputSchema: JobExecutionsGetOutput,
}));
// Input Schema
export const JobExecutionsListByAgentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    createTimeMin: Schema.optional(Schema.String),
    createTimeMax: Schema.optional(Schema.String),
    endTimeMin: Schema.optional(Schema.String),
    endTimeMax: Schema.optional(Schema.String),
    isActive: Schema.optional(Schema.Boolean),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/executions",
    }),
  );
export type JobExecutionsListByAgentInput =
  typeof JobExecutionsListByAgentInput.Type;

// Output Schema
export const JobExecutionsListByAgentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobExecutionsListByAgentOutput =
  typeof JobExecutionsListByAgentOutput.Type;

// The operation
/**
 * Lists all executions in a job agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param createTimeMin - If specified, only job executions created at or after the specified time are included.
 * @param createTimeMax - If specified, only job executions created before the specified time are included.
 * @param endTimeMin - If specified, only job executions completed at or after the specified time are included.
 * @param endTimeMax - If specified, only job executions completed before the specified time are included.
 * @param isActive - If specified, only active or only completed job executions are included.
 * @param $skip - The number of elements in the collection to skip.
 * @param $top - The number of elements to return from the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobExecutionsListByAgent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobExecutionsListByAgentInput,
    outputSchema: JobExecutionsListByAgentOutput,
  }),
);
// Input Schema
export const JobExecutionsListByJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    createTimeMin: Schema.optional(Schema.String),
    createTimeMax: Schema.optional(Schema.String),
    endTimeMin: Schema.optional(Schema.String),
    endTimeMax: Schema.optional(Schema.String),
    isActive: Schema.optional(Schema.Boolean),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions",
    }),
  );
export type JobExecutionsListByJobInput =
  typeof JobExecutionsListByJobInput.Type;

// Output Schema
export const JobExecutionsListByJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobExecutionsListByJobOutput =
  typeof JobExecutionsListByJobOutput.Type;

// The operation
/**
 * Lists a job's executions.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param createTimeMin - If specified, only job executions created at or after the specified time are included.
 * @param createTimeMax - If specified, only job executions created before the specified time are included.
 * @param endTimeMin - If specified, only job executions completed at or after the specified time are included.
 * @param endTimeMax - If specified, only job executions completed before the specified time are included.
 * @param isActive - If specified, only active or only completed job executions are included.
 * @param $skip - The number of elements in the collection to skip.
 * @param $top - The number of elements to return from the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobExecutionsListByJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobExecutionsListByJobInput,
    outputSchema: JobExecutionsListByJobOutput,
  }),
);
// Input Schema
export const JobPrivateEndpointsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    privateEndpointName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/privateEndpoints/{privateEndpointName}",
    }),
  );
export type JobPrivateEndpointsCreateOrUpdateInput =
  typeof JobPrivateEndpointsCreateOrUpdateInput.Type;

// Output Schema
export const JobPrivateEndpointsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobPrivateEndpointsCreateOrUpdateOutput =
  typeof JobPrivateEndpointsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a private endpoint.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param privateEndpointName - The name of the private endpoint.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobPrivateEndpointsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobPrivateEndpointsCreateOrUpdateInput,
    outputSchema: JobPrivateEndpointsCreateOrUpdateOutput,
  }));
// Input Schema
export const JobPrivateEndpointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    privateEndpointName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/privateEndpoints/{privateEndpointName}",
    }),
  );
export type JobPrivateEndpointsDeleteInput =
  typeof JobPrivateEndpointsDeleteInput.Type;

// Output Schema
export const JobPrivateEndpointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobPrivateEndpointsDeleteOutput =
  typeof JobPrivateEndpointsDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param privateEndpointName - The name of the private endpoint to delete.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobPrivateEndpointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobPrivateEndpointsDeleteInput,
    outputSchema: JobPrivateEndpointsDeleteOutput,
  }),
);
// Input Schema
export const JobPrivateEndpointsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    privateEndpointName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/privateEndpoints/{privateEndpointName}",
    }),
  );
export type JobPrivateEndpointsGetInput =
  typeof JobPrivateEndpointsGetInput.Type;

// Output Schema
export const JobPrivateEndpointsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobPrivateEndpointsGetOutput =
  typeof JobPrivateEndpointsGetOutput.Type;

// The operation
/**
 * Gets a private endpoint.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param privateEndpointName - The name of the private endpoint to get.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobPrivateEndpointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobPrivateEndpointsGetInput,
    outputSchema: JobPrivateEndpointsGetOutput,
  }),
);
// Input Schema
export const JobPrivateEndpointsListByAgentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/privateEndpoints",
    }),
  );
export type JobPrivateEndpointsListByAgentInput =
  typeof JobPrivateEndpointsListByAgentInput.Type;

// Output Schema
export const JobPrivateEndpointsListByAgentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobPrivateEndpointsListByAgentOutput =
  typeof JobPrivateEndpointsListByAgentOutput.Type;

// The operation
/**
 * Gets a list of job agent private endpoints.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobPrivateEndpointsListByAgent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobPrivateEndpointsListByAgentInput,
    outputSchema: JobPrivateEndpointsListByAgentOutput,
  }));
// Input Schema
export const JobsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}",
    }),
  );
export type JobsCreateOrUpdateInput = typeof JobsCreateOrUpdateInput.Type;

// Output Schema
export const JobsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobsCreateOrUpdateOutput = typeof JobsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a job.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsCreateOrUpdateInput,
  outputSchema: JobsCreateOrUpdateOutput,
}));
// Input Schema
export const JobsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}",
  }),
);
export type JobsDeleteInput = typeof JobsDeleteInput.Type;

// Output Schema
export const JobsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobsDeleteOutput = typeof JobsDeleteOutput.Type;

// The operation
/**
 * Deletes a job.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to delete.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsDeleteInput,
  outputSchema: JobsDeleteOutput,
}));
// Input Schema
export const JobsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}",
  }),
);
export type JobsGetInput = typeof JobsGetInput.Type;

// Output Schema
export const JobsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobsGetOutput = typeof JobsGetOutput.Type;

// The operation
/**
 * Gets a job.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsGetInput,
  outputSchema: JobsGetOutput,
}));
// Input Schema
export const JobsListByAgentInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs",
  }),
);
export type JobsListByAgentInput = typeof JobsListByAgentInput.Type;

// Output Schema
export const JobsListByAgentOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
  nextLink: Schema.optional(Schema.String),
});
export type JobsListByAgentOutput = typeof JobsListByAgentOutput.Type;

// The operation
/**
 * Gets a list of jobs.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobsListByAgent = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobsListByAgentInput,
  outputSchema: JobsListByAgentOutput,
}));
// Input Schema
export const JobStepExecutionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    jobExecutionId: Schema.String.pipe(T.PathParam()),
    stepName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/steps/{stepName}",
    }),
  );
export type JobStepExecutionsGetInput = typeof JobStepExecutionsGetInput.Type;

// Output Schema
export const JobStepExecutionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobStepExecutionsGetOutput = typeof JobStepExecutionsGetOutput.Type;

// The operation
/**
 * Gets a step execution of a job execution.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param jobExecutionId - The unique id of the job execution
 * @param stepName - The name of the step.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobStepExecutionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobStepExecutionsGetInput,
    outputSchema: JobStepExecutionsGetOutput,
  }),
);
// Input Schema
export const JobStepExecutionsListByJobExecutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    jobExecutionId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    createTimeMin: Schema.optional(Schema.String),
    createTimeMax: Schema.optional(Schema.String),
    endTimeMin: Schema.optional(Schema.String),
    endTimeMax: Schema.optional(Schema.String),
    isActive: Schema.optional(Schema.Boolean),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/steps",
    }),
  );
export type JobStepExecutionsListByJobExecutionInput =
  typeof JobStepExecutionsListByJobExecutionInput.Type;

// Output Schema
export const JobStepExecutionsListByJobExecutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobStepExecutionsListByJobExecutionOutput =
  typeof JobStepExecutionsListByJobExecutionOutput.Type;

// The operation
/**
 * Lists the step executions of a job execution.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param jobExecutionId - The id of the job execution
 * @param createTimeMin - If specified, only job executions created at or after the specified time are included.
 * @param createTimeMax - If specified, only job executions created before the specified time are included.
 * @param endTimeMin - If specified, only job executions completed at or after the specified time are included.
 * @param endTimeMax - If specified, only job executions completed before the specified time are included.
 * @param isActive - If specified, only active or only completed job executions are included.
 * @param $skip - The number of elements in the collection to skip.
 * @param $top - The number of elements to return from the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobStepExecutionsListByJobExecution =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobStepExecutionsListByJobExecutionInput,
    outputSchema: JobStepExecutionsListByJobExecutionOutput,
  }));
// Input Schema
export const JobStepsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    stepName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/steps/{stepName}",
    }),
  );
export type JobStepsCreateOrUpdateInput =
  typeof JobStepsCreateOrUpdateInput.Type;

// Output Schema
export const JobStepsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobStepsCreateOrUpdateOutput =
  typeof JobStepsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a job step. This will implicitly create a new job version.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job.
 * @param stepName - The name of the job step.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobStepsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobStepsCreateOrUpdateInput,
    outputSchema: JobStepsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const JobStepsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  stepName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/steps/{stepName}",
  }),
);
export type JobStepsDeleteInput = typeof JobStepsDeleteInput.Type;

// Output Schema
export const JobStepsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobStepsDeleteOutput = typeof JobStepsDeleteOutput.Type;

// The operation
/**
 * Deletes a job step. This will implicitly create a new job version.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job.
 * @param stepName - The name of the job step to delete.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobStepsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobStepsDeleteInput,
  outputSchema: JobStepsDeleteOutput,
}));
// Input Schema
export const JobStepsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  stepName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/steps/{stepName}",
  }),
);
export type JobStepsGetInput = typeof JobStepsGetInput.Type;

// Output Schema
export const JobStepsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobStepsGetOutput = typeof JobStepsGetOutput.Type;

// The operation
/**
 * Gets a job step in a job's current version.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job.
 * @param stepName - The name of the job step.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobStepsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobStepsGetInput,
  outputSchema: JobStepsGetOutput,
}));
// Input Schema
export const JobStepsGetByVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    jobVersion: Schema.Number.pipe(T.PathParam()),
    stepName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/versions/{jobVersion}/steps/{stepName}",
    }),
  );
export type JobStepsGetByVersionInput = typeof JobStepsGetByVersionInput.Type;

// Output Schema
export const JobStepsGetByVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobStepsGetByVersionOutput = typeof JobStepsGetByVersionOutput.Type;

// The operation
/**
 * Gets the specified version of a job step.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job.
 * @param jobVersion - The version of the job to get.
 * @param stepName - The name of the job step.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobStepsGetByVersion = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobStepsGetByVersionInput,
    outputSchema: JobStepsGetByVersionOutput,
  }),
);
// Input Schema
export const JobStepsListByJobInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/steps",
  }),
);
export type JobStepsListByJobInput = typeof JobStepsListByJobInput.Type;

// Output Schema
export const JobStepsListByJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobStepsListByJobOutput = typeof JobStepsListByJobOutput.Type;

// The operation
/**
 * Gets all job steps for a job's current version.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobStepsListByJob = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobStepsListByJobInput,
  outputSchema: JobStepsListByJobOutput,
}));
// Input Schema
export const JobStepsListByVersionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    jobVersion: Schema.Number.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/versions/{jobVersion}/steps",
    }),
  );
export type JobStepsListByVersionInput = typeof JobStepsListByVersionInput.Type;

// Output Schema
export const JobStepsListByVersionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobStepsListByVersionOutput =
  typeof JobStepsListByVersionOutput.Type;

// The operation
/**
 * Gets all job steps in the specified job version.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param jobVersion - The version of the job to get.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobStepsListByVersion = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobStepsListByVersionInput,
    outputSchema: JobStepsListByVersionOutput,
  }),
);
// Input Schema
export const JobTargetExecutionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    jobExecutionId: Schema.String.pipe(T.PathParam()),
    stepName: Schema.String.pipe(T.PathParam()),
    targetId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/steps/{stepName}/targets/{targetId}",
    }),
  );
export type JobTargetExecutionsGetInput =
  typeof JobTargetExecutionsGetInput.Type;

// Output Schema
export const JobTargetExecutionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobTargetExecutionsGetOutput =
  typeof JobTargetExecutionsGetOutput.Type;

// The operation
/**
 * Gets a target execution.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param jobExecutionId - The unique id of the job execution
 * @param stepName - The name of the step.
 * @param targetId - The target id.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobTargetExecutionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobTargetExecutionsGetInput,
    outputSchema: JobTargetExecutionsGetOutput,
  }),
);
// Input Schema
export const JobTargetExecutionsListByJobExecutionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    jobExecutionId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    createTimeMin: Schema.optional(Schema.String),
    createTimeMax: Schema.optional(Schema.String),
    endTimeMin: Schema.optional(Schema.String),
    endTimeMax: Schema.optional(Schema.String),
    isActive: Schema.optional(Schema.Boolean),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/targets",
    }),
  );
export type JobTargetExecutionsListByJobExecutionInput =
  typeof JobTargetExecutionsListByJobExecutionInput.Type;

// Output Schema
export const JobTargetExecutionsListByJobExecutionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobTargetExecutionsListByJobExecutionOutput =
  typeof JobTargetExecutionsListByJobExecutionOutput.Type;

// The operation
/**
 * Lists target executions for all steps of a job execution.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param jobExecutionId - The id of the job execution
 * @param createTimeMin - If specified, only job executions created at or after the specified time are included.
 * @param createTimeMax - If specified, only job executions created before the specified time are included.
 * @param endTimeMin - If specified, only job executions completed at or after the specified time are included.
 * @param endTimeMax - If specified, only job executions completed before the specified time are included.
 * @param isActive - If specified, only active or only completed job executions are included.
 * @param $skip - The number of elements in the collection to skip.
 * @param $top - The number of elements to return from the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobTargetExecutionsListByJobExecution =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobTargetExecutionsListByJobExecutionInput,
    outputSchema: JobTargetExecutionsListByJobExecutionOutput,
  }));
// Input Schema
export const JobTargetExecutionsListByStepInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    jobExecutionId: Schema.String.pipe(T.PathParam()),
    stepName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    createTimeMin: Schema.optional(Schema.String),
    createTimeMax: Schema.optional(Schema.String),
    endTimeMin: Schema.optional(Schema.String),
    endTimeMax: Schema.optional(Schema.String),
    isActive: Schema.optional(Schema.Boolean),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/executions/{jobExecutionId}/steps/{stepName}/targets",
    }),
  );
export type JobTargetExecutionsListByStepInput =
  typeof JobTargetExecutionsListByStepInput.Type;

// Output Schema
export const JobTargetExecutionsListByStepOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobTargetExecutionsListByStepOutput =
  typeof JobTargetExecutionsListByStepOutput.Type;

// The operation
/**
 * Lists the target executions of a job step execution.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param jobExecutionId - The id of the job execution
 * @param stepName - The name of the step.
 * @param createTimeMin - If specified, only job executions created at or after the specified time are included.
 * @param createTimeMax - If specified, only job executions created before the specified time are included.
 * @param endTimeMin - If specified, only job executions completed at or after the specified time are included.
 * @param endTimeMax - If specified, only job executions completed before the specified time are included.
 * @param isActive - If specified, only active or only completed job executions are included.
 * @param $skip - The number of elements in the collection to skip.
 * @param $top - The number of elements to return from the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobTargetExecutionsListByStep =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobTargetExecutionsListByStepInput,
    outputSchema: JobTargetExecutionsListByStepOutput,
  }));
// Input Schema
export const JobTargetGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    targetGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/targetGroups/{targetGroupName}",
    }),
  );
export type JobTargetGroupsCreateOrUpdateInput =
  typeof JobTargetGroupsCreateOrUpdateInput.Type;

// Output Schema
export const JobTargetGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobTargetGroupsCreateOrUpdateOutput =
  typeof JobTargetGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a target group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param targetGroupName - The name of the target group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobTargetGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: JobTargetGroupsCreateOrUpdateInput,
    outputSchema: JobTargetGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const JobTargetGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    targetGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/targetGroups/{targetGroupName}",
    }),
  );
export type JobTargetGroupsDeleteInput = typeof JobTargetGroupsDeleteInput.Type;

// Output Schema
export const JobTargetGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type JobTargetGroupsDeleteOutput =
  typeof JobTargetGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a target group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param targetGroupName - The name of the target group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobTargetGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobTargetGroupsDeleteInput,
    outputSchema: JobTargetGroupsDeleteOutput,
  }),
);
// Input Schema
export const JobTargetGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    targetGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/targetGroups/{targetGroupName}",
    }),
  );
export type JobTargetGroupsGetInput = typeof JobTargetGroupsGetInput.Type;

// Output Schema
export const JobTargetGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type JobTargetGroupsGetOutput = typeof JobTargetGroupsGetOutput.Type;

// The operation
/**
 * Gets a target group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param targetGroupName - The name of the target group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobTargetGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobTargetGroupsGetInput,
  outputSchema: JobTargetGroupsGetOutput,
}));
// Input Schema
export const JobTargetGroupsListByAgentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/targetGroups",
    }),
  );
export type JobTargetGroupsListByAgentInput =
  typeof JobTargetGroupsListByAgentInput.Type;

// Output Schema
export const JobTargetGroupsListByAgentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobTargetGroupsListByAgentOutput =
  typeof JobTargetGroupsListByAgentOutput.Type;

// The operation
/**
 * Gets all target groups in an agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobTargetGroupsListByAgent = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobTargetGroupsListByAgentInput,
    outputSchema: JobTargetGroupsListByAgentOutput,
  }),
);
// Input Schema
export const JobVersionsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  jobAgentName: Schema.String.pipe(T.PathParam()),
  jobName: Schema.String.pipe(T.PathParam()),
  jobVersion: Schema.Number.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/versions/{jobVersion}",
  }),
);
export type JobVersionsGetInput = typeof JobVersionsGetInput.Type;

// Output Schema
export const JobVersionsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type JobVersionsGetOutput = typeof JobVersionsGetOutput.Type;

// The operation
/**
 * Gets a job version.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job.
 * @param jobVersion - The version of the job to get.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobVersionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: JobVersionsGetInput,
  outputSchema: JobVersionsGetOutput,
}));
// Input Schema
export const JobVersionsListByJobInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    jobAgentName: Schema.String.pipe(T.PathParam()),
    jobName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/versions",
    }),
  );
export type JobVersionsListByJobInput = typeof JobVersionsListByJobInput.Type;

// Output Schema
export const JobVersionsListByJobOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type JobVersionsListByJobOutput = typeof JobVersionsListByJobOutput.Type;

// The operation
/**
 * Gets all versions of a job.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param jobAgentName - The name of the job agent.
 * @param jobName - The name of the job to get.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const JobVersionsListByJob = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: JobVersionsListByJobInput,
    outputSchema: JobVersionsListByJobOutput,
  }),
);
// Input Schema
export const LedgerDigestUploadsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    ledgerDigestUploads: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}",
    }),
  );
export type LedgerDigestUploadsCreateOrUpdateInput =
  typeof LedgerDigestUploadsCreateOrUpdateInput.Type;

// Output Schema
export const LedgerDigestUploadsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LedgerDigestUploadsCreateOrUpdateOutput =
  typeof LedgerDigestUploadsCreateOrUpdateOutput.Type;

// The operation
/**
 * Enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LedgerDigestUploadsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LedgerDigestUploadsCreateOrUpdateInput,
    outputSchema: LedgerDigestUploadsCreateOrUpdateOutput,
  }));
// Input Schema
export const LedgerDigestUploadsDisableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    ledgerDigestUploads: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}/disable",
    }),
  );
export type LedgerDigestUploadsDisableInput =
  typeof LedgerDigestUploadsDisableInput.Type;

// Output Schema
export const LedgerDigestUploadsDisableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LedgerDigestUploadsDisableOutput =
  typeof LedgerDigestUploadsDisableOutput.Type;

// The operation
/**
 * Disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LedgerDigestUploadsDisable = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LedgerDigestUploadsDisableInput,
    outputSchema: LedgerDigestUploadsDisableOutput,
  }),
);
// Input Schema
export const LedgerDigestUploadsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    ledgerDigestUploads: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}",
    }),
  );
export type LedgerDigestUploadsGetInput =
  typeof LedgerDigestUploadsGetInput.Type;

// Output Schema
export const LedgerDigestUploadsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LedgerDigestUploadsGetOutput =
  typeof LedgerDigestUploadsGetOutput.Type;

// The operation
/**
 * Gets the current ledger digest upload configuration for a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LedgerDigestUploadsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LedgerDigestUploadsGetInput,
    outputSchema: LedgerDigestUploadsGetOutput,
  }),
);
// Input Schema
export const LedgerDigestUploadsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/ledgerDigestUploads",
    }),
  );
export type LedgerDigestUploadsListByDatabaseInput =
  typeof LedgerDigestUploadsListByDatabaseInput.Type;

// Output Schema
export const LedgerDigestUploadsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LedgerDigestUploadsListByDatabaseOutput =
  typeof LedgerDigestUploadsListByDatabaseOutput.Type;

// The operation
/**
 * Gets all ledger digest upload settings on a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LedgerDigestUploadsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LedgerDigestUploadsListByDatabaseInput,
    outputSchema: LedgerDigestUploadsListByDatabaseOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsChangeAccessTierInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/changeAccessTier",
    }),
  );
export type LongTermRetentionBackupsChangeAccessTierInput =
  typeof LongTermRetentionBackupsChangeAccessTierInput.Type;

// Output Schema
export const LongTermRetentionBackupsChangeAccessTierOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionBackupsChangeAccessTierOutput =
  typeof LongTermRetentionBackupsChangeAccessTierOutput.Type;

// The operation
/**
 * Change a long term retention backup access tier.
 *
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsChangeAccessTier =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsChangeAccessTierInput,
    outputSchema: LongTermRetentionBackupsChangeAccessTierOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsChangeAccessTierByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/changeAccessTier",
    }),
  );
export type LongTermRetentionBackupsChangeAccessTierByResourceGroupInput =
  typeof LongTermRetentionBackupsChangeAccessTierByResourceGroupInput.Type;

// Output Schema
export const LongTermRetentionBackupsChangeAccessTierByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionBackupsChangeAccessTierByResourceGroupOutput =
  typeof LongTermRetentionBackupsChangeAccessTierByResourceGroupOutput.Type;

// The operation
/**
 * Change a long term retention backup access tier.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsChangeAccessTierByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsChangeAccessTierByResourceGroupInput,
    outputSchema: LongTermRetentionBackupsChangeAccessTierByResourceGroupOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsCopyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/copy",
    }),
  );
export type LongTermRetentionBackupsCopyInput =
  typeof LongTermRetentionBackupsCopyInput.Type;

// Output Schema
export const LongTermRetentionBackupsCopyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionBackupsCopyOutput =
  typeof LongTermRetentionBackupsCopyOutput.Type;

// The operation
/**
 * Copy an existing long term retention backup.
 *
 * @param locationName - The location of the database.
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsCopy =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsCopyInput,
    outputSchema: LongTermRetentionBackupsCopyOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsCopyByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/copy",
    }),
  );
export type LongTermRetentionBackupsCopyByResourceGroupInput =
  typeof LongTermRetentionBackupsCopyByResourceGroupInput.Type;

// Output Schema
export const LongTermRetentionBackupsCopyByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionBackupsCopyByResourceGroupOutput =
  typeof LongTermRetentionBackupsCopyByResourceGroupOutput.Type;

// The operation
/**
 * Copy an existing long term retention backup to a different server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database.
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsCopyByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsCopyByResourceGroupInput,
    outputSchema: LongTermRetentionBackupsCopyByResourceGroupOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}",
    }),
  );
export type LongTermRetentionBackupsDeleteInput =
  typeof LongTermRetentionBackupsDeleteInput.Type;

// Output Schema
export const LongTermRetentionBackupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LongTermRetentionBackupsDeleteOutput =
  typeof LongTermRetentionBackupsDeleteOutput.Type;

// The operation
/**
 * Deletes a long term retention backup.
 *
 * @param locationName - The location of the database
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsDeleteInput,
    outputSchema: LongTermRetentionBackupsDeleteOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsDeleteByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}",
    }),
  );
export type LongTermRetentionBackupsDeleteByResourceGroupInput =
  typeof LongTermRetentionBackupsDeleteByResourceGroupInput.Type;

// Output Schema
export const LongTermRetentionBackupsDeleteByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LongTermRetentionBackupsDeleteByResourceGroupOutput =
  typeof LongTermRetentionBackupsDeleteByResourceGroupOutput.Type;

// The operation
/**
 * Deletes a long term retention backup.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsDeleteByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsDeleteByResourceGroupInput,
    outputSchema: LongTermRetentionBackupsDeleteByResourceGroupOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}",
    }),
  );
export type LongTermRetentionBackupsGetInput =
  typeof LongTermRetentionBackupsGetInput.Type;

// Output Schema
export const LongTermRetentionBackupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionBackupsGetOutput =
  typeof LongTermRetentionBackupsGetOutput.Type;

// The operation
/**
 * Gets a long term retention backup.
 *
 * @param locationName - The location of the database.
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: LongTermRetentionBackupsGetInput,
    outputSchema: LongTermRetentionBackupsGetOutput,
  }),
);
// Input Schema
export const LongTermRetentionBackupsGetByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}",
    }),
  );
export type LongTermRetentionBackupsGetByResourceGroupInput =
  typeof LongTermRetentionBackupsGetByResourceGroupInput.Type;

// Output Schema
export const LongTermRetentionBackupsGetByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionBackupsGetByResourceGroupOutput =
  typeof LongTermRetentionBackupsGetByResourceGroupOutput.Type;

// The operation
/**
 * Gets a long term retention backup.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database.
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsGetByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsGetByResourceGroupInput,
    outputSchema: LongTermRetentionBackupsGetByResourceGroupOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups",
    }),
  );
export type LongTermRetentionBackupsListByDatabaseInput =
  typeof LongTermRetentionBackupsListByDatabaseInput.Type;

// Output Schema
export const LongTermRetentionBackupsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionBackupsListByDatabaseOutput =
  typeof LongTermRetentionBackupsListByDatabaseOutput.Type;

// The operation
/**
 * Lists all long term retention backups for a database.
 *
 * @param locationName - The location of the database
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsListByDatabaseInput,
    outputSchema: LongTermRetentionBackupsListByDatabaseOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionBackups",
    }),
  );
export type LongTermRetentionBackupsListByLocationInput =
  typeof LongTermRetentionBackupsListByLocationInput.Type;

// Output Schema
export const LongTermRetentionBackupsListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionBackupsListByLocationOutput =
  typeof LongTermRetentionBackupsListByLocationOutput.Type;

// The operation
/**
 * Lists the long term retention backups for a given location.
 *
 * @param locationName - The location of the database
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsListByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsListByLocationInput,
    outputSchema: LongTermRetentionBackupsListByLocationOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsListByResourceGroupDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups",
    }),
  );
export type LongTermRetentionBackupsListByResourceGroupDatabaseInput =
  typeof LongTermRetentionBackupsListByResourceGroupDatabaseInput.Type;

// Output Schema
export const LongTermRetentionBackupsListByResourceGroupDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionBackupsListByResourceGroupDatabaseOutput =
  typeof LongTermRetentionBackupsListByResourceGroupDatabaseOutput.Type;

// The operation
/**
 * Lists all long term retention backups for a database based on a particular resource group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsListByResourceGroupDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsListByResourceGroupDatabaseInput,
    outputSchema: LongTermRetentionBackupsListByResourceGroupDatabaseOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsListByResourceGroupLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionBackups",
    }),
  );
export type LongTermRetentionBackupsListByResourceGroupLocationInput =
  typeof LongTermRetentionBackupsListByResourceGroupLocationInput.Type;

// Output Schema
export const LongTermRetentionBackupsListByResourceGroupLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionBackupsListByResourceGroupLocationOutput =
  typeof LongTermRetentionBackupsListByResourceGroupLocationOutput.Type;

// The operation
/**
 * Lists the long term retention backups for a given location based on resource group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsListByResourceGroupLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsListByResourceGroupLocationInput,
    outputSchema: LongTermRetentionBackupsListByResourceGroupLocationOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsListByResourceGroupServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionBackups",
    }),
  );
export type LongTermRetentionBackupsListByResourceGroupServerInput =
  typeof LongTermRetentionBackupsListByResourceGroupServerInput.Type;

// Output Schema
export const LongTermRetentionBackupsListByResourceGroupServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionBackupsListByResourceGroupServerOutput =
  typeof LongTermRetentionBackupsListByResourceGroupServerOutput.Type;

// The operation
/**
 * Lists the long term retention backups for a given server based on resource groups.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database
 * @param longTermRetentionServerName - The name of the server
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsListByResourceGroupServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsListByResourceGroupServerInput,
    outputSchema: LongTermRetentionBackupsListByResourceGroupServerOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionBackups",
    }),
  );
export type LongTermRetentionBackupsListByServerInput =
  typeof LongTermRetentionBackupsListByServerInput.Type;

// Output Schema
export const LongTermRetentionBackupsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionBackupsListByServerOutput =
  typeof LongTermRetentionBackupsListByServerOutput.Type;

// The operation
/**
 * Lists the long term retention backups for a given server.
 *
 * @param locationName - The location of the database
 * @param longTermRetentionServerName - The name of the server
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsListByServerInput,
    outputSchema: LongTermRetentionBackupsListByServerOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/update",
    }),
  );
export type LongTermRetentionBackupsUpdateInput =
  typeof LongTermRetentionBackupsUpdateInput.Type;

// Output Schema
export const LongTermRetentionBackupsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionBackupsUpdateOutput =
  typeof LongTermRetentionBackupsUpdateOutput.Type;

// The operation
/**
 * Updates an existing long term retention backup.
 *
 * @param locationName - The location of the database.
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsUpdateInput,
    outputSchema: LongTermRetentionBackupsUpdateOutput,
  }));
// Input Schema
export const LongTermRetentionBackupsUpdateByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    longTermRetentionServerName: Schema.String.pipe(T.PathParam()),
    longTermRetentionDatabaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionServers/{longTermRetentionServerName}/longTermRetentionDatabases/{longTermRetentionDatabaseName}/longTermRetentionBackups/{backupName}/update",
    }),
  );
export type LongTermRetentionBackupsUpdateByResourceGroupInput =
  typeof LongTermRetentionBackupsUpdateByResourceGroupInput.Type;

// Output Schema
export const LongTermRetentionBackupsUpdateByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionBackupsUpdateByResourceGroupOutput =
  typeof LongTermRetentionBackupsUpdateByResourceGroupOutput.Type;

// The operation
/**
 * Updates an existing long term retention backup.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database.
 * @param longTermRetentionServerName - The name of the server
 * @param longTermRetentionDatabaseName - The name of the database
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionBackupsUpdateByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionBackupsUpdateByResourceGroupInput,
    outputSchema: LongTermRetentionBackupsUpdateByResourceGroupOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsDeleteInput =
  typeof LongTermRetentionManagedInstanceBackupsDeleteInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LongTermRetentionManagedInstanceBackupsDeleteOutput =
  typeof LongTermRetentionManagedInstanceBackupsDeleteOutput.Type;

// The operation
/**
 * Deletes a long term retention backup.
 *
 * @param locationName - The location of the database.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database.
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionManagedInstanceBackupsDeleteInput,
    outputSchema: LongTermRetentionManagedInstanceBackupsDeleteOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupInput =
  typeof LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOutput =
  typeof LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOutput.Type;

// The operation
/**
 * Deletes a long term retention backup.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database.
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsDeleteByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupInput,
    outputSchema:
      LongTermRetentionManagedInstanceBackupsDeleteByResourceGroupOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsGetInput =
  typeof LongTermRetentionManagedInstanceBackupsGetInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionManagedInstanceBackupsGetOutput =
  typeof LongTermRetentionManagedInstanceBackupsGetOutput.Type;

// The operation
/**
 * Gets a long term retention backup for a managed database.
 *
 * @param locationName - The location of the database.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database.
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionManagedInstanceBackupsGetInput,
    outputSchema: LongTermRetentionManagedInstanceBackupsGetOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsGetByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    backupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups/{backupName}",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsGetByResourceGroupInput =
  typeof LongTermRetentionManagedInstanceBackupsGetByResourceGroupInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsGetByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionManagedInstanceBackupsGetByResourceGroupOutput =
  typeof LongTermRetentionManagedInstanceBackupsGetByResourceGroupOutput.Type;

// The operation
/**
 * Gets a long term retention backup for a managed database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database.
 * @param backupName - The backup name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsGetByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionManagedInstanceBackupsGetByResourceGroupInput,
    outputSchema:
      LongTermRetentionManagedInstanceBackupsGetByResourceGroupOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsListByDatabaseInput =
  typeof LongTermRetentionManagedInstanceBackupsListByDatabaseInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionManagedInstanceBackupsListByDatabaseOutput =
  typeof LongTermRetentionManagedInstanceBackupsListByDatabaseOutput.Type;

// The operation
/**
 * Lists all long term retention backups for a managed database.
 *
 * @param locationName - The location of the database.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database.
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionManagedInstanceBackupsListByDatabaseInput,
    outputSchema: LongTermRetentionManagedInstanceBackupsListByDatabaseOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionManagedInstanceBackups",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsListByInstanceInput =
  typeof LongTermRetentionManagedInstanceBackupsListByInstanceInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionManagedInstanceBackupsListByInstanceOutput =
  typeof LongTermRetentionManagedInstanceBackupsListByInstanceOutput.Type;

// The operation
/**
 * Lists the long term retention backups for a given managed instance.
 *
 * @param locationName - The location of the database
 * @param managedInstanceName - The name of the managed instance.
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionManagedInstanceBackupsListByInstanceInput,
    outputSchema: LongTermRetentionManagedInstanceBackupsListByInstanceOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstanceBackups",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsListByLocationInput =
  typeof LongTermRetentionManagedInstanceBackupsListByLocationInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionManagedInstanceBackupsListByLocationOutput =
  typeof LongTermRetentionManagedInstanceBackupsListByLocationOutput.Type;

// The operation
/**
 * Lists the long term retention backups for managed databases in a given location.
 *
 * @param locationName - The location of the database.
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param $skip - The number of elements in the collection to skip.
 * @param $top - The number of elements to return from the collection.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsListByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionManagedInstanceBackupsListByLocationInput,
    outputSchema: LongTermRetentionManagedInstanceBackupsListByLocationOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionDatabases/{databaseName}/longTermRetentionManagedInstanceBackups",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseInput =
  typeof LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOutput =
  typeof LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOutput.Type;

// The operation
/**
 * Lists all long term retention backups for a managed database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database.
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseInput,
    outputSchema:
      LongTermRetentionManagedInstanceBackupsListByResourceGroupDatabaseOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstances/{managedInstanceName}/longTermRetentionManagedInstanceBackups",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceInput =
  typeof LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOutput =
  typeof LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOutput.Type;

// The operation
/**
 * Lists the long term retention backups for a given managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database.
 * @param managedInstanceName - The name of the managed instance.
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsListByResourceGroupInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceInput,
    outputSchema:
      LongTermRetentionManagedInstanceBackupsListByResourceGroupInstanceOutput,
  }));
// Input Schema
export const LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    databaseState: Schema.optional(Schema.Literals(["All", "Live", "Deleted"])),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/longTermRetentionManagedInstanceBackups",
    }),
  );
export type LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationInput =
  typeof LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationInput.Type;

// Output Schema
export const LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOutput =
  typeof LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOutput.Type;

// The operation
/**
 * Lists the long term retention backups for managed databases in a given location.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The location of the database.
 * @param onlyLatestPerDatabase - Whether or not to only get the latest backup for each database.
 * @param databaseState - Whether to query against just live databases, just deleted databases, or all databases.
 * @param $skip - The number of elements in the collection to skip.
 * @param $top - The number of elements to return from the collection.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionManagedInstanceBackupsListByResourceGroupLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationInput,
    outputSchema:
      LongTermRetentionManagedInstanceBackupsListByResourceGroupLocationOutput,
  }));
// Input Schema
export const LongTermRetentionPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}",
    }),
  );
export type LongTermRetentionPoliciesCreateOrUpdateInput =
  typeof LongTermRetentionPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const LongTermRetentionPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionPoliciesCreateOrUpdateOutput =
  typeof LongTermRetentionPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Sets a database's long term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be Default.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionPoliciesCreateOrUpdateInput,
    outputSchema: LongTermRetentionPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const LongTermRetentionPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}",
    }),
  );
export type LongTermRetentionPoliciesGetInput =
  typeof LongTermRetentionPoliciesGetInput.Type;

// Output Schema
export const LongTermRetentionPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type LongTermRetentionPoliciesGetOutput =
  typeof LongTermRetentionPoliciesGetOutput.Type;

// The operation
/**
 * Gets a database's long term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be Default.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionPoliciesGetInput,
    outputSchema: LongTermRetentionPoliciesGetOutput,
  }));
// Input Schema
export const LongTermRetentionPoliciesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupLongTermRetentionPolicies",
    }),
  );
export type LongTermRetentionPoliciesListByDatabaseInput =
  typeof LongTermRetentionPoliciesListByDatabaseInput.Type;

// Output Schema
export const LongTermRetentionPoliciesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type LongTermRetentionPoliciesListByDatabaseOutput =
  typeof LongTermRetentionPoliciesListByDatabaseOutput.Type;

// The operation
/**
 * Gets a database's long term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const LongTermRetentionPoliciesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: LongTermRetentionPoliciesListByDatabaseInput,
    outputSchema: LongTermRetentionPoliciesListByDatabaseOutput,
  }));
// Input Schema
export const MaintenanceWindowOptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    maintenanceWindowOptionsName: Schema.String,
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/maintenanceWindowOptions/current",
    }),
  );
export type MaintenanceWindowOptionsGetInput =
  typeof MaintenanceWindowOptionsGetInput.Type;

// Output Schema
export const MaintenanceWindowOptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenanceWindowOptionsGetOutput =
  typeof MaintenanceWindowOptionsGetOutput.Type;

// The operation
/**
 * Gets a list of available maintenance windows.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database to get maintenance windows options for.
 * @param maintenanceWindowOptionsName - Maintenance window options name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const MaintenanceWindowOptionsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MaintenanceWindowOptionsGetInput,
    outputSchema: MaintenanceWindowOptionsGetOutput,
  }),
);
// Input Schema
export const MaintenanceWindowsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    maintenanceWindowName: Schema.String,
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/maintenanceWindows/current",
    }),
  );
export type MaintenanceWindowsCreateOrUpdateInput =
  typeof MaintenanceWindowsCreateOrUpdateInput.Type;

// Output Schema
export const MaintenanceWindowsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MaintenanceWindowsCreateOrUpdateOutput =
  typeof MaintenanceWindowsCreateOrUpdateOutput.Type;

// The operation
/**
 * Sets maintenance windows settings for a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database to set maintenance windows for.
 * @param maintenanceWindowName - Maintenance window name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const MaintenanceWindowsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: MaintenanceWindowsCreateOrUpdateInput,
    outputSchema: MaintenanceWindowsCreateOrUpdateOutput,
  }));
// Input Schema
export const MaintenanceWindowsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    maintenanceWindowName: Schema.String,
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/maintenanceWindows/current",
    }),
  );
export type MaintenanceWindowsGetInput = typeof MaintenanceWindowsGetInput.Type;

// Output Schema
export const MaintenanceWindowsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type MaintenanceWindowsGetOutput =
  typeof MaintenanceWindowsGetOutput.Type;

// The operation
/**
 * Gets maintenance windows settings for a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database to get maintenance windows for.
 * @param maintenanceWindowName - Maintenance window name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const MaintenanceWindowsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: MaintenanceWindowsGetInput,
    outputSchema: MaintenanceWindowsGetOutput,
  }),
);
// Input Schema
export const ManagedBackupShortTermRetentionPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}",
    }),
  );
export type ManagedBackupShortTermRetentionPoliciesCreateOrUpdateInput =
  typeof ManagedBackupShortTermRetentionPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOutput =
  typeof ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates a managed database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be "default".
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedBackupShortTermRetentionPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateInput,
    outputSchema: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedBackupShortTermRetentionPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}",
    }),
  );
export type ManagedBackupShortTermRetentionPoliciesGetInput =
  typeof ManagedBackupShortTermRetentionPoliciesGetInput.Type;

// Output Schema
export const ManagedBackupShortTermRetentionPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedBackupShortTermRetentionPoliciesGetOutput =
  typeof ManagedBackupShortTermRetentionPoliciesGetOutput.Type;

// The operation
/**
 * Gets a managed database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedBackupShortTermRetentionPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedBackupShortTermRetentionPoliciesGetInput,
    outputSchema: ManagedBackupShortTermRetentionPoliciesGetOutput,
  }));
// Input Schema
export const ManagedBackupShortTermRetentionPoliciesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies",
    }),
  );
export type ManagedBackupShortTermRetentionPoliciesListByDatabaseInput =
  typeof ManagedBackupShortTermRetentionPoliciesListByDatabaseInput.Type;

// Output Schema
export const ManagedBackupShortTermRetentionPoliciesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedBackupShortTermRetentionPoliciesListByDatabaseOutput =
  typeof ManagedBackupShortTermRetentionPoliciesListByDatabaseOutput.Type;

// The operation
/**
 * Gets a managed database's short term retention policy list.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedBackupShortTermRetentionPoliciesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedBackupShortTermRetentionPoliciesListByDatabaseInput,
    outputSchema: ManagedBackupShortTermRetentionPoliciesListByDatabaseOutput,
  }));
// Input Schema
export const ManagedBackupShortTermRetentionPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}",
    }),
  );
export type ManagedBackupShortTermRetentionPoliciesUpdateInput =
  typeof ManagedBackupShortTermRetentionPoliciesUpdateInput.Type;

// Output Schema
export const ManagedBackupShortTermRetentionPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedBackupShortTermRetentionPoliciesUpdateOutput =
  typeof ManagedBackupShortTermRetentionPoliciesUpdateOutput.Type;

// The operation
/**
 * Updates a managed database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be "default".
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedBackupShortTermRetentionPoliciesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedBackupShortTermRetentionPoliciesUpdateInput,
    outputSchema: ManagedBackupShortTermRetentionPoliciesUpdateOutput,
  }));
// Input Schema
export const ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateInput =
  typeof ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOutput =
  typeof ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a managed database's Advanced Threat Protection state.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateInput,
    outputSchema:
      ManagedDatabaseAdvancedThreatProtectionSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedDatabaseAdvancedThreatProtectionSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type ManagedDatabaseAdvancedThreatProtectionSettingsGetInput =
  typeof ManagedDatabaseAdvancedThreatProtectionSettingsGetInput.Type;

// Output Schema
export const ManagedDatabaseAdvancedThreatProtectionSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseAdvancedThreatProtectionSettingsGetOutput =
  typeof ManagedDatabaseAdvancedThreatProtectionSettingsGetOutput.Type;

// The operation
/**
 * Gets a managed database's Advanced Threat Protection state.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseAdvancedThreatProtectionSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseAdvancedThreatProtectionSettingsGetInput,
    outputSchema: ManagedDatabaseAdvancedThreatProtectionSettingsGetOutput,
  }));
// Input Schema
export const ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/advancedThreatProtectionSettings",
    }),
  );
export type ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseInput =
  typeof ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOutput =
  typeof ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of managed database's Advanced Threat Protection states.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseInput,
    outputSchema:
      ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabaseColumnsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}",
    }),
  );
export type ManagedDatabaseColumnsGetInput =
  typeof ManagedDatabaseColumnsGetInput.Type;

// Output Schema
export const ManagedDatabaseColumnsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseColumnsGetOutput =
  typeof ManagedDatabaseColumnsGetOutput.Type;

// The operation
/**
 * Get managed database column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseColumnsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDatabaseColumnsGetInput,
    outputSchema: ManagedDatabaseColumnsGetOutput,
  }),
);
// Input Schema
export const ManagedDatabaseColumnsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    schema: Schema.optional(Schema.String),
    table: Schema.optional(Schema.String),
    column: Schema.optional(Schema.String),
    orderBy: Schema.optional(Schema.String),
    $skiptoken: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/columns",
    }),
  );
export type ManagedDatabaseColumnsListByDatabaseInput =
  typeof ManagedDatabaseColumnsListByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseColumnsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseColumnsListByDatabaseOutput =
  typeof ManagedDatabaseColumnsListByDatabaseOutput.Type;

// The operation
/**
 * List managed database columns
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $skiptoken - An opaque token that identifies a starting point in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseColumnsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseColumnsListByDatabaseInput,
    outputSchema: ManagedDatabaseColumnsListByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabaseColumnsListByTableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns",
    }),
  );
export type ManagedDatabaseColumnsListByTableInput =
  typeof ManagedDatabaseColumnsListByTableInput.Type;

// Output Schema
export const ManagedDatabaseColumnsListByTableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseColumnsListByTableOutput =
  typeof ManagedDatabaseColumnsListByTableOutput.Type;

// The operation
/**
 * List managed database columns
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseColumnsListByTable =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseColumnsListByTableInput,
    outputSchema: ManagedDatabaseColumnsListByTableOutput,
  }));
// Input Schema
export const ManagedDatabaseMoveOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/managedDatabaseMoveOperationResults/{operationId}",
    }),
  );
export type ManagedDatabaseMoveOperationsGetInput =
  typeof ManagedDatabaseMoveOperationsGetInput.Type;

// Output Schema
export const ManagedDatabaseMoveOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseMoveOperationsGetOutput =
  typeof ManagedDatabaseMoveOperationsGetOutput.Type;

// The operation
/**
 * Gets a managed database move operation.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseMoveOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseMoveOperationsGetInput,
    outputSchema: ManagedDatabaseMoveOperationsGetOutput,
  }));
// Input Schema
export const ManagedDatabaseMoveOperationsListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    onlyLatestPerDatabase: Schema.optional(Schema.Boolean),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/managedDatabaseMoveOperationResults",
    }),
  );
export type ManagedDatabaseMoveOperationsListByLocationInput =
  typeof ManagedDatabaseMoveOperationsListByLocationInput.Type;

// Output Schema
export const ManagedDatabaseMoveOperationsListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseMoveOperationsListByLocationOutput =
  typeof ManagedDatabaseMoveOperationsListByLocationOutput.Type;

// The operation
/**
 * Lists managed database move operations.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param onlyLatestPerDatabase - Whether or not to only get the latest operation for each database. Has higher priority than $filter.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseMoveOperationsListByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseMoveOperationsListByLocationInput,
    outputSchema: ManagedDatabaseMoveOperationsListByLocationOutput,
  }));
// Input Schema
export const ManagedDatabaseQueriesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    queryId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/queries/{queryId}",
    }),
  );
export type ManagedDatabaseQueriesGetInput =
  typeof ManagedDatabaseQueriesGetInput.Type;

// Output Schema
export const ManagedDatabaseQueriesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseQueriesGetOutput =
  typeof ManagedDatabaseQueriesGetOutput.Type;

// The operation
/**
 * Get query by query id.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseQueriesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDatabaseQueriesGetInput,
    outputSchema: ManagedDatabaseQueriesGetOutput,
  }),
);
// Input Schema
export const ManagedDatabaseQueriesListByQueryInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    queryId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    interval: Schema.optional(Schema.Literals(["PT1H", "P1D"])),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/queries/{queryId}/statistics",
    }),
  );
export type ManagedDatabaseQueriesListByQueryInput =
  typeof ManagedDatabaseQueriesListByQueryInput.Type;

// Output Schema
export const ManagedDatabaseQueriesListByQueryOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseQueriesListByQueryOutput =
  typeof ManagedDatabaseQueriesListByQueryOutput.Type;

// The operation
/**
 * Get query execution statistics by query id.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param startTime - Start time for observed period.
 * @param endTime - End time for observed period.
 * @param interval - The time step to be used to summarize the metric values.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseQueriesListByQuery =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseQueriesListByQueryInput,
    outputSchema: ManagedDatabaseQueriesListByQueryOutput,
  }));
// Input Schema
export const ManagedDatabaseRecommendedSensitivityLabelsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/recommendedSensitivityLabels",
    }),
  );
export type ManagedDatabaseRecommendedSensitivityLabelsUpdateInput =
  typeof ManagedDatabaseRecommendedSensitivityLabelsUpdateInput.Type;

// Output Schema
export const ManagedDatabaseRecommendedSensitivityLabelsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabaseRecommendedSensitivityLabelsUpdateOutput =
  typeof ManagedDatabaseRecommendedSensitivityLabelsUpdateOutput.Type;

// The operation
/**
 * Update recommended sensitivity labels states of a given database using an operations batch.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseRecommendedSensitivityLabelsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseRecommendedSensitivityLabelsUpdateInput,
    outputSchema: ManagedDatabaseRecommendedSensitivityLabelsUpdateOutput,
  }));
// Input Schema
export const ManagedDatabaseRestoreDetailsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    restoreDetailsName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/restoreDetails/{restoreDetailsName}",
    }),
  );
export type ManagedDatabaseRestoreDetailsGetInput =
  typeof ManagedDatabaseRestoreDetailsGetInput.Type;

// Output Schema
export const ManagedDatabaseRestoreDetailsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseRestoreDetailsGetOutput =
  typeof ManagedDatabaseRestoreDetailsGetOutput.Type;

// The operation
/**
 * Gets managed database restore details.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param restoreDetailsName - The name of the restore details to retrieve.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseRestoreDetailsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseRestoreDetailsGetInput,
    outputSchema: ManagedDatabaseRestoreDetailsGetOutput,
  }));
// Input Schema
export const ManagedDatabasesCancelMoveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/cancelMove",
    }),
  );
export type ManagedDatabasesCancelMoveInput =
  typeof ManagedDatabasesCancelMoveInput.Type;

// Output Schema
export const ManagedDatabasesCancelMoveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabasesCancelMoveOutput =
  typeof ManagedDatabasesCancelMoveOutput.Type;

// The operation
/**
 * Cancels a managed database move operation.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesCancelMove = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDatabasesCancelMoveInput,
    outputSchema: ManagedDatabasesCancelMoveOutput,
  }),
);
// Input Schema
export const ManagedDatabaseSchemasGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}",
    }),
  );
export type ManagedDatabaseSchemasGetInput =
  typeof ManagedDatabaseSchemasGetInput.Type;

// Output Schema
export const ManagedDatabaseSchemasGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseSchemasGetOutput =
  typeof ManagedDatabaseSchemasGetOutput.Type;

// The operation
/**
 * Get managed database schema
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSchemasGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDatabaseSchemasGetInput,
    outputSchema: ManagedDatabaseSchemasGetOutput,
  }),
);
// Input Schema
export const ManagedDatabaseSchemasListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas",
    }),
  );
export type ManagedDatabaseSchemasListByDatabaseInput =
  typeof ManagedDatabaseSchemasListByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseSchemasListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseSchemasListByDatabaseOutput =
  typeof ManagedDatabaseSchemasListByDatabaseOutput.Type;

// The operation
/**
 * List managed database schemas
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSchemasListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSchemasListByDatabaseInput,
    outputSchema: ManagedDatabaseSchemasListByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabasesCompleteMoveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/completeMove",
    }),
  );
export type ManagedDatabasesCompleteMoveInput =
  typeof ManagedDatabasesCompleteMoveInput.Type;

// Output Schema
export const ManagedDatabasesCompleteMoveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabasesCompleteMoveOutput =
  typeof ManagedDatabasesCompleteMoveOutput.Type;

// The operation
/**
 * Completes a managed database move operation.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesCompleteMove =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabasesCompleteMoveInput,
    outputSchema: ManagedDatabasesCompleteMoveOutput,
  }));
// Input Schema
export const ManagedDatabasesCompleteRestoreInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/completeRestore",
    }),
  );
export type ManagedDatabasesCompleteRestoreInput =
  typeof ManagedDatabasesCompleteRestoreInput.Type;

// Output Schema
export const ManagedDatabasesCompleteRestoreOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabasesCompleteRestoreOutput =
  typeof ManagedDatabasesCompleteRestoreOutput.Type;

// The operation
/**
 * Completes the restore operation on a managed database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesCompleteRestore =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabasesCompleteRestoreInput,
    outputSchema: ManagedDatabasesCompleteRestoreOutput,
  }));
// Input Schema
export const ManagedDatabasesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}",
    }),
  );
export type ManagedDatabasesCreateOrUpdateInput =
  typeof ManagedDatabasesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedDatabasesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ManagedDatabasesCreateOrUpdateOutput =
  typeof ManagedDatabasesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a new database or updates an existing database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabasesCreateOrUpdateInput,
    outputSchema: ManagedDatabasesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedDatabasesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}",
    }),
  );
export type ManagedDatabasesDeleteInput =
  typeof ManagedDatabasesDeleteInput.Type;

// Output Schema
export const ManagedDatabasesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabasesDeleteOutput =
  typeof ManagedDatabasesDeleteOutput.Type;

// The operation
/**
 * Deletes a managed database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDatabasesDeleteInput,
    outputSchema: ManagedDatabasesDeleteOutput,
  }),
);
// Input Schema
export const ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateInput =
  typeof ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateOutput =
  typeof ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a database's security alert policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database for which the security alert policy is defined.
 * @param securityAlertPolicyName - The name of the security alert policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSecurityAlertPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateInput,
    outputSchema: ManagedDatabaseSecurityAlertPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedDatabaseSecurityAlertPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type ManagedDatabaseSecurityAlertPoliciesGetInput =
  typeof ManagedDatabaseSecurityAlertPoliciesGetInput.Type;

// Output Schema
export const ManagedDatabaseSecurityAlertPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseSecurityAlertPoliciesGetOutput =
  typeof ManagedDatabaseSecurityAlertPoliciesGetOutput.Type;

// The operation
/**
 * Gets a managed database's security alert policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database for which the security alert policy is defined.
 * @param securityAlertPolicyName - The name of the security alert policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSecurityAlertPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSecurityAlertPoliciesGetInput,
    outputSchema: ManagedDatabaseSecurityAlertPoliciesGetOutput,
  }));
// Input Schema
export const ManagedDatabaseSecurityAlertPoliciesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/securityAlertPolicies",
    }),
  );
export type ManagedDatabaseSecurityAlertPoliciesListByDatabaseInput =
  typeof ManagedDatabaseSecurityAlertPoliciesListByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseSecurityAlertPoliciesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseSecurityAlertPoliciesListByDatabaseOutput =
  typeof ManagedDatabaseSecurityAlertPoliciesListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of managed database's security alert policies.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database for which the security alert policies are defined.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSecurityAlertPoliciesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSecurityAlertPoliciesListByDatabaseInput,
    outputSchema: ManagedDatabaseSecurityAlertPoliciesListByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabaseSecurityEventsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    $skip: Schema.optional(Schema.Number),
    $top: Schema.optional(Schema.Number),
    $skiptoken: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/securityEvents",
    }),
  );
export type ManagedDatabaseSecurityEventsListByDatabaseInput =
  typeof ManagedDatabaseSecurityEventsListByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseSecurityEventsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseSecurityEventsListByDatabaseOutput =
  typeof ManagedDatabaseSecurityEventsListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of security events.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the managed database for which the security events are retrieved.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param $skip - The number of elements in the collection to skip.
 * @param $top - The number of elements to return from the collection.
 * @param $skiptoken - An opaque token that identifies a starting point in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSecurityEventsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSecurityEventsListByDatabaseInput,
    outputSchema: ManagedDatabaseSecurityEventsListByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabaseSensitivityLabelsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
    }),
  );
export type ManagedDatabaseSensitivityLabelsCreateOrUpdateInput =
  typeof ManagedDatabaseSensitivityLabelsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedDatabaseSensitivityLabelsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseSensitivityLabelsCreateOrUpdateOutput =
  typeof ManagedDatabaseSensitivityLabelsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the sensitivity label of a given column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSensitivityLabelsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSensitivityLabelsCreateOrUpdateInput,
    outputSchema: ManagedDatabaseSensitivityLabelsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedDatabaseSensitivityLabelsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
    }),
  );
export type ManagedDatabaseSensitivityLabelsDeleteInput =
  typeof ManagedDatabaseSensitivityLabelsDeleteInput.Type;

// Output Schema
export const ManagedDatabaseSensitivityLabelsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabaseSensitivityLabelsDeleteOutput =
  typeof ManagedDatabaseSensitivityLabelsDeleteOutput.Type;

// The operation
/**
 * Deletes the sensitivity label of a given column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSensitivityLabelsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSensitivityLabelsDeleteInput,
    outputSchema: ManagedDatabaseSensitivityLabelsDeleteOutput,
  }));
// Input Schema
export const ManagedDatabaseSensitivityLabelsDisableRecommendationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["recommended"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/disable",
    }),
  );
export type ManagedDatabaseSensitivityLabelsDisableRecommendationInput =
  typeof ManagedDatabaseSensitivityLabelsDisableRecommendationInput.Type;

// Output Schema
export const ManagedDatabaseSensitivityLabelsDisableRecommendationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabaseSensitivityLabelsDisableRecommendationOutput =
  typeof ManagedDatabaseSensitivityLabelsDisableRecommendationOutput.Type;

// The operation
/**
 * Disables sensitivity recommendations on a given column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSensitivityLabelsDisableRecommendation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSensitivityLabelsDisableRecommendationInput,
    outputSchema: ManagedDatabaseSensitivityLabelsDisableRecommendationOutput,
  }));
// Input Schema
export const ManagedDatabaseSensitivityLabelsEnableRecommendationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["recommended"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/enable",
    }),
  );
export type ManagedDatabaseSensitivityLabelsEnableRecommendationInput =
  typeof ManagedDatabaseSensitivityLabelsEnableRecommendationInput.Type;

// Output Schema
export const ManagedDatabaseSensitivityLabelsEnableRecommendationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabaseSensitivityLabelsEnableRecommendationOutput =
  typeof ManagedDatabaseSensitivityLabelsEnableRecommendationOutput.Type;

// The operation
/**
 * Enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns)
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSensitivityLabelsEnableRecommendation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSensitivityLabelsEnableRecommendationInput,
    outputSchema: ManagedDatabaseSensitivityLabelsEnableRecommendationOutput,
  }));
// Input Schema
export const ManagedDatabaseSensitivityLabelsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["current", "recommended"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
    }),
  );
export type ManagedDatabaseSensitivityLabelsGetInput =
  typeof ManagedDatabaseSensitivityLabelsGetInput.Type;

// Output Schema
export const ManagedDatabaseSensitivityLabelsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseSensitivityLabelsGetOutput =
  typeof ManagedDatabaseSensitivityLabelsGetOutput.Type;

// The operation
/**
 * Gets the sensitivity label of a given column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSensitivityLabelsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSensitivityLabelsGetInput,
    outputSchema: ManagedDatabaseSensitivityLabelsGetOutput,
  }));
// Input Schema
export const ManagedDatabaseSensitivityLabelsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/sensitivityLabels",
    }),
  );
export type ManagedDatabaseSensitivityLabelsListByDatabaseInput =
  typeof ManagedDatabaseSensitivityLabelsListByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseSensitivityLabelsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseSensitivityLabelsListByDatabaseOutput =
  typeof ManagedDatabaseSensitivityLabelsListByDatabaseOutput.Type;

// The operation
/**
 * Gets the sensitivity labels of a given database
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSensitivityLabelsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSensitivityLabelsListByDatabaseInput,
    outputSchema: ManagedDatabaseSensitivityLabelsListByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabaseSensitivityLabelsListCurrentByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $count: Schema.optional(Schema.Boolean),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/currentSensitivityLabels",
    }),
  );
export type ManagedDatabaseSensitivityLabelsListCurrentByDatabaseInput =
  typeof ManagedDatabaseSensitivityLabelsListCurrentByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOutput =
  typeof ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOutput.Type;

// The operation
/**
 * Gets the sensitivity labels of a given database
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSensitivityLabelsListCurrentByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseInput,
    outputSchema: ManagedDatabaseSensitivityLabelsListCurrentByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    includeDisabledRecommendations: Schema.optional(Schema.Boolean),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/recommendedSensitivityLabels",
    }),
  );
export type ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseInput =
  typeof ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOutput =
  typeof ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOutput.Type;

// The operation
/**
 * Gets the sensitivity labels of a given database
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param includeDisabledRecommendations - Specifies whether to include disabled recommendations or not.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSensitivityLabelsListRecommendedByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseInput,
    outputSchema:
      ManagedDatabaseSensitivityLabelsListRecommendedByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabaseSensitivityLabelsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/currentSensitivityLabels",
    }),
  );
export type ManagedDatabaseSensitivityLabelsUpdateInput =
  typeof ManagedDatabaseSensitivityLabelsUpdateInput.Type;

// Output Schema
export const ManagedDatabaseSensitivityLabelsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabaseSensitivityLabelsUpdateOutput =
  typeof ManagedDatabaseSensitivityLabelsUpdateOutput.Type;

// The operation
/**
 * Update sensitivity labels of a given database using an operations batch.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseSensitivityLabelsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseSensitivityLabelsUpdateInput,
    outputSchema: ManagedDatabaseSensitivityLabelsUpdateOutput,
  }));
// Input Schema
export const ManagedDatabasesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}",
    }),
  );
export type ManagedDatabasesGetInput = typeof ManagedDatabasesGetInput.Type;

// Output Schema
export const ManagedDatabasesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ManagedDatabasesGetOutput = typeof ManagedDatabasesGetOutput.Type;

// The operation
/**
 * Gets a managed database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ManagedDatabasesGetInput,
  outputSchema: ManagedDatabasesGetOutput,
}));
// Input Schema
export const ManagedDatabasesListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases",
    }),
  );
export type ManagedDatabasesListByInstanceInput =
  typeof ManagedDatabasesListByInstanceInput.Type;

// Output Schema
export const ManagedDatabasesListByInstanceOutput =
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
export type ManagedDatabasesListByInstanceOutput =
  typeof ManagedDatabasesListByInstanceOutput.Type;

// The operation
/**
 * Gets a list of managed databases.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabasesListByInstanceInput,
    outputSchema: ManagedDatabasesListByInstanceOutput,
  }));
// Input Schema
export const ManagedDatabasesListInaccessibleByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/inaccessibleManagedDatabases",
    }),
  );
export type ManagedDatabasesListInaccessibleByInstanceInput =
  typeof ManagedDatabasesListInaccessibleByInstanceInput.Type;

// Output Schema
export const ManagedDatabasesListInaccessibleByInstanceOutput =
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
export type ManagedDatabasesListInaccessibleByInstanceOutput =
  typeof ManagedDatabasesListInaccessibleByInstanceOutput.Type;

// The operation
/**
 * Gets a list of inaccessible managed databases in a managed instance
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesListInaccessibleByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabasesListInaccessibleByInstanceInput,
    outputSchema: ManagedDatabasesListInaccessibleByInstanceOutput,
  }));
// Input Schema
export const ManagedDatabasesStartMoveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/startMove",
    }),
  );
export type ManagedDatabasesStartMoveInput =
  typeof ManagedDatabasesStartMoveInput.Type;

// Output Schema
export const ManagedDatabasesStartMoveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabasesStartMoveOutput =
  typeof ManagedDatabasesStartMoveOutput.Type;

// The operation
/**
 * Starts a managed database move operation.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesStartMove = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDatabasesStartMoveInput,
    outputSchema: ManagedDatabasesStartMoveOutput,
  }),
);
// Input Schema
export const ManagedDatabasesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}",
    }),
  );
export type ManagedDatabasesUpdateInput =
  typeof ManagedDatabasesUpdateInput.Type;

// Output Schema
export const ManagedDatabasesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ManagedDatabasesUpdateOutput =
  typeof ManagedDatabasesUpdateOutput.Type;

// The operation
/**
 * Updates an existing database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabasesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDatabasesUpdateInput,
    outputSchema: ManagedDatabasesUpdateOutput,
  }),
);
// Input Schema
export const ManagedDatabaseTablesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}",
    }),
  );
export type ManagedDatabaseTablesGetInput =
  typeof ManagedDatabaseTablesGetInput.Type;

// Output Schema
export const ManagedDatabaseTablesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseTablesGetOutput =
  typeof ManagedDatabaseTablesGetOutput.Type;

// The operation
/**
 * Get managed database table
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseTablesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedDatabaseTablesGetInput,
    outputSchema: ManagedDatabaseTablesGetOutput,
  }),
);
// Input Schema
export const ManagedDatabaseTablesListBySchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/schemas/{schemaName}/tables",
    }),
  );
export type ManagedDatabaseTablesListBySchemaInput =
  typeof ManagedDatabaseTablesListBySchemaInput.Type;

// Output Schema
export const ManagedDatabaseTablesListBySchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseTablesListBySchemaOutput =
  typeof ManagedDatabaseTablesListBySchemaOutput.Type;

// The operation
/**
 * List managed database tables
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param schemaName - The name of the schema.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseTablesListBySchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseTablesListBySchemaInput,
    outputSchema: ManagedDatabaseTablesListBySchemaOutput,
  }));
// Input Schema
export const ManagedDatabaseTransparentDataEncryptionCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    tdeName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/transparentDataEncryption/{tdeName}",
    }),
  );
export type ManagedDatabaseTransparentDataEncryptionCreateOrUpdateInput =
  typeof ManagedDatabaseTransparentDataEncryptionCreateOrUpdateInput.Type;

// Output Schema
export const ManagedDatabaseTransparentDataEncryptionCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseTransparentDataEncryptionCreateOrUpdateOutput =
  typeof ManagedDatabaseTransparentDataEncryptionCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates a database's transparent data encryption configuration.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database for which the security alert policy is defined.
 * @param tdeName - The name of the transparent data encryption configuration.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseTransparentDataEncryptionCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseTransparentDataEncryptionCreateOrUpdateInput,
    outputSchema: ManagedDatabaseTransparentDataEncryptionCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedDatabaseTransparentDataEncryptionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    tdeName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/transparentDataEncryption/{tdeName}",
    }),
  );
export type ManagedDatabaseTransparentDataEncryptionGetInput =
  typeof ManagedDatabaseTransparentDataEncryptionGetInput.Type;

// Output Schema
export const ManagedDatabaseTransparentDataEncryptionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseTransparentDataEncryptionGetOutput =
  typeof ManagedDatabaseTransparentDataEncryptionGetOutput.Type;

// The operation
/**
 * Gets a managed database's transparent data encryption.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database for which the transparent data encryption is defined.
 * @param tdeName - The name of the transparent data encryption configuration.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseTransparentDataEncryptionGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseTransparentDataEncryptionGetInput,
    outputSchema: ManagedDatabaseTransparentDataEncryptionGetOutput,
  }));
// Input Schema
export const ManagedDatabaseTransparentDataEncryptionListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/transparentDataEncryption",
    }),
  );
export type ManagedDatabaseTransparentDataEncryptionListByDatabaseInput =
  typeof ManagedDatabaseTransparentDataEncryptionListByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseTransparentDataEncryptionListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseTransparentDataEncryptionListByDatabaseOutput =
  typeof ManagedDatabaseTransparentDataEncryptionListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of managed database's transparent data encryptions.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the managed database for which the transparent data encryption is defined.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseTransparentDataEncryptionListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseTransparentDataEncryptionListByDatabaseInput,
    outputSchema: ManagedDatabaseTransparentDataEncryptionListByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    ruleId: Schema.String.pipe(T.PathParam()),
    baselineName: Schema.Literals(["master", "default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/rules/{ruleId}/baselines/{baselineName}",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput =
  typeof ManagedDatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the database for which the vulnerability assessment rule baseline is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param baselineName - The name of the vulnerability assessment rule baseline (default implies a baseline on a database level rule and master for server level rule).
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedDatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateInput,
    outputSchema:
      ManagedDatabaseVulnerabilityAssessmentRuleBaselinesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentRuleBaselinesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    ruleId: Schema.String.pipe(T.PathParam()),
    baselineName: Schema.Literals(["master", "default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/rules/{ruleId}/baselines/{baselineName}",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentRuleBaselinesDeleteInput =
  typeof ManagedDatabaseVulnerabilityAssessmentRuleBaselinesDeleteInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabaseVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentRuleBaselinesDeleteOutput.Type;

// The operation
/**
 * Removes the database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the database for which the vulnerability assessment rule baseline is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param baselineName - The name of the vulnerability assessment rule baseline (default implies a baseline on a database level rule and master for server level rule).
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentRuleBaselinesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentRuleBaselinesDeleteInput,
    outputSchema:
      ManagedDatabaseVulnerabilityAssessmentRuleBaselinesDeleteOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentRuleBaselinesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    ruleId: Schema.String.pipe(T.PathParam()),
    baselineName: Schema.Literals(["master", "default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/rules/{ruleId}/baselines/{baselineName}",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentRuleBaselinesGetInput =
  typeof ManagedDatabaseVulnerabilityAssessmentRuleBaselinesGetInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentRuleBaselinesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseVulnerabilityAssessmentRuleBaselinesGetOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentRuleBaselinesGetOutput.Type;

// The operation
/**
 * Gets a database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the database for which the vulnerability assessment rule baseline is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param baselineName - The name of the vulnerability assessment rule baseline (default implies a baseline on a database level rule and master for server level rule).
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentRuleBaselinesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentRuleBaselinesGetInput,
    outputSchema: ManagedDatabaseVulnerabilityAssessmentRuleBaselinesGetOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentScansExportInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/export",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentScansExportInput =
  typeof ManagedDatabaseVulnerabilityAssessmentScansExportInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentScansExportOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseVulnerabilityAssessmentScansExportOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentScansExportOutput.Type;

// The operation
/**
 * Convert an existing scan result to a human readable format. If already exists nothing happens
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the scanned database.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentScansExport =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentScansExportInput,
    outputSchema: ManagedDatabaseVulnerabilityAssessmentScansExportOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentScansGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentScansGetInput =
  typeof ManagedDatabaseVulnerabilityAssessmentScansGetInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentScansGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseVulnerabilityAssessmentScansGetOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentScansGetOutput.Type;

// The operation
/**
 * Gets a vulnerability assessment scan record of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id of the scan to retrieve.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentScansGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentScansGetInput,
    outputSchema: ManagedDatabaseVulnerabilityAssessmentScansGetOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentScansInitiateScanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/initiateScan",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentScansInitiateScanInput =
  typeof ManagedDatabaseVulnerabilityAssessmentScansInitiateScanInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentScansInitiateScanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabaseVulnerabilityAssessmentScansInitiateScanOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentScansInitiateScanOutput.Type;

// The operation
/**
 * Executes a Vulnerability Assessment database scan.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param scanId - The vulnerability assessment scan Id of the scan to retrieve.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentScansInitiateScan =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentScansInitiateScanInput,
    outputSchema: ManagedDatabaseVulnerabilityAssessmentScansInitiateScanOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentScansListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}/scans",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentScansListByDatabaseInput =
  typeof ManagedDatabaseVulnerabilityAssessmentScansListByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentScansListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseVulnerabilityAssessmentScansListByDatabaseOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentScansListByDatabaseOutput.Type;

// The operation
/**
 * Lists the vulnerability assessment scans of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentScansListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentScansListByDatabaseInput,
    outputSchema:
      ManagedDatabaseVulnerabilityAssessmentScansListByDatabaseOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentsCreateOrUpdateInput =
  typeof ManagedDatabaseVulnerabilityAssessmentsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseVulnerabilityAssessmentsCreateOrUpdateOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the database's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the database for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentsCreateOrUpdateInput,
    outputSchema: ManagedDatabaseVulnerabilityAssessmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentsDeleteInput =
  typeof ManagedDatabaseVulnerabilityAssessmentsDeleteInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedDatabaseVulnerabilityAssessmentsDeleteOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentsDeleteOutput.Type;

// The operation
/**
 * Removes the database's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the database for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentsDeleteInput,
    outputSchema: ManagedDatabaseVulnerabilityAssessmentsDeleteOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentsGetInput =
  typeof ManagedDatabaseVulnerabilityAssessmentsGetInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedDatabaseVulnerabilityAssessmentsGetOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentsGetOutput.Type;

// The operation
/**
 * Gets the database's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the database for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentsGetInput,
    outputSchema: ManagedDatabaseVulnerabilityAssessmentsGetOutput,
  }));
// Input Schema
export const ManagedDatabaseVulnerabilityAssessmentsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/vulnerabilityAssessments",
    }),
  );
export type ManagedDatabaseVulnerabilityAssessmentsListByDatabaseInput =
  typeof ManagedDatabaseVulnerabilityAssessmentsListByDatabaseInput.Type;

// Output Schema
export const ManagedDatabaseVulnerabilityAssessmentsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedDatabaseVulnerabilityAssessmentsListByDatabaseOutput =
  typeof ManagedDatabaseVulnerabilityAssessmentsListByDatabaseOutput.Type;

// The operation
/**
 * Lists the vulnerability assessments of a managed database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance.
 * @param databaseName - The name of the database for which the vulnerability assessment is defined.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedDatabaseVulnerabilityAssessmentsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedDatabaseVulnerabilityAssessmentsListByDatabaseInput,
    outputSchema: ManagedDatabaseVulnerabilityAssessmentsListByDatabaseOutput,
  }));
// Input Schema
export const ManagedInstanceAdministratorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    administratorName: Schema.Literals(["ActiveDirectory"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/administrators/{administratorName}",
    }),
  );
export type ManagedInstanceAdministratorsCreateOrUpdateInput =
  typeof ManagedInstanceAdministratorsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstanceAdministratorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceAdministratorsCreateOrUpdateOutput =
  typeof ManagedInstanceAdministratorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a managed instance administrator.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAdministratorsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceAdministratorsCreateOrUpdateInput,
    outputSchema: ManagedInstanceAdministratorsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstanceAdministratorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    administratorName: Schema.Literals(["ActiveDirectory"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/administrators/{administratorName}",
    }),
  );
export type ManagedInstanceAdministratorsDeleteInput =
  typeof ManagedInstanceAdministratorsDeleteInput.Type;

// Output Schema
export const ManagedInstanceAdministratorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstanceAdministratorsDeleteOutput =
  typeof ManagedInstanceAdministratorsDeleteOutput.Type;

// The operation
/**
 * Deletes a managed instance administrator.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAdministratorsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceAdministratorsDeleteInput,
    outputSchema: ManagedInstanceAdministratorsDeleteOutput,
  }));
// Input Schema
export const ManagedInstanceAdministratorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    administratorName: Schema.Literals(["ActiveDirectory"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/administrators/{administratorName}",
    }),
  );
export type ManagedInstanceAdministratorsGetInput =
  typeof ManagedInstanceAdministratorsGetInput.Type;

// Output Schema
export const ManagedInstanceAdministratorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceAdministratorsGetOutput =
  typeof ManagedInstanceAdministratorsGetOutput.Type;

// The operation
/**
 * Gets a managed instance administrator.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAdministratorsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceAdministratorsGetInput,
    outputSchema: ManagedInstanceAdministratorsGetOutput,
  }));
// Input Schema
export const ManagedInstanceAdministratorsListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/administrators",
    }),
  );
export type ManagedInstanceAdministratorsListByInstanceInput =
  typeof ManagedInstanceAdministratorsListByInstanceInput.Type;

// Output Schema
export const ManagedInstanceAdministratorsListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstanceAdministratorsListByInstanceOutput =
  typeof ManagedInstanceAdministratorsListByInstanceOutput.Type;

// The operation
/**
 * Gets a list of managed instance administrators.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAdministratorsListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceAdministratorsListByInstanceInput,
    outputSchema: ManagedInstanceAdministratorsListByInstanceOutput,
  }));
// Input Schema
export const ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateInput =
  typeof ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOutput =
  typeof ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates Advanced Threat Protection settings.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateInput,
    outputSchema:
      ManagedInstanceAdvancedThreatProtectionSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstanceAdvancedThreatProtectionSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type ManagedInstanceAdvancedThreatProtectionSettingsGetInput =
  typeof ManagedInstanceAdvancedThreatProtectionSettingsGetInput.Type;

// Output Schema
export const ManagedInstanceAdvancedThreatProtectionSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceAdvancedThreatProtectionSettingsGetOutput =
  typeof ManagedInstanceAdvancedThreatProtectionSettingsGetOutput.Type;

// The operation
/**
 * Get a managed instance's Advanced Threat Protection state.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAdvancedThreatProtectionSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceAdvancedThreatProtectionSettingsGetInput,
    outputSchema: ManagedInstanceAdvancedThreatProtectionSettingsGetOutput,
  }));
// Input Schema
export const ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/advancedThreatProtectionSettings",
    }),
  );
export type ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceInput =
  typeof ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceInput.Type;

// Output Schema
export const ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOutput =
  typeof ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOutput.Type;

// The operation
/**
 * Get the managed instance's Advanced Threat Protection settings.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAdvancedThreatProtectionSettingsListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceInput,
    outputSchema:
      ManagedInstanceAdvancedThreatProtectionSettingsListByInstanceOutput,
  }));
// Input Schema
export const ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    authenticationName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/azureADOnlyAuthentications/{authenticationName}",
    }),
  );
export type ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateInput =
  typeof ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOutput =
  typeof ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param authenticationName - The name of server azure active directory only authentication.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateInput,
    outputSchema: ManagedInstanceAzureADOnlyAuthenticationsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstanceAzureADOnlyAuthenticationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    authenticationName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/azureADOnlyAuthentications/{authenticationName}",
    }),
  );
export type ManagedInstanceAzureADOnlyAuthenticationsDeleteInput =
  typeof ManagedInstanceAzureADOnlyAuthenticationsDeleteInput.Type;

// Output Schema
export const ManagedInstanceAzureADOnlyAuthenticationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstanceAzureADOnlyAuthenticationsDeleteOutput =
  typeof ManagedInstanceAzureADOnlyAuthenticationsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing server Active Directory only authentication property.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param authenticationName - The name of server azure active directory only authentication.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAzureADOnlyAuthenticationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceAzureADOnlyAuthenticationsDeleteInput,
    outputSchema: ManagedInstanceAzureADOnlyAuthenticationsDeleteOutput,
  }));
// Input Schema
export const ManagedInstanceAzureADOnlyAuthenticationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    authenticationName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/azureADOnlyAuthentications/{authenticationName}",
    }),
  );
export type ManagedInstanceAzureADOnlyAuthenticationsGetInput =
  typeof ManagedInstanceAzureADOnlyAuthenticationsGetInput.Type;

// Output Schema
export const ManagedInstanceAzureADOnlyAuthenticationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceAzureADOnlyAuthenticationsGetOutput =
  typeof ManagedInstanceAzureADOnlyAuthenticationsGetOutput.Type;

// The operation
/**
 * Gets a specific Azure Active Directory only authentication property.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param authenticationName - The name of server azure active directory only authentication.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAzureADOnlyAuthenticationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceAzureADOnlyAuthenticationsGetInput,
    outputSchema: ManagedInstanceAzureADOnlyAuthenticationsGetOutput,
  }));
// Input Schema
export const ManagedInstanceAzureADOnlyAuthenticationsListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/azureADOnlyAuthentications",
    }),
  );
export type ManagedInstanceAzureADOnlyAuthenticationsListByInstanceInput =
  typeof ManagedInstanceAzureADOnlyAuthenticationsListByInstanceInput.Type;

// Output Schema
export const ManagedInstanceAzureADOnlyAuthenticationsListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstanceAzureADOnlyAuthenticationsListByInstanceOutput =
  typeof ManagedInstanceAzureADOnlyAuthenticationsListByInstanceOutput.Type;

// The operation
/**
 * Gets a list of server Azure Active Directory only authentications.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceAzureADOnlyAuthenticationsListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceAzureADOnlyAuthenticationsListByInstanceInput,
    outputSchema: ManagedInstanceAzureADOnlyAuthenticationsListByInstanceOutput,
  }));
// Input Schema
export const ManagedInstanceDtcsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dtcName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dtc/{dtcName}",
    }),
  );
export type ManagedInstanceDtcsCreateOrUpdateInput =
  typeof ManagedInstanceDtcsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstanceDtcsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceDtcsCreateOrUpdateOutput =
  typeof ManagedInstanceDtcsCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates managed instance DTC settings.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param dtcName - The name of the managed instance DTC.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceDtcsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceDtcsCreateOrUpdateInput,
    outputSchema: ManagedInstanceDtcsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstanceDtcsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dtcName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dtc/{dtcName}",
    }),
  );
export type ManagedInstanceDtcsGetInput =
  typeof ManagedInstanceDtcsGetInput.Type;

// Output Schema
export const ManagedInstanceDtcsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceDtcsGetOutput =
  typeof ManagedInstanceDtcsGetOutput.Type;

// The operation
/**
 * Gets managed instance DTC settings.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param dtcName - The name of the managed instance DTC.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceDtcsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedInstanceDtcsGetInput,
    outputSchema: ManagedInstanceDtcsGetOutput,
  }),
);
// Input Schema
export const ManagedInstanceDtcsListByManagedInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dtc",
    }),
  );
export type ManagedInstanceDtcsListByManagedInstanceInput =
  typeof ManagedInstanceDtcsListByManagedInstanceInput.Type;

// Output Schema
export const ManagedInstanceDtcsListByManagedInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstanceDtcsListByManagedInstanceOutput =
  typeof ManagedInstanceDtcsListByManagedInstanceOutput.Type;

// The operation
/**
 * Gets a list of managed instance DTC settings.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceDtcsListByManagedInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceDtcsListByManagedInstanceInput,
    outputSchema: ManagedInstanceDtcsListByManagedInstanceOutput,
  }));
// Input Schema
export const ManagedInstanceEncryptionProtectorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/encryptionProtector/{encryptionProtectorName}",
    }),
  );
export type ManagedInstanceEncryptionProtectorsCreateOrUpdateInput =
  typeof ManagedInstanceEncryptionProtectorsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstanceEncryptionProtectorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceEncryptionProtectorsCreateOrUpdateOutput =
  typeof ManagedInstanceEncryptionProtectorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates an existing encryption protector.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param encryptionProtectorName - The name of the encryption protector to be updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceEncryptionProtectorsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceEncryptionProtectorsCreateOrUpdateInput,
    outputSchema: ManagedInstanceEncryptionProtectorsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstanceEncryptionProtectorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/encryptionProtector/{encryptionProtectorName}",
    }),
  );
export type ManagedInstanceEncryptionProtectorsGetInput =
  typeof ManagedInstanceEncryptionProtectorsGetInput.Type;

// Output Schema
export const ManagedInstanceEncryptionProtectorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceEncryptionProtectorsGetOutput =
  typeof ManagedInstanceEncryptionProtectorsGetOutput.Type;

// The operation
/**
 * Gets a managed instance encryption protector.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param encryptionProtectorName - The name of the encryption protector to be retrieved.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceEncryptionProtectorsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceEncryptionProtectorsGetInput,
    outputSchema: ManagedInstanceEncryptionProtectorsGetOutput,
  }));
// Input Schema
export const ManagedInstanceEncryptionProtectorsListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/encryptionProtector",
    }),
  );
export type ManagedInstanceEncryptionProtectorsListByInstanceInput =
  typeof ManagedInstanceEncryptionProtectorsListByInstanceInput.Type;

// Output Schema
export const ManagedInstanceEncryptionProtectorsListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstanceEncryptionProtectorsListByInstanceOutput =
  typeof ManagedInstanceEncryptionProtectorsListByInstanceOutput.Type;

// The operation
/**
 * Gets a list of managed instance encryption protectors
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceEncryptionProtectorsListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceEncryptionProtectorsListByInstanceInput,
    outputSchema: ManagedInstanceEncryptionProtectorsListByInstanceOutput,
  }));
// Input Schema
export const ManagedInstanceEncryptionProtectorsRevalidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    encryptionProtectorName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/encryptionProtector/{encryptionProtectorName}/revalidate",
    }),
  );
export type ManagedInstanceEncryptionProtectorsRevalidateInput =
  typeof ManagedInstanceEncryptionProtectorsRevalidateInput.Type;

// Output Schema
export const ManagedInstanceEncryptionProtectorsRevalidateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstanceEncryptionProtectorsRevalidateOutput =
  typeof ManagedInstanceEncryptionProtectorsRevalidateOutput.Type;

// The operation
/**
 * Revalidates an existing encryption protector.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param encryptionProtectorName - The name of the encryption protector to be updated.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceEncryptionProtectorsRevalidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceEncryptionProtectorsRevalidateInput,
    outputSchema: ManagedInstanceEncryptionProtectorsRevalidateOutput,
  }));
// Input Schema
export const ManagedInstanceKeysCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    keyName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/keys/{keyName}",
    }),
  );
export type ManagedInstanceKeysCreateOrUpdateInput =
  typeof ManagedInstanceKeysCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstanceKeysCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceKeysCreateOrUpdateOutput =
  typeof ManagedInstanceKeysCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a managed instance key.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param keyName - The name of the managed instance key to be operated on (updated or created).
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceKeysCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceKeysCreateOrUpdateInput,
    outputSchema: ManagedInstanceKeysCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstanceKeysDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    keyName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/keys/{keyName}",
    }),
  );
export type ManagedInstanceKeysDeleteInput =
  typeof ManagedInstanceKeysDeleteInput.Type;

// Output Schema
export const ManagedInstanceKeysDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstanceKeysDeleteOutput =
  typeof ManagedInstanceKeysDeleteOutput.Type;

// The operation
/**
 * Deletes the managed instance key with the given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param keyName - The name of the managed instance key to be deleted.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceKeysDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedInstanceKeysDeleteInput,
    outputSchema: ManagedInstanceKeysDeleteOutput,
  }),
);
// Input Schema
export const ManagedInstanceKeysGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    keyName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/keys/{keyName}",
    }),
  );
export type ManagedInstanceKeysGetInput =
  typeof ManagedInstanceKeysGetInput.Type;

// Output Schema
export const ManagedInstanceKeysGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceKeysGetOutput =
  typeof ManagedInstanceKeysGetOutput.Type;

// The operation
/**
 * Gets a managed instance key.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param keyName - The name of the managed instance key to be retrieved.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceKeysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedInstanceKeysGetInput,
    outputSchema: ManagedInstanceKeysGetOutput,
  }),
);
// Input Schema
export const ManagedInstanceKeysListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/keys",
    }),
  );
export type ManagedInstanceKeysListByInstanceInput =
  typeof ManagedInstanceKeysListByInstanceInput.Type;

// Output Schema
export const ManagedInstanceKeysListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstanceKeysListByInstanceOutput =
  typeof ManagedInstanceKeysListByInstanceOutput.Type;

// The operation
/**
 * Gets a list of managed instance keys.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceKeysListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceKeysListByInstanceInput,
    outputSchema: ManagedInstanceKeysListByInstanceOutput,
  }));
// Input Schema
export const ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}",
    }),
  );
export type ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateInput =
  typeof ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOutput =
  typeof ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Sets a managed database's long term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be Default.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceLongTermRetentionPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateInput,
    outputSchema: ManagedInstanceLongTermRetentionPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstanceLongTermRetentionPoliciesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}",
    }),
  );
export type ManagedInstanceLongTermRetentionPoliciesDeleteInput =
  typeof ManagedInstanceLongTermRetentionPoliciesDeleteInput.Type;

// Output Schema
export const ManagedInstanceLongTermRetentionPoliciesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceLongTermRetentionPoliciesDeleteOutput =
  typeof ManagedInstanceLongTermRetentionPoliciesDeleteOutput.Type;

// The operation
/**
 * Deletes a managed database's long term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be Default.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceLongTermRetentionPoliciesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceLongTermRetentionPoliciesDeleteInput,
    outputSchema: ManagedInstanceLongTermRetentionPoliciesDeleteOutput,
  }));
// Input Schema
export const ManagedInstanceLongTermRetentionPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}",
    }),
  );
export type ManagedInstanceLongTermRetentionPoliciesGetInput =
  typeof ManagedInstanceLongTermRetentionPoliciesGetInput.Type;

// Output Schema
export const ManagedInstanceLongTermRetentionPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceLongTermRetentionPoliciesGetOutput =
  typeof ManagedInstanceLongTermRetentionPoliciesGetOutput.Type;

// The operation
/**
 * Gets a managed database's long term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be Default.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceLongTermRetentionPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceLongTermRetentionPoliciesGetInput,
    outputSchema: ManagedInstanceLongTermRetentionPoliciesGetOutput,
  }));
// Input Schema
export const ManagedInstanceLongTermRetentionPoliciesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupLongTermRetentionPolicies",
    }),
  );
export type ManagedInstanceLongTermRetentionPoliciesListByDatabaseInput =
  typeof ManagedInstanceLongTermRetentionPoliciesListByDatabaseInput.Type;

// Output Schema
export const ManagedInstanceLongTermRetentionPoliciesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstanceLongTermRetentionPoliciesListByDatabaseOutput =
  typeof ManagedInstanceLongTermRetentionPoliciesListByDatabaseOutput.Type;

// The operation
/**
 * Gets a database's long term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceLongTermRetentionPoliciesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceLongTermRetentionPoliciesListByDatabaseInput,
    outputSchema: ManagedInstanceLongTermRetentionPoliciesListByDatabaseOutput,
  }));
// Input Schema
export const ManagedInstanceOperationsCancelInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/operations/{operationId}/cancel",
    }),
  );
export type ManagedInstanceOperationsCancelInput =
  typeof ManagedInstanceOperationsCancelInput.Type;

// Output Schema
export const ManagedInstanceOperationsCancelOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstanceOperationsCancelOutput =
  typeof ManagedInstanceOperationsCancelOutput.Type;

// The operation
/**
 * Cancels the asynchronous operation on the managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceOperationsCancel =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceOperationsCancelInput,
    outputSchema: ManagedInstanceOperationsCancelOutput,
  }));
// Input Schema
export const ManagedInstanceOperationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    operationId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/operations/{operationId}",
    }),
  );
export type ManagedInstanceOperationsGetInput =
  typeof ManagedInstanceOperationsGetInput.Type;

// Output Schema
export const ManagedInstanceOperationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceOperationsGetOutput =
  typeof ManagedInstanceOperationsGetOutput.Type;

// The operation
/**
 * Gets a management operation on a managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceOperationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceOperationsGetInput,
    outputSchema: ManagedInstanceOperationsGetOutput,
  }));
// Input Schema
export const ManagedInstanceOperationsListByManagedInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/operations",
    }),
  );
export type ManagedInstanceOperationsListByManagedInstanceInput =
  typeof ManagedInstanceOperationsListByManagedInstanceInput.Type;

// Output Schema
export const ManagedInstanceOperationsListByManagedInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstanceOperationsListByManagedInstanceOutput =
  typeof ManagedInstanceOperationsListByManagedInstanceOutput.Type;

// The operation
/**
 * Gets a list of operations performed on the managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceOperationsListByManagedInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceOperationsListByManagedInstanceInput,
    outputSchema: ManagedInstanceOperationsListByManagedInstanceOutput,
  }));
// Input Schema
export const ManagedInstancePrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type ManagedInstancePrivateEndpointConnectionsCreateOrUpdateInput =
  typeof ManagedInstancePrivateEndpointConnectionsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOutput =
  typeof ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Approve or reject a private endpoint connection with a given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancePrivateEndpointConnectionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancePrivateEndpointConnectionsCreateOrUpdateInput,
    outputSchema: ManagedInstancePrivateEndpointConnectionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstancePrivateEndpointConnectionsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type ManagedInstancePrivateEndpointConnectionsDeleteInput =
  typeof ManagedInstancePrivateEndpointConnectionsDeleteInput.Type;

// Output Schema
export const ManagedInstancePrivateEndpointConnectionsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstancePrivateEndpointConnectionsDeleteOutput =
  typeof ManagedInstancePrivateEndpointConnectionsDeleteOutput.Type;

// The operation
/**
 * Deletes a private endpoint connection with a given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancePrivateEndpointConnectionsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancePrivateEndpointConnectionsDeleteInput,
    outputSchema: ManagedInstancePrivateEndpointConnectionsDeleteOutput,
  }));
// Input Schema
export const ManagedInstancePrivateEndpointConnectionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateEndpointConnections/{privateEndpointConnectionName}",
    }),
  );
export type ManagedInstancePrivateEndpointConnectionsGetInput =
  typeof ManagedInstancePrivateEndpointConnectionsGetInput.Type;

// Output Schema
export const ManagedInstancePrivateEndpointConnectionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstancePrivateEndpointConnectionsGetOutput =
  typeof ManagedInstancePrivateEndpointConnectionsGetOutput.Type;

// The operation
/**
 * Gets a private endpoint connection.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancePrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancePrivateEndpointConnectionsGetInput,
    outputSchema: ManagedInstancePrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const ManagedInstancePrivateEndpointConnectionsListByManagedInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateEndpointConnections",
    }),
  );
export type ManagedInstancePrivateEndpointConnectionsListByManagedInstanceInput =
  typeof ManagedInstancePrivateEndpointConnectionsListByManagedInstanceInput.Type;

// Output Schema
export const ManagedInstancePrivateEndpointConnectionsListByManagedInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstancePrivateEndpointConnectionsListByManagedInstanceOutput =
  typeof ManagedInstancePrivateEndpointConnectionsListByManagedInstanceOutput.Type;

// The operation
/**
 * Gets all private endpoint connections on a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancePrivateEndpointConnectionsListByManagedInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedInstancePrivateEndpointConnectionsListByManagedInstanceInput,
    outputSchema:
      ManagedInstancePrivateEndpointConnectionsListByManagedInstanceOutput,
  }));
// Input Schema
export const ManagedInstancePrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateLinkResources/{groupName}",
    }),
  );
export type ManagedInstancePrivateLinkResourcesGetInput =
  typeof ManagedInstancePrivateLinkResourcesGetInput.Type;

// Output Schema
export const ManagedInstancePrivateLinkResourcesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstancePrivateLinkResourcesGetOutput =
  typeof ManagedInstancePrivateLinkResourcesGetOutput.Type;

// The operation
/**
 * Gets a private link resource for SQL server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param groupName - The name of the private link resource.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancePrivateLinkResourcesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancePrivateLinkResourcesGetInput,
    outputSchema: ManagedInstancePrivateLinkResourcesGetOutput,
  }));
// Input Schema
export const ManagedInstancePrivateLinkResourcesListByManagedInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/privateLinkResources",
    }),
  );
export type ManagedInstancePrivateLinkResourcesListByManagedInstanceInput =
  typeof ManagedInstancePrivateLinkResourcesListByManagedInstanceInput.Type;

// Output Schema
export const ManagedInstancePrivateLinkResourcesListByManagedInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstancePrivateLinkResourcesListByManagedInstanceOutput =
  typeof ManagedInstancePrivateLinkResourcesListByManagedInstanceOutput.Type;

// The operation
/**
 * Gets the private link resources for SQL server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancePrivateLinkResourcesListByManagedInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancePrivateLinkResourcesListByManagedInstanceInput,
    outputSchema:
      ManagedInstancePrivateLinkResourcesListByManagedInstanceOutput,
  }));
// Input Schema
export const ManagedInstancesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}",
    }),
  );
export type ManagedInstancesCreateOrUpdateInput =
  typeof ManagedInstancesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstancesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ManagedInstancesCreateOrUpdateOutput =
  typeof ManagedInstancesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancesCreateOrUpdateInput,
    outputSchema: ManagedInstancesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstancesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}",
    }),
  );
export type ManagedInstancesDeleteInput =
  typeof ManagedInstancesDeleteInput.Type;

// Output Schema
export const ManagedInstancesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstancesDeleteOutput =
  typeof ManagedInstancesDeleteOutput.Type;

// The operation
/**
 * Deletes a managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedInstancesDeleteInput,
    outputSchema: ManagedInstancesDeleteOutput,
  }),
);
// Input Schema
export const ManagedInstancesFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    replicaType: Schema.optional(
      Schema.Literals(["Primary", "ReadableSecondary"]),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/failover",
    }),
  );
export type ManagedInstancesFailoverInput =
  typeof ManagedInstancesFailoverInput.Type;

// Output Schema
export const ManagedInstancesFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstancesFailoverOutput =
  typeof ManagedInstancesFailoverOutput.Type;

// The operation
/**
 * Failovers a managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance to failover.
 * @param replicaType - The type of replica to be failed over.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesFailover = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedInstancesFailoverInput,
    outputSchema: ManagedInstancesFailoverOutput,
  }),
);
// Input Schema
export const ManagedInstancesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}",
    }),
  );
export type ManagedInstancesGetInput = typeof ManagedInstancesGetInput.Type;

// Output Schema
export const ManagedInstancesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ManagedInstancesGetOutput = typeof ManagedInstancesGetOutput.Type;

// The operation
/**
 * Gets a managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $expand - The child resources to include in the response.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ManagedInstancesGetInput,
  outputSchema: ManagedInstancesGetOutput,
}));
// Input Schema
export const ManagedInstancesListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/managedInstances",
    }),
  );
export type ManagedInstancesListInput = typeof ManagedInstancesListInput.Type;

// Output Schema
export const ManagedInstancesListOutput =
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
export type ManagedInstancesListOutput = typeof ManagedInstancesListOutput.Type;

// The operation
/**
 * Gets a list of all managed instances in the subscription.
 *
 * @param $expand - The child resources to include in the response.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedInstancesListInput,
    outputSchema: ManagedInstancesListOutput,
  }),
);
// Input Schema
export const ManagedInstancesListByInstancePoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    instancePoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}/managedInstances",
    }),
  );
export type ManagedInstancesListByInstancePoolInput =
  typeof ManagedInstancesListByInstancePoolInput.Type;

// Output Schema
export const ManagedInstancesListByInstancePoolOutput =
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
export type ManagedInstancesListByInstancePoolOutput =
  typeof ManagedInstancesListByInstancePoolOutput.Type;

// The operation
/**
 * Gets a list of all managed instances in an instance pool.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param instancePoolName - The instance pool name.
 * @param $expand - The child resources to include in the response.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesListByInstancePool =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancesListByInstancePoolInput,
    outputSchema: ManagedInstancesListByInstancePoolOutput,
  }));
// Input Schema
export const ManagedInstancesListByManagedInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    numberOfQueries: Schema.optional(Schema.Number),
    databases: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    interval: Schema.optional(Schema.Literals(["PT1H", "P1D"])),
    aggregationFunction: Schema.optional(
      Schema.Literals(["avg", "min", "max", "stdev", "sum"]),
    ),
    observationMetric: Schema.optional(
      Schema.Literals(["cpu", "io", "logIo", "duration", "dtu"]),
    ),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/topqueries",
    }),
  );
export type ManagedInstancesListByManagedInstanceInput =
  typeof ManagedInstancesListByManagedInstanceInput.Type;

// Output Schema
export const ManagedInstancesListByManagedInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          numberOfQueries: Schema.optional(Schema.Number),
          aggregationFunction: Schema.optional(Schema.String),
          observationMetric: Schema.optional(Schema.String),
          intervalType: Schema.optional(Schema.Literals(["PT1H", "P1D"])),
          startTime: Schema.optional(Schema.String),
          endTime: Schema.optional(Schema.String),
          queries: Schema.optional(
            Schema.Array(
              Schema.Struct({
                databaseName: Schema.optional(Schema.String),
                queryId: Schema.optional(Schema.String),
                startTime: Schema.optional(Schema.String),
                endTime: Schema.optional(Schema.String),
                intervals: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      intervalStartTime: Schema.optional(Schema.String),
                      intervalType: Schema.optional(
                        Schema.Literals(["PT1H", "P1D"]),
                      ),
                      executionCount: Schema.optional(Schema.Number),
                      metrics: Schema.optional(
                        Schema.Array(
                          Schema.Struct({
                            name: Schema.optional(Schema.String),
                            displayName: Schema.optional(Schema.String),
                            unit: Schema.optional(
                              Schema.Literals([
                                "percentage",
                                "KB",
                                "microseconds",
                                "count",
                              ]),
                            ),
                            value: Schema.optional(Schema.Number),
                            min: Schema.optional(Schema.Number),
                            max: Schema.optional(Schema.Number),
                            avg: Schema.optional(Schema.Number),
                            sum: Schema.optional(Schema.Number),
                            stdev: Schema.optional(Schema.Number),
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
export type ManagedInstancesListByManagedInstanceOutput =
  typeof ManagedInstancesListByManagedInstanceOutput.Type;

// The operation
/**
 * Get top resource consuming queries of a managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param numberOfQueries - How many 'top queries' to return. Default is 5.
 * @param databases - Comma separated list of databases to be included into search. All DB's are included if this parameter is not specified.
 * @param startTime - Start time for observed period.
 * @param endTime - End time for observed period.
 * @param interval - The time step to be used to summarize the metric values. Default value is PT1H
 * @param aggregationFunction - Aggregation function to be used, default value is 'sum'
 * @param observationMetric - Metric to be used for ranking top queries. Default is 'cpu'
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesListByManagedInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancesListByManagedInstanceInput,
    outputSchema: ManagedInstancesListByManagedInstanceOutput,
  }));
// Input Schema
export const ManagedInstancesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances",
    }),
  );
export type ManagedInstancesListByResourceGroupInput =
  typeof ManagedInstancesListByResourceGroupInput.Type;

// Output Schema
export const ManagedInstancesListByResourceGroupOutput =
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
export type ManagedInstancesListByResourceGroupOutput =
  typeof ManagedInstancesListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of managed instances in a resource group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $expand - The child resources to include in the response.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancesListByResourceGroupInput,
    outputSchema: ManagedInstancesListByResourceGroupOutput,
  }));
// Input Schema
export const ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/outboundNetworkDependenciesEndpoints",
    }),
  );
export type ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceInput =
  typeof ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceInput.Type;

// Output Schema
export const ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOutput =
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
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOutput =
  typeof ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOutput.Type;

// The operation
/**
 * Gets the collection of outbound network dependencies for the given managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesListOutboundNetworkDependenciesByManagedInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceInput,
    outputSchema:
      ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOutput,
  }));
// Input Schema
export const ManagedInstancesRefreshStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/refreshExternalGovernanceStatus",
    }),
  );
export type ManagedInstancesRefreshStatusInput =
  typeof ManagedInstancesRefreshStatusInput.Type;

// Output Schema
export const ManagedInstancesRefreshStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstancesRefreshStatusOutput =
  typeof ManagedInstancesRefreshStatusOutput.Type;

// The operation
/**
 * Refresh external governance enablement status.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesRefreshStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstancesRefreshStatusInput,
    outputSchema: ManagedInstancesRefreshStatusOutput,
  }));
// Input Schema
export const ManagedInstancesStartInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/start",
    }),
  );
export type ManagedInstancesStartInput = typeof ManagedInstancesStartInput.Type;

// Output Schema
export const ManagedInstancesStartOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ManagedInstancesStartOutput =
  typeof ManagedInstancesStartOutput.Type;

// The operation
/**
 * Starts the managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesStart = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedInstancesStartInput,
    outputSchema: ManagedInstancesStartOutput,
  }),
);
// Input Schema
export const ManagedInstancesStopInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/stop",
    }),
  );
export type ManagedInstancesStopInput = typeof ManagedInstancesStopInput.Type;

// Output Schema
export const ManagedInstancesStopOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ManagedInstancesStopOutput = typeof ManagedInstancesStopOutput.Type;

// The operation
/**
 * Stops the managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesStop = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedInstancesStopInput,
    outputSchema: ManagedInstancesStopOutput,
  }),
);
// Input Schema
export const ManagedInstancesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}",
    }),
  );
export type ManagedInstancesUpdateInput =
  typeof ManagedInstancesUpdateInput.Type;

// Output Schema
export const ManagedInstancesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ManagedInstancesUpdateOutput =
  typeof ManagedInstancesUpdateOutput.Type;

// The operation
/**
 * Updates a managed instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstancesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedInstancesUpdateInput,
    outputSchema: ManagedInstancesUpdateOutput,
  }),
);
// Input Schema
export const ManagedInstanceTdeCertificatesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/tdeCertificates",
    }),
  );
export type ManagedInstanceTdeCertificatesCreateInput =
  typeof ManagedInstanceTdeCertificatesCreateInput.Type;

// Output Schema
export const ManagedInstanceTdeCertificatesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstanceTdeCertificatesCreateOutput =
  typeof ManagedInstanceTdeCertificatesCreateOutput.Type;

// The operation
/**
 * Creates a TDE certificate for a given server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceTdeCertificatesCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceTdeCertificatesCreateInput,
    outputSchema: ManagedInstanceTdeCertificatesCreateOutput,
  }));
// Input Schema
export const ManagedInstanceVulnerabilityAssessmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type ManagedInstanceVulnerabilityAssessmentsCreateOrUpdateInput =
  typeof ManagedInstanceVulnerabilityAssessmentsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedInstanceVulnerabilityAssessmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceVulnerabilityAssessmentsCreateOrUpdateOutput =
  typeof ManagedInstanceVulnerabilityAssessmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the managed instance's vulnerability assessment. Learn more about setting SQL vulnerability assessment with managed identity - https://docs.microsoft.com/azure/azure-sql/database/sql-database-vulnerability-assessment-storage
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceVulnerabilityAssessmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceVulnerabilityAssessmentsCreateOrUpdateInput,
    outputSchema: ManagedInstanceVulnerabilityAssessmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedInstanceVulnerabilityAssessmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type ManagedInstanceVulnerabilityAssessmentsDeleteInput =
  typeof ManagedInstanceVulnerabilityAssessmentsDeleteInput.Type;

// Output Schema
export const ManagedInstanceVulnerabilityAssessmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedInstanceVulnerabilityAssessmentsDeleteOutput =
  typeof ManagedInstanceVulnerabilityAssessmentsDeleteOutput.Type;

// The operation
/**
 * Removes the managed instance's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceVulnerabilityAssessmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceVulnerabilityAssessmentsDeleteInput,
    outputSchema: ManagedInstanceVulnerabilityAssessmentsDeleteOutput,
  }));
// Input Schema
export const ManagedInstanceVulnerabilityAssessmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type ManagedInstanceVulnerabilityAssessmentsGetInput =
  typeof ManagedInstanceVulnerabilityAssessmentsGetInput.Type;

// Output Schema
export const ManagedInstanceVulnerabilityAssessmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedInstanceVulnerabilityAssessmentsGetOutput =
  typeof ManagedInstanceVulnerabilityAssessmentsGetOutput.Type;

// The operation
/**
 * Gets the managed instance's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceVulnerabilityAssessmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceVulnerabilityAssessmentsGetInput,
    outputSchema: ManagedInstanceVulnerabilityAssessmentsGetOutput,
  }));
// Input Schema
export const ManagedInstanceVulnerabilityAssessmentsListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    managedInstanceName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/vulnerabilityAssessments",
    }),
  );
export type ManagedInstanceVulnerabilityAssessmentsListByInstanceInput =
  typeof ManagedInstanceVulnerabilityAssessmentsListByInstanceInput.Type;

// Output Schema
export const ManagedInstanceVulnerabilityAssessmentsListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedInstanceVulnerabilityAssessmentsListByInstanceOutput =
  typeof ManagedInstanceVulnerabilityAssessmentsListByInstanceOutput.Type;

// The operation
/**
 * Gets the managed instance's vulnerability assessment policies.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param managedInstanceName - The name of the managed instance for which the vulnerability assessments is defined.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedInstanceVulnerabilityAssessmentsListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedInstanceVulnerabilityAssessmentsListByInstanceInput,
    outputSchema: ManagedInstanceVulnerabilityAssessmentsListByInstanceOutput,
  }));
// Input Schema
export const ManagedLedgerDigestUploadsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    ledgerDigestUploads: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}",
    }),
  );
export type ManagedLedgerDigestUploadsCreateOrUpdateInput =
  typeof ManagedLedgerDigestUploadsCreateOrUpdateInput.Type;

// Output Schema
export const ManagedLedgerDigestUploadsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedLedgerDigestUploadsCreateOrUpdateOutput =
  typeof ManagedLedgerDigestUploadsCreateOrUpdateOutput.Type;

// The operation
/**
 * Enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param ledgerDigestUploads - The name of the Ledger Digest Upload Configurations.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedLedgerDigestUploadsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedLedgerDigestUploadsCreateOrUpdateInput,
    outputSchema: ManagedLedgerDigestUploadsCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedLedgerDigestUploadsDisableInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    ledgerDigestUploads: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}/disable",
    }),
  );
export type ManagedLedgerDigestUploadsDisableInput =
  typeof ManagedLedgerDigestUploadsDisableInput.Type;

// Output Schema
export const ManagedLedgerDigestUploadsDisableOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedLedgerDigestUploadsDisableOutput =
  typeof ManagedLedgerDigestUploadsDisableOutput.Type;

// The operation
/**
 * Disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedLedgerDigestUploadsDisable =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedLedgerDigestUploadsDisableInput,
    outputSchema: ManagedLedgerDigestUploadsDisableOutput,
  }));
// Input Schema
export const ManagedLedgerDigestUploadsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    ledgerDigestUploads: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads/{ledgerDigestUploads}",
    }),
  );
export type ManagedLedgerDigestUploadsGetInput =
  typeof ManagedLedgerDigestUploadsGetInput.Type;

// Output Schema
export const ManagedLedgerDigestUploadsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedLedgerDigestUploadsGetOutput =
  typeof ManagedLedgerDigestUploadsGetOutput.Type;

// The operation
/**
 * Gets the current ledger digest upload configuration for a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedLedgerDigestUploadsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedLedgerDigestUploadsGetInput,
    outputSchema: ManagedLedgerDigestUploadsGetOutput,
  }));
// Input Schema
export const ManagedLedgerDigestUploadsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/ledgerDigestUploads",
    }),
  );
export type ManagedLedgerDigestUploadsListByDatabaseInput =
  typeof ManagedLedgerDigestUploadsListByDatabaseInput.Type;

// Output Schema
export const ManagedLedgerDigestUploadsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedLedgerDigestUploadsListByDatabaseOutput =
  typeof ManagedLedgerDigestUploadsListByDatabaseOutput.Type;

// The operation
/**
 * Gets all ledger digest upload settings on a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedLedgerDigestUploadsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedLedgerDigestUploadsListByDatabaseInput,
    outputSchema: ManagedLedgerDigestUploadsListByDatabaseOutput,
  }));
// Input Schema
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    restorableDroppedDatabaseId: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies/{policyName}",
    }),
  );
export type ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateInput =
  typeof ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOutput =
  typeof ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Sets a database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be "default".
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateInput,
    outputSchema:
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    restorableDroppedDatabaseId: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies/{policyName}",
    }),
  );
export type ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetInput =
  typeof ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetInput.Type;

// Output Schema
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetOutput =
  typeof ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetOutput.Type;

// The operation
/**
 * Gets a dropped database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetInput,
    outputSchema:
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetOutput,
  }));
// Input Schema
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    restorableDroppedDatabaseId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies",
    }),
  );
export type ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseInput =
  typeof ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseInput.Type;

// Output Schema
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseOutput =
  typeof ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseOutput.Type;

// The operation
/**
 * Gets a dropped database's short term retention policy list.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseInput,
    outputSchema:
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseOutput,
  }));
// Input Schema
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    restorableDroppedDatabaseId: Schema.String.pipe(T.PathParam()),
    policyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies/{policyName}",
    }),
  );
export type ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateInput =
  typeof ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateInput.Type;

// Output Schema
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOutput =
  typeof ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOutput.Type;

// The operation
/**
 * Sets a database's short term retention policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param policyName - The policy name. Should always be "default".
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateInput,
    outputSchema:
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateOutput,
  }));
// Input Schema
export const ManagedServerDnsAliasesAcquireInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsAliasName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}/acquire",
    }),
  );
export type ManagedServerDnsAliasesAcquireInput =
  typeof ManagedServerDnsAliasesAcquireInput.Type;

// Output Schema
export const ManagedServerDnsAliasesAcquireOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedServerDnsAliasesAcquireOutput =
  typeof ManagedServerDnsAliasesAcquireOutput.Type;

// The operation
/**
 * Acquires managed server DNS alias from another managed server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedServerDnsAliasesAcquire =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedServerDnsAliasesAcquireInput,
    outputSchema: ManagedServerDnsAliasesAcquireOutput,
  }));
// Input Schema
export const ManagedServerDnsAliasesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsAliasName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}",
    }),
  );
export type ManagedServerDnsAliasesCreateOrUpdateInput =
  typeof ManagedServerDnsAliasesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedServerDnsAliasesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedServerDnsAliasesCreateOrUpdateOutput =
  typeof ManagedServerDnsAliasesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a managed server DNS alias.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedServerDnsAliasesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedServerDnsAliasesCreateOrUpdateInput,
    outputSchema: ManagedServerDnsAliasesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedServerDnsAliasesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsAliasName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}",
    }),
  );
export type ManagedServerDnsAliasesDeleteInput =
  typeof ManagedServerDnsAliasesDeleteInput.Type;

// Output Schema
export const ManagedServerDnsAliasesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ManagedServerDnsAliasesDeleteOutput =
  typeof ManagedServerDnsAliasesDeleteOutput.Type;

// The operation
/**
 * Deletes the managed server DNS alias with the given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedServerDnsAliasesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedServerDnsAliasesDeleteInput,
    outputSchema: ManagedServerDnsAliasesDeleteOutput,
  }));
// Input Schema
export const ManagedServerDnsAliasesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    dnsAliasName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases/{dnsAliasName}",
    }),
  );
export type ManagedServerDnsAliasesGetInput =
  typeof ManagedServerDnsAliasesGetInput.Type;

// Output Schema
export const ManagedServerDnsAliasesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedServerDnsAliasesGetOutput =
  typeof ManagedServerDnsAliasesGetOutput.Type;

// The operation
/**
 * Gets a server DNS alias.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedServerDnsAliasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ManagedServerDnsAliasesGetInput,
    outputSchema: ManagedServerDnsAliasesGetOutput,
  }),
);
// Input Schema
export const ManagedServerDnsAliasesListByManagedInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/dnsAliases",
    }),
  );
export type ManagedServerDnsAliasesListByManagedInstanceInput =
  typeof ManagedServerDnsAliasesListByManagedInstanceInput.Type;

// Output Schema
export const ManagedServerDnsAliasesListByManagedInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedServerDnsAliasesListByManagedInstanceOutput =
  typeof ManagedServerDnsAliasesListByManagedInstanceOutput.Type;

// The operation
/**
 * Gets a list of managed server DNS aliases for a managed server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedServerDnsAliasesListByManagedInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedServerDnsAliasesListByManagedInstanceInput,
    outputSchema: ManagedServerDnsAliasesListByManagedInstanceOutput,
  }));
// Input Schema
export const ManagedServerSecurityAlertPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type ManagedServerSecurityAlertPoliciesCreateOrUpdateInput =
  typeof ManagedServerSecurityAlertPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ManagedServerSecurityAlertPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedServerSecurityAlertPoliciesCreateOrUpdateOutput =
  typeof ManagedServerSecurityAlertPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a threat detection policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param securityAlertPolicyName - The name of the security alert policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedServerSecurityAlertPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedServerSecurityAlertPoliciesCreateOrUpdateInput,
    outputSchema: ManagedServerSecurityAlertPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ManagedServerSecurityAlertPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type ManagedServerSecurityAlertPoliciesGetInput =
  typeof ManagedServerSecurityAlertPoliciesGetInput.Type;

// Output Schema
export const ManagedServerSecurityAlertPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ManagedServerSecurityAlertPoliciesGetOutput =
  typeof ManagedServerSecurityAlertPoliciesGetOutput.Type;

// The operation
/**
 * Get a managed server's threat detection policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param securityAlertPolicyName - The name of the security alert policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedServerSecurityAlertPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedServerSecurityAlertPoliciesGetInput,
    outputSchema: ManagedServerSecurityAlertPoliciesGetOutput,
  }));
// Input Schema
export const ManagedServerSecurityAlertPoliciesListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/securityAlertPolicies",
    }),
  );
export type ManagedServerSecurityAlertPoliciesListByInstanceInput =
  typeof ManagedServerSecurityAlertPoliciesListByInstanceInput.Type;

// Output Schema
export const ManagedServerSecurityAlertPoliciesListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ManagedServerSecurityAlertPoliciesListByInstanceOutput =
  typeof ManagedServerSecurityAlertPoliciesListByInstanceOutput.Type;

// The operation
/**
 * Get the managed server's threat detection policies.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ManagedServerSecurityAlertPoliciesListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ManagedServerSecurityAlertPoliciesListByInstanceInput,
    outputSchema: ManagedServerSecurityAlertPoliciesListByInstanceOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    nspConfigName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/networkSecurityPerimeterConfigurations/{nspConfigName}",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsGetInput =
  typeof NetworkSecurityPerimeterConfigurationsGetInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkSecurityPerimeterConfigurationsGetOutput =
  typeof NetworkSecurityPerimeterConfigurationsGetOutput.Type;

// The operation
/**
 * Gets a network security perimeter configuration.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const NetworkSecurityPerimeterConfigurationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsGetInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsGetOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/networkSecurityPerimeterConfigurations",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsListByServerInput =
  typeof NetworkSecurityPerimeterConfigurationsListByServerInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type NetworkSecurityPerimeterConfigurationsListByServerOutput =
  typeof NetworkSecurityPerimeterConfigurationsListByServerOutput.Type;

// The operation
/**
 * Gets a list of NSP configurations for a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const NetworkSecurityPerimeterConfigurationsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsListByServerInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsListByServerOutput,
  }));
// Input Schema
export const NetworkSecurityPerimeterConfigurationsReconcileInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    nspConfigName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/networkSecurityPerimeterConfigurations/{nspConfigName}/reconcile",
    }),
  );
export type NetworkSecurityPerimeterConfigurationsReconcileInput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileInput.Type;

// Output Schema
export const NetworkSecurityPerimeterConfigurationsReconcileOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type NetworkSecurityPerimeterConfigurationsReconcileOutput =
  typeof NetworkSecurityPerimeterConfigurationsReconcileOutput.Type;

// The operation
/**
 * Reconcile network security perimeter configuration for SQL Resource Provider
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const NetworkSecurityPerimeterConfigurationsReconcile =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: NetworkSecurityPerimeterConfigurationsReconcileInput,
    outputSchema: NetworkSecurityPerimeterConfigurationsReconcileOutput,
  }));
// Input Schema
export const OperationsListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(T.Http({ method: "GET", path: "/providers/Microsoft.Sql/operations" }));
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
        origin: Schema.optional(Schema.Literals(["user", "system"])),
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
 * Lists all of the available SQL Rest API operations.
 *
 * @param api-version - The API version to use for the request.
 */
export const OperationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OperationsListInput,
  outputSchema: OperationsListOutput,
}));
// Input Schema
export const OutboundFirewallRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    outboundRuleFqdn: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/outboundFirewallRules/{outboundRuleFqdn}",
    }),
  );
export type OutboundFirewallRulesCreateOrUpdateInput =
  typeof OutboundFirewallRulesCreateOrUpdateInput.Type;

// Output Schema
export const OutboundFirewallRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OutboundFirewallRulesCreateOrUpdateOutput =
  typeof OutboundFirewallRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Create a outbound firewall rule with a given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const OutboundFirewallRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OutboundFirewallRulesCreateOrUpdateInput,
    outputSchema: OutboundFirewallRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const OutboundFirewallRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    outboundRuleFqdn: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/outboundFirewallRules/{outboundRuleFqdn}",
    }),
  );
export type OutboundFirewallRulesDeleteInput =
  typeof OutboundFirewallRulesDeleteInput.Type;

// Output Schema
export const OutboundFirewallRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OutboundFirewallRulesDeleteOutput =
  typeof OutboundFirewallRulesDeleteOutput.Type;

// The operation
/**
 * Deletes a outbound firewall rule with a given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const OutboundFirewallRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OutboundFirewallRulesDeleteInput,
    outputSchema: OutboundFirewallRulesDeleteOutput,
  }),
);
// Input Schema
export const OutboundFirewallRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    outboundRuleFqdn: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/outboundFirewallRules/{outboundRuleFqdn}",
    }),
  );
export type OutboundFirewallRulesGetInput =
  typeof OutboundFirewallRulesGetInput.Type;

// Output Schema
export const OutboundFirewallRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OutboundFirewallRulesGetOutput =
  typeof OutboundFirewallRulesGetOutput.Type;

// The operation
/**
 * Gets an outbound firewall rule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const OutboundFirewallRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OutboundFirewallRulesGetInput,
    outputSchema: OutboundFirewallRulesGetOutput,
  }),
);
// Input Schema
export const OutboundFirewallRulesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/outboundFirewallRules",
    }),
  );
export type OutboundFirewallRulesListByServerInput =
  typeof OutboundFirewallRulesListByServerInput.Type;

// Output Schema
export const OutboundFirewallRulesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type OutboundFirewallRulesListByServerOutput =
  typeof OutboundFirewallRulesListByServerOutput.Type;

// The operation
/**
 * Gets all outbound firewall rules on a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const OutboundFirewallRulesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OutboundFirewallRulesListByServerInput,
    outputSchema: OutboundFirewallRulesListByServerOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * Approve or reject a private endpoint connection with a given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
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
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
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
    privateEndpointConnectionName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/privateEndpointConnections/{privateEndpointConnectionName}",
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
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param privateEndpointConnectionName - The name of the private endpoint connection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const PrivateEndpointConnectionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsGetInput,
    outputSchema: PrivateEndpointConnectionsGetOutput,
  }));
// Input Schema
export const PrivateEndpointConnectionsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/privateEndpointConnections",
    }),
  );
export type PrivateEndpointConnectionsListByServerInput =
  typeof PrivateEndpointConnectionsListByServerInput.Type;

// Output Schema
export const PrivateEndpointConnectionsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateEndpointConnectionsListByServerOutput =
  typeof PrivateEndpointConnectionsListByServerOutput.Type;

// The operation
/**
 * Gets all private endpoint connections on a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const PrivateEndpointConnectionsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateEndpointConnectionsListByServerInput,
    outputSchema: PrivateEndpointConnectionsListByServerOutput,
  }));
// Input Schema
export const PrivateLinkResourcesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/privateLinkResources/{groupName}",
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
 * Gets a private link resource for SQL server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param groupName - The name of the private link resource.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
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
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/privateLinkResources",
    }),
  );
export type PrivateLinkResourcesListByServerInput =
  typeof PrivateLinkResourcesListByServerInput.Type;

// Output Schema
export const PrivateLinkResourcesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type PrivateLinkResourcesListByServerOutput =
  typeof PrivateLinkResourcesListByServerOutput.Type;

// The operation
/**
 * Gets the private link resources for SQL server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const PrivateLinkResourcesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PrivateLinkResourcesListByServerInput,
    outputSchema: PrivateLinkResourcesListByServerOutput,
  }));
// Input Schema
export const RecommendedSensitivityLabelsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/recommendedSensitivityLabels",
    }),
  );
export type RecommendedSensitivityLabelsUpdateInput =
  typeof RecommendedSensitivityLabelsUpdateInput.Type;

// Output Schema
export const RecommendedSensitivityLabelsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RecommendedSensitivityLabelsUpdateOutput =
  typeof RecommendedSensitivityLabelsUpdateOutput.Type;

// The operation
/**
 * Update recommended sensitivity labels states of a given database using an operations batch.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RecommendedSensitivityLabelsUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RecommendedSensitivityLabelsUpdateInput,
    outputSchema: RecommendedSensitivityLabelsUpdateOutput,
  }));
// Input Schema
export const RecoverableDatabasesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/recoverableDatabases/{databaseName}",
    }),
  );
export type RecoverableDatabasesGetInput =
  typeof RecoverableDatabasesGetInput.Type;

// Output Schema
export const RecoverableDatabasesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RecoverableDatabasesGetOutput =
  typeof RecoverableDatabasesGetOutput.Type;

// The operation
/**
 * Gets a recoverable database, which is a resource representing a database's geo backup
 *
 * @param api-version - The API version to use for the request.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database
 */
export const RecoverableDatabasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RecoverableDatabasesGetInput,
    outputSchema: RecoverableDatabasesGetOutput,
  }),
);
// Input Schema
export const RecoverableDatabasesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/recoverableDatabases",
    }),
  );
export type RecoverableDatabasesListByServerInput =
  typeof RecoverableDatabasesListByServerInput.Type;

// Output Schema
export const RecoverableDatabasesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
  });
export type RecoverableDatabasesListByServerOutput =
  typeof RecoverableDatabasesListByServerOutput.Type;

// The operation
/**
 * Gets a list of recoverable databases
 *
 * @param api-version - The API version to use for the request.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 */
export const RecoverableDatabasesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RecoverableDatabasesListByServerInput,
    outputSchema: RecoverableDatabasesListByServerOutput,
  }));
// Input Schema
export const RecoverableManagedDatabasesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    recoverableDatabaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/recoverableDatabases/{recoverableDatabaseName}",
    }),
  );
export type RecoverableManagedDatabasesGetInput =
  typeof RecoverableManagedDatabasesGetInput.Type;

// Output Schema
export const RecoverableManagedDatabasesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RecoverableManagedDatabasesGetOutput =
  typeof RecoverableManagedDatabasesGetOutput.Type;

// The operation
/**
 * Gets a recoverable managed database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RecoverableManagedDatabasesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RecoverableManagedDatabasesGetInput,
    outputSchema: RecoverableManagedDatabasesGetOutput,
  }));
// Input Schema
export const RecoverableManagedDatabasesListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/recoverableDatabases",
    }),
  );
export type RecoverableManagedDatabasesListByInstanceInput =
  typeof RecoverableManagedDatabasesListByInstanceInput.Type;

// Output Schema
export const RecoverableManagedDatabasesListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type RecoverableManagedDatabasesListByInstanceOutput =
  typeof RecoverableManagedDatabasesListByInstanceOutput.Type;

// The operation
/**
 * Gets a list of recoverable managed databases.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RecoverableManagedDatabasesListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RecoverableManagedDatabasesListByInstanceInput,
    outputSchema: RecoverableManagedDatabasesListByInstanceOutput,
  }));
// Input Schema
export const ReplicationLinksCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    linkId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}",
    }),
  );
export type ReplicationLinksCreateOrUpdateInput =
  typeof ReplicationLinksCreateOrUpdateInput.Type;

// Output Schema
export const ReplicationLinksCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReplicationLinksCreateOrUpdateOutput =
  typeof ReplicationLinksCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates the replication link type.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ReplicationLinksCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplicationLinksCreateOrUpdateInput,
    outputSchema: ReplicationLinksCreateOrUpdateOutput,
  }));
// Input Schema
export const ReplicationLinksDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    linkId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}",
    }),
  );
export type ReplicationLinksDeleteInput =
  typeof ReplicationLinksDeleteInput.Type;

// Output Schema
export const ReplicationLinksDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReplicationLinksDeleteOutput =
  typeof ReplicationLinksDeleteOutput.Type;

// The operation
/**
 * Deletes a database replication link. Cannot be done during failover.
 *
 * @param api-version - The API version to use for the request.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database that has the replication link to be dropped.
 * @param linkId - The ID of the replication link to be deleted.
 */
export const ReplicationLinksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicationLinksDeleteInput,
    outputSchema: ReplicationLinksDeleteOutput,
  }),
);
// Input Schema
export const ReplicationLinksFailoverInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    linkId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}/failover",
    }),
  );
export type ReplicationLinksFailoverInput =
  typeof ReplicationLinksFailoverInput.Type;

// Output Schema
export const ReplicationLinksFailoverOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReplicationLinksFailoverOutput =
  typeof ReplicationLinksFailoverOutput.Type;

// The operation
/**
 * Sets which replica database is primary by failing over from the current primary replica database.
 *
 * @param api-version - The API version to use for the request.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database that has the replication link to be failed over.
 * @param linkId - The ID of the replication link to be failed over.
 */
export const ReplicationLinksFailover = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicationLinksFailoverInput,
    outputSchema: ReplicationLinksFailoverOutput,
  }),
);
// Input Schema
export const ReplicationLinksFailoverAllowDataLossInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    linkId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}/forceFailoverAllowDataLoss",
    }),
  );
export type ReplicationLinksFailoverAllowDataLossInput =
  typeof ReplicationLinksFailoverAllowDataLossInput.Type;

// Output Schema
export const ReplicationLinksFailoverAllowDataLossOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReplicationLinksFailoverAllowDataLossOutput =
  typeof ReplicationLinksFailoverAllowDataLossOutput.Type;

// The operation
/**
 * Sets which replica database is primary by failing over from the current primary replica database. This operation might result in data loss.
 *
 * @param api-version - The API version to use for the request.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database that has the replication link to be failed over.
 * @param linkId - The ID of the replication link to be failed over.
 */
export const ReplicationLinksFailoverAllowDataLoss =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplicationLinksFailoverAllowDataLossInput,
    outputSchema: ReplicationLinksFailoverAllowDataLossOutput,
  }));
// Input Schema
export const ReplicationLinksGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    linkId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}",
    }),
  );
export type ReplicationLinksGetInput = typeof ReplicationLinksGetInput.Type;

// Output Schema
export const ReplicationLinksGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReplicationLinksGetOutput = typeof ReplicationLinksGetOutput.Type;

// The operation
/**
 * Gets a replication link.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param linkId - The name of the replication link.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ReplicationLinksGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ReplicationLinksGetInput,
  outputSchema: ReplicationLinksGetOutput,
}));
// Input Schema
export const ReplicationLinksListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks",
    }),
  );
export type ReplicationLinksListByDatabaseInput =
  typeof ReplicationLinksListByDatabaseInput.Type;

// Output Schema
export const ReplicationLinksListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ReplicationLinksListByDatabaseOutput =
  typeof ReplicationLinksListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of replication links on database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ReplicationLinksListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplicationLinksListByDatabaseInput,
    outputSchema: ReplicationLinksListByDatabaseOutput,
  }));
// Input Schema
export const ReplicationLinksListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/replicationLinks",
    }),
  );
export type ReplicationLinksListByServerInput =
  typeof ReplicationLinksListByServerInput.Type;

// Output Schema
export const ReplicationLinksListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ReplicationLinksListByServerOutput =
  typeof ReplicationLinksListByServerOutput.Type;

// The operation
/**
 * Gets a list of replication links.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ReplicationLinksListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ReplicationLinksListByServerInput,
    outputSchema: ReplicationLinksListByServerOutput,
  }));
// Input Schema
export const ReplicationLinksUnlinkInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    linkId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}/unlink",
    }),
  );
export type ReplicationLinksUnlinkInput =
  typeof ReplicationLinksUnlinkInput.Type;

// Output Schema
export const ReplicationLinksUnlinkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ReplicationLinksUnlinkOutput =
  typeof ReplicationLinksUnlinkOutput.Type;

// The operation
/**
 * Deletes a database replication link in forced or friendly way.
 *
 * @param api-version - The API version to use for the request.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database that has the replication link to be failed over.
 * @param linkId - The ID of the replication link to be failed over.
 */
export const ReplicationLinksUnlink = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicationLinksUnlinkInput,
    outputSchema: ReplicationLinksUnlinkOutput,
  }),
);
// Input Schema
export const ReplicationLinksUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    linkId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/replicationLinks/{linkId}",
    }),
  );
export type ReplicationLinksUpdateInput =
  typeof ReplicationLinksUpdateInput.Type;

// Output Schema
export const ReplicationLinksUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ReplicationLinksUpdateOutput =
  typeof ReplicationLinksUpdateOutput.Type;

// The operation
/**
 * Updates the replication link type.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ReplicationLinksUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ReplicationLinksUpdateInput,
    outputSchema: ReplicationLinksUpdateOutput,
  }),
);
// Input Schema
export const RestorableDroppedDatabasesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    restorableDroppedDatabaseId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}",
    }),
  );
export type RestorableDroppedDatabasesGetInput =
  typeof RestorableDroppedDatabasesGetInput.Type;

// Output Schema
export const RestorableDroppedDatabasesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RestorableDroppedDatabasesGetOutput =
  typeof RestorableDroppedDatabasesGetOutput.Type;

// The operation
/**
 * Gets a restorable dropped database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $expand - The child resources to include in the response.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RestorableDroppedDatabasesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableDroppedDatabasesGetInput,
    outputSchema: RestorableDroppedDatabasesGetOutput,
  }));
// Input Schema
export const RestorableDroppedDatabasesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/restorableDroppedDatabases",
    }),
  );
export type RestorableDroppedDatabasesListByServerInput =
  typeof RestorableDroppedDatabasesListByServerInput.Type;

// Output Schema
export const RestorableDroppedDatabasesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type RestorableDroppedDatabasesListByServerOutput =
  typeof RestorableDroppedDatabasesListByServerOutput.Type;

// The operation
/**
 * Gets a list of restorable dropped databases.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RestorableDroppedDatabasesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableDroppedDatabasesListByServerInput,
    outputSchema: RestorableDroppedDatabasesListByServerOutput,
  }));
// Input Schema
export const RestorableDroppedManagedDatabasesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    restorableDroppedDatabaseId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}",
    }),
  );
export type RestorableDroppedManagedDatabasesGetInput =
  typeof RestorableDroppedManagedDatabasesGetInput.Type;

// Output Schema
export const RestorableDroppedManagedDatabasesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type RestorableDroppedManagedDatabasesGetOutput =
  typeof RestorableDroppedManagedDatabasesGetOutput.Type;

// The operation
/**
 * Gets a restorable dropped managed database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RestorableDroppedManagedDatabasesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableDroppedManagedDatabasesGetInput,
    outputSchema: RestorableDroppedManagedDatabasesGetOutput,
  }));
// Input Schema
export const RestorableDroppedManagedDatabasesListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases",
    }),
  );
export type RestorableDroppedManagedDatabasesListByInstanceInput =
  typeof RestorableDroppedManagedDatabasesListByInstanceInput.Type;

// Output Schema
export const RestorableDroppedManagedDatabasesListByInstanceOutput =
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
export type RestorableDroppedManagedDatabasesListByInstanceOutput =
  typeof RestorableDroppedManagedDatabasesListByInstanceOutput.Type;

// The operation
/**
 * Gets a list of restorable dropped managed databases.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RestorableDroppedManagedDatabasesListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: RestorableDroppedManagedDatabasesListByInstanceInput,
    outputSchema: RestorableDroppedManagedDatabasesListByInstanceOutput,
  }));
// Input Schema
export const RestorePointsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/restorePoints",
    }),
  );
export type RestorePointsCreateInput = typeof RestorePointsCreateInput.Type;

// Output Schema
export const RestorePointsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type RestorePointsCreateOutput = typeof RestorePointsCreateOutput.Type;

// The operation
/**
 * Creates a restore point for a data warehouse.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RestorePointsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RestorePointsCreateInput,
  outputSchema: RestorePointsCreateOutput,
}));
// Input Schema
export const RestorePointsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    restorePointName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/restorePoints/{restorePointName}",
    }),
  );
export type RestorePointsDeleteInput = typeof RestorePointsDeleteInput.Type;

// Output Schema
export const RestorePointsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type RestorePointsDeleteOutput = typeof RestorePointsDeleteOutput.Type;

// The operation
/**
 * Deletes a restore point.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param restorePointName - The name of the restore point.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RestorePointsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RestorePointsDeleteInput,
  outputSchema: RestorePointsDeleteOutput,
}));
// Input Schema
export const RestorePointsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  restorePointName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/restorePoints/{restorePointName}",
  }),
);
export type RestorePointsGetInput = typeof RestorePointsGetInput.Type;

// Output Schema
export const RestorePointsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type RestorePointsGetOutput = typeof RestorePointsGetOutput.Type;

// The operation
/**
 * Gets a restore point.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param restorePointName - The name of the restore point.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RestorePointsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: RestorePointsGetInput,
  outputSchema: RestorePointsGetOutput,
}));
// Input Schema
export const RestorePointsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/restorePoints",
    }),
  );
export type RestorePointsListByDatabaseInput =
  typeof RestorePointsListByDatabaseInput.Type;

// Output Schema
export const RestorePointsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type RestorePointsListByDatabaseOutput =
  typeof RestorePointsListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of database restore points.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const RestorePointsListByDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RestorePointsListByDatabaseInput,
    outputSchema: RestorePointsListByDatabaseOutput,
  }),
);
// Input Schema
export const SensitivityLabelsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
    }),
  );
export type SensitivityLabelsCreateOrUpdateInput =
  typeof SensitivityLabelsCreateOrUpdateInput.Type;

// Output Schema
export const SensitivityLabelsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SensitivityLabelsCreateOrUpdateOutput =
  typeof SensitivityLabelsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the sensitivity label of a given column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SensitivityLabelsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SensitivityLabelsCreateOrUpdateInput,
    outputSchema: SensitivityLabelsCreateOrUpdateOutput,
  }));
// Input Schema
export const SensitivityLabelsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
    }),
  );
export type SensitivityLabelsDeleteInput =
  typeof SensitivityLabelsDeleteInput.Type;

// Output Schema
export const SensitivityLabelsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SensitivityLabelsDeleteOutput =
  typeof SensitivityLabelsDeleteOutput.Type;

// The operation
/**
 * Deletes the sensitivity label of a given column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SensitivityLabelsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SensitivityLabelsDeleteInput,
    outputSchema: SensitivityLabelsDeleteOutput,
  }),
);
// Input Schema
export const SensitivityLabelsDisableRecommendationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["recommended"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/disable",
    }),
  );
export type SensitivityLabelsDisableRecommendationInput =
  typeof SensitivityLabelsDisableRecommendationInput.Type;

// Output Schema
export const SensitivityLabelsDisableRecommendationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SensitivityLabelsDisableRecommendationOutput =
  typeof SensitivityLabelsDisableRecommendationOutput.Type;

// The operation
/**
 * Disables sensitivity recommendations on a given column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SensitivityLabelsDisableRecommendation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SensitivityLabelsDisableRecommendationInput,
    outputSchema: SensitivityLabelsDisableRecommendationOutput,
  }));
// Input Schema
export const SensitivityLabelsEnableRecommendationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["recommended"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}/enable",
    }),
  );
export type SensitivityLabelsEnableRecommendationInput =
  typeof SensitivityLabelsEnableRecommendationInput.Type;

// Output Schema
export const SensitivityLabelsEnableRecommendationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SensitivityLabelsEnableRecommendationOutput =
  typeof SensitivityLabelsEnableRecommendationOutput.Type;

// The operation
/**
 * Enables sensitivity recommendations on a given column (recommendations are enabled by default on all columns)
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SensitivityLabelsEnableRecommendation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SensitivityLabelsEnableRecommendationInput,
    outputSchema: SensitivityLabelsEnableRecommendationOutput,
  }));
// Input Schema
export const SensitivityLabelsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    schemaName: Schema.String.pipe(T.PathParam()),
    tableName: Schema.String.pipe(T.PathParam()),
    columnName: Schema.String.pipe(T.PathParam()),
    sensitivityLabelSource: Schema.Literals(["current", "recommended"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/schemas/{schemaName}/tables/{tableName}/columns/{columnName}/sensitivityLabels/{sensitivityLabelSource}",
    }),
  );
export type SensitivityLabelsGetInput = typeof SensitivityLabelsGetInput.Type;

// Output Schema
export const SensitivityLabelsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SensitivityLabelsGetOutput = typeof SensitivityLabelsGetOutput.Type;

// The operation
/**
 * Gets the sensitivity label of a given column
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param schemaName - The name of the schema.
 * @param tableName - The name of the table.
 * @param columnName - The name of the column.
 * @param sensitivityLabelSource - The source of the sensitivity label.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SensitivityLabelsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SensitivityLabelsGetInput,
    outputSchema: SensitivityLabelsGetOutput,
  }),
);
// Input Schema
export const SensitivityLabelsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/sensitivityLabels",
    }),
  );
export type SensitivityLabelsListByDatabaseInput =
  typeof SensitivityLabelsListByDatabaseInput.Type;

// Output Schema
export const SensitivityLabelsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SensitivityLabelsListByDatabaseOutput =
  typeof SensitivityLabelsListByDatabaseOutput.Type;

// The operation
/**
 * Gets the sensitivity labels of a given database
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SensitivityLabelsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SensitivityLabelsListByDatabaseInput,
    outputSchema: SensitivityLabelsListByDatabaseOutput,
  }));
// Input Schema
export const SensitivityLabelsListCurrentByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    $count: Schema.optional(Schema.Boolean),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/currentSensitivityLabels",
    }),
  );
export type SensitivityLabelsListCurrentByDatabaseInput =
  typeof SensitivityLabelsListCurrentByDatabaseInput.Type;

// Output Schema
export const SensitivityLabelsListCurrentByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SensitivityLabelsListCurrentByDatabaseOutput =
  typeof SensitivityLabelsListCurrentByDatabaseOutput.Type;

// The operation
/**
 * Gets the sensitivity labels of a given database
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SensitivityLabelsListCurrentByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SensitivityLabelsListCurrentByDatabaseInput,
    outputSchema: SensitivityLabelsListCurrentByDatabaseOutput,
  }));
// Input Schema
export const SensitivityLabelsListRecommendedByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $skipToken: Schema.optional(Schema.String),
    includeDisabledRecommendations: Schema.optional(Schema.Boolean),
    $filter: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/recommendedSensitivityLabels",
    }),
  );
export type SensitivityLabelsListRecommendedByDatabaseInput =
  typeof SensitivityLabelsListRecommendedByDatabaseInput.Type;

// Output Schema
export const SensitivityLabelsListRecommendedByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SensitivityLabelsListRecommendedByDatabaseOutput =
  typeof SensitivityLabelsListRecommendedByDatabaseOutput.Type;

// The operation
/**
 * Gets the sensitivity labels of a given database
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param includeDisabledRecommendations - Specifies whether to include disabled recommendations or not.
 * @param $filter - An OData filter expression that filters elements in the collection.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SensitivityLabelsListRecommendedByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SensitivityLabelsListRecommendedByDatabaseInput,
    outputSchema: SensitivityLabelsListRecommendedByDatabaseOutput,
  }));
// Input Schema
export const SensitivityLabelsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/currentSensitivityLabels",
    }),
  );
export type SensitivityLabelsUpdateInput =
  typeof SensitivityLabelsUpdateInput.Type;

// Output Schema
export const SensitivityLabelsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SensitivityLabelsUpdateOutput =
  typeof SensitivityLabelsUpdateOutput.Type;

// The operation
/**
 * Update sensitivity labels of a given database using an operations batch.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SensitivityLabelsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SensitivityLabelsUpdateInput,
    outputSchema: SensitivityLabelsUpdateOutput,
  }),
);
// Input Schema
export const ServerAdvancedThreatProtectionSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type ServerAdvancedThreatProtectionSettingsCreateOrUpdateInput =
  typeof ServerAdvancedThreatProtectionSettingsCreateOrUpdateInput.Type;

// Output Schema
export const ServerAdvancedThreatProtectionSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAdvancedThreatProtectionSettingsCreateOrUpdateOutput =
  typeof ServerAdvancedThreatProtectionSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an Advanced Threat Protection state.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAdvancedThreatProtectionSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAdvancedThreatProtectionSettingsCreateOrUpdateInput,
    outputSchema: ServerAdvancedThreatProtectionSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerAdvancedThreatProtectionSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advancedThreatProtectionName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advancedThreatProtectionSettings/{advancedThreatProtectionName}",
    }),
  );
export type ServerAdvancedThreatProtectionSettingsGetInput =
  typeof ServerAdvancedThreatProtectionSettingsGetInput.Type;

// Output Schema
export const ServerAdvancedThreatProtectionSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAdvancedThreatProtectionSettingsGetOutput =
  typeof ServerAdvancedThreatProtectionSettingsGetOutput.Type;

// The operation
/**
 * Get a server's Advanced Threat Protection state.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advancedThreatProtectionName - The name of the Advanced Threat Protection state.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAdvancedThreatProtectionSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAdvancedThreatProtectionSettingsGetInput,
    outputSchema: ServerAdvancedThreatProtectionSettingsGetOutput,
  }));
// Input Schema
export const ServerAdvancedThreatProtectionSettingsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advancedThreatProtectionSettings",
    }),
  );
export type ServerAdvancedThreatProtectionSettingsListByServerInput =
  typeof ServerAdvancedThreatProtectionSettingsListByServerInput.Type;

// Output Schema
export const ServerAdvancedThreatProtectionSettingsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerAdvancedThreatProtectionSettingsListByServerOutput =
  typeof ServerAdvancedThreatProtectionSettingsListByServerOutput.Type;

// The operation
/**
 * Get a list of the server's Advanced Threat Protection states.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAdvancedThreatProtectionSettingsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAdvancedThreatProtectionSettingsListByServerInput,
    outputSchema: ServerAdvancedThreatProtectionSettingsListByServerOutput,
  }));
// Input Schema
export const ServerAdvisorsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advisorName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advisors/{advisorName}",
  }),
);
export type ServerAdvisorsGetInput = typeof ServerAdvisorsGetInput.Type;

// Output Schema
export const ServerAdvisorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAdvisorsGetOutput = typeof ServerAdvisorsGetOutput.Type;

// The operation
/**
 * Gets a server advisor.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advisorName - The name of the Server Advisor.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAdvisorsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServerAdvisorsGetInput,
  outputSchema: ServerAdvisorsGetOutput,
}));
// Input Schema
export const ServerAdvisorsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advisors",
    }),
  );
export type ServerAdvisorsListByServerInput =
  typeof ServerAdvisorsListByServerInput.Type;

// Output Schema
export const ServerAdvisorsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(Schema.Struct({}));
export type ServerAdvisorsListByServerOutput =
  typeof ServerAdvisorsListByServerOutput.Type;

// The operation
/**
 * Gets a list of server advisors.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $expand - The child resources to include in the response.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAdvisorsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerAdvisorsListByServerInput,
    outputSchema: ServerAdvisorsListByServerOutput,
  }),
);
// Input Schema
export const ServerAdvisorsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    advisorName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advisors/{advisorName}",
    }),
  );
export type ServerAdvisorsUpdateInput = typeof ServerAdvisorsUpdateInput.Type;

// Output Schema
export const ServerAdvisorsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAdvisorsUpdateOutput = typeof ServerAdvisorsUpdateOutput.Type;

// The operation
/**
 * Updates a server advisor.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param advisorName - The name of the Server Advisor.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAdvisorsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerAdvisorsUpdateInput,
    outputSchema: ServerAdvisorsUpdateOutput,
  }),
);
// Input Schema
export const ServerAutomaticTuningGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/automaticTuning/current",
    }),
  );
export type ServerAutomaticTuningGetInput =
  typeof ServerAutomaticTuningGetInput.Type;

// Output Schema
export const ServerAutomaticTuningGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAutomaticTuningGetOutput =
  typeof ServerAutomaticTuningGetOutput.Type;

// The operation
/**
 * Retrieves server automatic tuning options.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAutomaticTuningGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerAutomaticTuningGetInput,
    outputSchema: ServerAutomaticTuningGetOutput,
  }),
);
// Input Schema
export const ServerAutomaticTuningUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/automaticTuning/current",
    }),
  );
export type ServerAutomaticTuningUpdateInput =
  typeof ServerAutomaticTuningUpdateInput.Type;

// Output Schema
export const ServerAutomaticTuningUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAutomaticTuningUpdateOutput =
  typeof ServerAutomaticTuningUpdateOutput.Type;

// The operation
/**
 * Update automatic tuning options on server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAutomaticTuningUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerAutomaticTuningUpdateInput,
    outputSchema: ServerAutomaticTuningUpdateOutput,
  }),
);
// Input Schema
export const ServerAzureADAdministratorsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    administratorName: Schema.Literals(["ActiveDirectory"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/administrators/{administratorName}",
    }),
  );
export type ServerAzureADAdministratorsCreateOrUpdateInput =
  typeof ServerAzureADAdministratorsCreateOrUpdateInput.Type;

// Output Schema
export const ServerAzureADAdministratorsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAzureADAdministratorsCreateOrUpdateOutput =
  typeof ServerAzureADAdministratorsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an existing Azure Active Directory administrator.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param administratorName - The name of server active directory administrator.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAzureADAdministratorsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAzureADAdministratorsCreateOrUpdateInput,
    outputSchema: ServerAzureADAdministratorsCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerAzureADAdministratorsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    administratorName: Schema.Literals(["ActiveDirectory"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/administrators/{administratorName}",
    }),
  );
export type ServerAzureADAdministratorsDeleteInput =
  typeof ServerAzureADAdministratorsDeleteInput.Type;

// Output Schema
export const ServerAzureADAdministratorsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerAzureADAdministratorsDeleteOutput =
  typeof ServerAzureADAdministratorsDeleteOutput.Type;

// The operation
/**
 * Deletes the Azure Active Directory administrator with the given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param administratorName - The name of server active directory administrator.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAzureADAdministratorsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAzureADAdministratorsDeleteInput,
    outputSchema: ServerAzureADAdministratorsDeleteOutput,
  }));
// Input Schema
export const ServerAzureADAdministratorsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    administratorName: Schema.Literals(["ActiveDirectory"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/administrators/{administratorName}",
    }),
  );
export type ServerAzureADAdministratorsGetInput =
  typeof ServerAzureADAdministratorsGetInput.Type;

// Output Schema
export const ServerAzureADAdministratorsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAzureADAdministratorsGetOutput =
  typeof ServerAzureADAdministratorsGetOutput.Type;

// The operation
/**
 * Gets a Azure Active Directory administrator.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param administratorName - The name of server active directory administrator.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAzureADAdministratorsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAzureADAdministratorsGetInput,
    outputSchema: ServerAzureADAdministratorsGetOutput,
  }));
// Input Schema
export const ServerAzureADAdministratorsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/administrators",
    }),
  );
export type ServerAzureADAdministratorsListByServerInput =
  typeof ServerAzureADAdministratorsListByServerInput.Type;

// Output Schema
export const ServerAzureADAdministratorsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerAzureADAdministratorsListByServerOutput =
  typeof ServerAzureADAdministratorsListByServerOutput.Type;

// The operation
/**
 * Gets a list of Azure Active Directory administrators in a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAzureADAdministratorsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAzureADAdministratorsListByServerInput,
    outputSchema: ServerAzureADAdministratorsListByServerOutput,
  }));
// Input Schema
export const ServerAzureADOnlyAuthenticationsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    authenticationName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/azureADOnlyAuthentications/{authenticationName}",
    }),
  );
export type ServerAzureADOnlyAuthenticationsCreateOrUpdateInput =
  typeof ServerAzureADOnlyAuthenticationsCreateOrUpdateInput.Type;

// Output Schema
export const ServerAzureADOnlyAuthenticationsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAzureADOnlyAuthenticationsCreateOrUpdateOutput =
  typeof ServerAzureADOnlyAuthenticationsCreateOrUpdateOutput.Type;

// The operation
/**
 * Sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param authenticationName - The name of server azure active directory only authentication.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAzureADOnlyAuthenticationsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAzureADOnlyAuthenticationsCreateOrUpdateInput,
    outputSchema: ServerAzureADOnlyAuthenticationsCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerAzureADOnlyAuthenticationsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    authenticationName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/azureADOnlyAuthentications/{authenticationName}",
    }),
  );
export type ServerAzureADOnlyAuthenticationsDeleteInput =
  typeof ServerAzureADOnlyAuthenticationsDeleteInput.Type;

// Output Schema
export const ServerAzureADOnlyAuthenticationsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerAzureADOnlyAuthenticationsDeleteOutput =
  typeof ServerAzureADOnlyAuthenticationsDeleteOutput.Type;

// The operation
/**
 * Deletes an existing server Active Directory only authentication property.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param authenticationName - The name of server azure active directory only authentication.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAzureADOnlyAuthenticationsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAzureADOnlyAuthenticationsDeleteInput,
    outputSchema: ServerAzureADOnlyAuthenticationsDeleteOutput,
  }));
// Input Schema
export const ServerAzureADOnlyAuthenticationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    authenticationName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/azureADOnlyAuthentications/{authenticationName}",
    }),
  );
export type ServerAzureADOnlyAuthenticationsGetInput =
  typeof ServerAzureADOnlyAuthenticationsGetInput.Type;

// Output Schema
export const ServerAzureADOnlyAuthenticationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerAzureADOnlyAuthenticationsGetOutput =
  typeof ServerAzureADOnlyAuthenticationsGetOutput.Type;

// The operation
/**
 * Gets a specific Azure Active Directory only authentication property.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param authenticationName - The name of server azure active directory only authentication.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAzureADOnlyAuthenticationsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAzureADOnlyAuthenticationsGetInput,
    outputSchema: ServerAzureADOnlyAuthenticationsGetOutput,
  }));
// Input Schema
export const ServerAzureADOnlyAuthenticationsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/azureADOnlyAuthentications",
    }),
  );
export type ServerAzureADOnlyAuthenticationsListByServerInput =
  typeof ServerAzureADOnlyAuthenticationsListByServerInput.Type;

// Output Schema
export const ServerAzureADOnlyAuthenticationsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerAzureADOnlyAuthenticationsListByServerOutput =
  typeof ServerAzureADOnlyAuthenticationsListByServerOutput.Type;

// The operation
/**
 * Gets a list of server Azure Active Directory only authentications.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerAzureADOnlyAuthenticationsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerAzureADOnlyAuthenticationsListByServerInput,
    outputSchema: ServerAzureADOnlyAuthenticationsListByServerOutput,
  }));
// Input Schema
export const ServerBlobAuditingPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/auditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type ServerBlobAuditingPoliciesCreateOrUpdateInput =
  typeof ServerBlobAuditingPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ServerBlobAuditingPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerBlobAuditingPoliciesCreateOrUpdateOutput =
  typeof ServerBlobAuditingPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a server's blob auditing policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerBlobAuditingPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerBlobAuditingPoliciesCreateOrUpdateInput,
    outputSchema: ServerBlobAuditingPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerBlobAuditingPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/auditingSettings/{blobAuditingPolicyName}",
    }),
  );
export type ServerBlobAuditingPoliciesGetInput =
  typeof ServerBlobAuditingPoliciesGetInput.Type;

// Output Schema
export const ServerBlobAuditingPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerBlobAuditingPoliciesGetOutput =
  typeof ServerBlobAuditingPoliciesGetOutput.Type;

// The operation
/**
 * Gets a server's blob auditing policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerBlobAuditingPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerBlobAuditingPoliciesGetInput,
    outputSchema: ServerBlobAuditingPoliciesGetOutput,
  }));
// Input Schema
export const ServerBlobAuditingPoliciesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/auditingSettings",
    }),
  );
export type ServerBlobAuditingPoliciesListByServerInput =
  typeof ServerBlobAuditingPoliciesListByServerInput.Type;

// Output Schema
export const ServerBlobAuditingPoliciesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerBlobAuditingPoliciesListByServerOutput =
  typeof ServerBlobAuditingPoliciesListByServerOutput.Type;

// The operation
/**
 * Lists auditing settings of a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerBlobAuditingPoliciesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerBlobAuditingPoliciesListByServerInput,
    outputSchema: ServerBlobAuditingPoliciesListByServerOutput,
  }));
// Input Schema
export const ServerConfigurationOptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverConfigurationOptionName: Schema.Literals([
      "allowPolybaseExport",
    ]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverConfigurationOptions/{serverConfigurationOptionName}",
    }),
  );
export type ServerConfigurationOptionsCreateOrUpdateInput =
  typeof ServerConfigurationOptionsCreateOrUpdateInput.Type;

// Output Schema
export const ServerConfigurationOptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerConfigurationOptionsCreateOrUpdateOutput =
  typeof ServerConfigurationOptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates managed instance server configuration option.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverConfigurationOptionName - The name of the server configuration option.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerConfigurationOptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerConfigurationOptionsCreateOrUpdateInput,
    outputSchema: ServerConfigurationOptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerConfigurationOptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverConfigurationOptionName: Schema.Literals([
      "allowPolybaseExport",
    ]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverConfigurationOptions/{serverConfigurationOptionName}",
    }),
  );
export type ServerConfigurationOptionsGetInput =
  typeof ServerConfigurationOptionsGetInput.Type;

// Output Schema
export const ServerConfigurationOptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerConfigurationOptionsGetOutput =
  typeof ServerConfigurationOptionsGetOutput.Type;

// The operation
/**
 * Gets managed instance server configuration option.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverConfigurationOptionName - The name of the server configuration option.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerConfigurationOptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerConfigurationOptionsGetInput,
    outputSchema: ServerConfigurationOptionsGetOutput,
  }));
// Input Schema
export const ServerConfigurationOptionsListByManagedInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverConfigurationOptions",
    }),
  );
export type ServerConfigurationOptionsListByManagedInstanceInput =
  typeof ServerConfigurationOptionsListByManagedInstanceInput.Type;

// Output Schema
export const ServerConfigurationOptionsListByManagedInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerConfigurationOptionsListByManagedInstanceOutput =
  typeof ServerConfigurationOptionsListByManagedInstanceOutput.Type;

// The operation
/**
 * Gets a list of managed instance server configuration options.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerConfigurationOptionsListByManagedInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerConfigurationOptionsListByManagedInstanceInput,
    outputSchema: ServerConfigurationOptionsListByManagedInstanceOutput,
  }));
// Input Schema
export const ServerConnectionPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/connectionPolicies/{connectionPolicyName}",
    }),
  );
export type ServerConnectionPoliciesCreateOrUpdateInput =
  typeof ServerConnectionPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ServerConnectionPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerConnectionPoliciesCreateOrUpdateOutput =
  typeof ServerConnectionPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates a server connection policy
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param connectionPolicyName - The name of the connection policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerConnectionPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerConnectionPoliciesCreateOrUpdateInput,
    outputSchema: ServerConnectionPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerConnectionPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    connectionPolicyName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/connectionPolicies/{connectionPolicyName}",
    }),
  );
export type ServerConnectionPoliciesGetInput =
  typeof ServerConnectionPoliciesGetInput.Type;

// Output Schema
export const ServerConnectionPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerConnectionPoliciesGetOutput =
  typeof ServerConnectionPoliciesGetOutput.Type;

// The operation
/**
 * Gets a server connection policy
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param connectionPolicyName - The name of the connection policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerConnectionPoliciesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerConnectionPoliciesGetInput,
    outputSchema: ServerConnectionPoliciesGetOutput,
  }),
);
// Input Schema
export const ServerConnectionPoliciesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/connectionPolicies",
    }),
  );
export type ServerConnectionPoliciesListByServerInput =
  typeof ServerConnectionPoliciesListByServerInput.Type;

// Output Schema
export const ServerConnectionPoliciesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerConnectionPoliciesListByServerOutput =
  typeof ServerConnectionPoliciesListByServerOutput.Type;

// The operation
/**
 * Lists connection policy
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerConnectionPoliciesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerConnectionPoliciesListByServerInput,
    outputSchema: ServerConnectionPoliciesListByServerOutput,
  }));
// Input Schema
export const ServerDevOpsAuditSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    devOpsAuditingSettingsName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings/{devOpsAuditingSettingsName}",
    }),
  );
export type ServerDevOpsAuditSettingsCreateOrUpdateInput =
  typeof ServerDevOpsAuditSettingsCreateOrUpdateInput.Type;

// Output Schema
export const ServerDevOpsAuditSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerDevOpsAuditSettingsCreateOrUpdateOutput =
  typeof ServerDevOpsAuditSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a server's DevOps audit settings.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerDevOpsAuditSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDevOpsAuditSettingsCreateOrUpdateInput,
    outputSchema: ServerDevOpsAuditSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerDevOpsAuditSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    devOpsAuditingSettingsName: Schema.Literals(["Default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings/{devOpsAuditingSettingsName}",
    }),
  );
export type ServerDevOpsAuditSettingsGetInput =
  typeof ServerDevOpsAuditSettingsGetInput.Type;

// Output Schema
export const ServerDevOpsAuditSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerDevOpsAuditSettingsGetOutput =
  typeof ServerDevOpsAuditSettingsGetOutput.Type;

// The operation
/**
 * Gets a server's DevOps audit settings.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerDevOpsAuditSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDevOpsAuditSettingsGetInput,
    outputSchema: ServerDevOpsAuditSettingsGetOutput,
  }));
// Input Schema
export const ServerDevOpsAuditSettingsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/devOpsAuditingSettings",
    }),
  );
export type ServerDevOpsAuditSettingsListByServerInput =
  typeof ServerDevOpsAuditSettingsListByServerInput.Type;

// Output Schema
export const ServerDevOpsAuditSettingsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerDevOpsAuditSettingsListByServerOutput =
  typeof ServerDevOpsAuditSettingsListByServerOutput.Type;

// The operation
/**
 * Lists DevOps audit settings of a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerDevOpsAuditSettingsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDevOpsAuditSettingsListByServerInput,
    outputSchema: ServerDevOpsAuditSettingsListByServerOutput,
  }));
// Input Schema
export const ServerDnsAliasesAcquireInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    dnsAliasName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}/acquire",
    }),
  );
export type ServerDnsAliasesAcquireInput =
  typeof ServerDnsAliasesAcquireInput.Type;

// Output Schema
export const ServerDnsAliasesAcquireOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerDnsAliasesAcquireOutput =
  typeof ServerDnsAliasesAcquireOutput.Type;

// The operation
/**
 * Acquires server DNS alias from another server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server that the alias is pointing to.
 * @param dnsAliasName - The name of the server dns alias.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerDnsAliasesAcquire = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerDnsAliasesAcquireInput,
    outputSchema: ServerDnsAliasesAcquireOutput,
  }),
);
// Input Schema
export const ServerDnsAliasesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    dnsAliasName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}",
    }),
  );
export type ServerDnsAliasesCreateOrUpdateInput =
  typeof ServerDnsAliasesCreateOrUpdateInput.Type;

// Output Schema
export const ServerDnsAliasesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerDnsAliasesCreateOrUpdateOutput =
  typeof ServerDnsAliasesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates a server DNS alias.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server that the alias is pointing to.
 * @param dnsAliasName - The name of the server dns alias.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerDnsAliasesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDnsAliasesCreateOrUpdateInput,
    outputSchema: ServerDnsAliasesCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerDnsAliasesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    dnsAliasName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}",
    }),
  );
export type ServerDnsAliasesDeleteInput =
  typeof ServerDnsAliasesDeleteInput.Type;

// Output Schema
export const ServerDnsAliasesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerDnsAliasesDeleteOutput =
  typeof ServerDnsAliasesDeleteOutput.Type;

// The operation
/**
 * Deletes the server DNS alias with the given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server that the alias is pointing to.
 * @param dnsAliasName - The name of the server dns alias.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerDnsAliasesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerDnsAliasesDeleteInput,
    outputSchema: ServerDnsAliasesDeleteOutput,
  }),
);
// Input Schema
export const ServerDnsAliasesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    dnsAliasName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}",
    }),
  );
export type ServerDnsAliasesGetInput = typeof ServerDnsAliasesGetInput.Type;

// Output Schema
export const ServerDnsAliasesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerDnsAliasesGetOutput = typeof ServerDnsAliasesGetOutput.Type;

// The operation
/**
 * Gets a server DNS alias.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server that the alias is pointing to.
 * @param dnsAliasName - The name of the server dns alias.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerDnsAliasesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServerDnsAliasesGetInput,
  outputSchema: ServerDnsAliasesGetOutput,
}));
// Input Schema
export const ServerDnsAliasesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases",
    }),
  );
export type ServerDnsAliasesListByServerInput =
  typeof ServerDnsAliasesListByServerInput.Type;

// Output Schema
export const ServerDnsAliasesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerDnsAliasesListByServerOutput =
  typeof ServerDnsAliasesListByServerOutput.Type;

// The operation
/**
 * Gets a list of server DNS aliases for a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server that the alias is pointing to.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerDnsAliasesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerDnsAliasesListByServerInput,
    outputSchema: ServerDnsAliasesListByServerOutput,
  }));
// Input Schema
export const ServerKeysCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    keyName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/keys/{keyName}",
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
 * Creates or updates a server key.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param keyName - The name of the server key to be operated on (updated or created). The key name is required to be in the format of 'vault_key_version'. For example, if the keyId is https://YourVaultName.vault.azure.net/keys/YourKeyName/YourKeyVersion, then the server key name should be formatted as: YourVaultName_YourKeyName_YourKeyVersion
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerKeysCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerKeysCreateOrUpdateInput,
    outputSchema: ServerKeysCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServerKeysDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  keyName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/keys/{keyName}",
  }),
);
export type ServerKeysDeleteInput = typeof ServerKeysDeleteInput.Type;

// Output Schema
export const ServerKeysDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerKeysDeleteOutput = typeof ServerKeysDeleteOutput.Type;

// The operation
/**
 * Deletes the server key with the given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param keyName - The name of the server key to be deleted.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
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
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/keys/{keyName}",
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
 * Gets a server key.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param keyName - The name of the server key to be retrieved.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerKeysGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServerKeysGetInput,
  outputSchema: ServerKeysGetOutput,
}));
// Input Schema
export const ServerKeysListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/keys",
    }),
  );
export type ServerKeysListByServerInput =
  typeof ServerKeysListByServerInput.Type;

// Output Schema
export const ServerKeysListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerKeysListByServerOutput =
  typeof ServerKeysListByServerOutput.Type;

// The operation
/**
 * Gets a list of server keys.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerKeysListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerKeysListByServerInput,
    outputSchema: ServerKeysListByServerOutput,
  }),
);
// Input Schema
export const ServerOperationsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/operations",
    }),
  );
export type ServerOperationsListByServerInput =
  typeof ServerOperationsListByServerInput.Type;

// Output Schema
export const ServerOperationsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerOperationsListByServerOutput =
  typeof ServerOperationsListByServerOutput.Type;

// The operation
/**
 * Gets a list of operations performed on the server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerOperationsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerOperationsListByServerInput,
    outputSchema: ServerOperationsListByServerOutput,
  }));
// Input Schema
export const ServersCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/checkNameAvailability",
    }),
  );
export type ServersCheckNameAvailabilityInput =
  typeof ServersCheckNameAvailabilityInput.Type;

// Output Schema
export const ServersCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.optional(Schema.String),
    available: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.Literals(["Invalid", "AlreadyExists"])),
    message: Schema.optional(Schema.String),
  });
export type ServersCheckNameAvailabilityOutput =
  typeof ServersCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Determines whether a resource can be created with the specified name.
 *
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServersCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServersCheckNameAvailabilityInput,
    outputSchema: ServersCheckNameAvailabilityOutput,
  }));
// Input Schema
export const ServersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}",
    }),
  );
export type ServersCreateOrUpdateInput = typeof ServersCreateOrUpdateInput.Type;

// Output Schema
export const ServersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type ServersCreateOrUpdateOutput =
  typeof ServersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersCreateOrUpdateInput,
    outputSchema: ServersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const ServersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}",
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
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersDeleteInput,
  outputSchema: ServersDeleteOutput,
}));
// Input Schema
export const ServerSecurityAlertPoliciesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type ServerSecurityAlertPoliciesCreateOrUpdateInput =
  typeof ServerSecurityAlertPoliciesCreateOrUpdateInput.Type;

// Output Schema
export const ServerSecurityAlertPoliciesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerSecurityAlertPoliciesCreateOrUpdateOutput =
  typeof ServerSecurityAlertPoliciesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a threat detection policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param securityAlertPolicyName - The name of the threat detection policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerSecurityAlertPoliciesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSecurityAlertPoliciesCreateOrUpdateInput,
    outputSchema: ServerSecurityAlertPoliciesCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerSecurityAlertPoliciesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    securityAlertPolicyName: Schema.Literals(["Default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/securityAlertPolicies/{securityAlertPolicyName}",
    }),
  );
export type ServerSecurityAlertPoliciesGetInput =
  typeof ServerSecurityAlertPoliciesGetInput.Type;

// Output Schema
export const ServerSecurityAlertPoliciesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerSecurityAlertPoliciesGetOutput =
  typeof ServerSecurityAlertPoliciesGetOutput.Type;

// The operation
/**
 * Get a server's security alert policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param securityAlertPolicyName - The name of the security alert policy.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerSecurityAlertPoliciesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSecurityAlertPoliciesGetInput,
    outputSchema: ServerSecurityAlertPoliciesGetOutput,
  }));
// Input Schema
export const ServerSecurityAlertPoliciesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/securityAlertPolicies",
    }),
  );
export type ServerSecurityAlertPoliciesListByServerInput =
  typeof ServerSecurityAlertPoliciesListByServerInput.Type;

// Output Schema
export const ServerSecurityAlertPoliciesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerSecurityAlertPoliciesListByServerOutput =
  typeof ServerSecurityAlertPoliciesListByServerOutput.Type;

// The operation
/**
 * Get the server's threat detection policies.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerSecurityAlertPoliciesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerSecurityAlertPoliciesListByServerInput,
    outputSchema: ServerSecurityAlertPoliciesListByServerOutput,
  }));
// Input Schema
export const ServersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  $expand: Schema.optional(Schema.String),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}",
  }),
);
export type ServersGetInput = typeof ServersGetInput.Type;

// Output Schema
export const ServersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ServersGetOutput = typeof ServersGetOutput.Type;

// The operation
/**
 * Gets a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $expand - The child resources to include in the response.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersGetInput,
  outputSchema: ServersGetOutput,
}));
// Input Schema
export const ServersImportDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/import",
    }),
  );
export type ServersImportDatabaseInput = typeof ServersImportDatabaseInput.Type;

// Output Schema
export const ServersImportDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServersImportDatabaseOutput =
  typeof ServersImportDatabaseOutput.Type;

// The operation
/**
 * Imports a bacpac into a new database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServersImportDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersImportDatabaseInput,
    outputSchema: ServersImportDatabaseOutput,
  }),
);
// Input Schema
export const ServersListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  $expand: Schema.optional(Schema.String),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/servers",
  }),
);
export type ServersListInput = typeof ServersListInput.Type;

// Output Schema
export const ServersListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type ServersListOutput = typeof ServersListOutput.Type;

// The operation
/**
 * Gets a list of all servers in the subscription.
 *
 * @param $expand - The child resources to include in the response.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersListInput,
  outputSchema: ServersListOutput,
}));
// Input Schema
export const ServersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    $expand: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers",
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
          location: Schema.String,
          tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ServersListByResourceGroupOutput =
  typeof ServersListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of servers in a resource groups.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param $expand - The child resources to include in the response.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersListByResourceGroupInput,
    outputSchema: ServersListByResourceGroupOutput,
  }),
);
// Input Schema
export const ServersRefreshStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/refreshExternalGovernanceStatus",
    }),
  );
export type ServersRefreshStatusInput = typeof ServersRefreshStatusInput.Type;

// Output Schema
export const ServersRefreshStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServersRefreshStatusOutput = typeof ServersRefreshStatusOutput.Type;

// The operation
/**
 * Refresh external governance enablement status.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServersRefreshStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServersRefreshStatusInput,
    outputSchema: ServersRefreshStatusOutput,
  }),
);
// Input Schema
export const ServersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}",
  }),
);
export type ServersUpdateInput = typeof ServersUpdateInput.Type;

// Output Schema
export const ServersUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  location: Schema.String,
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});
export type ServersUpdateOutput = typeof ServersUpdateOutput.Type;

// The operation
/**
 * Updates a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServersUpdateInput,
  outputSchema: ServersUpdateOutput,
}));
// Input Schema
export const ServerTrustCertificatesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverTrustCertificates/{certificateName}",
    }),
  );
export type ServerTrustCertificatesCreateOrUpdateInput =
  typeof ServerTrustCertificatesCreateOrUpdateInput.Type;

// Output Schema
export const ServerTrustCertificatesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerTrustCertificatesCreateOrUpdateOutput =
  typeof ServerTrustCertificatesCreateOrUpdateOutput.Type;

// The operation
/**
 * Uploads a server trust certificate from SQL Server to SQL Managed Instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param certificateName - Name of of the certificate to upload.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerTrustCertificatesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerTrustCertificatesCreateOrUpdateInput,
    outputSchema: ServerTrustCertificatesCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerTrustCertificatesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverTrustCertificates/{certificateName}",
    }),
  );
export type ServerTrustCertificatesDeleteInput =
  typeof ServerTrustCertificatesDeleteInput.Type;

// Output Schema
export const ServerTrustCertificatesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerTrustCertificatesDeleteOutput =
  typeof ServerTrustCertificatesDeleteOutput.Type;

// The operation
/**
 * Deletes a server trust certificate that was uploaded from SQL Server to SQL Managed Instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param certificateName - Name of of the certificate to delete.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerTrustCertificatesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerTrustCertificatesDeleteInput,
    outputSchema: ServerTrustCertificatesDeleteOutput,
  }));
// Input Schema
export const ServerTrustCertificatesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    certificateName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverTrustCertificates/{certificateName}",
    }),
  );
export type ServerTrustCertificatesGetInput =
  typeof ServerTrustCertificatesGetInput.Type;

// Output Schema
export const ServerTrustCertificatesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerTrustCertificatesGetOutput =
  typeof ServerTrustCertificatesGetOutput.Type;

// The operation
/**
 * Gets a server trust certificate that was uploaded from SQL Server to SQL Managed Instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param certificateName - Name of of the certificate to get.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerTrustCertificatesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerTrustCertificatesGetInput,
    outputSchema: ServerTrustCertificatesGetOutput,
  }),
);
// Input Schema
export const ServerTrustCertificatesListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverTrustCertificates",
    }),
  );
export type ServerTrustCertificatesListByInstanceInput =
  typeof ServerTrustCertificatesListByInstanceInput.Type;

// Output Schema
export const ServerTrustCertificatesListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerTrustCertificatesListByInstanceOutput =
  typeof ServerTrustCertificatesListByInstanceOutput.Type;

// The operation
/**
 * Gets a list of the server trust certificates used to secure communication between SQL Server and the specified SQL Managed Instance
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerTrustCertificatesListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerTrustCertificatesListByInstanceInput,
    outputSchema: ServerTrustCertificatesListByInstanceOutput,
  }));
// Input Schema
export const ServerTrustGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    serverTrustGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/serverTrustGroups/{serverTrustGroupName}",
    }),
  );
export type ServerTrustGroupsCreateOrUpdateInput =
  typeof ServerTrustGroupsCreateOrUpdateInput.Type;

// Output Schema
export const ServerTrustGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerTrustGroupsCreateOrUpdateOutput =
  typeof ServerTrustGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a server trust group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param serverTrustGroupName - The name of the server trust group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerTrustGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerTrustGroupsCreateOrUpdateInput,
    outputSchema: ServerTrustGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerTrustGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    serverTrustGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/serverTrustGroups/{serverTrustGroupName}",
    }),
  );
export type ServerTrustGroupsDeleteInput =
  typeof ServerTrustGroupsDeleteInput.Type;

// Output Schema
export const ServerTrustGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerTrustGroupsDeleteOutput =
  typeof ServerTrustGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a server trust group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param serverTrustGroupName - The name of the server trust group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerTrustGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerTrustGroupsDeleteInput,
    outputSchema: ServerTrustGroupsDeleteOutput,
  }),
);
// Input Schema
export const ServerTrustGroupsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    serverTrustGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/serverTrustGroups/{serverTrustGroupName}",
    }),
  );
export type ServerTrustGroupsGetInput = typeof ServerTrustGroupsGetInput.Type;

// Output Schema
export const ServerTrustGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerTrustGroupsGetOutput = typeof ServerTrustGroupsGetOutput.Type;

// The operation
/**
 * Gets a server trust group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param serverTrustGroupName - The name of the server trust group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerTrustGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerTrustGroupsGetInput,
    outputSchema: ServerTrustGroupsGetOutput,
  }),
);
// Input Schema
export const ServerTrustGroupsListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverTrustGroups",
    }),
  );
export type ServerTrustGroupsListByInstanceInput =
  typeof ServerTrustGroupsListByInstanceInput.Type;

// Output Schema
export const ServerTrustGroupsListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerTrustGroupsListByInstanceOutput =
  typeof ServerTrustGroupsListByInstanceOutput.Type;

// The operation
/**
 * Gets a server trust groups by instance name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerTrustGroupsListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerTrustGroupsListByInstanceInput,
    outputSchema: ServerTrustGroupsListByInstanceOutput,
  }));
// Input Schema
export const ServerTrustGroupsListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/locations/{locationName}/serverTrustGroups",
    }),
  );
export type ServerTrustGroupsListByLocationInput =
  typeof ServerTrustGroupsListByLocationInput.Type;

// Output Schema
export const ServerTrustGroupsListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerTrustGroupsListByLocationOutput =
  typeof ServerTrustGroupsListByLocationOutput.Type;

// The operation
/**
 * Lists a server trust group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param locationName - The name of the region where the resource is located.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerTrustGroupsListByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerTrustGroupsListByLocationInput,
    outputSchema: ServerTrustGroupsListByLocationOutput,
  }));
// Input Schema
export const ServerUsagesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/usages",
    }),
  );
export type ServerUsagesListByServerInput =
  typeof ServerUsagesListByServerInput.Type;

// Output Schema
export const ServerUsagesListByServerOutput =
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
  });
export type ServerUsagesListByServerOutput =
  typeof ServerUsagesListByServerOutput.Type;

// The operation
/**
 * Returns server usages.
 *
 * @param api-version - The API version to use for the request.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 */
export const ServerUsagesListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ServerUsagesListByServerInput,
    outputSchema: ServerUsagesListByServerOutput,
  }),
);
// Input Schema
export const ServerVulnerabilityAssessmentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type ServerVulnerabilityAssessmentsCreateOrUpdateInput =
  typeof ServerVulnerabilityAssessmentsCreateOrUpdateInput.Type;

// Output Schema
export const ServerVulnerabilityAssessmentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerVulnerabilityAssessmentsCreateOrUpdateOutput =
  typeof ServerVulnerabilityAssessmentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the server's vulnerability assessment. Learn more about setting SQL vulnerability assessment with managed identity - https://docs.microsoft.com/azure/azure-sql/database/sql-database-vulnerability-assessment-storage
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerVulnerabilityAssessmentsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerVulnerabilityAssessmentsCreateOrUpdateInput,
    outputSchema: ServerVulnerabilityAssessmentsCreateOrUpdateOutput,
  }));
// Input Schema
export const ServerVulnerabilityAssessmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type ServerVulnerabilityAssessmentsDeleteInput =
  typeof ServerVulnerabilityAssessmentsDeleteInput.Type;

// Output Schema
export const ServerVulnerabilityAssessmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ServerVulnerabilityAssessmentsDeleteOutput =
  typeof ServerVulnerabilityAssessmentsDeleteOutput.Type;

// The operation
/**
 * Removes the server's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerVulnerabilityAssessmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerVulnerabilityAssessmentsDeleteInput,
    outputSchema: ServerVulnerabilityAssessmentsDeleteOutput,
  }));
// Input Schema
export const ServerVulnerabilityAssessmentsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/vulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type ServerVulnerabilityAssessmentsGetInput =
  typeof ServerVulnerabilityAssessmentsGetInput.Type;

// Output Schema
export const ServerVulnerabilityAssessmentsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServerVulnerabilityAssessmentsGetOutput =
  typeof ServerVulnerabilityAssessmentsGetOutput.Type;

// The operation
/**
 * Gets the server's vulnerability assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server for which the vulnerability assessment is defined.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerVulnerabilityAssessmentsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerVulnerabilityAssessmentsGetInput,
    outputSchema: ServerVulnerabilityAssessmentsGetOutput,
  }));
// Input Schema
export const ServerVulnerabilityAssessmentsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/vulnerabilityAssessments",
    }),
  );
export type ServerVulnerabilityAssessmentsListByServerInput =
  typeof ServerVulnerabilityAssessmentsListByServerInput.Type;

// Output Schema
export const ServerVulnerabilityAssessmentsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type ServerVulnerabilityAssessmentsListByServerOutput =
  typeof ServerVulnerabilityAssessmentsListByServerOutput.Type;

// The operation
/**
 * Lists the vulnerability assessment policies associated with a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const ServerVulnerabilityAssessmentsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ServerVulnerabilityAssessmentsListByServerInput,
    outputSchema: ServerVulnerabilityAssessmentsListByServerOutput,
  }));
// Input Schema
export const SqlAgentCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/sqlAgent/current",
    }),
  );
export type SqlAgentCreateOrUpdateInput =
  typeof SqlAgentCreateOrUpdateInput.Type;

// Output Schema
export const SqlAgentCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlAgentCreateOrUpdateOutput =
  typeof SqlAgentCreateOrUpdateOutput.Type;

// The operation
/**
 * Puts new sql agent configuration to instance.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlAgentCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SqlAgentCreateOrUpdateInput,
    outputSchema: SqlAgentCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SqlAgentGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/sqlAgent/current",
  }),
);
export type SqlAgentGetInput = typeof SqlAgentGetInput.Type;

// Output Schema
export const SqlAgentGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlAgentGetOutput = typeof SqlAgentGetOutput.Type;

// The operation
/**
 * Gets current instance sql agent configuration.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlAgentGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SqlAgentGetInput,
  outputSchema: SqlAgentGetOutput,
}));
// Input Schema
export const SqlVulnerabilityAssessmentBaselineGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}",
    }),
  );
export type SqlVulnerabilityAssessmentBaselineGetInput =
  typeof SqlVulnerabilityAssessmentBaselineGetInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentBaselineGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlVulnerabilityAssessmentBaselineGetOutput =
  typeof SqlVulnerabilityAssessmentBaselineGetOutput.Type;

// The operation
/**
 * Gets a list of database's sql vulnerability assessment rule baselines.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentBaselineGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentBaselineGetInput,
    outputSchema: SqlVulnerabilityAssessmentBaselineGetOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentBaselineListBySqlVulnerabilityAssessmentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines",
    }),
  );
export type SqlVulnerabilityAssessmentBaselineListBySqlVulnerabilityAssessmentInput =
  typeof SqlVulnerabilityAssessmentBaselineListBySqlVulnerabilityAssessmentInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentBaselineListBySqlVulnerabilityAssessmentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVulnerabilityAssessmentBaselineListBySqlVulnerabilityAssessmentOutput =
  typeof SqlVulnerabilityAssessmentBaselineListBySqlVulnerabilityAssessmentOutput.Type;

// The operation
/**
 * Gets a list of database's sql vulnerability assessment rule baselines.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentBaselineListBySqlVulnerabilityAssessment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      SqlVulnerabilityAssessmentBaselineListBySqlVulnerabilityAssessmentInput,
    outputSchema:
      SqlVulnerabilityAssessmentBaselineListBySqlVulnerabilityAssessmentOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentBaselinesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}",
    }),
  );
export type SqlVulnerabilityAssessmentBaselinesCreateOrUpdateInput =
  typeof SqlVulnerabilityAssessmentBaselinesCreateOrUpdateInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentBaselinesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlVulnerabilityAssessmentBaselinesCreateOrUpdateOutput =
  typeof SqlVulnerabilityAssessmentBaselinesCreateOrUpdateOutput.Type;

// The operation
/**
 * Add a database's vulnerability assessment rule baseline list.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentBaselinesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentBaselinesCreateOrUpdateInput,
    outputSchema: SqlVulnerabilityAssessmentBaselinesCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentExecuteScanExecuteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/initiateScan",
    }),
  );
export type SqlVulnerabilityAssessmentExecuteScanExecuteInput =
  typeof SqlVulnerabilityAssessmentExecuteScanExecuteInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentExecuteScanExecuteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlVulnerabilityAssessmentExecuteScanExecuteOutput =
  typeof SqlVulnerabilityAssessmentExecuteScanExecuteOutput.Type;

// The operation
/**
 * Executes a Vulnerability Assessment database scan.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentExecuteScanExecute =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentExecuteScanExecuteInput,
    outputSchema: SqlVulnerabilityAssessmentExecuteScanExecuteOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentRuleBaselineCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    ruleId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}/rules/{ruleId}",
    }),
  );
export type SqlVulnerabilityAssessmentRuleBaselineCreateOrUpdateInput =
  typeof SqlVulnerabilityAssessmentRuleBaselineCreateOrUpdateInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentRuleBaselineCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlVulnerabilityAssessmentRuleBaselineCreateOrUpdateOutput =
  typeof SqlVulnerabilityAssessmentRuleBaselineCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentRuleBaselineCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentRuleBaselineCreateOrUpdateInput,
    outputSchema: SqlVulnerabilityAssessmentRuleBaselineCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentRuleBaselineGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    ruleId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}/rules/{ruleId}",
    }),
  );
export type SqlVulnerabilityAssessmentRuleBaselineGetInput =
  typeof SqlVulnerabilityAssessmentRuleBaselineGetInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentRuleBaselineGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlVulnerabilityAssessmentRuleBaselineGetOutput =
  typeof SqlVulnerabilityAssessmentRuleBaselineGetOutput.Type;

// The operation
/**
 * Gets a system database's sql vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentRuleBaselineGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentRuleBaselineGetInput,
    outputSchema: SqlVulnerabilityAssessmentRuleBaselineGetOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentRuleBaselineListByBaselineInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}/rules",
    }),
  );
export type SqlVulnerabilityAssessmentRuleBaselineListByBaselineInput =
  typeof SqlVulnerabilityAssessmentRuleBaselineListByBaselineInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentRuleBaselineListByBaselineOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVulnerabilityAssessmentRuleBaselineListByBaselineOutput =
  typeof SqlVulnerabilityAssessmentRuleBaselineListByBaselineOutput.Type;

// The operation
/**
 * Gets a system database's sql vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentRuleBaselineListByBaseline =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentRuleBaselineListByBaselineInput,
    outputSchema: SqlVulnerabilityAssessmentRuleBaselineListByBaselineOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentRuleBaselinesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    baselineName: Schema.Literals(["default"]).pipe(T.PathParam()),
    ruleId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/baselines/{baselineName}/rules/{ruleId}",
    }),
  );
export type SqlVulnerabilityAssessmentRuleBaselinesDeleteInput =
  typeof SqlVulnerabilityAssessmentRuleBaselinesDeleteInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlVulnerabilityAssessmentRuleBaselinesDeleteOutput =
  typeof SqlVulnerabilityAssessmentRuleBaselinesDeleteOutput.Type;

// The operation
/**
 * Removes the database's vulnerability assessment rule baseline.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param ruleId - The vulnerability assessment rule ID.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentRuleBaselinesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentRuleBaselinesDeleteInput,
    outputSchema: SqlVulnerabilityAssessmentRuleBaselinesDeleteOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentScanResultGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    scanResultId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/scanResults/{scanResultId}",
    }),
  );
export type SqlVulnerabilityAssessmentScanResultGetInput =
  typeof SqlVulnerabilityAssessmentScanResultGetInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentScanResultGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlVulnerabilityAssessmentScanResultGetOutput =
  typeof SqlVulnerabilityAssessmentScanResultGetOutput.Type;

// The operation
/**
 * Gets a vulnerability assessment scan record of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the SQL Vulnerability Assessment.
 * @param scanId - The scan id of the SQL Vulnerability Assessment scan to retrieve result from.
 * @param scanResultId - The scan result id of the specific result to retrieve.
 * @param systemDatabaseName - The SQL vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentScanResultGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentScanResultGetInput,
    outputSchema: SqlVulnerabilityAssessmentScanResultGetOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentScanResultListByScanInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}/scanResults",
    }),
  );
export type SqlVulnerabilityAssessmentScanResultListByScanInput =
  typeof SqlVulnerabilityAssessmentScanResultListByScanInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentScanResultListByScanOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVulnerabilityAssessmentScanResultListByScanOutput =
  typeof SqlVulnerabilityAssessmentScanResultListByScanOutput.Type;

// The operation
/**
 * Gets a vulnerability assessment scan record of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the SQL Vulnerability Assessment.
 * @param scanId - The scan id of the SQL Vulnerability Assessment scan to retrieve result from.
 * @param systemDatabaseName - The SQL vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentScanResultListByScan =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentScanResultListByScanInput,
    outputSchema: SqlVulnerabilityAssessmentScanResultListByScanOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentScansGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    scanId: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/scans/{scanId}",
    }),
  );
export type SqlVulnerabilityAssessmentScansGetInput =
  typeof SqlVulnerabilityAssessmentScansGetInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentScansGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlVulnerabilityAssessmentScansGetOutput =
  typeof SqlVulnerabilityAssessmentScansGetOutput.Type;

// The operation
/**
 * Get a system database vulnerability assessment scan record.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentScansGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentScansGetInput,
    outputSchema: SqlVulnerabilityAssessmentScansGetOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    systemDatabaseName: Schema.Literals(["master"]),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}/scans",
    }),
  );
export type SqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsInput =
  typeof SqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsOutput =
  typeof SqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsOutput.Type;

// The operation
/**
 * Lists the vulnerability assessment scans of a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the vulnerability assessment.
 * @param systemDatabaseName - The vulnerability assessment system database name.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessments =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema:
      SqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsInput,
    outputSchema:
      SqlVulnerabilityAssessmentScansListBySqlVulnerabilityAssessmentsOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type SqlVulnerabilityAssessmentsDeleteInput =
  typeof SqlVulnerabilityAssessmentsDeleteInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SqlVulnerabilityAssessmentsDeleteOutput =
  typeof SqlVulnerabilityAssessmentsDeleteOutput.Type;

// The operation
/**
 * Removes SQL Vulnerability Assessment.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the SQL Vulnerability Assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentsDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentsDeleteInput,
    outputSchema: SqlVulnerabilityAssessmentsDeleteOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentsSettingsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type SqlVulnerabilityAssessmentsSettingsCreateOrUpdateInput =
  typeof SqlVulnerabilityAssessmentsSettingsCreateOrUpdateInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentsSettingsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlVulnerabilityAssessmentsSettingsCreateOrUpdateOutput =
  typeof SqlVulnerabilityAssessmentsSettingsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates SQL Vulnerability Assessment policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the SQL Vulnerability Assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentsSettingsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentsSettingsCreateOrUpdateInput,
    outputSchema: SqlVulnerabilityAssessmentsSettingsCreateOrUpdateOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentsSettingsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    vulnerabilityAssessmentName: Schema.Literals(["default"]).pipe(
      T.PathParam(),
    ),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments/{vulnerabilityAssessmentName}",
    }),
  );
export type SqlVulnerabilityAssessmentsSettingsGetInput =
  typeof SqlVulnerabilityAssessmentsSettingsGetInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentsSettingsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SqlVulnerabilityAssessmentsSettingsGetOutput =
  typeof SqlVulnerabilityAssessmentsSettingsGetOutput.Type;

// The operation
/**
 * Gets SQL Vulnerability Assessment policy.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param vulnerabilityAssessmentName - The name of the SQL Vulnerability Assessment.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentsSettingsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentsSettingsGetInput,
    outputSchema: SqlVulnerabilityAssessmentsSettingsGetOutput,
  }));
// Input Schema
export const SqlVulnerabilityAssessmentsSettingsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/sqlVulnerabilityAssessments",
    }),
  );
export type SqlVulnerabilityAssessmentsSettingsListByServerInput =
  typeof SqlVulnerabilityAssessmentsSettingsListByServerInput.Type;

// Output Schema
export const SqlVulnerabilityAssessmentsSettingsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SqlVulnerabilityAssessmentsSettingsListByServerOutput =
  typeof SqlVulnerabilityAssessmentsSettingsListByServerOutput.Type;

// The operation
/**
 * Lists SQL Vulnerability Assessment policies associated with a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SqlVulnerabilityAssessmentsSettingsListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SqlVulnerabilityAssessmentsSettingsListByServerInput,
    outputSchema: SqlVulnerabilityAssessmentsSettingsListByServerOutput,
  }));
// Input Schema
export const StartStopManagedInstanceSchedulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    startStopScheduleName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/startStopSchedules/{startStopScheduleName}",
    }),
  );
export type StartStopManagedInstanceSchedulesCreateOrUpdateInput =
  typeof StartStopManagedInstanceSchedulesCreateOrUpdateInput.Type;

// Output Schema
export const StartStopManagedInstanceSchedulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type StartStopManagedInstanceSchedulesCreateOrUpdateOutput =
  typeof StartStopManagedInstanceSchedulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates the managed instance's Start/Stop schedule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param startStopScheduleName - Name of the managed instance Start/Stop schedule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const StartStopManagedInstanceSchedulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StartStopManagedInstanceSchedulesCreateOrUpdateInput,
    outputSchema: StartStopManagedInstanceSchedulesCreateOrUpdateOutput,
  }));
// Input Schema
export const StartStopManagedInstanceSchedulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    startStopScheduleName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/startStopSchedules/{startStopScheduleName}",
    }),
  );
export type StartStopManagedInstanceSchedulesDeleteInput =
  typeof StartStopManagedInstanceSchedulesDeleteInput.Type;

// Output Schema
export const StartStopManagedInstanceSchedulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type StartStopManagedInstanceSchedulesDeleteOutput =
  typeof StartStopManagedInstanceSchedulesDeleteOutput.Type;

// The operation
/**
 * Deletes the managed instance's Start/Stop schedule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param startStopScheduleName - Name of the managed instance Start/Stop schedule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const StartStopManagedInstanceSchedulesDelete =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StartStopManagedInstanceSchedulesDeleteInput,
    outputSchema: StartStopManagedInstanceSchedulesDeleteOutput,
  }));
// Input Schema
export const StartStopManagedInstanceSchedulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    startStopScheduleName: Schema.Literals(["default"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/startStopSchedules/{startStopScheduleName}",
    }),
  );
export type StartStopManagedInstanceSchedulesGetInput =
  typeof StartStopManagedInstanceSchedulesGetInput.Type;

// Output Schema
export const StartStopManagedInstanceSchedulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type StartStopManagedInstanceSchedulesGetOutput =
  typeof StartStopManagedInstanceSchedulesGetOutput.Type;

// The operation
/**
 * Gets the managed instance's Start/Stop schedule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param startStopScheduleName - Name of the managed instance Start/Stop schedule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const StartStopManagedInstanceSchedulesGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StartStopManagedInstanceSchedulesGetInput,
    outputSchema: StartStopManagedInstanceSchedulesGetOutput,
  }));
// Input Schema
export const StartStopManagedInstanceSchedulesListByInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/startStopSchedules",
    }),
  );
export type StartStopManagedInstanceSchedulesListByInstanceInput =
  typeof StartStopManagedInstanceSchedulesListByInstanceInput.Type;

// Output Schema
export const StartStopManagedInstanceSchedulesListByInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type StartStopManagedInstanceSchedulesListByInstanceOutput =
  typeof StartStopManagedInstanceSchedulesListByInstanceOutput.Type;

// The operation
/**
 * Lists the managed instance's Start/Stop schedules.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const StartStopManagedInstanceSchedulesListByInstance =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: StartStopManagedInstanceSchedulesListByInstanceInput,
    outputSchema: StartStopManagedInstanceSchedulesListByInstanceOutput,
  }));
// Input Schema
export const SubscriptionUsagesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    usageName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/usages/{usageName}",
    }),
  );
export type SubscriptionUsagesGetInput = typeof SubscriptionUsagesGetInput.Type;

// Output Schema
export const SubscriptionUsagesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SubscriptionUsagesGetOutput =
  typeof SubscriptionUsagesGetOutput.Type;

// The operation
/**
 * Gets a subscription usage metric.
 *
 * @param locationName - The name of the region where the resource is located.
 * @param usageName - Name of usage metric to return.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SubscriptionUsagesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SubscriptionUsagesGetInput,
    outputSchema: SubscriptionUsagesGetOutput,
  }),
);
// Input Schema
export const SubscriptionUsagesListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/usages",
    }),
  );
export type SubscriptionUsagesListByLocationInput =
  typeof SubscriptionUsagesListByLocationInput.Type;

// Output Schema
export const SubscriptionUsagesListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SubscriptionUsagesListByLocationOutput =
  typeof SubscriptionUsagesListByLocationOutput.Type;

// The operation
/**
 * Gets all subscription usage metrics in a given location.
 *
 * @param locationName - The name of the region where the resource is located.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SubscriptionUsagesListByLocation =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SubscriptionUsagesListByLocationInput,
    outputSchema: SubscriptionUsagesListByLocationOutput,
  }));
// Input Schema
export const SynapseLinkWorkspacesListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/linkWorkspaces",
    }),
  );
export type SynapseLinkWorkspacesListByDatabaseInput =
  typeof SynapseLinkWorkspacesListByDatabaseInput.Type;

// Output Schema
export const SynapseLinkWorkspacesListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SynapseLinkWorkspacesListByDatabaseOutput =
  typeof SynapseLinkWorkspacesListByDatabaseOutput.Type;

// The operation
/**
 * Gets all synapselink workspaces for a database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SynapseLinkWorkspacesListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SynapseLinkWorkspacesListByDatabaseInput,
    outputSchema: SynapseLinkWorkspacesListByDatabaseOutput,
  }));
// Input Schema
export const SyncAgentsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    syncAgentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}",
    }),
  );
export type SyncAgentsCreateOrUpdateInput =
  typeof SyncAgentsCreateOrUpdateInput.Type;

// Output Schema
export const SyncAgentsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SyncAgentsCreateOrUpdateOutput =
  typeof SyncAgentsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a sync agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server on which the sync agent is hosted.
 * @param syncAgentName - The name of the sync agent.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncAgentsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncAgentsCreateOrUpdateInput,
    outputSchema: SyncAgentsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SyncAgentsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  syncAgentName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}",
  }),
);
export type SyncAgentsDeleteInput = typeof SyncAgentsDeleteInput.Type;

// Output Schema
export const SyncAgentsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SyncAgentsDeleteOutput = typeof SyncAgentsDeleteOutput.Type;

// The operation
/**
 * Deletes a sync agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server on which the sync agent is hosted.
 * @param syncAgentName - The name of the sync agent.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncAgentsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncAgentsDeleteInput,
  outputSchema: SyncAgentsDeleteOutput,
}));
// Input Schema
export const SyncAgentsGenerateKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    syncAgentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}/generateKey",
    }),
  );
export type SyncAgentsGenerateKeyInput = typeof SyncAgentsGenerateKeyInput.Type;

// Output Schema
export const SyncAgentsGenerateKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    syncAgentKey: Schema.optional(Schema.String),
  });
export type SyncAgentsGenerateKeyOutput =
  typeof SyncAgentsGenerateKeyOutput.Type;

// The operation
/**
 * Generates a sync agent key.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server on which the sync agent is hosted.
 * @param syncAgentName - The name of the sync agent.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncAgentsGenerateKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncAgentsGenerateKeyInput,
    outputSchema: SyncAgentsGenerateKeyOutput,
  }),
);
// Input Schema
export const SyncAgentsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  serverName: Schema.String.pipe(T.PathParam()),
  syncAgentName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}",
  }),
);
export type SyncAgentsGetInput = typeof SyncAgentsGetInput.Type;

// Output Schema
export const SyncAgentsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SyncAgentsGetOutput = typeof SyncAgentsGetOutput.Type;

// The operation
/**
 * Gets a sync agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server on which the sync agent is hosted.
 * @param syncAgentName - The name of the sync agent.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncAgentsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncAgentsGetInput,
  outputSchema: SyncAgentsGetOutput,
}));
// Input Schema
export const SyncAgentsListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents",
    }),
  );
export type SyncAgentsListByServerInput =
  typeof SyncAgentsListByServerInput.Type;

// Output Schema
export const SyncAgentsListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SyncAgentsListByServerOutput =
  typeof SyncAgentsListByServerOutput.Type;

// The operation
/**
 * Lists sync agents in a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server on which the sync agent is hosted.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncAgentsListByServer = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncAgentsListByServerInput,
    outputSchema: SyncAgentsListByServerOutput,
  }),
);
// Input Schema
export const SyncAgentsListLinkedDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    syncAgentName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}/linkedDatabases",
    }),
  );
export type SyncAgentsListLinkedDatabasesInput =
  typeof SyncAgentsListLinkedDatabasesInput.Type;

// Output Schema
export const SyncAgentsListLinkedDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SyncAgentsListLinkedDatabasesOutput =
  typeof SyncAgentsListLinkedDatabasesOutput.Type;

// The operation
/**
 * Lists databases linked to a sync agent.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server on which the sync agent is hosted.
 * @param syncAgentName - The name of the sync agent.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncAgentsListLinkedDatabases =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SyncAgentsListLinkedDatabasesInput,
    outputSchema: SyncAgentsListLinkedDatabasesOutput,
  }));
// Input Schema
export const SyncGroupsCancelSyncInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/cancelSync",
    }),
  );
export type SyncGroupsCancelSyncInput = typeof SyncGroupsCancelSyncInput.Type;

// Output Schema
export const SyncGroupsCancelSyncOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SyncGroupsCancelSyncOutput = typeof SyncGroupsCancelSyncOutput.Type;

// The operation
/**
 * Cancels a sync group synchronization.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsCancelSync = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncGroupsCancelSyncInput,
    outputSchema: SyncGroupsCancelSyncOutput,
  }),
);
// Input Schema
export const SyncGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}",
    }),
  );
export type SyncGroupsCreateOrUpdateInput =
  typeof SyncGroupsCreateOrUpdateInput.Type;

// Output Schema
export const SyncGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SyncGroupsCreateOrUpdateOutput =
  typeof SyncGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a sync group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncGroupsCreateOrUpdateInput,
    outputSchema: SyncGroupsCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SyncGroupsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  syncGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}",
  }),
);
export type SyncGroupsDeleteInput = typeof SyncGroupsDeleteInput.Type;

// Output Schema
export const SyncGroupsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SyncGroupsDeleteOutput = typeof SyncGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a sync group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncGroupsDeleteInput,
  outputSchema: SyncGroupsDeleteOutput,
}));
// Input Schema
export const SyncGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  syncGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}",
  }),
);
export type SyncGroupsGetInput = typeof SyncGroupsGetInput.Type;

// Output Schema
export const SyncGroupsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SyncGroupsGetOutput = typeof SyncGroupsGetOutput.Type;

// The operation
/**
 * Gets a sync group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncGroupsGetInput,
  outputSchema: SyncGroupsGetOutput,
}));
// Input Schema
export const SyncGroupsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups",
    }),
  );
export type SyncGroupsListByDatabaseInput =
  typeof SyncGroupsListByDatabaseInput.Type;

// Output Schema
export const SyncGroupsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SyncGroupsListByDatabaseOutput =
  typeof SyncGroupsListByDatabaseOutput.Type;

// The operation
/**
 * Lists sync groups under a hub database.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsListByDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncGroupsListByDatabaseInput,
    outputSchema: SyncGroupsListByDatabaseOutput,
  }),
);
// Input Schema
export const SyncGroupsListHubSchemasInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/hubSchemas",
    }),
  );
export type SyncGroupsListHubSchemasInput =
  typeof SyncGroupsListHubSchemasInput.Type;

// Output Schema
export const SyncGroupsListHubSchemasOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tables: Schema.optional(
            Schema.Array(
              Schema.Struct({
                columns: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      dataSize: Schema.optional(Schema.String),
                      dataType: Schema.optional(Schema.String),
                      errorId: Schema.optional(Schema.String),
                      hasError: Schema.optional(Schema.Boolean),
                      isPrimaryKey: Schema.optional(Schema.Boolean),
                      name: Schema.optional(Schema.String),
                      quotedName: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                errorId: Schema.optional(Schema.String),
                hasError: Schema.optional(Schema.Boolean),
                name: Schema.optional(Schema.String),
                quotedName: Schema.optional(Schema.String),
              }),
            ),
          ),
          lastUpdateTime: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SyncGroupsListHubSchemasOutput =
  typeof SyncGroupsListHubSchemasOutput.Type;

// The operation
/**
 * Gets a collection of hub database schemas.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsListHubSchemas = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncGroupsListHubSchemasInput,
    outputSchema: SyncGroupsListHubSchemasOutput,
  }),
);
// Input Schema
export const SyncGroupsListLogsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    startTime: Schema.String,
    endTime: Schema.String,
    type: Schema.Literals(["All", "Error", "Warning", "Success"]),
    continuationToken: Schema.optional(Schema.String),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/logs",
    }),
  );
export type SyncGroupsListLogsInput = typeof SyncGroupsListLogsInput.Type;

// Output Schema
export const SyncGroupsListLogsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          timestamp: Schema.optional(Schema.String),
          type: Schema.optional(
            Schema.Literals(["All", "Error", "Warning", "Success"]),
          ),
          source: Schema.optional(Schema.String),
          details: Schema.optional(Schema.String),
          tracingId: Schema.optional(Schema.String),
          operationStatus: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SyncGroupsListLogsOutput = typeof SyncGroupsListLogsOutput.Type;

// The operation
/**
 * Gets a collection of sync group logs.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param startTime - Get logs generated after this time.
 * @param endTime - Get logs generated before this time.
 * @param type - The types of logs to retrieve.
 * @param continuationToken - The continuation token for this operation.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsListLogs = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncGroupsListLogsInput,
  outputSchema: SyncGroupsListLogsOutput,
}));
// Input Schema
export const SyncGroupsListSyncDatabaseIdsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/syncDatabaseIds",
    }),
  );
export type SyncGroupsListSyncDatabaseIdsInput =
  typeof SyncGroupsListSyncDatabaseIdsInput.Type;

// Output Schema
export const SyncGroupsListSyncDatabaseIdsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SyncGroupsListSyncDatabaseIdsOutput =
  typeof SyncGroupsListSyncDatabaseIdsOutput.Type;

// The operation
/**
 * Gets a collection of sync database ids.
 *
 * @param locationName - The name of the region where the resource is located.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsListSyncDatabaseIds =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SyncGroupsListSyncDatabaseIdsInput,
    outputSchema: SyncGroupsListSyncDatabaseIdsOutput,
  }));
// Input Schema
export const SyncGroupsRefreshHubSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/refreshHubSchema",
    }),
  );
export type SyncGroupsRefreshHubSchemaInput =
  typeof SyncGroupsRefreshHubSchemaInput.Type;

// Output Schema
export const SyncGroupsRefreshHubSchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SyncGroupsRefreshHubSchemaOutput =
  typeof SyncGroupsRefreshHubSchemaOutput.Type;

// The operation
/**
 * Refreshes a hub database schema.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsRefreshHubSchema = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncGroupsRefreshHubSchemaInput,
    outputSchema: SyncGroupsRefreshHubSchemaOutput,
  }),
);
// Input Schema
export const SyncGroupsTriggerSyncInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/triggerSync",
    }),
  );
export type SyncGroupsTriggerSyncInput = typeof SyncGroupsTriggerSyncInput.Type;

// Output Schema
export const SyncGroupsTriggerSyncOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SyncGroupsTriggerSyncOutput =
  typeof SyncGroupsTriggerSyncOutput.Type;

// The operation
/**
 * Triggers a sync group synchronization.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsTriggerSync = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncGroupsTriggerSyncInput,
    outputSchema: SyncGroupsTriggerSyncOutput,
  }),
);
// Input Schema
export const SyncGroupsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  syncGroupName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}",
  }),
);
export type SyncGroupsUpdateInput = typeof SyncGroupsUpdateInput.Type;

// Output Schema
export const SyncGroupsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SyncGroupsUpdateOutput = typeof SyncGroupsUpdateOutput.Type;

// The operation
/**
 * Updates a sync group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncGroupsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncGroupsUpdateInput,
  outputSchema: SyncGroupsUpdateOutput,
}));
// Input Schema
export const SyncMembersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    syncMemberName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}",
    }),
  );
export type SyncMembersCreateOrUpdateInput =
  typeof SyncMembersCreateOrUpdateInput.Type;

// Output Schema
export const SyncMembersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SyncMembersCreateOrUpdateOutput =
  typeof SyncMembersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a sync member.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group on which the sync member is hosted.
 * @param syncMemberName - The name of the sync member.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncMembersCreateOrUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncMembersCreateOrUpdateInput,
    outputSchema: SyncMembersCreateOrUpdateOutput,
  }),
);
// Input Schema
export const SyncMembersDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    syncMemberName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}",
  }),
);
export type SyncMembersDeleteInput = typeof SyncMembersDeleteInput.Type;

// Output Schema
export const SyncMembersDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SyncMembersDeleteOutput = typeof SyncMembersDeleteOutput.Type;

// The operation
/**
 * Deletes a sync member.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group on which the sync member is hosted.
 * @param syncMemberName - The name of the sync member.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncMembersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncMembersDeleteInput,
  outputSchema: SyncMembersDeleteOutput,
}));
// Input Schema
export const SyncMembersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
  syncGroupName: Schema.String.pipe(T.PathParam()),
  syncMemberName: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}",
  }),
);
export type SyncMembersGetInput = typeof SyncMembersGetInput.Type;

// Output Schema
export const SyncMembersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {},
);
export type SyncMembersGetOutput = typeof SyncMembersGetOutput.Type;

// The operation
/**
 * Gets a sync member.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group on which the sync member is hosted.
 * @param syncMemberName - The name of the sync member.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncMembersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncMembersGetInput,
  outputSchema: SyncMembersGetOutput,
}));
// Input Schema
export const SyncMembersListBySyncGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers",
    }),
  );
export type SyncMembersListBySyncGroupInput =
  typeof SyncMembersListBySyncGroupInput.Type;

// Output Schema
export const SyncMembersListBySyncGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type SyncMembersListBySyncGroupOutput =
  typeof SyncMembersListBySyncGroupOutput.Type;

// The operation
/**
 * Lists sync members in the given sync group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncMembersListBySyncGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SyncMembersListBySyncGroupInput,
    outputSchema: SyncMembersListBySyncGroupOutput,
  }),
);
// Input Schema
export const SyncMembersListMemberSchemasInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    syncMemberName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}/schemas",
    }),
  );
export type SyncMembersListMemberSchemasInput =
  typeof SyncMembersListMemberSchemasInput.Type;

// Output Schema
export const SyncMembersListMemberSchemasOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          tables: Schema.optional(
            Schema.Array(
              Schema.Struct({
                columns: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      dataSize: Schema.optional(Schema.String),
                      dataType: Schema.optional(Schema.String),
                      errorId: Schema.optional(Schema.String),
                      hasError: Schema.optional(Schema.Boolean),
                      isPrimaryKey: Schema.optional(Schema.Boolean),
                      name: Schema.optional(Schema.String),
                      quotedName: Schema.optional(Schema.String),
                    }),
                  ),
                ),
                errorId: Schema.optional(Schema.String),
                hasError: Schema.optional(Schema.Boolean),
                name: Schema.optional(Schema.String),
                quotedName: Schema.optional(Schema.String),
              }),
            ),
          ),
          lastUpdateTime: Schema.optional(Schema.String),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type SyncMembersListMemberSchemasOutput =
  typeof SyncMembersListMemberSchemasOutput.Type;

// The operation
/**
 * Gets a sync member database schema.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group on which the sync member is hosted.
 * @param syncMemberName - The name of the sync member.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncMembersListMemberSchemas =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SyncMembersListMemberSchemasInput,
    outputSchema: SyncMembersListMemberSchemasOutput,
  }));
// Input Schema
export const SyncMembersRefreshMemberSchemaInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    syncMemberName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}/refreshSchema",
    }),
  );
export type SyncMembersRefreshMemberSchemaInput =
  typeof SyncMembersRefreshMemberSchemaInput.Type;

// Output Schema
export const SyncMembersRefreshMemberSchemaOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type SyncMembersRefreshMemberSchemaOutput =
  typeof SyncMembersRefreshMemberSchemaOutput.Type;

// The operation
/**
 * Refreshes a sync member database schema.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group on which the sync member is hosted.
 * @param syncMemberName - The name of the sync member.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncMembersRefreshMemberSchema =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SyncMembersRefreshMemberSchemaInput,
    outputSchema: SyncMembersRefreshMemberSchemaOutput,
  }));
// Input Schema
export const SyncMembersUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    syncGroupName: Schema.String.pipe(T.PathParam()),
    syncMemberName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}",
  }),
);
export type SyncMembersUpdateInput = typeof SyncMembersUpdateInput.Type;

// Output Schema
export const SyncMembersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SyncMembersUpdateOutput = typeof SyncMembersUpdateOutput.Type;

// The operation
/**
 * Updates an existing sync member.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param databaseName - The name of the database on which the sync group is hosted.
 * @param syncGroupName - The name of the sync group on which the sync member is hosted.
 * @param syncMemberName - The name of the sync member.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const SyncMembersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SyncMembersUpdateInput,
  outputSchema: SyncMembersUpdateOutput,
}));
// Input Schema
export const TdeCertificatesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/tdeCertificates",
    }),
  );
export type TdeCertificatesCreateInput = typeof TdeCertificatesCreateInput.Type;

// Output Schema
export const TdeCertificatesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type TdeCertificatesCreateOutput =
  typeof TdeCertificatesCreateOutput.Type;

// The operation
/**
 * Creates a TDE certificate for a given server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const TdeCertificatesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TdeCertificatesCreateInput,
    outputSchema: TdeCertificatesCreateOutput,
  }),
);
// Input Schema
export const TimeZonesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  locationName: Schema.String.pipe(T.PathParam()),
  timeZoneId: Schema.String.pipe(T.PathParam()),
  subscriptionId: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/timeZones/{timeZoneId}",
  }),
);
export type TimeZonesGetInput = typeof TimeZonesGetInput.Type;

// Output Schema
export const TimeZonesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TimeZonesGetOutput = typeof TimeZonesGetOutput.Type;

// The operation
/**
 * Gets a managed instance time zone.
 *
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const TimeZonesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TimeZonesGetInput,
  outputSchema: TimeZonesGetOutput,
}));
// Input Schema
export const TimeZonesListByLocationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    locationName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/timeZones",
    }),
  );
export type TimeZonesListByLocationInput =
  typeof TimeZonesListByLocationInput.Type;

// Output Schema
export const TimeZonesListByLocationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type TimeZonesListByLocationOutput =
  typeof TimeZonesListByLocationOutput.Type;

// The operation
/**
 * Gets a list of managed instance time zones by location.
 *
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const TimeZonesListByLocation = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: TimeZonesListByLocationInput,
    outputSchema: TimeZonesListByLocationOutput,
  }),
);
// Input Schema
export const TransparentDataEncryptionsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    tdeName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{tdeName}",
    }),
  );
export type TransparentDataEncryptionsCreateOrUpdateInput =
  typeof TransparentDataEncryptionsCreateOrUpdateInput.Type;

// Output Schema
export const TransparentDataEncryptionsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TransparentDataEncryptionsCreateOrUpdateOutput =
  typeof TransparentDataEncryptionsCreateOrUpdateOutput.Type;

// The operation
/**
 * Updates a logical database's transparent data encryption configuration.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server.
 * @param databaseName - The name of the logical database for which the security alert policy is defined.
 * @param tdeName - The name of the transparent data encryption configuration.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const TransparentDataEncryptionsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TransparentDataEncryptionsCreateOrUpdateInput,
    outputSchema: TransparentDataEncryptionsCreateOrUpdateOutput,
  }));
// Input Schema
export const TransparentDataEncryptionsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    tdeName: Schema.Literals(["current"]).pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{tdeName}",
    }),
  );
export type TransparentDataEncryptionsGetInput =
  typeof TransparentDataEncryptionsGetInput.Type;

// Output Schema
export const TransparentDataEncryptionsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type TransparentDataEncryptionsGetOutput =
  typeof TransparentDataEncryptionsGetOutput.Type;

// The operation
/**
 * Gets a logical database's transparent data encryption.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server.
 * @param databaseName - The name of the logical database for which the transparent data encryption is defined.
 * @param tdeName - The name of the transparent data encryption configuration.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const TransparentDataEncryptionsGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TransparentDataEncryptionsGetInput,
    outputSchema: TransparentDataEncryptionsGetOutput,
  }));
// Input Schema
export const TransparentDataEncryptionsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    serverName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption",
    }),
  );
export type TransparentDataEncryptionsListByDatabaseInput =
  typeof TransparentDataEncryptionsListByDatabaseInput.Type;

// Output Schema
export const TransparentDataEncryptionsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type TransparentDataEncryptionsListByDatabaseOutput =
  typeof TransparentDataEncryptionsListByDatabaseOutput.Type;

// The operation
/**
 * Gets a list of the logical database's transparent data encryption.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param serverName - The name of the server.
 * @param databaseName - The name of the logical database for which the transparent data encryption is defined.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const TransparentDataEncryptionsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TransparentDataEncryptionsListByDatabaseInput,
    outputSchema: TransparentDataEncryptionsListByDatabaseOutput,
  }));
// Input Schema
export const UsagesListByInstancePoolInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    instancePoolName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    expandChildren: Schema.optional(Schema.Boolean),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}/usages",
    }),
  );
export type UsagesListByInstancePoolInput =
  typeof UsagesListByInstancePoolInput.Type;

// Output Schema
export const UsagesListByInstancePoolOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(
      Schema.Array(
        Schema.Struct({
          id: Schema.optional(Schema.String),
          name: Schema.optional(
            Schema.Struct({
              value: Schema.optional(Schema.String),
              localizedValue: Schema.optional(Schema.String),
            }),
          ),
          type: Schema.optional(Schema.String),
          unit: Schema.optional(Schema.String),
          currentValue: Schema.optional(Schema.Number),
          limit: Schema.optional(Schema.Number),
          requestedLimit: Schema.optional(Schema.Number),
        }),
      ),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type UsagesListByInstancePoolOutput =
  typeof UsagesListByInstancePoolOutput.Type;

// The operation
/**
 * Gets all instance pool usage metrics
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param instancePoolName - The name of the instance pool to be retrieved.
 * @param expandChildren - Optional request parameter to include managed instance usages within the instance pool.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const UsagesListByInstancePool = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UsagesListByInstancePoolInput,
    outputSchema: UsagesListByInstancePoolOutput,
  }),
);
// Input Schema
export const VirtualClustersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/virtualClusters/{virtualClusterName}",
    }),
  );
export type VirtualClustersDeleteInput = typeof VirtualClustersDeleteInput.Type;

// Output Schema
export const VirtualClustersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualClustersDeleteOutput =
  typeof VirtualClustersDeleteOutput.Type;

// The operation
/**
 * Deletes a virtual cluster.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualClustersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualClustersDeleteInput,
    outputSchema: VirtualClustersDeleteOutput,
  }),
);
// Input Schema
export const VirtualClustersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/virtualClusters/{virtualClusterName}",
    }),
  );
export type VirtualClustersGetInput = typeof VirtualClustersGetInput.Type;

// Output Schema
export const VirtualClustersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type VirtualClustersGetOutput = typeof VirtualClustersGetOutput.Type;

// The operation
/**
 * Gets a virtual cluster.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualClustersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualClustersGetInput,
  outputSchema: VirtualClustersGetOutput,
}));
// Input Schema
export const VirtualClustersListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/virtualClusters",
    }),
  );
export type VirtualClustersListInput = typeof VirtualClustersListInput.Type;

// Output Schema
export const VirtualClustersListOutput =
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
export type VirtualClustersListOutput = typeof VirtualClustersListOutput.Type;

// The operation
/**
 * Gets a list of all virtualClusters in the subscription.
 *
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualClustersList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: VirtualClustersListInput,
  outputSchema: VirtualClustersListOutput,
}));
// Input Schema
export const VirtualClustersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/virtualClusters",
    }),
  );
export type VirtualClustersListByResourceGroupInput =
  typeof VirtualClustersListByResourceGroupInput.Type;

// Output Schema
export const VirtualClustersListByResourceGroupOutput =
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
export type VirtualClustersListByResourceGroupOutput =
  typeof VirtualClustersListByResourceGroupOutput.Type;

// The operation
/**
 * Gets a list of virtual clusters in a resource group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualClustersListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualClustersListByResourceGroupInput,
    outputSchema: VirtualClustersListByResourceGroupOutput,
  }));
// Input Schema
export const VirtualClustersUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/virtualClusters/{virtualClusterName}",
    }),
  );
export type VirtualClustersUpdateInput = typeof VirtualClustersUpdateInput.Type;

// Output Schema
export const VirtualClustersUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    location: Schema.String,
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  });
export type VirtualClustersUpdateOutput =
  typeof VirtualClustersUpdateOutput.Type;

// The operation
/**
 * Updates an existing virtual cluster.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualClustersUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualClustersUpdateInput,
    outputSchema: VirtualClustersUpdateOutput,
  }),
);
// Input Schema
export const VirtualClustersUpdateDnsServersInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/virtualClusters/{virtualClusterName}/updateManagedInstanceDnsServers",
    }),
  );
export type VirtualClustersUpdateDnsServersInput =
  typeof VirtualClustersUpdateDnsServersInput.Type;

// Output Schema
export const VirtualClustersUpdateDnsServersOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualClustersUpdateDnsServersOutput =
  typeof VirtualClustersUpdateDnsServersOutput.Type;

// The operation
/**
 * Synchronizes the DNS server settings used by the managed instances inside the given virtual cluster.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualClustersUpdateDnsServers =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualClustersUpdateDnsServersInput,
    outputSchema: VirtualClustersUpdateDnsServersOutput,
  }));
// Input Schema
export const VirtualNetworkRulesCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualNetworkRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules/{virtualNetworkRuleName}",
    }),
  );
export type VirtualNetworkRulesCreateOrUpdateInput =
  typeof VirtualNetworkRulesCreateOrUpdateInput.Type;

// Output Schema
export const VirtualNetworkRulesCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualNetworkRulesCreateOrUpdateOutput =
  typeof VirtualNetworkRulesCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates an existing virtual network rule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param virtualNetworkRuleName - The name of the virtual network rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualNetworkRulesCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualNetworkRulesCreateOrUpdateInput,
    outputSchema: VirtualNetworkRulesCreateOrUpdateOutput,
  }));
// Input Schema
export const VirtualNetworkRulesDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualNetworkRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules/{virtualNetworkRuleName}",
    }),
  );
export type VirtualNetworkRulesDeleteInput =
  typeof VirtualNetworkRulesDeleteInput.Type;

// Output Schema
export const VirtualNetworkRulesDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type VirtualNetworkRulesDeleteOutput =
  typeof VirtualNetworkRulesDeleteOutput.Type;

// The operation
/**
 * Deletes the virtual network rule with the given name.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param virtualNetworkRuleName - The name of the virtual network rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualNetworkRulesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkRulesDeleteInput,
    outputSchema: VirtualNetworkRulesDeleteOutput,
  }),
);
// Input Schema
export const VirtualNetworkRulesGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    virtualNetworkRuleName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules/{virtualNetworkRuleName}",
    }),
  );
export type VirtualNetworkRulesGetInput =
  typeof VirtualNetworkRulesGetInput.Type;

// Output Schema
export const VirtualNetworkRulesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type VirtualNetworkRulesGetOutput =
  typeof VirtualNetworkRulesGetOutput.Type;

// The operation
/**
 * Gets a virtual network rule.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param virtualNetworkRuleName - The name of the virtual network rule.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualNetworkRulesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: VirtualNetworkRulesGetInput,
    outputSchema: VirtualNetworkRulesGetOutput,
  }),
);
// Input Schema
export const VirtualNetworkRulesListByServerInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/virtualNetworkRules",
    }),
  );
export type VirtualNetworkRulesListByServerInput =
  typeof VirtualNetworkRulesListByServerInput.Type;

// Output Schema
export const VirtualNetworkRulesListByServerOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type VirtualNetworkRulesListByServerOutput =
  typeof VirtualNetworkRulesListByServerOutput.Type;

// The operation
/**
 * Gets a list of virtual network rules in a server.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const VirtualNetworkRulesListByServer =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: VirtualNetworkRulesListByServerInput,
    outputSchema: VirtualNetworkRulesListByServerOutput,
  }));
// Input Schema
export const WorkloadClassifiersCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    workloadClassifierName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}",
    }),
  );
export type WorkloadClassifiersCreateOrUpdateInput =
  typeof WorkloadClassifiersCreateOrUpdateInput.Type;

// Output Schema
export const WorkloadClassifiersCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadClassifiersCreateOrUpdateOutput =
  typeof WorkloadClassifiersCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workload classifier.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param workloadGroupName - The name of the workload group from which to receive the classifier from.
 * @param workloadClassifierName - The name of the workload classifier to create/update.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const WorkloadClassifiersCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadClassifiersCreateOrUpdateInput,
    outputSchema: WorkloadClassifiersCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkloadClassifiersDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    workloadClassifierName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}",
    }),
  );
export type WorkloadClassifiersDeleteInput =
  typeof WorkloadClassifiersDeleteInput.Type;

// Output Schema
export const WorkloadClassifiersDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkloadClassifiersDeleteOutput =
  typeof WorkloadClassifiersDeleteOutput.Type;

// The operation
/**
 * Deletes a workload classifier.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param workloadGroupName - The name of the workload group from which to receive the classifier from.
 * @param workloadClassifierName - The name of the workload classifier to delete.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const WorkloadClassifiersDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadClassifiersDeleteInput,
    outputSchema: WorkloadClassifiersDeleteOutput,
  }),
);
// Input Schema
export const WorkloadClassifiersGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    workloadClassifierName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}",
    }),
  );
export type WorkloadClassifiersGetInput =
  typeof WorkloadClassifiersGetInput.Type;

// Output Schema
export const WorkloadClassifiersGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadClassifiersGetOutput =
  typeof WorkloadClassifiersGetOutput.Type;

// The operation
/**
 * Gets a workload classifier
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param workloadGroupName - The name of the workload group from which to receive the classifier from.
 * @param workloadClassifierName - The name of the workload classifier.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const WorkloadClassifiersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadClassifiersGetInput,
    outputSchema: WorkloadClassifiersGetOutput,
  }),
);
// Input Schema
export const WorkloadClassifiersListByWorkloadGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers",
    }),
  );
export type WorkloadClassifiersListByWorkloadGroupInput =
  typeof WorkloadClassifiersListByWorkloadGroupInput.Type;

// Output Schema
export const WorkloadClassifiersListByWorkloadGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadClassifiersListByWorkloadGroupOutput =
  typeof WorkloadClassifiersListByWorkloadGroupOutput.Type;

// The operation
/**
 * Gets the list of workload classifiers for a workload group
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param workloadGroupName - The name of the workload group from which to receive the classifiers from.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const WorkloadClassifiersListByWorkloadGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadClassifiersListByWorkloadGroupInput,
    outputSchema: WorkloadClassifiersListByWorkloadGroupOutput,
  }));
// Input Schema
export const WorkloadGroupsCreateOrUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}",
    }),
  );
export type WorkloadGroupsCreateOrUpdateInput =
  typeof WorkloadGroupsCreateOrUpdateInput.Type;

// Output Schema
export const WorkloadGroupsCreateOrUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadGroupsCreateOrUpdateOutput =
  typeof WorkloadGroupsCreateOrUpdateOutput.Type;

// The operation
/**
 * Creates or updates a workload group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param workloadGroupName - The name of the workload group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const WorkloadGroupsCreateOrUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadGroupsCreateOrUpdateInput,
    outputSchema: WorkloadGroupsCreateOrUpdateOutput,
  }));
// Input Schema
export const WorkloadGroupsDeleteInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}",
    }),
  );
export type WorkloadGroupsDeleteInput = typeof WorkloadGroupsDeleteInput.Type;

// Output Schema
export const WorkloadGroupsDeleteOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkloadGroupsDeleteOutput = typeof WorkloadGroupsDeleteOutput.Type;

// The operation
/**
 * Deletes a workload group.
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param workloadGroupName - The name of the workload group to delete.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const WorkloadGroupsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: WorkloadGroupsDeleteInput,
    outputSchema: WorkloadGroupsDeleteOutput,
  }),
);
// Input Schema
export const WorkloadGroupsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    workloadGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}",
  }),
);
export type WorkloadGroupsGetInput = typeof WorkloadGroupsGetInput.Type;

// Output Schema
export const WorkloadGroupsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type WorkloadGroupsGetOutput = typeof WorkloadGroupsGetOutput.Type;

// The operation
/**
 * Gets a workload group
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param workloadGroupName - The name of the workload group.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const WorkloadGroupsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkloadGroupsGetInput,
  outputSchema: WorkloadGroupsGetOutput,
}));
// Input Schema
export const WorkloadGroupsListByDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups",
    }),
  );
export type WorkloadGroupsListByDatabaseInput =
  typeof WorkloadGroupsListByDatabaseInput.Type;

// Output Schema
export const WorkloadGroupsListByDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
    nextLink: Schema.optional(Schema.String),
  });
export type WorkloadGroupsListByDatabaseOutput =
  typeof WorkloadGroupsListByDatabaseOutput.Type;

// The operation
/**
 * Gets the list of workload groups
 *
 * @param resourceGroupName - The name of the resource group that contains the resource. You can obtain this value from the Azure Resource Manager API or the portal.
 * @param subscriptionId - The subscription ID that identifies an Azure subscription.
 * @param api-version - The API version to use for the request.
 */
export const WorkloadGroupsListByDatabase =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: WorkloadGroupsListByDatabaseInput,
    outputSchema: WorkloadGroupsListByDatabaseOutput,
  }));
